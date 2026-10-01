---
name: scroll-stop-studio
description: >
  End-to-end pipeline for research-driven, scroll-animated premium websites. Scrapes the client's
  existing site, analyzes their top 5 competitors, produces a PDF-ready competitive analysis report,
  derives an opinionated design system, generates the 3 coordinated AI prompts (hero shot,
  exploded/after view, video transition) needed for the scroll-stop asset, then extracts frames with
  FFmpeg and builds the production site where the video plays forward and backward on scroll.
  Trigger when the user says "scroll stop", "scroll-stop site", "scroll animation website",
  "scroll-driven video", "Apple-style scroll animation", "website intelligence", "build a site",
  "redesign", "website for [business]", "scrape and rebuild", "competitive analysis", "niche
  research", "website audit", "deconstruction prompt", "exploded view prompt", "asset prompts", or
  provides a product video and asks to make it scroll-controlled. Also trigger when the user wants
  any single stage of that pipeline on its own.
allowed-tools: Read, Write, Edit, Grep, Glob, Bash, WebFetch
---

# Scroll-Stop Studio

You research a niche, prove a design direction with competitor data, generate the AI assets, and
build a premium scroll-driven website — as one continuous pipeline with explicit gates.

This skill merges three previously separate workflows: **Website Intelligence** (research →
report → brief), **Image Generator** (the 3-prompt asset set), and **3D Animation Creator** (frame
extraction → scroll-driven build). They were always meant to run in sequence; here they share one
interview, one design system, and one state file.

**Read `references/pipeline-map.md` before you start.** It holds the stage/gate map, the entry-mode
routing table, and the state-file schema. The stage detail lives in the reference files, not here —
this file is the control loop.

---

## The pipeline

```
 0  INTAKE          route the request, write the state file
 1  BRAND           scrape the client's site → research/01-client-brand.md
 2  COMPETITORS     top 10 → score → deep-scrape top 5 → research/02-competitor-analysis.md
 3  REPORT          PDF-ready client deliverable → competitive-analysis.html
 4  BRIEF           design system + architecture + copy + conversion → research/03-build-brief.md
    ══ GATE 1 ══    user approves the brief. Hard stop.
 5  PROMPTS         3 coordinated AI prompts → prompts.html
    ══ GATE 2 ══    user generates image A, image B, video C and hands back the file. Hard stop.
 6  BUILD           ffmpeg frames → scroll-driven site → site/
 7  AUDIT           SEO + a11y + perf + client-ready → research/04-quality-audit.md
```

Two gates, and only two. Everything between them runs without stopping to ask.

---

## Stage 0 — Intake and routing

**Do this first, always.** One interview for the whole pipeline — never re-ask in a later stage
something you could have asked here or extracted in Stage 1.

### Route the request

Not everyone starts at zero. Establish which mode you are in:

| Mode | The user has… | Run |
|---|---|---|
| `full` | a business, maybe a site, no assets | 0 → 7 |
| `build-only` | a video file + brand already settled | 0, 4 (short form), 6, 7 |
| `prompts-only` | an object in mind, wants the prompt set | 0, 5 |
| `research-only` | wants the competitive report as the deliverable | 0 → 3 |
| `resume` | a `research/00-state.md` from an earlier session | read it, continue at the first incomplete stage |

Before asking anything, check for `research/00-state.md` in the working directory. If it exists,
you are in `resume` mode — read it, tell the user where the pipeline stands, and pick up there.

### Ask only what you cannot derive

Ask these conversationally, not as a numbered interrogation, and **skip any you can answer from a
URL the user already gave you** — Stage 1 extracts brand name, logo, colors, fonts and tone
automatically, so asking for them here is a wasted turn.

1. **The business and its URL** — "What's the business, and do they have a site up?"
2. **The niche, in their words** — needed to find the right competitors.
3. **The scroll-stop subject** — "What object or transformation is the scroll animation showing?"
   This drives Stage 5. Products get deconstruction; services get before/after.
4. **Assets in hand** — "Do you already have the video, or are we generating the prompts for it?"
   This decides whether Gate 2 is a stop or a no-op.
