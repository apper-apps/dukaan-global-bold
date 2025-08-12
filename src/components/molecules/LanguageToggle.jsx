import { useSelector, useDispatch } from "react-redux";
import { toggleLanguage } from "@/store/slices/languageSlice";
import ApperIcon from "@/components/ApperIcon";
import { motion } from "framer-motion";

const LanguageToggle = ({ className = "" }) => {
  const { language, direction } = useSelector((state) => state.language);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleLanguage());
  };

  return (
    <motion.button
      onClick={handleToggle}
      className={`flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-200 hover:border-primary hover:bg-primary/5 transition-all duration-200 ${className}`}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex items-center space-x-1">
        <span className="w-5 h-4 rounded-sm overflow-hidden flex items-center justify-center text-xs font-bold">
          {language === "en" ? "🇺🇸" : "🇵🇰"}
        </span>
        <span className="text-sm font-medium">
          {language === "en" ? "اردو" : "English"}
        </span>
      </div>
      
      <motion.div
        animate={{ rotate: direction === "rtl" ? 180 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <ApperIcon 
          name="Languages" 
          size={16} 
          className="text-gray-600"
        />
      </motion.div>
    </motion.button>
  );
};

export default LanguageToggle;