import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "@/components/Layout";
import HomePage from "@/components/pages/HomePage";
import CategoryPage from "@/components/pages/CategoryPage";
import CategoriesPage from "@/components/pages/CategoriesPage";
import ProductDetailPage from "@/components/pages/ProductDetailPage";
import CartPage from "@/components/pages/CartPage";
import CheckoutPage from "@/components/pages/CheckoutPage";
import DealsPage from "@/components/pages/DealsPage";
import AccountPage from "@/components/pages/AccountPage";
import SearchResultsPage from "@/components/pages/SearchResultsPage";
import OrderSuccessPage from "@/components/pages/OrderSuccessPage";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const { language, direction } = useSelector((state) => state.language);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
    document.title = language === "ur" 
      ? "دکان گلوبل - اپنی زبان میں خریداری کریں"
      : "Dukaan Global - Shop in Your Language";
  }, [language, direction]);

  return (
    <BrowserRouter>
      <div className={`min-h-screen bg-background transition-all duration-300 ${direction === 'rtl' ? 'font-arabic' : 'font-inter'}`}>
        <Layout>
          <Routes>
<Route path="/" element={<HomePage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/category/:categoryId" element={<CategoryPage />} />
            <Route path="/product/:productId" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/deals" element={<DealsPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="/order-success" element={<OrderSuccessPage />} />
          </Routes>
        </Layout>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={direction === 'rtl'}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          style={{ zIndex: 9999 }}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;