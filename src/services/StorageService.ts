import { Bee, Swarm } from "../config/constants";

export function getGameStatus(): boolean {
  const status = localStorage.getItem('gameInProgress');
  return status === 'true';
}

// Save the game status as a boolean by converting it to a string
export function saveGameStatus(status: boolean) {
  localStorage.setItem('gameInProgress', String(status));
}

export function saveSwarm(swarm: Swarm) {
  localStorage.setItem('swarm', JSON.stringify(swarm));
}

export function getSwarm(): Swarm {
  return JSON.parse(localStorage.getItem('swarm') || '{}');
}

export function savePlayerName(name: string) {
  localStorage.setItem('playerName', name);
}

export function getPlayerName(): string {
  return localStorage.getItem('playerName') || '';
}

export function resetGame(): void {
  localStorage.clear();
}

export function updateBeeStorage(bee: Bee) {
  const swarm = getSwarm();
  const beeType = bee.type;
  const beeIndex = swarm[beeType].findIndex((b) => b.id === bee.id);
  console.log('bee', bee);
  if (beeIndex !== -1) { //bee index exist in storage?
    swarm[beeType][beeIndex] = bee;
    saveSwarm(swarm);
  }
}