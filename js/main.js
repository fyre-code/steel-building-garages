/* ============================================================
   STEEL BUILDING GARAGES — Main JS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Call CTA scroll-in animation ──────────────────────── */
  const callButtons = document.querySelectorAll('.btn-call');
  if (callButtons.length) {
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('btn-call-in');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      callButtons.forEach(btn => io.observe(btn));
    } else {
      callButtons.forEach(btn => btn.classList.add('btn-call-in'));
    }
  }

  /* ── Mobile hamburger ──────────────────────────────────── */
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileNav = document.querySelector('.nav-mobile');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
    });
  }

  /* ── Desktop dropdown ──────────────────────────────────── */
  document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
    const toggle = dropdown.querySelector('.nav-dropdown-toggle');

    toggle.addEventListener('click', e => {
      e.stopPropagation();
      const isOpen = dropdown.classList.contains('open');
      document.querySelectorAll('.nav-dropdown.open').forEach(d => d.classList.remove('open'));
      if (!isOpen) dropdown.classList.add('open');
    });

    dropdown.addEventListener('mouseenter', () => {
      if (window.innerWidth > 768) dropdown.classList.add('open');
    });
    dropdown.addEventListener('mouseleave', () => {
      if (window.innerWidth > 768) dropdown.classList.remove('open');
    });
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('.nav-dropdown.open').forEach(d => d.classList.remove('open'));
  });

  /* ── FAQ Accordion ─────────────────────────────────────── */
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      document.querySelectorAll('.faq-item.open').forEach(open => {
        open.classList.remove('open');
        open.querySelector('.faq-answer').style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* ── Testimonial Carousel ──────────────────────────────── */
  document.querySelectorAll('.carousel-wrapper').forEach(wrapper => {
    const track = wrapper.querySelector('.carousel-track');
    const cards = Array.from(track.querySelectorAll('.testimonial-card'));
    const dots = wrapper.querySelectorAll('.carousel-dot');
    const prevBtn = wrapper.querySelector('.carousel-prev');
    const nextBtn = wrapper.querySelector('.carousel-next');

    if (!cards.length) return;

    let current = 0;
    let perView = getPerView();
    let total = Math.ceil(cards.length / perView);
    let autoTimer;

    function getPerView() {
      return 1;
    }

    function layout() {
      track.style.width = (cards.length / perView * 100) + '%';
      cards.forEach(c => { c.style.flex = `0 0 ${100 / cards.length}%`; });
    }

    function goTo(index) {
      current = ((index % total) + total) % total;
      const pct = (current / total) * 100;
      track.style.transform = `translateX(-${pct}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    layout();

    function startAuto() {
      autoTimer = setInterval(() => goTo(current + 1), 5000);
    }
    function stopAuto() { clearInterval(autoTimer); }

    track.style.transition = 'transform .5s ease';

    if (prevBtn) prevBtn.addEventListener('click', () => { stopAuto(); goTo(current - 1); startAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { stopAuto(); goTo(current + 1); startAuto(); });
    dots.forEach((d, i) => d.addEventListener('click', () => { stopAuto(); goTo(i); startAuto(); }));

    window.addEventListener('resize', () => {
      perView = getPerView();
      total = Math.ceil(cards.length / perView);
      layout();
      goTo(Math.min(current, total - 1));
    });

    goTo(0);
    startAuto();
  });

  /* ── Popup ─────────────────────────────────────────────── */
  const overlay = document.querySelector('.popup-overlay');
  if (overlay) {
    const closeBtn = overlay.querySelector('.popup-close');

    setTimeout(() => overlay.classList.add('visible'), 3000);

    function closePopup() { overlay.classList.remove('visible'); }

    if (closeBtn) closeBtn.addEventListener('click', closePopup);

    overlay.addEventListener('click', e => {
      if (e.target === overlay) closePopup();
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closePopup();
    });
  }

  /* ── Tel links: desktop no-op ─────────────────────────── */
  const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)');
  document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', e => {
      if (isDesktop.matches) e.preventDefault();
    });
  });

});
