import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "@/components/atoms/Button";
import { t } from "@/utils/translations";
import { motion } from "framer-motion";
import React from "react";
import Icon from "@/components/atoms/Icon";

const HeroSection = () => {
  const { language } = useSelector((state) => state.language);
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-secondary to-primary/80 text-white">
      <div className="absolute inset-0 bg-black/10"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl lg:text-6xl font-bold leading-tight"
              >
                {t("heroTitle", language)}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl lg:text-2xl text-white/90 leading-relaxed"
              >
                {t("heroSubtitle", language)}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="xl"
                variant="secondary"
                onClick={() => navigate("/categories")}
                icon="ShoppingBag"
              >
                {t("shopNow", language)}
              </Button>
              
              <Button
                size="xl"
                variant="ghost"
                className="text-white border-white hover:bg-white hover:text-primary"
                onClick={() => navigate("/deals")}
                icon="Tag"
              >
                {t("deals", language)}
              </Button>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-6 pt-8"
            >
              {[
                { icon: "Languages", text: language === "ur" ? "دو زبانوں میں" : "Bilingual Support" },
                { icon: "Truck", text: language === "ur" ? "تیز ڈیلیوری" : "Fast Delivery" },
                { icon: "Shield", text: language === "ur" ? "محفوظ ادائیگی" : "Secure Payment" },
].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 text-white/90">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <Icon name={feature.icon} size={16} />
                  </div>
                  <span className="font-medium">{feature.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
              <div className="w-full h-full bg-gradient-to-br from-white/20 to-white/5 rounded-2xl flex items-center justify-center">
<div className="text-center space-y-6">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                    <Icon name="Globe" size={48} className="text-white" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">
                      {language === "ur" ? "عالمی معیار" : "Global Quality"}
                    </h3>
                    <p className="text-white/80">
                      {language === "ur" ? "پاکستان کے لیے" : "For Pakistan"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity }}
className="absolute -top-6 -right-6 w-16 h-16 bg-accent rounded-full flex items-center justify-center"
            >
              <Icon name="Star" size={24} className="text-white" />
            </motion.div>
            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
className="absolute -bottom-4 -left-4 w-12 h-12 bg-warning rounded-full flex items-center justify-center"
            >
              <Icon name="Heart" size={20} className="text-white" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;