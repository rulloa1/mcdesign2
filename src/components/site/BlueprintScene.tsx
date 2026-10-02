import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { journeyConfig as C } from "@/lib/journey-config";

type Seg = number[]; // flat xyz pairs

const B = C.building;
const W = B.width / 2;
const D = B.depth / 2;

function rect(y: number, x0 = -W, x1 = W, z0 = -D, z1 = D): Seg {
  return [x0, y, z0, x1, y, z0, x1, y, z0, x1, y, z1, x1, y, z1, x0, y, z1, x0, y, z1, x0, y, z0];
}
function arc(cx: number, cz: number, r: number, a0: number, a1: number, y = 0, n = 10): Seg {
  const s: Seg = [];
  for (let i = 0; i < n; i++) {
    const t0 = a0 + ((a1 - a0) * i) / n;
    const t1 = a0 + ((a1 - a0) * (i + 1)) / n;
    s.push(cx + Math.cos(t0) * r, y, cz + Math.sin(t0) * r, cx + Math.cos(t1) * r, y, cz + Math.sin(t1) * r);
  }
  return s;
}

function buildGroups(mobile: boolean) {
  const H = B.floorHeight;
  const top = B.floors * H;
  const plan: Seg = [...rect(0.01), ...rect(0.01, -W + 0.4, W - 0.4, -D + 0.4, D - 0.4)];
  // interior walls with door gaps
  plan.push(-4, 0.01, -D, -4, 0.01, -2, -4, 0.01, 1.2, -4, 0.01, D);
  plan.push(4, 0.01, -D, 4, 0.01, -1, 4, 0.01, 2.2, 4, 0.01, D);
  plan.push(-W, 0.01, 0, -7, 0.01, 0, -5.4, 0.01, 0, 2, 0.01, 0, 6, 0.01, 0, W, 0.01, 0);
  plan.push(...arc(-4, -2, 3.2, Math.PI / 2, Math.PI, 0.01), -4, 0.01, -2, -7.2, 0.01, -2);
  plan.push(...arc(4, -1, 3.2, 0, Math.PI / 2, 0.01), 4, 0.01, -1, 4, 0.01, 2.2);
  plan.push(...arc(-7, 0, 1.6, 0, Math.PI / 2, 0.01));
  // interior wall thickness (second line of each wall)
  plan.push(-3.7, 0.01, -D, -3.7, 0.01, -2, -3.7, 0.01, 1.2, -3.7, 0.01, D);
  plan.push(4.3, 0.01, -D, 4.3, 0.01, -1, 4.3, 0.01, 2.2, 4.3, 0.01, D);
  plan.push(-W, 0.01, 0.3, -7, 0.01, 0.3, -5.4, 0.01, 0.3, 2, 0.01, 0.3, 6, 0.01, 0.3, W, 0.01, 0.3);
  // window openings on the exterior (triple-line glazing)
  for (const x of [-9, -1, 8]) for (const dz of [0, 0.2, 0.4]) plan.push(x - 1.6, 0.012, -D + dz, x + 1.6, 0.012, -D + dz);
  for (const z of [-4.5, 4.5]) for (const dx of [0, 0.2, 0.4]) plan.push(-W + dx, 0.012, z - 1.4, -W + dx, 0.012, z + 1.4);
  // stair: treads + arrow
  for (let i = 0; i <= 10; i++) plan.push(7, 0.01, 2.6 + i * 0.45, 10.5, 0.01, 2.6 + i * 0.45);
  plan.push(7, 0.01, 2.6, 7, 0.01, 7.1, 10.5, 0.01, 2.6, 10.5, 0.01, 7.1, 8.75, 0.01, 7, 8.75, 0.01, 3, 8.75, 0.01, 3, 8.3, 0.01, 3.6, 8.75, 0.01, 3, 9.2, 0.01, 3.6);
  // grid bubbles on axes
  for (const x of B.colsX) plan.push(x, 0.01, -D - 3.2, x, 0.01, -D - 5, ...arc(x, -D - 5.8, 0.8, 0, Math.PI * 2, 0.01, 16));
  for (const z of B.colsZ) plan.push(-W - 1, 0.01, z, -W - 2.8, 0.01, z, ...arc(-W - 3.6, z, 0.8, 0, Math.PI * 2, 0.01, 16));
  // section cut markers
  plan.push(-W - 2, 0.01, -3, W + 4, 0.01, -3);
  plan.push(...arc(W + 4.8, -3, 0.8, 0, Math.PI * 2, 0.01, 16), W + 4, 0.01, -3, W + 5.6, 0.01, -3);
  // dimension ticks
  plan.push(-W, 0.01, -D - 2, W, 0.01, -D - 2);
  for (const x of B.colsX) plan.push(x, 0.01, -D - 2.5, x, 0.01, -D - 1.5);
  plan.push(W + 2, 0.01, -D, W + 2, 0.01, D);
  for (const z of B.colsZ) plan.push(W + 1.5, 0.01, z, W + 2.5, 0.01, z);

  const fd = -B.foundationDepth;
  const foundation: Seg = [...rect(fd, -W - 0.6, W + 0.6, -D - 0.6, D + 0.6), ...rect(0, -W - 0.6, W + 0.6, -D - 0.6, D + 0.6)];
  for (const [x, z] of [[-W - 0.6, -D - 0.6], [W + 0.6, -D - 0.6], [W + 0.6, D + 0.6], [-W - 0.6, D + 0.6]] as const)
    foundation.push(x, fd, z, x, 0, z);

  for (let x = -W; x <= W; x += 1.5) foundation.push(x - 0.6, fd, -D - 0.6, x + 0.6, 0, -D - 0.6, x - 0.6, fd, D + 0.6, x + 0.6, 0, D + 0.6);
  for (const x of B.colsX) for (const z of B.colsZ) foundation.push(...rect(fd, x - 0.9, x + 0.9, z - 0.9, z + 0.9));

  // columns, ordered floor by floor so the frame grows upward
  const columns: Seg = [];
  for (let f = 0; f < B.floors; f++)
    for (const x of B.colsX) for (const z of B.colsZ) columns.push(x, f * H, z, x, (f + 1) * H, z);

  const slabs: Seg = [];
  for (let f = 1; f <= B.floors; f++) {
    const y = f * H;
    slabs.push(...rect(y), ...rect(y - 0.3));
    for (const x of B.colsX) slabs.push(x, y - 0.3, -D, x, y - 0.3, D); // beams
    for (const z of B.colsZ) slabs.push(-W, y - 0.3, z, W, y - 0.3, z);
  }

  const facade: Seg = [];
  if (!mobile) {
    for (let f = 0; f < B.floors; f++) {
      const y0 = f * H + 0.9;
      const y1 = (f + 1) * H - 0.6;
      for (let x = -W + 2; x < W; x += 2) facade.push(x, y0, D, x, y1, D);
      const ym = y0 + (y1 - y0) * 0.72;
      facade.push(-W, ym, D, W, ym, D, -W, y0 - 0.15, D + 0.25, W, y0 - 0.15, D + 0.25);
      facade.push(-W, y0, D, W, y0, D, -W, y1, D, W, y1, D);
      for (let z = -D + 2; z < D; z += 2) facade.push(W, y0, z, W, y1, z);
      facade.push(W, y0, -D, W, y0, D, W, y1, -D, W, y1, D);
    }
  }

  // schematic service routes (gold)
  const systems: Seg = [];
  const risers: [number, number][] = [[-8, -4], [8, 4]];
  for (const [x, z] of risers) systems.push(x, 0, z, x, top, z);
  for (let f = 0; f < B.floors; f++) {
    const y = f * H + H - 0.7;
    systems.push(-8, y, -4, 8, y, -4, 8, y, -4, 8, y, 4, -8, y, -4, -8, y, 4);
    if (!mobile) systems.push(-8, y, 4, 0, y, 4);
  }
  // structural axes
  systems.push(0, -0.5, -D - 4, 0, -0.5, D + 4, -W - 4, -0.5, 0, W + 4, -0.5, 0);

  const roof: Seg = [...rect(top + 1.2, -W + 2, W - 2, -D + 2, D - 2)];
  for (const [x, z] of [[-W + 2, -D + 2], [W - 2, -D + 2], [W - 2, D - 2], [-W + 2, D - 2]] as const)
    roof.push(x, top, z, x, top + 1.2, z);
  roof.push(-W, top + 0.4, -D, W, top + 0.4, -D, W, top + 0.4, D, -W, top + 0.4, D); // parapet

  // MC logo title block (drafting stamp) at the front-right of the plan
  const logo: Seg = [];
  {
    const y = 0.02, x0 = W - 8.6, x1 = W - 1.2, z0 = D - 4.6, z1 = D - 1.2;
    logo.push(...rect(y, x0, x1, z0, z1), ...rect(y, x0 + 0.25, x1 - 0.25, z0 + 0.25, z1 - 0.25));
    const h = 2.2, zt = z0 + 0.6, zb = zt + h; // letter top/bottom (z grows toward viewer)
    // M
    const mx = x0 + 1.0, mw = 2.6;
    logo.push(mx, y, zb, mx, y, zt, mx, y, zt, mx + mw / 2, y, zb - 0.7, mx + mw / 2, y, zb - 0.7, mx + mw, y, zt, mx + mw, y, zt, mx + mw, y, zb);
    logo.push(mx - 0.3, y, zb, mx + 0.3, y, zb, mx + mw - 0.3, y, zb, mx + mw + 0.3, y, zb); // serifs
    // C
    logo.push(...arc(x0 + 5.6, zt + h / 2, h / 2, Math.PI * 0.28, Math.PI * 1.72, y, 16));
  }

  return { plan, foundation, columns, slabs, facade, systems, roof, logo };
}

