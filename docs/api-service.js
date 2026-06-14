/**
 * api-service.js — DIGILAB Repository
 * ─────────────────────────────────────────────────────────────────
 * Centralized data layer. Satu-satunya file yang:
 *   1. Membaca/menulis localStorage untuk auth (digilab-user)
 *   2. Memanggil backend API
 *   3. Fallback ke dummy data jika API belum siap
 *
 * CARA PAKAI (di setiap halaman):
 *   <script src="api-service.js"></script>
 *
 *   const user = ApiService.auth.getUser();
 *   const karya = await ApiService.karya.getAll({ q: 'IoT' });
 *
 * SAAT BACKEND SIAP:
 *   Hanya ubah API_BASE ke URL production. Tidak perlu sentuh file lain.
 * ─────────────────────────────────────────────────────────────────
 */

// ── CONFIG ──────────────────────────────────────────────────────
const API_BASE = 'http://localhost:5000/api';

// localStorage keys — terpusat di sini, tidak boleh hardcode di page lain
const LS = {
  USER:        'digilab-user',        // {name, email, role, token}  → Supabase Auth
  PENDING_REG: 'digilab-pending-reg', // {name,email,nim,prodi,role} → public.users (pending)
  THEME:       'digilab-theme',       // UI only — tetap di localStorage
  LAYOUT:      'digilab-layout',      // UI only — tetap di localStorage
  VERSION:     'digilab-version',     // UI only — tetap di localStorage
};

// ── DUMMY DATA — fallback saat API belum tersedia ─────────────────
// Struktur IDENTIK dengan schema Supabase (field name, tipe, enum)

const _KARYA_PUBLIK = [
  {
    id: 1,
    judul: 'Sistem Informasi Akademik Terintegrasi Berbasis Cloud',
    penulis: 'Dewi Rahayu',
    prodi: 'D4 Teknologi Informasi',
    tahun: 2023,
    jenis: 'Tugas Akhir',
    pembimbing: 'Dr. Wahyu Pratama, M.Kom.',
    abstrak: 'Platform akademik berbasis cloud yang mengintegrasikan manajemen mahasiswa, jadwal, nilai, dan komunikasi dalam satu ekosistem terpadu.',
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
    abstrak: 'Penelitian ini menganalisis efisiensi pengelolaan anggaran daerah Kota Malang selama periode 2020–2023 menggunakan metode Data Envelopment Analysis (DEA).',
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
    pembimbing: 'Achmad Hamdan, S.Pd., M.Pd.',
    abstrak: 'Aplikasi PWA untuk perpustakaan keliling yang memungkinkan akses offline terhadap katalog dan peminjaman buku.',
    kata_kunci: ['PWA', 'perpustakaan', 'offline-first', 'service worker'],
    no_panggil: 'KAR/PD/TA/RAN/2020',
    pembaca: 45,
    link: '',
    status: 'disetujui'
  },
  {
    id: 4,
    judul: 'Prototipe Alat Monitoring Kualitas Air Sungai Berbasis IoT',
    penulis: 'Bagas Prasetyo',
    prodi: 'D4 Teknik Mesin',
    tahun: 2024,
    jenis: 'Proyek Inovasi',
    pembimbing: 'Ir. Teguh Widodo, M.T.',
    abstrak: 'Sensor IoT low-cost untuk monitoring real-time pH, suhu, dan kekeruhan air sungai dengan dashboard web terintegrasi.',
    kata_kunci: ['IoT', 'sensor', 'kualitas air', 'monitoring', 'Arduino'],
    no_panggil: 'BAG/TM/PI/PRO/2024',
    pembaca: 103,
    link: 'https://github.com/bagas/iot-water',
    status: 'disetujui'
  },
  {
    id: 5,
    judul: 'Implementasi Sistem Manajemen Arsip Digital di Dinas Pendidikan Kota Malang',
    penulis: 'Sari Wulandari',
    prodi: 'D3 Administrasi Perkantoran',
    tahun: 2022,
    jenis: 'Laporan Magang',
    pembimbing: 'Dra. Retno Purwandari, M.Si.',
    abstrak: 'Laporan implementasi sistem manajemen arsip digital berbasis web di lingkungan Dinas Pendidikan Kota Malang.',
    kata_kunci: ['arsip digital', 'manajemen dokumen', 'administrasi perkantoran'],
    no_panggil: 'SAR/AP/LM/IMP/2022',
    pembaca: 31,
    link: '',
    status: 'disetujui'
  },
  {
    id: 6,
    judul: 'Identitas Visual Brand UMKM Kota Malang: Studi Kasus Produk Kerajinan Lokal',
    penulis: 'Ahmad Fauzan',
    prodi: 'D4 Desain Komunikasi Visual',
    tahun: 2022,
    jenis: 'Produk Kreatif',
    pembimbing: 'Wahyu Dinata, S.Sn., M.Ds.',
    abstrak: 'Perancangan identitas visual komprehensif untuk 5 UMKM kerajinan lokal Kota Malang, mencakup logo, panduan merek, dan materi pemasaran.',
    kata_kunci: ['brand identity', 'UMKM', 'desain grafis', 'identitas visual'],
    no_panggil: 'FAU/DKV/PI/IDE/2022',
    pembaca: 78,
    link: '',
    status: 'disetujui'
  }
];

