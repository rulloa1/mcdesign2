import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { Footer } from "@/components/site/Footer";
import { Nav } from "@/components/site/Nav";
import { ProjectCard } from "@/components/site/ProjectCard";
import { categoryLabels, projects, type Category } from "@/data/projects";
import { projectSlotKey } from "@/data/media-slots";
import { useReveal } from "@/hooks/use-reveal";
import { useOrderedProjects } from "@/lib/project-order";
import { absoluteImage, DEFAULT_SHARE_IMAGE, SITE_ORIGIN } from "@/lib/seo";
import { useSiteMedia } from "@/lib/site-media";

const TITLE = `Portfolio — ${projects.length} Projects | Michael Chandler, McDesign`;
const DESCRIPTION =
  "Residential, resort, hospitality, civil, and owner's representation work across six regions.";
const URL = `${SITE_ORIGIN}/portfolio`;

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:image", content: absoluteImage(DEFAULT_SHARE_IMAGE) },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: absoluteImage(DEFAULT_SHARE_IMAGE) },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: Portfolio,
});

const filters: (Category | "all")[] = [
  "all",
  "owners-representation",
  "residential-construction",
  "design-build",
  "hospitality",
  "civil",
  "development",
  "commercial",
  "estate-management",
];

function Portfolio() {
  const [active, setActive] = useState<Category | "all">("all");
  const media = useSiteMedia();
  const ordered = useOrderedProjects();
  const shown = active === "all" ? ordered : ordered.filter((project) => project.categories.includes(active));
  useReveal();

  return (
    <div className="bg-mylar text-ink">
      <Nav />
      <header className="sheet-grid border-b border-rule-on-dark bg-cyanotype pt-16 text-chalk">
        <div className="page-grid py-20 md:py-28">
          <div className="col-span-12 lg:col-span-9">
            <p className="label text-blueline-on-dark">G-100 · Project index</p>
            <h1 className="display h1-size mt-6">{projects.length} projects.</h1>
            <p className="mt-6 max-w-3xl text-chalk-muted">{DESCRIPTION}</p>
          </div>
        </div>
      </header>

      <main id="main" className="page-grid py-16 md:py-24">
        <div className="col-span-12 mb-14 flex flex-wrap gap-2" aria-label="Filter projects">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              aria-pressed={active === filter}
              onClick={() => setActive(filter)}
              className={`label min-h-11 border px-4 ${
                active === filter
                  ? "border-ink bg-ink text-mylar"
                  : "border-rule bg-mylar text-ink hover:border-blueline hover:text-blueline"
              }`}
            >
              {categoryLabels[filter]}
            </button>
          ))}
        </div>

        <div className="col-span-12 grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              image={media(projectSlotKey(project.id), project.cover)}
              detail={`${index + 1} / G-100`}
              revealIndex={index % 3}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}