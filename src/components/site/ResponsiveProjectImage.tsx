import type { ImgHTMLAttributes } from "react";

type ResponsiveProjectImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  desktopSrc: string;
  mobileSrc?: string;
  resolvedSrc?: string;
};

export function ResponsiveProjectImage({
  desktopSrc,
  mobileSrc,
  resolvedSrc = desktopSrc,
  ...props
}: ResponsiveProjectImageProps) {
  const canUseMobileVariant = Boolean(mobileSrc && resolvedSrc === desktopSrc);

  return (
    <picture>
      {canUseMobileVariant ? <source media="(max-width: 899px)" srcSet={mobileSrc} /> : null}
      <img src={resolvedSrc} {...props} />
    </picture>
  );
}