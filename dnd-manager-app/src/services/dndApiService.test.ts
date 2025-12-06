import { describe, it, expect, beforeEach, vi } from "vitest";
import { getAllEquipment } from "./dndApiService";

describe("DndApiService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getAllEquipment", () => {
    it("should fetch equipment from correct API endpoint", async () => {
      const mockResponse = {
        results: [{ index: "item1", name: "Item 1", url: "/url1" }],
      };

      global.fetch = vi.fn().mockResolvedValueOnce({
        json: vi.fn().mockResolvedValueOnce(mockResponse),
      });

      await getAllEquipment();
      expect(global.fetch).toHaveBeenCalledWith("https://www.dnd5eapi.co/api/2014/equipment");
    });

    it("should extend equipment with cost property", async () => {
      const mockResponse = {
        results: [{ index: "test-item", name: "Test Item", url: "/test" }],
      };

      global.fetch = vi.fn().mockResolvedValueOnce({
        json: vi.fn().mockResolvedValueOnce(mockResponse),
      });

      const result = await getAllEquipment();
      expect(result[0]).toHaveProperty("cost");
      expect(typeof result[0].cost).toBe("number");
      expect(result[0].cost).toBeGreaterThanOrEqual(1);
      expect(result[0].cost).toBeLessThanOrEqual(500);
    });

    it("should return equipment sorted by cost in ascending order", async () => {
      const mockResponse = {
        results: [
          { index: "item1", name: "Item 1", url: "/url1" },
          { index: "item2", name: "Item 2", url: "/url2" },
          { index: "item3", name: "Item 3", url: "/url3" },
        ],
      };

      global.fetch = vi.fn().mockResolvedValueOnce({
        json: vi.fn().mockResolvedValueOnce(mockResponse),
      });

      // Mock Math.random to control costs
      const originalRandom = Math.random;
      let callCount = 0;
      Math.random = vi.fn(() => {
        // Return predictable values: 0.2, 0.5, 0.1
        const values = [0.2, 0.5, 0.1];
        return values[callCount++ % values.length];
      });

      const result = await getAllEquipment();

      // Verify sorted: costs should be 101, 251, 51 -> 51, 101, 251
      expect(result[0].cost).toBeLessThanOrEqual(result[1].cost);
      expect(result[1].cost).toBeLessThanOrEqual(result[2].cost);

      Math.random = originalRandom;
    });

    it("should handle empty API response", async () => {
      const mockResponse = { results: [] };

      global.fetch = vi.fn().mockResolvedValueOnce({
        json: vi.fn().mockResolvedValueOnce(mockResponse),
      });

      const result = await getAllEquipment();
      expect(result).toEqual([]);
    });
  });
});
