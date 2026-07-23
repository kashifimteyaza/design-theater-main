const audienceGateway = document.getElementById('audience-gateway');
const contentArea = document.getElementById('content-area');
const audienceButtons = document.querySelectorAll('.options button');

const content = {
    prospective: `
        <prospective-student-view></prospective-student-view>
    `,
    current: `
        <current-student-view></current-student-view>
    `,
    faculty: `
        <faculty-view></faculty-view>
    `,
    alumni: `
        <alumni-view></alumni-view>
    `,
    parents: `
        <parents-view></parents-view>
    `,
};

class WelcomeMessage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const audience = this.getAttribute('audience');
        this.shadowRoot.innerHTML = `
            <style>
                h2 {
                    color: #003366;
                }
            </style>
            <h2>Welcome, ${audience}!</h2>
            <p>Here you will find information relevant to you.</p>
        `;
    }
}

class ProspectiveStudentView extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .grid-container {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 1rem;
                }
                .card {
                    background: #fff;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    padding: 1rem;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                h3 {
                    color: #003366;
                }
            </style>
            <welcome-message audience='Prospective Student'></welcome-message>
            <div class="grid-container">
                <div class="card">
                    <h3>Academic Programs</h3>
                    <ul>
                        <li>Computer Science</li>
                        <li>Liberal Arts</li>
                        <li>Business Administration</li>
                        <li>Fine Arts</li>
                    </ul>
                </div>
                <div class="card">
                    <h3>Campus Life</h3>
                    <p>Explore our vibrant campus community, with over 100 student clubs and organizations.</p>
                </div>
            </div>
        `;
    }
}

class CurrentStudentView extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .quick-links {
                    list-style: none;
                    padding: 0;
                }
                .quick-links li {
                    margin-bottom: 0.5rem;
                }
                .quick-links a {
                    text-decoration: none;
                    color: #003366;
                    font-weight: bold;
                }
            </style>
            <welcome-message audience='Current Student'></welcome-message>
            <h3>Quick Links</h3>
            <ul class="quick-links">
                <li><a href="#">Course Schedule</a></li>
                <li><a href="#">Grades</a></li>
                <li><a href="#">Student Services</a></li>
                <li><a href="#">Library</a></li>
            </ul>
        `;
    }
}

class FacultyView extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .tool-list {
                    list-style: none;
                    padding: 0;
                }
                .tool-list li {
                    margin-bottom: 0.5rem;
                }
                .tool-list a {
                    text-decoration: none;
                    color: #003366;
                    font-weight: bold;
                }
            </style>
            <welcome-message audience='Faculty'></welcome-message>
            <h3>Faculty Resources</h3>
            <ul class="tool-list">
                <li><a href="#">Course Management</a></li>
                <li><a href="#">Teaching Resources</a></li>
                <li><a href="#">Administrative Tools</a></li>
                <li><a href="#">Research Support</a></li>
            </ul>
        `;
    }
}

class AlumniView extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .grid-container {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 1rem;
                }
                .card {
                    background: #fff;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    padding: 1rem;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                h3 {
                    color: #003366;
                }
            </style>
            <welcome-message audience='Alumni'></welcome-message>
            <div class="grid-container">
                <div class="card">
                    <h3>News & Events</h3>
                    <p>Stay up-to-date with the latest news and events from Riverside University.</p>
                </div>
                <div class="card">
                    <h3>Giving</h3>
                    <p>Your support helps us to continue our mission of providing a world-class education.</p>
                    <button>Donate Now</button>
                </div>
            </div>
        `;
    }
}

class ParentsView extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .grid-container {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 1rem;
                }
                .card {
                    background: #fff;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    padding: 1rem;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                h3 {
                    color: #003366;
                }
            </style>
            <welcome-message audience='Parent'></welcome-message>
            <div class="grid-container">
                <div class="card">
                    <h3>Safety & Security</h3>
                    <p>Learn about our commitment to providing a safe and secure campus environment.</p>
                </div>
                <div class="card">
                    <h3>Financial Aid</h3>
                    <p>Explore options for financing your student's education.</p>
                </div>
            </div>
        `;
    }
}


customElements.define('welcome-message', WelcomeMessage);
customElements.define('prospective-student-view', ProspectiveStudentView);
customElements.define('current-student-view', CurrentStudentView);
customElements.define('faculty-view', FacultyView);
customElements.define('alumni-view', AlumniView);
customElements.define('parents-view', ParentsView);

audienceButtons.forEach(button => {
    button.addEventListener('click', () => {
        const audience = button.dataset.audience;
        contentArea.innerHTML = content[audience];
        contentArea.classList.remove('hidden');
        audienceGateway.classList.add('hidden');
    });
});
