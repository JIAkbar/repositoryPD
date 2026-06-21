-- =====================================================
-- DIGILAB Repository — RPC Functions untuk Admin Panel
-- Versi: 1.0.0 | Tanggal: 2026-06-20
-- Jalankan setelah 004_grants.sql
--
-- Tujuan: fungsi SECURITY DEFINER agar admin panel
-- bisa approve/reject akun TANPA membuka Supabase dashboard
-- dan TANPA service_role key di frontend.
-- =====================================================

-- ─── Fungsi: Setujui akun mahasiswa ───────────────────────────
CREATE OR REPLACE FUNCTION approve_user_account(target_user_id UUID)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER   -- berjalan dengan hak pemilik fungsi (postgres)
SET search_path = public
AS $$
DECLARE
  caller_role TEXT;
  target_nama TEXT;
BEGIN
  -- Cek apakah pemanggil adalah admin atau pustakawan
  SELECT role INTO caller_role
  FROM public.users
  WHERE id = auth.uid();

  IF caller_role NOT IN ('admin', 'pustakawan') THEN
    RETURN jsonb_build_object('ok', false, 'error', 'Akses ditolak: hanya admin/pustakawan');
  END IF;

  -- Cek user target ada
  SELECT nama INTO target_nama
  FROM public.users
  WHERE id = target_user_id;

  IF target_nama IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'User tidak ditemukan');
  END IF;

  -- Update is_active = true
  UPDATE public.users
  SET
    is_active  = true,
    updated_at = now()
  WHERE id = target_user_id;

  -- Catat di log (opsional, tidak wajib)
  -- INSERT INTO public.log_verifikasi (admin_id, karya_id, aksi, catatan, created_at)
  -- tidak berlaku untuk akun — hanya untuk karya. Skip.

  RETURN jsonb_build_object(
    'ok',   true,
    'nama', target_nama,
    'msg',  'Akun ' || target_nama || ' berhasil disetujui'
  );
END;
$$;

-- ─── Fungsi: Tolak / nonaktifkan akun mahasiswa ───────────────
CREATE OR REPLACE FUNCTION reject_user_account(target_user_id UUID)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  caller_role TEXT;
  target_nama TEXT;
BEGIN
  SELECT role INTO caller_role
  FROM public.users
  WHERE id = auth.uid();

  IF caller_role NOT IN ('admin', 'pustakawan') THEN
    RETURN jsonb_build_object('ok', false, 'error', 'Akses ditolak: hanya admin/pustakawan');
  END IF;

  SELECT nama INTO target_nama
  FROM public.users
  WHERE id = target_user_id;

  IF target_nama IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'User tidak ditemukan');
  END IF;

  UPDATE public.users
  SET
    is_active  = false,
    updated_at = now()
  WHERE id = target_user_id;

  RETURN jsonb_build_object(
    'ok',   true,
    'nama', target_nama,
    'msg',  'Akun ' || target_nama || ' ditolak/dinonaktifkan'
  );
END;
$$;

-- ─── Fungsi: Ambil daftar akun pending ────────────────────────
CREATE OR REPLACE FUNCTION get_pending_accounts()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  caller_role TEXT;
  result jsonb;
BEGIN
  SELECT role INTO caller_role
  FROM public.users
  WHERE id = auth.uid();

  IF caller_role NOT IN ('admin', 'pustakawan') THEN
    RETURN jsonb_build_object('ok', false, 'error', 'Akses ditolak');
  END IF;

  SELECT jsonb_agg(
    jsonb_build_object(
      'id',       u.id,
      'nama',     u.nama,
      'nim',      u.nim_nidn,
      'email',    a.email,
      'prodi',    p.nama,
      'is_active', u.is_active,
      'created_at', u.created_at
    )
    ORDER BY u.created_at DESC
  )
  INTO result
  FROM public.users u
  JOIN auth.users    a ON a.id = u.id
  JOIN program_studi p ON p.id = u.prodi_id
  WHERE u.is_active = false
    AND u.role = 'mahasiswa';

  RETURN jsonb_build_object(
    'ok',   true,
    'data', COALESCE(result, '[]'::jsonb)
  );
END;
$$;

-- ─── Fungsi: Ambil daftar SEMUA akun (untuk halaman admin) ────
CREATE OR REPLACE FUNCTION get_all_accounts()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  caller_role TEXT;
  result jsonb;
BEGIN
  SELECT role INTO caller_role
  FROM public.users
  WHERE id = auth.uid();

  IF caller_role NOT IN ('admin', 'pustakawan') THEN
    RETURN jsonb_build_object('ok', false, 'error', 'Akses ditolak');
  END IF;

  SELECT jsonb_agg(
    jsonb_build_object(
      'id',        u.id,
      'nama',      u.nama,
      'nim',       u.nim_nidn,
      'email',     a.email,
      'prodi',     p.nama,
      'role',      u.role,
      'is_active', u.is_active,
      'created_at', u.created_at
    )
    ORDER BY u.created_at DESC
  )
  INTO result
  FROM public.users u
  JOIN auth.users    a ON a.id = u.id
  JOIN program_studi p ON p.id = u.prodi_id
  WHERE u.role = 'mahasiswa';

  RETURN jsonb_build_object(
    'ok',   true,
    'data', COALESCE(result, '[]'::jsonb)
  );
END;
$$;

-- ─── Grant eksekusi ke authenticated role ─────────────────────
GRANT EXECUTE ON FUNCTION approve_user_account(UUID)  TO authenticated;
GRANT EXECUTE ON FUNCTION reject_user_account(UUID)   TO authenticated;
GRANT EXECUTE ON FUNCTION get_pending_accounts()      TO authenticated;
GRANT EXECUTE ON FUNCTION get_all_accounts()          TO authenticated;

-- ─── Verifikasi ───────────────────────────────────────────────
SELECT
  routine_name,
  routine_type,
  security_type
FROM information_schema.routines
WHERE routine_schema = 'public'
  AND routine_name IN (
    'approve_user_account',
    'reject_user_account',
    'get_pending_accounts',
    'get_all_accounts'
  )
ORDER BY routine_name;
-- Harus muncul 4 baris, security_type = DEFINER
