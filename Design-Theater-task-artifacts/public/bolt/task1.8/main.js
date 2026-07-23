import './style.css';

// ============================================================
// TRANSLATIONS
// English and Spanish content for full bilingual support
// ============================================================
const TRANSLATIONS = {
  en: {
    skipNav: 'Skip to main content',
    skipSearch: 'Skip to search',
    emergencyLabel: 'EMERGENCY NOTICE:',
    emergencyText: 'Water service interruption in Zone 4 (Oak Ave to River Rd) today 9 AM–4 PM for emergency repairs. Affected residents: (951) 555-0911.',
    emergencyMore: 'Learn more',
    dismissAlert: 'Dismiss emergency alert',
    accessibilityLabel: 'Accessibility:',
    highContrast: 'High Contrast',
    cityName: 'City of Riverside',
    tagline: 'Serving Our Community',
    myAccount: 'My Account',
    contactUs: 'Contact Us',
    trackRequest: 'Track a Request',
    navPay: 'Pay',
    navReport: 'Report',
    navApply: 'Apply',
    navFind: 'Find',
    navTrack: 'Track',
    navMore: 'More Services',
    payWater: 'Water Bill',
    payParking: 'Parking Ticket',
    payTax: 'Business Tax',
    payPermit: 'Permit Fees',
    payRent: 'Rent (City Housing)',
    payFines: 'Court Fines',
    reportPothole: 'Pothole',
    reportGraffiti: 'Graffiti',
    reportLight: 'Broken Street Light',
    reportDump: 'Illegal Dumping',
    reportNoise: 'Noise Complaint',
    reportCode: 'Code Violation',
    applyBuild: 'Building Permit',
    applyBiz: 'Business License',
    applyEvent: 'Special Event Permit',
    applyHousing: 'Affordable Housing',
    applyJob: 'City Jobs',
    applyNeighbor: 'Neighborhood Grant',
    findPark: 'Parks & Recreation',
    findLibrary: 'Library Hours',
    findRecycle: 'Trash & Recycling',
    findCouncil: 'Council Meetings',
    findElection: 'Voting & Elections',
    findTransit: 'Transit Routes',
    moreDepts: 'City Departments',
    moreMayor: "Mayor's Office",
    moreBudget: 'City Budget',
    moreAgenda: 'Agendas & Minutes',
    morePublicRecords: 'Public Records',
    moreMaps: 'GIS Maps',
    heroHeading: 'How can we help you today?',
    heroSub: 'Find city services, pay bills, report issues, and more — all in one place.',
    searchLabel: 'Search city services',
    searchPlaceholder: 'Search — e.g. pay water bill, report pothole, building permit...',
    searchBtn: 'Search',
    popularLabel: 'Popular:',
    pop1: 'Pay water bill',
    pop2: 'Report a pothole',
    pop3: 'Building permits',
    pop4: 'Park programs',
    pop5: 'Trash pickup schedule',
    quickActionsHeading: 'Common Tasks',
    quickActionsSub: 'The six tasks residents use most — no searching required.',
    qaWater: 'Pay Water Bill',
    qaWaterDesc: 'Online payment, due dates, account lookup',
    qaPothole: 'Report a Pothole',
    qaPotholeDesc: 'Submit with photo & GPS location',
    qaPermit: 'Building Permit',
    qaPermitDesc: 'Apply, check status, schedule inspection',
    qaTrash: 'Trash & Recycling',
    qaTrashDesc: 'Pickup schedule, holiday changes, bulk pickup',
    qaParks: 'Park Programs',
    qaParksDesc: 'Register for classes, reserve facilities',
    qaBiz: 'Business License',
    qaBizDesc: 'New license, renewal, or update your info',
    trackerHeading: 'Track Your Service Request',
    trackerBody: 'Enter your confirmation number to check the status of a report, permit application, or service request.',
    trackerLabel: 'Request confirmation number',
    trackerPlaceholder: 'e.g. RVS-2024-00438',
    trackerBtn: 'Check Status',
    trackerHint: 'Found on your email confirmation receipt from the City of Riverside.',
    situationsHeading: "I'm a resident who needs to...",
    situationsSub: 'Step-by-step guides for common life events — no jargon, no wrong turns.',
    sitMoving: 'Move into Riverside',
    sitMovingS1: 'Set up water service',
    sitMovingS2: 'Register to vote',
    sitMovingS3: 'Find your trash schedule',
    sitMovingS4: 'Locate nearest library & park',
    situationCta: 'Full guide →',
    sitBuild: 'Build or Renovate',
    sitBuildS1: 'Check zoning requirements',
    sitBuildS2: 'Apply for building permit',
    sitBuildS3: 'Schedule plan review',
    sitBuildS4: 'Request inspection',
    sitBizOpen: 'Open a Business',
    sitBizS1: 'Choose business structure',
    sitBizS2: 'Apply for business license',
    sitBizS3: 'Zoning & land use check',
    sitBizS4: 'Health & safety permits',
    sitSenior: 'Senior Services',
    sitSeniorS1: 'Senior center programs',
    sitSeniorS2: 'Transportation assistance',
    sitSeniorS3: 'Utility bill assistance',
    sitSeniorS4: 'Meals & nutrition programs',
    newsHeading: 'City News & Updates',
    newsAll: 'All News →',
    badgeAlert: 'Alert',
    badgeUpdate: 'Update',
    badgeNotice: 'Notice',
    news1Heading: 'Water Main Repair – Zone 4',
    news1Date: 'April 29, 2026',
    news1Body: 'Emergency repairs are underway on Oak Ave. Service will be restored by 4 PM today.',
    news2Heading: 'Summer Recreation Registration Opens May 1',
    news2Date: 'April 27, 2026',
    news2Body: 'Register early for swim lessons, youth sports leagues, and summer camp programs.',
    news3Heading: 'City Council Meeting – May 6, 6 PM',
    news3Date: 'April 25, 2026',
    news3Body: 'Regular city council session. Agenda includes FY2027 budget and infrastructure plan.',
    readMore: 'Read more',
    deptsHeading: 'City Departments',
    deptsSub: 'Need to contact a department directly? Find them here.',
    deptWater: 'Water & Utilities',
    deptPublicWorks: 'Public Works',
    deptPlanning: 'Planning & Development',
    deptFire: 'Fire Department',
    deptPolice: 'Police Department',
    deptParks: 'Parks & Recreation',
    deptLibrary: 'Library Services',
    deptFinance: 'Finance & Budget',
    deptHR: 'Human Resources',
    deptCityClerk: 'City Clerk',
    deptEcon: 'Economic Development',
    deptHealth: 'Community Health',
    footerAddress: '3900 Main Street, Riverside, CA 92522 · (951) 826-5311',
    footerHours: 'City Hall Hours: Mon–Fri, 8 AM – 5 PM',
    footerServices: 'Services',
    footerGov: 'Government',
    footerHelp: 'Help & Contact',
    footerMayor: "Mayor's Office",
    footerCouncil: 'City Council',
    footerBudget: 'Budget & Finance',
    footerTransparency: 'Transparency Portal',
    footerFAQ: 'FAQs',
    footerAccessibility: 'Accessibility',
    footerPrivacy: 'Privacy Policy',
    footerCopy: '© 2026 City of Riverside. All rights reserved.',
    footerADA: 'This website is committed to ADA compliance.',
    reportBarrier: 'Report an accessibility barrier.',
  },
  es: {
    skipNav: 'Saltar al contenido principal',
    skipSearch: 'Saltar a la búsqueda',
    emergencyLabel: 'AVISO DE EMERGENCIA:',
    emergencyText: 'Interrupción del servicio de agua en la Zona 4 (Oak Ave a River Rd) hoy de 9 AM a 4 PM por reparaciones de emergencia. Residentes afectados: (951) 555-0911.',
    emergencyMore: 'Más información',
    dismissAlert: 'Cerrar alerta de emergencia',
    accessibilityLabel: 'Accesibilidad:',
    highContrast: 'Alto Contraste',
    cityName: 'Ciudad de Riverside',
    tagline: 'Sirviendo a Nuestra Comunidad',
    myAccount: 'Mi Cuenta',
    contactUs: 'Contáctenos',
    trackRequest: 'Rastrear Solicitud',
    navPay: 'Pagar',
    navReport: 'Reportar',
    navApply: 'Solicitar',
    navFind: 'Encontrar',
    navTrack: 'Rastrear',
    navMore: 'Más Servicios',
    payWater: 'Factura de Agua',
    payParking: 'Multa de Estacionamiento',
    payTax: 'Impuesto de Negocios',
    payPermit: 'Cuotas de Permisos',
    payRent: 'Renta (Vivienda Municipal)',
    payFines: 'Multas del Tribunal',
    reportPothole: 'Bache',
    reportGraffiti: 'Grafiti',
    reportLight: 'Foco Descompuesto',
    reportDump: 'Tiradero Ilegal',
    reportNoise: 'Queja por Ruido',
    reportCode: 'Violación de Código',
    applyBuild: 'Permiso de Construcción',
    applyBiz: 'Licencia de Negocios',
    applyEvent: 'Permiso para Evento Especial',
    applyHousing: 'Vivienda Accesible',
    applyJob: 'Empleos Municipales',
    applyNeighbor: 'Beca para el Vecindario',
    findPark: 'Parques y Recreación',
    findLibrary: 'Horarios de Biblioteca',
    findRecycle: 'Basura y Reciclaje',
    findCouncil: 'Sesiones del Ayuntamiento',
    findElection: 'Votación y Elecciones',
    findTransit: 'Rutas de Transporte',
    moreDepts: 'Departamentos Municipales',
    moreMayor: 'Oficina del Alcalde',
    moreBudget: 'Presupuesto Municipal',
    moreAgenda: 'Agendas y Actas',
    morePublicRecords: 'Registros Públicos',
    moreMaps: 'Mapas GIS',
    heroHeading: '¿Cómo podemos ayudarle hoy?',
    heroSub: 'Encuentre servicios municipales, pague facturas, reporte problemas y más — todo en un solo lugar.',
    searchLabel: 'Buscar servicios municipales',
    searchPlaceholder: 'Buscar — p. ej. pagar factura de agua, reportar bache, permiso de construcción...',
    searchBtn: 'Buscar',
    popularLabel: 'Popular:',
    pop1: 'Pagar factura de agua',
    pop2: 'Reportar un bache',
    pop3: 'Permisos de construcción',
    pop4: 'Programas en parques',
    pop5: 'Horario de recolección de basura',
    quickActionsHeading: 'Tareas Frecuentes',
    quickActionsSub: 'Las seis tareas más usadas por los residentes — sin búsqueda necesaria.',
    qaWater: 'Pagar Factura de Agua',
    qaWaterDesc: 'Pago en línea, fechas de vencimiento, consulta de cuenta',
    qaPothole: 'Reportar un Bache',
    qaPotholeDesc: 'Envíe con foto y ubicación GPS',
    qaPermit: 'Permiso de Construcción',
    qaPermitDesc: 'Solicitar, verificar estado, programar inspección',
    qaTrash: 'Basura y Reciclaje',
    qaTrashDesc: 'Horario de recolección, cambios por días festivos, recolección especial',
    qaParks: 'Programas en Parques',
    qaParksDesc: 'Inscríbase a clases, reserve instalaciones',
    qaBiz: 'Licencia de Negocios',
    qaBizDesc: 'Nueva licencia, renovación o actualizar su información',
    trackerHeading: 'Rastrear Su Solicitud de Servicio',
    trackerBody: 'Ingrese su número de confirmación para verificar el estado de un reporte, solicitud de permiso o solicitud de servicio.',
    trackerLabel: 'Número de confirmación de solicitud',
    trackerPlaceholder: 'p. ej. RVS-2024-00438',
    trackerBtn: 'Verificar Estado',
    trackerHint: 'Disponible en el recibo de confirmación por correo electrónico de la Ciudad de Riverside.',
    situationsHeading: 'Soy residente y necesito...',
    situationsSub: 'Guías paso a paso para situaciones comunes — sin términos complicados, sin confusión.',
    sitMoving: 'Mudarme a Riverside',
    sitMovingS1: 'Activar servicio de agua',
    sitMovingS2: 'Registrarme para votar',
    sitMovingS3: 'Encontrar horario de recolección de basura',
    sitMovingS4: 'Ubicar biblioteca y parque más cercanos',
    situationCta: 'Guía completa →',
    sitBuild: 'Construir o Remodelar',
    sitBuildS1: 'Verificar requisitos de zonificación',
    sitBuildS2: 'Solicitar permiso de construcción',
    sitBuildS3: 'Programar revisión de planos',
    sitBuildS4: 'Solicitar inspección',
    sitBizOpen: 'Abrir un Negocio',
    sitBizS1: 'Elegir estructura del negocio',
    sitBizS2: 'Solicitar licencia de negocios',
    sitBizS3: 'Verificación de zonificación y uso de suelo',
    sitBizS4: 'Permisos de salud y seguridad',
    sitSenior: 'Servicios para Adultos Mayores',
    sitSeniorS1: 'Programas en centros para mayores',
    sitSeniorS2: 'Asistencia de transporte',
    sitSeniorS3: 'Asistencia con facturas de servicios',
    sitSeniorS4: 'Programas de alimentación y nutrición',
    newsHeading: 'Noticias y Actualizaciones Municipales',
    newsAll: 'Todas las noticias →',
    badgeAlert: 'Alerta',
    badgeUpdate: 'Actualización',
    badgeNotice: 'Aviso',
    news1Heading: 'Reparación de tubería principal – Zona 4',
    news1Date: '29 de abril de 2026',
    news1Body: 'Se realizan reparaciones de emergencia en Oak Ave. El servicio se restablecerá a las 4 PM de hoy.',
    news2Heading: 'Inscripción de recreación de verano abre el 1 de mayo',
    news2Date: '27 de abril de 2026',
    news2Body: 'Inscríbase con anticipación para clases de natación, ligas deportivas juveniles y campamentos de verano.',
    news3Heading: 'Sesión del Ayuntamiento – 6 de mayo, 6 PM',
    news3Date: '25 de abril de 2026',
    news3Body: 'Sesión ordinaria del ayuntamiento. La agenda incluye el presupuesto FY2027 y el plan de infraestructura.',
    readMore: 'Leer más',
    deptsHeading: 'Departamentos Municipales',
    deptsSub: '¿Necesita contactar un departamento directamente? Encuéntrelos aquí.',
    deptWater: 'Agua y Servicios Públicos',
    deptPublicWorks: 'Obras Públicas',
    deptPlanning: 'Planificación y Desarrollo',
    deptFire: 'Departamento de Bomberos',
    deptPolice: 'Departamento de Policía',
    deptParks: 'Parques y Recreación',
    deptLibrary: 'Servicios de Biblioteca',
    deptFinance: 'Finanzas y Presupuesto',
    deptHR: 'Recursos Humanos',
    deptCityClerk: 'Secretaría Municipal',
    deptEcon: 'Desarrollo Económico',
    deptHealth: 'Salud Comunitaria',
    footerAddress: '3900 Main Street, Riverside, CA 92522 · (951) 826-5311',
    footerHours: 'Horario del Ayuntamiento: Lun–Vie, 8 AM – 5 PM',
    footerServices: 'Servicios',
    footerGov: 'Gobierno',
    footerHelp: 'Ayuda y Contacto',
    footerMayor: 'Oficina del Alcalde',
    footerCouncil: 'Ayuntamiento',
    footerBudget: 'Presupuesto y Finanzas',
    footerTransparency: 'Portal de Transparencia',
    footerFAQ: 'Preguntas Frecuentes',
    footerAccessibility: 'Accesibilidad',
    footerPrivacy: 'Política de Privacidad',
    footerCopy: '© 2026 Ciudad de Riverside. Todos los derechos reservados.',
    footerADA: 'Este sitio web cumple con las normas de accesibilidad ADA.',
    reportBarrier: 'Reportar una barrera de accesibilidad.',
  },
};

