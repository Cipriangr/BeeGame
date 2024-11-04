import * as GameService from '../src/services/GameService';
import { BeeType, BeeHitDamage, BeeTypeMapping } from '../src/config/constants';
import sinon from 'sinon';

describe('GameService', () => {
    let alertSpy: sinon.SinonSpy;
    let reloadStub: sinon.SinonStub;
    let resetGameStub: sinon.SinonStub;
    let updateBeeStorageStub: sinon.SinonStub;

    const mockBee = {
        id: 1,
        type: BeeType.QUEEN,
        health: 100,
        isAlive: true
    };

    beforeEach(() => {
        alertSpy = sinon.spy(window, 'alert');
        reloadStub = sinon.stub(GameService.dependencies, 'reloadPage');
        resetGameStub = sinon.stub(GameService.dependencies, 'resetGame');
        updateBeeStorageStub = sinon.stub(GameService.dependencies, 'updateBeeStorage');

        // DOM Setup for Tests
        document.body.innerHTML = `
            <div id="1">
                <div class="health-bar" data-health="100">HP: 100</div>
            </div>
            <div id="attack-info"></div>
        `;
    });

    afterEach(() => {
        sinon.restore();
        document.body.innerHTML = ''; // Clean up DOM between tests
    });

    describe('alertAndHandleReset', () => {
        it('should call alert with the provided message', () => {
            GameService.alertAndHandleReset('Test message', false);
            sinon.assert.calledWith(alertSpy, 'Test message');
        });

        it('should call resetGame and reload when reset is true', () => {
            GameService.alertAndHandleReset('Test message', true);
            sinon.assert.calledOnce(resetGameStub);
            sinon.assert.calledOnce(reloadStub);
        });

        it('should not call resetGame or reload when reset is false', () => {
            GameService.alertAndHandleReset('Test message', false);
            sinon.assert.notCalled(resetGameStub);
            sinon.assert.notCalled(reloadStub);
        });
    });

    describe('updateBee', () => {
        it('should call updateBeeStorage and modify DOM elements', () => {
            GameService.updateBee(mockBee);
            sinon.assert.calledWith(updateBeeStorageStub, mockBee);

            const healthBar = document.querySelector('.health-bar') as HTMLElement;
            expect(healthBar.innerHTML).toBe(`HP: ${mockBee.health}`);
            expect(healthBar.getAttribute('data-health')).toBe(String(mockBee.health));
        });
    });

    describe('updateBeeDOMElement', () => {
        it('should update health bar text and data attribute', () => {
            GameService.updateBeeDOMElement(mockBee);
            const healthBar = document.querySelector('.health-bar') as HTMLElement;
            expect(healthBar.innerHTML).toBe(`HP: ${mockBee.health}`);
            expect(healthBar.getAttribute('data-health')).toBe(String(mockBee.health));
        });

        it('should add and remove enlarge-translate class', (done) => {
          const beeElement = document.getElementById('1') as HTMLElement;
          GameService.updateBeeDOMElement(mockBee);
          expect(beeElement.classList.contains('enlarge-translate')).toBeTrue();
      
          setTimeout(() => {
              expect(beeElement.classList.contains('enlarge-translate')).toBeFalse();
              done();
          }, 1600);
        });

        it('should set attack-info innerHTML with damage info', () => {
          GameService.updateBeeDOMElement(mockBee);
          const attackInfo = document.getElementById('attack-info') as HTMLElement;
          expect(attackInfo.innerHTML).toBe(GameService.damageInfo(mockBee));
      });
    });

    describe('damageInfo', () => {
        it('should return death message for dead bee', () => {
            const deadBee = { ...mockBee, health: 0 };
            const expected = `${BeeTypeMapping[deadBee.type]} ${deadBee.id} was hit with ${BeeHitDamage[deadBee.type]} damage and is now dead because its health reached 0.`;
            expect(GameService.damageInfo(deadBee)).toBe(expected);
        });

        it('should return hit message for alive bee', () => {
            const expected = `You hit ${BeeTypeMapping[mockBee.type]} ${mockBee.id} for ${BeeHitDamage[mockBee.type]} damage`;
            expect(GameService.damageInfo(mockBee)).toBe(expected);
        });
    });
});
