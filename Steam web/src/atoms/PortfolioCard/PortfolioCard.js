import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import LazyImage from './LazyImage';
export const PortfolioCard = ({ title, category, image, placeholder, description, results, href, }) => {
    const content = (_jsxs("article", { className: "relative flex flex-col overflow-hidden rounded-lg shadow-md transition-transform duration-[var(--duration-medium)] ease-[var(--ease-in-out)] will-change-transform hover:-translate-y-1 hover:shadow-xl md:hover:rotate-y-3d focus-within:outline-none focus-within:ring-2 focus-within:ring-[var(--trust-500)]", style: { perspective: '1000px', contain: 'layout style paint' }, children: [_jsx("div", { className: "relative h-48 w-full overflow-hidden", children: _jsx(LazyImage, { src: image, placeholderSrc: placeholder, alt: title, className: "w-full h-full object-cover" }) }), _jsxs("div", { className: "flex flex-1 flex-col gap-2 bg-white p-4 dark:bg-[var(--trust-800)] dark:text-white", children: [_jsx("span", { className: "text-sm font-medium text-[var(--trust-600)]", children: category }), _jsx("h3", { className: "text-lg font-semibold line-clamp-2", children: title }), _jsx("p", { className: "text-sm line-clamp-3 flex-1", children: description }), results && results.length > 0 && (_jsx("ul", { className: "mt-2 list-disc pl-4 text-xs text-[var(--trust-700)] dark:text-[var(--trust-50)]", children: results.map((res) => (_jsx("li", { children: res }, res))) }))] })] }));
    if (href) {
        return (_jsx("a", { href: href, className: "block transform-style-3d hover:rotate-y-[-4deg] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--trust-500)]", children: content }));
    }
    return (_jsx("div", { role: "button", tabIndex: 0, onKeyDown: (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.currentTarget.click();
            }
        }, children: content }));
};
export default PortfolioCard;
