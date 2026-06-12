---
name: project-digilab-repository
description: "Project DIGILAB Repository — sistem repositori karya ilmiah Fakultas Vokasi UM 2026"
metadata:
  type: project
---

# Project DIGILAB Repository

**Peneliti:** Natasya Adelia R. (NIM: 220213704262)
**Pembimbing:** Achmad Hamdan, S.Pd., M.Pd. (NIDN: 0023039202)
**Pengembang:** Johan Iriawan Akbar (johan.iriawan.akbar@um.ac.id)
**Metode:** RAD (Rapid Application Development) | Hibah Skripsi 2026

## Lokasi & Repo
- Folder: `C:\1-Johan\10. Pengembangan\DIGILAB-Repository\`
- GitHub Johan: https://github.com/JIAkbar/repositoryPD → Pages: https://jiakbar.github.io/repositoryPD/
- GitHub Natasya: https://github.com/natasyaadel/RPD → Pages: https://natasyaadel.github.io/RPD/

## Struktur Folder
```
DIGILAB-Repository/
├── docs/           ← UI Vanilla HTML/CSS/JS — GitHub Pages (SATU-SATUNYA frontend)
│   ├── index.html      (~163KB) — SPA utama
│   ├── admin.html      — Panel admin
│   ├── mahasiswa.html  — Portal mahasiswa (form upload + validasi + auto no-panggil)
│   ├── statistik.html  — Dashboard statistik standalone (Chart.js, sesuai mockup)
│   └── mindmap.html    — Peta penelitian D3.js
├── backend/        ← Node.js + Express (hanya health check aktif)
├── database/       ← Supabase PostgreSQL schema
├── _context/       ← Backup memory Claude ← FILE INI ADA DI SINI
├── checklist.md
└── changelog.md
```

**⚠️ PENTING:** `docs/index.html` ~163KB — SELALU pakai Python untuk edit, TIDAK PERNAH Edit tool.

## Stack
- Frontend: Vanilla JS/HTML/CSS, dev server `Python -m http.server 3000`
- Backend: Node.js + Express (belum dikoneksi ke frontend)
- DB: Supabase (PostgreSQL cloud)
- Auth dummy: `admin/admin` → admin.html | `mhs/mhs` → mahasiswa.html
- localStorage('digilab-user') {name, email, role}

## Design System
- Navy: #2e3192 | Orange: #f97316 | BG: #e8e8f0 | Red: #c0392b
- Font: Nunito (heading) + Lato (body) — Google Fonts
- Wajib: inline SVG, CSS custom properties, mobile responsive ≤768px
- **ATURAN BARU:** Setiap halaman baru WAJIB copy CSS custom properties dari index.html — tidak boleh buat palet warna sendiri

## Akun Demo
| User | Pass | Role | Redirect |
|------|------|------|---------|
| admin | admin | Admin Pustakawan | → admin.html |
| mhs | mhs | Mahasiswa | → mahasiswa.html |

## Status Terakhir (2026-06-12, Update 5) — BELUM DI-PUSH

### ✅ Selesai Sesi Ini (Update 5)
- statistik.html redesign sesuai mockup: 3 stat cards (sparkline/mini-donut), bar chart horizontal, donut, line chart, tabel top 5
- Header statistik.html = identik index.html (logo SVG + DIGILAB REPOSITORY + FAKULTAS VOKASI)
- Auto No. Panggil: `NamaBelakang/Prodi/Jenis/3HurufJudul/Tahun`, skip kata umum, field readonly+badge AUTO
- Field Program Studi ditambahkan di upload form Step 1
- Inline validation: border merah + pesan error per field, semua tampil serentak
- Fix footer muncul di atas halaman PDF/Penulis/Produk (CSS no-footer + JS nav toggle)
- Halaman Produk: full-page 2 kolom (galeri kiri, video+tautan kanan)
- Verifikasi Akun admin: sub-header+chip statistik, toolbar full-width, tabel CSS class baru
- Fix JS syntax error admin.html (onclick button approve/reject)

### ✅ Selesai Update 4 (sama sesi)
- Tombol Statistik di navbar header
- Mock PDF reader + Penulis profil card (Natasya) + Produk galeri+video
- Tombol PDF/Penulis/Produk: gradient + SVG icon

### 🚀 Cara Push (jalankan di terminal lokal)
```
del .git\index.lock
git add docs/ CLAUDE.md changelog.md _context/
git commit -m "feat: statistik dashboard, auto no-panggil, validasi form, redesign verif-akun, fix footer fullscreen, produk 2-col layout"
git push origin main
git push natasya main
```

### ⬜ Next Session
1. **V3 Redesign** — palet kandidat: Sage Green+Gold · Violet+Rose · Slate+Sky Blue+Amber
2. **Backend Auth API** — /api/auth/login, /api/auth/register, middleware JWT
3. **Backend Karya API** — list, detail, search, upload handler
4. **Koneksi frontend → backend** — ganti dummy data dengan fetch /api/...
5. **Filter Karya Ilmiah** — per prodi/tahun/jenis di halaman karya
6. **Notifikasi status** — banner disetujui/ditolak/revisi di portal mahasiswa
