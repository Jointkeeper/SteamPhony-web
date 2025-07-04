import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

export default function Services() {
  const { t } = useTranslation(['home']);

  const services = {
    web: {
      title: 'Веб-разработка',
      icon: '🚀',
      features: [
        'Next.js/React приложения',
        'E-commerce платформы',
        'Корпоративные порталы',
        'Progressive Web Apps'
      ],
      color: 'purple'
    },
    marketing: {
      title: 'Digital-маркетинг',
      icon: '📈',
      features: [
        'SEO и контент-стратегия',
        'Performance-маркетинг',
        'Email-автоматизация',
        'Social Media Management'
      ],
      color: 'brown'
    },
    complex: {
      title: 'Комплексные решения',
      icon: '💡',
      features: [
        'Digital-трансформация',
        'Startup MVP разработка',
        'Маркетплейсы и платформы',
        'AI/ML интеграции'
      ],
      color: 'peach'
    }
  };

  const team = [
    {
      name: 'Александр Петров',
      role: 'CEO & Technical Director',
      expertise: 'Full-stack разработка, архитектура систем',
      photo: null // временно, пока нет фото
    },
    {
      name: 'Мария Иванова',
      role: 'Marketing Director',
      expertise: 'Performance-маркетинг, контент-стратегия',
      photo: null
    },
    {
      name: 'Дмитрий Сидоров',
      role: 'Lead Developer',
      expertise: 'React, Next.js, Node.js',
      photo: null
    }
  ];

  const process = [
    {
      title: 'Discovery & Research',
      description: 'Глубокое погружение в ваш бизнес, анализ конкурентов и целевой аудитории'
    },
    {
      title: 'Strategy & Planning',
      description: 'Разработка детальной стратегии с чёткими KPI и дорожной картой'
    },
    {
      title: 'Design & Development',
      description: 'Создание уникального дизайна и разработка с использованием передовых технологий'
    },
    {
      title: 'Launch & Optimization',
      description: 'Запуск проекта и непрерывная оптимизация на основе данных'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Услуги и экспертиза - Steamphony Digital Agency</title>
        <meta name="description" content="Веб-разработка, digital-маркетинг и комплексные решения для роста вашего бизнеса" />
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
              Услуги и экспертиза
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              Комплексный подход к развитию вашего бизнеса в digital-среде
            </p>
          </motion.div>
        </div>
      </section>

      {/* Услуги */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-h2-mobile md:text-h2-desktop font-bold text-center mb-4 text-gray-deep">
              Наши услуги
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Полный спектр услуг для вашего успеха в digital
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {Object.entries(services).map(([key, service], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Card
                  className={`p-8 h-full ${
                    service.color === 'purple'
                      ? 'bg-purple-bright/5 border border-purple-bright/20'
                      : service.color === 'brown'
                      ? 'bg-brown-trust/5 border border-brown-trust/20'
                      : 'bg-peach-warm/10 border border-peach-warm/30'
                  }`}
                >
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3
                    className={`text-h3-mobile md:text-h3-desktop font-semibold mb-4 ${
                      service.color === 'purple'
                        ? 'text-purple-deep'
                        : service.color === 'brown'
                        ? 'text-brown-trust'
                        : 'text-gray-deep'
                    }`}
                  >
                    {service.title}
                  </h3>
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span
                          className={`mr-2 ${
                            service.color === 'purple'
                              ? 'text-purple-bright'
                              : service.color === 'brown'
                              ? 'text-brown-trust'
                              : 'text-peach-warm'
                          }`}
                        >
                          ✓
                        </span>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Команда */}
      <section className="py-16 md:py-24 bg-gray-light">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-h2-mobile md:text-h2-desktop font-bold text-center mb-4 text-gray-deep">
              Наша команда
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Эксперты с опытом работы в топовых компаниях и стартапах
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-8 text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-purple-bright to-purple-deep rounded-full mx-auto mb-6"></div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-deep">{member.name}</h3>
                  <p className="text-purple-bright font-medium mb-2">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.expertise}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Методология */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-h2-mobile md:text-h2-desktop font-bold text-center mb-4 text-gray-deep">
              Методология Steamphony
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Data-driven подход с фокусом на измеримые результаты
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {process.map((step, index) => (
              <motion.div
                key={step.title}
                className="flex items-start mb-8 last:mb-0"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-bright to-purple-deep text-white rounded-full flex items-center justify-center font-bold mr-6">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-deep">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link to="/contact">
              <Button 
                size="lg" 
                className="bg-brown-trust hover:bg-brown-action text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105"
              >
                Начать проект
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Гарантии и KPI */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-purple-deep to-purple-bright text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-h2-mobile md:text-h2-desktop font-bold mb-4">
              Работаем на результат
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Гарантируем достижение KPI или возвращаем деньги
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-4xl font-bold mb-2">100%</p>
                <p className="opacity-80">Прозрачность процессов</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2">24/7</p>
                <p className="opacity-80">Поддержка проектов</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2">ROI</p>
                <p className="opacity-80">Фокус на возврате инвестиций</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
