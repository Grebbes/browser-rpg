export class Sound {
  private audio: HTMLAudioElement | null = null;

  private urls = [
    "/sound/BlueBoyAdventure.wav",
    "/sound/coin.wav", //key/coing
    "/sound/powerup.wav", //boots
    "/sound/unlock.wav", //dörr
    "/sound/fanfare.wav", //kistan
  ];

  setFile(i: number) {
    this.audio = new Audio(this.urls[i]);
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
}
