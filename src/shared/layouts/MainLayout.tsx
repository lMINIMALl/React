import React, { useEffect } from "react";
import Header from "../../widgets/LayoutHeader/Header";
import Footer from "../../widgets/LayoutFooter/Footer";
import { useTheme } from "../lib/theme/useTheme";

type Props = {
  children: React.ReactNode;
};

function MainLayout({ children }: Props) {
  const { theme } = useTheme();

  useEffect(() => {
    document.body.className = theme === "светлая" ? "light-theme" : "dark-theme";
  }, [theme]);

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default MainLayout;
