"use client";

import { FormEvent, Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const searchParams = useSearchParams();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    const supabase = createSupabaseBrowserClient();
    const nextPath = searchParams.get("next") || "/recruiter";
    const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(nextPath)}`;

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectTo
      }
    });

    setMessage(error ? error.message : "Magic link sent. Check your email inbox.");
    setLoading(false);
  };

  return (
    <section className="mx-auto max-w-lg rounded-[1.8rem] border border-white/35 bg-white/12 p-6 backdrop-blur-md sm:p-8">
      <h1 className="display-font text-3xl font-bold text-white">Recruiter Login</h1>
      <p className="mt-2 text-sm text-white/85">Use a Supabase magic link to access recruiter mode.</p>

      <form className="mt-6 space-y-4" onSubmit={onSubmit}>
        <label className="block text-sm">
          <span className="mb-1 block text-white/90">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl border border-white/35 bg-black/20 px-4 py-3 text-white placeholder:text-white/50 focus:border-white/70 focus:outline-none"
            placeholder="you@company.com"
          />
        </label>

        <button type="submit" disabled={loading} className="w-full rounded-2xl bg-white/90 px-4 py-3 text-sm font-semibold text-[#2f2264] disabled:opacity-60">
          {loading ? "Sending..." : "Send magic link"}
        </button>

        {message ? <p className="text-sm text-white/90">{message}</p> : null}
      </form>
    </section>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <section className="mx-auto max-w-lg rounded-[1.8rem] border border-white/35 bg-white/12 p-6 backdrop-blur-md sm:p-8">
          <h1 className="display-font text-3xl font-bold text-white">Recruiter Login</h1>
          <p className="mt-2 text-sm text-white/85">Loading...</p>
        </section>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
