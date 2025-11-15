import React from "react";
import "./Inventory.css";
import * as dndApiService from "../../services/dndApiService";
import { StatsContext } from "../Framework/Framework";
import SearchBar from "../SearchBar";
import { PackageOpenIcon } from "lucide-react";
import { startingEquipmentIndexList } from "../../data/data";
import AddButton from "../AddButton/AddButton";
import type { ExtentedEquipment } from "../../models/EquipmentModel";
import { InventoryContext } from "./InventoryContext";

//think about moving here  money management too and removing spells and equipment management from framework
function Inventory() {
  const [equipment, setEquipment] = React.useState<ExtentedEquipment[]>([]);
  const [filteredEquipment, setFilteredEquipment] = React.useState<ExtentedEquipment[]>([]);
  const hasFetchedStartingEquipment = React.useRef(false);

  const context = React.useContext(StatsContext);
  if (!context) {
    throw new Error("AdventurerStats must be used within StatsContext.Provider");
  }

  React.useEffect(() => {
    if (hasFetchedStartingEquipment.current) return;
    hasFetchedStartingEquipment.current = true;

    async function loadStartingEquipment() {
      const results = await Promise.all(startingEquipmentIndexList.map((index) => dndApiService.getEquipment(index)));
      setEquipment(results.filter(Boolean));
      setFilteredEquipment(results.filter(Boolean));
    }

    loadStartingEquipment();
  }, []);

  function resetFilteredEquipment() {
    setFilteredEquipment(equipment);
  }

  function handleSelectEquipment(item: ExtentedEquipment) {
    setEquipment([...equipment, item]);
    context.money -= item.cost;
  }

  return (
    <>
      <InventoryContext.Provider value={{ addEquipment: handleSelectEquipment }}>
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
                  <li key={item.index}>{item.name}</li>
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
          <AddButton buttonLabel={"Add Equipment"} money={context.money} />
        </div>
      </InventoryContext.Provider>
    </>
  );
}

export default Inventory;
