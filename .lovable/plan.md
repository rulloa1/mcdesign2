# Extend the gold architectural effect across public pages

## Scope
- Add the existing subtle drifting gold-dot canvas to the Portfolio, Design, Resume, Contact, and individual project pages.
- Keep the current page structure, content, photos, controls, and links unchanged.
- Apply the effect only to suitable header or introductory areas so galleries, forms, and long text remain clear and performant.

## Implementation
- Reuse the existing `ArchitecturalCanvas` behavior and visual settings rather than creating a second effect.
- Lazy-load it on each page and place it behind content with transparent, non-interactive layering.
- Ensure each host area clips the animation and keeps text and buttons above it.
- Preserve reduced-motion handling, mobile node limits, off-screen pausing, and pointer behavior already built into the canvas.

## Verification
- Check every affected page at desktop and phone sizes.
- Confirm the animation stays subtle, page content remains readable, photos load, controls work, and no blank gaps or overlaps appear.
- Confirm the preview build and browser console are clean.
