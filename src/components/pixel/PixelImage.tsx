import type { ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// En <img> som skalas upp utan suddighet (varje pixel blir en skarp ruta).
export default function PixelImage({
  className,
  alt = "",
  ...rest
}: ImgHTMLAttributes<HTMLImageElement>) {
  return <img alt={alt} className={cn("pixelated", className)} {...rest} />;
}
