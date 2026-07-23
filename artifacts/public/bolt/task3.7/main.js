import './style.css'

// ── Template ──────────────────────────────────────────────────────────────

document.querySelector('#app').innerHTML = `
<!-- Navigation -->
<nav class="nav" id="nav" role="navigation" aria-label="Main navigation">
  <div class="container">
    <div class="nav__inner">
      <a href="#" class="nav__logo" aria-label="MoneyWise home">
        <div class="nav__logo-mark" aria-hidden="true">M</div>
        <span class="nav__logo-text">Money<span>Wise</span></span>
      </a>
      <ul class="nav__links" role="list">
        <li><a href="#features">Features</a></li>
        <li><a href="#how-it-works">How it works</a></li>
        <li><a href="#goals">Goals</a></li>
        <li><a href="#pricing">Pricing</a></li>
      </ul>
      <div class="nav__actions">
        <a href="#" class="btn btn--ghost" id="nav-signin">Sign in</a>
        <a href="#" class="btn btn--primary" id="nav-cta">Get started free</a>
      </div>
      <button class="nav__mobile-toggle" id="mobile-toggle" aria-label="Toggle menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
  <div class="nav__mobile-menu" id="mobile-menu" role="menu" aria-hidden="true">
    <ul>
      <li><a href="#features" role="menuitem">Features</a></li>
      <li><a href="#how-it-works" role="menuitem">How it works</a></li>
      <li><a href="#goals" role="menuitem">Goals</a></li>
      <li><a href="#pricing" role="menuitem">Pricing</a></li>
    </ul>
    <a href="#" class="btn btn--ghost">Sign in</a>
    <a href="#" class="btn btn--primary">Get started free</a>
  </div>
</nav>

<!-- Hero -->
<section class="hero" aria-labelledby="hero-heading">
  <div class="container">
    <div class="hero__inner">
      <div class="hero__content">
        <div class="hero__badge anim-fade-in-up">
          <div class="hero__badge-dot" aria-hidden="true"></div>
          Trusted by 480,000+ households
        </div>
        <h1 class="hero__heading anim-fade-in-up anim-delay-1" id="hero-heading">
          Your complete financial picture, <em>made clear</em>
        </h1>
        <p class="hero__subheading anim-fade-in-up anim-delay-2">
          Connect all your accounts, track spending without shame, and build
          toward goals that flex when life does. Whether you're just starting
          out or juggling a complex portfolio — we meet you where you are.
        </p>
        <div class="hero__actions anim-fade-in-up anim-delay-3">
          <a href="#" class="btn btn--primary btn--xl" id="hero-cta">Start for free</a>
          <a href="#how-it-works" class="btn btn--ghost btn--large">See how it works</a>
        </div>
        <div class="hero__trust-note anim-fade-in-up anim-delay-3">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true" style="color:var(--c-success-500)">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
          </svg>
          <span><strong>Bank-grade 256-bit encryption.</strong> We never sell your data. Cancel anytime.</span>
        </div>
      </div>

      <div class="hero__preview anim-fade-in-up anim-delay-2" aria-hidden="true">
        <div class="dashboard-card">
          <div class="dashboard-card__topbar">
            <div class="dashboard-card__dots">
              <span class="dot-red"></span>
              <span class="dot-yellow"></span>
              <span class="dot-green"></span>
            </div>
            <span class="dashboard-card__title">MoneyWise Dashboard</span>
            <span></span>
          </div>
          <div class="dashboard-card__body">
            <div class="networth-banner">
              <div class="networth-banner__label">Net Worth</div>
              <div class="networth-banner__amount" id="hero-networth">$84,231</div>
              <div class="networth-banner__change">
                ▲ +$2,140 this month
              </div>
            </div>
            <div class="account-rows">
              <div class="account-row">
                <div class="account-row__icon icon-bg-teal">🏦</div>
                <div class="account-row__info">
                  <div class="account-row__name">Chase Checking</div>
                  <div class="account-row__bank">••4821</div>
                </div>
                <div class="account-row__balance positive">$3,840</div>
              </div>
              <div class="account-row">
                <div class="account-row__icon icon-bg-green">📈</div>
                <div class="account-row__info">
                  <div class="account-row__name">Fidelity 401(k)</div>
                  <div class="account-row__bank">Retirement</div>
                </div>
                <div class="account-row__balance positive">$62,190</div>
              </div>
              <div class="account-row">
                <div class="account-row__icon icon-bg-amber">🏠</div>
                <div class="account-row__info">
                  <div class="account-row__name">Mortgage</div>
                  <div class="account-row__bank">Wells Fargo</div>
                </div>
                <div class="account-row__balance loan">−$218,500</div>
              </div>
            </div>
            <div class="spending-section">
              <div class="spending-section__label">Budget this month</div>
              <div class="budget-bars">
                <div class="budget-bar">
                  <div class="budget-bar__header">
                    <span class="budget-bar__name">Groceries</span>
                    <span class="budget-bar__amounts">$342 / $500</span>
                  </div>
                  <div class="budget-bar__track"><div class="budget-bar__fill fill-green" style="width:68%"></div></div>
                </div>
                <div class="budget-bar">
                  <div class="budget-bar__header">
                    <span class="budget-bar__name">Dining out</span>
                    <span class="budget-bar__amounts">$210 / $250</span>
                  </div>
                  <div class="budget-bar__track"><div class="budget-bar__fill fill-amber" style="width:84%"></div></div>
                </div>
                <div class="budget-bar">
                  <div class="budget-bar__header">
                    <span class="budget-bar__name">Transport</span>
                    <span class="budget-bar__amounts">$88 / $200</span>
                  </div>
                  <div class="budget-bar__track"><div class="budget-bar__fill fill-teal" style="width:44%"></div></div>
                </div>
              </div>
            </div>
            <div class="goal-chips">
              <div class="goal-chip"><div class="goal-chip__ring ring-65"></div>Emergency fund</div>
              <div class="goal-chip"><div class="goal-chip__ring ring-82"></div>Family vacation</div>
              <div class="goal-chip"><div class="goal-chip__ring ring-40"></div>New laptop</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Trust Bar -->
<div class="trust-bar" role="region" aria-label="Security and trust highlights">
  <div class="container">
    <div class="trust-bar__inner">
      <div class="trust-item">
        <div class="trust-item__icon" aria-hidden="true">🔒</div>
        <div class="trust-item__text">
          <div class="trust-item__title">256-bit encryption</div>
          <div class="trust-item__sub">Bank-level security</div>
        </div>
      </div>
      <div class="trust-divider" aria-hidden="true"></div>
      <div class="trust-item">
        <div class="trust-item__icon" aria-hidden="true">🛡️</div>
        <div class="trust-item__text">
          <div class="trust-item__title">SOC 2 Type II certified</div>
          <div class="trust-item__sub">Independently audited</div>
        </div>
      </div>
      <div class="trust-divider" aria-hidden="true"></div>
      <div class="trust-item">
        <div class="trust-item__icon" aria-hidden="true">🚫</div>
        <div class="trust-item__text">
          <div class="trust-item__title">We never sell your data</div>
          <div class="trust-item__sub">Your info stays yours</div>
        </div>
      </div>
      <div class="trust-divider" aria-hidden="true"></div>
      <div class="trust-item">
        <div class="trust-item__icon" aria-hidden="true">👁️</div>
        <div class="trust-item__text">
          <div class="trust-item__title">Read-only bank access</div>
          <div class="trust-item__sub">We can't move your money</div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Stats -->
<section class="section" aria-labelledby="stats-heading">
  <div class="container">
    <h2 class="sr-only" id="stats-heading">MoneyWise by the numbers</h2>
    <div class="stat-grid">
      <div class="stat-item reveal">
        <div class="stat-item__number" data-count="480000" data-suffix="K+" data-divisor="1000">480K+</div>
        <div class="stat-item__label">Households managing their finances</div>
      </div>
      <div class="stat-item reveal">
        <div class="stat-item__number" data-count="12" data-prefix="$" data-suffix="B+">$12B+</div>
        <div class="stat-item__label">In assets tracked securely</div>
      </div>
      <div class="stat-item reveal">
        <div class="stat-item__number" data-count="94" data-suffix="%">94%</div>
        <div class="stat-item__label">Say they feel less stressed about money</div>
      </div>
      <div class="stat-item reveal">
        <div class="stat-item__number" data-count="4.8" data-suffix="★">4.8★</div>
        <div class="stat-item__label">Average app rating across 60K+ reviews</div>
      </div>
    </div>
  </div>
</section>

<!-- Features -->
<section class="section section--alt" id="features" aria-labelledby="features-heading">
  <div class="container">
    <div class="section__header reveal">
      <div class="section__eyebrow">Everything you need</div>
      <h2 class="section__heading" id="features-heading">Powerful tools that feel simple</h2>
      <p class="section__sub">
        We handle the complexity behind the scenes so you see clarity on screen.
        No financial degree required.
      </p>
    </div>
    <div class="features-grid">
      <div class="feature-card reveal">
        <div class="feature-card__icon-wrap icon-bg-teal" aria-hidden="true">🔗</div>
        <div class="feature-card__title">Connect all your accounts</div>
        <p class="feature-card__desc">
          Link checking, savings, credit cards, mortgages, investments, and
          student loans. Over 12,000 institutions supported. Read-only
          access — we can never move your money.
        </p>
        <span class="feature-card__tag tag-teal">Secure connection</span>
      </div>
      <div class="feature-card reveal">
        <div class="feature-card__icon-wrap icon-bg-green" aria-hidden="true">🏷️</div>
        <div class="feature-card__title">Smart transaction categorization</div>
        <p class="feature-card__desc">
          Transactions are automatically sorted. When the algorithm gets
          something wrong — and it will — correcting it takes one tap. Your
          corrections teach the system to do better.
        </p>
        <span class="feature-card__tag tag-green">One-tap fixes</span>
      </div>
      <div class="feature-card reveal">
        <div class="feature-card__icon-wrap icon-bg-amber" aria-hidden="true">🎯</div>
        <div class="feature-card__title">Goals that flex with life</div>
        <p class="feature-card__desc">
          Set targets for emergencies, vacations, or a home down payment.
          Missed a month? We recalculate, not shame. Setbacks are part
          of the journey — your goal adapts.
        </p>
        <span class="feature-card__tag tag-amber">Adaptive tracking</span>
      </div>
      <div class="feature-card reveal">
        <div class="feature-card__icon-wrap icon-bg-green" aria-hidden="true">📊</div>
        <div class="feature-card__title">Investment monitoring</div>
        <p class="feature-card__desc">
          Track performance across brokerage accounts and retirement funds.
          Plain-English explanations of what's happening — no need to
          understand every financial term first.
        </p>
        <span class="feature-card__tag tag-green">All risk levels</span>
      </div>
      <div class="feature-card reveal">
        <div class="feature-card__icon-wrap icon-bg-teal" aria-hidden="true">👨‍👩‍👧</div>
        <div class="feature-card__title">Family & shared accounts</div>
        <p class="feature-card__desc">
          Control exactly what each family member sees. Keep personal
          spending private while sharing household budgets. Granular
          permissions — you're always in control.
        </p>
        <span class="feature-card__tag tag-teal">Privacy controls</span>
      </div>
      <div class="feature-card reveal">
        <div class="feature-card__icon-wrap icon-bg-amber" aria-hidden="true">🔔</div>
        <div class="feature-card__title">Budget alerts without shame</div>
        <p class="feature-card__desc">
          Spending approaching a limit? We alert you early as a heads-up —
          never as a judgment. Tone, timing, and channels are fully
          customizable. You're on your own team.
        </p>
        <span class="feature-card__tag tag-amber">Encouraging tone</span>
      </div>
    </div>
  </div>
</section>

<!-- How it Works -->
<section class="section" id="how-it-works" aria-labelledby="how-heading">
  <div class="container">
    <div class="section__header reveal">
      <div class="section__eyebrow">Get started in minutes</div>
      <h2 class="section__heading" id="how-heading">From signup to clarity in 4 steps</h2>
      <p class="section__sub">
        No spreadsheets. No prior knowledge needed. Just connect and go.
      </p>
    </div>
    <ol class="steps" aria-label="Setup steps">
      <li class="step reveal">
        <div class="step__number" aria-hidden="true">1</div>
        <div class="step__content">
          <h3 class="step__title">Create your free account</h3>
          <p class="step__desc">
            Sign up with your email. No credit card required to start. Your
            account is protected with two-factor authentication from day one,
            and everything you enter stays encrypted.
          </p>
        </div>
      </li>
      <li class="step reveal">
        <div class="step__number" aria-hidden="true">2</div>
        <div class="step__content">
          <h3 class="step__title">Connect your accounts securely</h3>
          <p class="step__desc">
            We use read-only connections through our bank partner (Plaid).
            Your login credentials are never stored on our servers. Connect
            as many — or as few — accounts as you're comfortable with.
          </p>
        </div>
      </li>
      <li class="step reveal">
        <div class="step__number" aria-hidden="true">3</div>
        <div class="step__content">
          <h3 class="step__title">See your picture, your way</h3>
          <p class="step__desc">
            MoneyWise builds your complete financial snapshot automatically.
            Use simple view for a quick balance check on your phone, or
            switch to detailed view for tax planning on desktop.
          </p>
        </div>
      </li>
      <li class="step reveal">
        <div class="step__number" aria-hidden="true">4</div>
        <div class="step__content">
          <h3 class="step__title">Set goals and let us guide you</h3>
          <p class="step__desc">
            Tell us what matters to you — an emergency fund, a vacation,
            paying off a loan. We'll suggest realistic monthly amounts,
            celebrate progress, and gently adjust when plans change.
          </p>
        </div>
      </li>
    </ol>
  </div>
</section>

<!-- Goals Showcase -->
<section class="section section--alt" id="goals" aria-labelledby="goals-heading">
  <div class="container">
    <div class="section__header reveal">
      <div class="section__eyebrow">Goal tracking</div>
      <h2 class="section__heading" id="goals-heading">Goals that move with you, not against you</h2>
      <p class="section__sub">
        Life isn't linear. Neither are financial plans. When something
        derails a goal, we recalculate the path — never make you feel
        like you failed.
      </p>
    </div>
    <div class="goals-showcase">
      <div class="goal-card reveal">
        <span class="goal-card__emoji" aria-hidden="true">🛡️</span>
        <div class="goal-card__name">Emergency fund</div>
        <div class="goal-card__status">Target: $10,000 — on track</div>
        <div class="goal-card__progress-track">
          <div class="goal-card__progress-fill fill-green" style="width:65%"></div>
        </div>
        <div class="goal-card__progress-label">
          <span>$6,500 saved</span>
          <strong>65%</strong>
        </div>
      </div>
      <div class="goal-card reveal">
        <span class="goal-card__emoji" aria-hidden="true">✈️</span>
        <div class="goal-card__name">Family vacation</div>
        <div class="goal-card__status">Target: $4,200 — ahead of schedule</div>
        <div class="goal-card__progress-track">
          <div class="goal-card__progress-fill fill-teal" style="width:82%"></div>
        </div>
        <div class="goal-card__progress-label">
          <span>$3,444 saved</span>
          <strong>82%</strong>
        </div>
      </div>
      <div class="goal-card reveal">
        <span class="goal-card__emoji" aria-hidden="true">🎓</span>
        <div class="goal-card__name">College savings (529)</div>
        <div class="goal-card__status">Target: $60,000 — adjusted plan</div>
        <div class="goal-card__progress-track">
          <div class="goal-card__progress-fill fill-amber" style="width:40%"></div>
        </div>
        <div class="goal-card__progress-label">
          <span>$24,100 saved</span>
          <strong>40%</strong>
        </div>
        <div class="goal-card__setback-note">
          Last month was tough — we've recalculated. Saving $280/mo gets
          you there by 2031. You're still doing great.
        </div>
      </div>
      <div class="goal-card reveal">
        <span class="goal-card__emoji" aria-hidden="true">🏠</span>
        <div class="goal-card__name">Home down payment</div>
        <div class="goal-card__status">Target: $40,000 — in progress</div>
        <div class="goal-card__progress-track">
          <div class="goal-card__progress-fill fill-teal" style="width:27%"></div>
        </div>
        <div class="goal-card__progress-label">
          <span>$10,800 saved</span>
          <strong>27%</strong>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Accessibility Section -->
<section class="section" aria-labelledby="a11y-heading">
  <div class="container">
    <div class="section__header reveal">
      <div class="section__eyebrow">Built for everyone</div>
      <h2 class="section__heading" id="a11y-heading">Finance tools that work for your brain</h2>
      <p class="section__sub">
        We designed MoneyWise to work for people with dyscalculia, anxiety
        around numbers, varying financial literacy, and anyone rebuilding
        after a setback. Everyone deserves a clear financial picture.
      </p>
    </div>
    <div class="a11y-grid">
      <div class="a11y-card reveal">
        <div class="a11y-card__icon" aria-hidden="true">🔢</div>
        <div>
          <div class="a11y-card__title">Dyscalculia-friendly display</div>
          <p class="a11y-card__desc">
            Toggle visual bars instead of raw numbers. Large-print mode
            and high-contrast themes. Amounts can display as words
            ("about $3,800") in addition to digits.
          </p>
        </div>
      </div>
      <div class="a11y-card reveal">
        <div class="a11y-card__icon" aria-hidden="true">💚</div>
        <div>
          <div class="a11y-card__title">Judgment-free experience</div>
          <p class="a11y-card__desc">
            No red alarms for overspending. No shame language anywhere.
            Alerts are framed as helpful nudges. If you're rebuilding
            after bankruptcy, we start fresh with you.
          </p>
        </div>
      </div>
      <div class="a11y-card reveal">
        <div class="a11y-card__icon" aria-hidden="true">📖</div>
        <div>
          <div class="a11y-card__title">Plain-English explanations</div>
          <p class="a11y-card__desc">
            Every financial term has an inline explanation. Don't know
            what "expense ratio" means? Tap it. We explain, never assume.
            Learning is optional, not required.
          </p>
        </div>
      </div>
      <div class="a11y-card reveal">
        <div class="a11y-card__icon" aria-hidden="true">📱</div>
        <div>
          <div class="a11y-card__title">Mobile & desktop modes</div>
          <p class="a11y-card__desc">
            Quick balance check on your phone — three numbers, clear and
            large. Detailed tax planning on desktop — full tables, exports,
            historical charts. One account, right view for each context.
          </p>
        </div>
      </div>
      <div class="a11y-card reveal">
        <div class="a11y-card__icon" aria-hidden="true">♿</div>
        <div>
          <div class="a11y-card__title">Screen reader optimized</div>
          <p class="a11y-card__desc">
            Full WCAG 2.1 AA compliance. All charts have accessible
            data tables. Keyboard navigation throughout. Tested with
            NVDA, VoiceOver, and TalkBack.
          </p>
        </div>
      </div>
      <div class="a11y-card reveal">
        <div class="a11y-card__icon" aria-hidden="true">🎓</div>
        <div>
          <div class="a11y-card__title">Grows with your knowledge</div>
          <p class="a11y-card__desc">
            Start simple. Unlock more detail as you get comfortable.
            Short lessons explain compound interest, diversification,
            and budgeting strategies in under 2 minutes.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Testimonials -->
<section class="section section--alt" aria-labelledby="testimonials-heading">
  <div class="container">
    <div class="section__header reveal">
      <div class="section__eyebrow">Real stories</div>
      <h2 class="section__heading" id="testimonials-heading">People just like you</h2>
    </div>
    <div class="testimonials">
      <div class="testimonial reveal">
        <p class="testimonial__text">
          "I have dyscalculia and always dreaded looking at my finances.
          MoneyWise's visual bars and plain-English summaries changed that.
          I actually check my accounts every week now."
        </p>
        <div class="testimonial__author">
          <div class="testimonial__avatar" aria-hidden="true">👩</div>
          <div>
            <div class="testimonial__name">Maya R.</div>
            <div class="testimonial__meta">Teacher, Portland OR</div>
          </div>
          <div class="testimonial__stars" aria-label="5 out of 5 stars">★★★★★</div>
        </div>
      </div>
      <div class="testimonial reveal">
        <p class="testimonial__text">
          "After my bankruptcy, every financial app made me feel judged.
          MoneyWise just... helped. No red alerts, no shame. It showed me
          a path forward and celebrated small wins."
        </p>
        <div class="testimonial__author">
          <div class="testimonial__avatar" aria-hidden="true">👨</div>
          <div>
            <div class="testimonial__name">David K.</div>
            <div class="testimonial__meta">Freelancer, Atlanta GA</div>
          </div>
          <div class="testimonial__stars" aria-label="5 out of 5 stars">★★★★★</div>
        </div>
      </div>
      <div class="testimonial reveal">
        <p class="testimonial__text">
          "My spouse and I disagreed about money constantly. Shared view
          for household expenses, private view for personal spending. That
          one feature probably saved our relationship."
        </p>
        <div class="testimonial__author">
          <div class="testimonial__avatar" aria-hidden="true">👩‍👩‍👧</div>
          <div>
            <div class="testimonial__name">Priya & Sam T.</div>
            <div class="testimonial__meta">Two-income family, Chicago IL</div>
          </div>
          <div class="testimonial__stars" aria-label="5 out of 5 stars">★★★★★</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Pricing -->
<section class="section" id="pricing" aria-labelledby="pricing-heading">
  <div class="container">
    <div class="section__header reveal">
      <div class="section__eyebrow">Simple pricing</div>
      <h2 class="section__heading" id="pricing-heading">Start free, upgrade when ready</h2>
      <p class="section__sub">
        No hidden fees. No credit card to start. Cancel anytime.
      </p>
    </div>
    <div class="pricing-grid">
      <div class="pricing-card reveal">
        <div class="pricing-card__plan">Free</div>
        <div class="pricing-card__price">
          <span class="pricing-card__amount">$0</span>
          <span class="pricing-card__period">forever</span>
        </div>
        <p class="pricing-card__desc">
          Great for getting started. Connect up to 2 accounts and see
          your complete budget snapshot.
        </p>
        <div class="pricing-card__divider"></div>
        <ul class="pricing-card__features">
          <li>Up to 2 linked accounts</li>
          <li>Transaction history (90 days)</li>
          <li>Basic budget categories</li>
          <li>1 savings goal</li>
          <li>Mobile app access</li>
        </ul>
        <a href="#" class="btn btn--ghost">Get started free</a>
      </div>
      <div class="pricing-card pricing-card--featured reveal">
        <div class="pricing-card__badge">Most popular</div>
        <div class="pricing-card__plan">Complete</div>
        <div class="pricing-card__price">
          <span class="pricing-card__amount">$9</span>
          <span class="pricing-card__period">/ month</span>
        </div>
        <p class="pricing-card__desc">
          Everything you need for a full financial picture. Ideal for
          individuals, couples, and small families.
        </p>
        <div class="pricing-card__divider"></div>
        <ul class="pricing-card__features">
          <li>Unlimited linked accounts</li>
          <li>Full transaction history</li>
          <li>Smart auto-categorization</li>
          <li>Unlimited savings goals</li>
          <li>Investment tracking</li>
          <li>Family sharing (up to 4 members)</li>
          <li>Granular privacy controls</li>
          <li>Custom budget alerts</li>
          <li>Tax summary export</li>
        </ul>
        <a href="#" class="btn btn--primary">Start 30-day free trial</a>
      </div>
      <div class="pricing-card reveal">
        <div class="pricing-card__plan">Family Plus</div>
        <div class="pricing-card__price">
          <span class="pricing-card__amount">$16</span>
          <span class="pricing-card__period">/ month</span>
        </div>
        <p class="pricing-card__desc">
          For larger families and complex financial situations including
          trusts, college savings, and multiple investment accounts.
        </p>
        <div class="pricing-card__divider"></div>
        <ul class="pricing-card__features">
          <li>Everything in Complete</li>
          <li>Up to 8 family members</li>
          <li>529 college savings tracking</li>
          <li>Trust & estate accounts</li>
          <li>Priority customer support</li>
          <li>Financial literacy courses</li>
          <li>Custom investment categories</li>
          <li>Advisor sharing (read-only)</li>
        </ul>
        <a href="#" class="btn btn--ghost">Start 30-day free trial</a>
      </div>
    </div>
  </div>
</section>

<!-- CTA -->
<section class="cta-section" aria-labelledby="cta-heading">
  <div class="container">
    <div class="cta-inner">
      <h2 class="cta-inner__heading" id="cta-heading">
        Your financial picture starts clearing today
      </h2>
      <p class="cta-inner__sub">
        Join 480,000+ households who use MoneyWise to understand and
        grow their money — wherever they are on the journey.
      </p>
      <div class="cta-inner__actions">
        <a href="#" class="btn btn--white btn--xl" id="bottom-cta">Get started free</a>
        <a href="#features" class="btn btn--outline-white btn--large">Explore features</a>
      </div>
      <p class="cta-inner__footnote">Free plan available. No credit card required. Cancel anytime.</p>
    </div>
  </div>
</section>

<!-- Footer -->
<footer class="footer" role="contentinfo">
  <div class="container">
    <div class="footer__grid">
      <div class="footer__brand">
        <a href="#" class="nav__logo" aria-label="MoneyWise home">
          <div class="nav__logo-mark" aria-hidden="true">M</div>
          <span class="nav__logo-text" style="color:rgba(255,255,255,.8)">Money<span>Wise</span></span>
        </a>
        <p>Helping every household achieve financial clarity, without judgment or complexity.</p>
      </div>
      <div class="footer__col">
        <div class="footer__col-title">Product</div>
        <ul>
          <li><a href="#features">Features</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="#">Security</a></li>
          <li><a href="#">Mobile app</a></li>
          <li><a href="#">Integrations</a></li>
        </ul>
      </div>
      <div class="footer__col">
        <div class="footer__col-title">Support</div>
        <ul>
          <li><a href="#">Help center</a></li>
          <li><a href="#">Financial glossary</a></li>
          <li><a href="#">Community forum</a></li>
          <li><a href="#">Status page</a></li>
          <li><a href="#">Contact us</a></li>
        </ul>
      </div>
      <div class="footer__col">
        <div class="footer__col-title">Company</div>
        <ul>
          <li><a href="#">About us</a></li>
          <li><a href="#">Blog</a></li>
          <li><a href="#">Careers</a></li>
          <li><a href="#">Press</a></li>
          <li><a href="#">Accessibility</a></li>
        </ul>
      </div>
    </div>
    <div class="footer__bottom">
      <span>© 2026 MoneyWise, Inc. All rights reserved.</span>
      <div class="footer__bottom-links">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Cookie Settings</a>
      </div>
      <div class="footer__security-badges">
        <div class="security-badge">🔒 256-bit SSL</div>
        <div class="security-badge">✓ SOC 2 II</div>
        <div class="security-badge">🛡 FDIC partner</div>
      </div>
    </div>
  </div>
</footer>

<!-- Toast container -->
<div class="toast-container" id="toast-container" aria-live="polite" aria-atomic="false"></div>
`

