import type { CSSProperties } from "react";
import { Link } from "@tanstack/react-router";

import type { Project } from "@/data/projects";

export function ProjectCard({
  project,
  image,
  detail,
  revealIndex = 0,
}: {
  project: Project;
  image: string;
  detail: string;
  revealIndex?: number;
}) {
  return (
    <Link
      to="/projects/$projectId"
      params={{ projectId: project.id }}
      className="group block"
    >
      <p
        data-reveal="rise"
        style={{ "--i": revealIndex } as CSSProperties}
        className="label mb-3 text-blueline"
      >
        {detail}
      </p>
      <div className="aspect-[4/3] overflow-hidden border border-blueline group-hover:outline group-hover:outline-1 group-hover:-outline-offset-1 group-hover:outline-blueline">
        <img
          data-reveal="develop"
          style={{ "--i": revealIndex } as CSSProperties}
          src={image}
          alt={project.title}
          width="800"
          height="600"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>
      <div data-reveal="rise" style={{ "--i": revealIndex } as CSSProperties}>
        <h3 className="mt-5 text-[22px] font-semibold text-ink group-hover:underline">
          {project.title}
        </h3>
        <p className="text-graphite">{project.location}</p>
        <p className="label mt-3 text-blueline">
          {project.role.split(",").slice(0, 2).join(",")}
        </p>
        <p className="mt-2 text-graphite [font-variant-numeric:tabular-nums]">
          {project.specs}
        </p>
      </div>
    </Link>
  );
}