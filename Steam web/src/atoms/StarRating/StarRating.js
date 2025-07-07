import { jsx as _jsx } from "react/jsx-runtime";
import clsx from 'clsx';
const StarIcon = ({ filled, size }) => (_jsx("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: filled ? 'currentColor' : 'none', stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", role: "presentation", children: _jsx("polygon", { points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" }) }));
export const StarRating = ({ rating, size = 20, className, ...rest }) => {
    const stars = Array.from({ length: 5 }, (_, i) => (_jsx(StarIcon, { filled: i < rating, size: size }, i)));
    return (_jsx("div", { "aria-label": `${rating} out of 5 stars`, role: "img", className: clsx('inline-flex gap-0.5 text-yellow-400', className), ...rest, children: stars }));
};
StarRating.displayName = 'StarRating';
export default StarRating;
