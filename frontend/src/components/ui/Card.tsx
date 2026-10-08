import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'subtle' | 'bordered';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  as?: React.ElementType;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  padding = 'md',
  as: Component = 'div',
}) => {
  const variantStyles = {
    default: 'bg-[#1C1D21] border border-[#2A2C33] shadow-xl',
    subtle: 'bg-[#18191D] border border-[#26282E]',
    bordered: 'bg-transparent border border-[#2A2C33]',
  };

  const paddingStyles = {
    none: 'p-0',
    sm: 'p-3 sm:p-4',
    md: 'p-4 sm:p-6',
    lg: 'p-6 sm:p-8',
  };

  return (
    <Component
      className={`rounded-2xl transition-colors duration-200 ${variantStyles[variant]} ${paddingStyles[padding]} ${className}`}
    >
      {children}
    </Component>
  );
};

export default Card;
