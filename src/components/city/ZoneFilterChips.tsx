type ZoneFilter = "all" | "Personal" | "Academic" | "Work";

type ZoneFilterChipsProps = {
  value: ZoneFilter;
  onChange: (value: ZoneFilter) => void;
};

const zones: ZoneFilter[] = ["all", "Personal", "Academic", "Work"];

export function ZoneFilterChips({ value, onChange }: ZoneFilterChipsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter buildings by zone">
      {zones.map((zone) => {
        const active = value === zone;
        return (
          <button
            key={zone}
            type="button"
            onClick={() => onChange(zone)}
            className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
              active ? "border-white/80 bg-white/30 text-white" : "border-white/35 bg-black/25 text-white/85 hover:bg-white/20"
            }`}
            aria-pressed={active}
          >
            {zone === "all" ? "All zones" : zone}
          </button>
        );
      })}
    </div>
  );
}

