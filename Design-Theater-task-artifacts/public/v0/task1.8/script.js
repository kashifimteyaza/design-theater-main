// ========== LANGUAGE MANAGEMENT ==========
let currentLanguage = 'en';

const translations = {
    en: {
        'nav-services': 'Services',
        'nav-track': 'Track Request',
        'nav-saved': 'Saved Forms',
        'nav-help': 'Help & FAQs',
    },
    es: {
        'nav-services': 'Servicios',
        'nav-track': 'Rastrear Solicitud',
        'nav-saved': 'Formularios Guardados',
        'nav-help': 'Preguntas Frecuentes',
    }
};

function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'es' : 'en';
    document.documentElement.lang = currentLanguage;
    localStorage.setItem('preferredLanguage', currentLanguage);
    updateLanguageUI();
    announceToScreenReader(currentLanguage === 'en' ? 'Language switched to English' : 'Idioma cambiado a español');
}

function updateLanguageUI() {
    const button = document.getElementById('language-toggle');
    button.textContent = currentLanguage === 'en' ? 'Español' : 'English';
    
    Object.keys(translations[currentLanguage]).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            element.textContent = translations[currentLanguage][key];
        }
    });
}

function initializeLanguage() {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
        currentLanguage = savedLanguage;
        document.documentElement.lang = currentLanguage;
    }
    updateLanguageUI();
}

// ========== TEXT SIZE MANAGEMENT ==========
let currentTextSize = 0; // -1 = small, 0 = normal, 1 = large, 2 = extra large

function adjustTextSize(change) {
    currentTextSize = Math.max(-1, Math.min(2, currentTextSize + change));
    localStorage.setItem('textSize', currentTextSize);
    applyTextSize();
    announceToScreenReader(`Text size adjusted`);
}

function resetTextSize() {
    currentTextSize = 0;
    localStorage.setItem('textSize', currentTextSize);
    applyTextSize();
    announceToScreenReader('Text size reset to normal');
}

function applyTextSize() {
    document.body.classList.remove('text-size-decrease', 'text-size-increase', 'text-size-increase-2');
    if (currentTextSize === -1) {
        document.body.classList.add('text-size-decrease');
    } else if (currentTextSize === 1) {
        document.body.classList.add('text-size-increase');
    } else if (currentTextSize === 2) {
        document.body.classList.add('text-size-increase-2');
    }
}

function initializeTextSize() {
    const saved = localStorage.getItem('textSize');
    if (saved !== null) {
        currentTextSize = parseInt(saved);
    }
    applyTextSize();
}

// ========== CONTRAST MODE MANAGEMENT ==========
let highContrastEnabled = false;

function toggleContrast() {
    highContrastEnabled = !highContrastEnabled;
    localStorage.setItem('highContrast', highContrastEnabled);
    applyContrast();
    const button = document.getElementById('contrast-toggle');
    announceToScreenReader(highContrastEnabled ? 'High contrast mode enabled' : 'High contrast mode disabled');
}

function applyContrast() {
    document.body.classList.toggle('high-contrast', highContrastEnabled);
    document.getElementById('contrast-toggle').classList.toggle('active', highContrastEnabled);
}

function initializeContrast() {
    const saved = localStorage.getItem('highContrast');
    if (saved === 'true') {
        highContrastEnabled = true;
        applyContrast();
    }
}

// ========== ACCESSIBILITY HELPERS ==========
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    setTimeout(() => announcement.remove(), 1000);
}

// ========== EMERGENCY ALERT SYSTEM ==========
function initializeEmergencyAlerts() {
    // Simulate checking for emergency alerts (in real app, would call API)
    const hasEmergency = Math.random() > 0.8; // 20% chance for demo
    
    if (hasEmergency) {
        showEmergencyAlert(
            'Winter Weather Advisory',
            'Heavy snow expected tonight. City services may be delayed. Check weather.gov for updates.'
        );
    }
}

function showEmergencyAlert(title, message) {
    const alert = document.getElementById('emergency-alert');
    document.getElementById('alert-title').textContent = title;
    document.getElementById('alert-message').textContent = message;
    alert.classList.remove('hidden');
    announceToScreenReader(`Emergency alert: ${title}. ${message}`);
}

function closeEmergencyAlert() {
    const alert = document.getElementById('emergency-alert');
    alert.classList.add('hidden');
}

// ========== MOBILE MENU ==========
function initializeMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    
    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        menuToggle.classList.toggle('active');
        mainNav.toggleAttribute('hidden');
    });
    
    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.setAttribute('aria-expanded', false);
            menuToggle.classList.remove('active');
            mainNav.setAttribute('hidden', '');
        });
    });
}

