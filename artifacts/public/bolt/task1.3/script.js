import './style.css';

/* ============================================================
   DATA
   ============================================================ */

const FINDER_OPTIONS = {
  individual: [
    { label: 'Divorce or Separation', filter: 'family' },
    { label: 'Child Custody', filter: 'family' },
    { label: 'Accident / Injury', filter: 'injury' },
    { label: 'Estate & Will Planning', filter: 'estate' },
    { label: 'Adoption', filter: 'family' },
    { label: 'Wrongful Death Claim', filter: 'injury' },
    { label: 'Trust Creation', filter: 'estate' },
    { label: 'Not Sure', filter: 'all' },
  ],
  business: [
    { label: 'Business Formation', filter: 'corporate' },
    { label: 'Mergers & Acquisitions', filter: 'corporate' },
    { label: 'Contract Dispute', filter: 'corporate' },
    { label: 'Employee Injury Claim', filter: 'injury' },
    { label: 'Business Succession', filter: 'estate' },
    { label: 'Commercial Litigation', filter: 'corporate' },
    { label: 'Not Sure', filter: 'all' },
  ],
};

const ATTORNEYS = [
  {
    name: 'Margaret Thompson',
    title: 'Managing Partner',
    area: 'corporate',
    bio: '25+ years in M&A and corporate governance. Led over 120 transactions across technology, healthcare, and manufacturing sectors.',
    photo: 'https://images.pexels.com/photos/5669626/pexels-photo-5669626.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    name: 'David Chen',
    title: 'Senior Partner, Corporate',
    area: 'corporate',
    bio: 'Former general counsel at a Fortune 500. Specializes in complex commercial contracts and business litigation.',
    photo: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    name: 'Sarah Mitchell',
    title: 'Partner, Corporate',
    area: 'corporate',
    bio: 'Securities law and startup financing expert. Has guided 60+ early-stage companies through funding rounds.',
    photo: 'https://images.pexels.com/photos/3790811/pexels-photo-3790811.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    name: 'James Rivera',
    title: 'Partner, Family Law',
    area: 'family',
    bio: 'Certified family law specialist with a compassionate approach to high-stakes divorce and custody matters.',
    photo: 'https://images.pexels.com/photos/8815957/pexels-photo-8815957.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    name: 'Lisa Park',
    title: 'Associate, Family Law',
    area: 'family',
    bio: 'Focuses on child welfare, adoption proceedings, and domestic mediation. Former social worker background.',
    photo: 'https://images.pexels.com/photos/6551422/pexels-photo-6551422.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    name: 'Robert Okafor',
    title: 'Partner, Personal Injury',
    area: 'injury',
    bio: 'Recovered over $45M in verdicts and settlements. Known for tenacious advocacy in catastrophic injury cases.',
    photo: 'https://images.pexels.com/photos/8815931/pexels-photo-8815931.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    name: 'Nicole Torres',
    title: 'Associate, Personal Injury',
    area: 'injury',
    bio: 'Medical malpractice specialist with a healthcare background that gives her a unique edge in complex cases.',
    photo: 'https://images.pexels.com/photos/5669619/pexels-photo-5669619.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    name: 'William Hayes',
    title: 'Partner, Estate Planning',
    area: 'estate',
    bio: '20 years crafting estate plans for families and business owners. Expertise in irrevocable trusts and probate.',
    photo: 'https://images.pexels.com/photos/5668882/pexels-photo-5668882.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    name: 'Angela Kim',
    title: 'Associate, Estate Planning',
    area: 'estate',
    bio: 'Specializes in estate tax planning and business succession strategies for family-owned enterprises.',
    photo: 'https://images.pexels.com/photos/8815963/pexels-photo-8815963.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    name: 'Marcus Johnson',
    title: 'Senior Associate, Corporate',
    area: 'corporate',
    bio: 'Real estate transactions and commercial lease negotiation. Represents landlords, tenants, and developers.',
    photo: 'https://images.pexels.com/photos/8815934/pexels-photo-8815934.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    name: 'Diana Walsh',
    title: 'Associate, Family Law',
    area: 'family',
    bio: 'Prenuptial agreements, marital property disputes, and international custody matters across 3 jurisdictions.',
    photo: 'https://images.pexels.com/photos/5669604/pexels-photo-5669604.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    name: 'Carlos Reyes',
    title: 'Associate, Personal Injury',
    area: 'injury',
    bio: 'Workers compensation and auto accident specialist. Bilingual in Spanish and English.',
    photo: 'https://images.pexels.com/photos/8815940/pexels-photo-8815940.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

const RESULTS = [
  { amount: '$8.2M', type: 'Verdict', area: 'injury', desc: 'Catastrophic Injury — Construction Accident', detail: 'Worker suffered permanent disability after safety equipment failure on a commercial job site.' },
  { amount: '$4.5M', type: 'Settlement', area: 'corporate', desc: 'Breach of Contract — Technology Merger', detail: 'Successfully recovered damages when the opposing party failed to perform under a signed acquisition agreement.' },
  { amount: '$3.1M', type: 'Settlement', area: 'injury', desc: 'Medical Malpractice — Surgical Error', detail: 'Negotiated pre-trial settlement after establishing clear evidence of a preventable surgical complication.' },
  { amount: '$1.8M', type: 'Verdict', area: 'injury', desc: 'Wrongful Death — Auto Accident', detail: 'Jury verdict for family of victim killed by a negligent commercial truck driver.' },
  { amount: 'Protected', type: 'Estate Plan', area: 'estate', desc: '$12M Multi-Generational Trust', detail: 'Structured a dynasty trust protecting family wealth across three generations from estate taxes.' },
  { amount: '$920K', type: 'Settlement', area: 'family', desc: 'High-Asset Divorce — Business Valuation', detail: 'Secured favorable division of complex assets including two operating businesses and multiple real estate holdings.' },
  { amount: '$2.3M', type: 'Arbitration Award', area: 'corporate', desc: 'Shareholder Dispute — LLC Dissolution', detail: 'Obtained fair-market buyout for a minority shareholder who was being squeezed out by majority partners.' },
  { amount: '$650K', type: 'Settlement', area: 'injury', desc: 'Slip & Fall — Commercial Property', detail: 'Premises liability case where client suffered spinal injuries due to owner negligence.' },
  { amount: 'Resolved', type: 'Custody Order', area: 'family', desc: 'International Child Custody Recovery', detail: 'Successfully returned a child to the US under the Hague Convention after international parental abduction.' },
];

const TESTIMONIALS = [
  {
    text: "Thompson & Associates didn't just handle my case — they treated me like a person, not a file number. After my accident, Robert and his team fought hard and recovered far more than I expected. I can't recommend them highly enough.",
    name: 'Patricia Voss',
    meta: 'Personal Injury Client',
    photo: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    text: "We brought Thompson & Associates in for our company acquisition and they were outstanding. David Chen's attention to detail and strategic thinking saved us from a deal that could have been catastrophic. Worth every penny.",
    name: 'Thomas Greer',
    meta: 'CEO, Greer Technologies',
    photo: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    text: "During the most difficult time of my life, James Rivera was a calm, steady advocate. He navigated my divorce with professionalism and compassion, and the outcome exceeded what I thought was possible.",
    name: 'Rachel Moore',
    meta: 'Family Law Client',
    photo: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    text: "William Hayes made estate planning easy. He explained everything clearly, worked around our schedule, and gave us complete peace of mind that our family is protected. We've referred four friends to the firm since.",
    name: 'Gerald & Susan Park',
    meta: 'Estate Planning Clients',
    photo: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
];

const FAQS = [
  {
    area: 'general',
    question: 'How much does a consultation cost?',
    answer: 'Your first consultation is completely free and carries no obligation. We use this time to understand your situation and determine whether and how we can help. Most consultations are 30–45 minutes.',
  },
  {
    area: 'injury',
    question: 'Do personal injury cases require payment upfront?',
    answer: 'No. Personal injury cases are handled on a contingency fee basis — you pay nothing unless we win your case. Our fee is a percentage of the recovery, and we advance all case costs.',
  },
  {
    area: 'family',
    question: 'How long does a divorce typically take?',
    answer: 'An uncontested divorce can be completed in 60–90 days. Contested divorces involving property division or custody disputes typically take 6–18 months. The timeline depends heavily on the complexity of the issues and the willingness of both parties to negotiate.',
  },
  {
    area: 'estate',
    question: "Do I really need a will if I'm young and healthy?",
    answer: "Yes. A will is the only way to ensure your assets go to the people you choose and that your wishes about guardianship for minor children are honored. Without one, the state decides. We offer affordable will packages for individuals at any stage of life.",
  },
  {
    area: 'corporate',
    question: 'What is the difference between an LLC and a corporation?',
    answer: "Both offer liability protection, but they differ in taxation, governance, and flexibility. LLCs are generally simpler and offer pass-through taxation, making them popular for small businesses. Corporations are better suited for businesses seeking outside investment. We'll help you choose the right structure for your goals.",
  },
  {
    area: 'general',
    question: 'How quickly can I expect to hear back after contacting the firm?',
    answer: 'We guarantee a response from a qualified attorney or legal professional within one business day. For urgent matters, call our main line directly — we have staff available during extended hours.',
  },
  {
    area: 'injury',
    question: 'How long do I have to file a personal injury claim?',
    answer: 'The statute of limitations varies by state and claim type — typically 2–3 years from the date of injury, but exceptions can shorten this window significantly (e.g., claims against government entities). Contact us as soon as possible to protect your rights.',
  },
];

/* ============================================================
   UTILITIES
   ============================================================ */

function qs(sel, ctx = document) { return ctx.querySelector(sel); }

function buildAttrString(src) {
  return src.replace(/'/g, '&#39;').replace(/"/g, '&quot;');
}

/* ============================================================
   HEADER — scroll behavior & mobile menu
   ============================================================ */

function initHeader() {
  const header = qs('#site-header');
  const hamburger = qs('#hamburger');
  const mobileMenu = qs('#mobile-menu');
  const mobileLinks = mobileMenu.querySelectorAll('.mobile-nav-link');

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
    qs('#scroll-top').hidden = window.scrollY < 400;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
    mobileMenu.setAttribute('aria-hidden', String(!open));
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
    });
  });

  qs('#scroll-top').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ============================================================
   FINDER WIDGET
   ============================================================ */

function initFinder() {
  const tabs = document.querySelectorAll('.finder-tab');
  const optionsContainer = qs('#finder-options');
  const cta = qs('#finder-cta');
  let selectedFilter = null;

  function renderOptions(type) {
    selectedFilter = null;
    cta.setAttribute('aria-disabled', 'true');
    cta.removeAttribute('href');
    optionsContainer.innerHTML = '';

    FINDER_OPTIONS[type].forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'finder-option';
      btn.textContent = opt.label;
      btn.dataset.filter = opt.filter;
      btn.addEventListener('click', () => {
        optionsContainer.querySelectorAll('.finder-option').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedFilter = opt.filter;
        const target = opt.filter === 'all' ? '#attorneys' : `#attorneys?filter=${opt.filter}`;
        cta.setAttribute('href', '#attorneys');
        cta.dataset.filterTarget = opt.filter;
        cta.setAttribute('aria-disabled', 'false');
      });
      optionsContainer.appendChild(btn);
    });
  }

  cta.addEventListener('click', (e) => {
    if (!selectedFilter) { e.preventDefault(); return; }
    const filter = cta.dataset.filterTarget || 'all';
    applyAttorneyFilter(filter);
    const filterBtn = document.querySelector(`.filter-btn[data-filter="${filter}"]`);
    if (filterBtn) {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      filterBtn.classList.add('active');
    }
  });

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      renderOptions(tab.dataset.type);
    });
  });

  renderOptions('individual');
}

