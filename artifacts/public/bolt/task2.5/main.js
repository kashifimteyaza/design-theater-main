import './style.css';

// ============================================================
// DATA
// ============================================================

const brands = [
  {
    id: 'techflow',
    name: 'TechFlow',
    sector: 'B2B Software',
    icon: '⚡',
    tagline: 'Enterprise workflow automation that ships on day one.',
    description: 'TechFlow powers digital transformation for Fortune 500 companies with AI-driven process automation, real-time analytics dashboards, and enterprise-grade integration pipelines.',
    metrics: [
      { value: '2,400+', label: 'Enterprise clients' },
      { value: '$148M', label: 'ARR' },
      { value: '99.9%', label: 'Uptime SLA' },
    ],
    pill: 'SaaS',
    featured: true,
  },
  {
    id: 'brightstart',
    name: 'BrightStart',
    sector: 'Children\'s Education',
    icon: '🌟',
    tagline: 'Where curiosity becomes a superpower.',
    description: 'BrightStart\'s playful, evidence-based curriculum reaches 1.2M learners across 38 countries — blending physical play kits with adaptive digital experiences.',
    metrics: [
      { value: '1.2M', label: 'Active learners' },
      { value: '38', label: 'Countries' },
    ],
    pill: 'EdTech',
    featured: false,
  },
  {
    id: 'urbanEats',
    name: 'UrbanEats',
    sector: 'Food Delivery',
    icon: '🍜',
    tagline: 'The city\'s best restaurants, at your door in 22 minutes.',
    description: 'UrbanEats connects 18,000 independent restaurants to urban food lovers through hyper-local logistics, ghost kitchen partnerships, and a cult-favorite app experience.',
    metrics: [
      { value: '18K', label: 'Restaurants' },
      { value: '22 min', label: 'Avg delivery' },
    ],
    pill: 'Marketplace',
    featured: false,
  },
  {
    id: 'greenbuild',
    name: 'GreenBuild',
    sector: 'Sustainable Construction',
    icon: '🌿',
    tagline: 'Net-zero buildings that are beautiful by design.',
    description: 'GreenBuild is redefining the construction industry with sustainable materials, passive energy systems, and LEED-certified project management — from concept to certificate.',
    metrics: [
      { value: '340+', label: 'Projects delivered' },
      { value: '100%', label: 'LEED certified' },
    ],
    pill: 'CleanTech',
    featured: false,
  },
  {
    id: 'wellness',
    name: 'WellnessWorks',
    sector: 'Corporate Health',
    icon: '💚',
    tagline: 'Healthier teams. Measurable outcomes.',
    description: 'WellnessWorks delivers holistic corporate wellness programs — combining mental health support, biometric tracking, and personalized coaching to reduce absenteeism and boost retention.',
    metrics: [
      { value: '600+', label: 'Corporate clients' },
      { value: '31%', label: 'Avg. absenteeism reduction' },
    ],
    pill: 'HealthTech',
    featured: false,
  },
];

const leaders = [
  {
    name: 'Margaret Chen',
    role: 'CEO & Co-Founder',
    bio: '20+ years building and scaling global holding companies across Asia-Pacific and North America.',
    emoji: '👤',
    bg: '#EBF4FF',
  },
  {
    name: 'David Okafor',
    role: 'Chief Investment Officer',
    bio: 'Former Goldman Sachs MD. Led $4.2B in M&A transactions across five industry verticals.',
    emoji: '👤',
    bg: '#FFF0EA',
  },
  {
    name: 'Sofia Reyes',
    role: 'Chief Operating Officer',
    bio: 'Operational architect behind the scaling of three portfolio companies past the $100M ARR mark.',
    emoji: '👤',
    bg: '#EBF6F0',
  },
  {
    name: 'James Park',
    role: 'Chief Strategy Officer',
    bio: 'Serial entrepreneur and board advisor with 7 successful exits across SaaS, edtech, and logistics.',
    emoji: '👤',
    bg: '#EBF8F9',
  },
];

const trustItems = [
  'Forbes Global 2000 Partner',
  'B Corp Certified',
  '$2.4B Assets Under Management',
  'ISO 27001 Certified',
  '5 Portfolio Companies',
  'Founded 2009',
  '3,200+ Employees Across Brands',
  'Operations in 42 Countries',
];

