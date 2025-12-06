import React from "react";
import { getSoundEnabled, setSoundEnabled } from "../services/localStorageService";

interface SoundContextType {
  isSoundEnabled: boolean;
  toggleSound: () => void;
}

export const SoundContext = React.createContext<SoundContextType | undefined>(undefined);

export function useSoundContext() {
  const context = React.useContext(SoundContext);
  if (!context) {
    throw new Error("useSoundContext must be used within SoundProvider");
  }
  return context;
}

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [isSoundEnabled, setIsSoundEnabled] = React.useState(() => {
    return getSoundEnabled();
  });

  function toggleSound() {
    const newState = !isSoundEnabled;
    setIsSoundEnabled(newState);
    setSoundEnabled(newState);
  }

  return <SoundContext.Provider value={{ isSoundEnabled, toggleSound }}>{children}</SoundContext.Provider>;
}
