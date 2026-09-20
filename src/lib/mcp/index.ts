import { defineMcp } from "@lovable.dev/mcp-js";
import listProjectsTool from "./tools/list-projects";
import getProjectTool from "./tools/get-project";
import listCategoriesTool from "./tools/list-categories";

export default defineMcp({
  name: "vivid-backgrounds",
  title: "Vivid Backgrounds",
  version: "0.1.0",
  instructions:
    "Read-only tools for the published portfolio of Michael Chandler / MC Design Build. Use `list_categories` to see project categories, `list_projects` to browse or filter projects, and `get_project` for one project's full details, description and photo gallery.",
  tools: [listCategoriesTool, listProjectsTool, getProjectTool],
});
