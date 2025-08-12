import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { categoryService } from "@/services/api/categoryService";
import { productService } from "@/services/api/productService";
import { setLoading, setError, setCategories } from "@/store/slices/productsSlice";
import { t } from "@/utils/translations";

const CategoriesPage = () => {
  const { language } = useSelector((state) => state.language);
  const { categories, loading, error } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [categoryStats, setCategoryStats] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const loadData = async () => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    
    try {
      const [categoriesData, productsData] = await Promise.all([
        categoryService.getAll(),
        productService.getAll()
      ]);
      
      // Calculate category statistics
      const stats = {};
      categoriesData.forEach(category => {
        const productCount = productsData.filter(p => p.category_id === category.Id).length;
        stats[category.Id] = {
          productCount,
          hasDeals: productsData.some(p => p.category_id === category.Id && p.discount_percentage > 0)
        };
      });
      
      setCategoryStats(stats);
      dispatch(setCategories(categoriesData));
    } catch (err) {
      dispatch(setError("Failed to load categories"));
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredCategories = categories.filter(category => {
    const searchLower = searchTerm.toLowerCase();
    return (
      category.name_en.toLowerCase().includes(searchLower) ||
      category.name_ur.toLowerCase().includes(searchLower) ||
      category.description_en.toLowerCase().includes(searchLower) ||
      category.description_ur.toLowerCase().includes(searchLower)
    );
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadData} />;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto">
              <ApperIcon name="Grid3x3" size={40} className="text-white" />
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold">
              {language === "ur" ? "تمام کیٹگریز" : "All Categories"}
            </h1>
            <p className="text-white/90 text-lg max-w-2xl mx-auto">
              {language === "ur" 
                ? "ہماری مختلف قسم کی مصنوعات دریافت کریں" 
                : "Discover our wide range of product categories"
              }
            </p>
            <div className="flex items-center justify-center space-x-4 text-white/80">
              <span>{categories.length} {language === "ur" ? "کیٹگریز" : "categories"}</span>
              <span>•</span>
              <span>{Object.values(categoryStats).reduce((sum, stat) => sum + stat.productCount, 0)} {language === "ur" ? "مصنوعات" : "products"}</span>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="max-w-md mx-auto relative">
            <ApperIcon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={language === "ur" ? "کیٹگری تلاش کریں..." : "Search categories..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        {/* Categories Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredCategories.map((category, index) => (
            <motion.div key={category.Id} variants={item}>
              <div className="group bg-surface rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
                   onClick={() => navigate(`/category/${category.Id}`)}>
                
                {/* Category Image/Icon */}
                <div className="relative h-48 bg-gradient-to-br from-primary/10 to-secondary/10">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <ApperIcon name={category.icon || "Package"} size={32} className="text-primary" />
                    </div>
                  </div>
                  
                  {categoryStats[category.Id]?.hasDeals && (
                    <div className="absolute top-3 right-3">
                      <div className="bg-accent text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                        <ApperIcon name="Tag" size={12} />
                        <span>{language === "ur" ? "آفر" : "Deals"}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Category Info */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                    {language === "ur" ? category.name_ur : category.name_en}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {language === "ur" ? category.description_ur : category.description_en}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {categoryStats[category.Id]?.productCount || 0} {language === "ur" ? "مصنوعات" : "products"}
                    </span>
                    
                    <Button
                      size="sm"
                      variant="ghost"
                      icon="ArrowRight"
                      iconPosition="right"
                      className="group-hover:bg-primary group-hover:text-white"
                    >
                      {language === "ur" ? "دیکھیں" : "View"}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredCategories.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <ApperIcon name="Search" size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              {language === "ur" ? "کوئی کیٹگری نہیں ملی" : "No categories found"}
            </h3>
            <p className="text-gray-600 mb-6">
              {language === "ur" 
                ? "دوسرے کلیدی الفاظ استعمال کرنے کی کوشش کریں"
                : "Try using different search terms"
              }
            </p>
            <Button variant="outline" onClick={() => setSearchTerm("")}>
              {language === "ur" ? "تمام کیٹگریز دیکھیں" : "View All Categories"}
            </Button>
          </div>
        )}

        {/* Popular Actions */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            {language === "ur" ? "مقبول اعمال" : "Popular Actions"}
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/deals")}
              icon="Tag"
              className="h-16"
            >
              {language === "ur" ? "آج کے آفرز" : "Today's Deals"}
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/")}
              icon="TrendingUp"
              className="h-16"
            >
              {language === "ur" ? "مقبول مصنوعات" : "Trending Products"}
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/account")}
              icon="User"
              className="h-16"
            >
              {language === "ur" ? "میرا اکاؤنٹ" : "My Account"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;