import { BeeType, Swarm } from '../config/constants';
import { getSwarm, getPlayerName } from '../services/StorageService';
import { createBees } from '../components/SwarmComponent';

const swarmSection = document.getElementById('swarm-section');

// Display the player name and swarm
export function displayGameUI() {
    const playerName = getPlayerName();
    const Swarm: Swarm = getSwarm();

    if (swarmSection) {
        const playerNameElement = document.createElement('h3');
        playerNameElement.innerText = `Hey ${playerName.toUpperCase()}! Press Hit to attack the bees`;
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
            createBees(beeType, bees, beeContainer);
            swarmSection.appendChild(beeContainer);
        });
    }
}
