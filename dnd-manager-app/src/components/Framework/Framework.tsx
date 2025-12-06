import "./Framework.css";
import React from "react";
import { StatsContext } from "../../contexts/StatsContext";
import AdventurerStats from "../AdventurerStats/AdventurerStats";
import Inventory from "../Inventory/Inventory";

function Framework() {
  const savedMoney = localStorage.getItem("localSavedMoney");
  const initialMoney = savedMoney ? JSON.parse(savedMoney) : 300;

  const [level, setLevel] = React.useState<number>(2);
  const [money, setMoney] = React.useState<number>(initialMoney);
  const [adventurerFinanceState, setAdventurerFinanceState] = React.useState<string>("Wealthy");

  const financialStates: Record<string, string> = {
    Bankrupt: "Bankrupt",
    Poor: "Poor",
    Struggling: "Struggling",
    Wealthy: "Wealthy",
    Rich: "Rich",
  };

  React.useEffect(() => {
    const financeBands = [
      { max: 0, label: financialStates.Bankrupt },
      { max: 150, label: financialStates.Poor },
      { max: 300, label: financialStates.Struggling },
      { max: 500, label: financialStates.Wealthy },
      { max: Infinity, label: financialStates.Rich },
    ];

    function getFinanceState(amount: number): string {
      for (const band of financeBands) {
        if (amount <= band.max) return band.label;
      }
      return financialStates.Rich;
    }

    const newState = getFinanceState(money);
    if (newState !== adventurerFinanceState) {
      setAdventurerFinanceState(newState);
    }
  }, [money, adventurerFinanceState, setAdventurerFinanceState]);

  return (
    <>
      <StatsContext.Provider value={{ adventurerFinanceState, level, setLevel, money, setMoney }}>
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
