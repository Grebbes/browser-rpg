export class Sound {
  private audio: HTMLAudioElement | null = null;
  private cache = new Map<number, HTMLAudioElement>();
  private volume = 1;

  private urls = [
    "/audio/island_theme.wav",
    "/audio/key.wav",
    "/audio/boots.wav",
    "/audio/door.wav",
    "/audio/chest.wav",
    "/audio/fall.wav",
    "/audio/heal.wav",
    "/audio/blip.wav",
  ];

  preLoad() {
    this.urls.forEach((url, i) => {
      const a = new Audio(url);
      a.preload = "auto";
      this.cache.set(i, a);
    });
  }

  setFile(i: number) {
    let sound = this.cache.get(i);
    if (!sound) {
      sound = new Audio(this.urls[i]);
      this.cache.set(i, sound);
    }
    sound.currentTime = 0;
    sound.volume = this.volume;
    this.audio = sound;
  }

  setVolume(volume: number) {
    this.volume = volume;
    if (this.audio) this.audio.volume = volume;
  }

  play() {
    this.audio
      ?.play()
      .catch((e) => console.warn("Ljudet blockerat", e.message));
  }

  loop() {
    if (this.audio) {
      this.audio.loop = true;
    }
  }

  stop() {
    if (!this.audio) return;
    this.audio.pause();
    this.audio.currentTime = 0;
  }

  pause() {
    this.audio?.pause();
  }
}
