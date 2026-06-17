/**
 * mahasiswa-shared.js
 * Shared logic untuk mahasiswa.html (Classic) dan mahasiswa-evo.html (V.Evolution)
 *
 * ATURAN: File ini adalah single source of truth untuk semua logic mahasiswa.
 * Jika ada bug fix atau fitur baru di sini, otomatis berlaku di kedua tampilan.
 *
 * Yang TIDAK ada di sini (layout-specific, ada di masing-masing file):
 *   - loadApp(u)         — DOM IDs berbeda per layout
 *   - showPage(name)     — CSS class berbeda (.m-page vs .evo-page)
 *   - PAGE_META          — subtitle bisa beda per layout
 *   - saveProfil()       — DOM IDs berbeda per layout
 *   - switchToEvo()      — hanya ada di mahasiswa.html
 *   - switchToClassic()  — hanya ada di mahasiswa-evo.html
 */

// ══════════════════════════════════════════
// DATA — TODO: Replace with GET /api/karya?mahasiswa=me
// ══════════════════════════════════════════
const DUMMY_KARYA = [
  {
    id:1, judul:'Laporan Magang Perpustakaan Bung Karno',
    jenis:'Laporan Magang', tahun:'2024', status:'disetujui',
    pembimbing:'Hariyanto S.Pd., M.Pd',
    catatan_revisi:{}
  },
  {
    id:2, judul:'Implementasi Sistem Temu Kembali Informasi Berbasis Metadata Dublin Core',
    jenis:'Tugas Akhir', tahun:'2025', status:'pending',
    pembimbing:'Achmad Hamdan, S.Pd., M.Pd',
    catatan_revisi:{}
  },
  {
    id:3, judul:'Analisis Kebutuhan Layanan Perpustakaan Digital di Era Pasca-Pandemi',
    jenis:'Artikel Jurnal', tahun:'2024', status:'revisi',
    pembimbing:'Dr. Siti Rahayu, M.Lib',
    catatan_revisi:{
      judul:'Judul perlu diperjelas, tambahkan scope penelitian',
      bahasa:'',
      jenis:'',
      dosen:'Nama dosen pembimbing tidak lengkap (tambah gelar)',
      tahun:'',
      bidang:'Bidang/subjek kurang spesifik',
      panggil:'',
      abstrak:'Abstrak perlu diperjelas di bagian metode penelitian'
    }
  },
];

// TODO: Replace with GET /api/users/me
const PROFIL_DATA = {
  nama:'Natasya Adelia R.',
  nim:'220213704262',
  prodi:'D4 Perpustakaan Digital',
  angkatan:'2022',
  gender:'P',
  email:'mahasiswa@vokasi.um.ac.id',
};

// ── State upload ──
let currentStep = 1;
let formData = {};

// ── Konstanta No. Panggil ──
var PRODI_KODE = {
  'D4 Perpustakaan Digital':       'PD',
  'D3 Teknologi Informasi':        'TI',
  'D4 Teknologi Rekayasa Elektro': 'TRE',
  'D4 Teknologi Mesin':            'TM',
  'D4 Manajemen Informatika':      'MI',
  'D4 Akuntansi':                  'AK',
  'D3 Administrasi Perkantoran':   'AP',
  'D3 Teknik Mesin':               'TKM',
  'D4 Teknologi Industri':         'TID',
  'D3 Kimia Industri':             'KI',
  'D4 Teknologi Pendidikan':       'TP',
};
var JENIS_KODE = {
  'Tugas Akhir':    'TA',
  'Artikel Jurnal': 'AJ',
  'Laporan Magang': 'LM',
  'Proyek Inovasi': 'PI',
  'Produk Kreatif': 'PK',
  'Lainnya':        'LN',
};
var SKIP_KATA = ['analisis','rancang','bangun','sistem','implementasi','pengembangan',
  'pemanfaatan','studi','kajian','evaluasi','penerapan','desain','pembuatan',
  'the','an','a','dan','di','ke','dari','untuk','dengan','pada','yang','dalam'];


