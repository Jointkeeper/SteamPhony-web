import { Helmet } from 'react-helmet-async';
import { PortfolioCard } from '../atoms/PortfolioCard';
import useAnimation from '../hooks/useAnimation';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useEffect, useState } from 'react';
import FilterChip from '../components/ui/FilterChip';

// Static placeholder items – replace with real CMS data later
const _unusedPortfolioItems = [
  {
    id: 1,
    title: 'Gusto Italiano Website',
    category: 'Restaurant',
    image: '/images/portfolio/restaurant1.jpg',
    placeholder: '/images/portfolio/restaurant1_thumb.jpg',
    description: 'Redesign for an authentic Italian restaurant with online ordering.',
    results: ['+35% online orders', '+20% conversion'],
  },
  {
    id: 2,
    title: 'Beauty Bliss Salon Landing',
    category: 'Beauty',
    image: '/images/portfolio/salon1.jpg',
    placeholder: '/images/portfolio/salon1_thumb.jpg',
    description: 'Lead-gen landing page for premium beauty salon in LA.',
    results: ['+48% bookings', 'SEO #1 local search'],
  },
  // ... add more items
];

export default function Portfolio() {
  const { motion } = useAnimation();

  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);


  // MOCK: Используем статические данные, если API не доступен
  useEffect(() => {
    // Здесь можно заменить на реальный fetch, если появится backend
    const staticProjects = [
      {
        id: 1,
        title: 'Gusto Italiano Website',
        category: 'Restaurant',
        color: 'purple',
        result: '+35% online orders',
        client: { industry: 'Ресторан', size: '50 сотрудников', challenges: 'Рост онлайн-заказов' },
        solution: { tech: ['React', 'Vite', 'Tailwind'], strategies: ['Редизайн', 'SEO', 'PWA'] },
        metrics: [
          { label: 'Конверсия', value: '+20%', trend: 'up' },
          { label: 'Время загрузки', value: '1.2s', trend: 'down' }
        ],
        image: 'https://placehold.co/600x400?text=Restaurant+Project',
        placeholder: 'https://placehold.co/60x40?text=R',
      },
      {
        id: 2,
        title: 'Beauty Bliss Salon Landing',
        category: 'Beauty',
        color: 'brown',
        result: '+48% bookings',
        client: { industry: 'Салон красоты', size: '20 сотрудников', challenges: 'Заполнение расписания' },
        solution: { tech: ['React', 'Tailwind'], strategies: ['Лендинг', 'SEO', 'Email-маркетинг'] },
        metrics: [
          { label: 'Бронирования', value: '+48%', trend: 'up' },
          { label: 'SEO', value: '#1', trend: 'up' }
        ],
        image: 'https://placehold.co/600x400?text=Beauty+Project',
        placeholder: 'https://placehold.co/60x40?text=B',
      },
      {
        id: 3,
        title: 'TechFlow SaaS Launch',
        category: 'Technology',
        color: 'blue',
        result: '+300 qualified leads',
        client: { industry: 'SaaS', size: '15 сотрудников', challenges: 'Лидогенерация B2B' },
        solution: { tech: ['Next.js', 'Chakra UI'], strategies: ['Thought Leadership', 'LinkedIn Ads'] },
        metrics: [
          { label: 'Leads', value: '+300', trend: 'up' },
          { label: 'CR', value: '15%', trend: 'up' }
        ],
        image: 'https://placehold.co/600x400?text=Tech+Project',
        placeholder: 'https://placehold.co/60x40?text=T',
      },
      {
        id: 4,
        title: 'ModeFuture E-commerce Revamp',
        category: 'E-commerce',
        color: 'pink',
        result: '+90% conversion rate',
        client: { industry: 'Fashion', size: '10 сотрудников', challenges: 'Низкая конверсия' },
        solution: { tech: ['Shopify', 'Liquid'], strategies: ['CRO', 'Email Retargeting'] },
        metrics: [
          { label: 'CR', value: '+90%', trend: 'up' },
          { label: 'Repeat Purchases', value: '+150%', trend: 'up' }
        ],
        image: 'https://placehold.co/600x400?text=Fashion+Project',
        placeholder: 'https://placehold.co/60x40?text=F',
      },
      {
        id: 5,
        title: 'Legal Firm Local SEO',
        category: 'Legal',
        color: 'green',
        result: 'Top-3 local SERP',
        client: { industry: 'Legal', size: '30 сотрудников', challenges: 'Местная конкуренция' },
        solution: { tech: ['WordPress'], strategies: ['Local SEO', 'Reputation'] },
        metrics: [
          { label: 'Consultations', value: '+200%', trend: 'up' },
          { label: 'Satisfaction', value: '4.9/5', trend: 'up' }
        ],
        image: 'https://placehold.co/600x400?text=Legal+Project',
        placeholder: 'https://placehold.co/60x40?text=L',
      }
    ];
    const staticCategories = ['Restaurant', 'Beauty', 'Technology', 'E-commerce', 'Legal'];
    setProjects(staticProjects);
    setCategories(staticCategories);
    setLoading(false);
  }, []);

  const filtered = selectedCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  return (
    <>
      <Helmet>
        <title>Портфолио и кейсы - Steamphony Digital Agency</title>
        <meta name="description" content="Результаты нашей работы: кейсы с метриками и ROI. Веб-разработка, маркетинг, digital-трансформация." />
      </Helmet>

      {/* Hero секция */}
      <section className="bg-gradient-to-br from-purple-deep to-purple-bright text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-h1-mobile md:text-h1-desktop font-bold mb-4">
              Портфолио и кейсы
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              Реальные результаты для реальных компаний
            </p>
          </motion.div>
        </div>
      </section>

      {/* Категории фильтр */}
      <section className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap gap-2 justify-center">
          <FilterChip
            active={selectedCategory === 'all'}
            onClick={() => setSelectedCategory('all')}
          >Все проекты</FilterChip>
          {categories.map((cat) => (
            <FilterChip
              key={cat}
              active={selectedCategory === cat}
              onClick={() => setSelectedCategory(cat)}
            >{cat}</FilterChip>
          ))}
        </div>
      </section>

      {/* Кейсы */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {loading && <p>Загрузка проектов…</p>}
          {!loading && filtered.map((caseItem, index) => (
            <motion.div
              key={caseItem.id}
              className={`mb-24 last:mb-0 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="lg:flex lg:gap-12 lg:items-center">
                {/* Изображение/превью */}
                <div className="lg:w-1/2 mb-8 lg:mb-0">
                  <div className={`h-96 rounded-2xl bg-gradient-to-br ${
                    caseItem.color === 'purple' ? 'from-purple-bright to-purple-deep' :
                    caseItem.color === 'brown' ? 'from-brown-trust to-brown-action' :
                    'from-peach-warm to-cream'
                  } relative overflow-hidden group`}>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                    <div className="absolute bottom-8 left-8 text-white">
                      <h3 className="text-2xl font-bold mb-2">{caseItem.title}</h3>
                      <p className="text-lg opacity-90">{caseItem.client.industry}</p>
                    </div>
                  </div>
                </div>

                {/* Контент */}
                <div className="lg:w-1/2">
                  <motion.h2 
                    className="text-3xl md:text-4xl font-bold mb-6 text-gray-deep"
                    initial={{ opacity: 0, x: index % 2 === 1 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    {caseItem.result}
                  </motion.h2>

                  {/* Контекст клиента */}
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-3 text-gray-deep">Контекст</h3>
                    <p className="text-gray-600 mb-2">
                      <span className="font-medium">Индустрия:</span> {caseItem.client.industry}
                    </p>
                    <p className="text-gray-600 mb-2">
                      <span className="font-medium">Размер:</span> {caseItem.client.size}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Вызовы:</span> {caseItem.client.challenges}
                    </p>
                  </div>

                  {/* Решение */}
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-3 text-gray-deep">Решение</h3>
                    <div className="mb-3">
                      <p className="text-sm text-gray-500 mb-2">Технологии:</p>
                      <div className="flex flex-wrap gap-2">
                        {caseItem.solution.tech.map((tech) => (
                          <span key={tech} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {caseItem.solution.strategies.map((strategy, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className={`mr-2 ${
                            caseItem.color === 'purple' ? 'text-purple-bright' :
                            caseItem.color === 'brown' ? 'text-brown-trust' :
                            'text-peach-warm'
                          }`}>✓</span>
                          <span className="text-gray-600">{strategy}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Метрики */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-3 text-gray-deep">Результаты</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {caseItem.metrics.map((metric) => (
                        <div key={metric.label} className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-500 mb-1">{metric.label}</p>
                          <p className={`text-2xl font-bold ${
                            metric.trend === 'up' ? 'text-green-600' : 
                            metric.trend === 'down' ? 'text-red-600' : 
                            'text-gray-deep'
                          }`}>
                            {metric.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <Link to="/contact">
                    <Button 
                      className={`${
                        caseItem.color === 'purple' ? 'bg-purple-bright hover:bg-purple-deep' :
                        caseItem.color === 'brown' ? 'bg-brown-trust hover:bg-brown-action' :
                        'bg-peach-warm hover:bg-brown-trust'
                      } text-white px-6 py-3 rounded-lg font-medium transition-all`}
                    >
                      Получить похожие результаты
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA секция */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-purple-deep to-purple-bright text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-h2-mobile md:text-h2-desktop font-bold mb-4">
              Готовы к трансформации?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Давайте обсудим, как мы можем помочь вашему бизнесу расти
            </p>
            <Link to="/contact">
              <Button 
                size="lg" 
                className="bg-brown-trust hover:bg-brown-action text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105"
              >
                Начать проект
              </Button>
            </Link>
            <p className="mt-6 text-sm opacity-75">
              Бесплатная консультация • Без обязательств • Ответ в течение 24 часов
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
} 