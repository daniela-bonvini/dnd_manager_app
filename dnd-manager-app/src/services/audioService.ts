class AudioService {
  loadAudio(src: string, volume: number = 1): HTMLAudioElement {
    const audio = new Audio(src);
    audio.preload = "auto";
    audio.volume = volume;
    return audio;
  }

  play(audio: HTMLAudioElement): void {
    audio.currentTime = 0;
    audio.play().catch((error: Error) => console.log("Audio play failed:", error));
  }

  stop(audio: HTMLAudioElement): void {
    audio.pause();
    audio.currentTime = 0;
  }
}

export const audioService = new AudioService();
