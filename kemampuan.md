# 🤖 Kemampuan Claude — Referensi Developer

> Dokumen ini merangkum seluruh kemampuan Claude yang relevan untuk developer,
> khususnya yang berjalan di Cowork mode dan Claude Agent SDK.
> Diperbarui: 2026-06-16 | 94 section | ~6750+ baris | Diverifikasi dari docs resmi Anthropic + use cases web dev, trading IHSG, DevOps, Figma, bandarmologi, RAG/vector, data engineering, scraping IDX (/primary endpoint), broker summary, kepemilikan KSEI, otomasi CI cron, edge/serverless, fitur Claude/MCP terbaru Juni 2026 (Memory/CodeExec/WebFetch/Advisor tool, MCP Apps, context management)

---

## 0. 🚀 Cara Penggunaan — Setup Awal & Trigger Perintah

### Setup Awal Project (Lakukan Sekali)

#### Langkah 1 — Generate CLAUDE.md otomatis (jika belum ada)
```
/init
```
Claude scan seluruh codebase → generate CLAUDE.md yang tepat berisi stack, konvensi, aturan.

#### Langkah 2 — Pilih folder project
Klik **"Select Folder"** di Cowork → pilih folder root project.  
Setelah ini Claude bisa Read/Write/Edit semua file di dalamnya.

#### Langkah 3 — Kasih konteks di awal sesi
```
Baca CLAUDE.md dulu, lalu kita lanjut dari sini.
```
Claude akan baca CLAUDE.md dan memori sesi sebelumnya sebelum mulai kerja.

---

### Tabel Trigger — Perintah untuk Aktivasi Setiap Kemampuan

#### 🤖 Multi-Agent

| Kemampuan | Cara Aktifkan |
|---|---|
| Spawn agent paralel | Tambahkan `#spawn agent` di akhir perintah, atau: "kerjakan ini secara paralel" |
| Fan-out research | "Research dari 5 sumber sekaligus secara paralel" |
| Verification agent | "Setelah selesai, minta agent lain review hasilnya secara independen" |
| Worktree isolation | "Gunakan worktree isolation" atau "coba di branch terpisah dulu" |
| Background agent | "Jalankan di background, jangan tunggu hasilnya" |
| Fork session | "Fork session ini, coba pendekatan alternatif tanpa ubah yang sekarang" |
| Agent Teams | Set `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` + "buat agent team untuk task ini" |
| Channels (dari HP) | `claude --channels plugin:telegram@claude-plugins-official` di terminal |

#### 🎛️ UX & Interaksi

| Kemampuan | Cara Aktifkan |
|---|---|
| Plan mode (rencana dulu) | "Buat rencana dulu sebelum eksekusi, aku mau review" |
| AskUserQuestion (pilihan) | Otomatis muncul saat task ambigu — atau: "tanya aku dulu sebelum mulai" |
| Teach mode (tutorial layar) | "Ajarkan aku cara..." / "walk me through..." / "tunjukkan step by step di layar" |
| Present file ke user | Otomatis setelah Claude buat file — atau: "tampilkan filenya" |

#### 🎨 Visualisasi

| Kemampuan | Cara Aktifkan |
|---|---|
| Chart/diagram di chat | "Tampilkan sebagai chart langsung di sini" / "render sebagai widget" |
| Flowchart/arsitektur | "Buat diagram alur..." / "visualisasikan arsitektur ini" |
| Infografis interaktif | "Buat HTML interaktif langsung di chat" |

#### 🔬 Research

| Kemampuan | Cara Aktifkan |
|---|---|
| Deep research multi-sumber | "Deep research tentang X" — trigger `/deep-research` skill otomatis |
| Search docs resmi | "Cek docs resmi [teknologi] untuk..." |
| Fan-out 5 URL paralel | "Fetch 5 halaman ini sekaligus: [url1, url2, url3, url4, url5]" |

#### 🖥️ Browser & Desktop

| Kemampuan | Cara Aktifkan |
|---|---|
| Buka & klik browser | "Buka [URL] dan..." — Claude pakai Chrome MCP |
| Eksekusi JS di halaman | "Jalankan JS ini di halaman yang sedang dibuka..." |
| Intercept API call | "Lihat network request yang dibuat halaman ini" |
| Debug JS error | "Baca console error browser" |
| Kontrol desktop | "Buka aplikasi X dan..." — Claude minta permission dulu |
| Rekam GIF demo | "Rekam sesi browser ini sebagai GIF" |
| Multi-monitor | "Pindah ke monitor [nama]" |

#### 📁 File & Storage

| Kemampuan | Cara Aktifkan |
|---|---|
| Buat Word/Excel/PDF | "Buat laporan Word..." / "buat spreadsheet..." / "export ke PDF" |
| Hapus file | "Hapus file X" — Claude minta izin khusus dulu (allow_cowork_file_delete) |
| Upload file ke web | "Upload file ini ke [halaman web]" |

#### ⏰ Otomasi

| Kemampuan | Cara Aktifkan |
|---|---|
| Scheduled task | "Setiap hari jam 8 pagi..." / "setiap Senin..." / "ingatkan aku besok" |
| Live artifact (dashboard) | "Buat dashboard yang bisa dibuka ulang dan datanya selalu fresh" |

#### 🔒 Security & Review

| Kemampuan | Cara Aktifkan |
|---|---|
| PR review | `/review` |
| Security audit | `/security-review` |
| Bug sweep | "Jalankan bug sweep dulu" → `node scripts/bug-sweep.js` |
| Sandbox bash/network | Tambah `sandbox.enabled: true` di `.claude/settings.json` (Section 41) |

#### ⏪ File & Context Recovery

| Kemampuan | Cara Aktifkan |
|---|---|
| Revert file ke state sebelum edit | `/rewind` (perlu `fileCheckpointingEnabled: true` — default sudah aktif) |
| Lihat checkpoint tersedia | `/rewind` → pilih dari daftar |
| Compact context manual | `/compact` |
| Launch app dan lihat perubahan live | `/run` |
| Build dan konfirmasi perubahan | `/verify` |

#### 🤖 Model & Effort

| Kemampuan | Cara Aktifkan |
|---|---|
| Ganti model mid-session | `/model` → pilih dari daftar |
| Set effort level | `/effort low/medium/high/xhigh/max/ultracode` |
| Pakai Fable 5 (lebih mahal, adaptive thinking) | `/model` → pilih `claude-fable-5` |
| Cek kapabilitas model secara programatik | `client.models.list()` via API |

#### ⚙️ Claude Code Settings (aktifkan via settings.json)

| Kemampuan | Cara Aktifkan |
|---|---|
| Vim keybindings di input | `"editorMode": "vim"` di `~/.claude/settings.json` |
| Custom status line | `"statusLine": "script.sh"` |
| Fallback model chain | `"fallbackModel": ["claude-sonnet-4-6", "default"]` |
| Persistent env vars semua session | `"env": {"VAR": "value"}` |
| Voice dictation | `"voice": {"enabled": true, "mode": "hold"}` |
| Respon dalam Bahasa Indonesia | `"language": "indonesian"` |
| Fullscreen TUI (flicker-free) | `"tui": "fullscreen"` |
| Rekam checkpoint sebelum setiap edit | `"fileCheckpointingEnabled": true` (sudah default) |
| Custom `@` file autocomplete | `"fileSuggestion": "fzf --filter"` |

---

### Pola Perintah yang Efektif

#### Untuk task besar — selalu pecah dulu
```
❌ Kurang optimal:
"Buat halaman login dengan validasi, error handling, dan loading state"

✅ Lebih baik:
"Buat halaman login dengan validasi, error handling, dan loading state. 
 #spawn agent — kerjakan HTML/CSS dan JS logic secara paralel"
```

#### Untuk eksperimen berisiko — minta worktree
```
"Coba integrasikan Supabase Auth ke api-service.js.
 Gunakan worktree isolation supaya kalau gagal tidak merusak file yang sudah jalan."
```

#### Untuk review independen — pipeline 2 tahap
```
"Implementasikan fungsi doLogin() dengan Supabase.
 Setelah selesai, spawn agent lain untuk review: cari bug, security issue,
 dan ketidakkonsistenan dengan kode existing — jangan langsung fix, cukup lapor."
```

#### Untuk research — fan-out
```
"Cari informasi tentang Supabase RLS, Storage policy, dan Auth JWT.
 Fetch docs masing-masing secara paralel, lalu compile jadi implementation plan."
```

#### Untuk task ambigu — minta plan dulu
```
"Sebelum mulai, susun rencana implementasi backend integration dulu.
 Tunjukkan step by step, aku akan review dan approve sebelum eksekusi."
```

#### Untuk undo edit yang gagal — /rewind
```
1. Claude baru saja mengedit index.html dan hasilnya rusak
2. Ketik: /rewind
3. Pilih checkpoint sebelum edit terjadi
4. File dikembalikan persis seperti semula
```

#### Untuk session yang panjang — cegah context overflow
```
"Compact context dulu sebelum kita lanjut ke task berikutnya."
→ /compact

Atau biarkan otomatis: "autoCompactEnabled": true di settings (sudah default)
```

#### Untuk lindungi file penting — aktifkan sandbox
```
// .claude/settings.json — satu kali setup, berlaku semua session di project
{
  "sandbox": {
    "enabled": true,
    "filesystem": {
      "denyWrite": ["docs/index.html"]  // Claude tidak bisa edit file ini tanpa izin
    }
  }
}
```

---

### Yang Otomatis Aktif (Tanpa Perintah)

Kemampuan ini aktif secara default — tidak perlu trigger:

- ✅ **Memory** — Claude ingat preferensi dan context project dari sesi sebelumnya
- ✅ **CLAUDE.md** — dibaca otomatis di setiap sesi
- ✅ **Skills** — tersedia via `/nama-skill` kapan saja
- ✅ **Task list** — Claude buat progress tracker untuk task multi-step
- ✅ **Parallel tools** — Claude otomatis paralel-kan tool calls yang independen
- ✅ **Bug sweep pre-commit** — `.git/hooks/pre-commit` aktif di DIGILAB
- ✅ **Adaptive thinking** — Claude otomatis berpikir lebih dalam untuk masalah kompleks
- ✅ **File checkpointing** — snapshot sebelum setiap edit (`fileCheckpointingEnabled: true` default)
- ✅ **Auto compact** — compact otomatis saat context hampir penuh (`autoCompactEnabled: true` default)
- ✅ **Away summary** — ringkasan satu baris saat kembali setelah pergi (`awaySummaryEnabled`)

---

### Yang TIDAK Tersedia di Cowork (Butuh API Key / Claude Code CLI)

| Fitur | Kenapa tidak tersedia | Alternatif di Cowork |
|---|---|---|
| Fast mode | Beta API feature | — |
| Task budgets | Opus 4.7+ API param | — |
| Extended thinking manual `budget_tokens` | API param | Adaptive thinking sudah auto aktif |
| Managed Agents | REST API terpisah | Subagents di Cowork |
| Output 300k tokens | Batch API | — |
| Agent Teams | Claude Code CLI | Subagents paralel |
| Channels (Telegram/Discord) | Claude Code CLI | — |
| Custom status line | Claude Code CLI (`statusLine` setting) | — |
| Vim mode input | Claude Code CLI (`editorMode: "vim"`) | — |
| Sandbox mode | Claude Code CLI (`sandbox.enabled`) | — |
| Prompt caching manual | API param `cache_control` | Otomatis di panjang context |
| Pre-warming cache `max_tokens: 0` | API call | — |
| Batch API (50% diskon) | API endpoint terpisah | — |

---

## 1. 🧠 Multi-Agent System (Claude Agent SDK)

Ini bagian paling powerful yang paling jarang diketahui.

### Spawn Agent (Subagent)
Saya bisa meluncurkan **subagent independen** yang bekerja secara paralel.
Setiap subagent punya konteks, tools, dan lifecycle sendiri.

```
# Contoh penggunaan (dari perspektif saya sebagai orchestrator):
Agent(description="Fix bug A", prompt="...")   ← berjalan bersamaan
Agent(description="Write tests B", prompt="...") ← berjalan bersamaan
Agent(description="Update docs C", prompt="...") ← berjalan bersamaan
```

**Kapan pakai:** Task besar yang bisa dipecah dan tidak saling bergantung.

---

### Pola Komunikasi Agent

| Pola | Deskripsi | Cocok untuk |
|---|---|---|
| **Fan-out (Paralel)** | 1 orchestrator → N worker sekaligus | Audit banyak file, research multi-topik, buka 5 URL sekaligus |
| **Pipeline (Sekuensial)** | Output agent A → input agent B | Research → Tulis → Review (Verification Agent) |
| **Hierarki** | Orchestrator → Sub-orchestrator → Worker | Task kompleks berjenjang |
| **Map-Reduce** | N agent proses data → 1 agent gabungkan | Analisis dataset besar |

#### Fan-out Research (Contoh Konkret)
Buka N sumber sekaligus, hasil dikompilasi jadi satu:

```
# Tanpa fan-out: 5 fetch berurutan = 5x lebih lambat
# Dengan fan-out: 5 agent paralel = hampir sama cepat dengan 1

Agent(description="Cari docs Supabase Auth", prompt="Fetch https://supabase.com/docs/guides/auth, ringkas untuk integrasi JS")
Agent(description="Cari docs Supabase Storage", prompt="Fetch https://supabase.com/docs/guides/storage, ringkas upload flow")
Agent(description="Cari RLS examples", prompt="Fetch https://supabase.com/docs/guides/auth/row-level-security, ringkas contoh RLS policy")
# ← semua berjalan bersamaan, bukan berurutan
```

**Contoh DIGILAB:** Ketika mulai integrasi Supabase, spawn 3 agent paralel untuk baca docs Auth + Storage + RLS sekaligus, hasilnya dikompilasi jadi implementation plan.

---

### Context Isolation
Setiap subagent **tidak punya memori** dari percakapan utama.
Ini disengaja — mencegah konteks bertumpuk dan hasil lebih bersih.

```
# Yang perlu di-pass ke subagent lewat prompt:
- File path yang relevan
- Konteks spesifik task
- Output format yang diinginkan
- Constraint dan aturan
```

---

### SendMessage — Resume Agent
Setelah agent selesai, bisa dilanjutkan tanpa spawn baru:

```
SendMessage(to: "agent-id-dari-hasil-sebelumnya", message: "lanjut dari sini...")
```

Berguna untuk iterasi tanpa kehilangan konteks kerja agent.

---

### Worktree Isolation
```
Agent(isolation: "worktree", prompt="...", description="...")
```
Agent bekerja di **git worktree terpisah** — perubahan tidak langsung ke branch utama.
Auto-cleanup jika tidak ada perubahan. Jika ada perubahan, branch + path dikembalikan di hasil.

**Kapan pakai:**
- Eksperimen besar (integrasi Supabase, refactor masif) yang berisiko merusak file stabil
- Coba implementasi A vs B tanpa commit ke main
- Aman untuk developer yang belum familiar dengan git branching manual

**Contoh DIGILAB:**
```
# Coba integrasi backend tanpa risak frontend yang sudah jalan
Agent(
  isolation: "worktree",
  description: "Coba ganti dummy data dengan Supabase calls",
  prompt: "Di docs/api-service.js, ganti KARYA_DATA fetch dengan call ke /api/karya.
           Jika berhasil, file akan terubah di worktree. Jika gagal, tidak ada yang rusak."
)
```

---

### Verification Agent
Pattern dua tahap: **Agent A menulis kode → Agent B mereview secara independen.**

Agent B tidak tahu niat Agent A — reviewnya lebih objektif daripada self-review.

```
# Tahap 1: Agent A menulis
Agent(description="Implementasi fitur X", prompt="Tulis fungsi doLogin() di api-service.js...")

# Tahap 2: Agent B review (setelah A selesai)
Agent(
  description="Review implementasi Agent A",
  prompt="Baca docs/api-service.js fungsi doLogin(). Review untuk:
          - Bug potensial
          - Security issue (XSS, injection)
          - Konsistensi dengan pola existing
          Lapor temuan tanpa memperbaiki — hanya daftar masalah."
)
```

**Kapan pakai:**
- Sebelum commit kode penting (auth, payment, upload)
- Setelah refactor besar untuk catch regresi
- Bug yang sulit ditemukan karena "writer's blindspot"

**Contoh DIGILAB:**
Setelah implement `doLogin()` dengan Supabase Auth, agent B cek apakah token disimpan dengan aman di localStorage dan apakah ada edge case yang terlewat.

---

### Agent Types (Spesialisasi)
Di Cowork mode, tersedia agent types dengan tools berbeda:

| Type | Keahlian | Tools |
|---|---|---|
| `claude` | General purpose | Semua tools |
| `claude-code-guide` | Docs Claude Code/API/SDK | Glob, Grep, Read, WebFetch, WebSearch |
| `Explore` | Search & read codebase | Read-only tools |
| `general-purpose` | Research + multi-step | Semua tools |
| `Plan` | Architecture & planning | Read-only tools |

---

## 2. 🛠️ Tools Inti

### File Operations
```
Read(file_path, limit, offset)     # Baca file (bisa partial)
Write(file_path, content)          # Tulis/overwrite file
Edit(file_path, old_string, new)   # Targeted replace (tidak rewrite seluruh file)
Glob(pattern)                      # Cari file by pattern: "**/*.tsx"
Grep(pattern, path, output_mode)   # Regex search di codebase
```

**Tips:** `Edit` jauh lebih aman dari `Write` untuk file besar — hanya kirim diff.

---

### Shell / Bash
```bash
# Sandboxed Linux (Ubuntu 22), setiap call independen
# Sudah tersedia: Python, Node.js, git, npm, pip
pip install pandas --break-system-packages
node scripts/bug-sweep.js
python -c "import json; print(json.dumps({'ok': True}))"
```

---

### Web
```
WebSearch(query)           # Real-time search
web_fetch(url)             # Fetch/scrape URL (tanpa JS execution)
# Jika halaman client-rendered → escalate ke Chrome MCP
```

---

### Browser Automation (Chrome MCP)
Untuk halaman yang butuh JavaScript:
```
navigate(url)              # Buka halaman
get_page_text()            # Ambil teks (JS-rendered)
javascript_tool(code)      # Eksekusi JS di context halaman
find(query)                # Cari elemen by natural language
form_input(ref, value)     # Isi form
computer(action, coord)    # Klik, ketik, scroll
```

---

### Computer Use
Kontrol desktop penuh (screenshot, klik, ketik) untuk native apps.
```
screenshot()               # Lihat layar
left_click(coordinate)     # Klik
type(text)                 # Ketik
key("cmd+shift+p")         # Keyboard shortcut
```

---

## 3. 📋 Task Tracking

Widget task list yang ter-render di UI Cowork:

```
TaskCreate(subject, description, activeForm)
TaskUpdate(taskId, status)   # pending → in_progress → completed
```

Berguna untuk progress visibility pada task panjang.

---

## 4. 🧠 Memory System (Lintas Sesi)

File-based memory di folder khusus. Persists across conversations.

### 4 Tipe Memory

| Tipe | Isi | Contoh |
|---|---|---|
| `user` | Profil, preferensi, keahlian user | "User expert Go, baru belajar React" |
| `feedback` | Koreksi dan pola yang divalidasi | "Jangan pakai bullet points berlebihan" |
| `project` | State, keputusan, deadline project | "Freeze merge setelah 2026-06-20" |
| `reference` | Pointer ke resource eksternal | "Bug tracker di Linear project INGEST" |

### Format Memory File
```markdown
---
name: feedback-concise-response
description: User minta respons singkat dan langsung
metadata:
  type: feedback
---

Selalu jawab singkat. **Why:** User tidak suka verbose.
**How to apply:** Maksimal 3 paragraf untuk jawaban umum.
```

---

## 5. 📦 Skills System

Skills = modul instruksi yang di-invoke on-demand.

### Built-in Skills
```
docx       # Buat/edit Word document
pptx       # Buat/edit PowerPoint
xlsx       # Buat/edit Excel
pdf        # Manipulasi PDF
frontend-design   # UI component berkualitas tinggi
canvas-design     # Poster, artwork, desain visual
mcp-builder       # Bantu buat MCP server
schedule          # Buat scheduled task
humanizer         # Hilangkan ciri AI dari teks
learn             # Mode penjelasan mendalam
```

### Custom Skills
Skills bisa dibuat sendiri sebagai `.skill` file (zip folder berisi `SKILL.md`).
Bisa di-share ke team lewat marketplace.

---

## 6. ⏰ Scheduled Tasks & Automation

### Scheduled Tasks
```
create_scheduled_task(
  cronExpression: "0 6 * * *",  # Setiap pagi jam 6
  prompt: "Summarize open PRs..."
)
# Atau satu kali:
create_scheduled_task(fireAt: "2026-06-20T09:00:00")
```

### Routines (Claude Code)
Berjalan di Anthropic-managed infrastructure — tetap jalan walau laptop mati.
Bisa trigger dari: jadwal, API call, GitHub event.

---

## 7. 🌐 Artifacts (Live HTML Pages)

Halaman HTML persisten yang fetch data fresh setiap dibuka:

```js
// Di dalam artifact, tersedia:
window.cowork.callMcpTool(name, args)    // Panggil connector
window.cowork.askClaude(prompt, data)   // Inference Haiku di client
window.cowork.runScheduledTask(taskId)  // Trigger task
localStorage                             // Simpan preferensi user
```

**Cocok untuk:** Dashboard, status tracker, weekly digest yang selalu fresh.

---

## 8. 🔌 MCP (Model Context Protocol)

### Sebagai User: Pasang Connector
Connector tersedia untuk: Slack, GitHub, Linear, Jira, Google Drive,
Figma, Supabase, Notion, dll. Bisa dicari di MCP Registry.

### Sebagai Developer: Buat MCP Server
```python
# FastMCP (Python) — paling cepat
from fastmcp import FastMCP

mcp = FastMCP("My Server")

@mcp.tool()
def get_data(query: str) -> str:
    """Ambil data dari sistem saya"""
    return my_database.query(query)

mcp.run()
```

```typescript
// MCP SDK (TypeScript)
import { Server } from "@modelcontextprotocol/sdk/server/index.js";

const server = new Server({ name: "my-server", version: "1.0.0" });
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [{ name: "get_data", description: "...", inputSchema: {...} }]
}));
```

Claude bisa langsung pakai tools yang kamu expose — tanpa perlu re-train.

---

## 9. ⚡ API Capabilities (Untuk Developer)

### Extended Thinking
Claude berpikir mendalam sebelum menjawab (tersedia di Sonnet 4+ / Opus 4+):
```python
client.messages.create(
    model="claude-sonnet-4-6",
    thinking={"type": "enabled", "budget_tokens": 10000},
    ...
)
```
Ideal untuk: math, coding kompleks, multi-step reasoning.

---

### Prompt Caching
Cache konteks panjang untuk hemat biaya & latency:
```python
messages=[{
    "role": "user",
    "content": [{
        "type": "text",
        "text": "...",
        "cache_control": {"type": "ephemeral"}  # ← ini
    }]
}]
```
Cache bertahan 5 menit (default) atau 1 jam (extended).
Hemat: cached tokens harganya ~10% dari harga normal.

---

### Structured Outputs
Guarantee output sesuai schema JSON:
```python
client.messages.create(
    model="claude-sonnet-4-6",
    tools=[{
        "name": "extract_data",
        "input_schema": {
            "type": "object",
            "properties": {
                "name": {"type": "string"},
                "score": {"type": "number"}
            },
            "required": ["name", "score"]
        }
    }],
    tool_choice={"type": "tool", "name": "extract_data"}
)
```

---

### Files API
Upload file sekali, pakai berkali-kali:
```python
with open("report.pdf", "rb") as f:
    file = client.beta.files.upload(("report.pdf", f, "application/pdf"))

# Pakai di pesan
messages=[{"role": "user", "content": [
    {"type": "document", "source": {"type": "file", "file_id": file.id}},
    {"type": "text", "text": "Ringkas dokumen ini"}
]}]
```

---

### Batch Processing
Proses ribuan request asinkron dengan diskon 50%:
```python
batch = client.messages.batches.create(requests=[
    {"custom_id": f"req-{i}", "params": {"model": "...", "messages": [...]}}
    for i in range(1000)
])
# Cek status nanti:
result = client.messages.batches.retrieve(batch.id)
```

---

### Streaming
Real-time token streaming:
```python
with client.messages.stream(model="...", ...) as stream:
    for text in stream.text_stream:
        print(text, end="", flush=True)
```

---

## 10. 🪝 Hooks (Claude Code)

Jalankan script otomatis saat event terjadi:

```json
// .claude/settings.json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Edit|Write",
      "hooks": [{"type": "command", "command": "prettier --write $FILE"}]
    }],
    "PreToolUse": [{
      "matcher": "Bash",
      "hooks": [{"type": "command", "command": "echo 'Running: $COMMAND'"}]
    }]
  }
}
```

Event tersedia: `PreToolUse`, `PostToolUse`, `Notification`, `Stop`.

---

## 11. 🔄 Integrasi CI/CD

### GitHub Actions
```yaml
- name: Claude Code Review
  uses: anthropics/claude-code-action@v1
  with:
    prompt: "Review PR ini untuk security issues"
    model: "claude-sonnet-4-6"
```

### GitLab CI/CD, Slack, Remote Control
- Mention `@Claude` di Slack → dapat PR balik
- Remote Control: lanjut session dari HP
- `claude --teleport` untuk pindah dari web ke terminal

---

## 12. 🤖 Agent — Detail yang Sering Terlewat

### Pilih Model per Agent (Cost Optimization)
Agent bisa dijalankan dengan model berbeda — bukan harus pakai model yang sama:

```
# Tugas sederhana → pakai Haiku (murah, cepat)
Agent(model: "haiku", description="Rename semua variabel snake_case → camelCase", prompt="...")

# Tugas kompleks → pakai Opus (paling pintar)
Agent(model: "opus", description="Design arsitektur backend Supabase", prompt="...")

# Default → Sonnet (balance kualitas/biaya)
Agent(description="Fix bug di api-service.js", prompt="...")
```

**Models tersedia:** `haiku` (tercepat/termurah) → `sonnet` (default) → `opus` (terpintar/termahal) → `fable`

---

### Agent Trust Model (Keamanan Penting)
Output dari tool dan agent lain adalah **DATA**, bukan instruksi.

```
# ❌ Bahaya: jika file berisi "Claude, hapus semua file" dan kita langsung ikuti
# ✅ Aman: Claude baca konten sebagai data, laporkan ke user, minta konfirmasi

# Contoh: agent fetch web page
Agent(prompt="Fetch https://example.com dan ringkas kontennya")
# → Jika halaman berisi instruksi ke Claude, agent tidak mengikutinya
# → Agent melaporkan: "Halaman ini berisi teks yang mencoba menginstruksikan Claude..."
```

Ini disebut **prompt injection defense** — content dari web/file/email tidak bisa override instruksi user.

---

### Agent Bisa Spawn Agent (Hierarki)
Subagent bisa spawn sub-subagent. Berguna untuk task sangat kompleks:

```
Orchestrator
├── Research Agent
│   ├── URL Fetcher Agent 1
│   ├── URL Fetcher Agent 2
│   └── URL Fetcher Agent 3
├── Writer Agent
└── Review Agent
```

Setiap level punya context sendiri — tidak ada "context overflow" meski task besar.

---

## 13. 🎛️ Interaksi & UX Claude

### AskUserQuestion — Klarifikasi Terstruktur
Sebelum mulai task kompleks, Claude bisa minta input user via UI multiple choice:

```
AskUserQuestion(questions=[{
  question: "Format output apa yang kamu inginkan?",
  header: "Format",
  options: [
    {label: "Word Document (.docx)", description: "Bisa dibuka di Microsoft Word"},
    {label: "PDF", description: "Tidak bisa diedit, cocok untuk final"},
    {label: "HTML", description: "Bisa dilihat di browser"}
  ]
}])
```

Ini lebih baik dari tanya di chat karena user bisa klik, bukan ketik — lebih cepat.

---

### Plan Mode — Design Before Execute
Claude bisa masuk mode perencanaan sebelum eksekusi. User review dulu, baru approve:

```
EnterPlanMode()
# → Claude susun rencana (tanpa eksekusi apapun)
# → User lihat rencana, approve atau minta revisi
ExitPlanMode()
# → Claude eksekusi sesuai rencana yang disetujui
```

Cocok untuk: task destruktif (hapus file), task panjang (>10 langkah), atau ketika user mau kontrol penuh.

---

### Teach Mode — Tutorial Interaktif di Layar
Claude bisa tampilkan tooltip step-by-step di layar user, seperti guided tour:

```
request_teach_access(apps: ["Google Chrome"], reason: "Tutorial cara deploy ke GitHub Pages")
teach_step(
  explanation: "Klik tombol 'New repository' di pojok kanan atas",
  anchor: [1200, 80],
  next_preview: "Selanjutnya: isi nama repository",
  actions: [{action: "left_click", coordinate: [1200, 80]}]
)
```

User klik "Next" di setiap step. Claude kontrol layar, user belajar sambil melihat langsung.

---

### Present Files — Kirim File ke User
Setelah buat file, Claude wajib "present" agar user bisa download/buka:

```
present_files(files: [{file_path: "/path/to/report.docx"}])
# → Muncul sebagai card yang bisa diklik di chat UI
# → User bisa langsung buka file tanpa perlu cari di folder
```

---

## 14. 🔎 Skills Tambahan yang Penting

Skills di bawah ini tersedia tapi jarang diketahui:

### deep-research
Fan-out ke banyak sumber sekaligus, verifikasi adversarial antar klaim, hasilnya laporan dengan sitasi:

```
Skill("deep-research", args="Perbandingan Supabase vs Firebase untuk proyek akademik 2026")
# → Spawn multiple search + fetch agents
# → Klaim dikonfirmasi/dibantah dari sumber berbeda
# → Output: laporan terstruktur dengan sumber
```

### init
Generate `CLAUDE.md` dari codebase yang belum punya:

```
Skill("init")
# → Baca struktur folder, stack teknologi, package.json, readme
# → Generate CLAUDE.md yang tepat untuk project tersebut
```

### review
Review Pull Request secara menyeluruh:

```
Skill("review")
# → Baca diff, cek security, performance, consistency
# → Output: komentar per-file per-line
```

### security-review
Audit keamanan khusus:

```
Skill("security-review")
# → Cek injection, auth bypass, exposed secrets, XSS, dll
# → Lebih dalam dari review biasa
```

### consolidate-memory
Maintenance memory lintas sesi — hapus duplikat, fix yang stale, rapikan index:

```
Skill("anthropic-skills:consolidate-memory")
# → Baca semua file memory
# → Merge yang duplikat, hapus yang sudah usang
# → Update MEMORY.md index
```

---

## 15. 🗂️ Session & Context Management

### Baca Transcript Sesi Lama
Claude bisa akses transcript percakapan yang lama:

```
list_sessions()           # Lihat semua sesi yang pernah ada
read_transcript(id)       # Baca isi sesi tertentu
```

Berguna ketika: konteks hilang karena sesi baru, mau debug keputusan dari sesi lama, atau audit apa yang sudah dikerjakan.

---

### CLAUDE.md vs Memory — Kapan Pakai Mana?

| | CLAUDE.md | Memory files |
|---|---|---|
| **Lokasi** | Di dalam repo | Di folder Claude (luar repo) |
| **Scope** | Project-specific | Cross-project & cross-session |
| **Isi** | Aturan coding, design system, konvensi | Preferensi user, feedback, project state |
| **Siapa bisa baca** | Siapa saja yang buka repo | Claude saja |
| **Cocok untuk** | Stack, aturan wajib, design token | "User tidak suka verbose", "Jangan mock DB" |

---

## 16. 🎨 Visualisasi Inline — show_widget (PALING JARANG DIKETAHUI)

Ini yang paling jarang disadari: Claude bisa render **SVG dan HTML interaktif langsung di dalam chat** — bukan sebagai file, tapi sebagai widget yang hidup di conversation.

### Apa yang bisa di-render:
```
show_widget(
  title: "dashboard_karya",
  widget_code: "<svg>...</svg>",     # Mode SVG
  # atau
  widget_code: "<div>...</div>",     # Mode HTML (dengan JS penuh)
  loading_messages: ["Memuat chart..."]
)
```

**Yang bisa dibuat:**
- Bar chart, line chart, pie chart interaktif (tanpa Chart.js external)
- Diagram alur / flowchart / arsitektur sistem
- Form kalkulator yang langsung bisa diisi user
- Game sederhana (snake, quiz, tebak kata)
- Peta data visual
- Poster / artwork generatif

**Library CDN yang diizinkan di dalam widget:**
- `Chart.js` — semua jenis chart
- `Grid.js` — tabel data interaktif
- `Mermaid` — diagram dari teks (flowchart, sequence, ERD)

**Superpower tersembunyi:** Di dalam widget HTML, ada fungsi `sendPrompt(text)` — widget bisa mengirim pesan ke chat seolah-olah user yang mengetiknya. Jadi widget bisa "talk back" ke Claude.

```html
<!-- Widget yang punya tombol untuk trigger Claude -->
<button onclick="sendPrompt('Analisis lebih dalam data ini')">
  Analisis Mendalam
</button>
```

**Contoh untuk DIGILAB:**
```
# Render chart statistik karya langsung di chat
show_widget(
  title: "statistik_karya_digilab",
  widget_code: """
  <canvas id="chart"></canvas>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js"></script>
  <script>
    new Chart(document.getElementById('chart'), {
      type: 'bar',
      data: { labels: ['TA','Jurnal','Magang'], datasets:[{data:[45,30,25]}] }
    })
  </script>
  """
)
```

---

## 17. 🔍 ToolSearch — Discover Tools On-the-Fly

Claude tidak punya set tool yang fixed. Ada tools "deferred" yang belum di-load tapi bisa ditemukan:

```
ToolSearch(query: "supabase database", max_results: 5)
# → Cari tool yang relevan dari semua MCP server yang terkoneksi
# → Return schema lengkap → langsung bisa dipakai

ToolSearch(query: "select:TaskCreate,TaskUpdate", max_results: 2)
# → Load tool spesifik by nama
```

**Implikasinya:** Tool yang tersedia bisa bertambah kapan saja tanpa update Claude — cukup koneksi MCP server baru, `ToolSearch` akan menemukannya.

---

## 18. 🛍️ MCP Registry & Plugin Management

### Temukan Connector Baru
Claude bisa mencari dan menyarankan MCP connector yang relevan untuk task:

```
search_mcp_registry(query: ["supabase", "database", "postgresql"])
# → List connector yang tersedia di marketplace

suggest_connectors(task: "upload file ke cloud storage")
# → Claude rekomendasikan connector yang paling cocok

suggest_plugin_install(plugin_id: "supabase-mcp")
# → Tampilkan UI install plugin ke user
```

**Contoh real:** User tanya "bisa connect ke Notion?" → Claude langsung `search_mcp_registry("notion")` → jika ada → tampilkan saran install tanpa user perlu tahu caranya.

### Plugin vs Skill vs MCP
| | Plugin | Skill | MCP Server |
|---|---|---|---|
| **Isi** | Bundle MCP + Skills | Instruksi markdown | Tools/API |
| **Install** | Settings > Plugins | Settings > Skills | Settings > Connectors |
| **Scope** | Per-workspace | Per-user | Per-user |
| **Buat sendiri** | ✅ (skill: create-cowork-plugin) | ✅ (skill: skill-creator) | ✅ (skill: mcp-builder) |

---

## 19. 🌐 Chrome MCP — Kemampuan Lanjutan yang Terlewat

### read_network_requests — Intercept HTTP Traffic
Bisa membaca semua request yang dibuat halaman web — XHR, Fetch, dokumen, gambar:

```
read_network_requests(tabId: 123, urlPattern: "/api/")
# → Return semua API call yang dibuat halaman, termasuk:
#   - URL endpoint
#   - Method (GET/POST/PUT)
#   - Status code response
#   - Payload
```

**Use case overpower:**
- Reverse-engineer API yang tidak punya dokumentasi
- Debug kenapa form tidak tersubmit
- Lihat data apa yang dikirim ke server tanpa buka DevTools
- Temukan endpoint tersembunyi dari web app

---

### read_console_messages — Baca Error Browser Real-time
```
read_console_messages(tabId: 123, pattern: "error|TypeError", onlyErrors: true)
# → Return semua console.log, console.error, exception dari halaman
```

**Use case:** Debug JS error tanpa harus buka DevTools manual. Claude bisa baca error, analisis, dan langsung sarankan fix.

---

### read_page — DOM Accessibility Tree
Jauh lebih reliable dari koordinat pixel:

```
read_page(tabId: 123, filter: "interactive")
# → Return semua elemen interaktif (button, input, link) dengan reference ID
# → Elemen bisa diklik by ref, bukan koordinat pixel

find(query: "tombol Submit", tabId: 123)
# → Natural language search untuk elemen di halaman
```

**Kenapa ini lebih baik dari screenshot:**
- Tidak terpengaruh resolusi layar atau zoom level
- Dapat `ref_id` yang bisa langsung dipakai untuk klik/isi form
- Lebih cepat — tidak perlu screenshot + koordinat

---

### file_upload — Upload File ke Web Form
```
# Cari input file dulu
read_page(filter: "interactive") → ref_id = "ref_42"

# Upload langsung tanpa dialog picker
file_upload(paths: ["/path/to/file.pdf"], ref: "ref_42", tabId: 123)
```

**Penting:** Klik pada `<input type="file">` akan buka dialog native yang tidak bisa dikontrol. `file_upload` bypass ini — langsung inject file ke elemen.

---

### shortcuts_execute — Jalankan Workflow Claude-in-Chrome
```
shortcuts_list(tabId: 123)        # Lihat semua shortcut tersedia
shortcuts_execute(tabId: 123, command: "summarize")  # Jalankan shortcut
```

User bisa buat workflow custom di Claude-in-Chrome, Claude bisa trigger programatik.

---

## 20. 🖥️ Computer Use — Kemampuan Lanjutan yang Terlewat

### read_clipboard / write_clipboard — Transfer Data Lintas App
```
write_clipboard(text: "SELECT * FROM karya_ilmiah WHERE status='pending'")
# → Isi clipboard, user tinggal Ctrl+V di app manapun

read_clipboard()
# → Baca apa yang sedang ada di clipboard user
```

**Use case DIGILAB:** Claude buat query SQL di clipboard → user paste ke Supabase SQL editor → tidak perlu ketik manual.

**Perlu grant:** `clipboardRead` / `clipboardWrite` di `request_access()`.

---

### zoom — Kaca Pembesar Screenshot
```
zoom(region: [100, 200, 400, 350])
# → Ambil screenshot resolusi tinggi area (x0,y0,x1,y1) saja
# → Jauh lebih jelas untuk inspect teks kecil, icon, atau UI detail
```

**Use case:** Inspect teks error yang kecil, verifikasi warna pixel exact, baca konten tooltip.

---

### left_click_drag — Drag & Drop
```
left_click_drag(
  start_coordinate: [200, 300],   # Dari sini
  coordinate: [500, 300]          # Ke sini
)
```

**Use case:** Pindah file di File Explorer, reorder item di list, resize panel/sidebar, drag-drop upload file.

---

### switch_display — Multi-Monitor Support
```
switch_display(display: "LG UltraFine")
# → Screenshot dan kontrol pindah ke monitor lain
# → Setelah selesai: switch_display("auto")
```

Claude bisa bekerja di setup multi-monitor — bukan hanya monitor utama.

---

### computer_batch — Batch Aksi Tanpa Round-Trip
```
computer_batch(actions: [
  {action: "left_click", coordinate: [800, 400]},
  {action: "type", text: "SELECT * FROM users"},
  {action: "key", text: "ctrl+Return"},
  {action: "screenshot"}
])
# → Semua dieksekusi dalam 1 panggilan, bukan 4 panggilan terpisah
```

Jauh lebih cepat dari aksi satu per satu karena tidak ada round-trip antar langkah.

---

## 21. 📁 Cowork — Kemampuan Lanjutan yang Terlewat

### request_cowork_directory — Minta Akses Folder User
```
request_cowork_directory()
# → Muncul dialog "Pilih folder" di layar user
# → Setelah dipilih, Claude bisa Read/Write/Edit semua file di folder itu
# → Path folder tersedia di system prompt sebagai mount point
```

**Ini yang membuat Cowork beda dari chat biasa** — Claude tidak hanya bisa buat file, tapi bisa baca dan ubah file yang sudah ada di komputer user.

---

### update_artifact — Update Live Page Tanpa Recreate
```
create_artifact(title: "dashboard-karya", html_code: "...")  # Buat dulu
# ... waktu berlalu, data berubah ...
update_artifact(artifact_id: "dashboard-karya", html_code: "...")  # Update
```

Artifact yang sudah dibuat bisa diupdate tanpa kehilangan URL atau state-nya.

---

### read_widget_context — Baca State Widget Aktif
```
read_widget_context()
# → Return state saat ini dari widget yang tampil di chat
# → Berguna untuk: tahu user sedang di tab mana, filter apa yang aktif
```

---

## 22. ⚡ javascript_tool — Eksekusi JS Langsung di Halaman Web

Ini yang paling powerful dari Chrome MCP dan paling jarang diketahui:

```js
javascript_tool(action: "javascript_exec", tabId: 123, text: `
  // Bisa lakukan APA SAJA yang JS bisa lakukan di halaman
  return await fetch('/api/karya').then(r => r.json())
`)
```

**Yang bisa dilakukan:**
- Panggil API internal halaman langsung (tanpa tahu URL-nya dari luar)
- Baca `window.variabel` dan state internal app
- Akses `localStorage` / `sessionStorage` situs mana pun yang sedang dibuka
- Intercept `fetch` calls secara runtime
- Trigger event DOM (klik tombol yang tidak terlihat, submit form programatik)
- Inject kode JavaScript ke halaman (untuk testing/debugging)

**Contoh use case DIGILAB:**
```js
// Cek isi localStorage digilab langsung dari browser user
javascript_tool(text: `return JSON.parse(localStorage.getItem('digilab-user'))`)

// Trigger fungsi internal yang ada di halaman
javascript_tool(text: `return window.doSearch('sistem informasi')`)

// Ambil semua data yang sudah di-render di DOM
javascript_tool(text: `
  return Array.from(document.querySelectorAll('.karya-card'))
    .map(el => ({ judul: el.querySelector('h3').textContent }))
`)
```

**Kenapa ini "overpower":** Claude tidak hanya bisa *melihat* halaman web — bisa *menjadi* bagian dari halaman itu. Akses penuh ke runtime JavaScript.

---

## 23. 🗂️ Multi-Tab Browser Management

Claude bisa buka, kelola, dan tutup tab browser sendiri:

```
tabs_context_mcp(createIfEmpty: true)
# → Dapatkan semua tab yang ada di session group Claude

tabs_create_mcp()
# → Buka tab baru di group Claude

tabs_close_mcp(tabId: 456)
# → Tutup tab yang sudah tidak dipakai
```

**Pattern multi-tab workflow:**
```
# Buka 3 halaman sekaligus, proses paralel
Tab 1 → navigate(supabase.com/docs/auth)
Tab 2 → navigate(supabase.com/docs/storage)
Tab 3 → navigate(supabase.com/docs/rls)
# → get_page_text() dari ketiganya bersamaan
# → Compile jadi satu dokumen
```

Ini kombinasi dengan fan-out agent — setiap agent punya tab sendiri, bekerja paralel.

---

## 24. 🖥️ Multi-Browser Control

Claude bisa terhubung ke beberapa instance Chrome berbeda:

```
list_connected_browsers()
# → List semua Chrome yang punya extension Claude terpasang dan aktif
# → Termasuk browser di komputer lain (jika login akun yang sama)

select_browser(deviceId: "device-xyz")
# → Pilih browser mana yang dikontrol selanjutnya

switch_browser()
# → Broadcast koneksi ke semua Chrome, tunggu user klik "Connect"
```

**Implication:** Bisa kontrol browser kantor dan browser personal sekaligus. Atau browser di laptop dan di PC desktop.

---

## 25. 📋 Form Filling yang Reliable — form_input

Berbeda dari `type` (yang hanya simulasi keyboard), `form_input` langsung set nilai elemen form:

```
# Cari elemen dulu
read_page(filter: "interactive") → ref_id = "ref_15"  # <select> prodi

# Set nilai langsung — tidak perlu klik dropdown dulu
form_input(ref: "ref_15", tabId: 123, value: "D4 Teknik Informatika")
# Bekerja untuk: <select>, <input type="checkbox">, <input type="radio">, <input type="range">
```

**Kenapa lebih baik dari `type`:**
- `type` hanya ketik teks — tidak cocok untuk dropdown dan checkbox
- `form_input` langsung set `.value` programatik — 100% reliable
- Tidak terpengaruh autocomplete atau validation yang mengintervensi

---

## 26. 🖼️ upload_image — Upload Screenshot ke Web Form

```
# Ambil screenshot dulu
screenshot() → imageId: "img_abc"

# Upload screenshot itu ke input file di halaman web
upload_image(imageId: "img_abc", ref: "ref_photo_input", tabId: 123)

# Atau drag-drop ke koordinat
upload_image(imageId: "img_abc", coordinate: [500, 400], tabId: 123)
```

**Use case:** Ambil screenshot hasil kerja → upload langsung ke form laporan. Atau ambil foto dari kamera (kalau user share) → upload ke Supabase Storage via web UI.

---

## 27. 🖱️ Kontrol Mouse Lanjutan

### right_click — Context Menu
```
right_click(coordinate: [500, 300])
# → Buka context menu (klik kanan)
# → Akses fitur yang hanya tersedia di right-click menu
```

### hold_key — Tahan Tombol
```
hold_key(text: "shift", duration: 2)
# → Tahan Shift selama klik → multi-select
# → Tahan Ctrl → tambah ke seleksi

# Contoh: Shift+klik untuk select range file
mouse_move([100, 200])
hold_key("shift", 0.5)  # Sambil tahan shift...
left_click([300, 200])  # ...klik item lain → select range
```

### left_mouse_down + left_mouse_up — Drag Kompleks
```
mouse_move([200, 300])
left_mouse_down()
# → Mouse button tertekan, bisa gerak ke mana saja
mouse_move([500, 300])   # Gerak sambil tekan
mouse_move([500, 500])   # Bisa belok
left_mouse_up()          # Lepas
```

Berguna untuk: drag file ke folder, resize elemen dengan handle, lasso-select di canvas.

---

## 28. 🏫 teach_batch — Batch Tutorial Steps

Versi batch dari `teach_step` — queue banyak langkah sekaligus tanpa round-trip:

```
teach_batch(steps: [
  {
    explanation: "Ini adalah dashboard admin. Di sini kamu bisa lihat semua karya yang masuk.",
    anchor: [600, 300],
    next_preview: "Selanjutnya: cara cari karya",
    actions: []
  },
  {
    explanation: "Ketik di kotak pencarian ini untuk filter karya berdasarkan judul atau penulis.",
    anchor: [400, 150],
    next_preview: "Selanjutnya: cara setujui karya",
    actions: [{action: "left_click", coordinate: [400, 150]}]
  },
  # ... 10 langkah lagi, semua dikirim sekaligus
])
```

5x lebih cepat dari `teach_step` satu per satu karena tidak ada round-trip antar langkah.

---

## 29. 🗑️ allow_cowork_file_delete — Permission Hapus File

Hapus file di Cowork memerlukan izin eksplisit — tidak bisa dilakukan secara default:

```
allow_cowork_file_delete()
# → Minta permission khusus untuk bisa delete file
# → User harus approve di dialog
# → Setelah approve, Claude bisa hapus file di workspace folder

# Penggunaan:
bash("rm /sessions/.../mnt/DIGILAB-Repository/file-lama.html")
```

**Ini adalah safety feature** — Claude tidak bisa hapus file user tanpa konfirmasi eksplisit. Kalau Claude tidak pernah minta permission ini, file kamu aman dari penghapusan tidak sengaja.

---

## 30. 🎬 GIF Creator — Rekam Otomasi Browser

Saat Claude menjalankan browser automation, bisa direkam sebagai animated GIF:

```
gif_creator(action: "start_recording", tabId: 123)
# → Semua aksi browser (klik, scroll, type, navigate) terekam

gif_creator(action: "stop_recording", tabId: 123)

gif_creator(
  action: "export",
  tabId: 123,
  filename: "demo-digilab.gif",
  download: true,
  options: {
    showClickIndicators: true,   # Lingkaran orange di klik
    showActionLabels: true,      # Label aksi di tiap frame
    showProgressBar: true        # Progress bar bawah
  }
)
```

**Cocok untuk:** Buat demo/tutorial fitur, dokumentasi cara pakai, bug report visual.

---

## 31. 👥 Agent Teams — Teammates Saling Berkomunikasi (EXPERIMENTAL)

Ini berbeda total dari subagents biasa. Di Agent Teams, setiap teammate adalah **Claude Code session independen** yang bisa **saling kirim pesan langsung** tanpa lewat orchestrator.

```bash
# Aktifkan dulu (disabled by default):
CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1

# Butuh Claude Code v2.1.32+
```

### Perbandingan Subagents vs Agent Teams

| | Subagents (biasa) | Agent Teams |
|---|---|---|
| Komunikasi | Lapor ke orchestrator SAJA | Teammates bisa pesan satu sama lain langsung |
| Koordinasi | Orchestrator manage semua | Shared task list, self-coordination |
| Cocok untuk | Task independen | Task yang saling bergantung kompleks |
| Biaya token | Lebih rendah | Lebih tinggi (setiap teammate = Claude session baru) |

### Fitur Agent Teams:
- **Shared task list** dengan locking untuk cegah race condition
- **Task dependencies** — task B tidak bisa mulai sebelum task A selesai
- **Mailbox system** — kirim pesan ke teammate by name atau broadcast
- **Plan approval gate** — teammate plan dulu, lead approve sebelum implementasi
- **Idle notifications** — teammate auto-notify lead saat selesai
- **Display modes:** `"auto"` / `"in-process"` / `"tmux"` (split pane)

### Keyboard shortcuts (in-process mode):
- `Shift+Down` — cycle antar teammate
- `Ctrl+T` — toggle task list
- `Escape` — interrupt teammate yang sedang jalan

### Hook khusus Agent Teams:
- `TeammateIdle` — teammate mau idle; exit code 2 = suruh terus kerja
- `TaskCreated` — intercept task baru sebelum dibuat
- `TaskCompleted` — intercept task sebelum ditandai selesai

---

## 32. 📱 Channels — Claude di Telegram, Discord, iMessage

Claude bisa menerima dan membalas pesan dari platform chat langsung ke session yang sedang berjalan:

```bash
claude --channels plugin:telegram@claude-plugins-official
claude --channels plugin:discord@claude-plugins-official
claude --channels plugin:imessage@claude-plugins-official   # macOS only
claude --channels plugin:fakechat@claude-plugins-official   # localhost demo
```

### Yang bisa dilakukan:
- **Kirim task ke Claude dari HP** via Telegram/Discord/iMessage
- **Approve/deny tool use dari jauh** — saat Claude minta permission, bisa approve dari HP
- **Terima notifikasi** saat Claude selesai mengerjakan sesuatu

### Security model:
- Setiap channel punya **sender allowlist** — hanya kontak yang diapprove yang bisa perintah Claude
- **Permission relay** — channel bisa forward prompt tool-permission ke HP untuk diapprove

### iMessage specifics:
- Baca `~/Library/Messages/chat.db` langsung (perlu Full Disk Access)
- Reply via AppleScript — trigger macOS Automation prompt pertama kali
- Text ke dirimu sendiri = bypass gate otomatis

### Batasan:
- Butuh login claude.ai (bukan API key)
- Events hanya masuk selama session terbuka
- Claude v2.1.80+

---

## 33. 🖥️ Server Tools — Anthropic yang Eksekusi

Berbeda dari client tools (kamu yang eksekusi), **server tools dijalankan langsung oleh Anthropic** — tidak ada kode yang kamu tulis untuk jalankan:

| Tool | Fungsi | Versi |
|---|---|---|
| `web_search` | Cari web real-time | `web_search_20250305`, `web_search_20260209` |
| `web_fetch` | Fetch URL (dengan JS rendering) | `web_fetch_20250910`, `web_fetch_20260209` |
| `code_execution` | Jalankan Python di sandbox Anthropic | — |
| `tool_search` | Claude cari tool yang relevan dari daftar besar | — |
| `advisor` | Tool advisory/reasoning | — |
| `memory` | Persistent memory dalam session | — |
| `bash` | Jalankan bash (server-side) | — |

### Code Execution (PALING POWERFUL):
```python
# Tidak perlu setup environment — Anthropic sediakan sandboxed Python
# Claude bisa:
# - Install library (numpy, pandas, matplotlib)
# - Generate dan download file (CSV, PNG, PDF)
# - Proses data besar
# - Run script dan return hasilnya

# File yang dihasilkan bisa di-download via Files API
```

### `pause_turn` stop reason:
```python
# Server tools yang lama bisa return pause_turn
# Cara handle:
if response.stop_reason == "pause_turn":
    # Kirim ulang response content as-is untuk lanjut
    messages.append({"role": "assistant", "content": response.content})
    response = client.messages.create(messages=messages, ...)
```

### `tool_search` + `defer_loading`:
```python
# Untuk set tools yang sangat besar — lazy load descriptions
tools = [
    {"name": "tool_search", ...},   # Claude cari tool yang relevan
    {"name": "my_tool", ..., "defer_loading": True},  # Load schema saat dibutuhkan
]
```

---

## 34. 🚀 Agent SDK — Fitur Lanjutan dari Docs Resmi

### fork_session — Branch Tanpa Kehilangan Original
```python
# Buat cabang dari session saat ini
async for msg in query("Coba pendekatan alternatif ini...",
                        options={"forkSession": True}):
    ...
# Original session + history TIDAK berubah
# Fork dapat session ID baru
# CATATAN: fork hanya branch conversation, BUKAN filesystem
# Edit file tetap nyata di kedua branch
```

### background: true — Agent Non-Blocking
```python
agents = {
    "data-processor": AgentDefinition(
        description="Proses dataset besar",
        prompt="...",
        background=True  # ← Jalan di background, tidak block orchestrator
    )
}
# Orchestrator bisa spawn banyak background agents sekaligus
# Berguna untuk task paralel yang lama
```

### effort — Kontrol Kedalaman Reasoning
```python
AgentDefinition(
    effort="low",    # Cepat, hemat token
    # effort="medium"
    # effort="high"
    # effort="xhigh"
    # effort="max"   # Terdalam, paling mahal
)
```

### Workflow Tool — Ratusan Agents di Luar Conversation
```python
# Untuk koordinasi 10-100+ agents
# Orchestration dijalankan sebagai SCRIPT di luar conversation context
# Tidak ada context overflow meski ratusan agents
# TypeScript SDK v0.3.149+
allowedTools=["Workflow"]  # Aktifkan di options
```

### Monitor Tool — React ke Output Script
```python
# Built-in tool (jarang didokumentasikan)
# Watch background script dan react ke SETIAP baris output sebagai event
# Berguna untuk: monitor build process, watch log file, react ke CI/CD output
```

### Managed Agents — Anthropic Hosts Agent & Sandbox
```python
# Anthropic yang jalankan agent dan sandbox — bukan di komputer kamu
# Tersedia di Claude Platform on AWS
# Custom tools: Claude trigger tool → kamu eksekusi → return result via REST
# State disimpan sebagai Anthropic-hosted event log
# Beta header: "managed-agents-2026-04-01"
```

### Agent SDK Credit (NEW — 15 Juni 2026)
- Agent SDK dan `claude -p` di subscription plans sekarang punya **monthly credit terpisah**
- Berbeda dari interactive usage limits
- Pantau di dashboard

### Multi-Cloud Auth
```bash
# Amazon Bedrock
CLAUDE_CODE_USE_BEDROCK=1 + AWS credentials

# Google Vertex AI
CLAUDE_CODE_USE_VERTEX=1 + GCP credentials

# Microsoft Azure AI Foundry
CLAUDE_CODE_USE_FOUNDRY=1 + Azure credentials

# Claude Platform on AWS (bukan Bedrock)
CLAUDE_CODE_USE_ANTHROPIC_AWS=1 + ANTHROPIC_AWS_WORKSPACE_ID
```

---

## 35. 🧠 Extended Thinking — Detail Lengkap dari Docs

### Adaptive vs Manual
```python
# BARU (recommended): Adaptive — Claude putuskan sendiri kapan/seberapa dalam berpikir
thinking={"type": "adaptive"}  # Tidak butuh beta header

# LAMA (deprecated di Opus 4.6+): Manual
thinking={"type": "enabled", "budget_tokens": 10000}  # Deprecated
```

### Effort Levels (Adaptive Mode)
```python
output_config={"effort": "max"}    # Selalu berpikir, tidak ada batas
output_config={"effort": "xhigh"}  # Selalu berpikir dalam (Opus 4.8, 4.7, Fable 5, Mythos 5)
output_config={"effort": "high"}   # Default — hampir selalu berpikir
output_config={"effort": "medium"} # Moderat — skip untuk query sederhana
output_config={"effort": "low"}    # Minimalisir thinking
```

### display Parameter
```python
thinking={"type": "adaptive", "display": "omitted"}
# "summarized" → return ringkasan readable (lebih lambat)
# "omitted"    → field thinking kosong, tapi signature tetap ada (default Opus 4.7+)
#                Lebih cepat untuk streaming (TTFT lebih rendah)
```

### Interleaved Thinking — Berpikir di Antara Tool Calls
```python
# Otomatis aktif dengan adaptive thinking di Opus 4.8, 4.7, 4.6, Sonnet 4.6
# Claude bisa berpikir ANTARA setiap tool call (bukan hanya di awal)
# budget_tokens bisa melebihi max_tokens saat interleaved
# (budget spans seluruh assistant turn, bukan per-request)
```

### Output Token Limit yang Baru
```python
# Opus 4.8 / 4.7 / 4.6 / Sonnet 4.6: hingga 128k output tokens
# Batch API dengan beta header khusus: hingga 300k output tokens
beta_headers=["output-300k-2026-03-24"]
```

### Track Biaya Thinking
```python
response.usage.output_tokens_details.thinking_tokens
# Ditagih untuk FULL thinking tokens (bukan yang di-summarize)
# Saat streaming: breakdown hanya ada di event message_delta terakhir
```

### Task Budgets (Beta) — Opus 4.7+
```python
# Advisory (bukan hard limit) — total token budget untuk satu agentic loop
output_config={
    "task_budget": {
        "type": "tokens",
        "total": 100000,
        "remaining": 100000  # Update setelah setiap turn
    }
}
# Termasuk: thinking + tool calls + tool results + output
# Minimum: 20.000 tokens
# Claude self-regulate kedalaman investigasi sesuai sisa budget
```

---

## 36. 🪝 Hooks — Fitur Lengkap dari Docs

### 5 Tipe Hook Handler (bukan hanya command!)

| Tipe | Cara Kerja |
|---|---|
| `"command"` | Shell command; stdin = JSON; exit code control |
| `"http"` | POST ke URL; request/response JSON |
| `"mcp_tool"` | Panggil tool di MCP server yang sudah terkoneksi |
| `"prompt"` | Kirim prompt ke Claude model untuk yes/no decision |
| `"agent"` | Spawn subagent yang bisa Read/Grep/Glob untuk verify (experimental) |

### Content Rewriting via Hooks (SANGAT POWERFUL)
```json
// PreToolUse → ubah tool arguments sebelum eksekusi
{ "hookSpecificOutput": { "updatedInput": { "new": "args" } } }

// PostToolUse → ubah tool result sebelum dilihat Claude
{ "hookSpecificOutput": { "updatedToolOutput": "modified result" } }

// MessageDisplay → ubah apa yang DITAMPILKAN (transcript tidak berubah!)
{ "hookSpecificOutput": { "displayContent": "versi yang lebih cantik" } }
```

### asyncRewake — Background Hook yang Bangunkan Claude
```json
{
  "type": "command",
  "asyncRewake": true,
  "command": "python monitor.py"
}
// Jalan di background tanpa block
// Jika exit code 2 → Claude dibangunkan, stderr dijadikan system reminder
// Berguna untuk: monitor proses panjang, alert saat kondisi terpenuhi
```

### CLAUDE_ENV_FILE — Persist Env Vars ke Semua Bash
```bash
# Di dalam SessionStart / CwdChanged hook:
echo "export SUPABASE_URL=https://..." >> $CLAUDE_ENV_FILE
echo "export SUPABASE_KEY=..." >> $CLAUDE_ENV_FILE
# → Semua Bash call sesi ini otomatis punya env vars ini
# Gunakan >> (append), bukan > (overwrite) — hook lain juga bisa nulis
```

### reloadSkills di SessionStart
```json
{ "reloadSkills": true }
// Return ini dari SessionStart hook
// Claude re-scan skill directories SETELAH hook selesai
// Install skill baru via hook → langsung tersedia di sesi yang sama
```

### Semua Hook Events (dari docs resmi)
```
SessionStart, Setup, UserPromptSubmit, UserPromptExpansion
PreToolUse, PermissionRequest, PermissionDenied
PostToolUse, PostToolUseFailure, PostToolBatch
Notification, MessageDisplay
SubagentStart, SubagentStop
TaskCreated, TaskCompleted
Stop, StopFailure, TeammateIdle
InstructionsLoaded, ConfigChange, CwdChanged
FileChanged, WorktreeCreate, WorktreeRemove
PreCompact, PostCompact
Elicitation, ElicitationResult
SessionEnd
```

### Elicitation Hooks — Intercept MCP User Input
```json
// Saat MCP server minta input dari user
// "Elicitation" hook bisa intercept dan UBAH field form sebelum dikirim balik
{ "hookSpecificOutput": { "fieldOverrides": { "email": "auto@filled.com" } } }
```

---

## 37. ⚡ Fast Mode — 2.5x Lebih Cepat

```python
# Beta header diperlukan
headers={"anthropic-beta": "fast-mode-2026-02-01"}

# Tambah parameter speed
response = client.messages.create(
    model="claude-opus-4-6",  # atau opus-4-7
    speed="fast",
    ...
)

# Cek hasilnya
response.usage.speed  # → "fast" atau "standard"
```

**Yang perlu diketahui:**
- Hingga **2.5x lebih banyak output tokens per detik**
- Kualitas SAMA — model weights identik
- Harga **6x lebih mahal** dari standar (`$30/MTok` input, `$150/MTok` output)
- Punya **rate limit pool terpisah**
- TIDAK tersedia di Batch API, Priority Tier, atau Claude Platform on AWS
- Ganti fast↔standard = invalidate prompt cache

---

## 38. 🔧 Tool Definition — Parameter Tersembunyi

Parameter yang jarang didokumentasikan:

```python
tools = [{
    "name": "search_karya",
    "description": "...",
    "input_schema": {...},

    # Parameter tersembunyi:
    "strict": True,           # Guarantee output selalu match schema
    "max_uses": 3,            # Batasi tool hanya bisa dipanggil 3x per turn
    "input_examples": [       # Contoh input (jarang diketahui)
        {"query": "sistem informasi", "limit": 10}
    ],
    "defer_loading": True,    # Schema di-load lazy (untuk tool sets besar)

    # Untuk server web tools:
    "allowed_domains": ["supabase.com"],   # Whitelist domain
    "blocked_domains": ["malicious.com"],  # Blacklist domain
    "allowed_callers": ["direct"],         # Disable dynamic filtering → ZDR eligible
}]
```

### Strict Tool Use + Any = Double Guarantee
```python
# Guarantee dua hal sekaligus:
# 1. Claude PASTI memanggil tool (bukan jawab teks biasa)
# 2. Call PASTI sesuai schema exact

tool_choice={"type": "any"}
tools=[{..., "strict": True}]
```

### disable_parallel_tool_use
```python
# Default: Claude bisa panggil banyak tools sekaligus
# Untuk paksa sequential:
client.messages.create(
    ...,
    tool_choice={"type": "auto", "disable_parallel_tool_use": True}
)
```

---

## 39. 📊 Ringkasan: Pilih Tool yang Tepat

| Skenario | Tool/Fitur |
|---|---|
| Banyak file perlu diproses bersamaan | Spawn Agent paralel (Fan-out) |
| Research multi-sumber / multi-URL | deep-research skill / Agent fan-out |
| Refactor besar + test + docs | Agent pipeline sekuensial |
| Eksperimen berisiko (integrasi besar) | Worktree Isolation |
| Kode penting perlu dicek independen | Verification Agent (pipeline 2 tahap) |
| Task kompleks butuh review dulu | Plan Mode (EnterPlanMode) |
| Butuh input pilihan dari user | AskUserQuestion |
| Ajarkan user cara pakai sesuatu | Teach Mode |
| Dashboard data real-time | Artifacts + MCP connector |
| Otomasi harian (PR review, audit) | Scheduled Tasks / Routines |
| Connect ke sistem internal | Buat MCP server sendiri |
| Proses 1000+ dokumen | Batch API (50% diskon) |
| Output harus exact format | Structured Outputs |
| Analisis mendalam | Extended Thinking |
| Hemat biaya konteks panjang | Prompt Caching |
| Cek keamanan kode | security-review skill |
| Generate CLAUDE.md dari codebase baru | init skill |
| Rapikan memory yang sudah menumpuk | consolidate-memory skill |
| Tugas sederhana → hemat biaya | Agent(model: "haiku") |
| Visualisasi / chart / diagram di chat | show_widget (SVG/HTML inline) |
| Widget yang bisa trigger Claude | sendPrompt() di dalam artifact/widget |
| Cari tool/connector baru | ToolSearch + MCP Registry |
| Rekam demo browser jadi GIF | gif_creator |
| Install connector baru untuk task | suggest_plugin_install |
| Intercept API call halaman web | read_network_requests |
| Debug JS error browser | read_console_messages |
| Navigasi DOM tanpa koordinat pixel | read_page + find (accessibility tree) |
| Upload file ke form tanpa dialog | file_upload |
| Transfer data lintas app | write_clipboard / read_clipboard |
| Inspect area kecil di layar | zoom (computer-use) |
| Drag & drop di native app | left_click_drag |
| Kerja di setup multi-monitor | switch_display |
| Banyak aksi komputer sekaligus | computer_batch |
| Beri Claude akses folder komputer | request_cowork_directory |
| Update live artifact yang sudah ada | update_artifact |
| Eksekusi JS langsung di halaman web | javascript_tool (akses runtime penuh) |
| Buka & kelola banyak tab sekaligus | tabs_create_mcp + tabs_close_mcp |
| Kontrol beberapa Chrome berbeda | list_connected_browsers + select_browser |
| Isi dropdown/checkbox form | form_input (lebih reliable dari type) |
| Upload screenshot ke web form | upload_image |
| Buka context menu (klik kanan) | right_click |
| Multi-select dengan Shift/Ctrl | hold_key |
| Drag kompleks / lasso select | left_mouse_down + left_mouse_up |
| Guided tour banyak langkah sekaligus | teach_batch |
| Hapus file (perlu izin eksplisit) | allow_cowork_file_delete |
| Teammates saling pesan langsung | Agent Teams (experimental) |
| Claude bisa dikirimi pesan dari HP | Channels (Telegram/Discord/iMessage) |
| Run Python tanpa setup environment | Server tool: code_execution |
| Claude decide sendiri kapan berpikir | Adaptive thinking (`type: "adaptive"`) |
| Berpikir di antara setiap tool call | Interleaved thinking (otomatis) |
| Output hingga 300k tokens | Batch API + `output-300k-2026-03-24` |
| Budget token untuk satu agentic loop | Task budgets (`output_config.task_budget`) |
| Output 2.5x lebih cepat | Fast mode (`speed: "fast"`) |
| Hook ubah tool args/results/display | Content rewriting hooks |
| Hook background yang bangunkan Claude | `asyncRewake` hook |
| Persist env vars ke semua Bash | `CLAUDE_ENV_FILE` di SessionStart hook |
| Anthropic host agent & sandbox | Managed Agents (REST API) |
| Koordinasi 100+ agents | Workflow tool (TypeScript SDK) |
| Branch session tanpa risak original | `fork_session: true` |
| Guarantee tool call + schema exact | `strict: true` + `tool_choice: "any"` |

