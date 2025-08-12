import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LanguageToggle from "@/components/molecules/LanguageToggle";
import SearchBar from "@/components/molecules/SearchBar";
import ApperIcon from "@/components/ApperIcon";
import { t } from "@/utils/translations";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const { language, direction } = useSelector((state) => state.language);
  const { itemCount } = useSelector((state) => state.cart);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (query) => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

const navigationItems = [
    { key: "shop", path: "/", icon: "Home" },
    { key: "categories", path: "/categories", icon: "Grid3x3" },
    { key: "deals", path: "/deals", icon: "Tag" },
    { key: "account", path: "/account", icon: "User" },
  ];

  return (
    <header className="bg-surface shadow-lg sticky top-0 z-40 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
              <ApperIcon name="ShoppingBag" className="text-white" size={24} />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-900">
                {language === "ur" ? "دکان گلوبل" : "Dukaan Global"}
              </h1>
              <p className="text-xs text-gray-600">
                {language === "ur" ? "اپنی زبان میں خریداری" : "Shop in Your Language"}
              </p>
            </div>
          </Link>

          {/* Desktop Search */}
<div className="hidden lg:block flex-1 max-w-2xl mx-8">
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                className="flex items-center space-x-2 text-gray-700 hover:text-primary transition-colors duration-200"
              >
                <ApperIcon name={item.icon} size={18} />
                <span className="font-medium">{t(item.key, language)}</span>
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <LanguageToggle />
            
            {/* Cart */}
            <Link 
              to="/cart" 
              className="relative p-2 text-gray-700 hover:text-primary transition-colors duration-200"
            >
              <ApperIcon name="ShoppingCart" size={24} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white text-xs rounded-full flex items-center justify-center">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-primary"
            >
              <ApperIcon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="lg:hidden pb-4">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-surface border-t border-gray-200"
          >
            <nav className="px-4 py-4 space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.key}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors duration-200"
                >
                  <ApperIcon name={item.icon} size={20} />
                  <span className="font-medium">{t(item.key, language)}</span>
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;