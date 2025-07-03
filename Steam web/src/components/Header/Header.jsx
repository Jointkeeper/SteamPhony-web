import { useState, useEffect, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';

import NavItem from './NavItem';
import MobileDrawer from './MobileDrawer';
import LanguageSwitcher from '../LanguageSwitcher';

import './Header.css';

const navigationMeta = [
  { key: 'services', path: 'services', submenu: true },
  { key: 'portfolio', path: 'portfolio' },
  { key: 'about', path: 'about' },
  { key: 'blog', path: 'blog' },
  { key: 'contact', path: 'contact', highlight: true },
];

function useScrolled(offset = 10) {
  const [scrolled, setScrolled] = useState(false);

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
      setScrolled(window.scrollY > offset);
    }, 16); // ~60fps

    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, [offset]);

  return scrolled;
}

const Header = memo(function Header() {
  const { t } = useTranslation('navigation');
  const { pathname } = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const scrolled = useScrolled(10);

  // Generate nav items with current language prefix to preserve context
  const langPrefix = `/${pathname.split('/')[1]}`;

  const navigationItems = navigationMeta.map((item) => ({
    ...item,
    label: t(`menu.${item.key}`),
    path: `${langPrefix}/${item.path}`,
  }));

  return (
    <>
      <header
        className={clsx(
          'header fixed top-0 inset-x-0 h-20 md:h-[80px] w-full bg-white/90 z-[1000] transition-colors',
          scrolled && 'header--scrolled'
        )}
      >
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <a
            href={langPrefix + '/'}
            className="text-xl font-bold text-[color:var(--color-authority)] focus-visible:outline-none"
          >
            Steamphony
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
            {navigationItems.map((nav) => (
              <NavItem key={nav.key} to={nav.path} highlight={nav.highlight}>
                {nav.label}
              </NavItem>
            ))}
            <LanguageSwitcher />
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 text-[color:var(--trust-700)] focus-visible:outline-[var(--color-authority)]"
            aria-label={drawerOpen ? t('aria.closeMenu') : t('aria.openMenu')}
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen((o) => !o)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {drawerOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Spacer to avoid content jump (header height) */}
      <div className="h-20 md:h-[80px]" aria-hidden="true" />

      {/* Mobile Drawer */}
      <MobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} navigationItems={navigationItems} />
    </>
  );
});

export default Header; 