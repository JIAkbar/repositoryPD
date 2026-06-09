# ✅ Checklist DIGILAB Repository

> **Project:** Sistem Layanan Repositori Karya Ilmiah Fakultas Vokasi UM  
> **Peneliti:** Natasya Adelia R. · Pembimbing: Achmad Hamdan, S.Pd., M.Pd.  
> **Skema:** Hibah Skripsi 2026  
> *Diperbarui berdasarkan Mindmap Repositori + 16 mockup desain*

---

## 📋 Fase 1 — Requirements Planning
- [ ] Identifikasi masalah penyimpanan karya ilmiah
- [ ] Observasi lapangan perpustakaan Fakultas Vokasi
- [ ] Wawancara mahasiswa perwakilan tiap prodi
- [ ] Wawancara Ketua Program Studi (11 prodi)
- [ ] Dokumentasi kebutuhan fungsional & non-fungsional
- [ ] Persetujuan dokumen kebutuhan dari stakeholder

## 🎨 Fase 2 — RAD Design Workshop
- [ ] Perancangan iteratif bersama pengguna & pustakawan
- [ ] Wireframe Halaman Beranda (search + filter Jenis)
- [ ] Wireframe Hasil Pencarian (list karya + info total)
- [ ] Wireframe Detail Dokumen (info + PDF/Penulis/Produk)
- [ ] Wireframe popup proteksi login (PDF, Penulis, Produk)
- [ ] Wireframe PDF Viewer (embed browser)
- [ ] Wireframe Halaman Produk (galeri foto + video)
- [ ] Wireframe Informasi Penulis
- [ ] Wireframe Halaman Login
- [ ] Wireframe Karya Ilmiah (daftar milik user)
- [ ] Wireframe Unggah Step 1 — Detail Informasi
- [ ] Wireframe Unggah Step 2 — Upload Dokumen & Media
- [ ] Wireframe Unggah Step 3 — Konfirmasi
- [ ] Wireframe Akun Saya (edit profil)
- [ ] Review desain bersama pengguna & pustakawan
- [ ] Finalisasi desain UI/UX

## 💻 Fase 3 — Pembuatan Sistem

### 🗄️ Database
- [ ] Desain ERD lengkap
- [x] Migration: tabel users (PostgreSQL / Supabase)
- [x] Migration: tabel program_studi (11 prodi)
- [x] Migration: tabel karya_ilmiah
- [x] Migration: tabel media_files (dokumen, foto, video)
- [x] Migration: tabel log_verifikasi
- [x] Seed data 11 program studi

### ⚙️ Backend API
- [x] Setup project Node.js + Express
- [ ] API Auth: login, logout, session JWT
- [ ] API Karya: list, detail, search & filter
- [ ] API Karya: upload mandiri mahasiswa (3-step)
- [ ] API Karya: hak akses bantuan admin untuk upload
- [ ] API Validasi Admin: verifikasi / revisi / lolos
- [ ] API Produk: galeri foto + video per karya
- [ ] API Penulis: informasi penulis per karya
- [ ] API User: edit profil, ubah kata sandi
- [ ] Middleware autentikasi JWT
- [ ] Middleware otorisasi role (mahasiswa/admin/pustakawan)
- [ ] Upload handler: PDF dokumen
- [ ] Upload handler: foto (.png/.jpg/.jpeg)
- [ ] Upload handler: video (.mp4/.mp3)
- [ ] Logika akses dokumen: luar kampus = per bab
- [ ] Logika akses dokumen: lab perpustakaan = full page

### 🖥️ Frontend
- [x] Setup project (Vite) — package.json + index.html di root frontend
- [x] Komponen Navbar (logo DigiLab SVG inline, ikon akun)
- [x] Halaman Beranda — search + dropdown Jenis + tombol Cari
- [x] Halaman Hasil Pencarian — list karya, badge pembaca, pagination
- [x] Halaman Detail Dokumen — metadata lengkap + abstrak
- [x] Fitur proteksi: popup login untuk PDF
- [x] Fitur proteksi: popup login untuk Informasi Penulis
- [x] Fitur proteksi: popup login untuk Produk
- [ ] Halaman PDF Viewer (embed, blokir download & screenshot)
- [ ] Halaman Informasi Penulis
- [ ] Halaman Produk — galeri foto + video player
- [x] Halaman Login — card terpusat (navy card, logo besar)
- [x] Halaman Karya Ilmiah user — tabel + tombol Unggah
- [ ] Halaman Unggah Step 1 — form metadata
- [ ] Halaman Unggah Step 2 — drag & drop PDF + foto/video
- [ ] Halaman Unggah Step 3 — konfirmasi + tombol Unggah
- [ ] Halaman Akun Saya — edit profil + ubah password
- [ ] Blokir klik kanan & tangkap layar (CSS + JS)
- [x] Responsif mobile & tablet

### 🛡️ Keamanan & Fitur Khusus
- [ ] Blokir unduhan file dari frontend
- [ ] Blokir tangkap layar (CSS user-select + overlay)
- [ ] Akses luar: tampilkan per bab saja
- [ ] Akses lab perpustakaan: full page (deteksi IP/jaringan)

## 🧪 Fase 4 — Pengujian & Validasi
- [ ] Uji Ahli Materi — kevalidan konten sistem
- [ ] Uji Ahli Media — kevalidan tampilan & UX
- [ ] Revisi berdasarkan hasil uji ahli
- [ ] Pengujian fungsional semua alur pengguna
- [ ] Pengujian alur validasi admin (verifikasi/revisi/lolos)
- [ ] Pengujian proteksi login & akses dokumen
- [ ] Pengujian responsivitas perangkat
- [ ] Penerapan sistem di Fakultas Vokasi

## 🚀 Fase 5 — Luaran
- [ ] Website DIGILAB Repository live
- [ ] Pengajuan HKI (Hak Kekayaan Intelektual)
- [ ] Penulisan & submit artikel Jurnal Sinta 4
- [ ] Publikasi di media sosial
- [ ] Pembuatan poster penelitian

## 📄 Dokumentasi
- [ ] README.md lengkap
- [ ] Dokumentasi API (Postman/Swagger)
- [ ] Panduan instalasi & setup lokal
- [ ] User manual sistem

### 🗺️ Peta Pengembangan (MindMap)
- [x] Redesign DIGILAB_MindMap.html ke tema clean/terang (navy header, putih panel, font Nunito)
- [x] Salin ke `frontend/public/mindmap.html` (tersedia via Vite)
- [x] Tambah halaman `#page-mindmap` dengan iframe full-page di frontend SPA
- [x] Tambah preview mindmap di halaman Beranda (iframe + tombol buka)

---

*Terakhir diperbarui: 2026-06-09 — redesign mindmap clean theme + integrasi di homepage*
