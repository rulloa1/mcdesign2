import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { supabase } from "@/integrations/supabase/client";
import { compressImage } from "@/lib/compress-image";
import { SITE_MEDIA_BUCKET } from "@/lib/site-media";

export const albumOverrideQuery = (projectId: string) => ({
  queryKey: ["project-album", projectId] as const,
  queryFn: async (): Promise<string[] | null> => {
    const { data, error } = await supabase
      .from("project_albums")
      .select("images")
      .eq("project_id", projectId)
      .maybeSingle();
    if (error) throw error;
    return data?.images ?? null;
  },
  staleTime: 60_000,
});

export async function saveAlbum(projectId: string, images: string[]) {
  const { error } = await supabase
    .from("project_albums")
    .upsert(
      { project_id: projectId, images, updated_at: new Date().toISOString() },
      { onConflict: "project_id" },
    );
  if (error) throw error;
}

export async function uploadAlbumPhoto(projectId: string, file: File) {
  const image = await compressImage(file);
  const path = `albums/${projectId}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.webp`;
  const { error } = await supabase.storage
    .from(SITE_MEDIA_BUCKET)
    .upload(path, image, { cacheControl: "31536000", contentType: "image/webp" });
  if (error) throw error;
  return supabase.storage.from(SITE_MEDIA_BUCKET).getPublicUrl(path).data.publicUrl;
}

/** True when the signed-in visitor is a site admin. */
export function useIsAdmin() {
  const [userId, setUserId] = useState<string | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setUserId(data.session?.user.id ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setUserId(s?.user.id ?? null));
    return () => sub.subscription.unsubscribe();
  }, []);
  const { data } = useQuery({
    queryKey: ["is-admin", userId],
    enabled: !!userId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId!)
        .eq("role", "admin")
        .maybeSingle();
      if (error) throw error;
      return !!data;
    },
  });
  return !!data;
}
