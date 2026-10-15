@echo off
TITLE AURA CARE SANCTUARY - ONE COMMAND LAUNCHER
COLOR 0C

echo ==============================================================================
echo                 AURA CARE SANCTUARY - VIRTUAL HOSPITAL
echo         Multi-Agent Women's Health & PCOS Care Navigation Platform
echo ==============================================================================
echo.
echo [1/3] Checking Environment...
cd /d "%~dp0"

echo [2/3] Launching FastAPI Multi-Agent Backend on http://localhost:8000 ...
start "Aura Care Backend" cmd /k "cd /d "%~dp0backend" && python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload"

echo [3/3] Launching React+Vite Sanctuary Frontend on http://localhost:5173 ...
start "Aura Care Frontend" cmd /k "cd /d "%~dp0frontend" && npm run dev"

echo.
echo Waiting 3 seconds for services to initialize...
timeout /t 3 /nobreak >nul

echo Opening Aura Care Sanctuary in your default browser...
start http://localhost:5173

echo.
echo ==============================================================================
echo Sanctuary is live!
echo - Frontend: http://localhost:5173
echo - Backend:  http://localhost:8000
echo - Swagger Docs: http://localhost:8000/docs
echo ==============================================================================
pause