const _KARYA_MAHASISWA = [
  { id:1, judul:'Laporan Magang Perpustakaan Bung Karno', jenis:'Laporan Magang', tahun:'2024', status:'disetujui', pembimbing:'Hariyanto S.Pd., M.Pd' },
  { id:2, judul:'Implementasi Sistem Temu Kembali Informasi Berbasis Metadata Dublin Core', jenis:'Tugas Akhir', tahun:'2025', status:'pending', pembimbing:'Achmad Hamdan, S.Pd., M.Pd' },
  { id:3, judul:'Analisis Kebutuhan Layanan Perpustakaan Digital di Era Pasca-Pandemi', jenis:'Artikel Jurnal', tahun:'2024', status:'revisi', pembimbing:'Dr. Siti Rahayu, M.Lib',
    catatanRevisi:[
      {kolom:'Abstrak', catatan:'Perlu diperjelas tujuan penelitian dan metodologi yang digunakan. Tambahkan kata kunci yang relevan.'},
      {kolom:'Judul', catatan:'Judul terlalu panjang, persingkat maksimal 15 kata.'}
    ]
  },
];

const _KARYA_ADMIN = [
  { id:1, nopanggil:'BAG/TM/PI/PRO/2024', judul:'Prototipe Alat Monitoring Kualitas Air Sungai Berbasis IoT', mhs:'Bagas Prasetyo', prodi:'D4 Teknik Mesin', tgl:'12 Jun 2025', status:'pending', link:'https://github.com/bagas/iot-water' },
  { id:2, nopanggil:'DEW/TI/TA/SIS/2023', judul:'Sistem Informasi Akademik Terintegrasi Berbasis Cloud', mhs:'Dewi Rahayu', prodi:'D4 Teknologi Informasi', tgl:'09 Jun 2025', status:'disetujui', link:'' },
  { id:3, nopanggil:'SAR/AP/LM/IMP/2022', judul:'Implementasi Sistem Manajemen Arsip Digital', mhs:'Sari Wulandari', prodi:'D3 Administrasi Perkantoran', tgl:'10 Jun 2025', status:'revisi', link:'' },
  { id:4, nopanggil:'RIZ/AK/AJ/ANA/2023', judul:'Analisis Efisiensi Anggaran Daerah Kota Malang 2020–2023', mhs:'Rizki Amalia', prodi:'D4 Akuntansi', tgl:'09 Jun 2025', status:'disetujui', link:'' },
  { id:5, nopanggil:'KAR/PD/TA/RAN/2020', judul:'Rancang Bangun Website Perpustakaan Keliling Berbasis PWA', mhs:'Karina Aliya', prodi:'D4 Perpustakaan Digital', tgl:'08 Jun 2025', status:'pending', link:'' },
  { id:6, nopanggil:'FAU/DKV/PI/IDE/2022', judul:'Identitas Visual Brand UMKM Kota Malang', mhs:'Ahmad Fauzan', prodi:'D4 Desain Komunikasi Visual', tgl:'07 Jun 2025', status:'pending', link:'' }
];

