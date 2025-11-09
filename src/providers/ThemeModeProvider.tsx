import { ThemeProvider } from "@mui/material";
import { useEffect, useState, type ReactNode } from "react";
import { darkTheme, lightTheme } from "../theme";
import { ThemeModeContext, type ThemeModes } from "../hooks/useThemeContext";

export function ThemeModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeModes>(localStorage.getItem("themeMode") as "light" | "dark" || "light");

  const theme = (mode === "light") ? lightTheme : darkTheme;
  
  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);


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