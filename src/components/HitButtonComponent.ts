import { Swarm, Bee, BeeType, BeeHitDamage } from "../config/constants";
import { alertAndHandleReset, killEntireSwarm, removeBeeDOMElement, updateBee } from "../services/GameService";
import { getSwarm } from "../services/StorageService";

export function hitButtonAction() {
    const hitButton = document.getElementById('hit-button') as HTMLButtonElement;
    if (hitButton) {
        hitButton.addEventListener('click', () => {
            const bees = getSwarm();
            const selectedBee = getRandomBeeType(bees);
            console.log('selectedBee', selectedBee);
            if (!selectedBee) {
                alertAndHandleReset('Game Over! No bees left to hit! The game will be restarted', true);
                return;
            }

            attackBee(selectedBee);
        });
    }
}

function getRandomBeeType(bees: Swarm): Bee | undefined {
    const aliveBees = Object.values(bees)
        .flat() // Flattens arrays so all bees are in one array
        .filter(bee => bee.isAlive); // Keeps only alive bees

    if (aliveBees.length === 0) {
        console.log('No bees left');
        return undefined;
    }

    return aliveBees[Math.floor(Math.random() * aliveBees.length)];
}


function attackBee(bee: Bee) {
    switch (bee.type) { 
        case BeeType.WORKER:
            bee.health -= BeeHitDamage[BeeType.WORKER];
            break;
        case BeeType.DRONE:
            bee.health -= BeeHitDamage[BeeType.DRONE];
            break;
        default:
            bee.health -= BeeHitDamage[BeeType.QUEEN];
    }

    if (bee.health <= 0) {
        bee.health = 0;
        bee.isAlive = false;
        updateBee(bee);

        if (bee.type === BeeType.QUEEN) {
            killEntireSwarm();
            return;
        }

        removeBeeDOMElement(bee);
        return;
    }

    updateBee(bee);
}
