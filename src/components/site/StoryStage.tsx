import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { acts, STORY_SCROLL_VH, type Act } from "@/data/story";

const N = acts.length;
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/** Visibility of act i at story position x (0..N). First/last acts hold at the edges. */
function actOpacity(i: number, x: number) {
  if (i === 0 && x < 0.5) return 1;
  if (i === N - 1 && x > N - 0.5) return 1;
  const d = Math.abs(x - (i + 0.5));
  return clamp((0.68 - d) / 0.3);
}

function Actions() {
  return (
    <div className="mt-10 flex flex-wrap gap-4">
      <Link to="/" hash="experience" className="story-btn story-btn-primary">Explore Experience</Link>
      <Link to="/contact" className="story-btn">Get in Touch</Link>
    </div>
  );
}

function ActText({ act, index, as }: { act: Act; index: number; as: "h1" | "h2" }) {
  const H = as;
  return (
    <>
      <p className="mb-5 font-mono text-[0.65rem] uppercase tracking-[0.3em] text-brass">
        {String(index + 1).padStart(2, "0")} — {act.label}
      </p>
      <H className="font-serif text-[clamp(2.4rem,6vw,5.25rem)] leading-[1.04] text-bone">{act.headline}</H>
      {act.line ? <p className="mt-6 max-w-xl text-lg text-bone/75 md:text-xl">{act.line}</p> : null}
      {index === N - 1 ? <Actions /> : null}
    </>
  );
}

function SkipIntro() {
  return (
    <a href="#profile" className="story-skip">
      Skip intro <span aria-hidden="true">↓</span>
    </a>
  );
}

