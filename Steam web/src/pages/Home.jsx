import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import ContactForm from '../components/ContactForm';
import Button from '../components/ui/Button';

export default function Home() {
  const { t } = useTranslation(['home', 'common']);

  return (
    <>
      <Helmet>
        <title>{t('home:hero.title')} - Steamphony</title>
        <meta name="description" content={t('home:hero.subtitle')} />
      </Helmet>

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{t('home:hero.title')}</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">{t('home:hero.subtitle')}</p>
          <Button size="lg" variant="success">
            {t('home:hero.cta')}
          </Button>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t('home:services.title')}</h2>
          <p className="text-center text-gray-600 mb-10">{t('home:services.subtitle')}</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {['restaurant', 'salon', 'web', 'content'].map((key) => (
              <div key={key} className="p-6 bg-white rounded-lg shadow hover:shadow-md transition">
                <h3 className="text-xl font-semibold mb-2">{t(`home:services.${key}.title`)}</h3>
                <p className="text-gray-600 text-sm">{t(`home:services.${key}.description`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-2xl mx-auto px-4">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
