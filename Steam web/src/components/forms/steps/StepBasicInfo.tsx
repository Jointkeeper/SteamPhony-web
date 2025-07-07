/**
 * StepBasicInfo.tsx - Step 1: Basic Information
 * 
 * Первый шаг формы:
 * - Имя (обязательно)
 * - Email (обязательно) 
 * - Телефон (опционально)
 * - Валидация в реальном времени
 * - Accessibility support
 */

import React from 'react';
import { motion } from 'framer-motion';
import { ContactFormData, ValidationErrors } from '../../../types/contactForm';
import { Input } from '../../ui/Input';

interface StepBasicInfoProps {
  /** Данные формы */
  formData: ContactFormData;
  /** Ошибки валидации */
  errors: ValidationErrors;
  /** Обработчик изменения полей */
  onChange: (section: keyof ContactFormData, field: string, value: any) => void;
  /** Состояние отправки */
  isSubmitting?: boolean;
}

export const StepBasicInfo: React.FC<StepBasicInfoProps> = ({
  formData,
  errors,
  onChange,
  isSubmitting = false,
}) => {
  const basicInfo = formData.basicInfo || {};

  // Обработчики изменения полей
  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange('basicInfo', field, value);
  };

  // Форматирование телефона
  const formatPhone = (value: string) => {
    // Удаляем все нецифровые символы кроме +
    const cleaned = value.replace(/[^\d+]/g, '');
    
    // Если начинается с 8, заменяем на +7
    if (cleaned.startsWith('8')) {
      return `+7${cleaned.slice(1)}`;
    }
    
    // Если начинается с 7, добавляем +
    if (cleaned.startsWith('7') && !cleaned.startsWith('+7')) {
      return `+${cleaned}`;
    }
    
    return cleaned;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    onChange('basicInfo', 'phone', formatted);
  };

  // Animation variants
  const fieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.3,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Расскажите о себе
        </h3>
        <p className="text-gray-600">
          Укажите контактную информацию для связи
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        {/* Name Field */}
        <motion.div
          custom={0}
          variants={fieldVariants}
          initial="hidden"
          animate="visible"
        >
          <Input
            id="name"
            type="text"
            label="Ваше имя"
            placeholder="Например: Иван Иванов"
            value={basicInfo.name || ''}
            onChange={handleChange('name')}
            error={errors.name}
            required
            disabled={isSubmitting}
            autoComplete="name"
            className="focus:border-blue-500 focus:ring-blue-500"
            icon={
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            }
          />
        </motion.div>

        {/* Email Field */}
        <motion.div
          custom={1}
          variants={fieldVariants}
          initial="hidden"
          animate="visible"
        >
          <Input
            id="email"
            type="email"
            label="Email"
            placeholder="ivan@company.com"
            value={basicInfo.email || ''}
            onChange={handleChange('email')}
            error={errors.email}
            required
            disabled={isSubmitting}
            autoComplete="email"
            className="focus:border-blue-500 focus:ring-blue-500"
            icon={
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            }
          />
        </motion.div>

        {/* Phone Field */}
        <motion.div
          custom={2}
          variants={fieldVariants}
          initial="hidden"
          animate="visible"
        >
          <Input
            id="phone"
            type="tel"
            label="Телефон"
            placeholder="+7 (999) 123-45-67"
            value={basicInfo.phone || ''}
            onChange={handlePhoneChange}
            error={errors.phone}
            required={false}
            disabled={isSubmitting}
            autoComplete="tel"
            className="focus:border-blue-500 focus:ring-blue-500"
            icon={
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            }
            helpText="Телефон не обязателен, но поможет нам быстрее связаться с вами"
          />
        </motion.div>
      </div>

      {/* Help Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-blue-50 border border-blue-200 rounded-lg p-4"
      >
        <div className="flex items-start space-x-3">
          <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Конфиденциальность</p>
            <p>
              Ваши данные защищены и используются только для связи по проекту. 
              Мы не передаем информацию третьим лицам.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Form Progress Info */}
      <div className="text-center text-sm text-gray-500">
        Заполните обязательные поля, чтобы продолжить
      </div>
    </div>
  );
};

export default StepBasicInfo; 