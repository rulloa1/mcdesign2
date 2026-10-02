import { lazy, Suspense, useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";

import { Nav } from "@/components/site/Nav";
import { useOrderedProjects } from "@/lib/project-order";
import { projectSlotKey } from "@/data/media-slots";
import { useSiteMedia } from "@/lib/site-media";



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

  return (
    <div className="relative z-10 bg-bone">
      <Nav />

      <header ref={headerRef} className="relative overflow-hidden bg-carbon px-6 pt-40 pb-24 text-bone md:px-20">
        <div className="relative z-10 mx-auto max-w-[1600px]">
          <div className="mb-6 inline-flex items-center rounded-full border border-brass/20 bg-brass/5 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-brass/80">
            Full Portfolio
          </div>
          <h1 className="font-serif text-4xl md:text-6xl">Nineteen Projects.</h1>
          <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-bone/60">
            Ultra-luxury residential, hospitality, owner's representation, and civil engineering —
            delivered across six global regions.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-[1600px] px-6 py-20 md:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => (
            <Link
              key={p.id}
              to="/projects/$projectId"
              params={{ projectId: p.id }}
              className="project-card group relative block"
            >
              <div
                className="relative h-[42vh] overflow-hidden"
                style={{ backgroundColor: "rgb(201 169 97 / 0.06)" }}
              >
                <img
                  src={media(projectSlotKey(p.id), p.cover)}
                  alt={p.title}
                  loading="lazy"
                  className="project-img"
                />
                <div className="project-overlay" />
              </div>
              <div className="mt-4">
                <h2 className="font-serif text-2xl">{p.title}</h2>
                <p className="mt-1 text-sm text-carbon/60">
                  {p.subtitle} • {p.location}
                </p>
                <p className="mt-3 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-brass-dark">
                  {p.specs}
                </p>
                <p className="mt-3 text-sm font-light leading-relaxed text-carbon/50">{p.role}</p>
                <p className="mt-4 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-brass-dark">
                  View Album →
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-24 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-4 border border-carbon/25 px-9 py-3 text-xs uppercase tracking-[0.22em] transition-all duration-700 hover:bg-carbon hover:text-bone"
          >
            Back to Home
          </Link>
        </div>
      </main>

      <footer className="bg-carbon px-6 py-16 text-center text-bone/40 md:px-20">
        <p className="font-mono text-xs tracking-widest uppercase">
          MC Design Build — Michael Chandler
        </p>
      </footer>
    </div>
  );
}
