import { useState } from "react";

import { mediaSlots } from "@/data/media-slots";
import { matchSlotForFilename } from "@/lib/media-match";
import { uploadSiteMedia } from "@/lib/site-media";

type Item = {
  id: string;
  file: File;
  slot: string;
  status: "pending" | "uploading" | "done" | "error";
  error?: string;
};

export function BulkUpload({ canEdit, onDone }: { canEdit: boolean; onDone: () => void }) {
  const [items, setItems] = useState<Item[]>([]);
  const [busy, setBusy] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const addFiles = (files: FileList | File[] | null) => {
    const incoming = Array.from(files ?? []).filter((f) => f.type.startsWith("image/"));
    if (!incoming.length) return;
    setItems((prev) => [
      ...prev,
      ...incoming.map((file, i) => ({
        id: `${file.name}-${Date.now()}-${i}`,
        file,
        slot: matchSlotForFilename(file.name, mediaSlots)?.slot ?? "",
        status: "pending" as const,
      })),
    ]);
  };

  const uploadAll = async () => {
    setBusy(true);
    for (const item of items) {
      if (item.status === "done" || !item.slot) continue;
      setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, status: "uploading" } : i)));
      try {
        await uploadSiteMedia(item.slot, item.file);
        setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, status: "done" } : i)));
      } catch (err) {
        const message = err instanceof Error ? err.message : "Upload failed.";
        setItems((prev) =>
          prev.map((i) => (i.id === item.id ? { ...i, status: "error", error: message } : i)),
        );
      }
    }
    setBusy(false);
    onDone();
  };

  const matched = items.filter((i) => i.slot && i.status !== "done").length;
  const unmatched = items.filter((i) => !i.slot).length;

  return (
    <section className="mb-16">
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="font-mono text-[0.65rem] uppercase tracking-[0.24em] text-bone/40">
          Bulk Upload
        </h2>
        {items.length > 0 && (
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-bone/35">
            {matched} ready · {unmatched} need a slot
          </p>
        )}
      </div>

      <label
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          if (canEdit) addFiles(e.dataTransfer.files);
        }}
        className={`block cursor-pointer border border-dashed p-8 text-center transition-colors duration-300 ${
          dragActive ? "border-brass bg-brass/5" : "border-bone/20"
        } ${!canEdit ? "pointer-events-none opacity-40" : ""}`}
      >
        <p className="font-serif text-lg">Drop images here, or click to choose files</p>
        <p className="mt-2 text-sm text-bone/50">
          Filenames are matched to slots automatically (e.g.{" "}
          <span className="font-mono">miami-beach.webp</span> → S. Florida Condo). Anything
          unmatched can be assigned below.
        </p>
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          disabled={!canEdit}
          onChange={(e) => {
            addFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </label>

      {items.length > 0 && (
        <div className="mt-6 space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-wrap items-center gap-4 border border-bone/10 p-3"
              style={{ background: "rgb(201 169 97 / 0.03)" }}
            >
              <img
                src={URL.createObjectURL(item.file)}
                alt={item.file.name}
                className="h-14 w-20 flex-none object-cover"
              />
              <div className="min-w-[8rem] flex-1">
                <p className="truncate text-sm">{item.file.name}</p>
                <p className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-bone/35">
                  {item.status === "done"
                    ? "Uploaded"
                    : item.status === "uploading"
                      ? "Uploading…"
                      : item.status === "error"
                        ? (item.error ?? "Failed")
                        : item.slot
                          ? "Matched"
                          : "No match"}
                </p>
              </div>
              <select
                value={item.slot}
                disabled={!canEdit || busy || item.status === "done"}
                onChange={(e) =>
                  setItems((prev) =>
                    prev.map((i) => (i.id === item.id ? { ...i, slot: e.target.value } : i)),
                  )
                }
                className="max-w-[14rem] flex-none border border-bone/15 bg-carbon px-3 py-2 text-xs text-bone outline-none focus:border-brass"
              >
                <option value="">Choose a slot…</option>
                {mediaSlots.map((s) => (
                  <option key={s.slot} value={s.slot}>
                    {s.label}
                  </option>
                ))}
              </select>
              <button
                type="button"
                disabled={busy}
                onClick={() => setItems((prev) => prev.filter((i) => i.id !== item.id))}
                className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-bone/40 hover:text-brass"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              type="button"
              disabled={!canEdit || busy || matched === 0}
              onClick={() => void uploadAll()}
              className="border border-brass/40 px-5 py-2 font-mono text-[0.6rem] uppercase tracking-[0.2em] transition-colors duration-500 hover:bg-brass hover:text-carbon disabled:opacity-40"
            >
              {busy ? "Uploading…" : `Upload ${matched} image${matched === 1 ? "" : "s"}`}
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => setItems([])}
              className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-bone/45 hover:text-brass"
            >
              Clear list
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
