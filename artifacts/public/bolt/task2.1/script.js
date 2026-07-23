import './style.css'

// ─── SVG ICONS ───────────────────────────────────────────────────────────────

const icons = {
  search: `<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  bag:    `<svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>`,
  heart:  `<svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>`,
  arrow:  `<svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
  check:  `<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>`,
  instagram: `<svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`,
  pinterest: `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.04-2.83.18-.76 1.22-5.15 1.22-5.15s-.31-.63-.31-1.56c0-1.46.85-2.55 1.9-2.55.9 0 1.33.67 1.33 1.48 0 .9-.58 2.26-.87 3.51-.25 1.05.52 1.9 1.54 1.9 1.84 0 3.08-2.37 3.08-5.16 0-2.13-1.44-3.62-3.5-3.62-2.39 0-3.79 1.79-3.79 3.64 0 .72.28 1.49.62 1.91a.25.25 0 01.06.24l-.23.95c-.04.14-.13.17-.29.1-1.07-.5-1.74-2.06-1.74-3.32 0-2.69 1.96-5.17 5.65-5.17 2.97 0 5.27 2.11 5.27 4.94 0 2.95-1.86 5.31-4.43 5.31-.87 0-1.68-.45-1.96-.98l-.53 1.99c-.19.74-.71 1.67-1.06 2.24.8.25 1.65.38 2.53.38 5.52 0 10-4.48 10-10S17.52 2 12 2z"/></svg>`,
  tiktok: `<svg viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.17 8.17 0 004.77 1.52V6.74a4.85 4.85 0 01-1-.05z"/></svg>`,
}

// ─── PRODUCT DATA ─────────────────────────────────────────────────────────────

