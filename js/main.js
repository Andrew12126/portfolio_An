/**
 * @fileoverview Main Application Architecture for Nguyen Van An Portfolio.
 * Modular, clean code implementation adhering to SOLID principles:
 * - Theme Management (Light/Dark mode with persistence)
 * - Accessible Navigation & Mobile Drawer
 * - Hardware-accelerated Scroll Reveal Micro-interactions
 * - Accessible Accordion Controllers
 * - Interactive Project Category Filter
 * - Printable Academic CV Modal Controller
 * - Mailto & Clipboard Inquiry Form Dispatcher
 * - Clipboard Utilities & Toast Notifications
 *
 * @version 2.1.0
 */

'use strict';

/**
 * Application Configuration & Frozen Constants
 */
const APP_CONFIG = Object.freeze({
  CONTACT_EMAIL: 'nguyenvanan722006@gmail.com',
  STORAGE_KEYS: Object.freeze({
    THEME: 'adley_theme',
    LANG: 'adley_lang'
  }),
  THEMES: Object.freeze({
    LIGHT: 'light',
    DARK: 'dark'
  }),
  VIEWPORT: Object.freeze({
    DESKTOP_BREAKPOINT_PX: 768
  }),
  TOAST: Object.freeze({
    DURATION_MS: 3400,
    FADE_OUT_MS: 260
  }),
  SCROLL_REVEAL: Object.freeze({
    THRESHOLD: 0.08,
    ROOT_MARGIN: '0px 0px -40px 0px'
  })
});

/* ==========================================================================
   MODULE 1: THEME MANAGEMENT
   ========================================================================== */
const ThemeManager = (() => {
  const rootElement = document.documentElement;

  function resolveInitialTheme() {
    try {
      const saved = localStorage.getItem(APP_CONFIG.STORAGE_KEYS.THEME);
      if (saved === APP_CONFIG.THEMES.DARK || saved === APP_CONFIG.THEMES.LIGHT) {
        return saved;
      }
    } catch (error) {
      console.warn('[ThemeManager] LocalStorage read failed:', error);
    }

    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    return prefersDark ? APP_CONFIG.THEMES.DARK : APP_CONFIG.THEMES.LIGHT;
  }

  function syncThemeIcons(isDark) {
    const sunIcons = document.querySelectorAll('.theme-sun-icon');
    const moonIcons = document.querySelectorAll('.theme-moon-icon');

    sunIcons.forEach((icon) => icon.classList.toggle('hidden', !isDark));
    moonIcons.forEach((icon) => icon.classList.toggle('hidden', isDark));
  }

  function applyTheme(theme) {
    const isDark = theme === APP_CONFIG.THEMES.DARK;
    rootElement.classList.toggle(APP_CONFIG.THEMES.DARK, isDark);
    syncThemeIcons(isDark);

    try {
      localStorage.setItem(APP_CONFIG.STORAGE_KEYS.THEME, theme);
    } catch (error) {
      console.warn('[ThemeManager] LocalStorage write failed:', error);
    }
  }

  function toggleTheme() {
    const currentlyDark = rootElement.classList.contains(APP_CONFIG.THEMES.DARK);
    const newTheme = currentlyDark ? APP_CONFIG.THEMES.LIGHT : APP_CONFIG.THEMES.DARK;
    applyTheme(newTheme);

    const getLangFn = globalThis['getCurrentLang'];
    const activeLang = typeof getLangFn === 'function' ? getLangFn() : 'en';
    const notification = newTheme === APP_CONFIG.THEMES.DARK
      ? (activeLang === 'vi' ? '🌙 Đã chuyển sang giao diện Tối' : '🌙 Switched to Dark Mode')
      : (activeLang === 'vi' ? '☀️ Đã chuyển sang giao diện Sáng' : '☀️ Switched to Light Mode');

    ToastService.show(notification, 'info');
  }

  function init() {
    applyTheme(resolveInitialTheme());

    const toggleButtons = document.querySelectorAll('.theme-toggle-btn');
    toggleButtons.forEach((btn) => {
      btn.addEventListener('click', toggleTheme);
    });
  }

  return { init, toggleTheme, applyTheme };
})();

/* ==========================================================================
   MODULE 2: NAVIGATION & ACCESSIBLE MOBILE DRAWER
   ========================================================================== */