// ══════════════════════════════════════════
// AUTH — via ApiService (api-service.js)
// Tidak boleh ada localStorage.getItem('digilab-user') di sini.
// Semua baca/tulis user melalui ApiService.auth.*
// ══════════════════════════════════════════
function checkAuth() {
  const u = ApiService.auth.getUser();
  if (u && (u.role === 'mahasiswa' || u.role === 'Mahasiswa')) {
    loadApp(u);
  } else if (u && (u.role === 'admin' || u.role === 'Admin Pustakawan')) {
    navigateTo('admin');
  } else {
    document.getElementById('login-page').style.display = 'flex';
    document.getElementById('app').style.display = 'none';
  }
}

async function doLogin() {
  const email = document.getElementById('login-email').value.trim();
  const pass  = document.getElementById('login-pass').value;
  const err   = document.getElementById('login-err');
  if (!email || !pass) { err.textContent = 'Email dan kata sandi wajib diisi.'; return; }

  const result = await ApiService.auth.login(email, pass);
  if (!result.ok) {
    err.textContent = result.error || 'Email atau kata sandi salah.';
    return;
  }

  const u = result.user;
  if (u.role === 'mahasiswa' || u.role === 'Mahasiswa') {
    loadApp(u);
  } else if (u.role === 'admin' || u.role === 'Admin Pustakawan') {
    navigateTo('admin');
  } else {
    err.textContent = 'Role tidak dikenali.';
  }
}
document.getElementById('login-pass').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') doLogin();
});


// ══════════════════════════════════════════
// LOGOUT
// ══════════════════════════════════════════
function openLogoutConfirm() {
  var ov = document.getElementById('logout-confirm-overlay');
  if (!ov) return;
  ov.style.display = 'flex';
  ov.style.animation = 'fadeInBg .2s ease';
  var card = ov.querySelector('div');
  if (card) card.style.animation = 'popIn .25s cubic-bezier(.34,1.56,.64,1)';
}
function closeLogoutConfirm() {
  var ov = document.getElementById('logout-confirm-overlay');
  if (!ov) return;
  var card = ov.querySelector('div');
  if (card) card.style.animation = 'popIn .18s cubic-bezier(.34,1.56,.64,1) reverse';
  ov.style.animation = 'fadeInBg .18s ease reverse';
  setTimeout(function() { ov.style.display = 'none'; }, 160);
}
async function doLogout() {
  await ApiService.auth.logout();
  localStorage.removeItem('digilab-welcome-shown');
  navigateTo('public');
}


// ══════════════════════════════════════════
// SIDEBAR MOBILE
// ══════════════════════════════════════════
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('overlay').classList.toggle('show');
}


// ══════════════════════════════════════════
// WELCOME POPUP
// ══════════════════════════════════════════
function showWelcome(user) {
  if (localStorage.getItem('digilab-welcome-shown')) return;
  localStorage.setItem('digilab-welcome-shown', '1');
  var name = user.name || 'Mahasiswa';
  var initials = name.split(' ').map(function(w) { return w[0]; }).join('').toUpperCase().slice(0,2);
  document.getElementById('w-avatar').textContent = initials;
  document.getElementById('w-name').textContent = 'Selamat datang, ' + name.split(' ')[0] + '!';
  var bar = document.getElementById('w-bar');
  bar.style.animation = 'none'; bar.offsetHeight; bar.style.animation = '';
  document.getElementById('welcome-overlay').classList.add('show');
  setTimeout(closeWelcome, 3200);
}
function closeWelcome() {
  var el = document.getElementById('welcome-overlay');
  if (el) el.classList.remove('show');
}


// ══════════════════════════════════════════
// TOAST
// ══════════════════════════════════════════
function showToast(msg, isError) {
  const t = document.getElementById('toast');
  document.getElementById('toast-msg').textContent = msg;
  t.style.background = isError ? '#dc2626' : '#16a34a';
  t.classList.add('show');
  setTimeout(function() { t.classList.remove('show'); }, 3000);
}


