/* requires content.js to be loaded first */

const TABS = ['overview','paper','method','results','authors'];
let active = 'overview';

/* tabs */
function go(tab) {
  active = tab;
  window.scrollTo(0, 0);
  TABS.forEach(t => {
    document.querySelector(`[data-tab="${t}"]`).classList.toggle('active', t === tab);
    document.getElementById('tab-' + t).classList.toggle('active', t === tab);
  });
}

/* clipboard */
function copy(id) {
  const text = document.getElementById(id).textContent;
  navigator.clipboard.writeText(text.trim()).then(() => toast('Copied!')).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = text; document.body.appendChild(ta); ta.select();
    document.execCommand('copy'); ta.remove();
    toast('Copied!');
  });
}

function toast(msg) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), 1600);
}

/* cite dropdown */
function copyBibTeXHero(btn) {
  const text = document.getElementById('cite-bib').innerText;
  navigator.clipboard.writeText(text).then(() => {
    const origHTML = btn.innerHTML;
    const icon = document.createElement('i');
    icon.className = 'fa-solid fa-check cite-icon';
    btn.textContent = '';
    btn.appendChild(icon);
    btn.appendChild(document.createTextNode('BibTeX copied'));
    setTimeout(() => { btn.innerHTML = origHTML; }, 2000);
  });
}

/* pdf preview */
function expandPdf() {
  if (LINKS.paper === '#') return;
  document.getElementById('pdf-modal').style.display = 'block';
  document.getElementById('pdf-modal-frame').src = LINKS.paper;
  document.body.style.overflow = 'hidden';
}

function closePdf() {
  document.getElementById('pdf-modal').style.display = 'none';
  document.getElementById('pdf-modal-frame').src = '';
  document.body.style.overflow = '';
}

function initPdfPreview() {
  if (LINKS.paper === '#') return;
  const frame = document.getElementById('pdf-frame');
  if (frame) frame.src = LINKS.paper;
}

/* stage lights pointer tracking */
function initStageLights() {
  const stage = document.querySelector('.theater-stage');
  if (!stage) return;
  const beamL = stage.querySelector('.sl-beam-l');
  const beamR = stage.querySelector('.sl-beam-r');
  stage.addEventListener('pointermove', function(e) {
    const r = stage.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    if (beamL) { beamL.style.animationPlayState = 'paused'; beamL.style.transform = 'rotate(' + (x * 14) + 'deg)'; }
    if (beamR) { beamR.style.animationPlayState = 'paused'; beamR.style.transform = 'rotate(' + (x * -14) + 'deg)'; }
  });
  stage.addEventListener('pointerleave', function() {
    if (beamL) { beamL.style.animationPlayState = ''; beamL.style.transform = ''; }
    if (beamR) { beamR.style.animationPlayState = ''; beamR.style.transform = ''; }
  });
}

/* tool cell interactions */
function initToolCells() {
  const isTouch = window.matchMedia('(hover: none)').matches;

  document.querySelectorAll('.tool-cell').forEach(cell => {
    if (isTouch) {
      cell.addEventListener('click', () => window.open(LINKS.artifacts, '_blank', 'noopener,noreferrer'));
    } else {
      cell.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          window.open(LINKS.artifacts, '_blank', 'noopener,noreferrer');
        }
      });
    }
  });
}

/* init */
document.addEventListener('DOMContentLoaded', () => {
  /* wire tabs */
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => go(btn.dataset.tab));
  });

  /* wire buttons (replaces onclick attributes) */
  document.getElementById('btn-see-results')?.addEventListener('click', () => go('results'));
  document.getElementById('cite-copy-hero')?.addEventListener('click', function() { copyBibTeXHero(this); });
  document.getElementById('cite-copy-bib')?.addEventListener('click', () => copy('cite-bib'));
  document.getElementById('pdf-modal-close')?.addEventListener('click', closePdf);

  /* wire all links from LINKS in content.js — update there, not here */
  [
    ['nav-artifacts',        LINKS.artifacts],
    ['nav-github',           LINKS.github],
    ['nav-paper',            LINKS.arxiv],
    ['paper-pdf',            LINKS.paper],
    ['paper-github',         LINKS.github],
    ['paper-artifacts',      LINKS.artifacts],
    ['pdf-newtab',           LINKS.paper],
    ['figcaption-artifacts', LINKS.artifacts],
    ['authors-github',       LINKS.github],
    ['footer-paper',         LINKS.paper],
  ].forEach(([id, url]) => {
    const el = document.getElementById(id);
    if (el) el.href = url;
  });

  /* close cite dropdown on outside click */
  document.addEventListener('click', () => {
    const d = document.getElementById('cite-dropdown');
    if (d) d.style.display = 'none';
  });

  /* set tab bar top to match nav height */
  const nav = document.querySelector('.nav');
  const tabBar = document.getElementById('tab-bar');
  if (nav && tabBar) tabBar.style.top = nav.offsetHeight + 'px';

  /* close pdf modal on Escape */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closePdf();
  });

  initPdfPreview();
  initStageLights();
  initToolCells();
  go('overview');
});
