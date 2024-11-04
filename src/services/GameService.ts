import { AlertMessage, Bee, BeeHitDamage, BeeTypeMapping } from '../config/constants';
import { resetGame, updateBeeStorage } from './StorageService';

export const dependencies = {
    resetGame,
    updateBeeStorage,
    reloadPage: () => window.location.reload(),
};

export function alertAndHandleReset(message: string, reset?: boolean): void {
    alert(message);
    if (reset) {
        dependencies.resetGame();
        dependencies.reloadPage();
    }
}

export function updateBee(bee: Bee): void {
    dependencies.updateBeeStorage(bee);
    updateBeeDOMElement(bee);
}

export function updateBeeDOMElement(bee: Bee): void {
    const beeElement = document.getElementById(`${bee.id}`);
    if (!beeElement) return;

    const healthBar = beeElement.querySelector('.health-bar') as HTMLElement;
    healthBar.innerHTML = `HP: ${bee.health}`;
    healthBar.setAttribute('data-health', `${bee.health}`);

    beeElement.classList.add('enlarge-translate');
    setTimeout(() => beeElement.classList.remove('enlarge-translate'), 1500);

    const attackInfo = document.getElementById('attack-info');
    if (attackInfo) {
        attackInfo.innerHTML = damageInfo(bee);
    }
}

export function damageInfo(bee: Bee): string {
    if (bee.health <= 0) {
        return `${BeeTypeMapping[bee.type]} ${bee.id} was hit with ${BeeHitDamage[bee.type]} damage and is now dead because its health reached 0.`;
    }
    return `You hit ${BeeTypeMapping[bee.type]} ${bee.id} for ${BeeHitDamage[bee.type]} damage`;
}

export function killEntireSwarm(): void {
    alertAndHandleReset(AlertMessage.QUEEN_DEAD, true);
}

export function removeBeeDOMElement(bee: Bee): void { 
    const beeElement = document.getElementById(`${bee.id}`) as HTMLElement;
    beeElement.remove();
}