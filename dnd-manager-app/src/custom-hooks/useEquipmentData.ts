import { useState, useEffect } from "react";
import type { ExtentedEquipment } from "../models/EquipmentModel";
import { getAllEquipment } from "../services/dndApiService";
import { getAllFetchedEquipment, setAllFetchedEquipment as saveAllFetchedEquipment } from "../services/localStorageService";

/**
 * Hook for loading and caching equipment data from API
 * Tries to load from localStorage cache first, then fetches from API if needed
 * @returns Object containing all fetched equipment and loading state
 */
export function useEquipmentData() {
  const [allFetchedEquipment, setAllFetchedEquipment] = useState<ExtentedEquipment[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadEquipmentData = async () => {
      // Try to load from cache first
      const cached = getAllFetchedEquipment();
      if (cached.length > 0) {
        setAllFetchedEquipment(cached);
        return;
      }

      // Fetch from API if not cached
      try {
        setIsLoading(true);
        const data = await getAllEquipment();
        setAllFetchedEquipment(data);
        saveAllFetchedEquipment(data);
      } catch (error) {
        console.error("Error fetching equipment:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadEquipmentData();
  }, []);

  return { allFetchedEquipment, isLoading };
}