5. **Optional sections** — testimonials, confetti on CTA, Three.js card scanner. Opt-in only;
   default all three to off.

Anything still unknown after Stage 1 gets asked once at the Gate 1 approval, not drip-fed.

### Write the state file

Create `research/00-state.md` immediately. Schema in `references/pipeline-map.md`. Update it at the
end of every stage. It is what makes the pipeline resumable across sessions, and it is the single
source of truth for brand tokens — later stages read it rather than re-deriving.

---

## Stage 1-4 — Research, report, brief

Full detail in **`references/research-phases.md`**. Summary of what each produces:

- **Stage 1 — Brand extraction.** Scrape the client's site for logo, colors, fonts, tone, messaging,
  content and site map. Output `research/01-client-brand.md`, opening with a Brand Snapshot block.
  Example of a finished one: `examples/sample-brand-snapshot.md`.
- **Stage 2 — Competitive analysis.** Find 10 competitors, score them against 8 criteria,
  deep-scrape the top 5, extract the patterns that separate elite from average.
  Output `research/02-competitor-analysis.md`.
- **Stage 3 — The report.** A polished, print-ready HTML deliverable — this is a sales tool, good
  enough to email a cold prospect. Follow `references/report-template.html` as the exact design
  language. Output `competitive-analysis.html`.
- **Stage 4 — The build brief.** Design direction, site architecture, content framework, conversion
  playbook. This is where **`references/design-intelligence.md`** earns its place: pick a specific
  landing pattern, a specific style, a specific type pairing and a specific motion tier, and justify
  each against competitor data. If `ui-ux-pro-max` is installed, query it live — that reference
  explains how. Output `research/03-build-brief.md`.

### Gate 1 — Brief approval (hard stop)

Present the brief, highlight the decisions that are expensive to reverse, ask "Ready to build?" and
**wait**. Do not start Stage 5 or 6 on an unapproved brief. This gate exists because reshaping
direction costs minutes here and hours after the build starts.

---

## Stage 5 — The asset prompt set

Full detail in **`references/prompt-craft.md`**.

Three coordinated prompts: **A** the clean hero shot on pure white, **B** the exploded/deconstructed
(or "after") state, **C** the video transition between them. Delivered as a premium HTML page built
from `assets/prompt-page-template.html`, with the prompts also pasted into chat as a fallback.

**What the merge changes here:** this stage no longer opens by asking what the object is or guessing
a mood. It inherits from the brief — the subject from Stage 0, the material and color language from
Stage 1's brand extraction, and the visual register from the competitor analysis. If the client's
brand is warm terracotta and their competitors all shoot on cold grey, say so in the prompt.

**The one constraint you may not relax:** Prompt A and Prompt B are on pure `#FFFFFF`, no gradient,
no vignette. This is not an aesthetic preference — Stage 6's canvas compositing needs a white first
frame. Every whitening shortcut you take later costs more than getting it right here.

### Gate 2 — Asset handoff (hard stop, unless the user already has the video)

The user takes the prompts to their image and video models and comes back with a file. Tell them
plainly what you need back: **one video, 3-6 seconds, 16:9, first frame on white**. While waiting,
you may build everything in Stage 6 *except* the frame sequence — scaffold the site, populate copy
from the brief, and leave the canvas wired to an empty frames directory.

If the user arrived with a video already (`build-only`), skip Stage 5 entirely.

---

## Stage 6 — The scroll-stop build

Full section-by-section implementation — structure, CSS, JavaScript, mobile adaptations — is in
**`references/sections-guide.md`**. Read it before writing the site. It is the longest reference here
and it is the one you should not improvise around.

### Prerequisites

- FFmpeg installed (`brew install ffmpeg` on macOS, `apt install ffmpeg` on Linux)
- A video, ideally 3-6 seconds, first frame on white
- If the first frame is not white, ask for a re-export or a separate white-background hero image.
  Do not try to key it out.

### Frame extraction

```bash
ffprobe -v quiet -print_format json -show_streams -show_format "{VIDEO_PATH}"

mkdir -p "{OUTPUT_DIR}/frames"
ffmpeg -i "{VIDEO_PATH}" -vf "fps={TARGET_FPS},scale=1920:-2" -q:v 2 \
  "{OUTPUT_DIR}/frames/frame_%04d.jpg"
```

