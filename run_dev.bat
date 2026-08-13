@echo off
cd /d "%~dp0"

set "NPM=%ProgramFiles%\nodejs\npm.cmd"
if not exist "%NPM%" set "NPM=%LocalAppData%\Programs\nodejs\npm.cmd"
if not exist "%NPM%" (
    echo npm not found. Install Node.js from https://nodejs.org
    pause
    exit /b 1
)

call "%NPM%" run dev
