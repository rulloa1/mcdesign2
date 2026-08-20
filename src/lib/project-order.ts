import { useQuery } from "@tanstack/react-query";

import { supabase } from "@/integrations/supabase/client";
import { projects, type Project } from "@/data/projects";

export const projectOrderQuery = {
  queryKey: ["project-order"] as const,
  queryFn: async (): Promise<Record<string, number>> => {
    const { data, error } = await supabase.from("project_order").select("project_id,position");
    if (error) throw error;
    return Object.fromEntries((data ?? []).map((row) => [row.project_id, row.position]));
  },
  staleTime: 60_000,
};

export function sortProjects(order: Record<string, number> | undefined): Project[] {
  if (!order) return projects;
  return [...projects].sort((a, b) => {
    const pa = order[a.id] ?? projects.indexOf(a);
    const pb = order[b.id] ?? projects.indexOf(b);
    return pa - pb;
  });
}

/** Projects in the admin-defined portfolio order (falls back to the built-in order). */
export function useOrderedProjects(): Project[] {
  const { data } = useQuery(projectOrderQuery);
  return sortProjects(data);
}

export async function saveProjectOrder(ids: string[]) {
  const rows = ids.map((project_id, index) => ({
    project_id,
    position: index,
    updated_at: new Date().toISOString(),
  }));
  const { error } = await supabase.from("project_order").upsert(rows, { onConflict: "project_id" });
  if (error) throw error;
}
