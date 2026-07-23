class FilmCard extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'film-card-inner');

        const poster = document.createElement('img');
        poster.setAttribute('src', this.getAttribute('poster'));
        poster.setAttribute('alt', this.getAttribute('title'));

        const title = document.createElement('h3');
        title.textContent = this.getAttribute('title');

        const style = document.createElement('style');
        style.textContent = `
            .film-card-inner {
                position: relative;
                cursor: pointer;
            }
            img {
                width: 100%;
                height: auto;
                display: block;
            }
            h3 {
                position: absolute;
                bottom: 10px;
                left: 10px;
                color: #fff;
                margin: 0;
                font-size: 1.2em;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
            }
        `;

        shadow.appendChild(style);
        shadow.appendChild(wrapper);
        wrapper.appendChild(poster);
        wrapper.appendChild(title);
    }
}

customElements.define('film-card', FilmCard);

// Active navigation link
const navLinks = document.querySelectorAll('nav a');

navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        this.classList.add('active');
    });
});
