-- =====================================================
-- DIGILAB Repository — Seed 20 Karya (Sinkron KARYA_DATA frontend)
-- Versi: 1.0.0 | Tanggal: 2026-06-21
-- Jalankan SETELAH 001_create_tables.sql, 004_grants.sql
-- ON CONFLICT DO NOTHING — aman dijalankan ulang
-- =====================================================

-- ─── Auth Users (WAJIB sebelum INSERT ke public.users) ───
-- public.users punya FK ke auth.users(id), jadi harus ada dulu
INSERT INTO auth.users (
  id, instance_id, email, encrypted_password,
  email_confirmed_at, raw_user_meta_data,
  role, aud, created_at, updated_at
) VALUES
  ('00000000-0000-0000-0000-000000000021','00000000-0000-0000-0000-000000000000','user021@demo.local',crypt('Demo12345!',gen_salt('bf')),NOW(),'{"nama":"Dinda Pratiwi","role":"mahasiswa"}'::jsonb,'authenticated','authenticated',NOW(),NOW()),
  ('00000000-0000-0000-0000-000000000022','00000000-0000-0000-0000-000000000000','user022@demo.local',crypt('Demo12345!',gen_salt('bf')),NOW(),'{"nama":"Reza Kurniawan","role":"mahasiswa"}'::jsonb,'authenticated','authenticated',NOW(),NOW()),
  ('00000000-0000-0000-0000-000000000023','00000000-0000-0000-0000-000000000000','user023@demo.local',crypt('Demo12345!',gen_salt('bf')),NOW(),'{"nama":"Indra Setiawan","role":"mahasiswa"}'::jsonb,'authenticated','authenticated',NOW(),NOW()),
  ('00000000-0000-0000-0000-000000000024','00000000-0000-0000-0000-000000000000','user024@demo.local',crypt('Demo12345!',gen_salt('bf')),NOW(),'{"nama":"Ayu Puspita","role":"mahasiswa"}'::jsonb,'authenticated','authenticated',NOW(),NOW()),
  ('00000000-0000-0000-0000-000000000025','00000000-0000-0000-0000-000000000000','user025@demo.local',crypt('Demo12345!',gen_salt('bf')),NOW(),'{"nama":"Farhan Maulana","role":"mahasiswa"}'::jsonb,'authenticated','authenticated',NOW(),NOW()),
  ('00000000-0000-0000-0000-000000000026','00000000-0000-0000-0000-000000000000','user026@demo.local',crypt('Demo12345!',gen_salt('bf')),NOW(),'{"nama":"Novia Ramadhani","role":"mahasiswa"}'::jsonb,'authenticated','authenticated',NOW(),NOW()),
  ('00000000-0000-0000-0000-000000000027','00000000-0000-0000-0000-000000000000','user027@demo.local',crypt('Demo12345!',gen_salt('bf')),NOW(),'{"nama":"Bima Andreansyah","role":"mahasiswa"}'::jsonb,'authenticated','authenticated',NOW(),NOW()),
  ('00000000-0000-0000-0000-000000000028','00000000-0000-0000-0000-000000000000','user028@demo.local',crypt('Demo12345!',gen_salt('bf')),NOW(),'{"nama":"Cindy Permata","role":"mahasiswa"}'::jsonb,'authenticated','authenticated',NOW(),NOW()),
  ('00000000-0000-0000-0000-000000000029','00000000-0000-0000-0000-000000000000','user029@demo.local',crypt('Demo12345!',gen_salt('bf')),NOW(),'{"nama":"Yoga Pratama","role":"mahasiswa"}'::jsonb,'authenticated','authenticated',NOW(),NOW()),
  ('00000000-0000-0000-0000-000000000030','00000000-0000-0000-0000-000000000000','user030@demo.local',crypt('Demo12345!',gen_salt('bf')),NOW(),'{"nama":"Rina Susanti","role":"mahasiswa"}'::jsonb,'authenticated','authenticated',NOW(),NOW()),
  ('00000000-0000-0000-0000-000000000031','00000000-0000-0000-0000-000000000000','user031@demo.local',crypt('Demo12345!',gen_salt('bf')),NOW(),'{"nama":"Wahyu Hidayat","role":"mahasiswa"}'::jsonb,'authenticated','authenticated',NOW(),NOW()),
  ('00000000-0000-0000-0000-000000000032','00000000-0000-0000-0000-000000000000','user032@demo.local',crypt('Demo12345!',gen_salt('bf')),NOW(),'{"nama":"Zahira Aulya","role":"mahasiswa"}'::jsonb,'authenticated','authenticated',NOW(),NOW()),
  ('00000000-0000-0000-0000-000000000033','00000000-0000-0000-0000-000000000000','user033@demo.local',crypt('Demo12345!',gen_salt('bf')),NOW(),'{"nama":"Mira Kusuma","role":"mahasiswa"}'::jsonb,'authenticated','authenticated',NOW(),NOW()),
  ('00000000-0000-0000-0000-000000000034','00000000-0000-0000-0000-000000000000','user034@demo.local',crypt('Demo12345!',gen_salt('bf')),NOW(),'{"nama":"Hendra Prasetya","role":"mahasiswa"}'::jsonb,'authenticated','authenticated',NOW(),NOW())
