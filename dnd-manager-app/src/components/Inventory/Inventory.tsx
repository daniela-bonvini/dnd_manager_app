import React from "react";
import "./Inventory.css";
import SearchBar from "../shared/SearchBar/SearchBar";
import { PackageOpenIcon } from "lucide-react";
import { startingEquipmentIndexList } from "../../data/data";
import BuyEquipment from "../BuyEquipment/BuyEquipment";
import type { ExtentedEquipment } from "../../models/EquipmentModel";
import { EquipmentContext } from "../../contexts/EquipmentContext";
import { useStatsContext } from "../../contexts/StatsContext";
import SellEquipment from "../SellEquipment/SellEquipment";
import InventoryList from "../InventoryList/InventoryList";
import { getAllEquipment } from "../../services/dndApiService";
import Spinner from "../shared/Spinner/Spinner";
import {
  getAllFetchedEquipment,
  getCurrentInventory,
  setCurrentInventory,
  setAllFetchedEquipment as saveAllFetchedEquipment,
} from "../../services/localStorageService";

function Inventory() {
  const [equipment, setEquipment] = React.useState<ExtentedEquipment[]>([]);
  const [filteredEquipment, setFilteredEquipment] = React.useState<ExtentedEquipment[]>([]);
  const [buyableEquipmentList, setBuyableEquipmentList] = React.useState<ExtentedEquipment[]>([]);
  const [allFetchedEquipment, setAllFetchedEquipment] = React.useState<ExtentedEquipment[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const statsContext = useStatsContext();
  const { money, setMoney } = statsContext;

  const updateBuyableList = React.useCallback(
    (currentMoney: number, currentEquipment: ExtentedEquipment[]) => {
      const affordableEquipment = allFetchedEquipment.filter((item) => item.cost <= currentMoney);
      const affordableNotOwned = affordableEquipment.filter(
        (item) => !currentEquipment.some((owned) => owned.index === item.index)
      );
      setBuyableEquipmentList(affordableNotOwned);
    },
    [allFetchedEquipment]
  );

  React.useEffect(() => {
    const loadAllEquipmentFromStorage = () => {
      const saved = getAllFetchedEquipment();
      if (saved.length > 0) {
        setAllFetchedEquipment(saved);
        return true;
      }
      return false;
    };

    const fetchAndSaveAllEquipment = async () => {
      try {
        setIsLoading(true);
        const allEquipment = await getAllEquipment();
        setAllFetchedEquipment(allEquipment);
        saveAllFetchedEquipment(allEquipment);
      } catch (error) {
        console.error("Error fetching equipment:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!loadAllEquipmentFromStorage()) {
      fetchAndSaveAllEquipment();
    }
  }, []);

  React.useEffect(() => {
    const loadStartingEquipmentFromStorage = () => {
      const saved = getCurrentInventory();
      if (saved.length > 0) {
        setEquipment(saved);
        setFilteredEquipment(saved);
        return true;
      }
      return false;
    };

    loadStartingEquipmentFromStorage();
  }, []);

  React.useEffect(() => {
    if (allFetchedEquipment.length === 0) return;

    const startingEquipment = allFetchedEquipment.filter((item) => startingEquipmentIndexList.includes(item.index));
    setEquipment(startingEquipment);
    setFilteredEquipment(startingEquipment);
    setCurrentInventory(startingEquipment);
  }, [allFetchedEquipment]);

  React.useEffect(() => {
    updateBuyableList(money, equipment);
  }, [allFetchedEquipment, money, equipment, updateBuyableList]);

  function resetFilteredEquipment() {
    setFilteredEquipment(equipment);
  }

  function buyEquipment(item: ExtentedEquipment) {
    const updatedEquipment = [item, ...equipment];
    if (money < item.cost) return;

    const newMoney = money - item.cost;
    setEquipment(updatedEquipment);
    setFilteredEquipment(updatedEquipment);
    const listWithoutBoughtItem = buyableEquipmentList.filter((equip) => equip.index !== item.index);
    const listUpdatedByRemainingMoney = listWithoutBoughtItem.filter((equip) => equip.cost <= newMoney);
    setBuyableEquipmentList(listUpdatedByRemainingMoney);

    // Save to localStorage
    setCurrentInventory(updatedEquipment);
    setMoney(newMoney);
  }

  const contextValue = React.useMemo(
    () => ({
      buyEquipment,
      sellEquipment,
      equipmentInInventory: equipment,
      buyableEquipment: buyableEquipmentList,
    }),
    [equipment, buyableEquipmentList]
  );

  function sellEquipment(item: ExtentedEquipment) {
    const updatedEquipmentList = equipment.filter((equip) => equip.index !== item.index);
    const newMoney = money + item.cost;
    setEquipment(updatedEquipmentList);
    setFilteredEquipment(updatedEquipmentList);

    // Save to localStorage
    setCurrentInventory(updatedEquipmentList);
    setMoney(newMoney);
  }

  return (
    <>
      <EquipmentContext.Provider value={contextValue}>
        <div className="inventory-section-wrapper">
          <div className="inventory-header">
            <PackageOpenIcon className="inventory-icon" />
            <h2>Inventory</h2>
          </div>
          {isLoading ? <Spinner /> : <InventoryList equipmentList={filteredEquipment}></InventoryList>}
          <SearchBar
            placeholder={"Search equipment..."}
            listToSearch={equipment}
            setFilteredList={setFilteredEquipment}
            resetFilteredList={resetFilteredEquipment}
          ></SearchBar>
          <div className="inventory-buttons">
            <BuyEquipment buttonLabel={"Buy Equipment"} />
            <SellEquipment buttonLabel={"Sell Equipment"} />
          </div>
        </div>
      </EquipmentContext.Provider>
    </>
  );
}

export default Inventory;
