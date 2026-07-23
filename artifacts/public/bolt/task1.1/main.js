import './style.css';

/* ============================================================
   MENU DATA
   ============================================================ */
const menuItems = {
  drinks: [
    {
      icon: '☕',
      name: 'Signature Espresso',
      desc: 'Double shot of our house single-origin blend, pulled slow for a silky finish.',
      price: '$3.50',
      badge: 'House Favorite',
    },
    {
      icon: '🥛',
      name: 'Oat Milk Latte',
      desc: 'Velvety oat milk steamed with a double espresso. Naturally sweet, endlessly smooth.',
      price: '$5.25',
      badge: 'Most Popular',
    },
    {
      icon: '🍯',
      name: 'Honey Lavender Latte',
      desc: 'House-made lavender syrup, wildflower honey, and whole milk. A floral morning ritual.',
      price: '$5.75',
      badge: 'Seasonal',
    },
    {
      icon: '🧊',
      name: 'Cold Brew',
      desc: '20-hour cold-steeped concentrate, served over ice. Bold, smooth, never bitter.',
      price: '$4.75',
      badge: null,
    },
    {
      icon: '🍵',
      name: 'Matcha Latte',
      desc: 'Ceremonial-grade matcha whisked fresh, steamed with your choice of milk.',
      price: '$5.50',
      badge: null,
    },
    {
      icon: '☁️',
      name: 'Cortado',
      desc: 'Equal parts espresso and warm milk, cut clean. The purist\'s choice.',
      price: '$4.25',
      badge: null,
    },
  ],
  pastries: [
    {
      icon: '🥐',
      name: 'Almond Croissant',
      desc: 'Twice-baked with frangipane cream and toasted slivered almonds. Arrives at 7am.',
      price: '$4.50',
      badge: 'Sell-Out Daily',
    },
    {
      icon: '🧇',
      name: 'Morning Glory Muffin',
      desc: 'Carrot, apple, coconut, and walnuts. Hearty enough to be breakfast, sweet enough to feel like a treat.',
      price: '$3.75',
      badge: 'House Recipe',
    },
    {
      icon: '🍋',
      name: 'Lemon Cardamom Scone',
      desc: 'Bright lemon zest, warm cardamom, and a citrus glaze. Perfectly crumbly.',
      price: '$3.50',
      badge: null,
    },
    {
      icon: '🍫',
      name: 'Dark Chocolate Brownie',
      desc: '70% cacao, fudgy center, crackly top. Pairs beautifully with an Americano.',
      price: '$4.00',
      badge: null,
    },
    {
      icon: '🥖',
      name: 'Ham & Gruyère Croissant',
      desc: 'Buttery croissant filled with slow-roasted ham and melted Gruyère. Served warm.',
      price: '$6.50',
      badge: 'New',
    },
    {
      icon: '🍑',
      name: 'Seasonal Galette',
      desc: 'Rustic free-form tart with whatever fruit is at peak right now. Ask what\'s in today.',
      price: '$5.00',
      badge: 'Changes Weekly',
    },
  ],
};

/* ============================================================
   RENDER MENU
   ============================================================ */
function renderMenu(category) {
  const grid = document.getElementById('menu-grid');
  if (!grid) return;

  grid.innerHTML = menuItems[category]
    .map(
      (item, i) => `
      <div class="menu-card" style="animation-delay: ${i * 0.06}s">
        <div class="menu-card-header">
          <span class="menu-icon">${item.icon}</span>
          <span class="menu-price">${item.price}</span>
        </div>
        <div class="menu-name">${item.name}</div>
        <div class="menu-desc">${item.desc}</div>
        ${item.badge ? `<span class="menu-badge">${item.badge}</span>` : ''}
      </div>
    `
    )
    .join('');
}

/* ============================================================
   TABS
   ============================================================ */
function initTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      btn.classList.add('active');
      renderMenu(btn.dataset.tab);
    });
  });
}

/* ============================================================
   SCROLL: header + reveal
   ============================================================ */
function initScrollBehaviors() {
  const header = document.getElementById('site-header');

  const onScroll = () => {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach((el) => observer.observe(el));
}

/* ============================================================
   HERO IMAGE KEN BURNS
   ============================================================ */
function initHero() {
  const heroBg = document.querySelector('.hero-bg');
  if (!heroBg) return;

  if (heroBg.complete) {
    heroBg.classList.add('loaded');
  } else {
    heroBg.addEventListener('load', () => heroBg.classList.add('loaded'));
  }
}

/* ============================================================
   MOBILE MENU
   ============================================================ */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  const toggle = () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    mobileMenu.setAttribute('aria-hidden', String(!isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  const close = () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', toggle);
  mobileLinks.forEach((link) => link.addEventListener('click', close));
}

/* ============================================================
   SMOOTH ANCHOR OFFSET (accounts for fixed header)
   ============================================================ */
function initAnchorOffset() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const headerHeight = document.getElementById('site-header').offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  renderMenu('drinks');
  initTabs();
  initScrollBehaviors();
  initHero();
  initMobileMenu();
  initAnchorOffset();
});
