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
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-border bg-surface py-5">
      <div className="flex w-max animate-marquee items-center gap-8 whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="label-mono flex items-center gap-8 text-muted-foreground">
            {item}
            <span className="text-gold">&bull;</span>
          </span>
        ))}
      </div>
    </div>
  );
}