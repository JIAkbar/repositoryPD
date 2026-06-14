/**
 * controllers/prodiController.js
 * Supabase table: program_studi
 */

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// GET /api/prodi — publik, untuk dropdown form upload & filter
exports.getAll = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('program_studi')
      .select('id, nama, kode, jenjang')
      .order('jenjang')
      .order('nama');

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error('prodi.getAll error:', err);
    res.status(500).json({ error: 'Gagal mengambil data program studi' });
  }
};
