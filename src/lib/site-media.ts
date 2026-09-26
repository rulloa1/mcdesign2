import { useQuery } from "@tanstack/react-query";

import { supabase } from "@/integrations/supabase/client";
import { compressImage } from "@/lib/compress-image";

export const SITE_MEDIA_BUCKET = "site-media";

export type MediaMap = Record<string, string>;

export type MediaLogEntry = {
  id: string;
  slot: string;
  action: string;
  previous_url: string | null;
  new_url: string | null;
  actor_email: string | null;
  created_at: string;
};

export const mediaLogQuery = {
  queryKey: ["site-media-log"] as const,
  queryFn: async (): Promise<MediaLogEntry[]> => {
    const { data, error } = await supabase
      .from("site_media_log")
      .select("id,slot,action,previous_url,new_url,actor_email,created_at")
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) throw error;
    return (data ?? []) as MediaLogEntry[];
  },
};

async function currentUrl(slot: string) {
  const { data } = await supabase.from("site_media").select("url").eq("slot", slot).maybeSingle();
  return data?.url ?? null;
}

async function logChange(entry: {
  slot: string;
  action: "upload" | "reset" | "revert";
  previous_url: string | null;
  new_url: string | null;
}) {
  const { data } = await supabase.auth.getUser();
  const user = data.user;
  if (!user) {
    throw new Error("Image saved, but you appear to be signed out so the change was not logged.");
  }
  const { error } = await supabase.from("site_media_log").insert({
    ...entry,
    actor_id: user.id,
    actor_email: user.email ?? null,
  });
  if (error) throw new Error("Image saved, but the change could not be recorded in the audit log.");
}

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
  const image = await compressImage(file);
  const previous = await currentUrl(slot);
  const path = `${slot}/${Date.now()}.webp`;

  const { error: uploadError } = await supabase.storage
    .from(SITE_MEDIA_BUCKET)
    .upload(path, image, { cacheControl: "31536000", contentType: "image/webp" });
  if (uploadError) throw uploadError;

  // The bucket is public, so this link never expires (signed links did).
  const url = supabase.storage.from(SITE_MEDIA_BUCKET).getPublicUrl(path).data.publicUrl;

  const { error: dbError } = await supabase
    .from("site_media")
    .upsert({ slot, url, updated_at: new Date().toISOString() }, { onConflict: "slot" });
  if (dbError) {
    // Don't leave an unreferenced file behind.
    await supabase.storage.from(SITE_MEDIA_BUCKET).remove([path]);
    throw dbError;
  }

  await logChange({ slot, action: "upload", previous_url: previous, new_url: url });

  return url;
}

export async function resetSiteMedia(slot: string) {
  const previous = await currentUrl(slot);
  const { error } = await supabase.from("site_media").delete().eq("slot", slot);
  if (error) throw error;
  await logChange({ slot, action: "reset", previous_url: previous, new_url: null });
}

/**
 * Undo the most recent change that hasn't already been undone. Each revert
 * steps one change further back, rather than toggling between two images.
 */
export async function revertSiteMedia(slot: string) {
  const { data, error } = await supabase
    .from("site_media_log")
    .select("action,previous_url")
    .eq("slot", slot)
    .order("created_at", { ascending: false })
    .limit(200);
  if (error) throw error;

  let undone = 0;
  const change = (data ?? []).find((entry) => {
    if (entry.action === "revert") {
      undone += 1;
      return false;
    }
    if (undone > 0) {
      undone -= 1;
      return false;
    }
    return true;
  });
  if (!change) throw new Error("There are no earlier changes to revert.");

  const target = change.previous_url;
  const current = await currentUrl(slot);

  if (!target) {
    const { error: delError } = await supabase.from("site_media").delete().eq("slot", slot);
    if (delError) throw delError;
  } else {
    const { error: upError } = await supabase
      .from("site_media")
      .upsert({ slot, url: target, updated_at: new Date().toISOString() }, { onConflict: "slot" });
    if (upError) throw upError;
  }

  await logChange({ slot, action: "revert", previous_url: current, new_url: target });
  return target;
}
