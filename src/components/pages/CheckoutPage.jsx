import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "@/store/slices/cartSlice";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { t } from "@/utils/translations";
import { formatCurrency } from "@/utils/formatters";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const CheckoutPage = () => {
  const { language } = useSelector((state) => state.language);
  const { items, total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cod");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate order processing
    setTimeout(() => {
      dispatch(clearCart());
      toast.success(t("orderPlaced", language));
      navigate("/");
      setIsProcessing(false);
    }, 2000);
  };

  const shippingCost = total > 2000 ? 0 : 200;
  const tax = Math.round(total * 0.05);
  const grandTotal = total + shippingCost + tax;

  const paymentMethods = [
    { id: "cod", name: language === "ur" ? "ڈیلیوری پر ادائیگی" : "Cash on Delivery", icon: "Banknote" },
    { id: "card", name: language === "ur" ? "کریڈٹ/ڈیبٹ کارڈ" : "Credit/Debit Card", icon: "CreditCard" },
    { id: "bank", name: language === "ur" ? "بینک ٹرانسفر" : "Bank Transfer", icon: "Building2" },
  ];

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            {t("checkout", language)}
          </h1>
          <p className="text-gray-600">
            {language === "ur" 
              ? "اپنا آرڈر مکمل کریں"
              : "Complete your order"
            }
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Billing Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-surface rounded-xl shadow-lg p-6"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  {language === "ur" ? "بلنگ کی تفصیلات" : "Billing Details"}
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label={t("firstName", language)}
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                  
                  <Input
                    label={t("lastName", language)}
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                  
                  <Input
                    label={t("email", language)}
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  
                  <Input
                    label={t("phone", language)}
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                  
                  <div className="md:col-span-2">
                    <Input
                      label={t("address", language)}
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <Input
                    label={t("city", language)}
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                  
                  <Input
                    label={t("state", language)}
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                  />
                  
                  <Input
                    label={t("zipCode", language)}
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </motion.div>

              {/* Payment Method */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-surface rounded-xl shadow-lg p-6"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  {language === "ur" ? "ادائیگی کا طریقہ" : "Payment Method"}
                </h2>

                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedPaymentMethod === method.id
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={selectedPaymentMethod === method.id}
                        onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                        className="sr-only"
                      />
                      
                      <div className="flex items-center space-x-3 flex-1">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          selectedPaymentMethod === method.id
                            ? "bg-primary text-white"
                            : "bg-gray-100 text-gray-600"
                        }`}>
                          <ApperIcon name={method.icon} size={20} />
                        </div>
                        
                        <span className="font-medium text-gray-900">
                          {method.name}
                        </span>
                      </div>
                      
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedPaymentMethod === method.id
                          ? "border-primary"
                          : "border-gray-300"
                      }`}>
                        {selectedPaymentMethod === method.id && (
                          <div className="w-3 h-3 rounded-full bg-primary"></div>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
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

                {/* Order Items */}
                <div className="space-y-3 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <img
                        src={item.images[0]}
                        alt={language === "ur" ? item.title_ur : item.title_en}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {language === "ur" ? item.title_ur : item.title_en}
                        </p>
                        <p className="text-sm text-gray-600">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="text-sm font-medium">
                        {formatCurrency(item.price * item.quantity, language)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 border-t pt-4">
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

                  <div className="border-t pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-gray-900">{t("total", language)}</span>
                      <span className="text-lg font-bold text-primary">
                        {formatCurrency(grandTotal, language)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Place Order Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full mt-6"
                  loading={isProcessing}
                  icon="ShoppingBag"
                >
                  {language === "ur" ? "آرڈر دیں" : "Place Order"}
                </Button>

                <div className="text-center text-sm text-gray-500 mt-4">
                  {language === "ur"
                    ? "آرڈر دینے سے آپ ہماری شرائط سے متفق ہیں"
                    : "By placing order, you agree to our terms and conditions"
                  }
                </div>
              </div>
            </motion.div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;