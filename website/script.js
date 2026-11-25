/**
 * Shivam Web Designs — Workable Studio Scripts & 3D Spatial Engine
 * Features:
 * 1. Interactive 3D Canvas with drag-to-spin & shape switching (Polyhedron, Torus, Sphere)
 * 2. Interactive Case Study Inspector Modal (<dialog id="case-study-dialog">)
 * 3. Workable Project Brief with direct mailto generation & clipboard copying
 * 4. Scroll-to-Open Stacking Deck Controller
 * 5. Interactive Scope & Budget Calculator with auto pre-population
 * 6. Dynamic Theme & Mobile Navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================================
     Helper: Toast Notification
     ========================================================================== */
  const toast = document.getElementById('toast');
  let toastTimer;
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.hidden = true;
    }, 3200);
  }

  /* ==========================================================================
     1. Interactive 3D Spatial Hero Canvas (Drag to Rotate + Shape Switching)
     ========================================================================== */
  const canvas = document.getElementById('hero-3d-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let isDragging = false;
    let prevMouseX = 0, prevMouseY = 0;
    let velX = 0, velY = 0;
    let rotX = 0.2, rotY = 0.4;
    let currentShape = 'octahedron';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function resizeCanvas() {
      const rect = canvas.getBoundingClientRect();
      width = canvas.width = rect.width * (window.devicePixelRatio || 1);
      height = canvas.height = rect.height * (window.devicePixelRatio || 1);
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // 3D Geometry Generators
    function generateOctahedron() {
      const verts = [
        { x: 0, y: 1.5, z: 0 },
        { x: 0, y: -1.5, z: 0 },
        { x: 1.5, y: 0, z: 0 },
        { x: -1.5, y: 0, z: 0 },
        { x: 0, y: 0, z: 1.5 },
        { x: 0, y: 0, z: -1.5 }
      ];
      const eds = [
        [0, 2], [0, 3], [0, 4], [0, 5],
        [1, 2], [1, 3], [1, 4], [1, 5],
        [2, 4], [4, 3], [3, 5], [5, 2]
      ];
      return { verts, eds };
    }

    function generateTorus() {
      const verts = [];
      const eds = [];
      const segmentsR = 12;
      const segmentsr = 8;
      const R = 1.3;
      const r = 0.45;

      for (let i = 0; i < segmentsR; i++) {
        const u = (i / segmentsR) * Math.PI * 2;
        for (let j = 0; j < segmentsr; j++) {
          const v = (j / segmentsr) * Math.PI * 2;
          const x = (R + r * Math.cos(v)) * Math.cos(u);
          const y = (R + r * Math.cos(v)) * Math.sin(u);
          const z = r * Math.sin(v);
          verts.push({ x, y, z });

          const cur = i * segmentsr + j;
          const nextR = ((i + 1) % segmentsR) * segmentsr + j;
          const nextr = i * segmentsr + ((j + 1) % segmentsr);
          eds.push([cur, nextR]);
          eds.push([cur, nextr]);
        }
      }
      return { verts, eds };
    }

    function generateSphere() {
      const verts = [];
      const eds = [];
      const rings = 8;
      const count = 10;
      for (let i = 0; i <= rings; i++) {
        const theta = (i / rings) * Math.PI;
        for (let j = 0; j < count; j++) {
          const phi = (j / count) * Math.PI * 2;
          const radius = 1.4;
          verts.push({
            x: radius * Math.sin(theta) * Math.cos(phi),
            y: radius * Math.cos(theta),
            z: radius * Math.sin(theta) * Math.sin(phi)
          });
        }
      }
      for (let i = 0; i < rings; i++) {
        for (let j = 0; j < count; j++) {
          const cur = i * count + j;
          const next = i * count + ((j + 1) % count);
          const down = (i + 1) * count + j;
          eds.push([cur, next]);
          if (down < verts.length) eds.push([cur, down]);
        }
      }
      return { verts, eds };
    }

    let geometry = generateOctahedron();

    // Shape button switchers
    const shapeButtons = document.querySelectorAll('.shape-btn');
    shapeButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        shapeButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        currentShape = btn.getAttribute('data-shape');

        if (currentShape === 'octahedron') geometry = generateOctahedron();
        else if (currentShape === 'torus') geometry = generateTorus();
        else if (currentShape === 'sphere') geometry = generateSphere();

        showToast(`3D Geometry: ${btn.textContent}`);
      });
    });

    // Orbiting particles
    const particles = [];
    for (let i = 0; i < 40; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const rad = 1.8 + Math.random() * 1.4;
      particles.push({
        x: rad * Math.sin(phi) * Math.cos(theta),
        y: rad * Math.sin(phi) * Math.sin(theta),
        z: rad * Math.cos(phi),
        size: Math.random() * 2 + 1,
        speed: (Math.random() - 0.5) * 0.006
      });
    }

    // Pointer Drag to Spin
    canvas.addEventListener('mousedown', (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
      velX = 0;
      velY = 0;
    });

    window.addEventListener('mousemove', (e) => {
      if (isDragging) {
        const dx = e.clientX - prevMouseX;
        const dy = e.clientY - prevMouseY;
        velY = dx * 0.008;
        velX = -dy * 0.008;
        rotY += velY;
        rotX += velX;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      }
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Touch support for mobile dragging
    canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (isDragging && e.touches.length === 1) {
        const dx = e.touches[0].clientX - prevMouseX;
        const dy = e.touches[0].clientY - prevMouseY;
        rotY += dx * 0.008;
        rotX += -dy * 0.008;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });

    // 3D Math Projection
    function project(p, rx, ry, cx, cy, fov, scale) {
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);
      const x1 = p.x * cosY + p.z * sinY;
      const z1 = -p.x * sinY + p.z * cosY;

      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const y2 = p.y * cosX - z1 * sinX;
      const z2 = p.y * sinX + z1 * cosX;

      const depth = fov / (fov + z2 * scale);
      return {
        x: cx + x1 * scale * depth,
        y: cy + y2 * scale * depth,
        depth: depth
      };
    }

    function render3D() {
      const displayW = canvas.clientWidth;
      const displayH = canvas.clientHeight;
      ctx.clearRect(0, 0, displayW, displayH);

      if (!isDragging && !prefersReducedMotion) {
        rotY += 0.004 + velY;
        rotX += velX;
        velX *= 0.94;
        velY *= 0.94;
      }

      const centerX = displayW > 900 ? displayW * 0.78 : displayW * 0.5;
      const centerY = displayH * 0.48;
      const fov = 400;
      const scale = Math.min(displayW, displayH) * 0.25;

      const isDark = document.documentElement.getAttribute('data-theme') === 'dark' ||
        (!document.documentElement.getAttribute('data-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);

      const edgeColor = isDark ? 'rgba(59, 130, 246, 0.4)' : 'rgba(0, 82, 204, 0.35)';
      const nodeColor = isDark ? '#60a5fa' : '#2563eb';
      const particleColor = isDark ? 'rgba(147, 197, 253, 0.45)' : 'rgba(37, 99, 235, 0.35)';

      const projected = geometry.verts.map((v) => project(v, rotX, rotY, centerX, centerY, fov, scale));

      // Draw Edges
      ctx.lineWidth = 1.4;
      ctx.strokeStyle = edgeColor;
      geometry.eds.forEach(([i, j]) => {
        if (projected[i] && projected[j]) {
          ctx.beginPath();
          ctx.moveTo(projected[i].x, projected[i].y);
          ctx.lineTo(projected[j].x, projected[j].y);
          ctx.stroke();
        }
      });

      // Draw Vertices
      projected.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(1.5, 3 * p.depth), 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.fill();
      });

      // Draw Orbiting Particles
      particles.forEach((pt) => {
        if (!prefersReducedMotion) pt.x += pt.speed;
        const p = project(pt, rotX, rotY, centerX, centerY, fov, scale);
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(1, pt.size * p.depth), 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();
      });

      requestAnimationFrame(render3D);
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

        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

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

  function updateStackDeck() {
    if (!stackDeck || stackCards.length === 0) return;
    let activeCardIndex = 0;

    stackCards.forEach((card, idx) => {
      const cardRect = card.getBoundingClientRect();
      if (cardRect.top <= 160) {
        activeCardIndex = idx;
      }
    });

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
     4. Interactive Case Study Inspector Modal
     ========================================================================== */
  const caseStudiesData = {
    komorebi: {
      category: 'EDITORIAL / ARCHITECTURE',
      title: 'Komorebi Atelier',
      subtitle: 'Spatial Exhibition Viewer & Archival Publishing Platform',
      bgClass: 'bg-noir',
      metrics: [
        { label: 'First Contentful Paint', val: '380ms' },
        { label: 'Editorial Publishing Speed', val: 'Instant' },
        { label: 'Recognition', val: 'Site of the Day' }
      ],
      challenge: 'Komorebi needed an online home that matched the contemplative, tactile quietude of their physical timber and stone architecture in Kyoto without feeling static or slow.',
      solution: 'We engineered a bespoke headless Next.js & Sanity platform with fluid typographic scaling (clamp), custom horizontal spatial galleries, and zero layout shift on mobile viewports.',
      stack: ['Next.js 15', 'Sanity CMS', 'TypeScript', 'CSS Container Queries', 'Vercel Edge'],
      deliverables: ['Custom Art Direction', 'Responsive Gallery Architecture', 'Sanity Editorial Schema', 'WCAG AA Compliance']
    },
    monolith: {
      category: 'SOFTWARE / CLOUD DEVTOOL',
      title: 'Monolith Cloud',
      subtitle: 'Developer Engine Documentation & Product Launch Platform',
      bgClass: 'bg-cobalt',
      metrics: [
        { label: 'Lighthouse Performance', val: '100 / 100' },
        { label: 'Developer Signups', val: '+62%' },
        { label: 'Total Asset Weight', val: '< 65 KB' }
      ],
      challenge: 'Monolith needed to explain high-throughput distributed database clustering to skeptical infrastructure engineers while providing an instant, searchable documentation site.',
      solution: 'We designed a high-density, dark-mode terminal aesthetic powered by Astro and client-side web workers. Complete with interactive latency benchmarks and instant code block copying.',
      stack: ['Astro', 'TypeScript', 'Web Workers', 'Tailored Design System', 'Cloudflare Pages'],
      deliverables: ['Developer Portal UI', 'Interactive Docs Engine', 'Technical Benchmarks UI', 'SEO Schema Graph']
    },
    aevum: {
      category: 'LUXURY COMMERCE / WEBGL',
      title: 'Aevum Horology',
      subtitle: 'Direct-to-Collector Chronometre Atelier & 3D Configurator',
      bgClass: 'bg-sand',
      metrics: [
        { label: 'First Drop GMV', val: '$2.4M' },
        { label: 'Checkout Completion', val: '84%' },
        { label: '3D Render Framerate', val: '60 FPS' }
      ],
      challenge: 'High-end horology collectors demand tactile, micro-mechanical visual fidelity before committing five-figure deposits online.',
      solution: 'Constructed an ultra-fast headless Shopify Plus experience paired with an interactive 3D WebGL dial configurator that runs smoothly on both iPhone Safari and 4K desktop displays.',
      stack: ['Shopify Storefront API', 'WebGL / Canvas 3D', 'Next.js', 'Stripe Concierge', 'AVIF Pipelines'],
      deliverables: ['3D Piece Configurator', 'Bespoke Checkout Funnel', 'High-Res Texture Pipeline', 'Private Collector Vault']
    },
    revista: {
      category: 'CULTURE / DIGITAL PUBLICATION',
      title: 'Revista Magazine',
      subtitle: 'Swiss-Inspired Editorial Reading Experience',
      bgClass: 'bg-emerald',
      metrics: [
        { label: 'Average Read Time', val: '7m 40s' },
        { label: 'Third-Party Trackers', val: '0' },
        { label: 'Cumulative Layout Shift', val: '0.00' }
      ],
      challenge: 'Traditional web magazines are polluted with sluggish ads, cookie banners, and layout jumps that destroy reading comprehension.',
      solution: 'We engineered an unadorned, distraction-free reading platform with fluid Swiss typography, dark-room reading modes, and instantaneous page-to-page view transitions.',
      stack: ['Semantic HTML5', 'Vanilla CSS Subgrid', 'Static Generation', 'Accessible Audio Sync'],
      deliverables: ['Editorial Typographic System', 'Dark-Room Reader Mode', 'Zero-Tracking Architecture', 'Offline Reading Service']
    }
  };

  const caseDialog = document.getElementById('case-study-dialog');
  const caseCategory = document.getElementById('case-category');
  const caseTitle = document.getElementById('case-dialog-title');
  const caseSubtitle = document.getElementById('case-subtitle');
  const caseVisualContainer = document.getElementById('case-visual-container');
  const caseMetricsContainer = document.getElementById('case-metrics-container');
  const caseChallengeText = document.getElementById('case-challenge-text');
  const caseSolutionText = document.getElementById('case-solution-text');
  const caseStackList = document.getElementById('case-stack-list');
  const caseDeliverablesList = document.getElementById('case-deliverables-list');
  const caseInquireBtn = document.getElementById('case-inquire-btn');

  function openCaseStudy(projectId) {
    const data = caseStudiesData[projectId];
    if (!data || !caseDialog) return;

    caseCategory.textContent = data.category;
    caseTitle.textContent = data.title;
    caseSubtitle.textContent = data.subtitle;

    // Visual hero
    caseVisualContainer.className = `case-hero-visual ${data.bgClass}`;
    caseVisualContainer.innerHTML = `
      <div class="visual-canvas" style="inline-size: 100%;">
        <span class="canvas-tag">${data.title.toUpperCase()}</span>
        <div style="font-size: 1.5rem; font-weight: 800; margin: 1rem 0;">${data.subtitle}</div>
        <div style="font-family: var(--font-mono); font-size: 0.75rem; opacity: 0.7;">Case Study Deep-Dive &bull; Shivam Web Designs</div>
      </div>
    `;

    // Metrics banner
    caseMetricsContainer.innerHTML = data.metrics.map((m) => `
      <div class="case-metric-tile">
        <small>${m.label}</small>
        <strong>${m.val}</strong>
      </div>
    `).join('');

    // Text copy
    caseChallengeText.textContent = data.challenge;
    caseSolutionText.textContent = data.solution;

    // Stack pills
    caseStackList.innerHTML = data.stack.map((s) => `<li>${s}</li>`).join('');

    // Deliverables
    caseDeliverablesList.innerHTML = data.deliverables.map((d) => `<li>${d}</li>`).join('');

    // Configure "Start Similar Project" button
    caseInquireBtn.onclick = () => {
      caseDialog.close();
      const budgetMap = {
        komorebi: '4.5k_8k',
        monolith: '4.5k_8k',
        aevum: '8k_plus',
        revista: '2.5k_4k'
      };
      openBriefDialog(budgetMap[projectId] || '4.5k_8k', `I am interested in a project similar to ${data.title} (${data.subtitle}).`);
    };

    caseDialog.showModal();
  }

  // Bind click & keydown (Enter/Space) to interactive project cards
  document.querySelectorAll('.interactive-project').forEach((card) => {
    const pid = card.getAttribute('data-project-id');
    card.addEventListener('click', () => openCaseStudy(pid));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openCaseStudy(pid);
      }
    });
  });

  // Light dismiss for case dialog
  if (caseDialog) {
    caseDialog.addEventListener('click', (e) => {
      const rect = caseDialog.getBoundingClientRect();
      const inside = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!inside) caseDialog.close();
    });
  }

  /* ==========================================================================
     5. Workable Project Brief Native Modal Dialog with Mailto & Copy
     ========================================================================== */
  const briefDialog = document.getElementById('brief-dialog');
  const briefForm = document.getElementById('brief-form');
  const briefSuccess = document.getElementById('brief-success');
  const budgetSelect = document.getElementById('brief-budget');
  const detailsTextarea = document.getElementById('brief-details');
  const dialogCancelBtn = document.getElementById('dialog-cancel-btn');
  const successMailLink = document.getElementById('success-mail-link');
  const copyBriefBtn = document.getElementById('copy-brief-btn');

  let currentBriefText = '';

  function openBriefDialog(preselectedBudget = null, prefilledDetails = null) {
    if (!briefDialog) return;
    if (preselectedBudget && budgetSelect) {
      budgetSelect.value = preselectedBudget;
    }
    if (prefilledDetails && detailsTextarea) {
      detailsTextarea.value = prefilledDetails;
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
          const cms = document.getElementById('calc-cms')?.value;
          const motion = document.getElementById('calc-motion')?.value;
          const price = document.getElementById('calc-price-output')?.textContent;
          const time = document.getElementById('calc-timeline-output')?.textContent;

          const budgetMap = {
            landing: '2.5k_4k',
            multipage: '4.5k_8k',
            commerce: '4.5k_8k',
            custom_app: '8k_plus'
          };

          const prefilled = `Selected Scope: ${scope.toUpperCase()}\nContent Management: ${cms}\nMotion & 3D: ${motion}\nEstimated Price: ${price} (${time})`;
          openBriefDialog(budgetMap[scope] || '4.5k_8k', prefilled);
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
      openBriefDialog(tierMap[tier] || '4.5k_8k', `Selected Working Model: ${tier}`);
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

  // Form Submission: Workable mailto + localStorage + clipboard copy
  if (briefForm && briefSuccess) {
    briefForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(briefForm);
      const name = formData.get('name');
      const email = formData.get('email');
      const company = formData.get('company') || 'N/A';
      const budget = formData.get('budget');
      const details = formData.get('details');

      // Save locally
      const savedInquiries = JSON.parse(localStorage.getItem('swd_inquiries') || '[]');
      const newInquiry = { name, email, company, budget, details, date: new Date().toISOString() };
      savedInquiries.push(newInquiry);
      localStorage.setItem('swd_inquiries', JSON.stringify(savedInquiries));

      // Build formatted plain text
      currentBriefText = `--- PROJECT BRIEF: SHIVAM WEB DESIGNS ---
Name: ${name}
Email: ${email}
Company: ${company}
Target Budget: ${budget}
Date: ${new Date().toLocaleDateString()}

Project Details & Scope:
${details}
-----------------------------------------`;

      // Build working mailto link
      const mailSubject = encodeURIComponent(`Project Brief from ${name} [${company}]`);
      const mailBody = encodeURIComponent(`Hi Shivam,\n\nHere are my project details:\n\n${currentBriefText}\n\nLooking forward to hearing from you!`);
      if (successMailLink) {
        successMailLink.href = `mailto:shivam@shivamwebdesigns.com?subject=${mailSubject}&body=${mailBody}`;
      }

      briefForm.hidden = true;
      briefSuccess.hidden = false;
      showToast('✓ Project brief packaged successfully!');
      briefForm.reset();
    });
  }

  // Copy Brief Button
  if (copyBriefBtn) {
    copyBriefBtn.addEventListener('click', () => {
      if (!currentBriefText) return;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(currentBriefText).then(() => {
          copyBriefBtn.textContent = '✓ Copied to Clipboard!';
          showToast('✓ Brief copied to clipboard!');
          setTimeout(() => {
            copyBriefBtn.textContent = 'Copy Brief to Clipboard';
          }, 3000);
        });
      } else {
        showToast('Clipboard not accessible on this device.');
      }
    });
  }

  /* ==========================================================================
     6. Selected Works Category Filter
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
     7. Scope & Investment Calculator (Live Interactive Recalculation)
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

  /* ==========================================================================
     8. Theme Switcher with System Synchronization
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
      showToast(`Theme: ${next === 'dark' ? 'Dark Mode' : 'Light Mode'}`);
    });
  }

  /* ==========================================================================
     9. Mobile Navigation Drawer
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
});
