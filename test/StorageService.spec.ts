import { getGameStatus, saveGameStatus, saveSwarm, getSwarm, savePlayerName, getPlayerName, resetGame, updateBeeStorage } from '../src/services/StorageService';
import { Bee, BeeType, Swarm } from '../src/config/constants';

describe('StorageService', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  describe('getGameStatus', () => {
    it('should return true if gameInProgress is true in localStorage', () => {
      localStorage.setItem('gameInProgress', 'true');
      expect(getGameStatus()).toBe(true);
    });

    it('should return false if gameInProgress is not true in localStorage', () => {
      localStorage.setItem('gameInProgress', 'false');
      expect(getGameStatus()).toBe(false);
    });
  });

  describe('saveGameStatus', () => {
    it('should save the game status as a string in localStorage', () => {
      saveGameStatus(true);
      expect(localStorage.getItem('gameInProgress')).toBe('true');

      saveGameStatus(false);
      expect(localStorage.getItem('gameInProgress')).toBe('false');
    });
  });

  describe('saveSwarm', () => {
    it('should save the swarm as a JSON string in localStorage', () => {
      const swarm: Swarm = {
        Queen: [{ id: 1, type: BeeType.QUEEN, health: 100, isAlive: true }],
        Workers: [{ id: 2, type: BeeType.WORKER, health: 75, isAlive: true }],
        Drones: [{ id: 3, type: BeeType.DRONE, health: 50, isAlive: true }]
      };
      saveSwarm(swarm);
      expect(localStorage.getItem('swarm')).toBe(JSON.stringify(swarm));
    });
  });

  describe('getSwarm', () => {
    it('should return the swarm from localStorage', () => {
      const swarm: Swarm = {
        Queen: [{ id: 1, type: BeeType.QUEEN, health: 100, isAlive: true }],
        Workers: [{ id: 2, type: BeeType.WORKER, health: 75, isAlive: true }],
        Drones: [{ id: 3, type: BeeType.DRONE, health: 50, isAlive: true }]
      };
      localStorage.setItem('swarm', JSON.stringify(swarm));
      expect(getSwarm()).toEqual(swarm);
    });

    it('should return an empty swarm object if swarm is not in localStorage', () => {
      const emptySwarm: Swarm = { Queen: [], Workers: [], Drones: [] };
      expect(getSwarm()).toEqual(emptySwarm);
    });
  });
  
  describe('savePlayerName', () => {
    it('should save the player name in localStorage', () => {
      savePlayerName('Ciprian');
      expect(localStorage.getItem('playerName')).toBe('Ciprian');
    });
  });

  describe('getPlayerName', () => {
    it('should return the player name from localStorage', () => {
      localStorage.setItem('playerName', 'Ciprian');
      expect(getPlayerName()).toBe('Ciprian');
    });

    it('should return an empty string if player name is not in localStorage', () => {
      expect(getPlayerName()).toBe('');
    });
  });

  describe('resetGame', () => {
    it('should clear localStorage', () => {
      localStorage.setItem('gameInProgress', 'true');
      localStorage.setItem('playerName', 'Ciprian');
      resetGame();
      expect(localStorage.getItem('gameInProgress')).toBeNull();
      expect(localStorage.getItem('playerName')).toBeNull();
    });
  });

  describe('updateBeeStorage', () => {
    it('should update the bee in the swarm in localStorage', () => {
      const swarm: Swarm = {
        Queen: [{ id: 1, type: BeeType.QUEEN, health: 100, isAlive: true }],
        Workers: [{ id: 2, type: BeeType.WORKER, health: 75, isAlive: true }],
        Drones: [{ id: 3, type: BeeType.DRONE, health: 50, isAlive: true }]
      };
      localStorage.setItem('swarm', JSON.stringify(swarm));

      const updatedBee: Bee = { id: 2, type: BeeType.WORKER, health: 60, isAlive: true };
      updateBeeStorage(updatedBee);

      const updatedSwarm = getSwarm();
      expect(updatedSwarm.Workers[0].health).toBe(60);
    });

    it('should not update the bee if it does not exist in the swarm', () => {
      const swarm: Swarm = {
        Queen: [{ id: 1, type: BeeType.QUEEN, health: 100, isAlive: true }],
        Workers: [{ id: 2, type: BeeType.WORKER, health: 75, isAlive: true }],
        Drones: [{ id: 3, type: BeeType.DRONE, health: 50, isAlive: true }]
      };
      localStorage.setItem('swarm', JSON.stringify(swarm));

      const nonExistentBee: Bee = { id: 4, type: BeeType.WORKER, health: 60, isAlive: true };
      updateBeeStorage(nonExistentBee);

      const updatedSwarm = getSwarm();
      expect(updatedSwarm.Workers.length).toBe(1);
      expect(updatedSwarm.Workers[0].health).toBe(75);
    });
  });
});