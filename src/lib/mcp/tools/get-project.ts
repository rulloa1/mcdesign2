import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { projects } from "@/data/projects";
import { projectAlbums } from "@/data/albums";

export default defineTool({
  name: "get_project",
  title: "Get project details",
  description:
    "Get the full published details of one portfolio project by id, including its narrative description and photo gallery paths.",
  inputSchema: {
    id: z
      .string()
      .min(1)
      .describe("Project id, e.g. 'miami-beach' (use list_projects to discover ids)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ id }) => {
    const project = projects.find((candidate) => candidate.id === id);
    if (!project) {
      throw new ToolError(`No project with id "${id}". Use list_projects to see available ids.`);
    }
    const album = projectAlbums[project.id];
    const detail = {
      id: project.id,
      title: project.title,
      subtitle: project.subtitle,
      location: project.location,
      specs: project.specs,
      role: project.role,
      categories: project.categories.map((category) => String(category)),
      description: album?.description ?? "",
      images: album?.images ? [...album.images] : [],
    };

    return {
      content: [
        {
          type: "text" as const,
          text: [
            `${detail.title} (${detail.subtitle})`,
            `Location: ${detail.location}`,
            `Specs: ${detail.specs}`,
            `Role: ${detail.role}`,
            detail.description ? `\n${detail.description}` : "",
            `\nPhotos: ${detail.images.length}`,
          ]
            .filter(Boolean)
            .join("\n"),
        },
      ],
      structuredContent: { project: detail },
    };
  },
});
