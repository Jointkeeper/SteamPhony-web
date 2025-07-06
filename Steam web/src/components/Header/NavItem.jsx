import { memo, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { sendDuration } from '../../utils/performance';
import { prefetchLink } from '../../utils/prefetch';

/**
 * NavItem – single navigation link with trust-building micro-interactions.
 * • Gradient underline grows from left on hover/focus/active
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

    // Prefetch predicted next route after 500ms hover
    setTimeout(() => {
      if (hoveredRef.current) {
        prefetchLink(to);
      }
    }, 500);
  };

  const handleMouseLeave = () => {
    hoveredRef.current = false;
  };

  if (highlight) {
    return (
      <NavLink
        to={to}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="nav-cta"
      >
        {children}
      </NavLink>
    );
  }

  return (
    <NavLink
      to={to}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={({ isActive }) =>
        clsx(
          'nav-link',
          isActive && 'nav-link--active'
        )
      }
      aria-current={({ isActive }) => (isActive ? 'page' : undefined)}
    >
      {children}
    </NavLink>
  );
});

export default NavItem; 