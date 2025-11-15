import "./Framework.css";
import React from "react";
import AdventurerStats from "../AdventurerStats/AdventurerStats";
import Inventory from "../Inventory/Inventory";

// defined outside of function or we create a new context on each re-render
export const StatsContext = React.createContext<
  { level: number; setLevel: (level: number) => void; money: number; setMoney: (money: number) => void } | undefined
>(undefined);

function Framework() {
  const [level, setLevel] = React.useState<number>(1);
  const [money, setMoney] = React.useState<number>(250);

  return (
    <>
      <StatsContext.Provider value={{ level, setLevel, money, setMoney }}>
        <div className="dnd-frame">
          <div className="content">
            <h1>D&D Manager</h1>
            <AdventurerStats></AdventurerStats>
            <Inventory></Inventory>
            <div>spellbook</div>
          </div>
        </div>
      </StatsContext.Provider>
    </>
  );
}

export default Framework;
