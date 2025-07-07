/**
 * Content Templates System
 * Reusable templates for all content types with default values and validation
 */

import type {
  PageContent,
  Service,
  PortfolioProject,
  TeamMember,
  Testimonial,
  BlogPost,
  HeroSection,
  CallToAction,
  LocalizedContent,
  SEOMetadata,
  MediaAsset,
} from '../types/content';

// ===============================
// TEMPLATE HELPERS
// ===============================

export const createLocalizedContent = (en: string, ru: string = en): LocalizedContent => ({
  en,
  ru,
});

export const createDefaultSEO = (
  title: LocalizedContent,
  description: LocalizedContent,
  keywords: string[] = []
): SEOMetadata => ({
  title,
  description,
  keywords,
});

export const createDefaultCTA = (
  text: LocalizedContent,
  url: string = '/contact'
): CallToAction => ({
  text,
  url,
  type: 'primary',
  size: 'lg',
  style: 'solid',
});

export const createPlaceholderImage = (
  width: number = 600,
  height: number = 400,
  alt: string = 'Placeholder'
): MediaAsset => ({
  id: `placeholder-${Date.now()}`,
  url: `https://placehold.co/${width}x${height}?text=${encodeURIComponent(alt)}`,
  alt: createLocalizedContent(alt),
  width,
  height,
  format: 'jpg',
  size: 0,
});

// ===============================
// PAGE TEMPLATES
// ===============================

export const homePageTemplate: Partial<PageContent> = {
  slug: 'home',
  type: 'page',
  status: 'draft',
  seo: createDefaultSEO(
    createLocalizedContent(
      'Steamphony - Architecture of Trust in Digital Space',
      'Steamphony - Архитектура доверия в цифровом пространстве'
    ),
    createLocalizedContent(
      'Transform your business through technology. Web development, marketing, comprehensive digital solutions.',
      'Трансформируем бизнес через технологии. Веб-разработка, маркетинг, комплексные digital-решения.'
    ),
    ['web development', 'digital marketing', 'business transformation', 'react', 'next.js']
  ),
  sections: [
    {
      id: 'hero',
      type: 'hero',
      order: 1,
      visible: true,
      content: {
        title: createLocalizedContent(
          'Transform Business Through Technology',
          'Трансформируем бизнес через технологии'
        ),
        subtitle: createLocalizedContent(
          'Web development, marketing and comprehensive digital solutions',
          'Веб-разработка, маркетинг и комплексные digital-решения'
        ),
        description: createLocalizedContent(
          'for your business growth',
          'для роста вашего бизнеса'
        ),
        primaryCTA: createDefaultCTA(
          createLocalizedContent('Get Growth Strategy', 'Получить стратегию роста')
        ),
        trustSignal: createLocalizedContent(
          'Helping companies grow since 2024',
          'Помогаем компаниям расти с 2024'
        ),
      },
    },
    {
      id: 'features',
      type: 'features',
      order: 2,
      visible: true,
      content: {
        title: createLocalizedContent('What We Do', 'Что мы делаем'),
        subtitle: createLocalizedContent(
          'Comprehensive approach to digital transformation of your business',
          'Комплексный подход к digital-трансформации вашего бизнеса'
        ),
      },
    },
    {
      id: 'portfolio',
      type: 'portfolio',
      order: 3,
      visible: true,
      content: {
        title: createLocalizedContent(
          'Results That Speak for Themselves',
          'Результаты, которые говорят сами за себя'
        ),
        subtitle: createLocalizedContent(
          'Temporary projects until real case studies launch',
          'Временные проекты до запуска реальных кейсов'
        ),
      },
    },
    {
      id: 'testimonials',
      type: 'testimonials',
      order: 4,
      visible: true,
      content: {},
    },
    {
      id: 'process',
      type: 'process',
      order: 5,
      visible: true,
      content: {
        title: createLocalizedContent('How We Work', 'Как мы работаем'),
        subtitle: createLocalizedContent(
          'Transparent process with measurable results at every stage',
          'Прозрачный процесс с измеримыми результатами на каждом этапе'
        ),
      },
    },
    {
      id: 'cta',
      type: 'cta',
      order: 6,
      visible: true,
      content: {
        title: createLocalizedContent(
          'Discover Your Business Growth Potential',
          'Узнайте потенциал роста вашего бизнеса'
        ),
        subtitle: createLocalizedContent(
          'Get a free audit and personalized development strategy',
          'Получите бесплатный аудит и персональную стратегию развития'
        ),
        primaryCTA: createDefaultCTA(
          createLocalizedContent('Get Free Audit', 'Получить аудит бесплатно')
        ),
      },
    },
  ],
};

