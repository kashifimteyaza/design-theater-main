import './style.css'

/* ============================================================
   EduConnect – SPA main.js
   Hash-based routing: #home, #search, #tutor, #booking, #dashboard, #video
   No frameworks, no external deps beyond the CSS Google Fonts link.
   ============================================================ */

// ── State ────────────────────────────────────────────────────
const state = {
  route: 'home',
  currentUser: null,        // null = guest
  selectedTutor: null,
  bookingStep: 1,           // 1-4 (session type → date/time → payment → confirm)
  booking: {
    sessionType: null,
    date: null,
    time: null,
    cardName: '',
    cardNum: '',
    cardExp: '',
    cardCvc: '',
  },
  filters: {
    subject: 'all',
    maxRate: 120,
    minRating: 0,
    sort: 'rating',
    search: '',
  },
  videoTab: 'chat',
  micMuted: false,
  camOff: false,
  chatMessages: [
    { from: 'tutor', name: 'Dr. Sarah Chen', text: 'Hi! Ready to start? Let\'s review what you covered last time.' },
    { from: 'student', name: 'You', text: 'Yes! I practiced the quadratic equations.' },
    { from: 'tutor', name: 'Dr. Sarah Chen', text: 'Great! Let\'s jump into some practice problems.' },
  ],
  videoSeconds: 0,
  authModal: null,           // null | 'login' | 'signup'
  authRole: 'student',
  sessionConfirmed: null,
};

// ── Mock data ─────────────────────────────────────────────────
const TUTORS = [
  {
    id: 1,
    name: 'Dr. Sarah Chen',
    initials: 'SC',
    title: 'PhD Mathematics, Stanford',
    subjects: ['SAT Math', 'Calculus', 'Statistics'],
    rating: 4.9,
    reviews: 142,
    sessions: 380,
    hourlyRate: 85,
    banner: '',
    bio: 'Former Stanford TA with 8 years of tutoring experience. I specialize in making complex mathematics intuitive and enjoyable. My students have achieved average SAT Math score improvements of 120+ points.',
    education: ['PhD Mathematics, Stanford University', 'BS Applied Mathematics, MIT'],
    availability: {
      Mon: ['9am','11am','2pm','4pm'],
      Tue: ['10am','1pm','3pm'],
      Wed: ['9am','11am','2pm','5pm'],
      Thu: ['10am','2pm','4pm'],
      Fri: ['9am','11am','1pm'],
      Sat: ['10am','12pm','2pm'],
      Sun: [],
    },
  },
  {
    id: 2,
    name: 'Marcus Williams',
    initials: 'MW',
    title: 'MS Chemistry, Johns Hopkins',
    subjects: ['Chemistry', 'Biology', 'AP Science'],
    rating: 4.8,
    reviews: 98,
    sessions: 215,
    hourlyRate: 70,
    banner: 'green',
    bio: 'Science educator passionate about experimental thinking. I help students build genuine understanding rather than rote memorization, leading to lasting academic success across all sciences.',
    education: ['MS Chemistry, Johns Hopkins', 'BS Biochemistry, UCLA'],
    availability: {
      Mon: ['8am','10am','3pm'],
      Tue: ['9am','11am','4pm'],
      Wed: ['8am','1pm','3pm'],
      Thu: ['9am','11am','2pm'],
      Fri: ['10am','12pm'],
      Sat: ['9am','11am','1pm','3pm'],
      Sun: ['10am','12pm'],
    },
  },
  {
    id: 3,
    name: 'Prof. Elena Rodriguez',
    initials: 'ER',
    title: 'MFA English, Columbia',
    subjects: ['Essay Writing', 'SAT Reading', 'College Essays'],
    rating: 4.9,
    reviews: 203,
    sessions: 510,
    hourlyRate: 95,
    banner: 'amber',
    bio: 'Published author and writing coach. I have helped 500+ students craft compelling college essays that got them into their dream schools, including Ivy League institutions.',
    education: ['MFA Creative Writing, Columbia University', 'BA English Literature, Yale'],
    availability: {
      Mon: ['10am','12pm','3pm'],
      Tue: ['9am','2pm','5pm'],
      Wed: ['11am','1pm','4pm'],
      Thu: ['10am','12pm','3pm'],
      Fri: ['9am','11am','2pm'],
      Sat: ['10am','12pm'],
      Sun: ['11am','2pm'],
    },
  },
  {
    id: 4,
    name: 'James Park',
    initials: 'JP',
    title: 'BS Physics, Caltech',
    subjects: ['Physics', 'SAT Math', 'ACT Science'],
    rating: 4.7,
    reviews: 76,
    sessions: 162,
    hourlyRate: 65,
    banner: 'blue',
    bio: 'Caltech graduate passionate about physics education. I use real-world examples and problem-solving strategies to make abstract concepts click for high school students.',
    education: ['BS Physics, California Institute of Technology'],
    availability: {
      Mon: ['2pm','4pm','6pm'],
      Tue: ['3pm','5pm'],
      Wed: ['2pm','4pm','6pm'],
      Thu: ['3pm','5pm','7pm'],
      Fri: ['4pm','6pm'],
      Sat: ['10am','12pm','2pm','4pm'],
      Sun: ['11am','1pm','3pm'],
    },
  },
  {
    id: 5,
    name: 'Aisha Thompson',
    initials: 'AT',
    title: 'MEd Education, Harvard',
    subjects: ['SAT Prep', 'ACT Prep', 'Study Skills'],
    rating: 4.9,
    reviews: 187,
    sessions: 430,
    hourlyRate: 90,
    banner: 'rose',
    bio: 'Harvard-trained educator and test prep specialist. I offer a comprehensive approach to SAT/ACT preparation with personalized study plans and proven test-taking strategies.',
    education: ['MEd Education Policy, Harvard', 'BA Psychology, Duke University'],
    availability: {
      Mon: ['9am','11am','1pm','3pm'],
      Tue: ['10am','12pm','2pm'],
      Wed: ['9am','11am','1pm'],
      Thu: ['10am','12pm','3pm'],
      Fri: ['9am','11am','2pm','4pm'],
      Sat: ['9am','11am','1pm'],
      Sun: [],
    },
  },
  {
    id: 6,
    name: 'David Kim',
    initials: 'DK',
    title: 'PhD Computer Science, CMU',
    subjects: ['Computer Science', 'AP CS', 'Python'],
    rating: 4.8,
    reviews: 64,
    sessions: 120,
    hourlyRate: 80,
    banner: '',
    bio: 'CMU CS PhD with industry experience at top tech companies. I make programming intuitive and fun, helping students from complete beginners to AP CS level.',
    education: ['PhD Computer Science, Carnegie Mellon', 'BS CS, University of Washington'],
    availability: {
      Mon: ['5pm','7pm'],
      Tue: ['4pm','6pm','8pm'],
      Wed: ['5pm','7pm'],
      Thu: ['4pm','6pm'],
      Fri: ['5pm','7pm','9pm'],
      Sat: ['10am','12pm','2pm','4pm'],
      Sun: ['2pm','4pm','6pm'],
    },
  },
  {
    id: 7,
    name: 'Rachel Goldstein',
    initials: 'RG',
    title: 'MS Applied Math, Cornell',
    subjects: ['Algebra', 'Geometry', 'Pre-Calculus'],
    rating: 4.8,
    reviews: 112,
    sessions: 290,
    hourlyRate: 60,
    banner: 'green',
    bio: 'Patient and encouraging math tutor with a talent for meeting students at their level. I specialize in building strong foundational skills that carry students through advanced coursework.',
    education: ['MS Applied Mathematics, Cornell University', 'BA Mathematics, Oberlin College'],
    availability: {
      Mon: ['3pm','5pm','7pm'],
      Tue: ['2pm','4pm','6pm'],
      Wed: ['3pm','5pm'],
      Thu: ['2pm','4pm','6pm'],
      Fri: ['3pm','5pm','7pm'],
      Sat: ['11am','1pm','3pm'],
      Sun: ['1pm','3pm'],
    },
  },
  {
    id: 8,
    name: 'Omar Hassan',
    initials: 'OH',
    title: 'MA History, Oxford',
    subjects: ['US History', 'World History', 'Essay Writing'],
    rating: 4.7,
    reviews: 89,
    sessions: 195,
    hourlyRate: 55,
    banner: 'amber',
    bio: 'Oxford-educated historian who brings historical events to life. My students consistently achieve top scores on AP History exams thanks to strong analytical writing skills.',
    education: ['MA Modern History, University of Oxford', 'BA History, Georgetown University'],
    availability: {
      Mon: ['10am','1pm','4pm'],
      Tue: ['11am','2pm','5pm'],
      Wed: ['10am','1pm'],
      Thu: ['11am','2pm','4pm'],
      Fri: ['10am','1pm','3pm'],
      Sat: ['10am','12pm','2pm'],
      Sun: ['11am','1pm'],
    },
  },
];

