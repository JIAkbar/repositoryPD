/**
 * layout-router.js — DIGILAB Repository
 * Centralized navigation router. Single source of truth for page-to-page redirects.
 * Evo is the primary (and only) layout — classic layout has been retired.
 * Load AFTER theme.js, BEFORE any inline script that calls navigateTo() or switchLayout().
 */
(function () {
  'use strict';

  // ── PAGE MAP ──────────────────────────────────────────────────────────────
  var PAGE_MAP = {
    public:    'index.html',
    admin:     'admin.html',
    mahasiswa: 'mahasiswa.html',
    statistik: 'statistik.html',
  };

  // ── PUBLIC API ────────────────────────────────────────────────────────────

  /**
   * Navigate to a named page.
   * @param {string} name - 'public' | 'admin' | 'mahasiswa' | 'statistik'
   */
  function navigateTo(name) {
    var page = PAGE_MAP[name];
    if (page && !window.location.pathname.endsWith(page)) {
      window.location.href = page;
    }
  }

  /**
   * Layout switch — no-op: evo IS the only layout now.
   */
  function switchLayout() {
    console.log('Layout switch disabled — evo is the primary layout');
  }

  /** Always returns 'evo' */
  function getLayout() {
    return 'evo';
  }

  /**
   * Detect which logical page we are on from the current filename.
   * Returns: 'public' | 'admin' | 'mahasiswa' | 'statistik'
   */
  function getCurrentPageName() {
    var path = window.location.pathname;
    if (path.endsWith('admin.html'))     return 'admin';
    if (path.endsWith('mahasiswa.html')) return 'mahasiswa';
    if (path.endsWith('statistik.html')) return 'statistik';
    return 'public';
  }

  // ── EXPOSE GLOBALLY ───────────────────────────────────────────────────────
  window.LayoutRouter = {
    navigateTo:         navigateTo,
    switchLayout:       switchLayout,
    getLayout:          getLayout,
    getCurrentPageName: getCurrentPageName,
    PAGE_MAP:           PAGE_MAP
  };

  // Convenience shortcuts
  window.navigateTo         = navigateTo;
  window.switchLayout       = switchLayout;
  window.getLayout          = getLayout;
  window.getCurrentPageName = getCurrentPageName;

})();
