// import './style.css';

// ─── Audience data ───────────────────────────────────────────────────────────

const AUDIENCES = [
  { id: 'prospective', label: 'Prospective Student' },
  { id: 'current',     label: 'Current Student' },
  { id: 'faculty',     label: 'Faculty & Staff' },
  { id: 'alumni',      label: 'Alumni' },
  { id: 'parent',      label: 'Parent & Family' },
];

const HERO_CONTENT = {
  prospective: {
    eyebrow: 'Discover Riverside',
    title:   'Find your place <em>where ideas meet purpose</em>',
    desc:    'Join 8,000 curious minds exploring over 80 majors, a vibrant campus, and a community that pushes you to grow. Your future starts here.',
    ctas:    [
      { label: 'Apply Now', href: '#apply', primary: true },
      { label: 'Explore Programs', href: '#programs' },
      { label: 'Schedule a Visit', href: '#visit' },
    ],
    quickTitle: 'Explore Riverside',
    quickLinks: [
      { icon: '🎓', title: 'Academic Programs', sub: '80+ majors & minors', href: '#' },
      { icon: '🏛️', title: 'Campus Tour',        sub: 'Virtual & in-person', href: '#' },
      { icon: '💰', title: 'Tuition & Aid',      sub: 'Scholarships & grants', href: '#' },
      { icon: '📅', title: 'Application Dates',  sub: 'Deadlines & checklist', href: '#' },
      { icon: '🏠', title: 'Housing & Life',     sub: 'Dorms, dining, clubs', href: '#' },
    ],
  },
  current: {
    eyebrow: 'Welcome Back, River',
    title:   'Everything you need, <em>right here</em>',
    desc:    'Access your schedule, grades, campus services, and all the tools you need to make the most of your semester.',
    ctas:    [
      { label: 'Student Portal', href: '#portal', primary: true },
      { label: 'Course Registration', href: '#register' },
      { label: 'Campus Map', href: '#map' },
    ],
    quickTitle: 'Quick Access',
    quickLinks: [
      { icon: '📋', title: 'My Schedule',       sub: 'Classes & deadlines', href: '#' },
      { icon: '📊', title: 'Grades & Transcript', sub: 'GPA & records', href: '#' },
      { icon: '📚', title: 'Library & Research', sub: '1.2M+ resources', href: '#' },
      { icon: '🏥', title: 'Health Services',   sub: 'Counseling & wellness', href: '#' },
      { icon: '💼', title: 'Career Center',     sub: 'Jobs & internships', href: '#' },
    ],
  },
  faculty: {
    eyebrow: 'Faculty & Staff Hub',
    title:   'Teaching tools and <em>administrative resources</em>',
    desc:    'Everything you need to deliver excellent instruction, manage coursework, and stay connected with the Riverside academic community.',
    ctas:    [
      { label: 'Learning Management System', href: '#lms', primary: true },
      { label: 'Faculty Portal', href: '#portal' },
      { label: 'HR & Benefits', href: '#hr' },
    ],
    quickTitle: 'Staff Resources',
    quickLinks: [
      { icon: '💻', title: 'Course Management', sub: 'Syllabi & grades', href: '#' },
      { icon: '📬', title: 'Faculty Email',     sub: 'Webmail & calendar', href: '#' },
      { icon: '🧪', title: 'Research Hub',      sub: 'Grants & publications', href: '#' },
      { icon: '📑', title: 'Policy & Forms',    sub: 'Procedures & docs', href: '#' },
      { icon: '🛠️', title: 'IT Support',        sub: 'Help desk & tools', href: '#' },
    ],
  },
  alumni: {
    eyebrow: 'Once a River, Always a River',
    title:   'Stay connected to the <em>community that shaped you</em>',
    desc:    'From networking events to giving back, your relationship with Riverside never ends. Join 60,000+ alumni worldwide.',
    ctas:    [
      { label: 'Alumni Network', href: '#network', primary: true },
      { label: 'Make a Gift', href: '#giving' },
      { label: 'Upcoming Events', href: '#events' },
    ],
    quickTitle: 'Alumni Resources',
    quickLinks: [
      { icon: '🤝', title: 'Networking',       sub: 'Connect with alumni', href: '#' },
      { icon: '📰', title: 'Alumni Magazine',  sub: 'Latest issue', href: '#' },
      { icon: '🎁', title: 'Annual Fund',      sub: 'Support students', href: '#' },
      { icon: '🏆', title: 'Alumni Awards',    sub: 'Nominate someone', href: '#' },
      { icon: '🎓', title: 'Career Services',  sub: 'Still here for you', href: '#' },
    ],
  },
  parent: {
    eyebrow: 'Parent & Family Gateway',
    title:   'Supporting your student\'s <em>success at Riverside</em>',
    desc:    'From campus safety to financial aid and mental health resources — we believe family partnership is key to student success.',
    ctas:    [
      { label: 'Family Portal', href: '#portal', primary: true },
      { label: 'Financial Aid Info', href: '#finaid' },
      { label: 'Campus Safety', href: '#safety' },
    ],
    quickTitle: 'Family Resources',
    quickLinks: [
      { icon: '🔒', title: 'Campus Safety',     sub: 'Reports & emergency', href: '#' },
      { icon: '💳', title: 'Student Account',   sub: 'Billing & payments', href: '#' },
      { icon: '🧠', title: 'Mental Health',     sub: 'Counseling services', href: '#' },
      { icon: '🏥', title: 'Health Center',     sub: 'Services & insurance', href: '#' },
      { icon: '📅', title: 'Academic Calendar', sub: 'Key dates & breaks', href: '#' },
    ],
  },
};

