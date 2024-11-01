import { BeeType, Swarm } from '../config/constants';

let Swarm: Swarm[] = [];

export function initializeSwarm() {
  // Initialize the swarm with the following bees:
  // 1 Queen, 5 Workers, and 8 Drones
  // Each bee should have a unique id, starting from 1
  // Each bee should have full health
  // Each bee should be alive
  // The bees should be stored in the Swarm array
  Swarm.push({ 
      Queen: [{ id: 1, type: BeeType.QUEEN, hp: 100, isAlive: true }],
      Workers: [
        { id: 2, type: BeeType.WORKER, hp: 75, isAlive: true },
        { id: 3, type: BeeType.WORKER, hp: 75, isAlive: true },
        { id: 4, type: BeeType.WORKER, hp: 75, isAlive: true },
        { id: 5, type: BeeType.WORKER, hp: 75, isAlive: true },
        { id: 6, type: BeeType.WORKER, hp: 75, isAlive: true }
      ], 
      Drones: [
        { id: 7, type: BeeType.DRONE, hp: 50, isAlive: true },
        { id: 8, type: BeeType.DRONE, hp: 50, isAlive: true },
        { id: 9, type: BeeType.DRONE, hp: 50, isAlive: true },
        { id: 10, type: BeeType.DRONE, hp: 50, isAlive: true },
        { id: 11, type: BeeType.DRONE, hp: 50, isAlive: true },
        { id: 12, type: BeeType.DRONE, hp: 50, isAlive: true },
        { id: 13, type: BeeType.DRONE, hp: 50, isAlive: true },
        { id: 14, type: BeeType.DRONE, hp: 50, isAlive: true }
      ] 
    });
  console.log(Swarm);
}