// ============================================================
// SEARCH DATA — indexed tasks for autocomplete
// ============================================================
const SEARCH_INDEX = [
  { icon: '💧', label: 'Pay Water Bill', category: 'Pay', url: '#' },
  { icon: '🅿', label: 'Pay Parking Ticket', category: 'Pay', url: '#' },
  { icon: '🏗', label: 'Apply for Building Permit', category: 'Apply', url: '#' },
  { icon: '🚧', label: 'Report a Pothole', category: 'Report', url: '#' },
  { icon: '🎨', label: 'Report Graffiti', category: 'Report', url: '#' },
  { icon: '💡', label: 'Report Broken Street Light', category: 'Report', url: '#' },
  { icon: '♻', label: 'Trash & Recycling Schedule', category: 'Find', url: '#' },
  { icon: '🌳', label: 'Park Programs & Registration', category: 'Find', url: '#' },
  { icon: '🏢', label: 'Business License', category: 'Apply', url: '#' },
  { icon: '🗳', label: 'Voter Registration', category: 'Find', url: '#' },
  { icon: '📅', label: 'City Council Meeting Schedule', category: 'Find', url: '#' },
  { icon: '🔍', label: 'Track Service Request', category: 'Track', url: '#track-request' },
  { icon: '💼', label: 'City Job Openings', category: 'Apply', url: '#' },
  { icon: '🚌', label: 'Transit Routes & Schedules', category: 'Find', url: '#' },
  { icon: '📚', label: 'Library Hours & Programs', category: 'Find', url: '#' },
  { icon: '💰', label: 'Pay Business Tax', category: 'Pay', url: '#' },
  { icon: '🏠', label: 'Affordable Housing Applications', category: 'Apply', url: '#' },
  { icon: '🌿', label: 'Senior Center Programs', category: 'Find', url: '#' },
  { icon: '📋', label: 'Public Records Request', category: 'Find', url: '#' },
  { icon: '🗺', label: 'GIS Maps & Zoning', category: 'Find', url: '#' },
];

