/**
 * @fileoverview Internationalization (i18n) Engine for Nguyen Van An Portfolio & Academic Hub.
 * Manages dual-language state (EN/VI) with persistence, DOM attribute synchronization,
 * document title localization, and safe markup rendering.
 */

'use strict';

/**
 * Storage configuration constants
 */
const I18N_CONFIG = Object.freeze({
  STORAGE_KEY: 'adley_lang',
  DEFAULT_LANG: 'en',
  SUPPORTED_LANGUAGES: Object.freeze(['vi', 'en'])
});

/**
 * Keys that intentionally contain safe inline HTML formatting (<strong>, <em>, <span>)
 */
const HTML_ALLOWLIST_KEYS = new Set([
  'hero_desc',
  'about_story_p1',
  'about_story_p2',
  'about_story_p3',
  'res_topic1_method_1',
  'res_topic1_method_2',
  'res_topic1_method_3',
  'res_pivot_note'
]);

/**
 * Resolves current translation dictionary.
 * Priority:
 * 1. LocalStorage preview override ('portfolio_override_data') for instant Admin testing.
 * 2. Pre-loaded window.PORTFOLIO_DATA (from data/content.js).
 * 3. Empty dictionary fallback.
 * @returns {Record<string, Record<string, string>>}
 */
function getDictionary() {
  try {
    const override = localStorage.getItem('portfolio_override_data');
    if (override) {
      const parsed = JSON.parse(override);
      if (parsed && parsed.vi && parsed.en) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('[i18n] Error reading local override:', e);
  }

  const globalScope = /** @type {any} */ (window);
  if (globalScope.PORTFOLIO_DATA && globalScope.PORTFOLIO_DATA.vi && globalScope.PORTFOLIO_DATA.en) {
    return globalScope.PORTFOLIO_DATA;
  }

  return { vi: {}, en: {} };
}

const i18nTranslations = getDictionary();

/**
 * Safely retrieves stored language preference with fallback.
 * @returns {string} The active language code ('vi' | 'en')
 */
function getStoredLanguage() {
  try {
    const saved = localStorage.getItem(I18N_CONFIG.STORAGE_KEY);
    return I18N_CONFIG.SUPPORTED_LANGUAGES.includes(saved) ? saved : I18N_CONFIG.DEFAULT_LANG;
  } catch (error) {
    console.warn('[i18n] LocalStorage inaccessible, falling back to default:', error);
    return I18N_CONFIG.DEFAULT_LANG;
  }
}

/**
 * Safely persists language preference.
 * @param {string} lang - Language code to persist
 */
function persistLanguage(lang) {
  try {
    localStorage.setItem(I18N_CONFIG.STORAGE_KEY, lang);
  } catch (error) {
    console.warn('[i18n] Could not persist language selection:', error);
  }
}

let activeLanguage = getStoredLanguage();

/**
 * Updates DOM text content, document title, and input placeholders to match requested language.
 * @param {string} lang - Language code ('vi' | 'en')
 */
function setLanguage(lang) {
  const currentTranslations = getDictionary();
  if (!currentTranslations[lang]) return;

  activeLanguage = lang;
  persistLanguage(lang);

  // Synchronize HTML document language attribute for A11y & SEO
  if (document.documentElement) {
    document.documentElement.setAttribute('lang', lang);
    const titleKey = document.documentElement.getAttribute('data-i18n-title');
    if (titleKey && currentTranslations[lang][titleKey]) {
      document.title = currentTranslations[lang][titleKey];
    }
  }

  const dictionary = currentTranslations[lang];

  // Update text nodes (using textContent by default for safety/speed, innerHTML only for allowlisted rich text keys)
  const textElements = document.querySelectorAll('[data-i18n]');
  textElements.forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (key && dictionary[key]) {
      if (HTML_ALLOWLIST_KEYS.has(key)) {
        el.innerHTML = dictionary[key];
      } else {
        el.textContent = dictionary[key];
      }
    }
  });

  // Update input placeholder attributes
  const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
  placeholderElements.forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (key && dictionary[key]) {
      el.setAttribute('placeholder', dictionary[key]);
    }
  });

  // Update language switcher UI indicator
  updateLanguageSwitcherUI(lang);
}

/**
 * Updates visual indicator on language toggle button.
 * @param {string} lang - Current active language
 */
function updateLanguageSwitcherUI(lang) {
  const viIndicator = document.getElementById('lang-indicator-vi');
  const enIndicator = document.getElementById('lang-indicator-en');

  if (!viIndicator || !enIndicator) return;

  const isVi = lang === 'vi';
  viIndicator.className = isVi ? 'text-[#C25E00] dark:text-[#D95D1E] font-bold' : 'text-[#9CA3AF] font-normal';
  enIndicator.className = isVi ? 'text-[#9CA3AF] font-normal' : 'text-[#C25E00] dark:text-[#D95D1E] font-bold';
}

/**
 * Toggles active language between Vietnamese and English.
 */
function toggleLanguage() {
  const nextLang = activeLanguage === 'en' ? 'vi' : 'en';
  setLanguage(nextLang);

  const globalScope = /** @type {any} */ (window);
  if (typeof globalScope.showToast === 'function') {
    const feedback = nextLang === 'vi' ? '🇻🇳 Đã chuyển sang Tiếng Việt' : '🇬🇧 Switched to English';
    globalScope.showToast(feedback, 'info');
  }
}

// Global interface exposure
Object.assign(window, {
  i18nTranslations: getDictionary(),
  getDictionary,
  setLanguage,
  toggleLanguage,
  getCurrentLang: () => activeLanguage
});

// Self-initialization upon DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  setLanguage(activeLanguage);

  const langButton = document.getElementById('lang-toggle-btn');
  if (langButton) {
    langButton.addEventListener('click', toggleLanguage);
  }
});
