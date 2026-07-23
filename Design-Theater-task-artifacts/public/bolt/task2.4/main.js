import './style.css'

const products = [
  {
    name: 'Meridian Coat',
    category: 'Outerwear',
    material: '72% recycled ocean cashmere, 28% organic wool',
    price: '$740',
    badge: 'New Arrival',
    image: 'https://images.pexels.com/photos/7691058/pexels-photo-7691058.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Luxe Verde Meridian Coat — structured silhouette in ocean-recycled cashmere'
  },
  {
    name: 'Solitude Blazer',
    category: 'Tailoring',
    material: '100% organic linen, zero-waste cut',
    price: '$580',
    badge: null,
    image: 'https://images.pexels.com/photos/5709661/pexels-photo-5709661.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Luxe Verde Solitude Blazer — minimalist linen tailoring'
  },
  {
    name: 'Estuary Dress',
    category: 'Ready to Wear',
    material: '60% post-consumer HDPE, 40% GOTS cotton',
    price: '$420',
    badge: 'Bestseller',
    image: 'https://images.pexels.com/photos/6069552/pexels-photo-6069552.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Luxe Verde Estuary Dress — fluid drape from recycled marine plastics'
  }
]

const pillars = [
  {
    number: '01',
    label: 'Materials',
    name: 'Ocean-Sourced Fibres',
    stat: '48% post-consumer ocean plastic per garment',
    body: 'We partner with coastal recovery networks across 14 countries to source post-consumer HDPE and nylon from the ocean floor. Through advanced hydrothermal processing, these materials are transformed into fibres indistinguishable — by hand or by eye — from virgin cashmere or silk.'
  },
  {
    number: '02',
    label: 'Production',
    name: 'Zero-Waste Ateliers',
    stat: '< 2% textile waste across all production runs',
    body: 'Every pattern is digitally optimised before a single piece of fabric is cut. Remaining offcuts are woven into accessories or composted through our certified organic waste programme. Our ateliers in Lisbon and Copenhagen operate on 100% renewable energy.'
  },
  {
    number: '03',
    label: 'Carbon',
    name: 'Scope 3 Neutral',
    stat: 'Net zero across the full supply chain since 2023',
    body: 'We measure emissions at every node: raw material extraction, fibre processing, dyeing, garment construction, packaging, and last-mile delivery. What we cannot eliminate, we offset through verified reforestation projects with Gold Standard certification.'
  },
  {
    number: '04',
    label: 'Longevity',
    name: 'Lifetime Guarantee',
    stat: 'Free repair service for the lifetime of the garment',
    body: 'We engineer our pieces to outlast trend cycles by decades. Every Luxe Verde garment comes with a lifetime repair guarantee. When a garment genuinely reaches end-of-life, our takeback programme recovers the fibres for use in new collections.'
  }
]

const processSteps = [
  { icon: '01', label: 'Recovery', name: 'Ocean Collection', desc: 'Marine plastic recovered from coastal waters across 14 countries' },
  { icon: '02', label: 'Processing', name: 'Fibre Conversion', desc: 'Hydrothermal breakdown into luxury-grade textile fibres' },
  { icon: '03', label: 'Dyeing', name: 'Natural Colouring', desc: 'Plant-based dyes, closed-loop water system, zero discharge' },
  { icon: '04', label: 'Atelier', name: 'Hand Construction', desc: 'Skilled artisans, zero-waste patterns, renewable energy' },
  { icon: '05', label: 'Delivery', name: 'Carbon-Neutral Ship', desc: 'Biodegradable packaging, offset last-mile logistics' }
]

function renderNav() {
  return `
    <nav class="nav" id="main-nav" role="navigation" aria-label="Primary navigation">
      <a href="#" class="nav__logo" aria-label="Luxe Verde — Home">LUXE <span>VERDE</span></a>
      <ul class="nav__links">
        <li><a href="#collection">Collection</a></li>
        <li><a href="#philosophy">Philosophy</a></li>
        <li><a href="#process">Provenance</a></li>
        <li><a href="#about">About</a></li>
      </ul>
      <a href="#collection" class="btn nav__cta">Shop Now</a>
    </nav>
  `
}

