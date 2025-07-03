import React from 'react';
import clsx from 'clsx';

export type ButtonVariant = 'trust' | 'action' | 'neutral';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  loading?: boolean;
}

const base =
  'inline-flex items-center justify-center rounded-md font-medium transition-colors duration-[var(--duration-medium)] will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

const variantClasses: Record<ButtonVariant, string> = {
  trust: 'bg-gradient-to-br from-[var(--trust-600)] to-[var(--trust-400)] text-white hocus:from-[var(--trust-500)] hocus:to-[var(--trust-300)] focus-visible:ring-[var(--trust-500)]',
  action: 'bg-gradient-to-br from-[var(--color-action)] to-[var(--color-action-light)] text-white hocus:from-[var(--color-action-light)] hocus:to-[var(--color-action)] focus-visible:ring-[var(--trust-500)]',
  neutral: 'bg-[var(--trust-50)] text-[var(--trust-700)] hocus:bg-[var(--trust-100)] focus-visible:ring-[var(--trust-400)]',
};

const interaction =
  'hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-95 active:shadow-sm transition-transform duration-[var(--duration-fast)] ease-[var(--ease-bounce)]';

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = 'neutral', loading = false, className, children, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={clsx(base, interaction, variantClasses[variant], className)}
        {...props}
      >
        {loading ? (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
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
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        ) : (
          children
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button; 