# 📋 Changelog DIGILAB Repository

> Format: `[YYYY-MM-DD] Tipe — Deskripsi`  
> Tipe: `Init` · `Feat` · `Fix` · `Refactor` · `Docs` · `Design` · `Chore`

---

## [2026-06-09] — Setup & Analisis Awal

### Init
- Inisiasi project DIGILAB Repository dari Proposal Hibah Skripsi 2026
- Baca dan analisis dokumen proposal penelitian (38 halaman, metode RAD)

### Design
- Baca 16 file mockup PNG dari folder "Desain Sistem Repositori Natasya"
- Baca Mindmap Repositori (4 cabang utama: Metodologi RAD, Fitur Utama, Alur Sistem, Tujuan Strategis)
- Dokumentasi design language: header navy/indigo, aksen oranye, bg abu muda, logo DigiLab

### Docs
- Buat `checklist.md` — disesuaikan dengan mindmap & mockup (5 fase, 60+ item)
- Buat `changelog.md` — template log perubahan project
- Buat `DIGILAB_MindMap.html` — visualisasi interaktif peta penelitian (mindmap + jadwal)
- Buat `checklist.html` — halaman web checklist interaktif (centang, progress bar, filter, localStorage)
- Buat `changelog.html` — halaman web changelog dengan tampilan timeline sesuai desain Natasya

### Chore
- Setup struktur folder: `frontend/`, `backend/`, `database/`, `design/`, `docs/`, `tests/`
- Setup `backend/package.json` (Node.js + Express + Sequelize + JWT + multer)
- Setup `backend/server.js` — entry point dengan health check endpoint
- Setup `backend/.env.example` — template konfigurasi environment
- Setup `frontend/package.json` (Vite)
- Setup `docker-compose.yml` — MySQL + backend + frontend untuk local dev
- Buat `database/migrations/001_create_tables.sql` — skema lengkap + seed 11 prodi + 6 kategori
- Buat `frontend/public/index.html` — halaman awal (template, belum sesuai desain Natasya)

---

## [2026-06-09] — Migrasi Database & Persiapan GitHub

### Refactor
- Migrasi database dari MySQL ke **Supabase** (PostgreSQL)
- Hapus `mysql2` dan `sequelize` dari `backend/package.json`
- Tambah `@supabase/supabase-js ^2.39.0`
- Update `backend/server.js`: inisiasi Supabase client, health check test koneksi Supabase
- Update `backend/.env.example`: ganti variabel DB_* dengan SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, SUPABASE_STORAGE_BUCKET
- Konversi `database/migrations/001_create_tables.sql` dari MySQL ke PostgreSQL (YEAR→SMALLINT, FULLTEXT→GIN, AUTO_INCREMENT→SERIAL, TIMESTAMPTZ, RLS policies)
- Update `docker-compose.yml`: hapus service MySQL, sisakan backend + frontend saja

### Chore
- Buat `.gitignore` (exclude node_modules, .env, uploads/, dist/, logs/, OS files)
- Buat `test_server_lokal.bat` — Windows batch file untuk menjalankan backend + frontend lokal tanpa Docker (otomatis install deps, cek .env, buka browser)

---

## [2026-06-09] — Frontend Landing Page

### Design
- Rebuild `frontend/public/index.html` sesuai mockup Natasya — SPA multi-halaman
- Halaman: Beranda (search centered), Hasil Pencarian (card list + panel), Detail Dokumen (metadata + Informasi panel), Login (navy card), Karya Ilmiah (tabel + Unggah)
- Header sticky navy (#2e3192), logo DigiLab SVG inline, footer navy
- Background lavender-grey (#e8e8f0), font Nunito + Lato
- Tombol PDF/Penulis/Produk merah, popup login overlay sesuai mockup halaman 4–6
- Responsive mobile-ready

### Feat
- SPA navigasi tanpa reload, data demo 6 karya ilmiah
- Search + filter Jenis, klik kartu ke detail, popup login guard

---

## [2026-06-09] — Fix Local Server

### Fix
- Pindah `frontend/public/index.html` → `frontend/index.html` (Vite root, sebelumnya tidak terbaca oleh Vite)
- Rewrite `test_server_lokal.bat`: hapus karakter Unicode (box-drawing, arrow) yang menyebabkan error di CMD, ganti `cd` dengan `pushd/popd` yang lebih aman, tambah error handling lebih jelas

---

## [2026-06-09] — Redesign MindMap & Integrasi Homepage

### Design
- Redesign `DIGILAB_MindMap.html` dari tema gelap (navy `#050e1a`) ke tema clean/terang
- Header disamakan dengan DIGILAB site: navy `#2e3192`, logo SVG inline, font Nunito + Lato
- Background lavender `#f0f0f6`, panel detail putih, border `#d4d4e8`, teks navy gelap
- Badge "Hibah Skripsi 2026" dengan animasi dot oranye
- Tombol "← Kembali" di header untuk navigasi balik
- Node mindmap: lingkaran putih dengan stroke berwarna per cabang (bukan fill gelap)
- Root node aksen titik oranye (`#f97316`), font Nunito Bold

### Feat
- Salin `DIGILAB_MindMap.html` → `frontend/public/mindmap.html` (Vite serving)
- Tambah `#page-mindmap` di `frontend/index.html` — iframe full-page mindmap
- Tambah blok "Peta Pengembangan Sistem DIGILAB" di halaman Beranda sebagai preview iframe
- Tombol "Buka Peta Pikiran →" untuk masuk ke halaman penuh mindmap

---

<!-- Template entri berikutnya:

## [YYYY-MM-DD] — Judul

### Feat
- Tambah fitur X

### Fix
- Perbaiki bug Y

### Design
- Update tampilan Z berdasarkan feedback

-->
