export interface ProcessStep {
  id: string;
  stepNumber: number;
  title: string;
  shortDescription: string;        // Для timeline view
  detailedDescription: string;     // Для expanded view
  duration: {
    min: number;
    max: number;
    unit: 'days' | 'weeks';
  };
  deliverables: {
    name: string;
    description: string;
    format: string;                // "PDF", "Figma file", etc
  }[];
  tools: string[];                 // "Figma", "Google Analytics", etc
  teamInvolved: string[];          // "Designer", "Developer", etc
  icon: string;                    // Icon identifier
  prerequisites?: string[];        // Dependencies от previous steps
  clientInvolvement: {
    level: 'low' | 'medium' | 'high';
    activities: string[];
  };
}

export const processPlaceholders: ProcessStep[] = [
  {
    id: 'analysis',
    stepNumber: 1,
    title: 'Анализ и стратегия',
    shortDescription: 'Изучаем ваш бизнес и аудиторию',
    detailedDescription: 'Проводим глубокий анализ вашего бизнеса, изучаем конкурентов и целевую аудиторию. Определяем ключевые цели и метрики успеха.',
    duration: { min: 3, max: 5, unit: 'days' },
    deliverables: [
      {
        name: 'Аудит текущего состояния',
        description: 'Подробный анализ существующих решений',
        format: 'PDF'
      },
      {
        name: 'Анализ конкурентов',
        description: 'Исследование рынка и конкурентной среды',
        format: 'Презентация'
      },
      {
        name: 'Стратегия развития',
        description: 'План достижения бизнес-целей',
        format: 'Документ'
      }
    ],
    tools: ['Google Analytics', 'SEMrush', 'Figma'],
    teamInvolved: ['Аналитик', 'Стратег', 'UX-исследователь'],
    icon: 'search',
    clientInvolvement: {
      level: 'high',
      activities: ['Интервью', 'Брифинг', 'Обратная связь']
    }
  },
  {
    id: 'design',
    stepNumber: 2,
    title: 'Дизайн и прототипирование',
    shortDescription: 'Создаем пользовательский интерфейс',
    detailedDescription: 'Разрабатываем wireframes, создаем UI/UX дизайн и интерактивные прототипы. Тестируем пользовательский опыт.',
    duration: { min: 1, max: 2, unit: 'weeks' },
    deliverables: [
      {
        name: 'Wireframes',
        description: 'Структура и логика интерфейса',
        format: 'Figma'
      },
      {
        name: 'UI/UX дизайн',
        description: 'Финальный дизайн всех экранов',
        format: 'Figma'
      },
      {
        name: 'Интерактивный прототип',
        description: 'Clickable прототип для тестирования',
        format: 'Figma/InVision'
      }
    ],
    tools: ['Figma', 'Adobe Creative Suite', 'Principle'],
    teamInvolved: ['UI/UX Designer', 'Веб-дизайнер', 'Front-end разработчик'],
    icon: 'palette',
    prerequisites: ['analysis'],
    clientInvolvement: {
      level: 'medium',
      activities: ['Ревью дизайна', 'Feedback сессии', 'Утверждение']
    }
  },
  {
    id: 'development',
    stepNumber: 3,
    title: 'Разработка и интеграция',
    shortDescription: 'Воплощаем дизайн в код',
    detailedDescription: 'Разрабатываем frontend и backend части, интегрируем с внешними сервисами, настраиваем аналитику и SEO.',
    duration: { min: 2, max: 4, unit: 'weeks' },
    deliverables: [
      {
        name: 'Frontend приложение',
        description: 'Responsive веб-приложение',
        format: 'Code'
      },
      {
        name: 'Backend API',
        description: 'Серверная часть и база данных',
        format: 'Code'
      },
      {
        name: 'Интеграции',
        description: 'CRM, аналитика, платежи',
        format: 'Configuration'
      }
    ],
    tools: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    teamInvolved: ['Frontend разработчик', 'Backend разработчик', 'DevOps'],
    icon: 'code',
    prerequisites: ['design'],
    clientInvolvement: {
      level: 'low',
      activities: ['Еженедельные демо', 'Тестирование', 'Контент-план']
    }
  },
  {
    id: 'launch',
    stepNumber: 4,
    title: 'Запуск и оптимизация',
    shortDescription: 'Выводим проект в продакшн',
    detailedDescription: 'Проводим финальное тестирование, деплоим на продакшн, настраиваем мониторинг и начинаем оптимизацию на основе данных.',
    duration: { min: 1, max: 2, unit: 'weeks' },
    deliverables: [
      {
        name: 'Production deploy',
        description: 'Работающий сайт/приложение',
        format: 'Live URL'
      },
      {
        name: 'Документация',
        description: 'Руководство по использованию',
        format: 'Wiki/PDF'
      },
      {
        name: 'Мониторинг и аналитика',
        description: 'Настроенные системы отслеживания',
        format: 'Dashboard'
      }
    ],
    tools: ['Google Analytics', 'Sentry', 'New Relic', 'AWS CloudWatch'],
    teamInvolved: ['DevOps', 'QA тестер', 'Project Manager'],
    icon: 'rocket',
    prerequisites: ['development'],
    clientInvolvement: {
      level: 'high',
      activities: ['UAT тестирование', 'Go-live решение', 'Обучение']
    }
  }
]; 