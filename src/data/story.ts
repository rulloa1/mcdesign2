// Six-act scroll story configuration. Swap a clip or poster by replacing its asset pointer.
// All footage is AI-generated conceptual material — not documentation of delivered projects.
import vision from "@/assets/story/vision.mp4.asset.json";
import visionPoster from "@/assets/story/vision-poster.webp.asset.json";
import planning from "@/assets/story/planning.mp4.asset.json";
import planningPoster from "@/assets/story/planning-poster.webp.asset.json";
import coordination from "@/assets/story/coordination.mp4.asset.json";
import coordinationPoster from "@/assets/story/coordination-poster.webp.asset.json";
import execution from "@/assets/story/execution.mp4.asset.json";
import executionPoster from "@/assets/story/execution-poster.webp.asset.json";
import oversight from "@/assets/story/oversight.mp4.asset.json";
import oversightPoster from "@/assets/story/oversight-poster.webp.asset.json";
import leadership from "@/assets/story/leadership.mp4.asset.json";
import leadershipPoster from "@/assets/story/leadership-poster.webp.asset.json";

/** Total desktop scroll length of the story, in viewport heights. */
export const STORY_SCROLL_VH = 600;

export type Act = {
  key: string;
  label: string;
  headline: string;
  line: string;
  video: string;
  poster: string;
  alt: string;
};

export const acts: Act[] = [
  { key: "vision", label: "Vision", headline: "Start with a clear direction.", line: "Construction. Operations. Leadership.", video: vision.url, poster: visionPoster.url, alt: "Conceptual view of a city skyline with cranes, seen from an office at dusk" },
  { key: "planning", label: "Planning", headline: "Turn priorities into a plan.", line: "Align scope, resources, and responsibilities.", video: planning.url, poster: planningPoster.url, alt: "Conceptual view of architectural drawings and material samples on a table" },
  { key: "coordination", label: "Coordination", headline: "Connect the moving parts.", line: "People. Information. Decisions.", video: coordination.url, poster: coordinationPoster.url, alt: "Conceptual scene of a team reviewing plans around a site-office table" },
  { key: "execution", label: "Execution", headline: "Bring the plan into the field.", line: "Purposeful coordination. Disciplined execution.", video: execution.url, poster: executionPoster.url, alt: "Conceptual scene of a steel-frame building under construction" },
  { key: "oversight", label: "Oversight", headline: "Maintain clarity across operations.", line: "Review progress. Resolve obstacles. Keep teams aligned.", video: oversight.url, poster: oversightPoster.url, alt: "Conceptual view of an operations office at night" },
  { key: "leadership", label: "Leadership", headline: "Let’s discuss what’s next.", line: "", video: leadership.url, poster: leadershipPoster.url, alt: "Conceptual view of a completed building at blue hour" },
];
