import "./Framework.css";
import React from "react";
import { StatsContext } from "../../contexts/StatsContext";
import AdventurerStats from "../AdventurerStats/AdventurerStats";
import Inventory from "../Inventory/Inventory";

function Framework() {
  const [level, setLevel] = React.useState<number>(2);
  const [money, setMoney] = React.useState<number>(300);

  return (
    <>
      <StatsContext.Provider value={{ level, setLevel, money, setMoney }}>
        <div className="dnd-frame">
          <div className="content">
            <h1>D&D Inventory Manager</h1>
            <AdventurerStats></AdventurerStats>
            <Inventory></Inventory>
          </div>
        </div>
      </StatsContext.Provider>
    </>
  );
}

export default Framework;