const REVIEWS = {
  1: [
    { author: 'Emily R.', initials: 'ER', rating: 5, date: '2 weeks ago', text: 'Dr. Chen is absolutely incredible. My SAT Math score went from 620 to 780 in just 3 months. She explains concepts so clearly and tailors each session to exactly what I need.' },
    { author: 'Michael T.', initials: 'MT', rating: 5, date: '1 month ago', text: 'I was really struggling with Calculus BC and Dr. Chen turned everything around. She has a gift for making difficult topics approachable. Highly recommend!' },
    { author: 'Sophie L.', initials: 'SL', rating: 5, date: '2 months ago', text: 'Best tutor I\'ve ever had. Patient, knowledgeable, and always prepared. She sends practice problems after every session which really helps reinforce learning.' },
  ],
  2: [
    { author: 'Carlos M.', initials: 'CM', rating: 5, date: '3 weeks ago', text: 'Marcus made chemistry actually fun! I went from failing to a B+ and feel genuinely excited about science now. He relates everything to real life.' },
    { author: 'Priya K.', initials: 'PK', rating: 5, date: '1 month ago', text: 'Amazing tutor who really cares about his students understanding deeply, not just memorizing. My AP Chem score improved dramatically.' },
  ],
  3: [
    { author: 'Alex J.', initials: 'AJ', rating: 5, date: '1 week ago', text: 'Prof. Rodriguez helped me write my Common App essay and I got into my dream school! She has an incredible ability to draw out your unique story.' },
    { author: 'Nina P.', initials: 'NP', rating: 5, date: '3 weeks ago', text: 'My writing improved more in 4 sessions with Elena than in all of high school. Thoughtful, encouraging, and brilliant feedback.' },
  ],
};

const SESSION_TYPES = [
  { id: 'standard', icon: '📖', name: 'Standard', duration: '1 hour', multiplier: 1, desc: 'Focused one-on-one session' },
  { id: 'intensive', icon: '🚀', name: 'Intensive', duration: '2 hours', multiplier: 1.8, desc: 'Deep-dive extended session' },
  { id: 'group', icon: '👥', name: 'Group', duration: '1 hour', multiplier: 0.6, desc: 'Up to 4 students, shared cost' },
];

const DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

