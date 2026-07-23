document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.product-card, .mission-content');
hiddenElements.forEach(el => observer.observe(el));

const style = document.createElement('style');
style.innerHTML = `
.product-card, .mission-content {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.product-card.show, .mission-content.show {
    opacity: 1;
    transform: translateY(0);
}
`;
document.head.appendChild(style);