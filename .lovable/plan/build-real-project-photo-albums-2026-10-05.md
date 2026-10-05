# Build real project photo albums

## What will change
- Keep each Portfolio card linked to its existing project page, but make the card action clearly open the actual album and show its real photo count.
- Restyle every project album as an editorial, gold-framed photo layout that matches the new Portfolio cards.
- Give featured and supporting photos varied proportions for a more intentional gallery rhythm, while preserving every project's existing photo order.
- Add matching gold hover accents and smooth image zoom on pointer devices; keep tap behavior clear and stable on phones.
- Refresh the full-screen photo viewer so its controls and counter use the same gold architectural styling.

## Verification
- Check multiple projects with small and large albums.
- Test desktop and phone layouts, album opening, next/previous controls, close behavior, and scroll effects.
- Confirm the site builds without errors and no photos or project text are changed.

## Technical details
- Reuse the existing `/projects/$projectId` pages and current album data rather than creating new pages.
- Keep admin photo editing and private-gallery behavior unchanged.
- Use the existing semantic brass, carbon, and bone design tokens.
