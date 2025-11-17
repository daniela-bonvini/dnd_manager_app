import React from "react";
import "./Inventory.css";
import * as dndApiService from "../../services/dndApiService";
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

const STORAGE_KEYS = {
  startingEquipment: "localSavedEquipment",
  allFetchedEquipment: "localSavedFetchedEquipment",
  currentInventory: "localCurrentInventory",
  money: "localSavedMoney",
};

function Inventory() {
  const [equipment, setEquipment] = React.useState<ExtentedEquipment[]>([]);
  const [filteredEquipment, setFilteredEquipment] = React.useState<ExtentedEquipment[]>([]);
  const [buyableEquipmentList, setBuyableEquipmentList] = React.useState<ExtentedEquipment[]>([]);
  const [allFetchedEquipment, setAllFetchedEquipment] = React.useState<ExtentedEquipment[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const hasFetchedStartingEquipment = React.useRef(false);

  const statsContext = useStatsContext();
  const { money, setMoney } = statsContext;

  const updateBuyableList = React.useCallback(
    (currentMoney: number, currentEquipment: ExtentedEquipment[]) => {
      const affordableEquipment = allFetchedEquipment.filter((item) => item.cost <= currentMoney);
      const affordableNotOwned = affordableEquipment.filter((item) => !currentEquipment.some((owned) => owned.index === item.index));
      setBuyableEquipmentList(affordableNotOwned);
    },
    [allFetchedEquipment]
  );

  React.useEffect(() => {
    if (hasFetchedStartingEquipment.current) return;
    hasFetchedStartingEquipment.current = true;

    const loadStartingEquipmentFromStorage = () => {
      const saved = localStorage.getItem(STORAGE_KEYS.currentInventory);
      if (saved) {
        const parsed: ExtentedEquipment[] = JSON.parse(saved);
        setEquipment(parsed);
        setFilteredEquipment(parsed);
        return true;
      }
      return false;
    };

    const fetchAndSaveStartingEquipment = async () => {
      try {
        setIsLoading(true);
        const results = await Promise.all(startingEquipmentIndexList.map((index) => dndApiService.getEquipment(index)));
        const filtered = results.filter(Boolean);
        setEquipment(filtered);
        setFilteredEquipment(filtered);
        localStorage.setItem(STORAGE_KEYS.currentInventory, JSON.stringify(filtered));
      } finally {
        setIsLoading(false);
      }
    };

    if (!loadStartingEquipmentFromStorage()) {
      fetchAndSaveStartingEquipment();
    }
  }, []);

  React.useEffect(() => {
    const loadAllEquipmentFromStorage = () => {
      const saved = localStorage.getItem(STORAGE_KEYS.allFetchedEquipment);
      if (saved) {
        const parsed: ExtentedEquipment[] = JSON.parse(saved);
        setAllFetchedEquipment(parsed);
        return true;
      }
      return false;
    };

    const fetchAndSaveAllEquipment = async () => {
      try {
        setIsLoading(true);
        const allEquipment = await getAllEquipment();
        setAllFetchedEquipment(allEquipment);
        localStorage.setItem(STORAGE_KEYS.allFetchedEquipment, JSON.stringify(allEquipment));
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
    setMoney(newMoney);

    // Save to localStorage
    localStorage.setItem(STORAGE_KEYS.currentInventory, JSON.stringify(updatedEquipment));
    localStorage.setItem(STORAGE_KEYS.money, JSON.stringify(newMoney));
  }

  function sellEquipment(item: ExtentedEquipment) {
    const updatedEquipmentList = equipment.filter((equip) => equip.index !== item.index);
    const newMoney = money + item.cost;
    setEquipment(updatedEquipmentList);
    setFilteredEquipment(updatedEquipmentList);
    setMoney(newMoney);

    // Save to localStorage
    localStorage.setItem(STORAGE_KEYS.currentInventory, JSON.stringify(updatedEquipmentList));
    localStorage.setItem(STORAGE_KEYS.money, JSON.stringify(newMoney));
  }

  return (
    <>
      <EquipmentContext.Provider
        value={{
          buyEquipment: buyEquipment,
          sellEquipment: sellEquipment,
          equipmentInInventory: equipment,
          buyableEquipment: buyableEquipmentList,
        }}
      >
        <div className="inventory-section-wrapper">
          <div className="inventory-header">
            <PackageOpenIcon />
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
