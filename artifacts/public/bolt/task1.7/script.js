import './style.css';

/* =============================================
   i18n Strings
   ============================================= */
const i18n = {
  en: {
    'breaking': 'BREAKING',
    'edition': 'Metro Edition',
    'lang-toggle': 'Español',
    'sign-in': 'Sign In',
    'subscribe': 'Subscribe',
    'tagline': 'Serving Our Community Since 1952',
    'search-label': 'Search articles',
    'search-placeholder': 'Search articles...',
    'menu': 'Menu',
    'nav-top': 'Top Stories',
    'nav-politics': 'Politics',
    'nav-business': 'Business',
    'nav-sports': 'Sports',
    'nav-community': 'Community',
    'nav-podcasts': 'Podcasts',
    'nav-investigations': 'Investigations',
    'premium-badge': 'Premium',
    'my-topics': 'My Topics:',
    'topic-all': 'All',
    'topic-politics': 'Politics',
    'topic-business': 'Business',
    'topic-sports': 'Sports',
    'topic-community': 'Community',
    'clear-filter': 'Clear filter',
    'more-headlines': 'More Headlines',
    'label-new': 'NEW',
    'see-all': 'See all →',
    'read-investigation': 'Read the Investigation',
    'subscribe-premium': 'Subscribe for Premium Access',
    'most-read': 'Most Read Today',
    'newsletter-heading': 'Daily Briefing',
    'newsletter-desc': 'Get the top 5 stories every morning, delivered to your inbox before 7am.',
    'newsletter-email-label': 'Email address',
    'newsletter-placeholder': 'Your email address',
    'newsletter-cta': 'Subscribe Free',
    'newsletter-fine': 'No spam. Unsubscribe anytime.',
    'upcoming-events': 'Upcoming Events',
    'trending': 'Trending Topics',
    'subscribe-banner-heading': 'Support local journalism that matters.',
    'subscribe-banner-desc': 'Metro Daily News is independently owned. Your subscription funds investigative reporting, community coverage, and 40+ stories every day.',
    'plan-digital': 'Digital',
    'plan-all-access': 'All Access',
    'per-month': '/mo',
    'most-popular': 'Most Popular',
    'get-started': 'Get Started',
    'compare-plans': 'Compare plans →',
    'footer-about': 'Independent local journalism serving three metropolitan areas since 1952.',
    'footer-sections': 'Sections',
    'footer-services': 'Reader Services',
    'footer-company': 'Company',
    'footer-subscribe': 'Subscribe',
    'footer-newsletters': 'Newsletters',
    'footer-comments': 'Comment Policy',
    'footer-accessibility': 'Accessibility',
    'footer-spanish': 'Edición Español',
    'footer-about-us': 'About Us',
    'footer-staff': 'Our Staff',
    'footer-advertise': 'Advertise',
    'footer-contact': 'Contact Us',
    'footer-privacy': 'Privacy Policy',
    'footer-copyright': '© 2026 Metro Daily News. All rights reserved.',
    'footer-disclaimer': 'Metro Daily News is committed to accuracy and accountability in local reporting.',
  },
  es: {
    'breaking': 'ÚLTIMA HORA',
    'edition': 'Edición Metro',
    'lang-toggle': 'English',
    'sign-in': 'Iniciar Sesión',
    'subscribe': 'Suscribirse',
    'tagline': 'Al Servicio de la Comunidad Desde 1952',
    'search-label': 'Buscar artículos',
    'search-placeholder': 'Buscar artículos...',
    'menu': 'Menú',
    'nav-top': 'Titulares',
    'nav-politics': 'Política',
    'nav-business': 'Negocios',
    'nav-sports': 'Deportes',
    'nav-community': 'Comunidad',
    'nav-podcasts': 'Podcasts',
    'nav-investigations': 'Investigaciones',
    'premium-badge': 'Premium',
    'my-topics': 'Mis Temas:',
    'topic-all': 'Todo',
    'topic-politics': 'Política',
    'topic-business': 'Negocios',
    'topic-sports': 'Deportes',
    'topic-community': 'Comunidad',
    'clear-filter': 'Quitar filtro',
    'more-headlines': 'Más Titulares',
    'label-new': 'NUEVO',
    'see-all': 'Ver todo →',
    'read-investigation': 'Leer la Investigación',
    'subscribe-premium': 'Suscripción Premium',
    'most-read': 'Lo Más Leído Hoy',
    'newsletter-heading': 'Resumen Diario',
    'newsletter-desc': 'Recibe las 5 noticias principales cada mañana, en tu correo antes de las 7am.',
    'newsletter-email-label': 'Correo electrónico',
    'newsletter-placeholder': 'Tu correo electrónico',
    'newsletter-cta': 'Suscribirse Gratis',
    'newsletter-fine': 'Sin spam. Cancela cuando quieras.',
    'upcoming-events': 'Próximos Eventos',
    'trending': 'Temas Tendencia',
    'subscribe-banner-heading': 'Apoya el periodismo local que importa.',
    'subscribe-banner-desc': 'Metro Daily News es de propiedad independiente. Tu suscripción financia reportajes de investigación, cobertura comunitaria y más de 40 historias cada día.',
    'plan-digital': 'Digital',
    'plan-all-access': 'Acceso Total',
    'per-month': '/mes',
    'most-popular': 'Más Popular',
    'get-started': 'Comenzar',
    'compare-plans': 'Comparar planes →',
    'footer-about': 'Periodismo local independiente al servicio de tres áreas metropolitanas desde 1952.',
    'footer-sections': 'Secciones',
    'footer-services': 'Servicios al Lector',
    'footer-company': 'Empresa',
    'footer-subscribe': 'Suscribirse',
    'footer-newsletters': 'Boletines',
    'footer-comments': 'Política de Comentarios',
    'footer-accessibility': 'Accesibilidad',
    'footer-spanish': 'Edición Español',
    'footer-about-us': 'Sobre Nosotros',
    'footer-staff': 'Nuestro Equipo',
    'footer-advertise': 'Publicidad',
    'footer-contact': 'Contáctanos',
    'footer-privacy': 'Política de Privacidad',
    'footer-copyright': '© 2026 Metro Daily News. Todos los derechos reservados.',
    'footer-disclaimer': 'Metro Daily News está comprometido con la precisión y la rendición de cuentas en el periodismo local.',
  },
};

