/**
 * JIC | Jharkhand Innovation Connect Platform — SIH 2026 (#26043)
 * Team Techtiten Application Controller
 */

/* ==========================================================================
   0. Portal Gateway & Universal Authentication System (Citizen vs Government)
   ========================================================================== */
let currentPortalContext = 'citizen'; // 'citizen' | 'gov'
let currentAuthMode = 'login'; // 'login' | 'register'
let currentUser = {
  name: 'Harshita NM',
  role: 'student',
  roleLabel: 'Student Innovator',
  portal: 'citizen',
  affiliation: 'BIT Mesra',
  district: 'Ranchi',
  email: 'harshita.nm@bitmesra.edu.in'
};

window.openAuthModal = function(portalType, mode = 'login') {
  currentPortalContext = portalType || 'citizen';
  currentAuthMode = mode || 'login';

  const modal = document.getElementById('jicAuthModal');
  const badge = document.getElementById('authPortalBadge');
  const title = document.getElementById('authModalTitle');
  const sub = document.getElementById('authModalSub');
  const emailLabel = document.getElementById('authEmailLabel');
  const emailInput = document.getElementById('authEmail');
  const roleLabel = document.getElementById('authRoleLabel');
  const roleSelect = document.getElementById('authRoleSelect');

  if (currentPortalContext === 'gov') {
    if (badge) {
      badge.textContent = 'Government & Official Portal';
      badge.style.background = '#FFFFFF';
      badge.style.color = '#000000';
    }
    if (emailLabel) emailLabel.textContent = 'Official Govt Email (@jharkhand.gov.in)';
    if (emailInput) emailInput.placeholder = 'officer.name@jharkhand.gov.in';
    if (roleLabel) roleLabel.textContent = 'Government Department / Role';
    if (roleSelect) {
      roleSelect.innerHTML = `
        <option value="dm">District Magistrate (DM / DC Office)</option>
        <option value="urban">Urban Development & Housing Dept</option>
        <option value="agri">Agriculture & Tribal Welfare Dept</option>
        <option value="higher_edu">Higher & Technical Education Officer</option>
        <option value="mining">Mining & Environmental Safety Board</option>
      `;
    }
  } else {
    if (badge) {
      badge.textContent = 'Citizen & Innovator Portal';
      badge.style.background = '#1F1F26';
      badge.style.color = '#FFFFFF';
    }
    if (emailLabel) emailLabel.textContent = 'Email Address / Mobile Number';
    if (emailInput) emailInput.placeholder = 'name@bitmesra.edu.in or citizen@gmail.com';
    if (roleLabel) roleLabel.textContent = 'Account Category';
    if (roleSelect) {
      roleSelect.innerHTML = `
        <option value="student">Student Innovator (University / College)</option>
        <option value="citizen">Citizen / Resident of Jharkhand</option>
        <option value="faculty">Faculty / Researcher</option>
        <option value="industry">Industry CSR Representative</option>
      `;
    }
  }

  switchAuthTab(currentAuthMode);
  if (modal) modal.classList.add('show');
};

window.closeAuthModal = function() {
  const modal = document.getElementById('jicAuthModal');
  if (modal) modal.classList.remove('show');
};

window.switchAuthTab = function(mode) {
  currentAuthMode = mode;
  const tabLogin = document.getElementById('authTabLogin');
  const tabRegister = document.getElementById('authTabRegister');
  const registerFields = document.querySelectorAll('.register-only-field');
  const submitText = document.getElementById('authSubmitText');
  const modalTitle = document.getElementById('authModalTitle');
  const modalSub = document.getElementById('authModalSub');
  const toggleHint = document.getElementById('authToggleHint');
  const toggleLink = document.getElementById('authToggleLink');

  if (mode === 'register') {
    if (tabLogin) tabLogin.classList.remove('active');
    if (tabRegister) tabRegister.classList.add('active');
    registerFields.forEach(f => f.style.display = 'flex');
    if (modalTitle) modalTitle.textContent = currentPortalContext === 'gov' ? 'Officer Onboarding Registration' : 'Create Innovator Account';
    if (modalSub) modalSub.textContent = 'Join Jharkhand Innovation Connect Platform';
    if (submitText) submitText.textContent = currentPortalContext === 'gov' ? 'Complete Officer Registration' : 'Create Account & Enter Platform';
    if (toggleHint) toggleHint.textContent = 'Already have an account?';
    if (toggleLink) toggleLink.textContent = 'Sign in here';
  } else {
    if (tabLogin) tabLogin.classList.add('active');
    if (tabRegister) tabRegister.classList.remove('active');
    registerFields.forEach(f => f.style.display = 'none');
    if (modalTitle) modalTitle.textContent = currentPortalContext === 'gov' ? 'Sign in to Government Console' : 'Sign in to Citizen Portal';
    if (modalSub) modalSub.textContent = 'Access personalized innovation workspace & challenges';
    if (submitText) submitText.textContent = currentPortalContext === 'gov' ? 'Sign In as Officer' : 'Sign In to Citizen Portal';
    if (toggleHint) toggleHint.textContent = "Don't have an account?";
    if (toggleLink) toggleLink.textContent = 'Register here';
  }
};

window.toggleAuthMode = function() {
  switchAuthTab(currentAuthMode === 'login' ? 'register' : 'login');
};

window.autofillDemoAuth = function() {
  const emailInput = document.getElementById('authEmail');
  const passInput = document.getElementById('authPassword');
  const nameInput = document.getElementById('authFullName');
  const distSelect = document.getElementById('authDistrict');

  if (currentPortalContext === 'gov') {
    if (emailInput) emailInput.value = 'rajan.verma@jharkhand.gov.in';
    if (passInput) passInput.value = 'JharkhandGov@2026';
    if (nameInput) nameInput.value = 'Dr. Rajan Verma';
    if (distSelect) distSelect.value = 'Ranchi';
  } else {
    if (emailInput) emailInput.value = 'harshita.nm@bitmesra.edu.in';
    if (passInput) passInput.value = 'Innovator@2026';
    if (nameInput) nameInput.value = 'Harshita NM';
    if (distSelect) distSelect.value = 'Ranchi';
  }
  showToast(`Autofilled demo credentials for ${currentPortalContext === 'gov' ? 'District Officer' : 'Student Innovator'}`);
};

window.quickDemoLogin = function(portalType) {
  currentPortalContext = portalType || 'citizen';
  if (currentPortalContext === 'gov') {
    currentUser = {
      name: 'Dr. Rajan Verma',
      role: 'dm',
      roleLabel: 'District Magistrate',
      portal: 'gov',
      affiliation: 'Ranchi DC Office & Urban Dev',
      district: 'Ranchi',
      email: 'rajan.verma@jharkhand.gov.in'
    };
  } else {
    currentUser = {
      name: 'Harshita NM',
      role: 'student',
      roleLabel: 'Student Innovator',
      portal: 'citizen',
      affiliation: 'BIT Mesra',
      district: 'Ranchi',
      email: 'harshita.nm@bitmesra.edu.in'
    };
  }

  applyUserSession(currentUser);
  const gate = document.getElementById('jicLandingPortalGate');
  if (gate) gate.classList.add('hidden');

  // Navigate to initial view
  if (currentPortalContext === 'gov') {
    navigateToView('gov-analytics');
  } else {
    navigateToView('dashboard');
  }

  showToast(`Logged in successfully to ${currentPortalContext === 'gov' ? 'Government Admin Portal' : 'Citizen & Innovator Portal'} as ${currentUser.name}`);
};

window.handleAuthSubmit = function(event) {
  event.preventDefault();
  const emailInput = document.getElementById('authEmail')?.value || 'user@jharkhand.gov.in';
  const nameInput = document.getElementById('authFullName')?.value || (currentPortalContext === 'gov' ? 'Dr. Rajan Verma' : 'Harshita NM');
  const district = document.getElementById('authDistrict')?.value || 'Ranchi';

  currentUser = {
    name: nameInput,
    role: currentPortalContext === 'gov' ? 'Official' : 'Innovator',
    roleLabel: currentPortalContext === 'gov' ? 'Gov. Official' : 'Citizen / Student',
    portal: currentPortalContext,
    affiliation: currentPortalContext === 'gov' ? `${district} DC Admin Console` : `University / Ward #${district}`,
    district: district,
    email: emailInput
  };

  applyUserSession(currentUser);
  closeAuthModal();

  const gate = document.getElementById('jicLandingPortalGate');
  if (gate) gate.classList.add('hidden');

  if (currentPortalContext === 'gov') {
    navigateToView('gov-analytics');
  } else {
    navigateToView('dashboard');
  }

  showToast(`Welcome ${currentUser.name}! Logged into ${currentPortalContext === 'gov' ? 'Government & District Console' : 'Citizen & Innovator Portal'}`);
};

