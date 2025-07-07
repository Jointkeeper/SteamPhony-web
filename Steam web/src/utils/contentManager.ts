/**
 * Content Management Pipeline
 * Comprehensive system for content validation, collection, and management
 */

import type {
  ContentItem,
  ContentType,
  ContentValidationRule,
  ContentValidationResult,
  LocalizedContent,
  SEOMetadata,
} from '../types/content';
import { contentTemplates, getTemplate } from '../data/content-templates';

// ===============================
// CONTENT VALIDATION SYSTEM
// ===============================

export class ContentValidator {
  private rules: Map<string, ContentValidationRule[]> = new Map();

  constructor() {
    this.setupDefaultRules();
  }

  private setupDefaultRules() {
    // SEO validation rules
    this.addRule('seo.title.en', {
      field: 'seo.title.en',
      type: 'required',
      message: { en: 'English SEO title is required', ru: 'Требуется английский SEO заголовок' },
      severity: 'error',
    });

    this.addRule('seo.title.en', {
      field: 'seo.title.en',
      type: 'maxLength',
      value: 60,
      message: { en: 'SEO title should not exceed 60 characters', ru: 'SEO заголовок не должен превышать 60 символов' },
      severity: 'warning',
    });

    this.addRule('seo.description.en', {
      field: 'seo.description.en',
      type: 'required',
      message: { en: 'English SEO description is required', ru: 'Требуется английское SEO описание' },
      severity: 'error',
    });

    this.addRule('seo.description.en', {
      field: 'seo.description.en',
      type: 'maxLength',
      value: 160,
      message: { en: 'SEO description should not exceed 160 characters', ru: 'SEO описание не должно превышать 160 символов' },
      severity: 'warning',
    });

    // Content validation rules
    this.addRule('title.en', {
      field: 'title.en',
      type: 'required',
      message: { en: 'English title is required', ru: 'Требуется английский заголовок' },
      severity: 'error',
    });

    this.addRule('title.ru', {
      field: 'title.ru',
      type: 'required',
      message: { en: 'Russian title is required', ru: 'Требуется русский заголовок' },
      severity: 'error',
    });
  }

  addRule(field: string, rule: ContentValidationRule) {
    if (!this.rules.has(field)) {
      this.rules.set(field, []);
    }
    this.rules.get(field)!.push(rule);
  }

  validate(content: Partial<ContentItem>): ContentValidationResult {
    const errors: ContentValidationRule[] = [];
    const warnings: ContentValidationRule[] = [];

    for (const [field, rules] of this.rules) {
      const value = this.getNestedValue(content, field);
      
      for (const rule of rules) {
        const result = this.validateField(value, rule);
        if (!result.valid) {
          if (rule.severity === 'error') {
            errors.push(rule);
          } else if (rule.severity === 'warning') {
            warnings.push(rule);
          }
        }
      }
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    };
  }

  private validateField(value: any, rule: ContentValidationRule): { valid: boolean } {
    switch (rule.type) {
      case 'required':
        return { valid: value != null && value !== '' };
      
      case 'minLength':
        return { valid: typeof value === 'string' && value.length >= (rule.value || 0) };
      
      case 'maxLength':
        return { valid: typeof value === 'string' && value.length <= (rule.value || Infinity) };
      
      case 'pattern':
        const regex = new RegExp(rule.value);
        return { valid: typeof value === 'string' && regex.test(value) };
      
      default:
        return { valid: true };
    }
  }

  private getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }
}

// ===============================
// CONTENT COLLECTION SYSTEM
// ===============================

export interface ContentCollectionForm {
  type: 'service' | 'portfolio' | 'team-member' | 'testimonial' | 'blog-post';
  fields: FormFieldDefinition[];
  validation: ContentValidationRule[];
  workflow: ContentWorkflowStep[];
}

export interface FormFieldDefinition {
  id: string;
  label: LocalizedContent;
  type: 'text' | 'textarea' | 'rich-text' | 'select' | 'multi-select' | 'date' | 'file' | 'localized-text';
  required: boolean;
  placeholder?: LocalizedContent;
  options?: { value: string; label: LocalizedContent }[];
  validation?: ContentValidationRule[];
  helpText?: LocalizedContent;
  section: string;
}

export interface ContentWorkflowStep {
  id: string;
  name: LocalizedContent;
  description: LocalizedContent;
  assignee: 'author' | 'editor' | 'reviewer' | 'admin';
  action: 'create' | 'edit' | 'review' | 'approve' | 'publish';
  autoAdvance?: boolean;
  notifications?: string[];
}

