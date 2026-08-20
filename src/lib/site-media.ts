import { useQuery } from "@tanstack/react-query";

import { supabase } from "@/integrations/supabase/client";

export const SITE_MEDIA_BUCKET = "site-media";
const SIGNED_URL_TTL = 60 * 60 * 24 * 365 * 5;

export type MediaMap = Record<string, string>;

export const siteMediaQuery = {
  queryKey: ["site-media"] as const,
  queryFn: async (): Promise<MediaMap> => {
    const { data, error } = await supabase.from("site_media").select("slot,url");
    if (error) throw error;
    return Object.fromEntries((data ?? []).map((row) => [row.slot, row.url]));
  },
  staleTime: 60_000,
};

/** Returns a resolver: media("hero", bundledHero) -> uploaded override or the bundled asset. */
export function useSiteMedia() {
  const { data } = useQuery(siteMediaQuery);
  return (slot: string, fallback: string) => data?.[slot] ?? fallback;
}

export async function uploadSiteMedia(slot: string, file: File) {
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${slot}/${Date.now()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from(SITE_MEDIA_BUCKET)
    .upload(path, file, { cacheControl: "31536000", upsert: true });
  if (uploadError) throw uploadError;

  const { data: signed, error: signError } = await supabase.storage
    .from(SITE_MEDIA_BUCKET)
    .createSignedUrl(path, SIGNED_URL_TTL);
  if (signError || !signed?.signedUrl) throw signError ?? new Error("Could not create image link");

  const { error: dbError } = await supabase
    .from("site_media")
    .upsert({ slot, url: signed.signedUrl, updated_at: new Date().toISOString() }, { onConflict: "slot" });
  if (dbError) throw dbError;

  return signed.signedUrl;
}

export async function resetSiteMedia(slot: string) {
  const { error } = await supabase.from("site_media").delete().eq("slot", slot);
  if (error) throw error;
}
