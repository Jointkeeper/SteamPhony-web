import React from 'react';
import LazyImage from './LazyImage';
import clsx from 'clsx';

export interface PortfolioCardProps {
  title: string;
  category: string;
  image: string;
  placeholder?: string;
  description: string;
  results?: string[];
  href?: string;
}

export const PortfolioCard: React.FC<PortfolioCardProps> = ({
  title,
  category,
  image,
  placeholder,
  description,
  results,
  href,
}) => {
  const content = (
    <article
      className="relative flex flex-col overflow-hidden rounded-lg shadow-md transition-transform duration-[var(--duration-medium)] ease-[var(--ease-in-out)] will-change-transform hover:-translate-y-1 hover:shadow-xl md:hover:rotate-y-3d"
      style={{ perspective: '1000px' }}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <LazyImage src={image} placeholderSrc={placeholder} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-1 flex-col gap-2 bg-white p-4 dark:bg-[var(--trust-800)] dark:text-white">
        <span className="text-sm font-medium text-[var(--trust-600)]">{category}</span>
        <h3 className="text-lg font-semibold line-clamp-2">{title}</h3>
        <p className="text-sm line-clamp-3 flex-1">{description}</p>
        {results && results.length > 0 && (
          <ul className="mt-2 list-disc pl-4 text-xs text-[var(--trust-700)] dark:text-[var(--trust-50)]">
            {results.map((res) => (
              <li key={res}>{res}</li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );

  if (href) {
    return (
      <a href={href} className="block transform-style-3d hover:rotate-y-[-4deg] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--trust-500)]">
        {content}
      </a>
    );
  }
  return content;
};

export default PortfolioCard; 