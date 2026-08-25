// ===== Sticky nav + mobile toggle =====
const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

function onScroll(){
  if(window.scrollY > 20){ navbar.classList.add('scrolled'); }
  else{ navbar.classList.remove('scrolled'); }
}
if(navbar){
  window.addEventListener('scroll', onScroll);
  onScroll();
}
if(navToggle && navLinks){
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
}

// ===== Scroll reveal =====
const revealEls = document.querySelectorAll('.reveal');
if('IntersectionObserver' in window && revealEls.length){
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('is-visible'));
}

// ===== Animated counters =====
const counters = document.querySelectorAll('[data-count]');
if(counters.length){
  const countIo = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      const duration = 1600;
      const start = performance.now();
      function tick(now){
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if(progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      countIo.unobserve(el);
    });
  }, { threshold: 0.4 });
  counters.forEach(el => countIo.observe(el));
}

// ===== Masonry review lightbox =====
const masonryItems = document.querySelectorAll('.masonry-item img');
const lightbox = document.querySelector('.lightbox');
if(lightbox && masonryItems.length){
  const lightboxImg = lightbox.querySelector('img');
  masonryItems.forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('open');
    });
  });
  lightbox.addEventListener('click', () => lightbox.classList.remove('open'));
  document.addEventListener('keydown', e => {
    if(e.key === 'Escape') lightbox.classList.remove('open');
  });
}

// ===== FAQ accordion =====
document.querySelectorAll('.faq-item').forEach(item => {
  const q = item.querySelector('.faq-q');
  const a = item.querySelector('.faq-a');
  q.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(openItem => {
      if(openItem !== item){
        openItem.classList.remove('open');
        openItem.querySelector('.faq-a').style.maxHeight = null;
      }
    });
    item.classList.toggle('open', !isOpen);
    a.style.maxHeight = !isOpen ? a.scrollHeight + 'px' : null;
  });
});