// ══════════════════════════════════════════
// NOTIFIKASI STATUS KARYA
// ══════════════════════════════════════════
function renderNotifBanners() {
  var container = document.getElementById('notif-container');
  if (!container) return;
  var notifItems = DUMMY_KARYA.filter(function(k) {
    return k.status === 'disetujui' || k.status === 'ditolak' || k.status === 'revisi';
  });
  if (!notifItems.length) { container.innerHTML = ''; return; }
  var html = notifItems.map(function(k) {
    var judul = k.judul.length > 48 ? k.judul.slice(0,48) + '…' : k.judul;
    if (k.status === 'disetujui') {
      return '<div class="status-banner sb-green" onclick="showPage(\'karya\')">' +
        '<div class="sb-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>' +
        '<div class="sb-body"><div class="sb-label">Pemberitahuan</div><div class="sb-title">Karya disetujui 🎉</div><div class="sb-sub">' + judul + '</div></div>' +
        '<button class="sb-action" onclick="event.stopPropagation();showPage(\'karya\')">Lihat</button></div>';
    } else if (k.status === 'ditolak') {
      return '<div class="status-banner sb-red" onclick="showPage(\'karya\')">' +
        '<div class="sb-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg></div>' +
        '<div class="sb-body"><div class="sb-label">Pemberitahuan</div><div class="sb-title">Karya ditolak</div><div class="sb-sub">' + judul + '</div></div>' +
        '<button class="sb-action" onclick="event.stopPropagation();showPage(\'karya\')">Detail</button></div>';
    } else if (k.status === 'revisi') {
      var catatanObj = k.catatan_revisi || {};
      var jml = Object.keys(catatanObj).filter(function(key){ return catatanObj[key] && catatanObj[key].trim(); }).length;
      var hasCatatan = jml > 0;
      var escapedJudul = k.judul.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
      var actionBtn;
      if (hasCatatan) {
        var encodedCatatan = encodeURIComponent(JSON.stringify(catatanObj));
        actionBtn = '<button class="sb-action" onclick="event.stopPropagation();openCatatanModal(&quot;' + escapedJudul + '&quot;, JSON.parse(decodeURIComponent(&quot;' + encodedCatatan + '&quot;)))">Lihat Catatan</button>';
      } else {
        actionBtn = '<button class="sb-action" onclick="event.stopPropagation();showPage(\'karya\')">Revisi</button>';
      }
      return '<div class="status-banner sb-orange" onclick="showPage(\'karya\')">'
        + '<div class="sb-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></div>'
        + '<div class="sb-body"><div class="sb-label">' + (jml ? jml + ' catatan revisi dari admin' : 'Perlu perbaikan') + '</div><div class="sb-title">Karya perlu direvisi</div><div class="sb-sub">' + judul + '</div></div>'
        + actionBtn + '</div>';
    }
    return '';
  }).join('');
  container.innerHTML = html;
}


// ══════════════════════════════════════════
// TABEL KARYA
// ══════════════════════════════════════════
function statusBadge(s) {
  const map = {
    pending:   '<span class="badge badge-pending">⏳ Menunggu</span>',
    disetujui: '<span class="badge badge-approved">✅ Disetujui</span>',
    revisi:    '<span class="badge badge-revision">✏️ Revisi</span>',
    ditolak:   '<span class="badge badge-rejected">❌ Ditolak</span>',
  };
  return map[s] || s;
}

function renderBerandaTable() {
  const recent = DUMMY_KARYA.slice(0, 3);
  document.getElementById('beranda-tbody').innerHTML = recent.length
    ? recent.map(k => `
      <tr>
        <td style="font-weight:600;max-width:260px">${k.judul}</td>
        <td><span style="font-size:12px;background:#e8f4f6;padding:2px 9px;border-radius:6px;color:var(--navy);font-weight:600">${k.jenis}</span></td>
        <td>${k.tahun}</td>
        <td>${statusBadge(k.status)}</td>
        <td><button class="btn btn-ghost btn-sm" onclick="showPage('karya')">Detail</button></td>
      </tr>`).join('')
    : '<tr><td colspan="5" style="text-align:center;padding:32px;color:#aaa">Belum ada karya</td></tr>';
}

