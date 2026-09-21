export const SITE_ORIGIN = "https://mcdesign.bio";
export const SITE_NAME = "McDesign";
export const DEFAULT_SHARE_IMAGE = `${SITE_ORIGIN}/projects/assets/southcoast-cover-b.webp`;
export const LINKEDIN_URL = "https://www.linkedin.com/in/michael-chandler-mc-design-build";

export function absoluteImage(src: string) {
  return src.startsWith("http://") || src.startsWith("https://")
    ? src
    : `${SITE_ORIGIN}${src.startsWith("/") ? src : `/${src}`}`;
}