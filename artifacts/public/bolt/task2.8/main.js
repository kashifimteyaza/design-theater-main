import './style.css'

// Privacy toggle
const privacyBtn = document.getElementById('privacy-btn');
const privacyNotice = document.getElementById('privacy-notice');
const main = document.querySelector('.main');

let isPrivate = false;

privacyBtn?.addEventListener('click', () => {
  isPrivate = !isPrivate;
  privacyBtn.setAttribute('aria-pressed', String(isPrivate));
  main?.classList.toggle('privacy-blur', isPrivate);

  const eyeIcon = privacyBtn.querySelector('.eye-icon');
  const eyeOffIcon = privacyBtn.querySelector('.eye-off-icon');
  const privacyLabel = privacyBtn.querySelector('.privacy-label');

  if (isPrivate) {
    eyeIcon.style.display = 'none';
    eyeOffIcon.style.display = '';
    privacyLabel.textContent = 'Show';
    if (privacyNotice) privacyNotice.style.display = 'flex';
  } else {
    eyeIcon.style.display = '';
    eyeOffIcon.style.display = 'none';
    privacyLabel.textContent = 'Hide';
    if (privacyNotice) privacyNotice.style.display = 'none';
  }
});

// Animate needle on load — score 612 on scale 300–850
function scoreToNeedleAngle(score) {
  const pct = Math.min(1, Math.max(0, (score - 300) / 550));
  return -90 + pct * 180;
}

const needleGroup = document.getElementById('needle-group');
const targetAngle = scoreToNeedleAngle(612);

if (needleGroup) {
  const duration = 1400;
  const startTime = performance.now();

  function easeOutBack(t) {
    const c1 = 1.70158, c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  }

  function animateNeedle(now) {
    const elapsed = now - startTime;
    const t = Math.min(elapsed / duration, 1);
    const angle = -90 + easeOutBack(t) * (targetAngle + 90);
    needleGroup.setAttribute('transform', `rotate(${angle.toFixed(2)}, 100, 100)`);
    if (t < 1) requestAnimationFrame(animateNeedle);
  }

  setTimeout(() => requestAnimationFrame(animateNeedle), 300);
}

// Score number count-up
const scoreEl = document.getElementById('score-value');
if (scoreEl) {
  const startVal = 560, target = 612, duration = 1200;
  const startTime = performance.now() + 300;

  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

  function animateScore(now) {
    if (now < startTime) { requestAnimationFrame(animateScore); return; }
    const t = Math.min((now - startTime) / duration, 1);
    scoreEl.textContent = Math.round(startVal + easeOut(t) * (target - startVal));
    if (t < 1) requestAnimationFrame(animateScore);
    else scoreEl.textContent = target;
  }

  requestAnimationFrame(animateScore);
}

// Bottom nav active state
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelectorAll('.nav-item').forEach(n => {
      n.classList.remove('active');
      n.removeAttribute('aria-current');
    });
    item.classList.add('active');
    item.setAttribute('aria-current', 'page');
  });
});

// Step action buttons
document.querySelectorAll('.step-action-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const original = btn.textContent;
    btn.textContent = '...';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = original;
      btn.disabled = false;
    }, 800);
  });
});
