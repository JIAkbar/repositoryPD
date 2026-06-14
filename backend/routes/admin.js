/**
 * routes/admin.js
 * GET /api/admin/stats
 * GET /api/admin/karya        — semua karya (filter: status, q)
 * PUT /api/admin/karya/:id    — verifikasi karya {action, catatan}
 * GET /api/admin/akun         — daftar akun (filter: status, q)
 * PUT /api/admin/akun/:nim    — verifikasi akun {action}
 */

const router    = require('express').Router();
const { requireAuth, requireAdmin } = require('../middleware/auth');
const adminCtrl = require('../controllers/adminController');

// Semua route admin wajib auth + role admin
router.use(requireAuth, requireAdmin);

router.get('/stats',          adminCtrl.getStats);
router.get('/karya',          adminCtrl.getKarya);
router.put('/karya/:id',      adminCtrl.verifikasiKarya);
router.get('/akun',           adminCtrl.getAkun);
router.put('/akun/:nim',      adminCtrl.verifikasiAkun);

module.exports = router;
