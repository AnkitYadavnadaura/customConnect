import React from "react";

export const Input = ({ placeholder, className }: { placeholder: string; className?: string }) => (
  <input type="text" placeholder={placeholder} className={`border rounded-lg p-2 w-full ${className}`} />
);
