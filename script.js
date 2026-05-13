document.addEventListener('DOMContentLoaded', () => {
  const hero = document.getElementById('hero');
  const navbar = document.querySelector('.navbar');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelectorAll('.navbar nav a, .brand, .footer-links a, .footer-brand');
  const revealElements = document.querySelectorAll('.reveal');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');
  const detailButtons = document.querySelectorAll('.card-btn-detail');
  const faqItems = document.querySelectorAll('.faq-item');
  const contactForm = document.querySelector('.contact-form');
  const tickerTrack = document.querySelector('.ticker-track');
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (hero) {
    window.setTimeout(() => hero.classList.add('loaded'), 120);
  }

  if (tickerTrack && !tickerTrack.dataset.cloned) {
    tickerTrack.innerHTML += tickerTrack.innerHTML;
    tickerTrack.dataset.cloned = 'true';
  }

  revealElements.forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index % 6, 5) * 55}ms`;
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.14,
    rootMargin: '0px 0px -52px 0px'
  });

  revealElements.forEach((element) => revealObserver.observe(element));

  const syncNavbar = () => {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  };

  syncNavbar();
  window.addEventListener('scroll', syncNavbar, { passive: true });

  window.addEventListener('scroll', () => {
    const heroBg = document.querySelector('.hero-bg');
    if (!heroBg || motionQuery.matches) return;
    heroBg.style.transform = `scale(1.05) translateY(${window.scrollY * 0.13}px)`;
  }, { passive: true });

  const closeMenu = () => {
    if (!navbar || !navToggle) return;
    navbar.classList.remove('menu-open');
    document.body.classList.remove('menu-locked');
    navToggle.setAttribute('aria-expanded', 'false');
  };

  if (navToggle && navbar) {
    navToggle.addEventListener('click', () => {
      const isOpen = navbar.classList.toggle('menu-open');
      document.body.classList.toggle('menu-locked', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  navLinks.forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const href = anchor.getAttribute('href');
      if (!href || !href.startsWith('#')) return;

      event.preventDefault();
      closeMenu();

      const target = document.querySelector(href);
      if (!target) return;

      const offset = 84;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((item) => item.classList.remove('active'));
      button.classList.add('active');

      const filter = button.dataset.filter;
      let visibleIndex = 0;

      productCards.forEach((card) => {
        const categories = card.dataset.category || '';
        const shouldShow = filter === 'all' || categories.includes(filter);

        if (shouldShow) {
          card.style.display = '';
          card.style.transitionDelay = `${visibleIndex * 55}ms`;
          visibleIndex += 1;
          requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = '';
          });
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(18px)';
          card.style.transitionDelay = '0ms';
          window.setTimeout(() => {
            const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
            const activeCategories = card.dataset.category || '';
            if (activeFilter !== 'all' && !activeCategories.includes(activeFilter)) {
              card.style.display = 'none';
            }
          }, 280);
        }
      });
    });
  });

  detailButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const card = button.closest('.product-card');
      if (!card) return;

      const isOpen = card.classList.toggle('details-open');
      button.textContent = isOpen ? 'Ocultar detalles' : 'Ver detalles';
    });
  });

  productCards.forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      if (motionQuery.matches || window.innerWidth < 900) return;

      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-10px) rotateX(${y * -3}deg) rotateY(${x * 3}deg)`;
    });

    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
    });
  });

  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach((other) => other.classList.remove('active'));
      item.classList.toggle('active', !isActive);
    });
  });

  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const name = document.getElementById('name')?.value.trim() || 'Cliente';
      const number = document.getElementById('numero')?.value.trim();
      const message = document.getElementById('message')?.value.trim() || 'Quiero informacion sobre el drop de RESURGE.';
      const fullMessage = `Hola, soy ${name}. ${number ? `Mi WhatsApp es ${number}. ` : ''}${message}`;
      const whatsappUrl = `https://wa.me/523340187767?text=${encodeURIComponent(fullMessage)}`;

      window.open(whatsappUrl, '_blank');
    });
  }
});
