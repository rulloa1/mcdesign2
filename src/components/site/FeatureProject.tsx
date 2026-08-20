import { SectionLabel } from "./SectionLabel";

export type FeatureProjectData = {
  location: string;
  title: string;
  vision: string;
  execution: string;
  stats: { value: string; label: string }[];
  images: { src: string; alt: string }[];
  flip?: boolean;
};

export function FeatureProject({
  location,
  title,
  vision,
  execution,
  stats,
  images,
  flip = false,
}: FeatureProjectData) {
  return (
    <section className="border-b border-border py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-2 lg:items-center">
        <div className={flip ? "lg:order-2" : ""}>
          <div className="grid grid-cols-3 gap-3">
            {images.map((img, i) => (
              <img
                key={img.src}
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className={
                  i === 0
                    ? "col-span-3 h-72 w-full object-cover md:h-96"
                    : "col-span-3 h-40 w-full object-cover sm:col-span-1 sm:h-32"
                }
              />
            ))}
          </div>
        </div>

        <div className={flip ? "lg:order-1" : ""}>
          <SectionLabel>{`Signature Project — ${location}`}</SectionLabel>
          <h2 className="mt-6 text-4xl leading-[1.05] md:text-5xl">{title}</h2>

          <div className="mt-10 space-y-8">
            <div>
              <p className="label-mono text-muted-foreground">01 / The Vision</p>
              <p className="mt-3 text-muted-foreground">{vision}</p>
            </div>
            <div>
              <p className="label-mono text-muted-foreground">02 / The Execution</p>
              <p className="mt-3 text-muted-foreground">{execution}</p>
            </div>
            <div>
              <p className="label-mono text-muted-foreground">03 / The Result</p>
              <div className="mt-4 flex gap-12">
                {stats.map((s) => (
                  <div key={s.label}>
                    <p className="font-display text-3xl text-gold md:text-4xl">{s.value}</p>
                    <p className="label-mono mt-2 text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}