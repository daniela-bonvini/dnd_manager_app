import { STORAGE_KEYS } from "../constants/local-storage-keys";
import type { ExtentedEquipment } from "../models/EquipmentModel";

const CACHE_DURATION_HOURS = 24;
const CACHE_TIMESTAMP_KEY = "lastEquipmentFetch";

export function getMoney(): number {
  return Number(localStorage.getItem(STORAGE_KEYS.money) || 300);
}

export function setMoney(money: number): void {
  localStorage.setItem(STORAGE_KEYS.money, JSON.stringify(money));
}

export function getCurrentInventory(): ExtentedEquipment[] {
  const saved = localStorage.getItem(STORAGE_KEYS.currentInventory);
  return saved ? JSON.parse(saved) : [];
}

export function setCurrentInventory(equipment: ExtentedEquipment[]): void {
  localStorage.setItem(STORAGE_KEYS.currentInventory, JSON.stringify(equipment));
}

export function getAllFetchedEquipment(): ExtentedEquipment[] {
  const saved = localStorage.getItem(STORAGE_KEYS.allFetchedEquipment);
  const lastFetch = localStorage.getItem(CACHE_TIMESTAMP_KEY);

  // Check if cache is still valid
  if (lastFetch && saved) {
    const cacheAge = Date.now() - parseInt(lastFetch);
    const cacheExpired = cacheAge > CACHE_DURATION_HOURS * 60 * 60 * 1000;

    if (!cacheExpired) {
      return JSON.parse(saved);
    }
  }

  return [];
}

export function setAllFetchedEquipment(equipment: ExtentedEquipment[]): void {
  localStorage.setItem(STORAGE_KEYS.allFetchedEquipment, JSON.stringify(equipment));
  localStorage.setItem(CACHE_TIMESTAMP_KEY, String(Date.now()));
}

export function getSoundEnabled(): boolean {
  return localStorage.getItem(STORAGE_KEYS.soundEnabled) !== "false";
}

export function setSoundEnabled(enabled: boolean): void {
  localStorage.setItem(STORAGE_KEYS.soundEnabled, String(enabled));
}
