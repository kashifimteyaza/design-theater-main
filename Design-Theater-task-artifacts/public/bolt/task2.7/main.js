import './style.css';

// ─── Data ─────────────────────────────────────────────────────────────────────

const heroFilm = {
  title: 'The Taste of Cherry',
  originalTitle: 'Ta\'m e guilass',
  year: 1997,
  country: 'Iran',
  director: 'Abbas Kiarostami',
  runtime: '99 min',
  rating: 'NR',
  score: '9.1',
  description: 'A man drives through the hills outside Tehran in search of someone willing to help him end his life. Kiarostami\'s Palme d\'Or masterpiece is a profound meditation on mortality, human connection, and the reasons we go on.',
  genres: ['Drama', 'Iranian Cinema'],
  awards: "Palme d'Or, Cannes",
  subtitles: true,
  audiodesc: false,
  bg: 'https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80',
};

const continueWatching = [
  {
    id: 1,
    title: 'Jeanne Dielman',
    year: 1975,
    country: 'Belgium',
    progress: 62,
    poster: 'https://images.pexels.com/photos/5731890/pexels-photo-5731890.jpeg?auto=compress&cs=tinysrgb&w=600&q=80',
    genre: 'Drama',
    subtitles: true,
    description: 'A widow\'s meticulous domestic rituals slowly unravel over three days in Chantal Akerman\'s monumental feminist landmark.',
  },
  {
    id: 2,
    title: 'Samsara',
    year: 2011,
    country: 'USA',
    progress: 18,
    poster: 'https://images.pexels.com/photos/1004409/pexels-photo-1004409.jpeg?auto=compress&cs=tinysrgb&w=600&q=80',
    genre: 'Documentary',
    subtitles: false,
    audiodesc: true,
    description: 'Ron Fricke\'s wordless meditation on the cyclical nature of human existence, filmed across 25 countries over five years.',
  },
  {
    id: 3,
    title: 'Happy Hour',
    year: 2015,
    country: 'Japan',
    progress: 44,
    poster: 'https://images.pexels.com/photos/3756766/pexels-photo-3756766.jpeg?auto=compress&cs=tinysrgb&w=600&q=80',
    genre: 'Drama',
    subtitles: true,
    description: 'Four friends navigate adulthood, friendship, and silent heartbreak across five extraordinary hours by Ryusuke Hamaguchi.',
  },
  {
    id: 4,
    title: 'Atlantics',
    year: 2019,
    country: 'Senegal',
    progress: 75,
    poster: 'https://images.pexels.com/photos/3062543/pexels-photo-3062543.jpeg?auto=compress&cs=tinysrgb&w=600&q=80',
    genre: 'Drama',
    subtitles: true,
    description: 'Love, loss, and the sea haunt Dakar in Mati Diop\'s debut — the first film by a Black woman to compete at Cannes.',
  },
  {
    id: 5,
    title: 'The Act of Killing',
    year: 2012,
    country: 'Indonesia',
    progress: 33,
    poster: 'https://images.pexels.com/photos/6956352/pexels-photo-6956352.jpeg?auto=compress&cs=tinysrgb&w=600&q=80',
    genre: 'Documentary',
    subtitles: true,
    description: 'Joshua Oppenheimer\'s chilling documentary asks perpetrators of mass murder to reenact their crimes in the style of their favourite movies.',
  },
];

