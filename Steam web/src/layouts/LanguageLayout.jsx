import { useEffect } from 'react';
import { Outlet, useParams, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAnimation from '../hooks/useAnimation';

import Layout from '../components/Layout';

/**
 * LanguageLayout ensures that the active i18next language always matches the
 * current `/:lang` URL segment. It delegates all structure (header, footer,
 * etc.) to the existing <Layout/> component while exposing an <Outlet/> for the
 * nested page component.
 */
export default function LanguageLayout() {
  const { lang } = useParams();
  const { i18n } = useTranslation();
  const location = useLocation();
  const { motion, AnimatePresence } = useAnimation();

  // Keep i18next in sync with the URL segment.
  useEffect(() => {
    if (lang && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
} 