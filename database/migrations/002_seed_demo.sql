-- =====================================================
-- DIGILAB Repository — Demo Seed Data
-- Versi: 1.0.0 | Tanggal: 2026-06-13
-- Jalankan SETELAH 001_create_tables.sql
--
-- ⚠️  PENTING: Seed ini adalah sumber data yang sama
-- dengan dummy data di frontend (KARYA_DATA, DUMMY_KARYA, dll).
-- Tujuan: agar tampilan tetap berisi data setelah backend aktif.
--
-- Cara jalankan:
-- 1. Supabase Dashboard → SQL Editor → paste & run
-- 2. Atau: supabase db push (jika pakai CLI)
--
-- UUID demo sudah di-hardcode agar konsisten antar run.
-- Ganti dengan UUID asli dari Supabase Auth saat production.
-- =====================================================


-- ─── 1. Demo Users (hardcoded UUID untuk konsistensi) ───
-- Catatan: di production, UUID harus match auth.users dari Supabase Auth.
-- Untuk keperluan demo/development, insert langsung ke tabel users
-- dengan UUID yang sudah diketahui.

INSERT INTO users (id, nim_nidn, nama, role, prodi_id, is_active, foto_url) VALUES
  -- Admin / pustakawan
  (
    '00000000-0000-0000-0000-000000000001',
    '0023039202',
    'Achmad Hamdan, S.Pd., M.Pd.',
    'admin',
    (SELECT id FROM program_studi WHERE kode = 'D4-PD'),
    true,
    NULL
  ),
  -- Mahasiswa demo 1 (Natasya — penulis karya di mahasiswa.html)
  (
    '00000000-0000-0000-0000-000000000002',
    '220213704262',
    'Natasya Adelia R.',
    'mahasiswa',
    (SELECT id FROM program_studi WHERE kode = 'D4-PD'),
    true,
    NULL
  ),
  -- Mahasiswa demo 2–5 (untuk tabel verifikasi akun di admin.html)
  (
    '00000000-0000-0000-0000-000000000003',
    '230213704301',
    'Bima Saputra',
    'mahasiswa',
    (SELECT id FROM program_studi WHERE kode = 'D4-TRSE'),   -- D4 Teknologi Rekayasa Sistem Elektronika
    true,
    NULL
  ),
  (
    '00000000-0000-0000-0000-000000000004',
    '230213704302',
    'Laila Fitriani',
    'mahasiswa',
    (SELECT id FROM program_studi WHERE kode = 'D4-MP'),  -- D4 Manajemen Pemasaran
    true,
    NULL
  ),
  (
    '00000000-0000-0000-0000-000000000005',
    '230213704303',
    'Rizal Hidayatullah',
    'mahasiswa',
    (SELECT id FROM program_studi WHERE kode = 'D4-AK'),   -- D4 Akuntansi
    true,
    NULL
  ),
  (
    '00000000-0000-0000-0000-000000000006',
    '220213704280',
    'Dwi Kurniawati',
    'mahasiswa',
    (SELECT id FROM program_studi WHERE kode = 'D4-MP'),  -- D4 Manajemen Pemasaran
    true,
    NULL
  ),
  (
    '00000000-0000-0000-0000-000000000007',
    '220213704281',
    'Fajar Nugroho',
    'mahasiswa',
    (SELECT id FROM program_studi WHERE kode = 'D4-MP'),   -- D4 Manajemen Pemasaran
    true,
    NULL
  ),
  -- Penulis karya ilmiah (dari KARYA_DATA index.html)
  (
    '00000000-0000-0000-0000-000000000010',
    '190213700001',
    'Karina Aliya',
    'mahasiswa',
    (SELECT id FROM program_studi WHERE kode = 'D4-PD'),
    true,
    NULL
  ),
  (
    '00000000-0000-0000-0000-000000000011',
    '190213700002',
    'Hartono',
    'mahasiswa',
    (SELECT id FROM program_studi WHERE kode = 'D4-TRSE'),
    true,
    NULL
  ),
  (
    '00000000-0000-0000-0000-000000000012',
    '190213700003',
    'Suherman',
    'mahasiswa',
    (SELECT id FROM program_studi WHERE kode = 'D4-TRO'),
    true,
    NULL
  ),
  (
    '00000000-0000-0000-0000-000000000013',
    '200213700001',
    'Dewi Rahayu',
    'mahasiswa',
    (SELECT id FROM program_studi WHERE kode = 'D4-TRSE'),
    true,
    NULL
  ),
  (
    '00000000-0000-0000-0000-000000000014',
    '200213700002',
    'Ahmad Fauzi',
    'mahasiswa',
    (SELECT id FROM program_studi WHERE kode = 'D4-DM'),
    true,
    NULL
  ),
  (
    '00000000-0000-0000-0000-000000000015',
    '200213700003',
    'Rizki Amalia',
    'mahasiswa',
    (SELECT id FROM program_studi WHERE kode = 'D4-AK'),
    true,
    NULL
  )
