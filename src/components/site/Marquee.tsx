const items = [
  "21 Signature Projects",
  "$500M+ Capital Managed",
  "20+ Years Executive Leadership",
  "Discovery Land Company Rep",
  "Owner's Representation",
  "Civil Engineering Excellence",
  "Luxury Residential Construction",
];

export function Marquee() {
  const loop = [...items, ...items];
  return (
    <section className="marquee-container overflow-hidden border-y border-carbon/10 bg-bone py-6 whitespace-nowrap">
      <div className="marquee-content">
        {loop.map((item, i) => (
          <span key={i}>
            <span className="mx-12 inline-block font-serif text-xl uppercase tracking-[0.1em] text-brass-dark">
              {item}
            </span>
            <span className="inline-block font-serif text-xl text-brass-dark">•</span>
          </span>
        ))}
      </div>
    </section>
  );
}