Target 60-150 frames total. JPEG at `-q:v 2`, not PNG — file size is what makes the scroll smooth.
Keep each frame under 100KB.

### Section order

1. Starscape — fixed canvas, ~180 drifting twinkling stars
2. Loader — brand logo, progress bar in the accent color
3. Scroll progress bar — fixed top, 3px, accent gradient
4. Navbar — full width, transforms to a centered pill on scroll
5. Hero — title, subtitle, CTAs, scroll hint, orbs + grid
6. **Scroll animation** — sticky canvas, frame sequence, annotation cards with snap-stop
7. Specs — four stats with count-up on scroll
8. Features — glass-morphism card grid
9. CTA
10. Testimonials *(opt-in only)* — drag-to-scroll
11. Card scanner *(opt-in only)* — Three.js particles
12. Footer

### Design system — from the brief, not from a fresh interview

This is the other thing the merge changes. The standalone version asked the user for accent color,
background color and vibe. Here those come from `research/00-state.md`, which got them from the
brand extraction and the brief. Only ask if the brief genuinely left a token undecided.

- **Fonts** — the pairing chosen in Stage 4. Fall back to Space Grotesk / Archivo / JetBrains Mono.
- **Accent** — brand accent, refined against the competitor palette analysis.
- **Background** — dark backgrounds work best for this effect; if the brand is light, use dark
  sections for the scroll animation and light for the content sections, and say so in the brief.
- **Text colors** — derived from background: dark bg gets white primary + muted secondary, light bg
  the inverse.
- **Cards** — glass-morphism: semi-transparent, subtle border, `backdrop-filter: blur(20px)`, 20px radius.
- **Buttons** — primary is accent bg + accent glow; secondary is transparent + border.
- **Effects** — floating blurred accent orbs, subtle grid overlay, animated starscape.

### Non-negotiable implementation patterns

1. `requestAnimationFrame` for drawing — never draw inside the scroll handler
2. `{ passive: true }` on the scroll listener
3. Canvas scaled by `devicePixelRatio` for Retina
4. Preload every frame before revealing the canvas — no pop-in
5. Frame deduplication — only call `drawFrame` when the index actually changes
6. No `scroll-behavior: smooth` — it fights frame-accurate scroll mapping
7. Cover-fit on desktop, zoomed contain-fit on mobile
8. Sticky canvas — `position: sticky` holds the canvas while the container scrolls
9. No heavy libraries in the canvas path; Three.js only if the card scanner is opted in
10. Real copy from the brief throughout. Never Lorem ipsum, never a placeholder headline.

### Serve

```bash
cd "{OUTPUT_DIR}" && python3 -m http.server 8080
```

Frames cannot load from `file://` — the local server is required, not optional. Open the URL for
the user once it is up.

### Mobile

- Annotation cards: compact single line — number + title only, `bottom: 1.5vh`
- Scroll animation height: 350vh desktop, 300vh tablet, 250vh phone
- Navbar: logo + pill only, links hidden
- Features stack to one column; specs go 2x2

---

## Stage 7 — Quality audit

Run every check before declaring done. Output `research/04-quality-audit.md`, and **fix what fails
before you hand over** — an audit that lists failures is not a finished stage.

**SEO** — unique meta tags per page · one H1 · logical H2/H3 · alt text everywhere · schema markup
validates · sitemap.xml · robots.txt · Open Graph tags

**Accessibility** — WCAG AA contrast · keyboard reachable · visible focus indicators ·
`prefers-reduced-motion` respected (the scroll animation must degrade to a static final frame, not
just stop) · semantic HTML · captions or a text equivalent for the animation's content

**Performance** — Lighthouse 90+ · images lazy loaded · no render-blocking CSS/JS · animations cause
no layout shift · frames under 100KB each · `will-change` hints on animated elements

**Client-ready** — every placeholder marked · form endpoints noted · favicon · OG image · 404 page ·
README with Vercel/Netlify deploy steps · deployed to a preview URL

Cross-check the Animation and Accessibility entries in `references/design-intelligence.md` — those
are the rules scroll-driven sites break most often.

