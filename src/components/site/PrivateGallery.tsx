import { useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { supabase } from "@/integrations/supabase/client";
import { compressImage } from "@/lib/compress-image";
import { SITE_MEDIA_BUCKET } from "@/lib/site-media";

type Item = {
  id: string;
  storage_path: string;
  kind: string;
  caption: string;
  taken_on: string | null;
  url: string;
};

export const galleryQuery = (projectId: string) => ({
  queryKey: ["private-gallery", projectId] as const,
  queryFn: async (): Promise<Item[]> => {
    const { data, error } = await supabase
      .from("project_gallery")
      .select("id,storage_path,kind,caption,taken_on")
      .eq("project_id", projectId)
      .order("taken_on", { ascending: false, nullsFirst: false })
      .order("created_at", { ascending: false });
    if (error) throw error;
    if (!data?.length) return [];
    const { data: signed } = await supabase.storage
      .from(SITE_MEDIA_BUCKET)
      .createSignedUrls(
        data.map((d) => d.storage_path),
        3600,
      );
    return data.map((d, i) => ({ ...d, url: signed?.[i]?.signedUrl ?? "" }));
  },
  staleTime: 30 * 60_000,
});

export function PrivateGallery({ projectId }: { projectId: string }) {
  const qc = useQueryClient();
  const { data: items = [] } = useQuery(galleryQuery(projectId));
  const fileInput = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [caption, setCaption] = useState("");
  const [date, setDate] = useState("");
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [editCaption, setEditCaption] = useState("");
  const [editDate, setEditDate] = useState("");

  const refresh = () => qc.invalidateQueries({ queryKey: ["private-gallery", projectId] });

  const upload = async () => {
    if (!files.length) return;
    setError(null);
    try {
      for (let i = 0; i < files.length; i++) {
        setBusy(`Uploading ${i + 1} of ${files.length}…`);
        const f = files[i]!;
        const isVideo = f.type.startsWith("video/");
        const body: Blob = isVideo ? f : await compressImage(f);
        const ext = isVideo ? (f.name.split(".").pop() ?? "mp4") : "webp";
        const path = `private-gallery/${projectId}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
        const { error: upErr } = await supabase.storage
          .from(SITE_MEDIA_BUCKET)
          .upload(path, body, { contentType: isVideo ? f.type : "image/webp" });
        if (upErr) throw upErr;
        const { error: dbErr } = await supabase.from("project_gallery").insert({
          project_id: projectId,
          storage_path: path,
          kind: isVideo ? "video" : "image",
          caption: caption.trim(),
          taken_on: date || null,
        });
        if (dbErr) throw dbErr;
      }
      setFiles([]);
      setCaption("");
      setDate("");
      await refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setBusy(null);
    }
  };

  const saveEdit = async (id: string) => {
    const { error } = await supabase
      .from("project_gallery")
      .update({ caption: editCaption.trim(), taken_on: editDate || null })
      .eq("id", id);
    if (error) return setError(error.message);
    setEditId(null);
    await refresh();
  };

  const remove = async (item: Item) => {
    if (!confirm("Delete this item from your gallery?")) return;
    await supabase.storage.from(SITE_MEDIA_BUCKET).remove([item.storage_path]);
    const { error } = await supabase.from("project_gallery").delete().eq("id", item.id);
    if (error) return setError(error.message);
    await refresh();
  };

  const input =
    "border border-carbon/25 bg-transparent px-3 py-2 text-sm font-light focus:border-brass focus:outline-none";

  return (
    <section className="pt-20">
      <div className="mb-8 flex items-baseline justify-between">
        <h2 className="font-serif text-3xl">My Gallery</h2>
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-carbon/40">
          Private · only you can see this
        </p>
      </div>

      <div className="mb-10 grid gap-4 border border-carbon/10 p-6 md:grid-cols-[1fr_1fr_auto_auto]">
        <button
          type="button"
          onClick={() => fileInput.current?.click()}
          className="border border-dashed border-carbon/30 px-4 py-2 text-left text-sm font-light text-carbon/70 hover:border-carbon/60"
        >
          {files.length ? `${files.length} file(s) selected` : "Choose photos or videos"}
        </button>
        <input
          ref={fileInput}
          type="file"
          accept="image/*,video/*"
          multiple
          hidden
          onChange={(e) => {
            setFiles(Array.from(e.target.files ?? []));
            e.target.value = "";
          }}
        />
        <input
          className={input}
          placeholder="Caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <input
          className={input}
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button
          type="button"
          disabled={!files.length || !!busy}
          onClick={upload}
          className="bg-carbon px-6 py-2 text-xs uppercase tracking-[0.22em] text-bone disabled:opacity-40"
        >
          {busy ?? "Upload"}
        </button>
      </div>

      {error ? <p className="mb-6 text-sm text-destructive">{error}</p> : null}

      {items.length === 0 ? (
        <p className="text-sm font-light text-carbon/50">Nothing uploaded yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <figure key={item.id} className="border border-carbon/10">
              <div className="aspect-[4/3] overflow-hidden bg-carbon/5">
                {item.kind === "video" ? (
                  <video src={item.url} controls playsInline className="h-full w-full object-cover" />
                ) : (
                  <img src={item.url} alt={item.caption || "Gallery photo"} loading="lazy" className="h-full w-full object-cover" />
                )}
              </div>
              <figcaption className="p-4">
                {editId === item.id ? (
                  <div className="grid gap-2">
                    <input className={input} value={editCaption} onChange={(e) => setEditCaption(e.target.value)} placeholder="Caption" />
                    <input className={input} type="date" value={editDate} onChange={(e) => setEditDate(e.target.value)} />
                    <div className="flex gap-2">
                      <button type="button" onClick={() => void saveEdit(item.id)} className="bg-carbon px-4 py-1.5 text-[0.65rem] uppercase tracking-[0.2em] text-bone">Save</button>
                      <button type="button" onClick={() => setEditId(null)} className="border border-carbon/25 px-4 py-1.5 text-[0.65rem] uppercase tracking-[0.2em]">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-brass-dark">
                      {item.taken_on
                        ? new Date(item.taken_on + "T00:00:00").toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })
                        : "No date"}
                    </p>
                    <p className="mt-2 text-sm font-light text-carbon/80">{item.caption || "—"}</p>
                    <div className="mt-3 flex gap-4 text-[0.65rem] uppercase tracking-[0.2em]">
                      <button type="button" onClick={() => { setEditId(item.id); setEditCaption(item.caption); setEditDate(item.taken_on ?? ""); }} className="text-carbon/60 hover:text-carbon">Edit</button>
                      <button type="button" onClick={() => void remove(item)} className="text-destructive">Delete</button>
                    </div>
                  </>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </section>
  );
}
