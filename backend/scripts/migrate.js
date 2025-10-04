#!/usr/bin/env node

/**
 * Database Migration Script
 * Run this script to set up your Supabase database
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase configuration');
  console.error('Please set SUPABASE_URL and SUPABASE_SERVICE_KEY in backend/.env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrate() {
  console.log('🚀 Starting database migration...\n');

  try {
    // Read the SQL migration file
    const sqlPath = path.join(__dirname, '../../database/init.sql');
    const sqlContent = fs.readFileSync(sqlPath, 'utf8');

    console.log('📄 SQL Migration File:');
    console.log('─'.repeat(60));
    console.log(sqlContent);
    console.log('─'.repeat(60));
    console.log('\n⚠️  IMPORTANT: You need to run this SQL manually in Supabase SQL Editor');
    console.log('\n📋 Steps to complete migration:');
    console.log('1. Go to: https://supabase.com/dashboard/project/' + supabaseUrl.split('//')[1].split('.')[0] + '/sql/new');
    console.log('2. Copy the SQL content above');
    console.log('3. Paste it into the SQL Editor');
    console.log('4. Click "Run" to execute');
    console.log('\n5. Then run the storage policies SQL:');

    const storageSqlPath = path.join(__dirname, '../../database/storage-policies.sql');
    const storageSqlContent = fs.readFileSync(storageSqlPath, 'utf8');

    console.log('\n📄 Storage Policies SQL:');
    console.log('─'.repeat(60));
    console.log(storageSqlContent);
    console.log('─'.repeat(60));

    console.log('\n✅ Migration files displayed successfully!');
    console.log('\nℹ️  Alternatively, copy the files from:');
    console.log('   - database/init.sql');
    console.log('   - database/storage-policies.sql');

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

migrate();