// ============================================================
// RENDER
// ============================================================

function renderNav() {
  return `
    <nav class="nav" id="main-nav" role="navigation" aria-label="Main navigation">
      <div class="nav-inner">
        <a href="#" class="nav-logo" aria-label="Global Ventures Inc. home">
          <div class="nav-logo-mark">GV</div>
          <div class="nav-logo-text">
            <span class="nav-logo-primary">Global Ventures</span>
            <span class="nav-logo-secondary">Inc.</span>
          </div>
        </a>

        <ul class="nav-links" role="list">
          <li><a href="#portfolio" onclick="scrollTo('portfolio')">Portfolio</a></li>
          <li><a href="#strategy" onclick="scrollTo('strategy')">Our Approach</a></li>
          <li><a href="#leadership" onclick="scrollTo('leadership')">Leadership</a></li>
          <li><a href="#contact" onclick="scrollTo('contact')">Contact</a></li>
        </ul>

        <ul class="nav-audience" role="list">
          <li><a href="#investors" class="btn-investors" onclick="scrollTo('investors')">Investors</a></li>
          <li><a href="#careers" class="btn-careers" onclick="scrollTo('careers')">Careers</a></li>
        </ul>

        <button class="nav-mobile-toggle" aria-label="Toggle mobile menu" id="mobile-toggle">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  `;
}

function renderHero() {
  const mosaicCards = brands.map((b, i) => {
    if (i === 0) {
      return `
        <div class="mosaic-card featured" role="article">
          <div class="mosaic-icon ${b.id}">${b.icon}</div>
          <div>
            <div class="mosaic-name">${b.name}</div>
            <div class="mosaic-tag">${b.sector}</div>
          </div>
          <div style="margin-left:auto;font-size:11px;font-weight:700;color:var(--techflow);background:var(--techflow-bg);padding:4px 10px;border-radius:100px;">Featured</div>
        </div>
      `;
    }
    return `
      <div class="mosaic-card" role="article">
        <div class="mosaic-icon ${b.id}">${b.icon}</div>
        <div class="mosaic-name">${b.name}</div>
        <div class="mosaic-tag">${b.sector}</div>
      </div>
    `;
  }).join('');

  return `
    <section class="hero" aria-label="Hero">
      <div class="hero-bg-grid" aria-hidden="true"></div>
      <div class="hero-bg-glow" aria-hidden="true"></div>
      <div class="hero-bg-glow-2" aria-hidden="true"></div>

      <div class="hero-inner">
        <div class="hero-content">
          <div class="hero-label">Global Ventures Inc.</div>
          <h1 class="hero-title">
            Building the
            <span>industry leaders</span>
            of tomorrow.
          </h1>
          <p class="hero-body">
            We identify, acquire, and actively grow exceptional companies across high-growth sectors — providing strategic capital, operational expertise, and a shared infrastructure that lets each brand thrive on its own terms.
          </p>
          <div class="hero-ctas">
            <a href="#portfolio" class="btn-primary" onclick="smoothScroll('portfolio')">
              Explore Our Portfolio
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a>
            <a href="#investors" class="btn-secondary" onclick="smoothScroll('investors')">
              Investor Relations
            </a>
          </div>
          <div class="hero-stats">
            <div class="hero-stat">
              <div class="hero-stat-value">5<em>+</em></div>
              <div class="hero-stat-label">Portfolio Brands</div>
            </div>
            <div class="hero-stat">
              <div class="hero-stat-value">$2.4<em>B</em></div>
              <div class="hero-stat-label">Assets Under Mgmt</div>
            </div>
            <div class="hero-stat">
              <div class="hero-stat-value">42<em></em></div>
              <div class="hero-stat-label">Countries Active</div>
            </div>
          </div>
        </div>

        <div class="hero-mosaic" aria-label="Portfolio companies preview">
          ${mosaicCards}
        </div>
      </div>
    </section>
  `;
}

