import React from "react";
import type { ExtentedEquipment } from "../../models/EquipmentModel";

export const InventoryContext = React.createContext<{
  addEquipment: (item: ExtentedEquipment) => void;
} | null>(null);

export function useInventory() {
  const context = React.useContext(InventoryContext);
  if (!context) {
    throw new Error("useInventory must be used within InventoryProvider");
  }
  return context;
}
