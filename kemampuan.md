# 🤖 Kemampuan Claude — Referensi Developer

> Dokumen ini merangkum seluruh kemampuan Claude yang relevan untuk developer,
> khususnya yang berjalan di Cowork mode dan Claude Agent SDK.
> Diperbarui: 2026-06-15

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
| **Fan-out (Paralel)** | 1 orchestrator → N worker sekaligus | Audit banyak file, research multi-topik |
| **Pipeline (Sekuensial)** | Output agent A → input agent B | Research → Tulis → Review |
| **Hierarki** | Orchestrator → Sub-orchestrator → Worker | Task kompleks berjenjang |
| **Map-Reduce** | N agent proses data → 1 agent gabungkan | Analisis dataset besar |

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
Agent(isolation: "worktree", ...)
```
Agent bekerja di **git worktree terpisah** — perubahan tidak langsung ke branch utama.
Auto-cleanup jika tidak ada perubahan. Cocok untuk eksperimen aman.

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

## 12. 📊 Ringkasan: Pilih Tool yang Tepat

| Skenario | Tool/Fitur |
|---|---|
| Banyak file perlu diproses bersamaan | Spawn Agent paralel |
| Research multi-sumber | Agent fan-out + WebSearch |
| Refactor besar + test + docs | Agent pipeline sekuensial |
| Dashboard data real-time | Artifacts + MCP connector |
| Otomasi harian (PR review, audit) | Scheduled Tasks / Routines |
| Connect ke sistem internal | Buat MCP server sendiri |
| Proses 1000+ dokumen | Batch API (50% diskon) |
| Output harus exact format | Structured Outputs |
| Analisis mendalam | Extended Thinking |
| Hemat biaya konteks panjang | Prompt Caching |

---

## Referensi

- Docs Claude Code: https://code.claude.com/docs
- API Docs: https://platform.claude.com/docs
- MCP Protocol: https://modelcontextprotocol.io
- Agent SDK: https://platform.claude.com/docs/en/agent-sdk/overview
- Prompt Engineering: https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview

---

*Dokumen ini dibuat otomatis oleh Claude di Cowork mode.*
*Untuk update: minta Claude perbarui file ini di sesi berikutnya.*
