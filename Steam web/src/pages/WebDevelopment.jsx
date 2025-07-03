import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

export default function WebDevelopment() {
  const { t } = useTranslation('services');
  return (
    <div className="container mx-auto py-16 px-4">
      <Helmet>
        <title>{t('web.title')} - Steamphony</title>
        <meta name="description" content={t('web.subtitle')} />
      </Helmet>
      <h1 className="text-3xl font-bold mb-6 text-center">{t('web.hero.title')}</h1>
      <p className="text-gray-700 mb-8 max-w-2xl mx-auto text-center">{t('web.hero.description')}</p>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-center">{t('web.benefits.title')}</h2>
        <ul className="list-disc list-inside max-w-2xl mx-auto space-y-2 text-gray-700">
          {t('web.benefits.items', { returnObjects: true }).map((benefit) => (
            <li key={benefit}>{benefit}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
