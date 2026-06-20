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

// ─── Supabase Client ───────────────────────────────────────────
const SUPABASE_URL     = 'https://ezsezrrmhrbuvrexjnle.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_pO0oz9G6zlNiDc16X4icPQ_BEfER2ZN';
const _supa = (typeof window !== 'undefined' && window.supabase)
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

// localStorage keys — terpusat di sini, tidak boleh hardcode di page lain
const LS = {
  USER:        'digilab-user',        // {name, email, role, token, foto}  → Supabase Auth
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
    prodi: 'D4 Teknologi Rekayasa Sistem Elektronika',
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
    prodi: 'D4 Teknologi Rekayasa Otomotif',
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
    prodi: 'D4 Manajemen Pemasaran',
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
    prodi: 'D4 Desain Mode',
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
  { id:1, nopanggil:'BAG/TM/PI/PRO/2024', judul:'Prototipe Alat Monitoring Kualitas Air Sungai Berbasis IoT', mhs:'Bagas Prasetyo', prodi:'D4 Teknologi Rekayasa Otomotif', tgl:'12 Jun 2025', status:'pending', link:'https://github.com/bagas/iot-water' },
  { id:2, nopanggil:'DEW/TI/TA/SIS/2023', judul:'Sistem Informasi Akademik Terintegrasi Berbasis Cloud', mhs:'Dewi Rahayu', prodi:'D4 Teknologi Rekayasa Sistem Elektronika', tgl:'09 Jun 2025', status:'disetujui', link:'' },
  { id:3, nopanggil:'SAR/AP/LM/IMP/2022', judul:'Implementasi Sistem Manajemen Arsip Digital', mhs:'Sari Wulandari', prodi:'D4 Manajemen Pemasaran', tgl:'10 Jun 2025', status:'revisi', link:'' },
  { id:4, nopanggil:'RIZ/AK/AJ/ANA/2023', judul:'Analisis Efisiensi Anggaran Daerah Kota Malang 2020–2023', mhs:'Rizki Amalia', prodi:'D4 Akuntansi', tgl:'09 Jun 2025', status:'disetujui', link:'' },
  { id:5, nopanggil:'KAR/PD/TA/RAN/2020', judul:'Rancang Bangun Website Perpustakaan Keliling Berbasis PWA', mhs:'Karina Aliya', prodi:'D4 Perpustakaan Digital', tgl:'08 Jun 2025', status:'pending', link:'' },
  { id:6, nopanggil:'FAU/DKV/PI/IDE/2022', judul:'Identitas Visual Brand UMKM Kota Malang', mhs:'Ahmad Fauzan', prodi:'D4 Desain Mode', tgl:'07 Jun 2025', status:'pending', link:'' }
];

const _AKUN_PENDING = [
  { nim:'230213704301', nama:'Bima Saputra',       prodi:'D4 Teknologi Rekayasa Sistem Elektronika',    tgl:'10 Jun', status:'pending' },
  { nim:'230213704302', nama:'Laila Fitriani',     prodi:'D4 Manajemen Pemasaran', tgl:'11 Jun', status:'pending' },
  { nim:'230213704303', nama:'Rizal Hidayatullah', prodi:'D4 Akuntansi',               tgl:'11 Jun', status:'pending' },
  { nim:'230213704305', nama:'Dwi Kurniawati',     prodi:'D4 Perpustakaan Digital',    tgl:'12 Jun', status:'disetujui' },
  { nim:'230213704306', nama:'Fajar Nugroho',      prodi:'D4 Teknologi Rekayasa Otomotif',            tgl:'08 Jun', status:'ditolak' }
];

const _PROFIL_DUMMY = {
  nama: 'Natasya Adelia R.',
  nim: '220213704262',
  prodi: 'D4 Perpustakaan Digital',
  angkatan: '2022',
  gender: 'P',
  email: 'mahasiswa@vokasi.um.ac.id',
  foto_url: null,  // Supabase Storage URL saat backend aktif; null = tampilkan initials avatar
};

