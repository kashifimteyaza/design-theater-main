/* ── SCROLL-AWARE HEADER ─────────────────────────────────── */
const header = document.getElementById('site-header');

const updateHeader = () => {
  header.classList.toggle('scrolled', window.scrollY > 30);
};

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

/* ── MOBILE NAV ──────────────────────────────────────────── */
const navToggle = document.getElementById('nav-toggle');
const navMenu   = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
  const isOpen = navToggle.classList.toggle('is-open');
  navMenu.classList.toggle('is-open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('is-open');
    navMenu.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
    document.body.style.overflow = '';
  });
});

/* ── SCROLL REVEAL ───────────────────────────────────────── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── FAQ ACCORDION ───────────────────────────────────────── */
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    const answerId = btn.getAttribute('aria-controls');
    const answer   = document.getElementById(answerId);

    // Close all others
    document.querySelectorAll('.faq-question').forEach(other => {
      if (other !== btn) {
        other.setAttribute('aria-expanded', 'false');
        const otherId = other.getAttribute('aria-controls');
        const otherAnswer = document.getElementById(otherId);
        if (otherAnswer) otherAnswer.hidden = true;
      }
    });

    // Toggle current
    btn.setAttribute('aria-expanded', String(!expanded));
    answer.hidden = expanded;
  });
});

/* ── CONTACT FORM ────────────────────────────────────────── */
const contactForm   = document.getElementById('contact-form');
const formSubmit    = document.getElementById('form-submit');
const formSuccess   = document.getElementById('form-success');
const btnText       = formSubmit.querySelector('.btn-text');
const btnSpinner    = formSubmit.querySelector('.btn-spinner');

const requiredFields = contactForm.querySelectorAll('[required]');

const markField = (field, invalid) => {
  field.classList.toggle('is-invalid', invalid);
  field.setAttribute('aria-invalid', String(invalid));
};

const validateForm = () => {
  let valid = true;
  requiredFields.forEach(field => {
    const empty = !field.value.trim();
    const emailInvalid = field.type === 'email' && field.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);
    if (empty || emailInvalid) {
      markField(field, true);
      valid = false;
    } else {
      markField(field, false);
    }
  });
  return valid;
};

requiredFields.forEach(field => {
  field.addEventListener('input', () => {
    if (field.classList.contains('is-invalid')) {
      markField(field, !field.value.trim());
    }
  });
});

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    const firstInvalid = contactForm.querySelector('.is-invalid');
    firstInvalid?.focus();
    return;
  }

  // Loading state
  formSubmit.disabled = true;
  btnText.hidden = true;
  btnSpinner.hidden = false;

  // Simulate submission (no backend wired — shows success after brief delay)
  await new Promise(resolve => setTimeout(resolve, 1200));

  contactForm.querySelectorAll('input, select, textarea, button').forEach(el => {
    el.hidden = true;
  });
  contactForm.querySelector('.form-heading').hidden = true;
  contactForm.querySelectorAll('.form-row, .form-privacy').forEach(el => {
    el.hidden = true;
  });

  formSuccess.hidden = false;
  formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
});
