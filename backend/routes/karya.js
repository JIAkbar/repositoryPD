/**
 * routes/karya.js
 * GET  /api/karya        — publik (beranda, hasil pencarian)
 * GET  /api/karya/me     — karya milik mahasiswa yang login
 * GET  /api/karya/:id    — detail satu karya
 * POST /api/karya        — upload karya baru (mahasiswa)
 */

const router  = require('express').Router();
const multer  = require('multer');
const { requireAuth } = require('../middleware/auth');
const karyaCtrl = require('../controllers/karyaController');

// Multer: upload ke memory, lalu push ke Supabase Storage
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 50 * 1024 * 1024 } });

router.get ('/',    karyaCtrl.getAll);
router.get ('/me',  requireAuth, karyaCtrl.getMilikSaya);
router.get ('/:id', karyaCtrl.getById);
router.post('/',    requireAuth, upload.fields([
  { name: 'file_pdf',  maxCount: 1 },
  { name: 'foto',      maxCount: 5 },
  { name: 'video',     maxCount: 1 },
]), karyaCtrl.create);

module.exports = router;