const _PRODI_LIST = [
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
  'D4 Teknologi Rekayasa Sistem Elektronika',
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
    /** Ambil user dari localStorage (sync) */
    getUser() {
      return JSON.parse(localStorage.getItem(LS.USER) || 'null');
    },

    /**
     * Ambil user dari Supabase session (async).
     * Gunakan ini di checkAuth() jika ingin verifikasi token masih valid.
     * Fallback ke localStorage jika Supabase belum tersedia.
     */
    async getUserAsync() {
      if (_supa) {
        const { data: { session } } = await _supa.auth.getSession();
        if (session) {
          const stored = localStorage.getItem(LS.USER);
          if (stored) return JSON.parse(stored);
        }
      }
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
     * Primary: Supabase Auth signInWithPassword
     * Fallback: Express backend → Dummy credentials
     */
    async login(email, password) {
      // ── Primary: Supabase Auth ──────────────────────────────────
      if (_supa) {
        try {
          const { data, error } = await _supa.auth.signInWithPassword({ email, password });
          if (error) throw error;
          // Ambil profil dari tabel public.users
          const { data: profile } = await _supa
            .from('users')
            .select('*, program_studi(nama)')
            .eq('id', data.user.id)
            .single();
          const user = {
            id:    data.user.id,
            name:  profile?.nama_lengkap || data.user.email,
            email: data.user.email,
            role:  profile?.role || 'mahasiswa',
            nim:   profile?.nim_nidn || null,
            foto:  profile?.foto_url || null,
          };
          this.setUser(user);
          return { ok: true, user };
        } catch (supaErr) {
          // Jika error bukan "user not found" (misalnya network error), tetap lanjut ke fallback
          if (supaErr.message && supaErr.message.toLowerCase().includes('invalid login credentials')) {
            // Credentials salah — tidak perlu coba backend/dummy
            // tapi tetap coba dummy untuk dev convenience
          } else if (supaErr.message && supaErr.message.toLowerCase().includes('network')) {
            // Network error — lanjut ke fallback
          }
        }
      }

      // ── Fallback 1: Express Backend ─────────────────────────────
      try {
        const data = await _fetchJson(API_BASE + '/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        const user = {
          name:  data.nama,
          email: data.email,
          role:  data.role,
          token: data.token,
          foto:  data.foto_url || null,
        };
        this.setUser(user);
        return { ok: true, user };
      } catch (e) {
        // Fallback 2: Dummy credentials (development only)
        const found = _DUMMY_USERS.find(function(u) {
          return u.email === email && u.password === password;
        });
        if (found) {
          const user = { name: found.name, email: found.email, role: found.role, foto: null };
          this.setUser(user);
          return { ok: true, user, offline: true };
        }
        return { ok: false, error: 'Email atau password salah' };
      }
    },

    /**
     * Logout
     * Primary: Supabase signOut
     * Fallback: Express backend logout → always clear localStorage
     */
    async logout() {
      // Supabase signOut (invalidate session di server)
      if (_supa) {
        try { await _supa.auth.signOut(); } catch (e) { /* always clear local */ }
      }
      // Express backend fallback
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
     * Field yang dikirim: { nama, nim, prodi, email, password }
     * foto_url diisi setelah akun diverifikasi admin + mahasiswa upload foto via uploadFoto()
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
     * Supabase: GET /api/auth/me → public.users row (termasuk foto_url dari Storage)
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
     * Update profil teks (nama, email, nim, gender, angkatan, prodi)
     * Supabase: PUT /api/auth/me → public.users
     * Untuk update foto, gunakan uploadFoto() terpisah.
     * @param {Object} data — { nama?, email?, nim?, prodi?, gender?, angkatan?, foto_url? }
     */
    async updateProfile(data) {
      try {
        await _fetchJson(API_BASE + '/auth/me', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', ..._authHeader() },
          body: JSON.stringify(data)
        });
        // Sinkron nama, email, dan foto_url di localStorage
        const u = this.getUser();
        if (u) {
          if (data.nama)     { u.name  = data.nama; }
          if (data.email)    { u.email = data.email; }
          if (data.foto_url) { u.foto  = data.foto_url; }
          this.setUser(u);
        }
        return { ok: true };
      } catch (e) {
        // Offline fallback: tetap sinkron localStorage walau API gagal
        const u = this.getUser();
        if (u) {
          if (data.nama)     { u.name  = data.nama; }
          if (data.email)    { u.email = data.email; }
          if (data.foto_url) { u.foto  = data.foto_url; }
          this.setUser(u);
        }
        return { ok: true, offline: true };
      }
    },

    /**
     * Upload foto profil ke Supabase Storage
     *
     * Supabase path  : avatars/{userId}/profile.jpg   (bucket: avatars, public)
     * Backend endpoint: POST /api/auth/me/foto (multipart, field: foto)
     *   → server upload ke Storage → update public.users.foto_url → return { foto_url }
     *
     * Development fallback: simpan sebagai base64 di localStorage (digilab-user.foto)
     *   Saat backend aktif, ganti seluruh body try{} dengan fetch ke endpoint di atas.
     *
     * @param {File}   file   — File object dari <input type="file">
     * @param {string} userId — UUID user (dari ApiService.auth.getUser().id atau Supabase uid)
     * @returns {Promise<string>} — URL foto (base64 di dev, Storage URL di prod)
     */
    async uploadFoto(file, userId) {
      // Validasi file sebelum upload
      const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
      const MAX_SIZE_MB   = 2;
      if (!ALLOWED_TYPES.includes(file.type)) {
        throw new Error('Format foto tidak didukung. Gunakan JPG, PNG, atau WebP.');
      }
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        throw new Error('Ukuran foto maksimal ' + MAX_SIZE_MB + 'MB.');
      }

      try {
        // ── SAAT BACKEND AKTIF: uncomment blok ini, hapus blok fallback di bawah ──
        //
        // const formData = new FormData();
        // formData.append('foto', file);
        // const res = await fetch(API_BASE + '/auth/me/foto', {
        //   method: 'POST',
        //   headers: _authHeader(),   // Content-Type otomatis multipart dari FormData
        //   body: formData
        // });
        // if (!res.ok) throw new Error('Upload foto gagal: HTTP ' + res.status);
        // const { foto_url } = await res.json();
        //
        // // Sinkron foto_url ke localStorage
        // const u = this.getUser();
        // if (u) { u.foto = foto_url; this.setUser(u); }
        // return foto_url;
        //
        // ── ATAU langsung via Supabase JS SDK (tanpa backend) ──
        //
        // const ext  = file.name.split('.').pop();
        // const path = userId + '/profile.' + ext;
        // const { error: upErr } = await supabase.storage
        //   .from('avatars')
        //   .upload(path, file, { upsert: true, contentType: file.type });
        // if (upErr) throw upErr;
        // const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(path);
        // await supabase.from('users').update({ foto_url: publicUrl }).eq('id', userId);
        // const u = this.getUser();
        // if (u) { u.foto = publicUrl; this.setUser(u); }
        // return publicUrl;

        // ── DEVELOPMENT FALLBACK: base64 di localStorage ──────────────────────────
        // Catatan: base64 ~1.3× ukuran file asli — untuk dev saja, bukan production
        return await new Promise(function(resolve, reject) {
          const reader = new FileReader();
          reader.onload = function(e) {
            try {
              const u = JSON.parse(localStorage.getItem(LS.USER) || '{}');
              u.foto = e.target.result;
              localStorage.setItem(LS.USER, JSON.stringify(u));
              resolve(e.target.result);
            } catch (writeErr) {
              reject(new Error('Gagal menyimpan foto ke localStorage: ' + writeErr.message));
            }
          };
          reader.onerror = function() { reject(new Error('Gagal membaca file foto.')); };
          reader.readAsDataURL(file);
        });
        // ─────────────────────────────────────────────────────────────────────────

      } catch (e) {
        console.error('uploadFoto error:', e);
        throw e;  // re-throw agar pemanggil bisa tampilkan pesan error ke user
      }
    },
  },

  // ━━ KARYA ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Supabase table: karya_ilmiah
  karya: {
    /**
     * Karya publik (beranda, hasil pencarian)
     * Primary: Supabase karya_ilmiah
     * Fallback 1: Express GET /api/karya
     * Fallback 2: _KARYA_PUBLIK dummy
     */
    async getAll(filters) {
      filters = filters || {};

      // ── Primary: Supabase ───────────────────────────────────────
      if (_supa) {
        try {
          let query = _supa
            .from('karya_ilmiah')
            .select('*, program_studi(nama), users(nama_lengkap)')
            .eq('status', 'disetujui')
            .order('created_at', { ascending: false });

          if (filters.jenis) query = query.eq('jenis', filters.jenis);
          if (filters.tahun) query = query.eq('tahun', Number(filters.tahun));
          if (filters.q) {
            // Full-text search: judul, abstrak, kata_kunci
            query = query.or(
              'judul.ilike.%' + filters.q + '%,' +
              'abstrak.ilike.%' + filters.q + '%,' +
              'kata_kunci.ilike.%' + filters.q + '%'
            );
          }
          const { data, error } = await query;
          if (!error && data) {
            // Normalisasi field untuk kompatibilitas frontend
            return data.map(function(k) {
              return Object.assign({}, k, {
                penulis:     (k.users && k.users.nama_lengkap) || k.penulis || '',
                prodi:       (k.program_studi && k.program_studi.nama) || k.prodi || '',
                kata_kunci:  Array.isArray(k.kata_kunci) ? k.kata_kunci : (k.kata_kunci ? k.kata_kunci.split(',') : []),
              });
            });
          }
        } catch (supaErr) {
          console.warn('Supabase getAll error, falling back:', supaErr.message);
        }
      }

      // ── Fallback 1: Express Backend ─────────────────────────────
      try {
        const params = new URLSearchParams(filters);
        return await _fetchJson(API_BASE + '/karya?' + params);
      } catch (e) {
        // ── Fallback 2: Dummy data ──────────────────────────────
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
  // Supabase RPC: approve_user_account, reject_user_account,
  //               get_pending_accounts, get_all_accounts
  // (jalankan 005_rls_admin.sql di Supabase sebelum pakai)
  admin: {

    /** Ambil daftar akun mahasiswa yang belum disetujui */
    getPendingAccounts: async () => {
      try {
        if (_supa) {
          const { data, error } = await _supa.rpc('get_pending_accounts');
          if (!error && data?.ok) return data.data;
        }
        // Express backend fallback
        const res = await fetch(`${_BASE}/api/admin/akun?status=pending`);
        if (res.ok) return (await res.json()).data || [];
      } catch (_) {}
      // Dummy fallback
      return _DUMMY_AKUN.filter(a => !a.is_active);
    },

    /** Ambil semua akun mahasiswa */
    getAllAccounts: async () => {
      try {
        if (_supa) {
          const { data, error } = await _supa.rpc('get_all_accounts');
          if (!error && data?.ok) return data.data;
        }
        const res = await fetch(`${_BASE}/api/admin/akun`);
        if (res.ok) return (await res.json()).data || [];
      } catch (_) {}
      return _DUMMY_AKUN;
    },

    /**
     * Setujui akun mahasiswa — panggil dari admin panel
     * @param {string} userId  UUID public.users
     * @returns {{ ok: boolean, msg?: string, error?: string }}
     */
    approveAccount: async (userId) => {
      try {
        if (_supa) {
          const { data, error } = await _supa.rpc('approve_user_account', {
            target_user_id: userId
          });
          if (error) throw error;
          return data; // { ok: true, nama: '...', msg: '...' }
        }
        // Express backend fallback
        const token = _supa?.auth?.session()?.access_token || '';
        const res = await fetch(`${_BASE}/api/admin/akun/${userId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ action: 'approve' })
        });
        return await res.json();
      } catch (e) {
        // Dummy fallback (update lokal saja)
        const akun = _DUMMY_AKUN.find(a => a.id === userId);
        if (akun) akun.is_active = true;
        return { ok: true, offline: true, msg: 'Akun disetujui (offline mode)' };
      }
    },

    /**
     * Tolak / nonaktifkan akun mahasiswa
     * @param {string} userId  UUID public.users
     */
    rejectAccount: async (userId) => {
      try {
        if (_supa) {
          const { data, error } = await _supa.rpc('reject_user_account', {
            target_user_id: userId
          });
          if (error) throw error;
          return data;
        }
        const token = _supa?.auth?.session()?.access_token || '';
        const res = await fetch(`${_BASE}/api/admin/akun/${userId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ action: 'reject' })
        });
        return await res.json();
      } catch (e) {
        const akun = _DUMMY_AKUN.find(a => a.id === userId);
        if (akun) akun.is_active = false;
        return { ok: true, offline: true, msg: 'Akun ditolak (offline mode)' };
      }
    },

    /**
     * Update status karya (disetujui/ditolak/revisi) dari admin panel
     * @param {string} karyaId  UUID karya_ilmiah
     * @param {string} status   'disetujui' | 'ditolak' | 'revisi'
     * @param {object} catatan  { field: 'isi catatan', ... } (khusus revisi)
     */
    updateKaryaStatus: async (karyaId, status, catatan = {}) => {
      try {
        if (_supa) {
          const payload = { status };
          if (status === 'revisi') payload.catatan_revisi = catatan;
          const { error } = await _supa
            .from('karya_ilmiah')
            .update({ ...payload, updated_at: new Date().toISOString() })
            .eq('id', karyaId);
          if (!error) return { ok: true };
          throw error;
        }
        const token = '';
        const res = await fetch(`${_BASE}/api/admin/karya/${karyaId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ status, catatan_revisi: catatan })
        });
        return await res.json();
      } catch (e) {
        return { ok: true, offline: true };
      }
    },
  },

};
/* ─── End ApiService ─────────────────────────────────────────── */
