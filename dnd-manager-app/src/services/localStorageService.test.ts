import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  getMoney,
  setMoney,
  getCurrentInventory,
  setCurrentInventory,
  getAllFetchedEquipment,
  setAllFetchedEquipment,
  getSoundEnabled,
  setSoundEnabled,
} from "./localStorageService";
import { STORAGE_KEYS } from "../constants/local-storage-keys";
import type { ExtentedEquipment } from "../models/EquipmentModel";

describe("LocalStorageService", () => {
  beforeEach(() => {
    try {
      localStorage.clear();
    } catch (e) {}
    vi.clearAllMocks();
  });

  afterEach(() => {
    try {
      localStorage.clear();
    } catch (e) {}
  });

  describe("getMoney / setMoney", () => {
    it("should return default 300 when no money is saved", () => {
      expect(getMoney()).toBe(300);
    });

    it("should save and retrieve money values", () => {
      setMoney(500);
      expect(getMoney()).toBe(500);
      setMoney(99.99);
      expect(getMoney()).toBe(99.99);
    });

    it("should handle invalid stored data gracefully", () => {
      localStorage.setItem(STORAGE_KEYS.money, "invalid");
      const result = getMoney();
      expect(isNaN(result)).toBe(true);
    });
  });

  describe("getCurrentInventory / setCurrentInventory", () => {
    it("should return empty array when no inventory is saved", () => {
      expect(getCurrentInventory()).toEqual([]);
    });

    it("should save and retrieve inventory", () => {
      const equipment: ExtentedEquipment[] = [
        { index: "sword", name: "Sword", url: "/sword", cost: 100 },
        { index: "shield", name: "Shield", url: "/shield", cost: 50 },
      ];
      setCurrentInventory(equipment);
      expect(getCurrentInventory()).toEqual(equipment);
    });

    it("should handle large equipment lists", () => {
      const equipment = Array.from({ length: 100 }, (_, i) => ({
        index: `item-${i}`,
        name: `Item ${i}`,
        url: `/item-${i}`,
        cost: i * 10,
      }));
      setCurrentInventory(equipment);
      expect(getCurrentInventory()).toHaveLength(100);
    });

    it("should handle corrupted JSON gracefully", () => {
      localStorage.setItem(STORAGE_KEYS.currentInventory, "invalid json {");
      expect(() => getCurrentInventory()).toThrow();
    });
  });

  describe("getAllFetchedEquipment / setAllFetchedEquipment", () => {
    it("should return empty array when no equipment is cached", () => {
      expect(getAllFetchedEquipment()).toEqual([]);
    });

    it("should cache and retrieve equipment list", () => {
      const equipment: ExtentedEquipment[] = [{ index: "armor", name: "Armor", url: "/armor", cost: 200 }];
      setAllFetchedEquipment(equipment);
      expect(getAllFetchedEquipment()).toEqual(equipment);
    });

    it("should overwrite previous cache", () => {
      const oldEquipment: ExtentedEquipment[] = [{ index: "old", name: "Old", url: "/old", cost: 1 }];
      const newEquipment: ExtentedEquipment[] = [{ index: "new", name: "New", url: "/new", cost: 999 }];
      setAllFetchedEquipment(oldEquipment);
      setAllFetchedEquipment(newEquipment);
      expect(getAllFetchedEquipment()).toEqual(newEquipment);
    });

    it("should invalidate cache after 24 hours", () => {
      const equipment: ExtentedEquipment[] = [{ index: "armor", name: "Armor", url: "/armor", cost: 200 }];
      setAllFetchedEquipment(equipment);
      expect(getAllFetchedEquipment()).toEqual(equipment);

      // Simulate cache expiration by setting old timestamp
      const oldTimestamp = Date.now() - 25 * 60 * 60 * 1000; // 25 hours ago
      localStorage.setItem("lastEquipmentFetch", String(oldTimestamp));

      // Should return empty array because cache is expired
      expect(getAllFetchedEquipment()).toEqual([]);
    });

    it("should store cache timestamp when saving equipment", () => {
      const equipment: ExtentedEquipment[] = [{ index: "armor", name: "Armor", url: "/armor", cost: 200 }];
      const beforeTime = Date.now();
      setAllFetchedEquipment(equipment);
      const afterTime = Date.now();

      const storedTimestamp = parseInt(localStorage.getItem("lastEquipmentFetch") || "0");
      expect(storedTimestamp).toBeGreaterThanOrEqual(beforeTime);
      expect(storedTimestamp).toBeLessThanOrEqual(afterTime);
    });
  });

  describe("getSoundEnabled / setSoundEnabled", () => {
    it("should default to true when not set", () => {
      expect(getSoundEnabled()).toBe(true);
    });

    it("should save and retrieve sound setting", () => {
      setSoundEnabled(false);
      expect(getSoundEnabled()).toBe(false);
      setSoundEnabled(true);
      expect(getSoundEnabled()).toBe(true);
    });
  });

  describe("Integration tests", () => {
    it("should persist across multiple operations", () => {
      const equipment: ExtentedEquipment[] = [
        { index: "a", name: "A", url: "/a", cost: 10 },
        { index: "b", name: "B", url: "/b", cost: 20 },
      ];
      setCurrentInventory(equipment);
      setMoney(500);

      // Simulate different parts of app reading data
      const money = getMoney();
      const inventory = getCurrentInventory();

      expect(money).toBe(500);
      expect(inventory).toHaveLength(2);
    });
  });
});