const NavigationManager = (() => {
  const elements = {
    button: null,
    drawer: null,
    openIcon: null,
    closeIcon: null
  };

  function toggle(forceState) {
    if (!elements.button || !elements.drawer) return;

    const shouldOpen = typeof forceState === 'boolean'
      ? forceState
      : elements.drawer.classList.contains('hidden');

    elements.drawer.classList.toggle('hidden', !shouldOpen);
    elements.button.setAttribute('aria-expanded', String(shouldOpen));
    elements.openIcon?.classList.toggle('hidden', shouldOpen);
    elements.closeIcon?.classList.toggle('hidden', !shouldOpen);
  }

  function attachListeners() {
    elements.button.addEventListener('click', (event) => {
      event.stopPropagation();
      toggle();
    });

    elements.drawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => toggle(false));
    });

    document.addEventListener('click', (event) => {
      if (!elements.drawer.contains(event.target) && !elements.button.contains(event.target)) {
        if (!elements.drawer.classList.contains('hidden')) {
          toggle(false);
        }
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !elements.drawer.classList.contains('hidden')) {
        toggle(false);
        elements.button.focus();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth >= APP_CONFIG.VIEWPORT.DESKTOP_BREAKPOINT_PX) {
        if (!elements.drawer.classList.contains('hidden')) {
          toggle(false);
        }
      }
    });
  }

  function init() {
    elements.button = document.getElementById('mobile-menu-btn');
    elements.drawer = document.getElementById('mobile-menu');
    elements.openIcon = document.getElementById('menu-icon-open');
    elements.closeIcon = document.getElementById('menu-icon-close');

    if (elements.button && elements.drawer) {
      attachListeners();
    }
  }

  return { init, toggle };
})();

/* ==========================================================================
   MODULE 3: SCROLL REVEAL (Micro-interactions)
   ========================================================================== */
const ScrollRevealManager = (() => {
  function init() {
    const targets = document.querySelectorAll('.reveal-on-scroll');
    if (!targets.length) return;

    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      targets.forEach((target) => target.classList.add('is-revealed'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: APP_CONFIG.SCROLL_REVEAL.ROOT_MARGIN,
      threshold: APP_CONFIG.SCROLL_REVEAL.THRESHOLD
    });

    targets.forEach((target) => observer.observe(target));
  }

  return { init };
})();

/* ==========================================================================
   MODULE 4: ACCORDION CONTROLLER
   ========================================================================== */
const AccordionController = (() => {
  function toggleItem(trigger) {
    const targetId = trigger.getAttribute('data-accordion-target');
    if (!targetId) return;

    const panel = document.getElementById(targetId);
    if (!panel) return;

    const isCurrentlyHidden = panel.classList.contains('hidden');
    const icon = trigger.querySelector('.accordion-icon');

    panel.classList.toggle('hidden', !isCurrentlyHidden);
    trigger.setAttribute('aria-expanded', String(isCurrentlyHidden));
    icon?.classList.toggle('rotate-180', isCurrentlyHidden);
    icon?.classList.toggle('text-[#C25E00]', isCurrentlyHidden);
    trigger.classList.toggle('bg-[#F9FAFB]', isCurrentlyHidden);
    trigger.classList.toggle('dark:bg-[#161D2F]', isCurrentlyHidden);
  }

  function init() {
    const triggers = document.querySelectorAll('[data-accordion-target]');
    triggers.forEach((trigger) => {
      trigger.addEventListener('click', () => toggleItem(trigger));
    });
  }

  return { init };
})();

/* ==========================================================================
   MODULE 5: CLIPBOARD SERVICE
   ========================================================================== */
const ClipboardService = (() => {
  function fallbackCopy(text) {
    return new Promise((resolve, reject) => {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        textarea.style.top = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        const successful = document.execCommand('copy');
        document.body.removeChild(textarea);
        successful ? resolve() : reject(new Error('execCommand copy failed'));
      } catch (err) {
        reject(err);
      }
    });
  }

  async function copy(text, customSuccessMessage) {
    if (!text) return;

    const getLangFn = globalThis['getCurrentLang'];
    const activeLang = typeof getLangFn === 'function' ? getLangFn() : 'en';
    const successMessage = customSuccessMessage || (activeLang === 'vi' ? `Đã sao chép: "${text}"` : `Copied: "${text}"`);
    const errorMessage = activeLang === 'vi' ? 'Không thể sao chép tự động' : 'Could not copy automatically';

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        await fallbackCopy(text);
      }
      ToastService.show(successMessage, 'success');
    } catch {
      ToastService.show(errorMessage, 'error');
    }
  }

  function init() {
    const copyButtons = document.querySelectorAll('[data-copy-text]');
    copyButtons.forEach((btn) => {
      btn.addEventListener('click', (event) => {
        event.preventDefault();
        const payload = btn.getAttribute('data-copy-text');
        copy(payload);
      });
    });
  }

  return { init, copy };
})();

