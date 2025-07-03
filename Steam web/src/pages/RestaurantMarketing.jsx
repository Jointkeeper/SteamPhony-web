import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

export default function RestaurantMarketing() {
  const { t } = useTranslation('services');
  return (
    <div className="container mx-auto py-16 px-4">
      <Helmet>
        <title>{t('restaurant.title')} - Steamphony</title>
        <meta name="description" content={t('restaurant.subtitle')} />
      </Helmet>
      <h1 className="text-3xl font-bold mb-6 text-center">{t('restaurant.hero.title')}</h1>
      <p className="text-gray-700 mb-8 max-w-2xl mx-auto text-center">{t('restaurant.hero.description')}</p>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-center">{t('restaurant.benefits.title')}</h2>
        <ul className="list-disc list-inside max-w-2xl mx-auto space-y-2 text-gray-700">
          {t('restaurant.benefits.items', { returnObjects: true }).map((benefit) => (
            <li key={benefit}>{benefit}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6 text-center">{t('restaurant.process.title')}</h2>
        <div className="space-y-6 max-w-3xl mx-auto">
          {t('restaurant.process.steps', { returnObjects: true }).map((step, idx) => (
            <div key={step.title} className="p-6 bg-white rounded shadow">
              <h3 className="font-semibold mb-2">{idx + 1}. {step.title}</h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
