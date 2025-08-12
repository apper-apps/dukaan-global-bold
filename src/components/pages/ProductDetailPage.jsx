import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { productService } from "@/services/api/productService";
import { t } from "@/utils/translations";
import { formatCurrency } from "@/utils/formatters";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const { language } = useSelector((state) => state.language);
  const dispatch = useDispatch();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  const loadProduct = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const productData = await productService.getById(productId);
      setProduct(productData);
    } catch (err) {
      setError("Failed to load product details");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity }));
    toast.success(t("addedToCart", language));
  };

  const handleBuyNow = () => {
    dispatch(addToCart({ product, quantity }));
    // Navigate to checkout would be implemented here
    toast.success(t("addedToCart", language));
  };

  useEffect(() => {
    if (productId) {
      loadProduct();
    }
  }, [productId]);

  if (loading) {
    return <Loading variant="page" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadProduct} />;
  }

  if (!product) {
    return <Error message="Product not found" />;
  }

  const title = language === "ur" ? product.title_ur : product.title_en;
  const description = language === "ur" ? product.description_ur : product.description_en;

  const tabs = [
    { key: "description", label: t("description", language), icon: "FileText" },
    { key: "specifications", label: t("specifications", language), icon: "Settings" },
    { key: "reviews", label: t("reviews", language), icon: "Star" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="aspect-square bg-surface rounded-2xl overflow-hidden shadow-lg">
              <img
                src={product.images[selectedImageIndex]}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Grid */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    selectedImageIndex === index
                      ? "border-primary shadow-md"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Badges */}
            {product.badges && product.badges.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.badges.map((badge, index) => (
                  <Badge 
                    key={index}
                    variant={badge.type || "primary"}
                  >
                    {language === "ur" ? badge.label_ur : badge.label_en}
                  </Badge>
                ))}
              </div>
            )}

            {/* Title */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                {title}
              </h1>
              <p className="text-gray-600 mt-2">{description}</p>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-primary">
                  {formatCurrency(product.price, language)}
                </span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      {formatCurrency(product.originalPrice, language)}
                    </span>
                    <Badge variant="accent" size="md">
                      Save {formatCurrency(product.originalPrice - product.price, language)}
                    </Badge>
                  </>
                )}
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <ApperIcon 
                name={product.stock > 0 ? "Check" : "X"} 
                size={20} 
                className={product.stock > 0 ? "text-success" : "text-error"}
              />
              <span className={`font-medium ${product.stock > 0 ? "text-success" : "text-error"}`}>
                {product.stock > 0 ? t("inStock", language) : t("outOfStock", language)}
              </span>
              {product.stock <= 5 && product.stock > 0 && (
                <span className="text-warning text-sm">
                  (Only {product.stock} left)
                </span>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                {t("quantity", language)}
              </label>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                >
                  <ApperIcon name="Minus" size={16} />
                </button>
                
                <span className="w-16 text-center text-lg font-medium">{quantity}</span>
                
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                  className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ApperIcon name="Plus" size={16} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="flex-1"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                icon="ShoppingCart"
              >
                {t("addToCart", language)}
              </Button>
              
              <Button
                size="lg"
                variant="accent"
                className="flex-1"
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                icon="Zap"
              >
                {t("buyNow", language)}
              </Button>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <ApperIcon name="Truck" size={20} className="text-primary" />
                <span className="text-sm text-gray-700">
                  {language === "ur" ? "تیز ڈیلیوری" : "Fast Delivery"}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <ApperIcon name="Shield" size={20} className="text-primary" />
                <span className="text-sm text-gray-700">
                  {language === "ur" ? "محفوظ ادائیگی" : "Secure Payment"}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <ApperIcon name="RotateCcw" size={20} className="text-primary" />
                <span className="text-sm text-gray-700">
                  {language === "ur" ? "واپسی کی سہولت" : "Easy Returns"}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <ApperIcon name="Award" size={20} className="text-primary" />
                <span className="text-sm text-gray-700">
                  {language === "ur" ? "کوالٹی گارنٹی" : "Quality Guaranteed"}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16"
        >
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <div className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center space-x-2 py-4 border-b-2 transition-colors duration-200 ${
                    activeTab === tab.key
                      ? "border-primary text-primary font-medium"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <ApperIcon name={tab.icon} size={20} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="py-8">
            {activeTab === "description" && (
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {description}
                </p>
                {/* Additional detailed description would go here */}
              </div>
            )}

            {activeTab === "specifications" && (
              <div className="grid md:grid-cols-2 gap-8">
                {product.specifications && Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-3 border-b border-gray-200">
                    <span className="font-medium text-gray-900 capitalize">{key}</span>
                    <span className="text-gray-700">{value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="text-center py-8">
                <ApperIcon name="Star" size={48} className="text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  {language === "ur" ? "کوئی جائزہ نہیں ملا" : "No reviews yet"}
                </h3>
                <p className="text-gray-600">
                  {language === "ur" 
                    ? "پہلے جائزہ دینے والے بنیں!"
                    : "Be the first to write a review!"
                  }
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetailPage;