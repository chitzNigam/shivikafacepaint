import { createClient } from '@supabase/supabase-js';

// These are safe to expose in frontend code — Supabase uses Row Level Security
// to protect your data. The anon key only allows what you explicitly permit.
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