const products = [
  {
    id: 1,
    name: 'Arc Pendant',
    material: '18k Gold Vermeil · Recycled Silver',
    price: '$285',
    badge: 'Bestseller',
    badgeType: 'gold',
    image: 'https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 2,
    name: 'Orbit Ring',
    material: 'Solid 14k Gold',
    price: '$420',
    badge: 'New',
    badgeType: '',
    image: 'https://images.pexels.com/photos/691046/pexels-photo-691046.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 3,
    name: 'Minimal Hoops',
    material: 'Sterling Silver · Ethically Sourced',
    price: '$195',
    badge: null,
    image: 'https://images.pexels.com/photos/1413420/pexels-photo-1413420.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 4,
    name: 'Strand Bracelet',
    material: '18k Gold Vermeil',
    price: '$340',
    badge: 'Limited',
    badgeType: '',
    image: 'https://images.pexels.com/photos/177332/pexels-photo-177332.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
]

// ─── MARQUEE CONTENT ─────────────────────────────────────────────────────────

const marqueeItems = [
  'Free shipping on orders over $150',
  'Ethically sourced materials',
  'Certified conflict-free diamonds',
  'Lifetime craftsmanship guarantee',
  'Sustainably packaged',
  '1% of sales to environmental causes',
]

// ─── TESTIMONIAL DATA ────────────────────────────────────────────────────────

const testimonials = [
  {
    text: 'The Arc Pendant is the most elegant piece I own. I wear it every single day — it goes with absolutely everything.',
    name: 'Clara M.',
    role: 'Creative Director, London',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  {
    text: "I appreciate that Essence takes ethical sourcing seriously. The quality is exceptional and the packaging felt considered.",
    name: 'Sofie T.',
    role: 'Architect, Copenhagen',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  {
    text: 'Investment pieces that actually hold their value — in quality and style. My Orbit Ring is five years old and still turns heads.',
    name: 'Jana K.',
    role: 'Founder, Amsterdam',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
]

// ─── RENDER ───────────────────────────────────────────────────────────────────

document.querySelector('#app').innerHTML = `
  <!-- NAVIGATION -->
  <nav class="nav" id="nav">
    <div class="container">
      <div class="nav__inner">
        <ul class="nav__links">
          <li><a href="#">Collections</a></li>
          <li><a href="#">Materials</a></li>
          <li><a href="#">Our Story</a></li>
        </ul>

        <a href="#" class="nav__logo" aria-label="Essence Jewelry home">Essence</a>

        <div class="nav__actions">
          <button class="nav__icon-btn" aria-label="Search">
            ${icons.search}
          </button>
          <button class="nav__icon-btn" aria-label="Shopping bag">
            ${icons.bag}
          </button>
          <button class="nav__hamburger" aria-label="Open menu">
            <span></span><span></span>
          </button>
        </div>
      </div>
    </div>
  </nav>

  <!-- HERO -->
  <section class="hero" aria-label="Hero">
    <div class="hero__content">
      <p class="hero__eyebrow reveal">New Collection</p>
      <h1 class="hero__heading reveal reveal-delay-1">
        Wear what<br><em>endures</em>
      </h1>
      <p class="hero__subtext reveal reveal-delay-2">
        Timeless pieces crafted from ethically sourced materials — designed to be worn for a lifetime, not a season.
      </p>
      <div class="hero__cta reveal reveal-delay-3">
        <a href="#" class="btn btn--primary">
          Explore Collection
          ${icons.arrow}
        </a>
        <a href="#" class="btn btn--ghost">Our Story</a>
      </div>
    </div>

    <div class="hero__image">
      <img
        src="https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=1200"
        alt="Woman wearing Essence Jewelry — minimal gold pendant"
        loading="eager"
        fetchpriority="high"
      />
    </div>

    <div class="hero__scroll-indicator">
      <span class="hero__scroll-line"></span>
      Scroll
    </div>
  </section>

  <!-- MARQUEE -->
  <div class="marquee-band" aria-hidden="true">
    <div class="marquee-track">
      ${[...marqueeItems, ...marqueeItems].map(item => `
        <span class="marquee-item">
          <span class="marquee-dot"></span>
          ${item}
        </span>
      `).join('')}
    </div>
  </div>

  <!-- PRODUCTS -->
  <section class="products" id="collections" aria-labelledby="products-title">
    <div class="container">
      <div class="section-header reveal">
        <div>
          <p class="section-eyebrow">Curated Pieces</p>
          <h2 class="section-title" id="products-title">
            Crafted with<br><em>intention</em>
          </h2>
        </div>
        <a href="#" class="btn btn--outline">
          View All
          ${icons.arrow}
        </a>
      </div>

      <div class="products-grid">
        ${products.map((p, i) => `
          <article class="product-card reveal reveal-delay-${i % 4}" data-id="${p.id}">
            <div class="product-card__image">
              <img
                src="${p.image}"
                alt="${p.name} — ${p.material}"
                loading="lazy"
              />
              ${p.badge ? `<span class="product-card__badge ${p.badgeType === 'gold' ? 'product-card__badge--gold' : ''}">${p.badge}</span>` : ''}
              <div class="product-card__overlay">
                <button class="product-card__quick-add" aria-label="Quick add ${p.name} to bag">
                  Add to Bag
                </button>
              </div>
            </div>
            <div class="product-card__meta">
              <h3 class="product-card__name">${p.name}</h3>
              <p class="product-card__material">${p.material}</p>
              <div class="product-card__price-row">
                <span class="product-card__price">${p.price}</span>
                <button class="product-card__wishlist" aria-label="Save ${p.name} to wishlist">
                  ${icons.heart}
                </button>
              </div>
            </div>
          </article>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- EDITORIAL -->
  <section class="editorial" aria-labelledby="editorial-title">
    <div class="editorial__inner">
      <div class="editorial__image">
        <img
          src="https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=900"
          alt="Closeup of Essence Jewelry craftsmanship"
          loading="lazy"
        />
      </div>
      <div class="editorial__content">
        <p class="editorial__eyebrow reveal">Our Philosophy</p>
        <h2 class="editorial__heading reveal reveal-delay-1" id="editorial-title">
          Beauty that<br>leaves the world<br><em>better</em>
        </h2>
        <p class="editorial__body reveal reveal-delay-2">
          Every piece begins with a question: can this be made without compromise? We work only with certified recycled metals, conflict-free stones, and artisans paid living wages. Because jewelry you'll wear forever should be something you're proud of.
        </p>
        <a href="#" class="btn btn--outline reveal reveal-delay-3" style="color: var(--color-text-inverse); border-color: rgba(250,249,247,0.3);">
          Read Our Story
          ${icons.arrow}
        </a>
      </div>
    </div>
  </section>

  <!-- VALUES -->
  <section class="values" aria-labelledby="values-title">
    <div class="container">
      <div class="reveal">
        <p class="section-eyebrow">Why Essence</p>
        <h2 class="section-title" id="values-title">
          Three promises<br><em>we keep</em>
        </h2>
      </div>
      <div class="values__grid">
        <div class="value-card reveal reveal-delay-1">
          <div class="value-card__number">01</div>
          <div class="value-card__line"></div>
          <h3 class="value-card__title">Ethical Origin</h3>
          <p class="value-card__body">Every material is traced from source to studio. We use only certified recycled silver and gold, and conflict-free stones verified by the Kimberley Process.</p>
        </div>
        <div class="value-card reveal reveal-delay-2">
          <div class="value-card__number">02</div>
          <div class="value-card__line"></div>
          <h3 class="value-card__title">Lifetime Craft</h3>
          <p class="value-card__body">Our pieces are hand-finished by artisans with decades of experience. We guarantee the craftsmanship for life — free repairs, forever.</p>
        </div>
        <div class="value-card reveal reveal-delay-3">
          <div class="value-card__number">03</div>
          <div class="value-card__line"></div>
          <h3 class="value-card__title">Considered Design</h3>
          <p class="value-card__body">We release two small collections per year. No trend-chasing. Each design is refined over months to ensure it remains beautiful in ten years, twenty, always.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- TESTIMONIALS -->
  <section class="testimonials" aria-labelledby="testimonials-title">
    <div class="container">
      <div class="section-header reveal">
        <div>
          <p class="section-eyebrow">Worn & Loved</p>
          <h2 class="section-title" id="testimonials-title">
            Stories from our<br><em>community</em>
          </h2>
        </div>
      </div>
      <div class="testimonials__inner">
        ${testimonials.map((t, i) => `
          <div class="testimonial-card reveal reveal-delay-${i + 1}">
            <div class="testimonial-card__stars">
              ${Array(5).fill(`<svg class="star" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`).join('')}
            </div>
            <div class="testimonial-card__quote-mark">"</div>
            <p class="testimonial-card__text">${t.text}</p>
            <div class="testimonial-card__author">
              <div class="testimonial-card__avatar">
                <img src="${t.avatar}" alt="${t.name}" loading="lazy" />
              </div>
              <div class="testimonial-card__author-info">
                <span class="testimonial-card__name">${t.name}</span>
                <span class="testimonial-card__role">${t.role}</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- NEWSLETTER -->
  <section class="newsletter" aria-labelledby="newsletter-title">
    <div class="container">
      <div class="newsletter__inner">
        <div class="reveal">
          <p class="section-eyebrow">Join the Circle</p>
          <h2 class="newsletter__heading" id="newsletter-title">
            Slow beauty,<br><em>delivered</em>
          </h2>
          <p class="newsletter__subtext">
            New collections, care guides, and stories from our artisans — no noise, no excess.
          </p>
          <div class="newsletter__perks">
            <div class="newsletter__perk">
              <svg class="newsletter__perk-icon" viewBox="0 0 24 24">${icons.check.replace('<svg viewBox="0 0 24 24">', '').replace('</svg>', '')}</svg>
              10% off your first order
            </div>
            <div class="newsletter__perk">
              <svg class="newsletter__perk-icon" viewBox="0 0 24 24">${icons.check.replace('<svg viewBox="0 0 24 24">', '').replace('</svg>', '')}</svg>
              Early access to new collections
            </div>
            <div class="newsletter__perk">
              <svg class="newsletter__perk-icon" viewBox="0 0 24 24">${icons.check.replace('<svg viewBox="0 0 24 24">', '').replace('</svg>', '')}</svg>
              Jewelry care & styling guides
            </div>
          </div>
        </div>
        <div class="reveal reveal-delay-2">
          <form class="newsletter__form" id="newsletter-form" novalidate>
            <div class="newsletter__input-row">
              <input
                class="newsletter__input"
                type="email"
                id="newsletter-email"
                name="email"
                placeholder="Your email address"
                required
                autocomplete="email"
              />
              <button type="submit" class="newsletter__submit">Subscribe</button>
            </div>
            <p class="newsletter__consent">
              By subscribing you agree to our <a href="#">Privacy Policy</a>. Unsubscribe anytime.
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="footer" aria-labelledby="footer-brand">
    <div class="container">
      <div class="footer__top">
        <div>
          <div class="footer__brand-logo" id="footer-brand">Essence</div>
          <p class="footer__brand-tagline">
            Timeless jewelry crafted from ethically sourced materials. Designed to endure.
          </p>
          <div class="footer__social" aria-label="Social media">
            <a href="#" class="footer__social-link" aria-label="Instagram">
              ${icons.instagram}
            </a>
            <a href="#" class="footer__social-link" aria-label="Pinterest">
              ${icons.pinterest}
            </a>
            <a href="#" class="footer__social-link" aria-label="TikTok">
              ${icons.tiktok}
            </a>
          </div>
        </div>

        <div>
          <p class="footer__col-title">Shop</p>
          <ul class="footer__links">
            <li><a href="#">New Arrivals</a></li>
            <li><a href="#">Necklaces</a></li>
            <li><a href="#">Rings</a></li>
            <li><a href="#">Earrings</a></li>
            <li><a href="#">Bracelets</a></li>
            <li><a href="#">Gift Sets</a></li>
          </ul>
        </div>

        <div>
          <p class="footer__col-title">About</p>
          <ul class="footer__links">
            <li><a href="#">Our Story</a></li>
            <li><a href="#">Materials</a></li>
            <li><a href="#">Artisans</a></li>
            <li><a href="#">Sustainability</a></li>
            <li><a href="#">Press</a></li>
          </ul>
        </div>

        <div>
          <p class="footer__col-title">Help</p>
          <ul class="footer__links">
            <li><a href="#">Shipping & Returns</a></li>
            <li><a href="#">Ring Sizing</a></li>
            <li><a href="#">Jewelry Care</a></li>
            <li><a href="#">Repairs & Warranty</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>
      </div>

      <div class="footer__bottom">
        <p class="footer__copyright">&copy; 2026 Essence Jewelry. All rights reserved.</p>
        <ul class="footer__bottom-links">
          <li><a href="#">Privacy</a></li>
          <li><a href="#">Terms</a></li>
          <li><a href="#">Accessibility</a></li>
        </ul>
      </div>
    </div>
  </footer>
`

// ─── INTERACTIONS ─────────────────────────────────────────────────────────────

// Sticky nav background on scroll
const nav = document.getElementById('nav')
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40)
}, { passive: true })

// Scroll-reveal with IntersectionObserver
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        revealObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
)

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el))

