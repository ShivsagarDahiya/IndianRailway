import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={`border rounded-lg shadow p-4 ${className || ""}`}>
      {children}
    </div>
  );
};

export const CardContent: React.FC<CardProps> = ({ children }) => {
  return <div className="p-4">{children}</div>;
};
