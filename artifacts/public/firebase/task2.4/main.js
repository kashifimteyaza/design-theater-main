// JavaScript for Luxe Verde - adding subtle animations

const animatedElements = document.querySelectorAll('.hero h1, .hero p, .brand-story, .sustainability, .product-card');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `fadeInUp 1s ${entry.target.dataset.delay || '0s'} forwards`;
        }
    });
}, { threshold: 0.1 });

animatedElements.forEach((element, index) => {
    element.style.opacity = '0'; // Hide elements initially
    element.style.animationFillMode = 'forwards';
    element.dataset.delay = `${index * 0.1}s`;
    observer.observe(element);
});

// Add keyframes to the stylesheet
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`, styleSheet.cssRules.length);
