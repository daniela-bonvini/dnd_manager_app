import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useToggle from "./use-toggle";

describe("useToggle", () => {
  it("should initialize with provided value or default to false", () => {
    const { result: defaultResult } = renderHook(() => useToggle());
    expect(defaultResult.current[0]).toBe(false);

    const { result: providedResult } = renderHook(() => useToggle(true));
    expect(providedResult.current[0]).toBe(true);
  });

  it("should toggle value when toggleValue is called", () => {
    const { result } = renderHook(() => useToggle(false));
    expect(result.current[0]).toBe(false);

    act(() => {
      result.current[1]();
    });

    expect(result.current[0]).toBe(true);

    act(() => {
      result.current[1]();
    });

    expect(result.current[0]).toBe(false);
  });

  it("should warn if initialized with non-boolean value", () => {
    const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    renderHook(() => useToggle("invalid" as any));
    expect(consoleSpy).toHaveBeenCalledWith("Invalid type for useToggle");
    consoleSpy.mockRestore();
  });
});
