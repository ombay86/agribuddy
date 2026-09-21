@echo off
title AgriBuddy - Capstone Project Launcher
echo ========================================================
echo         AGRIBUDDY - EKOSISTEM PENDAMPING PETANI CERDAS
echo           Capstone Project STSI4440 - Tugas Akhir
echo ========================================================
echo.
echo [1/2] Menjalankan Backend FastAPI di http://127.0.0.1:8000 ...
start "AgriBuddy Backend (FastAPI)" cmd /k "cd backend && python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload"

echo [2/2] Menjalankan Frontend Vue.js di http://localhost:5173 ...
start "AgriBuddy Frontend (Vue.js)" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================================
echo  Semua layanan sedang dimulai!
echo  - Swagger API Docs : http://127.0.0.1:8000/docs
echo  - Web Application  : http://localhost:5173
echo ========================================================
echo.
pause
