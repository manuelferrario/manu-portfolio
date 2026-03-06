import Link from "next/link";
import { BuildingContent } from "@/data/cityBuildings";

type InfoPanelProps = {
  building: BuildingContent;
  loading: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
};

export function InfoPanel({ building, loading, onClose, onNext, onPrev }: InfoPanelProps) {
  return (
    <div className="panel-scroll h-full overflow-y-auto pr-1 text-white">
      <div className="mb-6 flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/65">{building.zone}</p>
          <h2 className="display-font mt-1 text-4xl font-bold leading-tight">{building.name}</h2>
          <p className="mt-2 text-xs text-white/70">{building.timeline} - {building.location}</p>
        </div>
        <button type="button" onClick={onClose} className="rounded-full border border-white/30 px-3 py-1 text-xs font-semibold hover:bg-white/10">
          Close
        </button>
      </div>

      <div className="mb-5 grid grid-cols-2 gap-2">
        <button type="button" onClick={onPrev} className="rounded-xl border border-white/30 px-3 py-2 text-xs font-semibold hover:bg-white/10">
          Previous
        </button>
        <button type="button" onClick={onNext} className="rounded-xl border border-white/30 px-3 py-2 text-xs font-semibold hover:bg-white/10">
          Next
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">
          <div className="h-20 animate-pulse rounded-2xl bg-white/10" />
          <div className="h-20 animate-pulse rounded-2xl bg-white/10" />
          <div className="h-20 animate-pulse rounded-2xl bg-white/10" />
        </div>
      ) : (
        <section className="space-y-4 text-sm">
          <article className="rounded-2xl border border-white/20 bg-white/10 p-4">
            <h3 className="mb-2 text-xs uppercase tracking-[0.18em] text-white/70">What it Represents</h3>
            <p className="leading-relaxed text-white/92">{building.story}</p>
          </article>

          <article className="rounded-2xl border border-white/20 bg-white/10 p-4">
            <h3 className="mb-2 text-xs uppercase tracking-[0.18em] text-white/70">Highlights</h3>
            <ul className="space-y-2 pl-4">
              {building.bullets.map((item) => (
                <li key={item} className="list-disc text-white/92">{item}</li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-white/20 bg-white/10 p-4">
            <h3 className="mb-2 text-xs uppercase tracking-[0.18em] text-white/70">Skills</h3>
            <ul className="flex flex-wrap gap-2">
              {building.skills.map((skill) => (
                <li key={skill} className="rounded-full border border-white/35 px-3 py-1 text-xs">{skill}</li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-white/20 bg-white/10 p-4">
            <h3 className="mb-2 text-xs uppercase tracking-[0.18em] text-white/70">Links</h3>
            <ul className="space-y-1">
              {building.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} target="_blank" rel="noreferrer" className="underline decoration-white/40 underline-offset-4">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </article>
        </section>
      )}
    </div>
  );
}