ON CONFLICT (id) DO NOTHING;


-- ─── 2. Karya Ilmiah Demo (dari KARYA_DATA di docs/index.html) ───
-- Field mapping:
--   judul       → judul
--   penulis     → (nama di tabel users, referensi via penulis_id)
--   dosen       → dosen_pembimbing
--   tahun       → tahun
--   jenis       → jenis
--   noPanggil   → no_panggil
--   bidang      → bidang
--   pembaca     → views
--   abstrak     → abstrak
--   status      → 'disetujui' (sudah lulus, tampil di publik)

INSERT INTO karya_ilmiah
  (judul, abstrak, kata_kunci, tahun, jenis, no_panggil, bidang, status,
   penulis_id, prodi_id, kategori_id, dosen_pembimbing, views)
VALUES
  (
    'Rancang Bangun Website Perpustakaan Keliling',
    'Penelitian ini membahas perancangan dan pengembangan website perpustakaan keliling yang bertujuan memudahkan akses informasi bagi masyarakat. Sistem ini dikembangkan dengan pendekatan RAD dan mengintegrasikan fitur katalog digital, peminjaman online, serta notifikasi koleksi baru. Pengujian melalui validasi ahli dan uji pengguna menunjukkan tingkat kelayakan tinggi.',
    'website, perpustakaan, keliling, katalog digital, RAD',
    2020, 'Tugas Akhir', 'KAR/PD/TA/RAN/2020', 'WEBSITE — PERPUSTAKAAN', 'disetujui',
    '00000000-0000-0000-0000-000000000010',
    (SELECT id FROM program_studi WHERE kode = 'D4-PD'),
    (SELECT id FROM kategori WHERE nama = 'Tugas Akhir'),
    'Candra Ariawan, S.Kom., M.Kom.',
    20
  ),
  (
    'Rancang Bangun Website Laundry Berbasis Lokasi',
    'Sistem ini dirancang untuk memudahkan pengguna menemukan jasa laundry terdekat menggunakan teknologi GPS dan Google Maps API. Fitur utama meliputi pencarian berbasis jarak, pemesanan online, notifikasi status cucian, dan sistem pembayaran digital. Hasil pengujian blackbox menunjukkan seluruh fungsi berjalan sesuai spesifikasi.',
    'website, laundry, lokasi, GPS, Google Maps',
    2021, 'Tugas Akhir', 'HAR/TI/TA/RAN/2021', 'WEBSITE — TEKNOLOGI INFORMASI', 'disetujui',
    '00000000-0000-0000-0000-000000000011',
    (SELECT id FROM program_studi WHERE kode = 'D4-TRSE'),
    (SELECT id FROM kategori WHERE nama = 'Tugas Akhir'),
    'Dr. Budi Santoso, M.T.',
    34
  ),
  (
    'Rancang Bangun Mesin Pengolah Limbah Tekstil Ramah Lingkungan',
    'Penelitian ini mengembangkan prototipe mesin pengolah limbah tekstil menggunakan prinsip daur ulang mekanik. Mesin mampu mengolah 50 kg limbah kain per jam menjadi serat daur ulang. Uji kinerja menunjukkan efisiensi konversi sebesar 78% dengan konsumsi energi lebih rendah dari metode konvensional.',
    'mesin, limbah tekstil, daur ulang, ramah lingkungan, prototipe',
    2022, 'Artikel Jurnal', 'SUH/TM/SKR/RAN/2022', 'TEKNIK MESIN — LINGKUNGAN', 'disetujui',
    '00000000-0000-0000-0000-000000000012',
    (SELECT id FROM program_studi WHERE kode = 'D4-TRO'),
    (SELECT id FROM kategori WHERE nama = 'Tugas Akhir'),
    'Prof. Ir. Ahmad Syukur, M.T.',
    5
  ),
  (
    'Sistem Informasi Akademik Terintegrasi Berbasis Cloud',
    'Platform akademik berbasis cloud yang mengintegrasikan manajemen mahasiswa, jadwal, nilai, dan komunikasi dalam satu ekosistem terpadu. Dibangun dengan arsitektur microservices menggunakan Node.js dan PostgreSQL. Load testing menunjukkan sistem mampu menangani 500 pengguna konkuren tanpa degradasi performa.',
    'sistem informasi, akademik, cloud, microservices, Node.js',
    2023, 'Tugas Akhir', 'DEW/TI/TA/SIS/2023', 'SISTEM INFORMASI — AKADEMIK', 'disetujui',
    '00000000-0000-0000-0000-000000000013',
    (SELECT id FROM program_studi WHERE kode = 'D4-TRSE'),
    (SELECT id FROM kategori WHERE nama = 'Tugas Akhir'),
    'Dr. Wahyu Pratama, M.Kom.',
    87
  ),
  (
    'Perancangan Identitas Visual Brand Produk UMKM Kota Malang',
    'Perancangan identitas visual komprehensif untuk lima produk UMKM unggulan Kota Malang mencakup logo, panduan merek, kemasan, dan materi pemasaran digital. Metodologi human-centered design digunakan untuk memastikan identitas visual autentik. Evaluasi menunjukkan peningkatan persepsi kualitas produk sebesar 65%.',
    'identitas visual, brand, UMKM, logo, desain komunikasi visual',
    2023, 'Tugas Akhir', 'FAU/DKV/TA/DES/2023', 'DESAIN KOMUNIKASI VISUAL', 'disetujui',
    '00000000-0000-0000-0000-000000000014',
    (SELECT id FROM program_studi WHERE kode = 'D4-DM'),
    (SELECT id FROM kategori WHERE nama = 'Tugas Akhir'),
    'Ir. Sinta Dewi, M.Ds.',
    43
  ),
  (
    'Analisis Efektivitas Pengelolaan Anggaran Daerah Kota Malang',
    'Penelitian menganalisis efektivitas pengelolaan anggaran daerah Kota Malang periode 2019–2023 menggunakan metode analisis rasio keuangan dan value for money. Temuan menunjukkan tingkat efektivitas rata-rata 89% dengan peningkatan konsistensi tiap tahun. Rekomendasi kebijakan dirumuskan untuk meningkatkan transparansi dan akuntabilitas.',
    'anggaran daerah, efektivitas, rasio keuangan, value for money, akuntansi',
    2023, 'Artikel Jurnal', 'RIZ/AK/SKR/ANA/2023', 'AKUNTANSI — KEUANGAN DAERAH', 'disetujui',
    '00000000-0000-0000-0000-000000000015',
    (SELECT id FROM program_studi WHERE kode = 'D4-AK'),
    (SELECT id FROM kategori WHERE nama = 'Tugas Akhir'),
    'Dr. Endang Wahyu, M.Ak.',
    62
  ),
  -- Karya milik Natasya (dari DUMMY_KARYA di mahasiswa.html)
  (
    'Laporan Magang Perpustakaan Bung Karno',
    'Laporan magang yang mendokumentasikan kegiatan dan pengalaman selama pelaksanaan praktik kerja lapangan di Perpustakaan Nasional Bung Karno.',
    'magang, perpustakaan, laporan, PKL',
    2024, 'Laporan Magang', 'ADE/PD/LM/LAP/2024', 'PERPUSTAKAAN DIGITAL', 'disetujui',
    '00000000-0000-0000-0000-000000000002',
    (SELECT id FROM program_studi WHERE kode = 'D4-PD'),
    (SELECT id FROM kategori WHERE nama = 'Laporan Magang'),
    'Hariyanto S.Pd., M.Pd.',
    12
  ),
  (
    'Implementasi Sistem Temu Kembali Informasi Berbasis Metadata Dublin Core',
    'Penelitian ini mengimplementasikan sistem temu kembali informasi menggunakan standar metadata Dublin Core untuk meningkatkan akurasi pencarian di repositori digital perguruan tinggi.',
    'temu kembali informasi, Dublin Core, metadata, repositori digital',
    2025, 'Tugas Akhir', 'ADE/PD/TA/IMP/2025', 'PERPUSTAKAAN DIGITAL', 'pending',
    '00000000-0000-0000-0000-000000000002',
    (SELECT id FROM program_studi WHERE kode = 'D4-PD'),
    (SELECT id FROM kategori WHERE nama = 'Tugas Akhir'),
    'Achmad Hamdan, S.Pd., M.Pd.',
    0
  )
