import { forwardRef } from 'react';
import clsx from 'clsx';

const Input = forwardRef(({ 
  className,
  type = 'text',
  error,
  label,
  helper,
  ...props 
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={props.id}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        className={clsx(
          'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200',
          {
            'border-red-500 focus:ring-red-500 focus:border-red-500': error,
            'border-gray-300': !error
          },
          className
        )}
        ref={ref}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      {helper && !error && (
        <p className="mt-1 text-sm text-gray-500">{helper}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
export default Input; 