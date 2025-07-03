import { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const navLinkClass = ({ isActive }) =>
  `py-2 px-3 rounded-md transition-colors duration-200 ${
    isActive ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'
  }`;

export default function Layout({ children }) {
  const { t } = useTranslation('navigation');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  const toggleMobile = () => setMobileOpen((prev) => !prev);

  const closeMobile = () => setMobileOpen(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="font-bold text-xl text-blue-700" onClick={closeMobile}>
            Steamphony
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink to="/" end className={navLinkClass}>
              {t('menu.home')}
            </NavLink>

            {/* Services dropdown */}
            <div className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
              <button
                type="button"
                className={`flex items-center gap-1 ${
                  location.pathname.startsWith('/services')
                    ? 'text-blue-600 font-semibold'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
                onClick={() => setServicesOpen((p) => !p)}
              >
                {t('menu.services')}
                <svg
                  className={`w-4 h-4 transform transition-transform ${servicesOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {servicesOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-white border rounded shadow-lg p-2 space-y-1">
                  <NavLink to="/services/restaurant-marketing" className={navLinkClass} onClick={() => setServicesOpen(false)}>
                    {t('submenu.restaurantMarketing')}
                  </NavLink>
                  <NavLink to="/services/salon-marketing" className={navLinkClass} onClick={() => setServicesOpen(false)}>
                    {t('submenu.salonMarketing')}
                  </NavLink>
                  <NavLink to="/services/web-development" className={navLinkClass} onClick={() => setServicesOpen(false)}>
                    {t('submenu.webDevelopment')}
                  </NavLink>
                </div>
              )}
            </div>

            <NavLink to="/about" className={navLinkClass}>
              {t('menu.about')}
            </NavLink>
            <NavLink to="/contact" className={navLinkClass}>
              {t('menu.contact')}
            </NavLink>
            <NavLink to="/blog" className={navLinkClass}>
              {t('menu.blog')}
            </NavLink>
            <LanguageSwitcher />
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden inline-flex items-center justify-center p-2 text-gray-700" onClick={toggleMobile}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile nav panel */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t shadow-sm">
            <div className="px-4 pt-4 pb-2 space-y-1 flex flex-col">
              <NavLink to="/" end className={navLinkClass} onClick={closeMobile}>
                {t('menu.home')}
              </NavLink>

              {/* Collapsible services */}
              <details open={location.pathname.startsWith('/services')}>
                <summary className="cursor-pointer py-2 px-3 rounded-md text-gray-700 hover:text-blue-600">
                  {t('menu.services')}
                </summary>
                <div className="ml-4 mt-1 space-y-1">
                  <NavLink to="/services/restaurant-marketing" className={navLinkClass} onClick={closeMobile}>
                    {t('submenu.restaurantMarketing')}
                  </NavLink>
                  <NavLink to="/services/salon-marketing" className={navLinkClass} onClick={closeMobile}>
                    {t('submenu.salonMarketing')}
                  </NavLink>
                  <NavLink to="/services/web-development" className={navLinkClass} onClick={closeMobile}>
                    {t('submenu.webDevelopment')}
                  </NavLink>
                </div>
              </details>

              <NavLink to="/about" className={navLinkClass} onClick={closeMobile}>
                {t('menu.about')}
              </NavLink>
              <NavLink to="/contact" className={navLinkClass} onClick={closeMobile}>
                {t('menu.contact')}
              </NavLink>
              <NavLink to="/blog" className={navLinkClass} onClick={closeMobile}>
                {t('menu.blog')}
              </NavLink>
              <div className="py-2">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>
    </div>
  );
} 