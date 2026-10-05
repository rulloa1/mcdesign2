import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { ClientOnly, Link } from "@tanstack/react-router";

import heroVideo from "@/assets/videos/southcoast-hero-sm.mp4.asset.json";

/** Central hero configuration — swap media and destinations here. */
export const heroConfig = {
  videoSrc: heroVideo.url as string | undefined, // 1.8 MB phone-friendly cut of the South Coast cover video
  videoPosition: "center",
  experienceHref: "#works",
  resumeTo: "/resume" as const,
  contactTo: "/contact" as const,
};

export function Hero({ poster }: { poster: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [videoOk, setVideoOk] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVideoOk(false);
      return;
    }
    v.playbackRate = 0.55;
    const onPlay = () => {
      v.playbackRate = 0.55;
    };
    v.addEventListener("play", onPlay);
    const io = new IntersectionObserver(([e]) => {
      if (e?.isIntersecting && !document.hidden) v.play().catch(() => {});
      else v.pause();
    });
    io.observe(v);
    return () => {
      v.removeEventListener("play", onPlay);
      io.disconnect();
    };
  }, []);

  const showVideo = heroConfig.videoSrc && videoOk;

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative z-10 isolate flex min-h-[82svh] flex-col justify-center overflow-hidden bg-carbon px-6 pb-12 pt-24 md:px-20 md:pb-20 md:pt-28"
    >
      <img
        src={poster}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        style={{ objectPosition: heroConfig.videoPosition, filter: "grayscale(35%) brightness(0.7)" }}
      />
      {showVideo ? (
        <video
          ref={videoRef}
          src={heroConfig.videoSrc}
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          onError={() => setVideoOk(false)}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          style={{ objectPosition: heroConfig.videoPosition, filter: "grayscale(35%) brightness(0.7)" }}
        />
      ) : null}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-carbon via-carbon/75 to-carbon/25" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-carbon via-transparent to-carbon/60" />
      <div aria-hidden="true" className="hero-noise pointer-events-none absolute inset-0 -z-10" />

      <div className="relative mx-auto w-full max-w-[1400px]">
        <div className="hero-fade max-w-4xl">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.15em] text-brass md:mb-4 md:text-sm md:tracking-[0.35em]">
            Luxury Residential • Hospitality • Development
          </p>
          <p className="mb-3 text-xs font-light text-bone/80 md:mb-6 md:text-xl">
            MC Design Build — Owner-first construction leadership
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
            <Link
              to={heroConfig.resumeTo}
              className="group mt-1 text-sm uppercase tracking-widest text-bone/80 underline-offset-8 hover:text-brass hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass md:mt-0"
            >
              View Resume <span className="hero-arrow" aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="mt-8 grid max-w-xl grid-cols-3 gap-4 text-left md:mt-10">
            {[
              { value: "20+", label: "Years Leading Builds" },
              { value: "$500M+", label: "Capital Delivered" },
              { value: "6", label: "Regions Served" },
            ].map((item) => (
              <div key={item.label} className="rounded-full border border-bone/15 bg-bone/5 px-3 py-3 backdrop-blur-sm">
                <div className="font-serif text-xl text-brass md:text-2xl">{item.value}</div>
                <div className="mt-1 font-mono text-[0.55rem] uppercase tracking-[0.18em] text-bone/65">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
