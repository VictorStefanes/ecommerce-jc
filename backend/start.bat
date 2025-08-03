@echo off
echo 🚀 Iniciando E-commerce JC Backend...
echo.

REM Verificar se o MongoDB está rodando
echo 📦 Verificando MongoDB...
mongosh --quiet --eval "db.version()" >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ MongoDB não está rodando!
    echo 💡 Inicie o MongoDB com: mongod
    pause
    exit /b 1
)

echo ✅ MongoDB está funcionando!
echo.

REM Executar seed do banco
echo 🌱 Populando banco de dados...
node scripts/seedDatabase.js

echo.
echo 🚀 Iniciando servidor...
npm run dev