/* ==========================================================================
   MODULE 6: INTERACTIVE PROJECT CATEGORY FILTER (projects.html)
   ========================================================================== */
const ProjectFilterController = (() => {
  function init() {
    const filterButtons = document.querySelectorAll('[data-filter-btn]');
    const projectCards = document.querySelectorAll('[data-project-category]');
    if (!filterButtons.length || !projectCards.length) return;

    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const selectedCategory = btn.getAttribute('data-filter-btn') || 'all';

        // Update active button state
        filterButtons.forEach((b) => {
          const isActive = b === btn;
          b.setAttribute('aria-pressed', String(isActive));
          if (isActive) {
            b.className = 'px-3.5 py-2 rounded-lg text-xs font-mono font-semibold bg-[#C25E00] text-white border border-[#C25E00] transition-colors btn-interactive';
          } else {
            b.className = 'px-3.5 py-2 rounded-lg text-xs font-mono font-medium bg-white dark:bg-[#111726] text-[#4B5563] dark:text-slate-300 border border-[#E5E7EB] dark:border-white/10 hover:border-[#C25E00] dark:hover:border-[#D95D1E] transition-colors btn-interactive';
          }
        });

        // Filter project cards
        projectCards.forEach((card) => {
          const cardCat = card.getAttribute('data-project-category') || '';
          const shouldShow = selectedCategory === 'all' || cardCat.split(' ').includes(selectedCategory);
          card.classList.toggle('hidden', !shouldShow);
        });
      });
    });
  }

  return { init };
})();

/* ==========================================================================
   MODULE 7: TOAST NOTIFICATION SERVICE
   ========================================================================== */
const ToastService = (() => {
  const CONTAINER_ID = 'toast-container';

  function getContainer() {
    let container = document.getElementById(CONTAINER_ID);
    if (!container) {
      container = document.createElement('div');
      container.id = CONTAINER_ID;
      container.setAttribute('aria-live', 'polite');
      container.setAttribute('aria-atomic', 'true');
      document.body.appendChild(container);
    }
    return container;
  }

  function resolveToastStyles(type) {
    if (type === 'success') {
      return { borderClass: 'border-[#16A34A] text-[#16A34A]', dotClass: 'bg-[#16A34A]' };
    }
    if (type === 'error') {
      return { borderClass: 'border-[#DC2626] text-[#DC2626]', dotClass: 'bg-[#DC2626]' };
    }
    return { borderClass: 'border-[#C25E00] text-[#111827] dark:text-white', dotClass: 'bg-[#C25E00]' };
  }

  function show(message, type = 'info') {
    const container = getContainer();
    const { borderClass, dotClass } = resolveToastStyles(type);

    const toast = document.createElement('div');
    toast.className = `toast px-4 py-2.5 rounded-lg border text-xs font-mono font-medium shadow-sm flex items-center gap-2.5 backdrop-blur-md bg-white dark:bg-[#111726] ${borderClass}`;

    const dot = document.createElement('span');
    dot.className = `w-1.5 h-1.5 rounded-full shrink-0 ${dotClass}`;

    const textSpan = document.createElement('span');
    textSpan.textContent = message;

    toast.appendChild(dot);
    toast.appendChild(textSpan);
    container.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), APP_CONFIG.TOAST.FADE_OUT_MS);
    }, APP_CONFIG.TOAST.DURATION_MS);
  }

  return { show };
})();

Object.assign(window, { showToast: ToastService.show });

/* ==========================================================================
   MODULE 8: CONTACT FORM CONTROLLER (Mailto & Clipboard Dispatcher)
   ========================================================================== */
