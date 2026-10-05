import { ScrollText } from "@/components/ui/text-scroll-animation";
import { motion, useReducedMotion } from "framer-motion";
import { ResponsiveProjectImage } from "@/components/site/ResponsiveProjectImage";

export type PinnedCaseProps = {
  id: string;
  subtitle: string;
  title: string;
  images: [string, string, string];
  alts: [string, string, string];
  captions: [string, string];
  stats: [{ value: string; label: string }, { value: string; label: string }];
  mobileImages?: [string, string, string];
};

const ease = [0.22, 1, 0.36, 1] as const;

export function PinnedCase({ id, subtitle, title, images, mobileImages, alts, captions, stats }: PinnedCaseProps) {
  const labels = ["01 / The Vision", "02 / The Execution", "03 / The Result"];
  const reduce = useReducedMotion();
  const reveal = (delay = 0, y = 40) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.3 },
          transition: { duration: 0.9, ease, delay },
        };

  return (
    <section id={id} className="relative bg-carbon px-6 py-24 text-bone md:px-20 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <motion.p {...reveal(0, 20)} className="mb-4 font-mono text-[0.65rem] uppercase tracking-[0.3em] text-brass">{subtitle}</motion.p>
        <ScrollText text={title} className="mb-10 max-w-4xl font-serif text-4xl leading-[1.05] md:mb-14 md:text-7xl" />

        <div className="grid gap-3 md:grid-cols-3 md:gap-4">
          <motion.figure {...reveal(0, 60)} className="overflow-hidden md:col-span-2 md:row-span-2">
            <ResponsiveProjectImage desktopSrc={images[0]} mobileSrc={mobileImages?.[0]} alt={alts[0]} loading="lazy" decoding="async" className="aspect-[4/3] h-full w-full object-cover md:aspect-auto" />
          </motion.figure>
          <motion.figure {...reveal(0.15, 60)} className="overflow-hidden">
            <ResponsiveProjectImage desktopSrc={images[1]} mobileSrc={mobileImages?.[1]} alt={alts[1]} loading="lazy" decoding="async" className="aspect-[4/3] h-full w-full object-cover" />
          </motion.figure>
          <motion.figure {...reveal(0.3, 60)} className="overflow-hidden">
            <ResponsiveProjectImage desktopSrc={images[2]} mobileSrc={mobileImages?.[2]} alt={alts[2]} loading="lazy" decoding="async" className="aspect-[4/3] h-full w-full object-cover" />
          </motion.figure>
        </div>

        <div className="mt-10 grid gap-10 border-t border-bone/10 pt-10 md:mt-14 md:grid-cols-3 md:gap-12">
          {captions.map((c, i) => (
            <motion.div key={labels[i]} {...reveal(i * 0.15)}>
              <p className="mb-3 font-mono text-xs text-brass">{labels[i]}</p>
              <p className="font-serif text-xl leading-snug text-bone/90 md:text-2xl">{c}</p>
            </motion.div>
          ))}
          <motion.div {...reveal(0.3)}>
            <p className="mb-3 font-mono text-xs text-brass">{labels[2]}</p>
            <div className="flex items-end gap-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-serif text-4xl leading-none text-brass md:text-5xl">{s.value}</div>
                  <div className="mt-2 text-[0.65rem] uppercase tracking-[0.2em] text-bone/60">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
