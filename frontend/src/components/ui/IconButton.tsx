import React from 'react';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  'aria-label': string;
  icon: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const IconButton: React.FC<IconButtonProps> = ({
  'aria-label': ariaLabel,
  icon,
  variant = 'ghost',
  size = 'md',
  className = '',
  disabled,
  type = 'button',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F05A28] focus-visible:ring-offset-2 focus-visible:ring-offset-[#121316] disabled:opacity-40 disabled:cursor-not-allowed select-none';

  const sizeStyles = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  const variantStyles = {
    primary: 'bg-[#F05A28] text-white hover:bg-[#E04A18] active:bg-[#D03A08]',
    secondary: 'bg-[#2A2C33] text-[#F3F4F6] hover:bg-[#383B44] border border-[#3B3D45]',
    outline: 'bg-transparent text-[#F3F4F6] border border-[#3B3D45] hover:bg-[#1C1D21]',
    ghost: 'bg-transparent text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#2A2C33]',
    danger: 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20',
  };

  return (
    <button
      type={type}
      aria-label={ariaLabel}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {icon}
    </button>
  );
};

export default IconButton;
