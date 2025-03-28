import React from "react";

export const Button = ({ children, variant, className }: { children: React.ReactNode; variant?: "ghost"; className?: string }) => {
  const baseStyles = "px-4 py-2 rounded-md text-sm font-medium transition";
  const ghostStyles = "bg-transparent hover:bg-gray-200";
  return (
    <button className={`${baseStyles} ${variant === "ghost" ? ghostStyles : "bg-blue-500 text-white"} ${className}`}>
      {children}
    </button>
  );
};
