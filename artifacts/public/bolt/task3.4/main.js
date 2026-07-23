import './style.css'

/* ============================================================
   NAV — scroll behavior + mobile toggle
   ============================================================ */
const nav = document.getElementById('nav')
const hamburger = document.getElementById('hamburger')
const mobileMenu = document.getElementById('mobileMenu')

window.addEventListener('scroll', () => {
  nav.classList.toggle('nav--scrolled', window.scrollY > 24)
}, { passive: true })

hamburger.addEventListener('click', () => {
  const open = hamburger.classList.toggle('open')
  mobileMenu.classList.toggle('open', open)
  hamburger.setAttribute('aria-expanded', String(open))
})

mobileMenu.querySelectorAll('.nav__mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open')
    mobileMenu.classList.remove('open')
  })
})

/* ============================================================
   COUNTER ANIMATION — hero stats
   ============================================================ */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10)
  const duration = 1800
  const start = performance.now()
  const step = (now) => {
    const elapsed = now - start
    const progress = Math.min(elapsed / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    el.textContent = Math.floor(eased * target).toLocaleString()
    if (progress < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.stat__num[data-target]').forEach(animateCounter)
      heroObserver.disconnect()
    }
  })
}, { threshold: 0.4 })

const heroStats = document.querySelector('.hero__stats')
if (heroStats) heroObserver.observe(heroStats)

/* ============================================================
   INTERSECTION OBSERVER — scroll reveal
   ============================================================ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible')
    }
  })
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })

document.querySelectorAll('.how__step, .reveal').forEach(el => {
  revealObserver.observe(el)
})

/* ============================================================
   TESTIMONIALS — tab switch + data
   ============================================================ */
const clientTestimonials = [
  {
    quote: "We hired a React developer through FreelanceFlow for a $42k project. The milestone system meant we never had to worry about paying for work we hadn't seen. Absolutely changed how we approach contractor hiring.",
    name: "Jennifer Walsh",
    title: "VP Product, Nortech",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2",
    stars: 5,
    project: "$42,000 project"
  },
  {
    quote: "The proposal quality on FreelanceFlow is night and day compared to other platforms. Freelancers actually read our brief and submitted thoughtful approaches. We found our ongoing design partner here.",
    name: "David Kim",
    title: "CEO, Blueshift Labs",
    avatar: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2",
    stars: 5,
    project: "Ongoing retainer"
  },
  {
    quote: "Dispute resolution actually worked — and we never had to use it. Just knowing it was there kept both parties accountable. The structured revision rounds eliminated all the back-and-forth ambiguity.",
    name: "Priya Nair",
    title: "Marketing Director, Finvault",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2",
    stars: 5,
    project: "$18,000 campaign"
  }
]

const freelancerTestimonials = [
  {
    quote: "I've been on every platform. FreelanceFlow's escrow means I know I'll get paid when I deliver good work. No more chasing invoices or getting ghosted. My average project value tripled within 6 months.",
    name: "Carlos Mendez",
    title: "Senior iOS Developer",
    avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2",
    stars: 5,
    project: "$95 / hr rate"
  },
  {
    quote: "The proposal format forces clients to give you real briefs. No more vague 'I need a website' posts. I spend 20 minutes on a proposal instead of 2, but I close 4x more. The quality of clients is exceptional.",
    name: "Nina Johansson",
    title: "Brand Identity Designer",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2",
    stars: 5,
    project: "$120k earned in 2025"
  },
  {
    quote: "My top client found me here two years ago. We've done 8 projects together and they're now on a retainer. FreelanceFlow makes it easy to transition from project to retainer — two clicks and it's set up.",
    name: "Omar Al-Rashidi",
    title: "Content Strategist",
    avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2",
    stars: 5,
    project: "2-year relationship"
  }
]

function renderTestimonials(data) {
  const grid = document.getElementById('testiGrid')
  grid.innerHTML = data.map((t, i) => `
    <div class="testi-card reveal" style="transition-delay:${i * 80}ms">
      <div class="testi-card__stars">${'★'.repeat(t.stars)}</div>
      <p class="testi-card__quote">${t.quote}</p>
      <span class="testi-card__project-value">${t.project}</span>
      <div class="testi-card__author">
        <img src="${t.avatar}" alt="${t.name}" loading="lazy" />
        <div>
          <div class="testi-card__name">${t.name}</div>
          <div class="testi-card__title">${t.title}</div>
        </div>
      </div>
    </div>
  `).join('')

  // Observe newly rendered cards for reveal
  setTimeout(() => {
    grid.querySelectorAll('.testi-card').forEach(card => {
      revealObserver.observe(card)
    })
  }, 10)
}

const testiTabs = document.getElementById('testiTabs')
testiTabs.addEventListener('click', (e) => {
  const tab = e.target.closest('.testi__tab')
  if (!tab) return
  testiTabs.querySelectorAll('.testi__tab').forEach(t => t.classList.remove('testi__tab--active'))
  tab.classList.add('testi__tab--active')

  const clientLabel = document.getElementById('clientLabel')
  const freelancerLabel = document.getElementById('freelancerLabel')

  if (tab.dataset.tab === 'clients') {
    clientLabel.classList.add('pricing__toggle-label--active')
    freelancerLabel.classList.remove('pricing__toggle-label--active')
    renderTestimonials(clientTestimonials)
  } else {
    freelancerLabel.classList.add('pricing__toggle-label--active')
    clientLabel.classList.remove('pricing__toggle-label--active')
    renderTestimonials(freelancerTestimonials)
  }
})

