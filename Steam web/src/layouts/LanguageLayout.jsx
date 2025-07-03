import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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

  // Keep i18next in sync with the URL segment.
  useEffect(() => {
    if (lang && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
} 