// НЕ НАЧИНАЙТЕ С UI! Начните с архитектуры данных:

export interface ContactFormData {
  // Step 1: Basic Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  
  // Step 2: Project Details  
  services: string[];
  budget: string;
  timeline: string;
  
  // Step 3: Additional
  description: string;
  files: File[];
  preferredContact: 'email' | 'phone' | 'calendar';
}

export interface ContactFormStep {
  id: number;
  title: string;
  description: string;
  fields: string[];
}

export const contactFormSteps: ContactFormStep[] = [
  {
    id: 1,
    title: 'Основная информация',
    description: 'Расскажите нам о себе',
    fields: ['firstName', 'lastName', 'email', 'phone', 'company']
  },
  {
    id: 2,
    title: 'Детали проекта',
    description: 'Что вас интересует?',
    fields: ['services', 'budget', 'timeline']
  },
  {
    id: 3,
    title: 'Дополнительно',
    description: 'Финальные детали',
    fields: ['description', 'files', 'preferredContact']
  }
]; 