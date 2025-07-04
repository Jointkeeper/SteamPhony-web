import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './ui/Button';
import Input from './ui/Input';
import Select from './ui/Select';
import Textarea from './ui/Textarea';
import toast from 'react-hot-toast';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
const CAPTCHA_SITE_KEY = import.meta.env.VITE_CAPTCHA_SITE_KEY;

const ContactForm = ({ title, subtitle, size = 'default' }) => {
  const { t, i18n } = useTranslation(['forms', 'common']);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '', 
    phone: '',
    serviceType: '',
    budget: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Load reCAPTCHA v3 script once if key provided
  useEffect(() => {
    if (!CAPTCHA_SITE_KEY) return;
    if (document.getElementById('recaptcha-v3-script')) return;
    const script = document.createElement('script');
    script.id = 'recaptcha-v3-script';
    script.src = `https://www.google.com/recaptcha/api.js?render=${CAPTCHA_SITE_KEY}`;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = t('forms:validation.required');
    } else if (formData.name.trim().length < 2) {
      newErrors.name = t('forms:validation.minLength', { count: 2 });
    }
    if (!formData.email.trim()) {
      newErrors.email = t('forms:validation.required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('forms:validation.email');
    }
    if (formData.phone && !/^[\+]?[^\s][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = t('forms:validation.phone');
    }
    if (!formData.message.trim()) {
      newErrors.message = t('forms:validation.required');
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t('forms:validation.minLength', { count: 10 });
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      let captchaToken = 'test';
      if (CAPTCHA_SITE_KEY && window.grecaptcha && window.grecaptcha.execute) {
        try {
          captchaToken = await window.grecaptcha.execute(CAPTCHA_SITE_KEY, { action: 'contact_form' });
        } catch (err) {
          console.warn('reCAPTCHA execute error', err);
        }
      }

      const submissionData = {
        ...formData,
        language: i18n.language,
        timestamp: new Date().toISOString(),
        source: 'website_contact_form',
        captchaToken,
      };
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      });
      if (response.ok) {
        toast.success(t('forms:contact.success.title', 'Спасибо за ваше сообщение!'));
        setSubmitted(true);
        if (window.gtag) {
          window.gtag('event', 'form_submission', {
            event_category: 'lead_generation',
            event_label: 'contact_form',
            language: i18n.language,
            service_type: formData.serviceType || 'unknown',
            budget: formData.budget || 'unknown'
          });
        }
        setFormData({ name: '', email: '', phone: '', serviceType: '', budget: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error(t('common:status.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="bg-gradient-to-br from-purple-bright/10 to-purple-deep/10 border border-purple-bright/30 rounded-2xl p-8 text-center"
        >
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-bright to-purple-deep rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-deep mb-2">
            {t('forms:contact.success.title', 'Спасибо за ваше сообщение!')}
          </h3>
          <p className="text-gray-600">{t('forms:contact.success.message', 'Мы свяжемся с вами в течение 24 часов')}</p>
        </motion.div>
      ) : (
        <motion.div
          key="form"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <div className={`bg-white ${size === 'compact' ? 'p-6' : 'p-8'} rounded-2xl ${size === 'default' ? 'shadow-xl' : ''}`}>
            {(title || subtitle) && (
              <div className="text-center mb-8">
                <h2 className={`font-bold text-gray-deep mb-3 ${size === 'compact' ? 'text-2xl' : 'text-3xl'}`}>
                  {title || t('forms:contact.title', 'Начните свой проект')}
                </h2>
                {subtitle && (
                  <p className="text-gray-600">{subtitle || t('forms:contact.subtitle', 'Расскажите о ваших целях')}</p>
                )}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <Input
                  id="name"
                  type="text"
                  label={t('forms:contact.fields.name.label', 'Ваше имя')}
                  placeholder={t('forms:contact.fields.name.placeholder', 'Иван Иванов')}
                  value={formData.name}
                  onChange={handleChange('name')}
                  error={errors.name}
                  required
                  autoComplete="name"
                  className="focus:border-purple-bright"
                />

                <Input
                  id="email"
                  type="email"
                  label={t('forms:contact.fields.email.label', 'Email')}
                  placeholder={t('forms:contact.fields.email.placeholder', 'ivan@company.com')}
                  value={formData.email}
                  onChange={handleChange('email')}
                  error={errors.email}
                  required
                  autoComplete="email"
                  className="focus:border-purple-bright"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <Input
                  id="phone"
                  type="tel"
                  label={t('forms:contact.fields.phone.label', 'Телефон')}
                  placeholder={t('forms:contact.fields.phone.placeholder', '+7 (999) 123-45-67')}
                  value={formData.phone}
                  onChange={handleChange('phone')}
                  error={errors.phone}
                  autoComplete="tel"
                  className="focus:border-purple-bright"
                />

                <Select
                  id="serviceType"
                  label={t('forms:contact.fields.serviceType.label', 'Интересующая услуга')}
                  value={formData.serviceType}
                  onChange={handleChange('serviceType')}
                  error={errors.serviceType}
                  className="focus:border-purple-bright"
                >
                  <option value="">{t('forms:contact.fields.serviceType.placeholder', 'Выберите услугу')}</option>
                  <option value="web-development">Веб-разработка</option>
                  <option value="digital-marketing">Digital-маркетинг</option>
                  <option value="complex-solution">Комплексное решение</option>
                  <option value="consultation">Консультация</option>
                </Select>
              </div>

              <Select
                id="budget"
                label={t('forms:contact.fields.budget.label', 'Примерный бюджет')}
                value={formData.budget}
                onChange={handleChange('budget')}
                error={errors.budget}
                className="focus:border-purple-bright"
              >
                <option value="">{t('forms:contact.fields.budget.placeholder', 'Выберите бюджет')}</option>
                <option value="5-10k">$5,000 - $10,000</option>
                <option value="10-25k">$10,000 - $25,000</option>
                <option value="25-50k">$25,000 - $50,000</option>
                <option value="50k+">$50,000+</option>
                <option value="discuss">Обсудить индивидуально</option>
              </Select>

              <Textarea
                id="message"
                label={t('forms:contact.fields.message.label', 'Расскажите о проекте')}
                placeholder={t('forms:contact.fields.message.placeholder', 'Опишите ваши цели, текущие вызовы и ожидаемые результаты...')}
                value={formData.message}
                onChange={handleChange('message')}
                error={errors.message}
                rows={5}
                required
                className="focus:border-purple-bright"
              />

              <Button
                type="submit"
                size={size === 'compact' ? 'md' : 'lg'}
                loading={isSubmitting}
                disabled={isSubmitting}
                className="w-full bg-brown-trust hover:bg-brown-action text-white font-semibold transition-all transform hover:scale-105"
              >
                {isSubmitting ? t('common:status.processing', 'Отправка...') : t('forms:contact.submit', 'Отправить заявку')}
              </Button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Нажимая кнопку, вы соглашаетесь с{' '}
                <a href="/privacy" className="text-purple-bright hover:text-purple-deep underline">
                  политикой конфиденциальности
                </a>
              </p>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactForm; 