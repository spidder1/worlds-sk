import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jhgyzgdiapiewpjgosxm.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpoZ3l6Z2RpYXBpZXdwamdvc3htIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgwNzI2OTksImV4cCI6MjEwMzY0ODY5OX0.6SAAJarR0Er3LFFewmcJTN_oEE2OoEMLqUTQJRGA3hY';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false },
});
