/**
 * Shivam Web Designs — Studio Scripts & 3D Spatial Engine
 * Handles 3D geometric projection canvas, interactive card tilt physics,
 * scroll-to-open stacking deck controller, theme switcher, and dialog.
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================================
     1. Interactive 3D Spatial Hero Canvas (Pure Math 3D Projection, 0 Bloat)
     ========================================================================== */
  const canvas = document.getElementById('hero-3d-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let mouseX = 0, mouseY = 0;
    let targetRotX = 0, targetRotY = 0;
    let rotX = 0, rotY = 0;
    let animationFrameId;

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Resize canvas
    function resizeCanvas() {
      const rect = canvas.getBoundingClientRect();
      width = canvas.width = rect.width * (window.devicePixelRatio || 1);
      height = canvas.height = rect.height * (window.devicePixelRatio || 1);
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // 3D Polyhedron Vertices (Octahedron + Orbiting Spatial Nodes)
    const vertices = [
      { x: 0, y: 1.4, z: 0 },
      { x: 0, y: -1.4, z: 0 },
      { x: 1.4, y: 0, z: 0 },
      { x: -1.4, y: 0, z: 0 },
      { x: 0, y: 0, z: 1.4 },
      { x: 0, y: 0, z: -1.4 }
    ];

    const edges = [
      [0, 2], [0, 3], [0, 4], [0, 5],
      [1, 2], [1, 3], [1, 4], [1, 5],
      [2, 4], [4, 3], [3, 5], [5, 2]
    ];

    // Generate orbiting particle constellation
    const particles = [];
    const numParticles = 48;
    for (let i = 0; i < numParticles; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 1.8 + Math.random() * 1.5;
      particles.push({
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.sin(phi) * Math.sin(theta),
        z: radius * Math.cos(phi),
        size: Math.random() * 2 + 1,
        speed: (Math.random() - 0.5) * 0.005
      });
    }

    // Pointer tracking
    window.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      if (e.clientY <= rect.bottom + 200) {
        mouseX = (e.clientX - rect.left) / rect.width - 0.5;
        mouseY = (e.clientY - rect.top) / rect.height - 0.5;
        targetRotY = mouseX * 1.8;
        targetRotX = -mouseY * 1.8;
      }
    });

    // 3D Rotation Projection
    function project(p, rx, ry, cx, cy, fov, scale) {
      // Rotate Y
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);
      const x1 = p.x * cosY + p.z * sinY;
      const z1 = -p.x * sinY + p.z * cosY;

      // Rotate X
      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const y2 = p.y * cosX - z1 * sinX;
      const z2 = p.y * sinX + z1 * cosX;

      // Perspective projection
      const depth = fov / (fov + z2 * scale);
      return {
        x: cx + x1 * scale * depth,
        y: cy + y2 * scale * depth,
        depth: depth,
        z: z2
      };
    }

    let angle = 0;
    function render3D() {
      const displayW = canvas.clientWidth;
      const displayH = canvas.clientHeight;
      ctx.clearRect(0, 0, displayW, displayH);

      if (!prefersReducedMotion) {
        angle += 0.004;
        rotX += (targetRotX - rotX) * 0.05;
        rotY += (targetRotY - rotY) * 0.05;
      }

      const currentRotX = rotX + Math.sin(angle * 0.5) * 0.2;
      const currentRotY = rotY + angle;

      const centerX = displayW > 900 ? displayW * 0.78 : displayW * 0.5;
      const centerY = displayH * 0.5;
      const fov = 400;
      const scale = Math.min(displayW, displayH) * 0.26;

      const isDark = document.documentElement.getAttribute('data-theme') === 'dark' ||
        (!document.documentElement.getAttribute('data-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);

      const edgeColor = isDark ? 'rgba(59, 130, 246, 0.45)' : 'rgba(0, 82, 204, 0.35)';
      const nodeColor = isDark ? '#60a5fa' : '#2563eb';
      const particleColor = isDark ? 'rgba(147, 197, 253, 0.5)' : 'rgba(37, 99, 235, 0.4)';

      // Project vertices
      const projected = vertices.map(v => project(v, currentRotX, currentRotY, centerX, centerY, fov, scale));

      // Draw Edges
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = edgeColor;
      edges.forEach(([i, j]) => {
        ctx.beginPath();
        ctx.moveTo(projected[i].x, projected[i].y);
        ctx.lineTo(projected[j].x, projected[j].y);
        ctx.stroke();
      });

      // Draw Main Vertices
      projected.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3.5 * p.depth, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.fill();
      });

      // Draw Orbiting Particles
      particles.forEach(pt => {
        if (!prefersReducedMotion) {
          pt.x += pt.speed;
        }
        const p = project(pt, currentRotX, currentRotY, centerX, centerY, fov, scale);
        ctx.beginPath();
        ctx.arc(p.x, p.y, pt.size * p.depth, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render3D);
    }

    render3D();
  }

  /* ==========================================================================
     2. Interactive 3D Card Tilt Physics ([data-tilt])
     ========================================================================== */
  const tiltElements = document.querySelectorAll('[data-tilt]');
  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

  if (!isTouchDevice && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    tiltElements.forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -6; // Max 6 deg
        const rotateY = ((x - centerX) / centerX) * 6;  // Max 6 deg

        el.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });
    });
  }

  /* ==========================================================================
     3. Scroll-to-Open Stacking Deck Controller
     ========================================================================== */
  const stackCards = document.querySelectorAll('.stack-card');
  const stackDeck = document.getElementById('stack-deck');
  const stackNavPills = document.querySelectorAll('.stack-nav-pill');

  // Pill click smooth navigation
  stackNavPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      const targetId = pill.getAttribute('data-target');
      const targetCard = document.getElementById(targetId);
      if (targetCard) {
        const yOffset = -120;
        const y = targetCard.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });

  // Track scroll position to dynamically scale and fan stacked cards
  function updateStackDeck() {
    if (!stackDeck || stackCards.length === 0) return;

    const scrollY = window.scrollY;
    let activeCardIndex = 0;

    stackCards.forEach((card, idx) => {
      const cardRect = card.getBoundingClientRect();
      const cardTop = cardRect.top;

      // When card reaches its sticky position (around 80px - 150px from top)
      if (cardTop <= 150) {
        activeCardIndex = idx;
      }
    });

    // Update active pill
    stackNavPills.forEach((pill, idx) => {
      if (idx === activeCardIndex) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', updateStackDeck, { passive: true });
  updateStackDeck();

  /* ==========================================================================
     4. Theme Switcher with System Synchronization
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
     5. Mobile Navigation Drawer
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
     6. Project Brief Native Modal Dialog (<dialog>)
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
     7. Selected Works Category Filter
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
     8. Scope & Investment Calculator
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
