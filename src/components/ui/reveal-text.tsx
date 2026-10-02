import { motion, useReducedMotion } from "framer-motion";
import { useState, useEffect } from "react";

interface RevealTextProps {
  text: string;
  letterImages: string[];
  className?: string;
  textColor?: string;
  overlayColor?: string;
  letterDelay?: number;
  overlayDelay?: number;
  overlayDuration?: number;
  springDuration?: number;
}

/** Letters spring in, sweep gold once, and fill with a project photo on hover. */
export function RevealText({
  text,
  letterImages,
  className = "",
  textColor = "text-bone",
  overlayColor = "text-brass",
  letterDelay = 0.06,
  overlayDelay = 0.04,
  overlayDuration = 0.5,
  springDuration = 600,
}: RevealTextProps) {
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState<number | null>(null);
  const [sweep, setSweep] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(() => setSweep(true), (text.length - 1) * letterDelay * 1000 + springDuration);
    return () => clearTimeout(t);
  }, [text.length, letterDelay, springDuration, reduce]);

  const words = text.split(" ");
  let idx = 0;

  return (
    <span className={`inline-flex flex-wrap justify-center gap-x-[0.25em] ${className}`} aria-label={text}>
      {words.map((word, w) => (
        <span key={w} className="inline-flex whitespace-nowrap" aria-hidden>
          {word.split("").map((letter) => {
            const i = idx++;
            return (
              <motion.span
                key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="relative inline-block cursor-default"
                initial={reduce ? false : { scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * letterDelay, type: "spring", damping: 9, stiffness: 200, mass: 0.8 }}
              >
                <motion.span
                  className={`absolute inset-0 ${textColor}`}
                  animate={{ opacity: hovered === i ? 0 : 1 }}
                  transition={{ duration: 0.15 }}
                >
                  {letter}
                </motion.span>
                <motion.span
                  className="bg-cover bg-no-repeat"
                  animate={{
                    opacity: hovered === i ? 1 : 0,
                    backgroundPosition: hovered === i ? "70% center" : "30% center",
                  }}
                  transition={{ opacity: { duration: 0.15 }, backgroundPosition: { duration: 3, ease: "easeInOut" } }}
                  style={{
                    backgroundImage: `url('${letterImages[i % letterImages.length]}')`,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {letter}
                </motion.span>
                {sweep && (
                  <motion.span
                    className={`pointer-events-none absolute inset-0 ${overlayColor}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 1, 0] }}
                    transition={{ delay: i * overlayDelay, duration: overlayDuration, times: [0, 0.1, 0.7, 1] }}
                  >
                    {letter}
                  </motion.span>
                )}
              </motion.span>
            );
          })}
        </span>
      ))}
    </span>
  );
}
