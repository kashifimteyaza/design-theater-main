
class CustomButton extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const button = document.createElement('button');
        button.textContent = this.textContent;
        const style = document.createElement('style');
        style.textContent = `
            button {
                background-color: #F5A623;
                color: #FFFFFF;
                border: none;
                padding: 15px 30px;
                font-size: 16px;
                font-weight: 600;
                border-radius: 8px;
                cursor: pointer;
                transition: background-color 0.3s ease;
            }

            button:hover {
                background-color: #d98e1f;
            }
        `;
        shadow.appendChild(style);
        shadow.appendChild(button);
    }
}

customElements.define('custom-button', CustomButton);
