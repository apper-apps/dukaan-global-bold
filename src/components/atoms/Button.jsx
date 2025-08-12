import { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Button = forwardRef(({ 
  className, 
  variant = "primary", 
  size = "md", 
  children, 
  icon, 
  iconPosition = "left",
  loading = false,
  disabled = false,
  ...props 
}, ref) => {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg hover:scale-105 focus:ring-primary",
    secondary: "bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary",
    accent: "bg-gradient-to-r from-accent to-red-500 text-white hover:shadow-lg hover:scale-105 focus:ring-accent",
    ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-300",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-300",
  };
  
  const sizes = {
    sm: "px-3 py-2 text-sm h-9",
    md: "px-4 py-2.5 text-base h-11",
    lg: "px-6 py-3 text-lg h-12",
    xl: "px-8 py-4 text-xl h-14",
  };

  const iconSize = {
    sm: 16,
    md: 18,
    lg: 20,
    xl: 22,
  };

  const renderContent = () => {
    if (loading) {
      return (
        <>
          <ApperIcon name="Loader2" className={`w-${iconSize[size]/4} h-${iconSize[size]/4} animate-spin ${children ? (iconPosition === 'left' ? 'mr-2' : 'ml-2') : ''}`} />
          {children}
        </>
      );
    }

    if (icon && iconPosition === 'left') {
      return (
        <>
          <ApperIcon name={icon} size={iconSize[size]} className={children ? "mr-2" : ""} />
          {children}
        </>
      );
    }

    if (icon && iconPosition === 'right') {
      return (
        <>
          {children}
          <ApperIcon name={icon} size={iconSize[size]} className={children ? "ml-2" : ""} />
        </>
      );
    }

    return children;
  };

  return (
    <button
      ref={ref}
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {renderContent()}
    </button>
  );
});

Button.displayName = "Button";

export default Button;