// Wishlist toggle
document.querySelectorAll('.product-card__wishlist').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation()
    btn.classList.toggle('is-active')
    const label = btn.getAttribute('aria-label')
    btn.setAttribute('aria-label',
      btn.classList.contains('is-active')
        ? label.replace('Save', 'Remove')
        : label.replace('Remove', 'Save')
    )
  })
})

// Quick add feedback
document.querySelectorAll('.product-card__quick-add').forEach(btn => {
  btn.addEventListener('click', () => {
    const original = btn.textContent
    btn.textContent = 'Added!'
    btn.style.backgroundColor = 'var(--color-text-primary)'
    btn.style.color = 'var(--color-text-inverse)'
    setTimeout(() => {
      btn.textContent = original
      btn.style.backgroundColor = ''
      btn.style.color = ''
    }, 1800)
  })
})

// Newsletter form
const form = document.getElementById('newsletter-form')
form.addEventListener('submit', (e) => {
  e.preventDefault()
  const input = document.getElementById('newsletter-email')
  if (!input.value || !input.value.includes('@')) {
    input.style.outline = '1px solid var(--color-error)'
    return
  }
  input.style.outline = ''
  form.innerHTML = `
    <div style="
      padding: var(--space-5) var(--space-4);
      text-align: center;
      border: 1px solid var(--color-gold-light);
      background: var(--color-bg);
    ">
      <p style="
        font-family: var(--font-display);
        font-size: 22px;
        font-weight: 400;
        color: var(--color-text-primary);
        margin-bottom: 8px;
      ">You're in.</p>
      <p style="
        font-size: 13px;
        font-weight: 300;
        color: var(--color-text-secondary);
      ">Check your inbox for a welcome gift.</p>
    </div>
  `
})
