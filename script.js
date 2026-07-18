// ================= NAVBAR ================= //
const navbar = document.getElementById('navbar');
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
const toTop = document.getElementById('toTop');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  toTop.classList.toggle('show', window.scrollY > 500);
  highlightNav();
});

burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  burger.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

toTop.addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}));

function highlightNav(){
  const sections = document.querySelectorAll('section[id], .hero[id]');
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 140;
    if (window.scrollY >= top) current = sec.getAttribute('id');
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}

// ================= CURSOR GLOW ================= //
const glow = document.getElementById('cursorGlow');
window.addEventListener('mousemove', e => {
  glow.style.setProperty('--x', e.clientX + 'px');
  glow.style.setProperty('--y', e.clientY + 'px');
});

// ================= TYPED ROLE TEXT ================= //
const roles = ['Ethical Hacker', 'Penetration Tester', 'Bug Bounty Hunter', 'Red Teamer'];
const typedEl = document.getElementById('typedRole');
let roleIndex = 0, charIndex = 0, deleting = false;

function typeLoop(){
  const current = roles[roleIndex];
  if (!deleting){
    charIndex++;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === current.length){
      deleting = true;
      setTimeout(typeLoop, 1500);
      return;
    }
  } else {
    charIndex--;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === 0){
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeLoop, deleting ? 45 : 85);
}
typeLoop();

// ================= SCROLL REVEAL ================= //
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, {threshold: 0.15});
revealEls.forEach(el => revealObserver.observe(el));

// ================= TABS (Experience/Education/Skills) ================= //
const tabBtns = document.querySelectorAll('.tab-btn');
const panels = document.querySelectorAll('.tab-panel');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    const panel = document.getElementById('panel-' + btn.dataset.tab);
    panel.classList.add('active');
    if (btn.dataset.tab === 'skills') animateSkillBars();
  });
});

function animateSkillBars(){
  document.querySelectorAll('.bar i').forEach(bar => {
    bar.classList.remove('animate');
    void bar.offsetWidth; // restart animation
    bar.classList.add('animate');
  });
}

// also animate skill bars once visible even on default tab load if user scrolls to skills
const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && document.querySelector('.tab-btn[data-tab="skills"]').classList.contains('active')){
      animateSkillBars();
    }
  });
}, {threshold: 0.4});
const skillsPanel = document.getElementById('panel-skills');
if (skillsPanel) skillsObserver.observe(skillsPanel);

// ================= CERTIFICATIONS GRID ================= //
const certs = [
  {title:'eJPT', sub:'Junior Penetration Tester', icon:'fa-solid fa-certificate', c1:'#4d6bfe', c2:'#8b5cf6'},
  {title:'Jr Penetration Tester (Legacy)', sub:'Learning Path', icon:'fa-solid fa-flag-checkered', c1:'#0f172a', c2:'#334155'},
  {title:'CSEDP', sub:'Certified Security Expert', icon:'fa-solid fa-shield-halved', c1:'#0d3b66', c2:'#14532d'},
  {title:'Red Team Leaders', sub:'Certified Cybersecurity Educator (CCEP)', icon:'fa-solid fa-user-ninja', c1:'#7f1d1d', c2:'#450a0a'},
  {title:'Certificate of Completion', sub:'Advanced Pentesting Techniques', icon:'fa-solid fa-scroll', c1:'#78350f', c2:'#451a03'},
  {title:'Certified Web App Pentester', sub:'Apprentice Level', icon:'fa-solid fa-bug', c1:'#111827', c2:'#1f2937'},
  {title:'API Penetration Testing', sub:'12 Hours Program', icon:'fa-solid fa-network-wired', c1:'#0e7490', c2:'#164e63'},
  {title:'Google Cybersecurity', sub:'Professional Certificate', icon:'fa-brands fa-google', c1:'#1a73e8', c2:'#174ea6'},
  {title:'WIZ Bug Bounty Masterclass', sub:'Successfully Achieving the Certification', icon:'fa-solid fa-medal', c1:'#5b21b6', c2:'#312e81'},
  {title:'Certificate', sub:'Security Fundamentals', icon:'fa-solid fa-certificate', c1:'#0f766e', c2:'#134e4a'},
  {title:'CNSP', sub:'Certified Network Security Practitioner', icon:'fa-solid fa-lock', c1:'#1d4ed8', c2:'#1e293b'},
  {title:'ACP', sub:'Advanced Cybersecurity Professional', icon:'fa-solid fa-award', c1:'#a16207', c2:'#713f12'},
  {title:'Certificate of Excellence', sub:'Outstanding Performance', icon:'fa-solid fa-star', c1:'#065f46', c2:'#022c22'},
  {title:'Cyber Security Internship', sub:'Certificate of Completion', icon:'fa-solid fa-briefcase', c1:'#1f2937', c2:'#111827'},
  {title:'Cyber Security Fundamentals', sub:'Udemy', icon:'fa-solid fa-graduation-cap', c1:'#7c2d12', c2:'#431407'},
];

const certsGrid = document.getElementById('certsGrid');
certs.forEach((c, i) => {
  const card = document.createElement('div');
  card.className = 'cert-card reveal';
  card.style.setProperty('--cg', `linear-gradient(150deg, ${c.c1}, ${c.c2})`);
  card.innerHTML = `
    <i class="${c.icon} cert-icon"></i>
    <h6>${c.title}</h6>
    <span>Nadim Mahmud</span>
  `;
  certsGrid.appendChild(card);
  revealObserver.observe(card);
});

// ================= CONTACT FORM ================= //
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  status.textContent = 'Sending...';
  setTimeout(() => {
    status.textContent = "Thanks! Your message has been sent \u2014 I'll get back to you soon.";
    form.reset();
  }, 900);
});

// ================= DOWNLOAD CV ================= //
// The button links directly to Nadim_Mahmud_CV.pdf with a download attribute,
// so clicking it downloads the file automatically — no extra JS needed.