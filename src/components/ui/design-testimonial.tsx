import type React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";

export type TestimonialItem = { quote: string; source: string };

export function Testimonial({ items }: { items: TestimonialItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useSpring(mouseX, { damping: 25, stiffness: 200 });
  const y = useSpring(mouseY, { damping: 25, stiffness: 200 });
  const numberX = useTransform(x, [-200, 200], [-20, 20]);
  const numberY = useTransform(y, [-200, 200], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      mouseX.set(e.clientX - (rect.left + rect.width / 2));
      mouseY.set(e.clientY - (rect.top + rect.height / 2));
    }
  };

  const goNext = useCallback(() => setActiveIndex((p) => (p + 1) % items.length), [items.length]);
  const goPrev = () => setActiveIndex((p) => (p - 1 + items.length) % items.length);

  useEffect(() => {
    const t = setInterval(goNext, 8000);
    return () => clearInterval(t);
  }, [goNext, activeIndex]);

  const current = items[activeIndex];
  if (!current) return null;
  const ease = [0.22, 1, 0.36, 1] as const;

  const NavBtn = ({ dir }: { dir: "prev" | "next" }) => (
    <motion.button
      type="button"
      aria-label={dir === "prev" ? "Previous testimonial" : "Next testimonial"}
      onClick={dir === "prev" ? goPrev : goNext}
      className="flex h-12 w-12 items-center justify-center rounded-full border border-carbon/20 text-carbon transition-colors duration-500 hover:border-brass hover:text-brass"
      whileTap={{ scale: 0.95 }}
    >
      <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
        <path
          d={dir === "prev" ? "M10 12L6 8L10 4" : "M6 4L10 8L6 12"}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.button>
  );

  return (
    <div ref={containerRef} className="relative w-full" onMouseMove={handleMouseMove}>
      <motion.div
        className="pointer-events-none absolute -left-4 top-1/2 -translate-y-1/2 select-none font-serif text-[12rem] leading-none text-carbon/[0.04] md:-left-8 md:text-[22rem]"
        style={{ x: numberX, y: numberY }}
        aria-hidden="true"
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6, ease }}
            className="block"
          >
            {String(activeIndex + 1).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
      </motion.div>

      <div className="relative flex">
        <div className="hidden flex-col items-center justify-center border-r border-carbon/10 pr-12 md:flex">
          <span
            className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-carbon/50"
            style={{ writingMode: "vertical-rl" }}
          >
            Client Perspectives
          </span>
          <div className="relative mt-8 h-32 w-px bg-carbon/10">
            <motion.div
              className="absolute left-0 top-0 w-full bg-brass"
              animate={{ height: `${((activeIndex + 1) / items.length) * 100}%` }}
              transition={{ duration: 0.5, ease }}
            />
          </div>
        </div>

        <div className="flex-1 py-8 md:py-12 md:pl-16">
          <div className="relative mb-12 min-h-[220px] md:min-h-[200px]">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={activeIndex}
                className="font-serif text-2xl italic leading-relaxed text-carbon md:text-3xl"
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {current.quote.split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    className="mr-[0.3em] inline-block"
                    variants={{
                      hidden: { opacity: 0, y: 16 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.025, ease } },
                      exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="flex items-center gap-4"
              >
                <motion.div
                  className="h-px w-8 bg-brass"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  style={{ originX: 0 }}
                />
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-carbon/50">
                  {current.source.replace(/^—\s*/, "")}
                </p>
              </motion.div>
            </AnimatePresence>
            <div className="flex items-center gap-4">
              <NavBtn dir="prev" />
              <NavBtn dir="next" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