function renderKaryaTable(data) {
  const rows = data || DUMMY_KARYA;
  document.getElementById('karya-tbody').innerHTML = rows.length
    ? rows.map((k, i) => {
        const hasCatatan = k.status === 'revisi' && k.catatan_revisi && Object.keys(k.catatan_revisi).some(function(key){ return k.catatan_revisi[key] && k.catatan_revisi[key].trim(); });
        const catatanCount = hasCatatan ? Object.keys(k.catatan_revisi).filter(function(key){ return k.catatan_revisi[key] && k.catatan_revisi[key].trim(); }).length : 0;
        const encodedCatatan = hasCatatan ? encodeURIComponent(JSON.stringify(k.catatan_revisi)) : encodeURIComponent('{}');
        const escapedJudul = k.judul.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
        return `
          <tr style="${k.status === 'revisi' ? 'background:#fffdf5;' : ''}">
            <td style="color:var(--text-muted);font-weight:700">${i + 1}</td>
            <td style="font-weight:600;max-width:280px">
              ${k.judul}
              ${hasCatatan
                ? `<div style="font-size:11px;color:#d97706;font-weight:700;margin-top:3px;display:flex;align-items:center;gap:4px;">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    ${catatanCount} catatan revisi dari admin
                   </div>`
                : (k.status === 'revisi'
                  ? `<div style="font-size:11px;color:#d97706;font-weight:700;margin-top:3px;">Perlu perbaikan — hubungi admin</div>`
                  : '')}
            </td>
            <td><span style="font-size:12px;background:#e8f4f6;padding:2px 9px;border-radius:6px;color:var(--navy);font-weight:600">${k.jenis}</span></td>
            <td>${k.tahun}</td>
            <td>${statusBadge(k.status)}</td>
            <td style="white-space:nowrap">
              <button class="btn btn-ghost btn-sm btn-icon" title="Detail">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              </button>
              ${hasCatatan
                ? `<button class="btn btn-sm" onclick="openCatatanModal('${escapedJudul}', JSON.parse(decodeURIComponent('${encodedCatatan}')))" style="background:#fff3e0;color:#f97316;border:1px solid #fed7aa;border-radius:999px;font-weight:700;font-size:11px;padding:4px 10px;cursor:pointer;">Lihat Catatan</button>`
                : (k.status === 'revisi'
                  ? `<button class="btn btn-orange btn-sm" onclick="showPage('unggah')">Kirim Ulang</button>`
                  : '')}
              ${k.status === 'revisi'
                ? `<button class="btn btn-ghost btn-sm" onclick="showPage('unggah')" style="margin-left:4px;">Edit</button>`
                : ''}
            </td>
          </tr>`;
      }).join('')
    : '<tr><td colspan="6"><div class="empty-state"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg><p>Belum ada karya diunggah</p></div></td></tr>';
}

function filterKarya() {
  const q = (document.getElementById('karya-search').value || '').toLowerCase();
  const s = document.getElementById('karya-filter').value;
  renderKaryaTable(DUMMY_KARYA.filter(k =>
    (!q || k.judul.toLowerCase().includes(q) || k.jenis.toLowerCase().includes(q)) &&
    (!s || k.status === s)
  ));
}


// ══════════════════════════════════════════
// UPLOAD — 3-STEP FORM
// ══════════════════════════════════════════
function resetUploadForm() {
  currentStep = 1;
  updateStepUI();
  document.getElementById('step-1').style.display = 'block';
  document.getElementById('step-2').style.display = 'none';
  document.getElementById('step-3').style.display = 'none';
}

function showFieldError(id, msgId) {
  document.getElementById(id).classList.add('has-error');
  var msg = document.getElementById(msgId);
  if (msg) msg.classList.add('show');
}
function clearFieldError(id) {
  var el = document.getElementById(id);
  if (el) el.classList.remove('has-error');
  var errId = 'err-' + id.replace('f-', '').replace('-upload', '');
  var msg = document.getElementById(errId);
  if (msg) msg.classList.remove('show');
}

