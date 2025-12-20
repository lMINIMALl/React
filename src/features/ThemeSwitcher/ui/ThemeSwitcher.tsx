import { useTheme } from '../../../shared/lib/theme/useTheme';
import "./ThemeSwitcher.css"; 

export const ThemeSwitcher = () => { 
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <p>Текущая тема: {theme}</p>
      <button className="button" onClick={toggleTheme}>
        Переключить тему на {theme === 'светлая' ? 'темную' : 'светлую'}
      </button>
    </div>
  );
};
