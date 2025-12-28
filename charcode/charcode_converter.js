/**
 * CharCode ↔ Text Converter
 * --------------------------------------------------
 * Fitur:
 * - Bi-directional conversion (Text ↔ CharCodes)
 * - Multiple output formats (comma, space, array, JS code)
 * - Real-time conversion mode
 * - Dark/Light theme toggle
 * - Multi-language (ID/EN)
 * - Download results
 * - Sample data
 * - Keyboard shortcuts
 * --------------------------------------------------
 * Keamanan:
 * - Input validation & sanitization
 * - Character range validation (0-0x10FFFF)
 * - Rate limiting
 * - Anti-XSS (textContent only)
 * - CSP headers
 * --------------------------------------------------
 */

(function () {
  'use strict';

  /* ════════════════════════════════════════════════════════════
     LANGUAGE SYSTEM
     ════════════════════════════════════════════════════════════ */
  const i18n = {
    id: {
      subtitle: 'Konversi teks ke ASCII char codes dan sebaliknya',
      convertSuccess: 'Konversi berhasil!',
      copySuccess: 'Berhasil disalin!',
      copyFail: 'Gagal menyalin',
      copyEmpty: 'Tidak ada teks untuk disalin',
      clearSuccess: 'Input dihapus',
      clearEmpty: 'Mau ngapus apa? 🤔',
      convertEmpty: 'Harus diisi data dulu! ✍️',
      downloadSuccess: 'File berhasil diunduh!',
      downloadEmpty: 'Tidak ada data untuk diunduh',
      sampleLoaded: 'Contoh data dimuat!',
      inputTruncated: (max) => `Input dipotong ke ${max} karakter`,
      format: 'Format:',
      realtime: 'Real-time',
      chars: 'karakter',
      codes: 'kode',
      shortcutsTitle: '⌨️ Keyboard Shortcuts',
      sc1: 'Convert panel aktif',
      sc2: 'Copy hasil',
      sc3: 'Clear panel',
      sc4: 'Download hasil',
      sc5: 'Tutup modal',
      placeholder: {
        textInput: 'Masukkan teks di sini...',
        codesOutput: 'Hasil char codes akan muncul di sini...',
        codesInput: 'Masukkan char codes (65,66,67 atau 0x41 0x42)',
        textOutput: 'Hasil teks akan muncul di sini...'
      }
    },
    en: {
      subtitle: 'Convert text to ASCII char codes and vice versa',
      convertSuccess: 'Conversion successful!',
      copySuccess: 'Copied successfully!',
      copyFail: 'Failed to copy',
      copyEmpty: 'No text to copy',
      clearSuccess: 'Input cleared',
      clearEmpty: 'Nothing to clear! 🤔',
      convertEmpty: 'Please fill in the data first! ✍️',
      downloadSuccess: 'File downloaded!',
      downloadEmpty: 'No data to download',
      sampleLoaded: 'Sample data loaded!',
      inputTruncated: (max) => `Input truncated to ${max} characters`,
      format: 'Format:',
      realtime: 'Real-time',
      chars: 'chars',
      codes: 'codes',
      shortcutsTitle: '⌨️ Keyboard Shortcuts',
      sc1: 'Convert active panel',
      sc2: 'Copy result',
      sc3: 'Clear panel',
      sc4: 'Download result',
      sc5: 'Close modal',
      placeholder: {
        textInput: 'Enter text here...',
        codesOutput: 'Char codes result will appear here...',
        codesInput: 'Enter char codes (65,66,67 or 0x41 0x42)',
        textOutput: 'Text result will appear here...'
      }
    }
  };

  let currentLang = 'id';

  function t(key) {
    return i18n[currentLang][key] || key;
  }

  /* ════════════════════════════════════════════════════════════
     SAMPLE DATA
     ════════════════════════════════════════════════════════════ */
  const sampleTexts = [
    'Hello, World! 👋',
    'CharCode Converter 🔥',
    'console.log("Hello!");',
    'The quick brown fox jumps over the lazy dog.',
    '你好世界 🌍',
    '<script>alert("XSS")</script>',
  ];

  const sampleCodes = [
    '72,101,108,108,111,44,32,87,111,114,108,100,33',
    '65 66 67 68 69',
    '[97,108,101,114,116,40,34,72,105,34,41]',
    '0x48 0x65 0x6C 0x6C 0x6F',
    '72;101;108;108;111',
  ];

  /* ════════════════════════════════════════════════════════════
     SECURITY: Rate Limiter
     ════════════════════════════════════════════════════════════ */
  const rateLimiter = (() => {
    const cooldowns = new Map();
    const COOLDOWN_MS = 150; // min ms antar klik

    return {
      allow(key) {
        const now = Date.now();
        if (cooldowns.has(key) && now - cooldowns.get(key) < COOLDOWN_MS) {
          return false;
        }
        cooldowns.set(key, now);
        return true;
      }
    };
  })();

  /* ════════════════════════════════════════════════════════════
     SECURITY: Input Validators & Sanitization
     ════════════════════════════════════════════════════════════ */
  const MAX_INPUT_LENGTH = 100000;
  const MAX_SINGLE_CODE = 0x10FFFF; // Max Unicode code point

  // Dangerous patterns to detect (for logging only, not blocking)
  const SUSPICIOUS_PATTERNS = [
    /<script[^>]*>/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /eval\s*\(/i,
    /Function\s*\(/i,
  ];

  function sanitizeText(input) {
    if (typeof input !== 'string') return '';
    
    // Limit length
    let sanitized = input.slice(0, MAX_INPUT_LENGTH);
    
    // Log suspicious patterns (for monitoring)
    for (const pattern of SUSPICIOUS_PATTERNS) {
      if (pattern.test(sanitized)) {
        console.warn('⚠️ Suspicious pattern detected in input');
        break;
      }
    }
    
    return sanitized;
  }

  function sanitizeNumericInput(input) {
    if (typeof input !== 'string') return '';
    // Only allow numbers, hex notation, and delimiters
    return input.replace(/[^0-9a-fA-FxX\s,;\[\]\-]/g, '').slice(0, MAX_INPUT_LENGTH);
  }

  function isValidCharCode(num) {
    return Number.isInteger(num) && num >= 0 && num <= MAX_SINGLE_CODE;
  }

  // Escape HTML entities for safe display
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Validate that output doesn't contain executable code
  function isSafeOutput(text) {
    for (const pattern of SUSPICIOUS_PATTERNS) {
      if (pattern.test(text)) {
        return false;
      }
    }
    return true;
  }

  /* ════════════════════════════════════════════════════════════
     CONVERTER FUNCTIONS
     ════════════════════════════════════════════════════════════ */

  /**
   * Konversi teks → char codes dengan format tertentu
   */
  function textToCharCodes(text, format = 'comma') {
    const sanitized = sanitizeText(text);
    if (!sanitized) return '';

    const codes = [];
    for (const char of sanitized) {
      codes.push(char.codePointAt(0));
    }

    switch (format) {
      case 'space':
        return codes.join(' ');
      case 'array':
        return '[' + codes.join(',') + ']';
      case 'jscode':
        return `String.fromCharCode(${codes.join(',')})`;
      case 'comma':
      default:
        return codes.join(',');
    }
  }

  /**
   * Konversi char codes → teks
   * Mendukung: desimal, hex (0x...), pemisah koma/spasi/titik koma
   */
  function charCodesToText(input) {
    if (typeof input !== 'string' || !input.trim()) return '';

    // Hapus kurung siku jika ada
    let cleaned = input.replace(/[\[\]]/g, '').trim();
    if (!cleaned) return '';

    // Limit panjang input
    cleaned = cleaned.slice(0, MAX_INPUT_LENGTH);

    // Split berdasarkan berbagai delimiter
    const tokens = cleaned.split(/[\s,;]+/).filter(Boolean);
    const chars = [];
    let invalidCount = 0;

    for (const tok of tokens) {
      const trimmed = tok.trim();
      if (!trimmed) continue;

      let value;

      // Deteksi hex (0x...)
      if (/^0x[0-9a-f]+$/i.test(trimmed)) {
        value = parseInt(trimmed, 16);
      } else {
        // Ambil hanya digit dan tanda minus
        const numStr = trimmed.replace(/[^0-9\-]/g, '');
        value = parseInt(numStr, 10);
      }

      if (isValidCharCode(value)) {
        try {
          chars.push(String.fromCodePoint(value));
        } catch {
          invalidCount++;
        }
      } else if (!isNaN(value)) {
        invalidCount++;
      }
    }

    if (invalidCount > 0) {
      console.warn(`CharCode Converter: ${invalidCount} karakter tidak valid diabaikan.`);
    }

    const result = chars.join('');
    
    // Security check on output
    if (!isSafeOutput(result)) {
      console.warn('⚠️ Output contains potentially dangerous patterns');
    }
    
    return result;
  }

  /**
   * Count codes in input string
   */
  function countCodes(input) {
    if (!input || !input.trim()) return 0;
    const cleaned = input.replace(/[\[\]]/g, '').trim();
    if (!cleaned) return 0;
    return cleaned.split(/[\s,;]+/).filter(Boolean).length;
  }

  /**
   * Download text as file
   */
  function downloadFile(content, filename) {
    if (!content) {
      showToast(t('downloadEmpty'), 'error');
      return;
    }
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(t('downloadSuccess'), 'success');
  }

  /* ════════════════════════════════════════════════════════════
     TOAST NOTIFICATION
     ════════════════════════════════════════════════════════════ */
  function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message; // anti-XSS: pakai textContent
    toast.className = 'toast show ' + type;

    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2200);
  }

  /* ════════════════════════════════════════════════════════════
     CLIPBOARD COPY (with fallback)
     ════════════════════════════════════════════════════════════ */
  async function copyToClipboard(text) {
    if (!text) {
      showToast(t('copyEmpty'), 'error');
      return;
    }

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback untuk browser lama
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.cssText = 'position:fixed;left:-9999px;top:-9999px';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        document.execCommand('copy');
        ta.remove();
      }
      showToast(t('copySuccess'), 'success');
    } catch (err) {
      console.error('Copy failed:', err);
      showToast(t('copyFail'), 'error');
    }
  }

  /* ════════════════════════════════════════════════════════════
     MAIN INITIALIZATION
     ════════════════════════════════════════════════════════════ */
  document.addEventListener('DOMContentLoaded', () => {
    // Element references
    const textInput = document.getElementById('textInput');
    const codesOutput = document.getElementById('codesOutput');
    const codesInput = document.getElementById('codesInput');
    const textOutput = document.getElementById('textOutput');

    const btnTextToCodes = document.getElementById('textToCodes');
    const btnCodesToText = document.getElementById('codesToText');
    const btnCopyCodes = document.getElementById('copyCodes');
    const btnCopyText = document.getElementById('copyText');
    const btnClearText = document.getElementById('clearText');
    const btnClearCodes = document.getElementById('clearCodes');
    const btnDownloadCodes = document.getElementById('downloadCodes');
    const btnDownloadText = document.getElementById('downloadText');
    const btnSampleText = document.getElementById('sampleText');
    const btnSampleCodes = document.getElementById('sampleCodes');

    const outputFormat = document.getElementById('outputFormat');
    const realtimeT2C = document.getElementById('realtimeT2C');
    const realtimeC2T = document.getElementById('realtimeC2T');

    const textCounter = document.getElementById('textCounter');
    const codesCounter = document.getElementById('codesCounter');
    const codesInputCounter = document.getElementById('codesInputCounter');
    const textOutputCounter = document.getElementById('textOutputCounter');

    // Guard: pastikan semua elemen ada
    if (!textInput || !codesOutput || !codesInput || !textOutput) {
      console.error('CharCode Converter: Elemen DOM tidak ditemukan.');
      return;
    }

    /* ─────────────────────────────────────────────────────────
       Event Handlers dengan Rate Limiting
       ───────────────────────────────────────────────────────── */

    btnTextToCodes?.addEventListener('click', () => {
      if (!rateLimiter.allow('t2c')) return;
      if (!textInput.value.trim()) {
        showToast(t('convertEmpty'), 'error');
        return;
      }
      const format = outputFormat?.value || 'comma';
      codesOutput.value = textToCharCodes(textInput.value, format);
      updateCounters();
      if (codesOutput.value) {
        showToast(t('convertSuccess'), 'success');
      }
    });

    btnCodesToText?.addEventListener('click', () => {
      if (!rateLimiter.allow('c2t')) return;
      if (!codesInput.value.trim()) {
        showToast(t('convertEmpty'), 'error');
        return;
      }
      textOutput.value = charCodesToText(codesInput.value);
      updateCounters();
      if (textOutput.value) {
        showToast(t('convertSuccess'), 'success');
      }
    });

    /* ─────────────────────────────────────────────────────────
       Counter Updates
       ───────────────────────────────────────────────────────── */
    function updateCounters() {
      const charWord = t('chars');
      const codeWord = t('codes');
      if (textCounter) textCounter.textContent = `${textInput.value.length} ${charWord}`;
      if (codesCounter) codesCounter.textContent = `${countCodes(codesOutput.value)} ${codeWord}`;
      if (codesInputCounter) codesInputCounter.textContent = `${countCodes(codesInput.value)} ${codeWord}`;
      if (textOutputCounter) textOutputCounter.textContent = `${textOutput.value.length} ${charWord}`;
    }

    // Update counters on input
    textInput.addEventListener('input', updateCounters);
    codesInput.addEventListener('input', updateCounters);

    /* ─────────────────────────────────────────────────────────
       Real-time Conversion
       ───────────────────────────────────────────────────────── */
    textInput.addEventListener('input', () => {
      if (realtimeT2C?.checked && textInput.value) {
        const format = outputFormat?.value || 'comma';
        codesOutput.value = textToCharCodes(textInput.value, format);
        updateCounters();
      }
    });

    codesInput.addEventListener('input', () => {
      if (realtimeC2T?.checked && codesInput.value) {
        textOutput.value = charCodesToText(codesInput.value);
        updateCounters();
      }
    });

    // Re-convert when format changes
    outputFormat?.addEventListener('change', () => {
      if (textInput.value) {
        codesOutput.value = textToCharCodes(textInput.value, outputFormat.value);
        updateCounters();
      }
    });

    btnCopyCodes?.addEventListener('click', () => {
      if (!rateLimiter.allow('copyCodes')) return;
      copyToClipboard(codesOutput.value);
    });

    btnCopyText?.addEventListener('click', () => {
      if (!rateLimiter.allow('copyText')) return;
      copyToClipboard(textOutput.value);
    });

    btnClearText?.addEventListener('click', () => {
      if (!rateLimiter.allow('clearText')) return;
      if (!textInput.value && !codesOutput.value) {
        showToast(t('clearEmpty'), 'error');
        return;
      }
      textInput.value = '';
      codesOutput.value = '';
      updateCounters();
      showToast(t('clearSuccess'), 'success');
    });

    btnClearCodes?.addEventListener('click', () => {
      if (!rateLimiter.allow('clearCodes')) return;
      if (!codesInput.value && !textOutput.value) {
        showToast(t('clearEmpty'), 'error');
        return;
      }
      codesInput.value = '';
      textOutput.value = '';
      updateCounters();
      showToast(t('clearSuccess'), 'success');
    });

    /* ─────────────────────────────────────────────────────────
       Download Buttons
       ───────────────────────────────────────────────────────── */
    btnDownloadCodes?.addEventListener('click', () => {
      downloadFile(codesOutput.value, 'charcodes.txt');
    });

    btnDownloadText?.addEventListener('click', () => {
      downloadFile(textOutput.value, 'decoded_text.txt');
    });

    /* ─────────────────────────────────────────────────────────
       Sample Data Buttons
       ───────────────────────────────────────────────────────── */
    btnSampleText?.addEventListener('click', () => {
      const sample = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
      textInput.value = sample;
      updateCounters();
      showToast(t('sampleLoaded'), 'success');
    });

    btnSampleCodes?.addEventListener('click', () => {
      const sample = sampleCodes[Math.floor(Math.random() * sampleCodes.length)];
      codesInput.value = sample;
      updateCounters();
      showToast(t('sampleLoaded'), 'success');
    });

    /* ─────────────────────────────────────────────────────────
       Keyboard Shortcuts: Ctrl+Enter untuk konversi cepat
       ───────────────────────────────────────────────────────── */
    function handleKeyboard(e) {
      if (e.ctrlKey && e.key === 'Enter') {
        e.preventDefault();
        if (e.target === textInput) {
          btnTextToCodes?.click();
        } else if (e.target === codesInput) {
          btnCodesToText?.click();
        }
      }
    }

    textInput.addEventListener('keydown', handleKeyboard);
    codesInput.addEventListener('keydown', handleKeyboard);

    /* ─────────────────────────────────────────────────────────
       SECURITY: Prevent paste of extremely large content
       ───────────────────────────────────────────────────────── */
    function handlePaste(e) {
      const pasted = (e.clipboardData || window.clipboardData)?.getData('text') || '';
      if (pasted.length > MAX_INPUT_LENGTH) {
        e.preventDefault();
        const truncated = pasted.slice(0, MAX_INPUT_LENGTH);
        e.target.value = truncated;
        showToast(`Input dipotong ke ${MAX_INPUT_LENGTH} karakter`, 'error');
      }
    }

    textInput.addEventListener('paste', handlePaste);
    codesInput.addEventListener('paste', handlePaste);

    /* ─────────────────────────────────────────────────────────
       Language Toggle
       ───────────────────────────────────────────────────────── */
    const btnLangID = document.getElementById('langID');
    const btnLangEN = document.getElementById('langEN');
    const subtitle = document.getElementById('subtitle');

    function updatePlaceholders() {
      const ph = i18n[currentLang].placeholder;
      textInput.placeholder = ph.textInput;
      codesOutput.placeholder = ph.codesOutput;
      codesInput.placeholder = ph.codesInput;
      textOutput.placeholder = ph.textOutput;
      if (subtitle) subtitle.textContent = t('subtitle');
      
      // Update other labels
      const formatLabel = document.getElementById('formatLabel');
      if (formatLabel) formatLabel.textContent = t('format');
      
      const realtimeT2CLabel = document.getElementById('realtimeT2CLabel');
      const realtimeC2TLabel = document.getElementById('realtimeC2TLabel');
      if (realtimeT2CLabel) realtimeT2CLabel.textContent = t('realtime');
      if (realtimeC2TLabel) realtimeC2TLabel.textContent = t('realtime');
      
      updateCounters();
    }

    function setLang(lang) {
      currentLang = lang;
      btnLangID?.classList.toggle('active', lang === 'id');
      btnLangEN?.classList.toggle('active', lang === 'en');
      updatePlaceholders();
      localStorage.setItem('charcode_lang', lang);
    }

    btnLangID?.addEventListener('click', () => setLang('id'));
    btnLangEN?.addEventListener('click', () => setLang('en'));

    // Load saved language preference
    const savedLang = localStorage.getItem('charcode_lang');
    if (savedLang && (savedLang === 'id' || savedLang === 'en')) {
      setLang(savedLang);
    }

    /* ─────────────────────────────────────────────────────────
       Theme Toggle (Dark/Light)
       ───────────────────────────────────────────────────────── */
    const themeToggle = document.getElementById('themeToggle');
    const iconMoon = document.getElementById('iconMoon');
    const iconSun = document.getElementById('iconSun');

    function setTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      if (iconMoon && iconSun) {
        iconMoon.classList.toggle('hidden', theme === 'light');
        iconSun.classList.toggle('hidden', theme === 'dark');
      }
      localStorage.setItem('charcode_theme', theme);
    }

    themeToggle?.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      setTheme(current === 'dark' ? 'light' : 'dark');
    });

    // Load saved theme
    const savedTheme = localStorage.getItem('charcode_theme') || 'dark';
    setTheme(savedTheme);

    /* ─────────────────────────────────────────────────────────
       Keyboard Shortcuts Modal
       ───────────────────────────────────────────────────────── */
    const shortcutsBtn = document.getElementById('shortcutsBtn');
    const shortcutsModal = document.getElementById('shortcutsModal');
    const closeModal = document.getElementById('closeModal');
    const modalBackdrop = shortcutsModal?.querySelector('.modal-backdrop');

    function openModal() {
      shortcutsModal?.classList.remove('hidden');
    }
    function closeModalFn() {
      shortcutsModal?.classList.add('hidden');
    }

    shortcutsBtn?.addEventListener('click', openModal);
    closeModal?.addEventListener('click', closeModalFn);
    modalBackdrop?.addEventListener('click', closeModalFn);

    // Update modal text based on language
    function updateModalText() {
      const title = document.getElementById('shortcutsTitle');
      if (title) title.textContent = t('shortcutsTitle');
      document.getElementById('sc1')?.replaceWith(Object.assign(document.createElement('span'), { id: 'sc1', textContent: t('sc1') }));
      document.getElementById('sc2')?.replaceWith(Object.assign(document.createElement('span'), { id: 'sc2', textContent: t('sc2') }));
      document.getElementById('sc3')?.replaceWith(Object.assign(document.createElement('span'), { id: 'sc3', textContent: t('sc3') }));
      document.getElementById('sc4')?.replaceWith(Object.assign(document.createElement('span'), { id: 'sc4', textContent: t('sc4') }));
      document.getElementById('sc5')?.replaceWith(Object.assign(document.createElement('span'), { id: 'sc5', textContent: t('sc5') }));
    }

    /* ─────────────────────────────────────────────────────────
       Global Keyboard Shortcuts
       ───────────────────────────────────────────────────────── */
    document.addEventListener('keydown', (e) => {
      // Escape to close modal
      if (e.key === 'Escape') {
        closeModalFn();
        return;
      }

      // Ctrl+Shift combinations
      if (e.ctrlKey && e.shiftKey) {
        const activeEl = document.activeElement;
        const isTextPanel = activeEl === textInput || activeEl === codesOutput;
        
        if (e.key === 'C' || e.key === 'c') {
          e.preventDefault();
          if (isTextPanel) {
            copyToClipboard(codesOutput.value);
          } else {
            copyToClipboard(textOutput.value);
          }
        } else if (e.key === 'X' || e.key === 'x') {
          e.preventDefault();
          if (isTextPanel) {
            btnClearText?.click();
          } else {
            btnClearCodes?.click();
          }
        } else if (e.key === 'S' || e.key === 's') {
          e.preventDefault();
          if (isTextPanel) {
            btnDownloadCodes?.click();
          } else {
            btnDownloadText?.click();
          }
        }
      }
    });

    // Initial counter update
    updateCounters();
    updateModalText();

    // Log security status
    console.log('%c🛡️ CharCode Converter loaded with security features enabled.', 'color: #3dd68c; font-weight: bold;');
    console.log('%c📱 Mobile responsive design active.', 'color: #5b8def; font-weight: bold;');

    // Freeze object to prevent prototype pollution
    Object.freeze(i18n);
    Object.freeze(sampleTexts);
    Object.freeze(sampleCodes);
  });

})();
