import { Swarm, Bee, BeeType, BeeHitDamage, BeeTypeMapping } from "../config/constants";
import { alertAndHandleReset } from "../services/GameService";
import { getSwarm, updateBeeStorage } from "../services/StorageService";

export function hitButtonAction() {
    const hitButton = document.getElementById('hit-button') as HTMLButtonElement;
    if (hitButton) {
        hitButton.addEventListener('click', () => {
            //I want to make the button disabled for 1 second after it is clicked
            // hitButton.disabled = true;

            const bees = getSwarm();
            const selectedBee = getRandomBeeType(bees);
            console.log('selectedBee', selectedBee);
            if (!selectedBee) {
                alertAndHandleReset('Game Over! No bees left to hit! The game will be restarted', true);
                return;
            }

            attackBee(selectedBee);

            // setTimeout(() => {  
            //     hitButton.disabled = false;
            // }, 1500);
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

function updateBee(bee: Bee) {
    updateBeeDOMElement(bee);
    updateBeeStorage(bee);
}

function updateBeeDOMElement(bee: Bee) { 
    const beeElement = document.getElementById(`${bee.id}`) as HTMLElement;
    if (!beeElement) return;

    const beeInfo = document.getElementById('attack-info') as HTMLElement;
    if (beeInfo) {
        beeInfo.innerHTML = damageInfo(bee);
    }

    const healthBar = beeElement.querySelector('.health-bar') as HTMLElement;
    healthBar.innerHTML = `HP: ${bee.health}`;
    healthBar.setAttribute('data-health', `${bee.health}`);

    beeElement.classList.add('enlarge-translate');

    // Remove the class after 1 second to reset the transformation
    setTimeout(() => {
        beeElement.classList.remove('enlarge-translate');
    }, 1500);
}

function damageInfo(bee: Bee): string {
    if (bee.health <= 0) {
        return `${BeeTypeMapping[bee.type]} ${bee.id} was hit with ${BeeHitDamage[bee.type]} damage and is now dead because its health reached 0.`;
    }

    return `You hit ${BeeTypeMapping[bee.type]} ${bee.id} for ${BeeHitDamage[bee.type]} damage`;
}

function killEntireSwarm(): void {
    alertAndHandleReset('The Queen has died. All bees are dead. The game will restart', true);
}

function removeBeeDOMElement(bee: Bee) { 
    const beeElement = document.getElementById(`${bee.id}`) as HTMLElement;
    beeElement.remove();
}
