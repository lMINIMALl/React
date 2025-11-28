import type { FC } from "react";
import { useState } from "react";
import { ThemeContext } from "./ThemeContext";
import type { Theme } from "./ThemeContext";

export const ThemeProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("светлая");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "светлая" ? "темная" : "светлая"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div data-theme={theme}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