// Simulated service request statuses for demo
const MOCK_REQUESTS = {
  'RVS-2026-00438': {
    status: 'In Progress',
    type: 'Pothole Repair',
    submitted: 'April 22, 2026',
    updated: 'April 28, 2026',
    detail: 'Crew scheduled for inspection the week of May 4.',
  },
  'RVS-2026-00201': {
    status: 'Completed',
    type: 'Graffiti Removal',
    submitted: 'April 10, 2026',
    updated: 'April 15, 2026',
    detail: 'Graffiti removed from 4502 Main St. Thank you for reporting.',
  },
  'RVS-2026-00812': {
    status: 'Received',
    type: 'Street Light Outage',
    submitted: 'April 28, 2026',
    updated: 'April 29, 2026',
    detail: 'Request received and assigned to Public Works. Estimated response: 5 business days.',
  },
};

// ============================================================
// STATE
// ============================================================
let currentLang = localStorage.getItem('rv-lang') || 'en';
let currentTextSize = localStorage.getItem('rv-text-size') || 'normal';
let currentContrast = localStorage.getItem('rv-contrast') || 'normal';
let searchDebounceTimer = null;

// ============================================================
// i18n — apply translations to the DOM
// ============================================================
function applyTranslations(lang) {
  const t = TRANSLATIONS[lang];
  if (!t) return;

  document.documentElement.lang = lang;
  document.documentElement.setAttribute('data-lang', lang);
  document.title = lang === 'es'
    ? 'Ciudad de Riverside – Sitio Web Oficial'
    : 'City of Riverside – Official City Website';

  // Text content
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) el.textContent = t[key];
  });

  // Placeholder text
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (t[key] !== undefined) el.placeholder = t[key];
  });

  // aria-label
  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const key = el.getAttribute('data-i18n-aria');
    if (t[key] !== undefined) el.setAttribute('aria-label', t[key]);
  });
}

