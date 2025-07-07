import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
export const LazyImage = ({ src, srcWebp, srcAvif, placeholderSrc, skeletonClassName = 'bg-[var(--trust-50)]', alt = '', loading = 'lazy', ...rest }) => {
    const [isLoaded, setLoaded] = useState(false);
    const imgRef = useRef(null);
    useEffect(() => {
        const img = imgRef.current;
        if (!img)
            return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    img.src = src;
                    observer.disconnect();
                }
            });
        }, { rootMargin: '100px' });
        observer.observe(img);
        return () => observer.disconnect();
    }, [src]);
    return (_jsxs(_Fragment, { children: [!isLoaded && (_jsx("div", { className: skeletonClassName + ' animate-pulse h-full w-full', style: { backgroundImage: placeholderSrc ? `url(${placeholderSrc})` : undefined } })), _jsxs("picture", { className: isLoaded ? undefined : 'hidden', children: [srcAvif && _jsx("source", { srcSet: srcAvif, type: "image/avif" }), srcWebp && _jsx("source", { srcSet: srcWebp, type: "image/webp" }), _jsx("img", { ref: imgRef, alt: alt, loading: loading, ...rest, onLoad: () => setLoaded(true), className: "w-full h-full object-cover" })] })] }));
};
export default LazyImage;
