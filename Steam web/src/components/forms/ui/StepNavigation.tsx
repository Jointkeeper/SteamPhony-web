/**
 * StepNavigation.tsx - Navigation Buttons for Multi-Step Form
 * 
 * Кнопки навигации:
 * - Назад (если не первый шаг)
 * - Далее (если не последний шаг)
 * - Отправить (на последнем шаге)
 * - Loading states и disabled состояния
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../ui/Button';

interface StepNavigationProps {
  /** Текущий шаг (0-based) */
  currentStep: number;
  /** Общее количество шагов */
  totalSteps: number;
  /** Валиден ли текущий шаг */
  isValid: boolean;
  /** Состояние отправки формы */
  isSubmitting: boolean;
  /** Можно ли вернуться назад */
  canGoBack: boolean;
  /** Можно ли идти вперед */
  canGoNext: boolean;
  /** Это последний шаг */
  isLastStep: boolean;
  /** Обработчик кнопки "Далее" */
  onNext: () => void;
  /** Обработчик кнопки "Назад" */
  onPrev: () => void;
  /** Обработчик отправки формы */
  onSubmit: () => void;
  /** Custom CSS classes */
  className?: string;
}

export const StepNavigation: React.FC<StepNavigationProps> = ({
  currentStep,
  totalSteps,
  isValid,
  isSubmitting,
  canGoBack,
  canGoNext,
  isLastStep,
  onNext,
  onPrev,
  onSubmit,
  className = '',
}) => {
  // Animation variants
  const buttonVariants = {
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
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 },
    },
  };

  return (
    <div className={`flex items-center justify-between ${className}`}>
      {/* Back Button */}
      <motion.div
        custom={0}
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        whileTap="tap"
      >
        {canGoBack ? (
          <Button
            variant="outline"
            size="lg"
            onClick={onPrev}
            disabled={isSubmitting}
            className="flex items-center space-x-2 border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Назад</span>
          </Button>
        ) : (
          <div /> // Пустой div для выравнивания
        )}
      </motion.div>

      {/* Step Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center space-x-2 text-sm text-gray-500"
      >
        <span>{currentStep + 1}</span>
        <span>из</span>
        <span>{totalSteps}</span>
      </motion.div>

      {/* Next/Submit Button */}
      <motion.div
        custom={1}
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        whileTap="tap"
      >
        {isLastStep ? (
          <Button
            variant="primary"
            size="lg"
            onClick={onSubmit}
            disabled={!isValid || isSubmitting}
            loading={isSubmitting}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {isSubmitting ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Отправляем...</span>
              </>
            ) : (
              <>
                <span>Отправить заявку</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </>
            )}
          </Button>
        ) : (
          <Button
            variant="primary"
            size="lg"
            onClick={onNext}
            disabled={!isValid || isSubmitting}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
          >
            <span>Далее</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        )}
      </motion.div>
    </div>
  );
};

export default StepNavigation; 