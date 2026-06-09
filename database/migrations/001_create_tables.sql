-- =====================================================
-- DIGILAB Repository — Supabase (PostgreSQL) Schema
-- Versi: 1.1.0 | Tanggal: 2026-06-09
-- Jalankan di: Supabase Dashboard → SQL Editor
-- =====================================================

-- ─── Program Studi ───
CREATE TABLE IF NOT EXISTS program_studi (
  id         SERIAL PRIMARY KEY,
  kode       VARCHAR(10) NOT NULL UNIQUE,
  nama       VARCHAR(100) NOT NULL,
  jenjang    VARCHAR(5) NOT NULL DEFAULT 'D4',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Users (extend Supabase Auth) ───
CREATE TABLE IF NOT EXISTS users (
  id           UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nim_nidn     VARCHAR(20) UNIQUE,
  nama         VARCHAR(150) NOT NULL,
  role         VARCHAR(20) NOT NULL DEFAULT 'mahasiswa',
  prodi_id     INT REFERENCES program_studi(id) ON DELETE SET NULL,
  foto_profil  TEXT,
  is_active    BOOLEAN DEFAULT TRUE,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Kategori ───
CREATE TABLE IF NOT EXISTS kategori (
  id   SERIAL PRIMARY KEY,
  nama VARCHAR(50) NOT NULL UNIQUE
);

-- ─── Karya Ilmiah ───
CREATE TABLE IF NOT EXISTS karya_ilmiah (
  id             SERIAL PRIMARY KEY,
  judul          VARCHAR(300) NOT NULL,
  abstrak        TEXT,
  kata_kunci     VARCHAR(300),
  tahun          SMALLINT NOT NULL,
  jenis          VARCHAR(50) NOT NULL DEFAULT 'skripsi',
  bahasa         VARCHAR(10) DEFAULT 'id',
  no_panggil     VARCHAR(50),
  bidang         VARCHAR(100),
  status         VARCHAR(20) NOT NULL DEFAULT 'pending',
  penulis_id     UUID NOT NULL REFERENCES users(id),
  prodi_id       INT REFERENCES program_studi(id) ON DELETE SET NULL,
  kategori_id    INT REFERENCES kategori(id) ON DELETE SET NULL,
  dosen_pembimbing VARCHAR(150),
  catatan_admin  TEXT,
  views          INT DEFAULT 0,
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  updated_at     TIMESTAMPTZ DEFAULT NOW()
);

-- Full-text search index
CREATE INDEX IF NOT EXISTS idx_karya_fts
  ON karya_ilmiah USING GIN (
    to_tsvector('indonesian', coalesce(judul,'') || ' ' || coalesce(abstrak,'') || ' ' || coalesce(kata_kunci,''))
  );

-- ─── Media Files (Supabase Storage) ───
CREATE TABLE IF NOT EXISTS media_files (
  id          SERIAL PRIMARY KEY,
  karya_id    INT NOT NULL REFERENCES karya_ilmiah(id) ON DELETE CASCADE,
  tipe        VARCHAR(20) NOT NULL,  -- 'dokumen' | 'foto' | 'video'
  nama_file   VARCHAR(255) NOT NULL,
  storage_path TEXT NOT NULL,        -- path di Supabase Storage bucket
  ukuran_kb   INT,
  mime_type   VARCHAR(100),
  urutan      SMALLINT DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Log Verifikasi ───
CREATE TABLE IF NOT EXISTS log_verifikasi (
  id         SERIAL PRIMARY KEY,
  karya_id   INT NOT NULL REFERENCES karya_ilmiah(id),
  admin_id   UUID NOT NULL REFERENCES users(id),
  aksi       VARCHAR(20) NOT NULL,  -- 'disetujui' | 'ditolak' | 'revisi'
  catatan    TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Row Level Security (RLS) ───
ALTER TABLE karya_ilmiah ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_files ENABLE ROW LEVEL SECURITY;

-- Karya yang sudah disetujui bisa dilihat semua orang
CREATE POLICY "Karya disetujui publik" ON karya_ilmiah
  FOR SELECT USING (status = 'disetujui');

-- User hanya bisa lihat/edit karya sendiri
CREATE POLICY "User lihat karya sendiri" ON karya_ilmiah
  FOR ALL USING (auth.uid() = penulis_id);

-- ─── Seed: Program Studi Fakultas Vokasi UM ───
INSERT INTO program_studi (kode, nama, jenjang) VALUES
  ('D3-AK',  'D3 Akuntansi', 'D3'),
  ('D3-ADP', 'D3 Administrasi Perkantoran', 'D3'),
  ('D3-MP',  'D3 Manajemen Pemasaran', 'D3'),
  ('D4-AK',  'D4 Akuntansi', 'D4'),
  ('D4-MO',  'D4 Manajemen Operasional', 'D4'),
  ('D4-TI',  'D4 Teknologi Informasi', 'D4'),
  ('D4-DKV', 'D4 Desain Komunikasi Visual', 'D4'),
  ('D4-TM',  'D4 Teknik Mesin', 'D4'),
  ('D4-TE',  'D4 Teknik Elektro', 'D4'),
  ('D4-TB',  'D4 Teknologi Bangunan', 'D4'),
  ('D4-PD',  'D4 Perpustakaan Digital', 'D4')
ON CONFLICT (kode) DO NOTHING;

-- ─── Seed: Kategori ───
INSERT INTO kategori (nama) VALUES
  ('Tugas Akhir'), ('Laporan PKL'), ('Proyek Inovasi'),
  ('Produk Kreatif'), ('Penelitian'), ('Lainnya')
ON CONFLICT (nama) DO NOTHING;
