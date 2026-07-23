class PracticeAreaCard extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const title = this.getAttribute('title');
        const description = this.getAttribute('description');
        const icon = this.getAttribute('icon');

        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'card');

        const content = `
            <style>
                .card {
                    text-align: left;
                }
                .card h3 {
                    font-size: 1.5rem;
                    margin-top: 1rem;
                    color: #0A2342;
                }
                .card p {
                    color: #555;
                }
                .card img {
                    width: 50px;
                    height: 50px;
                }
            </style>
            <img src="${icon}" alt="${title} icon">
            <h3>${title}</h3>
            <p>${description}</p>
        `;

        wrapper.innerHTML = content;
        shadow.appendChild(wrapper);
    }
}

customElements.define('practice-area-card', PracticeAreaCard);

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Fade-in effect on scroll
const sections = document.querySelectorAll('section');

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    section.style.opacity = 0;
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
});
