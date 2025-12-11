import { useState, useEffect } from "react";
import type { ExtentedEquipment } from "../models/EquipmentModel";
import { startingEquipmentIndexList } from "../data/data";
import { getCurrentInventory, setCurrentInventory } from "../services/localStorageService";

/**
 * Hook for managing user inventory
 * Loads saved inventory from localStorage or initializes with starting equipment
 * @param allFetchedEquipment - All available equipment to use for initialization
 * @returns Object containing user equipment and setter function
 */
export function useInventory(allFetchedEquipment: ExtentedEquipment[]) {
  const [equipment, setEquipment] = useState<ExtentedEquipment[]>([]);

  // Load starting inventory on mount
  useEffect(() => {
    const saved = getCurrentInventory();
    if (saved.length > 0) {
      setEquipment(saved);
      return;
    }

    // Initialize with starting equipment if no saved inventory
    if (allFetchedEquipment.length > 0) {
      const startingEquipment = allFetchedEquipment.filter((item) => startingEquipmentIndexList.includes(item.index));
      setEquipment(startingEquipment);
      setCurrentInventory(startingEquipment);
    }
  }, [allFetchedEquipment]);

  return { equipment, setEquipment };
}