const AUDIENCE_CARDS = {
  prospective: [
    { icon: '🎓', title: 'Academic Excellence', desc: 'Explore 80+ majors across our 6 colleges. Our student-to-faculty ratio of 14:1 means personalized attention from day one.' },
    { icon: '🌍', title: 'Study Abroad', desc: 'Spend a semester — or a year — in over 40 partner universities worldwide. More than 40% of our students go global.' },
    { icon: '🔬', title: 'Undergraduate Research', desc: 'Work alongside faculty on real research as early as freshman year. Last year, 600+ students co-authored publications.' },
    { icon: '🏠', title: 'Campus Life', desc: '120+ clubs, Division III athletics, vibrant arts scene, and a campus that was ranked #3 Most Beautiful in the region.' },
    { icon: '💰', title: 'Financial Aid', desc: 'Over 70% of students receive some form of financial aid. Average merit scholarship: $18,400/year.' },
  ],
  current: [
    { icon: '📋', title: 'Register for Next Semester', desc: 'Summer and fall registration opens May 1. Meet with your advisor to plan your course load early.' },
    { icon: '📊', title: 'Final Exam Schedule', desc: 'Finals run May 6–13. Check your personalized exam schedule in the portal and confirm room assignments.' },
    { icon: '💼', title: 'Summer Internships', desc: 'The Career Center has 250+ listings. On-campus recruiting for summer positions ends April 30.' },
    { icon: '🏥', title: 'Mental Health Support', desc: '24/7 crisis line: 555-RIV-WELL. Same-day counseling appointments available. You\'re not alone.' },
    { icon: '🎓', title: 'Graduation Info', desc: 'May grads: commencement is May 17 at Alumni Field. Guest tickets, regalia orders, and more in the portal.' },
  ],
  faculty: [
    { icon: '💻', title: 'Canvas LMS Updates', desc: 'Canvas will migrate to version 3.2 over spring break. Attend a training session — see schedule in Faculty Hub.' },
    { icon: '🧪', title: 'Research Grants', desc: 'The Office of Research has $2.4M in internal grant funding available. Applications due June 15.' },
    { icon: '📑', title: 'Course Evaluations', desc: 'Student evaluations for spring semester open April 28 and close May 3. Results available June 1.' },
    { icon: '📬', title: 'Faculty Senate News', desc: 'The May 8 Senate meeting will vote on the revised general education framework. Proposal available on the Faculty Hub.' },
    { icon: '🛠️', title: 'New Equipment Grants', desc: 'Submit requests for lab or classroom equipment upgrades by May 1. Funding from the Academic Excellence Fund.' },
  ],
  alumni: [
    { icon: '🤝', title: 'Regional Chapters', desc: 'Join one of 45 regional alumni chapters. Monthly events, mentorship, and a network of 60,000+ members worldwide.' },
    { icon: '📰', title: 'Riverside Today', desc: 'Our spring issue is out! Features 30 Under 30 alumni honorees and a look at the new Innovation Hub opening in fall.' },
    { icon: '🎁', title: 'The River Fund', desc: 'Your gift directly supports student scholarships. 78% of our operating scholarships come from alumni generosity.' },
    { icon: '🏆', title: 'Distinguished Alumni Awards', desc: 'Nominations for the 2026 Distinguished Alumni Awards are open now. Deadline: July 31.' },
    { icon: '🎓', title: 'Lifelong Learning', desc: 'Alumni can audit classes for free. Browse spring offerings and register through the Alumni Portal.' },
  ],
  parent: [
    { icon: '🔒', title: 'Campus Safety Report', desc: 'Our 2025 Annual Security Report is available online. Campus emergency line: 555-RIV-SAFE (24/7).' },
    { icon: '💳', title: 'Payment Plans', desc: 'Spread tuition across 5 monthly installments with no interest. Enroll by May 15 for the fall semester.' },
    { icon: '🧠', title: 'Family Mental Health Guide', desc: 'How to support your student\'s wellbeing from afar. Resource guide prepared by Counseling Services.' },
    { icon: '📅', title: 'Family Weekend', desc: 'Fall Family Weekend is October 10–12. Registration opens August 1. Hotels fill fast — plan early!' },
    { icon: '🤝', title: 'Parent & Family Association', desc: 'Connect with other families, volunteer, and stay informed. Over 3,200 families are active members.' },
  ],
};