export const servicesPageTemplate: Partial<PageContent> = {
  slug: 'services',
  type: 'page',
  status: 'draft',
  seo: createDefaultSEO(
    createLocalizedContent(
      'Services and Expertise - Steamphony Digital Agency',
      'Услуги и экспертиза - Steamphony Digital Agency'
    ),
    createLocalizedContent(
      'Web development, digital marketing and comprehensive solutions for your business growth',
      'Веб-разработка, digital-маркетинг и комплексные решения для роста вашего бизнеса'
    ),
    ['web development', 'digital marketing', 'seo', 'react development', 'business solutions']
  ),
  sections: [
    {
      id: 'hero',
      type: 'hero',
      order: 1,
      visible: true,
      content: {
        title: createLocalizedContent('Services and Expertise', 'Услуги и экспертиза'),
        subtitle: createLocalizedContent(
          'Comprehensive approach to your business development in digital environment',
          'Комплексный подход к развитию вашего бизнеса в digital-среде'
        ),
      },
    },
  ],
};

export const portfolioPageTemplate: Partial<PageContent> = {
  slug: 'portfolio',
  type: 'page',
  status: 'draft',
  seo: createDefaultSEO(
    createLocalizedContent(
      'Portfolio and Case Studies - Steamphony Digital Agency',
      'Портфолио и кейсы - Steamphony Digital Agency'
    ),
    createLocalizedContent(
      'Our work results: case studies with metrics and ROI. Web development, marketing, digital transformation.',
      'Результаты нашей работы: кейсы с метриками и ROI. Веб-разработка, маркетинг, digital-трансформация.'
    ),
    ['portfolio', 'case studies', 'web development results', 'marketing results', 'roi']
  ),
};

export const contactPageTemplate: Partial<PageContent> = {
  slug: 'contact',
  type: 'page',
  status: 'draft',
  seo: createDefaultSEO(
    createLocalizedContent(
      'Contact - Steamphony Digital Agency',
      'Контакты - Steamphony Digital Agency'
    ),
    createLocalizedContent(
      'Contact us to discuss your project. Free consultation, personalized development strategy.',
      'Свяжитесь с нами для обсуждения вашего проекта. Бесплатная консультация, персональная стратегия развития.'
    ),
    ['contact', 'consultation', 'project discussion', 'free audit']
  ),
};

// ===============================
// SERVICE TEMPLATES
// ===============================

