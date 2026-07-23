document.addEventListener('DOMContentLoaded', () => {

    // --- Navigation active state on scroll ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.main-nav a');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => {
        observer.observe(section);
    });

    // --- Animate confidence bar on load ---
    const confidenceLevel = document.querySelector('.confidence-level');
    if (confidenceLevel) {
        confidenceLevel.style.width = '0%';
        setTimeout(() => {
            confidenceLevel.style.transition = 'width 2s ease-out';
            confidenceLevel.style.width = '85%';
        }, 500);
    }

});
