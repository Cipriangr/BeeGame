import { initializeSwarm } from '../components/SwarmComponent';
import { Bee, BeeHitDamage, BeeTypeMapping } from '../config/constants';
import { displayGameUI } from '../ui/DisplayGameUI';
import { resetGame, updateBeeStorage } from './StorageService';

export function initializeGame(): void {
    initializeSwarm();
    displayGameUI();
}

export function alertAndHandleReset(message: string, reset?: boolean): void {
    alert(message);
    if (reset) {
        resetGame();
        location.reload();
    }
}


export function updateBee(bee: Bee): void {
    updateBeeDOMElement(bee);
    updateBeeStorage(bee);
}

export function updateBeeDOMElement(bee: Bee): void { 
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

export function damageInfo(bee: Bee): string {
    if (bee.health <= 0) {
        return `${BeeTypeMapping[bee.type]} ${bee.id} was hit with ${BeeHitDamage[bee.type]} damage and is now dead because its health reached 0.`;
    }

    return `You hit ${BeeTypeMapping[bee.type]} ${bee.id} for ${BeeHitDamage[bee.type]} damage`;
}

export function killEntireSwarm(): void {
    alertAndHandleReset('The Queen has died. All bees are dead. The game will restart', true);
}

export function removeBeeDOMElement(bee: Bee): void { 
    const beeElement = document.getElementById(`${bee.id}`) as HTMLElement;
    beeElement.remove();
}