/* ============================================================
   COUNTER ANIMATION
   ============================================================ */

function animateCounters() {
  const counters = document.querySelectorAll('.stat-num[data-count]');
  counters.forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = target >= 100 ? '+' : '%';
    const duration = 1600;
    const step = duration / 60;
    let current = 0;
    const increment = target / (duration / step);

    const timer = setInterval(() => {
      current = Math.min(current + increment, target);
      el.textContent = Math.floor(current).toLocaleString() + (current >= target ? suffix : '');
      if (current >= target) clearInterval(timer);
    }, step);
  });
}

/* ============================================================
   ATTORNEY GRID
   ============================================================ */

const AREA_BADGE = {
  corporate: 'badge-corporate',
  family:    'badge-family',
  injury:    'badge-injury',
  estate:    'badge-estate',
};

const AREA_LABEL = {
  corporate: 'Corporate Law',
  family:    'Family Law',
  injury:    'Personal Injury',
  estate:    'Estate Planning',
};

function buildAttorneyCard(atty) {
  const badgeClass = AREA_BADGE[atty.area] || '';
  const areaLabel = AREA_LABEL[atty.area] || '';
  return `
    <article class="attorney-card reveal" data-area="${atty.area}" aria-label="${buildAttrString(atty.name)}, ${buildAttrString(atty.title)}">
      <div class="attorney-photo">
        <img src="${atty.photo}" alt="Portrait of ${buildAttrString(atty.name)}" loading="lazy" />
        <span class="attorney-area-badge ${badgeClass}">${areaLabel}</span>
      </div>
      <div class="attorney-body">
        <h3 class="attorney-name">${atty.name}</h3>
        <p class="attorney-title">${atty.title}</p>
        <p class="attorney-bio">${atty.bio}</p>
        <div class="attorney-contact">
          <a href="#contact" class="contact-primary">Consult</a>
          <a href="#contact" class="contact-secondary">View Profile</a>
        </div>
      </div>
    </article>
  `;
}

