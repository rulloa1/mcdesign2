import { useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";

import { Nav } from "@/components/site/Nav";
import { RevealText } from "@/components/ui/reveal-text";
import { useOrderedProjects } from "@/lib/project-order";
import { projectSlotKey } from "@/data/media-slots";
import { useSiteMedia } from "@/lib/site-media";
import type { Project } from "@/data/projects";
import { projectAlbums } from "@/data/albums";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — 19 Projects | Michael Chandler, MC Design Build" },
      {
        name: "description",
        content:
          "Complete portfolio of 19 signature projects: ultra-luxury residential, hospitality, owner's representation, and civil work across six global regions.",
      },
      { property: "og:title", content: "Portfolio — 19 Projects | MC Design Build" },
      {
        property: "og:description",
        content:
          "Ultra-luxury residential, hospitality, and civil projects delivered by Michael Chandler, MC Design Build.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

function Portfolio() {
  const media = useSiteMedia();
  const ordered = useOrderedProjects();
  const shown = ordered;
  const headerRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  // Distribute the projects into three columns (column-major) so the middle
  // column can sit lower — the staggered editorial rhythm from the chosen grid.
  const columns: Array<Array<{ project: Project; index: number }>> = [[], [], []];
  shown.forEach((project, index) => columns[index % 3]!.push({ project, index }));

  return (
    <div className="relative z-10 bg-bone">
      <Nav />

      <header ref={headerRef} className="relative overflow-hidden bg-carbon px-6 pt-40 pb-24 text-bone md:px-20">
        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
          <div className="inline-flex items-center rounded-full border border-brass/40 px-4 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.25em] text-brass">
            Full Portfolio
          </div>
          <h1 className="font-serif text-6xl leading-[1.1] tracking-tight text-bone md:text-8xl">
            <RevealText text="Nineteen Projects" letterImages={shown.map((p) => p.cover)} />
            <span className="text-brass">.</span>
          </h1>
          <div className="flex flex-col items-center gap-6">
            <div className="h-px w-12 bg-brass/30" />
            <p className="max-w-md text-sm font-light leading-relaxed tracking-wide text-bone/60 md:text-base">
              A small Cross-Section of 38 years of Excellence!
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1600px] px-6 py-24 md:px-12 md:py-32">
        <div className="grid grid-cols-1 gap-x-12 gap-y-28 md:grid-cols-3 md:gap-y-36 lg:gap-y-44">
          {columns.map((column, columnIndex) => (
            <div
              key={columnIndex}
              className={`flex flex-col gap-y-28 md:gap-y-36 lg:gap-y-44 ${columnIndex === 1 ? "md:mt-32" : ""}`}
            >
              {column.map(({ project, index }) => (
                <PortfolioCard
                  key={project.id}
                  project={project}
                  index={index}
                  total={shown.length}
                  media={media}
                  reduceMotion={reduceMotion}
                />
              ))}
            </div>
          ))}
        </div>

        <div className="mt-32 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-4 border border-carbon/25 px-9 py-3 text-xs uppercase tracking-[0.22em] transition-all duration-700 hover:bg-carbon hover:text-bone"
          >
            Back to Home
          </Link>
        </div>
      </main>

      <footer className="bg-carbon px-6 py-16 text-center text-bone/40 md:px-20">
        <p className="font-mono text-xs uppercase tracking-widest">
          MC Design Build — Michael Chandler
        </p>
      </footer>
    </div>
  );
}

function PortfolioCard({
  project,
  index,
  total,
  media,
  reduceMotion,
}: {
  project: Project;
  index: number;
  total: number;
  media: (slot: string, fallback: string) => string;
  reduceMotion: boolean | null;
}) {
  const delay = reduceMotion ? 0 : (index % 3) * 0.12;
  const number = `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

  return (
    <motion.article
      {...(reduceMotion
        ? {}
        : {
            initial: { opacity: 0, y: 40 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, margin: "0px 0px -10% 0px" },
          })}
      transition={{ duration: 0.8, delay, ease: [0.2, 0.7, 0.2, 1] }}
      className="group block"
    >
      <Link to="/projects/$projectId" params={{ projectId: project.id }} className="block">
        <div className="relative overflow-hidden border border-brass/25 p-1">
          <span className="absolute left-4 top-4 z-20 border border-brass/40 bg-carbon/85 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.4em] text-brass">
            {number}
          </span>
          <div className="relative aspect-[3/4] overflow-hidden bg-neutral-900">
            <img
              src={media(projectSlotKey(project.id), project.cover)}
              alt={project.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            <div className="project-overlay" />
          </div>
          <div className="pointer-events-none absolute bottom-3 right-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <div className="h-px w-8 bg-brass" />
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 px-1">
          <div className="border-b border-brass/20 pb-4">
            <h2 className="font-serif text-2xl italic leading-tight md:text-3xl">{project.title}</h2>
            <span className="mono-loc mt-2 block font-mono text-[10px] uppercase tracking-[0.3em]">
              {project.location}
            </span>
          </div>

          <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em]">{project.specs}</p>

          <p className="max-w-[280px] text-sm font-light leading-relaxed">{project.role}</p>

          <span className="inline-flex items-center gap-4 pt-3 font-mono text-[10px] uppercase tracking-[0.32em] transition-colors duration-500 group-hover:text-carbon">
            View {projectAlbums[project.id]?.images.length ?? 0}-Photo Album
            <span className="text-base leading-none transition-transform duration-500 group-hover:translate-x-2">
              →
            </span>
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
