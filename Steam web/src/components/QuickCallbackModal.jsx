import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import Input from './ui/Input';
import Button from './ui/Button';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const Backdrop = ({ onClick }) => (
  <div
    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
    onClick={onClick}
  />
);

const ModalContent = ({ onClose }) => {
  const { t } = useTranslation(['contact', 'common']);
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch(`${API_BASE_URL}/api/contact/callback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          aria-label="Close"
        >
          ×
        </button>
        {success ? (
          <div className="text-center py-12">
            <h3 className="text-2xl font-semibold text-gray-deep mb-2">
              {t('contact:callback_form.success_message', 'Мы скоро вам перезвоним!')}
            </h3>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <h3 className="text-xl font-bold text-gray-deep text-center">
              {t('contact:callback_form.title', 'Бесплатная консультация')}
            </h3>
            <Input
              id="cb_name"
              label={t('contact:callback_form.name_label', 'Имя')}
              value={formData.name}
              onChange={handleChange('name')}
              required
            />
            <Input
              id="cb_phone"
              label={t('contact:callback_form.phone_label', 'Телефон')}
              value={formData.phone}
              onChange={handleChange('phone')}
              required
            />
            <Button type="submit" loading={submitting} disabled={submitting} className="w-full bg-purple-bright hover:bg-purple-deep text-white">
              {t('contact:callback_form.submit_button', 'Заказать звонок')}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

const QuickCallbackModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return createPortal(
    <>
      <Backdrop onClick={onClose} />
      <ModalContent onClose={onClose} />
    </>,
    document.body
  );
};

export default QuickCallbackModal; 