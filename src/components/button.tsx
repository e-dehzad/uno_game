import React from 'react';

// Interface for Button props, extending standard HTML button attributes
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode; // Button content
  className?: string; // Additional optional styles
}

// Button component definition
export const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      // Default styles with optional additional classes
      className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors ${className}`}
      {...props} // Spreading additional attributes like onClick or disabled
    >
      {children} {/* Render button content */}
    </button>
  );
};

export default Button;
