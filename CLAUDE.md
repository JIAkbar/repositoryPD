# 🤖 CLAUDE.md — DIGILAB Repository

> Konteks project untuk Claude AI. Diperbarui otomatis di setiap sesi.  
> **Terakhir diperbarui:** 2026-06-11

---

## ⚠️ ATURAN WAJIB — Setiap Perubahan Frontend

> **SETIAP kali melakukan perubahan pada `docs/index.html` atau file frontend lainnya, WAJIB memastikan UI mobile responsive.** Ini mencakup:
> - Semua komponen baru harus punya layout mobile (≤768px dan ≤480px)
> - Tap targets minimum 44px untuk touch
> - Grid/flex layout harus collapse ke single column di mobile
> - Teks heading harus `clamp()` atau ukuran lebih kecil di mobile
> - Form input full-width di mobile
> - Tidak ada horizontal overflow/scroll kecuali tabel & stepper

---

## 📌 Tentang Project

**DIGILAB Repository** — Sistem Layanan Repositori Karya Ilmiah Digital  
Fakultas Vokasi, Universitas Negeri Malang | Hibah Skripsi 2026

| | |
|---|---|
| **Peneliti** | Natasya Adelia R. (NIM: 220213704262) |
| **Pembimbing** | Achmad Hamdan, S.Pd., M.Pd. (NIDN: 0023039202) |
| **Pengembang** | Johan Iriawan Akbar (johan.iriawan.akbar@um.ac.id) |
| **Metode** | RAD (Rapid Application Development) |
| **GitHub (Johan)** | https://github.com/JIAkbar/repositoryPD |
| **GitHub (Natasya)** | https://github.com/natasyaadel/RPD |
| **Live (Johan)** | https://jiakbar.github.io/repositoryPD/ |
| **Live (Natasya)** | https://natasyaadel.github.io/RPD/ |

---

## 🛠️ Stack Teknologi

| Layer | Teknologi |
|---|---|
| **Frontend** | Vanilla HTML/CSS/JS (SPA), folder `docs/` |
| **Backend** | Node.js v18 + Express, folder `backend/` |
| **Database** | Supabase (PostgreSQL) |
| **Auth** | Supabase Auth + JWT |
| **Storage** | Supabase Storage (PDF, foto, video) |
| **Hosting** | GitHub Pages (frontend) |
| **Dev Server** | Python `http.server` (bukan Vite) via `preview_frontend.bat` |
| **Docker** | Docker Compose tersedia (tanpa DB service) |

**Dependencies Backend:**
```json
express, cors, helmet, morgan, dotenv, multer,
jsonwebtoken, bcryptjs, @supabase/supabase-js, express-validator
```

---

## 🎨 Design System (Desain Natasya)

### Warna Utama
```css
--navy:       #2e3192   /* header, primary CTA */
--navy-dark:  #1e2166   /* hover state */
--bg:         #e8e8f0   /* background halaman */
--bg-card:    #ffffff   /* card background */
--text-dark:  #1a1a3e
--text-mid:   #4a4a6a
--text-muted: #8888aa
--red:        #c0392b   /* tombol PDF/Penulis/Produk */
--orange:     #f97316   /* aksen, highlight */
--teal:       #0891b2   /* tombol unggah */
--border:     #d4d4e8
```

### Tipografi
- **Heading/Bold:** `Nunito` (weight 700–900) — Google Fonts
- **Body/Text:** `Lato` (weight 300–700) — Google Fonts

### Komponen Umum
- **Pill buttons:** `border-radius: 999px`
- **Cards:** `border-radius: 8px`, `box-shadow: 0 2px 10px rgba(46,49,146,.12)`
- **Header:** sticky, height `66px`, background navy
- **Footer:** background navy, text putih semi-transparan

### Tema Switcher (5 pilihan)
Indigo (default) · Emerald · Charcoal · Violet · Rose — via CSS custom properties di `data-theme`

---

## 🎯 Skills yang Digunakan

> **WAJIB** dipakai untuk semua pekerjaan frontend di project ini:

- **`/frontend-design`** — untuk semua pekerjaan UI/UX: komponen baru, halaman baru, redesign
- **`/brand-guidelines`** — referensi tambahan; untuk DIGILAB tetap ikuti design language Natasya (navy/orange/putih), bukan Anthropic brand

---

## 📁 Struktur Folder

```
DIGILAB-Repository/
├── docs/                  ← Frontend SPA (GitHub Pages)
│   ├── index.html         ← SPA utama (1049 baris)
│   ├── mindmap.html       ← Peta penelitian (D3.js)
│   ├── changelog.html     ← Halaman changelog interaktif
│   ├── checklist.html     ← Halaman checklist interaktif
│   └── public/            ← Static assets
│
├── backend/
│   ├── server.js          ← Entry point API (health check aktif)
│   ├── .env               ← Konfigurasi (SUPABASE_URL, dll)
│   └── package.json
│
├── database/
│   └── migrations/
│       └── 001_create_tables.sql  ← Schema Supabase lengkap
│
├── data/                  ← Mockup PNG Natasya (16 file) + PDF proposal
├── checklist.md           ← Progress tracking per fase
├── changelog.md           ← Log perubahan
├── claude.md              ← File ini
└── README.md
```

---

## 🗄️ Database Schema (Supabase)

