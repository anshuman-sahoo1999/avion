/**
 * ==============================================================================
 * AVION VISUAL INTELLIGENCE — ADVANCED INTERACTIVE ARCHITECTURE (ES6+)
 * Enhanced with 3D Tilt Physics, Mouse-Driven Scrubbing, and Morphing Motion
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // Check prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ==========================================================================
     1. GLOBAL READING PROGRESS BAR & STICKY HEADER
     ========================================================================== */
  const header = document.querySelector('.site-header');
  const progressBar = document.getElementById('reading-progress-bar');

  const handleScrollState = () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (header) {
      if (scrollY > 40) {
        header.classList.add('site-header--scrolled');
      } else {
        header.classList.remove('site-header--scrolled');
      }
    }

    if (progressBar && docHeight > 0) {
      const progressPercent = Math.min(100, Math.max(0, (scrollY / docHeight) * 100));
      progressBar.style.width = `${progressPercent}%`;
    }
  };

  window.addEventListener('scroll', handleScrollState, { passive: true });
  handleScrollState();

  /* ==========================================================================
     2. MOBILE NAVIGATION DRAWER (OPEN & COLLAPSE)
     ========================================================================== */
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav__link, .mobile-drawer .btn');

  const toggleMobileMenu = (forceState) => {
    if (!mobileToggle || !mobileDrawer) return;
    const isCurrentlyOpen = mobileDrawer.classList.contains('is-open');
    const newState = typeof forceState === 'boolean' ? forceState : !isCurrentlyOpen;

    if (newState) {
      mobileDrawer.classList.add('is-open');
      mobileToggle.classList.add('is-active');
      mobileToggle.setAttribute('aria-expanded', 'true');
      document.body.classList.add('menu-open');
      document.body.style.overflow = 'hidden';
    } else {
      mobileDrawer.classList.remove('is-open');
      mobileToggle.classList.remove('is-active');
      mobileToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
      document.body.style.overflow = '';
    }
  };

  if (mobileToggle) {
    mobileToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleMobileMenu();
    });
  }

  // Close drawer if clicking outside the link list
  if (mobileDrawer) {
    mobileDrawer.addEventListener('click', (e) => {
      if (e.target === mobileDrawer || e.target.classList.contains('mobile-nav')) {
        toggleMobileMenu(false);
      }
    });
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      toggleMobileMenu(false);
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#') && targetId.length > 1) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          setTimeout(() => {
            const headerOffset = 70;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
              top: offsetPosition,
              behavior: prefersReducedMotion ? 'auto' : 'smooth'
            });
          }, 60);
        }
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('is-open')) {
      toggleMobileMenu(false);
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 900 && mobileDrawer && mobileDrawer.classList.contains('is-open')) {
      toggleMobileMenu(false);
    }
  }, { passive: true });

  /* ==========================================================================
     4. SMOOTH SCROLLING WITH FIXED HEADER OFFSET
     ========================================================================== */
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');

  smoothScrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault();
        const headerOffset = 90;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
      }
    });
  });

  /* ==========================================================================
     5. INTERSECTION OBSERVER FOR SCROLL REVEALS & ACTIVE NAV
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  if (prefersReducedMotion) {
    revealElements.forEach(el => el.classList.add('is-revealed'));
  } else if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }

  // Active navigation tracking
  const trackedSections = document.querySelectorAll('section[id], header[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-desktop__link');

  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          desktopNavLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${currentId}`) {
              link.classList.add('is-active');
            } else {
              link.classList.remove('is-active');
            }
          });
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '-80px 0px -50% 0px'
    });

    trackedSections.forEach(sec => sectionObserver.observe(sec));
  }

  /* ==========================================================================
     6. OUR PROCESS: 5-STAGE CINEMATIC TIMELINE WITH DYNAMIC PREVIEWS
     ========================================================================== */
  const processSteps = document.querySelectorAll('.process-step');
  const activePanelNumber = document.getElementById('active-step-num');
  const activePanelTitle = document.getElementById('active-step-title');
  const activePanelStatement = document.getElementById('active-step-statement');
  const activePanelDeliverable = document.getElementById('active-step-deliverable');
  const activePanelPerspective = document.getElementById('active-step-perspective');
  const activeProcessImg = document.getElementById('process-preview-image');
  const activeProcessBadge = document.getElementById('process-preview-badge');

  const processData = [
    {
      step: '01',
      title: 'UNDERSTAND',
      statement: '“What needs to be communicated, to whom, and what should they remember?”',
      deliverable: 'Communication Brief & Core Narrative Anchor',
      perspective: 'Audience Perception Analysis',
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
      badge: 'Plate 01 // Research & Narrative Notebook'
    },
    {
      step: '02',
      title: 'PLAN',
      statement: '“We settle the central message, then build the script, structure and visual approach before anyone picks up a camera.”',
      deliverable: 'Storyboard Architecture & Production Blueprint',
      perspective: 'Pre-Visualization & Logistics Framework',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
      badge: 'Plate 02 // Structural & Sequence Schematic'
    },
    {
      step: '03',
      title: 'CAPTURE',
      statement: '“Purposeful filming, photography and aerial visuals, shot to the plan.”',
      deliverable: 'Cinema-Grade Stills, Cinema Footage & Drone Data',
      perspective: 'Precision Spatial & Architectural Framing',
      image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80',
      badge: 'Plate 03 // Cinema Rig & Aerial Unit'
    },
    {
      step: '04',
      title: 'EDIT',
      statement: '“We shape the footage into a coherent story, with attention to pacing, context and clarity.”',
      deliverable: 'Narrative Cut, Sound Architecture & Explanatory Graphics',
      perspective: 'Pacing, Clarity & Cognitive Flow',
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
      badge: 'Plate 04 // Narrative Assembly & Sound Architecture'
    },
    {
      step: '05',
      title: 'DELIVER',
      statement: '“Final assets prepared for where they’ll be used and who will see them.”',
      deliverable: 'Multi-Format Master Deliverables & Archival Package',
      perspective: 'Platform Distribution & Stakeholder Presentation',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      badge: 'Plate 05 // Master Distribution Package'
    }
  ];

  const updateActiveStep = (index) => {
    if (index < 0 || index >= processData.length) return;
    const data = processData[index];

    processSteps.forEach((step, idx) => {
      const isSelected = idx === index;
      step.classList.toggle('is-active', isSelected);
      step.setAttribute('aria-selected', isSelected ? 'true' : 'false');
    });

    if (activePanelNumber) activePanelNumber.textContent = `${data.step} / 05`;
    if (activePanelTitle) activePanelTitle.textContent = data.title;
    if (activePanelStatement) activePanelStatement.textContent = data.statement;
    if (activePanelDeliverable) activePanelDeliverable.textContent = data.deliverable;
    if (activePanelPerspective) activePanelPerspective.textContent = data.perspective;

    if (activeProcessImg) {
      activeProcessImg.style.opacity = '0.3';
      activeProcessImg.style.transform = 'scale(0.98)';
      setTimeout(() => {
        activeProcessImg.src = data.image;
        activeProcessImg.style.opacity = '1';
        activeProcessImg.style.transform = 'scale(1)';
      }, 150);
    }
    if (activeProcessBadge) activeProcessBadge.textContent = data.badge;
  };

  processSteps.forEach((step, index) => {
    step.addEventListener('click', () => updateActiveStep(index));
    step.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        updateActiveStep(index);
      }
    });
  });

  /* ==========================================================================
     9. INTERACTIVE 35MM FILM STRIP SCRUBBING ON MOUSE MOVE
     ========================================================================== */
  const filmViewport = document.getElementById('film-strip-viewport');
  const filmTrack = document.getElementById('film-strip-track');

  if (filmViewport && filmTrack && !prefersReducedMotion) {
    let currentX = 0;
    let targetX = 0;
    let isHoveringStrip = false;
    let maxScroll = 0;

    const calcMaxScroll = () => {
      maxScroll = Math.max(0, filmTrack.scrollWidth - filmViewport.clientWidth);
    };

    calcMaxScroll();
    window.addEventListener('resize', calcMaxScroll, { passive: true });

    filmViewport.addEventListener('mouseenter', () => {
      isHoveringStrip = true;
      calcMaxScroll();
    });

    filmViewport.addEventListener('mouseleave', () => {
      isHoveringStrip = false;
    });

    filmViewport.addEventListener('mousemove', (e) => {
      const rect = filmViewport.getBoundingClientRect();
      const relativeX = (e.clientX - rect.left) / rect.width;
      // Clamp between 0 and 1
      const clampedRatio = Math.max(0, Math.min(1, relativeX));
      targetX = -maxScroll * clampedRatio;
    });

    // Touch gesture swipe support for mobile
    let touchStartX = 0;
    let touchLastX = 0;
    let isTouching = false;

    filmViewport.addEventListener('touchstart', (e) => {
      if (!e.touches.length) return;
      isTouching = true;
      isHoveringStrip = true;
      touchStartX = e.touches[0].clientX;
      touchLastX = touchStartX;
      calcMaxScroll();
    }, { passive: true });

    filmViewport.addEventListener('touchmove', (e) => {
      if (!isTouching || !e.touches.length) return;
      const clientX = e.touches[0].clientX;
      const deltaX = clientX - touchLastX;
      touchLastX = clientX;
      targetX = Math.max(-maxScroll, Math.min(0, targetX + deltaX * 1.6));
    }, { passive: true });

    filmViewport.addEventListener('touchend', () => {
      isTouching = false;
      setTimeout(() => {
        isHoveringStrip = false;
      }, 1200);
    }, { passive: true });

    // Inertial smoothing loop
    const animateFilmStrip = () => {
      if (isHoveringStrip) {
        currentX += (targetX - currentX) * 0.08;
        filmTrack.style.transform = `translate3d(${currentX}px, 0, 0)`;
      }
      requestAnimationFrame(animateFilmStrip);
    };

    requestAnimationFrame(animateFilmStrip);
  }

  /* ==========================================================================
     8. THE SPATIAL PERSPECTIVE MATRIX (SCALE ARCHITECTURE)
     ========================================================================== */
  const spatialCards = document.querySelectorAll('.spatial-tier-card');
  const spatialLayers = document.querySelectorAll('.spatial-layer-img');

  spatialCards.forEach(card => {
    const activateTier = () => {
      const tier = card.getAttribute('data-tier');
      spatialCards.forEach(c => c.classList.remove('is-active'));
      card.classList.add('is-active');

      spatialLayers.forEach(layer => {
        if (layer.getAttribute('data-tier') === tier) {
          layer.classList.add('is-active');
        } else {
          layer.classList.remove('is-active');
        }
      });
    };

    card.addEventListener('click', activateTier);
    card.addEventListener('mouseenter', activateTier);
  });

  /* ==========================================================================
     9. 3D TILT WITH SPECULAR SHEEN (MOUSE MOVEMENT MORPHING)
     ========================================================================== */
  if (!prefersReducedMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const tiltSelectors = '.focus-card, .film-strip-item, .tech-spec-card, .spatial-tier-card, .pillar-card';
    const tiltCards = document.querySelectorAll(tiltSelectors);

    tiltCards.forEach(card => {
      card.classList.add('has-3d-tilt');

      // Inject sheen overlay if not present
      if (!card.querySelector('.card-sheen-overlay')) {
        const sheen = document.createElement('div');
        sheen.className = 'card-sheen-overlay';
        sheen.setAttribute('aria-hidden', 'true');
        card.appendChild(sheen);
      }

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        const tiltX = (0.5 - y) * 10;
        const tiltY = (x - 0.5) * 10;

        card.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateZ(8px)`;

        const sheen = card.querySelector('.card-sheen-overlay');
        if (sheen) {
          sheen.style.background = `radial-gradient(circle at ${(x * 100).toFixed(1)}% ${(y * 100).toFixed(1)}%, rgba(255, 255, 255, 0.16) 0%, transparent 60%)`;
          sheen.style.opacity = '1';
        }
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        const sheen = card.querySelector('.card-sheen-overlay');
        if (sheen) sheen.style.opacity = '0';
      });
    });

    // Section Watermark Parallax Drift
    const watermarks = document.querySelectorAll('.section-watermark');
    window.addEventListener('mousemove', (e) => {
      const nx = (e.clientX / window.innerWidth) - 0.5;
      const ny = (e.clientY / window.innerHeight) - 0.5;

      watermarks.forEach(wm => {
        wm.style.transform = `translate3d(${(nx * -30).toFixed(1)}px, ${(ny * -20).toFixed(1)}px, 0)`;
      });
    }, { passive: true });
  }

  /* ==========================================================================
     12. KINETIC RETICLE & CROSSHAIR TRACKER IN VIEWFINDERS
     ========================================================================== */
  const interactiveViewfinders = document.querySelectorAll('.hero__frame, .split-editorial__frame');

  interactiveViewfinders.forEach(vf => {
    let hud = vf.querySelector('.kinetic-crosshair-hud');
    if (!hud) {
      hud = document.createElement('div');
      hud.className = 'kinetic-crosshair-hud';
      hud.innerHTML = `
        <svg class="kinetic-crosshair-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
          <circle cx="12" cy="12" r="9"></circle>
          <line x1="12" y1="2" x2="12" y2="22"></line>
          <line x1="2" y1="12" x2="22" y2="12"></line>
        </svg>
        <span class="kinetic-crosshair-coords">X: 0 Y: 0 // TARGET LOCK</span>
      `;
      vf.appendChild(hud);
    }

    const coordsSpan = hud.querySelector('.kinetic-crosshair-coords');

    vf.addEventListener('mousemove', (e) => {
      const rect = vf.getBoundingClientRect();
      const x = Math.round(e.clientX - rect.left);
      const y = Math.round(e.clientY - rect.top);

      hud.style.left = `${x}px`;
      hud.style.top = `${y}px`;
      if (coordsSpan) {
        coordsSpan.textContent = `X: ${x} Y: ${y} // FOCAL LOCK`;
      }
    });
  });

  /* ==========================================================================
     13. CAPABILITIES ACCORDION (EXPANDABLE EDITORIAL ROWS)
     ========================================================================== */
  const capabilityItems = document.querySelectorAll('.capability-item');

  capabilityItems.forEach(item => {
    const header = item.querySelector('.capability-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isExpanded = item.classList.contains('is-expanded');
      
      capabilityItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('is-expanded');
          const otherHeader = otherItem.querySelector('.capability-header');
          if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
        }
      });

      item.classList.toggle('is-expanded', !isExpanded);
      header.setAttribute('aria-expanded', !isExpanded ? 'true' : 'false');
    });
  });

  /* ==========================================================================
     14. FLOATING NOTIFICATION TOAST UTILITY
     ========================================================================== */
  const toast = document.getElementById('toast-notification');
  let toastTimer = null;

  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 2800);
  };

  /* ==========================================================================
     15. IMAGE LIGHTBOX INSPECTION MODAL
     ========================================================================== */
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxMeta = document.getElementById('lightbox-meta');
  const lightboxCloseBtn = document.getElementById('lightbox-close-btn');

  const openLightbox = (src, caption, meta) => {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    if (lightboxCaption) lightboxCaption.textContent = caption || 'Avion Visual Archive Plate';
    if (lightboxMeta) lightboxMeta.textContent = meta || '35mm Monochrome Master';
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  if (lightboxCloseBtn) {
    lightboxCloseBtn.addEventListener('click', closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('lightbox-viewport')) {
        closeLightbox();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('is-open')) {
      closeLightbox();
    }
  });

  const inspectableMedia = document.querySelectorAll('[data-inspectable]');
  inspectableMedia.forEach(el => {
    el.addEventListener('click', () => {
      const img = el.querySelector('img');
      if (img) {
        const caption = el.getAttribute('data-caption') || img.getAttribute('alt');
        const meta = el.getAttribute('data-meta') || 'Architectural Field Capture';
        openLightbox(img.src, caption, meta);
      }
    });
  });

  /* ==========================================================================
     16. START A PROJECT: PROGRESSIVE WIZARD & LIVE REQUISITION TICKET
     ========================================================================== */
  const form = document.getElementById('project-enquiry-form');
  const stepPanels = document.querySelectorAll('.form-step-panel');
  const progressSteps = document.querySelectorAll('.progress-step');
  const prevBtn = document.getElementById('form-prev-btn');
  const nextBtn = document.getElementById('form-next-btn');
  const submitBtn = document.getElementById('form-submit-btn');

  const nameInput = document.getElementById('enquiry-name');
  const orgInput = document.getElementById('enquiry-org');
  const contactInput = document.getElementById('enquiry-contact');
  const workingOnInput = document.getElementById('enquiry-working-on');
  const communicateInput = document.getElementById('enquiry-communicate');
  const deadlineInput = document.getElementById('enquiry-deadline');

  const scopeChips = document.querySelectorAll('.scope-chip');
  let selectedScopes = [];

  scopeChips.forEach(chip => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('is-selected');
      const val = chip.getAttribute('data-scope');
      if (chip.classList.contains('is-selected')) {
        if (!selectedScopes.includes(val)) selectedScopes.push(val);
      } else {
        selectedScopes = selectedScopes.filter(s => s !== val);
      }
    });
  });

  const reviewName = document.getElementById('review-name');
  const reviewOrg = document.getElementById('review-org');
  const reviewContact = document.getElementById('review-contact');
  const reviewScope = document.getElementById('review-scope');
  const reviewWorkingOn = document.getElementById('review-working-on');
  const reviewCommunicate = document.getElementById('review-communicate');
  const reviewDeadline = document.getElementById('review-deadline');

  const submissionStateBox = document.getElementById('submission-state');
  const resetFormBtn = document.getElementById('reset-form-btn');
  const emailDraftBtn = document.getElementById('open-email-draft-btn');
  const copyBriefBtn = document.getElementById('copy-brief-btn');

  let currentStep = 1;
  const totalSteps = 3;

  const validateEmailOrPhone = (value) => {
    const trimmed = value.trim();
    if (!trimmed) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (trimmed.includes('@')) {
      return emailRegex.test(trimmed);
    }
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,16}$/;
    return phoneRegex.test(trimmed);
  };

  const setFieldError = (inputEl, hasError, customMsg) => {
    if (!inputEl) return;
    const parent = inputEl.closest('.form-field-group');
    if (!parent) return;
    const errorMsgEl = parent.querySelector('.error-message');

    if (hasError) {
      parent.classList.add('has-error');
      if (errorMsgEl && customMsg) {
        errorMsgEl.textContent = customMsg;
      }
    } else {
      parent.classList.remove('has-error');
    }
  };

  const validateStep = (step) => {
    let isValid = true;

    if (step === 1) {
      if (!nameInput.value.trim()) {
        setFieldError(nameInput, true, 'Please enter your name.');
        isValid = false;
      } else {
        setFieldError(nameInput, false);
      }

      if (!orgInput.value.trim()) {
        setFieldError(orgInput, true, 'Please enter your organisation.');
        isValid = false;
      } else {
        setFieldError(orgInput, false);
      }

      if (!contactInput.value.trim()) {
        setFieldError(contactInput, true, 'Please provide an email or phone number.');
        isValid = false;
      } else if (!validateEmailOrPhone(contactInput.value)) {
        setFieldError(contactInput, true, 'Please provide a valid email address or phone number.');
        isValid = false;
      } else {
        setFieldError(contactInput, false);
      }
    } else if (step === 2) {
      if (!workingOnInput.value.trim()) {
        setFieldError(workingOnInput, true, 'Please describe what you are working on.');
        isValid = false;
      } else {
        setFieldError(workingOnInput, false);
      }

      if (!communicateInput.value.trim()) {
        setFieldError(communicateInput, true, 'Please outline what needs to be communicated.');
        isValid = false;
      } else {
        setFieldError(communicateInput, false);
      }
    }

    return isValid;
  };

  const populateReviewStep = () => {
    if (reviewName) reviewName.textContent = nameInput.value.trim() || '—';
    if (reviewOrg) reviewOrg.textContent = orgInput.value.trim() || '—';
    if (reviewContact) reviewContact.textContent = contactInput.value.trim() || '—';
    if (reviewScope) reviewScope.textContent = selectedScopes.length > 0 ? selectedScopes.join(', ') : 'Not specified';
    if (reviewWorkingOn) reviewWorkingOn.textContent = workingOnInput.value.trim() || '—';
    if (reviewCommunicate) reviewCommunicate.textContent = communicateInput.value.trim() || '—';
    if (reviewDeadline) reviewDeadline.textContent = deadlineInput.value.trim() || 'Flexible / To be discussed';
  };

  const goToStep = (step) => {
    if (step < 1 || step > totalSteps) return;

    stepPanels.forEach(panel => {
      const panelStep = parseInt(panel.getAttribute('data-step'), 10);
      panel.classList.toggle('is-visible', panelStep === step);
    });

    progressSteps.forEach((pStep, index) => {
      const stepNum = index + 1;
      pStep.classList.toggle('is-active', stepNum === step);
      pStep.classList.toggle('is-complete', stepNum < step);
    });

    if (prevBtn) prevBtn.style.display = step > 1 ? 'inline-flex' : 'none';
    if (nextBtn) nextBtn.style.display = step < totalSteps ? 'inline-flex' : 'none';
    if (submitBtn) submitBtn.style.display = step === totalSteps ? 'inline-flex' : 'none';

    currentStep = step;

    if (step === 3) {
      populateReviewStep();
    }

    const activePanel = document.querySelector(`.form-step-panel[data-step="${step}"]`);
    if (activePanel) {
      const firstInput = activePanel.querySelector('input, textarea');
      if (firstInput) firstInput.focus();
    }
  };

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (validateStep(currentStep)) {
        goToStep(currentStep + 1);
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      goToStep(currentStep - 1);
    });
  }

  progressSteps.forEach(stepEl => {
    stepEl.addEventListener('click', () => {
      const targetStep = parseInt(stepEl.getAttribute('data-step-target'), 10);
      if (targetStep < currentStep) {
        goToStep(targetStep);
      } else if (targetStep > currentStep) {
        if (validateStep(currentStep)) {
          goToStep(targetStep);
        }
      }
    });
  });

  [nameInput, orgInput, contactInput, workingOnInput, communicateInput].forEach(input => {
    if (input) {
      input.addEventListener('input', () => {
        setFieldError(input, false);
      });
    }
  });

  /* ==========================================================================
     17. SUBMISSION ADAPTER & DEMO FALLBACK
     ========================================================================== */
  const generateBriefMarkdown = () => {
    return [
      '# AVION VISUAL INTELLIGENCE — PROJECT ENQUIRY',
      '',
      `Date: ${new Date().toLocaleDateString('en-GB')}`,
      `Client: ${nameInput.value.trim()}`,
      `Organisation: ${orgInput.value.trim()}`,
      `Contact (Email / Phone): ${contactInput.value.trim()}`,
      `Selected Scope Focus: ${selectedScopes.join(', ') || 'General Project'}`,
      '',
      '## The Project Context',
      workingOnInput.value.trim(),
      '',
      '## Communication Objective',
      communicateInput.value.trim(),
      '',
      '## Timeline',
      `Target Deadline: ${deadlineInput.value.trim() || 'Flexible / To be confirmed'}`,
      '',
      'Generated via avion-intelligence.com enquiry interface'
    ].join('\n');
  };

  const handleFormSubmission = (e) => {
    e.preventDefault();

    if (!validateStep(1) || !validateStep(2)) {
      goToStep(!validateStep(1) ? 1 : 2);
      return;
    }

    submitBtn.disabled = true;
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Structuring Brief...';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;

      form.style.display = 'none';
      if (submissionStateBox) {
        submissionStateBox.classList.add('is-visible');
        submissionStateBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      if (emailDraftBtn) {
        const subject = encodeURIComponent(`Project Enquiry — ${orgInput.value.trim() || nameInput.value.trim()}`);
        const body = encodeURIComponent(generateBriefMarkdown());
        emailDraftBtn.href = `mailto:enquiries@avion-intelligence.com?subject=${subject}&body=${body}`;
      }

      showToast('Project brief compiled successfully');
    }, 450);
  };

  if (form) {
    form.addEventListener('submit', handleFormSubmission);
  }

  if (copyBriefBtn) {
    copyBriefBtn.addEventListener('click', () => {
      const briefText = generateBriefMarkdown();
      navigator.clipboard.writeText(briefText).then(() => {
        showToast('Brief copied to clipboard ✓');
      }).catch(() => {
        alert('Could not copy to clipboard. Please copy manually from the review card.');
      });
    });
  }

  if (resetFormBtn) {
    resetFormBtn.addEventListener('click', () => {
      form.reset();
      selectedScopes = [];
      scopeChips.forEach(c => c.classList.remove('is-selected'));
      form.style.display = 'block';
      if (submissionStateBox) {
        submissionStateBox.classList.remove('is-visible');
      }
      goToStep(1);
    });
  }

  /* ==========================================================================
     18. DYNAMIC COPYRIGHT YEAR
     ========================================================================== */
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  /* ==========================================================================
     19. BACK TO TOP BUTTON
     ========================================================================== */
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    });
  }

  /* ==========================================================================
     20. DESKTOP CONTEXTUAL CUSTOM CURSOR
     ========================================================================== */
  const cursor = document.querySelector('.custom-cursor');

  if (cursor && !prefersReducedMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let mouseX = -100;
    let mouseY = -100;
    let cursorX = -100;
    let cursorY = -100;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const animateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.18;
      cursorY += (mouseY - cursorY) * 0.18;
      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(animateCursor);
    };

    requestAnimationFrame(animateCursor);

    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .process-step, .capability-header, .scope-chip, .spatial-tier-card');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('is-hovering'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('is-hovering'));
    });

    inspectableMedia.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('is-view-mode');
        const label = cursor.querySelector('.cursor-label');
        if (label) label.textContent = 'VIEW';
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('is-view-mode');
      });
    });
  }

  /* ==========================================================================
     21. REMOTE IMAGE ERROR FALLBACK HANDLER
     ========================================================================== */
  const fallbackSvgPath = 'assets/images/fallback.svg';
  const allImages = document.querySelectorAll('img');

  allImages.forEach(img => {
    img.addEventListener('error', () => {
      if (img.getAttribute('src') !== fallbackSvgPath) {
        img.src = fallbackSvgPath;
        img.alt = 'Avion visual archive placeholder';
      }
    });
  });
});
