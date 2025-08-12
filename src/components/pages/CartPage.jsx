import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartItem from "@/components/molecules/CartItem";
import Button from "@/components/atoms/Button";
import Empty from "@/components/ui/Empty";
import { t } from "@/utils/translations";
import { formatCurrency } from "@/utils/formatters";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const CartPage = () => {
  const { language } = useSelector((state) => state.language);
  const { items, total, itemCount } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  if (items.length === 0) {
    return <Empty type="cart" />;
  }

  const shippingCost = total > 2000 ? 0 : 200;
  const tax = Math.round(total * 0.05);
  const grandTotal = total + shippingCost + tax;

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
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            {t("cart", language)}
          </h1>
          <p className="text-gray-600">
            {language === "ur"
              ? `آپ کی ٹوکری میں ${itemCount} اشیاء ہیں`
              : `You have ${itemCount} items in your cart`
            }
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="space-y-4"
            >
              {items.map((cartItem) => (
                <motion.div key={cartItem.id} variants={item}>
                  <CartItem item={cartItem} />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="bg-surface rounded-xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                {language === "ur" ? "آرڈر کا خلاصہ" : "Order Summary"}
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t("subtotal", language)}</span>
                  <span className="font-medium">{formatCurrency(total, language)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">{t("shipping", language)}</span>
                  <span className="font-medium">
                    {shippingCost === 0 ? t("free", language) : formatCurrency(shippingCost, language)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">{t("tax", language)}</span>
                  <span className="font-medium">{formatCurrency(tax, language)}</span>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">{t("total", language)}</span>
                    <span className="text-lg font-bold text-primary">
                      {formatCurrency(grandTotal, language)}
                    </span>
                  </div>
                </div>

                {total < 2000 && (
                  <div className="bg-accent/10 border border-accent/20 rounded-lg p-3">
                    <div className="flex items-start space-x-2">
                      <ApperIcon name="Info" size={16} className="text-accent mt-0.5" />
                      <div className="text-sm">
                        <p className="text-accent font-medium">
                          {language === "ur"
                            ? `Rs ${2000 - total} مزید خریدیں تاکہ مفت ڈیلیوری حاصل کریں!`
                            : `Add Rs ${2000 - total} more for free delivery!`
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <Button
                  size="lg"
                  className="w-full"
                  onClick={() => navigate("/checkout")}
                  icon="CreditCard"
                >
                  {t("checkout", language)}
                </Button>

                <Button
                  size="md"
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate("/")}
                  icon="ArrowLeft"
                >
                  {t("continueShopping", language)}
                </Button>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="bg-surface rounded-xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                {language === "ur" ? "اعتماد کی علامات" : "Why Shop With Us"}
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-success/20 rounded-lg flex items-center justify-center">
                    <ApperIcon name="Shield" size={16} className="text-success" />
                  </div>
                  <span className="text-sm text-gray-700">
                    {language === "ur" ? "محفوظ ادائیگی" : "Secure Payment"}
                  </span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                    <ApperIcon name="Truck" size={16} className="text-primary" />
                  </div>
                  <span className="text-sm text-gray-700">
                    {language === "ur" ? "تیز ڈیلیوری" : "Fast Delivery"}
                  </span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
                    <ApperIcon name="RotateCcw" size={16} className="text-accent" />
                  </div>
                  <span className="text-sm text-gray-700">
                    {language === "ur" ? "آسان واپسی" : "Easy Returns"}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;