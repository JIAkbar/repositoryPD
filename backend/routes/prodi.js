/**
 * routes/prodi.js
 * GET /api/prodi — list semua program studi (publik)
 */

const router    = require('express').Router();
const prodiCtrl = require('../controllers/prodiController');

router.get('/', prodiCtrl.getAll);

module.exports = router;
