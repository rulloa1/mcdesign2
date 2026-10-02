import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

function Char({ char, offset, spread, progress }: { char: string; offset: number; spread: number; progress: MotionValue<number> }) {
  const x = useTransform(progress, [0, 1], [offset * spread, 0]);
  const rotateX = useTransform(progress, [0, 1], [Math.max(-80, Math.min(80, offset * spread)), 0]);
  const opacity = useTransform(progress, [0, 0.6], [0, 1]);
  return (
    <motion.span className="inline-block" style={{ x, rotateX, opacity }}>
      {char}
    </motion.span>
  );
}

/** Heading whose letters fly together from a spread-out start as it scrolls into view. */
export function ScrollText({ text, as = "h2", className }: { text: string; as?: "h2" | "h3"; className?: string }) {
  const ref = useRef<HTMLHeadingElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center 55%"] });
  const [vw, setVw] = useState(1280);
  useEffect(() => {
    const on = () => setVw(window.innerWidth);
    on();
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);
  const Tag = as;
  if (reduce) return <Tag className={className}>{text}</Tag>;

  const chars = text.split("");
  const center = Math.floor(chars.length / 2);
  const spread = vw < 768 ? 0 : Math.min(40, 700 / chars.length);
  const words = text.split(" ");
  let idx = 0;

  return (
    <Tag ref={ref} aria-label={text} className={cn("overflow-x-clip", className)} style={{ perspective: "500px" }}>
      {words.map((w, wi) => {
        const node = (
          <span key={wi} aria-hidden className="inline-block whitespace-nowrap">
            {w.split("").map((c) => {
              const i = idx++;
              return <Char key={i} char={c} offset={i - center} spread={spread} progress={scrollYProgress} />;
            })}
          </span>
        );
        idx++; // the space
        return wi < words.length - 1 ? [node, " "] : node;
      })}
    </Tag>
  );
}
