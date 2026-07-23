import './style.css';

// --- Navigation scroll effect ---
const header = document.getElementById('site-header');
const onScroll = () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
};
window.addEventListener('scroll', onScroll, { passive: true });

// --- Mobile nav toggle ---
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  navMenu.classList.toggle('open', !expanded);
});

// Close nav when a link is clicked on mobile
navMenu.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('open');
  });
});

// --- Tab panel switcher ---
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.getAttribute('aria-controls');
    tabBtns.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    tabPanels.forEach(p => {
      p.classList.remove('active');
      p.hidden = true;
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    const panel = document.getElementById(targetId);
    panel.classList.add('active');
    panel.hidden = false;
  });
});

// --- Privacy toggle ---
const privacyBtns = document.querySelectorAll('.privacy-btn');
privacyBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    privacyBtns.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-pressed', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-pressed', 'true');
    showToast(`Profile visibility set to: ${btn.textContent.trim()}`);
  });
});

// --- Animated counters ---
const animateCounter = (el) => {
  const target = parseInt(el.dataset.count, 10);
  const duration = 1800;
  const start = performance.now();
  const isPercent = el.closest('.trust-stat')?.querySelector('.trust-stat__label')?.textContent.includes('%');

  const step = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);
    const formatted = current >= 1000 ? (current / 1000).toFixed(1) + 'k' : String(current);
    el.textContent = formatted;
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target >= 1000 ? (target / 1000).toFixed(0) + 'k' : String(target);
  };
  requestAnimationFrame(step);
};

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

// --- Toast notification system ---
const toastRegion = document.getElementById('toast-region');

function showToast(message, duration = 4000) {
  const toast = document.createElement('div');
  toast.style.cssText = `
    display: flex;
    align-items: center;
    gap: 10px;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    padding: 12px 16px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.12);
    font-size: 14px;
    color: #1e293b;
    font-family: var(--font-body, sans-serif);
    pointer-events: auto;
    animation: toast-in 250ms cubic-bezier(0.16, 1, 0.3, 1) both;
    max-width: 340px;
  `;

  const style = document.createElement('style');
  if (!document.getElementById('toast-style')) {
    style.id = 'toast-style';
    style.textContent = `
      @keyframes toast-in {
        from { opacity: 0; transform: translateX(20px) scale(0.96); }
        to { opacity: 1; transform: translateX(0) scale(1); }
      }
      @keyframes toast-out {
        to { opacity: 0; transform: translateX(20px) scale(0.96); }
      }
    `;
    document.head.appendChild(style);
  }

  toast.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7" fill="#22c55e"/>
      <path d="M5 8l2 2 4-4" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
    <span>${message}</span>
  `;

  toastRegion.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'toast-out 250ms cubic-bezier(0.4, 0, 1, 1) forwards';
    toast.addEventListener('animationend', () => toast.remove());
  }, duration);
}

// --- Demo button interactions ---
document.querySelectorAll('.btn-primary[aria-label^="Preview"]').forEach(btn => {
  btn.addEventListener('click', () => {
    const label = btn.getAttribute('aria-label').replace('Preview ', '');
    showToast(`Opening preview: ${label}`);
  });
});

document.querySelectorAll('[aria-label^="RSVP"]').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.textContent = 'RSVP\'d!';
    btn.classList.remove('btn-outline');
    btn.classList.add('btn-primary');
    showToast('You\'re on the list! We\'ll send a reminder 10 minutes before.');
  });
});

document.querySelectorAll('[aria-label^="Join now"]').forEach(btn => {
  btn.addEventListener('click', () => {
    showToast('Opening live session...');
  });
});

document.querySelectorAll('[aria-label^="Request session"]').forEach(btn => {
  btn.addEventListener('click', () => {
    showToast('Session request sent! Priya will respond within 24 hours.');
  });
});

// Toast demo undo buttons are decorative — make them respond
document.querySelectorAll('.toast-undo').forEach(btn => {
  btn.addEventListener('click', () => {
    const action = btn.closest('.toast')?.querySelector('span')?.textContent;
    showToast(`Undone: "${action}"`);
  });
});

// Join / Sign in CTAs
document.querySelectorAll('[href="#join"], [href="#signin"]').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    showToast('Coming soon — join the waitlist to be first!');
  });
});
