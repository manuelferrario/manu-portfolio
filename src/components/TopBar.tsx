"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase";

function LockBadge({ unlocked }: { unlocked: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block h-2.5 w-2.5 rounded-full ${unlocked ? "bg-emerald-300" : "bg-amber-300"}`}
    />
  );
}

export function TopBar() {
  const pathname = usePathname();
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const load = async () => {
      const supabase = createSupabaseBrowserClient();
      const {
        data: { user }
      } = await supabase.auth.getUser();
      setIsSignedIn(Boolean(user));
    };

    void load();
  }, []);

  return (
    <header className="sticky top-0 z-40 mx-auto flex w-full max-w-[1400px] items-center justify-between px-4 pb-3 pt-5 sm:px-6">
      <div className="rounded-full border border-white/30 bg-black/20 px-4 py-2 backdrop-blur-md">
        <Link href="/" className="display-font text-sm font-bold tracking-wide text-white/95">
          Manu City Portfolio
        </Link>
      </div>

      <div className="flex items-center gap-2 rounded-full border border-white/35 bg-white/78 p-1 text-[#2c215e] shadow-xl shadow-black/20 backdrop-blur-md">
        <Link
          href="/about"
          className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
            pathname === "/about" ? "bg-[#2f2264] text-white" : "hover:bg-[#2f22641a]"
          }`}
        >
          About
        </Link>
        <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
          <Link
            href="/recruiter"
            className="flex items-center gap-2 rounded-full bg-[#2f2264] px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-[#2f226455]"
            aria-label={isSignedIn ? "Open recruiter mode" : "Sign in for recruiter mode"}
          >
            <LockBadge unlocked={isSignedIn} />
            <span>{isSignedIn ? "Recruiter mode" : "Recruiter sign in"}</span>
          </Link>
        </motion.div>
      </div>
    </header>
  );
}

