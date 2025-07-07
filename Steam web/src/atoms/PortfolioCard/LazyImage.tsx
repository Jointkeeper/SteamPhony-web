import React, { useEffect, useRef, useState } from 'react';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  placeholderSrc?: string; // low-res preview (base64)
  skeletonClassName?: string;
  /** Optional WebP source for modern browsers */
  srcWebp?: string;
  /** Optional AVIF source for browsers that support AVIF */
  srcAvif?: string;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  srcWebp,
  srcAvif,
  placeholderSrc,
  skeletonClassName = 'bg-[var(--trust-50)]',
  alt = '',
  loading = 'lazy',
  ...rest
}) => {
  const [isLoaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            img.src = src as string;
            observer.disconnect();
          }
        });
      },
      { rootMargin: '100px' },
    );
    observer.observe(img);
    return () => observer.disconnect();
  }, [src]);

  return (
    <>
      {!isLoaded && (
        <div
          className={skeletonClassName + ' animate-pulse h-full w-full'}
          style={{ backgroundImage: placeholderSrc ? `url(${placeholderSrc})` : undefined }}
        />
      )}

      {/* Используем <picture> для современных форматов (AVIF / WebP) */}
      <picture className={isLoaded ? undefined : 'hidden'}>
        {srcAvif && <source srcSet={srcAvif} type="image/avif" />}
        {srcWebp && <source srcSet={srcWebp} type="image/webp" />}
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img
          ref={imgRef}
          alt={alt}
          loading={loading}
          {...rest}
          onLoad={() => setLoaded(true)}
          className="w-full h-full object-cover"
        />
      </picture>
    </>
  );
};

export default LazyImage; 