import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

import { Nav } from "@/components/site/Nav";
import { Marquee } from "@/components/site/Marquee";
import { Hero } from "@/components/site/Hero";

const ArchitecturalCanvas = lazy(() => import("@/components/site/ArchitecturalCanvas"));
import { PinnedCase } from "@/components/site/PinnedCase";
import { projects } from "@/data/projects";
import { projectSlotKey } from "@/data/media-slots";
import { useSiteMedia } from "@/lib/site-media";

import profileAsset from "@/assets/mike-headshot.jpg.asset.json";
const profile = profileAsset.url;
import heroImage from "@/assets/southcoast-cover.webp";
import houstonOaks from "@/assets/houston-oaks-cover.webp";
const poolDetail = "/projects/assets/pool-design-31-real.webp";
import poolFinished from "@/assets/pool-design-36.webp";
import alpineCover from "@/assets/alpine-ranch-cover.webp";
import alpine3 from "@/assets/alpine-ranch-3.webp";
import alpine7 from "@/assets/alpine-ranch-7.webp";
import miamiCover from "@/assets/miami-beach-cover-enhanced.webp";
import miami10 from "@/assets/miami-beach-10.webp";
import miami27 from "@/assets/miami-beach-27.webp";

const TITLE = "Michael Chandler — Luxury Construction Executive";
const DESCRIPTION =
  "Ultra-luxury residential, hospitality, and civil construction led by Michael Chandler — 20+ years and $500M+ delivered across six global regions.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "theme-color", content: "#0E0E0E" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Michael Chandler",
          jobTitle: "Owner, Strategic Construction Executive",
          email: "mike.rcccon@yahoo.com",
          address: { "@type": "PostalAddress", addressLocality: "Spring", addressRegion: "TX" },
          knowsAbout: [
            "Ultra-luxury residential construction",
            "Design-build project management",
            "Civil engineering",
            "Owner's representation",
            "Hospitality construction",
            "Discovery Land Company developments",
          ],
        }),
      },
    ],
  }),
  component: Index,
});

const gridProjects = [
  {
    id: "miami-beach",
    span: "md:col-span-8",
    height: "h-[52vh] md:h-[72vh]",
    meta: "Design-Build & Project Management • Miami Beach, FL",
    label: "S. Florida High Rise Luxe Condo",
  },
  {
    id: "alpine-ranch",
    span: "md:col-span-4",
    height: "h-[52vh] md:h-[72vh]",
    meta: "Design-Build Lead • Montana",
    label: "High Alpine Mtn. Ranch",
  },
  {
    id: "southcoast",
    span: "md:col-span-5",
    height: "h-[52vh] md:h-[72vh]",
    meta: "Complete Coastal Remodel • Big Sur, CA",
    label: "South Coast Renovation",
  },
  {
    id: "hospitality-pool",
    span: "md:col-span-7",
    height: "h-[52vh] md:h-[72vh]",
    meta: "Construction Manager • SE Texas",
    label: "Ultra Luxe Private Club Resort Pool",
  },
  {
    id: "carmel-knolls",
    span: "md:col-span-6",
    height: "h-[52vh] md:h-[72vh]",
    meta: "Design-Build • Carmel, CA",
    label: "Carmel Knolls",
  },
  {
    id: "syracuse",
    span: "md:col-span-6",
    height: "h-[52vh] md:h-[72vh]",
    meta: "Design-Build • Syracuse, UT",
    label: "Syracuse House",
  },
];


const testimonials = [
  {
    quote:
      "He brings an architectural sensitivity to raw construction management. Rare to find someone who protects the design intent while fiercely guarding the budget.",
    source: "— Principal Architect, SOM",
  },
  {
    quote:
      "The only executive I trust with a nine-figure development. The risk mitigation and foresight are unparalleled in the industry.",
    source: "— Managing Director, Real Estate Trust",
  },
  {
    quote:
      "An absolute force. Driven, precise, and possesses a commanding authority that makes complex, multi-stakeholder projects move without friction.",
    source: "— City Planning Commissioner",
  },
];

