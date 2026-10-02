import { useEffect, useRef, type RefObject } from "react";

/**
 * Decorative animated architectural drawing for the hero.
 * SVG + CSS stroke-dashoffset; drawn once in stages, then held.
 */
export default function BlueprintOverlay({
  hostRef,
  scroll = false,
  tone = "dark",
  align = "right",
}: {
  align?: "left" | "right";
  hostRef?: RefObject<HTMLElement | null>;
  scroll?: boolean;
  tone?: "dark" | "light";
}) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const host = hostRef?.current ?? svg?.parentElement;
    if (!svg || !host) return;

    // Pause when offscreen / tab hidden
    let visible = true;
    const sync = () => {
      svg.dataset["paused"] = visible && !document.hidden ? "false" : "true";
    };
    const io = new IntersectionObserver(([e]) => {
      visible = !!e?.isIntersecting;
      sync();
    });
    io.observe(host);
    document.addEventListener("visibilitychange", sync);

    if (scroll) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
      const paths = Array.from(svg.querySelectorAll<SVGPathElement>(".bp-draw"));
      const n = paths.length;
      let raf = 0;
      const update = () => {
        raf = 0;
        const r = host.getBoundingClientRect();
        const vh = window.innerHeight;
        // 0 when section top hits viewport bottom, 1 when section is ~70% scrolled
        const p = reduce.matches ? 1 : Math.min(1, Math.max(0, (vh - r.top) / (r.height * 0.7 + vh * 0.3)));
        const t = p * (n + 2);
        for (let i = 0; i < n; i++) {
          const k = Math.min(1, Math.max(0, t - i * 1));
          paths[i]!.style.strokeDashoffset = String(1 - k);
        }
      };
      const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      return () => {
        io.disconnect();
        document.removeEventListener("visibilitychange", sync);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
        cancelAnimationFrame(raf);
      };
    }

    // Tiny whole-drawing parallax on fine pointers only
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    const tick = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      svg.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`;
      raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.05 ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || !fine.matches || reduce.matches) return;
      const r = host.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * -8;
      ty = ((e.clientY - r.top) / r.height - 0.5) * -6;
      kick();
    };
    const onLeave = () => { tx = 0; ty = 0; kick(); };
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [hostRef, scroll]);

  const L = (d: string, stage: number, i: number, cls = "") => (
    <path
      key={`${stage}-${i}`}
      d={d}
      pathLength={1}
      className={`bp-draw ${cls}`}
      style={{ animationDelay: `${0.3 + stage * 1.4 + i * 0.12}s` }}
    />
  );

  // Footprint (stage 0)
  const footprint = ["M900 180 H1480 V720 H900 Z"];
  // Interior walls — double lines for wall thickness (stage 1)
  const walls = [
    "M900 192 H1468 M912 180 V720 M1468 192 V708 M912 708 H1468",
    "M1140 180 V430 M1152 180 V430",
    "M912 430 H1060 M1100 430 H1300 M1340 430 H1480",
    "M912 442 H1060 M1100 442 H1300 M1340 442 H1480",
    "M1300 442 V720 M1312 442 V720",
  ];
  // Door swings (stage 1)
  const doors = [
    "M1060 430 A40 40 0 0 1 1100 470 M1060 430 V470",
    "M1300 430 A40 40 0 0 0 1340 470 M1340 430 V470",
  ];
  // Column grid (stage 2)
  const cols: string[] = [];
  [900, 1140, 1300, 1480].forEach((x) =>
    [180, 430, 720].forEach((y) => cols.push(`M${x - 7} ${y - 7} h14 v14 h-14 Z`)),
  );
  // Dimension lines (stage 3)
  const dims = [
    "M900 130 H1480 M900 120 V140 M1480 120 V140 M1140 124 V136",
    "M1530 180 V720 M1520 180 H1540 M1520 720 H1540 M1524 430 H1536",
    "M900 780 H1300 M900 770 V790 M1300 770 V790",
  ];
  // Section markers (stage 3)
  const markers = [
    "M840 300 m-14 0 a14 14 0 1 0 28 0 a14 14 0 1 0 -28 0 M854 300 H880",
    "M1540 600 m-14 0 a14 14 0 1 0 28 0 a14 14 0 1 0 -28 0 M1500 600 H1526",
  ];

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      data-paused="false"
      viewBox="0 0 1600 900"
      preserveAspectRatio={align === "left" ? "xMinYMid slice" : "xMaxYMid slice"}
      className={`blueprint pointer-events-none absolute inset-0 h-full w-full ${scroll ? "bp-scroll" : ""} ${tone === "light" ? "bp-light" : ""}`}
    >
      <defs>
        <pattern id="bp-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0 H0 V40" fill="none" className="bp-grid" />
        </pattern>
        <linearGradient id="bp-fade" x1="0" x2="1">
          <stop offset="0.25" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.6" stopColor="#fff" stopOpacity="1" />
        </linearGradient>
        <mask id="bp-mask">
          <rect width="1600" height="900" fill="url(#bp-fade)" />
        </mask>
      </defs>
      <rect width="1600" height="900" fill="url(#bp-grid)" mask="url(#bp-mask)" />

      <g transform={align === "left" ? "translate(-660 95) scale(0.78)" : "translate(330 95) scale(0.78)"}>
      <g className="bp-ivory">
        {footprint.map((d, i) => L(d, 0, i, "bp-strong"))}
        {walls.map((d, i) => L(d, 1, i))}
        <g className="bp-detail">{doors.map((d, i) => L(d, 1.6, i))}</g>
      </g>
      <g className="bp-gold">
        {cols.map((d, i) => L(d, 2, i * 0.4))}
        <g className="bp-detail">
          {dims.map((d, i) => L(d, 3, i))}
          {markers.map((d, i) => L(d, 3.4, i))}
        </g>
        <path d="M1140 120 V780" pathLength={1} className="bp-axis" />
        <path d="M860 430 H1540" pathLength={1} className="bp-axis bp-axis-2" />
      </g>
      </g>
    </svg>
  );
}
