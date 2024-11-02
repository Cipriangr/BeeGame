import { initializeGame } from './services/GameService';
import { getGameStatus, saveGameStatus, resetGame } from './services/StorageService';
import { createStartButton } from './ui/StartButtonUI';
import { createPlayerNameElements } from './ui/PlayerUI';

const gameInProgress = getGameStatus();
const swarmSection = document.getElementById('swarm-section');

document.addEventListener('DOMContentLoaded', () => {
    let startGameButton = document.getElementById('start-game') as HTMLButtonElement;
    const resetGameButton = document.getElementById('reset-game') as HTMLButtonElement;

    if (!startGameButton && !gameInProgress) {
        saveGameStatus(false);
        createPlayerNameElements(swarmSection!);
        startGameButton = createStartButton(swarmSection!, initializeGame);
    }

    if (resetGameButton) {
        resetGameButton.addEventListener('click', () => {
            resetGame();
            location.reload();
        });
    }
});