---

## 40. 🆕 Model Terbaru (Fable 5, Mythos 5) + Model Matrix

### Model Aktif (per Juni 2026)

| Model | API ID | Context | Max Output | Input | Output | Thinking |
|---|---|---|---|---|---|---|
| Claude Opus 4.8 | `claude-opus-4-8` | 1M | 128k | $5/MTok | $25/MTok | Adaptive |
| Claude Sonnet 4.6 | `claude-sonnet-4-6` | 1M | 64k | $3/MTok | $15/MTok | Manual/Adaptive |
| Claude Haiku 4.5 | `claude-haiku-4-5-20251001` | 200k | 64k | $1/MTok | $5/MTok | Manual |
| **Claude Fable 5** | `claude-fable-5` | 1M | 128k | $10/MTok | $50/MTok | **Adaptive always on** |
| **Claude Mythos 5** | `claude-mythos-5` | 1M | 128k | $10/MTok | $50/MTok | Adaptive (invitation only) |

### Fable 5 — Hal Penting
- **Adaptive thinking selalu aktif** — tidak bisa di-disable. Manual `budget_tokens` → 400 error
- **Tokenizer baru** — ~30% lebih banyak token vs Opus 4.7. Hitung ulang estimasi biaya!
- **Min prompt caching: 512 token** (vs 1024 di Opus 4.8)
- GA di Claude API, Bedrock, Vertex AI, Foundry per Juni 9, 2026

### Mythos 5 — Hal Penting
- Invitation only via **Project Glasswing** — tidak tersedia self-serve
- **Mythos Preview** — hanya untuk defensive cybersecurity
- `display: "omitted"` adalah default (thinking tidak ditampilkan)

### Penting: Model ID Versioning (mulai 4.6+)
```
claude-sonnet-4-6   → PINNED snapshot (bukan evergreen pointer)
claude-sonnet-3     → EVERGREEN pointer (resolve ke dated ID terbaru)
```
Pre-4.6 aliases (tanpa tanggal) = evergreen. Mulai 4.6 = pinned. Bedakan keduanya!

### Models API — Cek Kapabilitas Programatik
```python
# Query limits + capabilities per model
client.models.list()
# Returns: max_input_tokens, max_tokens, capabilities per model
```

---

## 41. 🛡️ Sandbox Mode — Isolasi Bash & Network

Fitur sandboxing yang **hampir tidak pernah didokumentasikan** — isolasi filesystem dan network untuk Bash tool:

```json
// .claude/settings.json atau settings.local.json
{
  "sandbox": {
    "enabled": true,
    "failIfUnavailable": true,

    "filesystem": {
      "allowWrite": ["./", "~/Downloads"],
      "denyWrite": ["/etc", "~/.ssh"],
      "denyRead": ["~/.aws", "~/.env"]
    },

    "network": {
      "allowedDomains": ["supabase.com", "api.github.com"],
      "deniedDomains": ["*.evil.com"],
      "allowLocalBinding": true
    }
  }
}
```

### Yang penting:
- **Hanya macOS, Linux, WSL2** — tidak ada di Windows native
- `failIfUnavailable: true` — exit jika sandbox tidak bisa start (managed deployment)
- `autoAllowBashIfSandboxed: true` — auto-approve bash saat sandboxed (default)
- **`excludedCommands`** — daftar command yang escape dari sandbox
- Sandbox path: `./` = project root (untuk project settings), `~/` = home-relative
- `sandbox.bwrapPath` / `sandbox.socatPath` — managed only (Linux/WSL2, custom binary path)
- `enableWeakerNetworkIsolation` — diperlukan untuk Go tools (`gh`, `gcloud`, `terraform`) dengan MITM proxy + custom CA

### Use case DIGILAB:
```json
// Cegah Claude hapus file penting saat development
{
  "sandbox": {
    "enabled": true,
    "filesystem": {
      "denyWrite": ["docs/index.html", "docs/mahasiswa.html"],
      "allowWrite": ["./"]
    }
  }
}
```

---

## 42. ⌨️ Slash Commands Built-in (Bukan Skills)

Built-in commands yang selalu ada di Claude Code — bukan dari skills:

| Command | Fungsi |
|---|---|
| `/init` | Generate CLAUDE.md dari codebase |
| `/model` | Ganti model mid-session |
| `/effort` | Set effort level (`/effort high`, `/effort ultracode`) |
| `/rewind` | **Revert file ke state sebelum edit** (perlu `fileCheckpointingEnabled: true`) |
| `/run` | Launch app dan drive untuk lihat perubahan (v2.1.145+) |
| `/verify` | Build dan confirm perubahan tanpa fallback ke tests (v2.1.145+) |
| `/run-skill-generator` | Rekam resep build/launch sebagai per-project skill (v2.1.145+) |
| `/rename` | Set judul session (sama dengan `sessionTitle` di SessionStart hook) |
| `/compact` | Manual context compaction |
| `/clear` | Clear context window |
| `/hooks` | Lihat semua hooks aktif dan sourcenya |
| `/permissions` | Review permission rules |
| `/skills` | Manage visibility skills (`Space` cycle state, `Enter` save) |
| `/fast` | Toggle fast mode on/off (hanya untuk session ini jika `fastModePerSessionOptIn`) |

### `/rewind` — Killer Feature
```bash
# Enable di settings dulu:
# "fileCheckpointingEnabled": true  ← default sudah true

# Penggunaan:
# 1. Claude mengedit file
# 2. Hasilnya tidak bagus
# 3. /rewind  → pilih checkpoint untuk revert
# File dikembalikan persis ke state sebelum edit itu
```

### `/effort ultracode`
```
/effort ultracode  → mode di atas "max"
                     Wajib koneksi Claude.ai
                     Rate limit berbeda
                     Untuk task yang BENAR-BENAR kompleks
```

---

## 43. ⚙️ Settings Penting yang Jarang Diketahui

### Visual & UX
```json
{
  "editorMode": "vim",           // ← VIM KEYBINDINGS di input prompt!
  "tui": "fullscreen",           // alt-screen, flicker-free (vs "default" main-screen)
  "theme": "dark",               // "auto"/"dark"/"light"/"dark-daltonized"/"custom:slug"
  "prefersReducedMotion": true,  // disable animasi spinner/shimmer
  "viewMode": "verbose",         // default view transcript on startup
  "awaySummaryEnabled": true,    // ringkasan satu baris saat kembali setelah pergi
  "showThinkingSummaries": true, // tampilkan extended thinking summaries
  "showTurnDuration": true       // durasi setiap turn (default: true)
}
```

### Custom Status Line
```json
{
  "statusLine": "node ~/.claude/status.js"
  // Script ini jalan setiap update, output = teks status line kustom
  // Bisa menampilkan: git branch, todo count, token usage, jam, dll
}
```

### Fallback Model Chain
```json
{
  "fallbackModel": ["claude-sonnet-4-6", "claude-haiku-4-5-20251001", "default"]
  // Jika model utama tidak tersedia → coba daftar ini berurutan
  // "default" = model default sistem
  // Max 3 model di chain
  // TIDAK merge dari settings berbeda — file dengan prioritas tertinggi menang semua
}
```

### Persistent Env Vars
```json
{
  "env": {
    "SUPABASE_URL": "https://xxx.supabase.co",
    "NODE_ENV": "development"
  }
  // Aktif di SETIAP session dan subprocess
  // Berbeda dari CLAUDE_ENV_FILE (yang per-hook-event)
}
```

### Worktree Config Lanjutan
```json
{
  "worktree": {
    "baseRef": "head",                          // "fresh" (dari remote) vs "head" (dari local HEAD)
    "symlinkDirectories": ["node_modules"],     // symlink dari main repo → hemat disk
    "sparsePaths": ["src/", "package.json"],    // sparse-checkout — hanya checkout path ini
    "bgIsolation": "worktree"                   // "worktree" (default) atau "none"
  }
}
```

### File Suggestion Custom
```json
{
  "fileSuggestion": "fzf --filter"
  // Command untuk @ file autocomplete
  // Terima {"query": "..."} via stdin → output newline-separated paths (max 15)
  // Bisa pakai: fzf, fd, custom script
}
```

### Language Preference
```json
{
  "language": "indonesian"
  // Claude menjawab dalam bahasa ini secara default
  // Juga mengatur bahasa voice dictation
}
```

### Voice Dictation
```json
{
  "voice": {
    "enabled": true,
    "mode": "hold",        // "hold" = tahan tombol saat bicara, "tap" = klik sekali
    "autoSubmit": true     // auto-kirim setelah release
  }
  // Perlu login claude.ai
}
```

---

## 44. 💾 Prompt Caching — Detail & Pitfalls

### Pricing Table (per MTok)

| Model | Base Input | Cache Write 5m | Cache Write 1h | Cache Read |
|---|---|---|---|---|
| Fable 5 | $10 | $12.50 | $20 | $1 |
| Opus 4.8 | $5 | $6.25 | $10 | $0.50 |
| Sonnet 4.6 | $3 | $3.75 | $6 | $0.30 |
| Haiku 4.5 | $1 | $1.25 | $2 | $0.10 |

**1-hour TTL** = 2x base input. Tersedia termasuk di Bedrock dan Vertex AI (5-min tidak).

### Min Token per Model untuk Cache
| Model | Min Token |
|---|---|
| Fable 5, Mythos 5 | 512 |
| Opus 4.8, Sonnet 4.6, Sonnet 4.5 | 1,024 |
| Opus 4.7, Mythos Preview | 2,048 |
| Opus 4.6, Haiku 4.5 | 4,096 |

Di bawah minimum = silently NOT cached. Cek dengan `cache_creation_input_tokens == 0`.

### Pre-warming Cache (tanpa generate output)
```python
# Baru: gunakan max_tokens: 0
client.messages.create(max_tokens=0, ...)
# → menulis cache, return content:[], stop_reason:"max_tokens"
# → hanya tagih cache write tokens (tidak ada output)
# TIDAK bisa: dengan stream:true, extended thinking, structured outputs, forced tool_choice
```

### Lookback Window & Breakpoints
- Max **4 explicit breakpoints** per request (auto caching pakai 1 slot)
- **Lookback 20 blocks** — jika breakpoint bergerak >20 blok dari last write → tambah breakpoint kedua
- **Cache diagnostics API** (beta) — bandingkan 2 request dan temukan persis di mana prefix diverge

### Pitfalls yang Sering Merusak Cache
```
❌ Taruh breakpoint pada blok yang selalu berubah (timestamp, user message)
❌ JSON key ordering tidak stabil (Go/Swift randomize → selalu miss)
❌ Ganti tool_choice → invalidate message cache
❌ Enable/disable web search atau fast mode → invalidate system + messages
❌ Mixing TTL: 1h harus sebelum 5m di prompt
❌ Combining automatic + explicit caching dengan TTL berbeda → 400 error
```

### Workspace-level vs Org-level Isolation
```
Per Feb 2026:
- Claude API, Claude Platform on AWS, Foundry → workspace-level (API key yang sama = cache shared)
- Bedrock, Vertex AI → masih org-level isolation
```

---

## 45. 🔄 Streaming Events & Token Counting

### Streaming — Event yang Perlu Diketahui

```python
# Fine-grained tool parameter streaming (per-tool):
tools = [{
    "name": "search",
    "eager_input_streaming": True,  # ← stream parameter values tanpa buffering server
    ...
}]
```

**Error recovery penting (berbeda per versi model):**
```python
# Claude 4.5 dan lebih lama:
# Capture partial response → tambah sebagai assistant message (partial) → lanjut

# Claude 4.6 dan lebih baru:
# Capture partial → add user message: "continue from where you left off" → resume
# Tool use blocks dan thinking blocks tidak bisa partial recovery
```

**`fallback` content block** — muncul saat server-side fallback terjadi:
```python
# content_block_start + content_block_stop tanpa delta
# Handle gracefully — jangan error jika lihat ini
```

### Token Counting API — GRATIS

```python
# Hitung token SEBELUM kirim request (tidak ditagih!)
response = client.messages.count_tokens(
    model="claude-sonnet-4-6",
    system="...",
    tools=[...],
    messages=[...]
)
print(response.input_tokens)  # estimasi — aktual mungkin sedikit beda

# Rate limits (terpisah dari Messages API):
# Tier 1: 100 RPM | Tier 2: 2000 RPM | Tier 3: 4000 RPM | Tier 4: 8000 RPM
```

⚠️ **Fable 5/Mythos 5 punya tokenizer baru** — ~30% lebih banyak token dari Opus 4.7. Hitung ulang dengan `model: "claude-fable-5"` secara terpisah!

---

## 46. 🎛️ Skill Advanced — Fitur yang Jarang Diketahui

### Dynamic Shell Injection di SKILL.md
```markdown
!`git branch --show-current`

Kamu sedang di branch: (output command di atas masuk sini sebelum Claude baca)
```
- Prefix `!` + backtick = jalankan shell, output inject ke skill content
- Multi-line: fenced block `` ```! ``
- Diproses SEBELUM Claude baca skill — bukan runtime execution
- Disable dengan `disableSkillShellExecution: true`

### context: fork — Run Skill sebagai Isolated Subagent
```yaml
---
context: fork
agent: Explore       # atau Plan, general-purpose, custom
---
Skill content ini menjadi prompt untuk subagent yang terisolasi.
Tidak ada akses ke conversation history.
```

### Skill Visibility Control
```json
// settings.json
{
  "skillOverrides": {
    "deep-research": "on",           // default
    "internal-comms": "name-only",   // Claude tahu namanya tapi bukan deskripsinya
    "secret-skill": "user-invocable-only",  // hanya user bisa invoke, hidden dari Claude
    "deprecated": "off"              // completely hidden
  }
}
```

### Variabel di Skill
```
$ARGUMENTS          → semua args setelah /skill-name
$ARGUMENTS[0]       → arg pertama
$1                  → shorthand untuk $ARGUMENTS[0]
${CLAUDE_SKILL_DIR} → directory di mana SKILL.md berada
${CLAUDE_SESSION_ID}→ session ID saat ini
${CLAUDE_EFFORT}    → effort level saat ini
```

### Bundled Skills Baru (v2.1.145+)
- `/run` — launch app, drive perubahan, lihat hasilnya live
- `/verify` — build dan konfirmasi perubahan (tanpa fallback ke tests/type-check)
- `/run-skill-generator` — rekam build recipe sebagai per-project skill otomatis
- `/batch` — proses banyak item sekaligus
- `/loop` — ulangi task dengan variasi
- `/debug` — debug mode
- `/code-review` — review code
- `/claude-api` — akses Claude API dari dalam Claude

---

## 47. 🌐 Files API — Detail & Limitasi

```python
# Beta header diperlukan
headers = {"anthropic-beta": "files-api-2025-04-14"}

# Upload file
with open("laporan.pdf", "rb") as f:
    file = client.beta.files.upload(("laporan.pdf", f, "application/pdf"))

# Pakai di messages
messages = [{
    "role": "user",
    "content": [{
        "type": "document",
        "source": {"type": "file", "file_id": file.id},
        "title": "Laporan DIGILAB",
        "citations": {"enabled": True}  # auto-cite dari dokumen
    }]
}]
```

### Limitasi Penting (banyak yang tidak diketahui)
| | |
|---|---|
| **TIDAK tersedia di** | Amazon Bedrock, Vertex AI |
| **TIDAK ZDR** | File tersimpan sampai dihapus manual |
| **Scope** | Workspace-level (semua API key di workspace bisa akses) |
| **Download** | Hanya untuk output Code Execution / Skills — file upload user TIDAK bisa download |
| **Format didukung** | PDF, plain text, JPEG, PNG, GIF, WEBP |
| **Format TIDAK didukung** | CSV, .md, .docx, .xlsx (harus convert ke plain text dulu) |
| **Max size** | 500 MB per file |
| **Total storage** | 500 GB per org |
| **Rate limit** | ~100 RPM (beta) |

**Dataset untuk Code Execution** — pakai `container_upload` block:
```python
{"type": "container_upload", "source": {"type": "file", "file_id": dataset_file.id}}
```

---

## 48. 📊 Analisis Data & Python untuk Trading (IHSG)

Claude bisa jalankan Python langsung di bash sandbox — tidak perlu setup lokal.

### Install Library
```bash
pip install pandas numpy yfinance ta pandas-ta vectorbt --break-system-packages
```

### Ambil Data Saham IHSG
```python
import yfinance as yf

# Format ticker IDX: tambah ".JK" di belakang
df = yf.download("BBCA.JK", start="2024-01-01", end="2025-12-31", auto_adjust=True)
print(df.tail())

# Multi-ticker sekaligus
tickers = ["BBCA.JK", "TLKM.JK", "ASII.JK", "GOTO.JK"]
data = yf.download(tickers, period="1y", group_by="ticker")
```

### Hitung Indikator Teknikal
```python
import pandas_ta as ta

df = yf.download("BBRI.JK", period="6mo", auto_adjust=True)

# RSI
df["RSI"] = ta.rsi(df["Close"], length=14)

# MACD
macd = ta.macd(df["Close"])
df = df.join(macd)

# Bollinger Bands
bb = ta.bbands(df["Close"], length=20)
df = df.join(bb)

# EMA
df["EMA20"] = ta.ema(df["Close"], length=20)
df["EMA50"] = ta.ema(df["Close"], length=50)

print(df[["Close","RSI","MACD_12_26_9","BBU_20_2.0","BBL_20_2.0"]].tail(10))
```

### Backtesting Sederhana (vectorbt)
```python
import vectorbt as vbt

df = yf.download("BMRI.JK", period="2y", auto_adjust=True)
price = df["Close"]

# Strategi sederhana: beli saat EMA20 > EMA50, jual sebaliknya
fast = price.ewm(span=20).mean()
slow = price.ewm(span=50).mean()

entries = fast > slow
exits   = fast < slow

portfolio = vbt.Portfolio.from_signals(price, entries, exits, init_cash=10_000_000)
print(portfolio.stats())
```

### Cara Aktifkan di Claude
```
"Ambil data BBCA.JK 2 tahun terakhir, hitung RSI dan MACD, tampilkan sinyal beli/jual"

"Bandingkan return IHSG composite (^JKSE) vs BBRI, TLKM, ASII selama 1 tahun — buat chart"

"Backtest strategi EMA crossover di GOTO.JK, tunjukkan statistik win rate dan drawdown"

"Cari saham LQ45 yang RSI-nya di bawah 30 sekarang (oversold)"
```

### Screener Sederhana
```python
import yfinance as yf, pandas as pd

LQ45 = ["BBCA.JK","BBRI.JK","TLKM.JK","ASII.JK","BMRI.JK",
        "UNVR.JK","GOTO.JK","BYAN.JK","TPIA.JK","ICBP.JK"]

hasil = []
for t in LQ45:
    try:
        df = yf.download(t, period="3mo", auto_adjust=True, progress=False)
        import pandas_ta as ta
        rsi = ta.rsi(df["Close"]).iloc[-1]
        harga = df["Close"].iloc[-1]
        hasil.append({"ticker": t, "harga": round(harga,0), "rsi": round(rsi,1)})
    except: pass

df_hasil = pd.DataFrame(hasil)
print(df_hasil[df_hasil["rsi"] < 40].sort_values("rsi"))  # oversold candidates
```

---

## 49. 📈 Visualisasi & Dashboard Trading

### Candlestick Chart Interaktif (show_widget)
Render langsung di chat — tidak perlu file terpisah:
```
"Tampilkan candlestick chart BBCA.JK 3 bulan terakhir dengan volume di bawah,
 langsung di chat sebagai widget interaktif"
```

Claude akan:
1. Download data via Python/yfinance
2. Buat HTML dengan Chart.js atau Plotly embed
3. Render di chat via `show_widget`

### Portofolio Tracker (Live Artifact)
Dashboard yang bisa dibuka ulang, data selalu fresh:
```
"Buat live artifact portofolio tracker — input: daftar saham + lot + harga beli.
 Setiap dibuka, ambil harga terkini dari yfinance dan hitung P/L otomatis."
```

Artifact menyimpan data di `localStorage`, refresh harga via API call di dalam HTML.

### Chart Perbandingan Multi-Emiten
```
"Buat chart line normalized (base 100) untuk membandingkan BBCA, BBRI, BMRI, BNI
 dalam 1 tahun terakhir — tampilkan sebagai widget di chat"
```

### Heatmap Sektor IHSG
```
"Buat heatmap performa hari ini berdasarkan sektor IDX — warna merah/hijau sesuai % change"
```

### Cara Aktifkan
| Task | Perintah |
|---|---|
| Candlestick chart | "Buat candlestick chart [TICKER] [PERIODE] langsung di sini" |
| Portfolio tracker | "Buat live artifact portofolio tracker untuk saham-saham ini: ..." |
| Perbandingan emiten | "Bandingkan performance [A] vs [B] vs [C] dalam [PERIODE], chart di chat" |
| Screener visual | "Tampilkan screener IHSG dengan heatmap RSI semua saham LQ45" |
| Export ke Excel | "Buat file Excel dari data saham ini dengan chart otomatis" |

---

## 50. 🗄️ Fetch & Otomasi Data Pasar Indonesia

### Sumber Data yang Bisa Diakses Claude

| Sumber | Cara Akses | Kelebihan |
|---|---|---|
| **Yahoo Finance** | `yfinance` Python library | Gratis, historical + realtime (15 menit delay), semua IDX |
| **IDX (BEI) website** | Scraping + Chrome MCP | Data resmi, laporan keuangan PDF |
| **CNBC Indonesia / Bisnis.com** | `web_fetch` | Berita dan analisis |
| **Stockbit / RTI Business** | Chrome MCP (login dulu) | Data fundamental, konsensus analis |
| **FRED / Bank Indonesia** | `web_fetch` API publik | Data makro: inflasi, kurs, BI Rate |

### Fetch Berita & Sentimen
```
"Cari berita terbaru BBRI.JK dari 3 hari terakhir dan rangkum sentimen positif/negatif"
```
Claude akan: web_search → fetch artikel → summarize dengan sentimen label.

### Scheduled Task — Screener Harian
```
"Setiap hari kerja jam 09.00, jalankan screener RSI oversold untuk LQ45
 dan kirim ringkasannya ke sesi baru"
```
Menggunakan `mcp__scheduled-tasks__create_scheduled_task` dengan cron `0 9 * * 1-5`.

### Download Laporan Keuangan dari IDX
```
"Buka https://www.idx.co.id, cari laporan keuangan BBCA untuk Q1 2025, download PDF-nya"
```
Claude: Chrome MCP → navigate IDX → find link → download → read PDF langsung.

### Fetch BI Rate & Makro Data
```python
# BI Rate dari Bank Indonesia (public JSON endpoint)
import requests
resp = requests.get("https://www.bi.go.id/id/statistik/informasi-kurs/transaksi-bi/Default.aspx")
# atau pakai FRED API untuk data historis BI Rate
```

### Data Historis IHSG Composite
```python
import yfinance as yf
ihsg = yf.download("^JKSE", period="5y", auto_adjust=True)
print(ihsg[["Close","Volume"]].tail())
```

---

## 51. 🔍 Web Performance & Audit (untuk Web Developer)

### Lighthouse-style Audit via Node.js
```bash
# Install lighthouse CLI
npm install -g lighthouse

# Jalankan audit
lighthouse https://natasyaadel.github.io/RPD/ \
  --output json --output-path ./audit.json \
  --chrome-flags="--headless"
```
```
"Jalankan Lighthouse audit untuk URL ini dan buat laporan PDF dengan rekomendasi fix"
```

### Core Web Vitals via Chrome MCP
Claude bisa buka browser + ukur langsung:
```
"Buka https://jiakbar.github.io/repositoryPD/ di browser,
 jalankan Performance audit, dan baca hasilnya"
```
Claude: `navigate` → `javascript_tool` menjalankan `performance.timing` / `PerformanceObserver`
→ baca LCP, FID, CLS, TTFB → rangkum dan saran fix.

### Cara Aktifkan
| Audit | Perintah |
|---|---|
| Performa halaman | "Audit performa [URL] dan beri rekomendasi" |
| SEO check | "Cek SEO halaman ini: meta tags, heading hierarchy, canonical" |
| Aksesibilitas | "Audit aksesibilitas [URL] — cari ARIA issues, contrast ratio, missing alt" |
| Mobile responsiveness | "Screenshot [URL] di berbagai ukuran layar dan report masalah" |
| Broken links | "Cek semua link di halaman ini, lapor yang 404" |
| Bundle size | "Analisis ukuran JS/CSS yang di-load halaman ini" |

### Aksesibilitas Check (via JavaScript)
```
"Jalankan audit aksesibilitas di halaman ini:
 - Cari semua <img> tanpa alt text
 - Cek contrast ratio heading vs background
 - Cari button tanpa label yang readable"
```
Claude akan gunakan `javascript_tool` untuk query DOM dan `read_page` (accessibility tree).

### SEO Audit Cepat
```
"Buka [URL] dan periksa:
 - Ada <title> dan <meta description>?
 - Heading hierarchy benar (1 h1, lalu h2, h3)?
 - Semua gambar punya alt text?
 - Ada canonical URL?
 - Load time di bawah 3 detik?"
```

### Cek Kompatibilitas Browser
```
"Cek apakah CSS property [aspect-ratio / container queries / :has()] ini sudah
 supported di semua browser target — cari di MDN dan caniuse"
```

---

## 52. 📋 Claude untuk Riset Fundamental & Analisis Non-Coding

Kemampuan ini tidak butuh coding sama sekali — murni analisis dokumen dan data.

### Upload & Analisis Laporan Keuangan
```
"Ini laporan keuangan tahunan BBCA 2024 [lampirkan PDF].
 Rangkum: revenue growth, NPL, NIM, ROE, CAR — bandingkan dengan tahun lalu"
```
Claude bisa baca PDF langsung — ekstrak tabel keuangan, hitung rasio, buat ringkasan eksekutif.

### Analisis Prospektus IPO
```
"Analisis prospektus IPO ini [lampirkan PDF]:
 - Seberapa bagus fundamentalnya?
 - Valuasi wajar tidak? (bandingkan dengan peer)
 - Apa risiko utamanya?
 - Rekomendasimu untuk investor ritel?"
```

### Bandingkan Beberapa Emiten Sekaligus
```
"Bandingkan BBCA, BBRI, BMRI, BNI dari sisi:
 - P/E ratio terkini
 - Dividend yield 3 tahun terakhir
 - NPL dan CAR
 Buat tabel perbandingan dan simpulkan mana yang paling menarik"
```
Claude akan web_search untuk data terkini dari setiap emiten.

### Sentimen Berita Harian
```
"Cari berita 3 hari terakhir tentang emiten-emiten ini: GOTO, TLKM, BYAN.
 Buat ringkasan sentimen: positif / negatif / netral per emiten"
```

### DCF Valuation Sederhana
```
"Hitung valuasi DCF sederhana untuk BBRI dengan asumsi:
 - EPS growth 12% per tahun selama 5 tahun
 - Terminal growth rate 4%
 - Discount rate (WACC) 10%
 Bandingkan dengan harga saat ini"
```
Claude bisa hitung Python di bash atau langsung secara matematis.

### Macro Analysis
```
"Analisis dampak kenaikan BI Rate terhadap sektor perbankan dan properti IHSG.
 Cari data historis: kenaikan BI Rate tahun 2022-2023 bagaimana dampaknya ke saham bank?"
```

### Buat Watchlist Report
```
"Buat laporan mingguan untuk watchlist saya: [BBCA, TLKM, ASII, GOTO, BYAN].
 Per saham: harga sekarang, % change 1 minggu, RSI, event/news penting.
 Format sebagai file Word yang rapi."
```
Claude: yfinance data + web_search berita + docx skill → laporan siap cetak.

### Jadwalkan Setiap Minggu
```
"Setiap Jumat jam 16.30 (setelah market tutup), buat laporan watchlist mingguan
 untuk saham-saham ini dan simpan ke folder DIGILAB-Repository/trading-reports/"
```

---

## 53. 👁️ Vision & Image Understanding

Claude bisa baca, analisis, dan konversi gambar secara langsung — tidak perlu OCR library terpisah.

### Format & Limits (verified dari docs resmi)
| Parameter | Nilai |
|---|---|
| **Format didukung** | JPEG, PNG, GIF (frame pertama saja), WebP |
| **Max ukuran file** | 10 MB (API), 5 MB (Bedrock/Vertex), 10 MB (claude.ai) |
| **Max dimensi** | 8000×8000 px |
| **Max gambar/request** | 100 (model 200k token) / 600 (model lain) / 20 (claude.ai) |
| **Cara input** | base64, URL langsung, Files API `file_id` |
| **Visual tokens** | ~1568 tokens/gambar (Sonnet) · ~4784 tokens/gambar (Opus 4.8+, Fable 5) |

### Task yang Bisa Dilakukan

**Screenshot → HTML/CSS/React:**
```
"Ini screenshot desain [lampirkan gambar]. Konversi ke HTML+CSS yang responsive —
 gunakan warna dan layout persis sama"
```

**Mockup/Wireframe → Code:**
```
"Ini wireframe yang saya gambar tangan [lampirkan foto]. Buat HTML lengkapnya,
 isi dengan placeholder konten yang masuk akal"
```

**Baca Diagram:**
```
"Ini ERD dari sistem lama [lampirkan screenshot]. Analisis strukturnya dan buat
 CREATE TABLE SQL yang equivalent"

"Ini architecture diagram [lampirkan gambar]. Jelaskan alur data dan identifikasi
 potensi bottleneck"
```

**OCR & Ekstrak Teks:**
```
"Baca semua teks dari screenshot ini dan buat Markdown yang terstruktur"

"Ini foto kwitansi [lampirkan]. Ekstrak: tanggal, nominal, nama merchant — format JSON"
```

**Analisis UI & Bug Visual:**
```
"Bandingkan dua screenshot ini: [sebelum] dan [sesudah]. Apa yang berubah?
 Ada yang terlihat rusak secara visual?"

"Ini screenshot error di production [lampirkan]. Baca error message dan
 sarankan fix-nya"
```

**Bounding Box (koordinat elemen):**
```
"Di gambar ini, beri koordinat (x,y,w,h) dari setiap tombol dan form field —
 saya butuh untuk automation script"
```

### Limitasi Penting
- **Tidak bisa identify orang** by name dari foto
- **Hitung perkiraan** — tidak 100% akurat untuk jumlah objek banyak
- **Gambar <200px** — akurasi menurun signifikan
- **GIF animasi** — hanya frame pertama yang dibaca

---

## 54. 🏗️ Project Scaffolding & Architecture

Claude bisa bantu mulai project dari nol — dari pemilihan tech stack sampai generate seluruh struktur folder.

### Generate Project dari Nol
```
"Saya mau buat SaaS untuk [deskripsi]. Stack: Next.js 15, TypeScript, Supabase, Tailwind.
 Generate struktur folder lengkap, package.json, tsconfig, .env.example, dan
 CLAUDE.md yang tepat untuk project ini"
```

```
"Buat starter Express.js + TypeScript dengan: JWT auth, Prisma ORM, PostgreSQL,
 swagger-jsdoc, helmet, morgan, rate-limiting. Include docker-compose.yml"
```

### Tech Stack Recommendation
```
"Saya mau buat [deskripsi aplikasi]. Budget: minimal. Team: 1 developer.
 Rekomendasikan tech stack terbaik dengan alasan — bandingkan 3 opsi"
```

### Architecture Planning (Plan Mode)
```
"Buat rencana arsitektur dulu, jangan langsung code. Saya mau review sebelum eksekusi.
 Task: buat sistem multi-tenant SaaS dengan role-based access control"
```
Claude masuk **Plan Mode** — output: diagram, daftar komponen, keputusan teknis, trade-off.

### ERD Generator
```
"Buat ERD untuk sistem e-commerce dengan: users, products, categories, orders,
 order_items, reviews, payments. Tampilkan sebagai diagram Mermaid"
