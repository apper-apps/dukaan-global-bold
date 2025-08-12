import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import { t } from "@/utils/translations";

const Empty = ({ type = "generic", message, actionLabel, onAction }) => {
  const { language } = useSelector((state) => state.language);
  const navigate = useNavigate();

  const getEmptyContent = () => {
    switch (type) {
      case "cart":
        return {
          icon: "ShoppingCart",
          title: t("emptyCart", language),
          description: "Add some amazing products to get started!",
          actionLabel: t("continueShopping", language),
          action: () => navigate("/")
        };
      case "products":
        return {
          icon: "Package",
          title: "No products found",
          description: "Try adjusting your filters or search terms.",
          actionLabel: t("back", language),
          action: () => window.history.back()
        };
      case "search":
        return {
          icon: "Search",
          title: "No search results",
          description: "We couldn't find any products matching your search.",
          actionLabel: "Clear Search",
          action: onAction
        };
      default:
        return {
          icon: "Box",
          title: "Nothing to see here",
          description: message || "This section is currently empty.",
          actionLabel: actionLabel || t("back", language),
          action: onAction || (() => navigate("/"))
        };
    }
  };

  const content = getEmptyContent();

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-6 p-8">
      <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
        <ApperIcon name={content.icon} className="w-12 h-12 text-gray-400" />
      </div>
      
      <div className="text-center space-y-3 max-w-md">
        <h3 className="text-2xl font-bold text-gray-900">
          {content.title}
        </h3>
        <p className="text-gray-600 leading-relaxed">
          {content.description}
        </p>
      </div>

      <button
        onClick={content.action}
        className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
      >
        {content.actionLabel}
      </button>
    </div>
  );
};

export default Empty;