function gridSeg(): Seg {
  const s: Seg = [];
  for (let i = -40; i <= 40; i += 2) s.push(i, -0.9, -40, i, -0.9, 40, -40, -0.9, i, 40, -0.9, i);
  return s;
}

const ease = (t: number) => t * t * (3 - 2 * t);
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

function Lines({ seg, color, opacity, win, prog, intro = 0 }: { seg: Seg; color: string; opacity: number; win?: [number, number] | undefined; prog: React.MutableRefObject<number>; intro?: number }) {
  const start = useRef(0);
  const { invalidate } = useThree();
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(seg, 3));
    return g;
  }, [seg]);
  const mat = useMemo(() => new THREE.LineBasicMaterial({ color, transparent: true, opacity, depthWrite: false }), [color, opacity]);
  useEffect(() => () => { geo.dispose(); mat.dispose(); }, [geo, mat]);
  const count = seg.length / 3;
  useFrame(() => {
    if (!win) return;
    let t = clamp01((prog.current - win[0]) / (win[1] - win[0]));
    if (intro) {
      const now = performance.now();
      if (!start.current) start.current = now;
      const it = ease(clamp01((now - start.current) / intro));
      if (it < 1) invalidate();
      t = Math.max(t, it);
    }
    const n = Math.floor((count / 2) * t) * 2;
    geo.setDrawRange(0, n);
  });
  return <lineSegments geometry={geo} material={mat} />;
}