const featuredFilms = [
  {
    id: 10,
    title: 'Portrait of a Lady on Fire',
    year: 2019,
    country: 'France',
    director: 'Céline Sciamma',
    poster: 'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=600&q=80',
    genre: 'Drama',
    subtitles: true,
    score: '9.4',
    description: 'A forbidden love unfolds on the Brittany coast in the 18th century. Sciamma\'s ravishing masterpiece about gazing and being seen.',
    isNew: true,
  },
  {
    id: 11,
    title: 'Parasite',
    year: 2019,
    country: 'South Korea',
    director: 'Bong Joon-ho',
    poster: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600&q=80',
    genre: 'Thriller',
    subtitles: true,
    score: '9.6',
    description: 'Class warfare explodes when a poor family infiltrates the home of a wealthy household in Bong\'s genre-defying tour de force.',
    awards: 'Palme d\'Or · Academy Award',
  },
  {
    id: 12,
    title: 'Capernaum',
    year: 2018,
    country: 'Lebanon',
    director: 'Nadine Labaki',
    poster: 'https://images.pexels.com/photos/1486974/pexels-photo-1486974.jpeg?auto=compress&cs=tinysrgb&w=600&q=80',
    genre: 'Drama',
    subtitles: true,
    score: '8.9',
    description: 'A 12-year-old boy sues his parents for bringing him into a world of poverty and neglect. Devastating and luminous.',
    awards: 'Jury Prize, Cannes',
  },
  {
    id: 13,
    title: 'Burning',
    year: 2018,
    country: 'South Korea',
    director: 'Lee Chang-dong',
    poster: 'https://images.pexels.com/photos/3844788/pexels-photo-3844788.jpeg?auto=compress&cs=tinysrgb&w=600&q=80',
    genre: 'Mystery',
    subtitles: true,
    score: '9.0',
    description: 'A young man suspects his enigmatic new friend may be responsible for a woman\'s disappearance. Hypnotic slow-burn cinema.',
  },
  {
    id: 14,
    title: 'Shoplifters',
    year: 2018,
    country: 'Japan',
    director: 'Hirokazu Kore-eda',
    poster: 'https://images.pexels.com/photos/3760098/pexels-photo-3760098.jpeg?auto=compress&cs=tinysrgb&w=600&q=80',
    genre: 'Drama',
    subtitles: true,
    score: '9.2',
    description: 'A found family of petty criminals in Tokyo. Kore-eda\'s most tender and urgent film asks what makes a family real.',
    awards: 'Palme d\'Or',
  },
  {
    id: 15,
    title: 'Never Look Away',
    year: 2018,
    country: 'Germany',
    director: 'Florian Henckel von Donnersmarck',
    poster: 'https://images.pexels.com/photos/1183099/pexels-photo-1183099.jpeg?auto=compress&cs=tinysrgb&w=600&q=80',
    genre: 'Drama',
    subtitles: true,
    score: '8.7',
    description: 'A sprawling epic following an artist from wartime Dresden to Cold War East Germany, loosely inspired by Gerhard Richter.',
  },
];

const documentaries = [
  {
    id: 20,
    title: 'Honeyland',
    year: 2019,
    country: 'North Macedonia',
    duration: '87 min',
    thumb: 'https://images.pexels.com/photos/1526620/pexels-photo-1526620.jpeg?auto=compress&cs=tinysrgb&w=800&q=80',
    genre: 'Documentary',
    score: '9.1',
    subtitles: true,
    audiodesc: false,
    description: 'The last female wild beekeeper in Europe struggles to maintain a balance with nature while a nomadic family threatens her way of life.',
  },
  {
    id: 21,
    title: 'Navalny',
    year: 2022,
    country: 'USA / Germany',
    duration: '98 min',
    thumb: 'https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=800&q=80',
    genre: 'Political Doc',
    score: '9.3',
    subtitles: true,
    audiodesc: true,
    description: 'Daniel Roher\'s gripping portrait of the Russian opposition leader tracks his poisoning and the audacious investigation that followed.',
  },
  {
    id: 22,
    title: 'Ascension',
    year: 2021,
    country: 'China',
    duration: '97 min',
    thumb: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800&q=80',
    genre: 'Documentary',
    score: '8.8',
    subtitles: true,
    audiodesc: false,
    description: 'A kaleidoscopic portrait of the Chinese dream — its ambitions, its costs, and its unspoken desires — told without a single interview.',
  },
  {
    id: 23,
    title: 'My Imaginary Country',
    year: 2022,
    country: 'Chile',
    duration: '83 min',
    thumb: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800&q=80',
    genre: 'Political Doc',
    score: '8.5',
    subtitles: true,
    audiodesc: false,
    description: 'Patricio Guzmán witnesses Chile\'s 2019 uprising and finds the young women at its center reimagining their nation from scratch.',
  },
];

const directors = [
  {
    name: 'Agnès Varda',
    films: '12 films available',
    img: 'https://images.pexels.com/photos/3775125/pexels-photo-3775125.jpeg?auto=compress&cs=tinysrgb&w=400&q=80',
  },
  {
    name: 'Wong Kar-wai',
    films: '9 films available',
    img: 'https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg?auto=compress&cs=tinysrgb&w=400&q=80',
  },
  {
    name: 'Ousmane Sembène',
    films: '7 films available',
    img: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400&q=80',
  },
  {
    name: 'Maren Ade',
    films: '4 films available',
    img: 'https://images.pexels.com/photos/3756766/pexels-photo-3756766.jpeg?auto=compress&cs=tinysrgb&w=400&q=80',
  },
];

