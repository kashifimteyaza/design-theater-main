
class MentorCard extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                .mentor-card {
                    background-color: var(--card-background);
                    border-radius: 10px;
                    box-shadow: 0 4px 8px var(--shadow-color);
                    padding: 1.5rem;
                    text-align: center;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                .mentor-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 8px 16px var(--shadow-color);
                }
                .avatar {
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    object-fit: cover;
                    margin-bottom: 1rem;
                }
                .name {
                    font-size: 1.2rem;
                    font-weight: bold;
                    margin-bottom: 0.5rem;
                }
                .title {
                    font-size: 0.9rem;
                    color: #777;
                    margin-bottom: 1rem;
                }
                .description {
                    font-size: 1rem;
                }
            </style>
            <div class="mentor-card">
                <img class="avatar" src="${this.getAttribute('avatar')}" alt="${this.getAttribute('name')}">
                <div class="name">${this.getAttribute('name')}</div>
                <div class="title">${this.getAttribute('title')}</div>
                <div class="description">
                    <slot></slot>
                </div>
            </div>
        `;

        shadow.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('mentor-card', MentorCard);
