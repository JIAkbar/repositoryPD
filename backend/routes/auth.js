/**
 * routes/auth.js
 * POST /api/auth/login
 * POST /api/auth/register
 * POST /api/auth/logout
 * GET  /api/auth/me
 * PUT  /api/auth/me
 */

const router = require('express').Router();
const { requireAuth } = require('../middleware/auth');
const authCtrl = require('../controllers/authController');

router.post('/login',    authCtrl.login);
router.post('/register', authCtrl.register);
router.post('/logout',   requireAuth, authCtrl.logout);
router.get ('/me',       requireAuth, authCtrl.getProfile);
router.put ('/me',       requireAuth, authCtrl.updateProfile);

module.exports = router;