export const webDevelopmentServiceTemplate: Partial<Service> = {
  type: 'service',
  title: createLocalizedContent('Web Development', 'Веб-разработка'),
  slug: 'web-development',
  shortDescription: createLocalizedContent(
    'Websites that sell 24/7',
    'Сайты, которые продают 24/7'
  ),
  fullDescription: createLocalizedContent(
    'Modern, fast, and conversion-optimized websites built with the latest technologies.',
    'Современные, быстрые и оптимизированные под конверсию сайты на новейших технологиях.'
  ),
  category: {
    id: 'development',
    name: createLocalizedContent('Development', 'Разработка'),
    slug: 'development',
    order: 1,
  },
  features: [
    {
      id: 'react-apps',
      title: createLocalizedContent('Next.js/React Applications', 'Next.js/React приложения'),
      description: createLocalizedContent(
        'Modern applications with server-side rendering',
        'Современные приложения с серверным рендерингом'
      ),
      icon: '⚛️',
      included: true,
    },
    {
      id: 'ecommerce',
      title: createLocalizedContent('E-commerce Platforms', 'E-commerce платформы'),
      description: createLocalizedContent(
        'Full-featured online stores with payment integration',
        'Полнофункциональные интернет-магазины с интеграцией платежей'
      ),
      icon: '🛒',
      included: true,
    },
    {
      id: 'pwa',
      title: createLocalizedContent('Progressive Web Apps', 'Progressive Web Apps'),
      description: createLocalizedContent(
        'Web applications that work like native mobile apps',
        'Веб-приложения, работающие как нативные мобильные приложения'
      ),
      icon: '📱',
      included: true,
    },
  ],
  pricing: {
    type: 'project',
    currency: 'USD',
    note: createLocalizedContent(
      'Price depends on project complexity and scope',
      'Цена зависит от сложности и объема проекта'
    ),
  },
  process: [
    {
      id: 'analysis',
      title: createLocalizedContent('Analysis', 'Анализ'),
      description: createLocalizedContent(
        'We study your business and goals',
        'Изучаем ваш бизнес и цели'
      ),
      order: 1,
    },
    {
      id: 'design',
      title: createLocalizedContent('Design', 'Дизайн'),
      description: createLocalizedContent(
        'Create user interface and experience',
        'Создаем пользовательский интерфейс и опыт'
      ),
      order: 2,
    },
    {
      id: 'development',
      title: createLocalizedContent('Development', 'Разработка'),
      description: createLocalizedContent(
        'Code the application with best practices',
        'Программируем приложение по лучшим практикам'
      ),
      order: 3,
    },
    {
      id: 'testing',
      title: createLocalizedContent('Testing', 'Тестирование'),
      description: createLocalizedContent(
        'Thorough testing before launch',
        'Тщательное тестирование перед запуском'
      ),
      order: 4,
    },
    {
      id: 'launch',
      title: createLocalizedContent('Launch', 'Запуск'),
      description: createLocalizedContent(
        'Deploy and monitor the application',
        'Развертываем и мониторим приложение'
      ),
      order: 5,
    },
  ],
  deliverables: [
    createLocalizedContent('Fully functional website/application', 'Полнофункциональный сайт/приложение'),
    createLocalizedContent('Source code and documentation', 'Исходный код и документация'),
    createLocalizedContent('Performance optimization', 'Оптимизация производительности'),
    createLocalizedContent('SEO optimization', 'SEO оптимизация'),
    createLocalizedContent('Mobile responsiveness', 'Мобильная адаптивность'),
    createLocalizedContent('3-month warranty', '3 месяца гарантии'),
  ],
  technologies: [
    {
      id: 'react',
      name: 'React',
      category: 'frontend',
      proficiency: 'expert',
    },
    {
      id: 'nextjs',
      name: 'Next.js',
      category: 'frontend',
      proficiency: 'expert',
    },
    {
      id: 'typescript',
      name: 'TypeScript',
      category: 'frontend',
      proficiency: 'expert',
    },
    {
      id: 'tailwind',
      name: 'Tailwind CSS',
      category: 'frontend',
      proficiency: 'expert',
    },
  ],
  icon: '💻',
  color: 'purple',
  status: 'published',
};

export const marketingServiceTemplate: Partial<Service> = {
  type: 'service',
  title: createLocalizedContent('Digital Marketing', 'Маркетинг'),
  slug: 'digital-marketing',
  shortDescription: createLocalizedContent(
    'Customer acquisition on autopilot',
    'Привлечение клиентов на автопилоте'
  ),
  category: {
    id: 'marketing',
    name: createLocalizedContent('Marketing', 'Маркетинг'),
    slug: 'marketing',
    order: 2,
  },
  features: [
    {
      id: 'seo',
      title: createLocalizedContent('SEO Optimization', 'SEO оптимизация'),
      description: createLocalizedContent(
        'Improve search engine rankings',
        'Улучшаем позиции в поисковых системах'
      ),
      icon: '🔍',
      included: true,
    },
    {
      id: 'email',
      title: createLocalizedContent('Email Automation', 'Email-автоматизация'),
      description: createLocalizedContent(
        'Automated email campaigns and nurturing',
        'Автоматизированные email-кампании и прогрев'
      ),
      icon: '📧',
      included: true,
    },
  ],
  icon: '📈',
  color: 'brown',
  status: 'published',
};