const _AKUN_PENDING = [
  { nim:'230213704301', nama:'Bima Saputra',       prodi:'D4 Teknologi Informasi',    tgl:'10 Jun', status:'pending' },
  { nim:'230213704302', nama:'Laila Fitriani',     prodi:'D3 Administrasi Perkantoran', tgl:'11 Jun', status:'pending' },
  { nim:'230213704303', nama:'Rizal Hidayatullah', prodi:'D4 Akuntansi',               tgl:'11 Jun', status:'pending' },
  { nim:'230213704305', nama:'Dwi Kurniawati',     prodi:'D4 Perpustakaan Digital',    tgl:'12 Jun', status:'disetujui' },
  { nim:'230213704306', nama:'Fajar Nugroho',      prodi:'D4 Teknik Mesin',            tgl:'08 Jun', status:'ditolak' }
];

const _PROFIL_DUMMY = {
  nama: 'Natasya Adelia R.',
  nim: '220213704262',
  prodi: 'D4 Perpustakaan Digital',
  angkatan: '2022',
  gender: 'P',
  email: 'mahasiswa@vokasi.um.ac.id',
};

const _PRODI_LIST = [
  'D4 Perpustakaan Digital',
  'D3 Teknologi Informasi',
  'D4 Teknologi Rekayasa Elektro',
  'D4 Teknologi Mesin',
  'D4 Manajemen Informatika',
  'D4 Akuntansi',
  'D3 Administrasi Perkantoran',
  'D3 Teknik Mesin',
  'D4 Teknologi Industri',
  'D3 Kimia Industri',
  'D4 Teknologi Pendidikan',
];

// Dummy login credentials — akan diganti JWT Supabase saat backend siap
const _DUMMY_USERS = [
  { email:'admin', password:'admin', name:'Admin Pustakawan', role:'Admin Pustakawan' },
  { email:'mhs',   password:'mhs',   name:'Natasya Adelia R.', role:'Mahasiswa' },
  { email:'admin@vokasi.um.ac.id',      password:'admin123', name:'Admin Pustakawan', role:'Admin Pustakawan' },
  { email:'mahasiswa@vokasi.um.ac.id',  password:'mhs123',   name:'Natasya Adelia R.', role:'Mahasiswa' },
];

// ── HELPER ───────────────────────────────────────────────────────
function _authHeader() {
  const u = ApiService.auth.getUser();
  return u && u.token ? { 'Authorization': 'Bearer ' + u.token } : {};
}

async function _fetchJson(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Request gagal' }));
    throw new Error(err.error || 'HTTP ' + res.status);
  }
  return res.json();
}

