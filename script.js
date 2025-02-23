// Main initialization
document.addEventListener("DOMContentLoaded", () => {
  initDarkMode();
  initHeaderEffects();
  initScrollAnimations();
  init3DEffects();
  initFormHandling();
  initSmoothScroll();
  initMobileMenu();
});

// Dark Mode Functionality
const initDarkMode = () => {
  const darkModeToggle = document.querySelector(".dark-mode-input");
  const body = document.body;

  if (!darkModeToggle) return;

  // Check saved preference
  const darkMode = localStorage.getItem("darkMode");

  // Initial state
  if (darkMode === "enabled") {
    body.classList.add("dark-mode");
    darkModeToggle.checked = true;
  }

  // Toggle event
  darkModeToggle.addEventListener("change", () => {
    body.classList.add("theme-transition");

    if (darkModeToggle.checked) {
      body.classList.add("dark-mode");
      localStorage.setItem("darkMode", "enabled");
    } else {
      body.classList.remove("dark-mode");
      localStorage.setItem("darkMode", null);
    }

    setTimeout(() => {
      body.classList.remove("theme-transition");
    }, 500);
  });
};

// Header Effects
const initHeaderEffects = () => {
  const header = document.querySelector(".header");
  const scrollProgress = document.querySelector(".scroll-progress");

  window.addEventListener("scroll", () => {
    // Header effect
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    // Progress bar
    const winScroll = document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    scrollProgress.style.width = `${scrolled}%`;
  });
};

// Scroll Animations
const initScrollAnimations = () => {
  const sections = document.querySelectorAll("section");
  const revealSections = document.querySelectorAll(".reveal-section");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");

          // Animate stats if it's the mission section
          if (entry.target.classList.contains("mission-section")) {
            animateStats();
          }
        }
      });
    },
    { threshold: 0.2 }
  );

  sections.forEach((section) => observer.observe(section));
  revealSections.forEach((section) => observer.observe(section));
};

// Stats Animation
const animateStats = () => {
  document.querySelectorAll(".stat-number").forEach((stat) => {
    const target = parseInt(stat.getAttribute("data-target"));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCount = () => {
      if (current < target) {
        current += increment;
        stat.textContent = Math.round(current);
        requestAnimationFrame(updateCount);
      } else {
        stat.textContent = target;
      }
    };

    updateCount();
  });
};

// 3D Effects
const init3DEffects = () => {
  // Card effects
  const cards = document.querySelectorAll(
    ".info-card, .team-member, .skill-card, .education-card"
  );

  cards.forEach((card) => {
    card.style.transition = "transform 0.5s ease";
    card.addEventListener("mouseenter", () => {
      card.style.transform = `
        perspective(1000px)
        translateZ(20px)
        scale(1.05)
      `;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "none";
    });
  });

  // Section effects
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    section.style.transition = "transform 0.5s ease";
    section.addEventListener("mouseenter", () => {
      section.style.transform = `
        perspective(1000px)
        scale(1.02)
      `;
    });

    section.addEventListener("mouseleave", () => {
      section.style.transform = "none";
    });
  });

  const educationCards = document.querySelectorAll(".education-card");

  educationCards.forEach((card) => {
    card.addEventListener("click", (e) => {
      const name = card.querySelector("h3").textContent;
      if (name.includes("KIPS College")) {
        window.location.href = "https://kipscolleges.com/";
      } else if (name.includes("The Punjab School")) {
        window.location.href = "https://www.thepunjabschool.edu.pk/";
      } else if (name.includes("University of Central Punjab")) {
        window.location.href = "https://ucp.edu.pk/";
      }
    });
  });
};

// Form Handling
const initFormHandling = () => {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  const validateEmail = (email) => {
    const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return re.test(email);
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const button = form.querySelector(".submit-btn");
    const email = form.querySelector("#email").value;

    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Loading state
    button.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i>';

    const formData = {
      name: form.querySelector("#name").value,
      email: email,
      subject: form.querySelector("#subject").value,
      message: form.querySelector("#message").value
    };

    emailjs.send('service_rgcwxpu', 'YOUR_TEMPLATE_ID', formData)
      .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        button.innerHTML = '<i class="fas fa-check"></i> Sent!';
        form.reset();
      }, function(error) {
        console.log('FAILED...', error);
        alert('Failed to send message. Please try again.');
        button.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
      });

    // Reset button after 2 seconds
    setTimeout(() => {
      button.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
    }, 2000);
  });
};

// Smooth Scroll
const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
};

// Mobile Menu
const initMobileMenu = () => {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navButtons = document.querySelector(".nav-buttons");

  mobileMenuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    navButtons.classList.toggle("active");
    mobileMenuBtn.querySelector("i").classList.toggle("fa-bars");
    mobileMenuBtn.querySelector("i").classList.toggle("fa-times");
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav-container")) {
      navButtons.classList.remove("active");
      mobileMenuBtn.querySelector("i").classList.add("fa-bars");
      mobileMenuBtn.querySelector("i").classList.remove("fa-times");
    }
  });

  // Close menu after clicking a link
  document.querySelectorAll(".nav-button").forEach((link) => {
    link.addEventListener("click", () => {
      navButtons.classList.remove("active");
      mobileMenuBtn.querySelector("i").classList.add("fa-bars");
      mobileMenuBtn.querySelector("i").classList.remove("fa-times");
    });
  });
};