const categories = [
  'For You', 'New Arrivals', 'International', 'Documentary',
  'Japanese Cinema', 'European Art', 'African Cinema', 'Latin America',
  'Short Films', 'Silent Era', 'Director Spotlights',
];

// ─── Icon helpers ─────────────────────────────────────────────────────────────

const icon = {
  play: `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M4 2.5l9 5.5-9 5.5V2.5z"/></svg>`,
  info: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="8" cy="8" r="6.5"/><line x1="8" y1="7" x2="8" y2="11"/><circle cx="8" cy="5" r="0.6" fill="currentColor"/></svg>`,
  search: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="7.5" cy="7.5" r="5.5"/><line x1="12" y1="12" x2="16" y2="16"/></svg>`,
  close: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><line x1="4" y1="4" x2="14" y2="14"/><line x1="14" y1="4" x2="4" y2="14"/></svg>`,
  chevLeft: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><polyline points="10,3 5,8 10,13"/></svg>`,
  chevRight: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><polyline points="6,3 11,8 6,13"/></svg>`,
  chevRightSm: `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><polyline points="4,2 8,6 4,10"/></svg>`,
  bookmark: `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M2 2h10v11l-5-3.5L2 13V2z"/></svg>`,
  plus: `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><line x1="7" y1="2" x2="7" y2="12"/><line x1="2" y1="7" x2="12" y2="7"/></svg>`,
};

// ─── Component builders ───────────────────────────────────────────────────────

function buildBadges(film, size = 'normal') {
  const small = size === 'small';
  let out = '';
  if (film.subtitles) out += `<span class="badge badge-sub" title="Subtitles available">${small ? 'CC' : 'Subtitles'}</span>`;
  if (film.audiodesc) out += `<span class="badge badge-ad" title="Audio description available">${small ? 'AD' : 'Audio Desc'}</span>`;
  return out;
}

function buildFilmCard(film) {
  const progressBar = film.progress != null
    ? `<div class="progress-bar-wrap"><div class="progress-bar-fill" style="width:${film.progress}%"></div></div>`
    : '';
  const awardBadge = film.awards
    ? `<span class="badge badge-award" style="font-size:10px">${film.awards.split('·')[0].trim()}</span>`
    : '';
  const newBadge = film.isNew ? `<span class="badge badge-new">New</span>` : '';

  return `
    <article class="film-card" tabindex="0" role="button" aria-label="Watch ${film.title}">
      <div class="film-card-poster">
        <img class="film-card-img" src="${film.poster}" alt="${film.title} poster" loading="lazy" />
        <div class="film-card-badges">
          ${newBadge}
          ${awardBadge}
        </div>
        <div class="film-card-overlay">
          <button class="film-card-play" aria-label="Play ${film.title}">
            ${icon.play}
          </button>
          <p class="film-card-overlay-description">${film.description || ''}</p>
          <div class="film-card-overlay-actions">
            <button class="film-card-icon-btn" aria-label="Add to watchlist">${icon.plus}</button>
            <button class="film-card-icon-btn" aria-label="More info">${icon.info}</button>
          </div>
        </div>
        ${progressBar}
      </div>
      <div class="film-card-info">
        <div class="film-card-title">${film.title}</div>
        <div class="film-card-sub">
          <span>${film.year}</span>
          <span class="hero-meta-sep"></span>
          <span>${film.country}</span>
          ${film.score ? `<span class="hero-meta-sep"></span><span class="film-card-rating">${film.score}</span>` : ''}
        </div>
      </div>
    </article>`;
}

function buildWideCard(doc) {
  return `
    <article class="film-card-wide" tabindex="0" role="button" aria-label="Watch ${doc.title}">
      <div class="film-card-wide-thumb">
        <img class="film-card-wide-img" src="${doc.thumb}" alt="${doc.title}" loading="lazy" />
        <div class="film-card-wide-overlay">
          <span class="film-card-wide-duration">${doc.duration}</span>
        </div>
      </div>
      <div class="film-card-wide-body">
        <div class="film-card-wide-title">${doc.title}</div>
        <div class="film-card-wide-meta">
          <span>${doc.year}</span>
          <span>${doc.country}</span>
          <span style="color:var(--gold)">${doc.score}</span>
          ${buildBadges(doc, 'small')}
        </div>
        <p class="film-card-wide-desc">${doc.description}</p>
      </div>
    </article>`;
}

