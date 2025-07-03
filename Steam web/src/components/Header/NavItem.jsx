import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

/**
 * NavItem – single navigation link with trust-building micro-interactions.
 * • Gradient underline grows from center on hover/focus/active
 * • Slight upward shift communicates responsiveness (progressive trust)
 *
 * highlight – renders link as CTA button (e.g. Contact)
 */
const NavItem = memo(function NavItem({ to, children, highlight, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
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