Tabel utama:
- `program_studi` — 11 prodi Fakultas Vokasi (D3/D4)
- `users` — extend Supabase Auth (UUID, nim_nidn, role: mahasiswa/admin/pustakawan)
- `kategori` — 6 kategori karya
- `karya_ilmiah` — judul, abstrak, kata_kunci, tahun, jenis, status (pending/disetujui/ditolak/revisi)
- `media_files` — PDF, foto, video per karya (Supabase Storage)
- `log_verifikasi` — audit trail aksi admin

RLS aktif. Full-text search (GIN index, bahasa Indonesia).

---

## 🔗 API Endpoints

| Method | Endpoint | Status |
|--------|----------|--------|
| GET | `/api/health` | ✅ Aktif |
| POST | `/api/auth/login` | ⏳ Belum |
| POST | `/api/auth/register` | ⏳ Belum |
| GET | `/api/karya` | ⏳ Belum |
| POST | `/api/karya` | ⏳ Belum |
| GET | `/api/karya/:id` | ⏳ Belum |
| GET | `/api/admin/pending` | ⏳ Belum |
| PUT | `/api/admin/karya/:id` | ⏳ Belum |

---

## ✅ Progress Terakhir (2026-06-11)

**Sesi ini (2026-06-11 — update 2):** iOS animations (spring easing, page transitions, button press scale, popup slide-up), full mobile responsive (hamburger menu, stacked layouts, 480/768px breakpoints), copyright fix → Natasya Adelia R. 2026, aturan mobile wajib di CLAUDE.md.

**Sesi ini (2026-06-11 — update 1):** 5 halaman baru (PDF, Penulis, Produk, Upload 3-step, Akun), redesign V2 Meruno teal, V1/V2 toggle, admin/admin login, pendingPage redirect, beranda filter prodi+tahun+pembimbing. Commit: `9489d49`.

**Frontend sudah selesai:**
- SPA: Beranda, Hasil Pencarian, Detail Dokumen, Login, Karya Ilmiah, Peta Pikiran
- Header sticky + 5 tema switcher (Indigo/Emerald/Charcoal/Violet/Rose) + navigasi lengkap
- Search + filter Jenis + 6 karya demo data
- Popup login guard (PDF/Penulis/Produk)
- Dummy login + logout + nama user di header setelah login
- Login error feedback inline (balloon merah dalam card)
- Mindmap D3.js (tema terang, iframe dalam SPA, fix orange blob & radial text)
- Changelog & Checklist halaman HTML interaktif
- OG meta tags untuk preview link WhatsApp/Telegram

**Backend:** Hanya health check. Routes masih di-comment.

**Database:** Schema lengkap di Supabase. Belum di-push/run.

---

## ⏭️ Next Step

### Prioritas Tinggi
1. ~~PDF Viewer~~ ✅ Done
2. ~~Halaman Produk~~ ✅ Done
3. ~~Halaman Penulis~~ ✅ Done
4. ~~Upload 3-Step~~ ✅ Done
5. ~~Halaman Akun Saya~~ ✅ Done
6. **Git push** — user harus hapus lock file dulu: `del .git\index.lock` + `del .git\HEAD.lock`, lalu `git add -A && git commit -m "feat: animasi iOS + mobile responsive + copyright" && git push origin main && git push natasya main`

### Prioritas Sedang
6. **Backend Auth API** — routes `/api/auth/login`, `/api/auth/register`, middleware JWT
7. **Backend Karya API** — list, detail, search & filter, upload handler
8. **Koneksi Frontend ke Backend** — ganti dummy data dengan API calls nyata

### Prioritas Rendah
9. Blokir klik kanan & tangkap layar (CSS + JS)
10. Logika akses per bab (luar kampus) vs full page (lab perpustakaan)
11. Admin panel (verifikasi/revisi/lolos)
12. Dokumentasi API (Swagger/Postman)

---

## 📝 Keputusan Teknis Penting

| Keputusan | Alasan |
|---|---|
| Folder `docs/` bukan `frontend/` | GitHub Pages hanya bisa serve dari `/docs` |
| SPA vanilla (bukan React/Vue) | Lebih ringan, tidak perlu build step, kompatibel GitHub Pages langsung |
| Supabase (bukan MySQL lokal) | Hosting gratis, Auth & Storage built-in, RLS, real-time capability |
| File besar ditulis via Python | Edit tool ada size limit ~40KB; file >100 baris tulis via `mcp__workspace__bash` Python |
| `docs/mindmap.html` sebagai iframe | D3.js canvas perlu full DOM reload; iframe isolasi mencegah blank canvas saat SPA nav |

---

## ⚠️ Catatan Penting

- **File `docs/index.html` ukuran ~55KB** — untuk edit besar, gunakan Python via bash, bukan Edit tool langsung
- **Supabase credentials** ada di `backend/.env` (tidak di-commit, ada di `.gitignore`)
- **GitHub:** push ke **dua remote** — `git push origin main` (Johan) + `git push natasya main` (Natasya)
- **Remote origin:** `https://github.com/JIAkbar/repositoryPD` (Johan)
- **Remote natasya:** `https://github.com/natasyaadel/RPD` (Natasya)
- **Demo akun:** `mahasiswa@vokasi.um.ac.id / digilab123` dan `admin@vokasi.um.ac.id / admin123`
- **Font:** Nunito + Lato dari Google Fonts — pastikan import CDN selalu ada di `<head>`
- Design mockup asli ada di `data/Desain Sistem Repositori Natasya/` (16 PNG + 1 PDF proposal)