window.logoutToLanding = function() {
  const gate = document.getElementById('jicLandingPortalGate');
  if (gate) gate.classList.remove('hidden');
  showToast('Logged out to Main Platform Gateway. Select a Portal to re-enter.');
};

function applyUserSession(user) {
  const sidebarAvatar = document.getElementById('sidebarUserAvatar');
  const sidebarName = document.getElementById('sidebarUserName');
  const sidebarRole = document.getElementById('sidebarUserRole');
  const headerBadge = document.getElementById('headerUserBadge');
  const activePortalTagText = document.getElementById('activePortalTagText');
  const activePortalTag = document.getElementById('activePortalTag');

  const initials = user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'HA';

  if (sidebarAvatar) sidebarAvatar.textContent = initials;
  if (headerBadge) headerBadge.textContent = initials;
  if (sidebarName) sidebarName.textContent = user.name;
  if (sidebarRole) sidebarRole.textContent = `${user.roleLabel} • ${user.district}`;

  if (activePortalTagText) {
    activePortalTagText.textContent = user.portal === 'gov' ? 'Gov Admin Portal' : 'Citizen Portal';
  }

  if (activePortalTag) {
    activePortalTag.style.borderColor = user.portal === 'gov' ? '#FFFFFF' : 'var(--border-light)';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initChallengesData();
  initExplorerMasterList();
  initCitizenPortal();
  initAdminDashboard();
  initUniversityDashboard();
  initCsrCalculator();
  initTopBarActions();
});

/* ==========================================================================
   1. Dynamic View Switcher & Sidebar Navigation
   ========================================================================== */
const VIEW_METADATA = {
  'dashboard': {
    title: 'Dashboard',
    sub: 'Jharkhand Innovation Connect — Overview'
  },
  'submit-challenge': {
    title: 'Submit a Challenge',
    sub: 'Citizen Crowdsourcing & Grievance Lodging Portal'
  },
  'challenge-explorer': {
    title: 'Challenge Explorer',
    sub: 'Browse Verified Societal Challenges across Jharkhand Districts'
  },
  'ai-matching': {
    title: 'AI Skill & Domain Matching',
    sub: 'Automated NLP Routing from Citizen Grievance to University R&D Labs'
  },
  'university-workspace': {
    title: 'University Workspace',
    sub: 'NEP 2020 Capstone Projects, Student Proposals & Progress Tracking'
  },
  'project-workspace': {
    title: 'Project Workspace',
    sub: 'Collaborative Multi-Institutional Research & Prototyping Sandbox'
  },
  'industry-partners': {
    title: 'Industry Partners & CSR Hub',
    sub: 'Corporate Mentorship, Prototype Adoption & 80G Tax Deductible Grants'
  },
  'project-tracking': {
    title: 'Project Tracking',
    sub: '5-Stage Milestone Kanban: Submission to Field Deployment'
  },
  'gov-analytics': {
    title: 'Gov. Analytics & Admin Console',
    sub: 'Department of Higher & Technical Education Verification Portal'
  },
  'impact-dashboard': {
    title: 'Impact Dashboard & Public Portal',
    sub: 'State-wide Resolution Transparency, Institutional Rankings & Metrics'
  }
};

function initNavigation() {
  const sidebarLinks = document.querySelectorAll('.sidebar-link[data-view]');
  sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const viewId = link.getAttribute('data-view');
      switchView(viewId);
    });
  });

  // Mobile sidebar toggle
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const sidebar = document.getElementById('appSidebar');
  if (mobileBtn && sidebar) {
    mobileBtn.addEventListener('click', () => {
      sidebar.style.display = (sidebar.style.display === 'flex' || sidebar.style.display === 'block') ? 'none' : 'flex';
    });
  }
}

window.switchView = function(viewId) {
  // Update sidebar active class
  document.querySelectorAll('.sidebar-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-view') === viewId) {
      link.classList.add('active');
    }
  });

  // Toggle active view container
  document.querySelectorAll('.app-view').forEach(view => {
    view.classList.remove('active');
  });

  const targetView = document.getElementById(`view-${viewId}`) || document.getElementById('view-dashboard');
  if (targetView) {
    targetView.classList.add('active');
  }

  // Update Breadcrumb
  const titleEl = document.getElementById('currentViewTitle');
  const subEl = document.getElementById('currentViewSub');
  const meta = VIEW_METADATA[viewId] || VIEW_METADATA['dashboard'];

  if (titleEl) titleEl.textContent = meta.title;
  if (subEl) subEl.textContent = meta.sub;

  window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.handleDashboardPrompt = function() {
  const input = document.getElementById('dashboardAiQueryInput');
  if (!input) return;
  const rawQuery = input.value.trim();
  if (!rawQuery) {
    showToast('Please type a prompt or question (e.g., "Water issue in Bokaro", "CSR funds", "AI Matching")');
    return;
  }
  const q = rawQuery.toLowerCase();
  
  showToast(`AI Assistant: Processing "${rawQuery}"...`);

  if (q.includes('submit') || q.includes('grievance') || q.includes('report') || q.includes('problem')) {
    switchView('submit-challenge');
  } else if (q.includes('match') || q.includes('ai') || q.includes('nlp') || q.includes('mentor')) {
    switchView('ai-matching');
  } else if (q.includes('work') || q.includes('project') || q.includes('kanban') || q.includes('telemetry')) {
    switchView('project-workspace');
  } else if (q.includes('partner') || q.includes('csr') || q.includes('fund') || q.includes('industry') || q.includes('tata') || q.includes('sail')) {
    switchView('industry-partners');
  } else if (q.includes('gov') || q.includes('admin') || q.includes('analytics') || q.includes('heis') || q.includes('verify')) {
    switchView('gov-analytics');
  } else if (q.includes('impact') || q.includes('metric') || q.includes('leaderboard') || q.includes('deployed')) {
    switchView('impact-dashboard');
  } else if (q.includes('univ') || q.includes('college') || q.includes('student') || q.includes('capstone')) {
    switchView('university-workspace');
  } else {
    // Navigate to challenge explorer and apply search
    switchView('challenge-explorer');
    const searchInput = document.getElementById('explorerSearchInput');
    if (searchInput) {
      searchInput.value = rawQuery;
      if (typeof window.filterExplorerChallenges === 'function') {
        window.filterExplorerChallenges();
      }
    }
  }

  input.value = '';
};

/* ==========================================================================
   2. Grassroots Challenges Dataset (With MVP & Screenshot Specifics)
   ========================================================================== */
