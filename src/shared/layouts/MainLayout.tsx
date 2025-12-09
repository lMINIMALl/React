import Header from "../../widgets/LayoutHeader/Header";
import Footer from "../../widgets/LayoutFooter/Footer";

type Props = {
  children: React.ReactNode;
};

function MainLayout({ children }: Props) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default MainLayout;
