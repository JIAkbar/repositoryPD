@echo off
chcp 65001 >nul 2>&1
title DIGILAB - Upload ke GitHub

set ROOT=%~dp0
cd /d "%ROOT%"

echo.
echo ============================================================
echo   DIGILAB Repository - Upload ke GitHub
echo   github.com/JIAkbar/repositoryPD
echo ============================================================
echo.

:: Cek git
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Git tidak ditemukan. Install dari: https://git-scm.com
    pause
    exit /b 1
)

:: Init jika belum
if not exist ".git" (
    echo [1/5] Inisialisasi git...
    git init
    git config user.name "Johan Iriawan Akbar"
    git config user.email "jiwa99@gmail.com"
    git branch -M main
) else (
    echo [1/5] Git sudah terinisialisasi.
)

:: Add semua file
echo [2/5] Menambahkan semua file...
git add .

:: Commit
echo [3/5] Commit...
git commit -m "feat: initial commit DIGILAB Repository - frontend SPA, backend Node.js, DB PostgreSQL"

:: Set remote (skip jika sudah ada)
git remote get-url origin >nul 2>&1
if %errorlevel% neq 0 (
    echo [4/5] Menambahkan remote origin...
    git remote add origin https://github.com/JIAkbar/repositoryPD.git
) else (
    echo [4/5] Remote origin sudah ada.
)

:: Push
echo [5/5] Push ke GitHub...
echo.
echo [INFO] Browser/popup login GitHub mungkin akan muncul.
echo        Masukkan username dan password / token GitHub Anda.
echo.
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ============================================================
    echo   SUKSES! Project sudah live di:
    echo   https://github.com/JIAkbar/repositoryPD
    echo ============================================================
    start https://github.com/JIAkbar/repositoryPD
) else (
    echo.
    echo [ERROR] Push gagal. Cek koneksi atau login GitHub.
)

echo.
pause
