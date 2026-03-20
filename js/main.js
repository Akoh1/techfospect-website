/* ============================================================
   TECHFOSPECT — Shared JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ----- Lucide Icons ----- */
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  /* ----- Mobile hamburger toggle ----- */
  const hamburger = document.querySelector('.navbar__hamburger');
  const mobileMenu = document.querySelector('.navbar__mobile');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
  }

  /* ----- Desktop Products dropdown (hover) ----- */
  const dropdown = document.querySelector('.nav-dropdown');
  if (dropdown) {
    dropdown.addEventListener('mouseenter', () => dropdown.classList.add('open'));
    dropdown.addEventListener('mouseleave', () => dropdown.classList.remove('open'));
  }

  /* ----- Mobile Products dropdown (click toggle) ----- */
  const mobileDropdownToggle  = document.querySelector('.mobile-dropdown__toggle');
  const mobileDropdownMenu    = document.querySelector('.mobile-dropdown__menu');
  const mobileDropdownChevron = document.querySelector('.mobile-dropdown__chevron');

  if (mobileDropdownToggle && mobileDropdownMenu) {
    mobileDropdownToggle.addEventListener('click', () => {
      mobileDropdownMenu.classList.toggle('open');
      if (mobileDropdownChevron) {
        mobileDropdownChevron.style.transform =
          mobileDropdownMenu.classList.contains('open') ? 'rotate(180deg)' : '';
      }
    });
  }

  /* ----- Active nav link highlighting ----- */
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';

  document.querySelectorAll('.nav-link, .mobile-link').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkPath = href.replace(/\/$/, '') || '/';
    if (linkPath === currentPath ||
        (linkPath !== '/' && currentPath.startsWith(linkPath))) {
      link.classList.add('active');
    }
  });

  const dropdownTrigger = document.querySelector('.nav-dropdown__trigger');
  if (dropdownTrigger && currentPath.includes('/products')) {
    dropdownTrigger.classList.add('active');
  }

  document.querySelectorAll('.nav-dropdown__menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    if (href.replace(/\/$/, '') === currentPath) link.classList.add('active');
  });

  /* ----- Contact form (UI only) ----- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      contactForm.style.display = 'none';
      const success = document.getElementById('formSuccess');
      if (success) success.classList.add('visible');

      setTimeout(() => {
        contactForm.reset();
        contactForm.style.display = '';
        if (success) success.classList.remove('visible');
      }, 4000);
    });
  }

  /* ----- Waitlist form — proxied via Netlify function ----- */
  //
  // The browser posts to /.netlify/functions/submit-waitlist (our own endpoint).
  // That function runs on Netlify's servers and adds the Web3Forms key from
  // an environment variable before forwarding to Web3Forms.
  // The key is never in this file or anywhere in the browser.
  //
  const waitlistForm = document.getElementById('waitlistForm');
  if (waitlistForm) {
    waitlistForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = waitlistForm.querySelector('button[type="submit"]');
      const emailInput = waitlistForm.querySelector('input[name="email"]');
      const successEl  = document.getElementById('waitlistSuccess');
      const errorEl    = document.getElementById('waitlistError');

      // Lock the button to prevent double-submits
      const originalText    = submitBtn.textContent;
      submitBtn.textContent = 'Submitting...';
      submitBtn.disabled    = true;

      try {
        const response = await fetch('/.netlify/functions/submit-waitlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: emailInput.value })
        });

        const result = await response.json();

        if (result.success) {
          waitlistForm.style.display = 'none';
          if (successEl) successEl.classList.add('visible');
          if (errorEl)   errorEl.style.display = 'none';
        } else {
          throw new Error(result.message || 'Submission rejected');
        }

      } catch (err) {
        console.error('Waitlist submission error:', err);
        if (errorEl) {
          errorEl.textContent = 'Something went wrong. Please try again or email us at contact@techfospect.com';
          errorEl.style.display = 'block';
        }
        submitBtn.textContent = originalText;
        submitBtn.disabled    = false;
      }
    });
  }

  /* ----- Smooth scroll for anchor links ----- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ----- Subtle scroll-reveal for cards ----- */
  const observer = new IntersectionObserver(
    (entries) => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    }),
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.card, .card-features, .agent-card, .faq-item, .stat-card').forEach(el => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(16px)';
    el.style.transition = 'opacity 0.45s ease, transform 0.45s ease, border-color 0.2s ease, box-shadow 0.2s ease';
    observer.observe(el);
  });

});
