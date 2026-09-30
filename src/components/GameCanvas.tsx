import type { HudState } from "@/game/types";
import { useEffect, useRef } from "react";
import { screenHeight, screenWidth } from "../game/constants";
import { Game } from "../game/Game";
import styles from "./GameCanvas.module.css";

type Props = {
  paused: boolean;
  onHudChange: (hud: HudState) => void;
};

function GameCanvas({ paused, onHudChange }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<Game | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const game = new Game(ctx, onHudChange);
    gameRef.current = game;
    game.start();

    return () => {
      game.stop();
      gameRef.current = null;
    };
  }, [onHudChange]);

  useEffect(() => {
    if (paused) gameRef.current?.pause();
    else gameRef.current?.resume();
  }, [paused]);

  return (
    <canvas
      ref={canvasRef}
      height={screenHeight}
      width={screenWidth}
      className={styles.canvas}
    />
  );
}

export default GameCanvas;
