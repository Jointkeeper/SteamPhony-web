import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { Outlet, useParams, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header/Header';
import Footer from '../components/Footer';
/**
 * LanguageLayout ensures that the active i18next language always matches the
 * current `/:lang` URL segment. It includes header, footer and page transitions.
 */
export default function LanguageLayout() {
    const { lang } = useParams();
    const { i18n } = useTranslation();
    const location = useLocation();
    // Keep i18next in sync with the URL segment.
    useEffect(() => {
        if (lang && i18n.language !== lang) {
            i18n.changeLanguage(lang);
        }
    }, [lang, i18n]);
    return (_jsxs("div", { className: "min-h-screen flex flex-col bg-white", children: [_jsx(Header, {}), _jsx("main", { className: "flex-1", children: _jsx(AnimatePresence, { mode: "wait", children: _jsx(motion.div, { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -12 }, transition: { duration: 0.35, ease: 'easeOut' }, children: _jsx(Outlet, {}) }, location.pathname) }) }), _jsx(Footer, {})] }));
}