const ContactFormController = (() => {
  function buildInquiryPayload(form) {
    const nameInput = /** @type {HTMLInputElement | null} */ (form.querySelector('#contact-name'));
    const emailInput = /** @type {HTMLInputElement | null} */ (form.querySelector('#contact-email'));
    const subjectSelect = /** @type {HTMLSelectElement | null} */ (form.querySelector('#contact-subject'));
    const messageInput = /** @type {HTMLTextAreaElement | null} */ (form.querySelector('#contact-message'));

    const name = nameInput?.value?.trim() || 'Academic Colleague';
    const email = emailInput?.value?.trim() || '';
    const subjectText = subjectSelect?.options[subjectSelect.selectedIndex]?.text?.trim() || 'Academic Inquiry';
    const message = messageInput?.value?.trim() || '';

    const fullSubject = `[Portfolio Inquiry - ${subjectText}] from ${name}`;
    const fullBody = [
      `Dear Nguyen Van An,`,
      ``,
      message,
      ``,
      `---`,
      `Sender Name: ${name}`,
      `Reply-To Email: ${email}`,
      `Category: ${subjectText}`
    ].join('\n');

    return { fullSubject, fullBody, message };
  }

  function init() {
    const form = document.getElementById('academic-contact-form');
    if (!form) return;

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const { fullSubject, fullBody } = buildInquiryPayload(form);
      const getLangFn = globalThis['getCurrentLang'];
      const currentLang = typeof getLangFn === 'function' ? getLangFn() : 'en';

      const mailtoUrl = `mailto:${APP_CONFIG.CONTACT_EMAIL}?subject=${encodeURIComponent(fullSubject)}&body=${encodeURIComponent(fullBody)}`;
      window.location.href = mailtoUrl;

      const msg = currentLang === 'vi'
        ? '✉️ Đang mở trình gửi Email với nội dung thư đã được định dạng sẵn!'
        : '✉️ Opening your email client with your pre-formatted academic inquiry!';
      ToastService.show(msg, 'success');
    });

    const copyInquiryBtn = document.getElementById('copy-inquiry-btn');
    if (copyInquiryBtn) {
      copyInquiryBtn.addEventListener('click', () => {
        const { fullSubject, fullBody, message } = buildInquiryPayload(form);
        const getLangFn = globalThis['getCurrentLang'];
        const currentLang = typeof getLangFn === 'function' ? getLangFn() : 'en';
        if (!message) {
          ToastService.show(
            currentLang === 'vi' ? 'Vui lòng nhập nội dung tin nhắn trước khi sao chép.' : 'Please enter your message content before copying.',
            'error'
          );
          return;
        }
        const formattedText = `To: ${APP_CONFIG.CONTACT_EMAIL}\nSubject: ${fullSubject}\n\n${fullBody}`;
        const toastMsg = currentLang === 'vi'
          ? '✓ Đã sao chép toàn bộ nội dung thư vào bộ nhớ tạm!'
          : '✓ Copied formatted inquiry to clipboard!';
        ClipboardService.copy(formattedText, toastMsg);
      });
    }
  }

  return { init };
})();

/* ==========================================================================
   MODULE 9: PRINTABLE ACADEMIC CV MODAL CONTROLLER (Global Multi-Page)
   ========================================================================== */
