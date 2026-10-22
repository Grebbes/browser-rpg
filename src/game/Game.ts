import type { Settings } from "@/services/settingService";
import { AssetSetter } from "./AssetSetter";
import { CollisionChecker } from "./CollisionChecker";
import { screenHeight, screenWidth } from "./constants";
import type { Entity } from "./entities/Entity";
import { Player } from "./entities/Player";
import { Input } from "./Input";
import type { SuperObject } from "./objects/SuperObject";
import { Sound } from "./Sound";
import { TileManager } from "./tiles/TileManager";
import type { HudState, SaveData } from "./types";
import { UI } from "./UI";

export class Game {
  private ctx: CanvasRenderingContext2D;
  private animationId: number | null = null;
  private timer = 0;
  private drawCount = 0;
  private lastTime = 0;
  private fps = 60;
  private drawInterval = 1000 / this.fps;
  private delta = 0;
  private input = new Input();
  private obj: (SuperObject | null)[] = Array(10).fill(null);
  private npc: (Entity | null)[] = Array(10).fill(null);
  private tileM = new TileManager();
  private cChecker = new CollisionChecker(this.tileM, this.obj);
  private aSetter = new AssetSetter(this.obj, this.npc, this.cChecker);
  private ui = new UI();
  private player = new Player(
    this.input,
    this.cChecker,
    this.obj,
    this.npc,
    (i) => this.playSe(i),
    this.ui,
    (npc, text) => this.startDialogue(npc, text),
  );
  private music = new Sound();
  private se = new Sound();
  private musicStarted = false;
  gameState = 0;
  readonly playState = 1;
  readonly pauseState = 2;
  readonly dialogueState = 3;
  private stateBeforePause = this.playState;
  private currentDialogue: string | null = null;
  private dialogueNpc: Entity | null = null;
  private dialogueCharIndex = 0;
  private dialogueFrameCounter = 0;
  private readonly textDelay = 3;
  private onHudChange: (hud: HudState) => void;
  private lastHud: HudState = { keys: 0, message: null, dialogue: null };

  constructor(
    ctx: CanvasRenderingContext2D,
    onHudChange: (hud: HudState) => void,
  ) {
    this.ctx = ctx;
    this.onHudChange = onHudChange;
    this.ctx.imageSmoothingEnabled = false;
  }

  setupGame() {
    this.aSetter.setObject();
    this.aSetter.setNpc();
    this.gameState = this.playState;
  }

  getSaveData(slot: number): SaveData {
    const removedObjects: number[] = [];
    this.obj.forEach((o, i) => {
      if (o === null) removedObjects.push(i);
    });

    return {
      version: 1,
      slot,
      savedAt: new Date().toISOString(),
      player: {
        worldX: this.player.worldX,
        worldY: this.player.worldY,
        direction: this.player.direction,
        speed: this.player.speed,
        hasKeys: this.player.hasKeys,
      },
      removedObjects,
    };
  }

  private loadSaveData(data: SaveData) {
    this.player.worldX = data.player.worldX;
    this.player.worldY = data.player.worldY;
    this.player.direction = data.player.direction;
    this.player.speed = data.player.speed;
    this.player.hasKeys = data.player.hasKeys;

    data.removedObjects.forEach((i) => {
      this.obj[i] = null;
    });
  }

  start(save?: SaveData | null) {
    this.setupGame();
    if (save) this.loadSaveData(save);
    this.lastTime = performance.now();
    this.animationId = requestAnimationFrame(this.loop);
    this.onHudChange({
      keys: this.player.hasKeys,
      message: null,
      dialogue: null,
    });
  }

  stop() {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    this.stopMusic();
    this.input.destroy();
  }

  pause() {
    if (this.gameState === this.pauseState) return;
    this.stateBeforePause = this.gameState;
    this.gameState = this.pauseState;
    this.music.pause();
  }

  resume() {
    if (this.gameState !== this.pauseState) return;
    this.gameState = this.stateBeforePause;

    if (this.musicStarted) this.music.play();
  }

