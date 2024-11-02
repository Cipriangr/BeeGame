import { BeeType, Swarm } from '../config/constants';
import { saveSwarm } from '../services/StorageService';


export function initializeSwarm() {
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