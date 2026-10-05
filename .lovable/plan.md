# Mobile-first homepage media

## Goal
Make the homepage show immediately on phones, with no video or oversized cover downloads blocking the first screen.

## Changes
- Keep the optimized hero poster as the instant first frame and prevent the hero video from downloading on phones, reduced-motion devices, and data-saving connections.
- Start the hero video only on capable larger screens after the first page content is ready.
- Create smaller phone-specific WebP versions of homepage project covers and signature-project photos while retaining the existing desktop images.
- Serve phone images through responsive image sources, preserve lazy loading below the first screen, and add stable image dimensions to prevent layout shifts.
- Preserve uploaded media overrides, the current visual composition, links, and motion behavior.
- Complete the previously approved gold-framed album update after the homepage performance work.

## Verification
- Check the homepage at phone and desktop sizes for image quality, layout stability, and no sideways overflow.
- Confirm phone requests do not download the hero video or desktop-sized fallback covers.
- Check multiple project albums on phone and desktop after their approved layout update.
- Confirm the latest build and runtime logs are clean.
