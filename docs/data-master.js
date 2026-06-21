/**
 * data-master.js — Single source of truth untuk data master DIGILAB
 * Dosen Pembimbing (72 item) dan Program Studi (11 prodi D4)
 *
 * Load file ini SEBELUM script lain di semua halaman:
 *   admin.html, admin.html, mahasiswa.html, mahasiswa.html
 *
 * Variabel global:
 *   window.MASTER_DOSEN  — array 72 string nama dosen
 *   window.MASTER_PRODI  — array 11 string nama prodi (nama lengkap)
 *
 * Saat backend siap, ganti array di bawah dengan fetch('/api/dosen') dan
 * fetch('/api/prodi') — semua halaman akan otomatis menggunakan data live.
 */

window.MASTER_DOSEN = [
  'Inawati, S.I.P., M.M.','Dr. Sokhibul Ansor, S.Sos., M.Hum.','Setiawan, S.Sos, M.IP',
  'Adi Prasetyawan, S.Sos, M.A.','Lidya Amalia Rahmania, S.Kom, M.Kom','Joko Samodra, S.Kom., M.T.',
  'Andy Pramono, S.Kom., M.T.','Mitra Istiar Wardhana, S.Kom, M.T.','Ima Kusumawati Hidayat, S.Sn., M.Ds.',
  'Nuril Kusuma Wardani, S.Sn., M.Ds.','Dimas Rifky Novica, S.Sn., M.Ds.','Arif Sutrisno, S.Sn., M.Ds.',
  'Bunga Fefiana Mustikasarii, S.Sn., M.Ds.','Rayie Tariaranie Wiraguna SE.,MM','Dr. Ely siswanto S.Sos.,MM',
  'Handri dian S.Pd.,M.Sc','Della Ayu zonna Lia S.AB.,M.AB','Safira Rusyida SE.,M.MT',
  'Ababil Karhoma Wijaya SE.,M.SM','Cesya Rizkika S.E. M.BA','Arum prasasti SE.,MSc',
  'Ferby Mutia Edwy, S.E., M.Ak','Aulia Azzardina, S.E., M.Sc','Meirna Puspita Permatasari, S.E., M.Ak',
  'Muhammad, S.E., M.S.A., Ak., CSRS','Fitri Purnamasari, S.E., M.S.A','Inanda Shinta Anugrahani, S.E., M.A',
  'Dr. Muchammad Harly, S.T., M.T.','Windra Irdianto, S.Pd., M.Pd.','Ir. M. Ihwanudin, S.Pd., M.Pd.',
  'Drs. Eddy Rudiyanto, M.Pd.','Fuad Indra Kusuma, S.Pd., M.Pd.','Drs. Nemesius Bambang Revantoro, M.T.',
  'Apif Miptahul Hajji, S.T., M.T., M.Sc., Ph.D.','Pranoto, S.T., M.T.','Viola Malta Ramadhani, S.T., M.Ars.',
  'Achmad Saiful Arifin, S.Pd, M.T.','Prabowo, S.T., M.T.','Ika Salsabila Nurahida, S.Tr.T, M.T.',
  'Rais Amin, S.Pd, M.Pd','Obaja Eden Sentosa Riyanto, S.S.T., M.Sc.','Drs. Abdul Qolik, M.Pd',
  'Drs. Imam Sudjono, M.T.','Riana Nurmalasari, S.Pd., M.Pd.','Ir. Didin Zakariya Lubis, S.Pd, M.Eng',
  "Dewi 'Izzatus Tsamroh, S.Pd., M.T.",'Drs. Wahono, M.Pd','Muhammad Ilman Nur Sasongko, S.Pd., M.T.',
  'Sis Nanda Kus Andrianto, S.T., S.H., M.T.','Jibril Maulana, S.T., M.T.','Drs. Slamet Wibawanto, M.T.',
  'Ir. Arya Kusumawardana, S.Pd., M.T.','Misbahul Munir, S.T., M.T.','Ir. Muhammad Afnan Habibi, S.T., M.T., M.Eng.',
  'Royb Fatkhur Rizal, M.Eng.','Singgih Dwi Prasetyo, S.T., M.T.','Soraya Norma Mustika, S.T.,M.T., M.Sc',
  'Dr. Muladi, S.T., M.T.','Achmad Hamdan, S.Pd, M.Pd','Satrio Dwi Sanjaya, S.T., M.Sc.',
  'Dra. Wiwik Wahyuni, M.Pd.','Dr. Mazarina Devi, M.Si.','Dr. Ir. Soenar Soekopitojo, M.Si.',
  'Nonny Aji Sunaryo, S.Pd., M.Par.','Arzendy Berlian Sabrina, S.Pd., M.Par.','Chintya Paramita Puspita, S.Pd., M.Pd.',
  'Dr. Nurul Hidayati, S.Pd., M.Sn','Dr. Agus Sunandar, S.Pd., M.Sn','Dra. Sri Eko Puji Rahayu, M.Si',
  'Rizky Yulianingrum, S.Pd., M.Pd','Ajeng Atma Kusuma, S.Pd., M.Pd','Rizka Sarah Heydarian Fatima, S.Pd., M.Pd'
];