function renderTrustBar() {
  const items = [...trustItems, ...trustItems].map(t =>
    `<span class="trust-item"><span class="trust-dot" aria-hidden="true"></span>${t}</span>`
  ).join('');

  return `
    <div class="trust-bar" aria-label="Company highlights">
      <div class="trust-bar-inner" aria-hidden="true">
        ${items}
      </div>
    </div>
  `;
}

function renderPortfolioCard(brand) {
  const metricsHtml = brand.metrics.map(m => `
    <div class="card-metric">
      <div class="card-metric-value">${m.value}</div>
      <div class="card-metric-label">${m.label}</div>
    </div>
  `).join('');

  return `
    <article class="portfolio-card brand-${brand.id} fade-up" tabindex="0" aria-label="${brand.name} portfolio card">
      <div class="card-header">
        <div class="card-logo-area">
          <div class="card-brand-icon">${brand.icon}</div>
          <div>
            <div class="card-brand-name">${brand.name}</div>
            <div class="card-brand-sector">${brand.sector}</div>
          </div>
        </div>
        <div class="card-pill">${brand.pill}</div>
      </div>
      <div class="card-body">
        <div class="card-tagline">${brand.tagline}</div>
        <p class="card-description">${brand.description}</p>
        <div class="card-metrics">${metricsHtml}</div>
        <a class="card-cta" href="#" aria-label="Learn more about ${brand.name}">
          Learn more
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>
      </div>
      <div class="card-bar" aria-hidden="true"></div>
    </article>
  `;
}

function renderPortfolio() {
  const cards = brands.map(renderPortfolioCard).join('');

  return `
    <section class="section portfolio" id="portfolio" aria-label="Portfolio companies">
      <div class="section-inner">
        <div class="section-header">
          <div>
            <div class="section-label">Our Portfolio</div>
            <h2 class="section-title">Five distinct brands.<br>One strategic vision.</h2>
          </div>
          <p class="section-body">
            Each company operates independently with its own leadership, culture, and brand identity — backed by Global Ventures' shared services platform, capital access, and 15 years of operational expertise.
          </p>
        </div>
        <div class="portfolio-grid" role="list">
          ${cards}
        </div>
      </div>
    </section>
  `;
}

function renderAudience() {
  return `
    <section class="section audience" id="investors" aria-label="Who we serve">
      <div class="section-inner">
        <div class="section-header">
          <div>
            <div class="section-label">Who We Serve</div>
            <h2 class="section-title">Built for those<br>who build things.</h2>
          </div>
          <p class="section-body">
            Whether you're looking to invest, partner, or join our ecosystem — Global Ventures offers access to a portfolio of category leaders and the infrastructure to grow alongside them.
          </p>
        </div>
        <div class="audience-grid">

          <div class="audience-card investors fade-up" tabindex="0" role="article" aria-label="Investor information">
            <div class="audience-icon">📈</div>
            <h3 class="audience-title">Investors</h3>
            <p class="audience-body">
              Access detailed financial reporting, portfolio performance data, and strategic roadmaps across our five operating companies. Our investor portal provides real-time insights and direct lines to our IR team.
            </p>
            <ul class="audience-list" role="list">
              <li>Quarterly earnings & reports</li>
              <li>ESG & sustainability disclosures</li>
              <li>Board composition & governance</li>
              <li>Capital allocation strategy</li>
            </ul>
            <a class="audience-link" href="#" aria-label="Access investor portal">
              Investor Portal
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a>
          </div>

          <div class="audience-card partners fade-up" tabindex="0" role="article" aria-label="Acquisition and partnership information">
            <div class="audience-icon">🤝</div>
            <h3 class="audience-title">Acquisition Targets</h3>
            <p class="audience-body">
              We actively seek companies with strong fundamentals, proven teams, and clear paths to market leadership. Our acquisition approach is collaborative — we preserve what makes your company exceptional.
            </p>
            <ul class="audience-list" role="list">
              <li>Non-dilutive growth capital</li>
              <li>Shared operational infrastructure</li>
              <li>Cross-portfolio distribution</li>
              <li>Brand independence preserved</li>
            </ul>
            <a class="audience-link" href="#" aria-label="Start acquisition discussion">
              Start a Conversation
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a>
          </div>

          <div class="audience-card careers fade-up" tabindex="0" role="article" aria-label="Career opportunities" id="careers">
            <div class="audience-icon">🎯</div>
            <h3 class="audience-title">Job Seekers</h3>
            <p class="audience-body">
              Work at the forefront of five different industries — with the resources of a global holding company and the energy of a focused team. 3,200+ roles across all brands and levels.
            </p>
            <ul class="audience-list" role="list">
              <li>Roles at TechFlow, BrightStart & more</li>
              <li>Global relocation support</li>
              <li>Cross-brand internal mobility</li>
              <li>Equity participation programs</li>
            </ul>
            <a class="audience-link" href="#" aria-label="View open positions">
              View Open Roles
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a>
          </div>

        </div>
      </div>
    </section>
  `;
}