// ── Routing ───────────────────────────────────────────────────
function navigate(route, data = {}) {
  state.route = route;
  if (data.tutor !== undefined) state.selectedTutor = data.tutor;
  if (data.resetBooking) {
    state.bookingStep = 1;
    state.booking = { sessionType: null, date: null, time: null, cardName: '', cardNum: '', cardExp: '', cardCvc: '' };
    state.sessionConfirmed = null;
  }
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── Render dispatcher ─────────────────────────────────────────
function render() {
  const app = document.getElementById('app');
  const navHTML = renderNav();
  const toastHTML = `<div class="toast-container" id="toast-container"></div>`;

  let pageHTML = '';
  switch (state.route) {
    case 'home':     pageHTML = renderHome(); break;
    case 'search':   pageHTML = renderSearch(); break;
    case 'tutor':    pageHTML = renderTutorProfile(); break;
    case 'booking':  pageHTML = renderBookingFlow(); break;
    case 'dashboard':pageHTML = renderDashboard(); break;
    case 'video':    pageHTML = renderVideoSession(); break;
    default:         pageHTML = renderHome();
  }

  if (state.route === 'video') {
    app.innerHTML = pageHTML + toastHTML + renderModalIfOpen();
    bindVideoEvents();
  } else {
    app.innerHTML = navHTML + pageHTML + toastHTML + renderModalIfOpen();
    bindGlobalEvents();
  }
  initRevealAnimations();
}

// ── Navbar ────────────────────────────────────────────────────
function renderNav() {
  const u = state.currentUser;
  return `
  <nav class="navbar" id="navbar">
    <div class="container">
      <div class="navbar-inner">
        <div class="logo" data-nav="home">
          <div class="logo-icon">✦</div>
          <span>EduConnect</span>
        </div>
        <div class="nav-links">
          <span class="nav-link ${state.route==='home'?'active':''}" data-nav="home">Home</span>
          <span class="nav-link ${state.route==='search'?'active':''}" data-nav="search">Find Tutors</span>
          ${u ? `<span class="nav-link ${state.route==='dashboard'?'active':''}" data-nav="dashboard">Dashboard</span>` : ''}
        </div>
        <div class="nav-actions">
          ${u ? `
            <button class="avatar-btn notif-dot" title="${u.name}" data-nav="dashboard">${u.initials}</button>
          ` : `
            <button class="btn btn-ghost btn-sm" id="btn-login">Sign In</button>
            <button class="btn btn-primary btn-sm" id="btn-signup">Get Started</button>
          `}
        </div>
      </div>
    </div>
  </nav>`;
}

// ── Home page ─────────────────────────────────────────────────
function renderHome() {
  const featured = TUTORS.slice(0, 3);
  return `
  <main>
    <!-- Hero -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <div class="hero-left">
            <div class="hero-eyebrow">
              <span class="eyebrow-dot"></span>
              Trusted by 12,000+ students
            </div>
            <h1 class="heading-xl hero-title">
              Find the perfect tutor for your <span>academic journey</span>
            </h1>
            <p class="hero-subtitle">
              Connect with expert tutors for SAT prep, math, science, and essay writing.
              Book sessions in minutes, learn on your schedule.
            </p>
            <div class="hero-search" id="hero-search-form">
              <input class="hero-search-input" id="hero-search-input" placeholder="Search by subject, tutor name..." />
              <select class="hero-search-select" id="hero-search-subject">
                <option value="all">All Subjects</option>
                <option value="sat">SAT / ACT Prep</option>
                <option value="math">Mathematics</option>
                <option value="science">Science</option>
                <option value="writing">Writing</option>
                <option value="cs">Computer Science</option>
                <option value="history">History</option>
              </select>
              <button class="btn btn-primary" id="hero-search-btn">Search</button>
            </div>
            <div class="hero-stats">
              <div>
                <div class="hero-stat-value">500+</div>
                <div class="hero-stat-label">Expert Tutors</div>
              </div>
              <div>
                <div class="hero-stat-value">4.9★</div>
                <div class="hero-stat-label">Avg. Rating</div>
              </div>
              <div>
                <div class="hero-stat-value">98%</div>
                <div class="hero-stat-label">Satisfaction</div>
              </div>
              <div>
                <div class="hero-stat-value">50k+</div>
                <div class="hero-stat-label">Sessions Done</div>
              </div>
            </div>
          </div>
          <div class="hero-visual">
            ${renderHeroCard(TUTORS[0])}
            ${renderHeroCard(TUTORS[2])}
          </div>
        </div>
      </div>
    </section>

    <!-- Browse by Subject -->
    <section class="section section-alt">
      <div class="container">
        <div class="section-header reveal">
          <div class="section-eyebrow">Browse by Subject</div>
          <h2 class="heading-lg section-title">Find your subject area</h2>
          <p class="section-subtitle">From SAT prep to advanced coursework, our tutors cover every subject you need.</p>
        </div>
        <div class="subjects-grid reveal">
          ${[
            {icon:'📐',name:'SAT / ACT Prep',count:'124 tutors',sub:'sat'},
            {icon:'📊',name:'Mathematics',count:'98 tutors',sub:'math'},
            {icon:'🔬',name:'Science',count:'87 tutors',sub:'science'},
            {icon:'✍️',name:'Essay Writing',count:'65 tutors',sub:'writing'},
            {icon:'💻',name:'Computer Science',count:'42 tutors',sub:'cs'},
            {icon:'📚',name:'History',count:'38 tutors',sub:'history'},
          ].map(s => `
            <div class="subject-chip" data-subject="${s.sub}">
              <div class="subject-icon">${s.icon}</div>
              <div class="subject-name">${s.name}</div>
              <div class="subject-count">${s.count}</div>
            </div>`).join('')}
        </div>
      </div>
    </section>

    <!-- Featured Tutors -->
    <section class="section">
      <div class="container">
        <div class="section-header flex justify-between items-center reveal">
          <div>
            <div class="section-eyebrow">Featured Tutors</div>
            <h2 class="heading-lg section-title">Top-rated tutors this week</h2>
          </div>
          <button class="btn btn-outline" data-nav="search">View All Tutors</button>
        </div>
        <div class="tutors-grid">
          ${featured.map(t => renderTutorCard(t)).join('')}
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="section section-alt">
      <div class="container">
        <div class="section-header text-center reveal">
          <div class="section-eyebrow">How It Works</div>
          <h2 class="heading-lg section-title">From search to session in 4 steps</h2>
          <p class="section-subtitle" style="margin:0 auto">Our streamlined booking process gets you learning as fast as possible.</p>
        </div>
        <div class="steps-grid reveal">
          <div class="step-card">
            <div class="step-num">1</div>
            <div class="step-title">Search & Filter</div>
            <p class="step-desc">Browse tutors by subject, rating, and hourly rate. Read verified reviews from real students.</p>
          </div>
          <div class="step-card">
            <div class="step-num">2</div>
            <div class="step-title">Book a Trial Session</div>
            <p class="step-desc">Select your session type, choose a time slot that works for you, and pay securely online.</p>
          </div>
          <div class="step-card">
            <div class="step-num">3</div>
            <div class="step-title">Attend via Video</div>
            <p class="step-desc">Join your session in one click. Our built-in video, chat, and whiteboard keep everything in one place.</p>
          </div>
          <div class="step-card">
            <div class="step-num">4</div>
            <div class="step-title">Track Your Progress</div>
            <p class="step-desc">Review session notes, track improvements, and easily rebook with tutors who are a great fit.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="section">
      <div class="container">
        <div class="section-header text-center reveal">
          <div class="section-eyebrow">Student Stories</div>
          <h2 class="heading-lg section-title">Real results, real students</h2>
        </div>
        <div class="testimonials-grid reveal">
          ${[
            {text:`"My SAT score went from 1180 to 1440 after 8 sessions with Dr. Chen. I couldn't believe the improvement. The personalized approach made all the difference."`,name:'Emma Liu',role:'Stanford Class of 2028',init:'EL'},
            {text:`"Prof. Rodriguez helped me write a college essay that truly captured who I am. I got into my top choice and I honestly couldn't have done it without her guidance."`,name:'Jordan Williams',role:'Columbia Class of 2027',init:'JW'},
            {text:`"I was so stressed about AP Chemistry. Marcus made it fun and actually understandable. Went from a 2 to a 5 on the exam. Incredible tutor!"`,name:'Priya Sharma',role:'High School Junior',init:'PS'},
          ].map(t => `
            <div class="testimonial-card reveal">
              <div class="testimonial-stars">★★★★★</div>
              <p class="testimonial-text">${t.text}</p>
              <div class="testimonial-author">
                <div class="testimonial-avatar">${t.init}</div>
                <div>
                  <div class="testimonial-name">${t.name}</div>
                  <div class="testimonial-role">${t.role}</div>
                </div>
              </div>
            </div>`).join('')}
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-banner">
      <div class="container">
        <h2 class="cta-title">Ready to reach your academic goals?</h2>
        <p class="cta-subtitle">Join thousands of students who improved their scores and confidence with EduConnect tutors.</p>
        <div class="cta-actions">
          <button class="btn btn-accent btn-lg" data-nav="search">Find a Tutor Now</button>
          <button class="btn btn-lg" style="background:rgba(255,255,255,.15);color:#fff;border-color:rgba(255,255,255,.3)" id="btn-tutor-join">Become a Tutor</button>
        </div>
      </div>
    </section>

    <!-- Footer -->
    ${renderFooter()}
  </main>`;
}

function renderHeroCard(t) {
  return `
  <div class="tutor-card-preview">
    <div class="tcp-header">
      <div class="tcp-avatar">${t.initials}</div>
      <div>
        <div class="tcp-name">${t.name}</div>
        <div class="tcp-subject">${t.subjects[0]}</div>
      </div>
      <div class="tcp-rating" style="margin-left:auto">
        <span class="tcp-stars">★</span>
        <span>${t.rating}</span>
      </div>
    </div>
    <div class="tcp-slots">
      ${Object.entries(t.availability).slice(0,3).flatMap(([day, slots]) =>
        slots.slice(0,1).map(s => `<span class="tcp-slot available">${day} ${s}</span>`)
      ).join('')}
      <span class="tcp-slot">$${t.hourlyRate}/hr</span>
    </div>
  </div>`;
}

// ── Search / Browse page ──────────────────────────────────────
function renderSearch() {
  const filtered = getFilteredTutors();
  return `
  <main>
    <div class="search-header">
      <div class="container">
        <h1 class="heading-lg search-header-title">Find Your Tutor</h1>
        <p class="search-header-subtitle">${filtered.length} tutors available • Book a session today</p>
      </div>
    </div>
    <div class="container">
      <div class="search-layout">
        <!-- Filters -->
        <aside class="filter-panel">
          <div class="filter-section">
            <div class="filter-label">Subject</div>
            <div class="filter-options">
              ${['all','sat','math','science','writing','cs','history'].map(s => `
                <div class="filter-option">
                  <input type="radio" name="subject" id="sub-${s}" value="${s}" ${state.filters.subject===s?'checked':''} />
                  <label for="sub-${s}">${s==='all'?'All Subjects':s==='sat'?'SAT / ACT Prep':s==='cs'?'Computer Science':s.charAt(0).toUpperCase()+s.slice(1)}</label>
                </div>`).join('')}
            </div>
          </div>
          <div class="filter-section">
            <div class="filter-label">Max Hourly Rate</div>
            <input type="range" class="range-slider" id="rate-slider" min="30" max="150" value="${state.filters.maxRate}" step="5" />
            <div class="range-values"><span>$30</span><span id="rate-display">Up to $${state.filters.maxRate}/hr</span><span>$150</span></div>
          </div>
          <div class="filter-section">
            <div class="filter-label">Minimum Rating</div>
            <div class="filter-options">
              ${[0,4,4.5,4.8].map(r => `
                <div class="filter-option">
                  <input type="radio" name="minrating" id="rat-${r}" value="${r}" ${state.filters.minRating==r?'checked':''} />
                  <label for="rat-${r}">${r===0?'Any Rating':r+'★ and above'}</label>
                </div>`).join('')}
            </div>
          </div>
          <button class="btn btn-ghost btn-sm" id="clear-filters" style="margin-top:8px">Clear Filters</button>
        </aside>

        <!-- Results -->
        <div>
          <div class="search-results-header">
            <div class="results-count">Showing <strong>${filtered.length}</strong> tutors</div>
            <select class="sort-select" id="sort-select">
              <option value="rating" ${state.filters.sort==='rating'?'selected':''}>Sort: Top Rated</option>
              <option value="price-asc" ${state.filters.sort==='price-asc'?'selected':''}>Sort: Price Low→High</option>
              <option value="price-desc" ${state.filters.sort==='price-desc'?'selected':''}>Sort: Price High→Low</option>
              <option value="sessions" ${state.filters.sort==='sessions'?'selected':''}>Sort: Most Sessions</option>
            </select>
          </div>
          <div class="tutors-grid">
            ${filtered.length ? filtered.map(t => renderTutorCard(t)).join('') : `
              <div style="grid-column:1/-1;text-align:center;padding:80px 0;color:var(--gray-400)">
                <div style="font-size:3rem;margin-bottom:16px">🔍</div>
                <div style="font-size:1.125rem;font-weight:600;margin-bottom:8px">No tutors found</div>
                <div>Try adjusting your filters</div>
              </div>`}
          </div>
        </div>
      </div>
    </div>
    ${renderFooter()}
  </main>`;
}

function getFilteredTutors() {
  let list = [...TUTORS];
  const { subject, maxRate, minRating, sort, search } = state.filters;

  if (subject !== 'all') {
    const map = { sat: ['SAT','ACT'], math: ['Math','Calc','Algebra','Geometry','Statistics','Pre-Calc'], science: ['Chemistry','Biology','Physics','Science'], writing: ['Essay','Writing'], cs: ['Computer','Python','CS'], history: ['History'] };
    const terms = map[subject] || [];
    list = list.filter(t => t.subjects.some(s => terms.some(term => s.includes(term))));
  }
  list = list.filter(t => t.hourlyRate <= maxRate && t.rating >= minRating);
  if (search) {
    const q = search.toLowerCase();
    list = list.filter(t => t.name.toLowerCase().includes(q) || t.subjects.some(s => s.toLowerCase().includes(q)));
  }

  if (sort === 'rating') list.sort((a,b) => b.rating - a.rating);
  else if (sort === 'price-asc') list.sort((a,b) => a.hourlyRate - b.hourlyRate);
  else if (sort === 'price-desc') list.sort((a,b) => b.hourlyRate - a.hourlyRate);
  else if (sort === 'sessions') list.sort((a,b) => b.sessions - a.sessions);

  return list;
}

function renderTutorCard(t) {
  const tagColors = ['tag-blue','tag-teal','tag-amber','tag-green','tag-rose'];
  return `
  <div class="tutor-card reveal" data-tutor-id="${t.id}">
    <div class="tutor-card-banner ${t.banner}">
      <div class="tutor-card-avatar">${t.initials}</div>
    </div>
    <div class="tutor-card-body">
      <div class="tutor-card-name">${t.name}</div>
      <div class="tutor-card-title">${t.title}</div>
      <div class="tutor-card-subjects">
        ${t.subjects.map((s,i) => `<span class="tag ${tagColors[i%tagColors.length]}">${s}</span>`).join('')}
      </div>
      <div class="tutor-card-meta">
        <div class="tutor-meta-item">
          <span class="stars">${'★'.repeat(Math.floor(t.rating))}</span>
          <span>${t.rating}</span>
          <span style="color:var(--gray-400)">(${t.reviews})</span>
        </div>
        <div class="tutor-meta-item">📅 ${t.sessions} sessions</div>
        <div class="tutor-price">$${t.hourlyRate}<span>/hr</span></div>
      </div>
    </div>
  </div>`;
}

// ── Tutor Profile ─────────────────────────────────────────────
function renderTutorProfile() {
  const t = state.selectedTutor;
  if (!t) return renderSearch();
  const reviews = REVIEWS[t.id] || [];
  const tagColors = ['tag-blue','tag-teal','tag-amber'];

  return `
  <main class="profile-page">
    <div class="profile-hero">
      <div class="container">
        <div class="profile-hero-inner">
          <div class="profile-avatar-lg">${t.initials}</div>
          <div class="profile-name-block">
            <div class="name">${t.name}</div>
            <div class="title">${t.title}</div>
            <div class="badges">
              ${t.subjects.map(s => `<span class="badge-white">${s}</span>`).join('')}
            </div>
            <div class="profile-stats-row">
              <div>
                <div class="pstat-value">${t.rating}★</div>
                <div class="pstat-label">${t.reviews} reviews</div>
              </div>
              <div>
                <div class="pstat-value">${t.sessions}</div>
                <div class="pstat-label">sessions</div>
              </div>
              <div>
                <div class="pstat-value">5+</div>
                <div class="pstat-label">years exp</div>
              </div>
            </div>
          </div>
          <div class="profile-cta-box">
            <div class="profile-price-display">
              <sup>$</sup>${t.hourlyRate}<sub>/hour</sub>
            </div>
            <div style="color:rgba(255,255,255,.7);font-size:.875rem;margin:8px 0 16px">Trial session available</div>
            <button class="btn btn-accent btn-lg" style="width:100%;justify-content:center" id="book-now-btn">
              Book a Session
            </button>
            <div style="color:rgba(255,255,255,.55);font-size:.75rem;margin-top:12px">Free cancellation up to 24hrs</div>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="profile-body">
        <!-- Main content -->
        <div>
          <div class="profile-section reveal">
            <div class="profile-section-title">About ${t.name.split(' ')[0]}</div>
            <p style="color:var(--gray-700);line-height:1.75;font-size:.9375rem">${t.bio}</p>
          </div>

          <div class="profile-section reveal">
            <div class="profile-section-title">Education</div>
            ${t.education.map(e => `
              <div style="display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid var(--gray-100)">
                <span style="font-size:1.25rem">🎓</span>
                <span style="font-size:.9375rem;color:var(--gray-700)">${e}</span>
              </div>`).join('')}
          </div>

          <div class="profile-section reveal">
            <div class="profile-section-title">Upcoming Availability</div>
            <div class="availability-grid">
              ${DAYS.map(day => `
                <div class="day-col">
                  <div class="day-label">${day}</div>
                  ${(t.availability[day]||[]).length ? t.availability[day].map(slot => `
                    <div class="time-slot available">${slot}</div>`).join('') : `<div class="time-slot">—</div>`}
                </div>`).join('')}
            </div>
            <p class="text-sm text-muted">Click a time slot to begin booking</p>
          </div>

          <div class="profile-section reveal">
            <div class="profile-section-title">Student Reviews (${reviews.length})</div>
            ${reviews.map(r => `
              <div class="review-card">
                <div class="review-header">
                  <div class="review-avatar">${r.initials}</div>
                  <div>
                    <div class="review-author">${r.author}</div>
                    <div class="review-date">${r.date}</div>
                  </div>
                  <div class="stars" style="margin-left:auto">${'★'.repeat(r.rating)}</div>
                </div>
                <p class="review-text">${r.text}</p>
              </div>`).join('')}
          </div>
        </div>

        <!-- Booking sidebar -->
        <aside class="booking-sidebar">
          <div class="booking-widget">
            <div class="booking-widget-title">Book a Session</div>
            <div style="font-size:2rem;font-weight:700;color:var(--gray-900);margin-bottom:4px">
              $${t.hourlyRate}<span style="font-size:.875rem;font-weight:400;color:var(--gray-400)">/hour</span>
            </div>
            <p class="text-sm text-muted" style="margin-bottom:20px">Free cancellation up to 24 hours before</p>
            <div class="session-type-options">
              ${SESSION_TYPES.map(st => `
                <div class="session-type-option" data-st="${st.id}">
                  <div style="display:flex;align-items:center;justify-content:space-between">
                    <div class="session-type-name">${st.icon} ${st.name}</div>
                    <div class="session-type-price">$${Math.round(t.hourlyRate * st.multiplier)}</div>
                  </div>
                  <div class="session-type-desc">${st.duration} · ${st.desc}</div>
                </div>`).join('')}
            </div>
            <button class="btn btn-primary btn-lg" style="width:100%;justify-content:center" id="proceed-book-btn">
              Check Availability
            </button>
            <div style="text-align:center;margin-top:12px">
              <span class="badge badge-success">✓ Usually responds in &lt;2 hours</span>
            </div>
          </div>
          <div style="margin-top:16px;background:#fff;border:1.5px solid var(--gray-200);border-radius:var(--radius-xl);padding:20px">
            <div style="font-weight:700;margin-bottom:12px;color:var(--gray-900)">Quick Stats</div>
            <div style="display:flex;flex-direction:column;gap:10px">
              ${[
                {icon:'⚡',label:'Response time',val:'Under 2 hours'},
                {icon:'📅',label:'Sessions completed',val:t.sessions},
                {icon:'🎯',label:'Repeat students',val:'78%'},
                {icon:'📈',label:'Avg score improvement',val:'+130 pts'},
              ].map(q => `
                <div style="display:flex;align-items:center;gap:10px;font-size:.875rem">
                  <span>${q.icon}</span>
                  <span style="color:var(--gray-600);flex:1">${q.label}</span>
                  <span style="font-weight:600;color:var(--gray-900)">${q.val}</span>
                </div>`).join('')}
            </div>
          </div>
        </aside>
      </div>
    </div>
    ${renderFooter()}
  </main>`;
}

// ── Booking Flow ──────────────────────────────────────────────
function renderBookingFlow() {
  const t = state.selectedTutor;
  if (!t) return renderHome();

  const stepLabels = ['Session Type','Date & Time','Payment','Confirmation'];
  const steps = stepLabels.map((label, i) => {
    const num = i + 1;
    const isDone = num < state.bookingStep;
    const isActive = num === state.bookingStep;
    const circleClass = isDone ? 'done' : isActive ? 'active' : '';
    const labelClass = isDone ? 'done' : isActive ? 'active' : '';
    const check = isDone ? '✓' : num;
    return `
      <div class="step-item">
        <div class="step-circle ${circleClass}">${check}</div>
        <span class="step-label ${labelClass}">${label}</span>
      </div>
      ${i < stepLabels.length - 1 ? `<div class="step-connector ${isDone?'done':''}"></div>` : ''}`;
  }).join('');

  const progress = ((state.bookingStep - 1) / (stepLabels.length - 1)) * 100;

  return `
  <main class="booking-flow">
    <div class="container">
      <div style="display:flex;align-items:center;gap:16px;margin-bottom:32px">
        <button class="btn btn-ghost btn-sm" id="booking-back-nav">← Back</button>
        <div style="display:flex;align-items:center;gap:12px">
          <div class="profile-avatar-lg" style="width:40px;height:40px;font-size:1rem">${t.initials}</div>
          <div>
            <div style="font-weight:700;font-size:.9375rem">${t.name}</div>
            <div class="text-muted text-sm">$${t.hourlyRate}/hr · ${t.subjects[0]}</div>
          </div>
        </div>
      </div>

      <div class="progress-bar">
        <div class="progress-fill" style="width:${progress}%"></div>
      </div>

      <div class="booking-steps">${steps}</div>

      ${renderBookingStep(t)}
    </div>
  </main>`;
}

function renderBookingStep(t) {
  switch (state.bookingStep) {
    case 1: return renderStepSession(t);
    case 2: return renderStepDateTime(t);
    case 3: return renderStepPayment(t);
    case 4: return renderStepConfirmation(t);
  }
}

function renderStepSession(t) {
  return `
  <div class="booking-card">
    <div class="booking-card-title">Choose your session type</div>
    <p class="booking-card-subtitle">Select the format that best fits your learning goals and schedule.</p>
    <div class="session-picker">
      ${SESSION_TYPES.map(st => {
        const price = Math.round(t.hourlyRate * st.multiplier);
        const sel = state.booking.sessionType === st.id;
        return `
        <div class="session-option ${sel?'selected':''}" data-session-type="${st.id}">
          <div class="session-opt-icon">${st.icon}</div>
          <div class="session-opt-name">${st.name}</div>
          <div class="session-opt-duration">${st.duration}</div>
          <div style="font-size:.8125rem;color:var(--gray-500);margin-top:4px">${st.desc}</div>
          <div class="session-opt-price">$${price}</div>
        </div>`;
      }).join('')}
    </div>
    <div style="display:flex;justify-content:flex-end;gap:12px">
      <button class="btn btn-ghost" data-nav="tutor">Cancel</button>
      <button class="btn btn-primary" id="step-next-1" ${state.booking.sessionType?'':'disabled'}>
        Continue to Date &amp; Time →
      </button>
    </div>
  </div>`;
}

function renderStepDateTime(t) {
  const today = new Date();
  const dates = Array.from({length:14}, (_,i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i + 1);
    return d;
  });
  const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  const timeSlots = ['8:00 AM','9:00 AM','10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM','6:00 PM','7:00 PM'];
  const unavailable = [0,3,7,10];

  return `
  <div class="booking-card">
    <div class="booking-card-title">Pick your date &amp; time</div>
    <p class="booking-card-subtitle">All times shown in your local timezone.</p>

    <div style="font-weight:600;margin-bottom:12px;color:var(--gray-700)">Select a date</div>
    <div class="date-picker-grid">
      ${dates.map((d,i) => {
        const sel = state.booking.date === d.toISOString().split('T')[0];
        return `
        <div class="date-cell ${sel?'selected':''}" data-date="${d.toISOString().split('T')[0]}">
          <span class="day-name">${dayNames[d.getDay()]}</span>
          <span class="day-num">${d.getDate()}</span>
          <span style="font-size:.625rem;opacity:.7">${monthNames[d.getMonth()]}</span>
        </div>`;
      }).join('')}
    </div>

    <div style="font-weight:600;margin-bottom:12px;color:var(--gray-700)">Select a time</div>
    <div class="time-slots-row">
      ${timeSlots.map((slot,i) => `
        <button class="time-btn ${unavailable.includes(i)?'unavailable':''} ${state.booking.time===slot?'selected':''}"
          data-time="${slot}" ${unavailable.includes(i)?'disabled':''}>
          ${slot}
        </button>`).join('')}
    </div>

    <div style="display:flex;justify-content:space-between;gap:12px">
      <button class="btn btn-outline" id="step-back-2">← Back</button>
      <button class="btn btn-primary" id="step-next-2" ${state.booking.date && state.booking.time?'':'disabled'}>
        Continue to Payment →
      </button>
    </div>
  </div>`;
}