// ── Behaviors ──────────────────────────────────────────────────────────────

// Nav scroll effect
const nav = document.getElementById('nav')
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40)
}, { passive: true })

// Mobile menu toggle
const mobileToggle = document.getElementById('mobile-toggle')
const mobileMenu = document.getElementById('mobile-menu')

mobileToggle.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open')
  mobileToggle.classList.toggle('open', isOpen)
  mobileToggle.setAttribute('aria-expanded', String(isOpen))
  mobileMenu.setAttribute('aria-hidden', String(!isOpen))
})

// Close mobile menu when a link is clicked
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open')
    mobileToggle.classList.remove('open')
    mobileToggle.setAttribute('aria-expanded', 'false')
    mobileMenu.setAttribute('aria-hidden', 'true')
  })
})

// Scroll reveal with IntersectionObserver
const revealEls = document.querySelectorAll('.reveal')
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings in the same parent
      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')]
      const idx = siblings.indexOf(entry.target)
      entry.target.style.transitionDelay = `${idx * 80}ms`
      entry.target.classList.add('is-visible')
      revealObserver.unobserve(entry.target)
    }
  })
}, { threshold: 0.12 })

revealEls.forEach(el => revealObserver.observe(el))

// Animated number counters (fire when stat section scrolls into view)
function animateCount(el) {
  const target = parseFloat(el.dataset.count)
  const prefix = el.dataset.prefix || ''
  const suffix = el.dataset.suffix || ''
  const isDecimal = String(target).includes('.')
  const duration = 1800
  const start = performance.now()

  function tick(now) {
    const t = Math.min((now - start) / duration, 1)
    const ease = 1 - Math.pow(1 - t, 3)
    const val = target * ease
    el.textContent = prefix + (isDecimal ? val.toFixed(1) : Math.round(val).toLocaleString()) + suffix
    if (t < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

const statEls = document.querySelectorAll('.stat-item__number[data-count]')
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target)
      statObserver.unobserve(entry.target)
    }
  })
}, { threshold: 0.5 })
statEls.forEach(el => statObserver.observe(el))

