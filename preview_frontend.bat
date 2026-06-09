@echo off
chcp 65001 >nul 2>&1
title DIGILAB - Preview Frontend

set ROOT=%~dp0

echo.
echo ============================================================
echo   DIGILAB Repository - Preview Frontend
echo   http://localhost:3000
echo ============================================================
echo.

:: Cek Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js tidak ditemukan. Install dari: https://nodejs.org
    pause
    exit /b 1
)

:: Install jika belum ada
if not exist "%ROOT%frontend\node_modules" (
    echo [INFO] npm install frontend...
    pushd "%ROOT%frontend"
    call npm install
    popd
)

:: Buka frontend
echo [OK] Menjalankan frontend di http://localhost:3000 ...
start "DIGILAB Frontend" cmd /k "cd /d "%ROOT%frontend" && npm run dev"
timeout /t 3 /nobreak >nul
start http://localhost:3000
