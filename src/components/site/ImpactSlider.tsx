import { useState } from "react";

function fmt(n: number) {
  return n.toLocaleString("en-US");
}

export function ImpactSlider() {
  const [years, setYears] = useState(20);
  const projects = Math.round(years * 2.25);
  const sqft = (years * 0.125).toFixed(2);
  const capital = Math.round(years * 42.5);

  const metrics = [
    { label: "Projects Led", value: fmt(projects) },
    { label: "Sq Ft Delivered", value: `${sqft}M` },
    { label: "Capital Managed", value: `$${fmt(capital)}M` },
  ];

  return (
    <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
      <div>
        <div className="flex items-baseline justify-between">
          <span className="label-mono text-muted-foreground">Years in Industry</span>
          <span className="font-display text-4xl text-gold">{years}</span>
        </div>
        <input
          type="range"
          min={1}
          max={20}
          value={years}
          onChange={(e) => setYears(Number(e.target.value))}
          aria-label="Years in industry"
          className="mt-6 h-1 w-full cursor-pointer appearance-none rounded-full bg-secondary accent-gold"
        />
      </div>

      <div className="grid grid-cols-3 gap-6 border-l border-border pl-6 md:gap-10 md:pl-12">
        {metrics.map((m) => (
          <div key={m.label}>
            <p className="font-display text-2xl md:text-4xl">{m.value}</p>
            <p className="label-mono mt-3 text-muted-foreground">{m.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}