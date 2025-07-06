import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Card from '../components/ui/Card';

export default function About() {
  const { t } = useTranslation(['common']);

  const philosophy = [
    {
      title: 'Progressive disclosure',
      text: 'Информация раскрывается слоями — от общего к частному, снижая когнитивную нагрузку.'
    },
    {
      title: 'Психологическое воздействие',
      text: 'Используем паттерны поведения для увеличения конверсии и доверия.'
    },
    {
      title: 'Cross-industry мудрость',
      text: 'Забираем лучшие практики из 10+ отраслей и применяем к вашему проекту.'
    },
    {
      title: 'Премиальность без высокомерия',
      text: 'Баланс между статусностью и доступностью в каждом пикселе.'
    }
  ];

  // Правовая информация, перенесённая из отдельных страниц
  const legalSections = [
    {
      id: 'privacy',
      title: 'Политика конфиденциальности',
      content: [
        'Мы уважаем ваше право на конфиденциальность и собираем лишь минимальный объём персональных данных, необходимый для обработки обращений и улучшения сервиса.',
        'Данные хранятся на защищённых серверах в ЕС, доступны только уполномоченным сотрудникам и никогда не продаются третьим лицам.',
        'Вы можете запросить удаление или экспорт своих данных, отправив письмо на hello@steamphony.com.'
      ]
    },
    {
      id: 'terms',
      title: 'Условия использования',
      content: [
        'Используя наш сайт, вы соглашаетесь не нарушать законы РФ и ЕС, не осуществлять попытки взлома и не публиковать запрещённый контент.',
        'Вся информация предоставляется «как есть». Мы прилагаем усилия, чтобы она была актуальной, но не гарантируем абсолютную точность.',
        'Любые споры решаются в соответствии с законодательством РФ с подсудностью по месту регистрации ООО «Steamphony».'
      ]
    },
    {
      id: 'cookies',
      title: 'Cookie Policy',
      content: [
        'Мы используем собственные и сторонние cookies для аналитики (Google Analytics) и улучшения пользовательского опыта.',
        'Вы можете отключить cookies в настройках браузера, однако это может повлиять на корректную работу некоторых функций сайта.'
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>{t('aboutTitle', 'О Steamphony')}</title>
      </Helmet>

      {/* Hero Section */}
      <section className="hero-about px-4 md:px-20">
        <div className="space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-h1-mobile md:text-h1-desktop font-bold text-gray-deep">
            Архитектура доверия
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl md:text-2xl max-w-xl text-gray-600">
            Трансформируем бизнес через технологии, дизайн и данные
          </motion.p>
        </div>

        {/* Placeholder for visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full h-96 bg-gradient-to-br from-purple-bright/20 to-purple-deep/30 rounded-3xl flex items-center justify-center">
          <span className="text-3xl font-bold text-purple-deep">[Steam Transformation SVG]</span>
        </motion.div>
      </section>

      {/* Philosophy grid */}
      <section className="px-4 md:px-20 philosophy-grid">
        {philosophy.map((item) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-8 shadow-md hover:shadow-xl border-t-4 border-transparent hover:-translate-y-2">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-deep to-purple-bright mb-6 flex items-center justify-center text-white text-2xl">
                •
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-deep">{item.title}</h3>
              <p className="text-gray-600">{item.text}</p>
            </Card>
          </motion.div>
        ))}
      </section>

      {/* Team visualization placeholder */}
      <section className="px-4 md:px-20 my-32 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-h2-mobile md:text-h2-desktop font-bold mb-12 text-gray-deep">
          Наша команда
        </motion.h2>
        <div className="w-full h-96 bg-gradient-to-br from-peach-warm/30 to-cream rounded-3xl flex items-center justify-center">
          <span className="text-2xl text-gray-deep">[Interactive Role Diagram]</span>
        </div>
      </section>

      {/* Правовая информация (ранее отдельные страницы) */}
      <section id="legal" className="px-4 md:px-20 my-32">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-h2-mobile md:text-h2-desktop font-bold mb-12 text-gray-deep"
        >
          Правовая информация
        </motion.h2>

        <div className="space-y-12">
          {legalSections.map(section => (
            <div key={section.id} id={section.id} className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-deep">
                {section.title}
              </h3>
              {section.content.map((paragraph, idx) => (
                <p key={idx} className="text-gray-600">
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
