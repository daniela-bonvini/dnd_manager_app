import React from "react";
import "./Inventory.css";
import * as dndApiService from "../../services/dndApiService";
import SearchBar from "../SearchBar/SearchBar";
import { PackageOpenIcon } from "lucide-react";
import { startingEquipmentIndexList } from "../../data/data";
import BuyEquipment from "../BuyEquipment/BuyEquipment";
import type { ExtentedEquipment } from "../../models/EquipmentModel";
import { EquipmentContext } from "../../contexts/EquipmentContext";
import { useStatsContext } from "../../contexts/StatsContext";
import SellEquipment from "../SellEquipment/SellEquipment";
import InventoryList from "../InventoryList/InventoryList";
import { getAllEquipment } from "../../services/dndApiService";
import Spinner from "../Spinner/Spinner";

//think about moving here  money management too and removing spells and equipment management from framework
function Inventory() {
  const [equipment, setEquipment] = React.useState<ExtentedEquipment[]>([]);
  const [filteredEquipment, setFilteredEquipment] = React.useState<ExtentedEquipment[]>([]);
  const [buyableEquipmentList, setBuyableEquipmentList] = React.useState<ExtentedEquipment[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const hasFetchedStartingEquipment = React.useRef(false);

  const statsContext = useStatsContext();
  const { money } = statsContext;

  React.useEffect(() => {
    if (hasFetchedStartingEquipment.current) return;
    hasFetchedStartingEquipment.current = true;

    async function loadStartingEquipment() {
      try {
        setIsLoading(true);
        const results = await Promise.all(startingEquipmentIndexList.map((index) => dndApiService.getEquipment(index)));
        setEquipment(results.filter(Boolean));
        setFilteredEquipment(results.filter(Boolean));
      } finally {
        setIsLoading(false);
      }
    }

    async function fetchBuyableEquipment() {
      try {
        setIsLoading(true);
        const allEquipment = await getAllEquipment();
        const affordableEquipment = allEquipment.filter((item: ExtentedEquipment) => item.cost <= money);
        const affordableEquipmentNotInInventory = affordableEquipment.filter(
          (item) => !equipment.some((ownedItem) => ownedItem.index === item.index)
        );
        setBuyableEquipmentList(affordableEquipmentNotInInventory);
      } catch (error) {
        console.error("Error fetching equipment:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadStartingEquipment();
    fetchBuyableEquipment();
  }, [equipment, money]);

  function resetFilteredEquipment() {
    setFilteredEquipment(equipment);
  }

  function buyEquipment(item: ExtentedEquipment) {
    const updatedEquipment = [item, ...equipment];
    if (money < item.cost) return;

    setEquipment(updatedEquipment);
    setFilteredEquipment(updatedEquipment);
    const listWithoutBoughtItem = buyableEquipmentList.filter((equip) => equip.index !== item.index);
    const listUpdatedByRemainingMoney = listWithoutBoughtItem.filter((equip) => equip.cost <= money - item.cost);
    setBuyableEquipmentList(listUpdatedByRemainingMoney);
    statsContext.setMoney(money - item.cost);
  }

  function sellEquipment(item: ExtentedEquipment) {
    const updatedEquipmentList = equipment.filter((equip) => equip.index !== item.index);
    setEquipment(updatedEquipmentList);
    setFilteredEquipment(updatedEquipmentList);
    statsContext.setMoney(money + item.cost);
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