let challenges = [
  {
    id: 'JH-2024-1842',
    title: 'Contaminated water in Bokaro Steel City residential zones',
    category: 'Water & Sanitation',
    district: 'Bokaro',
    desc: 'Borewell samples in Sector 4 and 9 contain heavy metals and industrial run-off residues exceeding permissible drinking limits.',
    status: 'University Matching',
    upvotes: 347,
    hasUpvoted: false,
    severity: 'Critical',
    submittedBy: 'Bokaro Resident Welfare Samiti',
    claimedBy: 'BIT Mesra & Bokaro Lab Team',
    sponsor: 'SAIL CSR',
    adminStatus: 'approved',
    uniStatus: 'assigned',
    progress: 50
  },
  {
    id: 'JH-2024-1837',
    title: 'Rural girls dropping out after Class 8 in Dumka villages',
    category: 'Smart Education',
    district: 'Dumka',
    desc: 'Tribal middle school graduates discontinue education due to lack of local high schools and digital learning centers within 12km.',
    status: 'Team Formation',
    upvotes: 289,
    hasUpvoted: false,
    severity: 'High',
    submittedBy: 'Dumka Mahila Shiksha Samiti',
    claimedBy: null,
    sponsor: null,
    adminStatus: 'approved',
    uniStatus: 'available',
    progress: 20
  },
  {
    id: 'JH-2024-1831',
    title: 'Crop price information unavailability for tribal farmers',
    category: 'Agri & Rural Livelihoods',
    district: 'Khunti',
    desc: 'Smallholders sell seasonal vegetables to middlemen at 60% below APMC mandi wholesale rates due to lack of real-time SMS price advisories.',
    status: 'Development',
    upvotes: 412,
    hasUpvoted: false,
    severity: 'High',
    submittedBy: 'Khunti Kisan Pragati Samiti',
    claimedBy: 'Birsa Agricultural University Tech Club',
    sponsor: 'NABARD Rural Fund',
    adminStatus: 'approved',
    uniStatus: 'assigned',
    progress: 75
  },
  {
    id: 'JH-2026-01',
    title: 'Water Issue in Ranchi: High Arsenic & Iron in Kanke Borewells',
    category: 'Water & Sanitation',
    district: 'Ranchi',
    desc: 'Groundwater borewells across Kanke and Ratu Road exhibit dissolved iron and arsenic exceeding BIS 10500 limits. Need low-cost municipal filtration.',
    status: 'Pending Verification',
    upvotes: 512,
    hasUpvoted: false,
    severity: 'Critical',
    submittedBy: 'Kanke Citizen Samiti',
    claimedBy: null,
    sponsor: null,
    adminStatus: 'pending',
    uniStatus: 'available',
    progress: 10
  },
  {
    id: 'JH-2026-02',
    title: 'Education Gap in Dhanbad: Smart Offline Classroom Modules',
    category: 'Smart Education',
    district: 'Dhanbad',
    desc: 'Government middle schools in Govindpur and Tundi lack cellular internet. Need autonomous solar micro-servers preloaded with multilingual animated STEM lessons.',
    status: 'Under R&D',
    upvotes: 342,
    hasUpvoted: false,
    severity: 'High',
    submittedBy: 'Dhanbad Shiksha Manch',
    claimedBy: 'IIT (ISM) Dhanbad Team "EdTech Sahyog"',
    sponsor: 'Govt Seed Fund (₹1.5 Lakhs)',
    adminStatus: 'approved',
    uniStatus: 'assigned',
    progress: 65
  },
  {
    id: 'JH-2026-03',
    title: 'Healthcare Issue in Bokaro: Mobile Neonatal Telemedicine Kits',
    category: 'Healthcare & Nutrition',
    district: 'Bokaro',
    desc: 'Rural Primary Health Centres near Tenughat lack pediatric specialists. Portable IoT diagnostic kit needed for ASHA workers to triage infants.',
    status: 'Under R&D',
    upvotes: 428,
    hasUpvoted: false,
    severity: 'Critical',
    submittedBy: 'Tenughat Rural Health Mission',
    claimedBy: 'BIT Mesra & Bokaro General Hospital',
    sponsor: 'SAIL Bokaro Steel CSR',
    adminStatus: 'approved',
    uniStatus: 'assigned',
    progress: 40
  },
  {
    id: 'JH-2026-04',
    title: 'Solar Micro-Cold Storage for Vegetable Clusters in Ormanjhi',
    category: 'Agri & Rural Livelihoods',
    district: 'Ranchi',
    desc: 'Farmers in Ormanjhi dump tons of fresh tomatoes during market gluts. Portable 5-ton phase-change cool chamber deployed on ground.',
    status: 'Field Deployed',
    upvotes: 610,
    hasUpvoted: false,
    severity: 'Moderate',
    submittedBy: 'Ormanjhi Farmers Cooperative',
    claimedBy: 'Birsa Agricultural University',
    sponsor: 'Jharkhand State Livelihood Promotion Society',
    adminStatus: 'solved',
    uniStatus: 'solutions',
    progress: 100
  },
  {
    id: 'JH-2026-05',
    title: 'Jharia Particulate Air Misting Cannon for Coal Dust Smog',
    category: 'Environment & Energy',
    district: 'Dhanbad',
    desc: 'Underground coal fires emit PM2.5 levels exceeding 450 µg/m³. Low-cost autonomous air misting cannon prototyped with 45% particulate drop.',
    status: 'Field Deployed',
    upvotes: 490,
    hasUpvoted: false,
    severity: 'Critical',
    submittedBy: 'Jharia Coalfield Citizen Forum',
    claimedBy: 'IIT (ISM) Dhanbad Mining & Mech Dept',
    sponsor: 'Bharat Coking Coal Ltd (BCCL)',
    adminStatus: 'solved',
    uniStatus: 'solutions',
    progress: 100
  }
];

let activeCategory = 'all';
let activeDistrict = 'all';
let activeStatus = 'all';
let searchQuery = '';

function initChallengesData() {
  const searchInput = document.getElementById('challengeSearchInput');
  const districtFilter = document.getElementById('districtFilter');
  const statusFilter = document.getElementById('statusFilter');
  const catPills = document.querySelectorAll('.cat-pill');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderChallenges();
    });
  }

  if (districtFilter) {
    districtFilter.addEventListener('change', (e) => {
      activeDistrict = e.target.value;
      renderChallenges();
    });
  }

  if (statusFilter) {
    statusFilter.addEventListener('change', (e) => {
      activeStatus = e.target.value;
      renderChallenges();
    });
  }

  catPills.forEach(pill => {
    pill.addEventListener('click', () => {
      catPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeCategory = pill.dataset.category;
      renderChallenges();
    });
  });

  renderChallenges();
}

