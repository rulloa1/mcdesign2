import type { ImgHTMLAttributes } from "react";

type ResponsiveProjectImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  desktopSrc: string;
  mobileSrc?: string | undefined;
  resolvedSrc?: string | undefined;
};

export function ResponsiveProjectImage({
  desktopSrc,
  mobileSrc,
  resolvedSrc = desktopSrc,
  "data-fallback-src": fallbackSrc,
  ...props
}: ResponsiveProjectImageProps) {
  const canUseMobileVariant = Boolean(mobileSrc && resolvedSrc === (fallbackSrc ?? desktopSrc));

  return (
    <picture>
      {canUseMobileVariant ? <source media="(max-width: 899px)" srcSet={mobileSrc} /> : null}
      <img src={resolvedSrc} {...props} />
    </picture>
  );
}