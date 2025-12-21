import { createContext, useState } from 'react';
import type {ReactNode} from 'react';

export type Theme = 'светлая' | 'темная';

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>('светлая');

  const toggleTheme = () => setTheme(prev => (prev === 'светлая' ? 'темная' : 'светлая'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
