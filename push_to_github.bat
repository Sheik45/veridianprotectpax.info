@echo off
setlocal
set "PY=%LocalAppData%\Programs\Python\Python312\python.exe"
if not exist "%PY%" set "PY=python"
if "%GH_TOKEN%"=="" (
    echo Set GH_TOKEN first, then run this script again.
    echo Example: set GH_TOKEN=your_github_token
    pause
    exit /b 1
)
"%PY%" "%~dp0..\github_push_site.py" --domain veridianprotectpax.info
