import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "@/store/slices/cartSlice";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import { t } from "@/utils/translations";
import { formatCurrency } from "@/utils/formatters";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const ProductCard = ({ product }) => {
  const { language } = useSelector((state) => state.language);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart({ product, quantity: 1 }));
    toast.success(t("addedToCart", language));
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const title = language === "ur" ? product.title_ur : product.title_en;
  const description = language === "ur" ? product.description_ur : product.description_en;

  return (
    <motion.div
      onClick={handleCardClick}
      className="product-card bg-surface rounded-xl shadow-lg overflow-hidden cursor-pointer group"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.images[0]}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />
        
        {product.badges && product.badges.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-wrap gap-1">
            {product.badges.map((badge, index) => (
              <Badge 
                key={index}
                variant={badge.type || "primary"}
                size="sm"
              >
                {language === "ur" ? badge.label_ur : badge.label_en}
              </Badge>
            ))}
          </div>
        )}
        
        {product.originalPrice > product.price && (
          <Badge 
            variant="accent" 
            className="absolute top-3 right-3"
            size="sm"
          >
            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
          </Badge>
        )}
      </div>

      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-gray-900 line-clamp-2 text-base leading-tight">
            {title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2 mt-1">
            {description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-primary">
                {formatCurrency(product.price, language)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-sm text-gray-500 line-through">
                  {formatCurrency(product.originalPrice, language)}
                </span>
              )}
            </div>
          </div>

          <Button
            size="sm"
            onClick={handleAddToCart}
            className="shrink-0"
            icon="ShoppingCart"
          >
            <span className="hidden sm:inline">{t("addToCart", language)}</span>
          </Button>
        </div>

        {product.stock <= 5 && product.stock > 0 && (
          <div className="flex items-center space-x-1 text-warning text-sm">
            <ApperIcon name="AlertTriangle" size={14} />
            <span>Only {product.stock} left</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;