function buildFilmRow(id, items, type = 'portrait') {
  const cards = type === 'wide'
    ? items.map(buildWideCard).join('')
    : items.map(buildFilmCard).join('');
  return `
    <div class="film-row" id="${id}">
      <button class="film-row-arrow prev hidden" aria-label="Scroll left">${icon.chevLeft}</button>
      <div class="film-row-track" role="list" aria-label="Film row">
        ${cards}
      </div>
      <button class="film-row-arrow next" aria-label="Scroll right">${icon.chevRight}</button>
    </div>`;
}

function buildNav() {
  return `
    <nav class="nav" id="main-nav" aria-label="Main navigation">
      <a href="#" class="nav-logo" aria-label="StreamVault home">
        <div class="nav-logo-mark" aria-hidden="true">S</div>
        <span class="nav-logo-name">StreamVault</span>
      </a>
      <ul class="nav-links" role="list">
        <li><a href="#" class="active">Home</a></li>
        <li><a href="#">Films</a></li>
        <li><a href="#">Documentaries</a></li>
        <li><a href="#">Directors</a></li>
        <li><a href="#">Collections</a></li>
      </ul>
      <div class="nav-spacer"></div>
      <div class="nav-actions">
        <button class="nav-search-btn" id="search-open-btn" aria-label="Open search" aria-expanded="false">
          ${icon.search}
        </button>
        <button class="nav-sign-in">Sign In</button>
      </div>
    </nav>`;
}

function buildHero() {
  return `
    <section class="hero" aria-label="Featured film: ${heroFilm.title}">
      <div class="hero-bg" style="background-image: url('${heroFilm.bg}')"></div>
      <div class="hero-content">
        <div class="hero-badges">
          <span class="badge badge-featured">Editor's Pick</span>
          <span class="badge badge-country">${heroFilm.country}</span>
          ${heroFilm.subtitles ? '<span class="badge badge-sub">Subtitles</span>' : ''}
          ${heroFilm.awards ? `<span class="badge badge-award">${heroFilm.awards}</span>` : ''}
        </div>
        <h1 class="hero-title"><em>${heroFilm.title}</em></h1>
        <div class="hero-meta">
          <span class="hero-meta-item">${heroFilm.year}</span>
          <span class="hero-meta-sep"></span>
          <span class="hero-meta-item">Dir. ${heroFilm.director}</span>
          <span class="hero-meta-sep"></span>
          <span class="hero-meta-item">${heroFilm.runtime}</span>
          <span class="hero-meta-sep"></span>
          <span class="hero-meta-item" style="color:var(--gold)">${heroFilm.score} / 10</span>
        </div>
        <p class="hero-description">${heroFilm.description}</p>
        <div class="hero-actions">
          <button class="btn-primary">${icon.play} Watch Now</button>
          <button class="btn-secondary">${icon.info} Film Details</button>
        </div>
      </div>
      <div class="hero-scroll-indicator" aria-hidden="true">
        <span>Scroll</span>
        <div class="scroll-line"></div>
      </div>
    </section>`;
}

function buildCategoryBar() {
  const pills = categories.map((c, i) =>
    `<button class="category-pill${i === 0 ? ' active' : ''}" role="tab" aria-selected="${i === 0}">${c}</button>`
  ).join('');
  return `<div class="category-bar" role="tablist" aria-label="Browse by category">${pills}</div>`;
}

function buildEditorialSpotlight() {
  return `
    <section class="editorial-spotlight" aria-label="Editorial spotlight">
      <div class="editorial-image">
        <img
          src="https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80"
          alt="Filmmaker at work"
          loading="lazy"
        />
      </div>
      <div class="editorial-body">
        <span class="editorial-eyebrow">Curator's Note</span>
        <h2 class="editorial-title">The New Wave of African Filmmaking</h2>
        <p class="editorial-text">
          From the Dakar streets in Mati Diop's <em>Atlantics</em> to the forests of Sissako's <em>Bamako</em>,
          a generation of African filmmakers is reshaping world cinema on their own terms.
          Our curators have assembled 24 essential works spanning five decades.
        </p>
        <a href="#" class="editorial-cta">
          Explore the collection ${icon.chevRightSm}
        </a>
      </div>
    </section>`;
}

