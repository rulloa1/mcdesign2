import { useRef, useState } from "react";

import { saveAlbum, uploadAlbumPhoto } from "@/lib/project-albums";

type Props = {
  projectId: string;
  title: string;
  images: string[];
  onDone: (saved: boolean) => void;
};

export function AlbumEditor({ projectId, title, images, onDone }: Props) {
  const [list, setList] = useState(images);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dropActive, setDropActive] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  const move = (from: number, to: number) => {
    if (to < 0 || to >= list.length || from === to) return;
    setList((l) => {
      const next = [...l];
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item);
      return next;
    });
  };

  const addFiles = async (files: FileList | File[]) => {
    const imgs = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (!imgs.length) return;
    setError(null);
    try {
      for (let i = 0; i < imgs.length; i++) {
        setBusy(`Uploading ${i + 1} of ${imgs.length}…`);
        const url = await uploadAlbumPhoto(projectId, imgs[i]);
        setList((l) => [...l, url]);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setBusy(null);
    }
  };

  const save = async () => {
    setBusy("Saving…");
    setError(null);
    try {
      await saveAlbum(projectId, list);
      onDone(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save.");
      setBusy(null);
    }
  };

  return (
    <div>
      <div
        onDragOver={(e) => {
          if (dragIndex === null && e.dataTransfer.types.includes("Files")) {
            e.preventDefault();
            setDropActive(true);
          }
        }}
        onDragLeave={() => setDropActive(false)}
        onDrop={(e) => {
          if (dragIndex !== null || !e.dataTransfer.files.length) return;
          e.preventDefault();
          setDropActive(false);
          void addFiles(e.dataTransfer.files);
        }}
        onClick={() => fileInput.current?.click()}
        className={`mb-8 cursor-pointer border border-dashed px-6 py-10 text-center transition-colors ${
          dropActive ? "border-brass bg-brass/10" : "border-carbon/25 hover:border-carbon/50"
        }`}
      >
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-carbon/60">
          {busy ?? "Drop photos here or click to add"}
        </p>
        <input
          ref={fileInput}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => {
            if (e.target.files) void addFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      <p className="mb-4 text-sm font-light text-carbon/50">Drag photos to reorder. The first photo appears first.</p>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {list.map((src, i) => (
          <div
            key={src}
            draggable
            onDragStart={() => setDragIndex(i)}
            onDragEnd={() => setDragIndex(null)}
            onDragOver={(e) => {
              e.preventDefault();
              if (dragIndex !== null && dragIndex !== i) {
                move(dragIndex, i);
                setDragIndex(i);
              }
            }}
            className={`group relative aspect-[4/3] cursor-grab overflow-hidden bg-brass/5 ${
              dragIndex === i ? "opacity-40" : ""
            }`}
          >
            <img src={src} alt={`${title} — photo ${i + 1}`} className="h-full w-full object-cover" draggable={false} />
            <span className="absolute left-2 top-2 bg-carbon/80 px-2 py-0.5 font-mono text-[0.6rem] text-bone">{i + 1}</span>
            <div className="absolute bottom-2 right-2 flex gap-1">
              <button type="button" aria-label="Move earlier" onClick={() => move(i, i - 1)} className="bg-carbon/80 px-2 py-1 text-xs text-bone">←</button>
              <button type="button" aria-label="Move later" onClick={() => move(i, i + 1)} className="bg-carbon/80 px-2 py-1 text-xs text-bone">→</button>
              <button
                type="button"
                aria-label="Delete photo"
                onClick={() => {
                  if (confirm("Remove this photo from the album?")) setList((l) => l.filter((_, j) => j !== i));
                }}
                className="bg-destructive px-2 py-1 text-xs text-destructive-foreground"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {error ? <p className="mt-6 text-sm text-destructive">{error}</p> : null}

      <div className="mt-10 flex gap-4">
        <button
          type="button"
          disabled={!!busy}
          onClick={save}
          className="border border-carbon bg-carbon px-8 py-3 text-xs uppercase tracking-[0.22em] text-bone disabled:opacity-50"
        >
          Save Album
        </button>
        <button
          type="button"
          disabled={!!busy}
          onClick={() => onDone(false)}
          className="border border-carbon/25 px-8 py-3 text-xs uppercase tracking-[0.22em] disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
