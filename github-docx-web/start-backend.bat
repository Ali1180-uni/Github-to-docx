@echo off
echo ========================================
echo   GitHub to DOCX - Starting Backend
echo ========================================
echo.

cd /d "%~dp0backend"

REM Check if venv exists
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate venv
call venv\Scripts\activate

REM Install requirements
echo Installing dependencies...
pip install -r requirements.txt

echo.
echo Starting Flask server...
echo ========================================
python app.py
