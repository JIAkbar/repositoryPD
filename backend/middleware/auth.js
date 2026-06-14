/**
 * middleware/auth.js
 * Verifikasi JWT Supabase untuk protected routes
 *
 * Cara pakai di route:
 *   const { requireAuth, requireAdmin } = require('../middleware/auth');
 *   router.get('/me', requireAuth, controller.getProfile);
 *   router.put('/karya/:id', requireAuth, requireAdmin, controller.verifikasi);
 */

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

/**
 * requireAuth — pastikan request punya JWT valid dari Supabase Auth
 * Menyisipkan req.user = { id, email, role } untuk handler berikutnya
 */
async function requireAuth(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token tidak ditemukan' });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    // Verifikasi token ke Supabase Auth
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) {
      return res.status(401).json({ error: 'Token tidak valid atau sudah expired' });
    }

    // Ambil data tambahan dari public.users (role, nim_nidn, dll)
    const { data: profile, error: profileErr } = await supabase
      .from('users')
      .select('id, nama, nim_nidn, role, status')
      .eq('auth_id', user.id)
      .single();

    if (profileErr || !profile) {
      return res.status(401).json({ error: 'Profil user tidak ditemukan' });
    }

    if (profile.status !== 'aktif') {
      return res.status(403).json({ error: 'Akun belum diverifikasi atau dinonaktifkan' });
    }

    // Sisipkan ke request
    req.user = {
      id:        profile.id,
      auth_id:   user.id,
      email:     user.email,
      nama:      profile.nama,
      nim_nidn:  profile.nim_nidn,
      role:      profile.role,   // 'mahasiswa' | 'admin' | 'pustakawan'
    };

    next();
  } catch (err) {
    console.error('Auth middleware error:', err);
    return res.status(500).json({ error: 'Gagal memverifikasi token' });
  }
}

/**
 * requireAdmin — hanya Admin Pustakawan yang boleh akses
 * Harus dipasang SETELAH requireAuth
 */
function requireAdmin(req, res, next) {
  const adminRoles = ['admin', 'pustakawan', 'Admin Pustakawan'];
  if (!req.user || !adminRoles.includes(req.user.role)) {
    return res.status(403).json({ error: 'Akses ditolak: hanya Admin Pustakawan' });
  }
  next();
}

module.exports = { requireAuth, requireAdmin };
