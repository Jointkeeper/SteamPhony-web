import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import ContactForm from '../components/ContactForm';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import useAnimation from '../hooks/useAnimation';
import { TestimonialsSection } from '../components/TestimonialsSection';

export default function Home() {
  const { motion } = useAnimation();

  return (
    <>
      <Helmet>
        <title>Steamphony - Архитектура доверия в цифровом пространстве</title>
        <meta name="description" content="Трансформируем бизнес через технологии. Веб-разработка, маркетинг, комплексные digital-решения." />
      </Helmet>

      {/* Hero Section с градиентным фоном */}
      <section className="relative min-h-screen bg-gradient-to-br from-purple-deep via-purple-deep to-purple-bright text-white overflow-hidden">
        {/* Анимированный фон */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_300px,#9966CC,transparent)]"></div>
        </div>
        
        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-4 py-20 md:py-32 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.h1 
            className="text-h1-mobile md:text-h1-desktop font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Трансформируем бизнес через технологии
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Веб-разработка, маркетинг и комплексные digital-решения для роста вашего бизнеса
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Link to="/contact">
              <Button 
                size="lg" 
                className="bg-brown-trust hover:bg-brown-action text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105"
              >
                Получить стратегию роста
              </Button>
            </Link>
            <p className="text-sm opacity-75">Помогаем компаниям расти с 2024</p>
          </motion.div>
        </motion.div>

        {/* Декоративные элементы */}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        />
      </section>

      {/* Блок преимуществ - Bento Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-h2-mobile md:text-h2-desktop font-bold text-center mb-4 text-gray-deep">
              Что мы делаем
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Комплексный подход к digital-трансформации вашего бизнеса
            </p>
          </motion.div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Веб-разработка - большая карточка */}
            <motion.div
              className="lg:col-span-2 bg-gradient-to-br from-purple-bright/10 to-purple-deep/10 p-8 rounded-2xl border border-purple-bright/20"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-h3-mobile md:text-h3-desktop font-semibold mb-4 text-purple-deep">
                Веб-разработка
              </h3>
              <p className="text-lg mb-4 text-gray-700">Сайты, которые продают 24/7</p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-purple-bright mr-2">✓</span>
                  Next.js/React приложения
                </li>
                <li className="flex items-start">
                  <span className="text-purple-bright mr-2">✓</span>
                  E-commerce платформы
                </li>
                <li className="flex items-start">
                  <span className="text-purple-bright mr-2">✓</span>
                  Progressive Web Apps
                </li>
              </ul>
            </motion.div>

            {/* Маркетинг */}
            <motion.div
              className="bg-gradient-to-br from-brown-trust/10 to-brown-action/10 p-8 rounded-2xl border border-brown-trust/20"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-h3-mobile md:text-h3-desktop font-semibold mb-4 text-brown-trust">
                Маркетинг
              </h3>
              <p className="text-lg mb-4 text-gray-700">Привлечение клиентов на автопилоте</p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-brown-trust mr-2">✓</span>
                  SEO оптимизация
                </li>
                <li className="flex items-start">
                  <span className="text-brown-trust mr-2">✓</span>
                  Email-автоматизация
                </li>
              </ul>
            </motion.div>

            {/* Cross-industry решения */}
            <motion.div
              className="bg-gradient-to-br from-peach-warm/20 to-cream/30 p-8 rounded-2xl border border-peach-warm/30"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-h3-mobile md:text-h3-desktop font-semibold mb-4 text-gray-deep">
                Cross-industry
              </h3>
              <p className="text-lg mb-4 text-gray-700">Опыт из 10+ индустрий</p>
              <p className="text-gray-600">
                Применяем лучшие практики из разных отраслей для вашего бизнеса
              </p>
            </motion.div>

            {/* Комплексный подход */}
            <motion.div
              className="lg:col-span-2 bg-gradient-to-br from-gray-light to-white p-8 rounded-2xl border border-gray-300"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-h3-mobile md:text-h3-desktop font-semibold mb-4 text-gray-deep">
                Комплексный подход
              </h3>
              <p className="text-lg mb-4 text-gray-700">От идеи до масштабирования</p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-purple-bright/10 text-purple-deep rounded-full text-sm">
                  Стратегия
                </span>
                <span className="px-4 py-2 bg-brown-trust/10 text-brown-trust rounded-full text-sm">
                  Разработка
                </span>
                <span className="px-4 py-2 bg-peach-warm/20 text-gray-deep rounded-full text-sm">
                  Маркетинг
                </span>
                <span className="px-4 py-2 bg-gray-200 text-gray-deep rounded-full text-sm">
                  Аналитика
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Портфолио-превью */}
      <section className="py-16 md:py-24 bg-gray-light">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-h2-mobile md:text-h2-desktop font-bold text-center mb-4 text-gray-deep">
              Результаты, которые говорят сами за себя
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Временные проекты до запуска реальных кейсов
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Проект 1 - E-commerce */}
            <motion.div
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <Card className="overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-purple-bright to-purple-deep"></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">E-commerce платформа</h3>
                  <p className="text-3xl font-bold text-purple-bright mb-2">+250%</p>
                  <p className="text-gray-600 mb-4">увеличение конверсии</p>
                  <Link 
                    to="/work" 
                    className="text-brown-trust hover:text-brown-action font-medium inline-flex items-center"
                  >
                    Подробнее →
                  </Link>
                </div>
              </Card>
            </motion.div>

            {/* Проект 2 - SaaS */}
            <motion.div
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-brown-trust to-brown-action"></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">SaaS стартап</h3>
                  <p className="text-3xl font-bold text-brown-trust mb-2">10,000</p>
                  <p className="text-gray-600 mb-4">пользователей за 3 месяца</p>
                  <Link 
                    to="/work" 
                    className="text-brown-trust hover:text-brown-action font-medium inline-flex items-center"
                  >
                    Подробнее →
                  </Link>
                </div>
              </Card>
            </motion.div>

            {/* Проект 3 - Корпоративный портал */}
            <motion.div
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -5 }}
            >
              <Card className="overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-peach-warm to-cream"></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Корпоративный портал</h3>
                  <p className="text-3xl font-bold text-purple-bright mb-2">-60%</p>
                  <p className="text-gray-600 mb-4">времени на обработку заявок</p>
                  <Link 
                    to="/work" 
                    className="text-brown-trust hover:text-brown-action font-medium inline-flex items-center"
                  >
                    Подробнее →
                  </Link>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Блок процесса */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-h2-mobile md:text-h2-desktop font-bold text-center mb-4 text-gray-deep">
              Как мы работаем
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Прозрачный процесс с измеримыми результатами на каждом этапе
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: 1, title: 'Анализ', desc: 'Изучаем ваш бизнес и цели' },
              { step: 2, title: 'Стратегия', desc: 'Разрабатываем план роста' },
              { step: 3, title: 'Реализация', desc: 'Воплощаем идеи в жизнь' },
              { step: 4, title: 'Рост', desc: 'Масштабируем успех' }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-bright to-purple-deep text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-deep">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
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
              Узнайте потенциал роста вашего бизнеса
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Получите бесплатный аудит и персональную стратегию развития
            </p>
            <Link to="/contact">
              <Button 
                size="lg" 
                className="bg-brown-trust hover:bg-brown-action text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105"
              >
                Получить аудит бесплатно
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
