import { STORAGE_KEYS } from "../constants/local-storage-keys";
import type { ExtentedEquipment } from "../models/EquipmentModel";

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
  return saved ? JSON.parse(saved) : [];
}

export function setAllFetchedEquipment(equipment: ExtentedEquipment[]): void {
  localStorage.setItem(STORAGE_KEYS.allFetchedEquipment, JSON.stringify(equipment));
}

export function getSoundEnabled(): boolean {
  return localStorage.getItem(STORAGE_KEYS.soundEnabled) !== "false";
}

export function setSoundEnabled(enabled: boolean): void {
  localStorage.setItem(STORAGE_KEYS.soundEnabled, String(enabled));
}
