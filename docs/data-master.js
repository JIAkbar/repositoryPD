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
