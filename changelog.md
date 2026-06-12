## [2026-06-12] — Update 4

### Added
- **Tombol Statistik Data di navbar** — dipindah dari dalam area beranda ke header navbar (setelah Karya Ilmiah), kini dapat diakses dari halaman manapun; membuka `statistik.html` di tab baru
- **`statistik.html`** — halaman standalone dashboard statistik dengan Chart.js: 5 summary card, doughnut jenis, bar horizontal prodi, bar+line tahun, tabel detail + unduh CSV
- **Halaman Verifikasi Akun di admin.html** — sidebar baru, tabel akun pending (approve/reject), `renderAkunTable()` + `akunAction()` + `filterAkunTable()`
- **Catatan revisi per kolom di mahasiswa.html** — baris revisi di tabel karya ditandai amber; catatan revisi per kolom tampil sebagai box di bawah baris
- **Link/Tautan Terkait di upload form** — input URL + pill list di Step 2 (mahasiswa.html) dan form upload admin (admin.html)
- **`navToProduk()`** di index.html — populate link section halaman Produk dari data karya aktif (`window._currentKaryaId`)

### Changed
- **Jenis karya** diperbarui di semua form: `Artikel Jurnal`, `Tugas Akhir`, `Laporan Magang`, `Proyek Inovasi` (Skripsi/Laporan PKL dihapus)
- **Dosen Pembimbing** jadi `<select>` dropdown 12 opsi di mahasiswa.html dan admin.html
- **No. Panggil** placeholder diperbarui: `Contoh: KAR/PD/TA/RAN/2020`
- **Subtitle beranda** ditambah `<em>Empowering Knowledge Through Digital Innovation.</em>`
- **Tombol Kembali** di halaman Hasil Pencarian: flex layout dengan `btn-back` → `nav('beranda')`

---

## [2026-06-12] — Update 3

### Fixed
- **Filter Prodi/Tahun/Pembimbing tidak bisa dipakai tanpa input teks** — `doSearch()` sekarang membaca semua dropdown (`jenis`, `prodi`, `tahun`, `pembimbing`) sebagai `adaFilter`; salah satu dipilih sudah cukup, tidak perlu ketik 3 huruf
- **Filter Prodi/Tahun/Pembimbing tidak diterapkan ke hasil** — sebelumnya hanya `jenis` yang di-filter; sekarang keempat dropdown diterapkan ke `KARYA_DATA`
- **Label hasil pencarian** — jika pakai filter tanpa kata kunci, label menampilkan nilai filter yang dipilih (bukan kosong)

---

## [2026-06-12] — Update 2

### Fixed
- **`nav('produk')` setelah logout** — bug kritis: setelah logout dari index.html, SPA malah redirect ke halaman Produk Karya. Diperbaiki ke `nav('beranda')` + `closeLogoutConfirm()`
- **Double nama di header** — `restoreSession()` mengisi nama ke `btn-user-icon` alih-alih menyembunyikannya; difix ke `style.display='none'`
- **Redirect mahasiswa setelah login** — login `mhs/mhs` di index.html sekarang langsung redirect ke `mahasiswa.html` (sebelumnya tetap di beranda)

### Added
- **Search validation toast** — jika input kosong atau kurang dari 3 huruf, muncul toast pill dari bawah layar dengan pesan validasi; auto-dismiss 2.8 detik
- **Logout popup animasi di mahasiswa.html** — popup konfirmasi keluar dengan `popIn` spring bounce + `fadeInBg` overlay; animasi close reverse saat Batal diklik
- **`updatelist.md`** — file log semua perubahan per sesi (dibuat manual)

---

## [2026-06-12] — Update 1

### Added
- **Welcome popup** — muncul sekali tiap sesi login (sessionStorage flag), auto-close 3 detik, avatar initials + role badge + progress bar; berlaku di index.html, admin.html, mahasiswa.html
- **Sidebar "Ke Beranda"** di admin.html — kembali ke landing page tanpa logout; jika session masih aktif, Portal Admin di header index.html langsung bisa diakses kembali
- **Session restore on load** di index.html — DOMContentLoaded membaca localStorage dan restore header state (Portal Admin / Portal Mahasiswa / nama user / tombol Logout) tanpa perlu login ulang setelah refresh

### Fixed
- Tombol Portal Mahasiswa tidak muncul setelah refresh — sekarang diperbaiki dengan session restore
- doLogout di semua halaman kini juga clear `sessionStorage('digilab-welcome-shown')` agar welcome popup muncul lagi saat login berikutnya

# 📋 Changelog DIGILAB Repository

## [0.7.0] - 2026-06-11

### Added
- Halaman **PDF Viewer** (`#page-pdf`) — embed iframe, topbar dengan tombol kembali dan judul dokumen
- Halaman **Informasi Penulis** (`#page-penulis`) — avatar, tabel data (NIM, Prodi, Angkatan, JK, Email)
- Halaman **Produk** (`#page-produk`) — galeri foto grid 4 kolom + thumbnail video dengan play button
- Halaman **Unggah 3-Step** (`#page-upload`) — stepper: Step 1 Metadata → Step 2 Berkas → Step 3 Konfirmasi
  - Step 1: Judul, Penulis (auto dari login), Bahasa, Jenis, Dosen, Tahun, Prodi, Subjek, Abstrak
  - Step 2: Dropzone PDF + Foto/Video (drag & drop)
  - Step 3: Review semua data + tombol Unggah hijau
- Halaman **Akun Saya** (`#page-akun`) — edit profil + ubah kata sandi dengan validasi
- `pendingPage` redirect: setelah login dari popup, langsung ke halaman yang diminta (PDF/Penulis/Produk)
- Filter beranda diperluas: tambah dropdown Prodi, Tahun, Pembimbing
- Tombol **Akun Saya** di header navigasi
- Tombol Unggah di halaman Karya Ilmiah terhubung ke `navToUpload()`

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

