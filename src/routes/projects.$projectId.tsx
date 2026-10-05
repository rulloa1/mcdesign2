import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { Nav } from "@/components/site/Nav";
import { projects, categoryLabels } from "@/data/projects";
import { projectAlbums } from "@/data/albums";
import { projectSlotKey } from "@/data/media-slots";
import { useSiteMedia } from "@/lib/site-media";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AlbumEditor } from "@/components/site/AlbumEditor";
import { PrivateGallery, galleryQuery } from "@/components/site/PrivateGallery";
import { albumOverrideQuery, useIsAdmin } from "@/lib/project-albums";
import { coverVideos } from "@/data/cover-videos";
import { Button } from "@/components/ui/button";



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
  const { data: override } = useQuery(albumOverrideQuery(project.id));
  const images: string[] = override ?? album?.images ?? [];
  const isAdmin = useIsAdmin();
  const { data: galleryItems = [] } = useQuery(galleryQuery(project.id));
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((i) => (i === null ? i : (i + 1) % images.length));
      if (e.key === "ArrowLeft")
        setLightbox((i) => (i === null ? i : (i - 1 + images.length) % images.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, images.length]);

  return (
    <div className="relative z-10 bg-bone">
      <Nav />

      <header ref={headerRef} className="relative h-[70vh] overflow-hidden bg-carbon">
        {coverVideos[project.id] ? (
          <video
            src={coverVideos[project.id]}
            poster={media(projectSlotKey(project.id), project.cover)}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover opacity-60"
          />
        ) : (
          <img
            src={media(projectSlotKey(project.id), project.cover)}
            alt={project.title}
            className="absolute inset-0 h-full w-full object-cover opacity-60"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/40 to-transparent" />
        <div className="absolute bottom-0 left-0 z-10 w-full px-6 pb-16 md:px-20">
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
            <p className="mt-4 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-brass/80">
              {project.specs}
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1600px] px-6 py-20 md:px-12">
        <div className="grid gap-12 border-b border-carbon/10 pb-16 md:grid-cols-3">
          <div>
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-brass-dark">
              Role
            </p>
            <p className="mt-3 text-sm font-light leading-relaxed text-carbon/70">{project.role}</p>
          </div>
          <div className="md:col-span-2">
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-brass-dark">
              Overview
            </p>
            <p className="mt-3 text-base font-light leading-relaxed text-carbon/70">
              {album?.description ||
                `${project.subtitle} in ${project.location}. ${project.specs}.`}
            </p>
          </div>
        </div>

        <section className="pt-16">
          <div className="mb-10 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 border-b border-brass-dark/25 pb-5">
            <h2 className="font-serif text-3xl">Album</h2>
            <div className="flex items-center gap-6">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-carbon/40">
                {images.length} {images.length === 1 ? "Photo" : "Photos"}
              </p>
              {isAdmin && !editing ? (
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setEditing(true)}
                  className="border-brass-dark/40 bg-transparent px-5 text-[0.65rem] uppercase tracking-[0.22em] hover:bg-carbon hover:text-bone"
                >
                  Edit Album
                </Button>
              ) : null}
            </div>
          </div>

          {editing ? (
            <AlbumEditor
              projectId={project.id}
              title={project.title}
              images={images}
              onDone={(saved) => {
                setEditing(false);
                if (saved)
                  void queryClient.invalidateQueries({ queryKey: ["project-album", project.id] });
              }}
            />
          ) : images.length === 0 ? (
            <p className="text-sm font-light text-carbon/50">
              No photos have been added to this album yet.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-12 md:gap-5">
              {images.map((src, i) => (
                <Button
                  key={src}
                  variant="ghost"
                  type="button"
                  onClick={() => setLightbox(i)}
                  className={`group relative h-auto overflow-hidden rounded-none border border-brass-dark/25 bg-brass/5 p-1 hover:bg-brass/10 md:col-span-${i % 7 === 0 ? "8" : i % 7 === 1 ? "4" : i % 5 === 0 ? "7" : "4"}`}
                >
                  <span className={`relative block w-full overflow-hidden ${i % 7 === 0 ? "aspect-[16/10]" : i % 7 === 1 ? "aspect-[4/5]" : i % 5 === 0 ? "aspect-[3/2]" : "aspect-[4/3]"}`}>
                    <img
                      src={src}
                      alt={`${project.title} — photo ${i + 1}`}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-[1200ms] motion-safe:group-hover:scale-[1.04]"
                    />
                    <span className="absolute bottom-3 right-3 border-b border-r border-brass-dark/70 p-3 opacity-0 transition-opacity group-hover:opacity-100" />
                    <span className="absolute left-3 top-3 bg-carbon/85 px-2 py-1 font-mono text-[0.55rem] tracking-[0.18em] text-brass opacity-0 transition-opacity group-hover:opacity-100">{String(i + 1).padStart(2, "0")}</span>
                  </span>
                </Button>
              ))}
            </div>
          )}
        </section>

        {galleryItems.length > 0 ? (
          <section className="pt-16">
            <div className="mb-10 flex items-baseline justify-between">
              <h2 className="font-serif text-3xl">Gallery</h2>
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-carbon/40">
                {galleryItems.length} {galleryItems.length === 1 ? "Item" : "Items"}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {galleryItems.map((item) => (
                <figure key={item.id} className="group">
                  <div className="relative aspect-[4/3] overflow-hidden bg-brass/5">
                    {item.kind === "video" ? (
                      <video
                        src={item.url}
                        controls
                        playsInline
                        preload="metadata"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <img
                        src={item.url}
                        alt={item.caption || project.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.06]"
                      />
                    )}
                  </div>
                  {item.caption || item.taken_on ? (
                    <figcaption className="mt-2 flex items-baseline justify-between gap-3">
                      <span className="text-xs font-light text-carbon/70">{item.caption}</span>
                      {item.taken_on ? (
                        <span className="shrink-0 font-mono text-[0.55rem] uppercase tracking-[0.18em] text-carbon/40">
                          {item.taken_on}
                        </span>
                      ) : null}
                    </figcaption>
                  ) : null}
                </figure>
              ))}
            </div>
          </section>
        ) : null}

        {isAdmin ? <PrivateGallery projectId={project.id} /> : null}

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
            className="max-h-[82vh] max-w-[calc(100vw-3rem)] border border-brass/35 p-1 object-contain"
          />
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-brass">
            {String(lightbox + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
          </p>
          <Button
            variant="ghost"
            size="sm"
            type="button"
            aria-label="Close"
            onClick={() => setLightbox(null)}
            className="absolute right-6 top-6 border border-brass/35 font-mono text-xs uppercase tracking-[0.22em] text-bone/70 hover:bg-brass/10 hover:text-brass"
          >
            Close
          </Button>
          <Button
            variant="ghost"
            size="icon"
            type="button"
            aria-label="Previous photo"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) => (i === null ? i : (i - 1 + images.length) % images.length));
            }}
            className="absolute left-4 rounded-full border border-brass/35 font-mono text-sm text-bone/70 hover:bg-brass/10 hover:text-brass md:left-10"
          >
            ←
          </Button>
          <Button
            variant="ghost"
            size="icon"
            type="button"
            aria-label="Next photo"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) => (i === null ? i : (i + 1) % images.length));
            }}
            className="absolute right-4 rounded-full border border-brass/35 font-mono text-sm text-bone/70 hover:bg-brass/10 hover:text-brass md:right-10"
          >
            →
          </Button>
        </div>
      ) : null}
    </div>
  );
}
