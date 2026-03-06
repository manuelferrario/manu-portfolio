import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export function createSupabaseServerClient() {
  const cookieStore = cookies() as any;

  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        if (typeof cookieStore.set === "function") {
          cookieStore.set({ name, value, ...options });
        }
      },
      remove(name: string, options: CookieOptions) {
        if (typeof cookieStore.set === "function") {
          cookieStore.set({ name, value: "", ...options });
        }
      }
    }
  });
}

