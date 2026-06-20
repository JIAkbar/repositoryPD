-- =====================================================
-- DIGILAB Repository — Tambahan Seed 20 Karya
-- Versi: 1.0.0 | Tanggal: 2026-06-20
--
-- Jalankan SETELAH:
--   1. 001_create_tables.sql  (schema + prodi + kategori)
--   2. 002_seed_demo.sql      (users demo + 8 karya awal + 72 dosen)
--
-- File ini menambahkan:
--   - 5 users baru (prodi yang belum punya penulis)
--   - 12 karya baru → total 20 karya dalam sistem
--   - Media files placeholder untuk karya yg disetujui
--
-- Ringkasan 20 karya setelah import:
--   #01  D4-PD    Rancang Bangun Website Perpustakaan Keliling       (disetujui)
--   #02  D4-TRSE  Rancang Bangun Website Laundry Berbasis Lokasi     (disetujui)
--   #03  D4-TRO   Rancang Bangun Mesin Pengolah Limbah Tekstil       (disetujui)
--   #04  D4-TRSE  Sistem Informasi Akademik Terintegrasi Cloud       (disetujui)
--   #05  D4-DM    Perancangan Identitas Visual Brand UMKM            (disetujui)
--   #06  D4-AK    Analisis Efektivitas Pengelolaan Anggaran Daerah   (disetujui)
--   #07  D4-PD    Laporan Magang Perpustakaan Bung Karno             (disetujui)
--   #08  D4-PD    Implementasi Sistem Temu Kembali Dublin Core       (pending)
--   #09  D4-AN    Film Animasi 2D "Legenda Malang Kucecwara"         (disetujui)
--   #10  D4-TB    Inovasi Brownies Mocaf dan Ubi Ungu                (disetujui)
--   #11  D4-TRBS  Analisis Kinerja Struktur Bangunan Tahan Gempa     (disetujui)
--   #12  D4-TRBM  Rancang Bangun Mesin CNC Router Mini               (disetujui)
--   #13  D4-TRPE  Perancangan Sistem PLTS Atap 5 kWp                 (disetujui)
--   #14  D4-PD    Klasifikasi DDC Digital Berbasis Machine Learning  (disetujui)
--   #15  D4-MP    Strategi Pemasaran Digital dan Keputusan Pembelian (disetujui)
--   #16  D4-AK    Implementasi E-Faktur dan Dampaknya                (disetujui)
--   #17  D4-DM    Koleksi Busana Pesta "Nusantara Chic"              (disetujui)
--   #18  D4-TRO   Laporan Magang Kendaraan Listrik Hyundai           (disetujui)
--   #19  D4-TRSE  Prototipe Robot Line Follower ESP32 PID            (pending)
--   #20  D4-TB    Laporan Magang Tata Hidang Hotel Malang            (revisi)
-- =====================================================


-- ─── Tambahan Users ───────────────────────────────────────────────────────────
-- 5 mahasiswa baru untuk prodi yang belum punya penulis karya
-- UUID: 00000000-0000-0000-0000-0000000000XX (16–20)

INSERT INTO users (id, nim_nidn, nama, role, prodi_id, is_active, foto_url) VALUES
  (
    '00000000-0000-0000-0000-000000000016',
    '210213700001',
    'Anisa Putri Maharani',
    'mahasiswa',
    (SELECT id FROM program_studi WHERE kode = 'D4-AN'),
    true,
    NULL
  ),
  (
    '00000000-0000-0000-0000-000000000017',
    '210213700002',
    'Bagas Prasetyo',
    'mahasiswa',
    (SELECT id FROM program_studi WHERE kode = 'D4-TB'),
    true,
    NULL
  ),
  (
    '00000000-0000-0000-0000-000000000018',
    '210213700003',
    'Cahyani Nurul Fajri',
    'mahasiswa',
    (SELECT id FROM program_studi WHERE kode = 'D4-TRBS'),
    true,
    NULL
  ),
  (
    '00000000-0000-0000-0000-000000000019',
    '210213700004',
    'Deni Firmansyah',
    'mahasiswa',
    (SELECT id FROM program_studi WHERE kode = 'D4-TRBM'),
    true,
    NULL
  ),
  (
    '00000000-0000-0000-0000-000000000020',
    '210213700005',
    'Eka Wahyuningsih',
    'mahasiswa',
    (SELECT id FROM program_studi WHERE kode = 'D4-TRPE'),
    true,
    NULL
  )
