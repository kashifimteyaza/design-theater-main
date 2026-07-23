import './style.css';

// Nav: add .scrolled class after scroll
const nav = document.getElementById('nav');
function handleNavScroll() {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}
window.addEventListener('scroll', handleNavScroll, { passive: true });
handleNavScroll();

// Hamburger: toggle nav-links visibility on mobile
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');
const btnNav    = document.querySelector('.btn-nav');
hamburger?.addEventListener('click', () => {
  const open = navLinks?.style.display === 'flex';
  if (navLinks)  navLinks.style.display  = open ? '' : 'flex';
  if (btnNav)    btnNav.style.display    = open ? '' : 'flex';
  // stack links vertically on mobile
  if (!open && navLinks) {
    navLinks.style.flexDirection   = 'column';
    navLinks.style.position        = 'fixed';
    navLinks.style.top             = '108px';
    navLinks.style.left            = '0';
    navLinks.style.right           = '0';
    navLinks.style.background      = 'rgba(10,10,10,0.97)';
    navLinks.style.padding         = '24px 32px';
    navLinks.style.gap             = '20px';
    navLinks.style.backdropFilter  = 'blur(12px)';
    navLinks.style.zIndex          = '998';
  }
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    if (navLinks) navLinks.style.display = '';
  });
});

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const delay = parseInt(entry.target.dataset.delay || '0', 10);
    setTimeout(() => {
      entry.target.classList.add('visible');
    }, delay);
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// Email form
const form    = document.getElementById('email-form');
const msgEl   = document.getElementById('form-message');

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email')?.value?.trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    msgEl.textContent = 'Enter a valid email address.';
    msgEl.className = 'form-message error';
    return;
  }
  msgEl.textContent = "You're in. Rebellion incoming.";
  msgEl.className = 'form-message success';
  form.reset();
  setTimeout(() => { msgEl.textContent = ''; }, 5000);
});

// Product card "Add to Cart" click
document.querySelectorAll('.product-hover-cta').forEach(cta => {
  cta.addEventListener('click', () => {
    const original = cta.textContent;
    cta.textContent = 'Added!';
    setTimeout(() => { cta.textContent = original; }, 1200);
  });
});

// Staggered product card reveal on scroll
document.querySelectorAll('.product-card').forEach((card, i) => {
  card.dataset.delay = String(i * 80);
});