window.MASTER_PRODI = [
  'D4 Perpustakaan Digital',
  'D4 Animasi',
  'D4 Manajemen Pemasaran',
  'D4 Akuntansi',
  'D4 Tata Boga',
  'D4 Desain Mode',
  'D4 Teknologi Rekayasa dan Pemeliharaan Bangunan Sipil',
  'D4 Teknologi Rekayasa Bangunan Manufaktur',
  'D4 Teknologi Rekayasa Otomotif',
  'D4 Teknologi Rekayasa Pembangkit Energi',
  'D4 Teknologi Rekayasa Sistem Elektronika'
];

// ── KARYA DATA (fallback jika Supabase tidak tersedia) ──
// Saat backend aktif, ganti dengan fetch('/api/karya') di api-service.js
window.KARYA_DATA = [
  {
    id: 1,
    judul: 'Sistem Informasi Akademik Terintegrasi Berbasis Cloud',
    penulis: 'Dewi Rahayu',
    prodi: 'D4 Teknologi Rekayasa Sistem Elektronika',
    tahun: 2023,
    jenis: 'Tugas Akhir',
    pembimbing: 'Dr. Wahyu Pratama, M.Kom.',
    abstrak: 'Platform akademik berbasis cloud yang mengintegrasikan manajemen mahasiswa, jadwal, nilai, dan komunikasi dalam satu ekosistem terpadu. Dibangun dengan arsitektur microservices menggunakan Node.js dan PostgreSQL. Load testing menunjukkan sistem mampu menangani 500 pengguna konkuren tanpa degradasi performa signifikan.',
    kata_kunci: ['sistem informasi', 'akademik', 'cloud', 'microservices', 'Node.js'],
    no_panggil: 'DEW/TI/TA/SIS/2023',
    pembaca: 87,
    link: 'https://github.com/demo/siakad',
    status: 'disetujui'
  },
  {
    id: 2,
    judul: 'Analisis Efisiensi Anggaran Daerah Kota Malang 2020–2023',
    penulis: 'Rizki Amalia',
    prodi: 'D4 Akuntansi',
    tahun: 2023,
    jenis: 'Artikel Jurnal',
    pembimbing: 'Drs. Budi Santoso, M.M.',
    abstrak: 'Penelitian ini menganalisis efisiensi pengelolaan anggaran daerah Kota Malang selama periode 2020–2023 menggunakan metode Data Envelopment Analysis (DEA). Hasil menunjukkan rata-rata efisiensi sebesar 82,4% dengan tren peningkatan setiap tahun.',
    kata_kunci: ['anggaran daerah', 'efisiensi', 'DEA', 'akuntansi sektor publik'],
    no_panggil: 'RIZ/AK/AJ/ANA/2023',
    pembaca: 62,
    link: '',
    status: 'disetujui'
  },
  {
    id: 3,
    judul: 'Rancang Bangun Website Perpustakaan Keliling Berbasis Progressive Web App',
    penulis: 'Karina Aliya',
    prodi: 'D4 Perpustakaan Digital',
    tahun: 2020,
    jenis: 'Tugas Akhir',
    pembimbing: 'Dr. Rina Dewi, M.Pd.',
    abstrak: 'Perancangan dan implementasi website perpustakaan keliling menggunakan teknologi Progressive Web App (PWA) untuk memastikan aksesibilitas konten bahkan dalam kondisi jaringan terbatas. Sistem dilengkapi fitur offline-first, notifikasi push, dan manajemen koleksi buku digital.',
    kata_kunci: ['perpustakaan keliling', 'PWA', 'offline-first', 'manajemen koleksi'],
    no_panggil: 'KAR/PD/TA/RAN/2020',
    pembaca: 20,
    link: 'https://perpus-keliling.vercel.app',
    status: 'disetujui'
  },
  {
    id: 4,
    judul: 'Identitas Visual Brand UMKM Kota Malang: Studi Desain Kontemporer',
    penulis: 'Ahmad Fauzan',
    prodi: 'D4 Desain Mode',
    tahun: 2022,
    jenis: 'Proyek Inovasi',
    pembimbing: 'Ir. Siti Rahma, M.T.',
    abstrak: 'Proyek ini merancang identitas visual 12 UMKM di Kota Malang dengan pendekatan desain kontemporer yang menggabungkan nilai lokal dan estetika modern. Meliputi logo, panduan merek, media sosial template, dan packaging design.',
    kata_kunci: ['identitas visual', 'brand', 'UMKM', 'desain kontemporer'],
    no_panggil: 'FAU/DKV/PI/IDE/2022',
    pembaca: 43,
    link: '',
    status: 'disetujui'
  },
  {
    id: 5,
    judul: 'Implementasi Sistem Manajemen Arsip Digital di Pemerintah Daerah',
    penulis: 'Sari Wulandari',
    prodi: 'D4 Manajemen Pemasaran',
    tahun: 2022,
    jenis: 'Laporan Magang',
    pembimbing: 'Drs. Budi Santoso, M.M.',
    abstrak: 'Laporan magang ini mendokumentasikan proses implementasi sistem manajemen arsip digital di lingkungan Pemerintah Daerah Kota Malang. Meliputi analisis kebutuhan, pelatihan staf, migrasi data dari sistem analog, dan evaluasi pasca implementasi.',
    kata_kunci: ['arsip digital', 'manajemen dokumen', 'pemerintah daerah', 'digitalisasi'],
    no_panggil: 'SAR/AP/LM/IMP/2022',
    pembaca: 31,
    link: '',
    status: 'disetujui'
  },
  {
    id: 6,
    judul: 'Prototipe Alat Monitoring Kualitas Air Sungai Berbasis IoT',
    penulis: 'Bagas Prasetyo',
    prodi: 'D4 Teknologi Rekayasa Otomotif',
    tahun: 2024,
    jenis: 'Proyek Inovasi',
    pembimbing: 'Ir. Siti Rahma, M.T.',
    abstrak: 'Pengembangan prototipe alat pemantau kualitas air sungai secara real-time menggunakan mikrokontroler ESP32 dan sensor pH, kekeruhan, serta suhu. Data dikirimkan ke dashboard web melalui protokol MQTT untuk pemantauan jarak jauh oleh instansi terkait.',
    kata_kunci: ['IoT', 'monitoring', 'kualitas air', 'ESP32', 'MQTT'],
    no_panggil: 'BAG/TM/PI/PRO/2024',
    pembaca: 55,
    link: 'https://github.com/bagas/iot-water',
    status: 'disetujui'
  }
];
