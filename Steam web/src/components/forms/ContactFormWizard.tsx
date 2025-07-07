/**
 * ContactFormWizard.tsx - Main Container for Enhanced Contact Form
 * 
 * Архитектурное решение:
 * - Multi-step wizard с localStorage persistence
 * - TypeScript-first подход с готовыми типами
 * - Progressive enhancement (работает без JS)
 * - Analytics integration для funnel tracking
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContactForm } from '../../hooks/useContactForm';
import { ProgressIndicator } from './ui/ProgressIndicator';
import { StepNavigation } from './ui/StepNavigation';
import { StepBasicInfo } from './steps/StepBasicInfo';
import { StepProjectDetails } from './steps/StepProjectDetails';
import { StepAdditionalInfo } from './steps/StepAdditionalInfo';
import { trackComponentRender } from '../../utils/performanceMonitor';
import { devLogger } from '../../utils/devTools';

// Step configuration
const STEPS = [
  {
    id: 'basic-info',
    title: 'Основная информация',
    description: 'Имя, email, телефон',
    component: StepBasicInfo,
  },
  {
    id: 'project-details', 
    title: 'О проекте',
    description: 'Услуга, бюджет, сроки',
    component: StepProjectDetails,
  },
  {
    id: 'additional-info',
    title: 'Дополнительно',
    description: 'Файлы, комментарии',
    component: StepAdditionalInfo,
  },
] as const;

// Animation variants
const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

interface ContactFormWizardProps {
  /** Custom form title */
  title?: string;
  /** Custom form subtitle */
  subtitle?: string;
  /** Size variant */
  size?: 'default' | 'compact';
  /** Success callback */
  onSuccess?: () => void;
  /** Custom CSS classes */
  className?: string;
}

export const ContactFormWizard: React.FC<ContactFormWizardProps> = ({
  title = 'Начните свой проект',
  subtitle = 'Заполните форму, и мы свяжемся с вами в течение 24 часов',
  size = 'default',
  onSuccess,
  className = '',
}) => {
  // Performance tracking
  const renderTracker = trackComponentRender('ContactFormWizard');
  React.useEffect(() => {
    renderTracker.start();
    return () => renderTracker.end();
  }, []);

  // Form state management
  const {
    currentStep,
    formData,
    isValid,
    isSubmitting,
    isCompleted,
    errors,
    direction,
    nextStep,
    prevStep,
    goToStep,
    updateField,
    submitForm,
  } = useContactForm();

  // Current step configuration
  const currentStepConfig = STEPS[currentStep];
  const CurrentStepComponent = currentStepConfig.component;

  // Analytics tracking
  React.useEffect(() => {
    if (window.gtag) {
      window.gtag('event', 'form_step_view', {
        event_category: 'lead_generation',
        event_label: currentStepConfig.id,
        step_number: currentStep + 1,
        total_steps: STEPS.length,
      });
    }
    
    devLogger.debug(`ContactFormWizard: Step ${currentStep + 1}/${STEPS.length}`, {
      stepId: currentStepConfig.id,
      formData: Object.keys(formData),
      isValid,
    });
  }, [currentStep, currentStepConfig.id, isValid]);

  // Handle step navigation
  const handleNext = React.useCallback(() => {
    if (isValid[currentStep]) {
      nextStep();
    } else {
      devLogger.warn('ContactFormWizard: Cannot proceed - validation failed', {
        step: currentStep,
        errors: errors[currentStep],
      });
    }
  }, [currentStep, isValid, nextStep, errors]);

  const handlePrev = React.useCallback(() => {
    prevStep();
  }, [prevStep]);

  const handleSubmit = React.useCallback(async () => {
    try {
      const result = await submitForm();
      if (result.success) {
        onSuccess?.();
        
        // Track successful conversion
        if (window.gtag) {
          window.gtag('event', 'conversion', {
            send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL', // TODO: Add real conversion tracking
            event_category: 'lead_generation',
            event_label: 'contact_form_completed',
            value: formData.projectDetails?.budget || 'unknown',
          });
        }
      }
    } catch (error) {
      devLogger.error('ContactFormWizard: Submit failed', error);
    }
  }, [submitForm, onSuccess, formData.projectDetails?.budget]);

  // Success state
  if (isCompleted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 rounded-2xl p-8 text-center ${className}`}
      >
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          Спасибо за заявку!
        </h3>
        
        <p className="text-gray-600 mb-6">
          Мы получили вашу заявку и свяжемся с вами в течение 24 часов.
          Проверьте email — мы отправили подтверждение.
        </p>
        
        <div className="text-sm text-gray-500">
          ID заявки: #{formData.basicInfo?.email?.slice(0, 8) || 'N/A'}
          {Date.now().toString().slice(-4)}
        </div>
      </motion.div>
    );
  }

  // Main form render
  return (
    <div className={`bg-white rounded-2xl ${size === 'default' ? 'p-8 shadow-xl' : 'p-6'} ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className={`font-bold text-gray-900 mb-3 ${size === 'compact' ? 'text-2xl' : 'text-3xl'}`}>
          {title}
        </h2>
        <p className="text-gray-600 mb-6">
          {subtitle}
        </p>
        
        {/* Progress Indicator */}
        <ProgressIndicator
          steps={STEPS}
          currentStep={currentStep}
          completedSteps={isValid.slice(0, currentStep).every(Boolean) ? currentStep : currentStep - 1}
        />
      </div>

      {/* Step Content */}
      <div className="relative min-h-[400px]">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentStep}
            custom={direction}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <CurrentStepComponent
              formData={formData}
              errors={errors[currentStep] || {}}
              onChange={updateField}
              isSubmitting={isSubmitting}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="mt-8">
        <StepNavigation
          currentStep={currentStep}
          totalSteps={STEPS.length}
          isValid={isValid[currentStep] || false}
          isSubmitting={isSubmitting}
          canGoBack={currentStep > 0}
          canGoNext={currentStep < STEPS.length - 1}
          isLastStep={currentStep === STEPS.length - 1}
          onNext={handleNext}
          onPrev={handlePrev}
          onSubmit={handleSubmit}
        />
      </div>

      {/* Debug info (development only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-4 p-3 bg-gray-100 rounded text-xs text-gray-600">
          <div>Step: {currentStep + 1}/{STEPS.length} ({currentStepConfig.id})</div>
          <div>Valid: {isValid[currentStep] ? '✅' : '❌'}</div>
          <div>Fields: {Object.keys(formData).length}</div>
        </div>
      )}
    </div>
  );
};

export default ContactFormWizard; 