---

## Scraping setup

Stages 1 and 2 need to scrape. Check for Firecrawl MCP tools (`mcp__firecrawl__scrape`,
`mcp__firecrawl__map`, `mcp__firecrawl__search`) before starting.

| Tool | Purpose | Used in |
|---|---|---|
| `mcp__firecrawl__scrape` | single URL → full content, HTML, metadata | Stage 1, Stage 2 |
| `mcp__firecrawl__map` | discover every URL on a domain | Stage 1 |
| `mcp__firecrawl__search` | find companies in the niche | Stage 2 |

**If Firecrawl is not connected**, offer the choice rather than blocking: either the user adds it
(free tier at https://firecrawl.dev, then an MCP server entry with `FIRECRAWL_API_KEY` and a
restart), or you fall back to `WebFetch`. WebFetch has no `/map` and no search, so you fetch each URL
manually and find competitors by ordinary web search — slower and shallower, but the pipeline still
runs end to end. Say which mode you are in so the research quality is not oversold.

---

## Output shape

```
project/
├── research/
│   ├── 00-state.md                 # pipeline state + brand tokens (source of truth)
│   ├── 01-client-brand.md
│   ├── 02-competitor-analysis.md
│   ├── 03-build-brief.md
│   └── 04-quality-audit.md
├── competitive-analysis.html       # client deliverable, print-ready
├── prompts.html                    # the 3-prompt asset page
├── site/
│   ├── index.html
│   ├── frames/                     # extracted JPEG sequence
│   ├── css/  js/  assets/
│   └── README.md
└── README.md
```

---

## Rules

1. **Scrape before you design.** Never start from scratch when the client's brand is already online.
2. **Save every stage.** Each file is a deliverable the user can hand to a client.
3. **Ask once, at Stage 0.** Every later stage reads `research/00-state.md` instead of re-asking.
   A user answering "what's your accent color?" for the second time has caught you not merging.
4. **Both gates are real.** Brief approval, then asset handoff. Do not run past either.
5. **Pure white on Prompts A and B.** The build depends on it downstream.
6. **Be opinionated.** Specific hex, specific fonts, specific easing, specific frame count — each
   justified by competitor data or by `references/design-intelligence.md`.
7. **Real copy only.** If the brief has a hole in it, fill it from the research, or ask — do not
   write Lorem ipsum into a client deliverable.
8. **Degrade honestly.** No Firecrawl, no FFmpeg, no video yet — say what that costs and keep going
   with the reduced version rather than stalling the whole pipeline.

---

## Error recovery

| Issue | Fix |
|---|---|
| Firecrawl not connected | Offer setup or fall back to WebFetch; state which mode you are in |
| FFmpeg missing | `brew install ffmpeg` / `apt install ffmpeg` |
| First frame isn't white | Ask for a re-export. Do not attempt to key the background out |
| Frames don't load | Serve over HTTP — `file://` cannot load the sequence |
| Animation choppy | Fewer frames, JPEG not PNG, each under 100KB |
| Canvas blurry | `devicePixelRatio` scaling missing |
| Scroll too fast/slow | Adjust `.scroll-animation` height: 200vh fast, 500vh slow, 800vh cinematic |
| Snap-stop jarring | Drop HOLD_DURATION to 400ms or widen SNAP_ZONE |
| Mobile cards overlap | Compact single-line card, `bottom: 1.5vh` |
| Video longer than 10s | Trim to 3-6s — the scroll feel depends on it |
| Image gen lighting inconsistent | Add "match exact lighting direction and intensity from reference image" to Prompt B |
| Deconstruction looks random | Emphasize "maintain spatial relationships", single explosion axis |
| Video transition jerky | Extend to 8-10s, emphasize "smooth eased motion" |
| Background not pure white | State "pure white #FFFFFF background, no gradient, no vignette" explicitly |
| Before/after angles differ | Copy Prompt A's camera description into Prompt B verbatim |
| Prompt page won't open | `open <path>` (macOS) / `xdg-open <path>` (Linux) |
| HTML special chars in a prompt | Escape `<`, `>`, `&` before inserting into the template |
