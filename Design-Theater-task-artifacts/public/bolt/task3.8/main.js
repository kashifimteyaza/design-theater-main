// EventSpace — Homepage interactions

// Sticky nav scroll state
const navHeader = document.querySelector('.nav-header');
window.addEventListener('scroll', () => {
  navHeader.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// Mobile menu toggle
const navToggle = document.querySelector('.nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');

navToggle.addEventListener('click', () => {
  const isOpen = navToggle.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
  mobileMenu.setAttribute('aria-hidden', String(!isOpen));
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
  });
});

// Scroll-triggered animations
const animatedEls = document.querySelectorAll('.animate-fade-up');

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

animatedEls.forEach(el => {
  if (el.closest('.hero')) {
    setTimeout(() => el.classList.add('in-view'), 100);
  } else {
    observer.observe(el);
  }
});

// Live chat simulation in hero preview
const chatMessages = document.querySelector('.chat-messages');
const chatPool = [
  { initials: 'JL', color: '#8b5cf6', text: 'Just joined from London!' },
  { initials: 'MK', color: '#0ea5e9', text: 'Amazing presentation quality' },
  { initials: 'RS', color: '#10b981', text: 'This is exactly what we needed' },
  { initials: 'AP', color: '#f59e0b', text: 'Can we get the recording link?' },
  { initials: 'TN', color: '#ef4444', text: 'Great insight on hybrid work' },
  { initials: 'CB', color: '#06b6d4', text: 'Joining from New York!' },
];

let chatIndex = 0;

function addChatMessage() {
  if (!chatMessages) return;
  const msg = chatPool[chatIndex % chatPool.length];
  chatIndex++;

  const el = document.createElement('div');
  el.className = 'chat-msg new';
  el.innerHTML = `<span class="chat-avatar" style="background:${msg.color}">${msg.initials}</span><span>${msg.text}</span>`;
  chatMessages.appendChild(el);

  while (chatMessages.children.length > 4) {
    chatMessages.removeChild(chatMessages.firstChild);
  }
}

setInterval(addChatMessage, 3200);

// Countdown timer in speaker preview
const timerEl = document.querySelector('.timer');
if (timerEl) {
  let seconds = 167;
  setInterval(() => {
    if (seconds > 0) seconds--;
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    timerEl.textContent = `${m}:${s}`;
  }, 1000);
}

// Session pill switcher
document.querySelectorAll('.session-pill').forEach(pill => {
  pill.addEventListener('click', () => {
    pill.closest('.preview-sessions')
      .querySelectorAll('.session-pill')
      .forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
  });
});

// Accessibility chip toggles
document.querySelectorAll('.access-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    const pressed = chip.getAttribute('aria-pressed') === 'true';
    chip.setAttribute('aria-pressed', String(!pressed));
    chip.classList.toggle('active', !pressed);
  });
});

// CTA form submission
const ctaForm = document.getElementById('ctaForm');
if (ctaForm) {
  ctaForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = ctaForm.querySelector('button');
    btn.textContent = "You're on the list!";
    btn.disabled = true;
    btn.style.background = '#10b981';
    ctaForm.querySelector('input').disabled = true;
  });
}

// Scale tier hover interaction
document.querySelectorAll('.scale-tier').forEach(tier => {
  tier.addEventListener('mouseenter', () => {
    document.querySelectorAll('.scale-tier').forEach(t => t.classList.remove('active'));
    tier.classList.add('active');
  });
});
