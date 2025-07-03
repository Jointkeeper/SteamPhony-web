import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

export default function Services() {
  const { t } = useTranslation(['home']);

  return (
    <div className="container mx-auto py-16 px-4">
      <Helmet>
        <title>{t('home:services.title')} - Steamphony</title>
        <meta name="description" content={t('home:services.subtitle')} />
      </Helmet>
      <h1 className="text-3xl font-bold mb-8 text-center">{t('home:services.title')}</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {['restaurant', 'salon', 'web', 'content'].map((key) => (
          <li key={key} className="p-6 bg-white rounded shadow hover:shadow-md transition text-center">
            <h3 className="text-xl font-semibold mb-2">{t(`home:services.${key}.title`)}</h3>
            <p className="text-gray-600 text-sm">{t(`home:services.${key}.description`)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