ON CONFLICT DO NOTHING;


-- ─── 3. Status Akun (dari DUMMY_AKUN di admin.html) ───
-- Sinkron dengan status di frontend:
--   pending  → is_active = false (belum diverifikasi admin)
--   approved → is_active = true  (sudah aktif)
--   rejected → is_active = false (ditolak)
-- Catatan: di production, gunakan kolom status terpisah atau tabel verifikasi.

-- Pending (Bima, Laila, Rizal):
UPDATE users SET is_active = false
WHERE id IN (
  '00000000-0000-0000-0000-000000000003',
  '00000000-0000-0000-0000-000000000004',
  '00000000-0000-0000-0000-000000000005'
);

-- Approved (Dwi):
UPDATE users SET is_active = true
WHERE id = '00000000-0000-0000-0000-000000000006';

-- Rejected (Fajar):
UPDATE users SET is_active = false
WHERE id = '00000000-0000-0000-0000-000000000007';


-- ─── 4. Media Files Placeholder ───
-- Karya yang sudah disetujui seharusnya punya file PDF.
-- Ini placeholder path — file asli ada di Supabase Storage.

INSERT INTO media_files (karya_id, tipe, nama_file, storage_path, mime_type, urutan)
SELECT
  k.id,
  'dokumen',
  lower(regexp_replace(k.judul, '[^a-zA-Z0-9]', '-', 'g')) || '.pdf',
  'karya/' || k.id || '/dokumen.pdf',
  'application/pdf',
  1