function renderHero() {
  return `
    <section class="hero" id="hero" aria-label="Hero">
      <div class="hero__image-panel">
        <img
          src="https://images.pexels.com/photos/6585757/pexels-photo-6585757.jpeg?auto=compress&cs=tinysrgb&w=1400"
          alt="Model wearing Luxe Verde SS25 — Meridian collection shot at dawn on coastal cliffs"
          loading="eager"
        />
        <div class="hero__material-tag">
          <p class="t-caption">SS25 Collection — Ocean Cashmere</p>
        </div>
      </div>
      <div class="hero__content-panel">
        <div class="hero__eyebrow">
          <span class="hero__eyebrow-line" aria-hidden="true"></span>
          <span class="t-label">Spring / Summer 2025</span>
        </div>
        <h1 class="t-display hero__title">
          Luxury<br/>
          <em>without</em><br/>
          compromise.
        </h1>
        <p class="t-subheading hero__subtitle">
          Garments of exceptional quality, made entirely from recovered ocean materials and organic fibres.
        </p>
        <div class="hero__actions">
          <a href="#collection" class="btn btn--primary">
            Explore Collection
            <span class="btn__arrow" aria-hidden="true"></span>
          </a>
          <a href="#philosophy" class="btn btn--ghost">Our Process</a>
        </div>
      </div>
      <div class="hero__scroll-hint" aria-hidden="true">
        <div class="hero__scroll-line"></div>
        <span class="t-caption">Scroll</span>
      </div>
    </section>
  `
}

