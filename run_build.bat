@echo off
setlocal
cd /d "%~dp0"

set "NPM=%ProgramFiles%\nodejs\npm.cmd"
if not exist "%NPM%" set "NPM=%LocalAppData%\Programs\nodejs\npm.cmd"
if not exist "%NPM%" (
    echo npm not found. Install Node.js from https://nodejs.org
    pause
    exit /b 1
)

if not exist node_modules call "%NPM%" install
call "%NPM%" run build
echo.
echo Built to: dist\
echo Deploy: run ..\run_deploy_triful.bat
pause
