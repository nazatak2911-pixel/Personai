@echo off
echo =======================================
echo PERSONA AI - React ^& Vite Dev Server
echo =======================================
echo.
echo Checking for Node.js...
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    echo Once installed, run this script again.
    pause
    exit /b
)

echo Installing dependencies...
call npm install

echo Starting development server...
echo The website will open in your browser automatically.
call npm run dev -- --open
pause
