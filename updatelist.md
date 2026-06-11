# Update List — Sesi 2026-06-12

## docs/index.html

| # | Perubahan | Detail |
|---|-----------|--------|
| 1 | **Akun dummy disederhanakan** | Hanya `admin/admin` dan `mhs/mhs` — email panjang dihapus |
| 2 | **Fix crash doLogin()** | Hapus baris sisa `btnUser.title = user.nama` yang menyebabkan ReferenceError → login tidak melakukan apapun |
| 3 | **Redirect mahasiswa ke mahasiswa.html** | Setelah login `mhs/mhs`, langsung diarahkan ke `mahasiswa.html` (sebelumnya tetap di beranda) |
| 4 | **Fix double nama di header** | `restoreSession()` sekarang hide `btn-user-icon` (bukan diisi nama) → tidak ada dua "Natasya" |
| 5 | **toggleUserMenu() navigasi ke portal** | Klik nama user → ke `admin.html` (admin) atau `mahasiswa.html` (mahasiswa), bukan ke halaman Karya Ilmiah |
| 6 | **Logout confirmation popup** | Tombol Keluar memunculkan popup konfirmasi sebelum logout (sama seperti admin.html) |
| 7 | **Welcome popup** | Popup selamat datang saat login pertama per sesi (sessionStorage flag, auto-close 3 detik, avatar initials + role badge + progress bar) |
| 8 | **restoreSession() synchronous** | Dipanggil via `<script>restoreSession();</script>` di akhir `<body>` (bukan DOMContentLoaded) — fix Portal Mahasiswa hilang setelah refresh/navigasi dari halaman lain |
| 9 | **btn-mahasiswa-portal label dinamis** | Teks berubah dari "Portal Saya" ke nama depan user (`<span class="portal-label">`) |

## docs/admin.html

| # | Perubahan | Detail |
|---|-----------|--------|
| 1 | **Login `admin/admin`** | Terima kredensial singkat `admin/admin` selain `admin@vokasi.um.ac.id/admin123` |
| 2 | **Menu "Ke Beranda"** | Link di sidebar untuk kembali ke `index.html` tanpa logout; session tetap aktif |
| 3 | **Welcome popup** | Popup selamat datang saat masuk admin panel (setTimeout 80ms untuk tunggu DOM) |
| 4 | **doLogout() clear sessionStorage** | Hapus flag `digilab-welcome-shown` saat logout agar popup muncul lagi di sesi berikutnya |

## docs/mahasiswa.html

| # | Perubahan | Detail |
|---|-----------|--------|
| 1 | **Login `mhs/mhs`** | Terima kredensial singkat `mhs/mhs` |
| 2 | **Welcome popup** | Popup selamat datang saat masuk portal mahasiswa (setTimeout 80ms) |
| 3 | **doLogout() clear sessionStorage** | Hapus flag `digilab-welcome-shown` saat logout |

## CLAUDE.md

| # | Perubahan | Detail |
|---|-----------|--------|
| 1 | **Progress 2026-06-12** | Ditambahkan ringkasan semua perubahan sesi ini |
| 2 | **Tabel akun demo** | `admin/admin` dan `mhs/mhs` |
| 3 | **Diagram alur navigasi** | Alur index ↔ admin ↔ mahasiswa beserta kondisi session |
| 4 | **Catatan teknis session restore** | Penjelasan synchronous vs DOMContentLoaded + fix bug |
| 5 | **Next step diperbarui** | Verifikasi Admin, Notifikasi mahasiswa, Filter/search, Mobile nav test |

---

## Bug yang Diperbaiki

| Bug | Root Cause | Fix |
|-----|-----------|-----|
| Login tidak melakukan apapun (admin & mahasiswa) | Sisa baris `btnUser.title = user.nama` → ReferenceError sebelum localStorage.setItem | Hapus baris tersebut |
| Portal Mahasiswa hilang setelah refresh | `restoreSession()` ada di DOMContentLoaded (async) — belum selesai ketika user klik | Pindah ke synchronous call di akhir `<body>` |
| Double nama di header ("Natasya" × 2) | `restoreSession()` mengisi nama ke `btn-user-icon` alih-alih menyembunyikannya | Ganti isi innerHTML dengan `style.display = 'none'` |
| Klik nama user → ke Karya Ilmiah | `toggleUserMenu()` hardcode `nav('karya')` | Ganti dengan redirect ke portal sesuai role |
| Mahasiswa tetap di beranda setelah login | `doLogin()` tidak redirect, hanya `nav('beranda')` | Tambah `window.location.href = 'mahasiswa.html'` |
| Welcome popup tidak muncul di admin/mahasiswa | `showWelcome()` dipanggil sebelum HTML popup selesai di-parse | Wrap dengan `setTimeout(fn, 80)` |

---

## Status Git

Belum di-push. Jalankan di terminal lokal:

```bash
git add -A && git commit -m "feat: welcome popup, session restore, fix login, redirect portal, hapus double nama" && git push origin main && git push natasya main
```
