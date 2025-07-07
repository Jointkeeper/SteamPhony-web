import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
import clsx from 'clsx';
const Select = forwardRef(({ className, error, label, helper, children, ...props }, ref) => {
    return (_jsxs("div", { className: "w-full", children: [label && (_jsxs("label", { htmlFor: props.id, className: "block text-sm font-medium text-gray-700 mb-1", children: [label, props.required && _jsx("span", { className: "text-red-500 ml-1", children: "*" })] })), _jsx("select", { className: clsx('w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white', {
                    'border-red-500 focus:ring-red-500 focus:border-red-500': error,
                    'border-gray-300': !error
                }, className), ref: ref, ...props, children: children }), error && (_jsx("p", { className: "mt-1 text-sm text-red-600", children: error })), helper && !error && (_jsx("p", { className: "mt-1 text-sm text-gray-500", children: helper }))] }));
});
Select.displayName = 'Select';
export default Select;
