import React from "react";

export const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-lg border p-4 shadow-sm ${className}`}>{children}</div>
);

export const CardContent = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-2">{children}</div>
);
