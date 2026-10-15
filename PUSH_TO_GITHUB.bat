@echo off
TITLE PUSH AURA CARE SANCTUARY TO GITHUB
COLOR 0A

echo ==============================================================================
echo              PUSHING TO GITHUB: keerthanaaids1/Woman-s-health
echo ==============================================================================
echo.
cd /d "%~dp0"

echo [1/3] Checking Git Status...
git status

echo.
echo [2/3] Ensuring files are staged and committed...
git add .
git commit -m "feat: Aura Care Sanctuary - Multi-Agent Womens Health and PCOS Care Platform" 2>nul

echo.
echo [3/3] Pushing to https://github.com/keerthanaaids1/Woman-s-health.git ...
echo (If a GitHub login prompt appears, select 'Sign in with your browser')
echo.
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ==============================================================================
    echo [SUCCESS] Pushed successfully to:
    echo https://github.com/keerthanaaids1/Woman-s-health
    echo ==============================================================================
) else (
    echo.
    echo ==============================================================================
    echo [NOTICE] If prompted for credentials, authenticate with your GitHub
    echo account 'keerthanaaids1' or enter a GitHub Personal Access Token (PAT).
    echo ==============================================================================
)

echo.
pause
