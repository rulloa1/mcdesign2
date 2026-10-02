import { useEffect, useRef } from "react";

/** Sparse, slow gold structural grid. Decorative only. */
export function ArchitecturalCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const gold = getComputedStyle(document.documentElement).getPropertyValue("--brass").trim() || "#b8975a";
    let raf = 0;
    let visible = true;
    let w = 0;
    let h = 0;
    let pts: { x: number; y: number; p: number }[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const step = w < 768 ? 220 : 160;
      pts = [];
      for (let x = step / 2; x < w; x += step)
        for (let y = step / 2; y < h; y += step) pts.push({ x, y, p: Math.random() * Math.PI * 2 });
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = gold;
      ctx.fillStyle = gold;
      ctx.lineWidth = 0.5;
      const time = reduced ? 0 : t / 6000;
      ctx.globalAlpha = 0.08;
      ctx.beginPath();
      for (const a of pts) {
        for (const b of pts) {
          if ((b.x > a.x && b.y === a.y) || (b.y > a.y && b.x === a.x)) {
            if (Math.abs(b.x - a.x) + Math.abs(b.y - a.y) < 240) {
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
            }
          }
        }
      }
      ctx.stroke();
      for (const a of pts) {
        ctx.globalAlpha = 0.25 + 0.2 * Math.sin(time + a.p);
        ctx.beginPath();
        ctx.arc(a.x, a.y, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
      if (!reduced && visible && !document.hidden) raf = requestAnimationFrame(draw);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(draw);
    };
    resize();
    start();
    const ro = new ResizeObserver(() => { resize(); start(); });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); });
    io.observe(canvas);
    const onVis = () => { if (!document.hidden) start(); };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />;
}
