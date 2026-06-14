/**
 * DIGILAB Theme Engine v1.0
 * Single source of truth untuk semua tema.
 * Include di semua halaman: <script src="theme.js"></script>
 * Letakkan di <head> SEBELUM stylesheet agar tidak ada FOUC.
 */
(function () {
  'use strict';

  /* ─── Definisi semua tema ─── */
  var THEMES = {
    indigo: {
      '--navy':       '#094e58',
      '--navy-dark':  '#072e37',
      '--navy-mid':   '#0d6b79',
      '--bg':         '#f5f0e8',
      '--bg-card':    '#ffffff',
      '--text-dark':  '#122830',
      '--text-mid':   '#2d5a65',
      '--text-muted': '#6b8e96',
      '--orange':     '#e8821e',
      '--teal':       '#14b8a6',
      '--border':     '#dde8ea',
      '--shadow-sm':  '0 1px 4px rgba(9,78,88,.08)',
      '--shadow':     '0 2px 10px rgba(9,78,88,.12)',
      '--shadow-lg':  '0 6px 24px rgba(9,78,88,.18)',
      '--red':        '#c0392b',
      '--red-dark':   '#8b0000',
      '--pill':       '999px',
      '--r':          '8px',
    },
    emerald: {
      '--navy':       '#065f46',
      '--navy-dark':  '#064e3b',
      '--navy-mid':   '#047857',
      '--bg':         '#f0fdf4',
      '--bg-card':    '#ffffff',
      '--text-dark':  '#022c22',
      '--text-mid':   '#166534',
      '--text-muted': '#6b7280',
      '--orange':     '#f59e0b',
      '--teal':       '#10b981',
      '--border':     '#bbf7d0',
      '--shadow-sm':  '0 1px 4px rgba(6,95,70,.08)',
      '--shadow':     '0 2px 10px rgba(6,95,70,.12)',
      '--shadow-lg':  '0 6px 24px rgba(6,95,70,.18)',
      '--red':        '#c0392b',
      '--red-dark':   '#8b0000',
      '--pill':       '999px',
      '--r':          '8px',
    },
    charcoal: {
      '--navy':       '#1c1c2e',
      '--navy-dark':  '#0f0f1a',
      '--navy-mid':   '#2d2d44',
      '--bg':         '#f5f5f7',
      '--bg-card':    '#ffffff',
      '--text-dark':  '#1c1c2e',
      '--text-mid':   '#44445a',
      '--text-muted': '#888899',
      '--orange':     '#e85d04',
      '--teal':       '#4cc9f0',
      '--border':     '#dcdce4',
      '--shadow-sm':  '0 1px 4px rgba(28,28,46,.08)',
      '--shadow':     '0 2px 10px rgba(28,28,46,.14)',
      '--shadow-lg':  '0 6px 24px rgba(28,28,46,.20)',
      '--red':        '#c0392b',
      '--red-dark':   '#8b0000',
      '--pill':       '999px',
      '--r':          '8px',
    },
    violet: {
      '--navy':       '#4c1d95',
      '--navy-dark':  '#2e1065',
      '--navy-mid':   '#6d28d9',
      '--bg':         '#f5f3ff',
      '--bg-card':    '#ffffff',
      '--text-dark':  '#1e1b4b',
      '--text-mid':   '#4338ca',
      '--text-muted': '#8b5cf6',
      '--orange':     '#f59e0b',
      '--teal':       '#06b6d4',
      '--border':     '#ddd6fe',
      '--shadow-sm':  '0 1px 4px rgba(76,29,149,.08)',
      '--shadow':     '0 2px 10px rgba(76,29,149,.13)',
      '--shadow-lg':  '0 6px 24px rgba(76,29,149,.20)',
      '--red':        '#c0392b',
      '--red-dark':   '#8b0000',
      '--pill':       '999px',
      '--r':          '8px',
    },
    rose: {
      '--navy':       '#881337',
      '--navy-dark':  '#4c0519',
      '--navy-mid':   '#be123c',
      '--bg':         '#fff1f2',
      '--bg-card':    '#ffffff',
      '--text-dark':  '#1c0508',
      '--text-mid':   '#9f1239',
      '--text-muted': '#9ca3af',
      '--orange':     '#f97316',
      '--teal':       '#0891b2',
      '--border':     '#fecdd3',
      '--shadow-sm':  '0 1px 4px rgba(136,19,55,.08)',
      '--shadow':     '0 2px 10px rgba(136,19,55,.13)',
      '--shadow-lg':  '0 6px 24px rgba(136,19,55,.20)',
      '--red':        '#c0392b',
      '--red-dark':   '#8b0000',
      '--pill':       '999px',
      '--r':          '8px',
    }
  };

  /* ─── Apply tema ke :root via inline style (override CSS vars) ─── */
  function applyTheme(name) {
    var vars = THEMES[name] || THEMES.indigo;
    var root = document.documentElement;
    var keys = Object.keys(vars);
    for (var i = 0; i < keys.length; i++) {
      root.style.setProperty(keys[i], vars[keys[i]]);
    }
    // Set data-theme attribute untuk selector CSS yang mungkin masih pakai [data-theme=...]
    root.setAttribute('data-theme', name === 'indigo' ? '' : name);
    // Simpan ke localStorage
    try { localStorage.setItem('digilab-theme', name); } catch (e) {}
    // Update swatch active state (jika ada di halaman ini)
    document.querySelectorAll('.theme-swatch, .sd-theme').forEach(function (el) {
      var t = el.dataset.t || el.dataset.theme;
      if (t) el.classList.toggle('active', t === name);
    });
  }

  /* ─── Baca tema dari localStorage & terapkan ─── */
  function init() {
    var saved;
    try { saved = localStorage.getItem('digilab-theme'); } catch (e) {}
    saved = saved || 'indigo';
    applyTheme(saved);
    return saved;
  }

  /* ─── Public API ─── */
  window.DigilabTheme = {
    themes:  THEMES,
    apply:   applyTheme,
    init:    init,
    current: function () {
      var t;
      try { t = localStorage.getItem('digilab-theme'); } catch (e) {}
      return t || 'indigo';
    }
  };

  /* ─── Auto-init SEKARANG (sync, sebelum render) ─── */
  init();
})();
