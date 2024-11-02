import { initializeGame, loadGame } from './services/GameService';
import { BeeType, Swarm } from './config/constants';
import { getGameStatus, getPlayerName, getSwarm, saveGameStatus, savePlayerName, resetGame } from './services/StorageService';
// import { renderHitButton } from './src/components/HitButtonComponent';
// import { renderSwarm } from './src/components/SwarmComponent.ts';
// import { renderBeeInfo } from './src/components/BeeInfoComponent.ts';

let gameInProgress = !!getGameStatus();
const swarmSection = document.getElementById('swarm-section');

document.addEventListener('DOMContentLoaded', () => {
    let startGameButton = document.getElementById('start-game') as HTMLButtonElement;
    const resetGameButton = document.getElementById('reset-game') as HTMLButtonElement;

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

    if(!startGameButton && gameInProgress) {
        displayBees();
    }

    if (resetGameButton) {
        resetGameButton.addEventListener('click', () => {
            resetGame();
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
        const playerName = playerInput?.value || getPlayerName();
        savePlayerName(playerName);
        gameButton.style.display = 'none';
        playerInfo!.style.display = 'none';
        saveGameStatus(true);
        initializeGame();
        displayBees();
    });
}

function displayBees() {
    let Swarm: Swarm = getSwarm();
    const playerName = getPlayerName();
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
            const bees = Swarm[beeType] || [];
            const beeDomElement = divMap[beeType];
            beeDomElement.setAttribute('class', beeType.toLowerCase());
            beeDomElement.setAttribute('id', 'bees');

            if (beeDomElement) {
                createBees(beeType, bees, beeDomElement);
                swarmSection.appendChild(beeDomElement);
            }
        });
    }
}

function createBees(beeType: BeeType, bees: { id: number, health: number }[], container: HTMLElement) {
    bees.forEach((bee) => {
        const specificBee = document.createElement('div');
        specificBee.classList.add('specific-bee');
        specificBee.setAttribute('id', `${bee.id}`);

        const healthBar = document.createElement('span');
        healthBar.classList.add('health-bar');
        healthBar.innerHTML = `HP: ${bee.health}`;
        healthBar.setAttribute('data-health', `${bee.health}`);

        specificBee.appendChild(healthBar);

        const beeImage = document.createElement('img');
        beeImage.setAttribute('src', `assets/${beeType}.png`);
        beeImage.setAttribute('class', beeType);
        specificBee.appendChild(beeImage);
        beeImage.setAttribute('id', `${bee.id}`);
        beeImage.setAttribute('data-id', `${bee.id}`);

        container.appendChild(specificBee);
    });
}