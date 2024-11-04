import { Swarm, Bee, BeeType, BeeHitDamage, AlertMessage } from "../config/constants";
import { alertAndHandleReset, killEntireSwarm, removeBeeDOMElement, updateBee } from "../services/GameService";
import { getSwarm } from "../services/StorageService";

interface GameServiceDependencies {
    alertAndHandleReset?: typeof alertAndHandleReset;
    killEntireSwarm?: typeof killEntireSwarm;
    removeBeeDOMElement?: typeof removeBeeDOMElement;
    updateBee?: typeof updateBee;
}

export function hitButtonAction(
    getSwarmFn: () => Swarm = getSwarm,
    dependencies: GameServiceDependencies = {}
) {
    const {
        alertAndHandleReset: alertAndHandleResetFn = alertAndHandleReset,
        killEntireSwarm: killEntireSwarmFn = killEntireSwarm,
        removeBeeDOMElement: removeBeeDOMElementFn = removeBeeDOMElement,
        updateBee: updateBeeFn = updateBee,
    } = dependencies;

    const hitButton = document.getElementById('hit-button') as HTMLButtonElement;
    if (hitButton) {
        hitButton.addEventListener('click', () => {
            const bees = getSwarmFn();
            const selectedBee = getRandomBeeType(bees);
            if (!selectedBee) {
                alertAndHandleResetFn(AlertMessage.GAME_OVER, true);
                return;
            }

            attackBee(selectedBee, {
                updateBee: updateBeeFn,
                killEntireSwarm: killEntireSwarmFn,
                removeBeeDOMElement: removeBeeDOMElementFn,
            });
        });
    }
}

function getRandomBeeType(bees: Swarm): Bee | undefined {
    const aliveBees = Object.values(bees)
        .flat()
        .filter(bee => bee.isAlive);

    if (aliveBees.length === 0) {
        return undefined;
    }

    return aliveBees[Math.floor(Math.random() * aliveBees.length)];
}

interface AttackBeeDependencies {
    updateBee: typeof updateBee;
    killEntireSwarm: typeof killEntireSwarm;
    removeBeeDOMElement: typeof removeBeeDOMElement;
}

function attackBee(bee: Bee, deps: AttackBeeDependencies) {
    const { updateBee, killEntireSwarm, removeBeeDOMElement } = deps;

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