function goStep(n) {
  if (n === 2) {
    var judul      = document.getElementById('f-judul').value.trim();
    var prodi      = document.getElementById('f-prodi-upload').value;
    var jenis      = document.getElementById('f-jenis').value;
    var pembimbing = document.getElementById('f-pembimbing').value;
    var tahun      = document.getElementById('f-tahun').value;
    var valid = true;
    ['f-judul','f-prodi-upload','f-jenis','f-pembimbing','f-tahun'].forEach(clearFieldError);
    if (!judul || judul.length < 10) { showFieldError('f-judul', 'err-judul'); valid = false; }
    if (!prodi)      { showFieldError('f-prodi-upload', 'err-prodi'); valid = false; }
    if (!jenis)      { showFieldError('f-jenis', 'err-jenis'); valid = false; }
    if (!pembimbing) { showFieldError('f-pembimbing', 'err-pembimbing'); valid = false; }
    if (!tahun || parseInt(tahun) > new Date().getFullYear()) { showFieldError('f-tahun', 'err-tahun'); valid = false; }
    if (!valid) { showToast('Perbaiki field yang ditandai merah', true); return; }
    formData = {
      judul, prodi,
      penulis:    document.getElementById('f-penulis').value,
      bahasa:     document.getElementById('f-bahasa').value === 'id' ? 'Indonesia' : 'English',
      jenis,      pembimbing, tahun,
      bidang:     document.getElementById('f-bidang').value,
      nopanggil:  document.getElementById('f-nopanggil').value,
      abstrak:    document.getElementById('f-abstrak').value,
    };
  }
  if (n === 3) {
    formData.links = Array.from(document.querySelectorAll('#link-list .link-item-url')).map(el => el.textContent);
    buildReview();
  }
  currentStep = n;
  updateStepUI();
  ['step-1','step-2','step-3'].forEach((id, i) => {
    document.getElementById(id).style.display = (i + 1 === n) ? 'block' : 'none';
  });
}

function updateStepUI() {
  [1,2,3].forEach(i => {
    const dot = document.getElementById('dot-' + i);
    dot.classList.remove('active','done');
    if (i < currentStep) dot.classList.add('done');
    else if (i === currentStep) dot.classList.add('active');
  });
  [1,2].forEach(i => {
    document.getElementById('line-' + i).classList.toggle('done', i < currentStep);
  });
}

function buildReview() {
  const pdfName   = document.getElementById('input-pdf').files[0]   ? document.getElementById('input-pdf').files[0].name   : '—';
  const mediaName = document.getElementById('input-media').files[0] ? document.getElementById('input-media').files[0].name : '—';
  const items = [
    { k:'Judul',        v: formData.judul      || '—' },
    { k:'Penulis',      v: formData.penulis    || '—' },
    { k:'Bahasa',       v: formData.bahasa     || 'Indonesia' },
    { k:'Jenis',        v: formData.jenis      || '—' },
    { k:'Pembimbing',   v: formData.pembimbing || '—' },
    { k:'Tahun',        v: formData.tahun      || '—' },
    { k:'Bidang',       v: formData.bidang     || '—' },
    { k:'No. Panggil',  v: formData.nopanggil  || '—' },
    { k:'Dokumen PDF',  v: pdfName },
    { k:'Foto/Video',   v: mediaName },
  ];
  if (formData.abstrak) items.push({ k:'Abstrak', v: formData.abstrak, full: true });
  document.getElementById('review-content').innerHTML = items.map(item =>
    `<div class="review-item${item.full ? ' full' : ''}">
      <div class="review-key">${item.k}</div>
      <div class="review-val">${item.v}</div>
    </div>`).join('');
}

function addLink() {
  const inp = document.getElementById('link-input');
  const url = (inp.value || '').trim();
  if (!url) return;
  try { new URL(url); } catch(e) { showToast('Format URL tidak valid', true); return; }
  const list = document.getElementById('link-list');
  const id = 'lnk-' + Date.now();
  let label = url;
  try { label = new URL(url).hostname.replace('www.', '') + new URL(url).pathname.slice(0, 30); } catch(e) {}
  list.insertAdjacentHTML('beforeend', `
    <div id="${id}" style="display:flex;align-items:center;gap:8px;background:var(--bg);border:1px solid var(--border);border-radius:10px;padding:7px 12px;">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--navy)" stroke-width="2.2" stroke-linecap="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
      <span class="link-item-url" style="font-size:12px;color:var(--text-mid);flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${url}">${url}</span>
      <button onclick="document.getElementById('${id}').remove()" style="background:none;border:none;cursor:pointer;color:var(--text-muted);padding:2px;">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>`);
  inp.value = '';
  inp.focus();
}

