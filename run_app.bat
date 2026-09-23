@echo off
title AgriBuddy - Capstone Project Launcher
echo ========================================================
echo         AGRIBUDDY - EKOSISTEM PENDAMPING PETANI CERDAS
echo           Capstone Project STSI4440 - Tugas Akhir
echo ========================================================
echo.
echo [1/2] Menjalankan Backend Node.js di http://127.0.0.1:8000 ...
start "AgriBuddy Backend (Node.js & Gemini API)" cmd /k "cd backend && npm run dev"

echo [2/2] Menjalankan Frontend Vue.js di http://localhost:5173 ...
start "AgriBuddy Frontend (Vue.js)" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================================
echo  Semua layanan sedang dimulai!
echo  - Backend API (Node.js) : http://127.0.0.1:8000/
echo  - Base API Endpoint     : http://127.0.0.1:8000/api/v1
echo  - Web Application       : http://localhost:5173
echo ========================================================
echo.
pause
