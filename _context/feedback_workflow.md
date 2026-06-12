---
name: feedback-workflow-johan
description: Preferensi workflow Johan — konvensi project management yang harus selalu diikuti
metadata: 
  node_node: memory
  type: feedback
---

Selalu gunakan memory setiap kali ada perubahan pada project.

**Why:** Johan meminta memory diupdate tiap perubahan agar context terjaga lintas sesi, mengacu pada pola project "smart flip".

**How to apply:**
- Setiap perubahan signifikan → update memory file terkait
- Setiap project baru → buat `checklist.md` dan `changelog.md` di root folder project
- Setiap update ke file project → catat di `changelog.md` dengan format `[YYYY-MM-DD] Tipe — Deskripsi`
- Gunakan checklist.md untuk tracking progress per fase
- Backup memory ke `_context/` di folder project setiap akhir sesi

## ⚠️ Batasan Teknis — Edit Tool & File Besar

**Rule:** Untuk file HTML/JS >40KB (seperti `docs/index.html`), JANGAN gunakan Edit tool — akan truncate. Selalu gunakan Python.

**How to apply:**
- Jika >40KB: gunakan `python3 << 'PY' ... PY` untuk modifikasi (read → manipulate string → write)
- `docs/` adalah satu-satunya folder frontend
- Verifikasi akhir dengan `tail -5` untuk pastikan `</html>` ada

## 🎯 Prinsip Frontend — Berlaku Selalu

- **Auth state** → `localStorage('digilab-user')` `{name, email, role}`
- **Icon** → wajib inline SVG, tidak boleh CDN icon library
- **Warna** → selalu `var(--navy)`, `var(--orange)`, dll — tidak boleh hardcode hex
- **Font** → Nunito + Lato dari Google Fonts — selalu ada di `<head>`
- **Mobile** → breakpoint 768px dan 480px wajib, tap target min 44px
