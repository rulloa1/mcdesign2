import { useEffect, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { Footer } from "@/components/site/Footer";
import { Nav } from "@/components/site/Nav";
import { projectAlbums } from "@/data/albums";
import { projectSlotKey } from "@/data/media-slots";
import { projects } from "@/data/projects";
import { useReveal } from "@/hooks/use-reveal";
import { absoluteImage, SITE_ORIGIN } from "@/lib/seo";
import { useSiteMedia } from "@/lib/site-media";

const sheetNumber = (index: number) => `G-1${String(index + 1).padStart(2, "0")}`;

export const Route = createFileRoute("/projects/$projectId")({
  loader: ({ params }) => {
    const project = projects.find((item) => item.id === params.projectId);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ params, loaderData }) => {
    const project = loaderData?.project;
    const title = project ? `${project.title} — ${project.subtitle} | McDesign` : "Project unavailable | McDesign";
    const description = project
      ? `${project.title} in ${project.location}. ${project.specs}. Role: ${project.role}.`.slice(0, 158)
      : "Project album by Michael Chandler, McDesign.";
    const url = `${SITE_ORIGIN}/projects/${params.projectId}`;
    const image = project ? absoluteImage(project.cover) : undefined;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        ...(image ? [{ property: "og:image", content: image }, { name: "twitter:image", content: image }] : []),
        { name: "twitter:card", content: "summary_large_image" },
        ...(!project ? [{ name: "robots", content: "noindex" }] : []),
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: project
        ? [{
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CreativeWork",
              name: project.title,
              locationCreated: project.location,
              creator: { "@type": "Person", name: "Michael Chandler" },
            }),
          }]
        : [],
    };
  },
  errorComponent: () => <Fallback message="This project could not be loaded." />,
  notFoundComponent: () => <Fallback message="This project does not exist." />,
  component: ProjectPage,
});

function Fallback({ message }: { message: string }) {
  return (
    <div className="min-h-dvh bg-mylar text-ink">
      <Nav />
      <main id="main" className="page-grid min-h-dvh items-center pt-16">
        <div className="col-span-12 py-24 text-center">
          <p className="label text-blueline">G-404</p>
          <h1 className="display h1-size mt-5">{message}</h1>
          <Link to="/portfolio" className="draw-link label mt-10 inline-block text-blueline">Back to portfolio →</Link>
        </div>
      </main>
    </div>
  );
}

function ProjectPage() {
  const { project } = Route.useLoaderData();
  const media = useSiteMedia();
  const album = projectAlbums[project.id];
  const images = album?.images ?? [];
  const projectIndex = projects.findIndex((item) => item.id === project.id);
  const previous = projects[(projectIndex - 1 + projects.length) % projects.length];
  const next = projects[(projectIndex + 1) % projects.length];
  const number = sheetNumber(projectIndex);
  const [lightbox, setLightbox] = useState<number | null>(null);
  useReveal();

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(null);
      if (event.key === "ArrowRight") setLightbox((index) => (index === null ? index : (index + 1) % images.length));
      if (event.key === "ArrowLeft") setLightbox((index) => (index === null ? index : (index - 1 + images.length) % images.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, images.length]);

  return (
    <div className="bg-mylar text-ink">
      <Nav />
      <header className="sheet-grid border-b border-rule-on-dark bg-cyanotype pt-16 text-chalk">
        <div className="page-grid py-20 md:py-28">
          <div className="col-span-12 lg:col-span-9">
            <p className="label text-blueline-on-dark">{number} · Project</p>
            <h1 className="display h1-size mt-6">{project.title}</h1>
            <p className="mt-5 text-chalk-muted">{project.subtitle}</p>
          </div>
        </div>
        <div className="page-grid pb-10">
          <TitleCell label="Location">{project.location}</TitleCell>
          <TitleCell label="Role">{project.role}</TitleCell>
          <TitleCell label="Scope">{project.specs}</TitleCell>
        </div>
      </header>

      <main id="main">
        <section className="page-grid py-16 md:py-24" aria-labelledby="project-overview">
          <h2 id="project-overview" className="display h2-size col-span-12 lg:col-span-4">Project record.</h2>
          <p className="col-span-12 mt-8 text-graphite lg:col-span-7 lg:col-start-6 lg:mt-0">
            {album?.description || `${project.subtitle} in ${project.location}. ${project.specs}.`}
          </p>
        </section>

        <section aria-labelledby="album-heading">
          <div className="page-grid mb-8">
            <h2 id="album-heading" className="display h2-size col-span-8">Album.</h2>
            <p className="label col-span-4 self-end text-right text-blueline">{images.length} {images.length === 1 ? "photo" : "photos"}</p>
          </div>
          {images.length === 0 ? (
            <div className="page-grid pb-20"><p className="col-span-12 text-graphite">No photos have been added to this album yet.</p></div>
          ) : (
            <div className="grid gap-px bg-rule">
              {images.map((src, index) => (
                <figure key={src} className="bg-mylar">
                  <button type="button" onClick={() => setLightbox(index)} className="block w-full text-left">
                    <img
                      data-reveal="develop"
                      src={src}
                      alt={`${project.title} — detail ${index + 1}`}
                      width="1600"
                      height="1200"
                      loading="lazy"
                      decoding="async"
                      className="h-auto max-h-[100dvh] w-full object-cover"
                    />
                    <span className="label block px-4 py-3 text-blueline md:px-8">Detail {index + 1}</span>
                  </button>
                </figure>
              ))}
            </div>
          )}
        </section>

        <nav className="page-grid py-16" aria-label="Adjacent projects">
          {previous ? <Link to="/projects/$projectId" params={{ projectId: previous.id }} className="draw-link label col-span-6 w-fit text-blueline">← {sheetNumber((projectIndex - 1 + projects.length) % projects.length)} {previous.title}</Link> : null}
          {next ? <Link to="/projects/$projectId" params={{ projectId: next.id }} className="draw-link label col-span-6 ml-auto w-fit text-right text-blueline">{next.title} {sheetNumber((projectIndex + 1) % projects.length)} →</Link> : null}
        </nav>
      </main>
      <Footer />

      {lightbox !== null && images[lightbox] ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-cyanotype-deep p-6" role="dialog" aria-modal="true" aria-label={`Detail ${lightbox + 1}`}>
          <img src={images[lightbox]} alt={`${project.title} — detail ${lightbox + 1}`} width="1600" height="1200" className="max-h-[88dvh] max-w-full object-contain" />
          <button type="button" aria-label="Close gallery" onClick={() => setLightbox(null)} className="label absolute right-4 top-4 min-h-11 border border-rule-on-dark px-4 text-chalk">Close</button>
          <button type="button" aria-label="Previous photo" onClick={() => setLightbox((index) => (index === null ? index : (index - 1 + images.length) % images.length))} className="label absolute left-4 min-h-11 min-w-11 border border-rule-on-dark text-chalk">←</button>
          <button type="button" aria-label="Next photo" onClick={() => setLightbox((index) => (index === null ? index : (index + 1) % images.length))} className="label absolute right-4 min-h-11 min-w-11 border border-rule-on-dark text-chalk">→</button>
        </div>
      ) : null}
    </div>
  );
}

function TitleCell({ label, children }: { label: string; children: string }) {
  return <div className="col-span-12 border border-rule-on-dark p-4 first:border-b-0 md:col-span-4 md:first:border-b md:not-first:border-l-0"><p className="label text-blueline-on-dark">{label}</p><p className="mt-2 text-sm text-chalk">{children}</p></div>;
}