ON CONFLICT (id) DO NOTHING;

-- ─── Users baru (penulis karya #7–#20) ───
INSERT INTO users (id, nim_nidn, nama, role, prodi_id, is_active, foto_url) VALUES
  ('00000000-0000-0000-0000-000000000021', '210213700021', 'Dinda Pratiwi',      'mahasiswa', (SELECT id FROM program_studi WHERE kode='D4-AN'),   true, NULL),
  ('00000000-0000-0000-0000-000000000022', '210213700022', 'Reza Kurniawan',     'mahasiswa', (SELECT id FROM program_studi WHERE kode='D4-TB'),   true, NULL),
  ('00000000-0000-0000-0000-000000000023', '210213700023', 'Indra Setiawan',     'mahasiswa', (SELECT id FROM program_studi WHERE kode='D4-TRBS'), true, NULL),
  ('00000000-0000-0000-0000-000000000024', '210213700024', 'Ayu Puspita',        'mahasiswa', (SELECT id FROM program_studi WHERE kode='D4-TRBM'), true, NULL),
  ('00000000-0000-0000-0000-000000000025', '210213700025', 'Farhan Maulana',     'mahasiswa', (SELECT id FROM program_studi WHERE kode='D4-TRPE'), true, NULL),
  ('00000000-0000-0000-0000-000000000026', '210213700026', 'Novia Ramadhani',    'mahasiswa', (SELECT id FROM program_studi WHERE kode='D4-PD'),   true, NULL),
  ('00000000-0000-0000-0000-000000000027', '200213700027', 'Bima Andreansyah',   'mahasiswa', (SELECT id FROM program_studi WHERE kode='D4-AK'),   true, NULL),
  ('00000000-0000-0000-0000-000000000028', '210213700028', 'Cindy Permata',      'mahasiswa', (SELECT id FROM program_studi WHERE kode='D4-MP'),   true, NULL),
  ('00000000-0000-0000-0000-000000000029', '210213700029', 'Yoga Pratama',       'mahasiswa', (SELECT id FROM program_studi WHERE kode='D4-DM'),   true, NULL),
  ('00000000-0000-0000-0000-000000000030', '200213700030', 'Rina Susanti',       'mahasiswa', (SELECT id FROM program_studi WHERE kode='D4-TRO'),  true, NULL),
  ('00000000-0000-0000-0000-000000000031', '210213700031', 'Wahyu Hidayat',      'mahasiswa', (SELECT id FROM program_studi WHERE kode='D4-TRSE'), true, NULL),
  ('00000000-0000-0000-0000-000000000032', '210213700032', 'Zahira Aulya',       'mahasiswa', (SELECT id FROM program_studi WHERE kode='D4-AN'),   true, NULL),
  ('00000000-0000-0000-0000-000000000033', '210213700033', 'Mira Kusuma',        'mahasiswa', (SELECT id FROM program_studi WHERE kode='D4-TB'),   true, NULL),
  ('00000000-0000-0000-0000-000000000034', '210213700034', 'Hendra Prasetya',    'mahasiswa', (SELECT id FROM program_studi WHERE kode='D4-TRBS'), true, NULL)
ON CONFLICT (id) DO NOTHING;

-- ─── Hapus karya lama dari penulis ini (idempotent guard) ───
DELETE FROM karya_ilmiah WHERE penulis_id IN (
  '00000000-0000-0000-0000-000000000021','00000000-0000-0000-0000-000000000022',
  '00000000-0000-0000-0000-000000000023','00000000-0000-0000-0000-000000000024',
  '00000000-0000-0000-0000-000000000025','00000000-0000-0000-0000-000000000026',
  '00000000-0000-0000-0000-000000000027','00000000-0000-0000-0000-000000000028',
  '00000000-0000-0000-0000-000000000029','00000000-0000-0000-0000-000000000030',
  '00000000-0000-0000-0000-000000000031','00000000-0000-0000-0000-000000000032',
  '00000000-0000-0000-0000-000000000033','00000000-0000-0000-0000-000000000034'
);

-- ─── Karya #7–#20 (sinkron dengan window.KARYA_DATA frontend) ───
INSERT INTO karya_ilmiah (judul, abstrak, kata_kunci, tahun, jenis, no_panggil, bidang, status, penulis_id, prodi_id, kategori_id, dosen_pembimbing, views) VALUES
  (
    'Film Animasi Pendek "Nusantara Raya" Berbasis 3D Motion Capture',
    'Film animasi pendek berdurasi 8 menit mengangkat tema keberagaman budaya Indonesia melalui teknologi 3D motion capture. Proses produksi mencakup rigging karakter, pencahayaan sinematik, dan scoring musik tradisional yang diarransmen ulang secara digital.',
    'animasi 3D, motion capture, budaya Indonesia, film pendek',
    2024, 'Produk Kreatif', 'DIN/AN/PK/FIL/2024', 'ANIMASI — BUDAYA', 'disetujui',
    '00000000-0000-0000-0000-000000000021',
    (SELECT id FROM program_studi WHERE kode='D4-AN'),
    (SELECT id FROM kategori WHERE nama='Produk Kreatif'),
    'Ima Kusumawati Hidayat, S.Sn., M.Ds.', 124
  ),
  (
    'Analisis Standar Gizi Menu Makanan di Hotel Bintang 5 Surabaya',
    'Laporan magang di The Surabaya Grand Hotel selama 6 bulan, berfokus pada analisis kandungan gizi menu di 5 restoran berbintang. Meliputi metode perhitungan nilai gizi, pengendalian porsi, dan rekomendasi menu sesuai standar WHO.',
    'tata boga, gizi, hotel berbintang, menu makanan, standar kesehatan',
    2023, 'Laporan Magang', 'REZ/TB/LM/ANA/2023', 'TATA BOGA — GIZI', 'disetujui',
    '00000000-0000-0000-0000-000000000022',
    (SELECT id FROM program_studi WHERE kode='D4-TB'),
    (SELECT id FROM kategori WHERE nama='Laporan Magang'),
    'Dr. Mazarina Devi, M.Si.', 48
  ),
  (
    'Perancangan Sistem Drainase Ramah Lingkungan di Kawasan Perumahan Malang Selatan',
    'Penelitian ini merancang sistem drainase ramah lingkungan menggunakan konsep biopori dan sumur resapan untuk kawasan perumahan baru. Simulasi HEC-RAS menunjukkan penurunan debit banjir sebesar 43% dibandingkan sistem konvensional.',
    'drainase, biopori, banjir, perumahan, lingkungan',
    2023, 'Tugas Akhir', 'IND/TRBS/TA/PER/2023', 'BANGUNAN SIPIL — DRAINASE', 'disetujui',
    '00000000-0000-0000-0000-000000000023',
    (SELECT id FROM program_studi WHERE kode='D4-TRBS'),
    (SELECT id FROM kategori WHERE nama='Tugas Akhir'),
    'Apif Miptahul Hajji, S.T., M.T., M.Sc., Ph.D.', 67
  ),
  (
    'Optimasi Parameter Proses Welding pada Baja SS304 untuk Industri Manufaktur',
    'Pengaruh parameter arus, tegangan, dan kecepatan welding terhadap kualitas sambungan las pada baja SS304. Metode Taguchi dengan 9 kombinasi parameter menghasilkan kondisi optimal dengan kekuatan tarik 485 MPa.',
    'welding, baja SS304, Taguchi, optimasi, kekuatan tarik',
    2022, 'Artikel Jurnal', 'AYU/TRBM/AJ/OPT/2022', 'MANUFAKTUR — PENGELASAN', 'disetujui',
    '00000000-0000-0000-0000-000000000024',
    (SELECT id FROM program_studi WHERE kode='D4-TRBM'),
    (SELECT id FROM kategori WHERE nama='Artikel Jurnal'),
    'Singgih Dwi Prasetyo, S.T., M.T.', 89
  ),
  (
    'Desain Pembangkit Listrik Tenaga Surya Skala Rumah Tangga Off-Grid 2kW',
    'Perancangan dan implementasi sistem PLTS off-grid 2kW untuk rumah tangga di daerah terpencil. Sistem dilengkapi MPPT controller, baterai LiFePO4, dan monitoring IoT. Efisiensi sistem mencapai 87,3%.',
    'PLTS, solar panel, off-grid, MPPT, energi terbarukan',
    2024, 'Proyek Inovasi', 'FAR/TRPE/PI/DES/2024', 'ENERGI — TENAGA SURYA', 'disetujui',
    '00000000-0000-0000-0000-000000000025',
    (SELECT id FROM program_studi WHERE kode='D4-TRPE'),
    (SELECT id FROM kategori WHERE nama='Proyek Inovasi'),
    'Misbahul Munir, S.T., M.T.', 156
  ),
  (
    'Penerapan Machine Learning untuk Sistem Rekomendasi Buku Perpustakaan Daerah',
    'Sistem rekomendasi buku berbasis collaborative filtering SVD++ diuji pada 50.000 transaksi peminjaman perpustakaan daerah, menghasilkan precision@10 sebesar 0,78.',
    'machine learning, rekomendasi, collaborative filtering, perpustakaan, SVD',
    2024, 'Artikel Jurnal', 'NOV/PD/AJ/PEN/2024', 'PERPUSTAKAAN — MACHINE LEARNING', 'disetujui',
    '00000000-0000-0000-0000-000000000026',
    (SELECT id FROM program_studi WHERE kode='D4-PD'),
    (SELECT id FROM kategori WHERE nama='Artikel Jurnal'),
    'Dr. Sokhibul Ansor, S.Sos., M.Hum.', 93
  ),
  (
    'Implementasi SAP S/4HANA Modul FI-CO pada UKM Batik Kota Malang',
    'Implementasi modul Financial Accounting dan Controlling SAP S/4HANA di 3 UKM batik Kota Malang. Migrasi data dari sistem manual diselesaikan dalam 3 bulan dengan akurasi 98,7%.',
    'SAP, akuntansi, ERP, UKM, batik',
    2021, 'Tugas Akhir', 'BIM/AK/TA/IMP/2021', 'AKUNTANSI — ERP', 'disetujui',
    '00000000-0000-0000-0000-000000000027',
    (SELECT id FROM program_studi WHERE kode='D4-AK'),
    (SELECT id FROM kategori WHERE nama='Tugas Akhir'),
    'Aulia Azzardina, S.E., M.Sc', 71
  ),
  (
    'Strategi Pemasaran Digital UMKM Kuliner Malang di Era Post-Pandemi',
    'Analisis efektivitas strategi pemasaran digital 120 UMKM kuliner pasca pandemi. TikTok menghasilkan konversi 3,2x lebih tinggi dibanding Instagram untuk kuliner tradisional.',
    'pemasaran digital, UMKM, kuliner, TikTok, post-pandemi',
    2024, 'Artikel Jurnal', 'CIN/MP/AJ/STR/2024', 'PEMASARAN — DIGITAL MARKETING', 'disetujui',
    '00000000-0000-0000-0000-000000000028',
    (SELECT id FROM program_studi WHERE kode='D4-MP'),
    (SELECT id FROM kategori WHERE nama='Artikel Jurnal'),
    'Cesya Rizkika S.E. M.BA', 118
  ),
  (
    E'Koleksi Busana Ready-to-Wear Terinspirasi Motif Batik Malang "Singo Edan"',
    E'Koleksi 12 busana ready-to-wear menggabungkan motif batik Malang "Singo Edan" dengan siluet kontemporer. Uji pakai 20 responden menunjukkan penerimaan sangat baik pada estetika dan kenyamanan.',
    'busana, batik Malang, ready-to-wear, desain mode, Singo Edan',
    2023, 'Produk Kreatif', 'YOG/DM/PK/KOL/2023', 'DESAIN MODE — BATIK', 'disetujui',
    '00000000-0000-0000-0000-000000000029',
    (SELECT id FROM program_studi WHERE kode='D4-DM'),
    (SELECT id FROM kategori WHERE nama='Produk Kreatif'),
    'Dr. Nurul Hidayati, S.Pd., M.Sn', 82
  ),
  (
    'Rancang Bangun Sistem Pengujian Emisi Kendaraan Berbasis Arduino Mega 2560',
    'Alat pengujian emisi gas buang kendaraan berbasis Arduino Mega 2560 dengan sensor MQ-7 (CO), MQ-131 (O3), dan MG-811 (CO2). Validasi alat standar menunjukkan akurasi 94,2%.',
    'emisi kendaraan, Arduino, sensor gas, pengujian, otomotif',
    2022, 'Tugas Akhir', 'RIN/TRO/TA/RAN/2022', 'OTOMOTIF — EMISI', 'disetujui',
    '00000000-0000-0000-0000-000000000030',
    (SELECT id FROM program_studi WHERE kode='D4-TRO'),
    (SELECT id FROM kategori WHERE nama='Tugas Akhir'),
    'Ir. Didin Zakariya Lubis, S.Pd, M.Eng', 74
  ),
  (
    'Implementasi 5G Private Network di Kawasan Industri Surabaya',
    'Magang di PT Telkom Indonesia mendokumentasikan implementasi 5G Private Network untuk otomasi industri di SIER Surabaya. Mencakup network slicing, latency <5ms, dan integrasi SCADA.',
    '5G, private network, industri, network slicing, SCADA',
    2024, 'Laporan Magang', 'WAH/TRSE/LM/IMP/2024', 'ELEKTRONIKA — JARINGAN', 'disetujui',
    '00000000-0000-0000-0000-000000000031',
    (SELECT id FROM program_studi WHERE kode='D4-TRSE'),
    (SELECT id FROM kategori WHERE nama='Laporan Magang'),
    'Andy Pramono, S.Kom., M.T.', 137
  ),
  (
    'Analisis Penggunaan AI Generatif dalam Proses Praproduksi Animasi',
    'Kajian penggunaan AI generatif (Midjourney, DALL-E 3, Stable Diffusion) dalam praproduksi animasi. Survei 85 animator menunjukkan 76% menyatakan AI meningkatkan produktivitas praproduksi 40%.',
    'kecerdasan buatan, AI generatif, animasi, praproduksi, concept art',
    2023, 'Artikel Jurnal', 'ZAH/AN/AJ/ANA/2023', 'ANIMASI — KECERDASAN BUATAN', 'disetujui',
    '00000000-0000-0000-0000-000000000032',
    (SELECT id FROM program_studi WHERE kode='D4-AN'),
    (SELECT id FROM kategori WHERE nama='Artikel Jurnal'),
    'Dimas Rifky Novica, S.Sn., M.Ds.', 201
  ),
  (
    'Pengembangan Produk Bakery Berbasis Tepung Mocaf sebagai Alternatif Gluten-Free',
    'Pengembangan 5 produk bakery (croissant, danish, pain au chocolat, brioche, kouign-amann) menggunakan tepung mocaf. Uji organoleptik 40 panelis menunjukkan penerimaan baik pada rasa, tekstur, warna.',
    'bakery, mocaf, gluten-free, singkong, produk alternatif',
    2024, 'Produk Kreatif', 'MIR/TB/PK/PEN/2024', 'TATA BOGA — INOVASI PRODUK', 'disetujui',
    '00000000-0000-0000-0000-000000000033',
    (SELECT id FROM program_studi WHERE kode='D4-TB'),
    (SELECT id FROM kategori WHERE nama='Produk Kreatif'),
    'Dr. Ir. Soenar Soekopitojo, M.Si.', 96
  ),
  (
    'Pengawasan Mutu Konstruksi Gedung Bertingkat Proyek Pemerintah Jawa Timur',
    'Magang di PT Wijaya Karya (Persero) Tbk pada proyek gedung 12 lantai di Surabaya. Pengawasan kualitas beton (slump test, cube test), monitoring deformasi, dan dokumentasi NCR.',
    'konstruksi, pengawasan mutu, beton, gedung bertingkat, NCR',
    2023, 'Laporan Magang', 'HEN/TRBS/LM/PEN/2023', 'BANGUNAN SIPIL — KONSTRUKSI', 'disetujui',
    '00000000-0000-0000-0000-000000000034',
    (SELECT id FROM program_studi WHERE kode='D4-TRBS'),
    (SELECT id FROM kategori WHERE nama='Laporan Magang'),
    'Pranoto, S.T., M.T.', 59
  )
;

-- ─── Verifikasi ───
SELECT 'Total karya disetujui' AS label, COUNT(*) AS jumlah FROM karya_ilmiah WHERE status='disetujui';
SELECT 'Total users mahasiswa' AS label, COUNT(*) AS jumlah FROM users WHERE role='mahasiswa';
