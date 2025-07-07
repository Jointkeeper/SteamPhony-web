import { useState, useEffect } from 'react';
import { ContactFormData } from '../types/contactForm';

export const useContactForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<ContactFormData>>({});
  
  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('contactForm');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData(parsed);
      } catch (error) {
        console.warn('Failed to parse saved contact form data:', error);
      }
    }
  }, []);
  
  const updateFormData = (stepData: Partial<ContactFormData>) => {
    const newFormData = { ...formData, ...stepData };
    setFormData(newFormData);
    
    // Auto-save в localStorage
    try {
      localStorage.setItem('contactForm', JSON.stringify(newFormData));
    } catch (error) {
      console.warn('Failed to save contact form data:', error);
    }
  };
  
  const goToNextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3));
  const goToPrevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));
  
  const goToStep = (step: number) => {
    if (step >= 1 && step <= 3) {
      setCurrentStep(step);
    }
  };
  
  const resetForm = () => {
    setFormData({});
    setCurrentStep(1);
    localStorage.removeItem('contactForm');
  };
  
  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.firstName && formData.lastName && formData.email);
      case 2:
        return !!(formData.services?.length && formData.budget && formData.timeline);
      case 3:
        return !!(formData.description && formData.preferredContact);
      default:
        return false;
    }
  };
  
  const canProceedToNext = isStepValid(currentStep);
  const isLastStep = currentStep === 3;
  const isFirstStep = currentStep === 1;
  
  return {
    currentStep,
    formData,
    updateFormData,
    goToNextStep,
    goToPrevStep,
    goToStep,
    resetForm,
    isStepValid,
    canProceedToNext,
    isLastStep,
    isFirstStep
  };
}; 