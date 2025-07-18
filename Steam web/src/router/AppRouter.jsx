import { useEffect, lazy, Suspense } from 'react';
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import LanguageLayout from '../layouts/LanguageLayout';
import Loader from '../components/Loader';

// Page components
const Home = lazy(() => import('../pages/Home'));
const Services = lazy(() => import('../pages/Services'));
const Portfolio = lazy(() => import('../pages/Portfolio'));
const Contact = lazy(() => import('../pages/Contact'));
const NotFound = lazy(() => import('../pages/NotFound'));
const About = lazy(() => import('../pages/About'));

// Supported languages constant – helps to avoid hard-coded values across the app
const SUPPORTED_LANGS = ['en', 'ru'];

/**
 * AppRouter – centralised routing table with i18n-aware nested routes.
 *
 * 1. Automatically redirects the user to their preferred language (detected from
 *    the i18next instance) when they hit a non-prefixed URL.
 * 2. Keeps existing pathname/query so deep links continue to work after redirect.
 * 3. Uses <LanguageLayout/> to inject layout/header and keep language context.
 *
 * This component intentionally does **not** include <BrowserRouter>. The root
 * application (App.jsx) remains responsible for selecting the router
 * implementation so we can switch to MemoryRouter during tests or upgrade to
 * SSR later without touching the routing table itself.  */
export default function AppRouter() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  // On first render, ensure URL starts with one of the supported language
  // prefixes. If not – determine preferred language and redirect accordingly.
  useEffect(() => {
    const [ , maybeLang ] = location.pathname.split('/');

    if (!SUPPORTED_LANGS.includes(maybeLang)) {
      // Choose language from i18next (which respects localStorage, browser
      // settings, etc.) falling back to English.
      const preferredLang = i18n?.language?.split('-')[0] ?? 'en';
      const lang = SUPPORTED_LANGS.includes(preferredLang) ? preferredLang : 'en';
      navigate(`/${lang}${location.pathname}`, { replace: true });
    }
  }, [location.pathname, i18n.language, navigate]);

  return (
    <Suspense fallback={<Loader fullScreen />}>
      <Routes>
        {/* Language-scoped routes */}
        <Route path="/:lang" element={<LanguageLayout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="work" element={<Portfolio />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
} 