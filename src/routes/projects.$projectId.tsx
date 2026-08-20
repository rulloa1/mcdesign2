import { useEffect, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { Nav } from "@/components/site/Nav";
import { projects, categoryLabels } from "@/data/projects";
import { projectAlbums } from "@/data/albums";
import { projectSlotKey } from "@/data/media-slots";
import { useSiteMedia } from "@/lib/site-media";

export const Route = createFileRoute("/projects/$projectId")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.id === params.projectId);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.project;
    const title = p ? `${p.title} — ${p.subtitle} | MC Design Build` : "Project | MC Design Build";
    const description = p
      ? `${p.title} in ${p.location}. ${p.specs}. Role: ${p.role}.`.slice(0, 158)
      : "Project album by Michael Chandler, MC Design Build.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  errorComponent: () => <Fallback message="This project could not be loaded." />,
  notFoundComponent: () => <Fallback message="This project does not exist." />,
  component: ProjectPage,
});

function Fallback({ message }: { message: string }) {
  return (
    <div className="relative z-10 min-h-screen bg-bone">
      <Nav />
      <div className="mx-auto max-w-3xl px-6 pt-48 pb-32 text-center">
        <h1 className="font-serif text-3xl">{message}</h1>
        <Link
          to="/portfolio"
          className="mt-10 inline-flex border border-carbon/25 px-9 py-3 text-xs uppercase tracking-[0.22em] transition-all duration-700 hover:bg-carbon hover:text-bone"
        >
          Back to Portfolio
        </Link>
      </div>
    </div>
  );
}

function ProjectPage() {
  const { project } = Route.useLoaderData();
  const media = useSiteMedia();
  const album = projectAlbums[project.id];
  const images = album?.images ?? [];
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((i) => (i === null ? i : (i + 1) % images.length));
      if (e.key === "ArrowLeft") setLightbox((i) => (i === null ? i : (i - 1 + images.length) % images.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, images.length]);

  return (
    <div className="relative z-10 bg-bone">
      <Nav />

      <header className="relative h-[70vh] overflow-hidden bg-carbon">
        <img
          src={media(projectSlotKey(project.id), project.cover)}
          alt={project.title}
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/40 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full px-6 pb-16 md:px-20">
          <div className="mx-auto max-w-[1600px] text-bone">
            <div className="mb-5 flex flex-wrap gap-2">
              {project.categories.map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center rounded-full border border-brass/25 bg-brass/10 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-brass"
                >
                  {categoryLabels[c]}
                </span>
              ))}
            </div>
            <h1 className="font-serif text-4xl md:text-6xl">{project.title}</h1>
            <p className="mt-4 text-lg font-light text-bone/70">
              {project.subtitle} • {project.location}
            </p>
            <p className="mt-4 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-brass/80">{project.specs}</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1600px] px-6 py-20 md:px-12">
        <div className="grid gap-12 border-b border-carbon/10 pb-16 md:grid-cols-3">
          <div>
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-brass-dark">Role</p>
            <p className="mt-3 text-sm font-light leading-relaxed text-carbon/70">{project.role}</p>
          </div>
          <div className="md:col-span-2">
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-brass-dark">Overview</p>
            <p className="mt-3 text-base font-light leading-relaxed text-carbon/70">
              {album?.description || `${project.subtitle} in ${project.location}. ${project.specs}.`}
            </p>
          </div>
        </div>

        <section className="pt-16">
          <div className="mb-10 flex items-baseline justify-between">
            <h2 className="font-serif text-3xl">Album</h2>
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-carbon/40">
              {images.length} {images.length === 1 ? "Photo" : "Photos"}
            </p>
          </div>

          {images.length === 0 ? (
            <p className="text-sm font-light text-carbon/50">No photos have been added to this album yet.</p>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setLightbox(i)}
                  className="group relative aspect-[4/3] overflow-hidden bg-brass/5"
                >
                  <img
                    src={src}
                    alt={`${project.title} — photo ${i + 1}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.06]"
                  />
                </button>
              ))}
            </div>
          )}
        </section>

        <div className="mt-24 flex flex-wrap justify-center gap-4">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-4 border border-carbon/25 px-9 py-3 text-xs uppercase tracking-[0.22em] transition-all duration-700 hover:bg-carbon hover:text-bone"
          >
            Back to Portfolio
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-4 border border-carbon/25 px-9 py-3 text-xs uppercase tracking-[0.22em] transition-all duration-700 hover:bg-carbon hover:text-bone"
          >
            Home
          </Link>
        </div>
      </main>

      {lightbox !== null && images[lightbox] ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-carbon/95 p-6"
          onClick={() => setLightbox(null)}
        >
          <img
            src={images[lightbox]}
            alt={`${project.title} — photo ${lightbox + 1}`}
            className="max-h-[88vh] max-w-full object-contain"
          />
          <button
            type="button"
            aria-label="Close"
            onClick={() => setLightbox(null)}
            className="absolute right-6 top-6 font-mono text-xs uppercase tracking-[0.22em] text-bone/70 hover:text-bone"
          >
            Close
          </button>
          <button
            type="button"
            aria-label="Previous photo"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) => (i === null ? i : (i - 1 + images.length) % images.length));
            }}
            className="absolute left-4 font-mono text-sm text-bone/60 hover:text-bone md:left-10"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) => (i === null ? i : (i + 1) % images.length));
            }}
            className="absolute right-4 font-mono text-sm text-bone/60 hover:text-bone md:right-10"
          >
            →
          </button>
        </div>
      ) : null}
    </div>
  );
}
