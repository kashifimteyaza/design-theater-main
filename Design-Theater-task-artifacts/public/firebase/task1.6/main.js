class ShopLocalHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    background-color: var(--secondary-color);
                    padding: 1rem 2rem;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                }
                .header-content {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .logo {
                    font-family: var(--heading-font);
                    font-size: 1.8rem;
                    color: var(--primary-color);
                    text-decoration: none;
                }
                nav a {
                    margin: 0 1rem;
                    text-decoration: none;
                    color: var(--text-color);
                    font-weight: bold;
                }
                 .user-actions a {
                    margin-left: 1rem;
                }
            </style>
            <header class="header-content">
                <a href="#" class="logo">ShopLocal</a>
                <nav>
                    <a href="#">Shop</a>
                    <a href="#">Our Sellers</a>
                    <a href="#">About Us</a>
                </nav>
                <div class="user-actions">
                     <a href="#">Sign In</a>
                     <a href="#" class="cta-button">Become a Seller</a>
                </div>
            </header>
        `;
    }
}

class ShopLocalFooter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
               :host {
                    display: block;
                    background-color: #333;
                    color: white;
                    padding: 2rem;
                    text-align: center;
                }
                .footer-links a {
                    color: white;
                    text-decoration: none;
                    margin: 0 1rem;
                }
                .admin-login {
                    margin-top: 1rem;
                    font-size: 0.8rem;
                }
            </style>
            <footer>
                <div class="footer-links">
                    <a href="#">About</a>
                    <a href="#">FAQ</a>
                    <a href="#">Contact</a>
                    <a href="#">Accessibility</a>
                </div>
                 <div class="admin-login">
                    <a href="#">Admin Login</a>
                </div>
            </footer>
        `;
    }
}

class ProductCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const image = this.getAttribute('image');
        const name = this.getAttribute('name');
        const seller = this.getAttribute('seller');
        const price = this.getAttribute('price');

        this.shadowRoot.innerHTML = `
            <style>
                .product-card {
                    background: white;
                    border-radius: 8px;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                    overflow: hidden;
                    transition: all 0.3s ease;
                    cursor: pointer;
                }
                .product-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
                }
                .product-image img {
                    width: 100%;
                    height: 200px;
                    object-fit: cover;
                }
                .product-info {
                    padding: 1rem;
                }
                 h3 {
                    margin: 0;
                    font-size: 1.2rem;
                }
                .seller {
                    color: #777;
                    margin-bottom: 0.5rem;
                }
                .price {
                    font-weight: bold;
                    color: var(--primary-color);
                }
            </style>
            <div class="product-card">
                <div class="product-image">
                    <img src="${image}" alt="${name}">
                </div>
                <div class="product-info">
                    <h3>${name}</h3>
                    <p class="seller">${seller}</p>
                    <p class="price">${price}</p>
                </div>
            </div>
        `;
    }
}

customElements.define('shoplocal-header', ShopLocalHeader);
customElements.define('shoplocal-footer', ShopLocalFooter);
customElements.define('product-card', ProductCard);