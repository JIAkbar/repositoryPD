-- =====================================================
-- DIGILAB Repository — Table Grants
-- Versi: 1.0.0 | Tanggal: 2026-06-20
-- Jalankan setelah 001_create_tables.sql
--
-- Tujuan: beri permission ke role Supabase agar backend
-- dan frontend bisa akses tabel via API
-- =====================================================

-- ─── service_role (dipakai backend / server.js) ───
-- Bypass RLS tapi tetap butuh GRANT pada schema/table
GRANT USAGE ON SCHEMA public TO service_role;
GRANT ALL ON ALL TABLES    IN SCHEMA public TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;

-- ─── authenticated (user yang sudah login via Supabase Auth) ───
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT SELECT, INSERT, UPDATE ON
  karya_ilmiah,
  media_files,
  users
TO authenticated;
GRANT SELECT ON
  program_studi,
  kategori,
  dosen_pembimbing,
  log_verifikasi
TO authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- ─── anon (pengunjung publik, belum login) ───
GRANT USAGE ON SCHEMA public TO anon;
GRANT SELECT ON
  karya_ilmiah,
  program_studi,
  kategori,
  dosen_pembimbing
TO anon;

-- ─── Verifikasi ───
-- Pastikan service_role punya akses ke program_studi
SELECT
  grantee,
  table_name,
  privilege_type
FROM information_schema.role_table_grants
WHERE table_schema = 'public'
  AND grantee IN ('service_role', 'authenticated', 'anon')
  AND table_name = 'program_studi'
ORDER BY grantee, privilege_type;
