import React from "react";
import "./Inventory.css";
import * as dndApiService from "../../services/dndApiService";
import { StatsContext } from "../Framework/Framework";
import SearchBar from "../SearchBar";
import { PackageOpenIcon } from "lucide-react";
import { startingEquipmentIndexList } from "../../data/data";

function Inventory() {
  const [equipment, setEquipment] = React.useState<any[]>([]);
  const hasFetchedStartingEquipment = React.useRef(false);

  React.useEffect(() => {
    if (hasFetchedStartingEquipment.current) return;
    hasFetchedStartingEquipment.current = true;

    async function loadStartingEquipment() {
      const results = await Promise.all(startingEquipmentIndexList.map((index) => dndApiService.getEquipment(index)));
      setEquipment(results.filter(Boolean));
    }

    loadStartingEquipment();
  }, []);

  const context = React.useContext(StatsContext);
  if (!context) {
    throw new Error("AdventurerStats must be used within StatsContext.Provider");
  }

  return (
    <>
      <div>
        <div>
          <PackageOpenIcon />
          <h2>Inventory</h2>
        </div>
        <div>
          <SearchBar></SearchBar>
          {/* skeleton? */}
          <ul>
            {equipment.map((item) => (
              <li key={item.index}>{item.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Inventory;