/* =============================================
   State
   ============================================= */
let currentLang = 'en';
let activeTopic = 'all';
let textLarge = false;

/* =============================================
   Language Toggle
   ============================================= */
function applyLanguage(lang) {
  currentLang = lang;
  const strings = i18n[lang];

  // Text nodes
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (strings[key] !== undefined) el.textContent = strings[key];
  });

  // Placeholder attrs
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (strings[key] !== undefined) el.placeholder = strings[key];
  });

  // Document lang attribute
  document.documentElement.lang = lang;

  // Update lang toggle button aria label
  const btn = document.getElementById('lang-toggle');
  if (btn) btn.setAttribute('aria-label', lang === 'en' ? 'Switch to Spanish' : 'Switch to English');

  // Update sidebar lang toggle
  const sidebarBtn = document.getElementById('sidebar-lang-toggle');
  if (sidebarBtn) sidebarBtn.textContent = lang === 'en' ? 'Ver en Español' : 'Switch to English';
}

function initLangToggle() {
  const btn = document.getElementById('lang-toggle');
  const sidebarBtn = document.getElementById('sidebar-lang-toggle');

  function toggle() {
    const next = currentLang === 'en' ? 'es' : 'en';
    document.body.classList.add('lang-transitioning');
    setTimeout(() => {
      applyLanguage(next);
      document.body.classList.remove('lang-transitioning');
    }, 150);
  }

  btn?.addEventListener('click', toggle);
  sidebarBtn?.addEventListener('click', toggle);
}

/* =============================================
   Mobile Nav
   ============================================= */
function initMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    // Animate hamburger
    const bars = toggle.querySelectorAll('.hamburger span');
    if (open) {
      bars[0].style.transform = 'translateY(6px) rotate(45deg)';
      bars[1].style.opacity = '0';
      bars[2].style.transform = 'translateY(-6px) rotate(-45deg)';
    } else {
      bars.forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
    }
  });

  // Close on nav link click (mobile)
  menu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 768) {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        const bars = toggle.querySelectorAll('.hamburger span');
        bars.forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
      }
    });
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!toggle.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      const bars = toggle.querySelectorAll('.hamburger span');
      bars.forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
    }
  });
}

/* =============================================
   Active Nav Highlight on Scroll
   ============================================= */
function initScrollNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-60px 0px -60% 0px', threshold: 0 });

  sections.forEach(s => observer.observe(s));
}

/* =============================================
   Topic Filter
   ============================================= */
function initTopicFilter() {
  const chips = document.querySelectorAll('.topic-chip');
  const clearBtn = document.getElementById('topics-clear');

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const topic = chip.dataset.topic;
      activeTopic = topic;

      // Update chip states
      chips.forEach(c => {
        const isActive = c.dataset.topic === topic;
        c.classList.toggle('active', isActive);
        c.setAttribute('aria-pressed', String(isActive));
      });

      // Show/hide clear button
      if (clearBtn) {
        clearBtn.hidden = topic === 'all';
      }

      // Filter sections
      filterContent(topic);
    });

    chip.setAttribute('role', 'button');
    chip.setAttribute('aria-pressed', chip.dataset.topic === 'all' ? 'true' : 'false');
  });

  clearBtn?.addEventListener('click', () => {
    activeTopic = 'all';
    chips.forEach(c => {
      const isAll = c.dataset.topic === 'all';
      c.classList.toggle('active', isAll);
      c.setAttribute('aria-pressed', String(isAll));
    });
    clearBtn.hidden = true;
    filterContent('all');
  });
}

function filterContent(topic) {
  // Filter sections
  document.querySelectorAll('.news-section[data-topic]').forEach(section => {
    const match = topic === 'all' || section.dataset.topic === topic;
    section.classList.toggle('filtered-out', !match);
    section.setAttribute('aria-hidden', String(!match));
  });

  // Filter quick list items
  document.querySelectorAll('.quick-item[data-topic]').forEach(item => {
    const match = topic === 'all' || item.dataset.topic === topic;
    item.classList.toggle('filtered-out', !match);
  });

  // Filter hero secondary cards
  document.querySelectorAll('.card-secondary[data-topic]').forEach(card => {
    const match = topic === 'all' || card.dataset.topic === topic;
    card.style.opacity = match ? '1' : '0.3';
    card.style.pointerEvents = match ? '' : 'none';
  });
}

/* =============================================
   Text Size Toggle (Accessibility)
   ============================================= */
function initTextSize() {
  const btn = document.getElementById('text-size-btn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    textLarge = !textLarge;
    document.body.classList.toggle('text-large', textLarge);
    btn.setAttribute('aria-label', textLarge ? 'Decrease text size' : 'Increase text size');
    btn.querySelector('span').textContent = textLarge ? 'A-' : 'A+';
    // Persist
    try { localStorage.setItem('mdn-text-large', textLarge ? '1' : '0'); } catch {}
  });

  // Restore
  try {
    if (localStorage.getItem('mdn-text-large') === '1') {
      textLarge = true;
      document.body.classList.add('text-large');
      btn.querySelector('span').textContent = 'A-';
    }
  } catch {}
}

/* =============================================
   Save Article (Bookmark)
   ============================================= */
function initSaveButtons() {
  document.querySelectorAll('.action-btn[aria-label="Save article"]').forEach(btn => {
    btn.addEventListener('click', function() {
      const saved = this.classList.toggle('saved');
      this.setAttribute('aria-label', saved ? 'Unsave article' : 'Save article');
      this.setAttribute('aria-pressed', String(saved));
      // Visual feedback
      this.style.transform = 'scale(1.3)';
      setTimeout(() => { this.style.transform = ''; }, 200);
    });
  });
}

/* =============================================
   Share Button (Web Share API fallback)
   ============================================= */
function initShareButtons() {
  document.querySelectorAll('.action-btn[aria-label="Share article"]').forEach(btn => {
    btn.addEventListener('click', async function() {
      const article = this.closest('article');
      const title = article?.querySelector('.article-link')?.textContent?.trim() || 'Metro Daily News';

      if (navigator.share) {
        try {
          await navigator.share({ title, url: window.location.href });
        } catch {}
      } else {
        // Fallback: copy to clipboard
        try {
          await navigator.clipboard.writeText(window.location.href);
          showToast(currentLang === 'es' ? 'Enlace copiado' : 'Link copied');
        } catch {
          showToast(currentLang === 'es' ? 'No se pudo copiar' : 'Could not copy link');
        }
      }
    });
  });
}

/* =============================================
   Toast notification
   ============================================= */
