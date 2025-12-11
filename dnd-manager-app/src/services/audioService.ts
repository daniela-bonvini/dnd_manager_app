class AudioService {
  private cache: Map<string, HTMLAudioElement | null> = new Map();
  private validExtensions = [".mp3", ".wav", ".ogg", ".flac", ".aac", ".m4a"];

  loadAudio(src: string, volume: number = 1): HTMLAudioElement | null {
    // Validate input
    if (!src || typeof src !== "string" || src.trim() === "") {
      console.warn("AudioService: Invalid audio path provided");
      return null;
    }

    // Check cache first
    if (this.cache.has(src)) {
      return this.cache.get(src) || null;
    }

    // Validate extension
    const pathWithoutQuery = src.split("?")[0].toLowerCase();
    const hasValidExtension = this.validExtensions.some((ext) => pathWithoutQuery.endsWith(ext));

    if (!hasValidExtension) {
      console.warn(`AudioService: Invalid audio format for ${src}. Supported: ${this.validExtensions.join(", ")}`);
      return null;
    }

    try {
      const audio = new Audio(src);
      audio.preload = "auto";
      audio.volume = Math.max(0, Math.min(1, volume)); // Clamp volume to 0-1

      // Cache the audio element
      this.cache.set(src, audio);

      // Handle loading errors
      audio.addEventListener("error", (e) => {
        console.warn(`AudioService: Failed to load audio ${src}`, e);
        this.cache.set(src, null);
      });

      return audio;
    } catch (error) {
      console.warn(`AudioService: Error creating Audio element for ${src}`, error);
      return null;
    }
  }

  play(audio: HTMLAudioElement | null): void {
    if (!audio) return;
    audio.currentTime = 0;
    audio.play().catch((error: Error) => console.warn("Audio play failed:", error));
  }

  stop(audio: HTMLAudioElement | null): void {
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
  }
}

export const audioService = new AudioService();
