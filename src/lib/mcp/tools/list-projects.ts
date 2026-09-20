import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { projects, categoryLabels, type Category } from "@/data/projects";

const categoryIds = Object.keys(categoryLabels).filter((key) => key !== "all") as Category[];

const toSummary = (project: (typeof projects)[number]) => ({
  id: project.id,
  title: project.title,
  subtitle: project.subtitle,
  location: project.location,
  specs: project.specs,
  role: project.role,
  categories: project.categories.map((category) => String(category)),
});

export default defineTool({
  name: "list_projects",
  title: "List projects",
  description:
    "List the published portfolio projects of Michael Chandler / MC Design Build, optionally filtered by category. Returns id, title, location, specs and roles.",
  inputSchema: {
    category: z
      .string()
      .optional()
      .describe(`Optional category filter. One of: ${categoryIds.join(", ")}`),
    search: z.string().optional().describe("Optional free-text match on title, subtitle or location."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ category, search }) => {
    const term = search?.trim().toLowerCase();
    const filtered = projects.filter((project) => {
      const byCategory = category ? project.categories.includes(category as Category) : true;
      const byTerm = term
        ? `${project.title} ${project.subtitle} ${project.location}`.toLowerCase().includes(term)
        : true;
      return byCategory && byTerm;
    });

    const items = filtered.map(toSummary);
    return {
      content: [
        {
          type: "text" as const,
          text:
            items.length === 0
              ? "No projects matched that filter."
              : items.map((p) => `${p.title} — ${p.location} (${p.id})`).join("\n"),
        },
      ],
      structuredContent: { count: items.length, projects: items },
    };
  },
});
