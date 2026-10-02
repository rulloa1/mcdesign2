import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listProjectsTool from "./tools/list-projects";
import getProjectTool from "./tools/get-project";
import listCategoriesTool from "./tools/list-categories";

// Public project URL (not a secret); env is unavailable at manifest-extraction time.
const supabaseUrl = "https://ujzjzuefemdabbczwrba.supabase.co";

export default defineMcp({
  name: "vivid-backgrounds",
  title: "Vivid Backgrounds",
  version: "0.1.0",
  instructions:
    "Read-only tools for the published portfolio of Michael Chandler / MC Design Build. Requires sign-in. Use `list_categories` to see project categories, `list_projects` to browse or filter projects, and `get_project` for one project's full details, description and photo gallery.",
  auth: auth.oauth.issuer({
    issuer: `${supabaseUrl}/auth/v1`,
    acceptedAudiences: "authenticated",
    jwksUri: `${supabaseUrl}/auth/v1/.well-known/jwks.json`,
  }),
  tools: [listCategoriesTool, listProjectsTool, getProjectTool],
});
