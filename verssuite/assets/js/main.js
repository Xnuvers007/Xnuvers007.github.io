(function () {
  const i18n = {
    id: {
      skip_to_content: 'Lewati ke konten utama',
      nav_features: 'Features',
      nav_stack: 'Core Stack',
      nav_install: 'Instalasi',
      nav_quickstart: 'Quick Start',
      nav_ssl: 'SSL Guide',
      nav_modules: 'Modules',
      nav_gallery: 'Gallery',
      nav_accessibility: 'Accessibility',
      nav_changelogs: 'Changelogs',
      changelogs_title: 'Changelogs (v1.1.0)',
      reduce_motion: 'Reduce Motion',
      large_text: 'Large Text',
      translate_note: 'Terjemahan otomatis tambahan (opsional, banyak bahasa tersedia):',
      hero_eyebrow: 'Professional Security Toolkit',
      hero_title: 'Vers Suite: Burp Suite Alternative yang Modern, Cepat, dan Kuat',
      hero_desc: 'Platform desktop untuk authorized web security testing dengan Intercept Proxy, HTTP History, Repeater, Intruder, SSL cert setup, serta analisis metadata keamanan dalam satu antarmuka profesional.',
      cta_features: 'Jelajahi Fitur',
      cta_screenshots: 'Lihat Screenshot',
      cta_repo: 'Repo GitHub',
      hero_note: '<i class="fa-solid fa-circle-check"></i> Ramah aksesibilitas: keyboard friendly, kontras tinggi, dukungan reduce motion, dan struktur konten yang jelas.',
      stat_modules: 'Main Modules',
      stat_ssl_browsers: 'Browsers for SSL Guide',
      features_title: 'Core Features',
      features_lead: 'Fitur utama Vers Suite untuk workflow pengujian keamanan web yang cepat dan terstruktur.',
      feature_intercept_title: 'Intercept Proxy',
      feature_intercept_desc: 'Tahan, edit, forward, drop, forward all, dan drop all request HTTP/HTTPS secara realtime.',
      feature_history_title: 'HTTP History',
      feature_history_desc: 'List traffic lengkap dengan filter cepat, context menu, dan integrasi kirim ke Repeater/Intruder.',
      feature_repeater_title: 'Repeater',
      feature_repeater_desc: 'Replay request manual dengan grouping/ungrouping dan manajemen sesi yang efisien.',
      feature_intruder_title: 'Intruder',
      feature_intruder_desc: 'Payload fuzzing multithread untuk pengujian endpoint, parameter, dan response behavior.',
      feature_meta_title: 'Metadata Insight',
      feature_meta_desc: 'Deteksi WAF, indikasi Cloudflare, server headers, IP target, dan security headers.',
      feature_ssl_title: 'SSL Certificate Setup',
      feature_ssl_desc: 'Panduan instalasi sertifikat untuk Chrome, Edge, Brave, Opera, Firefox, dan Safari.',
      stack_title: 'Core Stack & Use Case',
      stack_lead: 'Sesuai arsitektur proyek Vers Suite saat ini.',
      usecase_title: 'Use Case',
      install_title: 'Instalasi',
      install_note: 'Pilih script sesuai terminal Anda, lalu klik tombol <strong>Copy Script</strong>.',
      copy_script: 'Copy Script',
      copied_script: 'Copied!',
      install_steps: '<li>Clone repository Vers Suite.</li><li>Buat virtual environment.</li><li>Install dependency dari <code>requirements.txt</code>.</li><li>Jalankan aplikasi dengan <code>python main.py</code>.</li>',
      quickstart_title: 'Panduan Cepat',
      quickstart_steps: '<li>Set browser proxy ke <strong>127.0.0.1:PORT</strong> (PORT harus sama dengan yang Anda pilih di Vers Suite).</li><li>Start proxy dari header bar.</li><li>Aktifkan Intercept jika ingin hold request.</li><li>Kirim request dari History ke Repeater/Intruder sesuai kebutuhan testing.</li><li>Buka tombol <strong>SSL Cert</strong> untuk setup sertifikat HTTPS.</li>',
      cert_title: 'Panduan Sertifikat (Step by Step)',
      cert_lead: 'Pertama, di aplikasi Vers Suite tekan tombol <strong>SSL Cert</strong> untuk membuka tutorial detail yang selalu sesuai host/port aktif Anda.',
      cert_chrome_title: 'Google Chrome (Windows/macOS)',
      cert_chrome_steps: '<li>Tekan <strong>SSL Cert</strong> di Vers Suite.</li><li>Ikuti instruksi import sertifikat CA mitmproxy.</li><li>Buka Chrome Settings → cari <em>proxy</em>.</li><li>Pilih <em>Open your computer\'s proxy settings</em>.</li><li>Set Address: <code>127.0.0.1</code>, Port: sesuai konfigurasi Vers Suite.</li>',
      cert_edge_title: 'Microsoft Edge',
      cert_edge_steps: '<li>Tekan <strong>SSL Cert</strong> di aplikasi.</li><li>Pastikan CA cert sudah trusted di sistem.</li><li>Edge Settings → cari <em>proxy</em>.</li><li>Buka proxy settings sistem.</li><li>Gunakan proxy <code>127.0.0.1:PORT</code> (PORT dari Vers Suite).</li>',
      cert_opera_title: 'Opera',
      cert_opera_steps: '<li>Klik <strong>SSL Cert</strong> pada Vers Suite.</li><li>Import sertifikat CA ke trusted store OS.</li><li>Opera Settings → cari <em>proxy</em>.</li><li>Masuk ke proxy settings sistem.</li><li>Set ke <code>127.0.0.1:PORT</code> sesuai aplikasi.</li>',
      cert_firefox_title: 'Firefox',
      cert_firefox_steps: '<li>Tekan <strong>SSL Cert</strong> di Vers Suite untuk lihat path sertifikat.</li><li>Firefox → Settings → Privacy & Security → Certificates.</li><li>View Certificates → Authorities → Import file sertifikat.</li><li>General → Network Settings → Manual proxy configuration.</li><li>Set HTTP Proxy <code>127.0.0.1</code> dan Port sesuai Vers Suite.</li>',
      cert_safari_title: 'Safari (macOS)',
      cert_safari_steps: '<li>Tekan <strong>SSL Cert</strong> di aplikasi untuk path cert.</li><li>Import CA cert ke Keychain dan set menjadi trusted.</li><li>Safari menggunakan system proxy macOS.</li><li>System Settings → Network → Proxies.</li><li>Set Web Proxy/HTTPS Proxy ke <code>127.0.0.1:PORT</code>.</li>',
      cert_trouble_title: 'Checklist Troubleshooting',
      cert_trouble_steps: '<li>Pastikan status proxy di Vers Suite adalah running.</li><li>Port browser harus sama persis dengan port aplikasi.</li><li>Restart browser setelah import sertifikat.</li><li>Cek firewall/antivirus bila request tidak lewat proxy.</li>',
      modules_title: 'Interactive Modules (Expand / Collapse)',
      expand_all: 'Expand All',
      collapse_all: 'Collapse All',
      gallery_title: 'Visual Documentation Gallery',
      gallery_lead: 'Klik screenshot untuk tampilan full screen. Gunakan panah kiri/kanan atau keyboard.',
      a11y_title: 'Accessibility & Inclusive Design',
      a11y_deaf_title: 'Ramah untuk pengguna tuli',
      a11y_deaf_desc: 'Informasi penting tidak bergantung pada audio. Semua interaksi utama berbasis teks, ikon, dan struktur visual jelas.',
      a11y_mute_title: 'Ramah untuk pengguna bisu',
      a11y_mute_desc: 'Tidak ada fitur yang mewajibkan input suara. Navigasi dan aksi lengkap bisa dilakukan lewat mouse, keyboard, atau touch.',
      a11y_universal_title: 'Universal usability',
      a11y_universal_desc: 'Support keyboard navigation, focus state jelas, tombol aksesibilitas, serta mode reduce motion untuk kenyamanan visual.',
      expand_faq: 'Expand FAQ',
      collapse_faq: 'Collapse FAQ',
      footer_text: 'Vers Suite — Built by Xnuvers007 (Indra Dwi Aryadi) and Built for authorized security testing and learning',
      back_to_top: 'Kembali ke atas'
    },
    en: {
      skip_to_content: 'Skip to main content',
      nav_features: 'Features',
      nav_stack: 'Core Stack',
      nav_install: 'Installation',
      nav_quickstart: 'Quick Start',
      nav_ssl: 'SSL Guide',
      nav_modules: 'Modules',
      nav_gallery: 'Gallery',
      nav_accessibility: 'Accessibility',
      nav_changelogs: 'Changelogs',
      changelogs_title: 'Changelogs (v1.1.0)',
      reduce_motion: 'Reduce Motion',
      large_text: 'Large Text',
      translate_note: 'Additional automatic translation (optional, many languages available):',
      hero_eyebrow: 'Professional Security Toolkit',
      hero_title: 'Vers Suite: Modern, Fast, and Powerful Burp Suite Alternative',
      hero_desc: 'A desktop platform for authorized web security testing with Intercept Proxy, HTTP History, Repeater, Intruder, SSL cert setup, and security metadata analysis in one professional interface.',
      cta_features: 'Explore Features',
      cta_screenshots: 'View Screenshots',
      cta_repo: 'GitHub Repo',
      hero_note: '<i class="fa-solid fa-circle-check"></i> Accessibility-friendly: keyboard support, high contrast, reduce motion option, and clear content structure.',
      stat_modules: 'Main Modules',
      stat_ssl_browsers: 'Browsers for SSL Guide',
      features_title: 'Core Features',
      features_lead: 'Main Vers Suite capabilities for a fast and structured web security testing workflow.',
      feature_intercept_title: 'Intercept Proxy',
      feature_intercept_desc: 'Hold, edit, forward, drop, forward all, and drop all HTTP/HTTPS requests in real time.',
      feature_history_title: 'HTTP History',
      feature_history_desc: 'Complete traffic list with quick filtering, context menu, and send-to-Repeater/Intruder integration.',
      feature_repeater_title: 'Repeater',
      feature_repeater_desc: 'Manual request replay with grouping/ungrouping and efficient session management.',
      feature_intruder_title: 'Intruder',
      feature_intruder_desc: 'Multithread payload fuzzing for endpoint, parameter, and response behavior testing.',
      feature_meta_title: 'Metadata Insight',
      feature_meta_desc: 'Detect WAF indicators, Cloudflare hints, server headers, target IP, and security headers.',
      feature_ssl_title: 'SSL Certificate Setup',
      feature_ssl_desc: 'Certificate setup guides for Chrome, Edge, Brave, Opera, Firefox, and Safari.',
      stack_title: 'Core Stack & Use Case',
      stack_lead: 'Aligned with the current Vers Suite project architecture.',
      usecase_title: 'Use Case',
      install_title: 'Installation',
      install_note: 'Choose the script based on your terminal, then click <strong>Copy Script</strong>.',
      copy_script: 'Copy Script',
      copied_script: 'Copied!',
      install_steps: '<li>Clone the Vers Suite repository.</li><li>Create a virtual environment.</li><li>Install dependencies from <code>requirements.txt</code>.</li><li>Run the app using <code>python main.py</code>.</li>',
      quickstart_title: 'Quick Start',
      quickstart_steps: '<li>Set your browser proxy to <strong>127.0.0.1:PORT</strong> (PORT must match your Vers Suite setting).</li><li>Start proxy from the header bar.</li><li>Enable Intercept to hold requests.</li><li>Send requests from History to Repeater/Intruder as needed.</li><li>Open the <strong>SSL Cert</strong> button to configure HTTPS certificates.</li>',
      cert_title: 'Certificate Guide (Step by Step)',
      cert_lead: 'First, press the <strong>SSL Cert</strong> button in Vers Suite to open a host/port-aware detailed tutorial.',
      cert_chrome_title: 'Google Chrome (Windows/macOS)',
      cert_chrome_steps: '<li>Press <strong>SSL Cert</strong> in Vers Suite.</li><li>Follow mitmproxy CA import instructions.</li><li>Open Chrome Settings and search for <em>proxy</em>.</li><li>Select <em>Open your computer\'s proxy settings</em>.</li><li>Set Address: <code>127.0.0.1</code>, Port: match Vers Suite config.</li>',
      cert_edge_title: 'Microsoft Edge',
      cert_edge_steps: '<li>Press <strong>SSL Cert</strong> in the app.</li><li>Ensure CA cert is trusted in the OS.</li><li>In Edge Settings, search for <em>proxy</em>.</li><li>Open system proxy settings.</li><li>Use proxy <code>127.0.0.1:PORT</code> (PORT from Vers Suite).</li>',
      cert_opera_title: 'Opera',
      cert_opera_steps: '<li>Click <strong>SSL Cert</strong> in Vers Suite.</li><li>Import CA certificate to trusted OS store.</li><li>Open Opera Settings and search for <em>proxy</em>.</li><li>Open system proxy settings.</li><li>Set <code>127.0.0.1:PORT</code> to match the app.</li>',
      cert_firefox_title: 'Firefox',
      cert_firefox_steps: '<li>Press <strong>SSL Cert</strong> in Vers Suite to view cert path.</li><li>Firefox → Settings → Privacy & Security → Certificates.</li><li>View Certificates → Authorities → Import certificate file.</li><li>General → Network Settings → Manual proxy configuration.</li><li>Set HTTP Proxy <code>127.0.0.1</code> and Port to match Vers Suite.</li>',
      cert_safari_title: 'Safari (macOS)',
      cert_safari_steps: '<li>Press <strong>SSL Cert</strong> in the app for cert path.</li><li>Import CA cert into Keychain and set as trusted.</li><li>Safari uses macOS system proxy settings.</li><li>Open System Settings → Network → Proxies.</li><li>Set Web/HTTPS Proxy to <code>127.0.0.1:PORT</code>.</li>',
      cert_trouble_title: 'Troubleshooting Checklist',
      cert_trouble_steps: '<li>Ensure Vers Suite proxy status is running.</li><li>Browser port must exactly match the app port.</li><li>Restart browser after certificate import.</li><li>Check firewall/antivirus if traffic does not pass through proxy.</li>',
      modules_title: 'Interactive Modules (Expand / Collapse)',
      expand_all: 'Expand All',
      collapse_all: 'Collapse All',
      gallery_title: 'Visual Documentation Gallery',
      gallery_lead: 'Click screenshots for full-screen view. Use left/right arrows or keyboard.',
      a11y_title: 'Accessibility & Inclusive Design',
      a11y_deaf_title: 'Friendly for deaf users',
      a11y_deaf_desc: 'Important information does not rely on audio. Main interactions use clear text, icons, and visual structure.',
      a11y_mute_title: 'Friendly for mute users',
      a11y_mute_desc: 'No voice input is required. Full navigation and actions are available via mouse, keyboard, or touch.',
      a11y_universal_title: 'Universal usability',
      a11y_universal_desc: 'Supports keyboard navigation, visible focus states, accessibility toggles, and reduce-motion mode.',
      expand_faq: 'Expand FAQ',
      collapse_faq: 'Collapse FAQ',
      footer_text: 'Vers Suite — Built by Xnuvers007 (Indra Dwi Aryadi) and built for authorized security testing and learning',
      back_to_top: 'Back to top'
    }
  };

  const applyLanguage = (lang) => {
    const selectedLang = i18n[lang] ? lang : 'id';
    const dict = i18n[selectedLang];
    localStorage.setItem('verssuite_lang', selectedLang);
    document.documentElement.lang = selectedLang;

    document.querySelectorAll('[data-i18n]').forEach((node) => {
      const key = node.getAttribute('data-i18n');
      if (!dict[key]) return;
      node.innerHTML = dict[key];
    });

    document.querySelectorAll('[data-i18n-html]').forEach((node) => {
      const key = node.getAttribute('data-i18n-html');
      if (!dict[key]) return;
      node.innerHTML = dict[key];
    });

    const langId = document.getElementById('langId');
    const langEn = document.getElementById('langEn');
    if (langId && langEn) {
      const idActive = selectedLang === 'id';
      langId.setAttribute('aria-pressed', String(idActive));
      langEn.setAttribute('aria-pressed', String(!idActive));
    }
  };

  const langId = document.getElementById('langId');
  const langEn = document.getElementById('langEn');
  if (langId) langId.addEventListener('click', () => applyLanguage('id'));
  if (langEn) langEn.addEventListener('click', () => applyLanguage('en'));

  const currentYear = String(new Date().getFullYear());
  document.querySelectorAll('[data-current-year]').forEach((node) => {
    node.textContent = currentYear;
  });

  applyLanguage(localStorage.getItem('verssuite_lang') || 'id');

  const adjustGoogleTranslateFrame = () => {
    const frame = document.querySelector('iframe.goog-te-menu-frame.skiptranslate');
    if (!frame) return;
    if (window.innerWidth <= 680) {
      frame.style.width = '96vw';
      frame.style.maxWidth = '96vw';
      frame.style.left = '2vw';
      frame.style.right = 'auto';
    } else if (window.innerWidth <= 980) {
      frame.style.maxWidth = '96vw';
      frame.style.width = 'auto';
    } else {
      frame.style.maxWidth = '';
      frame.style.width = '';
      frame.style.left = '';
      frame.style.right = '';
    }
  };

  window.addEventListener('resize', adjustGoogleTranslateFrame);
  document.addEventListener('click', () => {
    setTimeout(adjustGoogleTranslateFrame, 120);
  });
  setInterval(adjustGoogleTranslateFrame, 900);

  const copyButtons = document.querySelectorAll('.copy-btn');
  const copyTextByLang = () => {
    const activeLang = localStorage.getItem('verssuite_lang') || 'id';
    const dict = i18n[activeLang] || i18n.id;
    return {
      copy: dict.copy_script || 'Copy Script',
      copied: dict.copied_script || 'Copied!'
    };
  };

  copyButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      const targetId = button.getAttribute('data-copy-target');
      const codeNode = targetId ? document.getElementById(targetId) : null;
      if (!codeNode) return;

      const textToCopy = codeNode.textContent || '';
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(textToCopy);
        } else {
          const tempArea = document.createElement('textarea');
          tempArea.value = textToCopy;
          tempArea.style.position = 'fixed';
          tempArea.style.left = '-9999px';
          document.body.appendChild(tempArea);
          tempArea.focus();
          tempArea.select();
          document.execCommand('copy');
          tempArea.remove();
        }

        const labels = copyTextByLang();
        button.textContent = labels.copied;
        setTimeout(() => {
          button.textContent = labels.copy;
        }, 1400);
      } catch (_) {
        const labels = copyTextByLang();
        button.textContent = labels.copy;
      }
    });
  });

  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  const navLinks = Array.from(document.querySelectorAll('.main-nav a'));

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (mainNav.classList.contains('open')) {
          mainNav.classList.remove('open');
          menuToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const setActiveLink = () => {
    const scrollY = window.scrollY + 130;
    let currentId = sections[0]?.id;

    sections.forEach((section) => {
      if (section.offsetTop <= scrollY) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
  };

  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();

  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.16 }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const element = entry.target;
        const target = Number(element.getAttribute('data-count'));
        const duration = 1100;
        const startTime = performance.now();

        const tick = (now) => {
          const progress = Math.min((now - startTime) / duration, 1);
          element.textContent = String(Math.floor(progress * target));
          if (progress < 1) {
            requestAnimationFrame(tick);
          } else {
            element.textContent = String(target);
          }
        };

        requestAnimationFrame(tick);
        observer.unobserve(element);
      });
    },
    { threshold: 0.6 }
  );

  counters.forEach((counter) => counterObserver.observe(counter));

  const accordionTriggers = document.querySelectorAll('.accordion-trigger');
  const openPanel = (trigger, shouldOpen) => {
    const panel = trigger.nextElementSibling;
    if (!panel) return;
    trigger.setAttribute('aria-expanded', String(shouldOpen));
    panel.classList.toggle('open', shouldOpen);
  };

  accordionTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      openPanel(trigger, !isExpanded);
    });
  });

  const expandAll = document.getElementById('expandAll');
  const collapseAll = document.getElementById('collapseAll');

  if (expandAll) {
    expandAll.addEventListener('click', () => {
      accordionTriggers.forEach((trigger) => openPanel(trigger, true));
    });
  }

  if (collapseAll) {
    collapseAll.addEventListener('click', () => {
      accordionTriggers.forEach((trigger) => openPanel(trigger, false));
    });
  }

  const faqDetails = document.querySelectorAll('#faq details');
  const expandFaq = document.getElementById('expandFaq');
  const collapseFaq = document.getElementById('collapseFaq');

  if (expandFaq) {
    expandFaq.addEventListener('click', () => {
      faqDetails.forEach((detail) => {
        detail.open = true;
      });
    });
  }

  if (collapseFaq) {
    collapseFaq.addEventListener('click', () => {
      faqDetails.forEach((detail) => {
        detail.open = false;
      });
    });
  }

  const motionToggle = document.getElementById('motionToggle');
  const fontToggle = document.getElementById('fontToggle');

  const applyPreference = (key, className, button) => {
    const isEnabled = localStorage.getItem(key) === 'true';
    document.body.classList.toggle(className, isEnabled);
    if (button) {
      button.setAttribute('aria-pressed', String(isEnabled));
    }
  };

  applyPreference('verssuite_reduce_motion', 'reduce-motion', motionToggle);
  applyPreference('verssuite_large_text', 'large-text', fontToggle);

  if (motionToggle) {
    motionToggle.addEventListener('click', () => {
      const next = !document.body.classList.contains('reduce-motion');
      document.body.classList.toggle('reduce-motion', next);
      motionToggle.setAttribute('aria-pressed', String(next));
      localStorage.setItem('verssuite_reduce_motion', String(next));
    });
  }

  if (fontToggle) {
    fontToggle.addEventListener('click', () => {
      const next = !document.body.classList.contains('large-text');
      document.body.classList.toggle('large-text', next);
      fontToggle.setAttribute('aria-pressed', String(next));
      localStorage.setItem('verssuite_large_text', String(next));
    });
  }

  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (event) => {
      event.preventDefault();
      const behavior = document.body.classList.contains('reduce-motion') ? 'auto' : 'smooth';
      window.scrollTo({ top: 0, behavior });
      history.replaceState(null, '', '#top');
    });
  }

  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const galleryImages = Array.from(document.querySelectorAll('#galleryGrid img'));
  let currentImageIndex = 0;

  const showImageAt = (index) => {
    if (!lightboxImage || !lightboxCaption || galleryImages.length === 0) return;
    const safeIndex = (index + galleryImages.length) % galleryImages.length;
    const image = galleryImages[safeIndex];
    currentImageIndex = safeIndex;
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = image.alt;
  };

  const closeLightbox = () => {
    if (!lightbox || !lightboxImage) return;
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImage.src = '';
  };

  if (lightbox && lightboxImage) {
    galleryImages.forEach((img, index) => {
      img.addEventListener('click', () => {
        showImageAt(index);
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
      });
    });

    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightboxPrev) {
      lightboxPrev.addEventListener('click', () => showImageAt(currentImageIndex - 1));
    }

    if (lightboxNext) {
      lightboxNext.addEventListener('click', () => showImageAt(currentImageIndex + 1));
    }

    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });

    window.addEventListener('keydown', (event) => {
      if (!lightbox.classList.contains('open')) return;
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowLeft') showImageAt(currentImageIndex - 1);
      if (event.key === 'ArrowRight') showImageAt(currentImageIndex + 1);
    });
  }
})();
