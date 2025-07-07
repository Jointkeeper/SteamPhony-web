import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, memo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { sendDuration } from '../../utils/performance';
import NavItem from './NavItem';
import MobileDrawer from './MobileDrawer';
import LanguageSwitcher from '../LanguageSwitcher';
import { useNavigation } from '../../contexts';
import './Header.css';
const navigationMeta = [
    { key: 'services', path: 'services' },
    { key: 'work', path: 'work' },
    { key: 'about', path: 'about' },
    { key: 'contact', path: 'contact', highlight: true },
];
function useScrolled(offset = 10) {
    const [scrolled, setScrolled] = useState(false);
    const perfRef = useRef({ count: 0, total: 0 });
    useEffect(() => {
        function throttle(fn, wait) {
            let last = 0;
            return () => {
                const now = Date.now();
                if (now - last >= wait) {
                    last = now;
                    fn();
                }
            };
        }
        const handle = throttle(() => {
            const t0 = performance.now();
            setScrolled(window.scrollY > offset);
            const duration = performance.now() - t0;
            perfRef.current.count += 1;
            perfRef.current.total += duration;
        }, 16); // ~60fps
        window.addEventListener('scroll', handle, { passive: true });
        const interval = setInterval(() => {
            if (perfRef.current.count > 0) {
                const avg = perfRef.current.total / perfRef.current.count;
                sendDuration('scroll_handler_ms', avg);
                perfRef.current = { count: 0, total: 0 };
            }
        }, 10000); // каждые 10 сек
        return () => {
            window.removeEventListener('scroll', handle);
            clearInterval(interval);
        };
    }, [offset]);
    return scrolled;
}
const Header = memo(function Header() {
    const { t } = useTranslation('navigation');
    const { pathname } = useLocation();
    const { state: navState, toggleDrawer } = useNavigation();
    const scrolled = useScrolled(10);
    // Generate nav items with current language prefix to preserve context
    const langPrefix = `/${pathname.split('/')[1]}`;
    const navigationItems = navigationMeta.map((item) => ({
        ...item,
        label: t(`menu.${item.key}`),
        path: `${langPrefix}/${item.path}`,
    }));
    return (_jsxs(_Fragment, { children: [_jsx("header", { className: clsx('header fixed top-0 inset-x-0 h-20 md:h-[80px] w-full z-[1000] transition-all', scrolled && 'header--scrolled'), children: _jsxs("div", { className: "max-w-7xl mx-auto h-full flex items-center justify-between px-4 sm:px-6 lg:px-8", children: [_jsx("a", { href: langPrefix + '/', className: "logo focus-visible:outline-none", children: "Steamphony" }), _jsxs("nav", { className: "hidden md:flex items-center gap-6", "aria-label": "Main navigation", children: [navigationItems.map((nav) => (_jsx(NavItem, { to: nav.path, highlight: nav.highlight, children: nav.label }, nav.key))), _jsx(LanguageSwitcher, {})] }), _jsx("button", { type: "button", className: "mobile-menu-button md:hidden inline-flex items-center justify-center p-2 focus-visible:outline-purple-bright", "aria-label": navState.isDrawerOpen ? t('aria.closeMenu') : t('aria.openMenu'), "aria-expanded": navState.isDrawerOpen, onClick: toggleDrawer, children: _jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: navState.isDrawerOpen ? (_jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M6 18L18 6M6 6l12 12" })) : (_jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 6h16M4 12h16M4 18h16" })) }) })] }) }), _jsx("div", { style: { height: '80px', minHeight: '80px', width: '100%' }, "aria-hidden": "true" }), _jsx(MobileDrawer, { isOpen: navState.isDrawerOpen, navigationItems: navigationItems })] }));
});
export default Header;
