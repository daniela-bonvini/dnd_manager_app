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
    } as any;

    // Mock global Audio constructor
    global.Audio = vi.fn(() => mockAudio) as any;
  });

  describe("loadAudio", () => {
    it("should reject files without audio extension", () => {
      expect(() => audioService.loadAudio("/assets/file.txt")).toThrow("Invalid audio format");
      expect(() => audioService.loadAudio("/audio/song.pdf")).toThrow("Invalid audio format");
      expect(() => audioService.loadAudio("audio.js")).toThrow("Invalid audio format");
      expect(() => audioService.loadAudio("document.docx")).toThrow("Invalid audio format");
      expect(() => audioService.loadAudio("image.jpg")).toThrow("Invalid audio format");
    });

    it("should handle empty src path", () => {
      expect(() => audioService.loadAudio("")).toThrow("Invalid audio path: path must be a non-empty string");
    });

    it("should handle whitespace-only src path", () => {
      expect(() => audioService.loadAudio("   ")).toThrow("Invalid audio path: path must be a non-empty string");
    });

    it("should handle undefined src gracefully", () => {
      expect(() => audioService.loadAudio(undefined as any)).toThrow("Invalid audio path: path must be a non-empty string");
    });

    it("should handle null src gracefully", () => {
      expect(() => audioService.loadAudio(null as any)).toThrow("Invalid audio path: path must be a non-empty string");
    });

    it("should be case-insensitive for extensions", () => {
      expect(() => audioService.loadAudio("/AUDIO.MP3")).not.toThrow();
      expect(() => audioService.loadAudio("./Song.WaV")).not.toThrow();
      expect(() => audioService.loadAudio("track.OGG")).not.toThrow();
    });

    it("should accept valid audio files", () => {
      const audio = audioService.loadAudio(existingAudioPath);
      expect(audio).toBeDefined();
      expect(audio.volume).toBe(1);
      expect(audio.preload).toBe("auto");
    });
  });

  describe("play", () => {
    it("should handle play() errors gracefully", () => {
      const consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});
      mockAudio.play = vi.fn().mockRejectedValueOnce(new Error("Play blocked"));

      audioService.play(mockAudio);

      // Give async error handler time to execute
      setTimeout(() => {
        expect(consoleLogSpy).toHaveBeenCalledWith("Audio play failed:", expect.any(Error));
        consoleLogSpy.mockRestore();
      }, 0);
    });
  });
});
