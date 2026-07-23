class CustomButton extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const button = document.createElement('button');
        button.setAttribute('class', 'custom-button');
        button.textContent = this.getAttribute('text');

        const style = document.createElement('style');
        style.textContent = `
            .custom-button {
                background-color: var(--primary-color);
                color: white;
                padding: 1rem 2rem;
                border: none;
                border-radius: 4px;
                font-size: 1rem;
                font-weight: bold;
                cursor: pointer;
                transition: background-color 0.3s ease;
            }

            .custom-button:hover {
                background-color: #0056b3;
            }
        `;

        shadow.appendChild(style);
        shadow.appendChild(button);
    }
}

customElements.define('custom-button', CustomButton);
