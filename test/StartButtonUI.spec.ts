import { createStartButton } from '../src/ui/StartButtonUI';

describe('createStartButton', () => {
  let swarmSection: HTMLElement;
  let initializeBeesMock: jasmine.Spy;

  beforeEach(() => {
    document.body.innerHTML = '<div id="swarm-section"></div>';
    swarmSection = document.getElementById('swarm-section') as HTMLElement;

    initializeBeesMock = jasmine.createSpy('initializeBees');
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should create a start button and append it to the swarm section', () => {
    const startButton = createStartButton(swarmSection, initializeBeesMock);

    const appendedButton = document.getElementById('start-game');
    expect(appendedButton).not.toBeNull();
    expect(appendedButton?.innerText).toBe('Start The Game');
    expect(appendedButton).toBe(startButton);
  });

  it('should call initializeBees with the created start button', () => {
    const startButton = createStartButton(swarmSection, initializeBeesMock);

    expect(initializeBeesMock).toHaveBeenCalledWith(startButton);
  });
});