function renderChallenges() {
  const grid = document.getElementById('challengesGrid');
  if (!grid) return;

  const filtered = challenges.filter(item => {
    const matchCat = (activeCategory === 'all') || item.category.includes(activeCategory);
    const matchDist = (activeDistrict === 'all') || item.district === activeDistrict;
    const matchStatus = (activeStatus === 'all') || item.status.includes(activeStatus);
    const matchSearch = !searchQuery || 
                        item.title.toLowerCase().includes(searchQuery) ||
                        item.desc.toLowerCase().includes(searchQuery) ||
                        item.district.toLowerCase().includes(searchQuery) ||
                        item.category.toLowerCase().includes(searchQuery);

    return matchCat && matchDist && matchStatus && matchSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 48px 20px; background: #FFFFFF; border-radius: 12px; border: 1px dashed var(--border-card);">
        <h4 style="font-size: 1.05rem; margin-bottom: 6px;">No Societal Challenges Found</h4>
        <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 14px;">Try adjusting your search terms or filters.</p>
        <button class="btn-amber-pill" onclick="switchView('submit-challenge')">Submit This Problem Now</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(item => {
    const badgeClass = getCategoryBadgeClass(item.category);

    return `
      <article class="challenge-card">
        <div>
          <div class="card-top-meta">
            <span class="pill-badge ${badgeClass}">${item.category}</span>
            <span class="district-tag">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"/><circle cx="12" cy="10" r="3"/></svg>
              ${item.district}
            </span>
          </div>

          <h3 class="card-title">${item.title}</h3>
          <p class="card-desc">${item.desc}</p>

          <div class="card-lifecycle-bar">
            <span>Status:</span>
            <strong style="color: ${item.status === 'Field Deployed' ? 'var(--green-text)' : 'var(--blue-text)'}">
              &bull; ${item.status}
            </strong>
          </div>

          ${item.claimedBy ? `
            <div class="card-status-badge badge-purple">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
              <span><strong>Claimed by:</strong> ${item.claimedBy}</span>
            </div>
          ` : ''}

          ${item.sponsor ? `
            <div class="card-status-badge badge-green">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
              <span><strong>Sponsor:</strong> ${item.sponsor}</span>
            </div>
          ` : ''}
        </div>

        <div class="card-footer">
          <button class="upvote-btn ${item.hasUpvoted ? 'upvoted' : ''}" onclick="handleUpvote('${item.id}')">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="${item.hasUpvoted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            <span>${item.upvotes}</span>
          </button>

          <button class="adopt-action-btn" onclick="openApplyOrSponsor('${item.id}')">
            ${item.claimedBy ? 'Sponsor Prototype &rarr;' : 'Apply to Solve &rarr;'}
          </button>
        </div>
      </article>
    `;
  }).join('');
}

function getCategoryBadgeClass(category) {
  if (category.includes('Water')) return 'pill-blue';
  if (category.includes('Education')) return 'pill-pink';
  if (category.includes('Healthcare')) return 'pill-purple';
  if (category.includes('Agri')) return 'pill-green';
  if (category.includes('Environment')) return 'pill-orange';
  return 'pill-blue';
}

window.handleUpvote = function(id) {
  const item = challenges.find(c => c.id === id);
  if (!item) return;

  if (item.hasUpvoted) {
    item.upvotes--;
    item.hasUpvoted = false;
    showToast('Upvote removed');
  } else {
    item.upvotes++;
    item.hasUpvoted = true;
    showToast('Upvoted! Escalated to HEI panel');
  }

  renderChallenges();
};

window.openApplyOrSponsor = function(id) {
  const item = challenges.find(c => c.id === id);
  if (!item) return;
  if (!item.claimedBy) {
    switchView('university-workspace');
    showToast(`Redirecting to University Workspace for "${item.title}"`);
  } else {
    switchView('industry-partners');
    showToast(`Redirecting to Industry CSR Hub for "${item.title}"`);
  }
};

/* ==========================================================================
   3. Citizen Side: Problem Submit & Real-Time Tracking
   ========================================================================== */
let citizenTickets = [
  {
    ticketId: 'JH-TKT-9042',
    title: 'Water Issue in Ranchi: High Arsenic in Kanke Borewells',
    category: 'Water & Sanitation',
    district: 'Ranchi',
    date: 'Today, 10 Sep 2026',
    stepIndex: 1, // 1: Submitted, 2: Verified, 3: Assigned, 4: In R&D, 5: Solved
    assignedTo: 'Under Admin Review'
  },
  {
    ticketId: 'JH-TKT-8819',
    title: 'Solar Micro-Cold Storage in Ormanjhi',
    category: 'Agri & Rural Livelihoods',
    district: 'Ranchi',
    date: '02 Aug 2026',
    stepIndex: 5,
    assignedTo: 'Birsa Agricultural University'
  }
];

function initCitizenPortal() {
  const form = document.getElementById('inlineCitizenSubmitForm');
  const fileInput = document.getElementById('cProbFile');
  const fileLabel = document.getElementById('cFileLabel');
  const gpsBtn = document.getElementById('cAutoGpsBtn');
  const gpsText = document.getElementById('cGpsText');

  if (fileInput && fileLabel) {
    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        fileLabel.textContent = `Attached: ${e.target.files[0].name}`;
        fileLabel.style.color = 'var(--text-main)';
      }
    });
  }

  if (gpsBtn && gpsText) {
    gpsBtn.addEventListener('click', () => {
      gpsText.textContent = '📍 Lat: 23.3441° N, Long: 85.3096° E (Kanke, Ranchi)';
      gpsBtn.style.borderColor = 'var(--primary-green)';
      gpsBtn.style.color = 'var(--primary-green)';
      showToast('GPS Geo-Location captured accurately');
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('cProbTitle')?.value.trim();
      const category = document.getElementById('cProbCategory')?.value;
      const district = document.getElementById('cProbDistrict')?.value;
      const desc = document.getElementById('cProbDesc')?.value.trim();

      if (!title || !category || !district || !desc) {
        showToast('Please fill all required fields');
        return;
      }

      const newId = `JH-TKT-${Math.floor(1000 + Math.random() * 9000)}`;
      const newTicket = {
        ticketId: newId,
        title: title,
        category: category,
        district: district,
        date: 'Just now',
        stepIndex: 1,
        assignedTo: 'Under Admin Review'
      };

      citizenTickets.unshift(newTicket);

      const newChallenge = {
        id: `JH-2026-${String(challenges.length + 1).padStart(2, '0')}`,
        title: title,
        category: category,
        district: district,
        desc: desc,
        status: 'Pending Verification',
        upvotes: 1,
        hasUpvoted: false,
        severity: 'High',
        submittedBy: 'Harshita NM (Citizen &bull; Ranchi)',
        claimedBy: null,
        sponsor: null,
        adminStatus: 'pending',
        uniStatus: 'available',
        progress: 10
      };

      challenges.unshift(newChallenge);

      renderCitizenTickets();
      renderAdminDashboard();
      renderChallenges();

      form.reset();
      if (fileLabel) fileLabel.textContent = 'Choose photo or video';
      if (gpsText) {
        gpsText.textContent = 'Detect Geo-Location (GPS)';
        if (gpsBtn) {
          gpsBtn.style.borderColor = '';
          gpsBtn.style.color = '';
        }
      }

      showToast(`Problem submitted! Tracking ID: ${newId}`);
    });
  }

  renderCitizenTickets();
}

function renderCitizenTickets() {
  const container = document.getElementById('citizenTicketsList');
  const countBadge = document.getElementById('citizenTicketCount');
  if (countBadge) countBadge.textContent = citizenTickets.length;
  if (!container) return;

  container.innerHTML = citizenTickets.map(t => {
    const steps = [
      { num: 1, label: 'Submitted' },
      { num: 2, label: 'Verified' },
      { num: 3, label: 'Assigned' },
      { num: 4, label: 'In R&D' },
      { num: 5, label: 'Solved' }
    ];

    return `
      <div class="citizen-ticket-card">
        <div class="ticket-top-row">
          <span class="ticket-id">${t.ticketId}</span>
          <span class="pill-badge ${getCategoryBadgeClass(t.category)}">${t.category}</span>
        </div>
        <h4 class="ticket-title">${t.title}</h4>
        <div class="ticket-meta">
          <span>📍 ${t.district}</span>
          <span>📅 ${t.date}</span>
          <span>🏛️ ${t.assignedTo}</span>
        </div>
        <div class="ticket-stepper">
          ${steps.map(s => {
            const isDone = s.num < t.stepIndex;
            const isCurrent = s.num === t.stepIndex;
            const cls = isDone ? 'done' : (isCurrent ? 'current' : '');
            return `
              <div class="ticket-step ${cls}">
                <div class="step-dot"></div>
                <span>${s.label}</span>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }).join('');
}

/* ==========================================================================
   4. Admin / Gov. Analytics Controller
   ========================================================================== */
let currentAdminTab = 'pending';

function initAdminDashboard() {
  const tabs = document.querySelectorAll('[data-admin-tab]');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      currentAdminTab = tab.dataset.adminTab;
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderAdminDashboard();
    });
  });

  renderAdminDashboard();
}

