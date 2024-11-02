export function createPlayerNameElements(swarmSection: HTMLElement) {
  if (document.getElementById('player-name-div')) return;

  const playerNameDiv = document.createElement('div');
  playerNameDiv.setAttribute('id', 'player-name');

  const playerNameLabel = document.createElement('label');
  playerNameLabel.setAttribute('for', 'player-name');
  playerNameLabel.innerText = 'Please Enter your name and press the button below';

  const playerNameInput = document.createElement('input');
  playerNameInput.setAttribute('type', 'text');
  playerNameInput.setAttribute('id', 'player-name-input');
  playerNameInput.setAttribute('placeholder', 'Enter your name');

  playerNameDiv.appendChild(playerNameLabel);
  playerNameDiv.appendChild(playerNameInput);
  swarmSection.appendChild(playerNameDiv);
}
