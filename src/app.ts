import { create } from 'domain';
import { initializeGame } from './services/GameService';
import { BeeType } from './config/constants';
import { getGameStatus, saveGameStatus } from './services/StorageService';
// import { renderHitButton } from './src/components/HitButtonComponent';
// import { renderSwarm } from './src/components/SwarmComponent.ts';
// import { renderBeeInfo } from './src/components/BeeInfoComponent.ts';

let gameInProgress = !!getGameStatus();
const swarmSection = document.getElementById('swarm-section');

document.addEventListener('DOMContentLoaded', () => {
    let startGame = document.getElementById('start-game') as HTMLButtonElement;
    const resetGame = document.getElementById('reset-game') as HTMLButtonElement;

    if (!startGame && !gameInProgress) {
        console.log('Game not in progress, creating start button');
        saveGameStatus(false);

        const startElement = document.createElement('button');
        startElement.setAttribute('id', 'start-game');
        startElement.innerText = 'Press to start the game';
        swarmSection!.appendChild(startElement);

        startGame = startElement as HTMLButtonElement;
    }

    if (startGame && !gameInProgress) {
        initializeBees(startGame);
    }

    if (resetGame) {
        resetGame.addEventListener('click', () => {
            saveGameStatus(false);
            //work on reseting the game, update UI without reloading
            location.reload();
        });
    }
});

function initializeBees(gameButton: HTMLButtonElement) {
    if (gameInProgress) {
        return;
    }

    gameButton.addEventListener('click', () => {
        gameButton.style.display = 'none';
        saveGameStatus(true);
        displayBees();
        initializeGame();
    });
}



function displayBees() {
    if (swarmSection) {
        // swarmSection.style.display = 'block';
        const workersDiv = document.createElement('div');
        const queendiv = document.createElement('div');
        const dronesDiv = document.createElement('div');

        workersDiv.setAttribute('class', 'workers');
        queendiv.setAttribute('class', 'queen');
        dronesDiv.setAttribute('class', 'drones');

        swarmSection.appendChild(workersDiv);
        swarmSection.appendChild(queendiv);
        swarmSection.appendChild(dronesDiv);
        
        createBeesImages(BeeType.WORKER, 5, workersDiv);
        createBeesImages(BeeType.QUEEN, 1, queendiv);
        createBeesImages(BeeType.DRONE, 8, dronesDiv);
    }
}

function createBeesImages(beeType: BeeType, beeNumber: number, beeSection: HTMLElement) {
    for (let bee = 0; bee < beeNumber; bee++) {
        const beeImage = document.createElement('img');
        beeImage.setAttribute('src', `assets/${beeType}.png`);
        beeImage.setAttribute('class', beeType);
        beeSection.appendChild(beeImage);
    }

}