function buildDirectorsSection() {
  const cards = directors.map(d => `
    <article class="director-card" tabindex="0" role="button" aria-label="Browse films by ${d.name}">
      <div class="director-card-img">
        <img src="${d.img}" alt="${d.name}" loading="lazy" />
      </div>
      <div class="director-card-body">
        <div class="director-card-name">${d.name}</div>
        <div class="director-card-films">${d.films}</div>
      </div>
    </article>`).join('');
  return `
    <section class="section" aria-label="Browse by director">
      <div class="section-header">
        <div>
          <h2 class="section-title">Directors' Circle</h2>
          <span class="section-subtitle">Browse by filmmaker</span>
        </div>
        <a href="#" class="section-see-all">All directors ${icon.chevRightSm}</a>
      </div>
      <div class="directors-grid" role="list">
        ${cards}
      </div>
    </section>`;
}

function buildJoinStrip() {
  return `
    <div class="join-strip">
      <div class="join-text">
        <div class="join-eyebrow">StreamVault Digest</div>
        <h2 class="join-title">Cinema worth your Tuesday evening</h2>
        <p class="join-desc">Weekly picks from our curators — one documentary, one feature, one short. No algorithm, just taste.</p>
      </div>
      <form class="join-form" onsubmit="return handleEmailSubmit(event)">
        <input
          class="join-input"
          type="email"
          placeholder="your@email.com"
          aria-label="Email address"
          required
        />
        <button type="submit" class="join-btn">Subscribe</button>
      </form>
    </div>`;
}

function buildFooter() {
  return `
    <footer class="footer">
      <div class="footer-top">
        <div class="footer-brand">
          <div class="footer-brand-logo">
            <div class="footer-brand-mark">S</div>
            <span class="footer-brand-name">StreamVault</span>
          </div>
          <p class="footer-tagline">Curated cinema for the culturally curious. Independent films, documentaries, and international treasures.</p>
        </div>
        <div class="footer-col">
          <div class="footer-col-title">Discover</div>
          <ul class="footer-links">
            <li><a href="#">New Arrivals</a></li>
            <li><a href="#">By Country</a></li>
            <li><a href="#">Award Winners</a></li>
            <li><a href="#">Short Films</a></li>
            <li><a href="#">Silent Era</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <div class="footer-col-title">Account</div>
          <ul class="footer-links">
            <li><a href="#">Sign In</a></li>
            <li><a href="#">Start Free Trial</a></li>
            <li><a href="#">Watchlist</a></li>
            <li><a href="#">Preferences</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <div class="footer-col-title">Company</div>
          <ul class="footer-links">
            <li><a href="#">About</a></li>
            <li><a href="#">Curators</a></li>
            <li><a href="#">Accessibility</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span class="footer-copyright">© 2026 StreamVault. All rights reserved.</span>
        <div class="footer-legal">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Cookie Settings</a>
        </div>
      </div>
    </footer>`;
}

function buildSearchOverlay() {
  const hints = ['Abbas Kiarostami', 'African Cinema', 'Palme d\'Or winners', 'Slow cinema', 'Animated', '1970s European'];
  return `
    <div class="search-overlay" id="search-overlay" role="dialog" aria-label="Search" aria-modal="true">
      <div class="search-inner">
        <div class="search-bar">
          ${icon.search}
          <input
            class="search-input"
            id="search-input"
            type="search"
            placeholder="Search films, directors, countries…"
            aria-label="Search films"
            autocomplete="off"
          />
          <button class="search-close" id="search-close-btn" aria-label="Close search">${icon.close}</button>
        </div>
        <div class="search-hints" role="list" aria-label="Search suggestions">
          ${hints.map(h => `<button class="search-hint" role="listitem">${h}</button>`).join('')}
        </div>
      </div>
    </div>`;
}

// ─── Full page render ─────────────────────────────────────────────────────────

