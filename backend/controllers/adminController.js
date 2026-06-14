/**
 * controllers/adminController.js
 * Verifikasi karya, verifikasi akun, statistik dashboard
 * Supabase tables: karya_ilmiah, users, log_verifikasi
 */

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ── GET KARYA — semua karya untuk admin ───────────────────────────
// GET /api/admin/karya?status=&q=&page=1&limit=20
exports.getKarya = async (req, res) => {
  try {
    const { status, q, page = 1, limit = 20 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    let query = supabase
      .from('karya_ilmiah')
      .select(`
        id, judul, no_panggil, jenis, tahun, status, link, created_at,
        user:users(nama, nim_nidn),
        prodi:program_studi(nama)
      `, { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + Number(limit) - 1);

    if (status) query = query.eq('status', status);
    if (q) {
      query = query.or(`judul.ilike.%${q}%,users.nama.ilike.%${q}%`);
    }

    const { data, error, count } = await query;
    if (error) throw error;

    // Flatten untuk match struktur dummy DUMMY_KARYA di frontend
    const result = (data || []).map(k => ({
      id:         k.id,
      nopanggil:  k.no_panggil,
      judul:      k.judul,
      mhs:        k.user?.nama || '',
      prodi:      k.prodi?.nama || '',
      tgl:        new Date(k.created_at).toLocaleDateString('id-ID', { day:'2-digit', month:'short', year:'numeric' }),
      status:     k.status,
      link:       k.link || '',
    }));

    res.json({ data: result, total: count, page: Number(page), limit: Number(limit) });
  } catch (err) {
    console.error('admin.getKarya error:', err);
    res.status(500).json({ error: 'Gagal mengambil data karya' });
  }
};

// ── VERIFIKASI KARYA ──────────────────────────────────────────────
// PUT /api/admin/karya/:id
// Body: { action: 'disetujui'|'revisi'|'ditolak', catatan: '' }
exports.verifikasiKarya = async (req, res) => {
  try {
    const { id } = req.params;
    const { action, catatan } = req.body;

    const validActions = ['disetujui', 'revisi', 'ditolak'];
    if (!validActions.includes(action)) {
      return res.status(400).json({ error: 'Action tidak valid. Pilih: disetujui | revisi | ditolak' });
    }

    // Update status karya
    const updatePayload = { status: action };
    if (action === 'revisi' && catatan) {
      // Simpan catatan revisi sebagai array di kolom catatan_revisi
      updatePayload.catatan_revisi = [{ catatan, tgl: new Date().toISOString(), admin: req.user.nama }];
    }

    const { error: updateErr } = await supabase
      .from('karya_ilmiah')
      .update(updatePayload)
      .eq('id', id);

    if (updateErr) throw updateErr;

    // Catat ke log_verifikasi (audit trail)
    await supabase.from('log_verifikasi').insert({
      karya_id:  id,
      admin_id:  req.user.id,
      aksi:      action,
      catatan:   catatan || null,
    });

    res.json({ message: `Karya berhasil di${action}` });
  } catch (err) {
    console.error('admin.verifikasiKarya error:', err);
    res.status(500).json({ error: 'Gagal memverifikasi karya' });
  }
};

// ── GET AKUN — daftar akun mahasiswa ─────────────────────────────
// GET /api/admin/akun?status=&q=
exports.getAkun = async (req, res) => {
  try {
    const { status, q } = req.query;

    let query = supabase
      .from('users')
      .select(`
        id, nama, nim_nidn, email, status, created_at,
        prodi:program_studi(nama)
      `)
      .eq('role', 'mahasiswa')
      .order('created_at', { ascending: false });

    if (status) query = query.eq('status', status);
    if (q)      query = query.or(`nama.ilike.%${q}%,nim_nidn.ilike.%${q}%`);

    const { data, error } = await query;
    if (error) throw error;

    // Flatten untuk match struktur dummy DUMMY_AKUN di frontend
    const result = (data || []).map(u => ({
      nim:    u.nim_nidn,
      nama:   u.nama,
      prodi:  u.prodi?.nama || '',
      tgl:    new Date(u.created_at).toLocaleDateString('id-ID', { day:'2-digit', month:'short' }),
      status: u.status,
    }));

    res.json(result);
  } catch (err) {
    console.error('admin.getAkun error:', err);
    res.status(500).json({ error: 'Gagal mengambil data akun' });
  }
};

// ── VERIFIKASI AKUN ───────────────────────────────────────────────
// PUT /api/admin/akun/:nim
// Body: { action: 'disetujui'|'ditolak' }
exports.verifikasiAkun = async (req, res) => {
  try {
    const { nim } = req.params;
    const { action } = req.body;

    if (!['disetujui', 'ditolak'].includes(action)) {
      return res.status(400).json({ error: 'Action tidak valid. Pilih: disetujui | ditolak' });
    }

    // Map action → status di tabel users
    const newStatus = action === 'disetujui' ? 'aktif' : 'ditolak';

    const { error } = await supabase
      .from('users')
      .update({ status: newStatus })
      .eq('nim_nidn', nim)
      .eq('role', 'mahasiswa');

    if (error) throw error;

    res.json({ message: `Akun berhasil di${action}` });
  } catch (err) {
    console.error('admin.verifikasiAkun error:', err);
    res.status(500).json({ error: 'Gagal memverifikasi akun' });
  }
};

// ── STATISTIK DASHBOARD ───────────────────────────────────────────
// GET /api/admin/stats
exports.getStats = async (req, res) => {
  try {
    // Parallel queries untuk performa
    const [karyaRes, akunRes] = await Promise.all([
      supabase.from('karya_ilmiah').select('status'),
      supabase.from('users').select('status').eq('role', 'mahasiswa'),
    ]);

    if (karyaRes.error) throw karyaRes.error;
    if (akunRes.error)  throw akunRes.error;

    const karya = karyaRes.data || [];
    const akun  = akunRes.data  || [];

    const count = (arr, val) => arr.filter(x => x.status === val).length;

    res.json({
      total_karya:      karya.length,
      pending_karya:    count(karya, 'pending'),
      disetujui_karya:  count(karya, 'disetujui'),
      ditolak_karya:    count(karya, 'ditolak'),
      revisi_karya:     count(karya, 'revisi'),
      total_mahasiswa:  akun.length,
      pending_akun:     count(akun, 'pending'),
      aktif_akun:       count(akun, 'aktif'),
    });
  } catch (err) {
    console.error('admin.getStats error:', err);
    res.status(500).json({ error: 'Gagal mengambil statistik' });
  }
};
