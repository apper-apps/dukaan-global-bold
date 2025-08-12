import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import { addRecentOrder } from "@/store/slices/cartSlice";
import { t } from "@/utils/translations";
import { formatCurrency, formatDate } from "@/utils/formatters";

const OrderSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useSelector((state) => state.language);
  const dispatch = useDispatch();
  
  const orderDetails = location.state?.orderDetails;

  useEffect(() => {
    if (orderDetails) {
      // Add order to recent orders
      dispatch(addRecentOrder({
        id: orderDetails.orderId,
        date: new Date().toISOString(),
        status: 'processing',
        total: orderDetails.total,
        items: orderDetails.items.length
      }));
    }
  }, [orderDetails, dispatch]);

  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <ApperIcon name="AlertTriangle" size={48} className="text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-gray-900 mb-2">
            {language === "ur" ? "آرڈر کی تفصیلات نہیں ملیں" : "Order details not found"}
          </h2>
          <Button onClick={() => navigate("/")}>
            {language === "ur" ? "ہوم پیج واپس جائیں" : "Go to Homepage"}
          </Button>
        </div>
      </div>
    );
  }

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 3);

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-surface rounded-2xl shadow-lg overflow-hidden"
        >
          {/* Success Header */}
          <div className="bg-gradient-to-r from-success to-success/80 text-white p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <ApperIcon name="CheckCircle" size={40} />
            </motion.div>
            
            <h1 className="text-3xl font-bold mb-2">
              {language === "ur" ? "آرڈر کامیاب!" : "Order Successful!"}
            </h1>
            
            <p className="text-white/90 text-lg">
              {language === "ur" 
                ? "آپ کا آرڈر کامیابی سے موصول ہو گیا ہے"
                : "Your order has been successfully placed"
              }
            </p>
          </div>

          {/* Order Details */}
          <div className="p-8 space-y-8">
            {/* Order Info */}
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
                <ApperIcon name="Package" size={20} />
                <span className="font-medium">#{orderDetails.orderId}</span>
              </div>
              
              <p className="text-gray-600">
                {language === "ur" ? "آرڈر تاریخ:" : "Order Date:"} {formatDate(new Date(), language)}
              </p>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                  <ApperIcon name="Check" size={16} className="text-white" />
                </div>
                <span className="text-xs mt-2 text-center">
                  {language === "ur" ? "آرڈر موصول" : "Order Received"}
                </span>
              </div>
              
              <div className="flex-1 h-px bg-gray-200 mx-4"></div>
              
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-warning rounded-full flex items-center justify-center">
                  <ApperIcon name="Package" size={16} className="text-white" />
                </div>
                <span className="text-xs mt-2 text-center">
                  {language === "ur" ? "تیار کیا جا رہا" : "Processing"}
                </span>
              </div>
              
              <div className="flex-1 h-px bg-gray-200 mx-4"></div>
              
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <ApperIcon name="Truck" size={16} className="text-white" />
                </div>
                <span className="text-xs mt-2 text-center">
                  {language === "ur" ? "بھیجا گیا" : "Shipped"}
                </span>
              </div>
              
              <div className="flex-1 h-px bg-gray-200 mx-4"></div>
              
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <ApperIcon name="Home" size={16} className="text-white" />
                </div>
                <span className="text-xs mt-2 text-center">
                  {language === "ur" ? "پہنچا دیا گیا" : "Delivered"}
                </span>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                    <ApperIcon name="Clock" size={16} />
                    <span>{language === "ur" ? "متوقع ڈیلیوری" : "Estimated Delivery"}</span>
                  </h3>
                  <p className="text-gray-600">
                    {formatDate(estimatedDelivery, language)}
                  </p>
                  <Badge variant="info" className="mt-2">
                    {language === "ur" ? "2-3 کاروباری دن" : "2-3 Business Days"}
                  </Badge>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                    <ApperIcon name="CreditCard" size={16} />
                    <span>{language === "ur" ? "ادائیگی کی تصدیق" : "Payment Confirmed"}</span>
                  </h3>
                  <p className="text-gray-600">
                    {formatCurrency(orderDetails.total, language)}
                  </p>
                  <Badge variant="success" className="mt-2">
                    {language === "ur" ? "ادا شدہ" : "Paid"}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                {language === "ur" ? "آرڈر کا خلاصہ" : "Order Summary"}
              </h3>
              
              <div className="space-y-4">
                {orderDetails.items.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">
                        {language === "ur" ? item.title_ur : item.title_en}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {language === "ur" ? "مقدار:" : "Qty:"} {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatCurrency(item.price * item.quantity, language)}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">
                    {language === "ur" ? "کل رقم:" : "Total Amount:"}
                  </span>
                  <span className="text-lg font-bold text-primary">
                    {formatCurrency(orderDetails.total, language)}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/account")}
                icon="User"
                className="w-full"
              >
                {language === "ur" ? "آرڈرز دیکھیں" : "View My Orders"}
              </Button>
              
              <Button
                size="lg"
                onClick={() => navigate("/")}
                icon="ShoppingBag"
                className="w-full"
              >
                {language === "ur" ? "خرید مزید جاری رکھیں" : "Continue Shopping"}
              </Button>
            </div>

            {/* Thank You Note */}
            <div className="text-center p-6 bg-primary/5 rounded-xl">
              <ApperIcon name="Heart" size={32} className="text-primary mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {language === "ur" ? "آپ کا شکریہ!" : "Thank You!"}
              </h3>
              <p className="text-gray-600">
                {language === "ur" 
                  ? "ہمارے ساتھ خریداری کرنے کا شکریہ۔ ہم آپ کے آرڈر کو جلد پہنچانے کی کوشش کریں گے۔"
                  : "Thank you for shopping with us. We'll work hard to deliver your order soon."
                }
              </p>
            </div>
          </div>
        </motion.div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-8"
        >
          <p className="text-gray-600 mb-4">
            {language === "ur" 
              ? "کوئی سوال؟ ہم یہاں مدد کے لیے ہیں!"
              : "Have questions? We're here to help!"
            }
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="outline" size="sm" icon="Phone">
              {language === "ur" ? "کال کریں" : "Call Support"}
            </Button>
            <Button variant="outline" size="sm" icon="MessageCircle">
              {language === "ur" ? "چیٹ کریں" : "Live Chat"}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;