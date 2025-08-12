import { useSelector } from "react-redux";
import ApperIcon from "@/components/ApperIcon";
import { t } from "@/utils/translations";

const Error = ({ message, onRetry }) => {
  const { language } = useSelector((state) => state.language);

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-6 p-8">
      <div className="w-20 h-20 bg-gradient-to-br from-error to-red-500 rounded-full flex items-center justify-center">
        <ApperIcon name="AlertTriangle" className="w-10 h-10 text-white" />
      </div>
      
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold text-gray-900">
          {t("errorOccurred", language)}
        </h3>
        <p className="text-gray-600 max-w-md">
          {message || "Something went wrong while loading the content."}
        </p>
      </div>

      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
        >
          <div className="flex items-center space-x-2">
            <ApperIcon name="RefreshCw" className="w-4 h-4" />
            <span>{t("retry", language) || "Try Again"}</span>
          </div>
        </button>
      )}
    </div>
  );
};

export default Error;