function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%) translateY(8px);
      background: #1a1a1a;
      color: #fff;
      font-family: var(--font-ui, sans-serif);
      font-size: 14px;
      font-weight: 500;
      padding: 10px 20px;
      border-radius: 6px;
      box-shadow: 0 4px 16px rgba(0,0,0,.3);
      z-index: 9999;
      opacity: 0;
      transition: opacity 200ms ease, transform 200ms ease;
      pointer-events: none;
    `;
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });

  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(8px)';
  }, 2500);
}

/* =============================================
   Newsletter Form
   ============================================= */
function initNewsletterForm() {
  const form = document.querySelector('.newsletter-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const input = form.querySelector('.newsletter-input');
    const btn = form.querySelector('.btn-newsletter');
    if (!input?.value) return;

    // Simulate submission
    btn.textContent = currentLang === 'es' ? '¡Listo!' : 'Done!';
    btn.style.background = '#16a34a';
    input.disabled = true;
    btn.disabled = true;

    showToast(currentLang === 'es'
      ? '¡Suscripción exitosa! Revisa tu correo.'
      : 'Subscribed! Check your inbox for confirmation.');

    setTimeout(() => {
      btn.textContent = i18n[currentLang]['newsletter-cta'];
      btn.style.background = '';
      input.value = '';
      input.disabled = false;
      btn.disabled = false;
    }, 3000);
  });
}

/* =============================================
   Podcast Play Buttons
   ============================================= */
function initPodcastPlayers() {
  document.querySelectorAll('.podcast-play').forEach(btn => {
    btn.addEventListener('click', function() {
      const isPlaying = this.classList.toggle('playing');
      this.setAttribute('aria-label', isPlaying
        ? (currentLang === 'es' ? 'Pausar podcast' : 'Pause podcast')
        : (currentLang === 'es' ? 'Reproducir podcast' : 'Play podcast')
      );
      // Update icon
      this.innerHTML = isPlaying
        ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`
        : `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="5 3 19 12 5 21 5 3"/></svg>`;

      // Stop other players
      if (isPlaying) {
        document.querySelectorAll('.podcast-play.playing').forEach(other => {
          if (other !== this) {
            other.classList.remove('playing');
            other.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="5 3 19 12 5 21 5 3"/></svg>`;
          }
        });
      }
    });
  });
}

/* =============================================
   Date Display
   ============================================= */
function initDate() {
  const el = document.getElementById('header-date');
  if (!el) return;
  const now = new Date();
  const opts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  el.textContent = now.toLocaleDateString(currentLang === 'es' ? 'es-US' : 'en-US', opts);
  el.setAttribute('datetime', now.toISOString().split('T')[0]);
}

/* =============================================
   Sticky header offset sync for topics strip
   ============================================= */
function syncStickyOffsets() {
  const header = document.querySelector('.site-header');
  const strip = document.querySelector('.topics-strip');
  if (!header || !strip) return;

  const update = () => {
    const h = header.getBoundingClientRect().height;
    strip.style.top = `${h}px`;
  };
  update();
  const ro = new ResizeObserver(update);
  ro.observe(header);
}

/* =============================================
   Search (UI only — UX demo)
   ============================================= */
function initSearch() {
  const form = document.querySelector('.header-search form');
  const input = document.getElementById('search-input');
  if (!form || !input) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const q = input.value.trim();
    if (q) {
      showToast(currentLang === 'es'
        ? `Buscando: "${q}"`
        : `Searching for: "${q}"`);
    }
  });
}

/* =============================================
   Subscribe/CTA buttons (UI only)
   ============================================= */
function initSubscribeButtons() {
  document.querySelectorAll('.btn-plan, .btn-primary').forEach(btn => {
    btn.addEventListener('click', function() {
      if (this.textContent.includes('Subscribe') || this.textContent.includes('Suscrib') || this.classList.contains('btn-plan')) {
        showToast(currentLang === 'es'
          ? 'Redirigiendo a la página de suscripción…'
          : 'Redirecting to subscription page…');
      }
    });
  });
}

/* =============================================
   Bootstrap
   ============================================= */
document.addEventListener('DOMContentLoaded', () => {
  initDate();
  initLangToggle();
  initMobileNav();
  initScrollNav();
  initTopicFilter();
  initTextSize();
  initSaveButtons();
  initShareButtons();
  initNewsletterForm();
  initPodcastPlayers();
  syncStickyOffsets();
  initSearch();
  initSubscribeButtons();
});
