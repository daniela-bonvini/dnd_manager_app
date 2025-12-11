import { describe, it, expect, beforeEach, vi } from "vitest";
import { audioService } from "./audioService";

describe("AudioService", () => {
  let mockAudio: HTMLAudioElement;
  let existingAudioPath: string = "/assets/cash-register-sound.mp3";

  beforeEach(() => {
    // Mock HTMLAudioElement
    mockAudio = {
      play: vi.fn().mockResolvedValue(undefined),
      pause: vi.fn(),
      preload: "auto",
      volume: 1,
      currentTime: 0,
      src: "",
      addEventListener: vi.fn(),
    } as any;

    // Mock global Audio constructor
    global.Audio = vi.fn(() => mockAudio) as any;
  });

  describe("loadAudio", () => {
    it("should return null for files without audio extension", () => {
      expect(audioService.loadAudio("/assets/file.txt")).toBeNull();
      expect(audioService.loadAudio("/audio/song.pdf")).toBeNull();
      expect(audioService.loadAudio("audio.js")).toBeNull();
      expect(audioService.loadAudio("document.docx")).toBeNull();
      expect(audioService.loadAudio("image.jpg")).toBeNull();
    });

    it("should handle empty src path gracefully", () => {
      expect(audioService.loadAudio("")).toBeNull();
    });

    it("should handle whitespace-only src path gracefully", () => {
      expect(audioService.loadAudio("   ")).toBeNull();
    });

    it("should handle undefined src gracefully", () => {
      expect(audioService.loadAudio(undefined as any)).toBeNull();
    });

    it("should handle null src gracefully", () => {
      expect(audioService.loadAudio(null as any)).toBeNull();
    });

    it("should be case-insensitive for extensions", () => {
      expect(audioService.loadAudio("/AUDIO.MP3")).not.toBeNull();
      expect(audioService.loadAudio("./Song.WaV")).not.toBeNull();
      expect(audioService.loadAudio("track.OGG")).not.toBeNull();
    });

    it("should accept valid audio files", () => {
      const audio = audioService.loadAudio(existingAudioPath);
      expect(audio).toBeDefined();
      expect(audio?.volume).toBe(1);
      expect(audio?.preload).toBe("auto");
    });

    it("should clamp volume to 0-1 range", () => {
      const audioWithHighVolume = audioService.loadAudio("/audio/high-volume.mp3", 2);
      expect(audioWithHighVolume?.volume).toBe(1);

      const audioWithNegativeVolume = audioService.loadAudio("/audio/negative-volume.mp3", -1);
      expect(audioWithNegativeVolume?.volume).toBe(0);
    });

    it("should cache loaded audio elements", () => {
      const audio1 = audioService.loadAudio(existingAudioPath);
      const audio2 = audioService.loadAudio(existingAudioPath);
      expect(audio1).toBe(audio2); // Should be the same cached instance
    });
  });

  describe("play", () => {
    it("should handle null audio gracefully", () => {
      expect(() => audioService.play(null)).not.toThrow();
    });

    it("should handle play() errors gracefully", () => {
      const consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
      mockAudio.play = vi.fn().mockRejectedValueOnce(new Error("Play blocked"));

      audioService.play(mockAudio);

      // Give async error handler time to execute
      setTimeout(() => {
        expect(consoleWarnSpy).toHaveBeenCalledWith("Audio play failed:", expect.any(Error));
        consoleWarnSpy.mockRestore();
      }, 0);
    });
  });

  describe("stop", () => {
    it("should handle null audio gracefully", () => {
      expect(() => audioService.stop(null)).not.toThrow();
    });

    it("should pause and reset audio", () => {
      audioService.stop(mockAudio);
      expect(mockAudio.pause).toHaveBeenCalled();
      expect(mockAudio.currentTime).toBe(0);
    });
  });
});
