import { alertAndHandleReset, initializeGame } from './services/GameService';
import { getGameStatus, saveGameStatus, resetGame, getSwarm, savePlayerName, getPlayerName } from './services/StorageService';
import { createStartButton } from './ui/StartButtonUI';
import { createPlayerNameElements } from './ui/PlayerUI';
import { displayGameUI } from './ui/DisplayGameUI';
import { hitButtonAction } from './components/HitButtonComponent';

let gameInProgress = getGameStatus();
const swarmSection = document.getElementById('swarm-section');
const actionButtons = document.getElementById('action-buttons') as HTMLDivElement;
const attackInfo = document.getElementById('bee-info') as HTMLDivElement;

document.addEventListener('DOMContentLoaded', () => {
    let startGameButton = document.getElementById('start-game') as HTMLButtonElement;
    const resetGameButton = document.getElementById('reset-game') as HTMLButtonElement;

    const swarm = getSwarm();  // Retrieve swarm data from localStorage

    //Game not started and swarm data is empty, show input and start button
    if (!gameInProgress && (Object.keys(swarm).length === 0)) {
        saveGameStatus(false);
        createPlayerNameElements(swarmSection!);
        startGameButton = createStartButton(swarmSection!, initializeBees);
        startGameButton.setAttribute('data-initialized', 'false');
        actionButtons.style.display = 'none';
        attackInfo.style.display = 'none';
    }

    //Game not started, make start button available
    if (startGameButton && !gameInProgress) {
        initializeBees(startGameButton);
    }

    //Game in progress and swarm data present, display bees directly
    if (gameInProgress && Object.keys(swarm).length > 0) {
        displayGameUI();
        actionButtons.style.display = 'flex';
        attackInfo.style.display = 'flex';
        hitButtonAction();
    }

    if (resetGameButton) {
        resetGameButton.addEventListener('click', () => {
            resetGame();
            // actionButtons.style.display = 'none';
            // attackInfo.style.display = 'none';
            location.reload();
        });
    }
});

function initializeBees(gameButton: HTMLButtonElement) {
    if (gameInProgress || gameButton.hasAttribute('data-initialized')) {
        return;
    }

    gameButton.setAttribute('data-initialized', 'true');
    const playerInfo = document.getElementById('player-name') as HTMLDivElement;
    const playerInput = document.getElementById('player-name-input') as HTMLInputElement;

    gameButton.addEventListener('click', () => {
        const playerName = playerInput?.value || getPlayerName();
        savePlayerName(playerName);
        if (!playerName) {
            alertAndHandleReset('Please enter your name to start the game');
            return;
        }

        gameButton.style.display = 'none'; // Hide start button
        playerInfo!.style.display = 'none'; // Hide player input section
        saveGameStatus(true);             // Set game like is in progress
        initializeGame();                 // Initializes game state and saves the swarm to localStorage
        displayGameUI();                  // Displays the initialized bees and player info
        hitButtonAction();
        actionButtons.style.display = 'flex';
        attackInfo.style.display = 'flex';
    });
}
