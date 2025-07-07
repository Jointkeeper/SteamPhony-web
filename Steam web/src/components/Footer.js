import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
export default function Footer() {
    const { pathname } = useLocation();
    const langPrefix = `/${pathname.split('/')[1]}`;
    const currentYear = new Date().getFullYear();
    const socialLinks = [
        { name: 'LinkedIn', href: '#', icon: '💼' },
        { name: 'Twitter', href: '#', icon: '🐦' },
        { name: 'Instagram', href: '#', icon: '📷' },
        { name: 'Telegram', href: 'https://t.me/steamphony', icon: '✈️' }
    ];
    const footerLinks = {
        services: [
            { name: 'Веб-разработка', href: `${langPrefix}/services#web` },
            { name: 'Digital-маркетинг', href: `${langPrefix}/services#marketing` },
            { name: 'Комплексные решения', href: `${langPrefix}/services#complex` }
        ],
        company: [
            { name: 'О нас', href: `${langPrefix}/services#team` },
            { name: 'Портфолио', href: `${langPrefix}/work` },
            { name: 'Контакты', href: `${langPrefix}/contact` }
        ]
    };
    return (_jsx("footer", { className: "bg-gray-deep text-white", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 py-12 md:py-16", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: [_jsxs("div", { className: "md:col-span-1", children: [_jsx(Link, { to: langPrefix + '/', className: "text-2xl font-bold text-white mb-4 inline-block", children: "Steamphony" }), _jsx("p", { className: "text-gray-400 mb-6", children: "\u0410\u0440\u0445\u0438\u0442\u0435\u043A\u0442\u0443\u0440\u0430 \u0434\u043E\u0432\u0435\u0440\u0438\u044F \u0432 \u0446\u0438\u0444\u0440\u043E\u0432\u043E\u043C \u043F\u0440\u043E\u0441\u0442\u0440\u0430\u043D\u0441\u0442\u0432\u0435" }), _jsx("div", { className: "flex space-x-4", children: socialLinks.map((social) => (_jsx("a", { href: social.href, onClick: social.href === '#' ? (e) => e.preventDefault() : undefined, className: "w-10 h-10 bg-gray-700 hover:bg-purple-bright rounded-full flex items-center justify-center transition-colors", "aria-label": social.name, children: _jsx("span", { className: "text-lg", children: social.icon }) }, social.name))) })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold mb-4", children: "\u0423\u0441\u043B\u0443\u0433\u0438" }), _jsx("ul", { className: "space-y-3", children: footerLinks.services.map((link) => (_jsx("li", { children: _jsx(Link, { to: link.href, className: "text-gray-400 hover:text-purple-bright transition-colors", children: link.name }) }, link.name))) })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold mb-4", children: "\u041A\u043E\u043C\u043F\u0430\u043D\u0438\u044F" }), _jsx("ul", { className: "space-y-3", children: footerLinks.company.map((link) => (_jsx("li", { children: _jsx(Link, { to: link.href, className: "text-gray-400 hover:text-purple-bright transition-colors", children: link.name }) }, link.name))) })] })] }), _jsx("div", { className: "mt-12 pt-8 border-t border-gray-700", children: _jsxs("div", { className: "flex flex-col md:flex-row justify-between items-center", children: [_jsxs("p", { className: "text-gray-400 text-sm mb-4 md:mb-0", children: ["\u00A9 ", currentYear, " Steamphony. \u0412\u0441\u0435 \u043F\u0440\u0430\u0432\u0430 \u0437\u0430\u0449\u0438\u0449\u0435\u043D\u044B."] }), _jsxs("div", { className: "flex items-center space-x-6", children: [_jsx("a", { href: "mailto:hello@steamphony.com", className: "text-gray-400 hover:text-purple-bright transition-colors text-sm", children: "hello@steamphony.com" }), _jsx("a", { href: "tel:+74951234567", className: "text-gray-400 hover:text-purple-bright transition-colors text-sm", children: "+7 (495) 123-45-67" })] })] }) })] }) }));
}
