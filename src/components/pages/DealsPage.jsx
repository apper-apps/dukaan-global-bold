import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import ProductGrid from "@/components/organisms/ProductGrid";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import { productService } from "@/services/api/productService";
import { setLoading, setError, setDealProducts } from "@/store/slices/productsSlice";
import { t } from "@/utils/translations";
import { formatCurrency } from "@/utils/formatters";

const DealsPage = () => {
  const { language } = useSelector((state) => state.language);
  const { dealProducts, loading, error } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  
  const [filter, setFilter] = useState('all');
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  const loadDeals = async () => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    
    try {
      const deals = await productService.getDeals();
      dispatch(setDealProducts(deals));
    } catch (err) {
      dispatch(setError("Failed to load deals"));
    }
  };

  useEffect(() => {
    loadDeals();

    // Countdown timer
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const filteredDeals = dealProducts.filter(product => {
    if (filter === 'all') return true;
    if (filter === 'mega') return product.discount_percentage >= 50;
    if (filter === 'flash') return product.discount_percentage >= 30 && product.discount_percentage < 50;
    if (filter === 'clearance') return product.discount_percentage >= 70;
    return true;
  });

  const dealCategories = [
    { key: 'all', label: language === "ur" ? "تمام آفرز" : "All Deals", count: dealProducts.length },
    { key: 'mega', label: language === "ur" ? "میگا ڈیل" : "Mega Deals", count: dealProducts.filter(p => p.discount_percentage >= 50).length },
    { key: 'flash', label: language === "ur" ? "فلیش سیل" : "Flash Sale", count: dealProducts.filter(p => p.discount_percentage >= 30 && p.discount_percentage < 50).length },
    { key: 'clearance', label: language === "ur" ? "کلیئرنس" : "Clearance", count: dealProducts.filter(p => p.discount_percentage >= 70).length },
  ];

  const totalSavings = dealProducts.reduce((total, product) => {
    const originalPrice = product.price / (1 - product.discount_percentage / 100);
    return total + (originalPrice - product.price);
  }, 0);

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

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-accent via-accent/90 to-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto">
              <ApperIcon name="Tag" size={40} className="text-white" />
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold">
              {language === "ur" ? "آج کے بہترین آفرز" : "Today's Best Deals"}
            </h1>
            
            <p className="text-white/90 text-lg max-w-2xl mx-auto">
              {language === "ur" 
                ? "محدود وقت کے آفرز - جلدی کریں!" 
                : "Limited time offers - Hurry up!"
              }
            </p>

            {/* Countdown Timer */}
            <div className="flex items-center justify-center space-x-4 mt-8">
              <div className="text-center">
                <div className="bg-white/20 rounded-lg px-4 py-2">
                  <div className="text-2xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</div>
                  <div className="text-xs uppercase">{language === "ur" ? "گھنٹے" : "Hours"}</div>
                </div>
              </div>
              <div className="text-2xl">:</div>
              <div className="text-center">
                <div className="bg-white/20 rounded-lg px-4 py-2">
                  <div className="text-2xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</div>
                  <div className="text-xs uppercase">{language === "ur" ? "منٹ" : "Minutes"}</div>
                </div>
              </div>
              <div className="text-2xl">:</div>
              <div className="text-center">
                <div className="bg-white/20 rounded-lg px-4 py-2">
                  <div className="text-2xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</div>
                  <div className="text-xs uppercase">{language === "ur" ? "سیکنڈ" : "Seconds"}</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-6 text-white/80">
              <div className="flex items-center space-x-2">
                <ApperIcon name="Zap" size={16} />
                <span>{dealProducts.length} {language === "ur" ? "آفرز" : "deals"}</span>
              </div>
              <span>•</span>
              <div className="flex items-center space-x-2">
                <ApperIcon name="DollarSign" size={16} />
                <span>{language === "ur" ? "کل بچت:" : "Total Savings:"} {formatCurrency(totalSavings, language)}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Deal Categories */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-4">
            {dealCategories.map(category => (
              <Button
                key={category.key}
                variant={filter === category.key ? "primary" : "outline"}
                onClick={() => setFilter(category.key)}
                className="relative"
              >
                {category.label}
                {category.count > 0 && (
                  <Badge variant="accent" className="ml-2">
                    {category.count}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </div>

        {/* Special Offers Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-primary to-secondary text-white rounded-2xl p-8 mb-12 text-center"
        >
          <ApperIcon name="Gift" size={48} className="mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">
            {language === "ur" ? "خاص پیشکش!" : "Special Offer!"}
          </h2>
          <p className="mb-4">
            {language === "ur" 
              ? "Rs 3000 سے زیادہ خرید کرنے پر مفت ڈیلیوری + 5% اضافی رعایت"
              : "Free delivery + 5% extra discount on orders above Rs 3000"
            }
          </p>
          <Badge variant="accent" size="lg">
            {language === "ur" ? "محدود وقت" : "Limited Time"}
          </Badge>
        </motion.div>

        {/* Deals Grid */}
        <ProductGrid 
          products={filteredDeals}
          loading={loading}
          error={error}
          onRetry={loadDeals}
        />

        {/* No Deals Message */}
        {filteredDeals.length === 0 && !loading && (
          <div className="text-center py-12">
            <ApperIcon name="Tag" size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              {language === "ur" ? "اس کیٹگری میں کوئی آفر نہیں" : "No deals in this category"}
            </h3>
            <p className="text-gray-600 mb-6">
              {language === "ur" 
                ? "دوسری کیٹگری چیک کریں یا بعد میں دوبارہ آئیں"
                : "Check other categories or come back later for new deals"
              }
            </p>
            <Button variant="outline" onClick={() => setFilter('all')}>
              {language === "ur" ? "تمام آفرز دیکھیں" : "View All Deals"}
            </Button>
          </div>
        )}

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface rounded-2xl shadow-lg p-8 mt-16 text-center"
        >
          <ApperIcon name="Bell" size={48} className="text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            {language === "ur" ? "آفرز کی اطلاع پائیں" : "Get Deal Notifications"}
          </h3>
          <p className="text-gray-600 mb-6">
            {language === "ur" 
              ? "نئے آفرز اور خصوصی ڈسکاؤنٹ کی پہلی اطلاع پائیں"
              : "Be the first to know about new deals and exclusive discounts"
            }
          </p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder={language === "ur" ? "آپ کا ای میل" : "Your email"}
              className="flex-1 px-4 py-3 border border-gray-200 rounded-l-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <Button className="rounded-l-none">
              {language === "ur" ? "سبسکرائب کریں" : "Subscribe"}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DealsPage;