import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Supabase environment variables (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY) are missing. " +
    "Make sure they are set in your local .env file or Vercel Environment Variables."
  );
}

// Public client that can be used on BOTH Client (browser) and Server.
// It respects Row Level Security (RLS) policies.
export const supabase = createClient(supabaseUrl || "", supabaseAnonKey || "");