// ============================================================
// TEXT SIZE
// ============================================================
function setTextSize(size) {
  currentTextSize = size;
  document.documentElement.setAttribute('data-text-size', size);
  localStorage.setItem('rv-text-size', size);

  ['text-size-decrease', 'text-size-normal', 'text-size-increase'].forEach(id => {
    const btn = document.getElementById(id);
    if (!btn) return;
    const isActive = (
      (id === 'text-size-decrease' && size === 'small') ||
      (id === 'text-size-normal'   && size === 'normal') ||
      (id === 'text-size-increase' && size === 'large')
    );
    btn.setAttribute('aria-pressed', String(isActive));
    btn.classList.toggle('a11y-btn--active', isActive);
  });
}

// ============================================================
// HIGH CONTRAST
// ============================================================
function setContrast(mode) {
  currentContrast = mode;
  document.documentElement.setAttribute('data-contrast', mode);
  localStorage.setItem('rv-contrast', mode);
  const btn = document.getElementById('contrast-toggle');
  if (btn) {
    btn.setAttribute('aria-pressed', String(mode === 'high'));
    btn.classList.toggle('a11y-btn--active', mode === 'high');
  }
}

// ============================================================
// LANGUAGE SWITCH
// ============================================================
function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('rv-lang', lang);
  applyTranslations(lang);

  document.getElementById('lang-en').setAttribute('aria-pressed', String(lang === 'en'));
  document.getElementById('lang-es').setAttribute('aria-pressed', String(lang === 'es'));
  document.getElementById('lang-en').classList.toggle('a11y-btn--active', lang === 'en');
  document.getElementById('lang-es').classList.toggle('a11y-btn--active', lang === 'es');
}

