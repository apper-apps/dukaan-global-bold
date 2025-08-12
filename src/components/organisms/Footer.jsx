import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import { t } from "@/utils/translations";

const Footer = () => {
  const { language, direction } = useSelector((state) => state.language);

  const footerSections = [
    {
      title: t("aboutUs", language),
      links: [
        { label: t("aboutUs", language), href: "/about" },
        { label: t("contactUs", language), href: "/contact" },
        { label: "Careers", href: "/careers" },
      ]
    },
    {
      title: "Legal",
      links: [
        { label: t("privacyPolicy", language), href: "/privacy" },
        { label: t("termsOfService", language), href: "/terms" },
        { label: "Return Policy", href: "/returns" },
      ]
    },
    {
      title: t("categories", language),
      links: [
        { label: t("electronics", language), href: "/category/electronics" },
        { label: t("clothing", language), href: "/category/clothing" },
        { label: t("homeGarden", language), href: "/category/home" },
        { label: t("grocery", language), href: "/category/grocery" },
      ]
    }
  ];

  const socialLinks = [
    { icon: "Facebook", href: "#", color: "text-blue-600" },
    { icon: "Twitter", href: "#", color: "text-blue-400" },
    { icon: "Instagram", href: "#", color: "text-pink-600" },
    { icon: "Youtube", href: "#", color: "text-red-600" },
  ];

  const paymentMethods = [
    { icon: "CreditCard", label: "Credit Card" },
    { icon: "Banknote", label: "Cash on Delivery" },
    { icon: "Smartphone", label: "Mobile Banking" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                  <ApperIcon name="ShoppingBag" className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-white">
                  {language === "ur" ? "دکان گلوبل" : "Dukaan Global"}
                </h3>
              </div>
              
              <p className="text-gray-400 leading-relaxed">
                {language === "ur" 
                  ? "دو زبانوں میں بہترین آن لائن شاپنگ کا تجربہ۔ ہر پاکستانی کے لیے۔"
                  : "The best bilingual shopping experience for every Pakistani. Shop smart, shop global."
                }
              </p>

              <div className="space-y-2">
                <h4 className="font-semibold text-white">{t("followUs", language)}</h4>
                <div className="flex space-x-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.icon}
                      href={social.href}
                      className={`w-9 h-9 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors duration-200 ${social.color}`}
                    >
                      <ApperIcon name={social.icon} size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Sections */}
            {footerSections.map((section, index) => (
              <div key={index} className="space-y-4">
                <h4 className="font-semibold text-white text-lg">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        to={link.href}
                        className="text-gray-400 hover:text-primary transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Methods & Contact */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Payment Methods */}
            <div className="flex items-center space-x-6">
              <h4 className="font-medium text-white">{t("paymentMethods", language)}:</h4>
              <div className="flex items-center space-x-3">
                {paymentMethods.map((method) => (
                  <div
                    key={method.icon}
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center"
                    title={method.label}
                  >
                    <ApperIcon name={method.icon} size={20} className="text-gray-400" />
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <ApperIcon name="Phone" size={16} className="text-primary" />
                <span>+92 21 1234 5678</span>
              </div>
              <div className="flex items-center space-x-2">
                <ApperIcon name="Mail" size={16} className="text-primary" />
                <span>support@dukaanglobal.pk</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 py-6 text-center">
          <p className="text-gray-400">
            © 2024 Dukaan Global. {language === "ur" ? "تمام حقوق محفوظ ہیں۔" : "All rights reserved."}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;