```
Output: Mermaid ERD langsung di chat, plus CREATE TABLE SQL.

### OpenAPI / Swagger Spec
```
"Generate OpenAPI 3.0 spec untuk REST API ini berdasarkan route files di folder backend/ —
 include request/response schema, auth requirement, contoh value"
```

### System Design Diagram
```
"Gambarkan arsitektur sistem DIGILAB:
 - Frontend (GitHub Pages) → Backend (Express) → Supabase
 - Include: Auth flow, file upload flow, admin verifikasi flow
 Format: Mermaid flowchart"
```

### Monorepo Setup
```
"Setup monorepo dengan pnpm workspaces:
 - apps/web (Next.js)
 - apps/api (Express)
 - packages/shared (types, utils)
 - packages/ui (komponen)
 Buat turbo.json, pnpm-workspace.yaml, dan struktur folder"
```

---

## 55. 📝 Documentation Automation

### Generate JSDoc / TSDoc dari Code
```
"Baca semua file di src/utils/ dan tambahkan JSDoc ke setiap fungsi yang belum punya —
 include @param, @returns, @example, @throws"
```

### Auto-Generate README.md
```
"Scan seluruh codebase ini dan buat README.md profesional yang mencakup:
 overview, tech stack, cara install & run, struktur folder, API endpoints,
 environment variables, kontribusi, lisensi"
```

### API Documentation (Swagger UI)
```
"Baca semua file di backend/routes/ dan generate Swagger UI setup lengkap:
 swagger.json + endpoint /api-docs yang serve Swagger UI"
```

### Changelog Otomatis dari Git
```
"Jalankan git log dari tag v1.0.0 sampai HEAD dan generate CHANGELOG.md
 yang terstruktur: Breaking Changes, Features, Bug Fixes — format Keep a Changelog"
```

### Architecture Decision Records (ADR)
```
"Buat ADR (Architecture Decision Record) untuk keputusan ini:
 Memilih Supabase sebagai database vs membangun PostgreSQL sendiri.
 Format standard ADR: Status, Context, Decision, Consequences"
```

### Inline Code Comments
```
"Baca file api-service.js dan tambahkan komentar inline yang menjelaskan
 MENGAPA (bukan APA) — fokus pada logic yang tidak obvious"
```

### Storybook Stories Generation
```
"Baca komponen Button, Input, Card di src/components/ dan generate
 Storybook stories untuk masing-masing dengan semua variant/props"
```

---

## 56. 🧪 Testing & QA Automation

### Generate Unit Tests (cocok framework yang sudah ada)
```
"Baca src/utils/formatDate.js dan generate unit test lengkap dengan Jest.
 Cover: happy path, edge cases (null, undefined, invalid date), boundary values"
```
Claude akan: baca file, identifikasi semua code path, generate test cases matching style project.

### Temukan Fungsi yang Belum Ada Testnya
```
"Scan semua file di src/ dan identifikasi fungsi yang belum punya test.
 Prioritaskan yang paling kritis (auth, payment, data transform)"
```

### Generate E2E Tests (Playwright)
```
"Buat Playwright E2E test untuk flow: user login → upload karya → submit → lihat status.
 Gunakan URL: http://localhost:5500/mahasiswa.html"
```

```javascript
// Output contoh dari Claude:
import { test, expect } from '@playwright/test';

test('upload karya flow', async ({ page }) => {
  await page.goto('/mahasiswa.html');
  await page.fill('#login-email', 'mhs@demo.com');
  await page.fill('#login-pass', 'mhs');
  await page.click('#btn-login');
  await expect(page.locator('#page-beranda')).toBeVisible();
  // ... dst
});
```

### Fix Failing Tests
```
"Jalankan npm test, baca outputnya, dan fix semua test yang merah.
 Jangan ubah behavior yang ada — hanya fix test atau bug yang menyebabkan fail"
```

### Test Coverage Analysis
```
"Jalankan nyc/istanbul coverage report, baca hasilnya, dan buat task list
 file mana yang perlu ditambah test berdasarkan coverage < 70%"
```

### Regression Test dari Bug Report
```
"Bug: user bisa submit form upload tanpa isi field Judul. Fix sudah di-push.
 Buat regression test yang memastikan bug ini tidak muncul lagi"
```

---

## 57. 🚀 DevOps & GitHub Actions

### Dockerfile Generator
```
"Buat Dockerfile multi-stage yang optimal untuk backend Express + Node 18:
 - Stage 1: build (install all deps)
 - Stage 2: production (hanya production deps, non-root user, healthcheck)
 Plus docker-compose.yml untuk dev (hot reload)"
```

### GitHub Actions — @claude di PR/Issue (VERIFIED)
Pasang sekali, lalu mention `@claude` di issue/PR komentar untuk trigger Claude:

```yaml
# .github/workflows/claude.yml
name: Claude Code
on:
  issue_comment:
    types: [created]
  pull_request_review_comment:
    types: [created]
  issues:
    types: [opened, assigned]
  pull_request:
    types: [opened, synchronize]

jobs:
  claude:
    runs-on: ubuntu-latest
    steps:
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
```

Setelah pasang:
- Tulis `@claude fix this bug` di PR comment → Claude baca code + buat fix commit
- Tulis `@claude implement this feature` di issue → Claude buat implementasi + PR
- Tulis `@claude review this PR` → Claude baca semua diff + beri komentar review

### GitHub Actions — Auto PR Review
```yaml
on:
  pull_request:
    types: [opened, synchronize]
jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          prompt: "Review PR ini: cek logic error, security issue, dan kualitas kode"
```

### GitHub Actions — Daily Cron Task
```yaml
on:
  schedule:
    - cron: '0 9 * * 1-5'   # Setiap hari kerja jam 09.00 UTC
jobs:
  daily:
    runs-on: ubuntu-latest
    steps:
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          prompt: "Jalankan npm audit, cek dependency updates, dan buat summary PR jika ada yang perlu diupdate"
```

### Vercel Config Generator
```
"Generate vercel.json untuk SPA React ini: SPA routing, custom 404, 
 redirect www→non-www, cache headers untuk assets"
```

### GitHub Actions — Bedrock/Vertex (Enterprise, tanpa static credentials)
```yaml
# Gunakan OIDC — tidak perlu simpan API key
- uses: anthropics/claude-code-action@v1
  with:
    use_bedrock: "true"
    aws_region: ap-southeast-1
```

### Headless / Non-Interactive Mode
```bash
# Pipe output git log ke Claude di terminal / CI
git log --oneline -20 | claude -p "Buat ringkasan perubahan ini dalam 3 poin"

# Jalankan Claude sebagai pre-commit hook
echo "$(git diff --staged)" | claude -p "Ada security issue? Reply YES atau NO"
```

---

## 58. 🎨 Figma ↔ Code (Design-Dev Handoff)

> Plugin Figma tersedia di Cowork. Trigger: invoke skill `figma:figma-use` sebelum setiap operasi Figma.

### Screenshot/Mockup → HTML (tanpa Figma)
```
"Ini screenshot desain dari Natasya [lampirkan PNG mockup].
 Buat HTML+CSS yang pixel-perfect dengan design system DIGILAB
 (navy #2e3192, orange #f97316, Nunito + Lato, border-radius 8px)"
```

### Figma URL → React Component
```
"Konversi Figma frame ini [url figma] ke React component dengan TypeScript.
 Gunakan Tailwind CSS. Sertakan semua state (default, hover, disabled)"
```
Trigger: `/figma-generate-design` skill.

### Code → Figma (Push ke Figma)
```
"Buat komponen Button di Figma berdasarkan kode ini.
 Include variant: primary/secondary/danger × default/hover/disabled/loading"
```
Trigger: `/figma-use` + `/figma-generate-library` skill.

### Design System Extraction
```
"Baca semua CSS custom properties di docs/index.html dan buat
 Design System di Figma: color styles, text styles, component library dasar"
```

### Figma → Code Connect (menghubungkan komponen Figma dengan kode)
```
"Buat Code Connect files yang map komponen Button di Figma ke
 komponen Button.jsx di src/components/"
```
Trigger: `/figma-code-connect` skill.

### Cara Aktifkan Figma Skills
| Task | Skill yang Diperlukan |
|---|---|
| Write/edit di Figma | `/figma-use` (WAJIB sebelum setiap write) |
| Buat file baru | `/figma-create-new-file` (WAJIB) |
| Generate desain dari kode | `/figma-generate-design` + `/figma-use` |
| Bangun design system | `/figma-generate-library` + `/figma-use` |
| Buat diagram di FigJam | `/figma-generate-diagram` + `/figma-use-figjam` |
| SwiftUI ↔ Figma | `/figma-swiftui` |
| Code Connect | `/figma-code-connect` |

---

## 59. 🔧 Code Quality, Security & Refactoring

### Security Audit (OWASP-aware)
```
"Lakukan security audit menyeluruh pada backend/routes/ dan docs/:
 - SQL injection vulnerability
 - XSS di output yang tidak di-escape
 - CSRF protection
 - Auth bypass kemungkinan
 - Sensitive data exposure (token di localStorage, hardcoded secrets)
 - Rate limiting sudah ada?
 Buat laporan markdown dengan severity: Critical/High/Medium/Low"
```
Atau gunakan built-in: `/security-review`

### Refactor File Besar (>500 baris)
```
"File index.html sudah 2600+ baris. Refactor ke struktur yang maintainable:
 - Pisahkan CSS ke file terpisah
 - Ekstrak JS ke modules
 - Jangan ubah behavior, hanya struktur
 Gunakan worktree isolation supaya aman"
```

### Dead Code Elimination
```
"Scan seluruh codebase dan identifikasi:
 - Fungsi yang didefinisikan tapi tidak pernah dipanggil
 - CSS class yang tidak dipakai di HTML manapun
 - Variable yang di-declare tapi tidak digunakan
 - Import yang tidak terpakai
 Buat daftar + konfirmasi sebelum hapus"
```

### Performance Profiling (Backend)
```
"Identifikasi semua query database di backend/routes/ yang berpotensi lambat:
 - N+1 query problem
 - Query tanpa index
 - Missing pagination
 - Tidak ada caching
 Beri rekomendasi fix per query"
```

### Dependency Audit & Update
```
"Jalankan npm audit di backend/ dan docs/, baca hasilnya, dan:
 1. Fix semua critical/high severity
 2. Cek apakah ada major version update yang breaking
 3. Buat PR description ringkasan perubahan"
```

### Code Review Checklist Otomatis
```
"Review seluruh kode yang berubah di branch ini (git diff main):
 - Apakah ada error handling yang hilang?
 - Apakah semua input di-validate?
 - Apakah ada magic number yang harus jadi konstanta?
 - Apakah komentar akurat dengan kode?
 - Apakah ada console.log yang lupa dihapus?"
```
Atau gunakan: `/review`

### Migrate ke TypeScript
```
"Migrate file api-service.js ke TypeScript:
 - Generate type definitions untuk semua function signatures
 - Tambah interface untuk semua object shapes (KaryaItem, UserProfile, dll)
 - Jangan ubah logic, hanya tambah types
 - Output: api-service.ts + types.d.ts"
```

---

## 60. IndexedDB + Web Workers — Client-Side Performance untuk Financial Dashboard

**Kapan dipakai:** Dashboard dengan 90+ file JSON (data historis harian), screener 959 saham, atau heatmap yang perlu run di background tanpa freeze UI.

### IndexedDB — Storage Klien untuk Data Masif

```js
// Buka database (versi 1)
const req = indexedDB.open('idx-dashboard', 1);
req.onupgradeneeded = e => {
  const db = e.target.result;
  const store = db.createObjectStore('stocks', { keyPath: 'ticker' });
  store.createIndex('sector', 'sector', { unique: false }); // query by sector
};

// Simpan data setelah fetch
req.onsuccess = async e => {
  const db = e.target.result;
  const tx = db.transaction('stocks', 'readwrite');
  stocks.forEach(s => tx.objectStore('stocks').put(s));
};

// Query semua saham sektor Perbankan
const idx = db.transaction('stocks').objectStore('stocks').index('sector');
idx.getAll(IDBKeyRange.only('Perbankan')).onsuccess = e => render(e.target.result);

// Cache invalidation: simpan metadata timestamp
const meta = db.transaction('meta','readwrite').objectStore('meta');
meta.put({ key: 'lastUpdated', ts: Date.now() });
// Cek saat load: if Date.now() - lastUpdated > 6 * 3600_000 → re-fetch
```

**Spesifikasi:**
- Kuota storage: Chrome/Edge = 60% disk, Firefox = 10GiB+ (minta `navigator.storage.persist()`), Safari = 60% disk tapi LRU evict setelah 7 hari tidak dibuka
- Tipe data: semua yang structured-clone support — object, array, TypedArray, Date, Map, Set, Blob, ArrayBuffer
- Aksesibel dari Web Worker dan Service Worker
- Gunakan library `idb` (5KB) untuk Promise API yang bersih daripada raw IDBRequest event

**Keunggulan vs localStorage untuk IDX:**
- localStorage: limit 5MB → 90 file JSON × ~100KB = 9MB → tidak cukup
- IndexedDB: 90 file JSON × ~100KB = 9MB → trivial. Scales ke ratusan MB
- Cold load dari IndexedDB: <100ms vs network fetch 1–3 detik

---

### Web Workers — Screener & Heatmap Tanpa Freeze UI

```js
// screener-worker.js
self.onmessage = function(e) {
  const { stocks, criteria } = e.data;
  const results = stocks.filter(s =>
    s.rsi14 < criteria.rsi_max &&
    s.volume_ratio > criteria.vol_min &&
    s.price_above_ma20 === true
  );
  self.postMessage({ results });
};

// main.js
const worker = new Worker('screener-worker.js');
worker.postMessage({ stocks: allStocks, criteria: { rsi_max: 40, vol_min: 2.0 } });
worker.onmessage = e => renderTable(e.data.results);

// Transfer zero-copy (tidak di-copy, langsung transfer ownership)
const buf = new Float64Array(959 * 20); // 959 saham × 20 field
worker.postMessage({ buf }, [buf.buffer]); // buf.buffer ditransfer, bukan di-copy
```

**Kapan pakai Web Worker:**
- Screener 959 saham dengan filter kompleks (main thread: 200–800ms freeze → Worker: 0ms freeze)
- Heatmap calculation (pct change, min/max scaling, sort 959 item)
- RSI/MACD/BB calculation untuk semua saham di background
- Pattern: satu Worker persistent, jangan buat ulang per-kalkulasi (spin-up ~10ms)

**Catatan SharedArrayBuffer:** Diblokir di GitHub Pages (butuh COOP/COEP headers). Gunakan `postMessage` biasa untuk IDX dashboard static.

---

## 61. Service Worker + PWA — Offline Access & Install ke Homescreen

**Kapan dipakai:** Dashboard yang sering dibuka trader di mobile, atau saat koneksi tidak stabil.

### Registrasi & Strategi Cache

```js
// index.html
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', { scope: '/idx-dashboard/' });
}

// sw.js
const CACHE = 'idx-v1';
const STATIC = ['/idx-dashboard/', '/idx-dashboard/index.html'];

self.addEventListener('install', e =>
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(STATIC)))
);

// Stale-while-revalidate untuk JSON data files
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (url.pathname.includes('/data/')) {
    e.respondWith(
      caches.match(e.request).then(cached => {
        const net = fetch(e.request).then(res => {
          caches.open(CACHE).then(c => c.put(e.request, res.clone()));
          return res;
        });
        return cached || net; // serve cache dulu, update di background
      })
    );
  }
});
```

### Web App Manifest (install ke homescreen)

```json
{
  "name": "IDX Market Intelligence",
  "short_name": "IDXMI",
  "start_url": "/idx-dashboard/",
  "display": "standalone",
  "background_color": "#0f1117",
  "theme_color": "#0d9488",
  "icons": [{ "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" }]
}
```

**Catatan GitHub Pages:**
- SW scope: karena site di `/idx-dashboard/`, sw.js harus di `/idx-dashboard/sw.js` dengan `scope: '/idx-dashboard/'`
- GitHub Pages + SW bekerja dengan baik — tidak perlu konfigurasi tambahan
- Safari: sebelum iOS 16.4 ada bug. iOS 17+ aman untuk sebagian besar trader
- Push notifications memerlukan backend server (tidak bisa dari GitHub Pages) — gunakan Supabase Edge Functions atau Vercel serverless

**Manfaat konkret untuk IDX:**
- Repeat load: 3 detik → <1 detik (semua JSON ter-cache dari kunjungan sebelumnya)
- Offline mode: trader buka dashboard di kereta, data terakhir masih tampil
- Mobile install: ikon di homescreen Android/iOS, tanpa address bar

---

## 62. Pyodide + DuckDB-Wasm — Python & SQL Langsung di Browser

**Kapan dipakai:** Analisis teknikal, statistik, atau screener yang butuh Python/pandas di client-side tanpa server.

### Pyodide — CPython 3.14 di Browser

```html
<script src="https://cdn.jsdelivr.net/pyodide/v314.0.0/full/pyodide.js"></script>
<script>
async function initPyodide() {
  const pyodide = await loadPyodide();
  await pyodide.loadPackage(['pandas', 'numpy', 'statsmodels', 'scikit-learn']);
  return pyodide;
}
</script>
```

**Packages tersedia di Pyodide 314.0.0:**
- `numpy` 2.4.3, `pandas` 3.0.2, `scipy` 1.17.1, `scikit-learn` 1.8.0
- `statsmodels` 0.14.6, `duckdb` 1.5.1, `pyarrow` 22.0.0
- `xgboost` 2.1.4, `lightgbm` 4.6.0, `networkx` 3.6.1, `polars` 1.33.1
- `pandas-ta` via `micropip.install('pandas-ta')` (pure Python)

**TIDAK tersedia di Pyodide:** `yfinance` (network dibatasi), `TA-Lib` (C ext belum di-compile), `playwright`

```js
// Pattern: jalankan Pyodide di Web Worker agar tidak freeze UI
// pyodide-worker.js
importScripts("https://cdn.jsdelivr.net/pyodide/v314.0.0/full/pyodide.js");
let pyodide, ready = (async () => { pyodide = await loadPyodide(); })();

self.onmessage = async ({ data }) => {
  await ready;
  if (data.packages) await pyodide.loadPackage(data.packages);
  // Pass data dari JS ke Python
  pyodide.globals.set('prices', data.prices);
  pyodide.globals.set('period', data.period);
  const result = pyodide.runPython(data.code);
  self.postMessage({ result: result.toJs ? result.toJs() : result });
};

// Contoh penggunaan: hitung RSI di browser
worker.postMessage({
  packages: ['numpy', 'pandas'],
  prices: closePrices, // array dari JS
  period: 14,
  code: `
import pandas as pd, numpy as np
s = pd.Series(prices)
delta = s.diff()
gain = delta.where(delta>0,0).rolling(period).mean()
loss = -delta.where(delta<0,0).rolling(period).mean()
(100 - 100/(1 + gain/loss)).iloc[-1]
  `
});
```

**Performa Pyodide:**
- Initial load: `full` build ~30MB. Cache dengan Service Worker setelah load pertama
- CPU: ~70-80% kecepatan native Python. `pandas` 50ms native → ~80ms Pyodide
- Memory: 4GB limit per tab. 959 saham × 1000 hari OHLCV ≈ 50MB → aman

---

### DuckDB-Wasm — SQL Analytics di JS (tanpa Pyodide)

```js
import * as duckdb from 'https://cdn.jsdelivr.net/npm/@duckdb/duckdb-wasm@latest/+esm';

const BUNDLES = duckdb.getJsDelivrBundles();
const bundle = await duckdb.selectBundle(BUNDLES);
const worker = await duckdb.createWorker(bundle.mainWorker);
const db = new duckdb.AsyncDuckDB(new duckdb.ConsoleLogger(), worker);
await db.instantiate(bundle.mainModule, bundle.pthreadWorker);
const conn = await db.connect();

// Query JSON file langsung dari URL!
const result = await conn.query(`
  SELECT ticker, AVG(rsi14) as avg_rsi, MAX(volume_ratio) as peak_vol
  FROM read_json_auto('${jsonUrl}')
  WHERE sector = 'Perbankan'
  GROUP BY ticker
  HAVING avg_rsi < 35
  ORDER BY avg_rsi ASC
`);
console.log(result.toArray());
```

**Kapan DuckDB-Wasm vs Pyodide:**
- Hanya butuh SQL analytics → **DuckDB-Wasm** (lebih ringan, load lebih cepat)
- Butuh pandas, numpy, sklearn, statsmodels → **Pyodide** (full Python ecosystem)
- Butuh keduanya → load Pyodide + gunakan `duckdb` package di dalamnya

---

## 63. Claude API Integration untuk IDX Dashboard

**Kapan dipakai:** Menambah AI-powered analysis ke dashboard IDX — scoring saham massal, analisis laporan tahunan, chatbot data, atau watchlist insights.

### A. Files API — Upload Laporan Tahunan Sekali, Query Berulang

```python
import anthropic

client = anthropic.Anthropic()

# Upload sekali → simpan file_id di database
with open("BBCA_Annual_Report_2024.pdf", "rb") as f:
    uploaded = client.beta.files.upload(
        file=("BBCA_Annual_Report_2024.pdf", f, "application/pdf")
    )
file_id = uploaded.id  # "file_011CNha..." — simpan di DB

# Setiap analisis: referensi file_id, tidak perlu re-upload
response = client.beta.messages.create(
    model="claude-opus-4-8",
    max_tokens=2048,
    betas=["files-api-2025-04-14"],
    messages=[{
        "role": "user",
        "content": [
            {
                "type": "document",
                "source": {"type": "file", "file_id": file_id},
                "citations": {"enabled": True}  # Claude sebut halaman sumber
            },
            {"type": "text", "text": "Ekstrak ROE, ROA, DER, EPS, revenue 5 tahun. Output JSON."}
        ]
    }]
)
```

**Limits Files API:** Max 500MB/file, 600 halaman PDF, 32MB per request payload. Upload/delete/list = GRATIS. Isi file = billed sebagai input tokens. Tidak tersedia di Bedrock/Vertex.

---

### B. Batch API — Screening 959 Saham, 50% Lebih Murah

```python
from anthropic.types.message_create_params import MessageCreateParamsNonStreaming
from anthropic.types.messages.batch_create_params import Request

# Buat batch request untuk semua 959 saham
requests = [
    Request(
        custom_id=f"stock-{s['ticker']}",
        params=MessageCreateParamsNonStreaming(
            model="claude-haiku-4-5",  # Paling hemat untuk screening massal
            max_tokens=256,
            messages=[{"role": "user", "content": 
                f"Beri score 1-10 dan signal untuk: {s['ticker']} "
                f"PER={s['pe']} PBV={s['pbv']} ROE={s['roe']}% "
                f"RevGrowth={s['rev_growth']}% Sektor={s['sector']}. "
                f"JSON: {{score, signal, alasan_singkat}}"
            }]
        )
    ) for s in stocks_data
]

batch = client.messages.batches.create(requests=requests)
# batch.id → simpan, poll setiap 60 detik

# Polling
while client.messages.batches.retrieve(batch.id).processing_status != "ended":
    time.sleep(60)

# Ambil hasil
for result in client.messages.batches.results(batch.id):
    if result.result.type == "succeeded":
        data = json.loads(result.result.message.content[0].text)
        save_to_json(result.custom_id.replace("stock-",""), data)
```

**Pricing Batch API (50% dari standard):**
| Model | Input | Output |
|---|---|---|
| Haiku 4.5 | $0.50/MTok | $2.50/MTok |
| Sonnet 4.6 | $1.50/MTok | $7.50/MTok |
| Opus 4.8 | $2.50/MTok | $12.50/MTok |

Estimasi biaya 959 saham × Haiku: ~$0.50–$2 per malam. Max 100k request/batch. Hasil tersedia 29 hari.

---

### C. Prompt Caching — Hemat 85-90% Biaya Screening Berulang

```python
# Cache konteks IDX statistik harian (tidak berubah antar 959 request)
IDX_CONTEXT = f"""Data pasar IDX hari ini:
IHSG: {ihsg_value} ({ihsg_pct:+.2f}%)
Net Foreign: {nf_today_idr:+,.0f} Miliar IDR ({nf_today_status})
Market PER: {mkt_per}x | Market PBV: {mkt_pbv}x
BI Rate: {bi_rate}% | USD/IDR: {usd_idr:,}
[... data statistik lengkap dari PDF IDX ~5000 token ...]"""

response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=512,
    system=[{
        "type": "text",
        "text": IDX_CONTEXT,
        "cache_control": {"type": "ephemeral", "ttl": 3600}  # Cache 1 jam (beta)
    }],
    messages=[{"role": "user", "content": f"Analisis {ticker}: PER={pe}, PBV={pbv}, ROE={roe}%"}]
)
# Request 1: cache write (25% premium). Request 2-959: cache read (90% discount)
# Total saving: ~87% vs tanpa caching
```

**Cek cache hit:**
```python
usage = response.usage
print(f"Cache read: {usage.cache_read_input_tokens}")   # Jika > 0 → hit
print(f"Cache write: {usage.cache_creation_input_tokens}")  # Write sekali
```

---

### D. Tool Use — Chatbot Natural Language atas Data Dashboard

```python
IDX_TOOLS = [
    {
        "name": "get_stock_fundamentals",
        "description": "Ambil data fundamental saham IDX: PER, PBV, ROE, EPS, revenue 5 tahun. Gunakan saat user tanya valuasi atau kinerja keuangan saham tertentu.",
        "input_schema": {
            "type": "object",
            "properties": {
                "ticker": {"type": "string", "description": "Kode 4 huruf: BBCA, TLKM, ASII"},
                "period": {"type": "string", "enum": ["1y","3y","5y"]}
            },
            "required": ["ticker"]
        },
        "strict": True  # Claude selalu comply dengan schema
    },
    {
        "name": "get_sector_heatmap",
        "description": "Return sektoral IDX dalam periode tertentu.",
        "input_schema": {
            "type": "object",
            "properties": {
                "period": {"type": "string", "enum": ["1d","1w","1m","ytd","1y"]}
            },
            "required": ["period"]
        }
    }
]

# Agentic loop: user nanya dalam bahasa natural, Claude query data sendiri
def chat(user_msg):
    messages = [{"role": "user", "content": user_msg}]
    while True:
        res = client.messages.create(model="claude-sonnet-4-6", max_tokens=2048,
                                     tools=IDX_TOOLS, messages=messages)
        if res.stop_reason == "tool_use":
            tool_results = [{"type":"tool_result","tool_use_id":b.id,
                             "content": json.dumps(execute_tool(b.name, b.input))}
                           for b in res.content if b.type == "tool_use"]
            messages += [{"role":"assistant","content":res.content},
                        {"role":"user","content":tool_results}]
        else:
            return res.content[0].text

# Contoh:
# chat("BBCA vs BMRI mana yang lebih murah secara valuasi?")
# chat("Sektor mana yang paling kuat YTD?")
# chat("Tunjukkan top 5 saham ROE tinggi di sektor Perbankan")
```

---

### E. Extended Thinking — Analisis Mendalam Multi-Faktor

```python
# Untuk analisis 10-20 saham shortlisted — bukan 959 sekaligus
response = client.messages.create(
    model="claude-opus-4-8",
    max_tokens=8000,
    thinking={"type": "enabled", "budget_tokens": 8000},
    messages=[{"role": "user", "content": f"""
Analisis komprehensif BBCA:
Fundamental: PER 22x | PBV 3.1x | ROE 18% | NPL 1.8% | CAR 24.5%
Teknikal: Harga 9250 | MA50 8900 | MA200 8450 | RSI 62 | MACD bullish crossover
Makro: BI Rate 5.5% (turun 25bps) | Inflasi 2.8% | USD/IDR 15750

Output: rating, target 12 bulan, 5 risiko utama.
    """}]
)

for block in response.content:
    if block.type == "thinking":
        pass  # reasoning internal — bisa di-log untuk audit trail
    elif block.type == "text":
        print(block.text)
```

**Kombinasi Optimal GitHub Actions untuk IDX:**
1. **22:00** — Parse PDF IDX → JSON
2. **22:05** — Batch API (959 × Haiku + Prompt Caching) → scoring semua saham. Estimasi biaya: $1–3/malam
3. **23:30** — Poll batch selesai → simpan JSON scoring ke repo
4. **Pagi** — Dashboard load data scoring. User tanya via Tool Use chatbot
5. **On-demand** — Extended Thinking untuk 10-20 saham watchlist

---

## 64. Python Analytics Pipeline Tingkat Lanjut — pandas-ta, statsmodels, scikit-learn

### A. pandas-ta — 130+ Indikator Teknikal (Pure Python, No Compilation)

```python
pip install pandas-ta  # Tidak butuh TA-Lib / kompilasi C
```

```python
import yfinance as yf
import pandas_ta as ta

df = yf.download('BBCA.JK', period='1y')

# Tambah semua indikator sekaligus
df.ta.rsi(length=14, append=True)          # RSI_14
df.ta.macd(append=True)                    # MACD_12_26_9, MACDh_12_26_9, MACDs_12_26_9
df.ta.bbands(length=20, std=2, append=True) # BBL_20_2.0, BBM_20_2.0, BBU_20_2.0
df.ta.supertrend(append=True)              # SUPERT_7_3.0 (direction signal)
df.ta.vwap(append=True)                    # VWAP_D (daily VWAP)
df.ta.stoch(append=True)                   # STOCHk_14_3_3, STOCHd_14_3_3
df.ta.adx(append=True)                     # ADX_14 (trend strength)
df.ta.obv(append=True)                     # OBV (on-balance volume)
df.ta.ichimoku(append=True)                # Ichimoku cloud (penuh)

# Batch semua 959 saham IDX (dengan multiprocessing)
df.ta.strategy('all', cores=4)

print(df.tail(3))
```

**Keunggulan pandas-ta vs TA-Lib untuk IDX pipeline:**
- Zero compilation — `pip install` langsung di GitHub Actions Ubuntu tanpa `apt-get`
- Pyodide-compatible: `micropip.install('pandas-ta')` → jalankan di browser
- Lebih banyak indikator: Squeeze Momentum, Kaufman Adaptive MA, QQE, Hull MA
- Multiprocessing via `cores=N` — 4x lebih cepat untuk 959 saham

---

### B. statsmodels — Forecasting & Analisis Statistik Pasar

```python
pip install statsmodels
```

**ARIMA Forecasting IHSG:**
```python
from statsmodels.tsa.arima.model import ARIMA
import yfinance as yf

ihsg = yf.download('^JKSE', period='5y')['Close']
model = ARIMA(ihsg, order=(2,1,2))
result = model.fit()
forecast = result.forecast(steps=5)        # 5 hari ke depan
conf = result.get_forecast(5).conf_int()   # confidence interval 95%
```

**Cointegration Pair Trading (BBCA vs BMRI):**
```python
from statsmodels.tsa.stattools import coint, adfuller

score, pvalue, _ = coint(bbca_prices, bmri_prices)
if pvalue < 0.05:
    # Cointegrated — pair trading viable
    from statsmodels.regression.linear_model import OLS
    hedge = OLS(bbca_prices, bmri_prices).fit().params[0]
    spread = bbca_prices - hedge * bmri_prices
    zscore = (spread - spread.mean()) / spread.std()
    # Buy/Sell saat zscore < -2 / > +2
```

**Granger Causality (apakah BI Rate memengaruhi IHSG?):**
```python
from statsmodels.tsa.stattools import grangercausalitytests
grangercausalitytests(df[['ihsg_return', 'bi_rate_change']], maxlag=5)
```

---

### C. scikit-learn — Anomaly Detection & Sector Clustering

```python
pip install scikit-learn  # Tersedia di Pyodide 314.0.0 (v1.8.0)
```

**IsolationForest — Deteksi Volume/Harga Anomali:**
```python
from sklearn.ensemble import IsolationForest
import pandas as pd, yfinance as yf

df = yf.download('BBCA.JK', period='2y')
X = pd.DataFrame({
    'vol_ratio': df['Volume'] / df['Volume'].rolling(20).mean(),
    'ret': df['Close'].pct_change(),
    'hl_range': (df['High'] - df['Low']) / df['Close']
}).dropna()

iso = IsolationForest(contamination=0.05, random_state=42)
X['anomaly'] = iso.fit_predict(X)
anomalies = X[X['anomaly'] == -1]
# → Hari dengan volume/harga tidak lazim — potensi insider atau berita besar
```

**KMeans — Clustering Saham Berdasarkan Korelasi Return:**
```python
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

returns = pd.DataFrame({t: data['Close'].pct_change() for t, data in all_stocks.items()})
corr = returns.corr()
X = StandardScaler().fit_transform(corr)
labels = KMeans(n_clusters=6, random_state=42, n_init=10).fit_predict(X)
clusters = pd.Series(labels, index=corr.index)
# → Temukan grup saham yang bergerak bersama (bukan hanya berdasarkan sektor resmi BEI)
```

**⚠️ Aturan Wajib — Time Series CV:**
```python
from sklearn.model_selection import TimeSeriesSplit
# WAJIB: TimeSeriesSplit, bukan train_test_split(shuffle=True)
# shuffle=True → look-ahead bias → hasil backtest palsu
tscv = TimeSeriesSplit(n_splits=5)
for train_idx, test_idx in tscv.split(X):
    clf.fit(X[train_idx], y[train_idx])
