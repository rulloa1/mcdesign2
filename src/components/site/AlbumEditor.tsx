import { useRef, useState } from "react";

import { useServerFn } from "@tanstack/react-start";

import { saveAlbum, uploadAlbumPhoto } from "@/lib/project-albums";
import { enhancePhoto } from "@/lib/photo-enhance.functions";

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
  const enhanceFn = useServerFn(enhancePhoto);
  const [working, setWorking] = useState<string | null>(null);

  const enhance = async (src: string, mode: "enhance" | "straighten") => {
    setWorking(src);
    setError(null);
    try {
      const { b64 } = await enhanceFn({
        data: { url: new URL(src, window.location.origin).href, mode },
      });
      const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
      const file = new File([bytes], "enhanced.png", { type: "image/png" });
      const url = await uploadAlbumPhoto(projectId, file);
      setList((l) => l.map((u) => (u === src ? url : u)));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Enhancement failed.");
    } finally {
      setWorking(null);
    }
  };

  const rotate = async (src: string) => {
    setWorking(src);
    setError(null);
    try {
      const img = await new Promise<HTMLImageElement>((resolve, reject) => {
        const el = new Image();
        el.crossOrigin = "anonymous";
        el.onload = () => resolve(el);
        el.onerror = () => reject(new Error("Could not load the photo."));
        el.src = src;
      });
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalHeight;
      canvas.height = img.naturalWidth;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Rotation is not supported in this browser.");
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(Math.PI / 2);
      ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);
      const blob = await new Promise<Blob | null>((r) =>
        canvas.toBlob(r, "image/jpeg", 0.92),
      );
      if (!blob) throw new Error("Could not rotate the photo.");
      const file = new File([blob], "rotated.jpg", { type: "image/jpeg" });
      const url = await uploadAlbumPhoto(projectId, file);
      setList((l) => l.map((u) => (u === src ? url : u)));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Rotation failed.");
    } finally {
      setWorking(null);
    }
  };

  const move = (from: number, to: number) => {
    if (to < 0 || to >= list.length || from === to) return;
    setList((l) => {
      const next = [...l];
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item!);
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
        const url = await uploadAlbumPhoto(projectId, imgs[i]!);
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

      <p className="mb-4 text-sm font-light text-carbon/50">
        Drag photos to reorder. The first photo appears first.
      </p>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {list.map((src, i) => (
          <div
            key={src}
            data-album-index={i}
            onPointerDown={(e) => {
              if ((e.target as HTMLElement).closest("button")) return;
              e.preventDefault();
              (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
              setDragIndex(i);
            }}
            onPointerMove={(e) => {
              if (dragIndex === null) return;
              const el = document
                .elementFromPoint(e.clientX, e.clientY)
                ?.closest("[data-album-index]") as HTMLElement | null;
              const over = el ? Number(el.dataset["albumIndex"]) : NaN;
              if (!Number.isNaN(over) && over !== dragIndex) {
                move(dragIndex, over);
                setDragIndex(over);
              }
            }}
            onPointerUp={() => setDragIndex(null)}
            onPointerCancel={() => setDragIndex(null)}
            style={{ touchAction: "none" }}
            className={`group relative aspect-[4/3] cursor-grab select-none overflow-hidden bg-brass/5 ${
              dragIndex === i ? "scale-95 opacity-50 ring-2 ring-brass" : ""
            }`}
          >
            <img
              src={src}
              alt={`${title} — photo ${i + 1}`}
              className="pointer-events-none h-full w-full object-cover"
              draggable={false}
            />
            <span className="absolute left-2 top-2 bg-carbon/80 px-2 py-0.5 font-mono text-[0.6rem] text-bone">
              {i + 1}
            </span>
            {working === src ? (
              <div className="absolute inset-0 flex items-center justify-center bg-carbon/60 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-bone">
                Working…
              </div>
            ) : null}
            <div className="absolute right-2 top-2 flex gap-1">
              <button
                type="button"
                disabled={!!working}
                onClick={() => void enhance(src, "enhance")}
                className="bg-brass px-2 py-1 text-[0.6rem] uppercase tracking-wider text-carbon disabled:opacity-50"
              >
                ✦ Enhance
              </button>
              <button
                type="button"
                disabled={!!working}
                onClick={() => void enhance(src, "straighten")}
                className="bg-carbon/80 px-2 py-1 text-[0.6rem] uppercase tracking-wider text-bone disabled:opacity-50"
              >
                Straighten
              </button>
              <button
                type="button"
                disabled={!!working}
                onClick={() => void rotate(src)}
                className="bg-carbon/80 px-2 py-1 text-[0.6rem] uppercase tracking-wider text-bone disabled:opacity-50"
              >
                ⟳ Rotate
              </button>
            </div>
            <div className="absolute bottom-2 right-2 flex gap-1">
              <button
                type="button"
                aria-label="Move earlier"
                onClick={() => move(i, i - 1)}
                className="bg-carbon/80 px-2 py-1 text-xs text-bone"
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Move later"
                onClick={() => move(i, i + 1)}
                className="bg-carbon/80 px-2 py-1 text-xs text-bone"
              >
                →
              </button>
              <button
                type="button"
                aria-label="Delete photo"
                onClick={() => {
                  if (confirm("Remove this photo from the album?"))
                    setList((l) => l.filter((_, j) => j !== i));
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
          disabled={!!busy || !!working}
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
