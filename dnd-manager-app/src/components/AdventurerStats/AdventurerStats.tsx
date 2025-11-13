import React from "react";
import "./AdventurerStats.css";
import { StatsContext } from "../Framework/Framework";

function AdventurerStats() {
  const context = React.useContext(StatsContext);

  if (!context) {
    throw new Error("AdventurerStats must be used within StatsContext.Provider");
  }

  const { level, setLevel, money, setMoney } = context;
  return (
    <>
      <div className="adventurer-stats">
        <div className="adventurer-stats__item">
          <label>LEVEL: </label>
          <span>{level}</span>
        </div>
        <div className="adventurer-stats__item">
          <label>MONEY: </label>
          <span>{money}</span>
        </div>
      </div>
    </>
  );
}

export default AdventurerStats;
