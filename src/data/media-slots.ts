import { projects } from "@/data/projects";

import profileAsset from "@/assets/mike-headshot.jpg.asset.json";
const profile = profileAsset.url;
import houstonOaks from "@/assets/houston-oaks-cover.webp";
import poolDetail from "@/assets/hospitality-pool-1.webp";
import poolFinished from "@/assets/pool-design-36.webp";
import alpine3 from "@/assets/alpine-ranch-3.webp";
import alpine7 from "@/assets/alpine-ranch-7.webp";
import miami10 from "@/assets/miami-beach-10.webp";
import miami27 from "@/assets/miami-beach-27.webp";

export type MediaSlot = { slot: string; label: string; group: string; fallback: string };

export const heroSlots: MediaSlot[] = [
  { slot: "hero", label: "Hero background", group: "Hero & About", fallback: profile },
  { slot: "about-portrait", label: "About portrait", group: "Hero & About", fallback: profile },
];

export const signatureSlots: MediaSlot[] = [
  { slot: "case-pool-1", label: "Resort Pool — Vision", group: "Signature Sequences", fallback: houstonOaks },
  { slot: "case-pool-2", label: "Resort Pool — Execution", group: "Signature Sequences", fallback: poolDetail },
  { slot: "case-pool-3", label: "Resort Pool — Result", group: "Signature Sequences", fallback: poolFinished },
  { slot: "case-alpine-1", label: "Alpine Ranch — Vision", group: "Signature Sequences", fallback: projects.find((p) => p.id === "alpine-ranch")!.cover },
  { slot: "case-alpine-2", label: "Alpine Ranch — Execution", group: "Signature Sequences", fallback: alpine3 },
  { slot: "case-alpine-3", label: "Alpine Ranch — Result", group: "Signature Sequences", fallback: alpine7 },
  { slot: "case-miami-1", label: "S. Florida Condo — Vision", group: "Signature Sequences", fallback: projects.find((p) => p.id === "miami-beach")!.cover },
  { slot: "case-miami-2", label: "S. Florida Condo — Execution", group: "Signature Sequences", fallback: miami10 },
  { slot: "case-miami-3", label: "S. Florida Condo — Result", group: "Signature Sequences", fallback: miami27 },
];

export const projectSlots: MediaSlot[] = projects.map((p) => ({
  slot: `project:${p.id}`,
  label: p.title,
  group: "Project Covers",
  fallback: p.cover,
}));

export const mediaSlots: MediaSlot[] = [...heroSlots, ...signatureSlots, ...projectSlots];

export const projectSlotKey = (id: string) => `project:${id}`;
