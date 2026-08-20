import { createFileRoute } from "@tanstack/react-router";

import { Nav } from "@/components/site/Nav";
import { Marquee } from "@/components/site/Marquee";
import { SectionLabel } from "@/components/site/SectionLabel";
import { FeatureProject } from "@/components/site/FeatureProject";
import { ImpactSlider } from "@/components/site/ImpactSlider";

import portrait from "@/assets/portrait.jpg";
import miami from "@/assets/project-miami.jpg";
import alpine from "@/assets/project-alpine.jpg";
import southcoast from "@/assets/project-southcoast.jpg";
import pool from "@/assets/project-pool.jpg";
import bakersBay from "@/assets/project-bakersbay.jpg";
import syracuse from "@/assets/project-syracuse.jpg";
import poolDetail from "@/assets/detail-pool.jpg";

const title = "Michael Chandler — Owner, MC Design Build";
const description =
  "Executive construction leadership across 20+ years and $500M+ in delivered ultra-luxury residential, hospitality, and civil landmarks.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const works = [
  {
    image: miami,
    name: "S. Florida High Rise Luxe Condo",
    meta: "Design-Build & Project Management • Miami Beach, FL",
  },
  {
    image: alpine,
    name: "High Alpine Mtn. Ranch",
    meta: "Design-Build Lead • Montana",
  },
  {
    image: southcoast,
    name: "South Coast Renovation",
    meta: "Complete Coastal Remodel • Big Sur, CA",
  },
  {
    image: pool,
    name: "Ultra Luxe Private Club Resort Pool",
    meta: "Construction Manager • SE Texas",
  },
  {
    image: bakersBay,
    name: "Bakers Bay Resort",
    meta: "Discovery Land Company Rep • Bahamas",
  },
  {
    image: syracuse,
    name: "Syracuse House",
    meta: "Design-Build • Syracuse, UT",
  },
];

const process = [
  {
    step: "01",
    name: "Strategize",
    copy: "Aligning capital vision with structural reality before a single dollar is deployed.",
  },
  {
    step: "02",
    name: "Assemble",
    copy: "Curating tier-one architectural, engineering, and contracting talent specific to the asset.",
  },
  {
    step: "03",
    name: "Orchestrate",
    copy: "Rigorous milestone management, value engineering, and risk mitigation.",
  },
  {
    step: "04",
    name: "Deliver",
    copy: "Handover of a market-defining asset, on budget, to precise specifications.",
  },
];

const testimonials = [
  "He brings an architectural sensitivity to raw construction management. Rare to find someone who protects the design intent while fiercely guarding the budget.",
  "The only executive I trust with a nine-figure development. The risk mitigation and foresight are unparalleled in the industry.",
  "An absolute force. Driven, precise, and possesses a commanding authority that makes complex, multi-stakeholder projects move without friction.",
];

