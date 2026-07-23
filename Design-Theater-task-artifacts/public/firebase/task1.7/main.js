class ArticleCard extends HTMLElement {
    constructor() {
        super();
        const template = document.getElementById('article-card-template').content;
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.cloneNode(true));
    }

    connectedCallback() {
        this.shadowRoot.querySelector('h3').innerText = this.getAttribute('title');
        this.shadowRoot.querySelector('p').innerText = this.getAttribute('excerpt');
        this.shadowRoot.querySelector('img').src = this.getAttribute('image');
        this.shadowRoot.querySelector('img').alt = this.getAttribute('title');
        this.shadowRoot.querySelector('.category').innerText = this.getAttribute('category');
    }
}

customElements.define('article-card', ArticleCard);

const articles = [
    { title: 'City Council Approves New Budget', excerpt: 'The new budget focuses on infrastructure and community programs.', category: 'Politics', image: 'https://images.unsplash.com/photo-1541845157-a6d2d100c931?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { title: 'Tech Giant Opens New HQ', excerpt: 'The move is expected to bring thousands of jobs to the area.', category: 'Business', image: 'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { title: 'Local Team Wins Championship', excerpt: 'A stunning victory in the final minutes of the game.', category: 'Sports', image: 'https://images.unsplash.com/photo-1579952516518-6c216a999955?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { title: 'Community Garden Flourishes', excerpt: 'The garden has produced a record harvest this year.', category: 'Community', image: 'https://images.unsplash.com/photo-1588239005917-8493c434d3d3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { title: 'New Art Exhibit Opens Downtown', excerpt: 'The exhibit features local artists and explores themes of identity.', category: 'Community', image: 'https://images.unsplash.com/photo-1501426026826-31c667bdf23d?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
];

function populateTopStories() {
    const topStoriesGrid = document.querySelector('#top-stories .stories-grid');
    articles.slice(0, 2).forEach(article => {
        const articleCard = document.createElement('article-card');
        articleCard.setAttribute('title', article.title);
        articleCard.setAttribute('excerpt', article.excerpt);
        articleCard.setAttribute('image', article.image);
        articleCard.setAttribute('category', article.category);
        topStoriesGrid.appendChild(articleCard);
    });
}

function populateNewsGrid(category = 'all') {
    const newsGrid = document.querySelector('#latest-news .news-grid');
    newsGrid.innerHTML = '';
    const filteredArticles = category === 'all' ? articles : articles.filter(a => a.category.toLowerCase() === category);

    filteredArticles.forEach(article => {
        const articleCard = document.createElement('article-card');
        articleCard.setAttribute('title', article.title);
        articleCard.setAttribute('excerpt', article.excerpt);
        articleCard.setAttribute('image', article.image);
        articleCard.setAttribute('category', article.category);
        newsGrid.appendChild(articleCard);
    });
}

function populateFeaturedContent() {
    const featuredGrid = document.querySelector('#featured-content .featured-grid');
    articles.slice(2, 4).forEach(article => {
        const articleCard = document.createElement('article-card');
        articleCard.setAttribute('title', article.title);
        articleCard.setAttribute('excerpt', article.excerpt);
        articleCard.setAttribute('image', article.image);
        articleCard.setAttribute('category', article.category);
        featuredGrid.appendChild(articleCard);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    populateTopStories();
    populateNewsGrid();
    populateFeaturedContent();

    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            populateNewsGrid(tab.dataset.category);
        });
    });

    const langSwitcher = document.getElementById('lang-switcher');
    langSwitcher.addEventListener('click', () => {
        if (document.documentElement.lang === 'en') {
            document.documentElement.lang = 'es';
            langSwitcher.innerText = 'English';
            // In a real app, you would load translated content here
        } else {
            document.documentElement.lang = 'en';
            langSwitcher.innerText = 'Español';
        }
    });
});