// ========== SEARCH FUNCTIONALITY ==========
const serviceDatabase = {
    'water bill': { name: 'Pay Water Bill', id: 'water-bill' },
    'pay bill': { name: 'Pay Water Bill', id: 'water-bill' },
    'water': { name: 'Pay Water Bill', id: 'water-bill' },
    'pothole': { name: 'Report Pothole/Issue', id: 'report-issue' },
    'report': { name: 'Report Pothole/Issue', id: 'report-issue' },
    'issue': { name: 'Report Pothole/Issue', id: 'report-issue' },
    'street': { name: 'Report Pothole/Issue', id: 'report-issue' },
    'park': { name: 'Parks & Programs', id: 'park-programs' },
    'recreation': { name: 'Parks & Programs', id: 'park-programs' },
    'program': { name: 'Parks & Programs', id: 'park-programs' },
    'permit': { name: 'Building Permits', id: 'permits' },
    'building': { name: 'Building Permits', id: 'permits' },
    'construction': { name: 'Building Permits', id: 'permits' },
    'council': { name: 'City Council Info', id: 'council' },
    'meeting': { name: 'City Council Info', id: 'council' },
    'business': { name: 'Business Licenses', id: 'licenses' },
    'license': { name: 'Business Licenses', id: 'licenses' },
    'trash': { name: 'Trash & Recycling', id: 'trash' },
    'recycling': { name: 'Trash & Recycling', id: 'trash' },
};

function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase().trim();
        if (query.length > 0) {
            showSearchSuggestions(query);
        } else {
            hideSearchResults();
        }
    });
}

function performSearch() {
    const query = document.getElementById('search-input').value.toLowerCase().trim();
    if (!query) return;
    
    const results = document.getElementById('search-results');
    const matches = [];
    
    Object.keys(serviceDatabase).forEach(key => {
        if (key.includes(query)) {
            const service = serviceDatabase[key];
            if (!matches.find(m => m.id === service.id)) {
                matches.push(service);
            }
        }
    });
    
    if (matches.length > 0) {
        results.innerHTML = matches.map(service => 
            `<div class="search-result-item" onclick="openService('${service.id}'); return false;">
                ${service.name}
            </div>`
        ).join('');
        results.classList.remove('hidden');
        announceToScreenReader(`Found ${matches.length} matching service${matches.length !== 1 ? 's' : ''}`);
    } else {
        results.innerHTML = '<div class="search-result-item">No services found. Try "water bill", "pothole", or "permit"</div>';
        results.classList.remove('hidden');
        announceToScreenReader('No services found');
    }
}

function showSearchSuggestions(query) {
    const results = document.getElementById('search-results');
    const matches = [];
    
    Object.keys(serviceDatabase).forEach(key => {
        if (key.includes(query)) {
            const service = serviceDatabase[key];
            if (!matches.find(m => m.id === service.id)) {
                matches.push(service);
            }
        }
    });
    
    if (matches.length > 0) {
        results.innerHTML = matches.slice(0, 5).map(service => 
            `<div class="search-result-item" onclick="openService('${service.id}'); return false;">
                ${service.name}
            </div>`
        ).join('');
        results.classList.remove('hidden');
    } else {
        hideSearchResults();
    }
}

function hideSearchResults() {
    document.getElementById('search-results').classList.add('hidden');
}

function openService(serviceId) {
    const service = Object.values(serviceDatabase).find(s => s.id === serviceId);
    if (service) {
        announceToScreenReader(`Opening ${service.name}`);
        saveFormToHistory(service);
        alert(`Opening: ${service.name}\n\nIn a real application, this would take you to a dedicated page or modal for this service with:
- Service description
- Required documents
- Application form
- Real-time tracking
- Payment integration with legacy systems`);
    }
}

