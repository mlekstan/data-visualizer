import { ThemeProvider } from "@mui/material";
import { useState, type ReactNode } from "react";
import { darkTheme, lightTheme } from "../theme";
import { ThemeModeContext, type ThemeModes } from "../hooks/useThemeContext";

export function ThemeModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeModes>("light");

  const theme = (mode === "light") ? lightTheme : darkTheme;

  return (
    <ThemeModeContext.Provider 
      value={{
        mode,
        setMode: (mode) => setMode(mode)
      }}
    >
      <ThemeProvider theme={theme}>
        { children }
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}