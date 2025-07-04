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

  // If user prefers reduced motion, skip importing animation library
  const prefersReduced = typeof window !== 'undefined' &&
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (prefersReduced) return; // don't load lib, keep placeholder

    let cancelled = false;
    import('framer-motion')
      .then((mod) => {
        if (!cancelled) setLib(mod);
      })
      .catch(() => console.warn('framer-motion failed to load'));
    return () => {
      cancelled = true;
    };
  }, [prefersReduced]);

  if (lib && !prefersReduced) {
    return { motion: lib.motion, AnimatePresence: lib.AnimatePresence, ready: true };
  }
  // Fallback placeholder (either loading or reduced motion)
  return { motion: createPlaceholderMotion(), AnimatePresence: Fragment, ready: false };
} 