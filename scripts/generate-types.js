#!/usr/bin/env node

/**
 * Generate Supabase TypeScript types from local database
 * Usage: npm run types:generate
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

function extractProjectId() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  
  if (!supabaseUrl) {
    console.error('❌ NEXT_PUBLIC_SUPABASE_URL not found in environment variables');
    process.exit(1);
  }

  // Extract project ID from URL like https://abcdefghijk.supabase.co
  const match = supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/);
  
  if (!match) {
    console.error('❌ Could not extract project ID from SUPABASE_URL:', supabaseUrl);
    console.log('💡 Expected format: https://your-project-id.supabase.co');
    process.exit(1);
  }

  return match[1];
}

function generateTypes() {
  console.log('🔄 Generating Supabase TypeScript types...');
  
  const projectId = extractProjectId();
  console.log(`📡 Project ID: ${projectId}`);
  
  const outputPath = path.join(__dirname, '..', 'models', 'types', 'database.ts');
  
  try {
    // Ensure the output directory exists
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Generate types from local database (preferred) or remote
    let command;
    try {
      // Try local first
      execSync('npx supabase status', { stdio: 'ignore' });
      command = 'npx supabase gen types typescript --local';
      console.log('🏠 Using local Supabase instance');
    } catch {
      // Fall back to remote
      command = `npx supabase gen types typescript --project-id ${projectId}`;
      console.log('🌐 Using remote Supabase instance');
    }

    const types = execSync(command, { encoding: 'utf8' });
    fs.writeFileSync(outputPath, types);
    
    console.log('✅ Types generated successfully!');
    console.log(`📄 Output: ${path.relative(process.cwd(), outputPath)}`);
    
  } catch (error) {
    console.error('❌ Failed to generate types:', error.message);
    console.log('\n💡 Make sure you have:');
    console.log('   1. Supabase CLI installed: npm install -g supabase');
    console.log('   2. Either local Supabase running OR valid project ID');
    console.log('   3. Proper authentication if using remote');
    process.exit(1);
  }
}

if (require.main === module) {
  generateTypes();
}