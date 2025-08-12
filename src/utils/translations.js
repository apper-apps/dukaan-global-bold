export const translations = {
  // Navigation
  home: { en: "Home", ur: "ہوم" },
  shop: { en: "Shop", ur: "دکان" },
  categories: { en: "Categories", ur: "اقسام" },
  deals: { en: "Deals", ur: "پیشکشیں" },
  cart: { en: "Cart", ur: "ٹوکری" },
  account: { en: "My Account", ur: "میرا اکاؤنٹ" },
  
  // Search & Filters
  search: { en: "Search products...", ur: "مصنوعات تلاش کریں..." },
  filter: { en: "Filter", ur: "فلٹر" },
  sortBy: { en: "Sort by", ur: "ترتیب دیں" },
  priceRange: { en: "Price Range", ur: "قیمت کی حد" },
  featured: { en: "Featured", ur: "نمایاں" },
  priceLowToHigh: { en: "Price: Low to High", ur: "قیمت: کم سے زیادہ" },
  priceHighToLow: { en: "Price: High to Low", ur: "قیمت: زیادہ سے کم" },
  newest: { en: "Newest", ur: "جدید ترین" },
  
  // Product
  addToCart: { en: "Add to Cart", ur: "ٹوکری میں ڈالیں" },
  buyNow: { en: "Buy Now", ur: "ابھی خریدیں" },
  outOfStock: { en: "Out of Stock", ur: "ختم" },
  inStock: { en: "In Stock", ur: "دستیاب" },
  price: { en: "Price", ur: "قیمت" },
  quantity: { en: "Quantity", ur: "مقدار" },
  description: { en: "Description", ur: "تفصیلات" },
  specifications: { en: "Specifications", ur: "خصوصیات" },
  reviews: { en: "Reviews", ur: "جائزے" },
  
  // Cart & Checkout
  total: { en: "Total", ur: "کل" },
  subtotal: { en: "Subtotal", ur: "ذیلی کل" },
  shipping: { en: "Shipping", ur: "ڈیلیوری" },
  tax: { en: "Tax", ur: "ٹیکس" },
  free: { en: "Free", ur: "مفت" },
  checkout: { en: "Proceed to Checkout", ur: "چیک آؤٹ کریں" },
  emptyCart: { en: "Your cart is empty", ur: "آپ کی ٹوکری خالی ہے" },
  continueShopping: { en: "Continue Shopping", ur: "خریداری جاری رکھیں" },
  
  // Forms
  firstName: { en: "First Name", ur: "پہلا نام" },
  lastName: { en: "Last Name", ur: "آخری نام" },
  email: { en: "Email", ur: "ای میل" },
  phone: { en: "Phone", ur: "فون" },
  address: { en: "Address", ur: "پتہ" },
  city: { en: "City", ur: "شہر" },
  state: { en: "State", ur: "صوبہ" },
  zipCode: { en: "ZIP Code", ur: "پوسٹل کوڈ" },
  
  // Messages
  addedToCart: { en: "Added to cart successfully!", ur: "ٹوکری میں کامیابی سے شامل!" },
  removedFromCart: { en: "Removed from cart", ur: "ٹوکری سے ہٹا دیا" },
  orderPlaced: { en: "Order placed successfully!", ur: "آرڈر کامیابی سے دیا گیا!" },
  errorOccurred: { en: "An error occurred", ur: "کوئی خرابی ہوئی" },
  
  // Common
  save: { en: "Save", ur: "محفوظ کریں" },
  cancel: { en: "Cancel", ur: "منسوخ" },
  confirm: { en: "Confirm", ur: "تصدیق" },
  remove: { en: "Remove", ur: "ہٹائیں" },
  edit: { en: "Edit", ur: "ترمیم" },
  update: { en: "Update", ur: "اپڈیٹ" },
  back: { en: "Back", ur: "واپس" },
  next: { en: "Next", ur: "اگلا" },
  loading: { en: "Loading...", ur: "لوڈ ہو رہا..." },
  
  // Categories
  electronics: { en: "Electronics", ur: "الیکٹرانکس" },
  clothing: { en: "Clothing", ur: "کپڑے" },
  homeGarden: { en: "Home & Garden", ur: "گھر اور باغ" },
  books: { en: "Books", ur: "کتابیں" },
  sports: { en: "Sports", ur: "کھیل" },
  beauty: { en: "Beauty", ur: "خوبصورتی" },
  grocery: { en: "Grocery", ur: "گروسری" },
  automotive: { en: "Automotive", ur: "گاڑیاں" },
  
  // Footer
  aboutUs: { en: "About Us", ur: "ہمارے بارے میں" },
  contactUs: { en: "Contact Us", ur: "رابطہ کریں" },
  privacyPolicy: { en: "Privacy Policy", ur: "رازداری کی پالیسی" },
  termsOfService: { en: "Terms of Service", ur: "خدمات کی شرائط" },
  followUs: { en: "Follow Us", ur: "ہمیں فالو کریں" },
  paymentMethods: { en: "Payment Methods", ur: "ادائیگی کے طریقے" },
  
  // Language Toggle
  switchToUrdu: { en: "اردو", ur: "اردو" },
  switchToEnglish: { en: "English", ur: "English" },
  
  // Hero Section
  heroTitle: { en: "Shop Smart, Shop Global", ur: "ہوشیاری سے خریداری، عالمی معیار" },
  heroSubtitle: { en: "Discover amazing products with seamless bilingual experience", ur: "دو زبانوں میں شاندار مصنوعات دریافت کریں" },
  shopNow: { en: "Shop Now", ur: "ابھی خریدیں" },
  
  // Product statuses
  sale: { en: "Sale", ur: "سیل" },
  new: { en: "New", ur: "نیا" },
  bestseller: { en: "Best Seller", ur: "بہترین" },
  limitedOffer: { en: "Limited Offer", ur: "محدود پیشکش" },
};

export const getTranslation = (key, language) => {
  return translations[key]?.[language] || key;
};

export const t = (key, language) => getTranslation(key, language);