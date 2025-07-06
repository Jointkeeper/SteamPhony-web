import clsx from 'clsx';

export default function FilterChip({ active, children, onClick, className, ...props }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'filter-chip',
        active && 'active',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
} 