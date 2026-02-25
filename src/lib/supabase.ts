import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://khgxuruuedphulsimrzn.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtoZ3h1cnV1ZWRwaHVsc2ltcnpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyOTY3MDgsImV4cCI6MjA4Njg3MjcwOH0.TgagNeF4dKzZX_B1jsKsPb9007JwXouhcBVEoWmAuPc'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

export async function hashPasscode(pwd: string): Promise<string | null> {
  if (!pwd) return null
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(pwd))
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
}
