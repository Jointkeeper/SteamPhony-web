import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import ContactForm from '../components/ContactForm';

export default function Contact() {
  const { t } = useTranslation(['forms', 'common']);

  return (
    <div className="container mx-auto py-16 px-4">
      <Helmet>
        <title>{t('forms:contact.title')} - Steamphony</title>
        <meta name="description" content={t('forms:contact.subtitle')} />
      </Helmet>

      <h1 className="text-3xl font-bold text-center mb-6">{t('forms:contact.title')}</h1>
      <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">{t('forms:contact.subtitle')}</p>

      <div className="max-w-3xl mx-auto">
        <ContactForm />
      </div>

      {/* Contact details */}
      <div className="mt-16 text-center space-y-2 text-gray-700">
        <p>Email: <a href="mailto:hello@steamphony.com" className="text-blue-600 hover:underline">hello@steamphony.com</a></p>
        <p>Phone: <a href="tel:+15551234567" className="text-blue-600 hover:underline">+1 (555) 123-4567</a></p>
        <p>Address: 123 Business St, New York, NY</p>
      </div>
    </div>
  );
}
