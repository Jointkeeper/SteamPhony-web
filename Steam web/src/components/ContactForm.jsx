import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from './ui/Button';
import Input from './ui/Input';
import Select from './ui/Select';
import Textarea from './ui/Textarea';
import toast from 'react-hot-toast';
import useAnimation from '../hooks/useAnimation';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const ContactForm = ({ title, subtitle, size = 'default' }) => {
  const { t, i18n } = useTranslation(['forms', 'common']);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '', 
    phone: '',
    businessType: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { motion, AnimatePresence } = useAnimation();

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
      const submissionData = {
        ...formData,
        language: i18n.language,
        timestamp: new Date().toISOString(),
        source: 'website_contact_form'
      };
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      });
      if (response.ok) {
        toast.success(t('forms:contact.success.title', 'Thank you for your message!'));
        setSubmitted(true);
        if (window.gtag) {
          window.gtag('event', 'form_submission', {
            event_category: 'lead_generation',
            event_label: 'contact_form',
            language: i18n.language,
            business_type: formData.businessType || 'unknown'
          });
        }
        setFormData({ name: '', email: '', phone: '', businessType: '', message: '' });
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
          className="bg-green-50 border border-green-200 rounded-lg p-6 text-center"
        >
          <div className="flex justify-center mb-4">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            {t('forms:contact.success.title')}
          </h3>
          <p className="text-green-700">{t('forms:contact.success.message')}</p>
        </motion.div>
      ) : (
        <motion.div
          key="form"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <div className={`bg-white ${size === 'compact' ? 'p-4' : 'p-6'} rounded-lg ${size === 'default' ? 'shadow-lg' : ''}`}>
            {(title || subtitle) && (
              <div className="text-center mb-6">
                <h2 className={`font-bold text-gray-900 mb-2 ${size === 'compact' ? 'text-xl' : 'text-2xl'}`}>
                  {title || t('forms:contact.title')}
                </h2>
                {subtitle && (
                  <p className="text-gray-600">{subtitle || t('forms:contact.subtitle')}</p>
                )}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                id="name"
                type="text"
                label={t('forms:contact.fields.name.label')}
                placeholder={t('forms:contact.fields.name.placeholder')}
                value={formData.name}
                onChange={handleChange('name')}
                error={errors.name}
                required
                autoComplete="name"
              />

              <Input
                id="email"
                type="email"
                label={t('forms:contact.fields.email.label')}
                placeholder={t('forms:contact.fields.email.placeholder')}
                value={formData.email}
                onChange={handleChange('email')}
                error={errors.email}
                required
                autoComplete="email"
              />

              <Input
                id="phone"
                type="tel"
                label={t('forms:contact.fields.phone.label')}
                placeholder={t('forms:contact.fields.phone.placeholder')}
                value={formData.phone}
                onChange={handleChange('phone')}
                error={errors.phone}
                autoComplete="tel"
              />

              <Select
                id="businessType"
                label={t('forms:contact.fields.businessType.label')}
                value={formData.businessType}
                onChange={handleChange('businessType')}
                error={errors.businessType}
              >
                <option value="">{t('forms:contact.fields.businessType.placeholder')}</option>
                <option value="restaurant">{t('forms:contact.fields.businessType.options.restaurant')}</option>
                <option value="salon">{t('forms:contact.fields.businessType.options.salon')}</option>
                <option value="other">{t('forms:contact.fields.businessType.options.other')}</option>
              </Select>

              <Textarea
                id="message"
                label={t('forms:contact.fields.message.label')}
                placeholder={t('forms:contact.fields.message.placeholder')}
                value={formData.message}
                onChange={handleChange('message')}
                error={errors.message}
                rows={4}
                required
              />

              <Button
                type="submit"
                size={size === 'compact' ? 'md' : 'lg'}
                loading={isSubmitting}
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? t('common:status.processing') : t('forms:contact.submit')}
              </Button>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactForm; 