function renderStepPayment(t) {
  const st = SESSION_TYPES.find(s => s.id === state.booking.sessionType);
  const price = st ? Math.round(t.hourlyRate * st.multiplier) : t.hourlyRate;
  const tax = Math.round(price * 0.08);

  return `
  <div class="booking-card">
    <div class="booking-card-title">Payment details</div>
    <p class="booking-card-subtitle">Your session is secured with end-to-end encrypted payment.</p>

    <div class="order-summary">
      <div class="order-row"><span>${st?.name || 'Standard'} Session with ${t.name}</span><span>$${price}</span></div>
      <div class="order-row"><span>${state.booking.date} at ${state.booking.time}</span><span>${st?.duration || '1 hour'}</span></div>
      <div class="order-row"><span>Platform fee</span><span>$5</span></div>
      <div class="order-row"><span>Tax</span><span>$${tax}</span></div>
      <div class="order-row total"><span>Total</span><span>$${price + 5 + tax}</span></div>
    </div>

    <div class="payment-form">
      <div class="form-group">
        <label class="form-label">Cardholder Name</label>
        <input class="form-input" id="card-name" placeholder="Full name on card" value="${state.booking.cardName}" />
      </div>
      <div class="form-group">
        <label class="form-label">Card Number</label>
        <input class="form-input card" id="card-num" placeholder="1234 5678 9012 3456" maxlength="19" value="${state.booking.cardNum}" />
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Expiry Date</label>
          <input class="form-input" id="card-exp" placeholder="MM / YY" maxlength="7" value="${state.booking.cardExp}" />
        </div>
        <div class="form-group">
          <label class="form-label">Security Code</label>
          <input class="form-input" id="card-cvc" placeholder="CVC" maxlength="4" value="${state.booking.cardCvc}" />
        </div>
      </div>
    </div>

    <div style="background:var(--primary-50);border-radius:var(--radius-md);padding:12px 16px;margin-bottom:20px;font-size:.875rem;color:var(--primary-700);display:flex;gap:10px;align-items:center">
      🔒 <span>Your payment info is encrypted and never stored on our servers.</span>
    </div>

    <div style="display:flex;justify-content:space-between;gap:12px">
      <button class="btn btn-outline" id="step-back-3">← Back</button>
      <button class="btn btn-primary" id="step-next-3">
        Confirm &amp; Pay $${price + 5 + tax} →
      </button>
    </div>
  </div>`;
}