function renderAttorneys() {
  const grid = qs('#attorney-grid');
  grid.innerHTML = ATTORNEYS.map(buildAttorneyCard).join('');
}

function applyAttorneyFilter(filter) {
  document.querySelectorAll('.attorney-card').forEach(card => {
    if (filter === 'all' || card.dataset.area === filter) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
}

function initAttorneyFilters() {
  renderAttorneys();

  // Wire practice-area card links
  document.querySelectorAll('.practice-link[data-filter]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const filter = link.dataset.filter;
      applyAttorneyFilter(filter);
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      const btn = document.querySelector(`.filter-btn[data-filter="${filter}"]`);
      if (btn) btn.classList.add('active');
      qs('#attorneys').scrollIntoView({ behavior: 'smooth' });
    });
  });

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyAttorneyFilter(btn.dataset.filter);
    });
  });
}

/* ============================================================
   CASE RESULTS
   ============================================================ */

const AREA_TAG_COLOR = {
  corporate: 'background:#1b3869',
  family:    'background:#2d7a4e',
  injury:    'background:#a84c1f',
  estate:    'background:#6d4c9a',
};

function buildResultCard(r) {
  const tagStyle = AREA_TAG_COLOR[r.area] || 'background:#555';
  const areaLabel = AREA_LABEL[r.area] || r.area;
  return `
    <div class="result-card reveal" data-area="${r.area}">
      <div class="result-amount">${r.amount}</div>
      <div class="result-type">${r.type}</div>
      <div class="result-desc">${r.desc}</div>
      <p class="result-detail">${r.detail}</p>
      <span class="result-area-tag" style="${tagStyle}">${areaLabel}</span>
    </div>
  `;
}

