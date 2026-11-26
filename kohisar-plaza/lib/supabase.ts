import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const IMAGE_BUCKET = "property-images";

/** True when the Supabase env vars are set (in Vercel and .env.local). */
export function isSupabaseConfigured(): boolean {
  return Boolean(url && anonKey);
}

/** Server-side, read-only client for public pages. No session is stored. */
export function getServerSupabase(): SupabaseClient | null {
  if (!url || !anonKey) return null;
  return createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

let browserClient: SupabaseClient | null = null;

/** Browser client for the admin panel. Keeps the admin logged in. */
export function getBrowserSupabase(): SupabaseClient | null {
  if (!url || !anonKey) return null;
  if (!browserClient) {
    browserClient = createClient(url, anonKey, {
      auth: { persistSession: true, autoRefreshToken: true },
    });
  }
  return browserClient;
}
