#!/bin/bash

# RepurposePie Deployment Script
echo "🚀 Preparing RepurposePie for Vercel deployment..."

# Check if we're in the right directory
if [ ! -f "vercel.json" ]; then
    echo "❌ Error: vercel.json not found. Please run this from the project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."

echo "📱 Frontend dependencies..."
cd frontend && npm install
cd ..

echo "⚙️ Backend dependencies..."  
cd backend && npm install
cd ..

# Build frontend to check for errors
echo "🔨 Testing frontend build..."
cd frontend
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Frontend build failed! Please fix errors before deploying."
    exit 1
fi
cd ..

echo "✅ Build successful!"

# Check environment files
echo "🔍 Checking environment configuration..."

if [ ! -f "frontend/.env.local" ]; then
    echo "⚠️ Warning: frontend/.env.local not found"
    echo "📋 Copy .env.example and configure your environment variables"
fi

if [ ! -f "backend/.env" ]; then
    echo "⚠️ Warning: backend/.env not found"  
    echo "📋 Copy .env.example and configure your environment variables"
fi

echo ""
echo "✅ Project is ready for Vercel deployment!"
echo ""
echo "📋 Next steps:"
echo "1. Push your code to GitHub:"
echo "   git add ."
echo "   git commit -m 'Ready for Vercel deployment'"
echo "   git push origin main"
echo ""
echo "2. Deploy on Vercel:"
echo "   - Go to vercel.com"
echo "   - Import your GitHub repository"
echo "   - Configure environment variables"
echo "   - Deploy!"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT.md"