// ============================================================
// EMERGENCY BANNER
// ============================================================
function initEmergencyBanner() {
  const btn = document.getElementById('dismiss-emergency');
  const banner = document.getElementById('emergency-banner');
  if (!btn || !banner) return;

  // If user already dismissed in this session, hide it
  if (sessionStorage.getItem('rv-emergency-dismissed')) {
    banner.classList.remove('emergency-banner--active');
    banner.style.display = 'none';
    return;
  }

  btn.addEventListener('click', () => {
    banner.classList.remove('emergency-banner--active');
    // Animate out
    banner.style.transition = 'max-height 0.3s ease, opacity 0.3s ease';
    banner.style.overflow = 'hidden';
    banner.style.maxHeight = banner.offsetHeight + 'px';
    requestAnimationFrame(() => {
      banner.style.maxHeight = '0';
      banner.style.opacity = '0';
    });
    setTimeout(() => { banner.style.display = 'none'; }, 320);
    sessionStorage.setItem('rv-emergency-dismissed', '1');
  });
}

// ============================================================
// NAVIGATION — task dropdowns & mobile menu
// ============================================================
function initNavigation() {
  const triggers = document.querySelectorAll('.main-nav__trigger[aria-expanded]');
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const nav = document.getElementById('main-nav');

  // Desktop dropdowns
  triggers.forEach(trigger => {
    const targetId = trigger.getAttribute('aria-controls');
    if (!targetId) return;
    const dropdown = document.getElementById(targetId);
    if (!dropdown) return;

    trigger.addEventListener('click', () => {
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';

      // Close all other dropdowns first
      triggers.forEach(other => {
        if (other !== trigger) {
          other.setAttribute('aria-expanded', 'false');
          const otherId = other.getAttribute('aria-controls');
          if (otherId) {
            const otherDrop = document.getElementById(otherId);
            if (otherDrop) otherDrop.hidden = true;
          }
        }
      });

      trigger.setAttribute('aria-expanded', String(!isOpen));
      dropdown.hidden = isOpen;
    });

    // Keyboard: close on Escape
    trigger.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        trigger.setAttribute('aria-expanded', 'false');
        dropdown.hidden = true;
        trigger.focus();
      }
    });
  });

  // Close dropdowns on outside click
  document.addEventListener('click', e => {
    const isInsideNav = e.target.closest('.main-nav__item');
    if (!isInsideNav) {
      triggers.forEach(trigger => {
        trigger.setAttribute('aria-expanded', 'false');
        const id = trigger.getAttribute('aria-controls');
        if (id) {
          const drop = document.getElementById(id);
          if (drop) drop.hidden = true;
        }
      });
    }
  });

  // Mobile menu toggle
  if (mobileToggle && nav) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', String(!isOpen));
      nav.classList.toggle('main-nav--open', !isOpen);
      // Prevent body scroll when menu is open
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });

    // Close on Escape key
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && nav.classList.contains('main-nav--open')) {
        mobileToggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('main-nav--open');
        document.body.style.overflow = '';
        mobileToggle.focus();
      }
    });
  }
}

