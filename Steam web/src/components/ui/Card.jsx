import clsx from 'clsx';

export default function Card({ variant = 'default', hover = true, className, children, ...props }) {
  const base = 'rounded-2xl bg-white transition-all';
  const variants = {
    default: 'shadow-md',
    hover: hover ? 'hover:shadow-xl hover:-translate-y-2' : '',
    glass: 'backdrop-blur-lg bg-white/60 shadow-lg',
  };
  return (
    <div className={clsx(base, variants[variant] || '', variants.hover, className)} {...props}>
      {children}
    </div>
  );
} 