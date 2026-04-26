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
    mobileToggle.addEventListener('click', function() {
      navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
  }

});