// ============================================================
// SEARCH AUTOCOMPLETE
// ============================================================
function initSearch() {
  const input = document.getElementById('search-input');
  const resultsBox = document.getElementById('search-results');
  const form = document.getElementById('search-form');
  if (!input || !resultsBox || !form) return;

  let activeIndex = -1;
  let currentSuggestions = [];

  function showSuggestions(query) {
    if (!query || query.length < 2) {
      closeAutocomplete();
      return;
    }

    const q = query.toLowerCase();
    currentSuggestions = SEARCH_INDEX.filter(item =>
      item.label.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    ).slice(0, 6);

    if (currentSuggestions.length === 0) {
      closeAutocomplete();
      return;
    }

    resultsBox.innerHTML = currentSuggestions.map((item, i) =>
      `<div
        class="search-autocomplete-item"
        role="option"
        id="search-option-${i}"
        data-url="${item.url}"
        aria-selected="false"
        tabindex="-1"
      >
        <span class="search-autocomplete-item__icon" aria-hidden="true">${item.icon}</span>
        <span>${item.label}</span>
        <span style="margin-left:auto;font-size:0.7rem;color:#94a3b8;text-transform:uppercase;letter-spacing:0.05em">${item.category}</span>
      </div>`
    ).join('');

    resultsBox.hidden = false;
    input.setAttribute('aria-expanded', 'true');
    activeIndex = -1;

    // Click handlers on suggestions
    resultsBox.querySelectorAll('.search-autocomplete-item').forEach((el, i) => {
      el.addEventListener('mousedown', e => {
        e.preventDefault();
        selectSuggestion(i);
      });
    });
  }

  function selectSuggestion(i) {
    const item = currentSuggestions[i];
    if (!item) return;
    input.value = item.label;
    closeAutocomplete();
    // In production this would navigate — for demo, just focus
    input.focus();
  }

  function closeAutocomplete() {
    resultsBox.hidden = true;
    input.setAttribute('aria-expanded', 'false');
    activeIndex = -1;
    currentSuggestions = [];
  }

  function updateActiveOption(newIndex) {
    const options = resultsBox.querySelectorAll('.search-autocomplete-item');
    options.forEach((el, i) => {
      el.setAttribute('aria-selected', String(i === newIndex));
      if (i === newIndex) {
        input.setAttribute('aria-activedescendant', `search-option-${i}`);
      }
    });
    activeIndex = newIndex;
  }

  input.addEventListener('input', () => {
    clearTimeout(searchDebounceTimer);
    searchDebounceTimer = setTimeout(() => showSuggestions(input.value.trim()), 120);
  });

  input.addEventListener('keydown', e => {
    if (resultsBox.hidden) return;
    const options = resultsBox.querySelectorAll('.search-autocomplete-item');

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      updateActiveOption(Math.min(activeIndex + 1, options.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      updateActiveOption(Math.max(activeIndex - 1, -1));
      if (activeIndex === -1) input.removeAttribute('aria-activedescendant');
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      selectSuggestion(activeIndex);
    } else if (e.key === 'Escape') {
      closeAutocomplete();
    }
  });

  input.addEventListener('blur', () => {
    // Delay close so click on option can fire first
    setTimeout(closeAutocomplete, 200);
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    closeAutocomplete();
    // In production this would navigate to search results
    const q = input.value.trim();
    if (q) {
      input.setAttribute('aria-label', `Searched for: ${q}. Results would appear here.`);
    }
  });
}

// ============================================================
// SERVICE REQUEST TRACKER
// ============================================================
function initTracker() {
  const form = document.getElementById('tracker-form');
  const input = document.getElementById('tracker-input');
  const result = document.getElementById('tracker-result');
  if (!form || !input || !result) return;

  const t = () => TRANSLATIONS[currentLang];

  form.addEventListener('submit', e => {
    e.preventDefault();
    const code = input.value.trim().toUpperCase();
    if (!code) return;

    const request = MOCK_REQUESTS[code];

    if (request) {
      const statusColor = {
        'Received':    '#1d4ed8',
        'In Progress': '#d97706',
        'Completed':   '#15803d',
      }[request.status] || '#475569';

      result.hidden = false;
      result.classList.remove('tracker-result--error');
      result.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.5rem;flex-wrap:wrap;gap:0.5rem;">
          <strong style="font-size:0.95rem;">${request.type}</strong>
          <span style="background:${statusColor};color:#fff;padding:0.2rem 0.75rem;border-radius:9999px;font-size:0.75rem;font-weight:700;">${request.status}</span>
        </div>
        <div style="font-size:0.8rem;opacity:0.85;margin-bottom:0.4rem;">
          Request #${code} &nbsp;·&nbsp; Submitted ${request.submitted} &nbsp;·&nbsp; Updated ${request.updated}
        </div>
        <div style="font-size:0.85rem;line-height:1.5;">${request.detail}</div>
      `;
    } else {
      result.hidden = false;
      result.classList.add('tracker-result--error');
      result.textContent = currentLang === 'es'
        ? `No encontramos la solicitud "${code}". Verifique el número e intente de nuevo.`
        : `No request found for "${code}". Please check the number and try again.`;
    }
  });
}

// ============================================================
// ACCESSIBILITY CONTROLS — wire up the toolbar buttons
// ============================================================
function initAccessibilityControls() {
  document.getElementById('text-size-decrease')?.addEventListener('click', () => setTextSize('small'));
  document.getElementById('text-size-normal')?.addEventListener('click',   () => setTextSize('normal'));
  document.getElementById('text-size-increase')?.addEventListener('click', () => setTextSize('large'));

  document.getElementById('contrast-toggle')?.addEventListener('click', () => {
    setContrast(currentContrast === 'high' ? 'normal' : 'high');
  });

  document.getElementById('lang-en')?.addEventListener('click', () => setLanguage('en'));
  document.getElementById('lang-es')?.addEventListener('click', () => setLanguage('es'));
}

// ============================================================
// SMOOTH SCROLL — for in-page anchor links
// ============================================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href').slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Move focus to the target for keyboard/screen reader users
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  });
}

// ============================================================
// INIT — restore preferences and start everything
// ============================================================
function init() {
  // Restore persisted preferences before any rendering
  setTextSize(currentTextSize);
  setContrast(currentContrast);
  applyTranslations(currentLang);

  // Set correct active states for lang buttons
  document.getElementById('lang-en')?.classList.toggle('a11y-btn--active', currentLang === 'en');
  document.getElementById('lang-es')?.classList.toggle('a11y-btn--active', currentLang === 'es');
  document.getElementById('lang-en')?.setAttribute('aria-pressed', String(currentLang === 'en'));
  document.getElementById('lang-es')?.setAttribute('aria-pressed', String(currentLang === 'es'));

  initEmergencyBanner();
  initNavigation();
  initSearch();
  initTracker();
  initAccessibilityControls();
  initSmoothScroll();
}

document.addEventListener('DOMContentLoaded', init);