function Rig({ prog, target, reduced }: { prog: React.MutableRefObject<number>; target: React.MutableRefObject<number>; reduced: boolean }) {
  const { camera, size, invalidate } = useThree();
  const look = useRef(new THREE.Vector3());
  const tmpA = useRef(new THREE.Vector3());
  const tmpB = useRef(new THREE.Vector3());

  useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera;
    if (size.width >= 1024) cam.setViewOffset(size.width, size.height, -size.width * C.desktopOffset, 0, size.width, size.height);
    else cam.clearViewOffset();
    invalidate();
  }, [camera, size, invalidate]);

  useFrame((_, raw) => {
    const dt = Math.min(raw, 0.05);
    const goal = reduced ? 1 : target.current;
    prog.current += (goal - prog.current) * (1 - Math.exp(-6 * dt));
    if (Math.abs(goal - prog.current) < 0.0005) prog.current = goal;
    else invalidate();

    const p = prog.current;
    const cps = C.checkpoints;
    let i = 0;
    while (i < cps.length - 2 && p > cps[i + 1]!.at) i++;
    const a = cps[i]!, b = cps[i + 1]!;
    const t = ease(clamp01((p - a.at) / (b.at - a.at)));
    camera.position.copy(tmpA.current.fromArray(a.pos).lerp(tmpB.current.fromArray(b.pos), t));
    look.current.copy(tmpA.current.fromArray(a.target).lerp(tmpB.current.fromArray(b.target), t));
    camera.lookAt(look.current);
  });
  return null;
}

