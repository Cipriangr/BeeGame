import { initializeSwarm } from '../components/SwarmComponent';
import { displayGameUI } from '../ui/DisplayUI';

export function initializeGame() {
    initializeSwarm();
    displayGameUI();
}