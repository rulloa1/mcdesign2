# Stage 1 redesign: “The Drawing Set”

## Goal
Reposition McDesign around one audience—private owners and developers seeking an owner’s representative—and one action: **Book a project review**. Rebuild the public visual system as flat construction-document sheets with no motion beyond hover color changes.

## Scope

### 1. Foundation and typography
- Replace the brand palette in `src/styles.css` with the supplied mylar, cyanotype, ink, blueline, chalk, graphite, rule, redline, and highlighter tokens.
- Register every requested color token with Tailwind and point the legacy carbon/bone/brass tokens to the new palette so untouched pages inherit it.
- Add the requested spacing, type-size, easing, and duration variables.
- Load Archivo Variable and IBM Plex Mono in the root document; remove the old font families.
- Remove grain, gradient headline styling, grayscale/brightness image treatment, shadows, blur, and rounded styling in files redesigned during this stage.
- Add the shared `.display`, `.label`, `.sheet-grid`, body typography, numeric table styling, mobile bottom clearance, and site-wide redline focus ring.
- Add a reusable 12-column page container matching the requested margins, gutters, and 1440px maximum width.

### 2. Shared public navigation and footer
- Replace the floating pill navigation with a 64px cyanotype title bar branded **McDesign**.
- Add desktop sheet-index links for Scope, Work, and Record plus the redline booking action.
- Restyle the mobile menu as a full-screen cyanotype index, place booking at its bottom, and make the closed menu inert and unfocusable.
- Add the fixed mobile booking bar across public pages.
- Create a shared title-block footer with identity, location, email, LinkedIn, sheet links, Portfolio, Resume, Design, and the 2026 copyright.
- Render that footer on public content pages only: home, contact, portfolio, design, resume, and project albums. Authentication, protocol, and studio surfaces remain unchanged.

### 3. Homepage sheet set
- Replace the current homepage body with reusable `Sheet`, `DetailSheet`, revision-cloud, booking-button, and match-line structures.
- Build G-001 Cover using the existing `media("hero", bakersBayCover)` override slot, responsive three-line headline, revision cloud, project-review action, viewport frame, caption, and desktop title block.
- Build G-002 Scope with the ten supplied numbered owner-representation checks.
- Build G-003 through G-005 from the existing project records and preserve every project image override as `media(projectSlotKey(id), project.cover)`.
- Add the cyanotype revision strip.
- Build G-006 Record using `projects.length`, the existing `media("about-portrait", profile)` slot, supplied biography, and a responsive owners-representation project record table.
- Build G-007 Book with the three-step explanation, direct contact details, optional calendar link, and shared booking form.
- Remove only the old homepage renderings; keep the old feature components and project data untouched.

### 4. Shared booking form and contact page
- Extract the existing validated inquiry form into `BookingForm` with mylar and cyanotype tones.
- Keep the existing server submission, honeypot, validation, and sending/error/success behavior.
- Remove anticipated start from the visible form while continuing to submit an empty optional timeline.
- Add optional Project stage and store its permitted value in the inquiry record.
- Use the requested field order, bottom-rule controls, accessible error relationships, tap sizes, booking copy, and received state.
- Add `BOOKING_CALENDAR_URL` configuration; show calendar links only when it is non-empty.
- Restyle `/contact` around the shared form while retaining its current metadata.

### 5. Data change
- Add nullable `project_stage` to `contact_inquiries` with a constraint for the five requested values.
- Preserve existing grants and row-level access rules.
- Regenerate database types, then include `project_stage` in validated server inserts.

## Technical details
- `src/data/projects.ts`, media-slot definitions and resolver behavior, MCP/agent tools, and admin/studio route files will not be edited.
- Existing media slot keys remain exactly `hero`, `about-portrait`, and `projectSlotKey(project.id)` where requested.
- Shared public chrome will be composed into public routes rather than added to studio/auth/protocol pages.
- Every redesigned image will have meaningful alt text, explicit dimensions, and an explicit loading strategy.
- No entrance, scroll, marquee, opacity, transform, or scene animations will be introduced. The only motion is the specified CTA arrow shift and hover color transitions.

## Verification
- Check the generated database type includes `project_stage`.
- Verify the latest preview build and TypeScript checks pass.
- Use the live preview at 1440px and 360×740 to confirm the desktop headline is exactly three lines, the mobile CTA is visible without scrolling, the page has no horizontal overflow, and images/layouts render correctly.
- Keyboard-test navigation, mobile menu, links, fields, selects, and submit actions; confirm visible redline focus outlines and no console errors.
