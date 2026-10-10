import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Tone = "white" | "gold" | "muted";

const toneClass: Record<Tone, string> = {
  white: "[--pixel-color:var(--color-foreground)]",
  gold: "[--pixel-color:var(--color-primary)]",
  muted: "[--pixel-color:var(--color-border)]",
};

type Props = HTMLAttributes<HTMLElement> & {
  tone?: Tone;
  as?: "div" | "section" | "nav" | "article";
};

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
