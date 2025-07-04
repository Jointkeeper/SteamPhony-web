import React, { useEffect, useState, Fragment } from 'react';

// Placeholder motion proxy – returns <div {...props}/> preserving layout
function createPlaceholderMotion() {
  return new Proxy(
    {},
    {
      get: () => (props) => React.createElement('div', props),
    }
  );
}

export default function useAnimation() {
  const [lib, setLib] = useState(null);

  useEffect(() => {
    let cancelled = false;
    import('framer-motion')
      .then((mod) => {
        if (!cancelled) setLib(mod);
      })
      .catch(() => console.warn('framer-motion failed to load'));
    return () => {
      cancelled = true;
    };
  }, []);

  if (lib) {
    return { motion: lib.motion, AnimatePresence: lib.AnimatePresence, ready: true };
  }
  return { motion: createPlaceholderMotion(), AnimatePresence: Fragment, ready: false };
} 