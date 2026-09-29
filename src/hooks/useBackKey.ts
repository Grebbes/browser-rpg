import { useEffect } from "react";

export function useBackKey(onBack: () => void, enable = true) {
  useEffect(() => {
    if (!enable) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Backspace") {
        onBack();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onBack, enable]);
}
