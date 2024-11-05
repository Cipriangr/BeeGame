export function createStartButton(swarmSection: HTMLElement, initializeBees: (button: HTMLButtonElement) => void): HTMLButtonElement {
  const startButton = document.createElement('button');
  startButton.setAttribute('id', 'start-game');
  startButton.setAttribute('class', 'start-button');
  startButton.innerText = 'Start The Game';
  swarmSection.appendChild(startButton);
  initializeBees(startButton);
  return startButton;
}