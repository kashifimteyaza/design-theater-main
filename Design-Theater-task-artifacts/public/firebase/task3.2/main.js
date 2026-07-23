class NavBar extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.innerHTML = `
            <style>
                nav {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1rem 2rem;
                    background-color: #fff;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                }
                .logo { font-family: var(--font-heading); font-size: 1.5rem; color: var(--primary-color); }
                ul { list-style: none; display: flex; gap: 1rem; }
                a { text-decoration: none; color: var(--neutral-dark); font-weight: bold; }
                .button { background-color: var(--primary-color); color: #fff; padding: 0.5rem 1rem; border-radius: 5px; }
            </style>
            <nav>
                <div class="logo">EduConnect</div>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Tutors</a></li>
                    <li><a href="#">About</a></li>
                </ul>
                <a href="#" class="button">Sign Up</a>
            </nav>
        `;
    }
}
customElements.define('nav-bar', NavBar);

class HeroSection extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.innerHTML = `
            <style>
                section {
                    text-align: center;
                    padding: 4rem 2rem;
                }
                h1 { font-family: var(--font-heading); font-size: 3rem; margin-bottom: 1rem; }
                p { font-size: 1.2rem; margin-bottom: 2rem; }
                .button { background-color: var(--secondary-color); color: #fff; padding: 1rem 2rem; border-radius: 5px; text-decoration: none; font-weight: bold; }
            </style>
            <section>
                <h1>Find Your Perfect Tutor</h1>
                <p>Unlock your potential with expert one-on-one tutoring.</p>
                <a href="#" class="button">Browse Tutors</a>
            </section>
        `;
    }
}
customElements.define('hero-section', HeroSection);

class TutorCard extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.innerHTML = `
            <style>
                .card {
                    background-color: #fff;
                    border-radius: 15px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                    padding: 1.5rem;
                    transition: transform 0.3s;
                }
                .card:hover { transform: translateY(-10px); }
                img { width: 100px; height: 100px; border-radius: 50%; object-fit: cover; margin-bottom: 1rem; }
                h3 { font-family: var(--font-heading); margin-bottom: 0.5rem; }
                .subjects { color: var(--primary-color); font-weight: bold; margin-bottom: 1rem; }
                .rate { font-size: 1.2rem; font-weight: bold; }
            </style>
            <div class="card">
                <img src="${this.getAttribute('avatar')}" alt="Tutor Avatar">
                <h3>${this.getAttribute('name')}</h3>
                <div class="subjects">${this.getAttribute('subjects')}</div>
                <div class="rate">$${this.getAttribute('rate')}/hour</div>
            </div>
        `;
    }
}
customElements.define('tutor-card', TutorCard);

// Mock Data
const tutors = [
    {
        name: 'John Doe',
        subjects: 'SAT Prep, Math',
        rate: 50,
        avatar: 'https://i.pravatar.cc/100?u=1'
    },
    {
        name: 'Jane Smith',
        subjects: 'Science, Essay Writing',
        rate: 45,
        avatar: 'https://i.pravatar.cc/100?u=2'
    },
    {
        name: 'Peter Jones',
        subjects: 'Math, Physics',
        rate: 55,
        avatar: 'https://i.pravatar.cc/100?u=3'
    }
];

const tutorList = document.querySelector('.tutor-list');
tutors.forEach(tutor => {
    const tutorCard = document.createElement('tutor-card');
    tutorCard.setAttribute('name', tutor.name);
    tutorCard.setAttribute('subjects', tutor.subjects);
    tutorCard.setAttribute('rate', tutor.rate);
    tutorCard.setAttribute('avatar', tutor.avatar);
    tutorList.appendChild(tutorCard);
});
