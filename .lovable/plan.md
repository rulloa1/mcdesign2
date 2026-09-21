# Stage 2 review fixes and motion

## Build
- Correct sheet spacing, rebuild the cover as one bordered drawing sheet, refine revision clouds, align signature imagery, restore Yellowstone, and fix light-form colors.
- Refactor the homepage into readable focused components while preserving all protected project, media, studio, and agent code.
- Add the first-visit cover sequence, one shared scroll-reveal observer, animated revision marks, and reduced-motion fallbacks.
- Add active-sheet tracking for the desktop dock and mobile bar, including contact-aware visibility and keyboard-safe behavior.

## Technical details
- Motion remains limited to transform, opacity, and revision-cloud stroke offset, using the existing timing tokens.
- The root receives pre-paint motion/session flags before page content renders; no-JavaScript and reduced-motion states remain fully visible.
- Verification covers 1440×900, 360×740, same-tab reload, reduced motion, scrolling labels, keyboard focus, console errors, and horizontal overflow.
