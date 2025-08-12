import { useSelector } from "react-redux";
import { t } from "@/utils/translations";

const LoadingOverlay = () => {
  const { language } = useSelector((state) => state.language);

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center space-y-4 min-w-[200px]">
        <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-700 font-medium">{t("loading", language)}</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;