function renderStepConfirmation(t) {
  const st = SESSION_TYPES.find(s => s.id === state.booking.sessionType);
  const price = st ? Math.round(t.hourlyRate * st.multiplier) : t.hourlyRate;
  return `
  <div class="booking-card">
    <div class="confirmation-panel">
      <div class="confirmation-icon">✓</div>
      <div class="confirmation-title">You're all booked!</div>
      <p class="confirmation-subtitle">
        Your session with <strong>${t.name}</strong> has been confirmed.
        A calendar invite and video link have been sent to your email.
      </p>
      <div class="confirmation-details">
        <div class="conf-detail-row"><span>Tutor</span><span>${t.name}</span></div>
        <div class="conf-detail-row"><span>Subject</span><span>${t.subjects[0]}</span></div>
        <div class="conf-detail-row"><span>Session Type</span><span>${st?.name || 'Standard'} (${st?.duration || '1 hour'})</span></div>
        <div class="conf-detail-row"><span>Date</span><span>${state.booking.date}</span></div>
        <div class="conf-detail-row"><span>Time</span><span>${state.booking.time}</span></div>
        <div class="conf-detail-row"><span>Total Paid</span><span>$${price + 5 + Math.round(price*0.08)}</span></div>
        <div class="conf-detail-row"><span>Meeting Link</span><span style="color:var(--primary-700);font-size:.875rem">Auto-generated</span></div>
      </div>
      <div style="display:flex;flex-direction:column;gap:12px">
        <button class="btn btn-primary btn-lg" id="join-session-btn" style="justify-content:center">
          🎥 Join Demo Session
        </button>
        <button class="btn btn-outline" data-nav="dashboard" style="justify-content:center">
          Go to My Dashboard
        </button>
        <button class="btn btn-ghost" data-nav="search" style="justify-content:center">
          Browse More Tutors
        </button>
      </div>
    </div>
  </div>`;
}

// ── Dashboard ─────────────────────────────────────────────────
function renderDashboard() {
  const u = state.currentUser;
  if (!u) {
    return `<main style="min-height:100vh;display:flex;align-items:center;justify-content:center">
      <div style="text-align:center">
        <div style="font-size:3rem;margin-bottom:16px">🔐</div>
        <h2 style="margin-bottom:8px">Sign in to access your dashboard</h2>
        <p class="text-muted" style="margin-bottom:24px">Track sessions, manage bookings, and more.</p>
        <button class="btn btn-primary" id="btn-login">Sign In</button>
      </div>
    </main>`;
  }

  if (u.role === 'tutor') return renderTutorDashboard(u);
  return renderStudentDashboard(u);
}