// ─── News & events (universal) ───────────────────────────────────────────────

const NEWS = [
  {
    img: 'https://images.pexels.com/photos/1181345/pexels-photo-1181345.jpeg?auto=compress&cs=tinysrgb&w=200',
    cat: 'Research • Apr 24',
    title: 'Riverside chemists develop breakthrough biodegradable polymer for medical implants',
  },
  {
    img: 'https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&w=200',
    cat: 'Athletics • Apr 22',
    title: 'Women\'s rowing takes conference title for the third year running',
  },
  {
    img: 'https://images.pexels.com/photos/301926/pexels-photo-301926.jpeg?auto=compress&cs=tinysrgb&w=200',
    cat: 'Campus Life • Apr 20',
    title: 'New Innovation Hub to open fall 2026, featuring six cross-disciplinary labs',
  },
  {
    img: 'https://images.pexels.com/photos/1438080/pexels-photo-1438080.jpeg?auto=compress&cs=tinysrgb&w=200',
    cat: 'Alumni • Apr 18',
    title: 'Class of 2015\'s Jordan Walsh named to Forbes 30 Under 30 in Social Impact',
  },
];

const EVENTS = [
  { day: '01', mon: 'May', title: 'Spring Registration Opens', loc: 'Student Portal' },
  { day: '06', mon: 'May', title: 'Finals Week Begins', loc: 'Campus-wide' },
  { day: '08', mon: 'May', title: 'Faculty Senate Meeting', loc: 'Hoover Hall 210' },
  { day: '17', mon: 'May', title: 'Commencement Ceremony', loc: 'Alumni Field' },
  { day: '24', mon: 'May', title: 'Summer Sessions Begin', loc: 'Campus-wide' },
];

