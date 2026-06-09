@echo off
chcp 65001 >nul 2>&1
title DIGILAB Repository - Local Dev Server

echo.
echo ============================================================
echo   DIGILAB Repository - Local Development Server
echo   Fakultas Vokasi Universitas Negeri Malang
echo ============================================================
echo.

:: Simpan direktori asal (lokasi file .bat ini)
set ROOT=%~dp0

:: ---- Cek Node.js ----
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js tidak ditemukan.
    echo         Download dan install dari: https://nodejs.org
    echo.
    pause
    exit /b 1
)
echo [OK] Node.js terdeteksi:
node --version
echo.

:: ---- Cek file .env backend ----
if not exist "%ROOT%backend\.env" (
    echo [WARN] File backend\.env belum ada.
    if exist "%ROOT%backend\.env.example" (
        copy "%ROOT%backend\.env.example" "%ROOT%backend\.env" >nul
        echo [INFO] .env disalin dari .env.example
        echo [INFO] Isi %ROOT%backend\.env dengan Supabase credentials.
        echo.
        pause
    ) else (
        echo [WARN] .env.example juga tidak ditemukan. Lanjut...
        echo.
    )
)

:: ---- Install backend dependencies ----
echo [1/4] Mengecek dependencies backend...
if not exist "%ROOT%backend\node_modules" (
    echo       node_modules belum ada, menjalankan npm install...
    pushd "%ROOT%backend"
    call npm install
    if %errorlevel% neq 0 (
        echo [ERROR] npm install backend gagal!
        popd
        pause
        exit /b 1
    )
    popd
    echo [OK] Dependencies backend terinstall.
) else (
    echo [OK] node_modules backend sudah ada.
)
echo.

:: ---- Install frontend dependencies ----
echo [2/4] Mengecek dependencies frontend...
if not exist "%ROOT%frontend\node_modules" (
    echo       node_modules belum ada, menjalankan npm install...
    pushd "%ROOT%frontend"
    call npm install
    if %errorlevel% neq 0 (
        echo [ERROR] npm install frontend gagal!
        popd
        pause
        exit /b 1
    )
    popd
    echo [OK] Dependencies frontend terinstall.
) else (
    echo [OK] node_modules frontend sudah ada.
)
echo.

:: ---- Jalankan Backend ----
echo [3/4] Menjalankan Backend API di http://localhost:5000 ...
start "DIGILAB - Backend" cmd /k "cd /d "%ROOT%backend" && npm run dev"
timeout /t 3 /nobreak >nul

:: ---- Jalankan Frontend ----
echo [4/4] Menjalankan Frontend di http://localhost:3000 ...
start "DIGILAB - Frontend" cmd /k "cd /d "%ROOT%frontend" && npm run dev"
timeout /t 3 /nobreak >nul

echo.
echo ============================================================
echo   Server berjalan di:
echo.
echo   Frontend     :  http://localhost:3000
echo   Backend API  :  http://localhost:5000
echo   Health Check :  http://localhost:5000/api/health
echo ============================================================
echo.
echo Tekan sembarang tombol untuk membuka browser...
pause >nul

start http://localhost:3000
exit /b 0
