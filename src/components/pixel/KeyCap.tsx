import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
};

// En tangent som den ser ut på tangentbordet (W, A, S, D, ESC).
export default function KeyCap({ children, className }: Props) {
  return (
    <kbd
      className={cn(
        "inline-flex h-13 min-w-13 items-center justify-center bg-foreground px-3 text-base text-background shadow-[0_4px_0_0_#6c6c8c]",
        className,
      )}
    >
      {children}
    </kbd>
  );
}
