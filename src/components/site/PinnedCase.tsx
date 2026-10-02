
export function PinnedCase({ id, subtitle, title, images, alts, captions, stats }: PinnedCaseProps) {
  const labels = ["01 / The Vision", "02 / The Execution", "03 / The Result"];
  return (
    <section id={id} className="relative bg-carbon px-6 py-24 text-bone md:px-20 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <p className="mb-4 font-mono text-[0.65rem] uppercase tracking-[0.3em] text-brass">{subtitle}</p>
        <h2 className="mb-10 max-w-4xl font-serif text-4xl leading-[1.05] md:mb-14 md:text-7xl">{title}</h2>

        <div className="grid gap-3 md:grid-cols-3 md:gap-4">
          <figure className="overflow-hidden md:col-span-2 md:row-span-2">
            <img src={images[0]} alt={alts[0]} loading="lazy" className="aspect-[4/3] h-full w-full object-cover md:aspect-auto" />
          </figure>
          <figure className="overflow-hidden">
            <img src={images[1]} alt={alts[1]} loading="lazy" className="aspect-[4/3] h-full w-full object-cover" />
          </figure>
          <figure className="overflow-hidden">
            <img src={images[2]} alt={alts[2]} loading="lazy" className="aspect-[4/3] h-full w-full object-cover" />
          </figure>
        </div>

        <div className="mt-10 grid gap-10 border-t border-bone/10 pt-10 md:mt-14 md:grid-cols-3 md:gap-12">
          {captions.map((c, i) => (
            <div key={labels[i]}>
              <p className="mb-3 font-mono text-xs text-brass">{labels[i]}</p>
              <p className="font-serif text-xl leading-snug text-bone/90 md:text-2xl">{c}</p>
            </div>
          ))}
          <div>
            <p className="mb-3 font-mono text-xs text-brass">{labels[2]}</p>
            <div className="flex items-end gap-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-serif text-4xl leading-none text-brass md:text-5xl">{s.value}</div>
                  <div className="mt-2 text-[0.65rem] uppercase tracking-[0.2em] text-bone/60">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
