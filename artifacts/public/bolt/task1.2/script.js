import './style.css';

/* ===========================
   NAV: scroll state + mobile
   =========================== */
const nav = document.getElementById('nav');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

hamburger.addEventListener('click', () => {
  const open = hamburger.classList.toggle('open');
  navLinks.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ===========================
   STAT COUNTER ANIMATION
   =========================== */
const statNums = document.querySelectorAll('.stat__num[data-target]');

const countUp = (el) => {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1400;
  const step = 16;
  const steps = duration / step;
  let current = 0;
  const increment = target / steps;

  const tick = () => {
    current = Math.min(current + increment, target);
    el.textContent = target >= 100
      ? Math.round(current).toLocaleString() + (target >= 100 ? '+' : '')
      : Math.round(current);
    if (current < target) requestAnimationFrame(tick);
    else el.textContent = target + (target >= 100 ? '+' : '');
  };

  requestAnimationFrame(tick);
};

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      countUp(entry.target);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(el => statsObserver.observe(el));

/* ===========================
   SCHEDULE DATA & RENDER
   =========================== */
const classes = [
  { day: 'mon', dayLabel: 'Mon', time: '6:00 AM',  name: 'Morning Vinyasa',     trainer: 'Maya Chen',      type: 'yoga' },
  { day: 'mon', dayLabel: 'Mon', time: '9:00 AM',  name: 'Core Pilates',        trainer: 'Sofia Andersen', type: 'pilates' },
  { day: 'mon', dayLabel: 'Mon', time: '12:00 PM', name: 'Strength Fundamentals', trainer: 'James Rivera', type: 'strength' },
  { day: 'mon', dayLabel: 'Mon', time: '6:30 PM',  name: 'Power Flow Yoga',     trainer: 'Priya Nair',     type: 'yoga' },
  { day: 'tue', dayLabel: 'Tue', time: '7:00 AM',  name: 'Reformer Pilates',    trainer: 'Sofia Andersen', type: 'pilates' },
  { day: 'tue', dayLabel: 'Tue', time: '5:30 PM',  name: 'HIIT Strength',       trainer: 'Marcus Bell',    type: 'strength' },
  { day: 'tue', dayLabel: 'Tue', time: '7:00 PM',  name: 'Yin Yoga',            trainer: 'Maya Chen',      type: 'yoga' },
  { day: 'wed', dayLabel: 'Wed', time: '6:00 AM',  name: 'Mobility & Strength', trainer: 'Leo Tanaka',     type: 'strength' },
  { day: 'wed', dayLabel: 'Wed', time: '10:00 AM', name: 'Gentle Yoga',         trainer: 'Priya Nair',     type: 'yoga' },
  { day: 'wed', dayLabel: 'Wed', time: '6:30 PM',  name: 'Mat Pilates',         trainer: 'Sofia Andersen', type: 'pilates' },
  { day: 'thu', dayLabel: 'Thu', time: '7:00 AM',  name: 'Sunrise Yoga',        trainer: 'Maya Chen',      type: 'yoga' },
  { day: 'thu', dayLabel: 'Thu', time: '12:00 PM', name: 'Pilates Fusion',      trainer: 'Priya Nair',     type: 'pilates' },
  { day: 'thu', dayLabel: 'Thu', time: '5:30 PM',  name: 'Functional Strength', trainer: 'James Rivera',   type: 'strength' },
  { day: 'fri', dayLabel: 'Fri', time: '6:00 AM',  name: 'Flow Yoga',           trainer: 'Priya Nair',     type: 'yoga' },
  { day: 'fri', dayLabel: 'Fri', time: '9:00 AM',  name: 'Core & More Pilates', trainer: 'Sofia Andersen', type: 'pilates' },
  { day: 'fri', dayLabel: 'Fri', time: '6:00 PM',  name: 'Weekend Warrior Strength', trainer: 'Marcus Bell', type: 'strength' },
  { day: 'sat', dayLabel: 'Sat', time: '8:00 AM',  name: 'Community Yoga',      trainer: 'Maya Chen',      type: 'yoga' },
  { day: 'sat', dayLabel: 'Sat', time: '10:00 AM', name: 'Strength & Mobility', trainer: 'Leo Tanaka',     type: 'strength' },
  { day: 'sat', dayLabel: 'Sat', time: '11:30 AM', name: 'Weekend Pilates',     trainer: 'Sofia Andersen', type: 'pilates' },
  { day: 'sun', dayLabel: 'Sun', time: '9:00 AM',  name: 'Restorative Yoga',    trainer: 'Priya Nair',     type: 'yoga' },
  { day: 'sun', dayLabel: 'Sun', time: '10:30 AM', name: 'Light Strength',      trainer: 'James Rivera',   type: 'strength' },
];

const scheduleTable = document.getElementById('scheduleTable');

const renderSchedule = (filter) => {
  const filtered = filter === 'all' ? classes : classes.filter(c => c.day === filter);
  scheduleTable.innerHTML = filtered.map(c => `
    <div class="schedule-row" data-day="${c.day}">
      <span class="schedule-time">${c.time}</span>
      <div class="schedule-info">
        <div class="schedule-class">${c.name}</div>
        <div class="schedule-trainer">${c.trainer}</div>
      </div>
      <span class="schedule-day">${c.dayLabel}</span>
      <span class="schedule-type schedule-type--${c.type}">${c.type.charAt(0).toUpperCase() + c.type.slice(1)}</span>
    </div>
  `).join('');
};

renderSchedule('all');

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderSchedule(btn.dataset.day);
  });
});

/* ===========================
   SCROLL-IN ANIMATIONS
   =========================== */
const animateEls = document.querySelectorAll(
  '.class-card, .trainer-card, .testimonial, .pricing-card, .philosophy__copy, .philosophy__media, .stat'
);

const appearObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      appearObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

const style = document.createElement('style');
style.textContent = `
  .class-card, .trainer-card, .testimonial, .pricing-card,
  .philosophy__copy, .philosophy__media {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.55s cubic-bezier(0.16,1,0.3,1),
                transform 0.55s cubic-bezier(0.16,1,0.3,1);
  }
  .class-card.visible, .trainer-card.visible, .testimonial.visible,
  .pricing-card.visible, .philosophy__copy.visible, .philosophy__media.visible {
    opacity: 1;
    transform: translateY(0);
  }
  .class-card:nth-child(2), .trainer-card:nth-child(2), .testimonial:nth-child(2) { transition-delay: 0.08s; }
  .class-card:nth-child(3), .trainer-card:nth-child(3), .testimonial:nth-child(3) { transition-delay: 0.16s; }
  .trainer-card:nth-child(4) { transition-delay: 0.08s; }
  .trainer-card:nth-child(5) { transition-delay: 0.16s; }
  .trainer-card:nth-child(6) { transition-delay: 0.24s; }
  .pricing-card:nth-child(2) { transition-delay: 0.08s; }
  .pricing-card:nth-child(3) { transition-delay: 0.16s; }
`;
document.head.appendChild(style);

animateEls.forEach(el => appearObserver.observe(el));