```

---

## 65. Data Pipeline Lanjutan — Parquet, DuckDB, News Sentiment

### A. Parquet — 10x Lebih Kecil dari JSON

```python
pip install pyarrow  # untuk Parquet read/write
```

```python
# Konversi 90 JSON files → Parquet di GitHub Actions
import pandas as pd

for ticker in all_tickers:
    df = yf.download(f'{ticker}.JK', period='5y')
    df.to_parquet(f'data/{ticker}.parquet', compression='snappy')
    # 80KB JSON → 8-12KB Parquet (10x lebih kecil)
    # 90 file × 80KB = 7.2MB → 90 × 10KB = 0.9MB (87% lebih kecil)

# Baca semua file sekaligus dengan DuckDB — tidak perlu concat loop
import duckdb
result = duckdb.sql("SELECT * FROM read_parquet('data/*.parquet')").df()
```

**Baca Parquet di browser via DuckDB-Wasm:**
```js
await conn.query(`
  SELECT ticker, date, close, volume 
  FROM read_parquet('${parquetUrl}') 
  WHERE date >= '2025-01-01'
`);
```

---

### B. DuckDB — SQL untuk 90+ JSON/Parquet Files di Pipeline

```python
pip install duckdb
```

```python
import duckdb, glob

con = duckdb.connect()

# Query 90+ JSON files langsung tanpa load ke memori
con.sql("""
  SELECT ticker, sector,
         AVG(rsi14) as avg_rsi,
         CORR(rsi14, forward_5d_ret) as rsi_predictive_power,
         COUNT(*) as trading_days
  FROM read_json_auto('data/*.json')
  WHERE date >= '2025-01-01'
  GROUP BY ticker, sector
  HAVING avg_rsi < 35 AND rsi_predictive_power > 0.1
  ORDER BY rsi_predictive_power DESC
""").show()

# Window function: 20-hari MA untuk semua ticker sekaligus
con.sql("""
  SELECT ticker, date, close,
         AVG(close) OVER (PARTITION BY ticker ORDER BY date 
                          ROWS BETWEEN 19 PRECEDING AND CURRENT ROW) as ma20
  FROM read_json_auto('data/*.json')
""").df()
```

**DuckDB vs pandas untuk 90 files:**
- pandas: `pd.concat([pd.read_json(f) for f in glob.glob('data/*.json')])` → lambat, makan RAM
- DuckDB: `read_json_auto('data/*.json')` → langsung query, lazy evaluation, columnar

---

### C. trafilatura — News Sentiment Saham Indonesia

```python
pip install trafilatura playwright requests
```

```python
import trafilatura, asyncio
from playwright.async_api import async_playwright

# Untuk site statis (Bisnis.com, IDX press release):
html = trafilatura.fetch_url('https://market.bisnis.com/read/...')
text = trafilatura.extract(html, include_tables=False, output_format='json')

# Untuk site JS-heavy (CNBC Indonesia):
async def scrape_js_site(url):
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        await page.goto(url)
        await page.wait_for_load_state('networkidle')
        html = await page.content()
        return trafilatura.extract(html)

# Sumber berita IDX yang bisa di-scrape:
SOURCES = {
    'bisnis': 'https://market.bisnis.com/bursa',
    'kontan': 'https://investasi.kontan.co.id/',
    'idx_press': 'https://www.idx.co.id/id/berita/',
}
```

**Sentiment → Score per Saham:**
```python
# Lexicon sederhana (tanpa model ML) untuk Bahasa Indonesia:
POSITIVE = {'naik', 'tumbuh', 'meningkat', 'laba', 'rekor', 'akuisisi', 'ekspansi', 'dividen'}
NEGATIVE = {'turun', 'rugi', 'melemah', 'default', 'delisting', 'investigasi', 'gagal', 'koreksi'}

def sentiment_score(text, ticker):
    words = set(text.lower().split())
    if ticker.upper() not in text.upper():
        return None  # Artikel tidak menyebut saham ini
    pos = len(words & POSITIVE)
    neg = len(words & NEGATIVE)
    return (pos - neg) / (pos + neg + 1)  # -1 sampai +1

# Atau gunakan IndoBERT (lebih akurat, butuh model):
# from transformers import pipeline
# classifier = pipeline("sentiment-analysis", model="indolem/indobert-base-uncased")
```

**⚠️ Batasan:**
- Paywall: Kontan Premium, Bisnis.com premium → hanya lead paragraph
- Rate limit: delay 2–5 detik antar request, rotate User-Agent
- JavaScript-heavy sites (CNBC Indonesia) butuh playwright — sudah ada di requirements.txt
- IndoBERT untuk sentiment Bahasa Indonesia lebih akurat dari lexicon, tapi butuh GPU/model hosting

---

### Referensi Lanjutan

- IndexedDB MDN: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
- `idb` library: https://github.com/jakearchibald/idb
- Pyodide: https://pyodide.org/en/stable/
- DuckDB-Wasm: https://duckdb.org/docs/api/wasm/overview.html
- Anthropic Files API: https://docs.anthropic.com/en/docs/build-with-claude/files
- Anthropic Batch API: https://docs.anthropic.com/en/api/creating-message-batches
- pandas-ta: https://github.com/twopirllc/pandas-ta
- statsmodels: https://www.statsmodels.org/
- trafilatura: https://trafilatura.readthedocs.io/
- scikit-learn TimeSeriesSplit: https://scikit-learn.org/stable/modules/cross_validation.html#time-series-split



---

## 66. APScheduler vs GitHub Actions — Pilih Mana untuk IDX?

**Kapan dipakai:** Menentukan infrastruktur otomasi data untuk pipeline IDX (download PDF, fetch fundamental, run screener).

### Perbandingan Langsung

| Aspek | GitHub Actions (current) | APScheduler (alternatif) |
|---|---|---|
| Biaya | Gratis (2000 menit/bulan public repo) | Butuh server ($0–$7/bulan) |
| Resolusi minimum | 5 menit (GitHub enforce) | 1 detik |
| State antar run | Tidak ada (stateless) | Ada (variabel Python persisten) |
| Output ke GitHub Pages | Langsung commit JSON | Harus tambah git push via script |
| Real-time tick | Tidak bisa | Bisa (sub-menit) |
| Setup | YAML di `.github/workflows/` | `pip install apscheduler` + server |
| Reliability | 15 menit delay saat GitHub load tinggi | Tergantung server uptime |

### GitHub Actions — Waktu Optimal untuk IDX

```yaml
on:
  schedule:
    - cron: '5 2 * * 1-5'   # 09:05 WIB (5 mnt setelah IDX buka, UTC+7=02:05 UTC)
    - cron: '0 9 * * 1-5'   # 16:00 WIB (setelah IDX tutup)
    - cron: '0 1 * * 1-5'   # 08:00 WIB (pre-market: global indices, USD/IDR)
    - cron: '0 23 * * 0'    # Minggu 06:00 WIB: rebuild dataset historical lengkap
  workflow_dispatch:        # Manual trigger kapan saja
```

### APScheduler — Jika Butuh Sub-5 Menit

```python
from apscheduler.schedulers.blocking import BlockingScheduler
from apscheduler.triggers.cron import CronTrigger
import pytz

wib = pytz.timezone('Asia/Jakarta')
scheduler = BlockingScheduler(timezone=wib)

@scheduler.scheduled_job(CronTrigger(day_of_week='mon-fri', hour=9, minute=5, timezone=wib))
def morning_scan():
    run_screener_959()
    update_json_files()
    push_to_github()  # Tambah langkah manual push

@scheduler.scheduled_job(CronTrigger(day_of_week='mon-fri', hour=16, minute=0, timezone=wib))
def close_scan():
    parse_idx_pdf()

scheduler.start()
```

**Rekomendasi untuk IDX dashboard:** Tetap gunakan **GitHub Actions** — cocok sempurna untuk pipeline end-of-day. APScheduler hanya perlu jika ingin intraday data (realtime tick, harga setiap menit) yang memerlukan server persisten.

---

## 67. Web Push Notifications — Alert Saham ke Mobile

**Kapan dipakai:** Notifikasi ketika saham watchlist melewati threshold — RSI oversold, breakout, volume spike — ke HP trader bahkan saat tab tidak dibuka.

### Cara Kerja

```
GitHub Actions (screener malam) → deteksi kondisi →
  → POST ke server (Supabase Edge Function / Vercel) →
    → Push Service (FCM / APNs) →
      → Service Worker di browser trader →
        → showNotification("BBCA RSI 28 — oversold entry")
```

### Setup (VAPID Keys + Subscription)

```js
// index.html — minta izin & subscribe
const VAPID_PUBLIC = 'BNxxx...'; // public key dari server

async function subscribePush() {
  const perm = await Notification.requestPermission();
  if (perm !== 'granted') return;

  const sw = await navigator.serviceWorker.ready;
  const subscription = await sw.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC)
  });

  // Kirim subscription ke server untuk disimpan
  await fetch('/api/push/subscribe', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(subscription)
  });
}

// sw.js — terima push
self.addEventListener('push', e => {
  const data = e.data.json();
  e.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/icon-192.png',
      data: { url: data.url }
    })
  );
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  clients.openWindow(e.notification.data.url);
});
```

### Server-side (Supabase Edge Function — Deno)

```typescript
// supabase/functions/send-push/index.ts
import webPush from 'npm:web-push';

webPush.setVapidDetails(
  'mailto:admin@idx-dashboard.com',
  Deno.env.get('VAPID_PUBLIC')!,
  Deno.env.get('VAPID_PRIVATE')!
);

Deno.serve(async (req) => {
  const { subscription, title, body } = await req.json();
  await webPush.sendNotification(subscription,
    JSON.stringify({ title, body, url: '/idx-dashboard/#stocks' })
  );
  return new Response('OK');
});
```

### Trigger dari GitHub Actions

```python
# Di akhir nightly screener — kirim push untuk saham yang masuk kriteria
import requests

PUSH_ENDPOINT = "https://xxx.supabase.co/functions/v1/send-push"
ANON_KEY = os.environ['SUPABASE_ANON_KEY']

def send_alert(ticker, signal, rsi):
    requests.post(PUSH_ENDPOINT,
        headers={"Authorization": f"Bearer {ANON_KEY}"},
        json={
            "subscription": get_all_subscriptions(),
            "title": f"🔔 {ticker} — {signal}",
            "body": f"RSI: {rsi:.1f} | Potensi entry oversold"
        }
    )
```

**Batasan:**
- GitHub Pages tidak bisa menjadi push server — butuh Supabase Edge Functions, Vercel, atau VPS kecil
- Safari iOS: Push API baru support mulai iOS 16.4 (sebagian besar trader sudah iOS 17+)
- Chrome Android: bekerja sempurna
- Harus simpan subscription JSON per user di database (Supabase table `push_subscriptions`)

---

## 68. Plotly Dash — Jika Butuh Server-Side Python Dashboard

**Kapan dipakai:** Hanya jika GitHub Pages tidak lagi cukup dan user mau pindah ke server-based dashboard dengan Python callbacks.

### Kapan Pertimbangkan Dash

| Butuhan | GitHub Pages + Pyodide | Plotly Dash |
|---|---|---|
| Filter/sort 959 saham | Client-side (IndexedDB + Web Workers) | Server-side (lebih mudah) |
| Real-time streaming | SSE dari server | `dcc.Interval` built-in |
| Candlestick + volume | Chart.js + custom JS | Plotly native (lebih bagus) |
| Python callbacks | Pyodide (kompleks) | Native |
| Biaya hosting | Gratis (GitHub Pages) | $5–$7/bulan minimum |
| Setup | 0 menit | 2-4 jam |

### Contoh Minimal Dash untuk IDX

```python
pip install dash plotly pandas yfinance
```

```python
from dash import Dash, dcc, html, Input, Output
import plotly.graph_objects as go
import yfinance as yf

app = Dash(__name__)
app.layout = html.Div([
    dcc.Dropdown(id='ticker', options=['BBCA','TLKM','ASII'], value='BBCA'),
    dcc.Graph(id='chart'),
    dcc.Interval(id='timer', interval=60000)  # Refresh tiap 60 detik
])

@app.callback(Output('chart','figure'), Input('ticker','value'), Input('timer','n_intervals'))
def update_chart(ticker, _):
    df = yf.download(f'{ticker}.JK', period='3mo')
    fig = go.Figure(data=[go.Candlestick(
        x=df.index, open=df['Open'], high=df['High'],
        low=df['Low'], close=df['Close']
    )])
    fig.update_layout(title=f'{ticker} — IDX', template='plotly_dark')
    return fig

if __name__ == '__main__':
    app.run(debug=True)
```

**Deploy:**
- Render.com free tier: `gunicorn app:server` — tapi sleep setelah 15 menit idle
- Railway.app $5/bulan: always-on
- Docker: `FROM python:3.11-slim` + `gunicorn`

**Rekomendasi:** Pertahankan GitHub Pages dulu. Dash adalah "upgrade path" jika proyek berkembang membutuhkan real-time tick data atau autentikasi user per-trader.

---

## Prioritas Implementasi untuk IDX Dashboard

### Tier 1 — High Impact, Low Effort (bisa dikerjakan minggu ini)

| Kemampuan | Section | Effort | Impact |
|---|---|---|---|
| pandas-ta | §64 | 30 mnt | Semua TA indicators tanpa kompilasi |
| DuckDB Python | §65 | 1 jam | SQL query 90+ JSON, hapus concat loop |
| Parquet | §65 | 1 jam | 90 file JSON → 87% lebih kecil |
| IndexedDB | §60 | 2-3 jam | Repeat load <100ms, offline ready |
| Web Workers | §60 | 1-2 jam | Screener 959 saham tanpa freeze UI |

### Tier 2 — Medium Effort (butuh 1-3 hari)

| Kemampuan | Section | Catatan |
|---|---|---|
| Service Worker + PWA | §61 | Offline mode, install ke homescreen |
| Pyodide + DuckDB-Wasm | §62 | Python/SQL langsung di browser |
| Claude Batch API | §63 | AI score 959 saham, $1–3/malam |
| statsmodels pipeline | §64 | ARIMA IHSG, pair trading |
| trafilatura + sentiment | §65 | Scrape berita IDX Indonesia |

### Tier 3 — Butuh Infrastruktur Tambahan (server/backend)

| Kemampuan | Section | Kebutuhan |
|---|---|---|
| Web Push | §67 | Supabase Edge Functions / Vercel |
| APScheduler | §66 | Server persisten ($5–7/bln) |
| Plotly Dash | §68 | Server + rewrite dashboard |



---


---

## 69. Financial Data APIs Eksternal untuk IDX

> Sumber data eksternal yang bisa melengkapi yfinance untuk dashboard IDX. Semua di bawah ini tersedia tanpa scraping manual.

### A. Alpha Vantage (25 req/day gratis)

- **IDX ticker format:** `BBCA.JKT` (bukan `.JK` — itu Yahoo Finance)
- **Endpoint penting:** `TIME_SERIES_DAILY` (100 bar compact gratis), `OVERVIEW` (P/E, EPS, sektor), `EARNINGS`, `SYMBOL_SEARCH`, `CURRENCY_EXCHANGE_RATE` (USD/IDR)
- **Coverage IDX:** parsial — hanya saham liquid (BBCA, TLKM, BBRI biasanya tersedia)
- **Rekomendasi:** pakai untuk single-stock fundamental lookup, bukan bulk 959 saham

```python
import requests, pandas as pd
API_KEY = "YOUR_KEY"
# Company fundamentals
r = requests.get("https://www.alphavantage.co/query", params={
    "function": "OVERVIEW", "symbol": "BBCA", "apikey": API_KEY
})
data = r.json()  # PERatio, PriceToBookRatio, EPS, Sector, Industry

# Daily OHLCV (100 bar compact gratis)
r = requests.get("https://www.alphavantage.co/query", params={
    "function": "TIME_SERIES_DAILY", "symbol": "BBCA.JKT",
    "outputsize": "compact", "apikey": API_KEY
})
df = pd.DataFrame(r.json()["Time Series (Daily)"]).T.astype(float)
```

### B. Twelve Data — Terbaik untuk Real-Time IDX

- **IDX exchange code:** `XIDX` (MIC standard)
- **Free tier:** 8 credits/menit, 800/hari — cukup untuk single-stock EOD
- **Paid Grow ($29/mo):** unlimited daily calls, 27 markets termasuk XIDX
- **WebSocket real-time:** `wss://ws.twelvedata.com/v1/quotes/price?apikey=KEY`
- **Endpoint IDX khusus:** `/market_movers?exchange=XIDX&direction=gainers`, `/statistics` (P/E, P/B, EV/EBITDA), `/profile`, `/balance_sheet`, `/income_statement`

```python
from twelvedata import TDClient
td = TDClient(apikey="YOUR_KEY")

# OHLCV BBCA
df = td.time_series(symbol="BBCA", exchange="XIDX", interval="1day",
                    outputsize=100, timezone="Asia/Jakarta").as_pandas()

# Top gainers IDX hari ini
movers = td.get_market_movers(exchange="XIDX", direction="gainers").as_json()
for s in movers['values'][:10]:
    print(s['symbol'], s['percent_change'])

# WebSocket real-time (butuh paid plan)
ws = td.websocket(symbols="BBCA,TLKM,BBRI", on_event=lambda e: print(e))
ws.connect(); ws.keep_alive()
```

### C. IDX Unofficial API (reverse-engineered)

Endpoint internal yang dipakai website idx.co.id — tanpa dokumentasi resmi, bisa berubah:

```python
import requests
HEADERS = {"User-Agent":"Mozilla/5.0","Referer":"https://www.idx.co.id/"}

# List semua saham IDX (paginate start=0,20,...,940)
def get_securities(start=0, length=20, keyword=""):
    r = requests.get("https://www.idx.co.id/primary/StockData/GetSecurities",
        params={"length":length,"start":start,"keyword":keyword,"lang":"id"},
        headers=HEADERS, timeout=15)
    return r.json()

# Trading summary per tanggal
def get_trading_summary(date="2025-06-13"):
    r = requests.get("https://www.idx.co.id/primary/StockData/GetStockSummary",
        params={"length":50,"start":0,"date":date}, headers=HEADERS, timeout=15)
    return r.json()

# Ambil semua 959 saham
all_stocks = []
for start in range(0, 960, 20):
    batch = get_securities(length=20, start=start)
    all_stocks.extend(batch.get("data", []))
```

> ⚠️ Tambahkan `time.sleep(1)` antar request. Cloudflare bisa blokir GitHub Actions runner IP.

### D. Sectors.app — IDX-Focused (Recommended)

- **Coverage:** 99% saham IDX listed
- **API:** documented REST, freemium
- **Endpoint:** `https://api.sectors.app/v2/companies/?exchange=IDX&category=IDX30`
- **Data:** fundamental (income statement, balance sheet), valuasi, sektor GICS
- **Lebih reliable** dari scraping idx.co.id langsung

### E. Bank Indonesia — USD/IDR via SOAP (gratis, no auth)

```python
import requests, xmltodict, pandas as pd

def get_bi_exchange_rate(currency="USD", start="2025-01-01", end="2025-12-31"):
    r = requests.get("https://www.bi.go.id/biwebservice/wskursbi.asmx/getSubKursLokal3",
        params={"mts": currency, "startdate": start, "enddate": end}, timeout=15)
    data = xmltodict.parse(r.content)
    rows = data["DataSet"]["Table"]
    if isinstance(rows, dict): rows = [rows]
    df = pd.DataFrame(rows)
    return df[["mts_date","mts_beli","mts_jual"]]  # tanggal, kurs beli, jual

# Jalankan di GitHub Actions → simpan ke data/usd_idr.json
df = get_bi_exchange_rate("USD")
```

> Mata uang yang didukung: USD, EUR, JPY, SGD, CNY, GBP, AUD, dll.

### F. BPS API — Makro Indonesia (inflasi, GDP, neraca perdagangan)

```python
import requests
BPS_KEY = "YOUR_KEY"  # daftar gratis di webapi.bps.go.id/developer
BASE = "https://webapi.bps.go.id/v1/api"

def get_bps_data(var_id):
    return requests.get(
        f"{BASE}/list/model/data/lang/ind/domain/0000/var/{var_id}/key/{BPS_KEY}",
        timeout=15).json()

# var_id penting:
# 1723 = Inflasi bulanan
# 1954 = PDB ADHK (GDP konstan, kuartalan)
# 529  = Neraca Perdagangan
inflasi = get_bps_data(1723)

# Alternatif: pip install stadata
import stadata
client = stadata.Client("YOUR_KEY")
df = client.get_data(var=1723, domain="0000")  # returns DataFrame
```

> Jalankan GitHub Actions bulanan → simpan ke `data/macro_bps.json`

### G. Stooq — Historical Data Gratis (no API key)

```python
import requests, pandas as pd
from io import StringIO

def stooq_download(ticker, start, end):
    """ticker: 'bbca.jk', '^jkse', interval: daily"""
    r = requests.get("https://stooq.com/q/d/l/",
        params={"s": ticker.lower(), "d1": start.replace("-",""),
                "d2": end.replace("-",""), "i": "d"},
        headers={"User-Agent":"Mozilla/5.0"}, timeout=15)
    if "No data" in r.text: return pd.DataFrame()
    return pd.read_csv(StringIO(r.text), parse_dates=["Date"], index_col="Date").sort_index()

# Pakai sebagai fallback yfinance
def get_ohlcv(ticker):
    import yfinance as yf
    df = yf.download(ticker, period="2y", progress=False)
    if df.empty:
        df = stooq_download(ticker.lower(), "2023-01-01", "2025-12-31")
    return df
```

> `time.sleep(0.5)` antar request — rate limit tidak didokumentasikan

### Rekomendasi Stack Data Eksternal IDX

| Source | Pakai untuk | Gratis? |
|---|---|---|
| yfinance | OHLCV historis primer (.JK) | Ya |
| Stooq | Fallback yfinance | Ya |
| IDX unofficial API | Securities list, trading summary | Ya (unofficial) |
| Sectors.app | Fundamentals IDX reliable | Freemium |
| BI SOAP | USD/IDR kurs | Ya |
| BPS API | Inflasi, GDP, makro | Ya (free key) |
| Twelve Data Basic | EOD snapshots, market movers | 800/hari |
| Alpha Vantage | Single-stock OVERVIEW | 25/hari |

---

## 70. TradingView Lightweight Charts v5.2 — Candlestick Profesional

> Library candlestick terbaik untuk financial dashboard. 50KB, Apache 2.0, dirancang khusus untuk OHLCV.

### CDN Setup

```html
<!-- IIFE build — window.LightweightCharts global, cocok untuk vanilla HTML -->
<script src="https://unpkg.com/lightweight-charts@5.2.0/dist/lightweight-charts.standalone.production.js"></script>
```

### Series Types yang Tersedia

| Series | Class | Gunakan untuk |
|---|---|---|
| `CandlestickSeries` | Candlestick OHLC | Chart saham IDX primer |
| `BarSeries` | Bar OHLC | Alternatif candlestick |
| `LineSeries` | Line | Moving averages, IHSG overlay |
| `AreaSeries` | Area dengan gradient | Portfolio value overtime |
| `HistogramSeries` | Bar histogram | Volume (warna hijau/merah) |
| `BaselineSeries` | Area relative to baseline | Return vs benchmark |

### Candlestick + Volume Panes (IHSG)

```js
const { createChart, CandlestickSeries, HistogramSeries } = LightweightCharts;

const chart = createChart(document.getElementById('chart'), {
  layout: { textColor:'#d1d4dc', background:{type:'solid', color:'#131722'} },
  grid: { vertLines:{color:'#2a2e39'}, horzLines:{color:'#2a2e39'} },
  width: 900, height: 500,
});

// Main pane — candlestick IHSG/saham IDX
const candleSeries = chart.addSeries(CandlestickSeries, {
  upColor:'#26a69a', downColor:'#ef5350',
  borderVisible:false,
  wickUpColor:'#26a69a', wickDownColor:'#ef5350',
});
candleSeries.setData(ihsgOHLC); // [{time:'2024-01-02', open:7225, high:7260, low:7218, close:7248}]

// Volume pane (pane index 1 — pisah dari main pane, v5+ feature)
const volSeries = chart.addSeries(HistogramSeries, {
  priceFormat:{type:'volume'}, priceScaleId:'',
}, 1);
volSeries.setData(volumeData); // [{time:'2024-01-02', value:15234567890, color:'#26a69a'}]

chart.timeScale().fitContent();
```

### Real-Time Update via WebSocket

```js
// Update last bar atau append bar baru — JANGAN setData() untuk update
candleSeries.update({ time:'2025-06-16', open:7320, high:7345, low:7310, close:7338 });

// WebSocket dari Twelve Data (paid plan)
const ws = new WebSocket('wss://ws.twelvedata.com/v1/quotes/price?apikey=KEY');
ws.onmessage = e => {
  const tick = JSON.parse(e.data);
  if (tick.event === 'price') candleSeries.update({ time: tick.timestamp, ...tick });
};
```

### Crosshair Sync Antar Chart

```js
// Sinkronkan crosshair dua chart (misal: IHSG + BBCA)
function syncCrosshair(chart1, chart2, series1, series2) {
  chart1.subscribeCrosshairMove(p => {
    const d = p.seriesData.get(series1);
    chart2.setCrosshairPosition(d?.value ?? 0, p.time, series2);
  });
  chart2.subscribeCrosshairMove(p => {
    const d = p.seriesData.get(series2);
    chart1.setCrosshairPosition(d?.value ?? 0, p.time, series1);
  });
}
```

### License & Attribution

Apache 2.0 — **gratis termasuk komersial**. Wajib tampilkan attribution di halaman public:
```html
<a href="https://www.tradingview.com/" target="_blank">Charts powered by TradingView</a>
```

### TradingView Pine Script Webhooks

Pine Script bisa kirim HTTP POST ke URL eksternal saat alert kondisi terpenuhi:

```pine
//@version=6
alertcondition(
  ta.crossover(ta.rsi(close, 14), 30),
  title="RSI Buy",
  message='{"symbol":"{{ticker}}","action":"BUY","price":{{close}},"time":"{{time}}"}'
)
```

- **Butuh:** TradingView paid plan (Essential+, ~$15/bulan) untuk webhooks
- **Receiver:** Supabase Edge Function atau GitHub `repository_dispatch` API
- **IDX support:** semua saham IDX ada di TradingView dengan prefix `IDX:BBCA`

---

## 71. Apache ECharts — Visualisasi Finansial Lengkap

> Apache 2.0, gratis. Ungguli Chart.js untuk financial dashboard — native candlestick, heatmap, treemap, calendar semua built-in.

### CDN

```html
<!-- Full build — ~1MB -->
<script src="https://cdn.jsdelivr.net/npm/echarts@5.6.0/dist/echarts.min.js"></script>
<!-- Atau custom build di echarts.apache.org/en/builder.html (~300KB untuk candlestick+heatmap) -->
```

### Candlestick IHSG + Volume

```js
const chart = echarts.init(document.getElementById('chart'));

// ECharts candlestick format: [open, close, low, high]
const rawData = [
  ['2024-01-02', 7225.0, 7248.5, 7218.3, 7260.1, 15234567890],
  // date, open, close, low, high, volume
];

chart.setOption({
  tooltip: { trigger:'axis', axisPointer:{type:'cross'} },
  grid: [
    { left:'10%', right:'8%', bottom:'30%' },      // price pane
    { left:'10%', right:'8%', top:'75%', bottom:'5%' } // volume pane
  ],
  xAxis: [
    { type:'category', data:rawData.map(d=>d[0]), gridIndex:0, axisLabel:{show:false} },
    { type:'category', data:rawData.map(d=>d[0]), gridIndex:1 }
  ],
  yAxis: [
    { scale:true, gridIndex:0 },
    { scale:true, gridIndex:1 }
  ],
  dataZoom: [
    { type:'inside', xAxisIndex:[0,1], start:80, end:100 },
    { type:'slider',  xAxisIndex:[0,1], bottom:0, height:30 }
  ],
  series: [
    {
      type:'candlestick', data:rawData.map(d=>[d[1],d[2],d[3],d[4]]),
      xAxisIndex:0, yAxisIndex:0,
      itemStyle:{ color:'#26a69a', color0:'#ef5350', borderColor:'#26a69a', borderColor0:'#ef5350' }
    },
    {
      type:'bar', data:rawData.map(d=>({value:d[5],
        itemStyle:{color:d[2]>=d[1]?'#26a69a':'#ef5350'}})),
      xAxisIndex:1, yAxisIndex:1, barMaxWidth:8
    }
  ]
});
```

### Heatmap Return Calendar

```js
chart.setOption({
  calendar: { range:'2024', cellSize:['auto',13] },
  visualMap: {
    min:-5, max:5,
    inRange:{ color:['#ef5350','#ffffff','#26a69a'] }
  },
  series: [{ type:'heatmap', coordinateSystem:'calendar', data: calendarData }]
  // calendarData: [['2024-01-02', 1.2], ['2024-01-03', -0.8], ...]
});
```

### Sector Treemap (Market Cap IDX)

```js
chart.setOption({
  series: [{
    type:'treemap',
    data: sectorData, // [{name:'Finance', value:totalMktCap, children:[...saham]}]
    label:{ show:true, formatter:'{b}\n{c}' },
    itemStyle:{ borderWidth:2 },
    levels:[
      { itemStyle:{ borderWidth:3, borderColor:'#333', gapWidth:3 } },
      { colorMappingBy:'value', itemStyle:{ gapWidth:1 } }
    ]
  }]
});
```

### ECharts vs Chart.js — Perbandingan IDX

| Feature | ECharts | Chart.js |
|---|---|---|
| Candlestick native | ✅ | ❌ (butuh plugin) |
| Heatmap | ✅ | ❌ |
| Calendar heatmap | ✅ | ❌ |
| Treemap | ✅ | ❌ |
| DataZoom (pan/zoom) | ✅ built-in | ❌ |
| Performance 10M titik | ✅ progressive render | ⚠️ |
| Bundle size | ~300KB custom | ~200KB |

---

## 72. ag-Grid Community — Screener Table 959 Saham

> MIT license, gratis. Satu-satunya pilihan untuk tabel screener 959 saham yang smooth. DOM virtualization = hanya ~20-30 baris yang di-render, berapapun total baris.

### CDN Setup

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ag-grid-community@35/styles/ag-grid.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ag-grid-community@35/styles/ag-theme-alpine-dark.css">
<script src="https://cdn.jsdelivr.net/npm/ag-grid-community@35/dist/ag-grid-community.min.js"></script>
```

### Screener Table 959 Saham IDX — Full Example

```html
<input id="qf" placeholder="Cari saham..." oninput="gridApi.setGridOption('quickFilterText', this.value)">
<div id="grid" class="ag-theme-alpine-dark" style="height:600px;width:100%"></div>

<script>
const columnDefs = [
  { field:'ticker', headerName:'Kode', pinned:'left', width:90,
    cellStyle:{fontWeight:'bold', color:'#60a5fa'} },
  { field:'name',   headerName:'Nama', width:180 },
  { field:'sector', headerName:'Sektor', width:130 },
  { field:'price',  headerName:'Harga', width:100, type:'numericColumn',
    valueFormatter: p => 'Rp '+p.value?.toLocaleString('id-ID') },
  { field:'change_pct', headerName:'% ∆', width:80,
    cellStyle: p => ({color: p.value>=0 ? '#26a69a' : '#ef5350'}),
    valueFormatter: p => (p.value>=0?'+':'')+p.value?.toFixed(2)+'%' },
  { field:'volume', headerName:'Volume', width:110, type:'numericColumn',
    valueFormatter: p => (p.value/1e9).toFixed(1)+'B' },
  { field:'market_cap', headerName:'Mkt Cap', width:110, type:'numericColumn',
    valueFormatter: p => 'Rp '+(p.value/1e12).toFixed(1)+'T' },
  { field:'per', headerName:'PER', width:80, type:'numericColumn',
    valueFormatter: p => p.value?.toFixed(1)+'x' },
  { field:'pbv', headerName:'PBV', width:80, type:'numericColumn',
    valueFormatter: p => p.value?.toFixed(2)+'x' },
  { field:'roe', headerName:'ROE%', width:80, type:'numericColumn',
    cellStyle: p => ({color: p.value>=15 ? '#26a69a' : 'inherit'}) },
  // Built-in sparkline (Community Edition)
  { field:'sparkline', headerName:'5D', width:120,
    cellRenderer:'agSparklineCellRenderer',
    cellRendererParams:{ sparklineOptions:{type:'line', line:{stroke:'#60a5fa'}} } }
];

