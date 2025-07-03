const prefetched = new Set();

export function prefetchLink(href) {
  if (!href || prefetched.has(href)) return;
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  link.as = 'document';
  document.head.appendChild(link);
  prefetched.add(href);
} 