function renderStatsBar() {
  const stats = [
    { number: '48<span>%</span>', label: 'Post-Consumer Ocean Plastic' },
    { number: '14', label: 'Coastal Recovery Nations' },
    { number: '< 2<span>%</span>', label: 'Textile Waste Per Run' },
    { number: '0', label: 'Net Carbon Since 2023' }
  ]
  return `
    <section class="stats-bar" aria-label="Impact metrics">
      <div class="container">
        <div class="stats-bar__inner">
          ${stats.map(s => `
            <div class="stats-bar__item reveal">
              <p class="stats-bar__number">${s.number}</p>
              <p class="stats-bar__label">${s.label}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `
}

function renderEditorial() {
  return `
    <section class="editorial" aria-label="Featured editorial">
      <div class="container">

        <div class="editorial__grid">
          <div class="editorial__text reveal">
            <div class="editorial__label">
              <span class="editorial__label-line" aria-hidden="true"></span>
              <span class="t-label">The Craft</span>
            </div>
            <h2 class="t-headline editorial__title">
              Precision in every<br/><em>recovered fibre</em>
            </h2>
            <p class="t-body editorial__body">
              The Meridian Coat begins its life at sea — HDPE debris netted from the waters off Mozambique and Portugal. Twelve weeks of processing later, those fibres are hand-woven into a cashmere-weight fabric indistinguishable from the finest natural materials. Exceptional quality is not a compromise for sustainability. It is its evidence.
            </p>
            <ul class="editorial__spec-list" aria-label="Material specifications">
              <li class="editorial__spec-item">
                <span class="editorial__spec-key">Primary Fibre</span>
                <span class="editorial__spec-val">72% Ocean-Recovered HDPE</span>
              </li>
              <li class="editorial__spec-item">
                <span class="editorial__spec-key">Secondary Fibre</span>
                <span class="editorial__spec-val">28% GOTS Certified Wool</span>
              </li>
              <li class="editorial__spec-item">
                <span class="editorial__spec-key">Dye Method</span>
                <span class="editorial__spec-val">Plant-Based, Zero-Discharge</span>
              </li>
              <li class="editorial__spec-item">
                <span class="editorial__spec-key">Construction</span>
                <span class="editorial__spec-val">Atelier Lisbon, Handfinished</span>
              </li>
              <li class="editorial__spec-item">
                <span class="editorial__spec-key">Carbon Impact</span>
                <span class="editorial__spec-val">Net Negative — 1.4kg offset</span>
              </li>
            </ul>
            <a href="#collection" class="btn btn--ghost">
              View the Meridian Coat
              <span class="btn__arrow" aria-hidden="true"></span>
            </a>
          </div>

          <div class="editorial__image-wrap reveal reveal--delay-2">
            <img
              src="https://images.pexels.com/photos/7691058/pexels-photo-7691058.jpeg?auto=compress&cs=tinysrgb&w=1000"
              alt="Close detail of Luxe Verde Meridian Coat — texture of ocean-recovered cashmere fibres"
              loading="lazy"
            />
            <div class="editorial__image-caption">
              <p class="t-caption">Meridian Coat — SS25. 72% recovered ocean fibre.</p>
            </div>
          </div>
        </div>

        <div class="editorial__grid editorial__grid--reverse" style="margin-top: var(--sp-24)">
          <div class="editorial__text reveal">
            <div class="editorial__label">
              <span class="editorial__label-line" aria-hidden="true"></span>
              <span class="t-label">Atelier Zero</span>
            </div>
            <h2 class="t-headline editorial__title">
              Every cut<br/><em>accounted for</em>
            </h2>
            <p class="t-body editorial__body">
              Zero-waste is not a marketing claim — it is an engineering constraint we impose on every collection before sampling begins. Our pattern engineers use parametric software to nest pieces so precisely that textile offcut rates fall below 2%. What remains is composted through our certified organic waste network.
            </p>
            <ul class="editorial__spec-list" aria-label="Atelier specifications">
              <li class="editorial__spec-item">
                <span class="editorial__spec-key">Offcut Rate</span>
                <span class="editorial__spec-val">Under 2% by weight</span>
              </li>
              <li class="editorial__spec-item">
                <span class="editorial__spec-key">Energy Source</span>
                <span class="editorial__spec-val">100% Renewable, On-Site</span>
              </li>
              <li class="editorial__spec-item">
                <span class="editorial__spec-key">Water Usage</span>
                <span class="editorial__spec-val">Closed-Loop Recycled</span>
              </li>
              <li class="editorial__spec-item">
                <span class="editorial__spec-key">Workers</span>
                <span class="editorial__spec-val">Fair Wages, Verified Annually</span>
              </li>
            </ul>
            <a href="#process" class="btn btn--ghost">
              See the full provenance
              <span class="btn__arrow" aria-hidden="true"></span>
            </a>
          </div>

          <div class="editorial__image-wrap reveal reveal--delay-2">
            <img
              src="https://images.pexels.com/photos/3735641/pexels-photo-3735641.jpeg?auto=compress&cs=tinysrgb&w=1000"
              alt="Atelier artisan hand-finishing a Luxe Verde garment in the Lisbon studio"
              loading="lazy"
            />
            <div class="editorial__image-caption">
              <p class="t-caption">Atelier Lisbon — hand-finishing, SS25 production run.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  `
}

function renderCollection() {
  return `
    <section class="collection" id="collection" aria-label="Current collection">
      <div class="container">
        <div class="collection__header reveal">
          <span class="t-label" style="color: var(--color-sage-muted)">SS25 Collection</span>
          <h2 class="t-headline" style="margin-top: var(--sp-2)">Selected Pieces</h2>
        </div>
        <div class="collection__grid">
          ${products.map((p, i) => `
            <article class="product-card reveal reveal--delay-${i + 1}" aria-label="${p.name}">
              <div class="product-card__image-wrap">
                <img src="${p.image}" alt="${p.alt}" loading="lazy" />
                ${p.badge ? `<span class="product-card__badge">${p.badge}</span>` : ''}
              </div>
              <div class="product-card__info">
                <p class="product-card__category">${p.category}</p>
                <h3 class="product-card__name">${p.name}</h3>
                <p class="product-card__material">${p.material}</p>
                <div class="product-card__footer">
                  <span class="product-card__price">${p.price}</span>
                  <span class="product-card__action">View Details</span>
                </div>
              </div>
            </article>
          `).join('')}
        </div>
        <div style="text-align:center; margin-top: var(--sp-10)" class="reveal">
          <a href="#" class="btn btn--primary">
            View Full Collection
            <span class="btn__arrow" aria-hidden="true"></span>
          </a>
        </div>
      </div>
    </section>
  `
}

function renderPhilosophy() {
  return `
    <section class="philosophy" id="philosophy" aria-label="Brand philosophy">
      <div class="container">
        <div class="philosophy__inner">
          <div class="philosophy__sticky reveal">
            <div class="philosophy__label">
              <span class="editorial__label-line" style="width:24px;height:1px;background:var(--color-sage);display:inline-block" aria-hidden="true"></span>
              <span class="t-label" style="margin-left:var(--sp-2)">Philosophy</span>
            </div>
            <h2 class="t-headline philosophy__title">
              Sustainability<br/>is a material<br/><em>specification</em>
            </h2>
            <p class="t-body philosophy__intro">
              We do not believe that caring for the planet requires accepting lesser quality. That premise has long been an excuse — both for brands unwilling to invest in better materials, and for customers seeking permission to choose convenience over conscience.
            </p>
            <p class="t-body" style="color: var(--color-stone)">
              At Luxe Verde, our environmental commitments are expressed in the same language as our quality commitments: material specifications, process tolerances, and measurable outcomes. Not values statements.
            </p>
            <div class="philosophy__quote">
              <p class="philosophy__quote-text">"The most sustainable garment is the one you keep for thirty years."</p>
              <p class="philosophy__quote-attr">— Sofia Alcântara, Creative Director</p>
            </div>
          </div>

          <div class="philosophy__pillars" role="list" aria-label="Our commitments">
            ${pillars.map(p => `
              <div class="pillar reveal" role="listitem">
                <div class="pillar__header" role="button" tabindex="0" aria-expanded="false" aria-controls="pillar-body-${p.number}">
                  <span class="pillar__number" aria-hidden="true">${p.number}</span>
                  <div class="pillar__title-wrap">
                    <span class="pillar__label">${p.label}</span>
                    <span class="pillar__name">${p.name}</span>
                  </div>
                  <span class="pillar__icon" aria-hidden="true"></span>
                </div>
                <div class="pillar__body" id="pillar-body-${p.number}" role="region">
                  <div class="pillar__content">
                    <span class="pillar__stat t-caption">${p.stat}</span>
                    <p class="t-body" style="margin-top: var(--sp-3)">${p.body}</p>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </section>
  `
}

function renderProcess() {
  return `
    <section class="process" id="process" aria-label="Our production process">
      <div class="container">
        <div class="process__header reveal">
          <span class="t-label" style="color: var(--color-sage-light); display:block; margin-bottom: var(--sp-3)">Provenance</span>
          <h2 class="t-headline" style="color: var(--color-parchment)">From ocean to atelier</h2>
        </div>
        <div class="process__steps">
          ${processSteps.map((s, i) => `
            <div class="process__step reveal reveal--delay-${i + 1}">
              <div class="process__step-icon" aria-hidden="true">${s.icon}</div>
              <span class="process__step-label">${s.label}</span>
              <h3 class="process__step-name">${s.name}</h3>
              <p class="process__step-desc">${s.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `
}

function renderPress() {
  const outlets = ['Vogue', 'Financial Times', 'The Guardian', 'Harper\'s Bazaar', 'Business of Fashion', 'Wallpaper*']
  return `
    <section class="press" aria-label="Press coverage">
      <div class="container container--narrow">
        <span class="t-label press__label">As Seen In</span>
        <div class="press__logos" aria-label="Publication logos">
          ${outlets.map(o => `<span class="press__logo" aria-label="${o}">${o}</span>`).join('')}
        </div>
        <div class="press__quote-strip reveal">
          <p class="press__pull-quote">
            "Luxe Verde does something remarkable: it makes you forget you're wearing recycled plastic, and then makes you proud that you are."
          </p>
          <p class="press__source">Vogue — March 2025</p>
        </div>
      </div>
    </section>
  `
}

function renderImpact() {
  return `
    <section class="impact" id="about" aria-label="Environmental impact">
      <img
        class="impact__bg"
        id="impact-bg"
        src="https://images.pexels.com/photos/3951378/pexels-photo-3951378.jpeg?auto=compress&cs=tinysrgb&w=1600"
        alt="Coastal ocean landscape — the source of Luxe Verde's recovered fibres"
        loading="lazy"
        aria-hidden="true"
      />
      <div class="impact__overlay" aria-hidden="true"></div>
      <div class="impact__content container">
        <p class="t-label impact__label reveal">Impact Report 2024</p>
        <h2 class="impact__headline reveal reveal--delay-1">
          22 tonnes<br/>recovered.<br/><em>One season.</em>
        </h2>
        <p class="impact__body reveal reveal--delay-2">
          In our Spring 2025 collection alone, we recovered and reprocessed 22 metric tonnes of post-consumer ocean plastic — equivalent to removing 1.1 million 500ml bottles from marine environments. Each garment carries a certified material passport with full chain-of-custody documentation.
        </p>
        <a href="#" class="btn reveal reveal--delay-3" style="color: var(--color-parchment); border-bottom: 1px solid rgba(245,242,236,0.4); padding-bottom: 4px; font-size: 0.65rem; letter-spacing: 0.18em; text-transform: uppercase;">
          Download Impact Report
          <span class="btn__arrow" aria-hidden="true"></span>
        </a>
      </div>
    </section>
  `
}

function renderNewsletter() {
  return `
    <section class="newsletter" aria-label="Newsletter signup">
      <div class="container">
        <div class="newsletter__inner reveal">
          <span class="t-label newsletter__label">Private Access</span>
          <h2 class="t-headline newsletter__title">Join the circle</h2>
          <p class="t-body newsletter__sub">
            First access to new collections, material transparency reports, and invitations to our atelier events.
          </p>
          <form class="newsletter__form" id="newsletter-form" aria-label="Email subscription form" novalidate>
            <label for="newsletter-email" class="sr-only">Email address</label>
            <input
              type="email"
              id="newsletter-email"
              class="newsletter__input"
              placeholder="Your email address"
              autocomplete="email"
              required
              aria-required="true"
            />
            <button type="submit" class="newsletter__submit" aria-label="Subscribe to newsletter">
              Request Access
            </button>
          </form>
          <p class="newsletter__privacy t-caption">
            We never share your data. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  `
}

function renderFooter() {
  const navLinks = {
    'Collection': ['New Arrivals', 'Outerwear', 'Tailoring', 'Ready to Wear', 'Accessories'],
    'The Brand': ['Philosophy', 'Provenance', 'Impact Reports', 'Press', 'Careers'],
    'Client': ['Size Guide', 'Care Instructions', 'Repairs', 'Returns', 'Contact']
  }
  return `
    <footer class="footer" aria-label="Site footer">
      <div class="container">
        <div class="footer__top">
          <div>
            <p class="footer__brand-name">LUXE <span>VERDE</span></p>
            <p class="footer__tagline">Luxury sustainable fashion. Exceptional materials, authentic provenance, measurable impact.</p>
            <span class="footer__cert" aria-label="B Corp Certified">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <circle cx="5" cy="5" r="4.5" stroke="currentColor" stroke-width="0.8"/>
                <path d="M3 5l1.5 1.5L7 3.5" stroke="currentColor" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              B Corp Certified
            </span>
          </div>
          ${Object.entries(navLinks).map(([col, links]) => `
            <div>
              <h3 class="footer__col-title">${col}</h3>
              <ul class="footer__links">
                ${links.map(l => `<li><a href="#">${l}</a></li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
        <div class="footer__bottom">
          <p class="footer__legal">&copy; 2025 Luxe Verde. All rights reserved. Crafted with care.</p>
          <div class="footer__certifications" aria-label="Certifications">
            <span class="footer__cert-badge">GOTS</span>
            <span class="footer__cert-badge">Oeko-Tex</span>
            <span class="footer__cert-badge">Bluesign</span>
            <span class="footer__cert-badge">Fair Trade</span>
          </div>
        </div>
      </div>
    </footer>
  `
}

function render() {
  document.querySelector('#app').innerHTML = `
    ${renderNav()}
    <main>
      ${renderHero()}
      ${renderStatsBar()}
      ${renderEditorial()}
      ${renderCollection()}
      ${renderPhilosophy()}
      ${renderProcess()}
      ${renderPress()}
      ${renderImpact()}
      ${renderNewsletter()}
    </main>
    ${renderFooter()}
  `
}

function initNav() {
  const nav = document.getElementById('main-nav')
  const onScroll = () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 60)
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
}

function initHero() {
  const hero = document.querySelector('.hero')
  if (!hero) return
  requestAnimationFrame(() => {
    hero.classList.add('is-loaded')
  })
}

function initScrollReveal() {
  const targets = document.querySelectorAll('.reveal')
  if (!targets.length) return

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })

  targets.forEach(el => observer.observe(el))
}

function initPillars() {
  document.querySelectorAll('.pillar__header').forEach(header => {
    const activate = () => {
      const pillar = header.closest('.pillar')
      const isOpen = pillar.classList.contains('is-open')
      document.querySelectorAll('.pillar.is-open').forEach(p => {
        p.classList.remove('is-open')
        p.querySelector('.pillar__header').setAttribute('aria-expanded', 'false')
      })
      if (!isOpen) {
        pillar.classList.add('is-open')
        header.setAttribute('aria-expanded', 'true')
      }
    }
    header.addEventListener('click', activate)
    header.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        activate()
      }
    })
  })

  // Open first pillar by default
  const first = document.querySelector('.pillar')
  if (first) {
    first.classList.add('is-open')
    first.querySelector('.pillar__header').setAttribute('aria-expanded', 'true')
  }
}

function initParallax() {
  const bg = document.getElementById('impact-bg')
  if (!bg) return

  const update = () => {
    const rect = bg.closest('.impact').getBoundingClientRect()
    if (rect.bottom < 0 || rect.top > window.innerHeight) return
    const progress = 1 - (rect.bottom / (window.innerHeight + rect.height))
    const offset = progress * 40
    bg.style.transform = `scale(1.12) translateY(${offset}px)`
  }

  window.addEventListener('scroll', update, { passive: true })
  update()
}

function initNewsletter() {
  const form = document.getElementById('newsletter-form')
  if (!form) return

  form.addEventListener('submit', e => {
    e.preventDefault()
    const input = form.querySelector('input[type="email"]')
    const btn = form.querySelector('.newsletter__submit')
    if (!input.value || !input.validity.valid) {
      input.style.outline = '2px solid var(--color-sage-muted)'
      setTimeout(() => { input.style.outline = '' }, 1800)
      return
    }
    btn.textContent = 'Welcome'
    btn.style.background = 'var(--color-sage-muted)'
    input.value = ''
    input.placeholder = 'You\'re on the list.'
    input.disabled = true
  })
}

// Utility: visually hidden labels
const srStyle = document.createElement('style')
srStyle.textContent = '.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}'
document.head.appendChild(srStyle)

render()
initNav()
initHero()
initScrollReveal()
initPillars()
initParallax()
initNewsletter()
