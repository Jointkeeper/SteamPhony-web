/**
 * StepProjectDetails.tsx - Step 2: Project Details (PLACEHOLDER)
 * 
 * Второй шаг формы:
 * - Тип услуги
 * - Бюджет проекта
 * - Временные рамки
 * 
 * TODO: Полная реализация будет позже
 */

import React from 'react';
import { ContactFormData, ValidationErrors } from '../../../types/contactForm';

interface StepProjectDetailsProps {
  formData: ContactFormData;
  errors: ValidationErrors;
  onChange: (section: keyof ContactFormData, field: string, value: any) => void;
  isSubmitting?: boolean;
}

export const StepProjectDetails: React.FC<StepProjectDetailsProps> = ({
  formData,
  errors,
  onChange,
  isSubmitting = false,
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          О вашем проекте
        </h3>
        <p className="text-gray-600">
          Расскажите о том, что вы хотите создать
        </p>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <svg className="w-5 h-5 text-yellow-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          <div className="text-sm text-yellow-800">
            <p className="font-medium">В разработке</p>
            <p>Этот шаг будет реализован в следующей итерации</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepProjectDetails; 