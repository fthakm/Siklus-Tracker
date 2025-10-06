import { createClient } from "@supabase/supabase-js";

/**
 * Supabase client tunggal untuk seluruh aplikasi
 * Menggunakan environment variable yang kompatibel untuk Vite & React App
 */

const SUPABASE_URL =
  process.env.REACT_APP_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY =
  process.env.REACT_APP_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error("❌ Supabase environment variables belum diset!");
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
