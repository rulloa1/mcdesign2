import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";

import heroVideo from "@/assets/videos/southcoast-hero-sm.mp4.asset.json";

/** Central hero configuration — swap media and destinations here. */
export const heroConfig = {
  videoSrc: heroVideo.url as string | undefined, // 1.8 MB phone-friendly cut of the South Coast cover video
  videoPosition: "center",
  experienceHref: "#works",
  resumeTo: "/resume" as const,
  contactTo: "/contact" as const,
};

const heroStats = [
  { value: "20+", label: "Years Leading Builds" },
  { value: "$500M+", label: "Capital Delivered" },
  { value: "6", label: "Regions Served" },
];

export function Hero({ poster }: { poster: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  // Start without the video; it is enabled below only on capable larger screens,
  // after the page is idle — phones never fetch it.
  const [videoOk, setVideoOk] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const narrow = window.matchMedia("(max-width: 899px)").matches;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    const dataSaver = Boolean(conn?.saveData) || conn?.effectiveType === "2g";
    if (coarse || narrow || dataSaver) return;
    const enable = () => setVideoOk(true);
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(enable, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }
    const t = window.setTimeout(enable, 1500);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !videoOk) return;
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
  }, [videoOk]);

  const showVideo = heroConfig.videoSrc && videoOk;

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative z-10 isolate flex min-h-[88svh] flex-col justify-between overflow-hidden bg-carbon px-6 pb-8 pt-24 md:px-20 md:pb-12 md:pt-28"
    >
      <img
        src={poster}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        style={{ objectPosition: heroConfig.videoPosition, filter: "grayscale(35%) brightness(0.55)" }}
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
          style={{ objectPosition: heroConfig.videoPosition, filter: "grayscale(35%) brightness(0.55)" }}
        />
      ) : null}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-carbon via-carbon/80 to-carbon/15" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-carbon via-carbon/30 to-carbon/75" />
      <div aria-hidden="true" className="hero-noise pointer-events-none absolute inset-0 -z-10" />
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full text-brass opacity-[0.16]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="10%" y1="0" x2="10%" y2="100%" stroke="currentColor" strokeWidth="1" />
        <line x1="90%" y1="0" x2="90%" y2="100%" stroke="currentColor" strokeWidth="1" />
        <line x1="0" y1="14%" x2="100%" y2="14%" stroke="currentColor" strokeWidth="1" />
        <circle cx="10%" cy="14%" r="3" fill="currentColor" stroke="none" />
      </svg>

      <div className="relative mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-between">
        <div className="hero-fade">
          <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-brass md:text-xs md:tracking-[0.35em]">
            Luxury Residential • Hospitality • Development
          </p>
          <p className="mt-2 text-xs font-light text-bone/50 md:text-sm">
            MC Design Build — Owner-first construction leadership
          </p>
        </div>

        <div className="hero-fade py-10 md:py-12">
          <h1 className="font-serif text-[2.25rem] leading-[1.12] tracking-tight text-bone md:text-[clamp(2.5rem,5.5vw,4.5rem)] md:leading-[1.08]">
            Built to impress.
            <br />
            <span className="italic">Delivered without compromise.</span>
          </h1>
          <div aria-hidden="true" className="mb-5 mt-6 h-[2px] w-12 bg-brass md:mb-7 md:mt-8" />
          <p className="max-w-[280px] text-sm font-light leading-relaxed text-bone/70 md:max-w-xl md:text-lg">
            We guide private owners and hospitality teams through design, construction, and final delivery with a rigorous eye on budget, craft, and schedule certainty.
          </p>
        </div>

        <div className="hero-fade">
          <div className="grid grid-cols-1 gap-2.5 md:flex md:items-center md:gap-4">
            <a href={heroConfig.experienceHref} className="hero-btn group justify-center bg-brass text-carbon">
              View Projects <span className="hero-arrow" aria-hidden="true">→</span>
            </a>
            <Link to={heroConfig.contactTo} className="hero-btn group justify-center border border-brass/40 text-bone">
              Book a Consultation <span className="hero-arrow" aria-hidden="true">→</span>
            </Link>
            <Link
              to={heroConfig.resumeTo}
              className="mt-1 justify-self-center px-2 py-1.5 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/50 underline decoration-brass/40 underline-offset-4 transition-colors hover:text-brass focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass"
            >
              View Resume
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-3 border-t border-bone/10 pt-4 md:mt-12 md:pt-5">
            {heroStats.map((item, i) => (
              <div key={item.label} className={i > 0 ? "border-l border-bone/10 pl-4 md:pl-6" : "pr-2"}>
                <div className="font-mono text-lg leading-none text-bone md:text-xl">{item.value}</div>
                <div className="mt-2 font-mono text-[8px] uppercase leading-tight tracking-[0.14em] text-brass md:text-[9px]">
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
