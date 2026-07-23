const privacyModeToggle = document.getElementById('privacy-mode');
const sensitiveData = document.querySelectorAll('.sensitive'); // This class would be applied to elements with sensitive data

privacyModeToggle.addEventListener('change', function() {
    if (this.checked) {
        sensitiveData.forEach(data => {
            data.style.display = 'none';
        });
    } else {
        sensitiveData.forEach(data => {
            data.style.display = 'block';
        });
    }
});