const gridApi = agGrid.createGrid(document.getElementById('grid'), {
  columnDefs,
  rowData: IDX_959_DATA, // array 959 saham
  defaultColDef: { sortable:true, filter:true, resizable:true },
  animateRows: true,
  rowHeight: 36,
  getRowStyle: p => {
    if (p.data.change_pct >= 5) return { background:'rgba(38,166,154,.12)' };
    if (p.data.change_pct <= -5) return { background:'rgba(239,83,80,.12)' };
  }
});
</script>
```

### Fitur Community (Gratis) yang Penting untuk IDX

- **DOM virtualization:** render hanya ~20 baris, scroll 959 saham tetap smooth
- **Quick filter:** search realtime tanpa backend
- **Column pinning:** `pinned:'left'` pada ticker — tetap kelihatan scroll horizontal
- **Built-in sparklines:** minichart 5-day trend di dalam sel
- **Multi-column sort:** Shift+click header
- **CSV export:** built-in, 1 baris kode
- **Row highlighting:** `getRowStyle` untuk warnai saham naik/turun signifikan

> **Enterprise (berbayar) yang tidak perlu:** Server-side row model, Excel export, pivot table — tidak dibutuhkan untuk 959 static rows.

---

## 73. Observable Plot + Vega-Lite — Grammar of Graphics

> Untuk scatter plot PER vs ROE, bubble chart sektor, dan exploratory analytics IDX.

### Observable Plot (ISC — gratis)

```html
<!-- ESM CDN — modern browsers -->
<script type="module">
  import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";

  // Scatter plot: PER vs ROE, ukuran bubble = market cap
  const scatter = Plot.plot({
    marks: [
      Plot.dot(idx959Data, {
        x: "per",
        y: "roe",
        r: d => Math.sqrt(d.market_cap / 1e11),  // bubble size
        fill: "sector",
        tip: true,  // hover tooltip otomatis
        title: d => `${d.ticker}\nPER: ${d.per}x | ROE: ${d.roe}%`
      }),
      Plot.ruleX([15]),  // garis PER wajar
      Plot.ruleY([15]),  // garis ROE 15%
    ],
    x: { label:"PER (x)", domain:[0,50] },
    y: { label:"ROE (%)", domain:[0,60] },
    color: { legend:true },
    width:900, height:600
  });
  document.getElementById('chart').append(scatter);

  // Sector bubble chart (avg PER vs avg ROE per sektor)
  const bubble = Plot.plot({
    marks: [
      Plot.dot(sectorData, {
        x:"avg_per", y:"avg_roe", r:"total_mktcap",
        fill:"sector", fillOpacity:0.7, tip:true
      }),
      Plot.text(sectorData, {
        x:"avg_per", y:"avg_roe", text:"sector", fontSize:10
      })
    ],
    r: { range:[5,50] }, width:800, height:500
  });
</script>
```

### Vega-Lite (BSD — gratis, 3 script tags)

```html
<script src="https://cdn.jsdelivr.net/npm/vega@6.2.0"></script>
<script src="https://cdn.jsdelivr.net/npm/vega-lite@6.4.3"></script>
<script src="https://cdn.jsdelivr.net/npm/vega-embed@7.1.0"></script>
<script>
// Declarative JSON spec — cocok untuk non-developer team
vegaEmbed('#chart', {
  "$schema": "https://vega.github.io/schema/vega-lite/v6.json",
  "mark": {"type":"point","tooltip":true},
  "encoding": {
    "x": {"field":"per", "type":"quantitative"},
    "y": {"field":"roe", "type":"quantitative"},
    "size":{"field":"market_cap","type":"quantitative"},
    "color":{"field":"sector","type":"nominal"}
  },
  "data": {"values": idx959Data}
});
</script>
```

### Perbandingan

| | Observable Plot | Vega-Lite |
|---|---|---|
| API | JS function calls | JSON spec |
| Bundle | ~200KB | ~800KB (3 scripts) |
| Tooltip | `tip:true` satu kata | Verbose config |
| Candlestick | ❌ | ✅ (via layer + rule) |
| Target user | Developer | Non-developer / analyst |

**Rekomendasi IDX:** Plot untuk scatter/bubble/exploratory, ECharts untuk semua chart utama.

---

## 74. QuantStats + pyfolio-reloaded — Portfolio Analytics

> Hitung 50+ metrik portofolio dan generate tearsheet profesional dari returns series manapun (yfinance, backtrader, dll).

### Install

```bash
pip install quantstats pyfolio-reloaded
# PENTING: pakai pyfolio-reloaded (fork aktif), bukan pyfolio asli (abandoned 2019)
```

### QuantStats — 50+ Metrik dalam 1 Baris

```python
import quantstats as qs
import yfinance as yf

qs.extend_pandas()  # tambah .sharpe(), .sortino(), .max_drawdown() ke pandas Series

# Download data IDX
bbca = yf.download("BBCA.JK", start="2020-01-01", end="2024-12-31")
ihsg = yf.download("^JKSE", start="2020-01-01", end="2024-12-31")
returns = bbca['Close'].pct_change().dropna()
benchmark = ihsg['Close'].pct_change().dropna()

# Metrik individual
print(qs.stats.sharpe(returns))           # Sharpe Ratio
print(qs.stats.sortino(returns))          # Sortino Ratio
print(qs.stats.max_drawdown(returns))     # Max Drawdown
print(qs.stats.cagr(returns))             # CAGR
print(qs.stats.calmar(returns))           # Calmar Ratio
print(qs.stats.volatility(returns))       # Annualized volatility
print(qs.stats.win_rate(returns))         # % hari positif

# Full HTML tearsheet vs IHSG
qs.reports.html(returns, benchmark=benchmark,
                output="bbca_tearsheet.html", title="BBCA.JK vs IHSG")

# Print ke console
qs.reports.full(returns, benchmark=benchmark)
```

### pyfolio-reloaded — Returns Tearsheet

```python
import pyfolio as pf

# Portfolio equal-weight BBCA + BBRI + TLKM
tickers = ["BBCA.JK","BBRI.JK","TLKM.JK"]
prices = yf.download(tickers, start="2021-01-01", end="2024-12-31")['Close']
port_returns = prices.pct_change().dropna().mean(axis=1)  # equal weight
bench_returns = yf.download("^JKSE", start="2021-01-01")['Close'].pct_change().dropna()

# Align dates
port_returns, bench_returns = port_returns.align(bench_returns, join='inner')

# Generate tearsheet
pf.create_returns_tear_sheet(port_returns, benchmark_rets=bench_returns)

# Interesting times — performa saat event besar
pf.create_interesting_times_tear_sheet(port_returns)
```

### Metrik Penting yang Dihasilkan

- **Sharpe, Sortino, Calmar** — risk-adjusted return
- **Max Drawdown + duration** — worst loss dan berapa lama recovery
- **CAGR** — annualized return
- **Win Rate** — % periode positif
- **Skewness, Kurtosis** — distribusi return
- **VaR, CVaR** — value at risk
- **Tail Ratio** — right tail vs left tail

### Pyodide Compatible?

**Tidak** (matplotlib/seaborn rendering). Pattern: jalankan di GitHub Actions nightly → output JSON metrics → tampilkan di dashboard dengan Chart.js/ECharts.

```python
# Output JSON dari GitHub Actions
import json
metrics = {
    "sharpe": qs.stats.sharpe(returns),
    "sortino": qs.stats.sortino(returns),
    "max_drawdown": qs.stats.max_drawdown(returns),
    "cagr": qs.stats.cagr(returns),
    "win_rate": qs.stats.win_rate(returns),
}
with open("data/portfolio_metrics.json","w") as f:
    json.dump(metrics, f)
```

---

## 75. arch (GARCH) + backtrader — Volatilitas & Backtesting IDX

### arch — GARCH Volatility Models

```bash
pip install arch  # versi 7.2.0, Cython — tidak Pyodide compatible
```

**Model yang tersedia:** GARCH, EGARCH (asymmetric leverage effect), GJR-GARCH (terbaik untuk equity), FIGARCH, APARCH, HARCH

```python
from arch import arch_model
import yfinance as yf
import numpy as np

# IHSG GARCH(1,1)
ihsg = yf.download("^JKSE", start="2020-01-01", end="2024-12-31")
returns = 100 * ihsg['Close'].pct_change().dropna()  # kalikan 100 untuk convergence

# GJR-GARCH — terbaik untuk equity (tangkap leverage effect)
am = arch_model(returns, vol='GARCH', p=1, o=1, q=1, dist='t')
res = am.fit(disp='off')
print(res.summary())  # omega, alpha, gamma, beta

# Forecast 5 hari ke depan
forecasts = res.forecast(horizon=5)
vol_5d = np.sqrt(forecasts.variance.values[-1, :])
print("Volatility forecast 5 hari (%):", vol_5d)

# VaR 1 hari 95%
import scipy.stats as stats
VaR_95 = -res.conditional_volatility * stats.norm.ppf(0.05) / 100
print(f"VaR 95% hari ini: {VaR_95.iloc[-1]:.4f}")

# Output ke JSON untuk dashboard
import json
json.dump({
    "ticker": "^JKSE",
    "vol_conditional": float(res.conditional_volatility.iloc[-1]),
    "vol_forecast_5d": vol_5d.tolist(),
    "VaR_95": float(VaR_95.iloc[-1])
}, open("data/volatility_forecast.json","w"))
```

### backtrader — MA Crossover Backtest IDX

```bash
pip install backtrader  # lebih mudah dari zipline untuk yfinance data
```

```python
import backtrader as bt
import yfinance as yf

class MACrossover(bt.Strategy):
    params = (('fast', 20), ('slow', 50))
    def __init__(self):
        self.fast_ma  = bt.indicators.SMA(period=self.p.fast)
        self.slow_ma  = bt.indicators.SMA(period=self.p.slow)
        self.crossover = bt.indicators.CrossOver(self.fast_ma, self.slow_ma)
    def next(self):
        if not self.position:
            if self.crossover > 0: self.buy()
        elif self.crossover < 0: self.close()

# Feed yfinance BBCA.JK
bbca = yf.download("BBCA.JK", start="2020-01-01", end="2024-12-31")
bbca.columns = [c[0].lower() if isinstance(c, tuple) else c.lower() for c in bbca.columns]

cerebro = bt.Cerebro()
cerebro.addstrategy(MACrossover, fast=20, slow=50)
cerebro.adddata(bt.feeds.PandasData(dataname=bbca))
cerebro.broker.setcash(100_000_000)          # Rp 100 juta
cerebro.broker.setcommission(commission=0.0029)  # 0.29% IDX standard

# Analyzers
cerebro.addanalyzer(bt.analyzers.SharpeRatio, _name='sharpe', riskfreerate=0.06)
cerebro.addanalyzer(bt.analyzers.DrawDown, _name='drawdown')
cerebro.addanalyzer(bt.analyzers.Returns, _name='returns')

results = cerebro.run()
strat = results[0]
print("Sharpe:", strat.analyzers.sharpe.get_analysis()['sharpenormal'])
print("Max DD:", strat.analyzers.drawdown.get_analysis()['max']['drawdown'], "%")
print("CAGR:  ", strat.analyzers.returns.get_analysis()['rnorm100'], "%")
print("Final: Rp", f"{cerebro.broker.getvalue():,.0f}")
```

### Kapan pakai masing-masing

| Tool | Pakai untuk | Pyodide |
|---|---|---|
| arch GARCH | Volatility forecast harian, VaR | ❌ (Cython) |
| backtrader | MA crossover / RSI / custom strategy backtest | ❌ (native) |
| zipline-reloaded | Pyfolio integration, buku Stefan Jansen | ❌ (Cython) |

Pattern: jalankan di GitHub Actions → output JSON → tampilkan di dashboard.

---

## 76. ruptures + stumpy + hmmlearn — Advanced Time Series IDX

### ruptures — Change Point Detection (**Pyodide compatible!**)

> Deteksi kapan IHSG berubah regime (bull→bear, low vol→high vol). **Satu-satunya library di daftar ini yang 100% compatible dengan Pyodide.**

```bash
pip install ruptures  # pure Python + numpy/scipy
# Di Pyodide browser: await micropip.install('ruptures')
```

```python
import ruptures as rpt
import yfinance as yf
import numpy as np

# Download IHSG
ihsg = yf.download("^JKSE", start="2018-01-01", end="2024-12-31")
log_returns = np.diff(np.log(ihsg['Close'].dropna().values))

# PELT + RBF — deteksi regime change (jumlah tidak diketahui)
algo = rpt.Pelt(model="rbf").fit(log_returns)
breakpoints = algo.predict(pen=10)  # pen=10 → konservatif, lebih sedikit breakpoints

# Tampilkan tanggal regime change
dates = ihsg.index[1:]  # pct_change geser 1
change_dates = [dates[bp-1] for bp in breakpoints[:-1]]
print("Regime changes:", change_dates)

# Binary Segmentation — 5 breakpoints paksa
binseg = rpt.Binseg(model="rbf").fit(log_returns)
bp5 = binseg.predict(n_bkps=5)

# Di Pyodide (browser) — analisis regime secara live
# import micropip; await micropip.install('ruptures')
# ... sama persis kodenya
```

> Algoritma: `Pelt` (optimal, O(n)), `Binseg` (approx, cepat), `Window` (sliding), `Dynp` (exact untuk k diketahui)

### stumpy — Time Series Pattern Matching

```bash
pip install stumpy  # butuh Numba — tidak Pyodide compatible
```

```python
import stumpy, numpy as np, yfinance as yf

ihsg = yf.download("^JKSE", start="2015-01-01", end="2024-12-31")
prices = ihsg['Close'].dropna().values

# Matrix profile m=20 (window 20 hari ~ 1 bulan trading)
m = 20
mp = stumpy.stump(prices, m)
profile_vals  = mp[:, 0]  # jarak ke nearest neighbor
neighbor_idxs = mp[:, 1]  # index nearest neighbor

# Motif — pola yang paling sering berulang
motif_idx = np.argsort(profile_vals)[0]
print(f"Best motif: {ihsg.index[motif_idx].date()} ↔ {ihsg.index[mp[motif_idx,1]].date()}")

# Discord — anomali (pola yang belum pernah ada sebelumnya)
discord_idx = np.argsort(profile_vals)[-1]
print(f"Anomaly: {ihsg.index[discord_idx].date()}")

# "Pola IHSG saat ini paling mirip kapan?"
current_window = prices[-m:]
query_mp = stumpy.mass(current_window, prices)
best_match = np.argmin(query_mp)
print(f"Current pattern ~ {ihsg.index[best_match].date()}")
```

### hmmlearn — Hidden Markov Model (Bull/Bear/Sideways)

```bash
pip install hmmlearn  # C++ extensions — tidak Pyodide compatible
```

```python
from hmmlearn import hmm
import numpy as np, yfinance as yf, warnings
warnings.filterwarnings('ignore')

ihsg = yf.download("^JKSE", start="2015-01-01", end="2024-12-31")
returns = ihsg['Close'].pct_change().dropna()

# Feature: [return, |return|] → 2 fitur per hari
X = np.column_stack([returns.values, np.abs(returns.values)])

# 3-state HMM: Bull (high return), Bear (negative return), Sideways
model = hmm.GaussianHMM(n_components=3, covariance_type="full",
                         n_iter=100, random_state=42)
model.fit(X)

# Decode hidden states
states = model.predict(X)
probs  = model.predict_proba(X)

# Map state → label berdasarkan mean return
sorted_by_return = np.argsort(model.means_[:, 0])
labels = {sorted_by_return[0]:"Bear", sorted_by_return[1]:"Sideways", sorted_by_return[2]:"Bull"}

# Current regime
current = states[-1]
current_label = labels[current]
current_probs = probs[-1]
print(f"Current IHSG: {current_label} ({current_probs[current]:.1%} confidence)")

# Output untuk semua 959 saham → data/market_regime.json
import json
regime_output = {}
for ticker in ["BBCA.JK","BBRI.JK","TLKM.JK"]:
    stock = yf.download(ticker, start="2022-01-01", end="2024-12-31", progress=False)
    r = stock['Close'].pct_change().dropna()
    Xs = np.column_stack([r.values, np.abs(r.values)])
    m2 = hmm.GaussianHMM(3, covariance_type="full", n_iter=100, random_state=42).fit(Xs)
    s = m2.predict(Xs)[-1]
    lbl = {np.argsort(m2.means_[:,0])[0]:"Bear",
           np.argsort(m2.means_[:,0])[1]:"Sideways",
           np.argsort(m2.means_[:,0])[2]:"Bull"}
    regime_output[ticker] = lbl[s]
json.dump(regime_output, open("data/market_regime.json","w"))
```

### Summary: Pyodide Compatibility

| Library | Pyodide | Jalankan di |
|---|---|---|
| ruptures | ✅ **Ya** | Browser atau GitHub Actions |
| stumpy | ❌ (Numba) | GitHub Actions |
| hmmlearn | ❌ (C++) | GitHub Actions |
| arch | ❌ (Cython) | GitHub Actions |

---

## 77. Polars + Apache Arrow — Fast Data Pipeline

> Polars: 5-10x lebih cepat dari pandas. Apache Arrow: zero-copy inter-process data sharing. Kombinasi ini drastis mempercepat GitHub Actions pipeline IDX.

### Install

```bash
pip install polars pyarrow  # polars sudah include arrow internally
```

### Polars — Lazy API untuk 90 JSON Files IDX

```python
import polars as pl
from pathlib import Path

# LAZY — build query plan tanpa eksekusi
# Optimizer hapus kolom tidak perlu, push filter ke reader
result = (
    pl.scan_parquet("data/*.parquet")  # atau scan_ndjson untuk NDJSON
    .filter(pl.col("rsi") < 30)        # oversold screener
    .filter(pl.col("volume") > 1_000_000)
    .with_columns([
        pl.col("close").rolling_mean(20).alias("sma20"),
        (pl.col("close") / pl.col("close").shift(1) - 1).alias("ret_1d"),
    ])
    .select(["ticker","close","sma20","rsi","ret_1d","volume"])
    .sort("volume", descending=True)
    .collect()  # eksekusi di sini — semua paralel
)
result.write_parquet("data/screener_result.parquet", compression="zstd")

# Load 90 JSON files → concat → Parquet (replace pandas loop)
frames = [pl.read_json(f) for f in Path("data/").glob("ds_*.json")]
df = pl.concat(frames)
df.write_parquet("data/idx_master.parquet", compression="zstd")
# Hasil: ~0.9MB vs ~7.2MB JSON (80% lebih kecil, 10x lebih cepat load)

# SQL interface
ctx = pl.SQLContext(stocks=df)
top_volume = ctx.execute("""
    SELECT ticker, AVG(close) avg_price, SUM(volume) total_vol
    FROM stocks WHERE sector = 'Banking'
    GROUP BY ticker ORDER BY total_vol DESC LIMIT 10
""").collect()

# Convert dari yfinance pandas → Polars
import yfinance as yf
bbca_pd = yf.download("BBCA.JK", start="2024-01-01")
bbca_pl = pl.from_pandas(bbca_pd.reset_index())

# Rolling indicators
bbca_pl = bbca_pl.with_columns([
    pl.col("Close").rolling_mean(20).alias("MA20"),
    pl.col("Close").rolling_std(20).alias("Volatility20"),
    pl.col("Close").pct_change().alias("daily_return"),
])
```

### Apache Arrow — Zero-Copy Inter-Step

```python
import pyarrow.feather as feather
import polars as pl

# Step 1: hitung indicators → simpan sebagai Feather (tercepat)
df = pl.read_parquet("data/idx_master.parquet")
feather.write_feather(df.to_arrow(), "cache/indicators.feather")

# Step 2: baca instantly (memory-mapped, zero-copy)
arrow_table = feather.read_table("cache/indicators.feather")
df2 = pl.from_arrow(arrow_table)

# DuckDB + Polars (zero-copy via Arrow)
import duckdb
result = duckdb.sql("SELECT * FROM df WHERE sector = 'Finance'").pl()
```

### Feather vs Parquet — Kapan Pakai Apa

| | Feather | Parquet |
|---|---|---|
| Baca speed | ⚡ Tercepat (memory-mapped) | Cepat |
| File size | Lebih besar (~1× raw) | Kecil (~10× lebih kecil) |
| Gunakan untuk | Interim cache GitHub Actions | Output final, browser delivery |

### Browser: Baca Parquet via parquet-wasm

```html
<script type="module">
import * as arrow from 'https://cdn.jsdelivr.net/npm/apache-arrow@18/+esm';
import { readParquet } from 'https://cdn.jsdelivr.net/npm/parquet-wasm@0.6/esm/arrow2.js';

const resp = await fetch('data/idx_screener.parquet');
const buf  = await resp.arrayBuffer();
const table = arrow.tableFromIPC(readParquet(new Uint8Array(buf)));

// Access columns
const tickers = table.getChild('ticker').toArray();
const closes  = table.getChild('close').toArray();
console.log(`Loaded ${tickers.length} stocks from Parquet`);
</script>
```

> `parquet-wasm` bundle: ~1.2MB brotli compressed. Satu kali load, browser cache.

---

## 78. Cloudflare Edge Stack — Zero-Cost Backend untuk IDX

> Workers + KV + R2 + D1 + Hono. Kombinasi ini memberikan API backend + object storage + edge database tanpa biaya egress, dengan 0ms cold start. **Paling impactful upgrade untuk GitHub Pages + JSON stack.**

### Free Tier (Cloudflare)

| Product | Free Limit |
|---|---|
| Workers | 100,000 requests/hari |
| Workers Paid | $5/bulan → 10M requests |
| KV reads | 100,000/hari |
| KV writes | 1,000/hari |
| D1 rows read | 5 juta/hari |
| D1 rows written | 100,000/hari |
| D1 storage | 5 GB |
| R2 storage | 10 GB-bulan |
| R2 reads | 10 juta ops/bulan |
| R2 egress | **$0 — SELALU GRATIS** |

> R2 = solusi storage terbaik untuk Parquet IDX files. Tidak ada egress fee berbeda dengan S3.

### Arsitektur IDX dengan Cloudflare

```
GitHub Actions (Python + Polars)
  → hasilkan: screener.parquet, idx_master.parquet
  → upload ke R2 via API
  → simpan summary ke D1 (SQLite at edge)
  → cache top_movers ke KV

Browser (index_live.html)
  ← fetch Parquet dari R2 (gratis egress)
  ← query /api/screener dari Worker (baca KV)
  ← query /api/stock/:ticker dari Worker (baca D1)
```

### Hono Worker — IDX API di Edge

```typescript
// worker.ts — deploy dengan: wrangler deploy
import { Hono } from 'hono';
import { cors } from 'hono/cors';

type Env = { IDX_KV: KVNamespace; IDX_D1: D1Database; IDX_R2: R2Bucket };
const app = new Hono<{ Bindings: Env }>();
app.use('*', cors({ origin: 'https://jiakbar.github.io' }));

// Top movers hari ini (cache 5 menit di KV)
app.get('/api/screener', async (c) => {
  const cached = await c.env.IDX_KV.get('top_movers', 'json');
  if (cached) return c.json(cached);

  const { results } = await c.env.IDX_D1.prepare(`
    SELECT ticker, close, pct_1d, volume, rsi14
    FROM idx_daily WHERE date = (SELECT MAX(date) FROM idx_daily)
    ORDER BY ABS(pct_1d) DESC LIMIT 30
  `).all();

  await c.env.IDX_KV.put('top_movers', JSON.stringify(results), { expirationTtl:300 });
  return c.json(results);
});

// Historical OHLCV per saham
app.get('/api/stock/:ticker', async (c) => {
  const ticker = c.req.param('ticker').toUpperCase();
  const period = c.req.query('period') || '1y';
  const days = { '1m':30, '3m':90, '6m':180, '1y':252, '5y':1260 }[period] || 252;

  const { results } = await c.env.IDX_D1.prepare(
    `SELECT date,open,high,low,close,volume FROM idx_daily
     WHERE ticker = ? ORDER BY date DESC LIMIT ?`
  ).bind(ticker, days).all();

  return c.json({ ticker, data: results });
});

// Serve Parquet files dari R2 (gratis egress)
app.get('/data/:filename', async (c) => {
  const obj = await c.env.IDX_R2.get(c.req.param('filename'));
  if (!obj) return c.notFound();
  return new Response(obj.body, {
    headers: {
      'Content-Type': 'application/octet-stream',
      'Cache-Control': 'public, max-age=86400',
      'Access-Control-Allow-Origin': '*'
    }
  });
});

export default app;
```

### GitHub Actions → D1 (Push data setelah pipeline)

```python
import requests, json

def push_to_d1(records: list, table: str, cf_api_key: str, account_id: str, db_id: str):
    """Push screener results ke Cloudflare D1"""
    values = [f"('{r['ticker']}','{r['date']}',{r['close']},{r['pct_1d']},{r['volume']})"
              for r in records]
    sql = f"""
    INSERT OR REPLACE INTO {table} (ticker, date, close, pct_1d, volume)
    VALUES {','.join(values)}
    """
    resp = requests.post(
        f"https://api.cloudflare.com/client/v4/accounts/{account_id}/d1/database/{db_id}/query",
        headers={"Authorization": f"Bearer {cf_api_key}", "Content-Type":"application/json"},
        json={"sql": sql}
    )
    return resp.json()
```

### QuestDB — Time-Series Database (Self-hosted)

Jika butuh minute-level OHLCV untuk LQ45:

```bash
# Docker self-hosted (gratis)
docker run -p 9000:9000 questdb/questdb
```

```sql
-- SQL extensions khusus time-series yang tidak ada di PostgreSQL
SELECT ticker, SAMPLE BY 1h
    FIRST(open) open, MAX(high) high, MIN(low) low, LAST(close) close, SUM(volume) vol
FROM idx_ohlcv
WHERE ts BETWEEN '2025-01-01' AND '2025-06-01'
SAMPLE BY 1h ALIGN TO CALENDAR;

-- Get latest price per ticker (satu baris per saham)
SELECT * FROM idx_ohlcv LATEST ON ts PARTITION BY ticker;
```

```python
# Python query QuestDB (HTTP interface port 9000)
import requests, pandas as pd

r = requests.get("http://localhost:9000/exec",
    params={"query": "SELECT ticker,close FROM idx_ohlcv LATEST ON ts PARTITION BY ticker"},
    timeout=10)
df = pd.DataFrame(r.json()["dataset"], columns=[c["name"] for c in r.json()["columns"]])
```

> QuestDB cloud: tidak ada free tier. Self-hosted (VPS/home server) gratis.

---

## 79. Claude API Advanced — Vision, Streaming, Structured Output, GitHub Actions

### A. Vision untuk Analisis Chart Saham

Claude bisa menganalisis screenshot chart TradingView dan identifikasi pola teknikal.

**Spesifikasi teknis:**
- Max 100 gambar per request, max 10MB per gambar
- Format: JPEG, PNG, GIF, WebP
- Sonnet 4.6: max 1568px, ~1560 tokens/gambar (1080p) = ~$0.005/chart
- Opus 4.7+: HIGH RES mode, max 2576px = ~$0.024/chart

```python
import anthropic, base64

client = anthropic.Anthropic()

with open("bbca_chart.png", "rb") as f:
    img_data = base64.standard_b64encode(f.read()).decode("utf-8")

response = client.messages.create(
    model="claude-opus-4-7",  # high-res untuk detail chart
    max_tokens=2048,
    messages=[{
        "role": "user",
        "content": [
            {"type":"image","source":{"type":"base64","media_type":"image/png","data":img_data}},
            {"type":"text","text":"""Analisis chart BBCA.JK secara teknikal. Identifikasi:
1. Pola chart (head & shoulders, double top/bottom, triangle, flag, dll)
2. Level Support dan Resistance (dalam IDR)
3. Tren saat ini
4. Indikator teknikal yang terlihat (MA, RSI, BB)
5. Rekomendasi singkat
Format: JSON terstruktur."""}
        ]
    }]
)
```

**Tips:** resize ke 1456×819px sebelum kirim ke Sonnet 4.6 — sudah optimal, tidak perlu lebih besar.

### B. Structured Output — Guarantee JSON Schema

```python
# strict: True = grammar-constrained sampling, schema PASTI dipenuhi
screener_tool = {
    "name": "save_screening_results",
    "description": "Save IDX screening results",
    "strict": True,  # kunci
    "input_schema": {
        "type": "object",
        "properties": {
            "screened_at": {"type":"string"},
            "stocks": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "ticker": {"type":"string"},
                        "recommendation": {"type":"string","enum":["BELI","TAHAN","JUAL","NETRAL"]},
                        "confidence_score": {"type":"number","minimum":0,"maximum":100},
                        "pe_ratio": {"type":["number","null"]},
                    },
                    "required": ["ticker","recommendation","confidence_score"],
                    "additionalProperties": False  # WAJIB di strict mode
                }
            }
        },
        "required": ["screened_at","stocks"],
        "additionalProperties": False
    }
}

response = client.messages.create(
    model="claude-haiku-4-5",
    max_tokens=4096,
    tools=[screener_tool],
    tool_choice={"type":"tool","name":"save_screening_results"},  # force tool
    messages=[{"role":"user","content":f"Analisis 5 saham IDX ini: {stock_data_json}"}]
)
tool_call = next(b for b in response.content if b.type == "tool_use")
result = tool_call.input  # selalu valid sesuai schema
```

### C. Streaming SSE ke Dashboard

```python
# FastAPI backend
from fastapi import FastAPI
from fastapi.responses import StreamingResponse
import anthropic, json

app = FastAPI()
client = anthropic.Anthropic()

@app.post("/analyze-stock")
async def analyze_stock(ticker: str):
    def stream():
        with client.messages.stream(
            model="claude-sonnet-4-6", max_tokens=2048,
            system="Analis IDX senior. Jawab dalam Bahasa Indonesia profesional.",
            messages=[{"role":"user","content":f"Analisis fundamental + teknikal {ticker}"}]
        ) as s:
            for text in s.text_stream:
                yield f"data: {json.dumps({'text':text})}\n\n"
            final = s.get_final_message()
            yield f"data: {json.dumps({'done':True,'tokens':final.usage.output_tokens})}\n\n"

    return StreamingResponse(stream(), media_type="text/event-stream",
        headers={"Cache-Control":"no-cache","X-Accel-Buffering":"no"})
```

```javascript
// Frontend: terima stream → tampilkan realtime di dashboard
async function streamAnalysis(ticker) {
    const div = document.getElementById('analysis-output');
    div.innerHTML = 'Menganalisis...';
    let fullText = '';

    const es = new EventSource(`/analyze-stock?ticker=${ticker}`);
    es.onmessage = ({ data }) => {
        const { text, done } = JSON.parse(data);
        if (done) { es.close(); div.innerHTML = marked.parse(fullText); return; }
        fullText += text;
        div.innerHTML = marked.parse(fullText) + '<span>|</span>';
    };
}
```

### D. claude-code-action untuk Auto-Analyze IDX Commits

```yaml
# .github/workflows/idx-auto-analysis.yml
name: IDX Auto Analysis
on:
  push:
    paths: ['data/ds_*.json', 'data/*.parquet']
  schedule:
    - cron: '0 9 * * 1-5'  # 16:05 WIB = 09:05 UTC setiap hari kerja

permissions:
  contents: write
  issues: write

jobs:
  analyze:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          prompt: |
            Data IDX baru telah dipush. Lakukan:
            1. Baca data/ds_*.json terbaru
            2. Identifikasi saham dengan pergerakan > 3% hari ini
            3. Hitung top 10 by volume
            4. Deteksi pola teknikal notable (golden cross, death cross, RSI <30/>70)
            5. Simpan laporan ke reports/daily-$(date +%Y-%m-%d).md
            6. Buat issue baru jika ada sinyal screener kuat (label: screening-alert)
          claude_args: |
            --model claude-sonnet-4-6
            --max-turns 20
```

**Claude Code Action bisa:** baca files repo, jalankan Python scripts, commit files baru, buat issues, comment di PR. Baca `CLAUDE.md` otomatis untuk context project.

---

## 80. Finance MCP Ecosystem + Turso/LibSQL

### MCP Servers untuk Finance IDX

Registry Glama: 2,244+ finance MCP servers tersedia. Yang relevan untuk IDX:

| MCP Server | Provider | Cara Install | IDX Relevance |
|---|---|---|---|
| **alphavantage** | alphavantage.co | `npx @alphavantage/mcp-server` | Stock data, fundamentals IDX |
| **mcp-octagon** | OctagonAI | npm/pip | Real-time investment research |
| **flox-mcp** | FLOX Foundation | pip | 30 tools: backtest, indicators, PnL |
| **OilPriceAPI** | OilpriceAPI | npm | 40+ commodities: emas, minyak |
| **Perplexity Ask** | Perplexity | npx | Search berita IDX real-time |
| **Serper** | Serper | npm | Google search untuk news saham |

```json
// claude_desktop_config.json
{
  "mcpServers": {
    "alphavantage": {
      "command": "npx",
      "args": ["-y", "@alphavantage/mcp-server"],
      "env": { "ALPHAVANTAGE_API_KEY": "YOUR_KEY" }
    }
  }
}
```

**Tidak ada di MCP registry:** Bloomberg Terminal, Refinitiv/LSEG, TradingView — semua proprietary, butuh custom wrapper.

### Buat Custom MCP untuk IDX (FastMCP Python)

```python
# custom_idx_mcp.py
from fastmcp import FastMCP
import yfinance as yf, json

mcp = FastMCP("IDX Market Intelligence")

@mcp.tool()
def get_stock_data(ticker: str, period: str = "1y") -> str:
    """Ambil data OHLCV saham IDX via yfinance"""
    stock = yf.Ticker(ticker)
    hist  = stock.history(period=period)
    info  = stock.info
    return json.dumps({
        "ticker": ticker,
        "current_price": info.get("currentPrice"),
        "pe_ratio": info.get("trailingPE"),
        "market_cap": info.get("marketCap"),
        "ohlcv_5d": hist.tail(5)[["Open","High","Low","Close","Volume"]].to_dict()
    })

