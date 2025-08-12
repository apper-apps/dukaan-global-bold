import { useSelector, useDispatch } from "react-redux";
import { updateQuantity, removeFromCart } from "@/store/slices/cartSlice";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { t } from "@/utils/translations";
import { formatCurrency } from "@/utils/formatters";

const CartItem = ({ item }) => {
  const { language } = useSelector((state) => state.language);
  const dispatch = useDispatch();

  const handleQuantityChange = (newQuantity) => {
    dispatch(updateQuantity({ productId: item.id, quantity: newQuantity }));
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  const title = language === "ur" ? item.title_ur : item.title_en;
  const subtotal = item.price * item.quantity;

  return (
    <div className="flex items-center space-x-4 p-4 bg-surface rounded-lg shadow-sm">
      <img
        src={item.images[0]}
        alt={title}
        className="w-16 h-16 object-cover rounded-lg"
      />
      
      <div className="flex-1 space-y-2">
        <h4 className="font-medium text-gray-900 line-clamp-2">{title}</h4>
        <p className="text-sm text-gray-600">
          {formatCurrency(item.price, language)} each
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          disabled={item.quantity <= 1}
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ApperIcon name="Minus" size={14} />
        </button>
        
        <span className="w-8 text-center font-medium">{item.quantity}</span>
        
        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
        >
          <ApperIcon name="Plus" size={14} />
        </button>
      </div>

      <div className="text-right space-y-2">
        <p className="font-semibold text-lg text-primary">
          {formatCurrency(subtotal, language)}
        </p>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRemove}
          icon="Trash2"
          className="text-error hover:bg-error/10"
        >
          {t("remove", language)}
        </Button>
      </div>
    </div>
  );
};

export default CartItem;