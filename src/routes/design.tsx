import { createFileRoute, Link } from "@tanstack/react-router";

import { BeforeAfter } from "@/components/site/BeforeAfter";
import { Nav } from "@/components/site/Nav";

const TITLE = "Design — Architecture, Interiors & Concepts | MC Design Build";
const DESCRIPTION =
  "Architecture, interiors, reimagined renovations, development, pools and landscape, concepts, and custom furniture designed and delivered by Michael Chandler.";

export const Route = createFileRoute("/design")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DesignPage,
});

const A = "/projects/assets";

const architecture = `${A}/alpine-ranch-cover.webp`;

const interiors = [
  {
    src: `${A}/alpine-ranch-5.webp`,
    alt: "Timber great room with stone fireplace at a high alpine ranch",
  },
  { src: `${A}/alpine-ranch-8.webp`, alt: "Custom kitchen with timber beams and stone detailing" },
  { src: `${A}/miami-beach-20.webp`, alt: "High-rise living room opening to an ocean view" },
];

const reimagined = [
  {
    before: { src: `${A}/carmel-3-1.webp`, alt: "Carmel residence before its remodel" },
    after: { src: `${A}/carmel-3-4.webp`, alt: "Carmel residence after its remodel" },
  },
  {
    before: { src: `${A}/carmel-3-3.webp`, alt: "Side entry before restoration work" },
    after: {
      src: `${A}/carmel-3-2.webp`,
      alt: "Side entry after restoration with new decking and finishes",
    },
  },
];

const development = [
  { src: `${A}/development-site.webp`, alt: "Raw acreage before master-planned development work" },
  { src: `${A}/development-entrance-2.webp`, alt: "Finished community entrance after development" },
];

const pools = [
  { src: `${A}/pool-design-2.webp`, alt: "Resort pool with rock landscaping and water slides" },
  { src: `${A}/pool-design-5.webp`, alt: "Resort pool with cabana and mature trees" },
  { src: `${A}/hospitality-pool-1.webp`, alt: "Detail of a private club resort pool deck" },
  { src: `${A}/pool-design-9.webp`, alt: "Covered stone patio beside the resort pool" },
];

const concepts = [
  {
    src: `${A}/carmel-valley-new-4.webp`,
    alt: "Aerial study of a hillside estate and its site plan",
  },
  { src: `${A}/nfl-013.webp`, alt: "Aerial concept view of an estate with pool and grounds" },
];

const furniture = [
  {
    src: `${A}/miami-beach-27.webp`,
    alt: "Bespoke millwork and sculpted paneling in rare South American wood",
  },
  { src: `${A}/syracuse-24.webp`, alt: "Custom built-in library shelving and desk" },
  {
    src: `${A}/montana-11.webp`,
    alt: "Built-in custom wood bathroom shelving with marble backsplash",
  },
];

function Tile({
  src,
  alt,
  className = "",
  caption,
}: {
  src: string;
  alt: string;
  className?: string;
  caption?: string;
}) {
  return (
    <figure className={`group relative overflow-hidden bg-carbon ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.05]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-carbon/70 via-transparent to-transparent opacity-70" />
      {caption ? (
        <figcaption className="absolute bottom-4 left-4 text-[0.6rem] uppercase tracking-[0.28em] text-bone/80">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 font-serif text-xl uppercase tracking-[0.4em] text-brass md:text-2xl">
      {children}
    </h2>
  );
}

function DesignPage() {
  return (
    <main className="min-h-screen bg-carbon text-bone">
      <Nav />

      <section className="px-6 pt-36 pb-14 md:pt-44">
        <div className="mx-auto max-w-6xl">
          <p className="text-[0.65rem] uppercase tracking-[0.35em] text-bone/50">MC Design Build</p>
          <h1 className="mt-4 font-serif text-5xl uppercase tracking-[0.3em] text-bone md:text-7xl">
            Design
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-bone/65 md:text-base">
            Architecture, interiors, and the craft in between — from first concept sketches to
            finished custom furniture.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-16 px-6 pb-28">
        {/* Architecture + Interiors */}
        <section className="grid gap-6 md:grid-cols-12">
          <div className="md:col-span-7">
            <SectionLabel>Architecture</SectionLabel>
            <Tile
              src={architecture}
              alt="Custom Carmel Valley residence with exposed steel and floor-to-ceiling glass"
              className="h-[46vh] md:h-[60vh]"
              caption="High Alpine Ranch, MT"
            />
          </div>
          <div className="md:col-span-5">
            <SectionLabel>Interiors</SectionLabel>
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              {interiors.map((img) => (
                <Tile key={img.src} {...img} className="h-[46vh] md:h-[60vh]" />
              ))}
            </div>
          </div>
        </section>

        {/* Reimagined */}
        <section>
          <SectionLabel>Reimagined</SectionLabel>
          <p className="mb-5 text-xs uppercase tracking-[0.25em] text-bone/45">
            Re-designs · drag to compare
          </p>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
            {reimagined.map((pair) => (
              <BeforeAfter
                key={pair.before.src}
                before={pair.before}
                after={pair.after}
                className="h-[38vh] md:h-[46vh]"
              />
            ))}
          </div>
        </section>

        {/* Development + Pools/Concepts */}
        <section className="grid gap-6 md:grid-cols-12">
          <div className="md:col-span-7">
            <SectionLabel>Development</SectionLabel>
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {development.map((img, i) => (
                <Tile
                  key={img.src}
                  {...img}
                  className="h-[38vh] md:h-[56vh]"
                  caption={i === 0 ? "Before" : "After"}
                />
              ))}
            </div>
          </div>

          <div className="space-y-6 md:col-span-5">
            <div>
              <SectionLabel>Pools &amp; Landscape</SectionLabel>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {pools.map((img) => (
                  <Tile key={img.src} {...img} className="h-[18vh] md:h-[20vh]" />
                ))}
              </div>
            </div>
            <div>
              <SectionLabel>Concepts</SectionLabel>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {concepts.map((img) => (
                  <Tile key={img.src} {...img} className="h-[18vh] md:h-[20vh]" />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Custom Furniture */}
        <section>
          <SectionLabel>Custom Furniture</SectionLabel>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
            {furniture.map((img) => (
              <Tile key={img.src} {...img} className="h-[32vh] md:h-[40vh]" />
            ))}
          </div>
        </section>

        <div className="border-t border-bone/10 pt-10">
          <Link
            to="/portfolio"
            className="text-[0.7rem] uppercase tracking-[0.28em] text-brass transition-colors hover:text-bone"
          >
            View the full project portfolio →
          </Link>
        </div>
      </div>
    </main>
  );
}
