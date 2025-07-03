import React, { useEffect, useState, Fragment } from 'react';

// Placeholder motion proxy – returns <div {...props}/> preserving layout
function createPlaceholderMotion() {
  return new Proxy(
    {},
    {
      get: () => (props) => React.createElement('div', props), // placeholder element
    }
  );
}

/**
 * useAnimation – lazy-loads framer-motion only when requested.
 * Возвращает объект { motion, AnimatePresence, ready }.
 * Пока пакет не загружен – подставляет заглушки, чтобы избежать layout-shift
 * и ошибок рендеринга на SSR.
 */
export default function useAnimation() {
  const [lib, setLib] = useState(null);

  useEffect(() => {
    let cancelled = false;
    // Динамический импорт. Срабатывает только при первом использовании hook.
    import('framer-motion')
      .then((mod) => {
        if (!cancelled) setLib(mod);
      })
      .catch(() => {
        // eslint-disable-next-line no-console
        console.warn('⚠️  framer-motion failed to load – falling back to static rendering');
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (lib) {
    return { motion: lib.motion, AnimatePresence: lib.AnimatePresence, ready: true };
  }

  // Пакет ещё не загружен – используем заглушки.
  return { motion: createPlaceholderMotion(), AnimatePresence: Fragment, ready: false };
} 