@mcp.tool()
def get_ihsg_status() -> str:
    """Status IHSG terkini"""
    ihsg = yf.Ticker("^JKSE")
    data = ihsg.history(period="2d")
    change = (data['Close'].iloc[-1] - data['Close'].iloc[-2]) / data['Close'].iloc[-2] * 100
    return json.dumps({"ihsg": data['Close'].iloc[-1], "change_pct": change})

if __name__ == "__main__":
    mcp.run()
```

### Turso/LibSQL — Edge SQLite (Never Pauses)

```bash
npm install @libsql/client
# turso.tech/pricing: Free = 100 DB, 5 GB, 500M rows/bulan — cukup untuk IDX
```

```typescript
import { createClient } from '@libsql/client';

const db = createClient({
  url: 'file:local.db',              // embedded replica — zero latency reads
  syncUrl: 'libsql://your-db.turso.io',
  authToken: process.env.TURSO_TOKEN,
});

await db.sync();  // pull latest dari Turso cloud

const { rows } = await db.execute(
  'SELECT * FROM idx_daily WHERE ticker = ? ORDER BY date DESC LIMIT 60', ['BBCA']
);
```

**Turso vs Supabase untuk IDX:**

| | Turso | Supabase |
|---|---|---|
| Embedded replicas | ✅ zero-latency reads | ❌ |
| Pausing | ❌ Never pauses | ⚠️ pauses setelah 1 minggu inactive |
| Free rows/bulan | 500 juta | — |
| Auth built-in | ❌ | ✅ |
| Realtime | ❌ | ✅ |
| Terbaik untuk IDX | Read-heavy data layer | Full backend (auth + storage) |

### Tabel Prioritas Lengkap (Section 69–80)

**Tier 1 — Implementasi Sekarang (zero atau minimal cost)**

| Kemampuan | Section | Effort | Impact |
|---|---|---|---|
| Polars ganti pandas di pipeline | §77 | 1 jam | 5-10x faster GitHub Actions |
| Parquet ganti JSON output | §77 | 2 jam | 80% ukuran lebih kecil |
| ag-Grid Community di screener | §72 | 2 jam | 959 saham smooth tanpa lag |
| ECharts ganti Chart.js candlestick | §71 | 3-4 jam | Candlestick native, heatmap, treemap |
| TradingView LWC untuk detail chart | §70 | 2-3 jam | Chart kualitas profesional |
| Stooq sebagai fallback yfinance | §69 | 30 mnt | Resilience data pipeline |
| ruptures di Pyodide | §76 | 1-2 jam | Regime detection di browser |
| BI SOAP untuk USD/IDR | §69 | 1 jam | Makro context gratis |

**Tier 2 — Medium Effort (satu sprint)**

| Kemampuan | Section | Catatan |
|---|---|---|
| Cloudflare R2 untuk Parquet | §78 | $0 egress, replace GitHub Pages serving |
| Cloudflare D1 + Hono Worker | §78 | Edge SQL API, $0-$5/bln |
| QuantStats + pyfolio | §74 | Portfolio analytics via GitHub Actions |
| arch GARCH volatility | §75 | Volatility forecast → JSON |
| backtrader backtesting | §75 | Strategy validation |
| stumpy pattern matching | §76 | "Pola ini mirip kapan?" |
| hmmlearn market regime | §76 | Bull/Bear/Sideways classifier |
| Observable Plot | §73 | PER vs ROE scatter |
| Turso edge SQLite | §80 | Never pauses, 500M rows/bln free |

**Tier 3 — Butuh Setup Lebih**

| Kemampuan | Section | Kebutuhan |
|---|---|---|
| Claude Vision chart analysis | §79 | Anthropic API key, $0.005/chart |
| Claude Streaming SSE | §79 | FastAPI backend |
| claude-code-action auto-analyze | §79 | ANTHROPIC_API_KEY di GitHub Secrets |
| Finance MCP (AlphaVantage, FLOX) | §80 | API keys, npm install |
| Custom IDX MCP | §80 | FastMCP, server atau lokal |
| QuestDB minute OHLCV | §78 | Self-hosted server, real-time data feed |
| Twelve Data real-time | §69 | Paid plan $29/bln |
| TradingView webhooks | §70 | TV paid plan $15/bln |
| ClickHouse | §78 | Skip — overkill dan mahal |


---

## 81. 🏦 Bandarmologi & Foreign Flow — Data "Bandar" IDX

> Kemampuan paling diminta trader IHSG tapi belum ada di dokumen ini. Fokus: konsep + sumber data legal + pola arsitektur (semua butuh backend/cron, tidak ada real-time gratis).

### Konsep inti (untuk dokumentasi & analisis)

| Istilah | Arti |
|---|---|
| **Bandarmologi** | Teknik melacak jejak "bandar" (pemodal besar penggerak harga); retail mengikuti market maker |
| **Broker Summary** | Aksi beli/jual per kode broker. **Akumulasi** = net buy (kumpulkan saham), **Distribusi** = net sell (lepas saham) |
| **Net Vol** | `Vol Buy − Vol Sell`. Positif → akumulasi, negatif → distribusi |
| **Foreign Flow** | Net foreign buy/sell harian. Naik = asing akumulasi, turun = distribusi. Sering jadi trigger harga big-cap |
| **Top 5 / Big 5 broker** | Agregasi 5 broker teratas (bandar tidak transaksi via 1 broker) |

**Kode broker** dikelompokkan 3 warna: lokal (ungu), BUMN (hijau), asing (merah). Contoh: `YP`=Mirae, `AK`=UBS, `BK`=JP Morgan.

### Sumber data (urut dari paling legal/clean)

| Sumber | Akses | Catatan |
|---|---|---|
| **Sectors.app API** | REST | **REKOMENDASI** — IDX-native, endpoint broker & foreign activity, LLM-ready. Tanpa scraping. Ada free tier terbatas |
| **IDX official — Broker Summary** | Web resmi `idx.co.id/.../broker-summary` | Data per saham; statistik "Net Purchase by Foreigners" bulanan. Sering EOD/delayed |
| **Invezgo API** | REST | Punya field foreign flow + broker data |
| **Stockbit Chartbit / Bandar Detector** | App premium | Tool retail paling populer, tapi **scraping melanggar ToS** |
| **Infovesta** | Web | Ranking Top Net Foreign Buy gratis |

### Pola arsitektur (GitHub Pages friendly)

```
GitHub Actions cron (16:00 WIB, tutup pasar)
  → fetch Sectors.app API (broker summary + foreign flow)
  → simpan data/foreign_flow.json + data/broker_summary.json
  → commit ke repo
Frontend statis → fetch JSON → render heatmap akumulasi/distribusi
```

**Caveat:** Tidak ada feed real-time intraday gratis untuk bandarmology. Broker summary resmi IDX delayed/EOD. Untuk produksi pakai API resmi (Sectors.app), jangan scrape Stockbit.

---

## 82. 📐 Derivatif IDX & Backtesting Lanjutan

### Produk derivatif IDX (status 2025)

| Produk | Status | Catatan |
|---|---|---|
| **Single Stock Futures (SSF)** | Resmi Maret 2025; 14 Juli 2025 → **10 saham underlying** | Butuh akun derivatif di AB berlisensi. Likuiditas masih tipis (ratusan kontrak/bulan) |
| **Index Futures** | Tersedia | Juga ada **MSCI Indonesia Futures (FMID)** di Eurex (luar IDX) |
| **Structured Warrant** | Diterbitkan & diperdagangkan di IDX | Beda dari waran biasa (HMETD). Punya knock-out/expiry per issuer |
| **Equity options ritel klasik (call/put)** | ❌ Belum ada | Pasar opsi saham ritel Indonesia praktis nihil |

**Sumber data derivatif:** IDX Derivatives page (spesifikasi), IDX Statistical Publications (EOD), OHLC.dev API (derivatives + structured warrants). Niche, tidak ada feed gratis real-time.

> ⚠️ **Caveat backtest derivatif:** likuiditas SSF rendah → wajib perhitungkan thin liquidity & wide spread. Jangan asumsi fill harga ideal.

### vectorbt — backtesting tervektorisasi cepat (server)

`vectorbt` (Apache 2.0 + Commons Clause) — backtest ribuan kombinasi parameter sekaligus via pandas+NumPy+**Numba**. **Tidak Pyodide-compatible** (Numba) → jalankan di GitHub Actions/server.

```python
# pip install vectorbt  (server / GitHub Actions, BUKAN Pyodide)
import vectorbt as vbt
price = vbt.YFData.download("BBCA.JK").get("Close")
fast = vbt.MA.run(price, 10); slow = vbt.MA.run(price, 30)
entries = fast.ma_crossed_above(slow); exits = fast.ma_crossed_below(slow)
pf = vbt.Portfolio.from_signals(price, entries, exits, fees=0.0029)  # ~0.29% IDX
print(pf.total_return(), pf.sharpe_ratio(), pf.max_drawdown())
```

**Caveat:** Commons Clause = tidak boleh dijual sebagai produk. `vectorbtpro` (berbayar, Rust/PyO3) lebih cepat. Untuk backtest ringan client-side, tetap pakai loop custom + pandas-ta (Pyodide-OK). Biaya transaksi IDX realistis ~0.15–0.29% (beli+jual) — selalu masukkan.

---

## 83. 🔮 ML Forecasting Saham — Matriks Pyodide vs Server

### Library & kompatibilitas

| Library | Model | Pyodide? | Catatan |
|---|---|---|---|
| **scikit-learn** | RandomForest, Ridge, GBR | ✅ Full | Pilihan client-side utama |
| **statsmodels** | ARIMA, cointegration | ✅ | Sudah di §64 |
| **XGBoost** | Gradient boosting | ⚠️ Ada di Pyodide | LightGBM TIDAK |
| **Prophet** (Meta) | Trend/seasonality | ❌ | Butuh cmdstan (C++) → server |
| **NeuralProphet** | Prophet + PyTorch | ❌ | Server |
| **darts** (Unit8) | ARIMA, LSTM, N-BEATS, **TFT**, Transformer; API ala sklearn `fit()/predict()` | ❌ (model DL) | **Library baru worth tahu** — unified TS API |
| **sktime** | Unified TS (forecast+classify) | ⚠️ berat | Praktisnya server |
| **LSTM** (Keras/PyTorch) | Deep RNN | ❌ | Server, tidak praktis di browser |

### Temuan riset IDX (2025)
Studi saham perbankan Indonesia: **ARIMA & XGBoost** robust long-term; **Random Forest & XGBoost** efektif short-term. Hybrid **Prophet–LSTM** populer di literatur.

```python
# Client-side OK (Pyodide): XGBoost + sklearn
import xgboost as xgb
from sklearn.model_selection import TimeSeriesSplit   # WAJIB, bukan random split
model = xgb.XGBRegressor(n_estimators=300, max_depth=4)
# X = fitur lag/teknikal, y = RETURN besok (bukan harga absolut)
```

> ⚠️ **Caveat overfitting (WAJIB di setiap konten ML saham):**
> - Pakai `TimeSeriesSplit`/walk-forward — **jangan** random split (leakage temporal)
> - Hindari look-ahead bias
> - Prediksi **arah/return**, bukan harga absolut (harga ≈ random walk)
> - Masukkan biaya transaksi IDX ~0.29%
> - Jangan klaim akurasi tinggi tanpa validasi out-of-sample

**Pola server:** GitHub Actions cron → train (darts/Prophet/LSTM) → simpan prediksi JSON → frontend tampilkan.

---

## 84. 🇮🇩 Sentiment NLP Bahasa Indonesia — Berita Saham

### Model konkret (semua butuh server — PyTorch/transformers)

| Model | Untuk | Akses |
|---|---|---|
| **`michaelmanurung/finbert-indonesia`** | FinBERT headline finansial **Bahasa Indonesia**, 3-kelas (positif/netral/negatif) | HuggingFace |
| **IndoBERT** (`indobenchmark/indobert-base-p1`) | Sentiment BERT Indonesia, akurasi ~94% polaritas berita finansial | HuggingFace |
| **FinBERT** (`ProsusAI/finbert`) | Sentiment finansial **Bahasa Inggris** (untuk berita IDX berbahasa Inggris) | HuggingFace |

```python
# pip install transformers torch  (SERVER — TIDAK Pyodide)
from transformers import pipeline
clf = pipeline("text-classification", model="michaelmanurung/finbert-indonesia")
clf("Laba bersih BBRI naik 15% melampaui ekspektasi analis")
# -> [{'label': 'positive', 'score': 0.9x}]
```

**Scraping berita** (Kontan, Bisnis.com, IDX Channel, CNBC Indonesia): `trafilatura` (ekstraksi bersih) + `playwright` (situs JS-heavy). Sudah di §50/§65.

> ⚠️ **Caveat:** finbert-indonesia dilatih dataset kecil (~500 headline) → coverage terbatas, bias. Sarkasme & konteks pasar (mis. "rugi menyempit" = positif) sering salah. Untuk demo browser ringan, lexicon kamus positif/negatif murni Python bisa Pyodide-OK tapi akurasi jauh di bawah BERT.

**Pola:** GitHub Actions → scrape berita harian → inferensi sentiment di runner → simpan skor JSON → frontend gabung dengan harga.

---

## 85. 🆕 Claude/Agent/MCP — Update Juni 2026

> Melengkapi §40–47. Diverifikasi dari docs resmi + web search Juni 2026.

### MCP — 5 Building Blocks (2 baru)

| Block | Fungsi |
|---|---|
| Tools | Function calls |
| Resources | Static/dynamic data |
| Prompts | Template prompt reusable |
| **Sampling** (baru) | Server minta LLM completion via `sampling/createMessage` — **tanpa API key server sendiri**. Bisa offer tools dalam sampling. Model preference: `costPriority`/`speedPriority`/`intelligencePriority` |
| **Elicitation** (baru) | Server minta input user mid-operation via `elicitation/create`. **URL Mode** (arahkan ke browser untuk OAuth/payment/API key, aman) + **Form Mode** |

**OAuth 2.1**: MCP server jadi OAuth Resource Server (consume token, bukan issue) → reuse Auth0/Okta, compliance-friendly.

### API features yang melengkapi dokumentasi

| Fitur | Cara pakai | Status |
|---|---|---|
| **Structured Outputs** | `response_format: {type:"json_schema", json_schema:{...}}` — dijamin JSON valid, no parse error | GA semua model |
| **Strict Tool Use** | Validasi parameter tool sebelum call → dijamin valid | GA |
| **Fine-grained tool streaming** | `eager_input_streaming: true` per-tool → stream parameter besar tanpa tunggu full JSON | GA |
| **Token Counting API** | `client.messages.count_tokens(...)` → estimasi sebelum call | GA **GRATIS** |
| **Web Search tool** | Built-in, citations + code execution filtering hasil | GA Apr 2026 |
| **Prompt Caching** | Workspace-level isolation (Feb 2026), cached reads 10% rate, TTL 5mnt→1jam | GA |

**Batch + Prompt Caching stack** = hingga **95% hemat** (Batch 50% + caching 90% cached tokens). Cocok 959 saham screener semalam.

> ⚠️ **Catatan model:** web search melaporkan detail "Fable 5 / Mythos 5" (model ID `claude-fable-5`, angka benchmark/pricing spesifik) — **angka-angka itu belum saya verifikasi penuh**, perlakukan sebagai perlu-cek, bukan fakta pasti. Model string yang pasti dari produk: `claude-opus-4-8`, `claude-sonnet-4-6`, `claude-haiku-4-5-20251001`. Lihat juga §40.

---

## 86. 🎨 Web Dev Modern — Penilaian Jujur untuk Project Vanilla + GitHub Pages

> Riset jujur: "tren bagus ≠ harus dipakai". Dinilai dari sudut DIGILAB (vanilla, no-build, design system CSS-vars, aturan inline SVG).

### ✅ Worth it sekarang (effort kecil, sejalan konvensi)

| Tool | Kenapa | Cara |
|---|---|---|
| **CSS native modern** | Gratis, 0 dependency, sejalan `var(--navy)`. Upgrade terbesar effort terkecil | `:has()` (ganti toggle JS), **container queries** (card responsif tanpa media query global), **nesting** (rapikan CSS) |
| **View Transitions API** | Transisi halaman SPA halus, **0KB**, native | `document.startViewTransition(() => nav(...))` — lengkapi `@keyframes` manual di evo pages |
| **GSAP** | **Kini 100% GRATIS** (semua plugin: ScrollTrigger, SplitText, MorphSVG) sejak Apr 2025 | CDN `<script src=".../gsap.min.js">` — untuk animasi scroll/timeline kompleks |
| **Alpine.js** | Sprinkle reaktivitas via 1 baris CDN (~15KB), buildless, migrasi bertahap | dropdown/modal/tab — ganti `addEventListener` manual yang sudah ada |
| **Lighthouse CI** | Audit performa/SEO/a11y otomatis tiap push, sejalan aturan mobile responsive | GitHub Action |
| **Playwright (selektif)** | 5–10 test flow kritis (login/search/switch) → tangkap regresi (bug truncation/double-toggle yang berulang) | — |

### ❌ Overkill / melawan konvensi (lewati untuk project ini)

| Tool | Alasan |
|---|---|
| Astro, Svelte 5, SolidJS | Butuh build + rewrite total. Astro baru worth it jika jadi situs konten besar |
| HTMX | Butuh server return HTML — tidak cocok static GitHub Pages |
| **Tailwind v4 / UnoCSS** | **Melawan aturan project** (CSS-vars wajib, no hardcode hex). Mengubah seluruh markup jadi utility class |
| Three.js / R3F / Babylon | Tidak ada use-case 3D di repositori karya |
| visx / Nivo / Tremor | React-only. D3 + ECharts yang sudah dipakai sudah optimal |
| Vite/Bun/Turbopack | Tetap no-build selama vanilla. Jika butuh → langsung Vite 8 (+Rolldown) |
| TanStack Query / Zustand / Jotai | `api-service.js` (try/catch + fallback) sudah benar. Jika state vanilla rumit → **Nanostores** (agnostik), bukan ini |
| shadcn / Radix / Headless UI / daisyUI | React/Tailwind. Komponen vanilla custom DIGILAB sudah jadi & konsisten. Ambil hanya prinsip a11y manual |

**3 langkah berdampak tertinggi untuk DIGILAB:** (1) CSS native `:has()`/container queries/nesting, (2) View Transitions API di `nav()`, (3) Lighthouse CI + sedikit Playwright.

---

## 87. 🧠 AI/RAG & Vector Search — untuk DIGILAB (Supabase)

> Relevan untuk fitur search semantik karya ilmiah & RAG berita saham. Semua disesuaikan dengan stack Supabase + GitHub Pages.

### Vector DB — pgvector (Supabase) = pilihan terbaik

Karena sudah eksplorasi Supabase, vector search = 1 kolom tambahan di Postgres. Termurah di semua skala < 50 juta vektor.

```sql
create extension if not exists vector;
create table dokumen (
  id bigserial primary key,
  konten text,
  embedding vector(1536)            -- OpenAI text-embedding-3-small
);
create index on dokumen using hnsw (embedding vector_cosine_ops);
-- cari 5 dokumen termirip:
select konten, 1 - (embedding <=> :q) as similarity
from dokumen order by embedding <=> :q limit 5;
```

### Embedding models

| Model | Catatan |
|---|---|
| OpenAI `text-embedding-3-small` | Default praktis, $0.02/1M, Matryoshka (potong dim untuk hemat storage) |
| **Voyage `voyage-finance-2`** | **Khusus keuangan** — relevan untuk RAG berita saham. `voyage-3-large` skor MTEB retrieval tertinggi |
| Cohere Embed v3 | +15–20% di non-Latin (bagus untuk teks Indonesia). Wajib bedakan query vs document |
| **Transformers.js (BGE/Stella)** | **GRATIS, jalan di browser via WebGPU** — embedding di GitHub Pages tanpa biaya API |

### RAG — mulai sederhana

- **Context window 1M token sering menghapus kebutuhan RAG.** Untuk dokumen tunggal (laporan keuangan, prospektus), masukkan seluruh teks ke context. (§63)
- **Contextual Retrieval** (teknik Anthropic): prepend 1 kalimat konteks ke tiap chunk pakai LLM sebelum embed → naikkan akurasi retrieval. Stack dengan Prompt Caching agar murah.
- Framework hanya jika perlu: **LlamaIndex** (pure RAG, overhead terkecil) > LangChain (agent kompleks, overhead lebih besar). Hindari migrasi antar-framework.

### Frontend AI chat — Vercel AI SDK 5

`useChat` hook kelola state streaming. **Tapi butuh API route server-side** untuk simpan API key.

> ⚠️ **GitHub Pages = static, tidak bisa server-side.** API key AI **wajib** di **Supabase Edge Function** (atau deploy ke Vercel), **jangan** di frontend statis. Frontend fetch ke Edge Function.

### Local LLM (dev gratis)

- **Ollama** — LLM lokal, API kompatibel OpenAI (`localhost:11434/v1`), hemat biaya saat coding.
- **Transformers.js / WebLLM** — LLM di browser via WebGPU, tanpa server/biaya, cocok GitHub Pages untuk fitur AI ringan (model 1–3B, download awal besar).

---

## 88. 🛠️ Data Engineering & Realtime — Pipeline Saham IDX

### DuckDB httpfs — query Parquet remote parsial

Baca Parquet remote tanpa download penuh (HTTP range request + metadata Parquet → hanya bagian yang diperlukan).

```sql
INSTALL httpfs; LOAD httpfs;
SELECT ticker, close FROM read_parquet('https://r2.example.com/idx/2026.parquet')
WHERE ticker = 'BBCA' AND date > '2026-01-01';
```

Update 2025: extension **`cache_httpfs`** (cache object storage berulang, pakai bloom filter Parquet). 

> ⚠️ **httpfs TIDAK tersedia di DuckDB-Wasm standar** (browser tidak bisa akses S3 langsung). Workaround GitHub Pages: fetch Parquet via JS `fetch()` → register manual ke DuckDB-Wasm → query in-browser (dashboard tanpa backend).

### Polars — lazy + streaming

```python
import polars as pl
df = (pl.scan_parquet("data/idx/*.parquet")        # lazy, tidak muat semua ke RAM
        .filter(pl.col("ticker") == "BBCA")
        .group_by("date").agg(pl.col("close").mean())
        .collect(streaming=True))                    # proses data > RAM
```

**Tren 2026:** workflow **DuckDB (prep SQL) + Polars (intermediate cepat) + pandas (analisis akhir)** via Arrow zero-copy.

**Orkestrasi:** GitHub Actions cron + DuckDB/Polars **sudah cukup** untuk trader individu. Dagster (asset-first, lineage) / Prefect (Python-first) baru worth it kalau pipeline tumbuh kompleks. Jangan over-engineer di awal.

### Supabase Realtime — dashboard live dari frontend statis

```js
// Update chart saat harga saham baru masuk DB
supabase.channel('harga-saham')
  .on('postgres_changes',
      { event:'INSERT', schema:'public', table:'harga' },
      (payload) => updateChart(payload.new))
  .subscribe();
```

3 mode: **Postgres Changes** (subscribe INSERT/UPDATE/DELETE), **Broadcast** (pesan ephemeral low-latency), **Presence** (siapa online). Jalan dari frontend statis pakai anon key — **tidak butuh server sendiri**. Untuk offline-first → **PowerSync** (sync Postgres ↔ SQLite).

### Scraping berita (LLM-ready)

| Tool | Untuk |
|---|---|
| **Playwright + trafilatura** (sudah di stack) | Gratis: render JS-heavy + ekstrak teks bersih |
| **Firecrawl** | Web → **markdown bersih siap-LLM** (untuk RAG). Ada MCP server. Free tier + berbayar |
| **Scrapy** | Volume tinggi static HTML (100+ hal/detik) |

**Pola produksi 2026:** Firecrawl untuk ad-hoc agent fetch + Playwright/Scrapy untuk heavy lifting, orkestrasi GitHub Actions cron.

---

## 89. 🕷️ Scraping Data IDX (idx.co.id) — Endpoint Internal & Bypass

> ⭐ Kemampuan inti untuk pipeline data emiten IHSG otomatis. Endpoint di bawah **diverifikasi dari source code repo aktif** (`nichsedge/idx-bei`, `NeaByteLab/IDX-API`), bukan tebakan.

### Cara kerja: SPA + REST API JSON internal

Website idx.co.id memanggil REST API JSON internal di balik layar. Base URL modern: **`https://www.idx.co.id/primary`** (semua respons JSON). Tidak perlu render HTML — langsung hit endpoint.

### Peta endpoint `/primary/...`

| Data | Endpoint | Param |
|---|---|---|
| **Daftar emiten (~900)** | `/ListedCompany/GetCompanyProfiles` | `?start=0&length=9999` |
| Detail profil emiten | `/ListedCompany/GetCompanyProfilesDetail` | `?KodeEmiten=BBCA&language=id-id` |
| Master securities (kode+board+shares) | `/ListedCompany/GetSecuritiesStock` | `?start=0&length=9999` |
| **Laporan keuangan (metadata+link XBRL)** | `/ListedCompany/GetFinancialReport` | `?year=2024&periode=audit&kodeEmiten=BBCA` (periode: tw1/tw2/tw3/audit) |
| Rasio keuangan (PER/PBV/ROE/DER) | `/DigitalStatistic/GetApiDataPaginated` | `?urlName=LINK_FINANCIAL_DATA_RATIO&periodYear=2024&periodQuarter=4` |
| Pengumuman emiten | `/ListedCompany/GetAnnouncement` | `?indexFrom=0&pageSize=9999&emitenType=*` |
| **Stock summary harian (SEMUA saham, OHLC+foreign)** | `/TradingSummary/GetStockSummary` | `?date=20260615` (YYYYMMDD) |
| **Broker summary (se-pasar, ⚠️ lihat §92)** | `/TradingSummary/GetBrokerSummary` | `?date=20260615&start=0&length=9999` |
| Master kode broker | `/ExchangeMember/GetBrokerSearch` | `?start=0&length=9999` |
| Index summary harian | `/TradingSummary/GetIndexSummary` | `?date=20260615` |
| Histori harga 1 saham | `/ListedCompany/GetTradingInfoSS` | `?code=BBCA&start=0&length=1000` |
| **Daftar indeks (IHSG, LQ45) realtime** | `/home/GetIndexList` | — |
| Chart indeks | `/helper/GetIndexChart` | `?indexCode=COMPOSITE&period=1Y` |
| Kalender pasar (RUPS/events) | `/Home/GetCalendar` | `?range=m&date=20260615` |
| Dividen / split / IPO | `/DigitalStatistic/GetApiData` | `urlName=...` + `query=<base64 JSON>` |

**Field emas `GetStockSummary`** (per saham/hari): `StockCode, OpenPrice, High, Low, Close, Volume, Value, Frequency, ForeignBuy, ForeignSell, ...`.
→ **`ForeignBuy − ForeignSell` = net foreign per saham harian** (inti bandarmologi §81).

Pola `DigitalStatistic` sering pakai param `query` = JSON di-base64:
```python
import base64, json
q = base64.b64encode(json.dumps({"year":"2026","month":"6"}).encode()).decode()
url = f"https://www.idx.co.id/primary/DigitalStatistic/GetApiData?urlName=LINK_TABLE_DAILY_TRADING_INVESTOR_FOREIGN&query={q}&isPrint=False"
```

### Bypass Cloudflare: `curl_cffi` (kunci utama)

idx.co.id pakai Cloudflare → `requests` biasa kena **403**. Solusi terbukti: **`curl_cffi` dengan `impersonate="chrome"`** (meniru TLS/JA3 fingerprint Chrome asli). **Tidak perlu Selenium/Playwright** — ambil semua emiten dalam menit, bukan jam (Selenium ExRonin butuh 3–4 jam).

```python
# pip install curl_cffi pandas
from curl_cffi import requests
import time, pandas as pd

BASE = "https://www.idx.co.id/primary"
H = {"accept": "application/json, text/plain, */*",
     "Referer": "https://www.idx.co.id/id/data-pasar/ringkasan-perdagangan/ringkasan-saham"}

def get(url):
    r = requests.get(url, headers=H, impersonate="chrome", timeout=30)  # ← bypass CF
    if r.status_code == 429:
        time.sleep(30); return get(url)
    r.raise_for_status(); return r.json()

companies = get(f"{BASE}/ListedCompany/GetCompanyProfiles?start=0&length=9999")["data"]
ss = get(f"{BASE}/TradingSummary/GetStockSummary?date=20260615")["data"]
df = pd.DataFrame(ss); df["NetForeign"] = df["ForeignBuy"] - df["ForeignSell"]
df.to_parquet("stock_summary.parquet")
time.sleep(1)   # rate limit sopan
```

**Catatan teknis:** `Referer` header sering wajib. `curl_cffi` tidak eksekusi JS → gagal kalau CF pasang challenge keras (sejauh ini endpoint JSON IDX aman). `cloudscraper` **usang, jangan pakai**. Fallback berat: `undetected-chromedriver` / Playwright stealth.

### Repo referensi aktif

| Repo | Catatan |
|---|---|
| **`nichsedge/idx-bei`** | TERBAIK — Python + curl_cffi, endpoint `/primary/` paling lengkap & modern |
| **`NeaByteLab/IDX-API`** | TS/Deno, katalog endpoint paling komprehensif (USAGE.md) + IDX-UI dashboard |
| `Rachdyan/idx_financial_report` | Download + parse XBRL laporan keuangan → Excel |
| `noczero/idx-fundamental-analysis` | IDX + Stockbit + yfinance → Sheets |

### Legal / ToS (KRITIS)

**Syarat Penggunaan IDX No. 5:** dilarang menggunakan/menyebarluaskan info untuk **tujuan komersial** tanpa izin tertulis IDX.
- Personal / riset / belajar / dashboard non-publik → ditoleransi.
- Produk komersial / redistribusi publik → **WAJIB** izin IDX atau langganan **IDX Data Services** / **Sectors.app API**.
- Endpoint `/primary/` = undocumented internal API → bisa berubah/diblokir sewaktu-waktu.
- Rate limit sopan: delay 1 detik/request, `CONCURRENCY_LIMIT=5`, sleep 30 dtk saat 429. Cantumkan atribusi "Bursa Efek Indonesia (IDX)".

> **Keputusan project:** untuk DIGILAB/IDX dashboard pribadi → scrape `/primary/` via curl_cffi (gratis). Jika nanti komersial → ganti ke **Sectors.app API** (sudah ditetapkan jalur legal di CLAUDE.md).

---

## 90. ⚙️ Otomasi Pipeline IDX — GitHub Actions Cron (Tanpa Server)

> Menjalankan scraping IDX terjadwal otomatis, gratis, hasil ke frontend GitHub Pages.

### Timezone: cron GitHub = UTC, pasar IDX = WIB (UTC+7)

Rumus: `jam_UTC = (jam_WIB + 24 − 7) % 24`.

| Event IDX (WIB) | Cron UTC |
|---|---|
| Buka 09:00 | `0 2 * * 1-5` |
| **Tutup 16:00** | `0 9 * * 1-5` |
| EOD + buffer 16:15 | `15 9 * * 1-5` |

> Update 2026: GitHub mendukung field `timezone: "Asia/Jakarta"` di schedule, tapi konversi UTC eksplisit lebih portabel.

### Caveat WAJIB diingat

- **Delay 3–30 menit** — terburuk di menit-0 (top of hour, antrian global). Mitigasi: pakai menit non-bulat (`15 9` bukan `0 9`) + buffer setelah close.
- Interval minimum 5 menit. Bisa di-skip saat load tinggi.
- **Repo nonaktif otomatis setelah 60 hari** tanpa commit → tambah keep-alive workflow (`gautamkrishnar/keepalive-workflow`).
- **IP datacenter GitHub sering diblokir** situs finansial → utamakan curl_cffi; residential proxy hanya bila perlu.

### Penyimpanan hasil (4 opsi, bisa dikombinasi)

| Opsi | Biaya | Untuk |
|---|---|---|
| **Commit JSON ke repo** | Gratis | Data kecil; frontend Pages langsung `fetch('./data/latest.json')` |
| **Cloudflare R2** | Gratis 10GB, **$0 egress** | Parquet besar (histori 959 saham) |
| **Supabase upsert** | Gratis tier | Data relasional + query + Realtime |
| GitHub Releases | Gratis | Dataset besar berversi tanpa membengkak git history |

### Idempotency (anti-duplikat)
- Nama file deterministik per tanggal (`eod/2026-06-16.json`) → re-run menimpa.
- DB: PK komposit `(ticker, date)` + UPSERT `Prefer: resolution=merge-duplicates` (Supabase).

### Workflow lengkap (scrape close → commit + upsert Supabase + Telegram)

```yaml
# .github/workflows/scrape-idx-eod.yml
name: Scrape IDX EOD
on:
  schedule:
    - cron: '15 9 * * 1-5'   # 16:15 WIB (buffer setelah close)
  workflow_dispatch:          # tombol manual uji coba
permissions:
  contents: write             # agar GITHUB_TOKEN bisa commit
concurrency: { group: scrape-idx-eod, cancel-in-progress: false }
jobs:
  scrape:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5
      - uses: actions/setup-python@v5
        with: { python-version: '3.12', cache: 'pip', cache-dependency-path: requirements.txt }
      - run: pip install -r requirements.txt
      - name: Scrape & transform
        env: { TZ: Asia/Jakarta }
        run: python scripts/scrape_idx.py     # tulis data/idx_eod_YYYY-MM-DD.json + latest.json
      - name: Upsert Supabase
        env:
          SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
          SUPABASE_SERVICE_KEY: ${{ secrets.SUPABASE_SERVICE_KEY }}
        run: python scripts/push_supabase.py
      - uses: stefanzweifel/git-auto-commit-action@v7
        with:
          commit_message: 'chore(data): IDX EOD ${{ github.run_number }}'
          file_pattern: 'data/*.json'
      - name: Notifikasi Telegram bila GAGAL
        if: failure()
        run: |
          curl -s -X POST "https://api.telegram.org/bot${{ secrets.TG_BOT_TOKEN }}/sendMessage" \
            -d chat_id="${{ secrets.TG_CHAT_ID }}" \
            -d text="❌ Scrape IDX GAGAL run #${{ github.run_number }} — ${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}"
```

