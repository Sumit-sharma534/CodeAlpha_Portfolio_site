/* ── Nav scroll effect ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ── Hamburger menu ── */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
function closeMobile() { mobileMenu.classList.remove('open'); }

/* ── Smooth scroll ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id === '#') return;
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    closeMobile();
  });
});

/* ── Reveal on scroll ── */
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
revealEls.forEach(el => revealObs.observe(el));

/* ── Progress bars ── */
const fills = document.querySelectorAll('.progress-fill');
const fillObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const w = entry.target.getAttribute('data-w');
      entry.target.style.width = w + '%';
      fillObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
fills.forEach(el => fillObs.observe(el));

/* ── Auto-type "Sumit Sharma" repeat ── */
(function () {
  const nameSpan = document.getElementById('autoTypeName');
  if (!nameSpan) return;

  const fullName   = 'Sumit Sharma';
  const typeSpeed  = 100;   // ms per character while typing
  const deleteSpeed = 55;   // ms per character while deleting
  const pauseAfterType   = 1800; // pause after fully typed
  const pauseAfterDelete = 500;  // pause after fully deleted

  let idx       = 0;
  let deleting  = false;

  function tick() {
    if (!deleting) {
      // Typing forward
      nameSpan.textContent = fullName.slice(0, idx + 1);
      idx++;
      if (idx === fullName.length) {
        // Fully typed — pause then start deleting
        deleting = true;
        setTimeout(tick, pauseAfterType);
        return;
      }
      setTimeout(tick, typeSpeed);
    } else {
      // Deleting backward
      nameSpan.textContent = fullName.slice(0, idx - 1);
      idx--;
      if (idx === 0) {
        // Fully deleted — pause then start typing again
        deleting = false;
        setTimeout(tick, pauseAfterDelete);
        return;
      }
      setTimeout(tick, deleteSpeed);
    }
  }

  // Start after a short delay on page load
  setTimeout(tick, 600);
})();

/* ── Contact form ── */
const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending…';
    btn.disabled = true;
    setTimeout(() => {
      form.reset();
      btn.textContent = 'Send Message 🚀';
      btn.disabled = false;
      formSuccess.classList.add('show');
      setTimeout(() => formSuccess.classList.remove('show'), 4000);
    }, 1200);
  });
}

/* ── Draggable Name ── */
const nameEl = document.getElementById('draggableName');
if (nameEl) {
  let dragging = false, startX = 0, startY = 0;

  nameEl.addEventListener('mousedown', e => {
    dragging = true;
    startX = e.clientX;
    startY = e.clientY;
    nameEl.style.transition = 'none';
    e.preventDefault();
  });

  document.addEventListener('mousemove', e => {
    if (!dragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    nameEl.style.transform = `translate(${dx}px, ${dy}px) rotate(${dx * 0.025}deg)`;
  });

  document.addEventListener('mouseup', () => {
    if (!dragging) return;
    dragging = false;
    nameEl.style.transition = 'transform 0.65s cubic-bezier(0.34,1.56,0.64,1)';
    nameEl.style.transform = 'translate(0,0) rotate(0deg)';
    setTimeout(() => { nameEl.style.transition = ''; }, 700);
  });

  /* Touch */
  nameEl.addEventListener('touchstart', e => {
    dragging = true;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    nameEl.style.transition = 'none';
  }, { passive: true });

  document.addEventListener('touchmove', e => {
    if (!dragging) return;
    const dx = e.touches[0].clientX - startX;
    const dy = e.touches[0].clientY - startY;
    nameEl.style.transform = `translate(${dx}px, ${dy}px) rotate(${dx * 0.025}deg)`;
  }, { passive: true });

  document.addEventListener('touchend', () => {
    if (!dragging) return;
    dragging = false;
    nameEl.style.transition = 'transform 0.65s cubic-bezier(0.34,1.56,0.64,1)';
    nameEl.style.transform = 'translate(0,0) rotate(0deg)';
    setTimeout(() => { nameEl.style.transition = ''; }, 700);
  });

  /* Magnetic letters on hover */
  const letters = nameEl.querySelectorAll('.name-letter');
  document.addEventListener('mousemove', e => {
    if (dragging) return;
    letters.forEach(letter => {
      const r = letter.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
      if (dist < 70) {
        const s = (1 - dist / 70) * 10;
        const ang = Math.atan2(e.clientY - cy, e.clientX - cx);
        letter.style.transform = `translate(${-Math.cos(ang)*s}px, ${-Math.sin(ang)*s}px)`;
      } else {
        letter.style.transform = '';
      }
    });
  });
}