// Smooth scroll navigation with offset for fixed navbar
function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    const navHeight = document.querySelector('.navbar').offsetHeight;
    const targetPosition = section.offsetTop - navHeight;
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
}

// Responsive Navigation Hamburger with smooth animation
const navHamburger = document.querySelector('.nav-hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-item');
const navbar = document.querySelector('.navbar');

// Toggle menu when hamburger is clicked
if (navHamburger) {
  navHamburger.addEventListener('click', function(e) {
    e.stopPropagation();
    navLinks.classList.toggle('active');
    navHamburger.classList.toggle('active');
    
    // Add animation class
    if (navLinks.classList.contains('active')) {
      navLinks.style.display = 'flex';
      setTimeout(() => {
        navLinks.style.opacity = '1';
      }, 10);
    } else {
      navLinks.style.opacity = '0';
      setTimeout(() => {
        if (!navLinks.classList.contains('active')) {
          navLinks.style.display = 'none';
        }
      }, 400);
    }
  });
}

// Close menu when nav item is clicked
navItems.forEach(item => {
  item.addEventListener('click', function() {
    if (window.innerWidth <= 820) {
      navLinks.classList.remove('active');
      navHamburger.classList.remove('active');
      navLinks.style.opacity = '0';
      setTimeout(() => {
        navLinks.style.display = 'none';
      }, 400);
    }else{
      navHamburger.classList.appendChild('active');
    }
  });
});

// Close menu when clicking outside
document.addEventListener('click', function(e) {
  if (window.innerWidth <= 820) {
    if (!navbar.contains(e.target) && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      navHamburger.classList.remove('active');
      navLinks.style.opacity = '0';
      setTimeout(() => {
        navLinks.style.display = 'none';
      }, 400);
    }
  }
});

// Navbar scroll effect - add blur and shadow on scroll
let lastScroll = 0;
window.addEventListener('scroll', function() {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    navbar.style.background = 'linear-gradient(90deg, rgba(10,36,99,0.95) 80%, rgba(20,184,166,0.95) 100%)';
    navbar.style.backdropFilter = 'blur(15px)';
    navbar.style.boxShadow = '0 8px 32px rgba(10,36,99,0.4)';
  } else {
    navbar.style.background = 'linear-gradient(90deg, #0A2463 80%, #14B8A6 100%)';
    navbar.style.backdropFilter = 'blur(10px)';
    navbar.style.boxShadow = '0 4px 20px rgba(10,36,99,0.3)';
  }
  
  lastScroll = currentScroll;
});

// Enhanced fade-in animations with intersection observer
const fadeElems = document.querySelectorAll('.fade-in, .fade-up');
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Add staggered delay for multiple elements
      setTimeout(() => {
        entry.target.classList.add('in-view');
      }, index * 100);
      
      // Unobserve after animation to improve performance
      fadeInObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

fadeElems.forEach(el => fadeInObserver.observe(el));

// Parallax scroll effect for hero section
const heroSection = document.querySelector('.hero-section');
const heroContent = document.querySelector('.hero-content');
const heroGradient = document.querySelector('.hero-gradient');

if (heroSection && heroContent) {
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroHeight = heroSection.offsetHeight;
    
    if (scrolled < heroHeight) {
      // Parallax effect on hero content
      const parallaxSpeed = 0.5;
      heroContent.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
      
      // Subtle opacity fade on scroll
      const opacity = 1 - (scrolled / heroHeight) * 0.8;
      heroContent.style.opacity = Math.max(opacity, 0.2);
      
      // Background gradient shift
      if (heroGradient) {
        heroGradient.style.transform = `translateY(${scrolled * 0.3}px) scale(${1 + scrolled * 0.0003})`;
      }
    }
  });
}


// Contact Form Submission with animation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Button loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.style.opacity = '0.7';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
      submitBtn.textContent = '✓ Message Sent!';
      submitBtn.style.background = 'linear-gradient(135deg, #10B981, #059669)';
      
      setTimeout(() => {
        alert('Thank you for contacting ESH Vision Venture! Your message has been received.');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.style.opacity = '1';
        submitBtn.disabled = false;
        submitBtn.style.background = 'linear-gradient(135deg, var(--teal-primary), var(--blue-vibrant))';
      }, 1500);
    }, 1000);
  });
}

// Button ripple effect
const buttons = document.querySelectorAll('.btn, button');
buttons.forEach(button => {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple-effect');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add ripple effect styles dynamically
const rippleStyles = document.createElement('style');
rippleStyles.textContent = `
  .btn, button {
    position: relative;
    overflow: hidden;
  }
  .ripple-effect {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
  }
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(rippleStyles);

// Loading Preloader with enhanced animation
window.addEventListener('DOMContentLoaded', () => {
  // Inject preloader
  const preloader = document.createElement('div');
  preloader.className = 'preloader';
  preloader.innerHTML = `
    <svg viewBox="0 0 64 64">
      <circle cx="32" cy="32" r="28" stroke="#F59E0B" stroke-width="6" fill="none" stroke-linecap="round">
        <animate attributeName="stroke-dasharray" values="0 175;175 175" dur="2s" repeatCount="indefinite" />
        <animate attributeName="stroke-dashoffset" values="0;-175" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="32" cy="32" r="20" stroke="#14B8A6" stroke-width="4" fill="none" stroke-linecap="round">
        <animate attributeName="stroke-dasharray" values="0 125;125 125" dur="1.5s" repeatCount="indefinite" />
        <animate attributeName="stroke-dashoffset" values="0;125" dur="1.5s" repeatCount="indefinite" />
      </circle>
    </svg>
  `;
  document.body.appendChild(preloader);
  
  // Wait for page load
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.remove();
        // Trigger initial animations
        document.body.style.overflow = 'auto';
      }, 800);
    }, 800);
  });
  
  // Prevent scroll during loading
  document.body.style.overflow = 'hidden';
});

// Active section highlighting in navigation
const sections = document.querySelectorAll('section[id]');
const navLinksArray = document.querySelectorAll('.nav-item');

window.addEventListener('scroll', () => {
  let current = '';
  const scrollPosition = window.pageYOffset + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });
  
  navLinksArray.forEach(link => {
    link.classList.remove('active-section');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active-section');
    }
  });
});

// Add active section styles
const activeStyles = document.createElement('style');
activeStyles.textContent = `
  .nav-item.active-section {
    color: var(--gold-accent) !important;
  }
  .nav-item.active-section::after {
    width: 100% !important;
  }
`;
document.head.appendChild(activeStyles);

// Responsive resize handler
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Reset menu state on resize
    if (window.innerWidth > 820) {
      navLinks.classList.remove('active');
      navHamburger.classList.remove('active');
      navLinks.style.display = 'flex';
      navLinks.style.opacity = '1';
    } else {
      if (!navLinks.classList.contains('active')) {
        navLinks.style.display = 'none';
      }
    }
  }, 250);
});

console.log('ESH Vision Venture - Enhanced with 3D animations, saturated colors, and mobile responsiveness!');
// END OF APP.JS FOR ESH VISION VENTURE


document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.service-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 200 * index);
    });
});
