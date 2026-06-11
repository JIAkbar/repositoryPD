---
name: project-digilab-repository
description: "Project DIGILAB Repository — sistem repositori karya ilmiah Fakultas Vokasi UM 2026, struktur folder, stack, dan konvensi file"
metadata: 
  node_type: memory
  type: project
  originSessionId: 055186de-bf09-4bb9-ab24-52c91f75a519
---

# Project DIGILAB Repository

**Fakta:** Pengembangan sistem layanan repositori berbasis web untuk Fakultas Vokasi Universitas Negeri Malang.

**Why:** Luaran mahasiswa dari 11 program studi tersimpan terpisah-pisah, belum ada sistem terintegrasi. Penelitian Hibah Skripsi 2026 oleh Natasya Adelia R. dengan pembimbing Achmad Hamdan, S.Pd., M.Pd.

**How to apply:** Setiap kali bekerja di project ini, cek checklist.md untuk progress, update changelog.md untuk setiap perubahan signifikan.

## Lokasi File
- Folder utama: `C:\1-Johan\10. Pengembangan\DIGILAB-Repository\` ← path baru (subfolder "Repositori Fakultas Vokasi" dihapus)
- Mindmap visualisasi: `DIGILAB_MindMap.html`
- GitHub Johan: `https://github.com/JIAkbar/repositoryPD` → Pages: `https://jiakbar.github.io/repositoryPD/`
- GitHub Natasya: `https://github.com/natasyaadel/RPD` → Pages: `https://natasyaadel.github.io/RPD/`

## Struktur Folder
```
DIGILAB-Repository/
├── docs/           ← UI (Vite/Vanilla) — GitHub Pages source; SATU-SATUNYA folder frontend
├── backend/        ← Node.js + Express REST API
├── database/       ← PostgreSQL schema + migrations
├── design/         ← Mockups & aset desain
├── tests/          ← Pengujian
├── checklist.md    ← Daftar tugas per fase
├── changelog.md    ← Log perubahan
└── docker-compose.yml
```

**⚠️ PENTING — File besar (index.html >42KB):** Edit tool punya batas ukuran file dan akan truncate file. Selalu gunakan Python (`python3 << 'PY' ... PY`) untuk modifikasi `docs/index.html`. TIDAK ada `frontend/` lagi — `docs/` satu-satunya sumber.

## Stack Teknologi
- **Frontend:** Vanilla JS (HTML/CSS/JS murni, NO Vite) — dev server pakai `Python -m http.server`
- **Backend:** Node.js + Express
- **Database:** **Supabase (PostgreSQL cloud)** — via @supabase/supabase-js
- **Auth:** JWT (jsonwebtoken) + bcryptjs
- **File upload:** multer + Supabase Storage
- **Dev lokal:** `test_server_lokal.bat` (tanpa Docker); Docker Compose tersedia (tanpa DB service)

## Port Lokal
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Database: Supabase cloud (tidak ada port lokal)

## Fase Penelitian (RAD)
1. Requirements Planning — observasi & wawancara 11 prodi
2. RAD Design Workshop — desain iteratif, user & admin involvement
3. Implementation — validasi ahli materi & media, deployment

## Luaran Target
- Website DIGILAB Repository
- HKI
- Artikel Sinta 4
- Publikasi medsos
- Poster penelitian

## Design System (dari folder "Desain Sistem Repositori Natasya")
**Warna:** Header navy/indigo (#2e3192), aksen oranye (stepper aktif), bg abu sangat muda (#eeeef5)  
**Font:** Bold sans-serif untuk judul, regular untuk body  
**Logo:** Buku + sirkuit digital, nama "DigiLab REPOSITORY"

### 16 Halaman Mockup (file 1.png–14.png + Login.png + 10-akun saya.png):
1. **Beranda** — Search bar besar, judul "DIGILAB Repository", dropdown Jenis + tombol Cari
2. **Hasil Pencarian** — List karya (thumbnail buku hijau, judul bold, penulis italic merah, badge jumlah pembaca), panel kanan info total hasil, pagination
3. **Detail Dokumen (login)** — Info lengkap (Judul/Penulis/Dosen/Tahun/Jenis/No.Panggil/Bidang), panel kanan tombol PDF·Penulis·Produk, bagian Abstrak
4. **Detail Dokumen (guest → PDF)** — Popup "SILAHKAN LOGIN UNTUK MENGAKSES PDF" + tombol LOGIN
5. **Detail Dokumen (guest → Penulis)** — Popup login untuk akses Informasi Penulis
6. **Detail Dokumen (guest → Produk)** — Popup login untuk akses Produk
7. **PDF Viewer** — Embed viewer (halaman X/Y, zoom 60%), tombol Kembali
8. **Informasi Penulis** — Foto + tabel data (Nama, NIM, Prodi, Angkatan, Jenis Kelamin, Email)
9. **Produk** — Galeri foto (grid 4 kolom) + 1 thumbnail video dengan play button
10. **Akun Saya** — Edit profil dengan field Ubah Kata Sandi, tombol Simpan
11. **Karya Ilmiah (user)** — Tabel karya milik user (No/Judul/Jenis/Status/Aksi) + tombol Unggah
12. **Unggah Step 1** — Form: Judul, Penulis, Bahasa, Jenis, Dosen Pembimbing, Tahun, Subjek, Abstrak
13. **Unggah Step 2** — Upload area: Dokumen (PDF) dan Foto/Video (Drag & Drop)
14. **Unggah Step 3** — Konfirmasi semua data + tombol Unggah (hijau)
15. **Login** — Card navy di tengah, logo DigiLab, email + kata sandi + tombol LOGIN

## Status (2026-06-11)
- ✅ Struktur folder selesai; `docs/` satu-satunya sumber frontend
- ✅ Path folder diperbarui: `C:\1-Johan\10. Pengembangan\DIGILAB-Repository\`
- ✅ Dev server: Python http.server (preview_frontend.bat) — Vite dihapus
- ✅ Desain mockup dibaca (16 PNG)
- ✅ Migrasi DB: MySQL → Supabase (PostgreSQL)
- ✅ `docs/index.html` — SPA: Beranda, Hasil, Detail, Login, Karya Ilmiah, Mindmap
- ✅ Mindmap D3.js — fix orange blob, radial text, legend/jadwal tab
- ✅ Login error feedback + nama user di header setelah login
- ✅ Dummy login: `mahasiswa@vokasi.um.ac.id/digilab123`, `admin@vokasi.um.ac.id/admin123`
- ✅ 5 tema clean modern + theme switcher di header (Indigo/Emerald/Charcoal/Violet/Rose)
- ✅ OG meta tags untuk link preview WhatsApp/Telegram
- ✅ GitHub Pages aktif: `jiakbar.github.io/repositoryPD/` + `natasyaadel.github.io/RPD/`
- ✅ Push ke dua repo: `git push origin main` + `git push natasya main`
- ⬜ Hapus `docs/node_modules` dari tracking git (perlu `git rm -r --cached docs/node_modules`)
- ⬜ Backend routes (auth, karya, admin, 