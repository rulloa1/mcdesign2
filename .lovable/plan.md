# Stage 3: portfolio completion

## Build
- Fix the homepage revision cloud, project-index link alignment, and mobile menu icon.
- Bring portfolio, project detail, resume, design, contact, and not-found views onto the Drawing Set system while preserving their content and behavior.
- Reuse one project-card presentation across home and portfolio.

## Discoverability
- Add route-specific metadata, canonical URLs, share images, homepage Person data, and project CreativeWork data using `https://mcdesign.bio`.
- Add a sitemap containing public pages and project albums, reference it from robots.txt, and exclude private tooling from search.

## Accessibility and performance
- Add a working skip link and one shared main landmark, correct headings, image alternatives, and slider/menu semantics.
- Keep non-hero images lazy and asynchronously decoded with explicit dimensions.
- Audit route boundaries and heavy imports, update the contact validator API, and compare the main client bundle before and after.

## Verification
- Check builds, types, route rendering, console output, mobile overflow, keyboard navigation, comparison slider controls, metadata, and sitemap output.