function initResults() {
  const grid = qs('#results-grid');
  grid.innerHTML = RESULTS.map(buildResultCard).join('');

  document.querySelectorAll('.results-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.results-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.result-card').forEach(card => {
        card.classList.toggle('hidden', filter !== 'all' && card.dataset.area !== filter);
      });
    });
  });
}

/* ============================================================
   TESTIMONIALS CAROUSEL
   ============================================================ */

function initTestimonials() {
  const track = qs('#testimonials-track');
  const dotsContainer = qs('#carousel-dots');

  track.innerHTML = TESTIMONIALS.map((t, i) => `
    <div class="testimonial-slide ${i === 0 ? 'active' : ''}" role="tabpanel" id="slide-${i}" aria-label="Testimonial ${i + 1} of ${TESTIMONIALS.length}">
      <div class="testimonial-card">
        <span class="testimonial-quote-mark" aria-hidden="true">&ldquo;</span>
        <div class="testimonial-stars" aria-label="5 stars">
          ${'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>'.repeat(5)}
        </div>
        <blockquote class="testimonial-text">${t.text}</blockquote>
        <div class="testimonial-author">
          <div class="testimonial-avatar"><img src="${t.photo}" alt="${buildAttrString(t.name)}" loading="lazy" /></div>
          <div class="testimonial-author-info">
            <div class="testimonial-name">${t.name}</div>
            <div class="testimonial-meta">${t.meta}</div>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  dotsContainer.innerHTML = TESTIMONIALS.map((_, i) => `
    <button class="carousel-dot ${i === 0 ? 'active' : ''}" data-index="${i}" role="tab" aria-selected="${i === 0}" aria-controls="slide-${i}" aria-label="Testimonial ${i + 1}"></button>
  `).join('');

  let current = 0;
  let autoTimer;

  function goTo(idx) {
    const slides = track.querySelectorAll('.testimonial-slide');
    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    dots[current].setAttribute('aria-selected', 'false');
    current = (idx + TESTIMONIALS.length) % TESTIMONIALS.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
    dots[current].setAttribute('aria-selected', 'true');
  }

  function startAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goTo(current + 1), 6000);
  }

  qs('#prev-btn').addEventListener('click', () => { goTo(current - 1); startAuto(); });
  qs('#next-btn').addEventListener('click', () => { goTo(current + 1); startAuto(); });
  dotsContainer.querySelectorAll('.carousel-dot').forEach(dot => {
    dot.addEventListener('click', () => { goTo(parseInt(dot.dataset.index, 10)); startAuto(); });
  });

  startAuto();
}

/* ============================================================
   FAQ ACCORDION
   ============================================================ */

function initFAQ() {
  const container = qs('#faq-accordion');
  container.innerHTML = FAQS.map((faq, i) => `
    <div class="faq-item">
      <button class="faq-trigger" aria-expanded="false" aria-controls="faq-body-${i}" id="faq-trigger-${i}">
        ${faq.question}
        <span class="faq-icon" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </span>
      </button>
      <div class="faq-body" id="faq-body-${i}" role="region" aria-labelledby="faq-trigger-${i}">
        <p class="faq-answer">${faq.answer}</p>
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.faq-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const expanded = trigger.getAttribute('aria-expanded') === 'true';
      // Close all
      container.querySelectorAll('.faq-trigger').forEach(t => {
        t.setAttribute('aria-expanded', 'false');
        qs(`#${t.getAttribute('aria-controls')}`).classList.remove('open');
      });
      // Open clicked unless it was already open
      if (!expanded) {
        trigger.setAttribute('aria-expanded', 'true');
        qs(`#${trigger.getAttribute('aria-controls')}`).classList.add('open');
      }
    });
  });
}

