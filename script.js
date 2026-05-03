// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.getElementById('nav-links');

if (mobileMenuBtn && navLinks) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
  });
}

// Header Background Change on Scroll
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
  const windowHeight = window.innerHeight;
  const revealPoint = 150;

  revealElements.forEach(element => {
    const revealTop = element.getBoundingClientRect().top;
    if (revealTop < windowHeight - revealPoint) {
      element.classList.add('active');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
// Run once on load to show elements already in view
revealOnScroll();

// Smooth scrolling for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    // Close mobile menu if open
    if (navLinks && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      mobileMenuBtn.classList.remove('active');
      document.body.style.overflow = 'auto';
    }

    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const target = document.querySelector(targetId);
    if (target) {
      const headerHeight = header.offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Contact form handling with feedback
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerText;
    
    // Simulate loading state
    submitBtn.disabled = true;
    submitBtn.innerText = "Gönderiliyor...";
    
    const name = document.getElementById("name").value;
    
    // Simulate API call
    setTimeout(() => {
      alert(`Teşekkürler ${name}! Mesajınız başarıyla iletildi. En kısa sürede sizinle iletişime geçeceğim.`);
      contactForm.reset();
      submitBtn.disabled = false;
      submitBtn.innerText = originalBtnText;
    }, 1500);
  });
}

// Pricing buttons functionality
document.querySelectorAll(".pricing-btn").forEach(btn => {
  btn.addEventListener("click", function(e) {
    // Scroll to contact form
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const headerHeight = header.offsetHeight;
      const targetPosition = contactSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Focus on name input
      setTimeout(() => {
        document.getElementById('name').focus();
      }, 800);
    }
  });
});

// Parallax effect for background blobs (Subtle)
document.addEventListener('mousemove', (e) => {
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;
  
  // We can add logic here if we had specific floating elements
});