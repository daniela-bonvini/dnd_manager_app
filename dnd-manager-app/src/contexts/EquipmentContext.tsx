import React from "react";
import type { ExtentedEquipment } from "../models/EquipmentModel";

export const EquipmentContext = React.createContext<{
  equipmentInInventory: ExtentedEquipment[];
  buyEquipment: (item: ExtentedEquipment) => void;
  sellEquipment: (item: ExtentedEquipment) => void;
} | null>(null);

export function useEquipmentContext() {
  const context = React.useContext(EquipmentContext);
  if (!context) {
    throw new Error("useEquipmentContext must be used within EquipmentContext.Provider");
  }
  return context;
}