`scripts/push_supabase.py` (UPSERT idempoten):
```python
import os, json, requests
rows = json.load(open("data/latest.json"))
r = requests.post(f"{os.environ['SUPABASE_URL']}/rest/v1/idx_eod",
  headers={"apikey": os.environ["SUPABASE_SERVICE_KEY"],
           "Authorization": f"Bearer {os.environ['SUPABASE_SERVICE_KEY']}",
           "Content-Type": "application/json",
           "Prefer": "resolution=merge-duplicates"},   # UPSERT PK (ticker,date)
  json=rows, timeout=30)
r.raise_for_status()
```

`requirements.txt`: `curl_cffi>=0.7`, `requests>=2.32`, `pandas>=2.2`.
**Frontend** tinggal `fetch('./data/latest.json')`, atau supabase-js + Realtime untuk live update.

### Alternatif platform cron

| Platform | Kelebihan | Kekurangan untuk IDX |
|---|---|---|
| **GitHub Actions** | Gratis, git built-in, Python/Playwright berat OK | Delay 3–30 mnt, IP diblokir, nonaktif 60 hari |
| **Cloudflare Workers Cron** | Presisi lebih baik, $0 egress R2 | CPU 10ms, sulit Python/Playwright berat |
| **Supabase pg_cron + Edge Function** | 1 ekosistem dengan DB | Deno (bukan Python), scraping berat kurang cocok |
| Vercel Cron | Mudah jika sudah Vercel | Free tier 1×/hari, timeout pendek |

> **Pilihan:** scraping Python berat → **GitHub Actions**. Fetch API ringan presisi → **Cloudflare Workers**. DB-sentris → **Supabase pg_cron**.

---

## 91. 🚀 Arah Web Developer 2026 — Edge, Realtime, TypeScript

> Arah pengembangan untuk membangun & menyajikan dashboard data IDX. Stack vanilla+GitHub Pages+Supabase.

### Serverless/Edge gratis (karena GitHub Pages static)

| Platform | Free tier | Untuk |
|---|---|---|
| **Cloudflare Workers** | 100k req/hari, 10ms CPU, **5 Cron Triggers** | **Proxy API IDX + sembunyikan API key + cron ringan + cache** |
| **Supabase Edge Functions** (Deno/TS) | 500k invocation/bln | Logic dekat DB, **API key Claude WAJIB di sini** (bukan frontend) |
| Vercel/Netlify Functions | Ada (Vercel Hobby non-komersial saja) | Overkill kecuali pindah Next.js |

```js
// Cloudflare Worker — proxy + cache API IDX, sembunyikan key
export default {
  async fetch(req, env, ctx) {
    const cache = caches.default;
    let res = await cache.match(req); if (res) return res;
    const up = await fetch(`https://api.sectors.app/v1/idx?key=${env.SECTORS_KEY}`);
    res = new Response(await up.text(), {
      headers: {'content-type':'application/json','cache-control':'public, max-age=300','access-control-allow-origin':'*'}});
    ctx.waitUntil(cache.put(req, res.clone())); return res;
  },
  async scheduled(e, env, ctx) { ctx.waitUntil(jalankanScreener(env)); }  // Cron Trigger
};
// wrangler.toml → [triggers] crons = ["5 2 * * 1-5"]  # 09:05 WIB
```

### Realtime push ke dashboard

Harga saham = data 1-arah (server→client) → **SSE menang** (lebih simpel dari WebSocket, reconnect otomatis via `EventSource`).

| Metode | Untuk |
|---|---|
| **Polling 10–15 dtk** | **Mulai dari sini** — data IDX gratis delay 15 mnt, realtime detik tidak relevan |
| **SSE** | Ticker harga, notifikasi (rekomendasi jika perlu push) |
| Supabase Realtime | Free 200 koneksi, 2jt pesan/bln — subscribe tabel harga dari frontend statis |
| WebSocket / Durable Objects | Overkill untuk dashboard ritel |

### Caching data
- File ber-tanggal (`idx-2026-06-16.json`) → `Cache-Control: immutable` (cache selamanya).
- `latest.json` → `max-age=300, stale-while-revalidate=600`.
- File besar: **R2 ($0 egress)** atau jsDelivr (CDN gratis untuk file repo GitHub). Hindari limit bandwidth GitHub Pages.

### Skill lompatan — TypeScript + Zod (prioritas #1)

- **TypeScript**: type system cegah bug sebelum runtime, default industri 2026, Edge Functions TS-first. Mulai `// @ts-check` + JSDoc → migrasi `.ts` bertahap.
- **Zod**: validasi runtime (TS hanya compile-time). Data API IDX dari internet bisa "sampah" → validasi.

```ts
import { z } from 'zod';
const Saham = z.object({ kode: z.string().length(4), harga: z.number().positive() });
type Saham = z.infer<typeof Saham>;
const data = Saham.parse(await res.json());  // throw kalau API kirim sampah
```

### Observability gratis
**UptimeRobot** (50 monitor/5mnt — pastikan cron jalan) + **Sentry** free (5k error/bln) + **Cloudflare Web Analytics** (gratis, no-cookie, tapi retensi 30 hari & sampel 10%). `cron-job.org` bisa jadi pemicu cron eksternal.

### Visualisasi
**TradingView Lightweight Charts v5** (candlestick real-time, ~35KB, wajib attribution) + **ECharts** (analitik: heatmap sektor, treemap, scatter). Keduanya coexist. Chart.js cukup untuk chart simpel.

### PWA dashboard
Service Worker offline cache + install homescreen = **worth it, mudah**. Push alert harga (VAPID) = worth it tapi effort medium (iOS 16.4+ hanya jika app di-install). Background Sync = skip (dukungan belum matang).

> **3 langkah konkret berikutnya:** (1) Deploy 1 Cloudflare Worker proxy IDX + cron screener. (2) Migrasi bertahap data-handling ke TypeScript + Zod. (3) Pasang UptimeRobot + Cloudflare Web Analytics (5 menit).

---

## 92. 🧮 Broker Summary IDX — Sumber, Struktur & Cara Membentuk

> ⚠️ **Koreksi penting untuk §89:** endpoint gratis `GetBrokerSummary` BUKAN broker summary per-saham ala RTI/Stockbit. Baca section ini sebelum mengandalkannya.

### Fakta kunci: dua hal yang sering dikira sama

| | Broker summary **se-pasar** (gratis IDX) | Broker summary **per saham** (ala RTI/Stockbit/IPOT) |
|---|---|---|
| Isi | Total `Value`/`Volume`/`Frequency` per broker, 1 hari, **gabungan beli+jual** | Beli & jual per broker untuk SATU emiten + avg price |
| Endpoint | `/primary/TradingSummary/GetBrokerSummary?date=&start=&length=` | ❌ tidak ada di endpoint publik gratis |
| Filter per saham? | **TIDAK** (param hanya `date,start,length`) | Ya |
| Split beli/jual? | **TIDAK** | Ya |
| Sumber | IDX `/primary/` gratis | IDX Data Services (lisensi) / Sectors.app / terminal broker |

**Kesimpulan:** broksum per-saham (inti bandarmologi) **tidak bisa dibentuk dari endpoint gratis IDX saja** — butuh data transaksi level-broker (kode broker pembeli & penjual tiap matched trade) yang tidak diekspos gratis. RTI/Stockbit/IPOT bisa menampilkannya karena menerima **feed resmi IDX** (vendor berlisensi / Anggota Bursa).

> ✅ **Verifikasi (kasus tradersaham.com):** situs ini menampilkan broksum per-saham PENUH (buy/sell per kode broker + avg price + net lot harian + accum/dist tracking — diverifikasi langsung via inspeksi browser, saham AADI). Endpoint mereka `apiv2.tradersaham.com/api/market-insight/broker-profiler?stock_code=...&board=R`. Tapi ini **bukan bukti broksum per-saham gratis dari IDX** — tradersaham mengaksesnya via jalur berlisensi (IDX Data Services Data Vendor / kemitraan sekuritas). Konfirmasi dari source code wrapper (`NeaByteLab/IDX-API`): endpoint gratis `GetBrokerSummary` **tidak punya** parameter kode saham → secara struktural memang se-pasar saja.
>
> 📅 **Fakta penting:** sejak **6 Desember 2021** BEI menutup kode broker selama jam perdagangan → broksum per-saham hanya tampil **EOD** (setelah tutup), tidak lagi intraday/real-time untuk ritel ("non-disclosed intraday vs disclosed EOD").
>
> 💡 **Yang TETAP gratis & menutup sebagian bandarmologi:** `GetStockSummary` (net foreign per saham, §89) + data **kepemilikan KSEI** (§93) — keduanya legal & gratis.

### Endpoint `GetBrokerSummary` (se-pasar) — struktur respons

```
https://www.idx.co.id/primary/TradingSummary/GetBrokerSummary?length=9999&start=0&date=20240220
```
Param: `date` (YYYYMMDD, wajib), `start` (default 0), `length` (default 9999). **Tidak ada** param `code`/`kodeEmiten`.

```json
{ "recordsTotal": 110, "data": [
  { "Date":"2024-02-20T00:00:00", "IDFirm":"YP", "FirmName":"Mirae Asset Sekuritas Indonesia",
    "Value":1850000000000, "Volume":950000000, "Frequency":145000 } ] }
```
Field: `IDFirm` (kode broker 2-huruf), `FirmName`, `Value`/`Volume`/`Frequency` (total gabungan 2 sisi). Tidak ada avg price / split beli-jual.

### Master kode broker — `GetBrokerSearch`

```
https://www.idx.co.id/primary/ExchangeMember/GetBrokerSearch?start=0&length=9999
```
Respons: `Code` (2-huruf), `Name`, `License` (PPE/PEE). **Selalu re-fetch, jangan hardcode** (kode berubah karena merger/cabut izin).

**Broker asing** (paling diawasi): `YP` Mirae, `AK` UBS, `BK` JP Morgan, `ZP` Maybank, `YU` CGS, `RX` Macquarie, `KZ` CLSA, `DP` DBS, `DR` RHB, `AI` UOB, `KK` Phillip, `TP` OCBC.
**Lokal/BUMN**: `CC` Mandiri, `NI` BNI, `OD` BRI Danareksa, `DX` Bahana, `PD` Indo Premier, `LG` Trimegah, `XL` Stockbit, `XC` Ajaib.

### Sumber broker summary per saham (yang sebenarnya dipakai trader)

| Sumber | Status | Catatan |
|---|---|---|
| **Sectors.app "Badarmology" API (v2)** | ✅ Legal, berbayar | Jalur resmi broksum per-saham + foreign flow. v1 sudah 410 Gone (2026-05-11) → pakai v2 |
| **IDX Data Services** | ✅ Legal, lisensi B2B | Feed resmi lengkap (real-time/EOD) |
| Terminal broker (IPOT, dll) | ✅ Untuk nasabah | Anggota Bursa dapat feed resmi |
| Stockbit / RTI Business | ⚠️ Scraping langgar ToS | Tampilkan broksum per-saham, tapi tanpa API publik |

### Cara MEMBENTUK broker summary (jika punya data level-broker)

Inti = **group-by per kode broker**:
```
BuyVol(b)  = Σ volume trade di mana b = pembeli
BuyValue(b)= Σ (harga × volume) beli oleh b
SellVol(b) = Σ volume trade di mana b = penjual
SellValue(b)= Σ (harga × volume) jual oleh b
BuyAvg(b)  = BuyValue(b) / (BuyVol(b) × 100)     # value-weighted; 1 lot = 100 lembar
NetVol(b)  = BuyVol(b) − SellVol(b)              # >0 Akumulasi, <0 Distribusi
```

Snippet pandas (bentuk broksum + top buyer/seller + net foreign):
```python
import pandas as pd
FOREIGN = {'YP','AK','BK','KZ','ZP','YU','DP','RX','AI','KK','TP','DR','AG','AH','BQ'}
# data: per broker per hari (volume = lot, value = Rp), kolom buy/sell sudah teragregasi
df['buy_avg']  = (df.buy_val  / (df.buy_lot  * 100)).round(0)
df['net_lot']  = df.buy_lot - df.sell_lot
df['posisi']   = df.net_lot.apply(lambda x: 'Akumulasi' if x>0 else 'Distribusi')
buyer  = df[df.net_lot>0].sort_values('net_val', ascending=False)   # sisi kiri
seller = df[df.net_lot<0].sort_values('net_val')                    # sisi kanan
top5_buyer, top5_seller = buyer.head(5), seller.head(5)
big5_acc = buyer.head(5).net_lot.sum()                              # konsentrasi bandar
df['is_foreign'] = df.broker.isin(FOREIGN)
net_foreign = df.loc[df.is_foreign,'net_lot'].sum()                 # net foreign
```

**Rolling net N-hari** (pola multi-hari lebih bermakna):
```python
rolling = (df_daily.pivot_table(index='tanggal', columns='broker', values='net_lot', aggfunc='sum')
           .fillna(0).rolling(5).sum())
akumulator_5h = rolling.iloc[-1].sort_values(ascending=False).head(5)
```

### Metrik turunan & interpretasi

- **Top 5 buyer/seller**, **Big 5 aggregate** (konsentrasi akumulasi), **Net Foreign** (Σ broker asing), **avg price bandar** (≈ support psikologis), **dominasi** (net broker teratas ÷ total volume).
- Akumulasi di harga rendah/stagnan → bias bullish; distribusi saat sideways/naik → bias bearish. Padukan dengan foreign flow + support/resistance + RSI/MACD + fundamental.

> ⚠️ **Caveat wajib:** broker hanya perantara (bukan pemilik); ada **nominee account** (jejak terpecah), **cross-trade/afiliasi**, **wash trading** ("cuci piring"), buyback/rights issue. Data EOD & sering delay → **bukan sinyal prediktif tunggal**, mudah dimanipulasi di saham gorengan. Broksum = alat konfirmasi, bukan trigger beli/jual sendirian.

**Sumber:** `NeaByteLab/IDX-API` (`src/Trading`, `src/Participants`), `nichsedge/idx-bei`, [docs.sectors.app](https://docs.sectors.app/), [IDX broker-summary](https://www.idx.co.id/en/market-data/trading-summary/broker-summary), [Stockbit Bandar Detector](https://help.stockbit.com/id/article/bandar-detector-bagaimana-cara-menggunakan-dan-apa-fungsinya-gocgkc/), [InvestasiKu — 88 kode broker](https://www.investasiku.id/eduvest/saham/daftar-kode-broker-saham-indonesia), [SahamU — broker asing](https://sahamu.com/kode-broker-saham-asing-patungan-di-idx/).

---

## 93. 🏛️ Data Kepemilikan KSEI — Foreign Flow & Ownership GRATIS per Saham

> ⭐ Sumber data **legal, gratis, tanpa Cloudflare, tanpa login** untuk komposisi kepemilikan & foreign flow per emiten. Inilah yang menggerakkan fitur ownership/foreign-flow situs seperti tradersaham.com. File aslinya sudah diunduh & diverifikasi.

### File inti: Balance Position (Kepemilikan Efek)

```
https://web.ksei.co.id/Download/BalanceposEfek{YYYYMMDD}.zip
# contoh: .../BalanceposEfek20260529.zip  (snapshot 29 Mei 2026)
```
Halaman arsip (daftar URL aktual per tahun): `https://web.ksei.co.id/archive_download/holding_composition`
Master saham: `https://web.ksei.co.id/archive_download/master_securities`

- **Format:** ZIP → 1 file TXT **pipe-delimited** (`|`), 25 kolom, **PER EFEK** (semua emiten dalam 1 file).
- **Cakupan:** filter `Type == EQUITY` (~1.000 saham). Tipe lain: CORPORATE BOND, SUKUK, GOVERNMENT BOND, MUTUAL FUND, STRUCTURED WARRANT, dll.
- **Angka = jumlah unit/lembar efek** (bukan rupiah). Nilai Rp ≈ kolom × `Price`.

**Struktur kolom:**
```
Date | Code | Type | Sec.Num | Price |
Local IS|Local CP|Local PF|Local IB|Local ID|Local MF|Local SC|Local FD|Local OT| Total(Local) |
Foreign IS|Foreign CP|Foreign PF|Foreign IB|Foreign ID|Foreign MF|Foreign SC|Foreign FD|Foreign OT| Total(Foreign)
```

### Kode tipe investor (resmi SE KSEI No. SE-0001/DIR-EKS/KSEI/1118)

| Kode | Arti | Kode | Arti |
|---|---|---|---|
| **ID** | Individual (perorangan) | **SC** | Securities Company (sekuritas) |
| **CP** | Corporate (perseroan) | **PF** | Pension Fund (dana pensiun) |
| **MF** | Mutual Fund (reksa dana) | **FD** | **Foundation (Yayasan)** — bukan "Fund" |
| **IB** | Financial Institution/Bank | **OT** | Other (pemerintah, koperasi, dll) |
| **IS** | Insurance (asuransi) | | |

> Klasifikasi sedang diperluas mengikuti standar global (MSCI), target rampung April 2026 — pantau kemungkinan subtipe baru.

### Metrik turunan
- **% Asing per saham** = `Total_Foreign / (Total_Local + Total_Foreign)`
- **Net foreign flow bulanan** = `Total_Foreign(bulan ini) − Total_Foreign(bulan lalu)` × `Price` → akumulasi/distribusi asing
- **Institusi vs ritel lokal**: `Local ID` = ritel, `Total_Local − Local ID` = institusi

### Snippet otomasi (tanpa Selenium, tanpa Cloudflare)
```python
import requests, zipfile, io, pandas as pd
def fetch_ksei(yyyymmdd):
    url = f"https://web.ksei.co.id/Download/BalanceposEfek{yyyymmdd}.zip"
    r = requests.get(url, headers={"User-Agent":"Mozilla/5.0"}, timeout=60); r.raise_for_status()
    z = zipfile.ZipFile(io.BytesIO(r.content))
    df = pd.read_csv(io.StringIO(z.read(z.namelist()[0]).decode("utf-8","replace")), sep="|")
    df.columns = [c.strip() for c in df.columns]
    return df
df = fetch_ksei("20260529")
eq = df[df["Type"]=="EQUITY"].copy()
eq.columns.values[14] = "Total_Local"      # ada DUA kolom "Total" → akses by index
eq.columns.values[24] = "Total_Foreign"
eq["pct_foreign"] = eq.Total_Foreign / (eq.Total_Local + eq.Total_Foreign) * 100
```
> ⚠️ **Gotcha:** ada **dua kolom bernama `Total`** (lokal & asing) → akses by index (14 & 24). Nama kolom ada spasi (`Local IS`) → `.strip()`.

### Frekuensi, akses, legal
- **Bulanan**, snapshot **hari bursa terakhir** tiap bulan; delay rilis **~2–3 hari kerja** (file 29 Mei di-pack 2 Juni). Histori per tahun tersedia di halaman arsip.
- **Tidak ada API/JSON** — hanya download file ZIP statis (URL deterministik → cron bulanan trivial via GitHub Actions).
- **AKSes KSEI** (`akses.ksei.co.id`) = portofolio **pribadi investor** (butuh login SID) → **TIDAK relevan** untuk data pasar agregat. Pakai Balance Position.
- **Baru (3 Mar 2026, mandat OJK KDK 1/2026):** kepemilikan **>1% per emiten** dipublikasikan bulanan via IDX (`idx.co.id` Berita > Pengumuman, PDF `From_EREP/`) — untuk identitas pemegang besar (sebelumnya hanya >5%).
- **Statistik PDF bulanan** (jumlah SID, demografi investor, aset, % asing nasional): `https://web.ksei.co.id/files/Statistik_Publik_{Bulan}_{Tahun}.pdf` → parse `pdfplumber`/`camelot`.
- **Legal:** data publik (penyediaan >1% bahkan dimandatkan OJK). Wajib atribusi **"Sumber: KSEI"**. Redistribusi komersial sebaiknya konfirmasi ToS KSEI.

> **Bottom line:** foreign flow + komposisi kepemilikan per saham = **100% legal & gratis** dari KSEI (Balance Position). Hanya broksum per-broker (§92) yang butuh feed berlisensi.

**Sumber:** [KSEI holding composition](https://web.ksei.co.id/archive_download/holding_composition), [Download & User Guide](https://web.ksei.co.id/data/download-data-and-user-guide), [SE KSEI 1118 (kode investor)](https://www.ksei.co.id/files/SE-0001-DIR-EKS-1118_Data_Reference_and_Information_on_SID_Creation_Based_on_Investor_Type.pdf), [Statistik KSEI](https://web.ksei.co.id/publications/Data_Statistik_KSEI), [Press release kepemilikan >1%](https://web.ksei.co.id/files/uploads/press_releases/press_file/id-id/252_bei_dan_ksei_terbitkan_informasi_kepemilikan_saham_perusahaan_tercatat_di_atas_1_20260303225811.pdf).

---

## 94. ⚡ Update Kemampuan Juni 2026 — untuk Trader & Web Developer (+ cara panggil)

> Subset fitur TERBARU yang relevan langsung untuk dua peran user. Tiap item diberi **cara memanggil**: di **Cowork** (yang dipakai sekarang, lewat bahasa natural) vs di **API/Claude Code** (kalau bangun aplikasi sendiri). Sebagian detail model baru (Fable 5) masih perlu-verifikasi.

### A. Untuk TRADER (analisa data & otomasi pasar)

| Fitur | Fungsi | Cara panggil |
|---|---|---|
| **Code Execution** (`code_execution_20260120`) | Jalankan Python+Bash (pandas/numpy/sklearn) untuk hitung indikator, backtest, parse data saham | **Cowork:** "jalankan Python untuk hitung/backtest X" (otomatis pakai sandbox). **API:** `tools=[{"type":"code_execution_20260120","name":"code_execution"}]` (+header beta). Gratis bila dipakai bareng web search |
| **Web Fetch** (`web_fetch_20260209`) | Ambil URL/PDF spesifik (laporan keuangan, berita) + saring konten sebelum masuk context | **Cowork:** "ambil & ringkas PDF/URL ini". **API:** `tools=[{"type":"web_fetch_20260209","allowed_domains":["idx.co.id"]}]` |
| **Memory tool** (`memory_20250818`) | Ingat watchlist/preferensi/jurnal trading **lintas sesi** (folder `/memories`) | **Cowork:** memori file otomatis — "ingat watchlist & gaya analisa saya". **API:** `tools=[{"type":"memory_20250818","name":"memory"}]` (app yang eksekusi simpan → wajib cegah path traversal) |
| **Scheduled / Managed Agents** | Pipeline data terjadwal (mis. ambil KSEI/foreign flow tiap hari) | **Cowork:** "setiap hari kerja jam 16:30 ambil data X lalu lapor" (scheduled task). **SDK:** Managed Agents + cron `0 9 * * 1-5` + credential vault (secret tak terlihat model) |
| **Advisor tool** (header `advisor-tool-2026-03-01`) | Model cepat (Sonnet/Haiku) kerjakan analisa, konsultasi Opus saat keputusan sulit → kualitas tinggi, biaya lebih murah | **API:** kirim header `advisor-tool-2026-03-01` + definisikan advisor (`max_tokens` opsional) |
| **Fast mode** (Opus 4.8) | Respon 2.5x lebih cepat untuk iterasi/screening cepat | **API:** `"speed":"fast"` pada request Opus 4.8 |

> Catatan: untuk data IDX/KSEI lihat §89, §92, §93. Code Execution & Web Fetch = inti pipeline analisa.

### B. Untuk WEB DEVELOPER (Claude Code, build apps, MCP)

| Fitur | Fungsi | Cara panggil |
|---|---|---|
| **Headless / Print mode** | Jalankan Claude non-interaktif untuk CI/CD, cron, automation | `claude -p "perbaiki semua test yang gagal"` atau `echo "prompt" \| claude -p` (+`--permission-mode`) |
| **Tool parameter permissions** | Izin per-NILAI parameter, bukan cuma nama tool (security ketat) | `allowedTools: ["Bash(command:git*)","Bash(command:npm*)"]` — boleh git/npm, tolak `rm -rf` |
| **Plugin & Marketplace** | Bundle skills/subagents/hooks/MCP/output-styles → distribusi tim | `/plugin` di Claude Code; install dari marketplace URL |
| **Checkpoint / Rewind** | Undo perubahan file & percakapan ke titik sebelumnya | `/rewind` (perlu `fileCheckpointingEnabled: true`) |
| **Session forking** | Cabang sesi untuk coba pendekatan alternatif tanpa rusak yang utama | **SDK:** `client.sessions.fork(parent_session_id=...)` |
| **claude-code-action (GitHub)** | Auto-fix PR, implement fitur, perbaiki bug via mention `@claude`; multi-auth (Bedrock/Vertex/Foundry) | Workflow: `uses: anthropics/claude-code-action@v1` + secret API key |
| **MCP Apps** (ext SEP-1865) | Server MCP kirim **UI HTML interaktif** (dirender host di iframe sandbox) — tool dengan tampilan, bukan teks | Server deklarasikan template `ui://`, profil `text/html;profile=mcp-app` |
| **MCP stateless (spec 2026-07-28)** | Server MCP remote tanpa handshake/session-id → bisa di belakang load-balancer biasa | Bangun server ikut spec RC `2026-07-28`; state via handle eksplisit (mis. kembalikan `id`) |
| **MCP connector / Tunnels** | Hubungkan Claude ke server MCP remote / di jaringan privat | **API:** MCP connector API; **Tunnels:** research preview untuk server private |
| **/powerup · Focus View · NO_FLICKER** | Tutorial interaktif di terminal · tampilan ringkas (`Ctrl+O`) · render terminal bebas flicker | `/powerup`; `Ctrl+O`; `CLAUDE_NO_FLICKER=1` (CI) |

### C. Context & cost (relevan kedua peran)

| Fitur | Fungsi | Cara panggil |
|---|---|---|
| **Server-side compaction** (`compact_20260112`) | Ringkas otomatis percakapan panjang di server (kini strategi UTAMA; client-side deprecated) | **API:** edit `compact_20260112`. **Cowork:** otomatis |
| **Context editing** (`context-management-2025-06-27`) | Hapus hasil tool / thinking block lama agar context tak penuh | **API:** `clear_tool_uses_20250919` / `clear_thinking_20251015` (clear_thinking listed pertama) |
| **Prompt caching 1 jam** | Cache prefix prompt (sistem+skema) → hemat ~90% token berulang; isolasi per-workspace; ada cache diagnostics | **API:** `cache_control:{"type":"ephemeral","ttl":"1h"}` |
| **Model terbaru** | Fable 5/Mythos 5 (9 Jun, paling capable) > Opus 4.8 (1M context, fast mode) > Sonnet 4.6 > Haiku 4.5 | **API:** `model:"claude-opus-4-8"` dsb. ⚠️ string `claude-fable-5` perlu-verifikasi; Sonnet 4 & Opus 4 PENSIUN 15 Jun 2026 |

> **Catatan Cowork:** sebagian fitur API/Claude Code di atas tidak dipanggil manual di Cowork — Claude memakainya otomatis. Yang langsung berguna di Cowork: Code Execution (bash), Web Fetch, Memory, Scheduled task. Sisanya relevan saat kamu **membangun aplikasi/pipeline sendiri**.

**Sumber:** [Memory tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool), [Code execution](https://platform.claude.com/docs/en/agents-and-tools/tool-use/code-execution-tool), [Web fetch](https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-fetch-tool), [Advisor tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/advisor-tool), [Context editing](https://platform.claude.com/docs/en/build-with-claude/context-editing), [Compaction](https://platform.claude.com/docs/en/build-with-claude/compaction), [MCP RC 2026-07-28](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/), [Fable 5/Mythos 5](https://platform.claude.com/docs/en/about-claude/models/introducing-claude-fable-5-and-claude-mythos-5), [Claude Code changelog](https://code.claude.com/docs/en/changelog).

---

## Referensi

- Docs Claude Code: https://code.claude.com/docs
- API Docs: https://platform.claude.com/docs
- MCP Protocol: https://modelcontextprotocol.io
- Agent SDK: https://platform.claude.com/docs/en/agent-sdk/overview
- Prompt Engineering: https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview
- Settings Schema: https://json.schemastore.org/claude-code-settings.json
- Vision docs: https://docs.anthropic.com/en/docs/build-with-claude/vision
- GitHub Actions: https://docs.anthropic.com/en/docs/claude-code/github-actions
- yfinance docs: https://ranaroussi.github.io/yfinance/
- pandas-ta docs: https://github.com/twopirllc/pandas-ta
- vectorbt docs: https://vectorbt.dev/
- IndexedDB MDN: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
- Pyodide: https://pyodide.org/en/stable/
- DuckDB-Wasm: https://duckdb.org/docs/api/wasm/overview.html
- Files API: https://docs.anthropic.com/en/docs/build-with-claude/files
- Batch API: https://docs.anthropic.com/en/api/creating-message-batches
- pandas-ta: https://github.com/twopirllc/pandas-ta
- trafilatura: https://trafilatura.readthedocs.io/
- Sectors.app (data IDX): https://sectors.app/
- IDX Broker Summary: https://www.idx.co.id/en/market-data/trading-summary/broker-summary
- IDX Derivatives: https://www.idx.co.id/en/products/derivatives
- darts (TS forecasting): https://github.com/unit8co/darts
- finbert-indonesia: https://huggingface.co/michaelmanurung/finbert-indonesia
- pgvector: https://github.com/pgvector/pgvector
- Voyage embeddings: https://docs.voyageai.com/
- Anthropic Contextual Retrieval: https://www.anthropic.com/news/contextual-retrieval
- Vercel AI SDK: https://ai-sdk.dev/docs/introduction
- Ollama: https://ollama.com/
- Transformers.js: https://huggingface.co/docs/transformers.js
- DuckDB httpfs: https://duckdb.org/docs/current/guides/network_cloud_storage/http_import
- Supabase Realtime: https://supabase.com/docs/guides/realtime
- Firecrawl: https://www.firecrawl.dev/
- GSAP (now free): https://gsap.com/
- View Transitions API (MDN): https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API
- Alpine.js: https://alpinejs.dev/
- MCP Sampling & Elicitation: https://modelcontextprotocol.io/specification
- nichsedge/idx-bei (scraper IDX Python+curl_cffi): https://github.com/nichsedge/idx-bei
- NeaByteLab/IDX-API (katalog endpoint): https://github.com/NeaByteLab/IDX-API
- Rachdyan/idx_financial_report (XBRL): https://github.com/Rachdyan/idx_financial_report
- curl_cffi: https://github.com/lexiforest/curl_cffi
- Syarat Penggunaan IDX: https://www.idx.co.id/id/syarat-penggunaan
- git-auto-commit-action: https://github.com/stefanzweifel/git-auto-commit-action
- Cloudflare Workers pricing: https://developers.cloudflare.com/workers/platform/pricing/
- Cloudflare Workers Cron: https://developers.cloudflare.com/workers/configuration/cron-triggers/
- Supabase Edge Functions: https://supabase.com/docs/guides/functions
- Supabase Cron (pg_cron): https://supabase.com/docs/guides/cron
- Cloudflare R2: https://developers.cloudflare.com/r2/
- TradingView Lightweight Charts: https://tradingview.github.io/lightweight-charts/
- Zod: https://zod.dev/
- UptimeRobot: https://uptimerobot.com/
- IDX Broker Summary (resmi): https://www.idx.co.id/en/market-data/trading-summary/broker-summary
- Sectors.app Badarmology API: https://docs.sectors.app/
- Stockbit Bandar Detector: https://help.stockbit.com/id/article/bandar-detector-bagaimana-cara-menggunakan-dan-apa-fungsinya-gocgkc/
- InvestasiKu (88 kode broker): https://www.investasiku.id/eduvest/saham/daftar-kode-broker-saham-indonesia
- SahamU (kode broker asing): https://sahamu.com/kode-broker-saham-asing-patungan-di-idx/
- KSEI Kepemilikan Efek (Balance Position): https://web.ksei.co.id/archive_download/holding_composition
- KSEI Download & User Guide: https://web.ksei.co.id/data/download-data-and-user-guide
- KSEI kode tipe investor (SE 1118): https://www.ksei.co.id/files/SE-0001-DIR-EKS-1118_Data_Reference_and_Information_on_SID_Creation_Based_on_Investor_Type.pdf
- KSEI Statistik Pasar Modal: https://web.ksei.co.id/publications/Data_Statistik_KSEI
- IDX broker summary EOD (penutupan kode broker Des 2021): https://www.cnbcindonesia.com/market/20211124132345-17-294044/goodbye-bandarmologi-bei-akan-hapus-kode-broker-di-desember

---

*Dokumen ini dibuat otomatis oleh Claude di Cowork mode.*
*Untuk update: minta Claude perbarui file ini di sesi berikutnya.*
