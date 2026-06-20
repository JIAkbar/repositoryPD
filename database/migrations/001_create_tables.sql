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
  foto_profil  TEXT,                              -- alias lama, tetap untuk kompatibilitas
  foto_url     TEXT DEFAULT NULL,              -- URL foto profil dari Supabase Storage (bucket: avatars)
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
  ('D4-PD',   'D4 Perpustakaan Digital', 'D4'),
  ('D4-AN',   'D4 Animasi', 'D4'),
  ('D4-MP',   'D4 Manajemen Pemasaran', 'D4'),
  ('D4-AK',   'D4 Akuntansi', 'D4'),
  ('D4-TB',   'D4 Tata Boga', 'D4'),
  ('D4-DM',   'D4 Desain Mode', 'D4'),
  ('D4-TRBS', 'D4 Teknologi Rekayasa dan Pemeliharaan Bangunan Sipil', 'D4'),
  ('D4-TRBM', 'D4 Teknologi Rekayasa Bangunan Manufaktur', 'D4'),
  ('D4-TRO',  'D4 Teknologi Rekayasa Otomotif', 'D4'),
  ('D4-TRPE', 'D4 Teknologi Rekayasa Pembangkit Energi', 'D4'),
  ('D4-TRSE', 'D4 Teknologi Rekayasa Sistem Elektronika', 'D4')
ON CONFLICT (kode) DO NOTHING;

-- ─── Seed: Kategori ───
INSERT INTO kategori (nama) VALUES
  ('Tugas Akhir'), ('Artikel Jurnal'), ('Laporan Magang'),
  ('Proyek Inovasi'), ('Produk Kreatif'), ('Lainnya')
ON CONFLICT (nama) DO NOTHING;

-- ── Dosen Pembimbing ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.dosen_pembimbing (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  nama        TEXT        NOT NULL UNIQUE,
  nidn        TEXT,
  email       TEXT,
  prodi_id    TEXT        REFERENCES public.program_studi(kode) ON DELETE SET NULL,
  aktif       BOOLEAN     DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Index untuk pencarian nama
CREATE INDEX IF NOT EXISTS idx_dosen_nama ON public.dosen_pembimbing(nama);

-- RLS
ALTER TABLE public.dosen_pembimbing ENABLE ROW LEVEL SECURITY;

-- Semua user bisa baca dosen yang aktif
CREATE POLICY "dosen_public_read" ON public.dosen_pembimbing
  FOR SELECT USING (aktif = TRUE);

-- Hanya admin/pustakawan yang bisa insert/update/delete
CREATE POLICY "dosen_admin_write" ON public.dosen_pembimbing
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.users u
      WHERE u.id = auth.uid()
      AND u.role IN ('admin', 'pustakawan')
    )
  );

-- Catatan: kolom karya_ilmiah.dosen_pembimbing (VARCHAR 150) menyimpan nama dosen
-- sebagai teks bebas untuk kemudahan. Saat migrasi ke relasi FK, jalankan:
--   ALTER TABLE karya_ilmiah
--     ADD COLUMN dosen_pembimbing_id UUID REFERENCES public.dosen_pembimbing(id);

-- ═══════════════════════════════════════════════════════════════════════════════
-- SUPABASE STORAGE — Bucket "avatars" (jalankan setup via Dashboard / CLI)
-- ═══════════════════════════════════════════════════════════════════════════════
-- 1. Buat bucket "avatars" di Supabase Dashboard → Storage → New Bucket
--    Nama    : avatars
--    Public  : TRUE  (foto profil bisa diakses publik tanpa auth)
--
-- 2. RLS Policies untuk bucket avatars:
--    a) INSERT  : auth.uid()::text = (storage.foldername(name))[1]
--       (user hanya bisa upload ke folder miliknya sendiri)
--    b) UPDATE  : auth.uid()::text = (storage.foldername(name))[1]
--       (user hanya bisa replace foto miliknya sendiri)
--    c) SELECT  : true
--       (semua orang bisa melihat foto profil — public bucket)
--    d) DELETE  : auth.uid()::text = (storage.foldername(name))[1]
--       (user bisa hapus foto miliknya sendiri)
--
-- 3. Path format yang digunakan:
--    avatars/{user_id}/profile.jpg   ← foto profil utama
--    avatars/{user_id}/profile.png   ← alternatif format
--    Contoh URL publik:
--    https://<project>.supabase.co/storage/v1/object/public/avatars/{user_id}/profile.jpg
--
-- 4. Setelah upload via frontend, simpan URL ke kolom users.foto_url:
--    UPDATE public.users SET foto_url = '<public_url>' WHERE id = auth.uid();
--
-- 5. Untuk delete + replace foto lama, gunakan Supabase Storage upsert:
--    supabase.storage.from('avatars').upload(path, file, { upsert: true })
-- ═══════════════════════════════════════════════════════════════════════════════