export class ContentCollectionManager {
  private validator = new ContentValidator();
  private forms: Map<string, ContentCollectionForm> = new Map();

  constructor() {
    this.setupDefaultForms();
  }

  private setupDefaultForms() {
    // Portfolio project form
    this.forms.set('portfolio', {
      type: 'portfolio',
      fields: [
        {
          id: 'title',
          label: { en: 'Project Title', ru: 'Название проекта' },
          type: 'localized-text',
          required: true,
          section: 'basic',
          helpText: { en: 'A compelling project name', ru: 'Привлекательное название проекта' },
        },
        {
          id: 'shortDescription',
          label: { en: 'Short Description', ru: 'Краткое описание' },
          type: 'localized-text',
          required: true,
          section: 'basic',
        },
        {
          id: 'category',
          label: { en: 'Category', ru: 'Категория' },
          type: 'select',
          required: true,
          section: 'basic',
          options: [
            { value: 'restaurant', label: { en: 'Restaurant', ru: 'Ресторан' } },
            { value: 'beauty', label: { en: 'Beauty', ru: 'Красота' } },
            { value: 'technology', label: { en: 'Technology', ru: 'Технологии' } },
            { value: 'ecommerce', label: { en: 'E-commerce', ru: 'Электронная коммерция' } },
            { value: 'legal', label: { en: 'Legal', ru: 'Юридические услуги' } },
          ],
        },
        {
          id: 'clientName',
          label: { en: 'Client Name', ru: 'Название клиента' },
          type: 'text',
          required: true,
          section: 'client',
        },
        {
          id: 'clientIndustry',
          label: { en: 'Client Industry', ru: 'Отрасль клиента' },
          type: 'localized-text',
          required: true,
          section: 'client',
        },
        {
          id: 'challenge',
          label: { en: 'Challenge/Problem', ru: 'Вызов/Проблема' },
          type: 'rich-text',
          required: true,
          section: 'content',
        },
        {
          id: 'solution',
          label: { en: 'Solution Approach', ru: 'Подход к решению' },
          type: 'rich-text',
          required: true,
          section: 'content',
        },
        {
          id: 'technologies',
          label: { en: 'Technologies Used', ru: 'Использованные технологии' },
          type: 'multi-select',
          required: true,
          section: 'technical',
          options: [
            { value: 'react', label: { en: 'React', ru: 'React' } },
            { value: 'nextjs', label: { en: 'Next.js', ru: 'Next.js' } },
            { value: 'typescript', label: { en: 'TypeScript', ru: 'TypeScript' } },
            { value: 'tailwind', label: { en: 'Tailwind CSS', ru: 'Tailwind CSS' } },
            { value: 'nodejs', label: { en: 'Node.js', ru: 'Node.js' } },
          ],
        },
        {
          id: 'results',
          label: { en: 'Results/Metrics', ru: 'Результаты/Метрики' },
          type: 'rich-text',
          required: true,
          section: 'results',
          helpText: { en: 'Include specific numbers and improvements', ru: 'Включите конкретные цифры и улучшения' },
        },
        {
          id: 'timeline',
          label: { en: 'Project Timeline', ru: 'Временные рамки проекта' },
          type: 'text',
          required: true,
          section: 'logistics',
        },
        {
          id: 'heroImage',
          label: { en: 'Hero Image', ru: 'Главное изображение' },
          type: 'file',
          required: true,
          section: 'media',
        },
        {
          id: 'gallery',
          label: { en: 'Project Gallery', ru: 'Галерея проекта' },
          type: 'file',
          required: false,
          section: 'media',
        },
      ],
      validation: [],
      workflow: [
        {
          id: 'draft',
          name: { en: 'Create Draft', ru: 'Создать черновик' },
          description: { en: 'Initial content creation', ru: 'Первоначальное создание контента' },
          assignee: 'author',
          action: 'create',
        },
        {
          id: 'review',
          name: { en: 'Content Review', ru: 'Проверка контента' },
          description: { en: 'Review for accuracy and quality', ru: 'Проверка точности и качества' },
          assignee: 'editor',
          action: 'review',
        },
        {
          id: 'approval',
          name: { en: 'Final Approval', ru: 'Финальное утверждение' },
          description: { en: 'Final approval before publishing', ru: 'Финальное утверждение перед публикацией' },
          assignee: 'admin',
          action: 'approve',
        },
        {
          id: 'publish',
          name: { en: 'Publish', ru: 'Опубликовать' },
          description: { en: 'Make content live', ru: 'Сделать контент активным' },
          assignee: 'admin',
          action: 'publish',
          autoAdvance: true,
        },
      ],
    });

    // Team member form
    this.forms.set('team-member', {
      type: 'team-member',
      fields: [
        {
          id: 'firstName',
          label: { en: 'First Name', ru: 'Имя' },
          type: 'text',
          required: true,
          section: 'basic',
        },
        {
          id: 'lastName',
          label: { en: 'Last Name', ru: 'Фамилия' },
          type: 'text',
          required: true,
          section: 'basic',
        },
        {
          id: 'title',
          label: { en: 'Job Title', ru: 'Должность' },
          type: 'localized-text',
          required: true,
          section: 'basic',
        },
        {
          id: 'bio',
          label: { en: 'Biography', ru: 'Биография' },
          type: 'rich-text',
          required: true,
          section: 'content',
        },
        {
          id: 'expertise',
          label: { en: 'Areas of Expertise', ru: 'Области экспертизы' },
          type: 'localized-text',
          required: true,
          section: 'professional',
        },
        {
          id: 'avatar',
          label: { en: 'Profile Photo', ru: 'Фото профиля' },
          type: 'file',
          required: true,
          section: 'media',
        },
        {
          id: 'email',
          label: { en: 'Email', ru: 'Email' },
          type: 'text',
          required: true,
          section: 'contact',
        },
        {
          id: 'linkedin',
          label: { en: 'LinkedIn URL', ru: 'LinkedIn URL' },
          type: 'text',
          required: false,
          section: 'contact',
        },
      ],
      validation: [],
      workflow: [
        {
          id: 'draft',
          name: { en: 'Create Profile', ru: 'Создать профиль' },
          description: { en: 'Create team member profile', ru: 'Создать профиль члена команды' },
          assignee: 'author',
          action: 'create',
        },
        {
          id: 'review',
          name: { en: 'Review Profile', ru: 'Проверить профиль' },
          description: { en: 'Review profile information', ru: 'Проверить информацию профиля' },
          assignee: 'admin',
          action: 'review',
        },
        {
          id: 'publish',
          name: { en: 'Publish Profile', ru: 'Опубликовать профиль' },
          description: { en: 'Make profile visible', ru: 'Сделать профиль видимым' },
          assignee: 'admin',
          action: 'publish',
        },
      ],
    });
  }

