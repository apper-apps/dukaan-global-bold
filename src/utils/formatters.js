export const formatCurrency = (amount, language) => {
  if (language === "ur") {
    return `Rs ${amount.toLocaleString("ur-PK")}`;
  }
  return `Rs ${amount.toLocaleString("en-PK")}`;
};

export const formatDate = (date, language) => {
  const dateObj = new Date(date);
  
  if (language === "ur") {
    return dateObj.toLocaleDateString("ur-PK", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }
  
  return dateObj.toLocaleDateString("en-PK", {
    year: "numeric",
    month: "long", 
    day: "numeric"
  });
};

export const formatNumber = (number, language) => {
  if (language === "ur") {
    return number.toLocaleString("ur-PK");
  }
  return number.toLocaleString("en-PK");
};