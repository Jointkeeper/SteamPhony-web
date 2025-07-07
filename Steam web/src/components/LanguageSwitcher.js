import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
export default function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const languages = [
        { code: 'en', name: 'English', nativeName: 'English' },
        { code: 'ru', name: 'Russian', nativeName: 'Русский' },
    ];
    const currentLanguage = languages.find((lang) => lang.code === i18n.language) || languages[0];
    const changeLanguage = (langCode) => {
        const prev = i18n.language;
        i18n.changeLanguage(langCode);
        setIsOpen(false);
        // GA event (optional, will work if GA present)
        if (window.gtag) {
            window.gtag('event', 'language_change', {
                previous_language: prev,
                new_language: langCode,
                change_method: 'manual',
            });
        }
    };
    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    return (_jsxs("div", { className: "fixed top-5 right-5 z-50", ref: dropdownRef, children: [_jsxs("button", { onClick: () => setIsOpen(!isOpen), className: "flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-600 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all duration-200", "aria-expanded": isOpen, "aria-haspopup": "true", "aria-label": `Current language: ${currentLanguage.nativeName}. Click to change language.`, children: [_jsx("span", { className: "font-medium text-gray-700", children: currentLanguage.nativeName }), _jsx("svg", { className: `w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }) })] }), isOpen && (_jsx("div", { className: "absolute top-full left-0 mt-1 w-full bg-white border-2 border-gray-200 rounded-lg shadow-lg z-50", children: languages.map((language) => (_jsx("button", { onClick: () => changeLanguage(language.code), className: `w-full px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-md last:rounded-b-md transition-colors duration-150 ${currentLanguage.code === language.code
                        ? 'bg-blue-50 text-blue-700 font-medium'
                        : 'text-gray-700'}`, lang: language.code, children: language.nativeName }, language.code))) }))] }));
}