function renderStudentDashboard(u) {
  const upcomingSessions = [
    { day: '05', mon: 'May', name: 'Dr. Sarah Chen', sub: 'SAT Math', time: '4:00 PM', type: 'Standard' },
    { day: '08', mon: 'May', name: 'Prof. Elena Rodriguez', sub: 'Essay Writing', time: '2:00 PM', type: 'Intensive' },
    { day: '12', mon: 'May', name: 'Dr. Sarah Chen', sub: 'Calculus', time: '5:00 PM', type: 'Standard' },
  ];
  return `
  <main class="dashboard-page">
    <div class="dashboard-header">
      <div class="container">
        <div class="dashboard-greeting">Good morning, ${u.name.split(' ')[0]} 👋</div>
        <p class="dashboard-subtitle">You have ${upcomingSessions.length} upcoming sessions this month.</p>
      </div>
    </div>
    <div class="container" style="padding-top:48px">
      <div class="dashboard-stats-row">
        ${[
          {icon:'📅',label:'Upcoming Sessions',val:upcomingSessions.length,cls:'blue',delta:'+1 this week',up:true},
          {icon:'⭐',label:'Avg Tutor Rating',val:'4.9',cls:'amber',delta:'Your tutors',up:true},
          {icon:'📈',label:'SAT Score Trend',val:'+140',cls:'green',delta:'pts improvement',up:true},
          {icon:'⏱️',label:'Hours Tutored',val:'24',cls:'teal',delta:'this semester',up:true},
        ].map(s => `
          <div class="stat-card">
            <div class="stat-card-icon ${s.cls}">${s.icon}</div>
            <div class="stat-card-value">${s.val}</div>
            <div class="stat-card-label">${s.label}</div>
            <div class="stat-card-delta ${s.up?'delta-up':'delta-down'}">${s.delta}</div>
          </div>`).join('')}
      </div>

      <div class="dashboard-grid">
        <div>
          <div class="panel" style="margin-bottom:24px">
            <div class="panel-header">
              <div class="panel-title">Upcoming Sessions</div>
              <button class="btn btn-ghost btn-sm" data-nav="search">+ Book New</button>
            </div>
            <div class="panel-body">
              ${upcomingSessions.map((s,i) => `
                <div class="session-item">
                  <div class="session-date-box">
                    <div class="session-date-day">${s.day}</div>
                    <div class="session-date-mon">${s.mon}</div>
                  </div>
                  <div class="session-info">
                    <div class="session-name">${s.name}</div>
                    <div class="session-meta">${s.sub} · ${s.time} · ${s.type} Session</div>
                  </div>
                  <div class="session-actions">
                    ${i===0 ? `<button class="btn btn-primary btn-sm" id="join-demo-dash">Join</button>` : ''}
                    <button class="btn btn-ghost btn-sm">Reschedule</button>
                  </div>
                </div>`).join('')}
            </div>
          </div>

          <div class="panel">
            <div class="panel-header">
              <div class="panel-title">My Tutors</div>
              <button class="btn btn-ghost btn-sm" data-nav="search">Find More</button>
            </div>
            <div class="panel-body">
              ${TUTORS.slice(0,3).map(t => `
                <div class="session-item">
                  <div class="profile-avatar-lg" style="width:44px;height:44px;font-size:1rem;flex-shrink:0">${t.initials}</div>
                  <div class="session-info">
                    <div class="session-name">${t.name}</div>
                    <div class="session-meta">${t.subjects[0]} · ${t.rating}★ · $${t.hourlyRate}/hr</div>
                  </div>
                  <div class="session-actions">
                    <button class="btn btn-outline btn-sm" data-tutor-id="${t.id}">Book</button>
                  </div>
                </div>`).join('')}
            </div>
          </div>
        </div>

        <div>
          <div class="panel" style="margin-bottom:24px">
            <div class="panel-header">
              <div class="panel-title">Score Progress</div>
            </div>
            <div class="panel-body">
              ${[
                {sub:'SAT Math',start:640,current:760,max:800},
                {sub:'SAT Reading',start:580,current:660,max:800},
                {sub:'Essay Score',start:16,current:21,max:24},
              ].map(p => {
                const pct = ((p.current - p.start) / (p.max - p.start)) * 100;
                const total_pct = (p.current / p.max) * 100;
                return `
                <div style="margin-bottom:20px">
                  <div style="display:flex;justify-content:space-between;margin-bottom:6px">
                    <span style="font-weight:600;font-size:.9375rem">${p.sub}</span>
                    <span style="font-weight:700;color:var(--primary-700)">${p.current}<span style="color:var(--gray-400);font-weight:400">/${p.max}</span></span>
                  </div>
                  <div style="height:8px;background:var(--gray-100);border-radius:999px;overflow:hidden">
                    <div style="height:100%;width:${total_pct}%;background:linear-gradient(90deg,var(--primary-600),var(--secondary-500));border-radius:999px"></div>
                  </div>
                  <div style="font-size:.75rem;color:var(--success);margin-top:4px">+${p.current-p.start} points since start</div>
                </div>`;
              }).join('')}
            </div>
          </div>

          <div class="panel">
            <div class="panel-header">
              <div class="panel-title">Recommended Tutors</div>
            </div>
            <div class="panel-body">
              ${TUTORS.slice(3,5).map(t => `
                <div class="session-item">
                  <div class="profile-avatar-lg" style="width:40px;height:40px;font-size:.875rem;flex-shrink:0">${t.initials}</div>
                  <div class="session-info">
                    <div class="session-name">${t.name}</div>
                    <div class="session-meta">${t.subjects[0]} · ${t.rating}★</div>
                  </div>
                  <button class="btn btn-primary btn-sm" data-tutor-id="${t.id}">View</button>
                </div>`).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>
    ${renderFooter()}
  </main>`;
}

function renderTutorDashboard(u) {
  const earnings = [
    { day: '29', mon: 'Apr', name: 'Emily R.', sub: 'SAT Math', time: '4:00 PM', earned: 85 },
    { day: '30', mon: 'Apr', name: 'Michael T.', sub: 'Calculus', time: '2:00 PM', earned: 85 },
    { day: '02', mon: 'May', name: 'Sophie L.', sub: 'Statistics', time: '11:00 AM', earned: 153 },
  ];
  const timeLabels = ['9am','11am','1pm','3pm','5pm','7pm'];

  return `
  <main class="dashboard-page">
    <div class="dashboard-header">
      <div class="container">
        <div style="display:flex;align-items:center;justify-content:space-between">
          <div>
            <div class="dashboard-greeting">Welcome back, ${u.name.split(' ')[0]}</div>
            <p class="dashboard-subtitle">You have 3 sessions scheduled this week.</p>
          </div>
          <div class="view-toggle">
            <button class="view-toggle-btn active">Schedule</button>
            <button class="view-toggle-btn">Earnings</button>
            <button class="view-toggle-btn">Students</button>
          </div>
        </div>
      </div>
    </div>
    <div class="container" style="padding-top:48px">
      <div class="dashboard-stats-row">
        ${[
          {icon:'💰',label:'Monthly Earnings',val:'$1,840',cls:'green',delta:'+$240 vs last month',up:true},
          {icon:'📅',label:'Sessions This Month',val:'22',cls:'blue',delta:'+3 vs last month',up:true},
          {icon:'⭐',label:'Your Rating',val:'4.9',cls:'amber',delta:'142 reviews',up:true},
          {icon:'👥',label:'Active Students',val:'14',cls:'teal',delta:'3 new this week',up:true},
        ].map(s => `
          <div class="stat-card">
            <div class="stat-card-icon ${s.cls}">${s.icon}</div>
            <div class="stat-card-value">${s.val}</div>
            <div class="stat-card-label">${s.label}</div>
            <div class="stat-card-delta delta-up">${s.delta}</div>
          </div>`).join('')}
      </div>

      <div class="dashboard-grid">
        <div>
          <div class="panel" style="margin-bottom:24px">
            <div class="panel-header">
              <div class="panel-title">Upcoming Sessions</div>
              <span class="badge badge-success">3 this week</span>
            </div>
            <div class="panel-body">
              ${earnings.map((s,i) => `
                <div class="session-item">
                  <div class="session-date-box">
                    <div class="session-date-day">${s.day}</div>
                    <div class="session-date-mon">${s.mon}</div>
                  </div>
                  <div class="session-info">
                    <div class="session-name">${s.name}</div>
                    <div class="session-meta">${s.sub} · ${s.time}</div>
                  </div>
                  <div class="session-actions">
                    <span style="font-weight:700;color:var(--success)">+$${s.earned}</span>
                    ${i===0?`<button class="btn btn-primary btn-sm" id="join-demo-dash">Start</button>`:''}
                  </div>
                </div>`).join('')}
            </div>
          </div>

          <div class="panel">
            <div class="panel-header">
              <div class="panel-title">Weekly Schedule</div>
              <button class="btn btn-ghost btn-sm" id="edit-schedule-btn">Edit</button>
            </div>
            <div class="panel-body">
              <div class="schedule-grid">
                ${DAYS.map(day => {
                  const slots = timeLabels.map((t,i) => {
                    const isOn = Math.random() > 0.4;
                    const isBooked = isOn && Math.random() > 0.6;
                    return `<div class="sched-slot ${isBooked?'booked':isOn?'on':''}">${t}</div>`;
                  }).join('');
                  return `<div class="sched-day"><div class="sched-day-label">${day}</div>${slots}</div>`;
                }).join('')}
              </div>
              <p class="text-sm text-muted" style="margin-top:12px">
                <span style="display:inline-block;width:12px;height:12px;background:var(--secondary-600);border-radius:3px;margin-right:4px"></span>Available
                <span style="display:inline-block;width:12px;height:12px;background:var(--primary-100);border:1px solid var(--primary-200);border-radius:3px;margin:0 4px 0 12px"></span>Booked
              </p>
            </div>
          </div>
        </div>

        <div>
          <div class="panel" style="margin-bottom:24px">
            <div class="panel-header"><div class="panel-title">Student Progress</div></div>
            <div class="panel-body">
              ${[
                {name:'Emily R.',sub:'SAT Math',sessions:8,progress:78},
                {name:'Michael T.',sub:'Calculus',sessions:5,progress:55},
                {name:'Sophie L.',sub:'Statistics',sessions:3,progress:35},
              ].map(s => `
                <div style="margin-bottom:16px">
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
                    <div>
                      <div style="font-weight:600;font-size:.9375rem">${s.name}</div>
                      <div style="font-size:.8125rem;color:var(--gray-500)">${s.sub} · ${s.sessions} sessions</div>
                    </div>
                    <span style="font-weight:700;font-size:.9375rem;color:var(--primary-700)">${s.progress}%</span>
                  </div>
                  <div style="height:6px;background:var(--gray-100);border-radius:999px;overflow:hidden">
                    <div style="height:100%;width:${s.progress}%;background:linear-gradient(90deg,var(--primary-500),var(--secondary-500));border-radius:999px"></div>
                  </div>
                </div>`).join('')}
            </div>
          </div>

          <div class="panel">
            <div class="panel-header"><div class="panel-title">Rate &amp; Session Settings</div></div>
            <div class="panel-body">
              <div style="display:flex;flex-direction:column;gap:16px">
                ${SESSION_TYPES.map(st => {
                  const price = Math.round(85 * st.multiplier);
                  return `
                  <div style="display:flex;align-items:center;justify-content:space-between;padding:12px;background:var(--gray-50);border-radius:var(--radius-md)">
                    <div>
                      <div style="font-weight:600">${st.icon} ${st.name}</div>
                      <div class="text-sm text-muted">${st.duration}</div>
                    </div>
                    <div style="font-weight:700;font-size:1.125rem;color:var(--gray-900)">$${price}</div>
                  </div>`;
                }).join('')}
                <button class="btn btn-outline" style="width:100%;justify-content:center">Edit Rates</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    ${renderFooter()}
  </main>`;
}

