import React from 'react';
import clsx from 'clsx';

export interface StarRatingProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Current rating value (1–5) */
  rating: 1 | 2 | 3 | 4 | 5;
  /** Pixel size of a single star */
  size?: number;
}

const StarIcon = ({ filled, size }: { filled: boolean; size: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    role="presentation"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  size = 20,
  className,
  ...rest
}) => {
  const stars = Array.from({ length: 5 }, (_, i) => (
    <StarIcon key={i} filled={i < rating} size={size} />
  ));

  return (
    <div
      aria-label={`${rating} out of 5 stars`}
      role="img"
      className={clsx('inline-flex gap-0.5 text-yellow-400', className)}
      {...rest}
    >
      {stars}
    </div>
  );
};

StarRating.displayName = 'StarRating';

export default StarRating; 