(function () {
  const translations = {
    id: {
      badge: 'Security Proxy',
      hero_title: 'Vers Suite Documentation',
      hero_subtitle: 'Toolkit modern untuk web security testing (alternatif Burp Suite) berbasis Python, PyQt5, dan mitmproxy.',
      nav_overview: 'Overview',
      nav_features: 'Fitur',
      nav_install: 'Instalasi',
      nav_usage: 'Penggunaan',
      nav_screenshots: 'Screenshot',
      overview_title: 'Overview',
      overview_desc: 'Vers Suite adalah aplikasi proxy intersepsi untuk analisis HTTP/HTTPS, request replay, dan payload fuzzing. Cocok untuk pembelajaran keamanan aplikasi web dan penetration testing berizin.',
      overview_modules: 'Modul Utama',
      overview_usecase: 'Use Case',
      features_title: 'Fitur',
      feature_intercept_title: 'Intercept Proxy',
      feature_intercept_desc: 'Forward, drop, forward all, drop all, dan editing request secara realtime.',
      feature_history_title: 'HTTP History',
      feature_history_desc: 'Pencatatan traffic lengkap dengan context menu dan kirim cepat ke Repeater/Intruder.',
      feature_metadata_title: 'Advanced Metadata',
      feature_metadata_desc: 'Deteksi IP target, indikasi WAF, Cloudflare, server signature, dan security headers.',
      feature_repeater_title: 'Repeater',
      feature_repeater_desc: 'Replay request manual, grouping/ungrouping session, serta search/filter host-path-group.',
      feature_intruder_title: 'Intruder',
      feature_intruder_desc: 'Pengujian payload multithread untuk fuzzing endpoint.',
      feature_https_title: 'HTTPS Support',
      feature_https_desc: 'Panduan sertifikat CA untuk Chrome, Edge, Brave, Opera, Firefox, dan Safari (macOS).',
      install_title: 'Instalasi',
      install_step_1: 'Clone repository Vers Suite.',
      install_step_2: 'Buat virtual environment.',
      install_step_3: 'Install dependency dari <code>requirements.txt</code>.',
      install_step_4: 'Jalankan aplikasi dengan <code>python main.py</code>.',
      usage_title: 'Panduan Cepat',
      usage_step_1: 'Set browser proxy ke <strong>127.0.0.1:PORT</strong> (PORT harus sama dengan yang Anda pilih di Vers Suite).',
      usage_step_2: 'Start proxy dari header bar.',
      usage_step_3: 'Aktifkan Intercept jika ingin hold request.',
      usage_step_4: 'Kirim request dari History ke Repeater/Intruder sesuai kebutuhan testing.',
      usage_step_5: 'Buka tombol SSL Cert untuk setup sertifikat HTTPS.',
      shots_title: 'Screenshot Guide (Wajib Isi)',
      shots_intro: 'Letakkan semua gambar di folder <code>docs/assets/images/</code> dengan nama file sesuai daftar berikut. Jika nama file berbeda, ubah juga atribut <code>src</code> pada HTML ini.',
      shot_1_desc: 'Screenshot layar utama Vers Suite (header, status proxy, dan tab utama terlihat).',
      shot_2_desc: 'Tab Intercept saat ada request tertahan; tampilkan tombol Forward/Drop/Forward All/Drop All.',
      shot_3_desc: 'Tab HTTP History berisi beberapa traffic dan context menu klik kanan.',
      shot_4_desc: 'Tampilan Repeater dengan request editor, response panel, dan filter/group session.',
      shot_5_desc: 'Tampilan Intruder saat payload attack berjalan dan hasil response terlihat.',
      shot_6_desc: 'Dialog SSL Certificate Setup yang menampilkan panduan browser dan proxy.',
      faq_1_q: 'PORT harus selalu 8080?',
      faq_1_a: 'Tidak. Anda bebas memilih port di Vers Suite. Browser/proxy client cukup mengikuti port yang sama.',
      faq_2_q: 'Kenapa HTTPS belum terbaca?',
      faq_2_a: 'Pastikan CA certificate sudah terpasang & trusted, lalu restart browser dan pastikan proxy aktif.',
      faq_3_q: 'Apakah tool ini untuk aktivitas ilegal?',
      faq_3_a: 'Tidak. Gunakan hanya untuk edukasi dan pengujian keamanan pada sistem yang memiliki izin resmi.',
      footer_text: '© 2026 Vers Suite. Built for authorized security testing and learning.',
      back_to_top: 'Back to top'
    },
    en: {
      badge: 'Security Proxy',
      hero_title: 'Vers Suite Documentation',
      hero_subtitle: 'Modern web security testing toolkit (Burp Suite alternative) built with Python, PyQt5, and mitmproxy.',
      nav_overview: 'Overview',
      nav_features: 'Features',
      nav_install: 'Install',
      nav_usage: 'Usage',
      nav_screenshots: 'Screenshots',
      overview_title: 'Overview',
      overview_desc: 'Vers Suite is an interception proxy for HTTP/HTTPS analysis, request replay, and payload fuzzing. It is designed for web app security learning and authorized penetration testing.',
      overview_modules: 'Main Modules',
      overview_usecase: 'Use Case',
      features_title: 'Features',
      feature_intercept_title: 'Intercept Proxy',
      feature_intercept_desc: 'Forward, drop, forward all, drop all, and edit HTTP requests in real time.',
      feature_history_title: 'HTTP History',
      feature_history_desc: 'Comprehensive traffic logging with context menus and quick send to Repeater/Intruder.',
      feature_metadata_title: 'Advanced Metadata',
      feature_metadata_desc: 'Target IP, WAF indications, Cloudflare hints, server signatures, and security headers detection.',
      feature_repeater_title: 'Repeater',
      feature_repeater_desc: 'Manual request replay with session grouping/ungrouping and host-path-group filtering.',
      feature_intruder_title: 'Intruder',
      feature_intruder_desc: 'Multithread payload testing for endpoint fuzzing.',
      feature_https_title: 'HTTPS Support',
      feature_https_desc: 'CA certificate setup guidance for Chrome, Edge, Brave, Opera, Firefox, and Safari (macOS).',
      install_title: 'Installation',
      install_step_1: 'Clone the Vers Suite repository.',
      install_step_2: 'Create a virtual environment.',
      install_step_3: 'Install dependencies from <code>requirements.txt</code>.',
      install_step_4: 'Run the app with <code>python main.py</code>.',
      usage_title: 'Quick Usage',
      usage_step_1: 'Set browser proxy to <strong>127.0.0.1:PORT</strong> (the PORT must match your Vers Suite setting).',
      usage_step_2: 'Start the proxy from the header bar.',
      usage_step_3: 'Enable Intercept to hold requests.',
      usage_step_4: 'Send requests from History to Repeater/Intruder as needed.',
      usage_step_5: 'Use the SSL Cert button to configure HTTPS certificates.',
      shots_title: 'Screenshot Guide (Required)',
      shots_intro: 'Place all images in <code>docs/assets/images/</code> using the exact filenames below. If filenames change, also update each HTML <code>src</code> attribute.',
      shot_1_desc: 'Capture the main Vers Suite window (header, proxy status, and primary tabs visible).',
      shot_2_desc: 'Capture Intercept tab with a paused request and Forward/Drop/Forward All/Drop All buttons visible.',
      shot_3_desc: 'Capture HTTP History with several entries and a right-click context menu example.',
      shot_4_desc: 'Capture Repeater with request editor, response panel, and session filter/group controls.',
      shot_5_desc: 'Capture Intruder while an attack runs and response results are visible.',
      shot_6_desc: 'Capture SSL Certificate Setup dialog showing browser and proxy instructions.',
      faq_1_q: 'Must the port always be 8080?',
      faq_1_a: 'No. You can use any port in Vers Suite, as long as your browser/client proxy uses the same port.',
      faq_2_q: 'Why is HTTPS still not intercepted?',
      faq_2_a: 'Ensure the CA certificate is installed and trusted, then restart the browser and verify the proxy is running.',
      faq_3_q: 'Can this tool be used for illegal activity?',
      faq_3_a: 'No. Use it only for educational and authorized security testing scenarios.',
      footer_text: '© 2026 Vers Suite. Built for authorized security testing and learning.',
      back_to_top: 'Back to top'
    }
  };

  const setLanguage = (lang) => {
    const selected = translations[lang] ? lang : 'id';
    const langMap = translations[selected];
    const i18nNodes = document.querySelectorAll('[data-i18n]');

    i18nNodes.forEach((node) => {
      const key = node.getAttribute('data-i18n');
      if (!langMap[key]) return;
      node.innerHTML = langMap[key];
    });

    document.documentElement.lang = selected;
    localStorage.setItem('verssuite_docs_lang', selected);

    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach((button) => {
      button.classList.toggle('active', button.getAttribute('data-lang') === selected);
    });
  };

  const langButtons = document.querySelectorAll('.lang-btn');
  langButtons.forEach((button) => {
    button.addEventListener('click', () => setLanguage(button.getAttribute('data-lang')));
  });

  setLanguage(localStorage.getItem('verssuite_docs_lang') || 'id');

  const links = Array.from(document.querySelectorAll('.top-nav a'));
  const sections = links
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const setActiveLink = () => {
    const scrollY = window.scrollY + 140;
    let currentId = sections[0]?.id;

    for (const section of sections) {
      if (section.offsetTop <= scrollY) {
        currentId = section.id;
      }
    }

    links.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${currentId}`;
      link.classList.toggle('active', isActive);
    });
  };

  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();

  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxClose = document.getElementById('lightboxClose');
  const screenshots = document.querySelectorAll('.shot-card img');

  const closeLightbox = () => {
    if (!lightbox || !lightboxImage) return;
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImage.src = '';
  };

  if (lightbox && lightboxImage) {
    screenshots.forEach((img) => {
      img.addEventListener('click', () => {
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt || 'Screenshot preview';
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
      });
    });

    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });

    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && lightbox.classList.contains('open')) {
        closeLightbox();
      }
    });
  }
})();
