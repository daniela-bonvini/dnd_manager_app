import React from "react";
import "./Inventory.css";
import * as dndApiService from "../../services/dndApiService";
import SearchBar from "../SearchBar";
import { PackageOpenIcon } from "lucide-react";
import { startingEquipmentIndexList } from "../../data/data";
import BuyEquipment from "../BuyEquipment/BuyEquipment";
import type { ExtentedEquipment } from "../../models/EquipmentModel";
import { EquipmentContext } from "../../contexts/EquipmentContext";
import { useStatsContext } from "../../contexts/StatsContext";
import SellEquipment from "../SellEquipment/SellEquipment";

//think about moving here  money management too and removing spells and equipment management from framework
function Inventory() {
  const [equipment, setEquipment] = React.useState<ExtentedEquipment[]>([]);
  const [filteredEquipment, setFilteredEquipment] = React.useState<ExtentedEquipment[]>([]);
  const hasFetchedStartingEquipment = React.useRef(false);

  const statsContext = useStatsContext();

  React.useEffect(() => {
    if (hasFetchedStartingEquipment.current) return;
    hasFetchedStartingEquipment.current = true;

    async function loadStartingEquipment() {
      const results = await Promise.all(startingEquipmentIndexList.map((index) => dndApiService.getEquipment(index)));
      console.log("Loaded starting equipment:", results);
      setEquipment(results.filter(Boolean));
      setFilteredEquipment(results.filter(Boolean));
    }

    loadStartingEquipment();
  }, []);

  function resetFilteredEquipment() {
    setFilteredEquipment(equipment);
  }

  function buyEquipment(item: ExtentedEquipment) {
    const updatedEquipment = [...equipment, item];
    setEquipment(updatedEquipment);
    setFilteredEquipment(updatedEquipment);
    statsContext.setMoney(statsContext.money - item.cost);
  }

  function sellEquipment(item: ExtentedEquipment) {
    const updatedEquipmentList = equipment.filter((equip) => equip.index !== item.index);
    setEquipment(updatedEquipmentList);
    setFilteredEquipment(updatedEquipmentList);
    statsContext.setMoney(statsContext.money + item.cost);
  }

  return (
    <>
      <EquipmentContext.Provider value={{ buyEquipment: buyEquipment, sellEquipment: sellEquipment, equipmentInInventory: equipment }}>
        <div>
          <div>
            <PackageOpenIcon />
            <h2>Inventory</h2>
          </div>
          <div>
            {/* skeleton? */}
            {filteredEquipment.length === 0 ? (
              <p>No results found</p>
            ) : (
              <ul>
                {filteredEquipment.map((item) => (
                  <li key={item.index}>
                    {item.name} : {item.cost} gold
                  </li>
                ))}
              </ul>
            )}
          </div>
          <SearchBar
            placeholder={"Search equipment..."}
            listToSearch={equipment}
            setFilteredList={setFilteredEquipment}
            resetFilteredList={resetFilteredEquipment}
          ></SearchBar>
          <BuyEquipment buttonLabel={"Buy Equipment"} />
          <SellEquipment buttonLabel={"Sell Equipment"} />
        </div>
      </EquipmentContext.Provider>
    </>
  );
}

export default Inventory;
