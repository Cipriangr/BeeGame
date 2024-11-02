import { BeeType, Swarm } from '../config/constants';
import { saveSwarm } from '../services/StorageService';


export function initializeSwarm(): void {
  const Swarm = {
    Workers: [
      { id: 2, type: BeeType.WORKER, health: 75, isAlive: true },
      { id: 3, type: BeeType.WORKER, health: 75, isAlive: true },
      { id: 4, type: BeeType.WORKER, health: 75, isAlive: true },
      { id: 5, type: BeeType.WORKER, health: 75, isAlive: true },
      { id: 6, type: BeeType.WORKER, health: 75, isAlive: true }
    ],
    Queen: [{ id: 1, type: BeeType.QUEEN, health: 100, isAlive: true }],
    Drones: [
      { id: 7, type: BeeType.DRONE, health: 50, isAlive: true },
      { id: 8, type: BeeType.DRONE, health: 50, isAlive: true },
      { id: 9, type: BeeType.DRONE, health: 50, isAlive: true },
      { id: 10, type: BeeType.DRONE, health: 50, isAlive: true },
      { id: 11, type: BeeType.DRONE, health: 50, isAlive: true },
      { id: 12, type: BeeType.DRONE, health: 50, isAlive: true },
      { id: 13, type: BeeType.DRONE, health: 50, isAlive: true },
      { id: 14, type: BeeType.DRONE, health: 50, isAlive: true }
    ]
  };
    saveSwarm(Swarm);
  console.log(Swarm);
}

// Function to create and render bees in the DOM
export function createBees(beeType: BeeType, bees: { id: number, health: number }[], container: HTMLElement) {
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
    beeImage.setAttribute('id', `${bee.id}`);
    beeImage.setAttribute('data-id', `${bee.id}`);
    specificBee.appendChild(beeImage);

    container.appendChild(specificBee);
  });
}