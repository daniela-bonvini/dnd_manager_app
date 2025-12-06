import "./Framework.css";
import React from "react";
import { StatsContext } from "../../contexts/StatsContext";
import { SoundProvider } from "../../contexts/SoundContext";
import AdventurerStats from "../AdventurerStats/AdventurerStats";
import Inventory from "../Inventory/Inventory";
import { financialStates, getFinanceState } from "../../constants/financeConfig";
import { getMoney } from "../../services/localStorageService";

function Framework() {
  const initialMoney = getMoney();

  const [level, setLevel] = React.useState<number>(2);
  const [money, setMoney] = React.useState<number>(initialMoney);
  const [adventurerFinanceState, setAdventurerFinanceState] = React.useState<string>(financialStates.Struggling);

  React.useEffect(() => {
    const newState = getFinanceState(money);
    if (newState !== adventurerFinanceState) {
      setAdventurerFinanceState(newState);
    }
  }, [money, adventurerFinanceState, setAdventurerFinanceState]);

  return (
    <>
      <SoundProvider>
        <StatsContext.Provider value={{ adventurerFinanceState, level, setLevel, money, setMoney }}>
          <div className="dnd-frame">
            <div className="content">
              <h1>D&D Inventory Manager</h1>
              <AdventurerStats></AdventurerStats>
              <Inventory></Inventory>
            </div>
          </div>
        </StatsContext.Provider>
      </SoundProvider>
    </>
  );
}

export default Framework;
