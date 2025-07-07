/**
 * ProgressIndicator.tsx - Progress Bar for Multi-Step Form
 * 
 * Показывает текущий прогресс заполнения формы:
 * - Визуальный индикатор шагов
 * - Анимированные переходы
 * - Accessibility support
 */

import React from 'react';
import { motion } from 'framer-motion';

interface Step {
  id: string;
  title: string;
  description: string;
}

interface ProgressIndicatorProps {
  /** Массив шагов формы */
  steps: readonly Step[];
  /** Текущий активный шаг (0-based) */
  currentStep: number;
  /** Количество завершенных шагов */
  completedSteps: number;
  /** Показать описания шагов */
  showDescriptions?: boolean;
  /** Размер индикатора */
  size?: 'small' | 'default' | 'large';
  /** Custom CSS classes */
  className?: string;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  steps,
  currentStep,
  completedSteps,
  showDescriptions = false,
  size = 'default',
  className = '',
}) => {
  const totalSteps = steps.length;
  const progressPercentage = ((currentStep) / (totalSteps - 1)) * 100;

  // Size configurations
  const sizeConfig = {
    small: {
      stepSize: 'w-6 h-6',
      fontSize: 'text-xs',
      spacing: 'gap-2',
      lineHeight: 'h-0.5',
    },
    default: {
      stepSize: 'w-8 h-8',
      fontSize: 'text-sm',
      spacing: 'gap-4',
      lineHeight: 'h-1',
    },
    large: {
      stepSize: 'w-10 h-10',
      fontSize: 'text-base',
      spacing: 'gap-6',
      lineHeight: 'h-1.5',
    },
  };

  const config = sizeConfig[size];

  return (
    <div className={`w-full ${className}`} role="progressbar" aria-valuenow={currentStep + 1} aria-valuemin={1} aria-valuemax={totalSteps}>
      {/* Steps Container */}
      <div className={`flex items-center justify-between ${config.spacing}`}>
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isUpcoming = index > currentStep;

          return (
            <div
              key={step.id}
              className="flex flex-col items-center flex-1"
            >
              {/* Step Circle */}
              <div className="relative flex items-center justify-center">
                <motion.div
                  className={`
                    ${config.stepSize} rounded-full border-2 flex items-center justify-center relative z-10
                    ${isCompleted 
                      ? 'bg-green-500 border-green-500 text-white' 
                      : isCurrent 
                        ? 'bg-blue-500 border-blue-500 text-white' 
                        : 'bg-white border-gray-300 text-gray-400'
                    }
                  `}
                  initial={false}
                  animate={{
                    scale: isCurrent ? 1.1 : 1,
                    backgroundColor: isCompleted 
                      ? '#10B981' 
                      : isCurrent 
                        ? '#3B82F6' 
                        : '#FFFFFF',
                  }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  {isCompleted ? (
                    <motion.svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2, delay: 0.1 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </motion.svg>
                  ) : (
                    <span className={`font-medium ${config.fontSize}`}>
                      {index + 1}
                    </span>
                  )}
                </motion.div>

                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-full">
                    <div className={`${config.lineHeight} bg-gray-200 relative overflow-hidden`}>
                      <motion.div
                        className={`${config.lineHeight} bg-green-500 absolute left-0 top-0`}
                        initial={{ width: '0%' }}
                        animate={{ 
                          width: index < currentStep ? '100%' : '0%' 
                        }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Step Info */}
              <div className="mt-2 text-center min-w-0">
                <motion.div
                  className={`
                    font-medium ${config.fontSize}
                    ${isCurrent ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'}
                  `}
                  animate={{
                    color: isCurrent 
                      ? '#2563EB' 
                      : isCompleted 
                        ? '#059669' 
                        : '#6B7280',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {step.title}
                </motion.div>
                
                {showDescriptions && (
                  <div className={`text-xs text-gray-400 mt-1 ${size === 'small' ? 'hidden' : ''}`}>
                    {step.description}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Overall Progress Bar */}
      <div className="mt-4">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Прогресс</span>
          <span>{Math.round(progressPercentage)}%</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        </div>
      </div>

      {/* Screen Reader Support */}
      <div className="sr-only">
        Шаг {currentStep + 1} из {totalSteps}: {steps[currentStep]?.title}
        {steps[currentStep]?.description && ` - ${steps[currentStep].description}`}
      </div>
    </div>
  );
};

export default ProgressIndicator; 