/* ---------- Desktop: one sticky stage, scroll-scrubbed ---------- */
function StickyStory() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const targets = useRef<number[]>(acts.map(() => 0));
  const [active, setActive] = useState(0);
  const [loaded, setLoaded] = useState<boolean[]>(() => acts.map((_, i) => i < 2));
  const [inStory, setInStory] = useState(true);

  // Request a seek; only one in flight per clip, the latest target wins on "seeked".
  const seek = (i: number) => {
    const v = videoRefs.current[i];
    if (!v || v.readyState < 1 || v.seeking || !Number.isFinite(v.duration)) return;
    const t = targets.current[i] * Math.max(0, v.duration - 0.05);
    if (Math.abs(v.currentTime - t) > 0.02) v.currentTime = t;
  };

  useEffect(() => {
    let raf = 0;
    let lastActive = -1;
    let lastIn = true;
    const update = () => {
      raf = 0;
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const p = clamp(-rect.top / Math.max(1, total));
      const x = p * N;
      for (let i = 0; i < N; i++) {
        const o = actOpacity(i, x);
        const layer = layerRefs.current[i];
        if (layer) layer.style.opacity = String(o);
        const text = textRefs.current[i];
        if (text) {
          text.style.opacity = String(o);
          const dir = x < i + 0.5 ? 1 : -1;
          text.style.transform = `translate3d(0, ${(1 - o) * 28 * dir}px, 0)`;
        }
        targets.current[i] = clamp(x - i);
        if (o > 0) seek(i);
      }
      const a = Math.min(N - 1, Math.floor(clamp(x, 0, N - 0.001)));
      if (a !== lastActive) {
        lastActive = a;
        setActive(a);
        setLoaded((prev) => (prev[a] && (a + 1 >= N || prev[a + 1]) ? prev : prev.map((v, i) => v || i === a || i === a + 1)));
      }
      const inside = rect.bottom > window.innerHeight * 0.5;
      if (inside !== lastIn) {
        lastIn = inside;
        setInStory(inside);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={wrapRef} aria-label="Leadership story" className="relative bg-carbon" style={{ height: `${STORY_SCROLL_VH}vh` }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {acts.map((act, i) => (
          <div key={act.key} ref={(n) => { layerRefs.current[i] = n; }} className="absolute inset-0" style={{ opacity: i === 0 ? 1 : 0 }} aria-hidden="true">
            <img src={act.poster} alt="" className="absolute inset-0 h-full w-full object-cover" loading={i < 2 ? "eager" : "lazy"} />
            {loaded[i] ? (
              <video
                ref={(n) => { videoRefs.current[i] = n; }}
                src={act.video}
                poster={act.poster}
                muted
                playsInline
                preload={i === active || i === active + 1 ? "auto" : "metadata"}
                onLoadedMetadata={() => seek(i)}
                onSeeked={() => seek(i)}
                onError={(e) => { e.currentTarget.style.display = "none"; }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : null}
          </div>
        ))}
        <div className="story-scrim pointer-events-none absolute inset-0" />

        <div className="relative z-10 flex h-full items-center px-6 md:px-20">
          <div className="relative w-full max-w-3xl">
            {acts.map((act, i) => (
              <div
                key={act.key}
                ref={(n) => { textRefs.current[i] = n; }}
                className={`${i === 0 ? "relative" : "absolute inset-x-0 top-1/2 -translate-y-1/2"}`}
                style={{ opacity: i === 0 ? 1 : 0, pointerEvents: i === active ? "auto" : "none" }}
                aria-hidden={i !== active}
                inert={i !== active}
              >
                <ActText act={act} index={i} as={i === 0 ? "h1" : "h2"} />
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-6 z-10 md:left-20"><SkipIntro /></div>
        <p className="absolute right-6 bottom-8 z-10 font-mono text-[0.55rem] uppercase tracking-[0.2em] text-bone/40 md:right-20">
          Conceptual footage
        </p>
      </div>

      <ol aria-hidden="true" className={`fixed top-1/2 right-6 z-40 hidden -translate-y-1/2 flex-col gap-3 transition-opacity duration-500 lg:flex ${inStory ? "opacity-100" : "opacity-0"}`}>
        {acts.map((a, i) => (
          <li key={a.key} className={`h-6 w-px transition-colors duration-500 ${i === active ? "bg-brass" : "bg-bone/25"}`} />
        ))}
      </ol>
    </section>
  );
}

/* ---------- Mobile / reduced motion / no-JS: compact normal flow ---------- */
function FlowStory({ allowVideo }: { allowVideo: boolean }) {
  const refs = useRef<(HTMLVideoElement | null)[]>([]);
  useEffect(() => {
    if (!allowVideo) return;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        const v = e.target as HTMLVideoElement;
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      }
    }, { threshold: 0.4 });
    refs.current.forEach((v) => v && io.observe(v));
    return () => io.disconnect();
  }, [allowVideo]);

  return (
    <section aria-label="Leadership story" className="bg-carbon">
      {acts.map((act, i) => (
        <div key={act.key} className="relative flex min-h-[78svh] items-end overflow-hidden px-6 pt-28 pb-16 md:px-20">
          <img src={act.poster} alt={act.alt} className="absolute inset-0 h-full w-full object-cover" loading={i === 0 ? "eager" : "lazy"} />
          {allowVideo ? (
            <video
              ref={(n) => { refs.current[i] = n; }}
              src={act.video}
              poster={act.poster}
              muted
              loop
              playsInline
              preload="none"
              aria-hidden="true"
              onError={(e) => { e.currentTarget.style.display = "none"; }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : null}
          <div className="story-scrim pointer-events-none absolute inset-0" />
          <div className="relative z-10 max-w-3xl">
            <ActText act={act} index={i} as={i === 0 ? "h1" : "h2"} />
            {i === 0 ? <div className="mt-8"><SkipIntro /></div> : null}
          </div>
        </div>
      ))}
    </section>
  );
}

export function StoryStage() {
  const [mode, setMode] = useState<"flow" | "flow-video" | "sticky">("flow");
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px) and (hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pick = () => setMode(reduced.matches ? "flow" : desktop.matches ? "sticky" : "flow-video");
    pick();
    desktop.addEventListener("change", pick);
    reduced.addEventListener("change", pick);
    return () => {
      desktop.removeEventListener("change", pick);
      reduced.removeEventListener("change", pick);
    };
  }, []);
  return mode === "sticky" ? <StickyStory /> : <FlowStory allowVideo={mode === "flow-video"} />;
}
