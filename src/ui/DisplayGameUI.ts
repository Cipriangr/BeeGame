import { BeeType, Swarm } from '../config/constants';
import { getSwarm as defaultGetSwarm, getPlayerName as defaultGetPlayerName } from '../services/StorageService';
import { createBees as defaultCreateBees } from '../components/SwarmComponent';

interface DisplayGameUIDependencies {
    getSwarm?: () => Swarm;
    getPlayerName?: () => string;
    createBees?: (beeType: BeeType, bees: any[], container: HTMLElement) => void;
}

export function displayGameUI({
    getSwarm = defaultGetSwarm,
    getPlayerName = defaultGetPlayerName,
    createBees = defaultCreateBees
}: DisplayGameUIDependencies = {}): void {
    const swarmSection = document.getElementById('swarm-section');
    const playerName = getPlayerName();
    const Swarm: Swarm = getSwarm();

    if (swarmSection) {
        swarmSection.innerHTML = '';

        const playerNameElement = document.createElement('h3');
        playerNameElement.innerText = `Hey ${playerName}! Press Hit to attack the bees`;
        swarmSection.appendChild(playerNameElement);

        const divMap = {
            [BeeType.WORKER]: document.createElement('div'),
            [BeeType.QUEEN]: document.createElement('div'),
            [BeeType.DRONE]: document.createElement('div'),
        };

        Object.keys(Swarm).forEach((key) => {
            const beeType = key as BeeType;
            const bees = Swarm[beeType] || [];
            const beeContainer = divMap[beeType];
            beeContainer.setAttribute('class', beeType.toLowerCase());
            beeContainer.setAttribute('id', 'bees');

            if (beeContainer) {
                createBees(beeType, bees, beeContainer);
                swarmSection.appendChild(beeContainer);
            }
        });
    }
}
