import React from 'react';
import { Role } from '../../types/platform';
import { roleThemes } from '../../utils/roleTheme';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  role?: Role;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md';
}

export function Button({
  role = 'organization',
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...rest
}: ButtonProps) {
  const sizeClass = size === 'sm' ? 'px-3 py-1.5 text-sm' : 'px-4 py-2 text-sm';
  const variantClass =
  variant === 'primary' ?
  `text-white ${roleThemes[role].button}` :
  variant === 'danger' ?
  'text-white bg-red-600 hover:bg-red-700 focus-visible:ring-red-500' :
  'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus-visible:ring-gray-400';
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium shadow-sm transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${sizeClass} ${variantClass} ${className}`}
      {...rest}>
      
      {children}
    </button>);

}