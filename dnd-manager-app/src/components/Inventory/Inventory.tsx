import React from "react";
import "./Inventory.css";
import * as dndApiService from "../../services/dndApiService";
import { StatsContext } from "../Framework/Framework";

function Inventory() {
  // effect that fetches tot hardcoded equipment from dnd api service

  const context = React.useContext(StatsContext);
  if (!context) {
    throw new Error("AdventurerStats must be used within StatsContext.Provider");
  }

  const { money, setMoney } = context;
  const [equipment, setEquipment] = React.useState<any[]>([]);

  function fetchEquipment() {
    dndApiService.getAllEquipment().then((data) => {
      setEquipment(data.results);
    });
  }

  return (
    <>
      <div>Inventory</div>
      <button onClick={fetchEquipment}>Load Equipment</button>
      <ul>
        {equipment.map((item) => (
          <li key={item.index}>{item.name}</li>
        ))}
      </ul>
    </>
  );
}

export default Inventory;
