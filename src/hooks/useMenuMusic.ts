import { loadSettings } from "@/services/settingService";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router";

export function useMenuMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const audio = new Audio("/audio/menu_theme.wav");
    audio.loop = true;
    audioRef.current = audio;
    return () => audio.pause();
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const settings = loadSettings();
    audio.volume = settings.muted ? 0 : settings.musicVolume / 100;

    if (pathname === "/play") {
      audio.pause();
      audio.currentTime = 0;
      return;
    }

    const start = () => audio.play().catch(() => {});
    start();
    window.addEventListener("keydown", start, { once: true });
    window.addEventListener("pointerdown", start, { once: true });
    return () => {
      window.removeEventListener("keydown", start);
      window.removeEventListener("pointerdown", start);
    };
  }, [pathname]);
}
