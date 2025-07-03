import { useEffect, useRef, Suspense } from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';

import NavItem from './NavItem';
import LanguageSwitcher from '../LanguageSwitcher';
import useAnimation from '../../hooks/useAnimation';
import { sendDuration } from '../../utils/performance';

const focusableSelectors =
  'a[href], area[href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';

function useBodyScrollLock(locked) {
  useEffect(() => {
    if (locked) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [locked]);
}

function useFocusTrap(containerRef, isOpen) {
  useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    const firstFocusable = containerRef.current.querySelector(focusableSelectors);
    const focusable = containerRef.current.querySelectorAll(focusableSelectors);
    const lastFocusable = focusable[focusable.length - 1];

    const previouslyFocused = document.activeElement;
    firstFocusable?.focus();

    function handleKeyDown(e) {
      if (e.key !== 'Tab') return;
      if (focusable.length === 0) return;

      if (e.shiftKey) {
        // backwards
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        // forwards
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [containerRef, isOpen]);
}

export default function MobileDrawer({ isOpen, onClose, navigationItems }) {
  const containerRef = useRef(null);
  const location = useLocation();

  // Animation library (lazy)
  const { motion, AnimatePresence } = useAnimation();

  // Track open / close durations
  const actionRef = useRef({ type: null, start: null });

  useBodyScrollLock(isOpen);
  useFocusTrap(containerRef, isOpen);

  // Close on route change
  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Record action start time on state change
  useEffect(() => {
    actionRef.current = { type: isOpen ? 'open' : 'close', start: performance.now() };
  }, [isOpen]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <Suspense fallback={null}>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            {motion && (
              <motion.div
                key="overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[999]"
                onClick={onClose}
              />
            )}

            {/* Drawer */}
            {motion && (
              <motion.div
                key="drawer"
                ref={containerRef}
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 250 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(event, info) => {
                  if (info.offset.x > 120) onClose();
                }}
                onAnimationComplete={() => {
                  const { type, start } = actionRef.current || {};
                  if (start && type) {
                    sendDuration(`drawer_${type}_ms`, performance.now() - start);
                    actionRef.current = { type: null, start: null };
                  }
                }}
                role="dialog"
                aria-modal="true"
                aria-label="Mobile navigation menu"
                className="fixed top-0 right-0 h-screen w-[85vw] max-w-sm bg-white z-[1000] p-6 flex flex-col gap-6 overflow-y-auto shadow-lg"
              >
                <nav aria-label="Mobile navigation" className="flex flex-col gap-4 flex-1">
                  {navigationItems.map((item) => (
                    <NavItem key={item.key} to={item.path} highlight={item.highlight} onClick={onClose}>
                      {item.label}
                    </NavItem>
                  ))}
                </nav>

                {/* Language switcher at bottom */}
                <div className="mt-auto">
                  <LanguageSwitcher />
                </div>
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>
    </Suspense>,
    document.body
  );
} 