// ===============================
// PORTFOLIO PROJECT TEMPLATES
// ===============================

export const portfolioProjectTemplate: Partial<PortfolioProject> = {
  type: 'portfolio',
  status: 'draft',
  featured: false,
  media: {
    hero: createPlaceholderImage(800, 600, 'Project Hero'),
    gallery: [
      createPlaceholderImage(600, 400, 'Gallery Image 1'),
      createPlaceholderImage(600, 400, 'Gallery Image 2'),
    ],
  },
  timeline: {
    duration: '3 months',
    phases: [
      {
        name: createLocalizedContent('Discovery & Planning', 'Исследование и планирование'),
        duration: '2 weeks',
        deliverables: [
          createLocalizedContent('Project requirements', 'Требования к проекту'),
          createLocalizedContent('Technical specification', 'Техническое задание'),
        ],
        order: 1,
      },
      {
        name: createLocalizedContent('Design & Development', 'Дизайн и разработка'),
        duration: '8 weeks',
        deliverables: [
          createLocalizedContent('UI/UX Design', 'UI/UX дизайн'),
          createLocalizedContent('Frontend development', 'Фронтенд разработка'),
          createLocalizedContent('Backend development', 'Бэкенд разработка'),
        ],
        order: 2,
      },
      {
        name: createLocalizedContent('Testing & Launch', 'Тестирование и запуск'),
        duration: '2 weeks',
        deliverables: [
          createLocalizedContent('Quality assurance', 'Контроль качества'),
          createLocalizedContent('Performance optimization', 'Оптимизация производительности'),
          createLocalizedContent('Production deployment', 'Развертывание в продакшене'),
        ],
        order: 3,
      },
    ],
  },
  color: 'purple',
};

// ===============================
// TEAM MEMBER TEMPLATES
// ===============================

export const teamMemberTemplate: Partial<TeamMember> = {
  type: 'team-member',
  status: 'draft',
  availability: true,
  avatar: createPlaceholderImage(400, 400, 'Team Member'),
  social: {
    email: 'member@steamphony.com',
  },
  languages: [
    {
      code: 'en',
      name: 'English',
      level: 'fluent',
    },
    {
      code: 'ru',
      name: 'Russian',
      level: 'native',
    },
  ],
  experience: [],
  education: [],
  certifications: [],
  order: 1,
};

// ===============================
// TESTIMONIAL TEMPLATES
// ===============================

export const testimonialTemplate: Partial<Testimonial> = {
  type: 'testimonial',
  status: 'draft',
  rating: 5,
  featured: false,
  category: 'results',
  verified: true,
  author: {
    name: 'Client Name',
    title: createLocalizedContent('CEO', 'Генеральный директор'),
    company: 'Company Name',
  },
};

// ===============================
// BLOG POST TEMPLATES
// ===============================

export const blogPostTemplate: Partial<BlogPost> = {
  type: 'blog-post',
  status: 'draft',
  featured: false,
  featuredImage: createPlaceholderImage(800, 400, 'Blog Post'),
  readingTime: 5,
  tags: [],
  category: {
    id: 'general',
    name: createLocalizedContent('General', 'Общее'),
    slug: 'general',
    description: createLocalizedContent('General blog posts', 'Общие статьи блога'),
    color: '#6B7280',
    order: 1,
  },
};

// ===============================
// TEMPLATE REGISTRY
// ===============================

export const contentTemplates = {
  page: {
    home: homePageTemplate,
    services: servicesPageTemplate,
    portfolio: portfolioPageTemplate,
    contact: contactPageTemplate,
  },
  service: {
    webDevelopment: webDevelopmentServiceTemplate,
    marketing: marketingServiceTemplate,
  },
  portfolio: {
    default: portfolioProjectTemplate,
  },
  teamMember: {
    default: teamMemberTemplate,
  },
  testimonial: {
    default: testimonialTemplate,
  },
  blogPost: {
    default: blogPostTemplate,
  },
};

export const getTemplate = (type: string, subtype: string = 'default') => {
  return contentTemplates[type as keyof typeof contentTemplates]?.[subtype] || null;
};

export default contentTemplates; 