function renderAdminDashboard() {
  const grid = document.getElementById('adminChallengesGrid');
  const pendingCount = document.getElementById('adminPendingCount');
  const approvedCount = document.getElementById('adminApprovedCount');
  const solvedCount = document.getElementById('adminSolvedCount');

  const pendingList = challenges.filter(c => c.adminStatus === 'pending');
  const approvedList = challenges.filter(c => c.adminStatus === 'approved');
  const solvedList = challenges.filter(c => c.adminStatus === 'solved' || c.status === 'Field Deployed' || c.progress === 100);

  if (pendingCount) pendingCount.textContent = pendingList.length;
  if (approvedCount) approvedCount.textContent = approvedList.length;
  if (solvedCount) solvedCount.textContent = solvedList.length;

  if (!grid) return;

  let currentList = [];
  if (currentAdminTab === 'pending') currentList = pendingList;
  else if (currentAdminTab === 'approved') currentList = approvedList;
  else if (currentAdminTab === 'solved') currentList = solvedList;

  if (currentList.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 36px; background: var(--bg-subtle); border-radius: 8px;">
        <p style="color: var(--text-muted); font-size: 0.85rem;">No challenges found in "${currentAdminTab.toUpperCase()}" queue.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = currentList.map(item => {
    const isPending = currentAdminTab === 'pending';
    const isApproved = currentAdminTab === 'approved';
    const isSolved = currentAdminTab === 'solved';

    return `
      <div class="dash-card">
        <div>
          <div class="dash-card-header">
            <span class="ticket-id">${item.id}</span>
            <span class="pill-badge ${getCategoryBadgeClass(item.category)}">${item.category}</span>
          </div>
          <h4 class="dash-card-title">${item.title}</h4>
          <p class="dash-card-desc">${item.desc}</p>
          <div class="dash-meta-tags">
            <span class="dash-meta-pill">📍 ${item.district}</span>
            <span class="dash-meta-pill">Priority: <strong>${item.severity}</strong></span>
            <span class="dash-meta-pill">By: ${item.submittedBy}</span>
          </div>
        </div>

        <div class="dash-card-footer">
          ${isPending ? `
            <div class="dash-action-row" style="margin-bottom: 8px;">
              <span style="font-size: 0.72rem; color: var(--text-muted);">Assign Priority:</span>
              <select class="dash-select" onchange="changeAdminPriority('${item.id}', this.value)">
                <option value="Critical" ${item.severity === 'Critical' ? 'selected' : ''}>Critical</option>
                <option value="High" ${item.severity === 'High' ? 'selected' : ''}>High</option>
                <option value="Medium" ${item.severity === 'Medium' ? 'selected' : ''}>Medium</option>
              </select>
            </div>
            <div class="dash-action-row">
              <button class="adopt-action-btn" onclick="verifyAdminProblem('${item.id}')" style="flex: 1;">
                Verify &amp; Approve
              </button>
              <button class="upvote-btn" onclick="rejectAdminProblem('${item.id}')">
                Reject
              </button>
            </div>
          ` : ''}

          ${isApproved ? `
            <div style="font-size: 0.72rem; color: var(--text-muted); margin-bottom: 6px;">
              ${item.claimedBy ? `Assigned to: <strong>${item.claimedBy}</strong>` : '<span style="color: var(--amber-hover);">Open for University Assignment</span>'}
            </div>
            <div class="dash-action-row">
              <select class="dash-select" id="forward-uni-${item.id}" style="flex: 1;">
                <option value="BIT Mesra, Ranchi">BIT Mesra, Ranchi</option>
                <option value="IIT (ISM) Dhanbad">IIT (ISM) Dhanbad</option>
                <option value="NIT Jamshedpur">NIT Jamshedpur</option>
                <option value="Birsa Agricultural University">Birsa Agri Univ (BAU)</option>
                <option value="AIIMS Deoghar">AIIMS Deoghar</option>
              </select>
              <button class="adopt-action-btn" onclick="forwardProblemToUni('${item.id}')">Forward &rarr;</button>
            </div>
          ` : ''}

          ${isSolved ? `
            <div class="dash-action-row" style="justify-content: space-between;">
              <span class="solved-badge">✓ 100% Solved</span>
              <span style="font-size: 0.72rem; color: var(--text-muted);">${item.claimedBy || 'Jharkhand HEI'}</span>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }).join('');
}

window.verifyAdminProblem = function(id) {
  const c = challenges.find(item => item.id === id);
  if (!c) return;
  c.adminStatus = 'approved';
  c.status = 'Approved for HEI';

  citizenTickets.forEach(t => {
    if (c.title.includes(t.title) || t.title.includes(c.title)) {
      t.stepIndex = 2;
      t.status = 'Admin Verified';
    }
  });

  showToast(`Verified & Approved: "${c.title}"`);
  renderAdminDashboard();
  renderUniversityDashboard();
  renderCitizenTickets();
  renderChallenges();
};

window.rejectAdminProblem = function(id) {
  const c = challenges.find(item => item.id === id);
  if (!c) return;
  c.adminStatus = 'rejected';
  showToast(`Problem ${id} rejected with notice to citizen`);
  renderAdminDashboard();
  renderChallenges();
};

window.changeAdminPriority = function(id, prio) {
  const c = challenges.find(item => item.id === id);
  if (!c) return;
  c.severity = prio;
  showToast(`Priority updated to ${prio}`);
};

window.forwardProblemToUni = function(id) {
  const c = challenges.find(item => item.id === id);
  const select = document.getElementById(`forward-uni-${id}`);
  if (!c || !select) return;
  const uni = select.value;

  c.claimedBy = uni;
  c.uniStatus = 'assigned';
  c.status = `Assigned to ${uni}`;
  c.progress = 25;

  citizenTickets.forEach(t => {
    if (c.title.includes(t.title) || t.title.includes(c.title)) {
      t.stepIndex = 3;
      t.assignedTo = uni;
    }
  });

  showToast(`Forwarded to ${uni}!`);
  renderAdminDashboard();
  renderUniversityDashboard();
  renderCitizenTickets();
  renderChallenges();
};

/* ==========================================================================
   5. University Workspace Controller
   ========================================================================== */
let currentUniTab = 'available';

function initUniversityDashboard() {
  const tabs = document.querySelectorAll('[data-uni-tab]');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      currentUniTab = tab.dataset.uniTab;
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderUniversityDashboard();
    });
  });

  renderUniversityDashboard();
}

function renderUniversityDashboard() {
  const grid = document.getElementById('uniChallengesGrid');
  const availableCount = document.getElementById('uniAvailableCount');
  const assignedCount = document.getElementById('uniAssignedCount');
  const solutionsCount = document.getElementById('uniSolutionsCount');

  const availableList = challenges.filter(c => c.adminStatus === 'approved' && (!c.claimedBy || c.uniStatus === 'available'));
  const assignedList = challenges.filter(c => c.claimedBy && (c.progress < 100 && c.adminStatus !== 'solved'));
  const solutionsList = challenges.filter(c => c.progress >= 100 || c.adminStatus === 'solved' || c.status === 'Field Deployed');

  if (availableCount) availableCount.textContent = availableList.length;
  if (assignedCount) assignedCount.textContent = assignedList.length;
  if (solutionsCount) solutionsCount.textContent = solutionsList.length;

  const sbCount = document.getElementById('sbUniCount');
  if (sbCount) sbCount.textContent = availableList.length + assignedList.length;

  if (!grid) return;

  let currentList = [];
  if (currentUniTab === 'available') currentList = availableList;
  else if (currentUniTab === 'assigned') currentList = assignedList;
  else if (currentUniTab === 'solutions') currentList = solutionsList;

  if (currentList.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 36px; background: var(--bg-subtle); border-radius: 8px;">
        <p style="color: var(--text-muted); font-size: 0.85rem;">No challenges currently in "${currentUniTab.toUpperCase()}" view.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = currentList.map(item => {
    const isAvailable = currentUniTab === 'available';
    const isAssigned = currentUniTab === 'assigned';
    const isSolutions = currentUniTab === 'solutions';

    return `
      <div class="dash-card">
        <div>
          <div class="dash-card-header">
            <span class="ticket-id">${item.id}</span>
            <span class="pill-badge ${getCategoryBadgeClass(item.category)}">${item.category}</span>
          </div>
          <h4 class="dash-card-title">${item.title}</h4>
          <p class="dash-card-desc">${item.desc}</p>
          <div class="dash-meta-tags">
            <span class="dash-meta-pill">📍 ${item.district}</span>
            <span class="dash-meta-pill">Priority: ${item.severity}</span>
            ${item.claimedBy ? `<span class="dash-meta-pill" style="color: var(--purple-text)">🏛️ ${item.claimedBy}</span>` : ''}
          </div>
        </div>

        <div class="dash-card-footer">
          ${isAvailable ? `
            <div class="dash-action-row" style="justify-content: space-between;">
              <span style="font-size: 0.72rem; color: var(--green-text); font-weight: 600;">✓ Govt Verified &amp; Open</span>
              <button class="adopt-action-btn" onclick="uniApplyToSolve('${item.id}')">
                Apply to Solve &rarr;
              </button>
            </div>
          ` : ''}

          ${isAssigned ? `
            <div class="dash-progress-wrap">
              <div class="dash-progress-label">
                <span>R&amp;D Progress</span>
                <span>${item.progress || 35}%</span>
              </div>
              <div class="dash-progress-bar">
                <div class="dash-progress-fill" style="width: ${item.progress || 35}%;"></div>
              </div>
            </div>
            <div class="dash-action-row" style="justify-content: space-between; margin-top: 8px;">
              <button class="upvote-btn" onclick="incrementUniProgress('${item.id}')">
                +25% Progress
              </button>
              <button class="adopt-action-btn" onclick="markAsSolved('${item.id}')">
                Submit Solution
              </button>
            </div>
          ` : ''}

          ${isSolutions ? `
            <div class="dash-progress-wrap">
              <div class="dash-progress-label">
                <span style="color: var(--green-text);">✓ 100% Validated Solution</span>
                <span>NEP Credits Awarded</span>
              </div>
            </div>
            <div class="dash-action-row" style="gap: 6px; margin-top: 6px;">
              <button class="dash-meta-pill" style="cursor: pointer;" onclick="showToast('Downloading Capstone CAD &amp; Research Paper')">📄 Capstone Paper</button>
              <button class="dash-meta-pill" style="cursor: pointer;" onclick="showToast('Opening Patent Draft')">🔬 Patent Draft</button>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }).join('');
}

window.uniApplyToSolve = function(id) {
  const c = challenges.find(item => item.id === id);
  if (!c) return;
  c.claimedBy = 'Team Techtiten (BIT Mesra & IIT ISM)';
  c.uniStatus = 'assigned';
  c.status = 'Under R&D';
  c.progress = 25;

  citizenTickets.forEach(t => {
    if (c.title.includes(t.title) || t.title.includes(c.title)) {
      t.stepIndex = 3;
      t.assignedTo = 'Team Techtiten';
    }
  });

  showToast(`Team Techtiten applied to solve "${c.title}"!`);
  renderUniversityDashboard();
  renderAdminDashboard();
  renderCitizenTickets();
  renderChallenges();
};

window.incrementUniProgress = function(id) {
  const c = challenges.find(item => item.id === id);
  if (!c) return;
  c.progress = Math.min((c.progress || 25) + 25, 100);

  if (c.progress >= 100) {
    c.status = 'Field Deployed';
    c.adminStatus = 'solved';
    c.uniStatus = 'solutions';
    showToast(`"${c.title}" reached 100% Solved!`);
  } else {
    showToast(`Progress milestone: ${c.progress}% complete`);
  }

  citizenTickets.forEach(t => {
    if (c.title.includes(t.title) || t.title.includes(c.title)) {
      if (c.progress >= 100) {
        t.stepIndex = 5;
        t.status = '100% Solved & Deployed';
      } else {
        t.stepIndex = 4;
        t.status = `In R&D (${c.progress}% Complete)`;
      }
    }
  });

  renderUniversityDashboard();
  renderAdminDashboard();
  renderCitizenTickets();
  renderChallenges();
};

window.markAsSolved = function(id) {
  const c = challenges.find(item => item.id === id);
  if (!c) return;
  c.progress = 100;
  c.status = 'Field Deployed';
  c.adminStatus = 'solved';
  c.uniStatus = 'solutions';

  citizenTickets.forEach(t => {
    if (c.title.includes(t.title) || t.title.includes(c.title)) {
      t.stepIndex = 5;
      t.status = '100% Solved & Deployed';
    }
  });

  showToast(`Solution verified and marked 100% Solved!`);
  renderUniversityDashboard();
  renderAdminDashboard();
  renderCitizenTickets();
  renderChallenges();
};

/* ==========================================================================
   6. CSR Calculator
   ========================================================================== */
function initCsrCalculator() {
  const slider = document.getElementById('csrBudgetSlider');
  const valueText = document.getElementById('sliderValueText');
  const calcVillages = document.getElementById('calcVillages');
  const calcPrototypes = document.getElementById('calcPrototypes');
  const calcStudents = document.getElementById('calcStudents');
  const calcLives = document.getElementById('calcLives');
  const pledgeBtn = document.getElementById('calcPledgeBtn');

  if (slider && valueText) {
    slider.addEventListener('input', (e) => {
      const budget = parseInt(e.target.value, 10);
      valueText.textContent = `₹ ${budget} Lakhs`;

      if (calcVillages) calcVillages.textContent = Math.round(budget * 1.2);
      if (calcPrototypes) calcPrototypes.textContent = Math.max(1, Math.round(budget / 3.5));
      if (calcStudents) calcStudents.textContent = Math.round(budget * 2.1);
      if (calcLives) calcLives.textContent = (budget * 850).toLocaleString() + '+';
    });
  }

  if (pledgeBtn) {
    pledgeBtn.addEventListener('click', () => {
      const budget = slider ? slider.value : 15;
      showToast(`CSR Partnership MoA generated for ₹${budget} Lakhs (100% 80G Tax Deductible)!`);
    });
  }

  document.querySelectorAll('.open-pledge-modal-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const title = btn.dataset.title || 'Prototype';
      const needed = btn.dataset.needed || '₹2.5 Lakhs';
      showToast(`Pledged sponsorship for: ${title} (${needed})`);
    });
  });
}

