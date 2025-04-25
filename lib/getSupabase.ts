import { createClient } from '@supabase/supabase-js'

// Function to get Supabase client, handling different ENV var names
export function getSupabase() {
  // Check for NEXT_PUBLIC_ first, then fall back to non-prefixed
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.SUPABASE_ANON_KEY

  // Throw a specific error if variables are missing
  if (!url || !key) {
    console.error('Missing Supabase ENV vars. Checked NEXT_PUBLIC_SUPABASE_URL, SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_ANON_KEY.');
    throw new Error(
      'Missing Supabase configuration. Check Vercel environment variables.'
    )
  }

  // Return a new client instance
  return createClient(url, key)
}