const AcademicCvModalController = (() => {
  const CV_MODAL_TEMPLATE = `
    <div
      id="cv-modal-content"
      class="w-full max-w-4xl bg-white dark:bg-[#111726] border border-[#E5E7EB] dark:border-white/10 rounded-xl shadow-xl max-h-[90vh] overflow-y-auto p-6 sm:p-10 space-y-6 text-[#111827] dark:text-white"
    >
      <!-- Top Action Bar (Hidden when printing) -->
      <div class="no-print flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#E5E7EB] dark:border-white/10">
        <span data-i18n="cv_modal_badge" class="font-mono text-xs font-semibold uppercase tracking-wider text-[#C25E00] dark:text-[#D95D1E]">
          ACADEMIC CURRICULUM VITAE (PRINT-READY PDF FORMAT)
        </span>
        <div class="flex items-center gap-2">
          <button
            type="button"
            id="print-cv-btn"
            class="inline-flex items-center gap-2 min-h-[40px] px-4 py-2 rounded-lg text-xs font-mono font-semibold bg-[#C25E00] text-white hover:bg-[#A84E00] transition-colors cursor-pointer"
          >
            <i data-lucide="printer" class="w-3.5 h-3.5"></i>
            <span data-i18n="cv_modal_print_btn">Print / Save as PDF (Ctrl+P)</span>
          </button>
          <button
            type="button"
            data-close-cv-modal="true"
            class="inline-flex items-center gap-1.5 min-h-[40px] px-3 py-2 rounded-lg text-xs font-mono border border-[#E5E7EB] dark:border-white/10 hover:bg-[#FAF9F6] dark:hover:bg-white/5 transition-colors cursor-pointer"
          >
            <i data-lucide="x" class="w-4 h-4"></i>
            <span data-i18n="cv_modal_close_btn">Close</span>
          </button>
        </div>
      </div>

      <!-- Printable CV Document Body -->
      <div class="space-y-6 text-xs sm:text-sm leading-relaxed">
        <!-- CV Header -->
        <div class="border-b-2 border-[#111827] dark:border-white/20 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <h2 id="cv-modal-title" class="text-2xl sm:text-3xl font-serif font-normal tracking-tight">
              NGUYEN VAN AN (Nguyễn Văn An)
            </h2>
            <p class="font-mono text-xs text-[#C25E00] dark:text-[#D95D1E] mt-1">
              Undergraduate in Information Technology • Aspiring Human-Centric AI Researcher
            </p>
          </div>
          <div class="font-mono text-xs text-[#4B5563] dark:text-slate-300 sm:text-right space-y-0.5">
            <div>Bien Hoa City, Dong Nai, Vietnam</div>
            <div>Email: nguyenvanan722006@gmail.com | Tel: +84 336 554 428</div>
            <div>GitHub: github.com/Andrew12126</div>
          </div>
        </div>

        <!-- 1. Education -->
        <div class="space-y-2.5">
          <h3 class="font-mono text-xs font-bold uppercase tracking-widest text-[#C25E00] dark:text-[#D95D1E] border-b border-[#E5E7EB] dark:border-white/10 pb-1">
            1. Education &amp; Academic Transition
          </h3>
          <div class="flex flex-col sm:flex-row sm:items-baseline justify-between">
            <div class="font-semibold">Lac Hong University (LHU) — Faculty of Information Technology</div>
            <div class="font-mono text-xs text-[#6B7280] dark:text-slate-400">2025 — Present</div>
          </div>
          <p class="text-xs text-[#4B5563] dark:text-slate-300">
            • First-Year Undergraduate in Information Technology (B.Sc. Track). Coursework focus: Discrete Mathematics, Programming Foundations, Data Structures &amp; Algorithms, and Applied AI Systems.
          </p>

          <div class="flex flex-col sm:flex-row sm:items-baseline justify-between pt-1">
            <div class="font-semibold">Ho Chi Minh City University of Industry and Trade (HUIT)</div>
            <div class="font-mono text-xs text-[#6B7280] dark:text-slate-400">2024 — 2025 (3 Semesters)</div>
          </div>
          <p class="text-xs text-[#4B5563] dark:text-slate-300">
            • Completed 3 semesters in Hospitality Management prior to transferring into Information Technology at LHU. Cultivated deep training in user psychology, service touchpoint optimization, and public communication.
          </p>
        </div>

        <!-- 2. Early Research Experience -->
        <div class="space-y-2">
          <h3 class="font-mono text-xs font-bold uppercase tracking-widest text-[#C25E00] dark:text-[#D95D1E] border-b border-[#E5E7EB] dark:border-white/10 pb-1">
            2. Early Research &amp; Literature Cataloging Experience
          </h3>
          <div class="flex flex-col sm:flex-row sm:items-baseline justify-between">
            <div class="font-semibold">Faculty Research Topic: Winter Tourism Consumer Behavior in Da Nang City</div>
            <div class="font-mono text-xs text-[#6B7280] dark:text-slate-400">Stage-1 Contribution @ HUIT</div>
          </div>
          <ul class="list-disc list-inside text-xs text-[#4B5563] dark:text-slate-300 space-y-1">
            <li>Participated in Stage 1 (Literature Discovery &amp; Cataloging) under faculty supervision prior to transferring majors to LHU.</li>
            <li>Executed targeted queries across <strong>Google Scholar</strong> and <strong>Perplexity AI</strong> to retrieve related academic papers on tourism seasonality, push-pull motivations, and weather sensitivity.</li>
            <li>Screened paper abstracts and systematically logged findings into a structured <strong>Excel Literature Database</strong> for the research group.</li>
          </ul>
        </div>

        <!-- 3. Applied Technical Projects -->
        <div class="space-y-2">
          <h3 class="font-mono text-xs font-bold uppercase tracking-widest text-[#C25E00] dark:text-[#D95D1E] border-b border-[#E5E7EB] dark:border-white/10 pb-1">
            3. Applied Engineering &amp; Technical Systems
          </h3>
          <div class="flex flex-col sm:flex-row sm:items-baseline justify-between">
            <div class="font-semibold">Smart Gesture Slide Controller (On-Device Computer Vision)</div>
            <div class="font-mono text-xs text-[#6B7280] dark:text-slate-400">JavaScript • MediaPipe Hands • HTML5 Canvas</div>
          </div>
          <ul class="list-disc list-inside text-xs text-[#4B5563] dark:text-slate-300 space-y-1">
            <li>Engineered a touchless browser-based presentation controller tracking 21 3D hand joints at <strong>30–60 FPS (&lt;25ms latency)</strong> with 100% client-side privacy.</li>
            <li>Designed a scale-invariant <strong>Euclidean Geometric Classifier</strong> and a <strong>3-Layer Finite State Machine (FSM) Anti-False-Positive Engine</strong> (1.0s Master Lock, 800ms Dwell Hold-to-Trigger with SVG progress ring, 1.2s Cooldown Buffer).</li>
            <li>Live Demo: <span class="font-mono">andrew12126.github.io/Smart_Gesture_Slide_Controller/</span></li>
          </ul>
        </div>

        <!-- 4. Skills, Languages & Leadership -->
        <div class="space-y-2">
          <h3 class="font-mono text-xs font-bold uppercase tracking-widest text-[#C25E00] dark:text-[#D95D1E] border-b border-[#E5E7EB] dark:border-white/10 pb-1">
            4. Technical Skills, Languages &amp; Public Speaking
          </h3>
          <ul class="list-disc list-inside text-xs text-[#4B5563] dark:text-slate-300 space-y-1">
            <li><strong>Technical Focus:</strong> JavaScript (ES6+), HTML5/CSS3, Tailwind CSS, MediaPipe Hands (Computer Vision), Git/GitHub, Prompt Engineering, RAG Architecture Design, Structured Excel Literature Logging.</li>
            <li><strong>English Proficiency:</strong> IELTS 5.5 (Current Baseline) — Actively preparing toward IELTS 7.0+ for International Master's Scholarship admissions.</li>
            <li><strong>Public Speaking &amp; Event MC:</strong> Hosted 4–5 community and cultural events (Charity drives, Mid-Autumn Festival, Dong Ho Folk Art Exhibition, Mini Gameshows).</li>
          </ul>
        </div>
      </div>
    </div>
  `;

  function ensureModalExists() {
    let modal = document.getElementById('cv-modal');
    if (modal) return modal;

    modal = document.createElement('div');
    modal.id = 'cv-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'cv-modal-title');
    modal.setAttribute('aria-hidden', 'true');
    modal.className = 'hidden fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto';
    modal.innerHTML = CV_MODAL_TEMPLATE;
    document.body.appendChild(modal);

    // Sync active language for newly injected modal labels
    const setLangFn = globalThis['setLanguage'];
    const getLangFn = globalThis['getCurrentLang'];
    if (typeof setLangFn === 'function' && typeof getLangFn === 'function') {
      setLangFn(getLangFn());
    }

    return modal;
  }

  function openModal() {
    const modal = ensureModalExists();
    if (!modal) return;
    NavigationManager.toggle(false);
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    const lucideInstance = globalThis['lucide'];
    if (lucideInstance && typeof lucideInstance.createIcons === 'function') {
      lucideInstance.createIcons();
    }
  }

  function closeModal() {
    const modal = document.getElementById('cv-modal');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function init() {
    const modal = ensureModalExists();
    if (!modal) return;

    const openButtons = document.querySelectorAll('[data-open-cv-modal]');
    openButtons.forEach((btn) => {
      btn.addEventListener('click', (event) => {
        event.preventDefault();
        openModal();
      });
    });

    const closeButtons = modal.querySelectorAll('[data-close-cv-modal]');
    closeButtons.forEach((btn) => {
      btn.addEventListener('click', closeModal);
    });

    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
      }
    });

    const printBtn = document.getElementById('print-cv-btn');
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        window.print();
      });
    }

    if (window.location.hash === '#cv') {
      openModal();
    }
  }

  return { init, openModal, closeModal };
})();

/* ==========================================================================
   APPLICATION BOOTSTRAP
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
  NavigationManager.init();
  ScrollRevealManager.init();
  AccordionController.init();
  ClipboardService.init();
  ProjectFilterController.init();
  ContactFormController.init();
  AcademicCvModalController.init();

  const lucideInstance = globalThis['lucide'];
  if (lucideInstance && typeof lucideInstance.createIcons === 'function') {
    lucideInstance.createIcons();
  }
});