function HomePage() {
  return (
    <div id="top" className="bg-background">
      <Nav />

      {/* Hero */}
      <section className="relative flex min-h-screen items-end overflow-hidden">
        <img
          src={portrait}
          alt="Michael Chandler — Owner, MC Design Build"
          width={1280}
          height={1600}
          className="absolute inset-0 h-full w-full object-cover object-[60%_20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/20" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background to-transparent" />

        <div className="relative mx-auto w-full max-w-6xl px-6 pb-28 md:pb-40">
          <p className="label-mono animate-rise text-gold">Michael Chandler</p>
          <h1 className="mt-8 max-w-3xl animate-rise text-5xl leading-[0.95] tracking-tight sm:text-7xl md:text-8xl">
            Building What Others Can't.
          </h1>
          <div className="mt-10 h-px w-full max-w-xl gold-rule" />
          <p className="mt-8 max-w-md animate-rise text-lg text-muted-foreground">
            Construction leadership across 20+ years and $500M+ in delivered architectural
            landmarks.
          </p>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
          <p className="label-mono text-muted-foreground">Scroll</p>
          <span className="mx-auto mt-3 block h-10 w-px bg-border" />
        </div>
      </section>

      <Marquee />

      {/* About */}
      <section id="about" className="border-b border-border py-24 md:py-32">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <img
              src={portrait}
              alt="Michael Chandler — Owner, MC Design Build"
              loading="lazy"
              width={1280}
              height={1600}
              className="h-[520px] w-full object-cover object-[60%_20%]"
            />
          </div>
          <div>
            <SectionLabel>About the Owner</SectionLabel>
            <h2 className="mt-6 text-4xl md:text-6xl">Michael Chandler</h2>
            <div className="mt-8 space-y-6 text-muted-foreground">
              <p>
                With over 20 years of executive construction leadership, Michael Chandler has
                managed and delivered more than $500 million in ultra-luxury residential,
                hospitality, and civil projects across six global regions — from California's
                coastline to the Caribbean.
              </p>
              <p>
                As Owner of MC Design Build, Michael brings a rare combination of architectural
                sensitivity and rigorous project management to every engagement. His portfolio spans
                Discovery Land Company developments, private island estates, alpine retreats, and
                complex coastal restorations.
              </p>
              <p>
                Known for his old-world craftsmanship standards and modern execution methodology,
                Michael personally curates every trade partner, material selection, and milestone —
                ensuring on-time, on-budget delivery without compromising design intent.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-8">
              {[
                { value: "21+", label: "Signature Projects" },
                { value: "$500M+", label: "Capital Managed" },
                { value: "6", label: "Global Regions" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-display text-3xl text-gold md:text-4xl">{s.value}</p>
                  <p className="label-mono mt-3 text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Selected Works */}
      <section id="works" className="border-b border-border py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <SectionLabel>Selected Works</SectionLabel>
          <h2 className="mt-6 text-4xl md:text-6xl">A Legacy of Scale.</h2>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {works.map((w) => (
              <article key={w.name} className="group">
                <div className="relative overflow-hidden">
                  <img
                    src={w.image}
                    alt={w.name}
                    loading="lazy"
                    width={1400}
                    height={1000}
                    className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-background/70 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <span className="label-mono text-gold">View Album</span>
                  </div>
                </div>
                <h3 className="mt-5 text-xl">{w.name}</h3>
                <p className="label-mono mt-2 text-muted-foreground">{w.meta}</p>
              </article>
            ))}
          </div>

          <div className="mt-14">
            <a
              href="#contact"
              className="label-mono inline-flex items-center gap-3 border border-gold px-8 py-4 text-gold transition-colors hover:bg-gold hover:text-primary-foreground"
            >
              View All 21 Projects
            </a>
          </div>
        </div>
      </section>

      <FeatureProject
        location="SE Texas"
        title="Ultra Luxe Private Club Resort Pool"
        vision="Delivering a world-class aquatic resort experience for one of Texas's most exclusive private clubs — engineered from the ground up."
        execution="18 months of precision civil engineering, coordinating specialty aquatic, structural, and landscape contractors across a complex site."
        stats={[
          { value: "189,000", label: "Gallons Capacity" },
          { value: "8", label: "Million Budget" },
        ]}
        images={[
          { src: pool, alt: "Ultra Luxe Pool — Daylight Overview" },
          { src: poolDetail, alt: "Ultra Luxe Pool — Resort Detail" },
          { src: bakersBay, alt: "Ultra Luxe Pool — Finished Detail" },
        ]}
      />

      <FeatureProject
        flip
        location="Montana"
        title="High Alpine Ranch Luxe Retreat"
        vision="A secluded Montana mountain ranch engineered for ultimate luxury — where custom bronze windows from Italy meet panoramic alpine vistas."
        execution="24 months of high-alpine craftsmanship — exposed timber, custom stone masonry, and radiant systems in one of Montana's most remote settings."
        stats={[
          { value: "2,300", label: "Sq Ft" },
          { value: "24", label: "Months Build" },
        ]}
        images={[
          { src: alpine, alt: "Alpine Ranch — Mountain Vista" },
          { src: syracuse, alt: "Alpine Ranch — Craftsmanship Detail" },
          { src: southcoast, alt: "Alpine Ranch — Finished Retreat" },
        ]}
      />

      <FeatureProject
        location="S. Florida"
        title="S. Florida High Rise Luxe Condo"
        vision="Transforming 4,200 sq ft of raw South Florida high-rise into a beachfront sanctuary — delivered on schedule during the height of the pandemic."
        execution="Italian marble, hotel-grade bespoke millwork, and integrated smart home systems — zero delays, zero excuses."
        stats={[
          { value: "4,200", label: "Sq Ft" },
          { value: "4", label: "Months Delivered" },
        ]}
        images={[
          { src: miami, alt: "Miami Beach — Beachfront Panorama" },
          { src: poolDetail, alt: "Miami Beach — Interior Execution" },
          { src: bakersBay, alt: "Miami Beach — Finished Sanctuary" },
        ]}
      />

      {/* Philosophy */}
      <section id="philosophy" className="border-b border-border bg-surface py-28 md:py-40">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <blockquote className="text-3xl leading-[1.25] md:text-5xl">
            "Great architecture is not just built; it is rigorously orchestrated. We don't construct
            buildings; we construct the reality of a vision."
          </blockquote>
          <p className="label-mono mt-10 text-gold">Michael Chandler</p>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="border-b border-border py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <SectionLabel>Methodology</SectionLabel>
          <h2 className="mt-6 text-4xl md:text-6xl">The Architecture of Execution.</h2>

          <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {process.map((p) => (
              <div key={p.step} className="border-t border-border pt-6">
                <p className="label-mono text-gold">{p.step}</p>
                <h3 className="mt-5 text-2xl">{p.name}</h3>
                <p className="mt-4 text-muted-foreground">{p.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="border-b border-border py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-4xl md:text-6xl">Quantifiable Impact.</h2>
          <p className="mt-5 max-w-md text-muted-foreground">
            Use the slider to see the compounding value of experienced leadership.
          </p>
          <ImpactSlider />
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-b border-border bg-surface py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <SectionLabel>Client Perspectives</SectionLabel>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {testimonials.map((t) => (
              <blockquote key={t} className="border-l border-gold pl-6 text-lg text-muted-foreground">
                "{t}"
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-28 md:py-40">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-4xl leading-[1.1] md:text-6xl">
            For project inquiries, speaking engagements, and board consultations.
          </h2>
          <a
            href="mailto:mike.rcccon@yahoo.com"
            className="label-mono mt-12 inline-flex items-center gap-3 border border-gold px-10 py-5 text-gold transition-colors hover:bg-gold hover:text-primary-foreground"
          >
            Begin a Conversation
          </a>
        </div>
      </section>

      <footer className="border-t border-border py-10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6">
          <div className="flex gap-8">
            <a
              href="https://www.linkedin.com/in/michael-chandler-mc-design-build"
              target="_blank"
              rel="noreferrer"
              className="label-mono text-muted-foreground transition-colors hover:text-gold"
            >
              LinkedIn
            </a>
            <a
              href="mailto:mike.rcccon@yahoo.com"
              className="label-mono text-muted-foreground transition-colors hover:text-gold"
            >
              Email
            </a>
          </div>
          <p className="label-mono text-muted-foreground">Spring, Texas</p>
        </div>
      </footer>
    </div>
  );
}
