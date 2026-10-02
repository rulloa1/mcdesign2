import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArchitecturalCanvas } from "./ArchitecturalCanvas";
import { coverVideos } from "@/data/cover-videos";

/** Central hero configuration — swap media and destinations here. */
export const heroConfig = {
  videoSrc: coverVideos["southcoast"] as string | undefined,
  videoPosition: "center",
  experienceHref: "#works",
  resumeTo: "/resume" as const,
  contactTo: "/contact" as const,
};

export function Hero({ poster }: { poster: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoOk, setVideoOk] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVideoOk(false);
      return;
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !document.hidden) v.play().catch(() => setVideoOk(false));
      else v.pause();
    });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const showVideo = heroConfig.videoSrc && videoOk;

  return (
    <section
      id="hero"
      className="relative z-10 isolate flex min-h-[100svh] flex-col justify-center overflow-hidden bg-carbon px-6 pb-24 pt-28 md:px-20"
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
      <div aria-hidden="true" className="absolute inset-0 -z-10"><ArchitecturalCanvas /></div>
      <div aria-hidden="true" className="hero-noise pointer-events-none absolute inset-0 -z-10" />

      <div className="relative mx-auto w-full max-w-[1400px]">
        <div className="hero-fade max-w-4xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.35em] text-brass md:text-sm">
            Construction • Operations • Leadership
          </p>
          <p className="mb-6 text-lg font-light text-bone/80 md:text-xl">
            Michael Chandler — Design &amp; Construction Executive
          </p>
          <h1 className="hero-headline mb-8 font-serif text-[clamp(2.5rem,8vw,6.5rem)] leading-[1.05] tracking-tight">
            Strategic leadership.
            <br />
            <span className="relative inline-block pb-3" style={{ WebkitTextFillColor: "initial" }}>
              <span className="hero-headline">Disciplined execution.</span>
              <span aria-hidden="true" className="hero-underline absolute bottom-0 left-0 h-[2px] w-full" />
            </span>
          </h1>
          <p className="mb-10 max-w-xl text-base font-light leading-relaxed text-bone/80 md:text-lg">
            Explore my background in construction operations, project delivery, and team leadership.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a href={heroConfig.experienceHref} className="hero-btn group bg-brass text-carbon">
              Explore Experience <span className="hero-arrow" aria-hidden="true">→</span>
            </a>
            <Link to={heroConfig.resumeTo} className="hero-btn group border border-brass/60 text-bone">
              View Resume <span className="hero-arrow" aria-hidden="true">→</span>
            </Link>
            <Link
              to={heroConfig.contactTo}
              className="group ml-2 text-sm uppercase tracking-widest text-bone/80 underline-offset-8 hover:text-brass hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass"
            >
              Get in Touch <span className="hero-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