function submitKarya() {
  DUMMY_KARYA.unshift({
    id: Date.now(),
    judul:      formData.judul      || 'Karya Baru',
    jenis:      formData.jenis      || 'Lainnya',
    tahun:      formData.tahun      || '2026',
    status:     'pending',
    pembimbing: formData.pembimbing || '—',
  });
  document.getElementById('stat-total').textContent = DUMMY_KARYA.length;
  document.getElementById('stat-pending').textContent = DUMMY_KARYA.filter(k => k.status === 'pending').length;
  document.getElementById('info-total-karya').textContent = DUMMY_KARYA.length;
  renderBerandaTable();
  renderKaryaTable();
  showToast('Karya berhasil dikirim! Menunggu verifikasi pustakawan.');
  setTimeout(function() { showPage('karya'); }, 1200);
}


// ══════════════════════════════════════════
// DROPZONE
// ══════════════════════════════════════════
function dragOver(e, id) { e.preventDefault(); document.getElementById(id).classList.add('drag-over'); }
function dragLeave(id) { document.getElementById(id).classList.remove('drag-over'); }
function handleDrop(e, dropId, inputId) {
  e.preventDefault();
  dragLeave(dropId);
  const file = e.dataTransfer.files[0];
  if (!file) return;
  const input = document.getElementById(inputId);
  const dt = new DataTransfer();
  dt.items.add(file);
  input.files = dt.files;
  showFile(input, dropId, 'preview-' + dropId.replace('drop-', ''));
}
function showFile(input, dropId, previewId) {
  const file = input.files[0];
  if (!file) return;
  const preview = document.getElementById(previewId);
  const size = file.size > 1048576 ? (file.size / 1048576).toFixed(1) + ' MB' : (file.size / 1024).toFixed(0) + ' KB';
  preview.innerHTML = `<div class="file-preview">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
    <span class="file-preview-name">${file.name}</span>
    <span class="file-preview-size">${size}</span>
    <button class="file-remove" onclick="removeFile('${input.id}','${dropId}','${previewId}')">×</button>
  </div>`;
  document.getElementById(dropId).style.display = 'none';
}
function removeFile(inputId, dropId, previewId) {
  document.getElementById(inputId).value = '';
  document.getElementById(previewId).innerHTML = '';
  document.getElementById(dropId).style.display = 'block';
}


// ══════════════════════════════════════════
// AUTO NO. PANGGIL
// ══════════════════════════════════════════
function generateNoPanggil() {
  var penulis = (document.getElementById('f-penulis') || {value:''}).value.trim();
  var prodi   = (document.getElementById('f-prodi-upload') || {value:''}).value;
  var jenis   = (document.getElementById('f-jenis') || {value:''}).value;
  var judul   = (document.getElementById('f-judul') || {value:''}).value.trim();
  var tahun   = (document.getElementById('f-tahun') || {value:''}).value;
  var out = document.getElementById('f-nopanggil');
  if (!out) return;
  if (!penulis && !prodi && !jenis && !judul && !tahun) { out.value = ''; return; }
  var namaTokens   = penulis.split(/[\s,]+/).filter(function(w) { return w && !/\./.test(w); });
  var namaBelakang = namaTokens.length > 1 ? namaTokens[namaTokens.length - 1] : (namaTokens[0] || '');
  var kodeNama  = namaBelakang.replace(/[^A-Za-z]/g, '').substring(0, 3).toUpperCase() || '???';
  var kodeProdi = PRODI_KODE[prodi] || (prodi ? prodi.replace(/[^A-Za-z]/g, '').substring(0, 2).toUpperCase() : '??');
  var kodeJenis = JENIS_KODE[jenis] || (jenis ? jenis.replace(/[^A-Za-z]/g, '').substring(0, 2).toUpperCase() : '??');
  var judulKata = judul.split(/\s+/);
  var judulPilih = '';
  for (var i = 0; i < judulKata.length; i++) {
    var w = judulKata[i].replace(/[^A-Za-z]/g, '');
    if (w.length >= 2 && SKIP_KATA.indexOf(w.toLowerCase()) === -1) { judulPilih = w; break; }
  }
  if (!judulPilih && judulKata.length > 0) judulPilih = judulKata[0].replace(/[^A-Za-z]/g, '');
  var kodeJudul = judulPilih.substring(0, 3).toUpperCase() || '???';
  out.value = kodeNama + '/' + kodeProdi + '/' + kodeJenis + '/' + kodeJudul + '/' + tahun;
}