ON CONFLICT (id) DO NOTHING;


-- ─── 12 Karya Tambahan ────────────────────────────────────────────────────────
-- Karya #09–#20 (melengkapi 8 karya dari 002_seed_demo.sql → total 20)

INSERT INTO karya_ilmiah
  (judul, abstrak, kata_kunci, tahun, jenis, bahasa, no_panggil, bidang, status,
   penulis_id, prodi_id, kategori_id, dosen_pembimbing, catatan_admin, views)
VALUES

  -- ── #09 — D4 Animasi ────────────────────────────────────────────────────────
  (
    'Produksi Film Animasi 2D "Legenda Malang Kucecwara" Berbasis Adobe Animate',
    'Penelitian produksi ini merancang dan menghasilkan film animasi 2D berdurasi 5 menit yang mengangkat legenda asal-usul Kota Malang. Proses produksi menggunakan Adobe Animate dengan pipeline rigging karakter dan latar digital yang dikembangkan secara sistematis mulai dari tahap praproduski, produksi, hingga pascaproduksi. Evaluasi dilakukan melalui FGD dengan 30 penonton yang menunjukkan tingkat kepuasan 88% terhadap kualitas visual, narasi, dan nilai edukatif cerita.',
    'animasi 2D, legenda, Malang, Adobe Animate, rigging karakter, produksi film',
    2024, 'Produk Kreatif', 'id',
    'ANI/AN/PK/PRO/2024', 'ANIMASI — PRODUKSI FILM', 'disetujui',
    '00000000-0000-0000-0000-000000000016',
    (SELECT id FROM program_studi WHERE kode = 'D4-AN'),
    (SELECT id FROM kategori WHERE nama = 'Produk Kreatif'),
    'Ima Kusumawati Hidayat, S.Sn., M.Ds.',
    NULL,
    56
  ),

  -- ── #10 — D4 Tata Boga ─────────────────────────────────────────────────────
  (
    'Inovasi Produk Brownies Substitusi Tepung Mocaf dan Pewarna Alami Ubi Ungu',
    'Penelitian ini mengembangkan produk brownies inovatif dengan mensubstitusi 60% tepung terigu menggunakan tepung mocaf (Modified Cassava Flour) dan memanfaatkan ubi ungu sebagai pewarna alami sekaligus sumber antioksidan. Formulasi dilakukan melalui tiga iterasi dengan variasi persentase mocaf 40%, 60%, dan 80%. Uji organoleptik melibatkan 50 panelis semi-terlatih menggunakan skala hedonic 5 poin. Hasil menunjukkan formulasi 60% mocaf paling diterima dari sisi rasa (4.3), warna (4.5), tekstur (4.1), dan aroma (4.2). Analisis proksimat menunjukkan kandungan serat meningkat 23% dibandingkan brownies kontrol.',
    'brownies, mocaf, ubi ungu, pewarna alami, uji organoleptik, inovasi pangan',
    2024, 'Proyek Inovasi', 'id',
    'BAS/TB/PI/INO/2024', 'TEKNOLOGI PANGAN — INOVASI PRODUK', 'disetujui',
    '00000000-0000-0000-0000-000000000017',
    (SELECT id FROM program_studi WHERE kode = 'D4-TB'),
    (SELECT id FROM kategori WHERE nama = 'Proyek Inovasi'),
    'Dr. Mazarina Devi, M.Si.',
    NULL,
    31
  ),

  -- ── #11 — D4 TRBS ──────────────────────────────────────────────────────────
  (
    'Analisis Kinerja Struktur Bangunan Gedung Empat Lantai Tahan Gempa Menggunakan SNI 1726:2019',
    'Penelitian ini menganalisis kinerja struktur bangunan gedung perkantoran empat lantai yang menggunakan sistem rangka momen khusus (SRPMK) sesuai persyaratan SNI 1726:2019 tentang Tata Cara Perencanaan Ketahanan Gempa. Pemodelan struktur tiga dimensi dilakukan menggunakan software ETABS v19 dengan input respons spektrum gempa zona Kota Malang berdasarkan peta hazard PUSKIM 2017. Parameter kinerja yang dievaluasi meliputi drift ratio antarlantai, perpindahan lateral maksimum, dan kapasitas penampang balok-kolom. Hasil analisis menunjukkan seluruh parameter memenuhi batas yang disyaratkan SNI, dengan drift ratio maksimum 0.018 (batas 0.020) dan kapasitas kolom terkritis 87% terhadap gaya dalam terfaktor.',
    'struktur bangunan, tahan gempa, SNI 1726, ETABS, rangka momen khusus, drift ratio',
    2023, 'Tugas Akhir', 'id',
    'CAH/TRBS/TA/ANA/2023', 'STRUKTUR BANGUNAN — TEKNIK SIPIL', 'disetujui',
    '00000000-0000-0000-0000-000000000018',
    (SELECT id FROM program_studi WHERE kode = 'D4-TRBS'),
    (SELECT id FROM kategori WHERE nama = 'Tugas Akhir'),
    'Apif Miptahul Hajji, S.T., M.T., M.Sc., Ph.D.',
    NULL,
    22
  ),

  -- ── #12 — D4 TRBM ──────────────────────────────────────────────────────────
  (
    'Rancang Bangun Mesin CNC Router Mini untuk Mendukung Industri Kreatif dan UMKM',
    'Penelitian ini merancang dan membangun mesin CNC router skala mini dengan area kerja efektif 300×300×100 mm yang ditujukan untuk kebutuhan industri kreatif dan UMKM pengerjaan kayu dan akrilik. Mesin menggunakan penggerak stepper motor NEMA17 (1.8°/step) pada ketiga sumbu dengan sistem transmisi ball screw, dikontrol oleh firmware GRBL v1.1 berbasis Arduino Uno. Spindle berkapasitas 300W mampu berputar hingga 12.000 RPM. Pengujian akurasi dimensi pada pemotongan profil persegi panjang dan lingkaran menunjukkan deviasi rata-rata ±0.2 mm yang memenuhi toleransi pengerjaan material target. Biaya produksi prototipe Rp 3.800.000,- lebih ekonomis 65% dibandingkan produk komersial sejenis.',
    'CNC router, GRBL, Arduino, stepper motor, manufaktur, UMKM, industri kreatif',
    2024, 'Tugas Akhir', 'id',
    'DEN/TRBM/TA/RAN/2024', 'MANUFAKTUR — MESIN CNC', 'disetujui',
    '00000000-0000-0000-0000-000000000019',
    (SELECT id FROM program_studi WHERE kode = 'D4-TRBM'),
    (SELECT id FROM kategori WHERE nama = 'Tugas Akhir'),
    'Singgih Dwi Prasetyo, S.T., M.T.',
    NULL,
    39
  ),

  -- ── #13 — D4 TRPE ──────────────────────────────────────────────────────────
  (
    'Perancangan Sistem PLTS Atap 5 kWp untuk Gedung Laboratorium Fakultas Vokasi Universitas Negeri Malang',
    'Penelitian ini merancang sistem pembangkit listrik tenaga surya (PLTS) atap berkapasitas 5 kWp untuk memenuhi sebagian kebutuhan listrik gedung laboratorium Fakultas Vokasi Universitas Negeri Malang. Perancangan mencakup pemilihan panel surya monokristalin 500 Wp (10 panel), inverter on-grid 5 kW, dan sistem monitoring berbasis IoT. Simulasi produksi energi menggunakan software PVSyst v7.2 dengan data iradiasi matahari BMKG Stasiun Karangploso selama 5 tahun. Hasil simulasi menunjukkan produksi energi tahunan sebesar 6.520 kWh, potensi penghematan tagihan listrik Rp 9.776.000/tahun, dan payback period 7,3 tahun dengan IRR 12,4%.',
    'PLTS atap, panel surya, PVSyst, energi terbarukan, on-grid, Universitas Negeri Malang',
    2024, 'Tugas Akhir', 'id',
    'EKA/TRPE/TA/DES/2024', 'ENERGI TERBARUKAN — PLTS', 'disetujui',
    '00000000-0000-0000-0000-000000000020',
    (SELECT id FROM program_studi WHERE kode = 'D4-TRPE'),
    (SELECT id FROM kategori WHERE nama = 'Tugas Akhir'),
    'Royb Fatkhur Rizal, M.Eng.',
    NULL,
    47
  ),

  -- ── #14 — D4 Perpustakaan Digital (Karina — user 010) ──────────────────────
  (
    'Pengembangan Sistem Klasifikasi DDC Digital Berbasis Machine Learning untuk Perpustakaan Perguruan Tinggi',
    'Artikel ini membahas pengembangan sistem klasifikasi otomatis koleksi perpustakaan menggunakan algoritma machine learning berdasarkan standar Dewey Decimal Classification (DDC) edisi ke-23. Dua algoritma dibandingkan: Naive Bayes dan Support Vector Machine (SVM) dengan kernel linier. Dataset terdiri dari 2.400 judul buku dari OPAC tiga perpustakaan perguruan tinggi di Jawa Timur, dibagi 80:20 untuk training dan testing menggunakan k-fold cross validation (k=5). Representasi teks menggunakan TF-IDF dengan 5.000 fitur terpilih. Hasil eksperimen menunjukkan SVM mencapai akurasi tertinggi 91.7% (F1-score 0.913) dibandingkan Naive Bayes 84.2% (F1-score 0.839). Sistem berhasil dintegrasikan sebagai modul tambahan pada sistem SLIMS Senayan.',
    'DDC, machine learning, klasifikasi otomatis, SVM, Naive Bayes, TF-IDF, perpustakaan digital',
    2023, 'Artikel Jurnal', 'id',
    'KAR/PD/AJ/PEN/2023', 'PERPUSTAKAAN DIGITAL — OTOMASI KLASIFIKASI', 'disetujui',
    '00000000-0000-0000-0000-000000000010',
    (SELECT id FROM program_studi WHERE kode = 'D4-PD'),
    (SELECT id FROM kategori WHERE nama = 'Artikel Jurnal'),
    'Candra Ariawan, S.Kom., M.Kom.',
    NULL,
    74
  ),

  -- ── #15 — D4 Manajemen Pemasaran (Dwi — user 006) ─────────────────────────
  (
    'Strategi Pemasaran Digital dan Pengaruhnya terhadap Keputusan Pembelian Produk Fashion Lokal di Kota Malang',
    'Penelitian ini mengkaji pengaruh strategi pemasaran digital yang meliputi media sosial, search engine optimization (SEO), dan email marketing terhadap keputusan pembelian konsumen produk fashion lokal di Kota Malang. Survei dilakukan kepada 200 konsumen berusia 18–35 tahun yang pernah berbelanja fashion lokal secara online dalam 6 bulan terakhir menggunakan purposive sampling. Instrumen penelitian menggunakan skala Likert 5 poin dengan 24 item pertanyaan yang telah melalui uji validitas dan reliabilitas. Analisis regresi berganda menggunakan SPSS 26 menunjukkan koefisien determinasi R² = 0.64. Media sosial Instagram memiliki pengaruh paling signifikan (β=0.42, p<0.01), diikuti SEO (β=0.28, p<0.05), sementara email marketing tidak signifikan (β=0.11, p=0.18). Implikasi manajerial dirumuskan untuk meningkatkan efektivitas anggaran pemasaran digital UMKM fashion lokal.',
    'pemasaran digital, media sosial, SEO, keputusan pembelian, fashion lokal, regresi berganda',
    2024, 'Artikel Jurnal', 'id',
    'DWI/MP/AJ/STR/2024', 'MANAJEMEN PEMASARAN — PEMASARAN DIGITAL', 'disetujui',
    '00000000-0000-0000-0000-000000000006',
    (SELECT id FROM program_studi WHERE kode = 'D4-MP'),
    (SELECT id FROM kategori WHERE nama = 'Artikel Jurnal'),
    'Rayie Tariaranie Wiraguna SE.,MM',
    NULL,
    83
  ),

  -- ── #16 — D4 Akuntansi (Rizki — user 015) ──────────────────────────────────
  (
    'Implementasi E-Faktur Pajak dan Dampaknya terhadap Kepatuhan Wajib Pajak Badan di Kota Malang',
    'Penelitian ini menganalisis dampak penerapan sistem e-faktur terhadap tingkat kepatuhan pelaporan Pajak Pertambahan Nilai (PPN) wajib pajak badan di wilayah Kantor Pelayanan Pajak Pratama Malang Selatan. Metode penelitian menggunakan pendekatan kuantitatif komparatif dengan membandingkan tingkat kepatuhan sebelum (2020–2021) dan sesudah (2022–2023) implementasi e-faktur generasi ketiga. Sampel terdiri dari 85 perusahaan pengusaha kena pajak (PKP) yang dipilih secara stratified random sampling berdasarkan skala usaha. Analisis paired sample t-test menunjukkan peningkatan kepatuhan yang signifikan (t=8.43, p<0.001): tingkat pelaporan tepat waktu naik dari 71% menjadi 95%, dan rata-rata waktu pelaporan berkurang 2,5 jam per periode pajak. Kepuasan pengguna sistem rata-rata 4.1/5.0 (skala SUS: 82, tergolong Excellent).',
    'e-faktur, kepatuhan pajak, wajib pajak badan, PPN, perpajakan digital, PKP',
    2023, 'Artikel Jurnal', 'id',
    'AMI/AK/AJ/IMP/2023', 'AKUNTANSI — PERPAJAKAN DIGITAL', 'disetujui',
    '00000000-0000-0000-0000-000000000015',
    (SELECT id FROM program_studi WHERE kode = 'D4-AK'),
    (SELECT id FROM kategori WHERE nama = 'Artikel Jurnal'),
    'Ferby Mutia Edwy, S.E., M.Ak',
    NULL,
    58
  ),

  -- ── #17 — D4 Desain Mode (Ahmad Fauzi — user 014) ──────────────────────────
  (
    'Koleksi Busana Pesta "Nusantara Chic" dengan Motif Batik Kontemporer Kota Malang',
    'Karya produk kreatif ini merancang dan memproduksi koleksi busana pesta wanita sebanyak 5 look yang mengintegrasikan kekayaan motif batik khas Kota Malang (motif Malang Kucecwara, bunga teratai, dan candi) dengan estetika mode kontemporer global. Proses desain mencakup riset budaya motif, pembuatan fashion illustration, pembuatan pola, pemilihan material premium (silk organza, duchess satin, dan tenun sutra), serta produksi sample oleh pengrajin batik Malang Raya. Karya dievaluasi oleh 3 pakar mode dan dipresentasikan dalam pagelaran fashion show "Vokasi Arts & Fashion 2024" yang dihadiri oleh 200 undangan, mendapat respon positif dari 92% penonton.',
    'busana pesta, batik Malang, desain mode, koleksi fashion, fashion show, silk organza',
    2024, 'Produk Kreatif', 'id',
    'FAU/DM/PK/KOL/2024', 'DESAIN MODE — BUSANA PESTA', 'disetujui',
    '00000000-0000-0000-0000-000000000014',
    (SELECT id FROM program_studi WHERE kode = 'D4-DM'),
    (SELECT id FROM kategori WHERE nama = 'Produk Kreatif'),
    'Dr. Nurul Hidayati, S.Pd., M.Sn',
    NULL,
    28
  ),

  -- ── #18 — D4 Teknologi Rekayasa Otomotif (Suherman — user 012) ─────────────
  (
    'Laporan Praktik Kerja Lapangan: Prosedur Diagnosa dan Perawatan Kendaraan Listrik di PT Hyundai Motor Indonesia',
    'Laporan ini mendokumentasikan kegiatan praktik kerja lapangan selama 3 bulan (September–November 2024) di Divisi After Sales PT Hyundai Motor Indonesia, Tangerang. Kegiatan berfokus pada prosedur diagnosa dan perawatan kendaraan listrik (Battery Electric Vehicle/BEV), khususnya Hyundai IONIQ 5 dan IONIQ 6. Kompetensi yang dikuasai meliputi: (1) inspeksi visual dan pengukuran kapasitas baterai HV menggunakan GDS Mobile II, (2) kalibrasi dan reset sistem BMS (Battery Management System), (3) prosedur penggantian modul sel baterai bergaransi, (4) instalasi dan komisioning EVSE (Electric Vehicle Supply Equipment), serta (5) pelatihan safety handling tegangan tinggi (400V DC). Kompetensi yang diperoleh telah diverifikasi sesuai dengan 7 dari 12 unit kompetensi skema sertifikasi BNSP OTO.EV01.',
    'kendaraan listrik, BEV, perawatan EV, BMS, Hyundai IONIQ, EVSE, BNSP, magang',
    2024, 'Laporan Magang', 'id',
    'SUH/TRO/LM/LAP/2024', 'OTOMOTIF — KENDARAAN LISTRIK', 'disetujui',
    '00000000-0000-0000-0000-000000000012',
    (SELECT id FROM program_studi WHERE kode = 'D4-TRO'),
    (SELECT id FROM kategori WHERE nama = 'Laporan Magang'),
    'Rais Amin, S.Pd, M.Pd',
    NULL,
    41
  ),

  -- ── #19 — D4 TRSE (Bima Saputra — user 003, pending) ──────────────────────
  (
    'Prototipe Robot Line Follower Berbasis Mikrokontroler ESP32 dengan Kendali PID Adaptif',
    'Penelitian ini merancang dan mengimplementasikan robot line follower otonom menggunakan mikrokontroler ESP32 dengan algoritma kendali PID (Proportional-Integral-Derivative) adaptif untuk mengatasi permasalahan lintasan berkelok tajam dan percabangan. Array sensor inframerah QTR-8A digunakan untuk pembacaan posisi lintasan dengan frekuensi sampling 100 Hz. Parameter PID (Kp, Ki, Kd) dioptimasi menggunakan metode Ziegler-Nichols dengan penyesuaian adaptif berdasarkan error historis. Pengujian pada 5 skenario lintasan berbeda menunjukkan akurasi pendeteksian 97.3%, kecepatan rata-rata 0.82 m/detik (lebih cepat 28% dari implementasi PID konvensional), dan tingkat kegagalan deteksi percabangan 2.1%. Sistem telah diintegrasikan dengan modul telemetri Wi-Fi untuk monitoring data sensor secara real-time.',
    'robot line follower, ESP32, PID adaptif, sensor QTR-8A, robotika, mikrokontroler',
    2025, 'Proyek Inovasi', 'id',
    'BIM/TRSE/PI/PRO/2025', 'ELEKTRONIKA — ROBOTIKA', 'pending',
    '00000000-0000-0000-0000-000000000003',
    (SELECT id FROM program_studi WHERE kode = 'D4-TRSE'),
    (SELECT id FROM kategori WHERE nama = 'Proyek Inovasi'),
    'Dr. Muladi, S.T., M.T.',
    NULL,
    0
  ),

  -- ── #20 — D4 Tata Boga (Bagas — user 017, revisi) ──────────────────────────
  (
    'Laporan Praktik Kerja Lapangan di Departemen Food and Beverage Service Hotel Malang Starcity',
    'Laporan ini mendokumentasikan kegiatan praktik kerja lapangan selama 4 bulan (Juli–Oktober 2025) di Departemen Food and Beverage Service Hotel Malang Starcity bintang empat. Kegiatan mencakup operasional restoran Arjuna Coffee (70 cover), tata hidang formal dan informal, persiapan dan eksekusi banquet untuk event korporat (kapasitas hingga 500 tamu) dan pernikahan. Laporan memuat analisis SOP tata hidang, evaluasi kompetensi yang diperoleh berdasarkan SKKNI No. 83 Tahun 2015 bidang F&B Service, serta rekomendasi perbaikan operasional berdasarkan temuan di lapangan.',
    'tata hidang, banquet, hotel bintang empat, F&B service, SKKNI, magang, MICE',
    2025, 'Laporan Magang', 'id',
    'BAS/TB/LM/LAP/2025', 'TATA BOGA — PERHOTELAN DAN RESTORAN', 'revisi',
    '00000000-0000-0000-0000-000000000017',
    (SELECT id FROM program_studi WHERE kode = 'D4-TB'),
    (SELECT id FROM kategori WHERE nama = 'Laporan Magang'),
    'Nonny Aji Sunaryo, S.Pd., M.Par.',
    'Abstrak perlu diperluas — tambahkan uraian metode evaluasi kompetensi dan hasil pencapaian secara kuantitatif. Bagian Bab III tentang analisis SOP masih terlalu deskriptif; tambahkan perbandingan dengan standar hotel internasional.',
    0
  )