  getForm(type: string): ContentCollectionForm | undefined {
    return this.forms.get(type);
  }

  createContent(type: string, data: Record<string, any>): ContentItem | null {
    const template = getTemplate(type);
    if (!template) return null;

    const content = {
      ...template,
      ...data,
      id: this.generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      version: 1,
      status: 'draft' as const,
    } as ContentItem;

    const validation = this.validator.validate(content);
    if (!validation.valid) {
      throw new Error(`Content validation failed: ${validation.errors.map(e => e.message.en).join(', ')}`);
    }

    return content;
  }

  updateContent(content: ContentItem, updates: Partial<ContentItem>): ContentItem {
    const updatedContent = {
      ...content,
      ...updates,
      updatedAt: new Date().toISOString(),
      version: content.version + 1,
    };

    const validation = this.validator.validate(updatedContent);
    if (!validation.valid) {
      throw new Error(`Content validation failed: ${validation.errors.map(e => e.message.en).join(', ')}`);
    }

    return updatedContent;
  }

  private generateId(): string {
    return `content_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

// ===============================
// CONTENT PERFORMANCE TRACKING
// ===============================

export interface ContentPerformanceMetrics {
  contentId: string;
  pageViews: number;
  uniqueViews: number;
  averageTimeOnPage: number;
  bounceRate: number;
  conversionRate: number;
  socialShares: number;
  comments: number;
  lastUpdated: string;
}

export class ContentPerformanceTracker {
  private metrics: Map<string, ContentPerformanceMetrics> = new Map();

  trackPageView(contentId: string, isUnique: boolean = false) {
    const existing = this.metrics.get(contentId) || this.createEmptyMetrics(contentId);
    existing.pageViews += 1;
    if (isUnique) existing.uniqueViews += 1;
    existing.lastUpdated = new Date().toISOString();
    this.metrics.set(contentId, existing);
  }

  trackTimeOnPage(contentId: string, timeSpent: number) {
    const existing = this.metrics.get(contentId) || this.createEmptyMetrics(contentId);
    // Update running average
    existing.averageTimeOnPage = (existing.averageTimeOnPage + timeSpent) / 2;
    existing.lastUpdated = new Date().toISOString();
    this.metrics.set(contentId, existing);
  }

  trackConversion(contentId: string) {
    const existing = this.metrics.get(contentId) || this.createEmptyMetrics(contentId);
    existing.conversionRate = ((existing.conversionRate * existing.pageViews) + 1) / (existing.pageViews + 1);
    existing.lastUpdated = new Date().toISOString();
    this.metrics.set(contentId, existing);
  }

  getMetrics(contentId: string): ContentPerformanceMetrics | undefined {
    return this.metrics.get(contentId);
  }

  getTopPerformingContent(limit: number = 10): ContentPerformanceMetrics[] {
    return Array.from(this.metrics.values())
      .sort((a, b) => b.pageViews - a.pageViews)
      .slice(0, limit);
  }

  private createEmptyMetrics(contentId: string): ContentPerformanceMetrics {
    return {
      contentId,
      pageViews: 0,
      uniqueViews: 0,
      averageTimeOnPage: 0,
      bounceRate: 0,
      conversionRate: 0,
      socialShares: 0,
      comments: 0,
      lastUpdated: new Date().toISOString(),
    };
  }
}

// ===============================
// AUTOMATED CONTENT OPTIMIZATION
// ===============================

export class ContentOptimizer {
  private performanceTracker: ContentPerformanceTracker;

  constructor(performanceTracker: ContentPerformanceTracker) {
    this.performanceTracker = performanceTracker;
  }

  analyzeContent(content: ContentItem): ContentOptimizationSuggestions {
    const metrics = this.performanceTracker.getMetrics(content.id);
    const suggestions: ContentOptimizationSuggestions = {
      contentId: content.id,
      seo: [],
      performance: [],
      content: [],
      conversion: [],
    };

    // SEO optimization suggestions
    if (content.seo) {
      if (content.seo.title.en.length > 60) {
        suggestions.seo.push({
          type: 'seo',
          priority: 'high',
          suggestion: { en: 'SEO title is too long', ru: 'SEO заголовок слишком длинный' },
          impact: 'Search visibility may be reduced',
        });
      }

      if (content.seo.keywords.length < 3) {
        suggestions.seo.push({
          type: 'seo',
          priority: 'medium',
          suggestion: { en: 'Add more keywords', ru: 'Добавьте больше ключевых слов' },
          impact: 'Better search targeting',
        });
      }
    }

    // Performance optimization suggestions
    if (metrics) {
      if (metrics.bounceRate > 0.7) {
        suggestions.performance.push({
          type: 'performance',
          priority: 'high',
          suggestion: { en: 'High bounce rate detected', ru: 'Обнаружен высокий показатель отказов' },
          impact: 'Users are leaving quickly',
        });
      }

      if (metrics.averageTimeOnPage < 30) {
        suggestions.content.push({
          type: 'content',
          priority: 'medium',
          suggestion: { en: 'Content may need to be more engaging', ru: 'Контент может нуждаться в большей привлекательности' },
          impact: 'Low engagement time',
        });
      }
    }

    return suggestions;
  }
}

export interface ContentOptimizationSuggestions {
  contentId: string;
  seo: OptimizationSuggestion[];
  performance: OptimizationSuggestion[];
  content: OptimizationSuggestion[];
  conversion: OptimizationSuggestion[];
}

export interface OptimizationSuggestion {
  type: 'seo' | 'performance' | 'content' | 'conversion';
  priority: 'low' | 'medium' | 'high';
  suggestion: LocalizedContent;
  impact: string;
}

// ===============================
// EXPORT MAIN CLASSES
// ===============================

export const contentManager = new ContentCollectionManager();
export const contentValidator = new ContentValidator();
export const performanceTracker = new ContentPerformanceTracker();
export const contentOptimizer = new ContentOptimizer(performanceTracker);

export default {
  ContentCollectionManager,
  ContentValidator,
  ContentPerformanceTracker,
  ContentOptimizer,
  contentManager,
  contentValidator,
  performanceTracker,
  contentOptimizer,
}; 