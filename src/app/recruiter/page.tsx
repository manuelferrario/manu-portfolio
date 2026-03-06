"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RecruiterProfile } from "@/components/recruiter/RecruiterProfile";
import { createSupabaseBrowserClient } from "@/lib/supabase";

export default function RecruiterPage() {
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      const supabase = createSupabaseBrowserClient();
      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/login?next=/recruiter");
        return;
      }

      setEmail(user.email ?? "Unknown user");
      setLoading(false);
    };

    void load();
  }, [router]);

  const handleSignOut = async () => {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading || !email) {
    return (
      <section className="mx-auto max-w-4xl rounded-[1.8rem] border border-white/35 bg-white/10 p-8 text-white backdrop-blur-md">
        Loading recruiter profile...
      </section>
    );
  }

  return <RecruiterProfile email={email} onSignOut={handleSignOut} />;
}

