import { create } from 'domain';
import { initializeGame, loadGame } from './services/GameService';
import { BeeType, Swarm } from './config/constants';
import { getGameStatus, getPlayerName, getSwarm, saveGameStatus, savePlayerName } from './services/StorageService';
// import { renderHitButton } from './src/components/HitButtonComponent';
// import { renderSwarm } from './src/components/SwarmComponent.ts';
// import { renderBeeInfo } from './src/components/BeeInfoComponent.ts';

let gameInProgress = !!getGameStatus();
const swarmSection = document.getElementById('swarm-section');

document.addEventListener('DOMContentLoaded', () => {
    let startGameButton = document.getElementById('start-game') as HTMLButtonElement;
    const resetGame = document.getElementById('reset-game') as HTMLButtonElement;

    if (!startGameButton && !gameInProgress) {
        console.log('Game not in progress, creating start button');
        saveGameStatus(false);
        createPlayerNameElements();
        startGameButton = createStartButton();
    }

    if (startGameButton && !gameInProgress) {
        console.log('!!test');
        initializeBees(startGameButton);
    }

    if(startGameButton && gameInProgress) {
        loadGame();
    }

    if (resetGame) {
        resetGame.addEventListener('click', () => {
            saveGameStatus(false);
            //work on reseting the game, update UI without reloading
            location.reload();
        });
    }
});

function createStartButton(): HTMLButtonElement {
    const startElement = document.createElement('button');
    startElement.setAttribute('id', 'start-game');
    startElement.innerText = 'Start The Game';
    swarmSection!.appendChild(startElement);
    return startElement;
}

function createPlayerNameElements() {
    if (document.getElementById('player-name-div')) {
        return;
    };

    const playerNameDiv = document.createElement('div');
    playerNameDiv.setAttribute('id', 'player-name');

    const playerNameLabel = document.createElement('label');
    playerNameLabel.setAttribute('for', 'player-name');
    playerNameLabel.innerText = 'Please Enter your name and press the button below';
    playerNameLabel.setAttribute('id', 'player-name-label');

    const playerNameInput = document.createElement('input');
    playerNameInput.setAttribute('type', 'text');
    playerNameInput.setAttribute('id', 'player-name-input');
    playerNameInput.setAttribute('placeholder', 'Enter your name');

    playerNameDiv.appendChild(playerNameLabel);
    playerNameDiv.appendChild(playerNameInput);

    swarmSection!.appendChild(playerNameDiv);
}

function initializeBees(gameButton: HTMLButtonElement) {
    if (gameInProgress || gameButton.hasAttribute('data-initialized')) {
        return;
    }

    gameButton.setAttribute('data-initialized', 'true');
    let playerInfo = document.getElementById('player-name') as HTMLDivElement;
    const playerInput = document.getElementById('player-name-input') as HTMLInputElement;

    gameButton.addEventListener('click', () => {
        const playerName = playerInput ? playerInput.value : getPlayerName() ? getPlayerName() : '';
        //save in localstorage
        gameButton.style.display = 'none';
        playerInfo!.style.display = 'none';
        saveGameStatus(true);
        initializeGame();
        displayBees(playerName);
    });
}

function displayBees(playerName: string) {
    let Swarm: Swarm = getSwarm();
    if (swarmSection) {
        const playerNameElement = document.createElement('h3');
        playerNameElement.innerText = 'Hey ' + playerName.toUpperCase() + '! Press Hit to attack the bees';
        const divMap = {
            [BeeType.WORKER]: document.createElement('div'),
            [BeeType.QUEEN]: document.createElement('div'),
            [BeeType.DRONE]: document.createElement('div'),
        }
        
        swarmSection.appendChild(playerNameElement);

        Object.keys(Swarm).forEach((key) => {
            const beeType = key as BeeType;
            const bees = Swarm[beeType];
            const beeDomElement = divMap[beeType];
            console.log('!!beediv', beeDomElement);
            beeDomElement.setAttribute('class', beeType.toLowerCase());

            if (beeDomElement) {
                createBeesImages(beeType, bees.length, beeDomElement);
                swarmSection.appendChild(beeDomElement);
            }
        });

        // const workersDiv = document.createElement('div');
        // const queendiv = document.createElement('div');
        // const dronesDiv = document.createElement('div');

        // workersDiv.setAttribute('class', 'workers');
        // queendiv.setAttribute('class', 'queen');
        // dronesDiv.setAttribute('class', 'drones');

        // swarmSection.appendChild(workersDiv);
        // swarmSection.appendChild(queendiv);
        // swarmSection.appendChild(dronesDiv);
        
        // savePlayerName(playerName);
        // console.log('swarm', Swarm);
        // Swarm.Workers.forEach(worker => { 
        //     const workerLength = Swarm.Workers.length;
        //     createBeesImages(worker.type, workerLength, workersDiv);
        // });

        // createBeesImages(BeeType.WORKER, 5, workersDiv);
        // createBeesImages(BeeType.QUEEN, 1, queendiv);
        // createBeesImages(BeeType.DRONE, 8, dronesDiv);
    }
}

function createBeeType() {

}

function createBeesImages(beeType: BeeType, beeNumber: number, beeSection: HTMLElement) {
    for (let bee = 0; bee < beeNumber; bee++) {
        const beeImage = document.createElement('img');
        beeImage.setAttribute('src', `assets/${beeType}.png`);
        beeImage.setAttribute('class', beeType);
        beeSection.appendChild(beeImage);
    }

}