/* ============================================================
   CONTACT FORM
   ============================================================ */

function initContactForm() {
  const form = qs('#contact-form');
  const successMsg = qs('#form-success');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    form.querySelectorAll('[required]').forEach(field => {
      field.classList.remove('error');
      const isEmpty = field.type === 'checkbox' ? !field.checked : !field.value.trim();
      if (isEmpty) { field.classList.add('error'); valid = false; }
    });

    if (!valid) {
      const firstError = form.querySelector('.error');
      if (firstError) firstError.focus();
      return;
    }

    const btn = qs('#cf-submit');
    btn.disabled = true;
    btn.textContent = 'Sending…';

    setTimeout(() => {
      form.hidden = true;
      successMsg.hidden = false;
    }, 800);
  });

  // Clear error state on input
  form.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('input', () => field.classList.remove('error'));
  });
}

/* ============================================================
   PORTAL FORM
   ============================================================ */

function initPortalForm() {
  qs('#portal-form').addEventListener('submit', (e) => {
    e.preventDefault();
    // Placeholder — no backend in this demo
    alert('Client portal login is not yet connected. Please contact the firm directly.');
  });
}

/* ============================================================
   SCROLL REVEAL (IntersectionObserver)
   ============================================================ */

function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Hero counter fires once when hero is visible
  const heroObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateCounters();
      heroObserver.disconnect();
    }
  }, { threshold: 0.3 });
  const heroStats = qs('.hero-stats');
  if (heroStats) heroObserver.observe(heroStats);
}

/* ============================================================
   SMOOTH SCROLL for anchor links (fallback)
   ============================================================ */

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = qs(link.getAttribute('href').split('?')[0]);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* ============================================================
   BOOT
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initFinder();
  initAttorneyFilters();
  initResults();
  initTestimonials();
  initFAQ();
  initContactForm();
  initPortalForm();
  initSmoothScroll();

  // Reveal must run after content is rendered
  requestAnimationFrame(() => initReveal());
});
