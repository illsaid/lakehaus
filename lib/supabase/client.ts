import { createClient, SupabaseClient } from '@supabase/supabase-js';

let _client: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (!_client) {
    _client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
          storageKey: 'sb-session',
        },
      }
    );
  }
  return _client;
}

export const supabase = {
  get auth() { return getSupabaseClient().auth; },
  from: (table: string) => getSupabaseClient().from(table),
  get storage() { return getSupabaseClient().storage; },
};
