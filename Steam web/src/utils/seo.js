// SEO метаданные для сайта Steamphony
export const siteMetadata = {
  siteName: 'Steamphony',
  siteUrl: 'https://www.steamphony.com',
  defaultTitle: 'Steamphony - Архитектура доверия в цифровом пространстве',
  titleTemplate: '%s | Steamphony Digital Agency',
  defaultDescription: 'Трансформируем бизнес через технологии. Веб-разработка, digital-маркетинг, комплексные решения для роста вашего бизнеса.',
  defaultImage: '/og-image.jpg',
  twitterUsername: '@steamphony',
  keywords: [
    'веб-разработка',
    'digital маркетинг',
    'digital агентство',
    'разработка сайтов',
    'SEO оптимизация',
    'performance маркетинг',
    'digital трансформация',
    'Next.js разработка',
    'React разработка',
    'e-commerce платформы'
  ]
};

// Структурированные данные для Organization
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Steamphony',
  url: 'https://www.steamphony.com',
  logo: 'https://www.steamphony.com/logo.png',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+7-495-123-45-67',
    contactType: 'customer service',
    availableLanguage: ['Russian', 'English']
  },
  sameAs: [
    'https://www.linkedin.com/company/steamphony',
    'https://twitter.com/steamphony',
    'https://www.instagram.com/steamphony',
    'https://t.me/steamphony'
  ]
};

// Функция для генерации метаданных страницы
export function generatePageMetadata({
  title,
  description,
  image,
  pathname,
  noindex = false
}) {
  const metadata = {
    title: title ? `${title} | Steamphony` : siteMetadata.defaultTitle,
    description: description || siteMetadata.defaultDescription,
    image: image || siteMetadata.defaultImage,
    url: `${siteMetadata.siteUrl}${pathname}`,
    noindex
  };

  return metadata;
}

// Функция для генерации структурированных данных для услуг
export function generateServiceSchema(service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.type,
    provider: {
      '@type': 'Organization',
      name: 'Steamphony'
    },
    description: service.description,
    offers: {
      '@type': 'Offer',
      priceRange: service.priceRange || '$$'
    }
  };
}

// Функция для генерации breadcrumbs
export function generateBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteMetadata.siteUrl}${item.url}`
    }))
  };
} 