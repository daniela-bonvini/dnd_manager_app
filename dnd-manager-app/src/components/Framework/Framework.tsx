import "./Framework.css";
import { useState, useEffect, useMemo } from "react";
import { StatsContext } from "../../contexts/StatsContext";
import { SoundProvider } from "../../contexts/SoundContext";
import AdventurerStats from "../AdventurerStats/AdventurerStats";
import Inventory from "../Inventory/Inventory";
import { financialStates, getFinanceState } from "../../constants/financeConfig";
import { getMoney } from "../../services/localStorageService";

function Framework() {
  const initialMoney = getMoney();

  const [level, setLevel] = useState<number>(2);
  const [money, setMoney] = useState<number>(initialMoney);
  const [adventurerFinanceState, setAdventurerFinanceState] = useState<string>(financialStates.Struggling);

  useEffect(() => {
    const newState = getFinanceState(money);
    if (newState !== adventurerFinanceState) {
      setAdventurerFinanceState(newState);
    }
  }, [money, adventurerFinanceState]);

  const contextValue = useMemo(
    () => ({ adventurerFinanceState, level, setLevel, money, setMoney }),
    [adventurerFinanceState, level, money, setMoney]
  );

  return (
    <SoundProvider>
      <StatsContext.Provider value={contextValue}>
        <div className="dnd-frame">
          <div className="content">
            <h1>D&D Inventory Manager</h1>
            <AdventurerStats />
            <Inventory />
          </div>
        </div>
      </StatsContext.Provider>
    </SoundProvider>
  );
}

export default Framework;
