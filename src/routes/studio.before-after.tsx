import { createFileRoute, Link } from "@tanstack/react-router";

import { Nav } from "@/components/site/Nav";
import { projects } from "@/data/projects";
import { projectAlbums } from "@/data/albums";
import { enhancedOriginals } from "@/data/enhanced";
import { BeforeAfter } from "@/components/site/BeforeAfter";

export const Route = createFileRoute("/studio/before-after")({
  head: () => ({
    meta: [
      { title: "Before & After — Photo Enhancements | MC Design Build" },
      { name: "description", content: "Side-by-side comparison of every enhanced album photo." },
      { property: "og:title", content: "Before & After — Photo Enhancements" },
      { property: "og:description", content: "Every album photo, original versus enhanced." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: BeforeAfterGallery,
});

const enhancedPath = (src: string) =>
  src.replace(/^\/projects\/assets\/(.+)\.\w+$/, "/projects/assets/enh/$1.webp");

function BeforeAfterGallery() {
  const done = new Set(enhancedOriginals);
  const groups = projects
    .map((p) => ({
      project: p,
      images: (projectAlbums[p.id]?.images ?? []).filter((src) => done.has(src)),
    }))
    .filter((g) => g.images.length);
  const total = groups.reduce((n, g) => n + g.images.length, 0);

  return (
    <div className="relative z-10 min-h-screen bg-bone">
      <Nav />
      <main className="mx-auto max-w-[1600px] px-6 pt-40 pb-32 md:px-12">
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-brass-dark">
          Studio
        </p>
        <h1 className="mt-3 font-serif text-4xl md:text-5xl">Before &amp; After</h1>
        <p className="mt-4 text-sm font-light text-carbon/60">
          {total} enhanced photos. Drag the slider on each photo to compare.
        </p>

        {groups.map(({ project, images }) => (
          <section key={project.id} className="mt-20">
            <div className="mb-8 flex items-baseline justify-between border-b border-carbon/10 pb-4">
              <h2 className="font-serif text-2xl md:text-3xl">{project.title}</h2>
              <Link
                to="/projects/$projectId"
                params={{ projectId: project.id }}
                className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-carbon/50 hover:text-carbon"
              >
                {images.length} photos · Open album
              </Link>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {images.map((src) => (
                <BeforeAfter
                  key={src}
                  before={{ src, alt: `${project.title} — original` }}
                  after={{ src: enhancedPath(src), alt: `${project.title} — enhanced` }}
                />
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
