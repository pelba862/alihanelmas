(() => {
  // ── Elements ──
  const header = document.getElementById('header');
  const hamburger = document.getElementById('hamburger');
  const navList = document.getElementById('nav-list');
  const scrollProgress = document.querySelector('.scroll-progress');

  // ── Parallax Background Decorations ──
  const decorItems = document.querySelectorAll('.decor-item');
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    decorItems.forEach((item, index) => {
      const speed = (index + 1) * 0.2;
      item.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
  });

  // ── Typewriter Effect ──
  const typewriter = document.querySelector('.typewriter');
  if (typewriter) {
    const words = JSON.parse(typewriter.getAttribute('data-words'));
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 150;

    const type = () => {
      const currentWord = words[wordIndex];
      if (isDeleting) {
        typewriter.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 75;
      } else {
        typewriter.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 150;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
      }

      setTimeout(type, typeSpeed);
    };
    setTimeout(type, 1000);
  }

  // ── Scroll: Header + Progress ──
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const sy = window.scrollY;
        // Header
        header.classList.toggle('scrolled', sy > 80);
        // Progress bar
        const h = document.documentElement.scrollHeight - window.innerHeight;
        scrollProgress.style.width = h > 0 ? (sy / h * 100) + '%' : '0%';
        ticking = false;
      });
      ticking = true;
    }
  });

  // ── Mobile Menu ──
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navList.classList.toggle('open');
    document.body.style.overflow = navList.classList.contains('open') ? 'hidden' : '';
  });

  const closeMenu = () => {
    hamburger.classList.remove('open');
    navList.classList.remove('open');
    document.body.style.overflow = '';
  };

  // ── Smooth Scroll ──
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id === '#') { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); closeMenu(); return; }
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        closeMenu();
        const offset = header.offsetHeight + 20;
        window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
      }
    });
  });

  // ── Scroll Reveal ──
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => io.observe(el));

  // ── Contact Form ──
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      const name = document.getElementById('name').value;

      btn.disabled = true;
      btn.textContent = 'İletiliyor...';
      btn.style.opacity = '0.6';

      setTimeout(() => {
        // Toast notification
        const toast = document.createElement('div');
        toast.textContent = `Teşekkürler ${name}! Başvurunuz alındı.`;
        Object.assign(toast.style, {
          position: 'fixed', bottom: '-60px', left: '50%', transform: 'translateX(-50%)',
          background: '#ff3333', color: '#fff', padding: '14px 32px', borderRadius: '50px',
          fontWeight: '600', fontSize: '0.9rem', zIndex: '99999', whiteSpace: 'nowrap',
          boxShadow: '0 10px 30px rgba(255,51,51,0.4)',
          transition: 'bottom 0.5s cubic-bezier(0.23,1,0.32,1)'
        });
        document.body.appendChild(toast);
        requestAnimationFrame(() => { toast.style.bottom = '32px'; });

        form.reset();
        btn.disabled = false;
        btn.textContent = original;
        btn.style.opacity = '1';

        setTimeout(() => {
          toast.style.bottom = '-60px';
          setTimeout(() => toast.remove(), 600);
        }, 4000);
      }, 1500);
    });
  }
})();
