import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Input from "@/components/atoms/Input";
import { t } from "@/utils/translations";
import { formatCurrency, formatDate } from "@/utils/formatters";
import { toast } from "react-toastify";

const AccountPage = () => {
  const { language } = useSelector((state) => state.language);
  const { recentOrders } = useSelector((state) => state.cart);
  
  const [activeTab, setActiveTab] = useState('profile');
  const [userProfile, setUserProfile] = useState({
    name: 'احمد علی',
    email: 'ahmed@example.com',
    phone: '+92 300 1234567',
    address: '123 Main Street, Karachi, Pakistan',
    joinDate: '2023-01-15',
  });
  const [isEditing, setIsEditing] = useState(false);

  const tabs = [
    { key: 'profile', label: language === "ur" ? "پروفائل" : "Profile", icon: "User" },
    { key: 'orders', label: language === "ur" ? "آرڈرز" : "Orders", icon: "ShoppingBag" },
    { key: 'wishlist', label: language === "ur" ? "پسندیدہ" : "Wishlist", icon: "Heart" },
    { key: 'addresses', label: language === "ur" ? "پتے" : "Addresses", icon: "MapPin" },
    { key: 'settings', label: language === "ur" ? "ترتیبات" : "Settings", icon: "Settings" },
  ];

  const mockOrders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'delivered',
      total: 2500,
      items: 3
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      status: 'shipped',
      total: 1800,
      items: 2
    },
    {
      id: 'ORD-003',
      date: '2024-01-05',
      status: 'processing',
      total: 3200,
      items: 5
    },
  ];

  const mockWishlist = [
    { id: 1, name: 'iPhone 14 Pro', price: 85000, image: '/api/placeholder/200/200' },
    { id: 2, name: 'Samsung Galaxy Watch', price: 25000, image: '/api/placeholder/200/200' },
    { id: 3, name: 'MacBook Air M2', price: 180000, image: '/api/placeholder/200/200' },
  ];

  const handleSaveProfile = () => {
    toast.success(language === "ur" ? "پروفائل اپ ڈیٹ ہو گئی" : "Profile updated successfully");
    setIsEditing(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'success';
      case 'shipped': return 'info';
      case 'processing': return 'warning';
      case 'cancelled': return 'error';
      default: return 'secondary';
    }
  };

  const getStatusText = (status) => {
    const statusMap = {
      delivered: language === "ur" ? "پہنچا دیا گیا" : "Delivered",
      shipped: language === "ur" ? "بھیجا گیا" : "Shipped",
      processing: language === "ur" ? "تیار کیا جا رہا" : "Processing",
      cancelled: language === "ur" ? "منسوخ" : "Cancelled",
    };
    return statusMap[status] || status;
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {language === "ur" ? "پروفائل کی معلومات" : "Profile Information"}
              </h2>
              <Button
                variant={isEditing ? "primary" : "outline"}
                size="sm"
                onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                icon={isEditing ? "Save" : "Edit"}
              >
                {isEditing ? (language === "ur" ? "محفوظ کریں" : "Save") : (language === "ur" ? "ترمیم" : "Edit")}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === "ur" ? "نام" : "Name"}
                </label>
                <Input
                  value={userProfile.name}
                  onChange={(e) => setUserProfile(prev => ({ ...prev, name: e.target.value }))}
                  disabled={!isEditing}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === "ur" ? "ای میل" : "Email"}
                </label>
                <Input
                  type="email"
                  value={userProfile.email}
                  onChange={(e) => setUserProfile(prev => ({ ...prev, email: e.target.value }))}
                  disabled={!isEditing}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === "ur" ? "فون" : "Phone"}
                </label>
                <Input
                  value={userProfile.phone}
                  onChange={(e) => setUserProfile(prev => ({ ...prev, phone: e.target.value }))}
                  disabled={!isEditing}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === "ur" ? "رکنیت کی تاریخ" : "Member Since"}
                </label>
                <Input
                  value={formatDate(userProfile.joinDate, language)}
                  disabled={true}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === "ur" ? "پتہ" : "Address"}
              </label>
              <textarea
                rows={3}
                value={userProfile.address}
                onChange={(e) => setUserProfile(prev => ({ ...prev, address: e.target.value }))}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
          </div>
        );

      case 'orders':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">
              {language === "ur" ? "حالیہ آرڈرز" : "Recent Orders"}
            </h2>

            <div className="space-y-4">
              {mockOrders.map((order) => (
                <div key={order.id} className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-medium text-gray-900">#{order.id}</h3>
                      <p className="text-sm text-gray-600">{formatDate(order.date, language)}</p>
                    </div>
                    <Badge variant={getStatusColor(order.status)}>
                      {getStatusText(order.status)}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">{language === "ur" ? "اشیاء:" : "Items:"}</span>
                      <span className="ml-2 font-medium">{order.items}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">{language === "ur" ? "کل:" : "Total:"}</span>
                      <span className="ml-2 font-medium">{formatCurrency(order.total, language)}</span>
                    </div>
                    <div className="col-span-2">
                      <Button size="sm" variant="outline" className="w-full">
                        {language === "ur" ? "تفصیل دیکھیں" : "View Details"}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'wishlist':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">
              {language === "ur" ? "پسندیدہ اشیاء" : "Wishlist Items"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockWishlist.map((item) => (
                <div key={item.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
                  <h3 className="font-medium text-gray-900 mb-2">{item.name}</h3>
                  <p className="text-lg font-bold text-primary mb-3">
                    {formatCurrency(item.price, language)}
                  </p>
                  <div className="space-y-2">
                    <Button size="sm" className="w-full">
                      {language === "ur" ? "کارٹ میں شامل کریں" : "Add to Cart"}
                    </Button>
                    <Button size="sm" variant="outline" className="w-full">
                      {language === "ur" ? "ہٹائیں" : "Remove"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'addresses':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {language === "ur" ? "محفوظ شدہ پتے" : "Saved Addresses"}
              </h2>
              <Button icon="Plus">
                {language === "ur" ? "نیا پتہ شامل کریں" : "Add New Address"}
              </Button>
            </div>

            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-medium">Home</h3>
                      <Badge variant="primary">Default</Badge>
                    </div>
                    <p className="text-gray-600">
                      123 Main Street, Block A<br />
                      Gulshan-e-Iqbal, Karachi<br />
                      Sindh, Pakistan - 75300
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      {language === "ur" ? "ترمیم" : "Edit"}
                    </Button>
                    <Button size="sm" variant="outline">
                      {language === "ur" ? "حذف" : "Delete"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">
              {language === "ur" ? "اکاؤنٹ کی ترتیبات" : "Account Settings"}
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium">{language === "ur" ? "ای میل اطلاعات" : "Email Notifications"}</h3>
                  <p className="text-sm text-gray-600">{language === "ur" ? "آرڈر اپ ڈیٹس اور آفرز کی اطلاع" : "Order updates and promotional offers"}</p>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 text-primary" />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium">{language === "ur" ? "ایس ایم ایس اطلاعات" : "SMS Notifications"}</h3>
                  <p className="text-sm text-gray-600">{language === "ur" ? "ڈیلیوری اور آرڈر کی تصدیق" : "Delivery and order confirmations"}</p>
                </div>
                <input type="checkbox" className="w-4 h-4 text-primary" />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium">{language === "ur" ? "پش اطلاعات" : "Push Notifications"}</h3>
                  <p className="text-sm text-gray-600">{language === "ur" ? "براؤزر اطلاعات" : "Browser notifications"}</p>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 text-primary" />
              </div>
            </div>

            <div className="pt-6 border-t">
              <Button variant="error">
                {language === "ur" ? "اکاؤنٹ بند کریں" : "Delete Account"}
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
            {language === "ur" ? "میرا اکاؤنٹ" : "My Account"}
          </h1>
          <p className="text-gray-600 mt-2">
            {language === "ur" ? "اپنی معلومات اور آرڈرز کا انتظام کریں" : "Manage your information and orders"}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-surface rounded-xl shadow-lg p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name="User" size={32} className="text-primary" />
                </div>
                <h3 className="font-semibold text-gray-900">{userProfile.name}</h3>
                <p className="text-sm text-gray-600">{userProfile.email}</p>
              </div>

              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.key
                        ? 'bg-primary text-white'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <ApperIcon name={tab.icon} size={18} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-surface rounded-xl shadow-lg p-8"
            >
              {renderTabContent()}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;