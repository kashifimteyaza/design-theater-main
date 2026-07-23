import './style.css'

// --- Navigation scroll state ---
const nav = document.getElementById('nav')
const mobileToggle = document.getElementById('mobileToggle')
const mobileMenu = document.getElementById('mobileMenu')

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20)
}, { passive: true })

mobileToggle.addEventListener('click', () => {
  const expanded = mobileToggle.getAttribute('aria-expanded') === 'true'
  mobileToggle.setAttribute('aria-expanded', String(!expanded))
  mobileMenu.setAttribute('aria-hidden', String(expanded))
})

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileToggle.setAttribute('aria-expanded', 'false')
    mobileMenu.setAttribute('aria-hidden', 'true')
  })
})

// --- Hero background: radial scan line animation ---
const scanCanvas = document.getElementById('scanCanvas')
if (scanCanvas) {
  const ctx = scanCanvas.getContext('2d')
  let angle = 0
  let animFrame

  function resizeScanCanvas() {
    scanCanvas.width = scanCanvas.offsetWidth
    scanCanvas.height = scanCanvas.offsetHeight
  }

  function drawScan() {
    const w = scanCanvas.width
    const h = scanCanvas.height
    const cx = w * 0.65
    const cy = h * 0.45
    const maxR = Math.hypot(cx, cy) * 1.1

    ctx.clearRect(0, 0, w, h)

    // Concentric rings
    for (let r = 60; r < maxR; r += 80) {
      ctx.beginPath()
      ctx.arc(cx, cy, r, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(0,184,196,${0.06 - r / maxR * 0.04})`
      ctx.lineWidth = 1
      ctx.stroke()
    }

    // Rotating scan line
    const sweepLen = Math.PI * 0.6
    const gradient = ctx.createConicalGradient
      ? null
      : null

    for (let i = 0; i < 60; i++) {
      const t = i / 60
      const a = angle - sweepLen * t
      const x = cx + Math.cos(a) * maxR
      const y = cy + Math.sin(a) * maxR
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.lineTo(x, y)
      ctx.strokeStyle = `rgba(0,184,196,${0.22 * (1 - t) * (1 - t)})`
      ctx.lineWidth = 1.5
      ctx.stroke()
    }

    // Scan line leading edge
    ctx.beginPath()
    ctx.moveTo(cx, cy)
    ctx.lineTo(cx + Math.cos(angle) * maxR, cy + Math.sin(angle) * maxR)
    ctx.strokeStyle = 'rgba(0,184,196,0.5)'
    ctx.lineWidth = 1.5
    ctx.stroke()

    // Center dot
    ctx.beginPath()
    ctx.arc(cx, cy, 3, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(0,184,196,0.7)'
    ctx.fill()

    angle += 0.008
    animFrame = requestAnimationFrame(drawScan)
  }

  const ro = new ResizeObserver(() => {
    resizeScanCanvas()
  })
  ro.observe(scanCanvas)
  resizeScanCanvas()
  drawScan()
}

// --- CT scan canvas: simulated chest CT with AI bounding boxes ---
const ctCanvas = document.getElementById('ctCanvas')
if (ctCanvas) {
  const ctx = ctCanvas.getContext('2d')

  function drawCTScan() {
    const w = ctCanvas.width
    const h = ctCanvas.height

    // Background — black void of CT
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, w, h)

    // Chest cavity shape (ellipse)
    const chestGrad = ctx.createRadialGradient(w * 0.5, h * 0.5, 0, w * 0.5, h * 0.5, w * 0.42)
    chestGrad.addColorStop(0, 'rgba(40,40,40,1)')
    chestGrad.addColorStop(0.5, 'rgba(25,25,25,1)')
    chestGrad.addColorStop(0.85, 'rgba(12,12,12,1)')
    chestGrad.addColorStop(1, 'rgba(0,0,0,0)')

    ctx.save()
    ctx.scale(1, 0.78)
    ctx.beginPath()
    ctx.arc(w * 0.5, h * 0.5 / 0.78, w * 0.42, 0, Math.PI * 2)
    ctx.fillStyle = chestGrad
    ctx.fill()
    ctx.restore()

    // Spine (posterior)
    const spineGrad = ctx.createRadialGradient(w * 0.5, h * 0.82, 0, w * 0.5, h * 0.82, 28)
    spineGrad.addColorStop(0, 'rgba(200,200,200,0.9)')
    spineGrad.addColorStop(0.4, 'rgba(120,120,120,0.5)')
    spineGrad.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.beginPath()
    ctx.ellipse(w * 0.5, h * 0.82, 22, 18, 0, 0, Math.PI * 2)
    ctx.fillStyle = spineGrad
    ctx.fill()

    // Sternum (anterior)
    const sternumGrad = ctx.createRadialGradient(w * 0.5, h * 0.2, 0, w * 0.5, h * 0.2, 18)
    sternumGrad.addColorStop(0, 'rgba(180,180,180,0.7)')
    sternumGrad.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.beginPath()
    ctx.ellipse(w * 0.5, h * 0.2, 8, 14, 0, 0, Math.PI * 2)
    ctx.fillStyle = sternumGrad
    ctx.fill()

    // Lung fields
    function drawLung(cx, cy, rx, ry) {
      const lg = ctx.createRadialGradient(cx, cy, 0, cx, cy, rx)
      lg.addColorStop(0, 'rgba(8,8,8,1)')
      lg.addColorStop(0.6, 'rgba(5,5,5,1)')
      lg.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.save()
      ctx.beginPath()
      ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2)
      ctx.fillStyle = lg
      ctx.fill()
      ctx.restore()
    }

    drawLung(w * 0.3, h * 0.5, w * 0.14, h * 0.3)
    drawLung(w * 0.7, h * 0.5, w * 0.14, h * 0.3)

    // Pulmonary vasculature — fine bright lines
    ctx.save()
    ctx.globalAlpha = 0.4
    const vessels = [
      { x1: w * 0.5, y1: h * 0.5, x2: w * 0.28, y2: h * 0.35 },
      { x1: w * 0.5, y1: h * 0.5, x2: w * 0.22, y2: h * 0.55 },
      { x1: w * 0.5, y1: h * 0.5, x2: w * 0.32, y2: h * 0.68 },
      { x1: w * 0.5, y1: h * 0.5, x2: w * 0.72, y2: h * 0.35 },
      { x1: w * 0.5, y1: h * 0.5, x2: w * 0.78, y2: h * 0.55 },
      { x1: w * 0.5, y1: h * 0.5, x2: w * 0.68, y2: h * 0.68 },
    ]
    vessels.forEach(v => {
      ctx.beginPath()
      ctx.moveTo(v.x1, v.y1)
      ctx.lineTo(v.x2, v.y2)
      ctx.strokeStyle = 'rgba(180,180,180,0.3)'
      ctx.lineWidth = 1
      ctx.stroke()
    })
    ctx.restore()

    // Mediastinum / heart
    ctx.save()
    const heartGrad = ctx.createRadialGradient(w * 0.47, h * 0.52, 0, w * 0.47, h * 0.52, 60)
    heartGrad.addColorStop(0, 'rgba(55,55,55,0.9)')
    heartGrad.addColorStop(0.6, 'rgba(30,30,30,0.8)')
    heartGrad.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.beginPath()
    ctx.ellipse(w * 0.47, h * 0.52, 58, 52, -0.1, 0, Math.PI * 2)
    ctx.fillStyle = heartGrad
    ctx.fill()
    ctx.restore()

    // AI annotation: critical nodule RUL (right upper lobe, visible left side in axial view)
    const nodule1x = w * 0.33
    const nodule1y = h * 0.32

    // Nodule body
    const noduleGrad = ctx.createRadialGradient(nodule1x, nodule1y, 0, nodule1x, nodule1y, 12)
    noduleGrad.addColorStop(0, 'rgba(240,240,240,0.95)')
    noduleGrad.addColorStop(0.6, 'rgba(160,160,160,0.6)')
    noduleGrad.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.beginPath()
    ctx.arc(nodule1x, nodule1y, 10, 0, Math.PI * 2)
    ctx.fillStyle = noduleGrad
    ctx.fill()

    // Spicules
    ctx.save()
    ctx.globalAlpha = 0.5
    for (let i = 0; i < 8; i++) {
      const spAngle = (i / 8) * Math.PI * 2 + 0.2
      ctx.beginPath()
      ctx.moveTo(nodule1x + Math.cos(spAngle) * 8, nodule1y + Math.sin(spAngle) * 8)
      ctx.lineTo(nodule1x + Math.cos(spAngle) * 18, nodule1y + Math.sin(spAngle) * 18)
      ctx.strokeStyle = 'rgba(200,200,200,0.7)'
      ctx.lineWidth = 0.8
      ctx.stroke()
    }
    ctx.restore()

    // Bounding box — critical (red)
    const box1Pad = 22
    ctx.save()
    ctx.strokeStyle = 'rgba(239,68,68,0.9)'
    ctx.lineWidth = 1.5
    ctx.setLineDash([4, 3])
    ctx.strokeRect(
      nodule1x - box1Pad, nodule1y - box1Pad,
      box1Pad * 2, box1Pad * 2
    )
    ctx.restore()

    // Label
    ctx.save()
    ctx.fillStyle = 'rgba(239,68,68,0.95)'
    ctx.fillRect(nodule1x - box1Pad, nodule1y - box1Pad - 18, 64, 16)
    ctx.fillStyle = '#fff'
    ctx.font = `500 9px 'JetBrains Mono', monospace`
    ctx.fillText('94% MAL', nodule1x - box1Pad + 4, nodule1y - box1Pad - 6)
    ctx.restore()

    // Nodule 2 — indeterminate, ground glass (LLL)
    const nodule2x = w * 0.66
    const nodule2y = h * 0.62

    const nodule2Grad = ctx.createRadialGradient(nodule2x, nodule2y, 0, nodule2x, nodule2y, 8)
    nodule2Grad.addColorStop(0, 'rgba(180,180,180,0.4)')
    nodule2Grad.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.beginPath()
    ctx.arc(nodule2x, nodule2y, 7, 0, Math.PI * 2)
    ctx.fillStyle = nodule2Grad
    ctx.fill()

    const box2Pad = 16
    ctx.save()
    ctx.strokeStyle = 'rgba(245,158,11,0.85)'
    ctx.lineWidth = 1.5
    ctx.setLineDash([3, 3])
    ctx.strokeRect(
      nodule2x - box2Pad, nodule2y - box2Pad,
      box2Pad * 2, box2Pad * 2
    )
    ctx.restore()

    ctx.save()
    ctx.fillStyle = 'rgba(245,158,11,0.9)'
    ctx.fillRect(nodule2x - box2Pad, nodule2y - box2Pad - 18, 58, 16)
    ctx.fillStyle = '#fff'
    ctx.font = `500 9px 'JetBrains Mono', monospace`
    ctx.fillText('67% IND', nodule2x - box2Pad + 4, nodule2y - box2Pad - 6)
    ctx.restore()

    // Measurement ruler line on nodule 1
    ctx.save()
    ctx.strokeStyle = 'rgba(0,184,196,0.7)'
    ctx.lineWidth = 1
    ctx.setLineDash([])
    const ruler = { x1: nodule1x - 8, x2: nodule1x + 8, y: nodule1y + 20 }
    ctx.beginPath()
    ctx.moveTo(ruler.x1, ruler.y - 4)
    ctx.lineTo(ruler.x1, ruler.y + 4)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(ruler.x1, ruler.y)
    ctx.lineTo(ruler.x2, ruler.y)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(ruler.x2, ruler.y - 4)
    ctx.lineTo(ruler.x2, ruler.y + 4)
    ctx.stroke()
    ctx.font = `400 9px 'JetBrains Mono', monospace`
    ctx.fillStyle = 'rgba(0,184,196,0.9)'
    ctx.fillText('8.3mm', ruler.x2 + 4, ruler.y + 3)
    ctx.restore()

    // Crosshair reticle
    const rx = w * 0.33
    const ry = h * 0.32
    ctx.save()
    ctx.globalAlpha = 0.25
    ctx.strokeStyle = '#00b8c4'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(rx - 30, ry)
    ctx.lineTo(rx - 14, ry)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(rx + 14, ry)
    ctx.lineTo(rx + 30, ry)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(rx, ry - 30)
    ctx.lineTo(rx, ry - 14)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(rx, ry + 14)
    ctx.lineTo(rx, ry + 30)
    ctx.stroke()
    ctx.restore()
  }

  drawCTScan()

  // Redraw on resize
  const ctRo = new ResizeObserver(() => {
    ctCanvas.width = ctCanvas.offsetWidth
    ctCanvas.height = ctCanvas.offsetHeight
    drawCTScan()
  })
  ctRo.observe(ctCanvas)
}

// --- Animate confidence gauge arcs ---
function animateGauges() {
  document.querySelectorAll('.confidence-gauge__arc').forEach(arc => {
    const gauge = arc.closest('.confidence-gauge')
    const value = parseInt(gauge.dataset.value || '0', 10)
    const circumference = 188.5
    const offset = circumference - (value / 100) * circumference
    arc.style.strokeDashoffset = offset
  })
}

// --- Animate counter numbers ---
function animateCount(el) {
  const target = parseFloat(el.dataset.count)
  const isFloat = String(target).includes('.')
  const duration = 1800
  const start = performance.now()

  function tick(now) {
    const elapsed = now - start
    const progress = Math.min(elapsed / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    const current = target * eased
    el.textContent = isFloat ? current.toFixed(1) : Math.round(current)
    if (progress < 1) requestAnimationFrame(tick)
  }

  requestAnimationFrame(tick)
}

// --- Intersection Observer for reveals and counters ---
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return

    entry.target.classList.add('visible')

    // Start counters
    entry.target.querySelectorAll('[data-count]').forEach(animateCount)

    // Start gauges
    if (entry.target.querySelector('.confidence-gauge__arc')) {
      setTimeout(animateGauges, 200)
    }

    observer.unobserve(entry.target)
  })
}, { threshold: 0.15 })

// Observe all sections and key elements
document.querySelectorAll(
  'section, .hero__stats, .viewer-demo, .evidence-card, .testimonial, .regulatory-strip, .workflow-step'
).forEach(el => {
  el.classList.add('reveal')
  observer.observe(el)
})

// Trigger gauges if already visible on load
setTimeout(() => {
  const gaugeSection = document.querySelector('.viewer-demo')
  if (gaugeSection) {
    const rect = gaugeSection.getBoundingClientRect()
    if (rect.top < window.innerHeight) animateGauges()
  }
}, 300)

// --- Demo form submission ---
const demoForm = document.getElementById('demoForm')
const formSuccess = document.getElementById('formSuccess')
const submitBtn = document.getElementById('submitBtn')

if (demoForm) {
  demoForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const inputs = demoForm.querySelectorAll('[required]')
    let valid = true
    inputs.forEach(input => {
      if (!input.value.trim()) {
        valid = false
        input.style.borderColor = 'var(--status-critical)'
      } else {
        input.style.borderColor = ''
      }
    })

    if (!valid) return

    submitBtn.textContent = 'Submitting...'
    submitBtn.disabled = true

    setTimeout(() => {
      demoForm.querySelectorAll('.form-group').forEach(g => {
        g.style.display = 'none'
      })
      submitBtn.style.display = 'none'
      demoForm.querySelector('.demo-form__privacy').style.display = 'none'
      formSuccess.hidden = false
    }, 900)
  })

  // Clear error state on input
  demoForm.querySelectorAll('input, select').forEach(input => {
    input.addEventListener('input', () => {
      input.style.borderColor = ''
    })
  })
}
