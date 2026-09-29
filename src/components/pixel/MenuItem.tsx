import { cn } from "@/lib/utils";
import PixelArrow from "./PixelArrow";

type Props = {
  label: string;
  selected?: boolean;
  onSelect?: () => void;
  className?: string;
};

// En rad i en meny. Den valda raden får pil + guldfärg + mörkare bakgrund.
export default function MenuItem({
  label,
  selected = false,
  onSelect,
  className,
}: Props) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-current={selected ? "true" : undefined}
      className={cn(
        "flex min-h-12 w-full cursor-pointer items-center gap-4 px-3 text-left text-lg hover:text-primary",
        "focus-visible:outline-4 focus-visible:outline-ring",
        selected ? "bg-muted text-primary" : "pl-11 text-foreground",
        className,
      )}
    >
      {selected && <PixelArrow />}
      <span>{label}</span>
    </button>
  );
}