function renderStrategy() {
  return `
    <section class="section strategy" id="strategy" aria-label="Our approach">
      <div class="section-inner">
        <div class="strategy-grid">
          <div>
            <div class="section-label">Our Approach</div>
            <h2 class="section-title">Strategic ownership. Operational autonomy.</h2>
            <p class="section-body" style="margin-bottom:var(--space-5);">
              We don't manage our companies — we empower them. Global Ventures provides the capital, connections, and infrastructure that remove friction, while each brand's leadership team drives the vision.
            </p>
            <a href="#contact" class="btn-primary" onclick="smoothScroll('contact')">
              Partner with us
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a>
          </div>
          <div class="strategy-pillars">
            <div class="pillar fade-up">
              <div class="pillar-num">01</div>
              <div class="pillar-content">
                <div class="pillar-title">Capital Access</div>
                <div class="pillar-body">Portfolio companies access a $500M+ credit facility and co-investment network, enabling rapid scaling without dilutive fundraising rounds.</div>
              </div>
            </div>
            <div class="pillar fade-up">
              <div class="pillar-num">02</div>
              <div class="pillar-content">
                <div class="pillar-title">Shared Services Platform</div>
                <div class="pillar-body">Legal, HR, finance, and enterprise technology shared across all brands — reducing overhead and freeing leadership to focus on product and market.</div>
              </div>
            </div>
            <div class="pillar fade-up">
              <div class="pillar-num">03</div>
              <div class="pillar-content">
                <div class="pillar-title">Cross-Portfolio Synergies</div>
                <div class="pillar-body">Five industries create unexpected connections. UrbanEats partners with WellnessWorks on healthy meal plans. TechFlow automates GreenBuild's compliance workflows.</div>
              </div>
            </div>
            <div class="pillar fade-up">
              <div class="pillar-num">04</div>
              <div class="pillar-content">
                <div class="pillar-title">Brand Independence</div>
                <div class="pillar-body">We never dilute a brand's identity or customer relationship. Each company maintains its own culture, leadership team, and market positioning.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderLeadership() {
  const cards = leaders.map(l => `
    <div class="leader-card fade-up" role="article" aria-label="${l.name}, ${l.role}">
      <div class="leader-photo-placeholder" style="background:${l.bg};" aria-hidden="true">${l.emoji}</div>
      <div class="leader-info">
        <div class="leader-name">${l.name}</div>
        <div class="leader-role">${l.role}</div>
        <p class="leader-bio">${l.bio}</p>
      </div>
    </div>
  `).join('');

  return `
    <section class="section leadership" id="leadership" aria-label="Leadership team">
      <div class="section-inner">
        <div class="section-header">
          <div>
            <div class="section-label">Leadership</div>
            <h2 class="section-title">Operators who've<br>done it before.</h2>
          </div>
          <p class="section-body">
            Our executive team brings decades of experience from investment banking, global operations, and company building — united by a belief that great businesses are built by great people.
          </p>
        </div>
        <div class="leadership-grid">
          ${cards}
        </div>
      </div>
    </section>
  `;
}

function renderFooter() {
  const brandDots = [
    { color: 'var(--techflow)', name: 'TechFlow' },
    { color: 'var(--brightstart)', name: 'BrightStart' },
    { color: 'var(--urbanEats)', name: 'UrbanEats' },
    { color: 'var(--greenbuild)', name: 'GreenBuild' },
    { color: 'var(--wellness)', name: 'WellnessWorks' },
  ].map(b => `
    <div class="footer-brand-dot" style="background:${b.color}" title="${b.name}" role="img" aria-label="${b.name}"></div>
  `).join('');

  return `
    <footer class="footer" id="contact" aria-label="Footer">
      <div class="footer-inner">
        <div class="footer-top">
          <div class="footer-brand">
            <div class="footer-logo">
              <div class="footer-logo-mark">GV</div>
              <div class="footer-logo-name">Global Ventures Inc.</div>
            </div>
            <p class="footer-tagline">
              A diversified holding company building category-defining brands across five high-growth industries since 2009.
            </p>
            <div style="display:flex;gap:var(--space-2);">
              <a href="#" style="color:rgba(255,255,255,0.35);font-size:20px;text-decoration:none;" aria-label="LinkedIn">in</a>
              <a href="#" style="color:rgba(255,255,255,0.35);font-size:20px;text-decoration:none;" aria-label="Twitter">𝕏</a>
            </div>
          </div>

          <div>
            <div class="footer-col-title">Portfolio</div>
            <ul class="footer-links" role="list">
              ${brands.map(b => `<li><a href="#" aria-label="${b.name} website">${b.name}</a></li>`).join('')}
            </ul>
          </div>

          <div>
            <div class="footer-col-title">Company</div>
            <ul class="footer-links" role="list">
              <li><a href="#">About GV</a></li>
              <li><a href="#">Our Approach</a></li>
              <li><a href="#">Leadership</a></li>
              <li><a href="#">Press & Media</a></li>
              <li><a href="#">Sustainability</a></li>
            </ul>
          </div>

          <div>
            <div class="footer-col-title">Get in Touch</div>
            <ul class="footer-links" role="list">
              <li><a href="#">Investor Relations</a></li>
              <li><a href="#">Acquisition Inquiries</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">General Inquiries</a></li>
            </ul>
            <div style="margin-top:var(--space-3);">
              <div style="font-size:12px;color:rgba(255,255,255,0.25);line-height:1.8;">
                One Financial Plaza, 44th Floor<br>
                New York, NY 10004<br>
                <a href="mailto:ir@globalventures.com" style="color:rgba(255,255,255,0.35);text-decoration:none;">ir@globalventures.com</a>
              </div>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <div class="footer-legal">
            &copy; 2026 Global Ventures Inc. All rights reserved. &nbsp;&middot;&nbsp;
            <a href="#">Privacy Policy</a> &nbsp;&middot;&nbsp;
            <a href="#">Terms of Use</a> &nbsp;&middot;&nbsp;
            <a href="#">Cookie Preferences</a>
          </div>
          <div class="footer-brands-mini" aria-label="Portfolio brands" role="list">
            ${brandDots}
          </div>
        </div>
      </div>
    </footer>
  `;
}

// ============================================================
// ASSEMBLE
// ============================================================

function render() {
  document.getElementById('app').innerHTML = `
    ${renderNav()}
    <main id="main-content">
      ${renderHero()}
      ${renderTrustBar()}
      ${renderPortfolio()}
      ${renderAudience()}
      ${renderStrategy()}
      ${renderLeadership()}
    </main>
    ${renderFooter()}
  `;
}

// ============================================================
// INTERACTIONS
// ============================================================

function smoothScroll(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Expose globally for inline onclick handlers
window.smoothScroll = smoothScroll;

function initNav() {
  const nav = document.getElementById('main-nav');
  const toggle = document.getElementById('mobile-toggle');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });

  if (toggle) {
    toggle.addEventListener('click', () => {
      // Simple mobile: toggle scrolled state to show/hide
      nav.classList.toggle('mobile-open');
    });
  }

  // Override all nav scroll links
  nav.querySelectorAll('a[onclick]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
    });
  });
}

function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
}

function initPortfolioCards() {
  // Keyboard navigation for cards
  document.querySelectorAll('.portfolio-card').forEach(card => {
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const cta = card.querySelector('.card-cta');
        if (cta) cta.click();
      }
    });
  });
}

// ============================================================
// BOOT
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  render();
  initNav();
  initScrollAnimations();
  initPortfolioCards();
});
