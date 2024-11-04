describe('Display Game UI', () => { 
  let swarmSection;
  beforeEach(() => {
    document.body.innerHTML = '<div id="swarm-section"></div>';
    swarmSection = document.getElementById('swarm-section');

    spyOn(document, getElementById).and.returnValue(swarmSection);
    spyOn(StorageService, 'getPlayerName').and.returnValue('Ciprian');
    spyOn(StorageService, 'getSwarm').and.returnValue({
        [BeeType.WORKER]: [
          { id: 2, isAlive: true },
          { id: 3, isAlive: true },
          { id: 4, isAlive: true }
        ],
        [BeeType.QUEEN]: [{ id: 1, isAlive: true }],
        [BeeType.DRONE]: [
          { id: 5, isAlive: true },
          { id: 6, isAlive: true },
          { id: 7, isAlive: true }
        ]
    });
  });

  it('should clear the swarm section', () => {
    swarmSection.apeendChild(document.createElement('div'));
    displayGameUI();
    expect(swarmSection.children.length).toBe(4);
  });

});