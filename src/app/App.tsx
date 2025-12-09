import React from "react";
import MainLayout from "../shared/layouts/MainLayout";
import { ThemeProvider } from "../shared/lib/theme/ThemeContext";
import { useTheme } from "../shared/lib/theme/useTheme";
import PostList from "../widgets/PostList/PostList";

import "./App.css";

const MainContent = () => {
  const { theme } = useTheme();

  React.useEffect(() => {
    document.body.className =
      theme === "светлая" ? "light-theme" : "dark-theme";
  }, [theme]);

  return (
    <main>
      <h1>Список постов</h1>
      <PostList />
    </main>
  );
};

const AppContent = () => (
  <MainLayout>
    <MainContent />
  </MainLayout>
);

const App = () => (
  <ThemeProvider>
    <AppContent />
  </ThemeProvider>
);

export default App;
