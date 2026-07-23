import './style.css'

// ─── Data ──────────────────────────────────────────────────────────────────
const PHOTOS = [
  {
    id: 1, title: 'Golden Hour Solitude', author: 'Marina Chen', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=60&h=60&fit=crop',
    type: 'pro', img: 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?w=600&h=800&fit=crop',
    tags: ['landscape', 'golden-hour'], likes: 284, comments: 31, featured: true
  },
  {
    id: 2, title: 'Urban Geometry', author: 'Jake Williams', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=60&h=60&fit=crop',
    type: 'hobby', img: 'https://images.pexels.com/photos/1486222/pexels-photo-1486222.jpeg?w=600&h=500&fit=crop',
    tags: ['architecture', 'urban'], likes: 142, comments: 17
  },
  {
    id: 3, title: 'Quiet Sunday', author: 'Priya Nair', avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?w=60&h=60&fit=crop',
    type: 'pro', img: 'https://images.pexels.com/photos/3076899/pexels-photo-3076899.jpeg?w=600&h=700&fit=crop',
    tags: ['portrait', 'natural-light'], likes: 315, comments: 44
  },
  {
    id: 4, title: 'Storm Front', author: 'Lucas Müller', avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?w=60&h=60&fit=crop',
    type: 'hobby', img: 'https://images.pexels.com/photos/1431822/pexels-photo-1431822.jpeg?w=600&h=600&fit=crop',
    tags: ['weather', 'dramatic'], likes: 198, comments: 22, featured: true
  },
  {
    id: 5, title: 'Forest Path', author: 'Aiko Tanaka', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=60&h=60&fit=crop',
    type: 'pro', img: 'https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?w=600&h=900&fit=crop',
    tags: ['nature', 'forest'], likes: 267, comments: 38
  },
  {
    id: 6, title: 'City at Dusk', author: 'Chris Okafor', avatar: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?w=60&h=60&fit=crop',
    type: 'hobby', img: 'https://images.pexels.com/photos/2079246/pexels-photo-2079246.jpeg?w=600&h=500&fit=crop',
    tags: ['cityscape', 'night'], likes: 176, comments: 19
  },
]

const PHOTOGRAPHERS = [
  {
    id: 1, name: 'Marina Chen', specialty: 'Portraits & Weddings', location: 'San Francisco, CA',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=96&h=96&fit=crop',
    cover: 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?w=600&h=240&fit=crop',
    followers: '2.4k', photos: 186, rating: '4.9', price: 280, available: true, pro: true,
    samples: [
      'https://images.pexels.com/photos/3764593/pexels-photo-3764593.jpeg?w=120&h=120&fit=crop',
      'https://images.pexels.com/photos/3764545/pexels-photo-3764545.jpeg?w=120&h=120&fit=crop',
      'https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg?w=120&h=120&fit=crop',
    ]
  },
  {
    id: 2, name: 'James Whitfield', specialty: 'Commercial & Brands', location: 'New York, NY',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?w=96&h=96&fit=crop',
    cover: 'https://images.pexels.com/photos/1260310/pexels-photo-1260310.jpeg?w=600&h=240&fit=crop',
    followers: '5.1k', photos: 312, rating: '5.0', price: 450, available: true, pro: true,
    samples: [
      'https://images.pexels.com/photos/2897462/pexels-photo-2897462.jpeg?w=120&h=120&fit=crop',
      'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?w=120&h=120&fit=crop',
      'https://images.pexels.com/photos/3631430/pexels-photo-3631430.jpeg?w=120&h=120&fit=crop',
    ]
  },
  {
    id: 3, name: 'Priya Nair', specialty: 'Events & Lifestyle', location: 'Chicago, IL',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?w=96&h=96&fit=crop',
    cover: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?w=600&h=240&fit=crop',
    followers: '1.8k', photos: 241, rating: '4.8', price: 200, available: false, pro: true,
    samples: [
      'https://images.pexels.com/photos/3811082/pexels-photo-3811082.jpeg?w=120&h=120&fit=crop',
      'https://images.pexels.com/photos/3762872/pexels-photo-3762872.jpeg?w=120&h=120&fit=crop',
      'https://images.pexels.com/photos/3992207/pexels-photo-3992207.jpeg?w=120&h=120&fit=crop',
    ]
  },
  {
    id: 4, name: 'Aiko Tanaka', specialty: 'Nature & Wildlife', location: 'Seattle, WA',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=96&h=96&fit=crop',
    cover: 'https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?w=600&h=240&fit=crop',
    followers: '3.2k', photos: 408, rating: '4.9', price: 320, available: true, pro: true,
    samples: [
      'https://images.pexels.com/photos/1122348/pexels-photo-1122348.jpeg?w=120&h=120&fit=crop',
      'https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?w=120&h=120&fit=crop',
      'https://images.pexels.com/photos/2295196/pexels-photo-2295196.jpeg?w=120&h=120&fit=crop',
    ]
  },
]

const PULSE_EVENTS = [
  { type: 'critique', icon: '💬', text: '<strong>Sarah K.</strong> left a detailed composition critique on <strong>"Golden Hour Solitude"</strong>', time: '2 min ago' },
  { type: 'upload', icon: '📸', text: '<strong>Lucas M.</strong> uploaded 4 new photos to <strong>"Storm Series"</strong>', time: '8 min ago' },
  { type: 'hire', icon: '✅', text: '<strong>Meridian Brands</strong> booked <strong>James Whitfield</strong> for a product shoot', time: '15 min ago' },
  { type: 'win', icon: '🏆', text: '<strong>Aiko Tanaka</strong> won this week\'s <strong>"Golden Light"</strong> challenge', time: '1 hr ago' },
  { type: 'follow', icon: '👥', text: '<strong>Chris O.</strong> started following <strong>Marina Chen</strong>', time: '1 hr ago' },
  { type: 'critique', icon: '💬', text: '<strong>Priya N.</strong> received 5 new critiques with an avg. score of <strong>8.4/10</strong>', time: '2 hr ago' },
]

