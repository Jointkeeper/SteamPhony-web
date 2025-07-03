import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// English translations
import enCommon from '../locales/en/common.json';
import enHome from '../locales/en/home.json';
import enServices from '../locales/en/services.json';
import enForms from '../locales/en/forms.json';
import enNavigation from '../locales/en/navigation.json';

// Russian translations
import ruCommon from '../locales/ru/common.json';
import ruHome from '../locales/ru/home.json';
import ruServices from '../locales/ru/services.json';
import ruForms from '../locales/ru/forms.json';
import ruNavigation from '../locales/ru/navigation.json';

const resources = {
  en: {
    common: enCommon,
    home: enHome,
    services: enServices,
    forms: enForms,
    navigation: enNavigation,
  },
  ru: {
    common: ruCommon,
    home: ruHome,
    services: ruServices,
    forms: ruForms,
    navigation: ruNavigation,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    defaultNS: 'common',
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'steamphony_language',
    },
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n; 