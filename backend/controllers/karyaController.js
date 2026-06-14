/**
 * controllers/karyaController.js
 * CRUD karya ilmiah + Supabase Storage upload
 * Supabase tables: karya_ilmiah, media_files
 */

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const STORAGE_BUCKET = 'karya-files';

// ── GET ALL — publik ──────────────────────────────────────────────
// GET /api/karya?q=&jenis=&prodi=&tahun=&pembimbing=&page=1&limit=20
exports.getAll = async (req, res) => {
  try {
    const { q, jenis, prodi, tahun, pembimbing, page = 1, limit = 20 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    let query = supabase
      .from('karya_ilmiah')
      .select(`
        id, judul, penulis:users(nama), prodi:program_studi(nama),
        tahun, jenis, pembimbing, abstrak, kata_kunci,
        no_panggil, pembaca, status
      `, { count: 'exact' })
      .eq('status', 'disetujui')
      .order('created_at', { ascending: false })
      .range(offset, offset + Number(limit) - 1);

    // Full-text search (GIN index)
    if (q) query = query.textSearch('fts', q, { config: 'indonesian' });
    if (jenis)       query = query.eq('jenis', jenis);
    if (prodi)       query = query.eq('prodi_id', prodi);
    if (tahun)       query = query.eq('tahun', Number(tahun));
    if (pembimbing)  query = query.ilike('pembimbing', `%${pembimbing}%`);

    const { data, error, count } = await query;
    if (error) throw error;

    res.json({ data, total: count, page: Number(page), limit: Number(limit) });
  } catch (err) {
    console.error('karya.getAll error:', err);
    res.status(500).json({ error: 'Gagal mengambil data karya' });
  }
};

// ── GET BY ID — publik ────────────────────────────────────────────
// GET /api/karya/:id
exports.getById = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('karya_ilmiah')
      .select(`
        id, judul, penulis:users(nama, nim_nidn),
        prodi:program_studi(nama), tahun, jenis, pembimbing,
        abstrak, kata_kunci, no_panggil, pembaca, link, status,
        media_files(id, tipe, url, nama_file)
      `)
      .eq('id', req.params.id)
      .eq('status', 'disetujui')
      .single();

    if (error || !data) return res.status(404).json({ error: 'Karya tidak ditemukan' });

    // Increment view count (fire & forget)
    supabase.from('karya_ilmiah').update({ pembaca: (data.pembaca || 0) + 1 }).eq('id', req.params.id);

    res.json(data);
  } catch (err) {
    console.error('karya.getById error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ── GET MILIK SAYA — mahasiswa ────────────────────────────────────
// GET /api/karya/me (requireAuth)
exports.getMilikSaya = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('karya_ilmiah')
      .select(`
        id, judul, jenis, tahun, status, pembimbing,
        no_panggil, catatan_revisi,
        media_files(id, tipe, url)
      `)
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error('karya.getMilikSaya error:', err);
    res.status(500).json({ error: 'Gagal mengambil karya' });
  }
};

// ── CREATE — mahasiswa ────────────────────────────────────────────
// POST /api/karya (multipart/form-data)
// Fields: judul, abstrak, kata_kunci, tahun, jenis, pembimbing, prodi_id, link, no_panggil
// Files: file_pdf, foto[], video
exports.create = async (req, res) => {
  try {
    const { judul, abstrak, kata_kunci, tahun, jenis, pembimbing, prodi_id, link, no_panggil } = req.body;

    // Validasi wajib
    if (!judul || !abstrak || !tahun || !jenis || !pembimbing || !prodi_id) {
      return res.status(400).json({ error: 'Field judul, abstrak, tahun, jenis, pembimbing, prodi wajib diisi' });
    }

    // Insert karya
    const kataKunciArr = typeof kata_kunci === 'string'
      ? kata_kunci.split(',').map(k => k.trim()).filter(Boolean)
      : (kata_kunci || []);

    const { data: karya, error: karyaErr } = await supabase
      .from('karya_ilmiah')
      .insert({
        user_id:    req.user.id,
        prodi_id,
        judul,
        abstrak,
        kata_kunci: kataKunciArr,
        tahun:      Number(tahun),
        jenis,
        pembimbing,
        link:       link || null,
        no_panggil: no_panggil || null,
        status:     'pending',
      })
      .select('id')
      .single();

    if (karyaErr) throw karyaErr;

    // Upload files ke Supabase Storage
    const mediaInserts = [];
    const files = req.files || {};

    // PDF
    if (files.file_pdf?.[0]) {
      const f = files.file_pdf[0];
      const path = `${karya.id}/pdf/${Date.now()}_${f.originalname}`;
      const { error: upErr } = await supabase.storage.from(STORAGE_BUCKET).upload(path, f.buffer, { contentType: f.mimetype });
      if (!upErr) {
        const { data: { publicUrl } } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
        mediaInserts.push({ karya_id: karya.id, tipe: 'pdf', url: publicUrl, nama_file: f.originalname });
      }
    }

    // Foto
    for (const f of (files.foto || [])) {
      const path = `${karya.id}/foto/${Date.now()}_${f.originalname}`;
      const { error: upErr } = await supabase.storage.from(STORAGE_BUCKET).upload(path, f.buffer, { contentType: f.mimetype });
      if (!upErr) {
        const { data: { publicUrl } } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
        mediaInserts.push({ karya_id: karya.id, tipe: 'foto', url: publicUrl, nama_file: f.originalname });
      }
    }

    // Video
    if (files.video?.[0]) {
      const f = files.video[0];
      const path = `${karya.id}/video/${Date.now()}_${f.originalname}`;
      const { error: upErr } = await supabase.storage.from(STORAGE_BUCKET).upload(path, f.buffer, { contentType: f.mimetype });
      if (!upErr) {
        const { data: { publicUrl } } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
        mediaInserts.push({ karya_id: karya.id, tipe: 'video', url: publicUrl, nama_file: f.originalname });
      }
    }

    if (mediaInserts.length > 0) {
      await supabase.from('media_files').insert(mediaInserts);
    }

    res.status(201).json({ id: karya.id, status: 'pending', message: 'Karya berhasil diunggah, menunggu verifikasi.' });
  } catch (err) {
    console.error('karya.create error:', err);
    res.status(500).json({ error: 'Gagal mengunggah karya' });
  }
};
