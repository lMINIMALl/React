import type { FC, ReactNode } from "react";
import { useState, useEffect } from "react";
import { ThemeContext } from "./ThemeContext";
import type { Theme } from "./ThemeContext";

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("светлая");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "светлая" ? "темная" : "светлая"));
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
