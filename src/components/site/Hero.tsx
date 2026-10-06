import { Link } from "@tanstack/react-router";

import originalPoster from "@/assets/southcoast-cover.webp";
import phonePoster from "@/assets/hero/southcoast-hero-phone.webp.asset.json";
import phoneRetinaPoster from "@/assets/hero/southcoast-hero-phone-2x.webp.asset.json";
import desktopPoster from "@/assets/hero/southcoast-hero-desktop.webp.asset.json";

/** Central hero configuration — swap media and destinations here. */
export const heroConfig = {
  imagePosition: "center",
  experienceHref: "#works",
  contactTo: "/contact" as const,
};

export function Hero({ poster }: { poster: string }) {
  const usesDefaultPoster = poster === originalPoster;

  return (
    <section
      id="hero"
      className="relative z-10 isolate flex min-h-[82svh] flex-col justify-center overflow-hidden bg-carbon px-6 pb-12 pt-24 md:px-20 md:pb-20 md:pt-28"
    >
      <picture className="absolute inset-0 -z-10 h-full w-full [html.journey_&]:opacity-[0.22]">
        {usesDefaultPoster ? (
          <source
            media="(max-width: 899px)"
            srcSet={`${phonePoster.url} 640w, ${phoneRetinaPoster.url} 960w`}
            sizes="100vw"
          />
        ) : null}
        <img
          src={usesDefaultPoster ? desktopPoster.url : poster}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          loading="eager"
          decoding="async"
          width={1411}
          height={2400}
          className="h-full w-full object-cover"
          style={{ objectPosition: heroConfig.imagePosition, filter: "grayscale(35%) brightness(0.7)" }}
        />
      </picture>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-carbon via-carbon/75 to-carbon/25" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-carbon via-transparent to-carbon/60" />
      <div aria-hidden="true" className="hero-noise pointer-events-none absolute inset-0 -z-10" />

      <div className="relative mx-auto w-full max-w-[1400px]">
        <div className="hero-fade max-w-4xl">
          <p className="mb-4 font-mono text-[0.7rem] uppercase tracking-[0.08em] text-brass md:mb-6 md:text-sm md:tracking-[0.35em]">
            <span className="hidden sm:inline">Luxury </span>Residential • Hospitality • Development
          </p>
          <h1 className="hero-headline mb-6 font-serif text-[1.75rem] leading-[1.1] tracking-tight md:mb-8 md:text-[clamp(2.25rem,6vw,4.75rem)] md:leading-[1.05]">
            Built to impress.
            <br />
            <span className="relative inline-block pb-3" style={{ WebkitTextFillColor: "initial" }}>
              <span className="hero-headline">Delivered without compromise.</span>
              <span aria-hidden="true" className="hero-underline absolute bottom-0 left-0 h-[2px] w-full" />
            </span>
          </h1>
          <p className="hidden max-w-xl text-sm font-light leading-relaxed text-bone/80 md:mb-10 md:block md:text-lg">
            We guide private owners and hospitality teams through design, construction, and final delivery with a rigorous eye on budget, craft, and schedule certainty.
          </p>
          <div className="flex flex-wrap items-center gap-3 md:gap-4">
            <a href={heroConfig.experienceHref} className="hero-btn group bg-brass text-carbon">
              View Projects <span className="hero-arrow" aria-hidden="true">→</span>
            </a>
            <Link to={heroConfig.contactTo} className="hero-btn group border border-brass/60 text-bone">
              Book a Consultation <span className="hero-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
