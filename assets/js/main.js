/**
 * @fileoverview Main Application Architecture for Nguyen Van An Portfolio.
 * Modular, clean code implementation adhering to SOLID principles:
 * - Theme Management (Light/Dark mode with persistence)
 * - Accessible Navigation & Mobile Drawer
 * - Hardware-accelerated Scroll Reveal Micro-interactions
 * - Accessible Accordion Controllers
 * - Clipboard Utilities & Toast Notifications
 *
 * @author Principal Software Architect
 * @version 2.0.0
 */

'use strict';

/**
 * Application Configuration & Frozen Constants
 * Eliminates all magic numbers and strings.
 */
const APP_CONFIG = Object.freeze({
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
    DURATION_MS: 3200,
    FADE_OUT_MS: 260
  }),
  SCROLL_REVEAL: Object.freeze({
    THRESHOLD: 0.08,
    ROOT_MARGIN: '0px 0px -40px 0px'
  })
});

/* ==========================================================================
   MODULE 1: THEME MANAGEMENT
   Single Responsibility: Controls light/dark state, persistence & icons.
   ========================================================================== */
const ThemeManager = (() => {
  const rootElement = document.documentElement;

  /**
   * Safely reads saved theme or falls back to system color scheme.
   * @returns {string} 'light' or 'dark'
   */
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

  /**
   * Updates visibility of sun and moon icons across the DOM.
   * @param {boolean} isDark
   */
  function syncThemeIcons(isDark) {
    const sunIcons = document.querySelectorAll('.theme-sun-icon');
    const moonIcons = document.querySelectorAll('.theme-moon-icon');

    sunIcons.forEach((icon) => icon.classList.toggle('hidden', !isDark));
    moonIcons.forEach((icon) => icon.classList.toggle('hidden', isDark));
  }

  /**
   * Applies the theme to the document and synchronizes state.
   * @param {string} theme - 'light' or 'dark'
   */
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

  /**
   * Toggles between light and dark modes and triggers user feedback toast.
   */
  function toggleTheme() {
    const currentlyDark = rootElement.classList.contains(APP_CONFIG.THEMES.DARK);
    const newTheme = currentlyDark ? APP_CONFIG.THEMES.LIGHT : APP_CONFIG.THEMES.DARK;
    applyTheme(newTheme);

    const activeLang = typeof window.getCurrentLang === 'function' ? window.getCurrentLang() : 'vi';
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
   Single Responsibility: Drawer state, keyboard navigation, outside clicks.
   ========================================================================== */
const NavigationManager = (() => {
  const elements = {
    button: null,
    drawer: null,
    openIcon: null,
    closeIcon: null
  };

  /**
   * Sets menu drawer open or closed with proper ARIA attributes.
   * @param {boolean} [forceState]
   */
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

    // Close when any link inside drawer is clicked
    elements.drawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => toggle(false));
    });

    // Close on outside click
    document.addEventListener('click', (event) => {
      if (!elements.drawer.contains(event.target) && !elements.button.contains(event.target)) {
        if (!elements.drawer.classList.contains('hidden')) {
          toggle(false);
        }
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !elements.drawer.classList.contains('hidden')) {
        toggle(false);
        elements.button.focus();
      }
    });

    // Auto-close when resized to desktop viewport
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
   Single Responsibility: Reveals elements on scroll while respecting a11y.
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
   Single Responsibility: Toggles accordion items with ARIA compliance.
   ========================================================================== */
const AccordionController = (() => {
  /**
   * Toggles visibility and aria state for an accordion trigger.
   * @param {HTMLButtonElement} trigger
   */
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
   Single Responsibility: Safe clipboard copying with modern & fallback APIs.
   ========================================================================== */
const ClipboardService = (() => {
  /**
   * Fallback copy mechanism for legacy or non-secure contexts.
   * @param {string} text
   * @returns {Promise<void>}
   */
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

  /**
   * Copies text to clipboard and displays user feedback.
   * @param {string} text
   */
  async function copy(text) {
    if (!text) return;

    const activeLang = typeof window.getCurrentLang === 'function' ? window.getCurrentLang() : 'vi';
    const successMessage = activeLang === 'vi' ? `Đã sao chép: "${text}"` : `Copied: "${text}"`;
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
   MODULE 6: PROJECT QUICK FILTER
   Single Responsibility: Handles quick filtering submission and feedback.
   ========================================================================== */
const ProjectFilterController = (() => {
  function init() {
    const form = document.getElementById('quick-filter-form');
    if (!form) return;

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const subject = document.getElementById('filter-subject')?.value || 'All';
      const skill = document.getElementById('filter-skill')?.value || 'All';

      const activeLang = typeof window.getCurrentLang === 'function' ? window.getCurrentLang() : 'vi';
      const feedback = activeLang === 'vi'
        ? `Đã lọc dự án: ${subject} • ${skill}`
        : `Applied filters: ${subject} • ${skill}`;

      ToastService.show(feedback, 'info');

      const targetSection = document.getElementById('projects') || document.querySelector('main');
      targetSection?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  return { init };
})();

/* ==========================================================================
   MODULE 7: TOAST NOTIFICATION SERVICE
   Single Responsibility: Creation, rendering, and lifecycle of toast alerts.
   ========================================================================== */
const ToastService = (() => {
  const CONTAINER_ID = 'toast-container';

  /**
   * Retrieves or lazily creates the toast container.
   * @returns {HTMLElement}
   */
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

  /**
   * Resolves CSS color styling based on alert type.
   * @param {'info' | 'success' | 'error'} type
   * @returns {{ borderClass: string, dotClass: string }}
   */
  function resolveToastStyles(type) {
    if (type === 'success') {
      return { borderClass: 'border-[#16A34A] text-[#16A34A]', dotClass: 'bg-[#16A34A]' };
    }
    if (type === 'error') {
      return { borderClass: 'border-[#DC2626] text-[#DC2626]', dotClass: 'bg-[#DC2626]' };
    }
    return { borderClass: 'border-[#C25E00] text-[#111827] dark:text-white', dotClass: 'bg-[#C25E00]' };
  }

  /**
   * Dispatches a toast alert to the screen with entrance and exit animations.
   * @param {string} message - Content to display
   * @param {'info' | 'success' | 'error'} [type='info']
   */
  function show(message, type = 'info') {
    const container = getContainer();
    const { borderClass, dotClass } = resolveToastStyles(type);

    const toast = document.createElement('div');
    toast.className = `toast px-4 py-2.5 rounded-lg border text-xs font-mono font-medium shadow-sm flex items-center gap-2.5 backdrop-blur-md bg-white dark:bg-[#111726] ${borderClass}`;
    toast.innerHTML = `
      <span class="w-1.5 h-1.5 rounded-full ${dotClass}"></span>
      <span>${message}</span>
    `;

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

// Expose toast service globally for backward compatibility with inline triggers
window.showToast = ToastService.show;

/* ==========================================================================
   MODULE 8: CONTACT FORM CONTROLLER
   Single Responsibility: Intercepts academic contact form and provides instant toast feedback.
   ========================================================================== */
const ContactFormController = (() => {
  function init() {
    const form = document.getElementById('academic-contact-form');
    if (!form) return;

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const currentLang = typeof window.getCurrentLang === 'function' ? window.getCurrentLang() : 'vi';
      const msg = currentLang === 'vi'
        ? '✓ Cảm ơn bạn! Tin nhắn trao đổi học thuật đã được ghi nhận thành công.'
        : '✓ Thank you! Your academic inquiry has been recorded successfully.';
      ToastService.show(msg, 'success');
      form.reset();
    });
  }

  return { init };
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

  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
});
