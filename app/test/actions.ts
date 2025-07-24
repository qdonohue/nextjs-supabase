'use server'

import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

export async function testAction() {
  console.log('test button was clicked')
}

export async function initSupabaseAction() {
  try {
    console.log('Starting Supabase local development environment...')
    const { stdout, stderr } = await execAsync('npx supabase start')
    console.log('Supabase stdout:', stdout)
    if (stderr) console.log('Supabase stderr:', stderr)
    console.log('✅ Supabase started successfully')
  } catch (error) {
    console.error('❌ Failed to start Supabase:', error)
  }
}

export async function stopSupabaseAction() {
  try {
    console.log('Stopping Supabase local development environment...')
    const { stdout, stderr } = await execAsync('npx supabase stop')
    console.log('Supabase stdout:', stdout)
    if (stderr) console.log('Supabase stderr:', stderr)
    console.log('✅ Supabase stopped successfully')
  } catch (error) {
    console.error('❌ Failed to stop Supabase:', error)
  }
}