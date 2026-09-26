const MAX_EDGE = 2400;
const MAX_BYTES = 2 * 1024 * 1024;
const QUALITIES = [0.82, 0.72, 0.6];

function toBlob(canvas: HTMLCanvasElement, quality: number) {
  return new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/webp", quality));
}

/**
 * Resize to at most 2400px on the long edge and re-encode as WebP, so studio
 * uploads can't undo the site's image-weight budget. Throws if the result is
 * still over 2 MB.
 */
export async function compressImage(file: File): Promise<File> {
  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    throw new Error(`${file.name} could not be read as an image. Use a JPG, PNG or WebP file.`);
  }

  const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Your browser could not process this image.");
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  for (const quality of QUALITIES) {
    const blob = await toBlob(canvas, quality);
    if (blob && blob.type === "image/webp" && blob.size <= MAX_BYTES) {
      const name = file.name.replace(/\.[^.]+$/, "") + ".webp";
      return new File([blob], name, { type: "image/webp" });
    }
  }
  throw new Error(`${file.name} is still over 2 MB after compression. Try a smaller image.`);
}
