/**
 * Shivam Web Designs — Studio Scripts
 * Minimal, dependency-free interactions: Theme sync, dialog management,
 * scope calculator, and filter choreography.
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================================
     1. Theme Switcher with System Synchronization
     ========================================================================== */
  const themeToggle = document.getElementById('theme-toggle');
  const systemDarkMedia = window.matchMedia('(prefers-color-scheme: dark)');

  function applyTheme(theme) {
    if (theme === 'dark' || theme === 'light') {
      document.documentElement.setAttribute('data-theme', theme);
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }

  const savedTheme = localStorage.getItem('swd_theme');
  if (savedTheme) {
    applyTheme(savedTheme);
  }

  systemDarkMedia.addEventListener('change', () => {
    if (!localStorage.getItem('swd_theme')) {
      applyTheme(null);
    }
  });

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      let next;
      if (!current) {
        next = systemDarkMedia.matches ? 'light' : 'dark';
      } else if (current === 'dark') {
        next = 'light';
      } else {
        next = 'dark';
      }
      applyTheme(next);
      localStorage.setItem('swd_theme', next);
    });
  }

  /* ==========================================================================
     2. Mobile Navigation Drawer
     ========================================================================== */
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.hidden = isExpanded;
    });

    mobileMenu.querySelectorAll('a, button').forEach((item) => {
      item.addEventListener('click', () => {
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.hidden = true;
      });
    });
  }

  /* ==========================================================================
     3. Project Brief Native Modal Dialog (<dialog>)
     ========================================================================== */
  const briefDialog = document.getElementById('brief-dialog');
  const briefForm = document.getElementById('brief-form');
  const briefSuccess = document.getElementById('brief-success');
  const budgetSelect = document.getElementById('brief-budget');
  const dialogCancelBtn = document.getElementById('dialog-cancel-btn');

  function openBriefDialog(preselectedBudget = null) {
    if (!briefDialog) return;
    if (preselectedBudget && budgetSelect) {
      budgetSelect.value = preselectedBudget;
    }
    if (briefForm) briefForm.hidden = false;
    if (briefSuccess) briefSuccess.hidden = true;
    briefDialog.showModal();
  }

  // Trigger buttons
  const triggerIds = ['open-brief-btn', 'hero-cta-btn', 'mobile-brief-btn', 'cta-brief-btn', 'calc-submit-btn'];
  triggerIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('click', () => {
        if (id === 'calc-submit-btn') {
          const scope = document.getElementById('calc-scope')?.value;
          const budgetMap = {
            landing: '2.5k_4k',
            multipage: '4.5k_8k',
            commerce: '4.5k_8k',
            custom_app: '8k_plus'
          };
          openBriefDialog(budgetMap[scope] || '4.5k_8k');
        } else {
          openBriefDialog();
        }
      });
    }
  });

  // Direct tier select buttons
  document.querySelectorAll('.select-tier-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const tier = btn.getAttribute('data-tier');
      const tierMap = {
        'Design Sprint': '2.5k_4k',
        'Flagship Build': '4.5k_8k',
        'Studio Retainer': 'retainer'
      };
      openBriefDialog(tierMap[tier] || '4.5k_8k');
    });
  });

  if (dialogCancelBtn && briefDialog) {
    dialogCancelBtn.addEventListener('click', () => briefDialog.close());
  }

  // Light-dismiss backdrop fallback
  if (briefDialog) {
    briefDialog.addEventListener('click', (e) => {
      const rect = briefDialog.getBoundingClientRect();
      const inDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!inDialog) briefDialog.close();
    });
  }

  if (briefForm && briefSuccess) {
    briefForm.addEventListener('submit', (e) => {
      e.preventDefault();
      briefForm.hidden = true;
      briefSuccess.hidden = false;
      briefForm.reset();
    });
  }

  /* ==========================================================================
     4. Selected Works Category Filter
     ========================================================================== */
  const filterPills = document.querySelectorAll('.filter-pill');
  const workCards = document.querySelectorAll('.work-card');

  filterPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      const targetCategory = pill.getAttribute('data-filter');

      filterPills.forEach((p) => {
        p.classList.remove('active');
        p.setAttribute('aria-selected', 'false');
      });
      pill.classList.add('active');
      pill.setAttribute('aria-selected', 'true');

      workCards.forEach((card) => {
        const cat = card.getAttribute('data-category');
        if (targetCategory === 'all' || cat === targetCategory) {
          card.hidden = false;
        } else {
          card.hidden = true;
        }
      });
    });
  });

  /* ==========================================================================
     5. Scope & Investment Calculator
     ========================================================================== */
  const calcForm = document.getElementById('calc-form');
  const priceOutput = document.getElementById('calc-price-output');
  const timelineOutput = document.getElementById('calc-timeline-output');

  const scopePricing = {
    landing: { min: 2400, max: 3600, time: '2 Weeks' },
    multipage: { min: 4800, max: 6200, time: '4 – 5 Weeks' },
    commerce: { min: 5800, max: 7800, time: '5 – 6 Weeks' },
    custom_app: { min: 8200, max: 11500, time: '6 – 8 Weeks' }
  };

  const cmsModifiers = {
    none: 0,
    headless: 600,
    shopify: 800
  };

  const motionModifiers = {
    standard: 0,
    advanced: 500
  };

  function updateScopeMath() {
    if (!calcForm || !priceOutput || !timelineOutput) return;

    const scopeVal = document.getElementById('calc-scope')?.value || 'multipage';
    const cmsVal = document.getElementById('calc-cms')?.value || 'headless';
    const motionVal = document.getElementById('calc-motion')?.value || 'advanced';

    const base = scopePricing[scopeVal];
    const addOn = (cmsModifiers[cmsVal] || 0) + (motionModifiers[motionVal] || 0);

    const totalMin = base.min + addOn;
    const totalMax = base.max + addOn;

    priceOutput.textContent = `$${totalMin.toLocaleString()} – $${totalMax.toLocaleString()}`;
    timelineOutput.textContent = base.time;
  }

  if (calcForm) {
    calcForm.addEventListener('change', updateScopeMath);
    updateScopeMath();
  }
});
