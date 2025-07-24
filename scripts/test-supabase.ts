#!/usr/bin/env npx ts-node

import { config } from 'dotenv';
import { getAllPosts } from '@/models/queries/posts';

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
    // Test a simple query
    const { data, error } = await getAllPosts();
    
    if (error) {
      console.error('❌ Error querying posts:', error);
      console.log('\n💡 This might be expected if the "posts" table doesn\'t exist yet.');
      console.log('   You can create it in your Supabase dashboard with:');
      console.log(`
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
      `);
      return;
    }
    
    console.log('✅ Successfully connected to Supabase!');
    console.log(`📊 Found ${data?.length || 0} posts in the database`);
    
    if (data && data.length > 0) {
      console.log('\n📝 Sample posts:');
      data.slice(0, 3).forEach((post, index) => {
        console.log(`  ${index + 1}. ${post.title} (${post.created_at})`);
      });
    }
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

if (require.main === module) {
  testSupabaseConnection();
}