// ── Video Session ─────────────────────────────────────────────
function renderVideoSession() {
  const t = state.selectedTutor || TUTORS[0];
  const u = state.currentUser;
  const timeStr = formatTime(state.videoSeconds);

  const chatHTML = state.chatMessages.map(m => `
    <div class="chat-msg ${m.from==='student'?'own':'other'}">
      <div class="chat-sender">${m.name}</div>
      <div class="chat-bubble">${m.text}</div>
    </div>`).join('');

  return `
  <div class="video-page">
    <div class="video-header">
      <div class="video-session-info">
        <div class="logo" style="color:#fff;cursor:default">
          <div class="logo-icon">✦</div>
          <span>EduConnect</span>
        </div>
        <div class="live-badge"><div class="live-dot"></div>LIVE</div>
        <div class="video-title">${t.subjects[0]} Session with ${t.name.split(' ')[0]}</div>
      </div>
      <div style="display:flex;align-items:center;gap:16px">
        <div class="video-timer" id="video-timer">⏱ ${timeStr}</div>
        <button class="btn btn-danger btn-sm" id="end-session-btn">End Session</button>
      </div>
    </div>

    <div class="video-main">
      <div class="video-primary">
        <div class="video-feed-main">
          <div style="text-align:center">
            <div class="video-avatar-large">${t.initials}</div>
          </div>
          <div class="video-name-tag">${t.name} · Tutor</div>
          <div class="video-self">
            <span style="font-size:1.5rem">${u ? u.initials : 'ME'}</span>
          </div>
        </div>
      </div>

      <div class="video-sidebar">
        <div class="sidebar-tabs">
          <div class="sidebar-tab ${state.videoTab==='chat'?'active':''}" data-video-tab="chat">Chat</div>
          <div class="sidebar-tab ${state.videoTab==='notes'?'active':''}" data-video-tab="notes">Notes</div>
        </div>
        ${state.videoTab === 'chat' ? `
          <div class="chat-messages" id="chat-messages">${chatHTML}</div>
          <div class="chat-input-row">
            <input class="chat-input" id="chat-msg-input" placeholder="Type a message..." />
            <button class="chat-send" id="chat-send-btn">➤</button>
          </div>
        ` : `
          <textarea class="notes-area" id="notes-area" placeholder="Take session notes here...&#10;&#10;• Key concepts covered&#10;• Practice problems&#10;• Next steps"></textarea>
        `}
      </div>
    </div>

    <div class="video-controls">
      <button class="control-btn ${state.micMuted?'muted':''}" id="toggle-mic" title="${state.micMuted?'Unmute':'Mute'}">
        ${state.micMuted ? '🔇' : '🎤'}
      </button>
      <button class="control-btn ${state.camOff?'muted':''}" id="toggle-cam" title="${state.camOff?'Turn on camera':'Turn off camera'}">
        ${state.camOff ? '📵' : '📷'}
      </button>
      <button class="control-btn" title="Screen Share">🖥️</button>
      <button class="control-btn" title="Whiteboard">✏️</button>
      <button class="control-btn end" id="end-session-ctrl" title="End Session">📵</button>
      <button class="control-btn" title="More Options">⋯</button>
    </div>
  </div>`;
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2,'0');
  const s = (seconds % 60).toString().padStart(2,'0');
  return `${m}:${s}`;
}

// ── Footer ────────────────────────────────────────────────────
function renderFooter() {
  return `
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="logo" style="cursor:default;color:#fff">
            <div class="logo-icon">✦</div>
            <span class="logo-text">EduConnect</span>
          </div>
          <p>Connecting students with expert tutors for personalized, online learning. Your academic success starts here.</p>
        </div>
        <div>
          <div class="footer-col-title">Students</div>
          <div class="footer-links">
            <span class="footer-link" data-nav="search">Find Tutors</span>
            <span class="footer-link" data-nav="home">How It Works</span>
            <span class="footer-link">SAT Prep</span>
            <span class="footer-link">College Essay Help</span>
          </div>
        </div>
        <div>
          <div class="footer-col-title">Tutors</div>
          <div class="footer-links">
            <span class="footer-link">Become a Tutor</span>
            <span class="footer-link">Tutor Dashboard</span>
            <span class="footer-link">Set Your Rates</span>
            <span class="footer-link">Community</span>
          </div>
        </div>
        <div>
          <div class="footer-col-title">Company</div>
          <div class="footer-links">
            <span class="footer-link">About Us</span>
            <span class="footer-link">Blog</span>
            <span class="footer-link">Careers</span>
            <span class="footer-link">Contact</span>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 EduConnect. All rights reserved.</span>
        <span>Privacy Policy · Terms of Service</span>
      </div>
    </div>
  </footer>`;
}

// ── Auth Modal ────────────────────────────────────────────────
function renderModalIfOpen() {
  if (!state.authModal) return '';
  const isLogin = state.authModal === 'login';
  return `
  <div class="modal-overlay" id="modal-overlay">
    <div class="modal-box">
      <div class="modal-header">
        <div class="modal-title">Welcome to EduConnect</div>
        <button class="modal-close" id="modal-close-btn">✕</button>
      </div>
      <div class="modal-body">
        <div class="auth-tabs">
          <div class="auth-tab ${isLogin?'active':''}" data-auth-tab="login">Sign In</div>
          <div class="auth-tab ${!isLogin?'active':''}" data-auth-tab="signup">Create Account</div>
        </div>
        ${!isLogin ? `
          <div class="role-select">
            <div class="role-option ${state.authRole==='student'?'selected':''}" data-role="student">
              <div class="role-icon">🎓</div>
              <div class="role-name">Student</div>
              <div class="role-desc">Find tutors &amp; book sessions</div>
            </div>
            <div class="role-option ${state.authRole==='tutor'?'selected':''}" data-role="tutor">
              <div class="role-icon">👨‍🏫</div>
              <div class="role-name">Tutor</div>
              <div class="role-desc">Teach &amp; earn on your schedule</div>
            </div>
          </div>
        ` : ''}
        <div class="form-group">
          <label class="form-label">Email Address</label>
          <input class="form-input" type="email" placeholder="you@example.com" id="auth-email" />
        </div>
        <div class="form-group">
          <label class="form-label">Password</label>
          <input class="form-input" type="password" placeholder="••••••••" id="auth-password" />
        </div>
        ${isLogin ? `<div style="text-align:right;margin-bottom:16px"><a href="#" style="font-size:.875rem;color:var(--primary-700)">Forgot password?</a></div>` : ''}
      </div>
      <div class="modal-footer">
        <button class="btn btn-ghost" id="modal-cancel-btn">Cancel</button>
        <button class="btn btn-primary" id="modal-submit-btn">${isLogin ? 'Sign In' : 'Create Account'}</button>
      </div>
    </div>
  </div>`;
}

