import './style.css';

const _reservations = [];
let _nextResId = 1;

// ─── Constants ────────────────────────────────────────────────────────────────
const TOTAL_SEATS = 80;
const SLOT_DURATION_HOURS = 2;
const TIME_SLOTS = [
  '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM',
  '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM',
  '9:00 PM', '9:30 PM',
];
const ADMIN_PIN = '8521';
const SERVICE_DAYS = [2, 3, 4, 5, 6, 0]; // Tue–Sun (0=Sun)

// ─── State ────────────────────────────────────────────────────────────────────
const state = {
  page: 'home',
  step: 1,
  date: '',
  partySize: 2,
  time: '',
  guestName: '',
  guestEmail: '',
  guestPhone: '',
  seatingPref: 'no_preference',
  specialRequests: '',
  confirmedId: '',
  confirmedRef: '',
  adminDate: getTodayString(),
  adminReservations: [],
  availabilityCache: {},
  adminAuthed: false,
};

function getTodayString() {
  return new Date().toISOString().split('T')[0];
}

function getMaxDate() {
  const d = new Date();
  d.setMonth(d.getMonth() + 3);
  return d.toISOString().split('T')[0];
}

function isServiceDay(dateStr) {
  const d = new Date(dateStr + 'T12:00:00');
  return SERVICE_DAYS.includes(d.getDay());
}

function formatDateLong(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
}

