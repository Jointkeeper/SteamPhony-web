import { jsx as _jsx } from "react/jsx-runtime";
import clsx from 'clsx';
export default function FilterChip({ active, children, onClick, className, ...props }) {
    return (_jsx("button", { type: "button", onClick: onClick, className: clsx('filter-chip', active && 'active', className), ...props, children: children }));
}