function render() {
  const app = document.getElementById('app');
  app.innerHTML = `
    ${buildNav()}
    ${buildSearchOverlay()}
    ${buildHero()}

    <div class="page-content">
      ${buildCategoryBar()}

      <!-- Continue Watching -->
      <section class="section" aria-label="Continue watching">
        <div class="section-header">
          <div>
            <h2 class="section-title">Continue Watching</h2>
            <span class="section-subtitle">Pick up where you left off</span>
          </div>
          <a href="#" class="section-see-all">See all ${icon.chevRightSm}</a>
        </div>
        ${buildFilmRow('row-continue', continueWatching)}
      </section>

      <!-- Featured Films -->
      <section class="section" aria-label="Featured selections">
        <div class="section-header">
          <div>
            <h2 class="section-title">This Season's Selections</h2>
            <span class="section-subtitle">Hand-picked by our curators</span>
          </div>
          <a href="#" class="section-see-all">View all ${icon.chevRightSm}</a>
        </div>
        ${buildFilmRow('row-featured', featuredFilms)}
      </section>

      <!-- Editorial Spotlight -->
      ${buildEditorialSpotlight()}

      <!-- Documentaries -->
      <section class="section" aria-label="Featured documentaries">
        <div class="section-header">
          <div>
            <h2 class="section-title">Essential Documentaries</h2>
            <span class="section-subtitle">The real world, uncommonly seen</span>
          </div>
          <a href="#" class="section-see-all">Browse all ${icon.chevRightSm}</a>
        </div>
        ${buildFilmRow('row-docs', documentaries, 'wide')}
      </section>

      <!-- Directors -->
      ${buildDirectorsSection()}

      <!-- Join -->
      ${buildJoinStrip()}
    </div>

    ${buildFooter()}
  `;
}

// ─── Interactivity ────────────────────────────────────────────────────────────

function initScrollArrows(rowId) {
  const row = document.getElementById(rowId);
  if (!row) return;
  const track = row.querySelector('.film-row-track');
  const prev  = row.querySelector('.film-row-arrow.prev');
  const next  = row.querySelector('.film-row-arrow.next');

  function updateArrows() {
    const maxScroll = track.scrollWidth - track.clientWidth;
    prev.classList.toggle('hidden', track.scrollLeft <= 10);
    next.classList.toggle('hidden', track.scrollLeft >= maxScroll - 10);
  }

  prev.addEventListener('click', () => {
    track.scrollBy({ left: -track.clientWidth * 0.75, behavior: 'smooth' });
  });
  next.addEventListener('click', () => {
    track.scrollBy({ left: track.clientWidth * 0.75, behavior: 'smooth' });
  });
  track.addEventListener('scroll', updateArrows, { passive: true });
  updateArrows();
}

function initNav() {
  const nav = document.getElementById('main-nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

function initSearch() {
  const overlay   = document.getElementById('search-overlay');
  const openBtn   = document.getElementById('search-open-btn');
  const closeBtn  = document.getElementById('search-close-btn');
  const input     = document.getElementById('search-input');

  function openSearch() {
    overlay.classList.add('open');
    openBtn.setAttribute('aria-expanded', 'true');
    setTimeout(() => input.focus(), 50);
    document.body.style.overflow = 'hidden';
  }

  function closeSearch() {
    overlay.classList.remove('open');
    openBtn.setAttribute('aria-expanded', 'false');
    openBtn.focus();
    document.body.style.overflow = '';
  }

  openBtn.addEventListener('click', openSearch);
  closeBtn.addEventListener('click', closeSearch);

  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeSearch();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeSearch();
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); openSearch(); }
  });

  overlay.querySelectorAll('.search-hint').forEach(hint => {
    hint.addEventListener('click', () => {
      input.value = hint.textContent;
      input.focus();
    });
  });
}

function initCategories() {
  const bar = document.querySelector('.category-bar');
  if (!bar) return;
  bar.addEventListener('click', e => {
    const pill = e.target.closest('.category-pill');
    if (!pill) return;
    bar.querySelectorAll('.category-pill').forEach(p => {
      p.classList.remove('active');
      p.setAttribute('aria-selected', 'false');
    });
    pill.classList.add('active');
    pill.setAttribute('aria-selected', 'true');
    pill.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  });
}

function initKeyboardCards() {
  document.querySelectorAll('.film-card, .film-card-wide, .director-card').forEach(card => {
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });
}

window.handleEmailSubmit = function(e) {
  e.preventDefault();
  const form = e.target;
  const input = form.querySelector('input');
  const btn = form.querySelector('button');
  btn.textContent = 'Subscribed!';
  btn.style.background = 'var(--success)';
  btn.style.color = 'var(--text-primary)';
  input.value = '';
  input.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Subscribe';
    btn.style.background = '';
    btn.style.color = '';
    input.disabled = false;
  }, 4000);
  return false;
};

// ─── Init ─────────────────────────────────────────────────────────────────────

render();
initNav();
initSearch();
initCategories();
initKeyboardCards();
['row-continue', 'row-featured', 'row-docs'].forEach(initScrollArrows);
