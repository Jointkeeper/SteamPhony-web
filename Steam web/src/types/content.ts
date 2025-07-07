/**
 * Content Management System Types
 * Comprehensive type definitions for all content structures
 */

// ===============================
// BASE CONTENT TYPES
// ===============================

export interface BaseContent {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  status: 'draft' | 'published' | 'archived';
  author: string;
  version: number;
}

export interface LocalizedContent {
  en: string;
  ru: string;
}

export interface SEOMetadata {
  title: LocalizedContent;
  description: LocalizedContent;
  keywords: string[];
  ogImage?: string;
  canonicalUrl?: string;
  structuredData?: Record<string, any>;
}

// ===============================
// MEDIA TYPES
// ===============================

export interface MediaAsset {
  id: string;
  url: string;
  alt: LocalizedContent;
  width: number;
  height: number;
  format: 'webp' | 'avif' | 'jpg' | 'png' | 'svg';
  size: number;
  placeholder?: string;
}

export interface VideoAsset {
  id: string;
  url: string;
  thumbnail: MediaAsset;
  duration: number;
  format: 'mp4' | 'webm';
  captions?: {
    language: 'en' | 'ru';
    url: string;
  }[];
}

// ===============================
// PAGE CONTENT TYPES
// ===============================

export interface PageContent extends BaseContent {
  slug: string;
  type: 'page';
  seo: SEOMetadata;
  sections: PageSection[];
}

export interface PageSection {
  id: string;
  type: 'hero' | 'features' | 'testimonials' | 'cta' | 'portfolio' | 'team' | 'process' | 'faq';
  order: number;
  visible: boolean;
  content: Record<string, any>;
}

// ===============================
// HERO SECTION TYPES
// ===============================

export interface HeroSection {
  title: LocalizedContent;
  subtitle: LocalizedContent;
  description: LocalizedContent;
  primaryCTA: CallToAction;
  secondaryCTA?: CallToAction;
  backgroundMedia?: MediaAsset | VideoAsset;
  trustSignal?: LocalizedContent;
  features?: string[];
}

export interface CallToAction {
  text: LocalizedContent;
  url: string;
  type: 'primary' | 'secondary' | 'tertiary';
  size: 'sm' | 'md' | 'lg';
  style: 'solid' | 'outline' | 'ghost';
  icon?: string;
  tracking?: {
    event: string;
    category: string;
    label: string;
  };
}

// ===============================
// SERVICE TYPES
// ===============================

export interface Service extends BaseContent {
  type: 'service';
  title: LocalizedContent;
  slug: string;
  shortDescription: LocalizedContent;
  fullDescription: LocalizedContent;
  category: ServiceCategory;
  features: ServiceFeature[];
  pricing: ServicePricing;
  process: ProcessStep[];
  deliverables: LocalizedContent[];
  technologies: Technology[];
  icon: string;
  color: 'purple' | 'brown' | 'peach';
  seo: SEOMetadata;
}

export interface ServiceCategory {
  id: string;
  name: LocalizedContent;
  slug: string;
  order: number;
}

export interface ServiceFeature {
  id: string;
  title: LocalizedContent;
  description: LocalizedContent;
  icon: string;
  included: boolean;
}

export interface ServicePricing {
  type: 'fixed' | 'hourly' | 'project' | 'quote';
  startingPrice?: number;
  currency: 'USD' | 'EUR' | 'RUB';
  packages?: PricingPackage[];
  note?: LocalizedContent;
}

export interface PricingPackage {
  id: string;
  name: LocalizedContent;
  price: number;
  features: string[];
  recommended?: boolean;
  cta: CallToAction;
}

// ===============================
// PORTFOLIO TYPES
// ===============================

