import { hitButtonAction } from '../src/components/HitButtonComponent';
import { Swarm, Bee, BeeType } from '../src/config/constants';
import sinon from 'sinon';

describe('HitButtonAction', () => {
    let alertAndHandleResetMock: sinon.SinonStub;
    let updateBeeMock: sinon.SinonStub;
    let killEntireSwarmMock: sinon.SinonStub;
    let removeBeeDOMElementMock: sinon.SinonStub;
    let bees: Swarm;
    let getSwarmMock: sinon.SinonStub;

    let mockWorkerBee: Bee;
    let mockDroneBee: Bee;
    let mockQueenBee: Bee;

    beforeEach(() => {
        document.body.innerHTML = `<button id="hit-button">Hit</button>`;

        // Reinitialize mock bees
        mockWorkerBee = {
            id: 1,
            type: BeeType.WORKER,
            health: 75,
            isAlive: true,
        };

        mockDroneBee = {
            id: 2,
            type: BeeType.DRONE,
            health: 50,
            isAlive: true,
        };

        mockQueenBee = {
            id: 3,
            type: BeeType.QUEEN,
            health: 100,
            isAlive: true,
        };

        bees = {
            Workers: [mockWorkerBee],
            Drones: [mockDroneBee],
            Queen: [mockQueenBee],
        };

        getSwarmMock = sinon.stub().returns(bees);
        alertAndHandleResetMock = sinon.stub();
        updateBeeMock = sinon.stub();
        killEntireSwarmMock = sinon.stub();
        removeBeeDOMElementMock = sinon.stub();

        hitButtonAction(getSwarmMock, {
            alertAndHandleReset: alertAndHandleResetMock,
            updateBee: updateBeeMock,
            killEntireSwarm: killEntireSwarmMock,
            removeBeeDOMElement: removeBeeDOMElementMock,
        });
    });

    afterEach(() => {
        sinon.restore();
        document.body.innerHTML = '';
    });

    describe('When hitButton is clicked', () => {
        it('should attack a random bee if there are alive bees', () => {
            const hitButton = document.getElementById('hit-button') as HTMLButtonElement;

            hitButton.click();

            sinon.assert.calledOnce(getSwarmMock);
            sinon.assert.called(updateBeeMock);
        });

        it('should call alertAndHandleReset when no bees are left', () => {
            bees = {
                Workers: [],
                Drones: [],
                Queen: [],
            };
            getSwarmMock.returns(bees);

            const hitButton = document.getElementById('hit-button') as HTMLButtonElement;
            hitButton.click();

            sinon.assert.calledWith(
                alertAndHandleResetMock,
                'Game Over! No bees left to hit! The game will be restarted',
                true
            );
        });

        it('should decrease worker bee health when attacked', () => {
            bees = { Workers: [mockWorkerBee], Drones: [], Queen: [] };
            getSwarmMock.returns(bees);

            const initialHealth = mockWorkerBee.health;
            const hitButton = document.getElementById('hit-button') as HTMLButtonElement;
            hitButton.click();

            expect(mockWorkerBee.health).toBeLessThan(initialHealth);
            sinon.assert.calledWith(updateBeeMock, mockWorkerBee);
        });

        it('should decrease drone bee health when attacked', () => {
            bees = { Workers: [], Drones: [mockDroneBee], Queen: [] };
            getSwarmMock.returns(bees);

            const initialHealth = mockDroneBee.health;
            const hitButton = document.getElementById('hit-button') as HTMLButtonElement;
            hitButton.click();

            expect(mockDroneBee.health).toBeLessThan(initialHealth);
            sinon.assert.calledWith(updateBeeMock, mockDroneBee);
        });

        it('should decrease queen bee health and kill entire swarm if queen is dead', () => {
            bees = { Workers: [], Drones: [], Queen: [mockQueenBee] };
            getSwarmMock.returns(bees);

            // Set queen's health low enough to die
            mockQueenBee.health = 8;

            const hitButton = document.getElementById('hit-button') as HTMLButtonElement;
            hitButton.click();

            sinon.assert.calledOnce(killEntireSwarmMock);
            sinon.assert.calledWith(updateBeeMock, mockQueenBee);
        });

        it('should call removeBeeDOMElement when a bee dies', () => {
            mockWorkerBee.health = 10;
            bees = { Workers: [mockWorkerBee], Drones: [], Queen: [] };
            getSwarmMock.returns(bees);

            const hitButton = document.getElementById('hit-button') as HTMLButtonElement;
            hitButton.click();

            sinon.assert.calledOnce(removeBeeDOMElementMock);
            sinon.assert.calledWith(updateBeeMock, mockWorkerBee);
        });
    });
});