const TRENDING_TAGS = [
  { tag: '#GoldenHour', count: '1.2k photos' },
  { tag: '#StreetPortrait', count: '876 photos' },
  { tag: '#LongExposure', count: '643 photos' },
  { tag: '#MinimalAesthetic', count: '524 photos' },
  { tag: '#FilmSimulation', count: '398 photos' },
]

const LEADERBOARD = [
  { name: 'Aiko Tanaka', pts: '2,840 pts', rank: 1 },
  { name: 'Marina Chen', pts: '2,610 pts', rank: 2 },
  { name: 'James Whitfield', pts: '2,195 pts', rank: 3 },
  { name: 'Priya Nair', pts: '1,980 pts', rank: 4 },
  { name: 'Lucas Müller', pts: '1,752 pts', rank: 5 },
]

const TESTIMONIALS = [
  {
    text: '"PhotoCommunity changed how I approach my craft. The feedback here is genuinely thoughtful — people push you to see differently, not just tell you what looks nice."',
    name: 'Elena Vasquez', role: 'Portrait Photographer, Austin TX',
    avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?w=60&h=60&fit=crop', stars: 5
  },
  {
    text: '"I landed three clients in my first month just from my portfolio here. The hire feature is seamless and the community helped me improve my work before any client even saw it."',
    name: 'Daniel Park', role: 'Commercial Photographer, LA',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?w=60&h=60&fit=crop', stars: 5
  },
  {
    text: '"Weekly challenges keep me shooting even on busy weeks. I\'ve shot things I never would have otherwise — and the community votes actually teach you what resonates."',
    name: 'Nadia Osei', role: 'Hobbyist, Toronto CA',
    avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?w=60&h=60&fit=crop', stars: 5
  },
]

// ─── State ─────────────────────────────────────────────────────────────────
const state = {
  activeFilter: 'all',
  likedPhotos: new Set(),
  followedPhotographers: new Set(),
  modalOpen: false,
  activeTab: 'login',
  selectedCatBtn: 'composition',
  timerInterval: null,
  challengeEnd: Date.now() + (3 * 24 * 60 * 60 * 1000) + (7 * 60 * 60 * 1000),
}

// ─── Render ─────────────────────────────────────────────────────────────────
function render() {
  document.getElementById('app').innerHTML = buildPage()
}

function buildPage() {
  return `
    ${buildNav()}
    <main>
      ${buildHero()}
      ${buildHowItWorks()}
      ${buildChallenge()}
      ${buildFeed()}
      ${buildCritique()}
      ${buildPhotographers()}
      ${buildPulse()}
      ${buildHire()}
      ${buildTestimonials()}
      ${buildCTA()}
    </main>
    ${buildFooter()}
    ${buildModal()}
    <div class="toast-container" id="toastContainer"></div>
  `
}

function buildNav() {
  return `
    <nav class="nav" id="mainNav">
      <div class="container">
        <div class="nav-inner">
          <a href="#" class="nav-logo">
            <span class="nav-logo-dot"></span>
            PhotoCommunity
          </a>
          <ul class="nav-links">
            <li><a href="#feed">Explore</a></li>
            <li><a href="#challenge">Challenges</a></li>
            <li><a href="#critique">Critique</a></li>
            <li><a href="#hire">Hire</a></li>
            <li><a href="#pulse">Community</a></li>
          </ul>
          <div class="nav-actions">
            <button class="btn-nav-login" id="btnLogin">Log In</button>
            <button class="btn-nav-join" id="btnJoin">Join Free</button>
          </div>
          <button class="nav-mobile-toggle" id="navToggle" aria-label="Menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </nav>
  `
}

function buildHero() {
  return `
    <section class="hero" id="top">
      <div class="hero-bg">
        <img src="https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?w=1600&h=900&fit=crop" alt="Hero photography" />
        <div class="hero-overlay"></div>
      </div>
      <div class="container">
        <div class="hero-content">
          <div class="hero-eyebrow">
            <span class="hero-eyebrow-dot"></span>
            Community of 28,000+ photographers
          </div>
          <h1 class="hero-title">
            Where your lens meets<br><em>its community</em>
          </h1>
          <p class="hero-sub">
            Share your work, earn real critiques, conquer weekly challenges, and connect with clients who value your vision. PhotoCommunity is where photographers grow.
          </p>
          <div class="hero-cta">
            <button class="btn-primary" id="heroCTA">Start Sharing Free</button>
            <button class="btn-ghost" id="heroExplore">Explore the community</button>
          </div>
          <div class="hero-stats">
            <div class="hero-stat">
              <div class="hero-stat-num">28K+</div>
              <div class="hero-stat-label">Active members</div>
            </div>
            <div class="hero-stat">
              <div class="hero-stat-num">140K</div>
              <div class="hero-stat-label">Photos shared</div>
            </div>
            <div class="hero-stat">
              <div class="hero-stat-num">$2.1M</div>
              <div class="hero-stat-label">Earned by pros</div>
            </div>
          </div>
        </div>
      </div>
      <div class="hero-scroll">
        <div class="hero-scroll-arrow"></div>
      </div>
    </section>
  `
}

