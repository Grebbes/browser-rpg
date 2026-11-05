import { loadGame } from "@/services/saveService";
import { loadSettings } from "@/services/settingService";
import type { RefObject } from "react";
import { useEffect, useRef } from "react";
import { screenHeight, screenWidth } from "../game/constants";
import { Game } from "../game/Game";
import styles from "./GameCanvas.module.css";

type Props = {
  paused: boolean;
  gameRef: RefObject<Game | null>;
  slot: number;
};

function GameCanvas({ paused, gameRef, slot }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const game = new Game(ctx);
    gameRef.current = game;
    game.start(loadGame(slot));
    game.applySettings(loadSettings());

    return () => {
      game.stop();
      gameRef.current = null;
    };
  }, [gameRef, slot]);

  useEffect(() => {
    if (paused) gameRef.current?.pause();
    else gameRef.current?.resume();
  }, [paused, gameRef]);

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
