import { useEffect, useRef, useState } from "react";

export type PinnedCaseProps = {
  id: string;
  subtitle: string;
  title: string;
  images: [string, string, string];
  alts: [string, string, string];
  captions: [string, string];
  stats: [{ value: string; label: string }, { value: string; label: string }];
};

export function PinnedCase({
  id,
  subtitle,
  title,
  images,
  alts,
  captions,
  stats,
}: PinnedCaseProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const progress = total > 0 ? Math.min(Math.max(-rect.top / total, 0), 0.999) : 0;
      setStep(Math.floor(progress * 3));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const labels = ["01 / The Vision", "02 / The Execution", "03 / The Result"];

  return (
    <section id={id} ref={wrapRef} className="relative h-[240vh] bg-carbon">
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-carbon text-bone">
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={alts[i]}
            loading="eager"
            className="absolute inset-0 h-full w-full object-cover object-center transition-all duration-1000 ease-out"
            style={{
              opacity: step === i ? 1 : 0,
              transform: step === i ? "scale(1)" : "scale(1.04)",
            }}
          />
        ))}

        <div className="absolute inset-0 z-20 bg-carbon/50" />

        <div className="pointer-events-none absolute top-1/2 left-1/2 z-30 w-full -translate-x-1/2 -translate-y-1/2 px-6 text-center">
          <h3 className="mb-6 text-xs uppercase tracking-[0.3em] text-brass">{subtitle}</h3>
          <h2 className="font-serif text-5xl text-bone md:text-8xl">{title}</h2>
        </div>

        <div className="absolute bottom-[10%] left-[5%] z-30 w-[90%] max-w-2xl">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="transition-all duration-700"
              style={{
                opacity: step === i ? 1 : 0,
                transform: step === i ? "translateY(0)" : "translateY(20px)",
                display: step === i ? "block" : "none",
              }}
            >
              <p className="mb-2 font-mono text-sm text-brass">{labels[i]}</p>
              {i < 2 ? (
                <p className="font-serif text-2xl text-bone md:text-3xl">{captions[i]}</p>
              ) : (
                <div className="flex items-end gap-8">
                  {stats.map((s) => (
                    <div key={s.label}>
                      <div className="font-serif text-5xl leading-none text-brass md:text-6xl">
                        {s.value}
                      </div>
                      <div className="mt-2 text-xs uppercase tracking-[0.2em] text-bone/60">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