renderTestimonials(clientTestimonials)

/* ============================================================
   PRICING — toggle between client / freelancer plans
   ============================================================ */
const clientPlans = [
  {
    tier: 'Starter',
    name: 'Basic',
    desc: 'For small businesses posting their first project.',
    price: '0',
    period: 'per month',
    note: '5% service fee per project',
    features: [
      'Post up to 3 projects/month',
      'Milestone-based contracts',
      'Escrow-protected payments',
      'Basic project dashboard',
      'Email support'
    ],
    cta: 'Get Started Free',
    featured: false
  },
  {
    tier: 'Growth',
    name: 'Professional',
    desc: 'For growing teams managing multiple projects.',
    price: '149',
    period: 'per month',
    note: '3% service fee per project',
    features: [
      'Unlimited projects',
      'Advanced project management',
      'Time tracking & screenshots',
      'NDA templates included',
      'Priority talent matching',
      'Dedicated account manager'
    ],
    cta: 'Start Free Trial',
    featured: true
  },
  {
    tier: 'Enterprise',
    name: 'Business',
    desc: 'For agencies and enterprises at scale.',
    price: '499',
    period: 'per month',
    note: '1.5% service fee per project',
    features: [
      'Everything in Professional',
      'Custom contract templates',
      'SSO & team permissions',
      'API access',
      'White-glove onboarding',
      'SLA & dedicated support'
    ],
    cta: 'Contact Sales',
    featured: false
  }
]

const freelancerPlans = [
  {
    tier: 'Free',
    name: 'Basic',
    desc: 'Get started and apply to projects.',
    price: '0',
    period: 'forever',
    note: '10% platform fee on earnings',
    features: [
      'Apply to 5 projects/month',
      'Profile & portfolio page',
      'Escrow payment protection',
      'Basic messaging',
      'Invoice generation'
    ],
    cta: 'Join Free',
    featured: false
  },
  {
    tier: 'Pro',
    name: 'Rising',
    desc: 'For active freelancers scaling their practice.',
    price: '29',
    period: 'per month',
    note: '7% platform fee on earnings',
    features: [
      'Unlimited proposals',
      'Rising Star badge',
      'Priority search placement',
      'Skills verification',
      'Advanced analytics',
      'Retainer contract templates'
    ],
    cta: 'Go Pro',
    featured: true
  },
  {
    tier: 'Top Tier',
    name: 'Expert',
    desc: 'For top-rated freelancers maximizing earnings.',
    price: '79',
    period: 'per month',
    note: '5% platform fee on earnings',
    features: [
      'Everything in Rising',
      'Expert Verified badge',
      'Featured profile placement',
      'Dedicated success manager',
      'Early access to top projects',
      'White-glove client matching'
    ],
    cta: 'Apply for Expert',
    featured: false
  }
]

function renderPricing(plans) {
  const grid = document.getElementById('pricingGrid')
  grid.innerHTML = plans.map(plan => `
    <div class="price-card ${plan.featured ? 'price-card--featured' : ''}">
      ${plan.featured ? '<div class="price-card__popular">Most Popular</div>' : ''}
      <div class="price-card__tier">${plan.tier}</div>
      <div class="price-card__name">${plan.name}</div>
      <div class="price-card__desc">${plan.desc}</div>
      <div class="price-card__amount">
        <span class="price-card__currency">$</span>
        <span class="price-card__num">${plan.price}</span>
      </div>
      <div class="price-card__period">${plan.period}</div>
      <div class="price-card__note">${plan.note}</div>
      <ul class="price-card__features">
        ${plan.features.map(f => `<li>${f}</li>`).join('')}
      </ul>
      <a href="#" class="btn ${plan.featured ? 'btn--primary' : 'btn--outline'}" style="width:100%">${plan.cta}</a>
    </div>
  `).join('')
}

const pricingToggle = document.getElementById('pricingToggle')
const clientLabel = document.getElementById('clientLabel')
const freelancerLabel = document.getElementById('freelancerLabel')

pricingToggle.addEventListener('change', () => {
  if (pricingToggle.checked) {
    clientLabel.classList.remove('pricing__toggle-label--active')
    freelancerLabel.classList.add('pricing__toggle-label--active')
    renderPricing(freelancerPlans)
  } else {
    clientLabel.classList.add('pricing__toggle-label--active')
    freelancerLabel.classList.remove('pricing__toggle-label--active')
    renderPricing(clientPlans)
  }
})

renderPricing(clientPlans)

/* ============================================================
   REVEAL — sections & bento cards
   ============================================================ */
document.querySelectorAll(
  '.cat__card, .profile-card, .bento, .trust__item, .price-card, .section-header'
).forEach((el, i) => {
  el.classList.add('reveal')
  el.style.transitionDelay = `${(i % 4) * 60}ms`
  revealObserver.observe(el)
})
