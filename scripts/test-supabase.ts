#!/usr/bin/env npx ts-node

import { config } from 'dotenv';
import { createClient } from '@/lib/supabase/server';

/**
 * Test script to verify Supabase connection and basic queries
 * Usage: npx ts-node scripts/test-supabase.ts
 */

// Load environment variables
config({ path: '.env.local' });

// Validate required environment variables
const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY'
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`❌ Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
}

async function testSupabaseConnection() {
  console.log('🔍 Testing Supabase connection...');
  console.log(`📡 Supabase URL: ${process.env.NEXT_PUBLIC_SUPABASE_URL}`);
  
  try {
    const supabase = await createClient();
    
    // Test basic connection by trying to get the current time from the database
    const { data, error } = await supabase.rpc('now');
    
    if (error) {
      console.error('❌ Error connecting to Supabase:', error.message);
      return;
    }
    
    console.log('✅ Successfully connected to Supabase!');
    console.log(`🕐 Database time: ${data}`);
    console.log('\n💡 Connection test passed. You can now create tables and start building your app.');
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

if (require.main === module) {
  testSupabaseConnection();
}