export interface PortfolioProject extends BaseContent {
  type: 'portfolio';
  title: LocalizedContent;
  slug: string;
  shortDescription: LocalizedContent;
  fullDescription: LocalizedContent;
  category: ProjectCategory;
  client: ClientInfo;
  challenge: LocalizedContent;
  solution: ProjectSolution;
  results: ProjectResult[];
  timeline: ProjectTimeline;
  budget?: ProjectBudget;
  testimonial?: Testimonial;
  media: ProjectMedia;
  technologies: Technology[];
  services: string[]; // Service IDs
  featured: boolean;
  color: 'purple' | 'brown' | 'peach' | 'green' | 'blue';
  seo: SEOMetadata;
}

export interface ProjectCategory {
  id: string;
  name: LocalizedContent;
  slug: string;
  order: number;
}

export interface ClientInfo {
  name: string;
  industry: LocalizedContent;
  size: LocalizedContent;
  location?: string;
  website?: string;
  logo?: MediaAsset;
  confidential: boolean;
}

export interface ProjectSolution {
  approach: LocalizedContent;
  methodology: LocalizedContent[];
  technologies: Technology[];
  features: LocalizedContent[];
  innovations?: LocalizedContent[];
}

export interface ProjectResult {
  metric: LocalizedContent;
  value: string;
  improvement: number; // percentage
  period: string; // e.g., "3 months"
  type: 'increase' | 'decrease' | 'neutral';
  verified: boolean;
}

export interface ProjectTimeline {
  duration: string;
  phases: TimelinePhase[];
  startDate?: string;
  endDate?: string;
}

export interface TimelinePhase {
  name: LocalizedContent;
  duration: string;
  deliverables: LocalizedContent[];
  order: number;
}

export interface ProjectBudget {
  range: 'under-10k' | '10k-25k' | '25k-50k' | '50k-100k' | 'over-100k';
  currency: 'USD' | 'EUR' | 'RUB';
  note?: LocalizedContent;
}

export interface ProjectMedia {
  hero: MediaAsset;
  gallery: MediaAsset[];
  video?: VideoAsset;
  beforeAfter?: {
    before: MediaAsset;
    after: MediaAsset;
  };
}

// ===============================
// TEAM TYPES
// ===============================

export interface TeamMember extends BaseContent {
  type: 'team-member';
  firstName: string;
  lastName: string;
  slug: string;
  title: LocalizedContent;
  bio: LocalizedContent;
  expertise: LocalizedContent[];
  experience: WorkExperience[];
  education: Education[];
  certifications: Certification[];
  avatar: MediaAsset;
  social: SocialLinks;
  languages: Language[];
  availability: boolean;
  order: number;
}

export interface WorkExperience {
  company: string;
  position: LocalizedContent;
  startDate: string;
  endDate?: string;
  description: LocalizedContent;
  technologies?: Technology[];
}

export interface Education {
  institution: string;
  degree: LocalizedContent;
  field: LocalizedContent;
  year: number;
  grade?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  url?: string;
}

export interface SocialLinks {
  linkedin?: string;
  github?: string;
  twitter?: string;
  website?: string;
  email: string;
}

export interface Language {
  code: 'en' | 'ru' | 'es' | 'fr' | 'de';
  name: string;
  level: 'native' | 'fluent' | 'conversational' | 'basic';
}

// ===============================
// TESTIMONIAL TYPES
// ===============================

export interface Testimonial extends BaseContent {
  type: 'testimonial';
  content: LocalizedContent;
  author: TestimonialAuthor;
  project?: string; // Portfolio project ID
  rating: number; // 1-5
  featured: boolean;
  category: 'service' | 'support' | 'results' | 'process';
  media?: MediaAsset | VideoAsset;
  verified: boolean;
}

export interface TestimonialAuthor {
  name: string;
  title: LocalizedContent;
  company: string;
  avatar?: MediaAsset;
  linkedin?: string;
}

// ===============================
// BLOG TYPES
// ===============================

