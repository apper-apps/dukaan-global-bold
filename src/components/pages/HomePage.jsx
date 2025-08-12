import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeroSection from "@/components/organisms/HeroSection";
import CategoryGrid from "@/components/organisms/CategoryGrid";
import ProductGrid from "@/components/organisms/ProductGrid";
import { setCategories, setError, setFeaturedProducts, setLoading, setProducts } from "@/store/slices/productsSlice";
import { productService } from "@/services/api/productService";
import { categoryService } from "@/services/api/categoryService";
import { t } from "@/utils/translations";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import Icon from "@/components/atoms/Icon";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { language } = useSelector((state) => state.language);
  const { products, categories, featuredProducts, loading, error } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loadData = async () => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    
    try {
      const [productsData, categoriesData] = await Promise.all([
        productService.getAll(),
        categoryService.getAll()
      ]);
      
      dispatch(setProducts(productsData));
      dispatch(setCategories(categoriesData));
      dispatch(setFeaturedProducts(productsData.filter(p => p.featured).slice(0, 8)));
    } catch (err) {
      dispatch(setError("Failed to load homepage data"));
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Categories Section */}
      <CategoryGrid categories={categories} />

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4 mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              {t("featured", language)} {language === "ur" ? "مصنوعات" : "Products"}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {language === "ur"
                ? "ہمارے منتخب کردہ بہترین مصنوعات دیکھیں"
                : "Discover our handpicked selection of premium products"
              }
            </p>
          </motion.div>

          <ProductGrid 
            products={featuredProducts} 
            loading={loading}
            error={error}
            onRetry={loadData}
          />

          <div className="text-center mt-12">
            <Button
              size="lg"
              onClick={() => navigate("/categories")}
              icon="ArrowRight"
              iconPosition="right"
            >
              {language === "ur" ? "تمام مصنوعات دیکھیں" : "View All Products"}
            </Button>
          </div>
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="py-16 bg-gradient-to-r from-accent/10 to-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  {language === "ur" ? "خصوصی پیشکش" : "Special Deals"}
                </h2>
                <p className="text-gray-600 text-lg">
                  {language === "ur"
                    ? "محدود وقت کے لیے شاندار رعایت حاصل کریں"
                    : "Get amazing discounts for a limited time only"
                  }
                </p>
              </div>

              <div className="space-y-4">
<div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-success rounded-lg flex items-center justify-center">
                    <Icon name="Check" size={24} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {language === "ur" ? "مفت ڈیلیوری" : "Free Delivery"}
                    </h4>
                    <p className="text-gray-600">
                      {language === "ur" ? "Rs 2000 سے زیادہ آرڈر پر" : "On orders above Rs 2000"}
                    </p>
                  </div>
                </div>

<div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                    <Icon name="Percent" size={24} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {language === "ur" ? "50% تک رعایت" : "Up to 50% Off"}
                    </h4>
                    <p className="text-gray-600">
                      {language === "ur" ? "منتخب اشیاء پر" : "On selected items"}
                    </p>
                  </div>
                </div>
              </div>

              <Button
                size="lg"
                variant="accent"
                onClick={() => navigate("/deals")}
                icon="Tag"
              >
                {t("deals", language)} {language === "ur" ? "دیکھیں" : "View"}
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl p-8 flex items-center justify-center">
<div className="text-center space-y-6">
                  <div className="w-32 h-32 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center mx-auto shadow-2xl">
                    <Icon name="Gift" size={64} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {language === "ur" ? "خاص تحائف" : "Special Gifts"}
                    </h3>
                    <p className="text-gray-600 mt-2">
                      {language === "ur" ? "ہر آرڈر کے ساتھ" : "With every order"}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;