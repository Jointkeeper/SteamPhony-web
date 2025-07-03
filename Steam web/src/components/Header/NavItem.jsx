import { memo, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { sendDuration } from '../../utils/performance';

/**
 * NavItem – single navigation link with trust-building micro-interactions.
 * • Gradient underline grows from center on hover/focus/active
 * • Slight upward shift communicates responsiveness (progressive trust)
 *
 * highlight – renders link as CTA button (e.g. Contact)
 */
let firstHoverRecorded = false;

const NavItem = memo(function NavItem({ to, children, highlight, onClick }) {
  const hoveredRef = useRef(false);

  const handleMouseEnter = () => {
    if (!firstHoverRecorded) {
      // performance.now() – время с момента навигации
      sendDuration('first_hover_delay', performance.now());
      firstHoverRecorded = true;
    }
    hoveredRef.current = true;
  };

  return (
    <NavLink
      to={to}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      className={({ isActive }) =>
        clsx(
          'nav-item',
          {
            'bg-[var(--color-action)] text-white px-4 py-2 rounded-md hover:bg-[var(--color-action-light)]': highlight,
          },
          isActive && !highlight && 'text-[var(--color-authority)]'
        )
      }
      aria-current={({ isActive }) => (isActive ? 'page' : undefined)}
    >
      {children}
    </NavLink>
  );
});

export default NavItem; 