// ── Event binding ─────────────────────────────────────────────
function bindGlobalEvents() {
  // Navigation via data-nav
  document.querySelectorAll('[data-nav]').forEach(el => {
    el.addEventListener('click', () => navigate(el.dataset.nav));
  });

  // Tutor cards
  document.querySelectorAll('[data-tutor-id]').forEach(el => {
    el.addEventListener('click', () => {
      const id = parseInt(el.dataset.tutorId);
      const tutor = TUTORS.find(t => t.id === id);
      if (tutor) navigate('tutor', { tutor });
    });
  });

  // Subject chips (home)
  document.querySelectorAll('[data-subject]').forEach(el => {
    el.addEventListener('click', () => {
      state.filters.subject = el.dataset.subject;
      navigate('search');
    });
  });

  // Hero search
  const heroBtn = document.getElementById('hero-search-btn');
  if (heroBtn) {
    heroBtn.addEventListener('click', () => {
      const q = document.getElementById('hero-search-input')?.value || '';
      const sub = document.getElementById('hero-search-subject')?.value || 'all';
      state.filters.search = q;
      state.filters.subject = sub;
      navigate('search');
    });
    document.getElementById('hero-search-input')?.addEventListener('keydown', e => {
      if (e.key === 'Enter') heroBtn.click();
    });
  }

  // Auth modal open
  document.getElementById('btn-login')?.addEventListener('click', () => { state.authModal = 'login'; render(); });
  document.getElementById('btn-signup')?.addEventListener('click', () => { state.authModal = 'signup'; render(); });
  document.getElementById('btn-tutor-join')?.addEventListener('click', () => { state.authRole = 'tutor'; state.authModal = 'signup'; render(); });

  // Auth modal interactions
  document.getElementById('modal-close-btn')?.addEventListener('click', () => { state.authModal = null; render(); });
  document.getElementById('modal-cancel-btn')?.addEventListener('click', () => { state.authModal = null; render(); });
  document.getElementById('modal-overlay')?.addEventListener('click', e => { if (e.target.id === 'modal-overlay') { state.authModal = null; render(); } });

  document.querySelectorAll('[data-auth-tab]').forEach(el => {
    el.addEventListener('click', () => { state.authModal = el.dataset.authTab; render(); });
  });

  document.querySelectorAll('[data-role]').forEach(el => {
    el.addEventListener('click', () => { state.authRole = el.dataset.role; render(); });
  });

  document.getElementById('modal-submit-btn')?.addEventListener('click', () => {
    const email = document.getElementById('auth-email')?.value || '';
    const password = document.getElementById('auth-password')?.value || '';
    if (!email || !password) { showToast('Please fill in all fields', 'error'); return; }

    const name = state.authModal === 'signup'
      ? (state.authRole === 'tutor' ? 'Dr. Alex Smith' : 'Alex Johnson')
      : 'Alex Johnson';
    const role = state.authModal === 'signup' ? state.authRole : 'student';
    const initials = name.split(' ').map(n => n[0]).slice(0,2).join('');

    state.currentUser = { name, initials, role, email };
    state.authModal = null;
    render();
    showToast(`Welcome${state.authModal !== 'login' ? ', ' + name.split(' ')[0] : ' back'}! You're signed in.`, 'success');
  });

  // Search filters
  document.querySelectorAll('input[name="subject"]').forEach(el => {
    el.addEventListener('change', () => { state.filters.subject = el.value; navigate('search'); });
  });

  document.querySelectorAll('input[name="minrating"]').forEach(el => {
    el.addEventListener('change', () => { state.filters.minRating = parseFloat(el.value); navigate('search'); });
  });

  const rateSlider = document.getElementById('rate-slider');
  if (rateSlider) {
    rateSlider.addEventListener('input', () => {
      state.filters.maxRate = parseInt(rateSlider.value);
      const disp = document.getElementById('rate-display');
      if (disp) disp.textContent = `Up to $${state.filters.maxRate}/hr`;
    });
    rateSlider.addEventListener('change', () => navigate('search'));
  }

  const sortSel = document.getElementById('sort-select');
  if (sortSel) sortSel.addEventListener('change', () => { state.filters.sort = sortSel.value; navigate('search'); });

  document.getElementById('clear-filters')?.addEventListener('click', () => {
    state.filters = { subject:'all', maxRate:120, minRating:0, sort:'rating', search:'' };
    navigate('search');
  });

  // Profile page
  document.getElementById('book-now-btn')?.addEventListener('click', () => {
    navigate('booking', { resetBooking: true });
  });
  document.getElementById('proceed-book-btn')?.addEventListener('click', () => {
    navigate('booking', { resetBooking: true });
  });

  // Availability slots on profile
  document.querySelectorAll('.time-slot.available').forEach(el => {
    el.addEventListener('click', () => navigate('booking', { resetBooking: true }));
  });

  // Session type options on profile sidebar
  document.querySelectorAll('[data-st]').forEach(el => {
    el.addEventListener('click', () => {
      document.querySelectorAll('[data-st]').forEach(e => e.classList.remove('selected'));
      el.classList.add('selected');
    });
  });

  // Booking: step 1 – session type
  document.querySelectorAll('[data-session-type]').forEach(el => {
    el.addEventListener('click', () => {
      state.booking.sessionType = el.dataset.sessionType;
      document.querySelectorAll('[data-session-type]').forEach(e => e.classList.remove('selected'));
      el.classList.add('selected');
      const btn = document.getElementById('step-next-1');
      if (btn) btn.removeAttribute('disabled');
    });
  });

  document.getElementById('step-next-1')?.addEventListener('click', () => {
    if (!state.booking.sessionType) return;
    state.bookingStep = 2;
    render();
  });

  // Booking: step 2 – date/time
  document.querySelectorAll('[data-date]').forEach(el => {
    el.addEventListener('click', () => {
      state.booking.date = el.dataset.date;
      document.querySelectorAll('[data-date]').forEach(e => e.classList.remove('selected'));
      el.classList.add('selected');
      checkStep2();
    });
  });

  document.querySelectorAll('.time-btn:not(.unavailable)').forEach(el => {
    el.addEventListener('click', () => {
      state.booking.time = el.dataset.time;
      document.querySelectorAll('.time-btn').forEach(e => e.classList.remove('selected'));
      el.classList.add('selected');
      checkStep2();
    });
  });

  function checkStep2() {
    const btn = document.getElementById('step-next-2');
    if (btn && state.booking.date && state.booking.time) btn.removeAttribute('disabled');
  }

  document.getElementById('step-next-2')?.addEventListener('click', () => {
    if (!state.booking.date || !state.booking.time) return;
    state.bookingStep = 3;
    render();
  });
  document.getElementById('step-back-2')?.addEventListener('click', () => { state.bookingStep = 1; render(); });

  // Booking: step 3 – payment
  document.getElementById('card-num')?.addEventListener('input', e => {
    let v = e.target.value.replace(/\D/g,'').slice(0,16);
    v = v.replace(/(.{4})/g,'$1 ').trim();
    e.target.value = v;
    state.booking.cardNum = v;
  });
  document.getElementById('card-exp')?.addEventListener('input', e => {
    let v = e.target.value.replace(/\D/g,'').slice(0,4);
    if (v.length >= 2) v = v.slice(0,2) + ' / ' + v.slice(2);
    e.target.value = v;
    state.booking.cardExp = v;
  });
  document.getElementById('card-name')?.addEventListener('input', e => state.booking.cardName = e.target.value);
  document.getElementById('card-cvc')?.addEventListener('input',  e => state.booking.cardCvc  = e.target.value);

  document.getElementById('step-next-3')?.addEventListener('click', () => {
    const name = document.getElementById('card-name')?.value;
    const num  = document.getElementById('card-num')?.value;
    const exp  = document.getElementById('card-exp')?.value;
    const cvc  = document.getElementById('card-cvc')?.value;
    if (!name || num?.replace(/\s/g,'').length < 16 || !exp || !cvc) {
      showToast('Please fill in all payment fields', 'error');
      return;
    }
    state.bookingStep = 4;
    render();
    showToast('Payment confirmed! Booking your session...', 'success');
  });
  document.getElementById('step-back-3')?.addEventListener('click', () => { state.bookingStep = 2; render(); });

  // Booking: step 4 – confirmation
  document.getElementById('join-session-btn')?.addEventListener('click', () => {
    navigate('video');
  });

  document.getElementById('booking-back-nav')?.addEventListener('click', () => {
    if (state.bookingStep > 1) { state.bookingStep--; render(); }
    else navigate('tutor');
  });

  // Dashboard actions
  document.getElementById('join-demo-dash')?.addEventListener('click', () => navigate('video'));

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });
}

function bindVideoEvents() {
  document.getElementById('toggle-mic')?.addEventListener('click', () => {
    state.micMuted = !state.micMuted;
    render();
  });

  document.getElementById('toggle-cam')?.addEventListener('click', () => {
    state.camOff = !state.camOff;
    render();
  });

  document.querySelectorAll('[data-video-tab]').forEach(el => {
    el.addEventListener('click', () => { state.videoTab = el.dataset.videoTab; render(); });
  });

  const sendBtn = document.getElementById('chat-send-btn');
  const chatInput = document.getElementById('chat-msg-input');

  function sendMsg() {
    const text = chatInput?.value.trim();
    if (!text) return;
    state.chatMessages.push({ from: 'student', name: 'You', text });
    chatInput.value = '';
    render();
    const msgs = document.getElementById('chat-messages');
    if (msgs) msgs.scrollTop = msgs.scrollHeight;

    // Simulated tutor reply
    setTimeout(() => {
      const replies = [
        'Great question! Let me explain that further.',
        'Exactly right! Now let\'s try a harder version.',
        'Let\'s work through that step by step.',
        'Remember the formula we covered last session?',
      ];
      state.chatMessages.push({
        from: 'tutor',
        name: state.selectedTutor?.name || 'Tutor',
        text: replies[Math.floor(Math.random() * replies.length)],
      });
      render();
      const m = document.getElementById('chat-messages');
      if (m) m.scrollTop = m.scrollHeight;
    }, 1200);
  }

  sendBtn?.addEventListener('click', sendMsg);
  chatInput?.addEventListener('keydown', e => { if (e.key === 'Enter') sendMsg(); });

  const endBtns = [document.getElementById('end-session-btn'), document.getElementById('end-session-ctrl')];
  endBtns.forEach(btn => btn?.addEventListener('click', () => {
    clearInterval(state._videoTimer);
    navigate(state.currentUser ? 'dashboard' : 'home');
    showToast('Session ended. Notes saved to your dashboard.', 'info');
  }));

  // Timer
  clearInterval(state._videoTimer);
  state._videoTimer = setInterval(() => {
    state.videoSeconds++;
    const el = document.getElementById('video-timer');
    if (el) el.textContent = `⏱ ${formatTime(state.videoSeconds)}`;
  }, 1000);
}

// ── Scroll reveal ─────────────────────────────────────────────
function initRevealAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ── Toast ─────────────────────────────────────────────────────
function showToast(msg, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const icons = { success: '✓', error: '✕', info: 'ℹ' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${icons[type]}</span><span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

// ── Boot ──────────────────────────────────────────────────────
render();
