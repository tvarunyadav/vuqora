import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  children,
  className = '',
  disabled,
  type = 'button',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F05A28] focus-visible:ring-offset-2 focus-visible:ring-offset-[#121316] disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98] select-none';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs gap-1.5 min-h-[36px]',
    md: 'px-4 py-2.5 text-sm gap-2 min-h-[44px]',
    lg: 'px-6 py-3.5 text-base gap-2.5 min-h-[52px]',
  };

  const variantStyles = {
    primary:
      'bg-[#F05A28] text-white hover:bg-[#E04A18] active:bg-[#D03A08] shadow-lg shadow-[#F05A28]/15 border border-transparent',
    secondary:
      'bg-[#2A2C33] text-[#F3F4F6] hover:bg-[#383B44] active:bg-[#1C1D21] border border-[#3B3D45]',
    outline:
      'bg-transparent text-[#F3F4F6] border border-[#3B3D45] hover:bg-[#1C1D21] hover:border-[#4B4E58] active:bg-[#2A2C33]',
    ghost:
      'bg-transparent text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#1C1D21] active:bg-[#2A2C33] border border-transparent',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${className}`}
      {...props}
    >
      {icon && <span className="shrink-0 flex items-center">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

export default Button;
