import { forwardRef } from 'react';
import clsx from 'clsx';

const Button = forwardRef(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      children,
      disabled,
      loading,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={clsx(
          'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
          {
            'bg-gradient-to-br from-brown-trust to-brown-action text-white px-6 py-3 rounded-full shadow hover:shadow-lg focus:ring-brown-trust': variant === 'pill',
            'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500': variant === 'primary',
            'bg-gray-100 hover:bg-gray-200 text-gray-900 focus:ring-gray-500': variant === 'secondary',
            'bg-transparent hover:bg-gray-50 text-gray-700 border border-gray-300 focus:ring-gray-500':
              variant === 'outline',
            'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500': variant === 'success',
            'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500': variant === 'danger'
          },
          {
            'px-3 py-1.5 text-sm rounded-md': size === 'sm',
            'px-4 py-2 text-base rounded-lg': size === 'md',
            'px-6 py-3 text-lg rounded-xl': size === 'lg',
          },
          className,
        )}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
export default Button; 