// Toast notifications — a few demo toasts to show the "encouraging" tone
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container')
  const toast = document.createElement('div')
  toast.className = `toast toast--${type}`
  toast.textContent = message
  toast.setAttribute('role', 'status')
  container.appendChild(toast)
  setTimeout(() => {
    toast.style.transition = 'opacity 0.4s, transform 0.4s'
    toast.style.opacity = '0'
    toast.style.transform = 'translateX(24px)'
    setTimeout(() => toast.remove(), 400)
  }, 4500)
}

// Demo toasts that fire on first scroll — show friendly tone
let toastsFired = false
window.addEventListener('scroll', () => {
  if (!toastsFired && window.scrollY > 300) {
    toastsFired = true
    setTimeout(() => showToast('You\'re on track with your grocery budget this week!', 'success'), 300)
    setTimeout(() => showToast('Dining out is at 84% of budget — heads up!', 'info'), 2800)
  }
}, { passive: true })

// CTA buttons — show signup intent (demo feedback)
;['hero-cta', 'nav-cta', 'bottom-cta'].forEach(id => {
  document.getElementById(id)?.addEventListener('click', (e) => {
    e.preventDefault()
    showToast('Account creation coming soon — thanks for your interest!', 'success')
  })
})

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'))
    if (target) {
      e.preventDefault()
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  })
})
