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
│   ├── index.html      (~160KB) — SPA utama
│   ├── admin.html      — Panel admin
│   ├── mahasiswa.html  — Portal mahasiswa
│   ├── statistik.html  — Dashboard statistik standalone
│   └── mindmap.html    — Peta penelitian D3.js
├── backend/        ← Node.js + Express (hanya health check aktif)
├── database/       ← Supabase PostgreSQL schema
├── _context/       ← Backup memory Claude ← FILE INI ADA DI SINI
├── checklist.md
└── changelog.md
```

**⚠️ PENTING:** `docs/index.html` ~160KB — SELALU pakai Python untuk edit, TIDAK PERNAH Edit tool.

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

## Akun Demo
| User | Pass | Role | Redirect |
|------|------|------|---------|
| admin | admin | Admin Pustakawan | → admin.html |
| mhs | mhs | Mahasiswa | → mahasiswa.html |

## Status Terakhir (2026-06-12, Update 4) — BELUM DI-PUSH

### ✅ Selesai Sesi Ini
- Tombol Statistik di navbar header (setelah Karya Ilmiah)
- statistik.html: dashboard standalone (5 card, 3 chart, tabel, unduh CSV)
- Halaman PDF: mock reader — topbar nav+zoom + 3 halaman simulasi dokumen
- Halaman Penulis: profil card — data Natasya (NIM 220213704262, Teknologi Pendidikan D4)
- Halaman Produk: galeri foto gradient (6 item) + video showcase card + tautan
- Tombol PDF/Penulis/Produk: gradient warna berbeda + SVG icon
- Verifikasi Akun admin: layout filter inline dengan search
- Jenis karya: Artikel Jurnal, Tugas Akhir, Laporan Magang, Proyek Inovasi
- Dosen dropdown (12 dosen) + No. Panggil placeholder semua form
- Catatan revisi per kolom mahasiswa.html + halaman Verifikasi Akun admin

### 🚀 Cara Push (jalankan di terminal lokal)
```
del .git\HEAD.lock
git add docs/ CLAUDE.md changelog.md
git commit -m "feat: redesign PDF/Penulis/Produk, mock reader, navbar statistik"
git push origin main
git push natasya main
```

### ⬜ Next Session (Pro Max 5x)
1. **V3 Redesign** — palet kandidat: Sage Green+Gold · Violet+Rose · Slate+Sky Blue+Amber
2. **Backend Auth API** — /api/auth/login, /api/auth/register, middleware JWT
3. **Backend Karya API** — list, detail, search, upload handler
4. **Koneksi frontend → backend** — ganti dummy data dengan fetch /api/...
5. **Filter Karya Ilmiah** — per prodi/tahun/jenis di halaman karya
6. **Notifikasi status** — banner disetujui/ditolak/revisi di portal mahasiswa
