import { describe, it, expect } from "vitest";
import { getFinanceState, financialStates } from "./financeConfig";

describe("getFinanceState", () => {
  it("should handle boundary values correctly", () => {
    expect(getFinanceState(0)).toBe(financialStates.Bankrupt);
    expect(getFinanceState(150)).toBe(financialStates.Poor);
    expect(getFinanceState(151)).toBe(financialStates.Struggling);
    expect(getFinanceState(300)).toBe(financialStates.Struggling);
    expect(getFinanceState(301)).toBe(financialStates.Wealthy);
    expect(getFinanceState(500)).toBe(financialStates.Wealthy);
    expect(getFinanceState(501)).toBe(financialStates.Rich);
  });

  it("should handle extreme values", () => {
    expect(getFinanceState(-1)).toBe(financialStates.Bankrupt);
    expect(getFinanceState(999999)).toBe(financialStates.Rich);
  });
});
