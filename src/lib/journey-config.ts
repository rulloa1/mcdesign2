/**
 * Blueprint Journey configuration — edit colors, building size,
 * camera checkpoints, and reveal timing here.
 * Progress runs 0 → 1 over each page's scroll length.
 */
export const journeyConfig = {
  colors: {
    background: "#050505",
    ivory: "#EDE6D6",
    gold: "#D4AF37",
    grid: "#EDE6D6",
  },
  opacity: { structure: 0.5, plan: 0.62, gold: 0.75, grid: 0.09 },
  building: {
    width: 24, // x
    depth: 16, // z
    floors: 3,
    floorHeight: 3.6,
    colsX: [-12, -4, 4, 12],
    colsZ: [-8, 0, 8],
    foundationDepth: 0.8,
  },
  /** [start, end] progress windows for each geometry group */
  reveal: {
    plan: [0.0, 0.14],
    foundation: [0.12, 0.26],
    columns: [0.2, 0.55],
    slabs: [0.3, 0.62],
    facade: [0.55, 0.76],
    systems: [0.68, 0.86],
    roof: [0.82, 0.97],
  } as Record<string, [number, number]>,
  /** Camera path: progress → position + look target */
  checkpoints: [
    { at: 0.0, pos: [0, 40, 0.01], target: [0, 0, 0] }, // The plan
    { at: 0.18, pos: [12, 28, 24], target: [0, 0, 0] }, // The foundation
    { at: 0.4, pos: [24, 14, 22], target: [0, 5, 0] }, // The structure
    { at: 0.6, pos: [-22, 9, 18], target: [0, 5, 0] }, // The spaces
    { at: 0.8, pos: [-16, 22, -20], target: [0, 6, 0] }, // The systems
    { at: 1.0, pos: [32, 24, 36], target: [0, 5, 0] }, // Complete vision
  ] as { at: number; pos: [number, number, number]; target: [number, number, number] }[],
  /** Shift the drawing right on wide screens so text stays clear (fraction of width) */
  desktopOffset: 0.2,
  storageKey: "mc-simple-view",
};
