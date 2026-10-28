@echo off
rem ============================================================
rem  Abre o painel do blog como um app (janela propria do Edge).
rem  Sobe o servidor local se ele ainda nao estiver rodando.
rem  Crie um atalho deste arquivo na area de trabalho.
rem ============================================================
title Painel do blog
cd /d "%~dp0.."

set URL=http://localhost:4321/admin/index.html

rem O servidor ja esta no ar? Entao so abre o painel.
powershell -NoProfile -Command "try { Invoke-WebRequest '%URL%' -UseBasicParsing -TimeoutSec 2 | Out-Null; exit 0 } catch { exit 1 }"
if %errorlevel%==0 goto abrir

echo Iniciando o servidor local do blog...
start "Blog - servidor local (feche para desligar)" /min cmd /k "npm run dev -- --port 4321"

rem Espera o servidor responder (ate 90 segundos)
powershell -NoProfile -Command "for ($i = 0; $i -lt 90; $i++) { try { Invoke-WebRequest '%URL%' -UseBasicParsing -TimeoutSec 2 | Out-Null; exit 0 } catch { Start-Sleep 1 } }; exit 1"
if not %errorlevel%==0 (
  echo.
  echo Nao foi possivel iniciar o servidor. Veja a janela "Blog - servidor local".
  pause
  exit /b 1
)

:abrir
start "" msedge --app=%URL%
exit /b 0