function buildHowItWorks() {
  const steps = [
    { icon: '📸', step: 'Step 1', title: 'Upload your work', desc: 'Build a beautiful portfolio. Tag by genre, add context, and let your photos speak. Albums, series, and singles all welcome.' },
    { icon: '💬', step: 'Step 2', title: 'Give & receive critiques', desc: 'Structured feedback across composition, lighting, post-processing, and concept. Earn reputation by giving quality critiques.' },
    { icon: '🏆', step: 'Step 3', title: 'Join weekly challenges', desc: 'A new theme every Monday. Community votes decide the winners. Great work gets featured on the homepage.' },
    { icon: '💼', step: 'Step 4', title: 'Connect with clients', desc: 'List your services, set your rates, and get discovered by clients searching for photographers in your area.' },
  ]
  return `
    <section class="section" id="how">
      <div class="container">
        <div class="section-header fade-in">
          <span class="section-eyebrow">How It Works</span>
          <h2 class="section-title">Four ways to make the most of it</h2>
          <p class="section-sub">From casual hobbyist to booked professional — the platform grows with you.</p>
        </div>
        <div class="how-grid">
          ${steps.map(s => `
            <div class="how-card fade-in">
              <div class="how-icon">${s.icon}</div>
              <div class="how-step">${s.step}</div>
              <h3 class="how-title">${s.title}</h3>
              <p class="how-desc">${s.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `
}

function buildChallenge() {
  return `
    <section class="section section-alt" id="challenge">
      <div class="container">
        <div class="challenge-wrap">
          <div class="fade-in">
            <div class="challenge-badge"><span class="challenge-badge-dot"></span>Live this week</div>
            <h2 class="challenge-title">Weekly Challenge:<br>Golden Light</h2>
            <p class="challenge-desc">
              Capture the warmth of the last hour before sunset — or the first after sunrise. Show us how golden light transforms the ordinary into the extraordinary.
            </p>
            <div class="challenge-meta">
              <div class="challenge-meta-item">
                <span class="challenge-meta-num">847</span>
                <span class="challenge-meta-label">entries</span>
              </div>
              <div class="challenge-meta-item">
                <span class="challenge-meta-num">14.2K</span>
                <span class="challenge-meta-label">votes cast</span>
              </div>
              <div class="challenge-meta-item">
                <span class="challenge-meta-num">$500</span>
                <span class="challenge-meta-label">prize pool</span>
              </div>
            </div>
            <div class="challenge-timer">
              <span class="challenge-timer-icon">⏱</span>
              <span class="challenge-timer-label">Ends in</span>
              <span class="challenge-timer-value" id="challengeTimer">—</span>
            </div>
            <div class="challenge-actions">
              <button class="btn-secondary" id="btnEnter">Enter this challenge</button>
              <button class="btn-outline" id="btnVote">Browse & vote</button>
            </div>
          </div>
          <div class="challenge-gallery fade-in">
            ${[
              { img: 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?w=400&h=600&fit=crop', author: 'Marina Chen', votes: 412 },
              { img: 'https://images.pexels.com/photos/1559699/pexels-photo-1559699.jpeg?w=400&h=300&fit=crop', author: 'Jake Williams', votes: 287 },
              { img: 'https://images.pexels.com/photos/1252983/pexels-photo-1252983.jpeg?w=400&h=300&fit=crop', author: 'Aiko Tanaka', votes: 203 },
            ].map(p => `
              <div class="challenge-photo">
                <img src="${p.img}" alt="${p.author}" />
                <div class="challenge-photo-overlay">
                  <span class="challenge-photo-author">${p.author}</span>
                  <span class="challenge-photo-votes">▲ ${p.votes}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </section>
  `
}

function buildFeed() {
  const filters = ['all', 'featured', 'landscape', 'portrait', 'urban', 'nature']
  const filtered = state.activeFilter === 'all'
    ? PHOTOS
    : state.activeFilter === 'featured'
    ? PHOTOS.filter(p => p.featured)
    : PHOTOS.filter(p => p.tags.includes(state.activeFilter))

  return `
    <section class="section" id="feed">
      <div class="container">
        <div class="section-header fade-in">
          <span class="section-eyebrow">Community Feed</span>
          <h2 class="section-title">Discover what's being shared</h2>
          <p class="section-sub">Real work from real photographers. Scroll, vote, follow, and get inspired.</p>
        </div>
        <div class="feed-filters fade-in">
          ${filters.map(f => `
            <button class="filter-btn ${state.activeFilter === f ? 'active' : ''}" data-filter="${f}">
              ${f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          `).join('')}
        </div>
        <div class="photo-masonry fade-in" id="photoGrid">
          ${filtered.map(p => buildPhotoCard(p)).join('')}
        </div>
        <div class="feed-load-more fade-in">
          <button class="btn-outline" id="btnLoadMore">Load more photos</button>
        </div>
      </div>
    </section>
  `
}

function buildPhotoCard(p) {
  const liked = state.likedPhotos.has(p.id)
  return `
    <div class="photo-card" data-photoid="${p.id}">
      <div class="photo-card-img">
        <img src="${p.img}" alt="${p.title}" loading="lazy" />
        <button class="photo-card-like ${liked ? 'liked' : ''}" data-likeid="${p.id}" aria-label="Like"></button>
      </div>
      <div class="photo-card-body">
        <div class="photo-card-meta">
          <div class="photo-card-author">
            <img class="avatar" src="${p.avatar}" alt="${p.author}" />
            <span class="photo-card-author-name">${p.author}</span>
          </div>
          <span class="photo-card-badge badge-${p.type}">${p.type === 'pro' ? 'PRO' : 'HOBBY'}</span>
        </div>
        <div class="photo-card-title">${p.title}</div>
        <div class="photo-card-tags">
          ${p.tags.map(t => `<span class="tag">#${t}</span>`).join('')}
          ${p.featured ? '<span class="tag" style="background:var(--warning-100);color:var(--warning-500)">✦ featured</span>' : ''}
        </div>
        <div class="photo-card-stats">
          <span class="photo-stat">♥ ${liked ? p.likes + 1 : p.likes}</span>
          <span class="photo-stat">💬 ${p.comments}</span>
          <span class="photo-stat">⟳ Share</span>
        </div>
      </div>
    </div>
  `
}

function buildCritique() {
  const scores = [
    { label: 'Composition', val: 8.4, color: 'var(--primary-500)' },
    { label: 'Lighting', val: 9.1, color: 'var(--warning-500)' },
    { label: 'Post-process', val: 7.8, color: 'var(--success-500)' },
    { label: 'Concept', val: 8.9, color: 'var(--accent-500)' },
  ]
  const comments = [
    {
      author: 'Elena V.', level: 'Senior Critic • 412 critiques',
      avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?w=44&h=44&fit=crop',
      cat: 'composition', catLabel: 'Composition',
      text: 'The leading line from the bottom-left draws the eye beautifully toward the subject, but the right third feels slightly heavy. Consider cloning out the distracting branch at 2 o\'clock.',
      helpful: 24
    },
    {
      author: 'Daniel P.', level: 'Intermediate • 88 critiques',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?w=44&h=44&fit=crop',
      cat: 'lighting', catLabel: 'Lighting',
      text: 'That golden rim light is handled masterfully — the exposure balance between highlights and shadow is exceptional. The catchlight in the eyes feels natural and alive.',
      helpful: 17
    },
    {
      author: 'Yuki S.', level: 'Advanced • 210 critiques',
      avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?w=44&h=44&fit=crop',
      cat: 'post', catLabel: 'Post-Processing',
      text: 'Skin tones are warm but not oversaturated — good restraint. I\'d nudge the blacks down slightly to add more depth. The grain choice is perfect for this mood.',
      helpful: 11
    },
  ]
  const catClass = { composition: 'cat-composition', lighting: 'cat-lighting', post: 'cat-post', concept: 'cat-concept' }

  return `
    <section class="section section-alt" id="critique">
      <div class="container">
        <div class="section-header fade-in">
          <span class="section-eyebrow">Critique System</span>
          <h2 class="section-title">Feedback that actually helps you grow</h2>
          <p class="section-sub">Structured critiques across four dimensions. Quality is enforced — vague praise gets flagged, specific insight earns reputation.</p>
        </div>
        <div class="critique-grid fade-in">
          <div class="critique-photo-wrap">
            <img src="https://images.pexels.com/photos/3076899/pexels-photo-3076899.jpeg?w=600&h=720&fit=crop" alt="Photo under critique" />
            <div class="critique-photo-controls">
              <button class="control-btn active" id="ctrlOriginal">
                <span>⊞</span> Original
              </button>
              <button class="control-btn" id="ctrlAnnotate">
                <span>✎</span> Annotated
              </button>
              <button class="control-btn" id="ctrlCompare">
                <span>⟷</span> Compare
              </button>
            </div>
          </div>
          <div class="critique-panel">
            <div class="critique-header">
              <h3 class="critique-title">Quiet Sunday — 3 critiques</h3>
              <div class="critique-author-row">
                <img class="avatar avatar-lg" src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?w=64&h=64&fit=crop" alt="Priya Nair" />
                <div class="critique-author-info">
                  <h4>Priya Nair</h4>
                  <p>Portrait photographer · San Francisco, CA</p>
                </div>
              </div>
            </div>

            <div class="critique-scores">
              ${scores.map(s => {
                const r = 22; const circ = 2 * Math.PI * r
                const offset = circ - (s.val / 10) * circ
                return `
                  <div class="score-item">
                    <div class="score-label">${s.label}</div>
                    <div class="score-ring">
                      <svg viewBox="0 0 52 52" width="52" height="52">
                        <circle class="score-ring-bg" cx="26" cy="26" r="${r}" />
                        <circle class="score-ring-fill"
                          cx="26" cy="26" r="${r}"
                          stroke="${s.color}"
                          stroke-dasharray="${circ}"
                          stroke-dashoffset="${offset}" />
                      </svg>
                      <div class="score-ring-val">${s.val}</div>
                    </div>
                  </div>
                `
              }).join('')}
            </div>

            <div class="critique-comments">
              ${comments.map(c => `
                <div class="comment-card">
                  <div class="comment-header">
                    <div class="comment-author">
                      <img class="avatar" src="${c.avatar}" alt="${c.author}" />
                      <div>
                        <div class="comment-author-name">${c.author}</div>
                        <div class="comment-author-level">${c.level}</div>
                      </div>
                    </div>
                    <button class="comment-helpful">👍 ${c.helpful}</button>
                  </div>
                  <span class="comment-category ${catClass[c.cat]}">${c.catLabel}</span>
                  <p class="comment-text">${c.text}</p>
                </div>
              `).join('')}
            </div>

            <div class="comment-input-area">
              <div class="comment-input-header">
                ${[
                  { id: 'composition', label: 'Composition', cls: 'cat-composition' },
                  { id: 'lighting', label: 'Lighting', cls: 'cat-lighting' },
                  { id: 'post', label: 'Post-Processing', cls: 'cat-post' },
                  { id: 'concept', label: 'Concept', cls: 'cat-concept' },
                ].map(cat => `
                  <button class="comment-cat-btn ${catClass[cat.id]} ${state.selectedCatBtn === cat.id ? 'selected' : ''}"
                    data-cat="${cat.id}">${cat.label}</button>
                `).join('')}
              </div>
              <textarea id="critiqueInput" placeholder="Share a specific, actionable observation about this photo…" rows="3"></textarea>
              <div class="comment-input-footer">
                <span class="comment-rules">Be specific. Be kind. No vague praise.</span>
                <button class="btn-submit" id="btnSubmitCritique">Post critique</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  `
}

function buildPhotographers() {
  return `
    <section class="section" id="photographers">
      <div class="container">
        <div class="section-header fade-in">
          <span class="section-eyebrow">Featured Photographers</span>
          <h2 class="section-title">Talented pros ready for your project</h2>
          <p class="section-sub">Every portfolio is community-vetted. Browse by specialty, location, and availability.</p>
        </div>
        <div class="photographers-grid">
          ${PHOTOGRAPHERS.map(p => buildPhotographerCard(p)).join('')}
        </div>
        <div class="feed-load-more" style="margin-top:var(--sp-8)">
          <button class="btn-outline" id="btnBrowseAll">Browse all photographers</button>
        </div>
      </div>
    </section>
  `
}

function buildPhotographerCard(p) {
  const followed = state.followedPhotographers.has(p.id)
  return `
    <div class="photographer-card fade-in">
      <div class="photographer-cover">
        <img src="${p.cover}" alt="${p.name}" loading="lazy" />
        ${p.available ? `
          <div class="photographer-available">
            <span class="photographer-available-dot"></span>
            Available
          </div>
        ` : ''}
      </div>
      <div class="photographer-body">
        <div class="photographer-top">
          <div class="photographer-avatar-wrap">
            <img class="avatar avatar-xl" src="${p.avatar}" alt="${p.name}" />
            ${p.pro ? '<div class="pro-badge">✓</div>' : ''}
          </div>
          <div style="flex:1">
            <div class="photographer-name">${p.name}</div>
            <div class="photographer-specialty">${p.specialty}</div>
            <div class="photographer-location">📍 ${p.location}</div>
          </div>
        </div>
        <div class="photographer-stats">
          <div class="p-stat">
            <div class="p-stat-num">${p.followers}</div>
            <div class="p-stat-label">followers</div>
          </div>
          <div class="p-stat">
            <div class="p-stat-num">${p.photos}</div>
            <div class="p-stat-label">photos</div>
          </div>
          <div class="p-stat">
            <div class="p-stat-num">★ ${p.rating}</div>
            <div class="p-stat-label">rating</div>
          </div>
        </div>
        <div class="photographer-divider"></div>
        <div class="photographer-price">
          <div>
            <div class="price-label">Starting from</div>
            <div class="price-value">$${p.price} <span class="price-unit">/session</span></div>
          </div>
          <div style="display:flex;gap:var(--sp-2)">
            <button class="btn-outline" style="padding:var(--sp-1) var(--sp-3);font-size:.75rem"
              data-followid="${p.id}">
              ${followed ? '✓ Following' : '+ Follow'}
            </button>
            <button class="btn-hire" data-hireid="${p.id}">Hire</button>
          </div>
        </div>
        <div class="photographer-samples">
          ${p.samples.map(s => `<img src="${s}" alt="Sample" loading="lazy" />`).join('')}
        </div>
      </div>
    </div>
  `
}

function buildPulse() {
  const rankClass = (r) => r === 1 ? 'gold' : r === 2 ? 'silver' : r === 3 ? 'bronze' : ''
  return `
    <section class="section section-dark" id="pulse">
      <div class="container">
        <div class="section-header fade-in">
          <span class="section-eyebrow" style="color:var(--primary-400)">Community Pulse</span>
          <h2 class="section-title">It's alive right now</h2>
          <p class="section-sub">Every upload, critique, booking, and win — the community in real time.</p>
        </div>
        <div class="pulse-grid fade-in">
          <div class="pulse-feed">
            ${PULSE_EVENTS.map(e => `
              <div class="pulse-item">
                <div class="pulse-icon pulse-${e.type}">${e.icon}</div>
                <div class="pulse-content">
                  <div class="pulse-text">${e.text}</div>
                  <div class="pulse-time">${e.time}</div>
                </div>
              </div>
            `).join('')}
          </div>
          <div class="pulse-sidebar">
            <div class="pulse-card">
              <div class="pulse-card-title">Trending Tags</div>
              <div class="trending-tags">
                ${TRENDING_TAGS.map(t => `
                  <div class="trending-tag">
                    <span>${t.tag}</span>
                    <span class="trending-tag-count">${t.count}</span>
                  </div>
                `).join('')}
              </div>
            </div>
            <div class="pulse-card">
              <div class="pulse-card-title">This Week's Leaderboard</div>
              <div class="leaderboard">
                ${LEADERBOARD.map(l => `
                  <div class="leader-row">
                    <span class="leader-rank ${rankClass(l.rank)}">${l.rank}</span>
                    <img class="avatar avatar-sm" src="https://images.pexels.com/photos/${
                      [415829,2379004,1181686,1239291,697509][l.rank-1]
                    }/pexels-photo-${[415829,2379004,1181686,1239291,697509][l.rank-1]}.jpeg?w=44&h=44&fit=crop" alt="${l.name}" />
                    <span class="leader-name">${l.name}</span>
                    <span class="leader-pts">${l.pts}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
}

function buildHire() {
  return `
    <section class="section" id="hire">
      <div class="container">
        <div class="hire-wrap">
          <div class="hire-visual fade-in">
            <img class="hire-main-img"
              src="https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?w=600&h=700&fit=crop"
              alt="Hiring a photographer" />
            <div class="hire-float-card">
              <div class="hire-float-icon">✅</div>
              <div>
                <div class="hire-float-label">Latest booking</div>
                <div class="hire-float-val">Product shoot · $480</div>
              </div>
            </div>
          </div>
          <div class="hire-content fade-in">
            <span class="section-eyebrow">Hire a Photographer</span>
            <h2 class="hire-title">Find the right photographer for any occasion</h2>
            <p class="hire-desc">
              Every photographer in our directory has been reviewed by the community. You're not hiring a stranger — you're hiring someone whose work your peers have validated.
            </p>
            <div class="hire-features">
              <div class="hire-feature">
                <div class="hire-feature-icon fi-1">🔍</div>
                <div class="hire-feature-text">
                  <h4>Smart matching</h4>
                  <p>Filter by style, location, budget, and availability. See community ratings and past work side by side.</p>
                </div>
              </div>
              <div class="hire-feature">
                <div class="hire-feature-icon fi-2">🛡️</div>
                <div class="hire-feature-text">
                  <h4>Protected payments</h4>
                  <p>Funds are held securely until your shoot is confirmed complete. Disputes are mediated by our team.</p>
                </div>
              </div>
              <div class="hire-feature">
                <div class="hire-feature-icon fi-3">⭐</div>
                <div class="hire-feature-text">
                  <h4>Community-backed profiles</h4>
                  <p>Ratings come from both clients and fellow photographers — a fuller picture than client reviews alone.</p>
                </div>
              </div>
            </div>
            <div style="display:flex;gap:var(--sp-3);flex-wrap:wrap">
              <button class="btn-secondary" id="btnFindPro">Find a photographer</button>
              <button class="btn-outline" id="btnListPro">List your services</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
}

function buildTestimonials() {
  return `
    <section class="section section-alt">
      <div class="container">
        <div class="section-header fade-in">
          <span class="section-eyebrow">Testimonials</span>
          <h2 class="section-title">From the community itself</h2>
        </div>
        <div class="testimonials-grid">
          ${TESTIMONIALS.map(t => `
            <div class="testimonial-card fade-in">
              <div class="testimonial-stars">${'★'.repeat(t.stars)}</div>
              <p class="testimonial-text">${t.text}</p>
              <div class="testimonial-author">
                <img class="avatar avatar-lg" src="${t.avatar}" alt="${t.name}" />
                <div>
                  <div class="testimonial-author-name">${t.name}</div>
                  <div class="testimonial-author-role">${t.role}</div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `
}

function buildCTA() {
  return `
    <section class="cta-section">
      <div class="container cta-inner">
        <h2 class="cta-title fade-in">Your next great shot starts here</h2>
        <p class="cta-sub fade-in">Join 28,000 photographers who are learning, connecting, and building their careers together.</p>
        <div class="cta-actions fade-in">
          <button class="btn-primary" style="font-size:1rem;padding:var(--sp-4) var(--sp-10)" id="ctaJoin">
            Join for free
          </button>
          <button class="btn-ghost" style="font-size:1rem;padding:var(--sp-4) var(--sp-8)" id="ctaLearn">
            See how it works
          </button>
        </div>
      </div>
    </section>
  `
}

function buildFooter() {
  return `
    <footer>
      <div class="container">
        <div class="footer-grid">
          <div>
            <div class="nav-logo" style="color:var(--neutral-0)">
              <span class="nav-logo-dot"></span> PhotoCommunity
            </div>
            <p class="footer-brand-desc">
              The platform where photographers grow their craft, build community, and find clients. Hobbyists and professionals, together.
            </p>
            <div class="footer-social">
              ${['𝕏','in','📷','▶'].map(icon => `<a href="#" class="social-btn">${icon}</a>`).join('')}
            </div>
          </div>
          <div>
            <div class="footer-col-title">Community</div>
            <div class="footer-links">
              ${['Explore Feed','Weekly Challenges','Critique Exchange','Leaderboard','Member Profiles'].map(l => `<a href="#">${l}</a>`).join('')}
            </div>
          </div>
          <div>
            <div class="footer-col-title">For Pros</div>
            <div class="footer-links">
              ${['Create Portfolio','List Services','Pricing Plans','Analytics','Pro Badge'].map(l => `<a href="#">${l}</a>`).join('')}
            </div>
          </div>
          <div>
            <div class="footer-col-title">Company</div>
            <div class="footer-links">
              ${['About Us','Blog','Careers','Help Center','Moderation'].map(l => `<a href="#">${l}</a>`).join('')}
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <span class="footer-copy">© 2026 PhotoCommunity, Inc. All rights reserved.</span>
          <div class="footer-legal">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  `
}

function buildModal() {
  return `
    <div class="modal-backdrop ${state.modalOpen ? 'open' : ''}" id="modalBackdrop">
      <div class="modal" id="modalBox">
        <div class="modal-header">
          <span class="modal-title">${state.activeTab === 'login' ? 'Welcome back' : 'Join the community'}</span>
          <button class="modal-close" id="modalClose">✕</button>
        </div>
        <div class="modal-tabs">
          <div class="modal-tab ${state.activeTab === 'login' ? 'active' : ''}" data-tab="login">Log In</div>
          <div class="modal-tab ${state.activeTab === 'signup' ? 'active' : ''}" data-tab="signup">Create Account</div>
        </div>
        ${state.activeTab === 'login' ? buildLoginForm() : buildSignupForm()}
      </div>
    </div>
  `
}

function buildLoginForm() {
  return `
    <div class="form-group">
      <label class="form-label">Email address</label>
      <input type="email" class="form-input" placeholder="you@example.com" />
    </div>
    <div class="form-group">
      <label class="form-label">Password</label>
      <input type="password" class="form-input" placeholder="••••••••" />
    </div>
    <button class="btn-full" id="btnFormSubmit">Log In</button>
    <div class="modal-divider"><span>or continue with</span></div>
    <div style="display:flex;gap:var(--sp-3)">
      <button class="btn-outline" style="flex:1;padding:var(--sp-3)">Google</button>
      <button class="btn-outline" style="flex:1;padding:var(--sp-3)">Apple</button>
    </div>
  `
}

function buildSignupForm() {
  return `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--sp-4)">
      <div class="form-group">
        <label class="form-label">First name</label>
        <input type="text" class="form-input" placeholder="Jane" />
      </div>
      <div class="form-group">
        <label class="form-label">Last name</label>
        <input type="text" class="form-input" placeholder="Smith" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Email address</label>
      <input type="email" class="form-input" placeholder="you@example.com" />
    </div>
    <div class="form-group">
      <label class="form-label">Password</label>
      <input type="password" class="form-input" placeholder="At least 8 characters" />
    </div>
    <button class="btn-full" id="btnFormSubmit">Create account — it's free</button>
    <p style="font-size:.75rem;color:var(--neutral-400);text-align:center;margin-top:var(--sp-3)">
      By joining you agree to our <a href="#" style="color:var(--primary-600)">Terms</a> and <a href="#" style="color:var(--primary-600)">Privacy Policy</a>.
    </p>
  `
}

// ─── Timer ──────────────────────────────────────────────────────────────────
function startTimer() {
  if (state.timerInterval) clearInterval(state.timerInterval)
  function tick() {
    const el = document.getElementById('challengeTimer')
    if (!el) { clearInterval(state.timerInterval); return }
    const diff = state.challengeEnd - Date.now()
    if (diff <= 0) { el.textContent = 'Ended'; return }
    const d = Math.floor(diff / 86400000)
    const h = Math.floor((diff % 86400000) / 3600000)
    const m = Math.floor((diff % 3600000) / 60000)
    const s = Math.floor((diff % 60000) / 1000)
    el.textContent = `${d}d ${String(h).padStart(2,'0')}h ${String(m).padStart(2,'0')}m ${String(s).padStart(2,'0')}s`
  }
  tick()
  state.timerInterval = setInterval(tick, 1000)
}

// ─── Toast ──────────────────────────────────────────────────────────────────
function showToast(msg, type = '') {
  const container = document.getElementById('toastContainer')
  if (!container) return
  const el = document.createElement('div')
  el.className = `toast ${type}`
  el.innerHTML = `<span>${msg}</span>`
  container.appendChild(el)
  requestAnimationFrame(() => { requestAnimationFrame(() => { el.classList.add('show') }) })
  setTimeout(() => {
    el.classList.remove('show')
    setTimeout(() => el.remove(), 400)
  }, 3200)
}

// ─── Intersection Observer ───────────────────────────────────────────────────
function setupFadeIns() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })
  document.querySelectorAll('.fade-in').forEach(el => obs.observe(el))
}

// ─── Nav scroll ──────────────────────────────────────────────────────────────
function setupNavScroll() {
  const nav = document.getElementById('mainNav')
  if (!nav) return
  const onScroll = () => { nav.classList.toggle('scrolled', window.scrollY > 60) }
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
}

// ─── Events ──────────────────────────────────────────────────────────────────
function setupEvents() {
  // Modal open triggers
  const openModal = (tab) => {
    state.modalOpen = true; state.activeTab = tab
    const backdrop = document.getElementById('modalBackdrop')
    const box = document.getElementById('modalBox')
    if (backdrop && box) {
      backdrop.classList.add('open')
      box.innerHTML = buildModal().match(/<div class="modal"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*$/) ? '' : ''
      // Re-render modal inner content
      state.modalOpen = true
      rerenderModal()
    }
  }

  // Auth buttons
  document.getElementById('btnLogin')?.addEventListener('click', () => openModal('login'))
  document.getElementById('btnJoin')?.addEventListener('click', () => openModal('signup'))
  document.getElementById('heroCTA')?.addEventListener('click', () => openModal('signup'))
  document.getElementById('ctaJoin')?.addEventListener('click', () => openModal('signup'))
  document.getElementById('heroExplore')?.addEventListener('click', () => document.getElementById('feed')?.scrollIntoView({ behavior: 'smooth' }))
  document.getElementById('ctaLearn')?.addEventListener('click', () => document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' }))

  // Challenge buttons
  document.getElementById('btnEnter')?.addEventListener('click', () => { openModal('signup'); showToast('Join to enter the challenge!') })
  document.getElementById('btnVote')?.addEventListener('click', () => document.getElementById('challenge')?.scrollIntoView({ behavior: 'smooth' }))

  // Feed filters
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.activeFilter = btn.dataset.filter
      rerenderFeed()
    })
  })

  // Like buttons
  document.querySelectorAll('[data-likeid]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation()
      const id = Number(btn.dataset.likeid)
      if (state.likedPhotos.has(id)) {
        state.likedPhotos.delete(id)
        showToast('Unliked')
      } else {
        state.likedPhotos.add(id)
        showToast('Photo liked! ♥', 'success')
      }
      rerenderFeed()
    })
  })

  // Follow buttons
  document.querySelectorAll('[data-followid]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = Number(btn.dataset.followid)
      if (state.followedPhotographers.has(id)) {
        state.followedPhotographers.delete(id)
        showToast('Unfollowed')
      } else {
        state.followedPhotographers.add(id)
        showToast('Now following! ✓', 'success')
      }
      rerenderPhotographers()
    })
  })

  // Hire buttons
  document.querySelectorAll('[data-hireid]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = Number(btn.dataset.hireid)
      const p = PHOTOGRAPHERS.find(x => x.id === id)
      if (p) openModal('signup')
      showToast(`Contact ${p?.name ?? 'photographer'} — sign in first`)
    })
  })

  // Critique category buttons
  document.querySelectorAll('[data-cat]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.selectedCatBtn = btn.dataset.cat
      document.querySelectorAll('[data-cat]').forEach(b => b.classList.remove('selected'))
      btn.classList.add('selected')
    })
  })

  // Critique submit
  document.getElementById('btnSubmitCritique')?.addEventListener('click', () => {
    const val = document.getElementById('critiqueInput')?.value?.trim()
    if (!val) { showToast('Write your critique first!', 'error'); return }
    showToast('Critique posted! Thanks for contributing.', 'success')
    const input = document.getElementById('critiqueInput')
    if (input) input.value = ''
  })

  // Critique controls
  document.getElementById('ctrlOriginal')?.addEventListener('click', function() { setActiveControl(this) })
  document.getElementById('ctrlAnnotate')?.addEventListener('click', function() { setActiveControl(this); showToast('Annotation mode (demo)') })
  document.getElementById('ctrlCompare')?.addEventListener('click', function() { setActiveControl(this); showToast('Compare mode (demo)') })

  // Find/List pro
  document.getElementById('btnFindPro')?.addEventListener('click', () => document.getElementById('photographers')?.scrollIntoView({ behavior: 'smooth' }))
  document.getElementById('btnListPro')?.addEventListener('click', () => openModal('signup'))
  document.getElementById('btnBrowseAll')?.addEventListener('click', () => showToast('Full directory coming soon!'))
  document.getElementById('btnLoadMore')?.addEventListener('click', () => showToast('Load more — sign in to see more'))

  // Modal close / tab switch
  document.getElementById('modalClose')?.addEventListener('click', () => { state.modalOpen = false; rerenderModal() })
  document.getElementById('modalBackdrop')?.addEventListener('click', (e) => {
    if (e.target.id === 'modalBackdrop') { state.modalOpen = false; rerenderModal() }
  })
  document.querySelectorAll('[data-tab]').forEach(tab => {
    tab.addEventListener('click', () => { state.activeTab = tab.dataset.tab; rerenderModal() })
  })
  document.getElementById('btnFormSubmit')?.addEventListener('click', () => {
    showToast('Demo mode — auth coming soon!', 'success')
    state.modalOpen = false; rerenderModal()
  })

  // Helpful buttons in critique
  document.querySelectorAll('.comment-helpful').forEach(btn => {
    btn.addEventListener('click', function() {
      const num = parseInt(this.textContent.match(/\d+/)?.[0] ?? '0')
      this.textContent = `👍 ${num + 1}`
      showToast('Marked as helpful', 'success')
    })
  })
}

function setActiveControl(el) {
  document.querySelectorAll('.control-btn').forEach(b => b.classList.remove('active'))
  el.classList.add('active')
}

// ─── Partial re-renders ──────────────────────────────────────────────────────
function rerenderFeed() {
  const filters = ['all', 'featured', 'landscape', 'portrait', 'urban', 'nature']
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === state.activeFilter)
  })
  const filtered = state.activeFilter === 'all'
    ? PHOTOS
    : state.activeFilter === 'featured'
    ? PHOTOS.filter(p => p.featured)
    : PHOTOS.filter(p => p.tags.includes(state.activeFilter))
  const grid = document.getElementById('photoGrid')
  if (grid) {
    grid.innerHTML = filtered.map(p => buildPhotoCard(p)).join('')
    setupFadeIns()
    // Re-attach like listeners
    grid.querySelectorAll('[data-likeid]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation()
        const id = Number(btn.dataset.likeid)
        if (state.likedPhotos.has(id)) { state.likedPhotos.delete(id); showToast('Unliked') }
        else { state.likedPhotos.add(id); showToast('Photo liked! ♥', 'success') }
        rerenderFeed()
      })
    })
  }
}

function rerenderPhotographers() {
  const grid = document.querySelector('.photographers-grid')
  if (!grid) return
  grid.innerHTML = PHOTOGRAPHERS.map(p => buildPhotographerCard(p)).join('')
  // Re-attach follow/hire listeners
  grid.querySelectorAll('[data-followid]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = Number(btn.dataset.followid)
      if (state.followedPhotographers.has(id)) { state.followedPhotographers.delete(id); showToast('Unfollowed') }
      else { state.followedPhotographers.add(id); showToast('Now following! ✓', 'success') }
      rerenderPhotographers()
    })
  })
  grid.querySelectorAll('[data-hireid]').forEach(btn => {
    btn.addEventListener('click', () => {
      const p = PHOTOGRAPHERS.find(x => x.id === Number(btn.dataset.hireid))
      showToast(`Contact ${p?.name ?? 'photographer'} — sign in first`)
    })
  })
}

function rerenderModal() {
  const backdrop = document.getElementById('modalBackdrop')
  if (!backdrop) return
  backdrop.outerHTML = buildModal()
  // After replacing, re-attach modal events
  const newBackdrop = document.getElementById('modalBackdrop')
  if (!newBackdrop) { render(); init(); return }
  if (state.modalOpen) newBackdrop.classList.add('open')
  newBackdrop.querySelector('#modalClose')?.addEventListener('click', () => { state.modalOpen = false; rerenderModal() })
  newBackdrop.addEventListener('click', (e) => {
    if (e.target.id === 'modalBackdrop') { state.modalOpen = false; rerenderModal() }
  })
  newBackdrop.querySelectorAll('[data-tab]').forEach(tab => {
    tab.addEventListener('click', () => { state.activeTab = tab.dataset.tab; rerenderModal() })
  })
  newBackdrop.querySelector('#btnFormSubmit')?.addEventListener('click', () => {
    showToast('Demo mode — auth coming soon!', 'success')
    state.modalOpen = false; rerenderModal()
  })
}

// ─── Init ────────────────────────────────────────────────────────────────────
function init() {
  setupNavScroll()
  setupFadeIns()
  startTimer()
  setupEvents()
}

render()
init()
