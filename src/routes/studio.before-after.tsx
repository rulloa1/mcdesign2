import { createFileRoute, Link } from "@tanstack/react-router";

import { Nav } from "@/components/site/Nav";
import { projects } from "@/data/projects";
import { enhancedByProject } from "@/data/enhanced";

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

function PhotoPair({
  src,
  projectTitle,
}: {
  src: string;
  projectTitle: string;
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <figure className="relative overflow-hidden bg-carbon">
        <img
          src={src}
          alt={`${projectTitle} — original`}
          loading="lazy"
          draggable={false}
          className="aspect-[4/3] h-auto w-full object-cover"
        />
        <span className="absolute bottom-2 left-2 bg-carbon/70 px-2 py-1 font-mono text-[0.55rem] uppercase tracking-[0.22em] text-bone backdrop-blur-sm">
          Before
        </span>
      </figure>
      <figure className="relative overflow-hidden bg-carbon">
        <img
          src={enhancedPath(src)}
          alt={`${projectTitle} — enhanced`}
          loading="lazy"
          draggable={false}
          className="aspect-[4/3] h-auto w-full object-cover"
        />
        <span className="absolute bottom-2 left-2 bg-brass/90 px-2 py-1 font-mono text-[0.55rem] uppercase tracking-[0.22em] text-carbon">
          After
        </span>
      </figure>
    </div>
  );
}

function BeforeAfterGallery() {
  const groups = projects
    .map((p) => ({ project: p, images: enhancedByProject[p.id] ?? [] }))
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
          {total} enhanced photos. Original on the left, enhanced on the right.
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
                <PhotoPair key={src} src={src} projectTitle={project.title} />
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
