import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import { motion } from "framer-motion";
import { t } from "@/utils/translations";
import React from "react";

const CategoryGrid = ({ categories }) => {
  const { language } = useSelector((state) => state.language);
  const navigate = useNavigate();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4 mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            {t("categories", language)}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {language === "ur" 
              ? "اپنی پسندیدہ اقسام دریافت کریں اور بہترین مصنوعات تلاش کریں"
              : "Discover your favorite categories and find the best products"
            }
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6"
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={item}
              whileHover={{ y: -8, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(`/category/${category.id}`)}
              className="group cursor-pointer"
            >
              <div className="bg-surface rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center mx-auto group-hover:from-primary group-hover:to-secondary transition-all duration-300">
                  <ApperIcon 
                    name={category.icon} 
                    size={32} 
                    className="text-primary group-hover:text-white transition-colors duration-300"
                  />
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors duration-300">
                    {language === "ur" ? category.name_ur : category.name_en}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {category.productCount || 0} {language === "ur" ? "مصنوعات" : "products"}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CategoryGrid;