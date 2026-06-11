---
name: feedback-workflow-johan
description: Preferensi workflow Johan — konvensi project management yang harus selalu diikuti
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 055186de-bf09-4bb9-ab24-52c91f75a519
---

Selalu gunakan memory setiap kali ada perubahan pada project.

**Why:** Johan meminta memory diupdate tiap perubahan agar context terjaga lintas sesi, mengacu pada pola project "smart flip".

**How to apply:**
- Setiap perubahan signifikan → update memory file terkait
- Setiap project baru → buat `checklist.md` dan `changelog.md` di root folder project
- Setiap file/sistem → buat folder terpisah per komponen (frontend/, backend/, database/, design/, docs/)
- Setiap update ke file project → catat di `changelog.md` dengan format `[YYYY-MM-DD] Tipe — Deskripsi`
- Gunakan checklist.md untuk tracking progress per fase

Referensi: pola ini sama dengan project "smart flip" milik Johan. [[project-digilab-repository]]

## ⚠️ Batasan Teknis — Edit Tool & File Besar

**Rule:** Untuk file HTML/JS yang ukurannya >40KB (seperti `docs/index.html`), JANGAN gunakan Edit tool — akan truncate file di ~42439 byte. Selalu gunakan Python.

**Why:** Edit tool terbukti truncate `docs/index.html` berkali-kali selama session ini sehingga file rusak dan JS terputus di tengah fungsi.

**How to apply:**
- Sebelum mengedit file besar, cek ukuran dengan `wc -c`
- Jika >40KB: gunakan `python3 << 'PY' ... PY` untuk modifikasi (read → manipulate string → write)
- `docs/` adalah satu-satunya folder frontend; tidak ada `frontend/` lagi — tidak perlu sync
- Verifikasi akhir file dengan `tail -5` untuk pastikan `</html>` ada
