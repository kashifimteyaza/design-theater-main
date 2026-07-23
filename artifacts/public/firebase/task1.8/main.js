document.addEventListener('DOMContentLoaded', function () {
    const increaseTextButton = document.getElementById('increase-text');
    const decreaseTextButton = document.getElementById('decrease-text');
    const body = document.body;

    increaseTextButton.addEventListener('click', () => {
        changeFontSize(1.1);
    });

    decreaseTextButton.addEventListener('click', () => {
        changeFontSize(0.9);
    });

    function changeFontSize(multiplier) {
        const currentSize = parseFloat(window.getComputedStyle(body, null).getPropertyValue('font-size'));
        body.style.fontSize = (currentSize * multiplier) + 'px';
    }

    // Simulate an emergency to show the banner
    showEmergencyAlert();

    function showEmergencyAlert() {
        const alertSection = document.getElementById('emergency-alert');
        alertSection.style.display = 'block';
    }
});