  private startDialogue(npc: Entity, text: string) {
    this.dialogueNpc = npc;
    this.currentDialogue = text;
    this.dialogueCharIndex = 0;
    this.gameState = this.dialogueState;
  }

  private loop = (currentTime: number) => {
    this.delta += (currentTime - this.lastTime) / this.drawInterval;
    this.timer += currentTime - this.lastTime;
    this.lastTime = currentTime;

    if (this.delta >= 1) {
      this.update();
      this.draw();
      this.drawCount++;
      this.delta--;
    }

    if (this.timer >= 1000) {
      this.drawCount = 0;
      this.timer = 0;
    }

    if (this.ui.gameFinished) {
      this.stopMusic();
      this.playSe(4);
      return;
    }

    this.animationId = requestAnimationFrame(this.loop);
  };

  private update() {
    if (!this.musicStarted) {
      const i = this.input;
      if (i.upPressed || i.downPressed || i.leftPressed || i.rightPressed) {
        this.playMusic(0);
        this.musicStarted = true;
      }
    }

    if (this.gameState === this.playState) {
      this.tileM.update();
      this.player.update();
      for (const n of this.npc) {
        if (n) n.update(this.player);
      }
      this.ui.update();
    } else if (this.gameState === this.dialogueState) {
      if (
        this.currentDialogue &&
        this.dialogueCharIndex < this.currentDialogue.length
      ) {
        this.dialogueFrameCounter++;
        if (this.dialogueFrameCounter >= this.textDelay) {
          this.dialogueCharIndex++;
          this.dialogueFrameCounter = 0;
        }
      }
      if (this.input.enterPressed) {
        this.input.enterPressed = false;
        const nextDialogue = this.dialogueNpc?.speak(this.player);
        if (nextDialogue) {
          this.currentDialogue = nextDialogue;
          this.dialogueCharIndex = 0;
        } else {
          this.currentDialogue = null;
          this.dialogueNpc = null;
          this.gameState = this.playState;
        }
      }
    }

    this.syncHud();
  }

  private syncHud() {
    const hud: HudState = {
      keys: this.player.hasKeys,
      message: this.ui.currentMessage,
      dialogue: this.currentDialogue?.slice(0, this.dialogueCharIndex) ?? null,
    };

    if (
      hud.keys !== this.lastHud.keys ||
      hud.message !== this.lastHud.message ||
      hud.dialogue !== this.lastHud.dialogue
    ) {
      this.lastHud = hud;
      this.onHudChange(hud);
    }
  }

  draw() {
    let drawStart = 0;
    if (this.input.checkDrawTime) {
      drawStart = performance.now();
    }

    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, screenWidth, screenHeight);

    this.tileM.draw(this.ctx, this.player);
    for (const o of this.obj) {
      if (o) o.draw(this.ctx, this.player);
    }
    for (const n of this.npc) {
      if (n) n.draw(this.ctx, this.player);
    }
    this.player.draw(this.ctx);
    this.ui.draw(this.ctx);

    if (this.input.checkDrawTime) {
      const drawEnd = performance.now();
      const passed = drawEnd - drawStart;
      this.ctx.fillStyle = "white";
      this.ctx.font = "20px monospace";
      this.ctx.fillText("Draw Time: " + passed.toFixed(3) + "ms", 10, 400);
      console.log("Draw Time: " + passed.toFixed(3) + "ms");
    }
  }

  playMusic(i: number) {
    this.music.setFile(i);
    this.music.play();
    this.music.loop();
  }

  stopMusic() {
    this.music.stop();
  }

  applySettings(settings: Settings) {
    this.music.setVolume(settings.muted ? 0 : settings.musicVolume / 100);
    this.se.setVolume(settings.muted ? 0 : settings.sfxVolume / 100);
    this.input.setKeys(settings.keys);
  }

  playSe(i: number) {
    this.se.setFile(i);
    this.se.play();
  }
}