// ── API SERVICE ───────────────────────────────────────────────────
const ApiService = {

  // ━━ AUTH ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // localStorage('digilab-user') → Supabase auth.users + public.users
  auth: {
    /** Ambil user dari localStorage */
    getUser() {
      return JSON.parse(localStorage.getItem(LS.USER) || 'null');
    },

    /** Simpan user ke localStorage (dipanggil setelah login berhasil) */
    setUser(user) {
      localStorage.setItem(LS.USER, JSON.stringify(user));
    },

    /** Hapus semua auth data */
    clearUser() {
      localStorage.removeItem(LS.USER);
      localStorage.removeItem(LS.PENDING_REG);
    },

    /**
     * Login
     * @returns {ok, user, error}
     * Supabase: POST /api/auth/login → {token, nama, email, role}
     */
    async login(email, password) {
      try {
        const data = await _fetchJson(API_BASE + '/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        const user = { name: data.nama, email: data.email, role: data.role, token: data.token };
        this.setUser(user);
        return { ok: true, user };
      } catch (e) {
        // Fallback dummy
        const found = _DUMMY_USERS.find(function(u) {
          return u.email === email && u.password === password;
        });
        if (found) {
          const user = { name: found.name, email: found.email, role: found.role };
          this.setUser(user);
          return { ok: true, user, offline: true };
        }
        return { ok: false, error: 'Email atau password salah' };
      }
    },

    /**
     * Logout
     * Supabase: POST /api/auth/logout (invalidate token)
     */
    async logout() {
      try {
        await _fetchJson(API_BASE + '/auth/logout', {
          method: 'POST',
          headers: _authHeader()
        });
      } catch (e) { /* always clear local */ }
      this.clearUser();
    },

    /**
     * Daftar akun baru
     * localStorage('digilab-pending-reg') → public.users (status: pending)
     * @returns {ok, offline}
     */
    async register(data) {
      try {
        await _fetchJson(API_BASE + '/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        localStorage.removeItem(LS.PENDING_REG);
        return { ok: true };
      } catch (e) {
        // Simpan offline sementara
        localStorage.setItem(LS.PENDING_REG, JSON.stringify(data));
        return { ok: true, offline: true };
      }
    },

    /**
     * Ambil profil user yang sedang login
     * Supabase: GET /api/auth/me → public.users row
     */
    async getProfile() {
      try {
        return await _fetchJson(API_BASE + '/auth/me', {
          headers: _authHeader()
        });
      } catch (e) {
        return { ..._PROFIL_DUMMY };
      }
    },

    /**
     * Update profil
     * Supabase: PUT /api/auth/me
     */
    async updateProfile(data) {
      try {
        await _fetchJson(API_BASE + '/auth/me', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', ..._authHeader() },
          body: JSON.stringify(data)
        });
        // Sinkron nama di localStorage
        if (data.nama) {
          const u = this.getUser();
          if (u) { u.name = data.nama; this.setUser(u); }
        }
        return { ok: true };
      } catch (e) {
        return { ok: true, offline: true };
      }
    }
  },

  // ━━ KARYA ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Supabase table: karya_ilmiah
  karya: {
    /**
     * Karya publik (beranda, hasil pencarian)
     * GET /api/karya?q=&jenis=&prodi=&tahun=&pembimbing=
     */
    async getAll(filters) {
      filters = filters || {};
      try {
        const params = new URLSearchParams(filters);
        return await _fetchJson(API_BASE + '/karya?' + params);
      } catch (e) {
        let result = _KARYA_PUBLIK.filter(function(k) { return k.status === 'disetujui'; });
        if (filters.q) {
          var q = filters.q.toLowerCase();
          result = result.filter(function(k) {
            return k.judul.toLowerCase().includes(q) ||
                   k.penulis.toLowerCase().includes(q) ||
                   (k.kata_kunci || []).some(function(kk) { return kk.toLowerCase().includes(q); }) ||
                   (k.pembimbing || '').toLowerCase().includes(q);
          });
        }
        if (filters.jenis) result = result.filter(function(k) { return k.jenis === filters.jenis; });
        if (filters.prodi) result = result.filter(function(k) { return k.prodi === filters.prodi; });
        if (filters.tahun) result = result.filter(function(k) { return String(k.tahun) === String(filters.tahun); });
        if (filters.pembimbing) {
          var pb = filters.pembimbing.toLowerCase();
          result = result.filter(function(k) { return (k.pembimbing || '').toLowerCase().includes(pb); });
        }
        return result;
      }
    },

    /**
     * Detail satu karya
     * GET /api/karya/:id
     */
    async getById(id) {
      try {
        return await _fetchJson(API_BASE + '/karya/' + id, { headers: _authHeader() });
      } catch (e) {
        return _KARYA_PUBLIK.find(function(k) { return k.id === Number(id); }) || null;
      }
    },

    /**
     * Karya milik mahasiswa yang login
     * GET /api/karya/me
     */
    async getMilikSaya() {
      try {
        return await _fetchJson(API_BASE + '/karya/me', { headers: _authHeader() });
      } catch (e) {
        return [..._KARYA_MAHASISWA];
      }
    },

    /**
     * Upload karya baru
     * POST /api/karya (multipart/form-data untuk file PDF/foto/video)
     */
    async create(data) {
      try {
        const user = ApiService.auth.getUser();
        const res = await fetch(API_BASE + '/karya', {
          method: 'POST',
          headers: _authHeader(),
          body: data // FormData (multipart)
        });
        if (!res.ok) throw new Error('Upload gagal');
        return { ok: true, data: await res.json() };
      } catch (e) {
        // Offline: kembalikan dummy entry dengan status pending
        return { ok: true, offline: true, data: { id: Date.now(), status: 'pending' } };
      }
    },
  },

  // ━━ ADMIN ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Supabase tables: karya_ilmiah, users, log_verifikasi
  admin: {
    /**
     * Daftar semua karya (untuk halaman Verifikasi Karya & Kelola Karya)
     * GET /api/admin/karya?status=&q=
     */
    async getKarya(filters) {
      filters = filters || {};
      try {
        const params = new URLSearchParams(filters);
        return await _fetchJson(API_BASE + '/admin/karya?' + params, { headers: _authHeader() });
      } catch (e) {
        var result = [..._KARYA_ADMIN];
        if (filters.status) result = result.filter(function(k) { return k.status === filters.status; });
        if (filters.q) {
          var q = filters.q.toLowerCase();
          result = result.filter(function(k) {
            return k.judul.toLowerCase().includes(q) || k.mhs.toLowerCase().includes(q);
          });
        }
        return result;
      }
    },

    /**
     * Verifikasi karya (setujui / revisi / tolak)
     * PUT /api/admin/karya/:id → {action, catatan}
     * action: 'disetujui' | 'revisi' | 'ditolak'
     * Supabase: update karya_ilmiah.status + insert log_verifikasi
     */
    async verifikasiKarya(id, action, catatan) {
      try {
        await _fetchJson(API_BASE + '/admin/karya/' + id, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', ..._authHeader() },
          body: JSON.stringify({ action, catatan: catatan || '' })
        });
        return { ok: true };
      } catch (e) {
        return { ok: true, offline: true };
      }
    },

    /**
     * Daftar akun menunggu verifikasi
     * GET /api/admin/akun?status=
     * Supabase: public.users WHERE status = 'pending'
     */
    async getAkun(filters) {
      filters = filters || {};
      try {
        const params = new URLSearchParams(filters);
        return await _fetchJson(API_BASE + '/admin/akun?' + params, { headers: _authHeader() });
      } catch (e) {
        var result = [..._AKUN_PENDING];
        if (filters.status) result = result.filter(function(a) { return a.status === filters.status; });
        if (filters.q) {
          var q = filters.q.toLowerCase();
          result = result.filter(function(a) {
            return a.nama.toLowerCase().includes(q) || a.nim.includes(q);
          });
        }
        return result;
      }
    },

    /**
     * Verifikasi akun mahasiswa (setujui / tolak)
     * PUT /api/admin/akun/:nim → {action}
     * action: 'disetujui' | 'ditolak'
     * Supabase: update public.users.status
     */
    async verifikasiAkun(nim, action) {
      try {
        await _fetchJson(API_BASE + '/admin/akun/' + nim, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', ..._authHeader() },
          body: JSON.stringify({ action })
        });
        return { ok: true };
      } catch (e) {
        return { ok: true, offline: true };
      }
    },

    /**
     * Statistik dashboard admin
     * GET /api/admin/stats
     */
    async getStats() {
      try {
        return await _fetchJson(API_BASE + '/admin/stats', { headers: _authHeader() });
      } catch (e) {
        return {
          total_karya:      _KARYA_ADMIN.length,
          pending_karya:    _KARYA_ADMIN.filter(function(k) { return k.status === 'pending'; }).length,
          disetujui_karya:  _KARYA_ADMIN.filter(function(k) { return k.status === 'disetujui'; }).length,
          ditolak_karya:    _KARYA_ADMIN.filter(function(k) { return k.status === 'ditolak'; }).length,
          revisi_karya:     _KARYA_ADMIN.filter(function(k) { return k.status === 'revisi'; }).length,
          total_mahasiswa:  11,
          pending_akun:     _AKUN_PENDING.filter(function(a) { return a.status === 'pending'; }).length,
        };
      }
    }
  },

  // ━━ PRODI ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Supabase table: program_studi
  prodi: {
    /**
     * GET /api/prodi → [{id, nama, kode, jenjang}]
     */
    async getAll() {
      try {
        return await _fetchJson(API_BASE + '/prodi');
      } catch (e) {
        return _PRODI_LIST.map(function(nama) { return { nama }; });
      }
    }
  },

  // ━━ UI PREFS — tetap localStorage, tidak perlu backend ━━━━━━━━━
  prefs: {
    getTheme()        { return localStorage.getItem(LS.THEME) || 'indigo'; },
    setTheme(t)       { localStorage.setItem(LS.THEME, t); },
    getLayout()       { return localStorage.getItem(LS.LAYOUT) || 'classic'; },
    setLayout(l)      { localStorage.setItem(LS.LAYOUT, l); },
    getVersion()      { return localStorage.getItem(LS.VERSION); },
    setVersion(v)     { localStorage.setItem(LS.VERSION, v); },
  }
};

// Export global
window.ApiService = ApiService;
window.LS = LS;