export interface BlogPost extends BaseContent {
  type: 'blog-post';
  title: LocalizedContent;
  slug: string;
  excerpt: LocalizedContent;
  content: LocalizedContent;
  category: BlogCategory;
  tags: string[];
  author: string; // Team member ID
  featuredImage: MediaAsset;
  readingTime: number; // minutes
  featured: boolean;
  seo: SEOMetadata;
}

export interface BlogCategory {
  id: string;
  name: LocalizedContent;
  slug: string;
  description: LocalizedContent;
  color: string;
  order: number;
}

// ===============================
// TECHNOLOGY TYPES
// ===============================

export interface Technology {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'design' | 'marketing';
  icon?: string;
  url?: string;
  color?: string;
  proficiency: 'expert' | 'advanced' | 'intermediate' | 'basic';
}

// ===============================
// COMPONENT CONTENT TYPES
// ===============================

export interface FeatureGrid {
  id: string;
  title: LocalizedContent;
  subtitle?: LocalizedContent;
  features: Feature[];
  layout: 'grid-2' | 'grid-3' | 'grid-4' | 'bento';
  style: 'cards' | 'list' | 'tiles';
}

export interface Feature {
  id: string;
  title: LocalizedContent;
  description: LocalizedContent;
  icon: string;
  color?: string;
  link?: string;
  size: 'small' | 'medium' | 'large';
}

export interface ProcessSection {
  id: string;
  title: LocalizedContent;
  subtitle?: LocalizedContent;
  steps: ProcessStep[];
  style: 'timeline' | 'cards' | 'numbered';
}

export interface ProcessStep {
  id: string;
  title: LocalizedContent;
  description: LocalizedContent;
  duration?: string;
  deliverables?: LocalizedContent[];
  order: number;
  icon?: string;
}

export interface FAQSection {
  id: string;
  title: LocalizedContent;
  subtitle?: LocalizedContent;
  questions: FAQItem[];
  category?: string;
}

export interface FAQItem {
  id: string;
  question: LocalizedContent;
  answer: LocalizedContent;
  category?: string;
  order: number;
  helpful?: number; // vote count
}

// ===============================
// FORM TYPES
// ===============================

export interface ContactForm {
  id: string;
  title: LocalizedContent;
  subtitle?: LocalizedContent;
  fields: FormField[];
  submitText: LocalizedContent;
  successMessage: LocalizedContent;
  errorMessage: LocalizedContent;
  redirectUrl?: string;
  emailTemplate: string;
}

export interface FormField {
  id: string;
  name: string;
  type: 'text' | 'email' | 'phone' | 'textarea' | 'select' | 'checkbox' | 'radio';
  label: LocalizedContent;
  placeholder?: LocalizedContent;
  required: boolean;
  validation?: {
    pattern?: string;
    min?: number;
    max?: number;
    message: LocalizedContent;
  };
  options?: {
    value: string;
    label: LocalizedContent;
  }[];
  order: number;
}

// ===============================
// ANALYTICS TYPES
// ===============================

export interface ContentAnalytics {
  contentId: string;
  type: 'page' | 'section' | 'component';
  metrics: {
    views: number;
    uniqueViews: number;
    engagement: number;
    conversions: number;
    averageTime: number;
    bounceRate: number;
  };
  period: {
    start: string;
    end: string;
  };
  lastUpdated: string;
}

// ===============================
// CONTENT VALIDATION
// ===============================

export interface ContentValidationRule {
  field: string;
  type: 'required' | 'minLength' | 'maxLength' | 'pattern' | 'custom';
  value?: any;
  message: LocalizedContent;
  severity: 'error' | 'warning' | 'info';
}

export interface ContentValidationResult {
  valid: boolean;
  errors: ContentValidationRule[];
  warnings: ContentValidationRule[];
}

// ===============================
// EXPORT ALL TYPES
// ===============================

export type ContentType = 
  | PageContent 
  | Service 
  | PortfolioProject 
  | TeamMember 
  | Testimonial 
  | BlogPost;

export type ContentItem = ContentType & BaseContent; 