ON CONFLICT DO NOTHING;


-- ─── Media Files Placeholder ──────────────────────────────────────────────────
-- Tambahkan placeholder PDF untuk karya-karya baru yang disetujui
-- (karya lama sudah ditangani oleh 002_seed_demo.sql)

INSERT INTO media_files (karya_id, tipe, nama_file, storage_path, mime_type, urutan)
SELECT
  k.id,
  'dokumen',
  lower(regexp_replace(
    substring(k.judul FROM 1 FOR 60),
    '[^a-zA-Z0-9]', '-', 'g'
  )) || '.pdf',
  'karya/' || k.id || '/dokumen.pdf',
  'application/pdf',
  1
FROM karya_ilmiah k
WHERE k.status = 'disetujui'
  AND NOT EXISTS (
    SELECT 1 FROM media_files m WHERE m.karya_id = k.id AND m.tipe = 'dokumen'
  )
ON CONFLICT DO NOTHING;


-- ─── Log Verifikasi untuk karya yang sudah disetujui ─────────────────────────
-- Contoh data audit trail verifikasi

INSERT INTO log_verifikasi (karya_id, admin_id, aksi, catatan, created_at)
SELECT
  k.id,
  '00000000-0000-0000-0000-000000000001',  -- Achmad Hamdan (admin)
  'disetujui',
  'Karya memenuhi standar kelayakan repositori Fakultas Vokasi UM.',
  k.created_at + interval '3 days'
