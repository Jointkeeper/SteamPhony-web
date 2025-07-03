import React from 'react';
import clsx from 'clsx';

export type ButtonVariant = 'trust' | 'action' | 'neutral';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  loading?: boolean;
}

const base =
  'inline-flex items-center justify-center rounded-md font-medium transition-colors duration-[var(--duration-medium)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

const variantClasses: Record<ButtonVariant, string> = {
  trust:
    'bg-gradient-to-br from-[var(--trust-600)] to-[var(--trust-400)] text-white hocus:from-[var(--trust-500)] hocus:to-[var(--trust-300)]',
  action:
    'bg-gradient-to-br from-[var(--color-action)] to-[var(--color-action-light)] text-white hocus:from-[var(--color-action-light)] hocus:to-[var(--color-action)]',
  neutral:
    'bg-[var(--trust-50)] text-[var(--trust-700)] hocus:bg-[var(--trust-100)]',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = 'neutral', loading = false, className, children, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={clsx(base, variantClasses[variant], className)}
        {...props}
      >
        {loading ? <span className="animate-spin">⏳</span> : children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button; 