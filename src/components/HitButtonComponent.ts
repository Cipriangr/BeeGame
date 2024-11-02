export function hitButtonAction() {
    const hitButton = document.getElementById('hit-button');
    if (hitButton) {
        hitButton.addEventListener('click', () => {
            console.log('Hit button clicked');
        });
    }
}