import ReactGA from 'react-ga4';
import Cookies from 'js-cookie';

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
const IS_PRODUCTION = import.meta.env.VITE_ENVIRONMENT === 'production';
const IS_DEVELOPMENT = import.meta.env.VITE_ENVIRONMENT === 'development';

export const initGA = () => {
  if (GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
    ReactGA.initialize(GA_MEASUREMENT_ID, {
      testMode: !IS_PRODUCTION,
      debug: IS_DEVELOPMENT,
      gtagOptions: {
        send_page_view: false,
      },
    });
    // eslint-disable-next-line no-console
    console.log(`GA4 initialized: ${GA_MEASUREMENT_ID} (${import.meta.env.VITE_ENVIRONMENT})`);
  } else {
    // eslint-disable-next-line no-console
    console.warn('GA4 not initialized: invalid or missing measurement ID');
  }
};

export const trackPageView = (path, title) => {
  if (GA_MEASUREMENT_ID) {
    ReactGA.send({ hitType: 'pageview', page: path, title });
  }
};

export const trackEvent = (action, category, label, value) => {
  if (GA_MEASUREMENT_ID) {
    ReactGA.event({ action, category, label, value });
  }
};

// Логгер событий
export function logEvent(category, action, label = '', value = undefined) {
  ReactGA.event({ category, action, label, value });
  // Можно добавить дополнительный вывод в консоль для отладки
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log('[LOG EVENT]', { category, action, label, value });
  }
}

// Cookie аналитика
export function setAnalyticsCookie(name, value, days = 365) {
  Cookies.set(name, value, { expires: days });
}

export function getAnalyticsCookie(name) {
  return Cookies.get(name);
}

// Пример использования: logEvent('User', 'Visit', 'HomePage');
// Пример использования: setAnalyticsCookie('visited', 'true');
