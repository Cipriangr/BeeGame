export function getGameStatus(): boolean {
  const status = localStorage.getItem('gameInProgress');
  return status === 'true';
}

// Save the game status as a boolean by converting it to a string
export function saveGameStatus(status: boolean) {
  localStorage.setItem('gameInProgress', String(status));
}