FROM karya_ilmiah k
WHERE k.status = 'disetujui'
ON CONFLICT DO NOTHING;


-- ─── Verifikasi seed berhasil ───
SELECT 'program_studi' AS tabel, COUNT(*) AS jumlah FROM program_studi
UNION ALL
SELECT 'users',         COUNT(*) FROM users
UNION ALL
SELECT 'karya_ilmiah',  COUNT(*) FROM karya_ilmiah
UNION ALL
SELECT 'media_files',   COUNT(*) FROM media_files
UNION ALL
SELECT 'kategori',      COUNT(*) FROM kategori;

-- ── Seed: Dosen Pembimbing (72 item) ─────────────────────────────────────────
-- Data sinkron dengan window.MASTER_DOSEN di docs/data-master.js
-- Catatan: nama #46 (Dewi 'Izzatus Tsamroh) mengandung apostrof → di-escape jadi ''
INSERT INTO public.dosen_pembimbing (nama, aktif) VALUES
  ('Inawati, S.I.P., M.M.', TRUE),
  ('Dr. Sokhibul Ansor, S.Sos., M.Hum.', TRUE),
  ('Setiawan, S.Sos, M.IP', TRUE),
  ('Adi Prasetyawan, S.Sos, M.A.', TRUE),
  ('Lidya Amalia Rahmania, S.Kom, M.Kom', TRUE),
  ('Joko Samodra, S.Kom., M.T.', TRUE),
  ('Andy Pramono, S.Kom., M.T.', TRUE),
  ('Mitra Istiar Wardhana, S.Kom, M.T.', TRUE),
  ('Ima Kusumawati Hidayat, S.Sn., M.Ds.', TRUE),
  ('Nuril Kusuma Wardani, S.Sn., M.Ds.', TRUE),
  ('Dimas Rifky Novica, S.Sn., M.Ds.', TRUE),
  ('Arif Sutrisno, S.Sn., M.Ds.', TRUE),
  ('Bunga Fefiana Mustikasarii, S.Sn., M.Ds.', TRUE),
  ('Rayie Tariaranie Wiraguna SE.,MM', TRUE),
  ('Dr. Ely siswanto S.Sos.,MM', TRUE),
  ('Handri dian S.Pd.,M.Sc', TRUE),
  ('Della Ayu zonna Lia S.AB.,M.AB', TRUE),
  ('Safira Rusyida SE.,M.MT', TRUE),
  ('Ababil Karhoma Wijaya SE.,M.SM', TRUE),
  ('Cesya Rizkika S.E. M.BA', TRUE),
  ('Arum prasasti SE.,MSc', TRUE),
  ('Ferby Mutia Edwy, S.E., M.Ak', TRUE),
  ('Aulia Azzardina, S.E., M.Sc', TRUE),
  ('Meirna Puspita Permatasari, S.E., M.Ak', TRUE),
  ('Muhammad, S.E., M.S.A., Ak., CSRS', TRUE),
  ('Fitri Purnamasari, S.E., M.S.A', TRUE),
  ('Inanda Shinta Anugrahani, S.E., M.A', TRUE),
  ('Dr. Muchammad Harly, S.T., M.T.', TRUE),
  ('Windra Irdianto, S.Pd., M.Pd.', TRUE),
  ('Ir. M. Ihwanudin, S.Pd., M.Pd.', TRUE),
  ('Drs. Eddy Rudiyanto, M.Pd.', TRUE),
  ('Fuad Indra Kusuma, S.Pd., M.Pd.', TRUE),
  ('Drs. Nemesius Bambang Revantoro, M.T.', TRUE),
  ('Apif Miptahul Hajji, S.T., M.T., M.Sc., Ph.D.', TRUE),
  ('Pranoto, S.T., M.T.', TRUE),
  ('Viola Malta Ramadhani, S.T., M.Ars.', TRUE),
  ('Achmad Saiful Arifin, S.Pd, M.T.', TRUE),
  ('Prabowo, S.T., M.T.', TRUE),
  ('Ika Salsabila Nurahida, S.Tr.T, M.T.', TRUE),
  ('Rais Amin, S.Pd, M.Pd', TRUE),
  ('Obaja Eden Sentosa Riyanto, S.S.T., M.Sc.', TRUE),
  ('Drs. Abdul Qolik, M.Pd', TRUE),
  ('Drs. Imam Sudjono, M.T.', TRUE),
  ('Riana Nurmalasari, S.Pd., M.Pd.', TRUE),
  ('Ir. Didin Zakariya Lubis, S.Pd, M.Eng', TRUE),
  ('Dewi ''Izzatus Tsamroh, S.Pd., M.T.', TRUE),
  ('Drs. Wahono, M.Pd', TRUE),
  ('Muhammad Ilman Nur Sasongko, S.Pd., M.T.', TRUE),
  ('Sis Nanda Kus Andrianto, S.T., S.H., M.T.', TRUE),
  ('Jibril Maulana, S.T., M.T.', TRUE),
  ('Drs. Slamet Wibawanto, M.T.', TRUE),
  ('Ir. Arya Kusumawardana, S.Pd., M.T.', TRUE),
  ('Misbahul Munir, S.T., M.T.', TRUE),
  ('Ir. Muhammad Afnan Habibi, S.T., M.T., M.Eng.', TRUE),
  ('Royb Fatkhur Rizal, M.Eng.', TRUE),
  ('Singgih Dwi Prasetyo, S.T., M.T.', TRUE),
  ('Soraya Norma Mustika, S.T.,M.T., M.Sc', TRUE),
  ('Dr. Muladi, S.T., M.T.', TRUE),
  ('Achmad Hamdan, S.Pd, M.Pd', TRUE),
  ('Satrio Dwi Sanjaya, S.T., M.Sc.', TRUE),
  ('Dra. Wiwik Wahyuni, M.Pd.', TRUE),
  ('Dr. Mazarina Devi, M.Si.', TRUE),
  ('Dr. Ir. Soenar Soekopitojo, M.Si.', TRUE),
  ('Nonny Aji Sunaryo, S.Pd., M.Par.', TRUE),
  ('Arzendy Berlian Sabrina, S.Pd., M.Par.', TRUE),
  ('Chintya Paramita Puspita, S.Pd., M.Pd.', TRUE),
  ('Dr. Nurul Hidayati, S.Pd., M.Sn', TRUE),
  ('Dr. Agus Sunandar, S.Pd., M.Sn', TRUE),
  ('Dra. Sri Eko Puji Rahayu, M.Si', TRUE),
  ('Rizky Yulianingrum, S.Pd., M.Pd', TRUE),
  ('Ajeng Atma Kusuma, S.Pd., M.Pd', TRUE),
  ('Rizka Sarah Heydarian Fatima, S.Pd., M.Pd', TRUE)
ON CONFLICT (nama) DO NOTHING;

-- Verifikasi tambahan
SELECT 'dosen_pembimbing' AS tabel, COUNT(*) AS jumlah FROM public.dosen_pembimbing;
