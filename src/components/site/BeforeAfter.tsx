import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  before: { src: string; alt: string };
  after: { src: string; alt: string };
  className?: string;
};

export function BeforeAfter({ before, after, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, next)));
  }, []);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (!dragging.current) return;
      e.preventDefault();
      setFromClientX(e.clientX);
    };
    const up = () => {
      dragging.current = false;
    };
    window.addEventListener("pointermove", move, { passive: false });
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, [setFromClientX]);

  return (
    <div
      ref={ref}
      className={`group relative select-none overflow-hidden bg-carbon touch-none ${className}`}
      onPointerDown={(e) => {
        dragging.current = true;
        setFromClientX(e.clientX);
      }}
    >
      <img
        src={after.src}
        alt={after.alt}
        loading="lazy"
        draggable={false}
        className="h-full w-full object-cover"
      />
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <img
          src={before.src}
          alt={before.alt}
          loading="lazy"
          draggable={false}
          className="h-full w-full object-cover"
        />
      </div>

      <span className="pointer-events-none absolute bottom-4 left-4 text-[0.7rem] uppercase tracking-[0.28em] text-bone/80">
        Before
      </span>
      <span className="pointer-events-none absolute bottom-4 right-4 text-[0.7rem] uppercase tracking-[0.28em] text-bone/80">
        After
      </span>

      <div
        className="pointer-events-none absolute inset-y-0 w-px bg-brass"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-brass bg-carbon/70 backdrop-blur-sm">
          <span className="text-[0.75rem] tracking-[0.1em] text-brass">‹›</span>
        </div>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        aria-label={`Reveal slider comparing ${before.alt} with ${after.alt}`}
        onChange={(e) => setPos(Number(e.target.value))}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