/* ==========================================================================
   7. Topbar Actions & Toast Helper
   ========================================================================== */
function initTopBarActions() {
  const notifBtn = document.getElementById('notifBtn');
  const shareBtn = document.getElementById('topShareBtn');
  const deckBtn = document.getElementById('toggleDeckModeBtn');
  const platformPill = document.getElementById('platformSelectorPill');

  if (notifBtn) {
    notifBtn.addEventListener('click', () => {
      showToast('Notifications: 2 new problem reports in Ranchi & Dhanbad');
    });
  }

  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href);
        showToast('Platform URL copied to clipboard!');
      } else {
        showToast('Share Link: ' + window.location.href);
      }
    });
  }

  if (deckBtn) {
    deckBtn.addEventListener('click', () => {
      showToast('Opening SIH 2026 Presentation Pitch Deck (12 Slides)...');
      switchView('impact-dashboard');
    });
  }

  if (platformPill) {
    platformPill.addEventListener('click', () => {
      switchView('dashboard');
    });
  }
}

window.postTeamUpdate = function() {
  const input = document.getElementById('quickLogInput');
  const list = document.getElementById('teamLogList');
  if (!input || !list) return;
  const val = input.value.trim();
  if (!val) {
    showToast('Please type an update message first');
    return;
  }

  const newLog = document.createElement('div');
  newLog.className = 'log-item';
  newLog.innerHTML = `
    <div class="log-avatar">HA</div>
    <div class="log-content">
      <strong>Harshita NM (Citizen Lead, Ranchi)</strong>
      <p>${val}</p>
      <small>Just now</small>
    </div>
  `;
  list.prepend(newLog);
  input.value = '';
  showToast('Project update posted to workspace activity stream!');
};

/* ==========================================================================
   8. Government Analytics Interactive Map & Table Filters
   ========================================================================== */
const DISTRICT_DEFAULT_STATS = {
  'Palamu': { challenges: 82, deployed: 12, score: 58 },
  'Latehar': { challenges: 74, deployed: 9, score: 52 },
  'Hazaribagh': { challenges: 167, deployed: 31, score: 68 },
  'Ranchi': { challenges: 342, deployed: 28, score: 92 },
  'Khunti': { challenges: 96, deployed: 18, score: 62 },
  'Simdega': { challenges: 64, deployed: 8, score: 48 },
  'Dhanbad': { challenges: 287, deployed: 19, score: 78 },
  'Bokaro': { challenges: 241, deployed: 14, score: 71 },
  'Giridih': { challenges: 118, deployed: 22, score: 60 },
  'Deoghar': { challenges: 132, deployed: 26, score: 65 },
  'Dumka': { challenges: 143, deployed: 28, score: 64 },
  'East S.': { challenges: 198, deployed: 22, score: 85 },
  'Pakur': { challenges: 58, deployed: 6, score: 45 }
};

window.filterGovMap = function(metric) {
  const pills = document.querySelectorAll('.map-pill');
  pills.forEach(p => p.classList.remove('active'));
  const targetPill = document.getElementById(`mapPill${metric.charAt(0).toUpperCase() + metric.slice(1)}`);
  if (targetPill) targetPill.classList.add('active');

  // Update bubble nodes
  document.querySelectorAll('.map-bubble').forEach(b => {
    const nameEl = b.querySelector('.bubble-name');
    const valEl = b.querySelector('.bubble-val');
    if (!nameEl || !valEl) return;
    const name = nameEl.textContent.trim();
    const stats = DISTRICT_DEFAULT_STATS[name] || DISTRICT_DEFAULT_STATS[name === 'East S.' ? 'East Singhbhum' : name] || { challenges: 100, deployed: 15, score: 70 };
    const val = metric === 'deployed' ? stats.deployed : (metric === 'score' ? stats.score : stats.challenges);
    valEl.textContent = val;
  });

  showToast(`District Map metric switched to: ${metric.toUpperCase()}`);
};

