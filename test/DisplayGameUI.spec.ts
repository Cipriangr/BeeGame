import { displayGameUI } from '../src/ui/DisplayGameUI';
import { BeeType, Swarm } from '../src/config/constants';
import sinon from 'sinon';

describe('displayGameUI', () => {
    let getSwarmMock: sinon.SinonStub;
    let getPlayerNameMock: sinon.SinonStub;
    let createBeesMock: sinon.SinonStub;
    let swarmSection: HTMLElement;

    const mockSwarm: Swarm = {
        [BeeType.WORKER]: [{ id: 1, isAlive: true, type: BeeType.WORKER, health: 100 }],
        [BeeType.QUEEN]: [{ id: 2, isAlive: true, type: BeeType.QUEEN, health: 100 }],
        [BeeType.DRONE]: [{ id: 3, isAlive: true, type: BeeType.DRONE, health: 100 }]
    };

    beforeEach(() => {
        swarmSection = document.createElement('div');
        swarmSection.id = 'swarm-section';
        document.body.appendChild(swarmSection);

        getSwarmMock = sinon.stub().returns(mockSwarm);
        getPlayerNameMock = sinon.stub().returns('Player1');
        createBeesMock = sinon.stub();
    });

    afterEach(() => {
        sinon.restore();
        document.body.innerHTML = '';
    });

    it('should display player name and append to swarm section', () => {
        displayGameUI({ getSwarm: getSwarmMock, getPlayerName: getPlayerNameMock, createBees: createBeesMock });

        const playerNameElement = document.querySelector('h3');
        expect(playerNameElement).not.toBeNull();
        expect(playerNameElement!.textContent).toBe('Hey Player1! Press Hit to attack the bees');
    });

    it('should clear existing content in swarmSection', () => {
        swarmSection.innerHTML = '<div>Old Content</div>';
        
        displayGameUI({ getSwarm: getSwarmMock, getPlayerName: getPlayerNameMock, createBees: createBeesMock });
        
        expect(swarmSection.innerHTML).not.toContain('Old Content');
    });

    it('should create containers for each bee type and call createBees with correct parameters', () => {
        displayGameUI({ getSwarm: getSwarmMock, getPlayerName: getPlayerNameMock, createBees: createBeesMock });

        // Use class names matching those set in displayGameUI
        const workerContainer = swarmSection.querySelector('.workers');
        const queenContainer = swarmSection.querySelector('.queen'); // 'queen' remains the same
        const droneContainer = swarmSection.querySelector('.drones');

        expect(workerContainer).not.toBeNull();
        expect(queenContainer).not.toBeNull();
        expect(droneContainer).not.toBeNull();

        sinon.assert.calledWith(
            createBeesMock,
            BeeType.WORKER,
            mockSwarm[BeeType.WORKER],
            workerContainer
        );
        sinon.assert.calledWith(
            createBeesMock,
            BeeType.QUEEN,
            mockSwarm[BeeType.QUEEN],
            queenContainer
        );
        sinon.assert.calledWith(
            createBeesMock,
            BeeType.DRONE,
            mockSwarm[BeeType.DRONE],
            droneContainer
        );
    });

    it('should not throw an error if swarmSection is not found', () => {
        document.body.removeChild(swarmSection); // Remove the element to simulate not found

        expect(() => displayGameUI({ getSwarm: getSwarmMock, getPlayerName: getPlayerNameMock, createBees: createBeesMock })).not.toThrow();
    });
});