// ─── Render helpers ──────────────────────────────────────────────────────────

function iconSVG(name) {
  const icons = {
    arrow: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`,
    search: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>`,
    menu:   `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
  };
  return icons[name] || '';
}

function renderQuickLinks(links) {
  return links.map(l => `
    <a href="${l.href}" class="quick-link">
      <div class="quick-link-icon">${l.icon}</div>
      <div class="quick-link-text">
        <strong>${l.title}</strong>
        <span>${l.sub}</span>
      </div>
      <span class="quick-link-arrow">${iconSVG('arrow')}</span>
    </a>
  `).join('');
}

function renderAudienceCards(cards) {
  return cards.map(c => `
    <div class="aud-card">
      <div class="aud-card-icon">${c.icon}</div>
      <h3>${c.title}</h3>
      <p>${c.desc}</p>
      <span class="aud-card-footer">Learn more ${iconSVG('arrow')}</span>
    </div>
  `).join('');
}

function renderNews() {
  return NEWS.map(n => `
    <div class="news-item">
      <img src="${n.img}" alt="" loading="lazy" />
      <div>
        <div class="news-meta">${n.cat}</div>
        <div class="news-title">${n.title}</div>
      </div>
    </div>
  `).join('');
}

function renderEvents() {
  return EVENTS.map(e => `
    <div class="event-item">
      <div class="event-date">
        <strong>${e.day}</strong>
        <span>${e.mon}</span>
      </div>
      <div class="event-info">
        <h4>${e.title}</h4>
        <p>${e.loc}</p>
      </div>
    </div>
  `).join('');
}

function renderAudienceTabs(active) {
  return AUDIENCES.map(a => `
    <button class="audience-tab${a.id === active ? ' active' : ''}" data-audience="${a.id}">
      ${a.label}
    </button>
  `).join('');
}

// ─── Full page HTML ──────────────────────────────────────────────────────────

function buildPage(audienceId) {
  const h = HERO_CONTENT[audienceId];
  const primaryCta = h.ctas[0];
  const secondaryCtas = h.ctas.slice(1);
  const cards = AUDIENCE_CARDS[audienceId];
  const aud = AUDIENCES.find(a => a.id === audienceId);

  return `
    <a href="#main" class="skip-link">Skip to main content</a>

    <!-- Alert Banner -->
    <div class="alert-banner" id="alertBanner">
      <span>⚠️</span>
      <strong>Spring registration</strong> for Fall 2026 opens May 1 at 8 AM.
      <button class="alert-dismiss" id="dismissAlert">Dismiss ✕</button>
    </div>

    <!-- Topbar -->
    <div class="topbar">
      <div class="topbar-inner">
        <div class="topbar-links">
          <a href="#">Directory</a>
          <a href="#">Maps & Directions</a>
          <a href="#">Library</a>
          <a href="#">Athletics</a>
          <a href="#">News</a>
          <a href="#">A–Z Index</a>
        </div>
        <div class="topbar-search">
          ${iconSVG('search')}
          <input type="search" placeholder="Search Riverside…" aria-label="Search the site" />
        </div>
      </div>
    </div>

    <!-- Primary Nav -->
    <nav class="primary-nav" aria-label="Main navigation">
      <div class="nav-inner">
        <a href="/" class="nav-logo" aria-label="Riverside University home">
          <div class="nav-logo-mark"><span>RU</span></div>
          <div class="nav-logo-text">
            <strong>Riverside University</strong>
            <small>Est. 1887</small>
          </div>
        </a>
        <div class="nav-links" role="list">
          <a href="#" role="listitem">Academics</a>
          <a href="#" role="listitem">Admissions</a>
          <a href="#" role="listitem">Research</a>
          <a href="#" role="listitem">Campus Life</a>
          <a href="#" role="listitem">About</a>
          <a href="#" role="listitem">Giving</a>
        </div>
        <div class="nav-actions">
          <a href="#" class="btn-outline">Sign In</a>
          <a href="#" class="btn-primary">Apply</a>
          <button class="hamburger" aria-label="Open menu" id="hamburger">${iconSVG('menu')}</button>
        </div>
      </div>
    </nav>

    <!-- Audience Selector Bar -->
    <div class="audience-bar" role="navigation" aria-label="Audience selector">
      <div class="audience-inner">
        <span class="audience-label">I am a:</span>
        <div class="audience-tabs" role="tablist" id="audienceTabs">
          ${renderAudienceTabs(audienceId)}
        </div>
      </div>
    </div>

    <!-- Hero -->
    <section class="hero" aria-label="Welcome banner" id="main">
      <div class="hero-bg" id="heroBg"></div>
      <div class="hero-content">
        <div class="hero-text-animate">
          <span class="hero-eyebrow">${h.eyebrow}</span>
          <h1 class="hero-title">${h.title}</h1>
          <p class="hero-desc">${h.desc}</p>
          <div class="hero-ctas">
            <a href="${primaryCta.href}" class="hero-btn-primary">
              ${primaryCta.label} ${iconSVG('arrow')}
            </a>
            ${secondaryCtas.map(c => `
              <a href="${c.href}" class="hero-btn-secondary">${c.label}</a>
            `).join('')}
          </div>
        </div>
        <div class="quick-panel" aria-label="Quick links">
          <div class="quick-panel-title">${h.quickTitle}</div>
          <nav class="quick-links" aria-label="${h.quickTitle}">
            ${renderQuickLinks(h.quickLinks)}
          </nav>
        </div>
      </div>
    </section>

    <!-- Stats Banner -->
    <div class="stats-banner" aria-label="University at a glance">
      <div class="stats-inner">
        <div class="stat-item"><div class="stat-value">8,000</div><div class="stat-label">Students</div></div>
        <div class="stat-item"><div class="stat-value">80+</div><div class="stat-label">Programs</div></div>
        <div class="stat-item"><div class="stat-value">14:1</div><div class="stat-label">Student–Faculty</div></div>
        <div class="stat-item"><div class="stat-value">94%</div><div class="stat-label">Employment Rate</div></div>
        <div class="stat-item"><div class="stat-value">60K+</div><div class="stat-label">Alumni Worldwide</div></div>
        <div class="stat-item"><div class="stat-value">137</div><div class="stat-label">Years of Excellence</div></div>
      </div>
    </div>

    <!-- Audience-Specific Spotlight -->
    <section class="audience-section" id="audienceSection" aria-label="Resources for ${aud.label}">
      <div class="audience-section-inner">
        <div class="section-header">
          <div>
            <span class="section-tag">For ${aud.label}s</span>
            <h2 class="section-title">Resources tailored for you</h2>
            <p class="section-subtitle">The most relevant information and services for your needs right now.</p>
          </div>
          <a href="#" class="section-link">See all ${iconSVG('arrow')}</a>
        </div>
        <div class="audience-cards" id="audienceCards" role="list">
          ${renderAudienceCards(cards)}
        </div>
      </div>
    </section>

    <!-- Testimonial -->
    <div class="testimonial-section">
      <blockquote>
        "Riverside gave me the research opportunities, the mentors, and the confidence to pursue a career I never thought possible."
      </blockquote>
      <cite>
        <img class="testimonial-avatar" src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=80" alt="Maya Chen" loading="lazy" />
        Maya Chen — Class of 2021, Biochemistry &amp; now PhD candidate at MIT
      </cite>
    </div>

    <!-- News & Events -->
    <div class="content-grid">
      <div class="content-grid-inner">
        <section aria-label="Latest news">
          <div class="section-header">
            <div>
              <span class="section-tag">Campus News</span>
              <h2 class="section-title">What's happening at Riverside</h2>
            </div>
            <a href="#" class="section-link">All news ${iconSVG('arrow')}</a>
          </div>
          <div class="news-list">${renderNews()}</div>
        </section>
        <section aria-label="Upcoming events">
          <div class="section-header">
            <div>
              <span class="section-tag">Calendar</span>
              <h2 class="section-title">Upcoming events</h2>
            </div>
            <a href="#" class="section-link">Full calendar ${iconSVG('arrow')}</a>
          </div>
          <div class="events-list">${renderEvents()}</div>
        </section>
      </div>
    </div>

    <!-- Campus Life Strip -->
    <section class="campus-strip" aria-label="Campus life">
      <div class="campus-strip-inner">
        <div class="campus-strip-text">
          <span class="section-tag">Campus Life</span>
          <h2 class="section-title">A campus alive with possibility</h2>
          <p>From Saturday morning flea markets to late-night debate clubs, from championship athletics to student-run theater — Riverside's 300-acre campus is always in motion. There's a place for every passion here.</p>
          <div class="hero-ctas">
            <a href="#" class="hero-btn-primary">Explore Campus Life ${iconSVG('arrow')}</a>
            <a href="#" class="hero-btn-secondary">Virtual Tour</a>
          </div>
        </div>
        <div class="campus-images" aria-hidden="true">
          <div class="campus-img">
            <img src="https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Riverside campus quad" loading="lazy" />
          </div>
          <div class="campus-img">
            <img src="https://images.pexels.com/photos/256395/pexels-photo-256395.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Students studying" loading="lazy" />
          </div>
          <div class="campus-img">
            <img src="https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Athletics" loading="lazy" />
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="site-footer" aria-label="Site footer">
      <div class="footer-inner">
        <div class="footer-top">
          <div class="footer-brand">
            <div class="nav-logo" style="margin-bottom:0">
              <div class="nav-logo-mark"><span>RU</span></div>
              <div class="nav-logo-text">
                <strong style="color:white;font-size:16px">Riverside University</strong>
                <small>Est. 1887</small>
              </div>
            </div>
            <p>A mid-sized liberal arts university committed to rigorous inquiry, inclusive community, and meaningful impact. Located in Riverside, CA.</p>
            <div class="footer-social" style="margin-top:16px">
              <a href="#" class="social-btn" aria-label="Facebook">f</a>
              <a href="#" class="social-btn" aria-label="Twitter">𝕏</a>
              <a href="#" class="social-btn" aria-label="Instagram">ig</a>
              <a href="#" class="social-btn" aria-label="LinkedIn">in</a>
              <a href="#" class="social-btn" aria-label="YouTube">▶</a>
            </div>
          </div>
          <div class="footer-col">
            <h4>Academics</h4>
            <ul>
              <li><a href="#">Colleges & Schools</a></li>
              <li><a href="#">Programs A–Z</a></li>
              <li><a href="#">Graduate Studies</a></li>
              <li><a href="#">Online Learning</a></li>
              <li><a href="#">Academic Calendar</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Admissions</h4>
            <ul>
              <li><a href="#">Undergraduate</a></li>
              <li><a href="#">Graduate</a></li>
              <li><a href="#">International</a></li>
              <li><a href="#">Transfer</a></li>
              <li><a href="#">Financial Aid</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Campus</h4>
            <ul>
              <li><a href="#">Student Life</a></li>
              <li><a href="#">Housing</a></li>
              <li><a href="#">Athletics</a></li>
              <li><a href="#">Arts & Culture</a></li>
              <li><a href="#">Campus Safety</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#">Directory</a></li>
              <li><a href="#">Maps</a></li>
              <li><a href="#">Library</a></li>
              <li><a href="#">IT Help Desk</a></li>
              <li><a href="#">Emergency Info</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>© 2026 Riverside University. All rights reserved. | <a href="#" style="color:rgba(255,255,255,.55)">Privacy Policy</a> | <a href="#" style="color:rgba(255,255,255,.55)">Accessibility</a> | <a href="#" style="color:rgba(255,255,255,.55)">Title IX</a></p>
          <p style="font-size:11px;color:rgba(255,255,255,.35)">1 University Drive, Riverside, CA 92521 | admissions@riverside.edu | (800) 555-0100</p>
        </div>
      </div>
    </footer>
  `;
}

// ─── State & Init ────────────────────────────────────────────────────────────

const STORAGE_KEY = 'ru_audience';

function getAudience() {
  return localStorage.getItem(STORAGE_KEY) || 'prospective';
}

function setAudience(id) {
  localStorage.setItem(STORAGE_KEY, id);
}

function switchAudience(newId) {
  setAudience(newId);

  // Swap hero content without full re-render to preserve DOM events
  const h = HERO_CONTENT[newId];
  const aud = AUDIENCES.find(a => a.id === newId);

  document.querySelector('.hero-eyebrow').textContent = h.eyebrow;
  document.querySelector('.hero-title').innerHTML = h.title;
  document.querySelector('.hero-desc').textContent = h.desc;

  const ctaContainer = document.querySelector('.hero-ctas');
  const primaryCta = h.ctas[0];
  const secondaryCtas = h.ctas.slice(1);
  ctaContainer.innerHTML = `
    <a href="${primaryCta.href}" class="hero-btn-primary">
      ${primaryCta.label} ${iconSVG('arrow')}
    </a>
    ${secondaryCtas.map(c => `<a href="${c.href}" class="hero-btn-secondary">${c.label}</a>`).join('')}
  `;

  document.querySelector('.quick-panel-title').textContent = h.quickTitle;
  document.querySelector('.quick-links').innerHTML = renderQuickLinks(h.quickLinks);

  const cardsEl = document.getElementById('audienceCards');
  cardsEl.innerHTML = renderAudienceCards(AUDIENCE_CARDS[newId]);

  const sectionTag = document.querySelector('#audienceSection .section-tag');
  if (sectionTag) sectionTag.textContent = `For ${aud.label}s`;

  // Animate hero text
  const heroText = document.querySelector('.hero-text-animate');
  heroText.style.animation = 'none';
  heroText.offsetHeight; // reflow
  heroText.style.animation = '';

  // Update tab states
  document.querySelectorAll('.audience-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.audience === newId);
  });
}

function attachEvents() {
  // Alert dismiss
  const dismiss = document.getElementById('dismissAlert');
  if (dismiss) {
    dismiss.addEventListener('click', () => {
      document.getElementById('alertBanner').style.display = 'none';
    });
  }

  // Audience tabs
  document.getElementById('audienceTabs').addEventListener('click', e => {
    const tab = e.target.closest('[data-audience]');
    if (tab && tab.dataset.audience !== getAudience()) {
      switchAudience(tab.dataset.audience);
    }
  });

  // Hamburger (visual toggle only for demo)
  const ham = document.getElementById('hamburger');
  if (ham) {
    ham.addEventListener('click', () => {
      const navLinks = document.querySelector('.nav-links');
      if (navLinks) {
        const open = navLinks.style.display === 'flex';
        navLinks.style.display = open ? '' : 'flex';
        if (!open) {
          navLinks.style.flexDirection = 'column';
          navLinks.style.position = 'absolute';
          navLinks.style.top = '64px';
          navLinks.style.left = '0';
          navLinks.style.right = '0';
          navLinks.style.background = 'white';
          navLinks.style.padding = '12px 24px 20px';
          navLinks.style.boxShadow = '0 8px 24px rgba(10,34,64,.12)';
          navLinks.style.zIndex = '99';
        }
      }
    });
  }
}

// ─── Mount ───────────────────────────────────────────────────────────────────

const app = document.getElementById('app');
app.style.cssText = 'max-width:none;margin:0;padding:0;text-align:left';

const audience = getAudience();
app.innerHTML = buildPage(audience);
attachEvents();
