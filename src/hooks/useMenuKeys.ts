import { useEffect, useState } from "react";
import { useBackKey } from "./useBackKey";

export function useMenuKeys(
  count: number,
  onConfirm: (index: number) => void,
  onBack?: () => void,
  enable = true,
) {
  const [selected, setSelected] = useState(0);
  useBackKey(() => onBack?.(), enable);

  useEffect(() => {
    if (!enable) return;

    function handleKeyDown(e: KeyboardEvent) {
      const key = e.key.toLowerCase();

      if (key === "w" || key === "arrowup") {
        setSelected((s) => (s - 1 + count) % count);
      } else if (key === "s" || key === "arrowdown") {
        setSelected((s) => (s + 1) % count);
      } else if (key === "enter") {
        e.preventDefault();
        onConfirm(selected);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [count, onConfirm, enable, selected]);

  return selected;
}
