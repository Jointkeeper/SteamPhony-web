import React, { useEffect, useRef, useState } from 'react';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  placeholderSrc?: string; // low-res preview (base64)
  skeletonClassName?: string;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
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
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img
        ref={imgRef}
        alt={alt}
        loading={loading}
        {...rest}
        onLoad={() => setLoaded(true)}
        className={isLoaded ? 'w-full h-full object-cover' : 'hidden'}
      />
    </>
  );
};

export default LazyImage; 