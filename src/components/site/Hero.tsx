import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";

import heroVideo from "@/assets/videos/southcoast-hero-sm.mp4.asset.json";
import mobileHeroPoster from "@/assets/mobile/hero.webp";
import { ResponsiveProjectImage } from "@/components/site/ResponsiveProjectImage";

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
  const [videoOk, setVideoOk] = useState(false);

  useEffect(() => {
    const connection = (navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;
    const phone = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 900;
    const constrained = connection?.saveData || connection?.effectiveType === "2g";
    if (phone || constrained || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const enableVideo = () => setVideoOk(true);
    const idleId = "requestIdleCallback" in window
      ? window.requestIdleCallback(enableVideo, { timeout: 1800 })
      : window.setTimeout(enableVideo, 900);
    return () => {
      if ("cancelIdleCallback" in window) window.cancelIdleCallback(idleId);
      else window.clearTimeout(idleId);
    };
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
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
      <ResponsiveProjectImage
        desktopSrc={poster}
        mobileSrc={mobileHeroPoster}
        resolvedSrc={poster}
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
          preload="none"
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
            Construction • Operations • Leadership
          </p>
          <p className="mb-3 text-xs font-light text-bone/80 md:mb-6 md:text-xl">
            Michael Chandler — Design &amp; Construction Executive
          </p>
          <h1 className="hero-headline mb-6 font-serif text-[1.75rem] leading-[1.1] tracking-tight md:mb-8 md:text-[clamp(2.25rem,6vw,4.75rem)] md:leading-[1.05]">
            Strategic leadership.
            <br />
            <span className="relative inline-block pb-3" style={{ WebkitTextFillColor: "initial" }}>
              <span className="hero-headline">Disciplined execution.</span>
              <span aria-hidden="true" className="hero-underline absolute bottom-0 left-0 h-[2px] w-full" />
            </span>
          </h1>
          <p className="hidden max-w-xl text-sm font-light leading-relaxed text-bone/80 md:mb-10 md:block md:text-lg">
            Explore my background in construction operations, project delivery, and team leadership.
          </p>
          <div className="flex flex-wrap items-center gap-3 md:gap-4">
            <a href={heroConfig.experienceHref} className="hero-btn group bg-brass text-carbon">
              Explore Experience <span className="hero-arrow" aria-hidden="true">→</span>
            </a>
            <Link to={heroConfig.resumeTo} className="hero-btn group border border-brass/60 text-bone">
              View Resume <span className="hero-arrow" aria-hidden="true">→</span>
            </Link>
            <Link
              to={heroConfig.contactTo}
              className="group mt-1 text-sm uppercase tracking-widest text-bone/80 underline-offset-8 hover:text-brass hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass md:mt-0"
            >
              Get in Touch <span className="hero-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
