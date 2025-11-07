import { createContext, useContext } from "react";

export type ThemeModes = "light" | "dark";

type ThemeModeContextType = {
  mode: ThemeModes;
  setMode: (mode: ThemeModes) => void;
} | null;

export const ThemeModeContext = createContext<ThemeModeContextType>(null);

export function useThemeModeContext() {
  const context = useContext(ThemeModeContext);
  
  if (context === null) {
    throw new Error("No value provided to themeContext")
  }

  return context;
}