## [2026-06-09] — Push ke GitHub

### Chore
- Inisiasi git repository di folder DIGILAB-Repository
- Push initial commit ke `https://github.com/JIAkbar/repositoryPD` (branch `main`)
- 26 objects, 45.63 KiB

---

## [2026-06-09] — Autentikasi Dummy & Restrukturisasi Folder

### Feat
- Tambah dummy login: 2 akun hardcoded (`mahasiswa@vokasi.um.ac.id/digilab123`, `admin@vokasi.um.ac.id/admin123`)
- Tambah fungsi `doLogin()` dengan validasi kredensial + `showLoginError()` untuk pesan error inline
- Tambah fungsi `doLogout()` — reset state, sembunyikan tombol logout, kembali ke Beranda
- Tambah tombol **"↩ Keluar"** di header (tersembunyi, muncul setelah login)
- Tambah tombol **"Masuk / Daftar"** di halaman Beranda dengan hint kredensial demo
- Tambah tombol **"⌂ Beranda"** di header sebelah "Peta Pikiran"

### Refactor
- Rename folder `frontend/` → `docs/` agar compatible dengan GitHub Pages (`/docs` option)
- Update `test_server_lokal.bat`, `docker-compose.yml`, `preview_frontend.bat` untuk path `docs/`
- `docs/index.html` sekarang menjadi satu-satunya sumber frontend; folder `frontend/` dihapus
- `frontend/src/` (assets, components, pages) kosong — tidak ada yang dipindahkan

### Fix
- Perbaiki truncasi file `index.html` (39246 byte cutoff) — root cause: Edit tool has size limit; migrasi ke Python `write` untuk file besar
- Perbaiki mindmap canvas blank saat navigasi SPA (D3 init di `display:none`): gunakan double `requestAnimationFrame` + dispatch `resize` ke iframe 80ms setelah nav
- Perbaiki tombol "← Kembali" di mindmap iframe yang keluar dari SPA: ganti `history.back()` dengan `window.parent.nav('beranda')`

### Chore
- Buat `preview_frontend.bat` — jalankan frontend saja tanpa backend/env (untuk demo cepat)
- Tambah `*.bat` ke `.gitignore`

---


## [2026-06-09] — Bugfix MindMap Tab + Redesign Header + Login UX

### Fix
- Perbaiki bug kritis `switchTab()`: ID mismatch `mindmap-canvas` → `canvas` — tombol Jadwal sekarang berfungsi
- Perbaiki mindmap blank saat navigasi SPA: ganti dispatch resize ke **lazy-load iframe** (src hanya di-set saat pertama kali nav ke Peta Pikiran) — canvas sekarang selalu render
- Perbaiki pesan error login muncul di luar card → dipindah ke dalam card sebagai balloon merah

### Design
- Redesign tombol header: ganti `btn-log` + `btn-mindmap` → unified `btn-nav` dengan ukuran konsisten (height 34px)
- Tambah ikon SVG ke semua tombol header: Changelog (dokumen), Checklist (centang), Beranda (rumah), Peta Pikiran (radial), Akun (orang), Keluar (arrow-right-box)
- Tombol Peta Pikiran: aksen oranye (`btn-nav-accent`)
- Tombol Keluar: aksen merah halus (`btn-nav-logout`)

<!-- Template entri berikutnya:

## [YYYY-MM-DD] — Judul

### Feat
- Tambah fitur X

### Fix
- Perbaiki bug Y

### Design
- Update tampilan Z berdasarkan feedback

-->

## [2026-06-09] — Bugfix MindMap & Navigasi Header

### Fix
- Perbaiki `docs/mindmap.html` terpotong 25110 byte: `switchTab()`, `DOMContentLoaded`, `renderJadwal()` hilang — tulis ulang dengan Python
- Tombol **Jadwal** sekarang berfungsi (switchTab + renderJadwal dipanggil)
- MindMap sekarang render saat halaman dimuat (DOMContentLoaded → double requestAnimationFrame)
- Sync fix ke `DIGILAB_MindMap.html`

### Feat
- Tambah tombol **📋 Changelog** dan **✅ Checklist** di header SPA
- Salin `changelog.html` & `checklist.html` ke `docs/` agar dapat diakses via Vite & GitHub Pages

## [2026-06-12] Bugfix — Verifikasi Akun layout "nempel"

### Fix
- `docs/admin.html`: `#page-verif-akun` sebelumnya berada di luar `<div class="page-body">` sehingga tidak mendapat `padding: 28px 32px` — dipindahkan ke dalam wrapper sehingga layout identik dengan halaman lain (Beranda, Verifikasi Karya, dll)

## [2026-06-12] Bugfix — Halaman di luar main (structural fix)

### Fix
- `docs/index.html`: `page-pdf`, `page-penulis`, `page-produk`, `page-upload`, `page-akun` berada di **luar `<main>`** (setelah footer + script block) — seharusnya di dalam `<main>`. Semua halaman SPA sekarang di dalam `<main>` sehingga `flex: 1` berjalan benar dan halaman dapat diakses via `nav()`.
- Root cause: sections ini ditambahkan secara incremental di sesi sebelumnya tanpa mengecek posisi `</main>`.

## [2026-06-12] Bugfix — filterKarya hilang + onclick quote

### Fix  
- `docs/index.html`: tambah `renderKaryaTbl()` + `filterKarya()` — halaman Karya Ilmiah selalu tampil tabel kosong
- `docs/admin.html`: onclick `akunAction(id,"approved")` → `akunAction(id,'approved')` — tombol Setujui/Tolak tidak bisa diklik
