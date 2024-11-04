// SwarmComponent.spec.ts

import { initializeSwarm, createBees } from '../src/components/SwarmComponent';
import { BeeType, BeeHealth, BeeTypeMapping } from '../src/config/constants';
import sinon from 'sinon';

describe('SwarmComponent', () => {
    let saveSwarmMock: sinon.SinonStub;

    beforeEach(() => {
        saveSwarmMock = sinon.stub();
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('initializeSwarm', () => {
      it('should save a swarm with the correct structure', () => {
          initializeSwarm(saveSwarmMock);

          const expectedSwarm = {
              Workers: [
                  { id: 2, type: BeeType.WORKER, health: BeeHealth[BeeType.WORKER], isAlive: true },
                  { id: 3, type: BeeType.WORKER, health: BeeHealth[BeeType.WORKER], isAlive: true },
                  { id: 4, type: BeeType.WORKER, health: BeeHealth[BeeType.WORKER], isAlive: true },
                  { id: 5, type: BeeType.WORKER, health: BeeHealth[BeeType.WORKER], isAlive: true },
                  { id: 6, type: BeeType.WORKER, health: BeeHealth[BeeType.WORKER], isAlive: true }
              ],
              Queen: [
                  { id: 1, type: BeeType.QUEEN, health: BeeHealth[BeeType.QUEEN], isAlive: true }
              ],
              Drones: [
                  { id: 7, type: BeeType.DRONE, health: BeeHealth[BeeType.DRONE], isAlive: true },
                  { id: 8, type: BeeType.DRONE, health: BeeHealth[BeeType.DRONE], isAlive: true },
                  { id: 9, type: BeeType.DRONE, health: BeeHealth[BeeType.DRONE], isAlive: true },
                  { id: 10, type: BeeType.DRONE, health: BeeHealth[BeeType.DRONE], isAlive: true },
                  { id: 11, type: BeeType.DRONE, health: BeeHealth[BeeType.DRONE], isAlive: true },
                  { id: 12, type: BeeType.DRONE, health: BeeHealth[BeeType.DRONE], isAlive: true },
                  { id: 13, type: BeeType.DRONE, health: BeeHealth[BeeType.DRONE], isAlive: true },
                  { id: 14, type: BeeType.DRONE, health: BeeHealth[BeeType.DRONE], isAlive: true }
              ]
          };

          sinon.assert.calledOnce(saveSwarmMock);
          sinon.assert.calledWith(saveSwarmMock, expectedSwarm);
      });
    });

    describe('createBees', () => {
        let container: HTMLElement;
        
        beforeEach(() => {
            container = document.createElement('div');
        });

        it('should create DOM elements for each bee with the correct structure', () => {
            const bees = [
                { id: 2, type: BeeType.WORKER, health: 100, isAlive: true },
                { id: 3, type: BeeType.WORKER, health: 100, isAlive: true }
            ];

            createBees(BeeType.WORKER, bees, container);

            const beeElements = container.querySelectorAll('.specific-bee');
            expect(beeElements.length).toBe(2);

            beeElements.forEach((element, index) => {
                const bee = bees[index];
                expect(element.id).toBe(`${bee.id}`);

                const healthBar = element.querySelector('.health-bar');
                expect(healthBar).not.toBeNull();
                expect(healthBar!.innerHTML).toBe(`HP: ${bee.health}`);
                expect(healthBar!.getAttribute('data-health')).toBe(`${bee.health}`);

                const typeSpan = element.querySelector('span');
                expect(typeSpan).not.toBeNull();
                const beeTypeDisplay = BeeTypeMapping[bee.type];
                expect(typeSpan!.innerHTML).toContain(`${beeTypeDisplay} ${bee.id}`);

                const beeImage = element.querySelector('img');
                expect(beeImage).not.toBeNull();
                expect(beeImage!.getAttribute('src')).toBe(`./assets/${beeTypeDisplay.toLowerCase()}.png`);
                expect(beeImage!.getAttribute('class')).toBe(beeTypeDisplay.toLowerCase());
                expect(beeImage!.getAttribute('data-id')).toBe(`${bee.id}`);
            });
        });

        it('should skip bees that are dead with health <= 0', () => {
            const bees = [
                { id: 2, type: BeeType.WORKER, health: 0, isAlive: false },
                { id: 3, type: BeeType.WORKER, health: 100, isAlive: true }
            ];

            createBees(BeeType.WORKER, bees, container);

            const beeElements = container.querySelectorAll('.specific-bee');
            expect(beeElements.length).toBe(1);
            expect(beeElements[0].id).toBe('3');
        });
    });
});
