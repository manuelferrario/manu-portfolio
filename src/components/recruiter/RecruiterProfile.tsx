"use client";

import { useState } from "react";
import { profile } from "@/data/cityBuildings";

type Props = {
  email: string;
  onSignOut: () => Promise<void>;
};

export function RecruiterProfile({ email, onSignOut }: Props) {
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await onSignOut();
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <section className="mx-auto max-w-5xl rounded-[1.8rem] border border-white/35 bg-white/12 p-6 backdrop-blur-md sm:p-8">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="display-font text-3xl font-bold text-white">Recruiter View</h1>
          <p className="text-sm text-white/75">Authenticated as {email}</p>
        </div>
        <div className="flex gap-2">
          <button type="button" className="rounded-full border border-white/40 bg-white/90 px-4 py-2 text-xs font-semibold text-[#2f2264]">
            Download PDF (placeholder)
          </button>
          <button
            type="button"
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="rounded-full border border-white/40 px-4 py-2 text-xs font-semibold text-white disabled:opacity-60"
          >
            {isSigningOut ? "Signing out..." : "Sign out"}
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <article className="rounded-3xl border border-white/30 bg-black/20 p-4">
          <h2 className="display-font text-lg font-semibold">Summary</h2>
          <p className="mt-2 text-sm text-white/90">{profile.summary}</p>
        </article>

        <article className="rounded-3xl border border-white/30 bg-black/20 p-4 text-sm">
          <h2 className="display-font text-lg font-semibold">Contact</h2>
          <p className="mt-2">{profile.location}</p>
          <p>{profile.phone}</p>
          <p>{profile.email}</p>
        </article>

        <article className="rounded-3xl border border-white/30 bg-black/20 p-4 text-sm">
          <h2 className="display-font text-lg font-semibold">Skills</h2>
          <ul className="mt-2 space-y-2 pl-4">
            {profile.skills.map((skill) => (
              <li className="list-disc" key={skill}>
                {skill}
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-3xl border border-white/30 bg-black/20 p-4 text-sm">
          <h2 className="display-font text-lg font-semibold">Languages & Passions</h2>
          <ul className="mt-2 space-y-1">
            {profile.languages.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-3 text-xs uppercase tracking-wide text-white/70">Passions</p>
          <ul className="mt-1 flex flex-wrap gap-2 text-xs">
            {profile.passions.map((passion) => (
              <li className="rounded-full border border-white/35 px-3 py-1" key={passion}>
                {passion}
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}

