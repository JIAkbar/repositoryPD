/**
 * controllers/authController.js
 * Handler untuk semua operasi auth
 * Supabase tables: auth.users (Supabase Auth), public.users
 */

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ── LOGIN ─────────────────────────────────────────────────────────
// POST /api/auth/login
// Body: { email, password }
// Response: { token, nama, email, role }
// Supabase: auth.signInWithPassword → JWT
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email dan password wajib diisi' });
    }

    // Auth via Supabase
    const { data: authData, error: authErr } = await supabase.auth.signInWithPassword({ email, password });
    if (authErr || !authData.session) {
      return res.status(401).json({ error: 'Email atau password salah' });
    }

    // Ambil profil dari public.users
    const { data: profile, error: profileErr } = await supabase
      .from('users')
      .select('nama, nim_nidn, role, status, prodi_id')
      .eq('auth_id', authData.user.id)
      .single();

    if (profileErr || !profile) {
      return res.status(401).json({ error: 'Profil tidak ditemukan' });
    }

    if (profile.status !== 'aktif') {
      return res.status(403).json({ error: 'Akun belum diverifikasi oleh admin' });
    }

    res.json({
      token: authData.session.access_token,
      nama:  profile.nama,
      email: authData.user.email,
      role:  profile.role,
    });
  } catch (err) {
    console.error('login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ── REGISTER ─────────────────────────────────────────────────────
// POST /api/auth/register
// Body: { nama, nim, email, password, prodi_id, role:'mahasiswa' }
// Flow: buat auth.user → insert public.users (status:'pending') → admin verifikasi
exports.register = async (req, res) => {
  try {
    const { nama, nim, email, password, prodi_id } = req.body;
    if (!nama || !nim || !email || !password || !prodi_id) {
      return res.status(400).json({ error: 'Semua field wajib diisi' });
    }

    // Buat akun Supabase Auth
    const { data: authData, error: authErr } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // langsung konfirmasi email (admin yang verifikasi akun, bukan email)
    });
    if (authErr) {
      return res.status(400).json({ error: authErr.message });
    }

    // Insert ke public.users dengan status pending
    const { error: insertErr } = await supabase
      .from('users')
      .insert({
        auth_id:  authData.user.id,
        nama,
        nim_nidn: nim,
        email,
        role:     'mahasiswa',
        prodi_id,
        status:   'pending', // menunggu verifikasi admin
      });

    if (insertErr) {
      // Rollback: hapus auth user jika insert gagal
      await supabase.auth.admin.deleteUser(authData.user.id);
      return res.status(500).json({ error: 'Gagal menyimpan profil: ' + insertErr.message });
    }

    res.status(201).json({ message: 'Registrasi berhasil. Menunggu verifikasi admin.' });
  } catch (err) {
    console.error('register error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ── LOGOUT ───────────────────────────────────────────────────────
// POST /api/auth/logout (requireAuth)
// Invalidate Supabase session
exports.logout = async (req, res) => {
  try {
    // Supabase sign out (invalidate token di server)
    await supabase.auth.admin.signOut(req.headers['authorization'].replace('Bearer ', ''));
    res.json({ message: 'Logout berhasil' });
  } catch (err) {
    // Tetap 200 — client sudah hapus localStorage
    res.json({ message: 'Logout berhasil' });
  }
};

// ── GET PROFILE ───────────────────────────────────────────────────
// GET /api/auth/me (requireAuth)
// Response: { nama, nim_nidn, email, prodi, angkatan, gender, role }
exports.getProfile = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select(`
        nama, nim_nidn, email, gender, role, status,
        program_studi ( nama, kode, jenjang )
      `)
      .eq('id', req.user.id)
      .single();

    if (error || !data) {
      return res.status(404).json({ error: 'Profil tidak ditemukan' });
    }

    res.json({
      nama:     data.nama,
      nim:      data.nim_nidn,
      email:    data.email,
      gender:   data.gender,
      role:     data.role,
      prodi:    data.program_studi?.nama || '',
      angkatan: data.nim_nidn ? '20' + data.nim_nidn.substring(0, 2) : '',
    });
  } catch (err) {
    console.error('getProfile error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ── UPDATE PROFILE ────────────────────────────────────────────────
// PUT /api/auth/me (requireAuth)
// Body: { nama, gender, prodi_id }
exports.updateProfile = async (req, res) => {
  try {
    const { nama, gender, prodi_id } = req.body;
    const updates = {};
    if (nama)     updates.nama = nama;
    if (gender)   updates.gender = gender;
    if (prodi_id) updates.prodi_id = prodi_id;

    const { error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', req.user.id);

    if (error) return res.status(500).json({ error: error.message });

    res.json({ message: 'Profil berhasil diperbarui' });
  } catch (err) {
    console.error('updateProfile error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
