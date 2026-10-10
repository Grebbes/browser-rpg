import type { ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export default function PixelImage({
  className,
  alt = "",
  ...rest
}: ImgHTMLAttributes<HTMLImageElement>) {
  return <img alt={alt} className={cn("pixelated", className)} {...rest} />;
}
