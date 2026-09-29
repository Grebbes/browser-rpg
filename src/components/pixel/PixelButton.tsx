import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "danger" | "success" | "secondary";

// Knappens färg + en mörkare "kant" under som ger 3D-känsla.
const variantClass: Record<Variant, string> = {
  primary: "bg-primary text-primary-foreground shadow-[0_4px_0_0_#a83800]",
  danger: "bg-destructive text-foreground shadow-[0_4px_0_0_#7c1400]",
  success: "bg-[#58b800] text-background shadow-[0_4px_0_0_#007800]",
  secondary: "bg-secondary text-foreground shadow-[0_4px_0_0_#1c1c3c]",
};

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

export default function PixelButton({
  variant = "primary",
  type = "button",
  className,
  ...rest
}: Props) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex min-h-11 cursor-pointer items-center justify-center px-4 text-xs uppercase",
        "active:translate-y-1 active:shadow-none",
        "focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-ring",
        variantClass[variant],
        className,
      )}
      {...rest}
    />
  );
}
