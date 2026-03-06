import Link from "next/link";
import { profile } from "@/data/cityBuildings";

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-4xl rounded-[1.8rem] border border-white/35 bg-white/12 p-6 backdrop-blur-md sm:p-8">
      <h1 className="display-font text-4xl font-bold">About Manu</h1>
      <p className="mt-4 text-base leading-relaxed text-white/90">{profile.summary}</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <article className="rounded-3xl border border-white/30 bg-black/20 p-4 text-sm">
          <h2 className="display-font text-lg font-semibold">Education</h2>
          <ul className="mt-2 space-y-2 pl-4">
            {profile.education.map((item) => (
              <li key={item} className="list-disc">
                {item}
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-3xl border border-white/30 bg-black/20 p-4 text-sm">
          <h2 className="display-font text-lg font-semibold">Skills</h2>
          <ul className="mt-2 space-y-2 pl-4">
            {profile.skills.map((item) => (
              <li key={item} className="list-disc">
                {item}
              </li>
            ))}
          </ul>
        </article>
      </div>

      <div className="mt-6 rounded-3xl border border-white/30 bg-black/20 p-4 text-sm">
        <p className="font-semibold">Contact</p>
        <p className="mt-1">{profile.phone}</p>
        <p>{profile.email}</p>
        <Link href={profile.linkedin} className="mt-2 inline-block underline decoration-white/60 underline-offset-4">
          LinkedIn Profile
        </Link>
      </div>
    </section>
  );
}

