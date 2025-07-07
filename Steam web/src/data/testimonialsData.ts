export interface Testimonial {
  id: string;
  name: string;
  avatar: string; // URL or local asset path
  text: string;
  rating: 1 | 2 | 3 | 4 | 5;
  project: string;
  results: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Алексей Иванов',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    text: 'Команда Steamphony превзошла все наши ожидания. Наш сайт загрузился в 2 раза быстрее, а конверсия выросла на 35 %.',
    rating: 5,
    project: 'Redesign SaaS платформы',
    results: '+35 % конверсии, -50 % LCP',
  },
  {
    id: 't2',
    name: 'Elena Petrova',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    text: 'Благодаря ребятам мы вышли на зарубежный рынок за рекордные 3 недели и удвоили выручку.',
    rating: 5,
    project: 'E-commerce международный запуск',
    results: 'x2 выручка, +120 % трафика',
  },
  {
    id: 't3',
    name: 'Michael Smith',
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
    text: 'Отличная коммуникация и прозрачный процесс. Рекомендую Steamphony как технологического партнёра.',
    rating: 4,
    project: 'CRM интеграция',
    results: '-40 % времени на обработку лидов',
  },
  {
    id: 't4',
    name: 'Юлия Кузнецова',
    avatar: 'https://randomuser.me/api/portraits/women/37.jpg',
    text: 'Получили современный PWA-приложение, которое повысило вовлечённость пользователей.',
    rating: 5,
    project: 'PWA для маркетплейса',
    results: '+25 % времени в приложении',
  },
  {
    id: 't5',
    name: 'Carlos García',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    text: 'Проект выполнен точно в срок и в рамках бюджета. Команда гибко реагировала на изменения.',
    rating: 5,
    project: 'FinTech мобильное приложение',
    results: 'go-live за 8 недель',
  },
  {
    id: 't6',
    name: 'Sophie Müller',
    avatar: 'https://randomuser.me/api/portraits/women/52.jpg',
    text: 'UI/UX вырос на новый уровень, а показатели Core Web Vitals стали зелёными.',
    rating: 5,
    project: 'Performance оптимизация',
    results: 'CLS < 0.1, LCP 1.8 s',
  },
]; 