@echo off
echo ========================================
echo   GitHub to DOCX - Starting Frontend
echo ========================================
echo.

cd /d "%~dp0frontend"

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
)

echo.
echo Starting React development server...
echo ========================================
npm start
