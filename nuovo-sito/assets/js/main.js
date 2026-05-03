/* ================================================================
   ELETTRO G.A. - MAIN JAVASCRIPT
   Menu responsive, Dropdown, Form validation, Active links
   ================================================================ */

document.addEventListener('DOMContentLoaded', function() {

  /* ===== ACTIVE LINK DETECTION ===== */
  function setActiveLink() {
    const pathname = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a, .nav-drawer a');

    navLinks.forEach(link => {
      link.classList.remove('active');

      // Exact match
      if (link.getAttribute('href') === pathname) {
        link.classList.add('active');
        return;
      }

      // Index.html match
      if ((pathname === '/' || pathname.endsWith('/index.html')) &&
          (link.getAttribute('href') === '/' || link.getAttribute('href').includes('index.html'))) {
        link.classList.add('active');
      }
    });
  }
  setActiveLink();

  /* ===== DESKTOP DROPDOWN ===== */
  const dropdownBtn = document.querySelector('nav button[aria-label*="Prodotti"]') ||
                      document.querySelector('nav button');

  if (dropdownBtn) {
    const dropdownMenu = document.querySelector('.dropdown-menu');

    if (dropdownMenu) {
      let dropdownTimeout;

      dropdownBtn.addEventListener('mouseenter', function() {
        clearTimeout(dropdownTimeout);
        dropdownMenu.classList.add('active');
      });

      dropdownBtn.addEventListener('mouseleave', function() {
        dropdownTimeout = setTimeout(() => {
          dropdownMenu.classList.remove('active');
        }, 200);
      });

      dropdownMenu.addEventListener('mouseenter', function() {
        clearTimeout(dropdownTimeout);
        dropdownMenu.classList.add('active');
      });

      dropdownMenu.addEventListener('mouseleave', function() {
        dropdownTimeout = setTimeout(() => {
          dropdownMenu.classList.remove('active');
        }, 200);
      });
    }
  }

  /* ===== MOBILE DRAWER & HAMBURGER ===== */
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navDrawer = document.querySelector('.nav-drawer');
  const drawerOverlay = document.querySelector('.nav-drawer-overlay');

  if (mobileToggle && navDrawer) {
    mobileToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      navDrawer.classList.toggle('active');
      drawerOverlay.classList.toggle('active');
    });
  }

  // Close drawer on overlay click
  if (drawerOverlay) {
    drawerOverlay.addEventListener('click', function() {
      navDrawer.classList.remove('active');
      drawerOverlay.classList.remove('active');
    });
  }

  // Close drawer when clicking a link
  const drawerLinks = document.querySelectorAll('.nav-drawer a');
  drawerLinks.forEach(link => {
    link.addEventListener('click', function() {
      navDrawer.classList.remove('active');
      drawerOverlay.classList.remove('active');
    });
  });

  // Mobile submenu toggle
  const mobileSubmenus = document.querySelectorAll('.nav-drawer button');
  mobileSubmenus.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const submenu = this.nextElementSibling;
      if (submenu && submenu.classList.contains('submenu')) {
        submenu.classList.toggle('active');
      }
    });
  });

  /* ===== FORM VALIDATION ===== */
  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      if (validateForm(form)) {
        // Form is valid
        // In real scenario, would submit via AJAX or POST
        showFormSuccess(form);
      }
    });

    // Real-time validation on blur
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', function() {
        validateField(this);
      });
    });
  });

  function validateForm(form) {
    let isValid = true;
    const fields = form.querySelectorAll('[required]');

    fields.forEach(field => {
      if (!validateField(field)) {
        isValid = false;
      }
    });

    return isValid;
  }

  function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    let isValid = true;

    // Clear previous error
    clearFieldError(field);

    // Required check
    if (field.hasAttribute('required') && !value) {
      showFieldError(field, 'Campo obbligatorio');
      return false;
    }

    // Email check
    if (type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        showFieldError(field, 'Email non valida');
        return false;
      }
    }

    // Phone check
    if (type === 'tel' && value) {
      const phoneRegex = /^[\d\s+\-()]+$/;
      if (!phoneRegex.test(value)) {
        showFieldError(field, 'Telefono non valido');
        return false;
      }
    }

    return isValid;
  }

  function showFieldError(field, message) {
    field.classList.add('error');
    field.style.borderColor = '#c02a2a';

    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error';
    errorDiv.textContent = message;

    field.parentNode.appendChild(errorDiv);
  }

  function clearFieldError(field) {
    field.classList.remove('error');
    field.style.borderColor = '';

    const errorDiv = field.parentNode.querySelector('.form-error');
    if (errorDiv) {
      errorDiv.remove();
    }
  }

  function showFormSuccess(form) {
    // Create success message
    const successDiv = document.createElement('div');
    successDiv.className = 'form-success';
    successDiv.textContent = '✓ Messaggio inviato con successo! Ti contatteremo a breve.';

    form.insertBefore(successDiv, form.firstChild);

    // Reset form
    form.reset();

    // Remove success message after 5 seconds
    setTimeout(() => {
      successDiv.remove();
    }, 5000);
  }

  /* ===== CHECKBOX LABEL BINDING ===== */
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    const label = document.querySelector(`label[for="${checkbox.id}"]`);
    if (label) {
      label.style.cursor = 'pointer';
      label.addEventListener('click', function(e) {
        if (e.target !== checkbox) {
          checkbox.checked = !checkbox.checked;
        }
      });
    }
  });

  /* ===== SMOOTH SCROLL LINKS ===== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

});

/* ===== UTILITY: LOAD HEADER/FOOTER ===== */
// This could be used if header/footer are in separate files
// For now, they're inline in HTML

/* ===== PERFORMANCE: LAZY LOADING ===== */
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}