window.highlightDistrict = function(name, challenges, active, score) {
  // Clear any existing active bubble state
  document.querySelectorAll('.map-bubble').forEach(b => b.classList.remove('active-bubble'));
  
  // Highlight clicked bubble
  document.querySelectorAll('.map-bubble').forEach(b => {
    const nameEl = b.querySelector('.bubble-name');
    if (nameEl && (nameEl.textContent.includes(name) || name.includes(nameEl.textContent))) {
      b.classList.add('active-bubble');
    }
  });

  // Highlight table row if in gov table
  document.querySelectorAll('.gov-district-table tbody tr').forEach(row => {
    row.style.background = '';
    if (row.textContent.includes(name)) {
      row.style.background = 'rgba(255, 255, 255, 0.08)';
      row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });

  showToast(`District: ${name} &bull; Challenges: ${challenges} &bull; Active Deployed: ${active} &bull; Score: ${score}/100`);
};

function showToast(message) {
  const toast = document.getElementById('bobbyToast');
  const toastText = document.getElementById('toastText');

  if (!toast) return;
  if (toastText) toastText.textContent = message;

  toast.classList.add('show');
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

/* ==========================================================================
   9. Submit Challenge Wizard & Urgency Controller
   ========================================================================== */
let selectedUrgencyValue = 'High';

window.selectUrgency = function(btn) {
  const group = document.getElementById('urgencyGroup');
  if (!group) return;
  group.querySelectorAll('.urgency-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  selectedUrgencyValue = btn.getAttribute('data-urgency') || 'High';
  showToast(`Urgency set to: ${selectedUrgencyValue}`);
};

/* ==========================================================================
   10. Challenge Explorer Master-Detail Split Controller (Screenshot Match)
   ========================================================================== */
const EXPLORER_CHALLENGES = [
  {
    id: 'JH-2024-1810',
    priority: 'Critical',
    title: 'Mica mining child labor in Koderma villages',
    phase: 'Development',
    domain: 'Livelihood',
    district: 'Koderma',
    votes: 623,
    timeAgo: '21d ago',
    teams: '4 team(s)',
    desc: 'Children aged 8-14 found working in hazardous mica mining. NGO partnership needed for rehabilitation programs.',
    stepNumber: 5,
    totalSteps: 7
  },
  {
    id: 'JH-2024-1819',
    priority: 'Critical',
    title: 'Illegal sand mining in Subarnarekha river basin',
    phase: 'Validation',
    domain: 'Environment',
    district: 'Saraikela',
    votes: 534,
    timeAgo: '2d ago',
    teams: '0 team(s)',
    desc: 'Unregulated mechanized sand extraction causing severe riverbed erosion and groundwater depletion along Ghatshila-Jamshedpur stretch.',
    stepNumber: 1,
    totalSteps: 7
  },
  {
    id: 'JH-2024-1831',
    priority: 'High',
    title: 'Crop price information unavailability for tribal farmers',
    phase: 'Development',
    domain: 'Agriculture',
    district: 'Khunti',
    votes: 412,
    timeAgo: '5d ago',
    teams: '3 team(s)',
    desc: 'Smallholders sell seasonal vegetables to middlemen at 60% below APMC mandi wholesale rates due to lack of real-time SMS price advisories.',
    stepNumber: 5,
    totalSteps: 7
  },
  {
    id: 'JH-2024-1842',
    priority: 'Critical',
    title: 'Contaminated water in Bokaro Steel City residential zones',
    phase: 'University Matching',
    domain: 'Water & Sanitation',
    district: 'Bokaro',
    votes: 347,
    timeAgo: '3d ago',
    teams: '2 team(s)',
    desc: 'Borewell samples in Sector 4 and 9 contain heavy metals and industrial run-off residues exceeding permissible drinking limits.',
    stepNumber: 2,
    totalSteps: 7
  },
  {
    id: 'JH-2024-1837',
    priority: 'High',
    title: 'Rural girls dropping out after Class 8 in Dumka villages',
    phase: 'Team Formation',
    domain: 'Education',
    district: 'Dumka',
    votes: 289,
    timeAgo: '5d ago',
    teams: '1 team(s)',
    desc: 'Tribal middle school graduates discontinue education due to lack of local high schools and digital learning centers within 12km.',
    stepNumber: 3,
    totalSteps: 7
  },
  {
    id: 'JH-2024-1803',
    priority: 'High',
    title: 'Pothole monitoring on NH-33 (Ranchi-Jamshedpur highway)',
    phase: 'Deployed',
    domain: 'Infrastructure',
    district: 'Ranchi',
    votes: 289,
    timeAgo: '45d ago',
    teams: '1 team(s)',
    desc: 'Automated dashcam AI detection of surface cracks and potholes with real-time GPS telemetry routed to NHAI maintenance depot.',
    stepNumber: 7,
    totalSteps: 7
  },
  {
    id: 'JH-2024-1824',
    priority: 'Medium',
    title: 'Healthcare worker absence tracking in remote PHCs',
    phase: 'Testing',
    domain: 'Healthcare',
    district: 'Lohardaga',
    votes: 198,
    timeAgo: '12d ago',
    teams: '1 team(s)',
    desc: 'Geo-fenced biometric logging and telemedicine triage for Auxiliary Nurse Midwives in forested blocks.',
    stepNumber: 6,
    totalSteps: 7
  },
  {
    id: 'JH-2024-1850',
    priority: 'High',
    title: 'Forest honey branding & supply chain traceability',
    phase: 'Proposal',
    domain: 'Livelihood',
    district: 'Latehar',
    votes: 165,
    timeAgo: '8d ago',
    teams: '2 team(s)',
    desc: 'Blockchain-backed QR authentication for wild forest honey harvested by Paharia tribal groups.',
    stepNumber: 4,
    totalSteps: 7
  }
];

let selectedExplorerId = 'JH-2024-1810';
let currentExplorerPhase = 'all';

function initExplorerMasterList() {
  const searchInput = document.getElementById('challengeSearchInput');
  const distSelect = document.getElementById('districtFilter');

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      renderExplorerMasterList();
    });
  }

  if (distSelect) {
    distSelect.addEventListener('change', () => {
      renderExplorerMasterList();
    });
  }

  renderExplorerMasterList();
  selectChallengeDetail('JH-2024-1810');
}

function renderExplorerMasterList() {
  const container = document.getElementById('challengesMasterList');
  if (!container) return;

  const query = document.getElementById('challengeSearchInput')?.value.toLowerCase().trim() || '';
  const selectedDist = document.getElementById('districtFilter')?.value || 'all';

  const filtered = EXPLORER_CHALLENGES.filter(c => {
    const matchPhase = (currentExplorerPhase === 'all') || (c.phase.toLowerCase() === currentExplorerPhase.toLowerCase());
    const matchDist = (selectedDist === 'all') || (c.district.toLowerCase() === selectedDist.toLowerCase());
    const matchQuery = !query || c.title.toLowerCase().includes(query) || c.domain.toLowerCase().includes(query) || c.district.toLowerCase().includes(query) || c.id.toLowerCase().includes(query);
    return matchPhase && matchDist && matchQuery;
  });

  const countText = document.getElementById('resultsCountText');
  if (countText) countText.textContent = `${filtered.length} results`;

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="background: #FFFFFF; border: 1px dashed #CBD5E1; border-radius: 8px; padding: 32px; text-align: center; color: #64748B;">
        <p style="font-weight: 600;">No challenges match this filter</p>
        <button class="btn-primary-action btn-sm" style="margin-top: 10px;" onclick="filterByPhase(document.querySelector('.phase-pill'), 'all')">Show All</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(c => {
    const isSelected = c.id === selectedExplorerId;
    const priorityPill = c.priority === 'Critical' ? 'pill-priority-critical' : (c.priority === 'High' ? 'pill-priority-high' : 'status-pill-neutral');
    const phasePill = c.phase === 'Deployed' || c.phase === 'Development' ? 'status-pill-accent' : 'status-pill-neutral';

    return `
      <div class="explorer-item-card ${isSelected ? 'selected' : ''}" onclick="selectChallengeDetail('${c.id}')">
        <div class="eic-top-row">
          <div class="eic-code-row">
            <span class="eic-id">${c.id}</span>
            <span class="${priorityPill}">${c.priority}</span>
          </div>
          <div class="eic-votes-meta">
            <span class="eic-votes-num">&#9650; ${c.votes}</span>
            <span class="eic-time-ago">${c.timeAgo}</span>
          </div>
        </div>

        <h4 class="eic-title">${c.title}</h4>

        <div class="eic-meta-pills">
          <div class="eic-pills-left">
            <span class="${phasePill}">${c.phase}</span>
            <span class="status-pill-neutral">${c.domain}</span>
            <span class="status-pill-neutral">${c.district}</span>
          </div>
          <span class="eic-teams-count">${c.teams}</span>
        </div>
      </div>
    `;
  }).join('');
}