export default function BlueprintScene({ onFail }: { onFail: () => void }) {
  const target = useRef(0);
  const prog = useRef(0);
  const invalidateRef = useRef<() => void>(() => {});
  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mobile = typeof window !== "undefined" && window.innerWidth < 768;
  const groups = useMemo(() => buildGroups(mobile), [mobile]);
  const grid = useMemo(gridSeg, []);

  useEffect(() => {
    const read = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      target.current = max > 0 ? clamp01(window.scrollY / max) : 0;
      invalidateRef.current();
    };
    read();
    prog.current = reduced ? 1 : target.current;
    window.addEventListener("scroll", read, { passive: true });
    window.addEventListener("resize", read);
    const ro = new ResizeObserver(read);
    ro.observe(document.body);
    return () => {
      window.removeEventListener("scroll", read);
      window.removeEventListener("resize", read);
      ro.disconnect();
    };
  }, [reduced]);

  const { ivory, gold, grid: gridColor } = C.colors;
  const O = C.opacity;
  const R = C.reveal;

  return (
    <Canvas
      frameloop="demand"
      dpr={[1, mobile ? 1.5 : 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      camera={{ fov: 40, near: 0.1, far: 300, position: [0, 40, 0.01] }}
      onCreated={({ gl, invalidate }) => {
        invalidateRef.current = invalidate;
        gl.setClearColor(0x000000, 0);
        gl.domElement.addEventListener("webglcontextlost", (e) => { e.preventDefault(); onFail(); });
        invalidate();
      }}
      style={{ position: "absolute", inset: 0 }}
    >
      <Rig prog={prog} target={target} reduced={reduced} />
      <Lines seg={grid} color={gridColor} opacity={O.grid} prog={prog} />
      <Lines seg={groups.plan} color={ivory} opacity={O.plan} win={R["plan"]} prog={prog} intro={reduced ? 1 : 3200} />
      <Lines seg={groups.logo} color={gold} opacity={0.85} win={[0.04, 0.16]} prog={prog} intro={reduced ? 1 : 4200} />
      <Lines seg={groups.foundation} color={ivory} opacity={O.structure} win={R["foundation"]} prog={prog} />
      <Lines seg={groups.columns} color={ivory} opacity={O.structure + 0.1} win={R["columns"]} prog={prog} />
      <Lines seg={groups.slabs} color={ivory} opacity={O.structure} win={R["slabs"]} prog={prog} />
      {groups.facade.length ? <Lines seg={groups.facade} color={ivory} opacity={O.structure * 0.6} win={R["facade"]} prog={prog} /> : null}
      <Lines seg={groups.systems} color={gold} opacity={O.gold} win={R["systems"]} prog={prog} />
      <Lines seg={groups.roof} color={gold} opacity={O.gold * 0.8} win={R["roof"]} prog={prog} />
    </Canvas>
  );
}
