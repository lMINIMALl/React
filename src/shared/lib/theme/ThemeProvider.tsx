import { useState, useEffect, type ReactNode } from "react";
import { ThemeContext } from "./ThemeContext";
import type { Theme } from "./ThemeContext";

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>("светлая");

  const toggleTheme = () => {
    setTheme(prev => (prev === "светлая" ? "темная" : "светлая"));
  };

  useEffect(() => {
    document.body.className = theme === "светлая" ? "light-theme" : "dark-theme";
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