window.selectChallengeDetail = function(id) {
  selectedExplorerId = id;
  const item = EXPLORER_CHALLENGES.find(c => c.id === id);
  if (!item) return;

  // Highlight active in list
  document.querySelectorAll('.explorer-item-card').forEach(card => {
    card.classList.remove('selected');
  });
  // Find card with this ID and add selected
  const allCards = document.querySelectorAll('.explorer-item-card');
  allCards.forEach(card => {
    if (card.querySelector('.eic-id')?.textContent.trim() === id) {
      card.classList.add('selected');
    }
  });

  // Populate Right Detail Panel
  const detailId = document.getElementById('detailId');
  const detailPriority = document.getElementById('detailPriority');
  const detailTitle = document.getElementById('detailTitle');
  const detailPhase = document.getElementById('detailPhase');
  const detailDomain = document.getElementById('detailDomain');
  const detailDistrict = document.getElementById('detailDistrict');
  const detailVotes = document.getElementById('detailVotes');
  const detailTeams = document.getElementById('detailTeams');
  const detailDesc = document.getElementById('detailDesc');
  const detailStepText = document.getElementById('detailStepText');
  const detailSegmentsTrack = document.getElementById('detailSegmentsTrack');
  const detailVoteCount = document.getElementById('detailVoteCount');

  if (detailId) detailId.textContent = item.id;
  if (detailPriority) {
    detailPriority.textContent = item.priority;
    detailPriority.className = item.priority === 'Critical' ? 'pill-priority-critical' : (item.priority === 'High' ? 'pill-priority-high' : 'status-pill-neutral');
  }
  if (detailTitle) detailTitle.textContent = item.title;
  if (detailPhase) detailPhase.textContent = item.phase;
  if (detailDomain) detailDomain.textContent = item.domain;
  if (detailDistrict) detailDistrict.textContent = item.district;
  if (detailVotes) detailVotes.innerHTML = `&#9650; ${item.votes}`;
  if (detailTeams) detailTeams.textContent = item.teams;
  if (detailDesc) detailDesc.textContent = item.desc;
  if (detailVoteCount) detailVoteCount.textContent = item.votes;

  if (detailStepText) detailStepText.textContent = `Step ${item.stepNumber} of ${item.totalSteps}`;

  if (detailSegmentsTrack) {
    let segmentsHtml = '';
    for (let i = 1; i <= item.totalSteps; i++) {
      const activeClass = i <= item.stepNumber ? 'active' : '';
      segmentsHtml += `<div class="pp-seg ${activeClass}"></div>`;
    }
    detailSegmentsTrack.innerHTML = segmentsHtml;
  }
};

window.filterByPhase = function(btn, phase) {
  document.querySelectorAll('.phase-pill').forEach(p => p.classList.remove('active'));
  if (btn) btn.classList.add('active');
  currentExplorerPhase = phase;
  renderExplorerMasterList();
  showToast(`Filtered by phase: ${phase}`);
};

window.voteOnDetail = function() {
  const item = EXPLORER_CHALLENGES.find(c => c.id === selectedExplorerId);
  if (!item) return;
  item.votes++;
  selectChallengeDetail(selectedExplorerId);
  renderExplorerMasterList();
  showToast(`Upvoted! Community votes: ${item.votes}`);
};

window.runAiMatchFromExplorer = function() {
  const item = EXPLORER_CHALLENGES.find(c => c.id === selectedExplorerId);
  if (item) {
    // Preload top card in AI Matching view
    const titleEl = document.querySelector('#view-ai-matching .ai-prob-title');
    const metaEl = document.querySelector('#view-ai-matching .ai-prob-meta');
    const codeEl = document.querySelector('#view-ai-matching .item-id-code');
    if (titleEl) titleEl.textContent = item.title;
    if (metaEl) metaEl.textContent = `${item.votes * 30} people affected \u2022 ${item.district}, Jharkhand`;
    if (codeEl) codeEl.textContent = item.id;
  }
  switchView('ai-matching');
  showToast(`Loaded "${item ? item.title : 'Challenge'}" into AI Matching Engine`);
};

/* ==========================================================================
   11. AI Matching Engine Controller
   ========================================================================== */
window.triggerAiMatchingEngine = function() {
  const btn = document.getElementById('btnRunAiMatching');
  const initialSparkle = document.getElementById('aiSparkleInitial');
  const resultsWrapper = document.getElementById('aiResultsWrapper');

  if (btn) {
    btn.innerHTML = `<span>Analyzing 7 Dimensions...</span>`;
    btn.style.opacity = '0.8';
  }

  showToast('AI NLP Matrix running: matching faculty, laboratories & patent clusters...');

  setTimeout(() => {
    if (btn) {
      btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></svg><span>Re-Run AI Matching</span>`;
      btn.style.opacity = '1';
    }
    if (initialSparkle) initialSparkle.style.display = 'none';
    if (resultsWrapper) {
      resultsWrapper.style.display = 'block';
      resultsWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    showToast('Match Complete: BIT Mesra (98%), IIT ISM Dhanbad (94%), AIIMS Deoghar (91%)');
  }, 600);
};

/* ==========================================================================
   12. Project Workspace Sub-Tabs & Tasks Controller
   ========================================================================== */
window.switchWorkspaceTab = function(tab) {
  document.querySelectorAll('.ws-tab-btn').forEach(b => b.classList.remove('active'));
  const targetBtn = document.getElementById(`wsTab${tab.charAt(0).toUpperCase() + tab.slice(1)}`);
  if (targetBtn) targetBtn.classList.add('active');

  const board = document.getElementById('wsKanbanBoard');
  const discussion = document.getElementById('wsTabContentDiscussion');

  if (tab === 'board') {
    if (board) board.style.display = 'grid';
    if (discussion) discussion.style.display = 'none';
  } else if (tab === 'discussion') {
    if (board) board.style.display = 'none';
    if (discussion) discussion.style.display = 'block';
  } else {
    showToast(`Viewing ${tab.toUpperCase()} archive for Bokaro IoT Project`);
  }
};

window.addNewWorkspaceTask = function(columnName) {
  const title = prompt(`Enter task description for "${columnName}":`, 'Calibrate sensor threshold parameters');
  if (!title) return;

  const cols = document.querySelectorAll('.ws-kanban-col');
  let targetCol = cols[0];
  if (columnName === 'In Progress') targetCol = cols[1];
  if (columnName === 'Done') targetCol = cols[2];

  if (!targetCol) return;

  const stack = targetCol.querySelector('.ws-cards-stack');
  const countEl = targetCol.querySelector('.col-count');
  const currentCount = parseInt(countEl?.textContent || '0') + 1;
  if (countEl) countEl.textContent = currentCount;

  const newTask = document.createElement('div');
  newTask.className = 'ws-task-card';
  newTask.innerHTML = `
    <div class="task-card-top">
      <div class="task-id-dot">
        <span class="task-code">T-0${Math.floor(10 + Math.random() * 89)}</span>
        <span class="dot-amber"></span>
      </div>
    </div>
    <h4 class="task-title">${title}</h4>
    <div class="task-footer">
      <span class="task-assignee">RK</span>
      <span class="task-due">Due Dec 10</span>
    </div>
  `;

  const btnAdd = stack.querySelector('.ws-btn-add-task');
  if (btnAdd) {
    stack.insertBefore(newTask, btnAdd);
  } else {
    stack.appendChild(newTask);
  }

  showToast(`Task added to ${columnName}: "${title}"`);
};

/* ==========================================================================
   13. Industry Partners Sub-Tabs & Registration Controller
   ========================================================================== */
window.switchIndustryTab = function(tab) {
  document.querySelectorAll('.ind-tab-btn').forEach(b => b.classList.remove('active'));
  const targetBtn = document.getElementById(`indTab${tab.charAt(0).toUpperCase() + tab.slice(1)}`);
  if (targetBtn) targetBtn.classList.add('active');

  const partnersGrid = document.getElementById('indPartnersGrid');
  const oppsPanel = document.getElementById('indOppsPanel');
  const joinPanel = document.getElementById('indJoinPanel');

  if (partnersGrid) partnersGrid.style.display = tab === 'active' ? 'grid' : 'none';
  if (oppsPanel) oppsPanel.style.display = tab === 'opps' ? 'block' : 'none';
  if (joinPanel) joinPanel.style.display = tab === 'join' ? 'block' : 'none';

  if (tab === 'join' && joinPanel) {
    joinPanel.scrollIntoView({ behavior: 'smooth' });
  }
};

window.submitIndustryApplication = function(event) {
  event.preventDefault();
  const orgName = document.getElementById('indOrgName')?.value || 'Your Organization';
  const orgType = document.getElementById('indOrgType')?.value || 'Corporate CSR';

  showToast(`Partnership Application submitted for ${orgName}! Assigned to Higher Education CSR Desk.`);
  
  // Reset and switch back to active tab
  event.target.reset();
  setTimeout(() => {
    switchIndustryTab('active');
  }, 800);
};



