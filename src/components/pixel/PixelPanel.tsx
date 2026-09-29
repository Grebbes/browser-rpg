import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Tone = "white" | "gold" | "muted";

// Färgen på pixelramen. --pixel-color läses av utilityn "pixel-border" i index.css.
const toneClass: Record<Tone, string> = {
  white: "[--pixel-color:var(--color-foreground)]",
  gold: "[--pixel-color:var(--color-primary)]",
  muted: "[--pixel-color:var(--color-border)]",
};

type Props = HTMLAttributes<HTMLElement> & {
  tone?: Tone;
  as?: "div" | "section" | "nav" | "article";
};

// En panel med pixelram (fyra skuggor = raka hörn med "hack", som i NES-menyer).
export default function PixelPanel({
  tone = "white",
  as: Tag = "div",
  className,
  ...rest
}: Props) {
  return (
    <Tag
      className={cn("bg-card pixel-border", toneClass[tone], className)}
      {...rest}
    />
  );
}
