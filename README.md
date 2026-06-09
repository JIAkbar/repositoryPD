# 🗄️ DIGILAB Repository

> **Sistem Layanan Repositori Karya Ilmiah Fakultas Vokasi**  
> Universitas Negeri Malang | Hibah Skripsi 2026

---

## 📁 Struktur Folder

```
DIGILAB-Repository/
├── frontend/               ← Antarmuka pengguna (HTML/CSS/JS atau React)
│   ├── public/             ← Aset statis
│   └── src/
│       ├── pages/          ← Halaman-halaman aplikasi
│       ├── components/     ← Komponen UI yang dapat digunakan ulang
│       └── assets/         ← Gambar, ikon, font
│
├── backend/                ← Server & REST API (Node.js + Express)
│   ├── routes/             ← Definisi endpoint API
│   ├── controllers/        ← Logika bisnis tiap endpoint
│   ├── middleware/         ← Autentikasi, validasi, dll.
│   ├── models/             ← Model database (Sequelize)
│   ├── server.js           ← Entry point server
│   └── .env.example        ← Template variabel lingkungan
│
├── database/
│   ├── migrations/         ← Skema & skrip SQL
│   └── seeds/              ← Data awal (program studi, kategori)
│
├── design/
│   ├── mockups/            ← File mockup UI (Figma export, PNG)
│   └── assets/             ← Logo, warna, panduan desain
│
├── docs/                   ← Dokumentasi teknis & panduan
├── tests/                  ← File pengujian
│
├── docker-compose.yml      ← Setup Docker untuk local development
├── checklist.md            ← Daftar tugas per fase
├── changelog.md            ← Catatan perubahan project
└── README.md               ← Dokumen ini
```

---

## 🚀 Cara Menjalankan Lokal

### Prasyarat
- [Node.js](https://nodejs.org/) v18+
- [MySQL](https://www.mysql.com/) 8.0 atau [Docker](https://www.docker.com/)

### Opsi A — Docker (Direkomendasikan)

```bash
# Clone / buka folder project
cd DIGILAB-Repository

# Jalankan semua service (database + backend + frontend)
docker-compose up -d

# Akses:
# Frontend : http://localhost:3000
# Backend  : http://localhost:5000
# Database : localhost:3306
```

### Opsi B — Manual

**1. Setup Database**
```bash
# Buat database di MySQL
mysql -u root -p < database/migrations/001_create_tables.sql
```

**2. Jalankan Backend**
```bash
cd backend
cp .env.example .env          # Isi konfigurasi .env
npm install
npm run dev                   # Berjalan di http://localhost:5000
```

**3. Jalankan Frontend**
```bash
cd frontend
npm install
npm run dev                   # Berjalan di http://localhost:3000
```

---

## 🔗 Endpoint API Utama

| Method | Endpoint                   | Keterangan                        |
|--------|----------------------------|-----------------------------------|
| GET    | `/api/health`              | Health check server               |
| POST   | `/api/auth/register`       | Registrasi pengguna baru          |
| POST   | `/api/auth/login`          | Login & dapatkan token JWT        |
| GET    | `/api/karya`               | Daftar karya ilmiah (publik)      |
| POST   | `/api/karya`               | Upload karya ilmiah (butuh login) |
| GET    | `/api/karya/:id`           | Detail karya ilmiah               |
| GET    | `/api/admin/pending`       | Karya menunggu verifikasi (admin) |
| PUT    | `/api/admin/karya/:id`     | Verifikasi / tolak karya (admin)  |

---

## 👥 Tim Peneliti

| Peran             | Nama                         | ID               |
|-------------------|------------------------------|------------------|
| Ketua Peneliti    | Achmad Hamdan, S.Pd., M.Pd.  | NIDN: 0023039202 |
| Anggota           | Natasya Adelia R.            | NIM: 220213704262|

---

*Dokumentasi lengkap tersedia di folder `/docs`*
