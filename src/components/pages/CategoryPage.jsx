import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProductGrid from "@/components/organisms/ProductGrid";
import { setLoading, setError, setProducts, setFilters } from "@/store/slices/productsSlice";
import { productService } from "@/services/api/productService";
import { categoryService } from "@/services/api/categoryService";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { t } from "@/utils/translations";
import { motion } from "framer-motion";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const { language } = useSelector((state) => state.language);
  const { products, loading, error, filters } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  
  const [category, setCategory] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [localFilters, setLocalFilters] = useState({
    priceRange: [0, 10000],
    sortBy: "featured",
  });

  const loadCategoryData = async () => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    
    try {
      const [categoryData, productsData] = await Promise.all([
        categoryService.getById(categoryId),
        productService.getByCategory(categoryId)
      ]);
      
      setCategory(categoryData);
      dispatch(setProducts(productsData));
    } catch (err) {
      dispatch(setError("Failed to load category data"));
    }
  };

  const applyFilters = () => {
    dispatch(setFilters(localFilters));
    setShowFilters(false);
  };

  const sortOptions = [
    { value: "featured", label: t("featured", language) },
    { value: "price_low", label: t("priceLowToHigh", language) },
    { value: "price_high", label: t("priceHighToLow", language) },
    { value: "newest", label: t("newest", language) },
  ];

  useEffect(() => {
    if (categoryId) {
      loadCategoryData();
    }
  }, [categoryId]);

  const filteredProducts = products.filter(product => {
    const matchesPrice = product.price >= localFilters.priceRange[0] && 
                        product.price <= localFilters.priceRange[1];
    return matchesPrice;
  }).sort((a, b) => {
    switch (localFilters.sortBy) {
      case "price_low":
        return a.price - b.price;
      case "price_high":
        return b.price - a.price;
      case "newest":
        return new Date(b.createdAt) - new Date(a.createdAt);
      default:
        return b.featured ? 1 : -1;
    }
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Category Header */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            {category && (
              <>
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto">
                  <ApperIcon name={category.icon} size={40} className="text-white" />
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold">
                  {language === "ur" ? category.name_ur : category.name_en}
                </h1>
                <p className="text-white/90 text-lg max-w-2xl mx-auto">
                  {language === "ur" ? category.description_ur : category.description_en}
                </p>
                <div className="flex items-center justify-center space-x-4 text-white/80">
                  <span>{products.length} {language === "ur" ? "مصنوعات" : "products"}</span>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-80">
            <div className="bg-surface rounded-xl shadow-lg p-6 space-y-6 sticky top-24">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  {t("filter", language)}
                </h3>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setLocalFilters({
                    priceRange: [0, 10000],
                    sortBy: "featured"
                  })}
                >
                  Reset
                </Button>
              </div>

              {/* Price Range */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">
                  {t("priceRange", language)}
                </label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    value={localFilters.priceRange[1]}
                    onChange={(e) => setLocalFilters(prev => ({
                      ...prev,
                      priceRange: [prev.priceRange[0], parseInt(e.target.value)]
                    }))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Rs {localFilters.priceRange[0]}</span>
                    <span>Rs {localFilters.priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Sort Options */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">
                  {t("sortBy", language)}
                </label>
                <select
                  value={localFilters.sortBy}
                  onChange={(e) => setLocalFilters(prev => ({
                    ...prev,
                    sortBy: e.target.value
                  }))}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <Button
                className="w-full"
                onClick={applyFilters}
                icon="Filter"
              >
                Apply Filters
              </Button>
            </div>
          </div>

          {/* Mobile Filter Toggle */}
          <div className="lg:hidden">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              icon="Filter"
              className="w-full"
            >
              {t("filter", language)}
            </Button>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-600">
                {language === "ur" 
                  ? `${filteredProducts.length} مصنوعات ملیں`
                  : `${filteredProducts.length} products found`
                }
              </p>
            </div>

            <ProductGrid 
              products={filteredProducts}
              loading={loading}
              error={error}
              onRetry={loadCategoryData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;