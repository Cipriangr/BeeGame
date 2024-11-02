import { initializeSwarm } from '../components/SwarmComponent';
import { displayGameUI } from '../ui/DisplayGameUI';

export function initializeGame() {
    initializeSwarm();
    displayGameUI();
}