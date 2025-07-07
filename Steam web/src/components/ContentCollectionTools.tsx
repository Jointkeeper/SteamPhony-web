/**
 * Content Collection Tools
 * User-friendly interfaces for stakeholders to input and manage content
 */

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { contentManager, contentValidator } from '../utils/contentManager';
import type { 
  ContentItem, 
  FormFieldDefinition, 
  LocalizedContent,
  ContentValidationResult 
} from '../types/content';

// ===============================
// MAIN CONTENT COLLECTION DASHBOARD
// ===============================

export const ContentCollectionDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'overview' | 'create' | 'manage' | 'analytics'>('overview');
  const [selectedContentType, setSelectedContentType] = useState<string>('');

  const contentTypes = [
    { id: 'portfolio', name: 'Portfolio Project', icon: '📊', description: 'Add a new case study or project' },
    { id: 'team-member', name: 'Team Member', icon: '👤', description: 'Add a team member profile' },
    { id: 'testimonial', name: 'Testimonial', icon: '💬', description: 'Add client feedback' },
    { id: 'blog-post', name: 'Blog Post', icon: '📝', description: 'Create a new blog article' },
    { id: 'service', name: 'Service', icon: '🛠️', description: 'Add or edit a service offering' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Content Management</h1>
              <p className="text-gray-600">Manage all website content in one place</p>
            </div>
            <div className="flex space-x-2">
              {['overview', 'create', 'manage', 'analytics'].map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section as any)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeSection === section
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {activeSection === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ContentOverview />
            </motion.div>
          )}

          {activeSection === 'create' && (
            <motion.div
              key="create"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {contentTypes.map((type) => (
                  <motion.div
                    key={type.id}
                    className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedContentType(type.id)}
                  >
                    <div className="text-3xl mb-3">{type.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{type.name}</h3>
                    <p className="text-gray-600 text-sm">{type.description}</p>
                  </motion.div>
                ))}
              </div>

              {selectedContentType && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8"
                >
                  <ContentCreationForm 
                    contentType={selectedContentType}
                    onClose={() => setSelectedContentType('')}
                  />
                </motion.div>
              )}
            </motion.div>
          )}

          {activeSection === 'manage' && (
            <motion.div
              key="manage"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ContentManagement />
            </motion.div>
          )}

          {activeSection === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ContentAnalytics />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

// ===============================
// CONTENT OVERVIEW COMPONENT
// ===============================

const ContentOverview: React.FC = () => {
  const stats = [
    { label: 'Total Content Items', value: '24', change: '+3 this week', trend: 'up' },
    { label: 'Published Pages', value: '8', change: '+1 this week', trend: 'up' },
    { label: 'Draft Items', value: '5', change: '-2 this week', trend: 'down' },
    { label: 'Avg. Performance Score', value: '92%', change: '+5% this month', trend: 'up' },
  ];

  const recentActivity = [
    { action: 'Created', item: 'Portfolio Project: E-commerce Platform', time: '2 hours ago', user: 'Alex' },
    { action: 'Updated', item: 'Team Member: Sarah Johnson', time: '5 hours ago', user: 'Mike' },
    { action: 'Published', item: 'Blog Post: React Performance Tips', time: '1 day ago', user: 'Admin' },
    { action: 'Reviewed', item: 'Service: Digital Marketing', time: '2 days ago', user: 'Editor' },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {recentActivity.map((activity, index) => (
            <div key={index} className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-900">
                  <span className="font-medium">{activity.user}</span> {activity.action.toLowerCase()}{' '}
                  <span className="font-medium">{activity.item}</span>
                </p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${
                activity.action === 'Published' ? 'bg-green-100 text-green-800' :
                activity.action === 'Created' ? 'bg-blue-100 text-blue-800' :
                activity.action === 'Updated' ? 'bg-yellow-100 text-yellow-800' :
                'bg-purple-100 text-purple-800'
              }`}>
                {activity.action}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ===============================
// CONTENT CREATION FORM
// ===============================

interface ContentCreationFormProps {
  contentType: string;
  onClose: () => void;
}

const ContentCreationForm: React.FC<ContentCreationFormProps> = ({ contentType, onClose }) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [validation, setValidation] = useState<ContentValidationResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = contentManager.getForm(contentType);
  if (!form) return null;

  // Group fields by section
  const sections = form.fields.reduce((acc, field) => {
    if (!acc[field.section]) acc[field.section] = [];
    acc[field.section].push(field);
    return acc;
  }, {} as Record<string, FormFieldDefinition[]>);

  const sectionNames = Object.keys(sections);

  const handleFieldChange = useCallback((fieldId: string, value: any) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
  }, []);

  const validateForm = useCallback(() => {
    try {
      const content = contentManager.createContent(contentType, formData);
      setValidation({ valid: true, errors: [], warnings: [] });
      return true;
    } catch (error) {
      setValidation({ 
        valid: false, 
        errors: [{ 
          field: 'general', 
          type: 'custom', 
          message: { en: error.message, ru: error.message },
          severity: 'error' 
        }], 
        warnings: [] 
      });
      return false;
    }
  }, [contentType, formData]);

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const content = contentManager.createContent(contentType, formData);
      // Here you would save to your backend/database
      console.log('Created content:', content);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Content created successfully!');
      onClose();
    } catch (error) {
      alert('Error creating content: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          Create {form.type.charAt(0).toUpperCase() + form.type.slice(1).replace('-', ' ')}
        </h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          ✕
        </button>
      </div>

      {/* Progress Steps */}
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          {sectionNames.map((section, index) => (
            <div key={section} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                index <= currentStep 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {index + 1}
              </div>
              <span className={`ml-2 text-sm ${
                index <= currentStep ? 'text-purple-600 font-medium' : 'text-gray-500'
              }`}>
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </span>
              {index < sectionNames.length - 1 && (
                <div className="w-8 h-px bg-gray-300 mx-4" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-6">
              {sections[sectionNames[currentStep]]?.map((field) => (
                <FormField
                  key={field.id}
                  field={field}
                  value={formData[field.id]}
                  onChange={(value) => handleFieldChange(field.id, value)}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Validation Errors */}
        {validation && !validation.valid && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <h4 className="text-sm font-medium text-red-800 mb-2">Please fix the following errors:</h4>
            <ul className="text-sm text-red-700 space-y-1">
              {validation.errors.map((error, index) => (
                <li key={index}>• {error.message.en}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>

          <div className="flex space-x-3">
            {currentStep < sectionNames.length - 1 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="px-6 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? 'Creating...' : 'Create Content'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ===============================
// FORM FIELD COMPONENT
// ===============================

interface FormFieldProps {
  field: FormFieldDefinition;
  value: any;
  onChange: (value: any) => void;
}

const FormField: React.FC<FormFieldProps> = ({ field, value, onChange }) => {
  const renderField = () => {
    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder?.en}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required={field.required}
          />
        );

      case 'textarea':
        return (
          <textarea
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder?.en}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-vertical"
            required={field.required}
          />
        );

      case 'localized-text':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">English</label>
              <input
                type="text"
                value={value?.en || ''}
                onChange={(e) => onChange({ ...value, en: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required={field.required}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Russian</label>
              <input
                type="text"
                value={value?.ru || ''}
                onChange={(e) => onChange({ ...value, ru: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required={field.required}
              />
            </div>
          </div>
        );

      case 'select':
        return (
          <select
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required={field.required}
          >
            <option value="">Select an option...</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label.en}
              </option>
            ))}
          </select>
        );

      case 'multi-select':
        return (
          <div className="space-y-2">
            {field.options?.map((option) => (
              <label key={option.value} className="flex items-center">
                <input
                  type="checkbox"
                  checked={(value || []).includes(option.value)}
                  onChange={(e) => {
                    const currentValues = value || [];
                    if (e.target.checked) {
                      onChange([...currentValues, option.value]);
                    } else {
                      onChange(currentValues.filter((v: string) => v !== option.value));
                    }
                  }}
                  className="mr-2 rounded text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700">{option.label.en}</span>
              </label>
            ))}
          </div>
        );

      case 'file':
        return (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) onChange(file);
              }}
              className="hidden"
              id={`file-${field.id}`}
              accept="image/*"
            />
            <label
              htmlFor={`file-${field.id}`}
              className="cursor-pointer"
            >
              <div className="text-gray-400 mb-2">📁</div>
              <p className="text-sm text-gray-600">
                Click to upload or drag and drop
              </p>
            </label>
          </div>
        );

      default:
        return (
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        );
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {field.label.en}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {renderField()}
      {field.helpText && (
        <p className="mt-1 text-xs text-gray-500">{field.helpText.en}</p>
      )}
    </div>
  );
};

// ===============================
// CONTENT MANAGEMENT COMPONENT
// ===============================

const ContentManagement: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Content Management</h2>
      <p className="text-gray-600">Content management interface will be implemented here.</p>
    </div>
  );
};

// ===============================
// CONTENT ANALYTICS COMPONENT
// ===============================

const ContentAnalytics: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Content Analytics</h2>
      <p className="text-gray-600">Content analytics dashboard will be implemented here.</p>
    </div>
  );
};

export default ContentCollectionDashboard; 