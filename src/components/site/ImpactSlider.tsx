import { useState } from "react";

export function ImpactSlider() {
  const [years, setYears] = useState(20);

  const projectsLed = Math.round(years * 2.25);
  const sqft = (years * 0.125).toFixed(1);
  const capital = Math.round(years * 42.5);

  return (
    <section className="border-t border-carbon/10 bg-bone px-6 py-32 md:px-20">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-16 md:flex-row">
        <div className="md:w-1/2">
          <h2 className="mb-6 font-serif text-4xl md:text-5xl">Quantifiable Impact.</h2>
          <p className="mb-10 text-lg text-carbon/60">
            Use the slider to see the compounding value of experienced leadership.
          </p>

          <label className="mb-4 flex justify-between font-mono text-xs uppercase tracking-widest text-carbon/50">
            <span>Years in Industry</span>
            <span className="font-bold text-brass-dark">{years}</span>
          </label>
          <input
            type="range"
            min={1}
            max={25}
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            aria-label="Years in industry"
            className="h-1 w-full cursor-pointer appearance-none rounded-lg bg-carbon/20 accent-brass"
          />
        </div>

        <div className="w-full rounded-sm bg-carbon p-12 text-bone md:w-1/2">
          <div className="space-y-8">
            <div>
              <div className="mb-2 text-xs uppercase tracking-widest text-brass">Projects Led</div>
              <div className="font-serif text-5xl">{projectsLed}</div>
            </div>
            <div className="h-px w-full bg-bone/10" />
            <div>
              <div className="mb-2 text-xs uppercase tracking-widest text-brass">
                Sq Ft Delivered
              </div>
              <div className="font-serif text-5xl">{sqft}M</div>
            </div>
            <div className="h-px w-full bg-bone/10" />
            <div>
              <div className="mb-2 text-xs uppercase tracking-widest text-brass">
                Capital Managed
              </div>
              <div className="font-serif text-5xl">${capital}M</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