// ========== SERVICE TRACKING ==========
function trackRequest(event) {
    event.preventDefault();
    
    const requestNumber = document.getElementById('request-number').value.toUpperCase();
    const resultsDiv = document.getElementById('track-results');
    
    // Simulate API call with realistic data
    if (requestNumber.match(/^SR-\d{4}-\d{5}$/)) {
        const statuses = ['Submitted', 'Under Review', 'Approved', 'In Progress', 'Completed'];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        const daysAgo = Math.floor(Math.random() * 30) + 1;
        
        resultsDiv.innerHTML = `
            <h3>Request Status</h3>
            <p><strong>Request Number:</strong> ${requestNumber}</p>
            <p><strong>Service Type:</strong> Building Permit</p>
            <p><strong>Current Status:</strong> <span style="color: var(--success);">${randomStatus}</span></p>
            <p><strong>Submitted:</strong> ${daysAgo} days ago</p>
            <p><strong>Next Steps:</strong> 
                ${randomStatus === 'Submitted' ? 'We are reviewing your application. You will be notified within 5 business days.' : 
                  randomStatus === 'Under Review' ? 'Your application is being reviewed. No action needed at this time.' :
                  randomStatus === 'Approved' ? 'Your permit has been approved! You can pick it up at City Hall.' :
                  randomStatus === 'In Progress' ? 'Your permit is being processed. Estimated completion: 2 weeks.' :
                  'Your request has been completed. Thank you for using our services.'}
            </p>
            <button class="btn-primary" onclick="saveToFavorites('${requestNumber}')">Save This Request</button>
        `;
        resultsDiv.classList.remove('hidden');
        announceToScreenReader(`Request ${requestNumber} status: ${randomStatus}`);
    } else {
        resultsDiv.innerHTML = `
            <p style="color: var(--accent);">Invalid request number format. Please use format: SR-YYYY-NNNNN (e.g., SR-2026-12345)</p>
        `;
        resultsDiv.classList.remove('hidden');
        announceToScreenReader('Invalid request number format');
    }
}

// ========== SAVED FORMS & HISTORY ==========
let savedForms = [];

function initializeSavedForms() {
    const saved = localStorage.getItem('savedForms');
    if (saved) {
        savedForms = JSON.parse(saved);
        displaySavedForms();
    }
}

function saveFormToHistory(service) {
    if (!savedForms.find(f => f.id === service.id)) {
        savedForms.unshift(service);
        savedForms = savedForms.slice(0, 5); // Keep last 5
        localStorage.setItem('savedForms', JSON.stringify(savedForms));
        displaySavedForms();
    }
}

function saveToFavorites(requestNumber) {
    const service = { name: `Request ${requestNumber}`, id: requestNumber };
    saveFormToHistory(service);
    announceToScreenReader(`Request saved to favorites`);
}

function displaySavedForms() {
    const container = document.getElementById('saved-items');
    
    if (savedForms.length === 0) {
        container.innerHTML = '<p class="empty-state">No saved forms yet. Services you access frequently will appear here.</p>';
        return;
    }
    
    container.innerHTML = savedForms.map((form, index) => `
        <div class="saved-item">
            <a href="#" onclick="openService('${form.id}'); return false;">${form.name}</a>
            <button onclick="removeSavedForm(${index})" aria-label="Remove ${form.name} from saved">×</button>
        </div>
    `).join('');
}

function removeSavedForm(index) {
    savedForms.splice(index, 1);
    localStorage.setItem('savedForms', JSON.stringify(savedForms));
    displaySavedForms();
    announceToScreenReader('Saved form removed');
}

// ========== SERVICE CATEGORY TABS ==========
function initializeServiceTabs() {
    const tabs = document.querySelectorAll('.category-tab');
    const panels = document.querySelectorAll('.category-panel');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const panelId = tab.getAttribute('aria-controls');
            
            // Hide all panels
            panels.forEach(panel => panel.classList.add('hidden'));
            
            // Update all tabs
            tabs.forEach(t => t.setAttribute('aria-selected', false));
            
            // Show selected panel and update tab
            document.getElementById(panelId).classList.remove('hidden');
            tab.setAttribute('aria-selected', true);
        });
    });
}

// ========== ACCESSIBILITY CONTROLS ==========
function initializeAccessibilityControls() {
    document.getElementById('text-size-increase').addEventListener('click', () => adjustTextSize(1));
    document.getElementById('text-size-decrease').addEventListener('click', () => adjustTextSize(-1));
    document.getElementById('text-size-reset').addEventListener('click', resetTextSize);
    document.getElementById('contrast-toggle').addEventListener('click', toggleContrast);
    document.getElementById('language-toggle').addEventListener('click', toggleLanguage);
}

// ========== FOCUS MANAGEMENT ==========
function manageFocus() {
    // Trap focus in modals (would be relevant for actual service modals)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hideSearchResults();
        }
    });
}

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
    initializeLanguage();
    initializeTextSize();
    initializeContrast();
    initializeAccessibilityControls();
    initializeMobileMenu();
    initializeSearch();
    initializeServiceTabs();
    initializeSavedForms();
    initializeEmergencyAlerts();
    manageFocus();
});

// Close search results when clicking outside
document.addEventListener('click', (e) => {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        hideSearchResults();
    }
});
