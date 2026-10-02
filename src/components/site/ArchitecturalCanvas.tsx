import { useEffect, useRef, type RefObject } from "react";

type Node = { x: number; y: number; vx: number; vy: number; ox: number; oy: number };
type Pulse = { a: number; b: number; t: number };

const LINK = 170;
const LINK2 = LINK * LINK;
const REPEL = 180;
const REPEL2 = REPEL * REPEL;
const MAX_LINKS = 3;
const MAX_PULSES = 3;
const MAX_SPEED = 0.04; // px per ms

/** Subtle gold architectural constellation. Decorative only; pointer events read from the host element. */
export default function ArchitecturalCanvas({ hostRef }: { hostRef?: RefObject<HTMLElement | null> }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const gold = getComputedStyle(document.documentElement).getPropertyValue("--brass").trim() || "#b8975a";
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fineMq = window.matchMedia("(hover: hover) and (pointer: fine)");
    let reduced = motionMq.matches;
    let w = 0, h = 0, raf = 0, last = 0, visible = true;
    let nodes: Node[] = [];
    const pulses: Pulse[] = [];
    const pointer = { x: 0, y: 0, active: false };
    const linkA = new Int16Array(400), linkB = new Int16Array(400);
    let linkCount = 0;
    const counts = new Uint8Array(80);

    const seed = (n: number) => {
      nodes = [];
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2, s = 0.006 + Math.random() * 0.008;
        nodes.push({ x: Math.random() * w, y: Math.random() * h, vx: Math.cos(a) * s, vy: Math.sin(a) * s, ox: Math.cos(a) * s, oy: Math.sin(a) * s });
      }
    };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const pw = w, ph = h;
      w = r.width; h = r.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const target = w < 768 ? 24 : 60;
      if (!nodes.length || nodes.length !== target) seed(target);
      else if (pw && ph) for (const n of nodes) { n.x *= w / pw; n.y *= h / ph; }
      if (reduced) draw();
    };

    const computeLinks = () => {
      linkCount = 0;
      counts.fill(0);
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length && counts[i]! < MAX_LINKS; j++) {
          if (counts[j]! >= MAX_LINKS) continue;
          const dx = nodes[i]!.x - nodes[j]!.x, dy = nodes[i]!.y - nodes[j]!.y;
          if (dx * dx + dy * dy < LINK2 && linkCount < 400) {
            linkA[linkCount] = i; linkB[linkCount] = j; linkCount++;
            counts[i]!++; counts[j]!++;
          }
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      computeLinks();
      ctx.strokeStyle = gold;
      ctx.lineWidth = 0.6;
      for (let k = 0; k < linkCount; k++) {
        const a = nodes[linkA[k]!]!, b = nodes[linkB[k]!]!;
        const dx = a.x - b.x, dy = a.y - b.y;
        ctx.globalAlpha = 0.14 * (1 - (dx * dx + dy * dy) / LINK2);
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }
      ctx.fillStyle = gold;
      ctx.globalAlpha = 0.45;
      for (const n of nodes) { ctx.beginPath(); ctx.arc(n.x, n.y, 1.3, 0, Math.PI * 2); ctx.fill(); }
      if (!reduced) {
        for (const p of pulses) {
          const a = nodes[p.a], b = nodes[p.b];
          if (!a || !b) continue;
          ctx.globalAlpha = 0.5 * Math.sin(p.t * Math.PI);
          ctx.beginPath(); ctx.arc(a.x + (b.x - a.x) * p.t, a.y + (b.y - a.y) * p.t, 1.8, 0, Math.PI * 2); ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };

    const step = (dt: number) => {
      const usePointer = pointer.active && fineMq.matches;
      for (const n of nodes) {
        if (usePointer) {
          const dx = n.x - pointer.x, dy = n.y - pointer.y, d2 = dx * dx + dy * dy;
          if (d2 < REPEL2 && d2 > 1) {
            const f = (1 - d2 / REPEL2) * 0.00004 * dt, d = Math.sqrt(d2);
            n.vx += (dx / d) * f; n.vy += (dy / d) * f;
          }
        }
        n.vx += (n.ox - n.vx) * 0.002 * dt;
        n.vy += (n.oy - n.vy) * 0.002 * dt;
        const sp = Math.hypot(n.vx, n.vy);
        if (sp > MAX_SPEED) { n.vx *= MAX_SPEED / sp; n.vy *= MAX_SPEED / sp; }
        n.x += n.vx * dt; n.y += n.vy * dt;
        if (n.x < -20) n.x = w + 20; else if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20; else if (n.y > h + 20) n.y = -20;
      }
      for (let i = pulses.length - 1; i >= 0; i--) {
        pulses[i]!.t += dt / 2400;
        if (pulses[i]!.t >= 1) pulses.splice(i, 1);
      }
      if (pulses.length < MAX_PULSES && linkCount && Math.random() < dt / 4000) {
        const k = Math.floor(Math.random() * linkCount);
        pulses.push({ a: linkA[k]!, b: linkB[k]!, t: 0 });
      }
    };

    const loop = (t: number) => {
      raf = 0;
      const dt = Math.min(t - (last || t), 50);
      last = t;
      step(dt);
      draw();
      schedule();
    };
    const schedule = () => {
      if (!raf && !reduced && visible && !document.hidden) raf = requestAnimationFrame(loop);
    };
    const stop = () => { if (raf) cancelAnimationFrame(raf); raf = 0; last = 0; };

    const host = hostRef?.current ?? canvas.parentElement;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left; pointer.y = e.clientY - r.top; pointer.active = true;
    };
    const onLeave = () => { pointer.active = false; };
    const onVis = () => { if (document.hidden) stop(); else schedule(); };
    const onMotion = () => { reduced = motionMq.matches; pulses.length = 0; if (reduced) { stop(); draw(); } else schedule(); };

    resize();
    draw();
    schedule();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => { visible = !!e?.isIntersecting; if (visible) schedule(); else stop(); });
    io.observe(host ?? canvas);
    host?.addEventListener("pointermove", onMove, { passive: true });
    host?.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVis);
    motionMq.addEventListener("change", onMotion);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      host?.removeEventListener("pointermove", onMove);
      host?.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
      motionMq.removeEventListener("change", onMotion);
    };
  }, [hostRef]);

  return <canvas ref={ref} aria-hidden="true" tabIndex={-1} className="pointer-events-none absolute inset-0 h-full w-full" />;
}