function formatDateShort(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function slotToMinutes(slot) {
  const [time, ampm] = slot.split(' ');
  let [h, m] = time.split(':').map(Number);
  if (ampm === 'PM' && h !== 12) h += 12;
  if (ampm === 'AM' && h === 12) h = 0;
  return h * 60 + m;
}

function slotsOverlap(a, b) {
  return Math.abs(slotToMinutes(a) - slotToMinutes(b)) < SLOT_DURATION_HOURS * 60;
}

function generateRef(id) {
  return 'BV-' + id.slice(0, 8).toUpperCase();
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatSeating(pref) {
  const map = { window: 'Window', quiet_corner: 'Corner', no_preference: '—' };
  return map[pref] || pref;
}

// ─── Supabase helpers ─────────────────────────────────────────────────────────
async function fetchAvailability(dateStr) {
  if (state.availabilityCache[dateStr]) return state.availabilityCache[dateStr];
  const data = _reservations.filter(r =>
    r.reservation_date === dateStr &&
    r.status !== 'cancelled' &&
    r.status !== 'no_show'
  );

  const usage = {};
  for (const slot of TIME_SLOTS) {
    let seated = 0;
    for (const r of data) {
      if (slotsOverlap(slot, r.reservation_time)) seated += r.party_size;
    }
    usage[slot] = seated;
  }
  state.availabilityCache[dateStr] = usage;
  return usage;
}

async function createReservation() {
  const id = _nextResId++;
  _reservations.push({
    id,
    guest_name: state.guestName.trim(),
    guest_email: state.guestEmail.trim().toLowerCase(),
    guest_phone: state.guestPhone.trim(),
    party_size: state.partySize,
    reservation_date: state.date,
    reservation_time: state.time,
    seating_preference: state.seatingPref,
    special_requests: state.specialRequests.trim(),
    status: 'confirmed',
  });
  delete state.availabilityCache[state.date];
  return id;
}

async function fetchAdminReservations(dateStr) {
  return _reservations
    .filter(r => r.reservation_date === dateStr)
    .slice()
    .sort((a, b) => a.reservation_time.localeCompare(b.reservation_time));
}

async function updateReservationStatus(id, status) {
  const r = _reservations.find(r => r.id === id);
  if (r) r.status = status;
  state.availabilityCache = {};
}

// ─── Rendering ────────────────────────────────────────────────────────────────
function render() {
  const app = document.getElementById('app');
  app.innerHTML = '';
  app.appendChild(renderNav());

  if (state.page === 'home') app.appendChild(renderHome());
  else if (state.page === 'reservation') app.appendChild(renderReservationPage());
  else if (state.page === 'confirmation') app.appendChild(renderConfirmation());
  else if (state.page === 'admin') app.appendChild(renderAdmin());
  else if (state.page === 'admin-login') app.appendChild(renderAdminLogin());

  app.appendChild(renderFooter());
  attachListeners();
}

function renderNav() {
  const nav = document.createElement('nav');
  nav.className = 'nav';
  nav.innerHTML = `
    <div class="nav-inner">
      <a href="#" class="nav-logo" data-action="goto-home">
        <span class="nav-logo-mark">BV</span>
        <span class="nav-logo-text">Bella Vista</span>
      </a>
      <div class="nav-links">
        <a href="#menu" class="nav-link" data-action="scroll-menu">Menu</a>
        <a href="#about" class="nav-link" data-action="scroll-about">About</a>
        <a href="#contact" class="nav-link" data-action="scroll-contact">Contact</a>
        <button class="btn btn-primary nav-reserve-btn" data-action="start-reservation">Reserve a Table</button>
      </div>
      <button class="nav-hamburger" data-action="toggle-menu" aria-label="Open menu">
        <span></span><span></span><span></span>
      </button>
    </div>
    <div class="nav-mobile-menu" id="mobile-menu">
      <a href="#" class="nav-mobile-link" data-action="goto-home">Menu</a>
      <a href="#" class="nav-mobile-link" data-action="goto-home">About</a>
      <a href="#" class="nav-mobile-link" data-action="goto-home">Contact</a>
      <button class="btn btn-primary" data-action="start-reservation">Reserve a Table</button>
    </div>
  `;
  return nav;
}

function renderHome() {
  const main = document.createElement('main');
  main.innerHTML = `
    <section class="hero">
      <div class="hero-bg">
        <img src="https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Bella Vista dining room" />
        <div class="hero-overlay"></div>
      </div>
      <div class="hero-content">
        <p class="hero-eyebrow">Est. 1998 &nbsp;·&nbsp; Downtown</p>
        <h1 class="hero-title">An Evening Worth<br><em>Remembering</em></h1>
        <p class="hero-subtitle">Northern Italian cuisine crafted from heritage recipes<br class="hero-br"> and the finest seasonal ingredients.</p>
        <div class="hero-actions">
          <button class="btn btn-hero" data-action="start-reservation">Reserve Your Table</button>
          <a href="#menu" class="btn btn-hero-ghost" data-action="scroll-menu">View Menu</a>
        </div>
        <p class="hero-hours">Dinner Tuesday – Sunday &nbsp;·&nbsp; 5:00 – 10:00 PM</p>
      </div>
      <div class="hero-scroll"><span></span></div>
    </section>

    <section class="features">
      <div class="features-inner">
        <div class="feature-item">
          <div class="feature-icon">🍷</div>
          <h3>800+ Wines</h3>
          <p>Curated Italian cellar with sommelier-guided pairings</p>
        </div>
        <div class="feature-divider"></div>
        <div class="feature-item">
          <div class="feature-icon">🌿</div>
          <h3>Farm to Table</h3>
          <p>Seasonal ingredients sourced from regional producers</p>
        </div>
        <div class="feature-divider"></div>
        <div class="feature-item">
          <div class="feature-icon">🕯️</div>
          <h3>Private Dining</h3>
          <p>Intimate corners and private rooms for special occasions</p>
        </div>
      </div>
    </section>

    <section class="menu-section" id="menu">
      <div class="section-container">
        <div class="section-header">
          <p class="section-eyebrow">From Our Kitchen</p>
          <h2 class="section-title">Tonight's Menu</h2>
          <div class="section-rule"></div>
        </div>
        <div class="menu-columns">
          <div class="menu-col">
            <h3 class="menu-category">Antipasti</h3>
            <div class="menu-item">
              <div class="menu-item-header"><span class="menu-item-name">Burrata con Pomodori</span><span class="menu-item-price">$22</span></div>
              <p class="menu-item-desc">Fresh burrata, heirloom tomatoes, aged balsamic, basil oil</p>
            </div>
            <div class="menu-item">
              <div class="menu-item-header"><span class="menu-item-name">Carpaccio di Manzo</span><span class="menu-item-price">$26</span></div>
              <p class="menu-item-desc">Thinly sliced beef tenderloin, capers, arugula, shaved Parmigiano</p>
            </div>
            <div class="menu-item">
              <div class="menu-item-header"><span class="menu-item-name">Zuppa di Funghi</span><span class="menu-item-price">$18</span></div>
              <p class="menu-item-desc">Wild mushroom soup, truffle cream, rosemary croutons</p>
            </div>
            <h3 class="menu-category" style="margin-top:2rem">Primi</h3>
            <div class="menu-item">
              <div class="menu-item-header"><span class="menu-item-name">Tagliolini al Tartufo</span><span class="menu-item-price">$44</span></div>
              <p class="menu-item-desc">Hand-cut pasta, black truffle, Parmigiano, brown butter</p>
            </div>
            <div class="menu-item">
              <div class="menu-item-header"><span class="menu-item-name">Risotto ai Frutti di Mare</span><span class="menu-item-price">$38</span></div>
              <p class="menu-item-desc">Carnaroli rice, Adriatic seafood, saffron, white wine</p>
            </div>
          </div>
          <div class="menu-col">
            <h3 class="menu-category">Secondi</h3>
            <div class="menu-item">
              <div class="menu-item-header"><span class="menu-item-name">Branzino al Forno</span><span class="menu-item-price">$52</span></div>
              <p class="menu-item-desc">Whole roasted sea bass, caperberries, olives, lemon verbena</p>
            </div>
            <div class="menu-item">
              <div class="menu-item-header"><span class="menu-item-name">Filetto di Manzo</span><span class="menu-item-price">$68</span></div>
              <p class="menu-item-desc">Dry-aged beef tenderloin, barolo reduction, roasted bone marrow</p>
            </div>
            <div class="menu-item">
              <div class="menu-item-header"><span class="menu-item-name">Agnello alla Griglia</span><span class="menu-item-price">$58</span></div>
              <p class="menu-item-desc">Grilled rack of lamb, salsa verde, rosemary-scented polenta</p>
            </div>
            <h3 class="menu-category" style="margin-top:2rem">Dolci</h3>
            <div class="menu-item">
              <div class="menu-item-header"><span class="menu-item-name">Tiramisù della Casa</span><span class="menu-item-price">$16</span></div>
              <p class="menu-item-desc">Our grandmother's recipe, served tableside</p>
            </div>
            <div class="menu-item">
              <div class="menu-item-header"><span class="menu-item-name">Panna Cotta</span><span class="menu-item-price">$14</span></div>
              <p class="menu-item-desc">Vanilla bean, seasonal berry compote, amaretti crumble</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="about-section" id="about">
      <div class="about-inner">
        <div class="about-image">
          <img src="https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Chef preparing a dish" />
        </div>
        <div class="about-content">
          <p class="section-eyebrow">Our Story</p>
          <h2 class="section-title">A Family Tradition,<br><em>Reimagined</em></h2>
          <div class="section-rule" style="margin:1.5rem 0"></div>
          <p class="about-text">Since 1998, Bella Vista has brought the soulful cooking of Northern Italy to the heart of downtown. Chef Marco Romani trained under the masters of Emilia-Romagna before opening these doors, and every dish still carries that handmade spirit — pasta rolled by hand each morning, sauces that have simmered since dawn.</p>
          <p class="about-text">Our dining room seats eighty, yet we work hard to make every table feel like the most important one in the house.</p>
          <button class="btn btn-secondary" data-action="start-reservation">Reserve Your Evening</button>
        </div>
      </div>
    </section>

    <section class="gallery-section">
      <div class="gallery-grid">
        <div class="gallery-item gallery-item--tall">
          <img src="https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Pasta dish" loading="lazy" />
        </div>
        <div class="gallery-item">
          <img src="https://images.pexels.com/photos/784633/pexels-photo-784633.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Wine and candles" loading="lazy" />
        </div>
        <div class="gallery-item">
          <img src="https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Restaurant interior" loading="lazy" />
        </div>
        <div class="gallery-item gallery-item--wide">
          <img src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Elegant plating" loading="lazy" />
        </div>
      </div>
    </section>

    <section class="cta-section">
      <div class="cta-inner">
        <p class="section-eyebrow" style="color:var(--gold-300)">Join Us</p>
        <h2 class="cta-title">Your Table Awaits</h2>
        <p class="cta-subtitle">Reservations available Tuesday through Sunday.<br>We look forward to an unforgettable evening together.</p>
        <button class="btn btn-hero" data-action="start-reservation">Reserve Now</button>
        <p class="cta-phone">Or call us: <a href="tel:+15555551234">(555) 555-1234</a></p>
      </div>
    </section>

    <section class="contact-section" id="contact">
      <div class="contact-inner">
        <div class="contact-col">
          <h3 class="contact-heading">Hours</h3>
          <p>Tuesday – Sunday</p>
          <p>Dinner: 5:00 PM – 10:00 PM</p>
          <p class="contact-note">Closed Monday</p>
        </div>
        <div class="contact-col">
          <h3 class="contact-heading">Location</h3>
          <p>142 Via Romana</p>
          <p>Downtown District</p>
          <p><a href="tel:+15555551234">(555) 555-1234</a></p>
        </div>
        <div class="contact-col">
          <h3 class="contact-heading">Private Events</h3>
          <p>Host your celebration in our private dining room.</p>
          <p><a href="mailto:events@bellavista.com">events@bellavista.com</a></p>
        </div>
      </div>
      <p class="admin-hint"><a href="#" data-action="goto-admin-login">Staff login</a></p>
    </section>
  `;
  return main;
}

function renderReservationPage() {
  const main = document.createElement('main');
  main.className = 'reservation-page';
  main.innerHTML = `
    <div class="reservation-container">
      <div class="reservation-header">
        <button class="back-btn" data-action="goto-home">← Back to Home</button>
        <h1 class="reservation-title">Reserve Your Table</h1>
        <p class="reservation-subtitle">Bella Vista &nbsp;·&nbsp; Dinner Tuesday – Sunday &nbsp;·&nbsp; 5 PM – 10 PM</p>
      </div>
      <div class="progress-bar">
        ${[1,2,3].map(n => `
          <div class="progress-step ${state.step >= n ? 'active' : ''} ${state.step > n ? 'done' : ''}">
            <div class="progress-dot"><span>${state.step > n ? '✓' : n}</span></div>
            <span class="progress-label">${['Date &amp; Party', 'Choose Time', 'Your Details'][n-1]}</span>
          </div>
          ${n < 3 ? `<div class="progress-line ${state.step > n ? 'active' : ''}"></div>` : ''}
        `).join('')}
      </div>
      <div class="reservation-card" id="step-content">
        ${state.step === 1 ? renderStep1() : renderStep2Skeleton()}
        ${state.step === 3 ? renderStep3() : ''}
      </div>
    </div>
  `;
  return main;
}

function renderStep1() {
  return `
    <div class="step">
      <h2 class="step-title">When would you like to dine?</h2>
      <div class="form-group">
        <label class="form-label" for="date-input">Select a Date</label>
        <input type="date" id="date-input" class="form-input date-input"
          min="${getTodayString()}" max="${getMaxDate()}"
          value="${state.date}" data-field="date" />
        ${state.date && !isServiceDay(state.date)
          ? '<p class="form-hint form-error">We are closed on Mondays. Please choose another day.</p>'
          : '<p class="form-hint">Open Tuesday through Sunday.</p>'}
      </div>
      <div class="form-group">
        <label class="form-label">Number of Guests</label>
        <div class="party-size-grid">
          ${[1,2,3,4,5,6,7,8].map(n => `
            <button class="party-btn ${state.partySize === n ? 'selected' : ''}"
              data-action="set-party" data-value="${n}">
              ${n}<span class="party-label">${n === 1 ? 'guest' : 'guests'}</span>
            </button>
          `).join('')}
        </div>
      </div>
      <div class="step-actions">
        <button class="btn btn-primary btn-large" data-action="step1-next"
          ${!state.date || !isServiceDay(state.date) ? 'disabled' : ''}>
          See Available Times →
        </button>
      </div>
    </div>
  `;
}

function renderStep2Skeleton() {
  if (state.step !== 2) return '';
  return `<div class="step step-loading"><div class="spinner"></div><p>Checking availability…</p></div>`;
}

function renderStep2(availability) {
  const slots = TIME_SLOTS.map(slot => {
    const used = availability[slot] || 0;
    const available = TOTAL_SEATS - used;
    const canBook = available >= state.partySize;
    const almostFull = available < 15 && canBook;
    return { slot, available, canBook, almostFull };
  });
  const hasAny = slots.some(s => s.canBook);

  return `
    <div class="step">
      <h2 class="step-title">Choose your time</h2>
      <p class="step-meta">${formatDateLong(state.date)} &nbsp;·&nbsp; Party of ${state.partySize}</p>
      ${!hasAny ? `
        <div class="no-availability">
          <p class="no-avail-icon">😔</p>
          <p>We're fully booked for your party size on this date.</p>
          <p>Please try another date or call us at (555) 555-1234.</p>
          <button class="btn btn-secondary" data-action="go-step-1">Choose a Different Date</button>
        </div>
      ` : `
        <div class="time-grid">
          ${slots.map(({ slot, canBook, almostFull }) => `
            <button class="time-btn ${!canBook ? 'unavailable' : ''} ${state.time === slot ? 'selected' : ''} ${almostFull ? 'almost-full' : ''}"
              data-action="${canBook ? 'set-time' : ''}" data-value="${slot}"
              ${!canBook ? 'disabled' : ''}>
              <span class="time-slot-label">${slot}</span>
              ${almostFull ? '<span class="time-slot-badge">Few left</span>' : ''}
              ${!canBook ? '<span class="time-slot-badge unavail-badge">Full</span>' : ''}
            </button>
          `).join('')}
        </div>
        <div class="step-actions">
          <button class="btn btn-ghost" data-action="go-step-1">← Change Date</button>
          <button class="btn btn-primary btn-large" data-action="go-step-3" ${!state.time ? 'disabled' : ''}>
            Continue →
          </button>
        </div>
      `}
    </div>
  `;
}

function renderStep3() {
  return `
    <div class="step">
      <h2 class="step-title">Your Details</h2>
      <div class="step-summary-bar">
        <span>${formatDateShort(state.date)}</span>
        <span class="summary-dot">·</span>
        <span>${state.time}</span>
        <span class="summary-dot">·</span>
        <span>Party of ${state.partySize}</span>
        <button class="summary-edit-btn" data-action="go-step-1">Edit</button>
      </div>
      <div class="form-group">
        <label class="form-label" for="guest-name">Your Name <span class="required">*</span></label>
        <input type="text" id="guest-name" class="form-input" placeholder="Full name"
          value="${escapeHtml(state.guestName)}" data-field="guestName" autocomplete="name" />
      </div>
      <div class="form-row-2">
        <div class="form-group">
          <label class="form-label" for="guest-email">Email Address <span class="required">*</span></label>
          <input type="email" id="guest-email" class="form-input" placeholder="you@email.com"
            value="${escapeHtml(state.guestEmail)}" data-field="guestEmail" autocomplete="email" />
        </div>
        <div class="form-group">
          <label class="form-label" for="guest-phone">Phone Number <span class="required">*</span></label>
          <input type="tel" id="guest-phone" class="form-input" placeholder="(555) 555-1234"
            value="${escapeHtml(state.guestPhone)}" data-field="guestPhone" autocomplete="tel" />
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Seating Preference <span class="optional">(optional)</span></label>
        <div class="seating-grid">
          ${[
            { val: 'no_preference', icon: '🪑', label: 'No preference' },
            { val: 'window', icon: '🌆', label: 'Window seat' },
            { val: 'quiet_corner', icon: '🕯️', label: 'Quiet corner' },
          ].map(({ val, icon, label }) => `
            <label class="seating-option ${state.seatingPref === val ? 'selected' : ''}">
              <input type="radio" name="seating" value="${val}" ${state.seatingPref === val ? 'checked' : ''} data-field="seatingPref" />
              <span class="seating-icon">${icon}</span>
              <span>${label}</span>
            </label>
          `).join('')}
        </div>
      </div>
      <div class="form-group">
        <label class="form-label" for="special-requests">Special Requests <span class="optional">(optional)</span></label>
        <textarea id="special-requests" class="form-input form-textarea"
          placeholder="Dietary needs, allergies, celebrations, high chair…"
          data-field="specialRequests">${escapeHtml(state.specialRequests)}</textarea>
      </div>
      <div class="step-actions">
        <button class="btn btn-ghost" data-action="go-step-2">← Back</button>
        <button class="btn btn-primary btn-large" data-action="submit-reservation" id="submit-btn"
          ${!state.guestName.trim() || !state.guestEmail.trim() || !state.guestPhone.trim() ? 'disabled' : ''}>
          Confirm Reservation
        </button>
      </div>
      <p class="form-hint center-text">By confirming, you agree to our cancellation policy. A confirmation will be sent to your email.</p>
      <div id="submit-error" class="submit-error" style="display:none"></div>
    </div>
  `;
}

function renderConfirmation() {
  const main = document.createElement('main');
  main.className = 'confirmation-page';
  main.innerHTML = `
    <div class="confirmation-container">
      <div class="confirmation-icon">✓</div>
      <h1 class="confirmation-title">You're Confirmed!</h1>
      <p class="confirmation-subtitle">We look forward to welcoming you, ${escapeHtml(state.guestName.split(' ')[0])}.</p>
      <div class="confirmation-card">
        <div class="conf-row"><span class="conf-label">Date</span><span class="conf-value">${formatDateLong(state.date)}</span></div>
        <div class="conf-row"><span class="conf-label">Time</span><span class="conf-value">${state.time}</span></div>
        <div class="conf-row"><span class="conf-label">Party Size</span><span class="conf-value">${state.partySize} ${state.partySize === 1 ? 'guest' : 'guests'}</span></div>
        <div class="conf-row"><span class="conf-label">Confirmation</span><span class="conf-value conf-ref">${state.confirmedRef}</span></div>
        <div class="conf-row"><span class="conf-label">Email</span><span class="conf-value">${escapeHtml(state.guestEmail)}</span></div>
        ${state.seatingPref !== 'no_preference' ? `<div class="conf-row"><span class="conf-label">Seating</span><span class="conf-value">${state.seatingPref === 'window' ? 'Window seat' : 'Quiet corner'}</span></div>` : ''}
      </div>
      <div class="confirmation-notes">
        <p>📍 142 Via Romana, Downtown District</p>
        <p>📞 (555) 555-1234</p>
        <p class="conf-cancel-note">To cancel or modify, please call us at least 24 hours in advance.</p>
      </div>
      <div class="confirmation-actions">
        <button class="btn btn-secondary" data-action="start-reservation">Make Another Reservation</button>
        <button class="btn btn-ghost" data-action="goto-home">Return Home</button>
      </div>
    </div>
  `;
  return main;
}

function renderAdminLogin() {
  const main = document.createElement('main');
  main.className = 'admin-login-page';
  main.innerHTML = `
    <div class="admin-login-container">
      <div class="nav-logo-mark" style="font-size:2.5rem;margin-bottom:1.5rem">BV</div>
      <h1 class="admin-login-title">Staff Access</h1>
      <p class="admin-login-sub">Enter your PIN to access the reservation dashboard.</p>
      <div class="form-group">
        <label class="form-label" for="admin-pin">Access PIN</label>
        <input type="password" id="admin-pin" class="form-input" placeholder="••••" maxlength="10" inputmode="numeric" />
      </div>
      <button class="btn btn-primary btn-large" data-action="admin-login" style="width:100%">Access Dashboard</button>
      <p id="pin-error" class="form-error center-text" style="display:none;margin-top:1rem">Incorrect PIN. Please try again.</p>
      <button class="btn btn-ghost" data-action="goto-home" style="margin-top:1rem;width:100%">← Return Home</button>
    </div>
  `;
  return main;
}

function renderAdmin() {
  const main = document.createElement('main');
  main.className = 'admin-page';
  const active = state.adminReservations.filter(r => r.status !== 'cancelled' && r.status !== 'no_show');
  const totalCovers = active.reduce((s, r) => s + r.party_size, 0);
  const seated = state.adminReservations.filter(r => r.status === 'seated').length;

  main.innerHTML = `
    <div class="admin-container">
      <div class="admin-header">
        <div>
          <h1 class="admin-title">Bella Vista — Reservations</h1>
          <p class="admin-subtitle">Staff Management Panel</p>
        </div>
        <button class="btn btn-ghost btn-sm" data-action="goto-home">Exit</button>
      </div>
      <div class="admin-toolbar">
        <div class="admin-date-nav">
          <button class="btn btn-icon" data-action="admin-prev-day">←</button>
          <input type="date" class="form-input admin-date-input" id="admin-date" value="${state.adminDate}" data-field="adminDate" />
          <button class="btn btn-icon" data-action="admin-next-day">→</button>
        </div>
        <div class="admin-stats">
          <div class="admin-stat"><span class="admin-stat-value">${active.length}</span><span class="admin-stat-label">Reservations</span></div>
          <div class="admin-stat"><span class="admin-stat-value">${totalCovers}</span><span class="admin-stat-label">Covers</span></div>
          <div class="admin-stat"><span class="admin-stat-value">${seated}</span><span class="admin-stat-label">Seated</span></div>
          <div class="admin-stat"><span class="admin-stat-value">${TOTAL_SEATS - totalCovers}</span><span class="admin-stat-label">Open Seats</span></div>
        </div>
      </div>
      ${state.adminReservations.length === 0 ? `
        <div class="admin-empty"><p>No reservations for ${formatDateLong(state.adminDate)}.</p></div>
      ` : `
        <div class="admin-table-wrap">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Time</th><th>Guest</th><th>Party</th><th>Contact</th>
                <th>Seating</th><th>Requests</th><th>Status</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${state.adminReservations.map(r => `
                <tr class="admin-row status-${r.status}">
                  <td class="admin-time">${r.reservation_time}</td>
                  <td class="admin-guest">${escapeHtml(r.guest_name)}</td>
                  <td class="admin-party">${r.party_size}</td>
                  <td class="admin-contact">
                    <div>${escapeHtml(r.guest_email)}</div>
                    <div class="admin-phone">${escapeHtml(r.guest_phone)}</div>
                  </td>
                  <td>${formatSeating(r.seating_preference)}</td>
                  <td class="admin-requests">${r.special_requests ? escapeHtml(r.special_requests) : '<span class="admin-none">—</span>'}</td>
                  <td><span class="status-badge status-badge--${r.status}">${r.status}</span></td>
                  <td class="admin-actions-cell">
                    ${r.status === 'confirmed' ? `
                      <button class="btn btn-xs btn-success" data-action="admin-seat" data-id="${r.id}">Seat</button>
                      <button class="btn btn-xs btn-danger" data-action="admin-cancel" data-id="${r.id}">Cancel</button>
                    ` : ''}
                    ${r.status === 'seated' ? `
                      <button class="btn btn-xs btn-outline" data-action="admin-complete" data-id="${r.id}">Complete</button>
                    ` : ''}
                    ${(r.status === 'cancelled' || r.status === 'no_show') ? `
                      <button class="btn btn-xs btn-outline" data-action="admin-restore" data-id="${r.id}">Restore</button>
                    ` : ''}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `}
    </div>
  `;
  return main;
}

function renderFooter() {
  const footer = document.createElement('footer');
  footer.className = 'footer';
  footer.innerHTML = `
    <div class="footer-inner">
      <div class="footer-brand">
        <span class="nav-logo-mark" style="font-size:1.25rem">BV</span>
        <span class="footer-brand-name">Bella Vista</span>
      </div>
      <p class="footer-tagline">An evening worth remembering.</p>
      <p class="footer-copy">© ${new Date().getFullYear()} Bella Vista Restaurant. All rights reserved.</p>
    </div>
  `;
  return footer;
}

// ─── Event system ─────────────────────────────────────────────────────────────
function attachListeners() {
  document.addEventListener('click', handleClick, { once: true });
  document.addEventListener('change', handleChange);
  document.addEventListener('input', handleInput);
}

async function handleClick(e) {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;
  const action = btn.dataset.action;

  if (action === 'goto-home') { navigateTo('home'); return; }
  if (action === 'start-reservation') { startReservation(); return; }
  if (action === 'goto-admin-login') { navigateTo('admin-login'); return; }

  if (action === 'toggle-menu') {
    document.getElementById('mobile-menu')?.classList.toggle('open');
    return;
  }

  if (action === 'scroll-menu') { scrollToSection('menu'); return; }
  if (action === 'scroll-about') { scrollToSection('about'); return; }
  if (action === 'scroll-contact') { scrollToSection('contact'); return; }

  if (action === 'set-party') {
    state.partySize = parseInt(btn.dataset.value);
    state.time = '';
    refreshInPlace(renderStep1(), 'step-content');
    return;
  }

  if (action === 'step1-next') {
    if (!state.date || !isServiceDay(state.date)) return;
    state.step = 2;
    state.time = '';
    updateProgressUI();
    refreshInPlace(renderStep2Skeleton(), 'step-content');
    const avail = await fetchAvailability(state.date);
    refreshInPlace(renderStep2(avail), 'step-content');
    return;
  }

  if (action === 'go-step-1') {
    state.step = 1;
    state.time = '';
    updateProgressUI();
    refreshInPlace(renderStep1(), 'step-content');
    return;
  }

  if (action === 'set-time') {
    state.time = btn.dataset.value;
    document.querySelectorAll('.time-btn').forEach(b => b.classList.toggle('selected', b.dataset.value === state.time));
    const nextBtn = document.querySelector('[data-action="go-step-3"]');
    if (nextBtn) nextBtn.disabled = false;
    return;
  }

  if (action === 'go-step-2') {
    state.step = 2;
    updateProgressUI();
    refreshInPlace(renderStep2Skeleton(), 'step-content');
    const avail = await fetchAvailability(state.date);
    refreshInPlace(renderStep2(avail), 'step-content');
    return;
  }

  if (action === 'go-step-3') {
    if (!state.time) return;
    state.step = 3;
    updateProgressUI();
    refreshInPlace(renderStep3(), 'step-content');
    return;
  }

  if (action === 'submit-reservation') { await handleSubmit(); return; }

  if (action === 'admin-login') { await handleAdminLogin(); return; }

  if (action === 'admin-prev-day') {
    const d = new Date(state.adminDate + 'T12:00:00');
    d.setDate(d.getDate() - 1);
    state.adminDate = d.toISOString().split('T')[0];
    await reloadAdmin();
    return;
  }

  if (action === 'admin-next-day') {
    const d = new Date(state.adminDate + 'T12:00:00');
    d.setDate(d.getDate() + 1);
    state.adminDate = d.toISOString().split('T')[0];
    await reloadAdmin();
    return;
  }

  if (action === 'admin-seat') { await adminAction(btn.dataset.id, 'seated'); return; }
  if (action === 'admin-cancel') { await adminAction(btn.dataset.id, 'cancelled'); return; }
  if (action === 'admin-complete') { await adminAction(btn.dataset.id, 'no_show'); return; }
  if (action === 'admin-restore') { await adminAction(btn.dataset.id, 'confirmed'); return; }
}

function handleChange(e) {
  const el = e.target;
  const field = el.dataset.field;
  if (!field) return;

  if (field === 'date') {
    state.date = el.value;
    state.time = '';
    refreshInPlace(renderStep1(), 'step-content');
  } else if (field === 'seatingPref') {
    state.seatingPref = el.value;
    document.querySelectorAll('.seating-option').forEach(opt => {
      opt.classList.toggle('selected', opt.querySelector('input').value === state.seatingPref);
    });
  } else if (field === 'adminDate') {
    state.adminDate = el.value;
    reloadAdmin();
  }
}

function handleInput(e) {
  const el = e.target;
  const field = el.dataset.field;
  if (!['guestName', 'guestEmail', 'guestPhone', 'specialRequests'].includes(field)) return;
  state[field] = el.value;
  const valid = state.guestName.trim() && state.guestEmail.trim() && state.guestPhone.trim();
  const btn = document.getElementById('submit-btn');
  if (btn) btn.disabled = !valid;
}

// ─── Navigation helpers ───────────────────────────────────────────────────────
function navigateTo(page) {
  state.page = page;
  render();
  window.scrollTo(0, 0);
}

function startReservation() {
  state.page = 'reservation';
  state.step = 1;
  state.time = '';
  render();
  window.scrollTo(0, 0);
}

function scrollToSection(id) {
  if (state.page !== 'home') {
    state.page = 'home';
    render();
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100);
  } else {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}

function refreshInPlace(html, containerId) {
  const el = document.getElementById(containerId);
  if (el) el.innerHTML = html;
}

function updateProgressUI() {
  document.querySelectorAll('.progress-step').forEach((el, i) => {
    const n = i + 1;
    el.classList.toggle('active', state.step >= n);
    el.classList.toggle('done', state.step > n);
    const dot = el.querySelector('.progress-dot span');
    if (dot) dot.textContent = state.step > n ? '✓' : String(n);
  });
  document.querySelectorAll('.progress-line').forEach((el, i) => {
    el.classList.toggle('active', state.step > i + 1);
  });
}

async function handleSubmit() {
  const btn = document.getElementById('submit-btn');
  const errEl = document.getElementById('submit-error');
  if (!state.guestName.trim() || !state.guestEmail.trim() || !state.guestPhone.trim()) return;

  btn.disabled = true;
  btn.textContent = 'Confirming…';
  errEl.style.display = 'none';

  try {
    const id = await createReservation();
    state.confirmedId = id;
    state.confirmedRef = generateRef(id);
    navigateTo('confirmation');
  } catch (err) {
    console.error(err);
    errEl.textContent = 'Something went wrong. Please try again or call us at (555) 555-1234.';
    errEl.style.display = 'block';
    btn.disabled = false;
    btn.textContent = 'Confirm Reservation';
  }
}

async function handleAdminLogin() {
  const pin = document.getElementById('admin-pin')?.value;
  if (pin === ADMIN_PIN) {
    state.adminAuthed = true;
    state.adminReservations = await fetchAdminReservations(state.adminDate);
    navigateTo('admin');
  } else {
    const errEl = document.getElementById('pin-error');
    if (errEl) errEl.style.display = 'block';
  }
}

async function reloadAdmin() {
  state.adminReservations = await fetchAdminReservations(state.adminDate);
  const app = document.getElementById('app');
  app.innerHTML = '';
  app.appendChild(renderNav());
  app.appendChild(renderAdmin());
  app.appendChild(renderFooter());
  attachListeners();
}

async function adminAction(id, status) {
  try {
    await updateReservationStatus(id, status);
    await reloadAdmin();
  } catch (err) {
    console.error(err);
    alert('Could not update reservation. Please try again.');
  }
}

// ─── Scroll-driven nav opacity ────────────────────────────────────────────────
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav');
  if (nav) nav.classList.toggle('nav--scrolled', window.scrollY > 60);
}, { passive: true });

render();
