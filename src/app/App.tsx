import { ThemeProvider } from "../shared/lib/theme/ThemeContext";
import { AppRouter } from "./providers/router/AppRouter";
import { BrowserRouter } from "react-router-dom";

export const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </ThemeProvider>
  );
};
export default App;