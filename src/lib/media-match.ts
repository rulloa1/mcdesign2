import type { MediaSlot } from "@/data/media-slots";

const normalize = (value: string) =>
  value
    .toLowerCase()
    .replace(/\.[a-z0-9]+$/, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const tokens = (value: string) =>
  normalize(value)
    .split(" ")
    .filter((t) => t.length > 2);

/**
 * Guess the media slot a filename belongs to by comparing its words against
 * each slot's key and label. Returns null when nothing overlaps meaningfully.
 */
export function matchSlotForFilename(filename: string, slots: MediaSlot[]): MediaSlot | null {
  const fileTokens = tokens(filename);
  if (!fileTokens.length) return null;

  let best: { slot: MediaSlot; score: number } | null = null;

  for (const slot of slots) {
    const slotTokens = new Set([
      ...tokens(slot.slot.replace(/^project:/, "")),
      ...tokens(slot.label),
    ]);
    if (!slotTokens.size) continue;

    let score = 0;
    for (const token of fileTokens) {
      for (const slotToken of slotTokens) {
        if (token === slotToken) score += 2;
        else if (token.includes(slotToken) || slotToken.includes(token)) score += 1;
      }
    }
    if (score > 0 && (!best || score > best.score)) best = { slot, score };
  }

  return best && best.score >= 2 ? best.slot : null;
}
