document.getElementById('year').textContent = new Date().getFullYear();

/* mobile menu toggle */
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* active nav link on scroll */
const sections = document.querySelectorAll('main section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');
function setActiveLink(){
  let current = sections[0].id;
  const offset = 120;
  sections.forEach(sec => {
    if (window.scrollY + offset >= sec.offsetTop) current = sec.id;
  });
  navAnchors.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}
window.addEventListener('scroll', setActiveLink);
setActiveLink();

/* back to top button */
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  toTop.classList.toggle('visible', window.scrollY > 500);
});
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* typewriter effect for the "first line, 2018" quote */
const twEl = document.getElementById('typewriter');
const poemSlot = document.getElementById('poem-text');
const fallbackLine = 'this line is waiting for your very first poem...';
const twText = (poemSlot && poemSlot.textContent.trim()) ? poemSlot.textContent.trim() : fallbackLine;
let twIndex = 0;
function typeWriter(){
  if (twIndex <= twText.length){
    twEl.textContent = twText.slice(0, twIndex);
    twIndex++;
    setTimeout(typeWriter, 55);
  }
}
const twObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      typeWriter();
      twObserver.disconnect();
    }
  });
}, { threshold: 0.4 });
twObserver.observe(document.querySelector('.hero-typewriter'));

/* scroll reveal */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

/* animated stat counters */
const statNums = document.querySelectorAll('.stat-num');
const statObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      let current = 0;
      const step = Math.max(1, Math.round(target / 40));
      const timer = setInterval(() => {
        current += step;
        if (current >= target){
          current = target;
          clearInterval(timer);
        }
        el.textContent = current;
      }, 30);
      statObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
statNums.forEach(el => statObserver.observe(el));

/* animated skill bars */
const barFills = document.querySelectorAll('.bar-fill');
const barObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.style.width = entry.target.dataset.width + '%';
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });
barFills.forEach(el => barObserver.observe(el));

/* contact form (front-end only, opens mail client) */
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(contactForm);
  const name = data.get('name');
  const subject = data.get('subject') || 'Message from your portfolio';
  const message = data.get('message');
  const email = data.get('email');
  const mailto = 'mailto:youremail@example.com' +
    '?subject=' + encodeURIComponent(subject) +
    '&body=' + encodeURIComponent(`From: ${name} (${email})\n\n${message}`);
  window.location.href = mailto;
  formNote.textContent = 'Opening your email client...';
  contactForm.reset();
});
