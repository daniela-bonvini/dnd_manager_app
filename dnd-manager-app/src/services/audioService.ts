class AudioService {
  loadAudio(src: string, volume: number = 1): HTMLAudioElement {
    if (!src || typeof src !== "string" || src.trim() === "") {
      throw new Error("Invalid audio path: path must be a non-empty string");
    }

    const validExtensions = [".mp3", ".wav", ".ogg", ".flac", ".aac", ".m4a"];
    const pathWithoutQuery = src.split("?")[0].toLowerCase();
    const hasValidExtension = validExtensions.some((ext) => pathWithoutQuery.endsWith(ext));

    if (!hasValidExtension) {
      throw new Error(`Invalid audio format. Supported formats: ${validExtensions.join(", ")}`);
    }

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
