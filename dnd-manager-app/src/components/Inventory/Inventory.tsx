import { useState, useEffect, useCallback, useMemo } from "react";
import "./Inventory.css";
import SearchBar from "../shared/SearchBar/SearchBar";
import { PackageOpenIcon } from "lucide-react";
import BuyEquipment from "../BuyEquipment/BuyEquipment";
import type { ExtentedEquipment } from "../../models/EquipmentModel";
import { EquipmentContext } from "../../contexts/EquipmentContext";
import { useStatsContext } from "../../contexts/StatsContext";
import SellEquipment from "../SellEquipment/SellEquipment";
import InventoryList from "../InventoryList/InventoryList";
import Spinner from "../shared/Spinner/Spinner";
import { setCurrentInventory, setMoney as saveMoney } from "../../services/localStorageService";
import { useEquipmentData } from "../../custom-hooks/useEquipmentData";
import { useInventory } from "../../custom-hooks/useInventory";

function Inventory() {
  const { money, setMoney } = useStatsContext();
  const { allFetchedEquipment, isLoading } = useEquipmentData();
  const { equipment, setEquipment } = useInventory(allFetchedEquipment);
  const [filteredEquipment, setFilteredEquipment] = useState<ExtentedEquipment[]>([]);

  // Initialize filtered equipment with full equipment list
  useEffect(() => {
    setFilteredEquipment(equipment);
  }, [equipment]);

  // Derived state: Calculate buyable equipment based on money and owned items
  const buyableEquipment = useMemo(() => {
    const affordableEquipment = allFetchedEquipment.filter((item) => item.cost <= money);
    return affordableEquipment.filter((item) => !equipment.some((owned) => owned.index === item.index));
  }, [allFetchedEquipment, money, equipment]);

  // Buy equipment handler
  const handleBuyEquipment = useCallback(
    (item: ExtentedEquipment) => {
      if (money < item.cost) return;

      const updatedEquipment = [item, ...equipment];
      const newMoney = money - item.cost;

      setEquipment(updatedEquipment);
      setFilteredEquipment(updatedEquipment);
      setCurrentInventory(updatedEquipment);
      setMoney(newMoney);
      saveMoney(newMoney);
    },
    [equipment, money, setMoney]
  );

  // Sell equipment handler
  const handleSellEquipment = useCallback(
    (item: ExtentedEquipment) => {
      const updatedEquipment = equipment.filter((equip) => equip.index !== item.index);
      const newMoney = money + item.cost;

      setEquipment(updatedEquipment);
      setFilteredEquipment(updatedEquipment);
      setCurrentInventory(updatedEquipment);
      setMoney(newMoney);
      saveMoney(newMoney);
    },
    [equipment, money, setMoney]
  );

  // Memoize context value
  const contextValue = useMemo(
    () => ({
      buyEquipment: handleBuyEquipment,
      sellEquipment: handleSellEquipment,
      equipmentInInventory: equipment,
      buyableEquipment,
    }),
    [equipment, buyableEquipment, handleBuyEquipment, handleSellEquipment]
  );

  return (
    <EquipmentContext.Provider value={contextValue}>
      <div className="inventory-section-wrapper">
        <div className="inventory-header">
          <PackageOpenIcon className="inventory-icon" />
          <h2>Inventory</h2>
        </div>
        {isLoading ? <Spinner /> : <InventoryList equipmentList={filteredEquipment} />}
        <SearchBar
          placeholder="Search equipment..."
          listToSearch={equipment}
          setFilteredList={setFilteredEquipment}
          resetFilteredList={() => setFilteredEquipment(equipment)}
        />
        <div className="inventory-buttons">
          <BuyEquipment buttonLabel="Buy Equipment" />
          <SellEquipment buttonLabel="Sell Equipment" />
        </div>
      </div>
    </EquipmentContext.Provider>
  );
}

export default Inventory;
