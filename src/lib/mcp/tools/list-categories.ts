import { defineTool } from "@lovable.dev/mcp-js";
import { projects, categoryLabels, type Category } from "@/data/projects";

export default defineTool({
  name: "list_categories",
  title: "List project categories",
  description: "List the portfolio's project categories with their labels and project counts.",
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const categories = (Object.keys(categoryLabels) as (Category | "all")[])
      .filter((key) => key !== "all")
      .map((key) => ({
        id: String(key),
        label: categoryLabels[key],
        count: projects.filter((project) => project.categories.includes(key as Category)).length,
      }));

    return {
      content: [
        {
          type: "text" as const,
          text: categories.map((c) => `${c.label} (${c.id}): ${c.count}`).join("\n"),
        },
      ],
      structuredContent: { categories },
    };
  },
});
