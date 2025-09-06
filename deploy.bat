@echo off
echo 🚀 Preparing RepurposePie for Vercel deployment...

REM Check if we're in the right directory
if not exist "vercel.json" (
    echo ❌ Error: vercel.json not found. Please run this from the project root.
    exit /b 1
)

REM Install dependencies
echo 📦 Installing dependencies...

echo 📱 Frontend dependencies...
cd frontend
call npm install
cd ..

echo ⚙️ Backend dependencies...
cd backend  
call npm install
cd ..

REM Build frontend to check for errors
echo 🔨 Testing frontend build...
cd frontend
call npm run build
if errorlevel 1 (
    echo ❌ Frontend build failed! Please fix errors before deploying.
    exit /b 1
)
cd ..

echo ✅ Build successful!

REM Check environment files
echo 🔍 Checking environment configuration...

if not exist "frontend\.env.local" (
    echo ⚠️ Warning: frontend\.env.local not found
    echo 📋 Copy .env.example and configure your environment variables
)

if not exist "backend\.env" (
    echo ⚠️ Warning: backend\.env not found
    echo 📋 Copy .env.example and configure your environment variables
)

echo.
echo ✅ Project is ready for Vercel deployment!
echo.
echo 📋 Next steps:
echo 1. Push your code to GitHub:
echo    git add .
echo    git commit -m "Ready for Vercel deployment"
echo    git push origin main
echo.
echo 2. Deploy on Vercel:
echo    - Go to vercel.com
echo    - Import your GitHub repository
echo    - Configure environment variables
echo    - Deploy!
echo.
echo 📖 For detailed instructions, see DEPLOYMENT.md

pause
