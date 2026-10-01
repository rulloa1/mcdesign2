import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";

import { projects } from "@/data/projects";
import { projectSlotKey } from "@/data/media-slots";
import { useSiteMedia } from "@/lib/site-media";

/**
 * Scroll-driven showcase: one full-screen pinned panel per project.
 * A tall wrapper (N × 100vh) holds a sticky viewport; scroll progress
 * crossfades between project covers with a counter and progress rail.
 */
export function ProjectScrollShowcase() {
  const media = useSiteMedia();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const count = projects.length;

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = wrapRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const p = total > 0 ? Math.min(Math.max(-rect.top / total, 0), 0.9999) : 0;
        setProgress(p);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const exact = progress * count;
  const active = Math.min(Math.floor(exact), count - 1);
  const project = projects[active]!;

  return (
    <section
      id="works"
      ref={wrapRef}
      className="relative bg-carbon"
      style={{ height: `${count * 100}vh` }}
      aria-label="All projects — scroll showcase"
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden text-bone">
        {/* Covers */}
        {projects.map((p, i) => (
          <img
            key={p.id}
            src={media(projectSlotKey(p.id), p.cover)}
            alt={p.title}
            loading={i < 2 ? "eager" : "lazy"}
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-center transition-all duration-700 ease-out"
            style={{
              opacity: active === i ? 1 : 0,
              transform: active === i ? "scale(1)" : "scale(1.06)",
            }}
          />
        ))}

        {/* Readability gradients */}
        <div aria-hidden="true" className="absolute inset-0 z-10 bg-carbon/35" />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 z-10 h-2/3 bg-gradient-to-t from-carbon via-carbon/60 to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 z-10 h-1/4 bg-gradient-to-b from-carbon/70 to-transparent"
        />

        {/* Counter */}
        <div className="absolute top-24 right-6 z-20 font-mono text-xs tracking-[0.3em] text-bone/70 md:top-28 md:right-12">
          <span className="text-brass">{String(active + 1).padStart(2, "0")}</span>
          <span className="mx-2 text-bone/40">/</span>
          <span>{String(count).padStart(2, "0")}</span>
        </div>

        {/* Progress rail */}
        <div className="absolute top-1/2 right-6 z-20 hidden h-40 w-px -translate-y-1/2 bg-bone/15 md:right-12 md:block">
          <div
            className="w-px bg-brass transition-[height] duration-300 ease-out"
            style={{ height: `${((active + 1) / count) * 100}%` }}
          />
        </div>

        {/* Caption */}
        <div className="absolute bottom-[12%] left-6 z-20 w-[86%] max-w-3xl md:left-12">
          <p className="mb-3 font-mono text-[0.65rem] uppercase tracking-[0.3em] text-brass md:text-xs">
            {project.location}
          </p>
          <h2 className="font-serif text-4xl leading-tight text-bone sm:text-5xl md:text-7xl">
            {project.title}
          </h2>
          <p className="mt-4 max-w-xl text-sm font-light leading-relaxed text-bone/75 md:text-base">
            {project.subtitle}
          </p>
          <Link
            to="/projects/$projectId"
            params={{ projectId: project.id }}
            className="group mt-8 inline-flex items-center gap-4 border border-bone/25 py-3 pr-3 pl-7 text-[0.65rem] uppercase tracking-[0.22em] text-bone transition-all duration-500 hover:border-brass hover:bg-brass hover:text-carbon"
          >
            <span>View Album</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-bone/20 transition-all duration-500 group-hover:border-carbon/30">
              <svg
                width="12"
                height="12"
                viewBox="0 0 13 13"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M1.5 11.5L11.5 1.5M11.5 1.5H4.5M11.5 1.5V8.5" />
              </svg>
            </span>
          </Link>
        </div>

        {/* Scroll hint on first panel */}
        {active === 0 && (
          <div className="absolute bottom-[12%] right-6 z-20 hidden flex-col items-center gap-3 md:right-12 md:flex">
            <span className="font-mono text-[0.6rem] uppercase tracking-widest text-bone/50 [writing-mode:vertical-rl]">
              Keep scrolling
            </span>
            <div className="scroll-line" />
          </div>
        )}
      </div>
    </section>
  );
}
