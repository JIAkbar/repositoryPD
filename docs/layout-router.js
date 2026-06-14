/**
 * layout-router.js — DIGILAB Repository
 * Centralized navigation router. Single source of truth for page-to-page redirects.
 * Load AFTER theme.js, BEFORE any inline script that calls navigateTo() or switchLayout().
 */
(function () {
  'use strict';

  // ── PAGE MAP ──────────────────────────────────────────────────────────────
  var PAGE_MAP = {
    classic: {
      public:    'index.html',
      admin:     'admin.html',
      mahasiswa: 'mahasiswa.html',
      statistik: 'statistik.html'
    },
    evo: {
      public:    'index-evo.html',
      admin:     'admin-evo.html',
      mahasiswa: 'mahasiswa-evo.html',
      statistik: 'statistik-evo.html'
    }
  };

  // ── HELPERS ───────────────────────────────────────────────────────────────

  /** Return current layout preference: 'classic' | 'evo' */
  function getLayout() {
    return localStorage.getItem('digilab-layout') || 'classic';
  }

  /**
   * Detect which logical page we are on from the current filename.
   * Returns: 'public' | 'admin' | 'mahasiswa' | 'statistik'
   */
  function getCurrentPageName() {
    var filename = window.location.pathname.split('/').pop() || 'index.html';
    if (/^(index(-evo)?\.html)?$/.test(filename)) return 'public';
    if (/^admin(-evo)?\.html$/.test(filename))      return 'admin';
    if (/^mahasiswa(-evo)?\.html$/.test(filename))  return 'mahasiswa';
    if (/^statistik(-evo)?\.html$/.test(filename))  return 'statistik';
    return 'public';
  }

  // ── PUBLIC API ────────────────────────────────────────────────────────────

  /**
   * Navigate to a named page in the current layout.
   * @param {string} name - 'public' | 'admin' | 'mahasiswa' | 'statistik'
   */
  function navigateTo(name) {
    var layout = getLayout();
    var map = PAGE_MAP[layout] || PAGE_MAP.classic;
    window.location.href = map[name] || map.public;
  }

  /**
   * Toggle layout (classic ↔ evo), redirect to the equivalent page.
   * Use this for all ⚡ V.Evolution / ← Tampilan Classic switch buttons.
   */
  function switchLayout() {
    var currentLayout = getLayout();
    var newLayout = currentLayout === 'classic' ? 'evo' : 'classic';
    localStorage.setItem('digilab-layout', newLayout);
    var pageName = getCurrentPageName();
    var map = PAGE_MAP[newLayout];
    window.location.href = map[pageName] || map.public;
  }

  // ── EXPOSE GLOBALLY ───────────────────────────────────────────────────────
  // Namespaced object
  window.LayoutRouter = {
    navigateTo:          navigateTo,
    switchLayout:        switchLayout,
    getLayout:           getLayout,
    getCurrentPageName:  getCurrentPageName,
    PAGE_MAP:            PAGE_MAP
  };

  // Convenience shortcuts (call directly in onclick="navigateTo('mahasiswa')")
  window.navigateTo         = navigateTo;
  window.switchLayout       = switchLayout;
  window.getLayout          = getLayout;
  window.getCurrentPageName = getCurrentPageName;

})();
