import { useSelector } from "react-redux";
import Header from "@/components/organisms/Header";
import Footer from "@/components/organisms/Footer";
import LoadingOverlay from "@/components/ui/LoadingOverlay";

const Layout = ({ children }) => {
  const { isLoading } = useSelector((state) => state.language);

  return (
    <div className="min-h-screen flex flex-col dir-transition">
      {isLoading && <LoadingOverlay />}
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;