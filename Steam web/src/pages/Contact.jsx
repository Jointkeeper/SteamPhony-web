import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useState } from 'react';
import ContactForm from '../components/ContactForm';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

export default function Contact() {
  const { t } = useTranslation(['forms', 'common']);
  const [activeTab, setActiveTab] = useState('form');

  const contactInfo = {
    email: 'hello@steamphony.com',
    phone: '+7 (495) 123-45-67',
    address: 'Москва, ул. Тверская, 1',
    workHours: 'Пн-Пт: 9:00 - 18:00 (MSK)'
  };

  return (
    <>
      <Helmet>
        <title>Контакты - Steamphony Digital Agency</title>
        <meta name="description" content="Свяжитесь с нами для обсуждения вашего проекта. Бесплатная консультация, персональная стратегия развития." />
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
              Давайте создадим что-то великое
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              Готовы обсудить ваш проект? Мы здесь, чтобы помочь
            </p>
          </motion.div>
        </div>
      </section>

      {/* Основной контент */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Левая колонка - формы и способы связи */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Табы для выбора способа связи */}
              <div className="flex space-x-4 mb-8 border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('form')}
                  className={`pb-4 px-2 font-medium transition-colors ${
                    activeTab === 'form'
                      ? 'text-purple-bright border-b-2 border-purple-bright'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Форма заявки
                </button>
                <button
                  onClick={() => setActiveTab('calendar')}
                  className={`pb-4 px-2 font-medium transition-colors ${
                    activeTab === 'calendar'
                      ? 'text-purple-bright border-b-2 border-purple-bright'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Забронировать звонок
                </button>
                <button
                  onClick={() => setActiveTab('direct')}
                  className={`pb-4 px-2 font-medium transition-colors ${
                    activeTab === 'direct'
                      ? 'text-purple-bright border-b-2 border-purple-bright'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Прямые контакты
                </button>
              </div>

              {/* Контент табов */}
              <div className="min-h-[400px]">
                {activeTab === 'form' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl font-bold mb-4 text-gray-deep">
                      Расскажите о вашем проекте
                    </h2>
                    <p className="text-gray-600 mb-6">
                      Заполните форму, и мы свяжемся с вами в течение 24 часов
                    </p>
                    <ContactForm />
                  </motion.div>
                )}

                {activeTab === 'calendar' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-center py-12"
                  >
                    <h2 className="text-2xl font-bold mb-4 text-gray-deep">
                      Выберите удобное время
                    </h2>
                    <p className="text-gray-600 mb-8">
                      30-минутная консультация с нашим экспертом
                    </p>
                    {/* Здесь будет интеграция с Calendly */}
                    <div className="bg-gray-100 rounded-lg p-12 border-2 border-dashed border-gray-300">
                      <p className="text-gray-500">Calendly виджет будет здесь</p>
                      <Button className="mt-4 bg-purple-bright hover:bg-purple-deep text-white">
                        Открыть календарь
                      </Button>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'direct' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl font-bold mb-6 text-gray-deep">
                      Прямые контакты
                    </h2>
                    <div className="space-y-6">
                      <div className="flex items-start">
                        <div className="w-12 h-12 bg-purple-bright/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-purple-bright text-xl">✉</span>
                        </div>
                        <div className="ml-4">
                          <p className="font-semibold text-gray-deep">Email</p>
                          <a 
                            href={`mailto:${contactInfo.email}`}
                            className="text-purple-bright hover:text-purple-deep transition-colors"
                          >
                            {contactInfo.email}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="w-12 h-12 bg-purple-bright/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-purple-bright text-xl">📞</span>
                        </div>
                        <div className="ml-4">
                          <p className="font-semibold text-gray-deep">Телефон</p>
                          <a 
                            href={`tel:${contactInfo.phone.replace(/[^\d+]/g, '')}`}
                            className="text-purple-bright hover:text-purple-deep transition-colors"
                          >
                            {contactInfo.phone}
                          </a>
                          <p className="text-sm text-gray-600 mt-1">{contactInfo.workHours}</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="w-12 h-12 bg-purple-bright/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-purple-bright text-xl">📍</span>
                        </div>
                        <div className="ml-4">
                          <p className="font-semibold text-gray-deep">Офис</p>
                          <p className="text-gray-600">{contactInfo.address}</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="w-12 h-12 bg-purple-bright/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-purple-bright text-xl">💬</span>
                        </div>
                        <div className="ml-4">
                          <p className="font-semibold text-gray-deep">Мессенджеры</p>
                          <div className="flex space-x-3 mt-2">
                            <a 
                              href="#" 
                              className="text-purple-bright hover:text-purple-deep transition-colors"
                            >
                              WhatsApp
                            </a>
                            <a 
                              href="#" 
                              className="text-purple-bright hover:text-purple-deep transition-colors"
                            >
                              Telegram
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Правая колонка - дополнительная информация */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* FAQ блок */}
              <Card className="bg-gray-light p-8 mb-8">
                <h3 className="text-xl font-bold mb-4 text-gray-deep">
                  Часто задаваемые вопросы
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-gray-deep mb-2">
                      Сколько времени занимает разработка сайта?
                    </p>
                    <p className="text-gray-600 text-sm">
                      В среднем от 4 до 12 недель, в зависимости от сложности проекта
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-deep mb-2">
                      Какой минимальный бюджет проекта?
                    </p>
                    <p className="text-gray-600 text-sm">
                      Минимальный бюджет начинается от $5,000 для базовых проектов
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-deep mb-2">
                      Предоставляете ли вы поддержку после запуска?
                    </p>
                    <p className="text-gray-600 text-sm">
                      Да, мы предлагаем различные пакеты поддержки и развития
                    </p>
                  </div>
                </div>
              </Card>

              {/* Гарантии */}
              <Card className="bg-gradient-to-br from-purple-bright/10 to-purple-deep/10 p-8 border border-purple-bright/20">
                <h3 className="text-xl font-bold mb-4 text-gray-deep">
                  Наши гарантии
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-purple-bright mr-2">✓</span>
                    <span className="text-gray-700">Ответ в течение 24 часов</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-bright mr-2">✓</span>
                    <span className="text-gray-700">Бесплатная консультация</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-bright mr-2">✓</span>
                    <span className="text-gray-700">NDA по запросу</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-bright mr-2">✓</span>
                    <span className="text-gray-700">Прозрачное ценообразование</span>
                  </li>
                </ul>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Чат-бот */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 200 }}
        >
          <button className="w-16 h-16 bg-brown-trust hover:bg-brown-action text-white rounded-full shadow-lg flex items-center justify-center transition-colors">
            <span className="text-2xl">💬</span>
          </button>
        </motion.div>
      </div>
    </>
  );
}
