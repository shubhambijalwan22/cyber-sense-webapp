import { createClient } from "@supabase/supabase-js";
import { getServerConfig } from "./config.server";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const { supabaseServiceRoleKey } = getServerConfig();

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.warn(
    "Supabase URL or Service Role Key is missing on the server. " +
    "Server-side operations with elevated privileges might fail."
  );
}

// Server-only client that has administrative privileges.
// Bypasses Row Level Security (RLS) policies.
// NEVER import this in client-side components.
export const supabaseServer = createClient(
  supabaseUrl || "",
  supabaseServiceRoleKey || "",
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);