FROM karya_ilmiah k
WHERE k.status = 'disetujui'
  AND NOT EXISTS (
    SELECT 1 FROM log_verifikasi lv WHERE lv.karya_id = k.id
  );

-- Log revisi untuk karya #20
INSERT INTO log_verifikasi (karya_id, admin_id, aksi, catatan, created_at)
SELECT
  k.id,
  '00000000-0000-0000-0000-000000000001',
  'revisi',
  'Abstrak perlu diperluas dan Bab III perlu penambahan perbandingan standar internasional.',
  k.created_at + interval '5 days'
FROM karya_ilmiah k
WHERE k.no_panggil = 'BAS/TB/LM/LAP/2025'
ON CONFLICT DO NOTHING;


-- ─── Verifikasi Akhir ─────────────────────────────────────────────────────────

SELECT
  'users'              AS tabel, COUNT(*) AS jumlah FROM users
UNION ALL SELECT 'karya_ilmiah',  COUNT(*) FROM karya_ilmiah
UNION ALL SELECT '  disetujui',   COUNT(*) FROM karya_ilmiah WHERE status = 'disetujui'
UNION ALL SELECT '  pending',     COUNT(*) FROM karya_ilmiah WHERE status = 'pending'
UNION ALL SELECT '  revisi',      COUNT(*) FROM karya_ilmiah WHERE status = 'revisi'
UNION ALL SELECT 'media_files',   COUNT(*) FROM media_files
UNION ALL SELECT 'log_verifikasi',COUNT(*) FROM log_verifikasi
UNION ALL SELECT 'dosen_pembimbing', COUNT(*) FROM dosen_pembimbing;

-- Target hasil verifikasi:
--   users            : 20
--   karya_ilmiah     : 20
--     disetujui      : 17
--     pending        : 2  (#08 Natasya + #19 Bima)
--     revisi         : 1  (#20 Bagas)
--   media_files      : 17
--   log_verifikasi   : 18  (17 disetujui + 1 revisi)
--   dosen_pembimbing : 72
