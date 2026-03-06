import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

function canSetCookies(
  store: ReturnType<typeof cookies>
): store is ReturnType<typeof cookies> & {
  set: (cookie: { name: string; value: string } & CookieOptions) => void;
} {
  return (
    typeof store === "object" &&
    store !== null &&
    "set" in store &&
    typeof (store as { set?: unknown }).set === "function"
  );
}

export function createSupabaseServerClient() {
  const cookieStore = cookies();

  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        if (canSetCookies(cookieStore)) {
          cookieStore.set({ name, value, ...options });
        }
      },
      remove(name: string, options: CookieOptions) {
        if (canSetCookies(cookieStore)) {
          cookieStore.set({ name, value: "", ...options });
        }
      }
    }
  });
}
