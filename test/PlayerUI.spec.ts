import { createPlayerNameElements } from '../src/ui/PlayerUI';

describe('createPlayerNameElements', () => {
  let swarmSection: HTMLElement;

  beforeEach(() => {
    // Set up the DOM
    document.body.innerHTML = '<div id="swarm-section"></div>';
    swarmSection = document.getElementById('swarm-section') as HTMLElement;
  });

  afterEach(() => {
    // Clean up the DOM
    document.body.innerHTML = '';
  });

  it('should create player name elements', () => {
    createPlayerNameElements(swarmSection);

    const playerNameDiv = document.getElementById('player-name');
    const playerNameLabel = playerNameDiv?.querySelector('label');
    const playerNameInput = playerNameDiv?.querySelector('input');

    expect(playerNameDiv).not.toBeNull();
    expect(playerNameLabel).not.toBeNull();
    expect(playerNameInput).not.toBeNull();
    expect(playerNameLabel?.innerText).toBe('Please Enter your name and press the button below');
  });

  it('should not create player name elements if they already exist', () => {
    // Create the player name elements first
    createPlayerNameElements(swarmSection);

    // Try to create them again to see if they are not duplicated
    createPlayerNameElements(swarmSection);

    // There should still be only one set of player name elements
    const playerNameDivs = document.querySelectorAll('#player-name');
    expect(playerNameDivs.length).toBe(1);
  });
});