import './style.css';

/* =============================================
   NAVIGATION — sticky + mobile menu
   ============================================= */
const header = document.getElementById('site-header');
const hamburger = document.getElementById('nav-hamburger');
const navLinks = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

hamburger?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', String(open));
});

// Close mobile menu on link click
navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger?.setAttribute('aria-expanded', 'false');
  });
});

/* =============================================
   ROLE SWITCHER
   ============================================= */
const ROLE_DATA = {
  executive: [
    'Real-time portfolio health score across every active initiative',
    'Budget variance alerts with one-click approval workflows',
    'Board-ready executive reports generated automatically',
    'Risk exposure summary with escalation triggers',
    'Strategic alignment scoring for portfolio prioritization',
    'Cross-department resource utilization at a glance',
  ],
  pm: [
    'Full Gantt, critical path, and dependency view per project',
    'Resource request & conflict resolution tools',
    'Risk register with probability-impact scoring',
    'Budget change order submission and tracking',
    'Vendor milestone tracking and SLA alerts',
    'Automated weekly status report generation',
  ],
  contributor: [
    'Personal task queue with priority and deadline clarity',
    'Time logging integrated with resource capacity model',
    'Access to relevant documents with version history',
    'Issue flagging with automatic PM escalation',
    'Cross-project view of your assignments',
    'Meeting notes and decisions with audit trail',
  ],
  vendor: [
    'Isolated vendor portal — see only your scope',
    'Milestone and deliverable submission workflows',
    'Document upload and review with PM sign-off',
    'Invoice status and payment milestone tracking',
    'Communication log with the internal team',
    'No access to internal project data or budgets',
  ],
};

const roleContent = document.getElementById('role-content');
const roleTabs = document.querySelectorAll('.role-tab');

function renderRoleContent(role) {
  if (!roleContent) return;
  const items = ROLE_DATA[role] || [];
  roleContent.innerHTML = items
    .map(text => `
      <div class="role-insight">
        <span class="role-insight-dot" aria-hidden="true"></span>
        <span class="role-insight-text">${text}</span>
      </div>
    `)
    .join('');
}

roleTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    roleTabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    renderRoleContent(tab.dataset.role);
  });
});

renderRoleContent('executive');

/* =============================================
   STAT COUNTER ANIMATION
   ============================================= */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const start = performance.now();

  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // ease out quart
    const eased = 1 - Math.pow(1 - progress, 4);
    el.textContent = Math.round(eased * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

const statNumbers = document.querySelectorAll('.stat-number[data-target]');
let statsAnimated = false;

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !statsAnimated) {
      statsAnimated = true;
      statNumbers.forEach(el => animateCounter(el));
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

/* =============================================
   REVEAL ON SCROLL
   ============================================= */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = parseInt(el.dataset.delay || '0', 10);
      setTimeout(() => el.classList.add('visible'), delay);
      revealObserver.unobserve(el);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* =============================================
   DEMO FORM
   ============================================= */
const demoForm = document.getElementById('demo-form');
const formSuccess = document.getElementById('form-success');
const submitText = document.getElementById('submit-text');

if (demoForm) {
  demoForm.addEventListener('submit', e => {
    e.preventDefault();

    let valid = true;
    demoForm.querySelectorAll('[required]').forEach(field => {
      field.classList.remove('error');
      if (!field.value.trim()) {
        field.classList.add('error');
        valid = false;
      }
    });

    if (!valid) return;

    // Simulate async submission
    submitText.textContent = 'Sending…';
    demoForm.querySelector('.btn-form-submit').disabled = true;

    setTimeout(() => {
      demoForm.querySelectorAll('input, select').forEach(f => f.value = '');
      if (formSuccess) {
        formSuccess.hidden = false;
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      submitText.textContent = 'Request Your Demo';
      demoForm.querySelector('.btn-form-submit').disabled = false;
    }, 1200);
  });

  // Clear error state on input
  demoForm.querySelectorAll('[required]').forEach(field => {
    field.addEventListener('input', () => field.classList.remove('error'));
  });
}

/* =============================================
   SMOOTH ACTIVE NAV LINK HIGHLIGHTING
   ============================================= */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--navy-600)' : '';
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => navObserver.observe(s));
