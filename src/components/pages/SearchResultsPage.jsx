import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import ProductGrid from "@/components/organisms/ProductGrid";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import { productService } from "@/services/api/productService";
import { categoryService } from "@/services/api/categoryService";
import { setSearchLoading, setError, setSearchResults, setSearchQuery } from "@/store/slices/productsSlice";
import { t } from "@/utils/translations";

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { language } = useSelector((state) => state.language);
  const { searchResults, searchLoading, error, searchQuery } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || 'all',
    priceRange: [0, 50000],
    sortBy: 'relevance',
    rating: 0,
    availability: 'all'
  });

  const query = searchParams.get('q') || '';

  const performSearch = async () => {
    if (!query.trim()) return;

    dispatch(setSearchLoading(true));
    dispatch(setError(null));
    dispatch(setSearchQuery(query));
    
    try {
      const [results, categoriesData] = await Promise.all([
        productService.search(query, filters),
        categoryService.getAll()
      ]);
      
      dispatch(setSearchResults(results));
      setCategories(categoriesData);
    } catch (err) {
      dispatch(setError("Failed to search products"));
    }
  };

  useEffect(() => {
    if (query) {
      performSearch();
    }
  }, [query, filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      category: 'all',
      priceRange: [0, 50000],
      sortBy: 'relevance',
      rating: 0,
      availability: 'all'
    });
  };

  const sortOptions = [
    { value: 'relevance', label: language === "ur" ? "متعلقہ" : "Relevance" },
    { value: 'price_low', label: language === "ur" ? "کم قیمت" : "Price: Low to High" },
    { value: 'price_high', label: language === "ur" ? "زیادہ قیمت" : "Price: High to Low" },
    { value: 'rating', label: language === "ur" ? "ریٹنگ" : "Customer Rating" },
    { value: 'newest', label: language === "ur" ? "تازہ ترین" : "Newest First" },
  ];

  const ratingOptions = [
    { value: 0, label: language === "ur" ? "تمام ریٹنگ" : "All Ratings" },
    { value: 4, label: language === "ur" ? "4 ستارے اور اوپر" : "4 Stars & Up" },
    { value: 3, label: language === "ur" ? "3 ستارے اور اوپر" : "3 Stars & Up" },
    { value: 2, label: language === "ur" ? "2 ستارے اور اوپر" : "2 Stars & Up" },
  ];

  if (!query) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <ApperIcon name="Search" size={48} className="text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-gray-900 mb-2">
            {language === "ur" ? "کچھ تلاش کریں" : "Search for something"}
          </h2>
          <Button onClick={() => navigate("/")}>
            {language === "ur" ? "واپس ہوم پیج" : "Go to Homepage"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Search Header */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            <ApperIcon name="Search" size={40} className="mx-auto" />
            <h1 className="text-4xl lg:text-5xl font-bold">
              {language === "ur" ? "تلاش کے نتائج" : "Search Results"}
            </h1>
            <p className="text-white/90 text-lg">
              {language === "ur" 
                ? `"${query}" کے لیے ${searchResults.length} نتائج ملے`
                : `${searchResults.length} results found for "${query}"`
              }
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80">
            <div className="bg-surface rounded-xl shadow-lg p-6 space-y-6 sticky top-24">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  {t("filter", language)}
                </h3>
                <Button size="sm" variant="ghost" onClick={clearFilters}>
                  {language === "ur" ? "صاف کریں" : "Clear All"}
                </Button>
              </div>

              {/* Category Filter */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">
                  {t("category", language)}
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="all">{language === "ur" ? "تمام کیٹگریز" : "All Categories"}</option>
                  {categories.map(category => (
                    <option key={category.Id} value={category.Id}>
                      {language === "ur" ? category.name_ur : category.name_en}
                    </option>
                  ))}
                </select>
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
                    max="50000"
                    value={filters.priceRange[1]}
                    onChange={(e) => handleFilterChange('priceRange', [0, parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Rs 0</span>
                    <span>Rs {filters.priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Rating Filter */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">
                  {language === "ur" ? "ریٹنگ" : "Rating"}
                </label>
                <select
                  value={filters.rating}
                  onChange={(e) => handleFilterChange('rating', parseInt(e.target.value))}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {ratingOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Availability Filter */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">
                  {language === "ur" ? "دستیابی" : "Availability"}
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="availability"
                      value="all"
                      checked={filters.availability === 'all'}
                      onChange={(e) => handleFilterChange('availability', e.target.value)}
                      className="mr-2"
                    />
                    {language === "ur" ? "تمام" : "All"}
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="availability"
                      value="inStock"
                      checked={filters.availability === 'inStock'}
                      onChange={(e) => handleFilterChange('availability', e.target.value)}
                      className="mr-2"
                    />
                    {language === "ur" ? "اسٹاک میں" : "In Stock"}
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Results Area */}
          <div className="flex-1">
            {/* Search Info & Sort */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {language === "ur" ? `"${query}" کے لیے نتائج` : `Results for "${query}"`}
                </h2>
                <p className="text-gray-600">
                  {language === "ur" 
                    ? `${searchResults.length} مصنوعات ملیں`
                    : `${searchResults.length} products found`
                  }
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <label className="text-sm text-gray-700 whitespace-nowrap">
                  {t("sortBy", language)}:
                </label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Active Filters */}
            <div className="flex flex-wrap gap-2 mb-6">
              {filters.category !== 'all' && (
                <Badge variant="primary" className="flex items-center space-x-1">
                  <span>{categories.find(c => c.Id == filters.category)?.name_en}</span>
                  <button onClick={() => handleFilterChange('category', 'all')}>
                    <ApperIcon name="X" size={12} />
                  </button>
                </Badge>
              )}
              {filters.rating > 0 && (
                <Badge variant="primary" className="flex items-center space-x-1">
                  <span>{filters.rating}+ {language === "ur" ? "ستارے" : "Stars"}</span>
                  <button onClick={() => handleFilterChange('rating', 0)}>
                    <ApperIcon name="X" size={12} />
                  </button>
                </Badge>
              )}
              {filters.availability === 'inStock' && (
                <Badge variant="primary" className="flex items-center space-x-1">
                  <span>{language === "ur" ? "اسٹاک میں" : "In Stock"}</span>
                  <button onClick={() => handleFilterChange('availability', 'all')}>
                    <ApperIcon name="X" size={12} />
                  </button>
                </Badge>
              )}
            </div>

            {/* Search Results */}
            <ProductGrid 
              products={searchResults}
              loading={searchLoading}
              error={error}
              onRetry={performSearch}
            />

            {/* No Results */}
            {searchResults.length === 0 && !searchLoading && (
              <div className="text-center py-12">
                <ApperIcon name="Search" size={48} className="text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  {language === "ur" ? "کوئی نتیجہ نہیں ملا" : "No results found"}
                </h3>
                <p className="text-gray-600 mb-6">
                  {language === "ur" 
                    ? "مختلف کلیدی الفاظ آزمائیں یا فلٹرز ہٹائیں"
                    : "Try different keywords or remove some filters"
                  }
                </p>
                <div className="space-x-3">
                  <Button variant="outline" onClick={clearFilters}>
                    {language === "ur" ? "فلٹرز صاف کریں" : "Clear Filters"}
                  </Button>
                  <Button onClick={() => navigate("/")}>
                    {language === "ur" ? "ہوم پیج" : "Go Home"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;