const Arrow = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 13 13"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1.5 11.5L11.5 1.5M11.5 1.5H4.5M11.5 1.5V8.5" />
  </svg>
);

function Index() {
  const media = useSiteMedia();

  return (
    <div className="relative z-10">
      <Nav />

      <main>
        <Hero poster={media("hero", heroImage)} />

        <Marquee />

        {/* About */}
        <section id="about" className="bg-carbon px-6 py-32 text-bone md:px-20">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-16 md:flex-row">
            <div className="md:w-2/5">
              <div
                className="border border-brass/20 p-2"
                style={{ background: "rgb(201 169 97 / 0.04)" }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={media("about-portrait", profile)}
                    alt="Michael Chandler — Owner, MC Design Build"
                    loading="lazy"
                    className="w-full object-cover"
                    style={{ aspectRatio: "3 / 4", filter: "grayscale(15%)" }}
                  />
                  <div className="pointer-events-none absolute inset-0 border border-bone/5" />
                </div>
              </div>
            </div>

            <div className="md:w-3/5">
              <div className="mb-5 inline-flex items-center rounded-full border border-brass/20 bg-brass/5 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-brass/80">
                About the Owner
              </div>
              <h2 className="mb-8 font-serif text-4xl md:text-5xl">Michael Chandler</h2>
              <div className="space-y-6 text-lg font-light leading-relaxed text-bone/70">
                <p>
                  With over 20 years of executive construction leadership, Michael Chandler has
                  managed and delivered more than $500 million in ultra-luxury residential,
                  hospitality, and civil projects across six global regions — from California's
                  coastline to the Caribbean.
                </p>
                <p>
                  As Owner of MC Design Build, Michael brings a rare combination of architectural
                  sensitivity and rigorous project management to every engagement. His portfolio
                  spans Discovery Land Company developments, private island estates, alpine
                  retreats, and complex coastal restorations.
                </p>
                <p>
                  Known for his old-world craftsmanship standards and modern execution methodology,
                  Michael personally curates every trade partner, material selection, and milestone
                  — ensuring on-time, on-budget delivery without compromising design intent.
                </p>
              </div>
              <div className="mt-10 flex flex-wrap gap-8">
                {[
                  { v: "21+", l: "Signature Projects" },
                  { v: "$500M+", l: "Capital Managed" },
                  { v: "6", l: "Global Regions" },
                ].map((s) => (
                  <div key={s.l}>
                    <div className="font-serif text-3xl text-brass">{s.v}</div>
                    <div className="mt-1 font-mono text-xs uppercase tracking-widest text-bone/40">
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Selected Works */}
        <section id="works" className="relative mx-auto max-w-[1600px] px-6 py-32 md:px-12">
          <Suspense fallback={null}>
            <ArchitecturalCanvas />
          </Suspense>
          <div className="relative mb-20">
            <div className="mb-6 inline-flex items-center rounded-full border border-carbon/12 bg-carbon/5 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-carbon/60">
              Selected Works
            </div>
            <h2 className="font-serif text-4xl md:text-6xl">A Legacy of Scale.</h2>
          </div>

          <div className="relative grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-12">
            {gridProjects.map((g) => {
              const project = projects.find((p) => p.id === g.id)!;
              return (
                <Link
                  key={g.id}
                  to="/projects/$projectId"
                  params={{ projectId: g.id }}
                  className={`project-card relative block min-w-0 overflow-hidden ${g.span}`}
                >
                  <div
                    className={`relative overflow-hidden ${g.height}`}
                    style={{ backgroundColor: "rgb(201 169 97 / 0.06)" }}
                  >
                    <img
                      src={media(projectSlotKey(g.id), project.cover)}
                      alt={g.label}
                      loading="lazy"
                      className="project-img"
                    />
                    <div className="project-overlay" />
                    <span className="view-case-study text-sm uppercase tracking-[0.1em] text-bone">
                      View Album
                    </span>
                  </div>
                  <div className="mt-4">
                    <h3 className="font-serif text-2xl">{g.label}</h3>
                    <p className="mt-1 text-sm text-carbon/60">{g.meta}</p>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="relative mt-20 text-center">
            <Link
              to="/portfolio"
              className="group inline-flex items-center gap-5 border border-carbon/25 py-3 pr-3 pl-9 text-xs uppercase tracking-[0.22em] transition-all duration-700 hover:bg-carbon hover:text-bone"
            >
              <span>View All {projects.length} Projects</span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-carbon/20 transition-all duration-700 group-hover:border-bone/20 group-hover:bg-bone/10">
                <Arrow />
              </span>
            </Link>
          </div>
        </section>

        {/* Signature projects — pinned sequences */}
        <PinnedCase
          id="featured-case"
          subtitle="Signature Project — SE Texas"
          title="Ultra Luxe Private Club Resort Pool"
          images={[
            media("case-pool-1", houstonOaks),
            media("case-pool-2", poolDetail),
            media("case-pool-3", poolFinished),
          ]}
          alts={[
            "Ultra Luxe Pool — Daylight Overview",
            "Ultra Luxe Pool — Resort Detail",
            "Ultra Luxe Pool — Finished Detail",
          ]}
          captions={[
            "Delivering a world-class aquatic resort experience for one of Texas's most exclusive private clubs — engineered from the ground up.",
            "18 months of precision civil engineering, coordinating specialty aquatic, structural, and landscape contractors across a complex site.",
          ]}
          stats={[
            { value: "189,000", label: "Gallons Capacity" },
            { value: "8", label: "Million Budget" },
          ]}
        />

        <PinnedCase
          id="featured-case-2"
          subtitle="Signature Project — Montana"
          title="High Alpine Ranch Luxe Retreat"
          images={[
            media("case-alpine-1", alpineCover),
            media("case-alpine-2", alpine3),
            media("case-alpine-3", alpine7),
          ]}
          alts={[
            "Alpine Ranch — Mountain Vista",
            "Alpine Ranch — Craftsmanship Detail",
            "Alpine Ranch — Finished Retreat",
          ]}
          captions={[
            "A secluded Montana mountain ranch engineered for ultimate luxury — where custom bronze windows from Italy meet panoramic alpine vistas.",
            "24 months of high-alpine craftsmanship — exposed timber, custom stone masonry, and radiant systems in one of Montana's most remote settings.",
          ]}
          stats={[
            { value: "2,300", label: "Sq Ft" },
            { value: "24", label: "Months Build" },
          ]}
        />

        <PinnedCase
          id="featured-case-3"
          subtitle="Signature Project — S. Florida"
          title="S. Florida High Rise Luxe Condo"
          images={[
            media("case-miami-1", miamiCover),
            media("case-miami-2", miami10),
            media("case-miami-3", miami27),
          ]}
          alts={[
            "Miami Beach — Beachfront Panorama",
            "Miami Beach — Interior Execution",
            "Miami Beach — Finished Sanctuary",
          ]}
          captions={[
            "Transforming 4,200 sq ft of raw South Florida high-rise into a beachfront sanctuary — delivered on schedule during the height of the pandemic.",
            "Italian marble, hotel-grade bespoke millwork, and integrated smart home systems — zero delays, zero excuses.",
          ]}
          stats={[
            { value: "4,200", label: "Sq Ft" },
            { value: "4", label: "Months Delivered" },
          ]}
        />

        {/* Philosophy */}
        <section id="philosophy" className="relative overflow-hidden bg-bone px-6 py-40 md:px-20">
          <div className="dot-grid pointer-events-none absolute inset-0 text-carbon opacity-5" />
          <div className="relative z-10 mx-auto max-w-5xl text-center">
            <p className="mb-16 font-serif text-3xl leading-tight text-carbon md:text-6xl">
              "Great architecture is not just built; it is rigorously orchestrated. We don't
              construct buildings; we construct the reality of a vision."
            </p>
            <div className="flex flex-col items-center justify-center">
              <svg width="200" height="80" viewBox="0 0 200 80" className="mb-4" aria-hidden="true">
                <path
                  fill="none"
                  stroke="var(--brass)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10,60 C30,20 50,70 70,30 C80,10 100,50 120,40 C140,30 160,60 180,20"
                />
              </svg>
              <p className="text-sm uppercase tracking-[0.2em] text-carbon/60">Michael Chandler</p>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="bg-carbon px-6 py-32 text-bone md:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 inline-flex items-center rounded-full border border-brass/20 bg-brass/5 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-brass/80">
              What We Do
            </div>
            <h2 className="mb-24 font-serif text-4xl md:text-5xl">
              One Team. Every Discipline.
            </h2>

            <div className="mb-12 h-0.5 w-full bg-bone/10">
              <div className="h-full w-1/2 bg-brass" />
            </div>

            <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
              {[
                {
                  title: "Owner's Representation",
                  body: "Acting as the owner's advocate from site selection through closeout — protecting budget, schedule, and vision at every decision point.",
                },
                {
                  title: "Design-Build",
                  body: "Architecture and construction under one roof. A single point of accountability from first sketch to final walkthrough.",
                },
                {
                  title: "Development",
                  body: "Civil, commercial, and residential development — from raw land and entitlements to finished, revenue-producing assets.",
                },
                {
                  title: "Estate Management",
                  body: "Long-term stewardship of legacy properties: capital planning, staff leadership, and meticulous care of every detail.",
                },
              ].map((s) => (
                <div
                  key={s.title}
                  className="opacity-70 transition-opacity duration-500 hover:opacity-100"
                >
                  <div className="mb-6 h-px w-10 bg-brass" />
                  <h3 className="mb-4 font-serif text-2xl">{s.title}</h3>
                  <p className="text-sm font-light leading-relaxed text-bone/60">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Career Numbers */}
        <section className="border-t border-carbon/10 bg-bone px-6 py-32 md:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 inline-flex items-center rounded-full border border-carbon/12 bg-carbon/5 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-carbon/60">
              By the Numbers
            </div>
            <div className="grid grid-cols-2 gap-12 md:grid-cols-4">
              {[
                { value: "25+", label: "Years in the Industry" },
                { value: "55+", label: "Projects Led" },
                { value: "3M+", label: "Sq Ft Delivered" },
                { value: "$1B+", label: "Capital Managed" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-serif text-5xl text-carbon md:text-6xl">{s.value}</div>
                  <div className="mt-4 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-carbon/50">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-bone px-6 py-32 md:px-20">
          <div className="mx-auto max-w-5xl">
            <div className="mb-16 inline-flex items-center rounded-full border border-carbon/12 bg-carbon/5 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-carbon/60">
              Client Perspectives
            </div>
            <div className="divide-y divide-carbon/10">
              {testimonials.map((t) => (
                <blockquote key={t.source} className="py-14">
                  <p className="mb-8 font-serif text-2xl italic leading-relaxed text-carbon md:text-3xl">
                    {t.quote}
                  </p>
                  <footer className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-carbon/50">
                    {t.source}
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="relative overflow-hidden bg-carbon px-6 py-40 text-center text-bone md:px-20"
        >
          <div className="dot-grid pointer-events-none absolute inset-0 text-bone opacity-5" />
          <div className="relative z-10 mx-auto max-w-3xl">
            <h2 className="mb-8 font-serif text-4xl md:text-6xl">
              For project inquiries, speaking engagements, and board consultations.
            </h2>

            <Link
              to="/contact"
              className="group mt-8 inline-flex items-center gap-5 border border-brass/40 py-3 pr-3 pl-9 text-xs uppercase tracking-[0.22em] transition-all duration-700 hover:bg-brass hover:text-carbon"
            >
              <span>Begin a Conversation</span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-brass/30 transition-all duration-700 group-hover:border-carbon/20 group-hover:bg-carbon/10">
                <Arrow />
              </span>
            </Link>

            <div className="mt-20 flex flex-wrap justify-center gap-12 font-mono text-sm text-bone/60">
              <a
                href="https://www.linkedin.com/in/michael-chandler-mc-design-build"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-brass"
              >
                LinkedIn
              </a>
              <a href="mailto:mike.rcccon@yahoo.com" className="transition-colors hover:text-brass">
                Email
              </a>
              <span>Spring, TX</span>
              <Link to="/studio/media" className="transition-colors hover:text-brass">
                Media Studio
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
