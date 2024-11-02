import { initializeSwarm } from '../components/SwarmComponent';
import { displayGameUI } from '../ui/DisplayGameUI';
import { resetGame } from './StorageService';

export function initializeGame() {
    initializeSwarm();
    displayGameUI();
}

export function alertAndHandleReset(message: string, reset?: boolean) {
    alert(message);
    if (reset) {
        resetGame();
        location.reload();
    }
}