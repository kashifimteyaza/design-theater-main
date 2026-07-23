import './style.css';

/* ─── Language Toggle ──────────────────────────────── */

let currentLang = 'en';

function applyLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;

  const toggleBtn = document.getElementById('lang-toggle');
  if (toggleBtn) {
    const isEs = lang === 'es';
    toggleBtn.setAttribute('aria-pressed', String(isEs));
    toggleBtn.setAttribute('aria-label', isEs ? 'Switch language to English' : 'Switch language to Spanish');
  }

  // Swap all data-en / data-es text nodes
  document.querySelectorAll('[data-en]').forEach(el => {
    const text = el.getAttribute(`data-${lang}`);
    if (text != null) {
      // Use innerHTML for nodes that contain & entities
      el.innerHTML = text;
    }
  });

  // Swap option text in selects
  document.querySelectorAll('option[data-en]').forEach(opt => {
    const text = opt.getAttribute(`data-${lang}`);
    if (text != null) opt.textContent = text;
  });

  // Update placeholder on name search
  const searchInput = document.getElementById('search-name');
  if (searchInput) {
    searchInput.placeholder = lang === 'es'
      ? 'p. ej., Cardiología, Dr. Rivera'
      : 'e.g., Cardiology, Dr. Rivera';
  }
}

document.getElementById('lang-toggle')?.addEventListener('click', () => {
  applyLanguage(currentLang === 'en' ? 'es' : 'en');
});

/* ─── Mobile Menu ──────────────────────────────────── */

const menuToggle = document.getElementById('mobile-menu-toggle');
const mainNav = document.getElementById('main-nav');

menuToggle?.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('main-nav--open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
});

// Close menu when a nav link is tapped
mainNav?.querySelectorAll('.main-nav__link').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('main-nav--open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

/* ─── Sticky Header Shadow ─────────────────────────── */

const header = document.querySelector('.site-header');
const observer = new IntersectionObserver(
  ([entry]) => {
    header?.classList.toggle('site-header--scrolled', !entry.isIntersecting);
  },
  { threshold: 0 }
);

const heroEl = document.querySelector('.hero');
if (heroEl) observer.observe(heroEl);

/* ─── Location Tabs ────────────────────────────────── */

const locationTabs = document.querySelectorAll('.location-tab');
const locationCards = document.querySelectorAll('.location-card');

locationTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const filter = tab.dataset.filter;

    // Update tab state
    locationTabs.forEach(t => {
      t.classList.remove('location-tab--active');
      t.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('location-tab--active');
    tab.setAttribute('aria-selected', 'true');

    // Show/hide cards
    locationCards.forEach(card => {
      const cityMatch = filter === 'all' || card.dataset.city === filter;
      if (cityMatch) {
        card.removeAttribute('data-hidden');
        card.style.display = '';
      } else {
        card.setAttribute('data-hidden', '');
        card.style.display = 'none';
      }
    });
  });
});

/* ─── Doctor Search Form ───────────────────────────── */

document.getElementById('doctor-search-form')?.addEventListener('submit', e => {
  e.preventDefault();
  const query = document.getElementById('search-name')?.value.trim();
  const location = document.getElementById('search-location')?.value;
  const insurance = document.getElementById('search-insurance')?.value;

  // In production this would route to a results page
  const msg = currentLang === 'es'
    ? `Buscando "${query || 'todos los médicos'}"… Redirigiendo a resultados.`
    : `Searching for "${query || 'all physicians'}"… Redirecting to results.`;
  showToast(msg);
});

/* ─── Appointment Form ─────────────────────────────── */

const apptForm = document.getElementById('appointment-form');
const apptSuccess = document.getElementById('appt-success');

apptForm?.addEventListener('submit', e => {
  e.preventDefault();

  const first = document.getElementById('appt-first')?.value.trim();
  const last = document.getElementById('appt-last')?.value.trim();
  const phone = document.getElementById('appt-phone')?.value.trim();
  const type = document.getElementById('appt-type')?.value;

  if (!first || !last || !phone || !type) {
    const msg = currentLang === 'es'
      ? 'Por favor, complete todos los campos obligatorios.'
      : 'Please complete all required fields.';
    showToast(msg, 'warn');
    return;
  }

  // Simulate submission
  apptForm.hidden = true;
  if (apptSuccess) apptSuccess.hidden = false;

  const toastMsg = currentLang === 'es'
    ? `¡Gracias, ${first}! Le llamaremos pronto.`
    : `Thank you, ${first}! We'll be in touch within 1 business day.`;
  showToast(toastMsg);

  // Scroll form into view so user sees success state
  apptSuccess?.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

/* ─── Simulated Wait Time Refresh ─────────────────── */
// Mimics a live wait-time feed by randomizing values slightly every 60s

function randomWaitMinutes(base, spread) {
  return Math.max(5, base + Math.floor((Math.random() - 0.5) * spread * 2));
}

function refreshWaitTimes() {
  const westsideEl = document.getElementById('wait-westside');
  const eastviewEl = document.getElementById('wait-eastview');
  if (westsideEl) westsideEl.textContent = `~${randomWaitMinutes(18, 8)} min`;
  if (eastviewEl) eastviewEl.textContent = `~${randomWaitMinutes(25, 10)} min`;
}

setInterval(refreshWaitTimes, 60_000);

/* ─── Smooth Active Nav Highlight ─────────────────── */

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.main-nav__link');

const sectionObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        link.classList.toggle('main-nav__link--active', href === `#${id}`);
      });
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach(s => sectionObserver.observe(s));

/* ─── Toast ────────────────────────────────────────── */

function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toast-text');
  if (!toast || !toastText) return;

  toastText.textContent = message;
  toast.hidden = false;

  // Force reflow then animate in
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.classList.add('toast--visible');
    });
  });

  setTimeout(() => {
    toast.classList.remove('toast--visible');
    setTimeout(() => { toast.hidden = true; }, 300);
  }, 4000);
}

/* ─── Specialty Chips ──────────────────────────────── */

document.querySelectorAll('.specialty-chip').forEach(chip => {
  chip.addEventListener('click', e => {
    if (chip.classList.contains('specialty-chip--more')) return;
    e.preventDefault();
    const specialty = chip.textContent.trim();
    const searchInput = document.getElementById('search-name');
    if (searchInput) {
      searchInput.value = specialty;
      searchInput.focus();
      document.querySelector('.find-care')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ─── Init ─────────────────────────────────────────── */

// Apply default language on load (already English but ensures data attributes are consistent)
applyLanguage('en');
