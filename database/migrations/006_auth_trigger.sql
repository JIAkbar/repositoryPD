-- =====================================================
-- DIGILAB Repository — Auth Trigger: Auto-create profil
-- Versi: 1.0.0 | Tanggal: 2026-06-20
-- Jalankan setelah 005_rls_admin.sql
--
-- Tujuan: Saat mahasiswa signUp via Supabase Auth,
-- otomatis buat row di public.users dengan:
--   - role = 'mahasiswa'
--   - is_active = FALSE (menunggu persetujuan admin)
--   - nama dari raw_user_meta_data->>'nama'
--   - nim_nidn dari raw_user_meta_data->>'nim'
-- =====================================================

-- ─── Fungsi trigger ───────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.users (
    id,
    nama,
    nim_nidn,
    role,
    is_active
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'nama', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'nim',
    'mahasiswa',
    FALSE   -- wajib disetujui admin dulu
  )
  ON CONFLICT (id) DO NOTHING;  -- idempotent: tidak error jika sudah ada
  RETURN NEW;
END;
$$;

-- ─── Trigger di auth.users ────────────────────────────────────
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ─── RLS: Mahasiswa bisa baca profil sendiri ─────────────────
-- (backup policy jika policy lain belum mencakup)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'users' AND policyname = 'users_read_own'
  ) THEN
    EXECUTE 'CREATE POLICY "users_read_own" ON public.users
      FOR SELECT TO authenticated
      USING (auth.uid() = id)';
  END IF;
END $$;

-- ─── RLS: Admin bisa baca semua users ────────────────────────
DROP POLICY IF EXISTS "admin_read_all_users" ON public.users;
CREATE POLICY "admin_read_all_users" ON public.users
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.users u
      WHERE u.id = auth.uid()
      AND u.role IN ('admin', 'pustakawan')
    )
  );

-- ─── Verifikasi ───────────────────────────────────────────────
SELECT
  trigger_name,
  event_manipulation,
  event_object_table,
  action_timing
FROM information_schema.triggers
WHERE trigger_name = 'on_auth_user_created';
-- Harus muncul 1 baris: on_auth_user_created | INSERT | users | AFTER
