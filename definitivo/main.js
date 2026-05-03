document.addEventListener('DOMContentLoaded', function() {

  // Dropdown Prodotti/Quadri – hover con bridge gap per position:fixed
  var dropdownLi = document.querySelector('.nav-links li:has(.dropdown-menu)');
  if (dropdownLi) {
    var dropdown = dropdownLi.querySelector('.dropdown-menu');
    var hideTimer;

    dropdownLi.addEventListener('mouseenter', function() {
      clearTimeout(hideTimer);
      dropdown.classList.add('open');
    });
    dropdownLi.addEventListener('mouseleave', function() {
      hideTimer = setTimeout(function() {
        dropdown.classList.remove('open');
      }, 150);
    });
    dropdown.addEventListener('mouseenter', function() {
      clearTimeout(hideTimer);
    });
    dropdown.addEventListener('mouseleave', function() {
      hideTimer = setTimeout(function() {
        dropdown.classList.remove('open');
      }, 150);
    });
  }

  // Mobile menu toggle
  var mobileToggle = document.getElementById('mobile-toggle');
  var navLinks = document.querySelector('.nav-links');

  if (mobileToggle && navLinks) {
    // Crea overlay mobile
    var mobileOverlay = document.createElement('div');
    mobileOverlay.className = 'mobile-overlay';
    document.body.appendChild(mobileOverlay);

    // Toggle menu
    mobileToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      navLinks.classList.toggle('mobile-open');
      mobileOverlay.classList.toggle('active');
    });

    // Chiudi menu con overlay
    mobileOverlay.addEventListener('click', function() {
      navLinks.classList.remove('mobile-open');
      mobileOverlay.classList.remove('active');
    });

    // Chiudi menu quando clicca un link
    var navLinksAll = navLinks.querySelectorAll('a');
    navLinksAll.forEach(function(link) {
      link.addEventListener('click', function() {
        navLinks.classList.remove('mobile-open');
        mobileOverlay.classList.remove('active');
      });
    });
  }

});
