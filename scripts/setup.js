#!/usr/bin/env node

/**
 * Quick Setup Script for RepurposePie
 * Helps guide users through the setup process
 */

const fs = require('fs');
const path = require('path');

console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🎯 Welcome to RepurposePie Setup!                      ║
║                                                           ║
║   This script will guide you through the setup process   ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
`);

console.log('\n📋 Setup Checklist:\n');

// Check Node version
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

console.log(`✓ Node.js version: ${nodeVersion}`);
if (majorVersion < 18) {
  console.log('  ⚠️  Warning: Node.js 18+ is required. Please upgrade.');
} else {
  console.log('  ✅ Node.js version is compatible');
}

// Check if dependencies are installed
const backendNodeModules = path.join(__dirname, '../backend/node_modules');
const frontendNodeModules = path.join(__dirname, '../frontend/node_modules');

console.log('\n📦 Dependencies:');
if (fs.existsSync(backendNodeModules)) {
  console.log('  ✅ Backend dependencies installed');
} else {
  console.log('  ❌ Backend dependencies not installed');
  console.log('     Run: cd backend && npm install');
}

if (fs.existsSync(frontendNodeModules)) {
  console.log('  ✅ Frontend dependencies installed');
} else {
  console.log('  ❌ Frontend dependencies not installed');
  console.log('     Run: cd frontend && npm install');
}

// Check environment files
console.log('\n🔑 Environment Configuration:');

const backendEnv = path.join(__dirname, '../backend/.env');
const frontendEnv = path.join(__dirname, '../frontend/.env.local');

if (fs.existsSync(backendEnv)) {
  console.log('  ✅ Backend .env file exists');

  // Check if it has required values
  const envContent = fs.readFileSync(backendEnv, 'utf8');
  const hasSupabaseUrl = envContent.includes('SUPABASE_URL=') && !envContent.includes('SUPABASE_URL=your_');
  const hasSupabaseKey = envContent.includes('SUPABASE_SERVICE_KEY=') && !envContent.includes('SUPABASE_SERVICE_KEY=your_');
  const hasGeminiKey = envContent.includes('GEMINI_API_KEY=') && !envContent.includes('GEMINI_API_KEY=your_');

  if (hasSupabaseUrl && hasSupabaseKey && hasGeminiKey) {
    console.log('     ✅ All required keys are configured');
  } else {
    console.log('     ⚠️  Some keys need to be configured:');
    if (!hasSupabaseUrl) console.log('        - SUPABASE_URL');
    if (!hasSupabaseKey) console.log('        - SUPABASE_SERVICE_KEY');
    if (!hasGeminiKey) console.log('        - GEMINI_API_KEY');
  }
} else {
  console.log('  ❌ Backend .env file missing');
  console.log('     Create backend/.env with your Supabase and Gemini credentials');
}

if (fs.existsSync(frontendEnv)) {
  console.log('  ✅ Frontend .env.local file exists');
} else {
  console.log('  ❌ Frontend .env.local file missing');
  console.log('     Create frontend/.env.local with your Supabase credentials');
}

// Database setup check
console.log('\n🗄️  Database Setup:');
console.log('  ℹ️  Database tables need to be created in Supabase');
console.log('  ');
console.log('  Steps:');
console.log('  1. Go to your Supabase Dashboard > SQL Editor');
console.log('  2. Run: cd backend && npm run migrate');
console.log('  3. Copy the displayed SQL and run it in Supabase');
console.log('  4. Create storage buckets in Supabase Dashboard');

// Next steps
console.log('\n🚀 Next Steps:\n');

const allReady =
  majorVersion >= 18 &&
  fs.existsSync(backendNodeModules) &&
  fs.existsSync(frontendNodeModules) &&
  fs.existsSync(backendEnv) &&
  fs.existsSync(frontendEnv);

if (allReady) {
  console.log('  ✅ Almost ready to start!');
  console.log('');
  console.log('  Complete these final steps:');
  console.log('  1. Setup database: cd backend && npm run migrate');
  console.log('  2. Create storage buckets in Supabase Dashboard');
  console.log('  3. Start development: npm run dev');
} else {
  console.log('  📝 Complete the following:');
  console.log('');
  if (!fs.existsSync(backendNodeModules) || !fs.existsSync(frontendNodeModules)) {
    console.log('  1. Install dependencies:');
    console.log('     npm run install:all');
  }
  if (!fs.existsSync(backendEnv)) {
    console.log('  2. Create backend/.env with your credentials');
  }
  if (!fs.existsSync(frontendEnv)) {
    console.log('  3. Create frontend/.env.local with your credentials');
  }
  console.log('  4. Setup database: cd backend && npm run migrate');
  console.log('  5. Start development: npm run dev');
}

console.log('\n📚 Documentation:');
console.log('  - Complete guide: See SETUP.md');
console.log('  - README: See README.md');
console.log('  - Database schema: See database/init.sql');

console.log('\n🆘 Need help?');
console.log('  - GitHub Issues: https://github.com/Soumyajit2005/Repurpose-pie/issues');
console.log('  - Supabase Docs: https://supabase.com/docs');
console.log('  - Gemini API: https://ai.google.dev/docs');

console.log('\n');
