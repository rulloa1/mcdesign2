import { useQuery } from "@tanstack/react-query";

import { supabase } from "@/integrations/supabase/client";

export const SITE_MEDIA_BUCKET = "site-media";
const SIGNED_URL_TTL = 60 * 60 * 24 * 365 * 5;

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
  if (!user) return;
  await supabase.from("site_media_log").insert({
    ...entry,
    actor_id: user.id,
    actor_email: user.email ?? null,
  });
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
  const previous = await currentUrl(slot);
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

  await logChange({ slot, action: "upload", previous_url: previous, new_url: signed.signedUrl });

  return signed.signedUrl;
}

export async function resetSiteMedia(slot: string) {
  const previous = await currentUrl(slot);
  const { error } = await supabase.from("site_media").delete().eq("slot", slot);
  if (error) throw error;
  await logChange({ slot, action: "reset", previous_url: previous, new_url: null });
}

/** Restore the image this slot had before the most recent change. */
export async function revertSiteMedia(slot: string) {
  const { data, error } = await supabase
    .from("site_media_log")
    .select("previous_url")
    .eq("slot", slot)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) throw error;

  const target = data?.previous_url ?? null;
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
