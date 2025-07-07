import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Content Collection Tools
 * User-friendly interfaces for stakeholders to input and manage content
 */
import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { contentManager } from '../utils/contentManager';
// ===============================
// MAIN CONTENT COLLECTION DASHBOARD
// ===============================
export const ContentCollectionDashboard = () => {
    const [activeSection, setActiveSection] = useState('overview');
    const [selectedContentType, setSelectedContentType] = useState('');
    const contentTypes = [
        { id: 'portfolio', name: 'Portfolio Project', icon: '📊', description: 'Add a new case study or project' },
        { id: 'team-member', name: 'Team Member', icon: '👤', description: 'Add a team member profile' },
        { id: 'testimonial', name: 'Testimonial', icon: '💬', description: 'Add client feedback' },
        { id: 'blog-post', name: 'Blog Post', icon: '📝', description: 'Create a new blog article' },
        { id: 'service', name: 'Service', icon: '🛠️', description: 'Add or edit a service offering' },
    ];
    return (_jsxs("div", { className: "min-h-screen bg-gray-50", children: [_jsx("header", { className: "bg-white shadow-sm border-b", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 py-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "Content Management" }), _jsx("p", { className: "text-gray-600", children: "Manage all website content in one place" })] }), _jsx("div", { className: "flex space-x-2", children: ['overview', 'create', 'manage', 'analytics'].map((section) => (_jsx("button", { onClick: () => setActiveSection(section), className: `px-4 py-2 rounded-lg font-medium transition-colors ${activeSection === section
                                        ? 'bg-purple-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`, children: section.charAt(0).toUpperCase() + section.slice(1) }, section))) })] }) }) }), _jsx("main", { className: "max-w-7xl mx-auto px-4 py-8", children: _jsxs(AnimatePresence, { mode: "wait", children: [activeSection === 'overview' && (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, transition: { duration: 0.3 }, children: _jsx(ContentOverview, {}) }, "overview")), activeSection === 'create' && (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, transition: { duration: 0.3 }, children: [_jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: contentTypes.map((type) => (_jsxs(motion.div, { className: "bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer", whileHover: { scale: 1.02 }, onClick: () => setSelectedContentType(type.id), children: [_jsx("div", { className: "text-3xl mb-3", children: type.icon }), _jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-2", children: type.name }), _jsx("p", { className: "text-gray-600 text-sm", children: type.description })] }, type.id))) }), selectedContentType && (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "mt-8", children: _jsx(ContentCreationForm, { contentType: selectedContentType, onClose: () => setSelectedContentType('') }) }))] }, "create")), activeSection === 'manage' && (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, transition: { duration: 0.3 }, children: _jsx(ContentManagement, {}) }, "manage")), activeSection === 'analytics' && (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, transition: { duration: 0.3 }, children: _jsx(ContentAnalytics, {}) }, "analytics"))] }) })] }));
};
// ===============================
// CONTENT OVERVIEW COMPONENT
// ===============================
const ContentOverview = () => {
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
    return (_jsxs("div", { className: "space-y-8", children: [_jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-6", children: stats.map((stat, index) => (_jsx(motion.div, { className: "bg-white rounded-lg p-6 shadow-sm border border-gray-200", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.3, delay: index * 0.1 }, children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-600", children: stat.label }), _jsx("p", { className: "text-2xl font-bold text-gray-900", children: stat.value })] }), _jsx("div", { className: `text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`, children: stat.change })] }) }, stat.label))) }), _jsxs("div", { className: "bg-white rounded-lg shadow-sm border border-gray-200", children: [_jsx("div", { className: "p-6 border-b border-gray-200", children: _jsx("h2", { className: "text-lg font-semibold text-gray-900", children: "Recent Activity" }) }), _jsx("div", { className: "divide-y divide-gray-200", children: recentActivity.map((activity, index) => (_jsxs("div", { className: "p-6 flex items-center justify-between", children: [_jsxs("div", { children: [_jsxs("p", { className: "text-sm text-gray-900", children: [_jsx("span", { className: "font-medium", children: activity.user }), " ", activity.action.toLowerCase(), ' ', _jsx("span", { className: "font-medium", children: activity.item })] }), _jsx("p", { className: "text-xs text-gray-500", children: activity.time })] }), _jsx("span", { className: `px-2 py-1 text-xs rounded-full ${activity.action === 'Published' ? 'bg-green-100 text-green-800' :
                                        activity.action === 'Created' ? 'bg-blue-100 text-blue-800' :
                                            activity.action === 'Updated' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-purple-100 text-purple-800'}`, children: activity.action })] }, index))) })] })] }));
};
const ContentCreationForm = ({ contentType, onClose }) => {
    const [formData, setFormData] = useState({});
    const [currentStep, setCurrentStep] = useState(0);
    const [validation, setValidation] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const form = contentManager.getForm(contentType);
    if (!form)
        return null;
    // Group fields by section
    const sections = form.fields.reduce((acc, field) => {
        if (!acc[field.section])
            acc[field.section] = [];
        acc[field.section].push(field);
        return acc;
    }, {});
    const sectionNames = Object.keys(sections);
    const handleFieldChange = useCallback((fieldId, value) => {
        setFormData(prev => ({ ...prev, [fieldId]: value }));
    }, []);
    const validateForm = useCallback(() => {
        try {
            const content = contentManager.createContent(contentType, formData);
            setValidation({ valid: true, errors: [], warnings: [] });
            return true;
        }
        catch (error) {
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
        if (!validateForm())
            return;
        setIsSubmitting(true);
        try {
            const content = contentManager.createContent(contentType, formData);
            // Here you would save to your backend/database
            console.log('Created content:', content);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            alert('Content created successfully!');
            onClose();
        }
        catch (error) {
            alert('Error creating content: ' + error.message);
        }
        finally {
            setIsSubmitting(false);
        }
    };
    return (_jsxs("div", { className: "bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden", children: [_jsxs("div", { className: "px-6 py-4 border-b border-gray-200 flex items-center justify-between", children: [_jsxs("h2", { className: "text-xl font-semibold text-gray-900", children: ["Create ", form.type.charAt(0).toUpperCase() + form.type.slice(1).replace('-', ' ')] }), _jsx("button", { onClick: onClose, className: "text-gray-400 hover:text-gray-600 transition-colors", children: "\u2715" })] }), _jsx("div", { className: "px-6 py-4 bg-gray-50 border-b border-gray-200", children: _jsx("div", { className: "flex items-center space-x-4", children: sectionNames.map((section, index) => (_jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: `w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${index <= currentStep
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-gray-200 text-gray-600'}`, children: index + 1 }), _jsx("span", { className: `ml-2 text-sm ${index <= currentStep ? 'text-purple-600 font-medium' : 'text-gray-500'}`, children: section.charAt(0).toUpperCase() + section.slice(1) }), index < sectionNames.length - 1 && (_jsx("div", { className: "w-8 h-px bg-gray-300 mx-4" }))] }, section))) }) }), _jsxs("div", { className: "p-6", children: [_jsx(AnimatePresence, { mode: "wait", children: _jsx(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 }, transition: { duration: 0.3 }, children: _jsx("div", { className: "space-y-6", children: sections[sectionNames[currentStep]]?.map((field) => (_jsx(FormField, { field: field, value: formData[field.id], onChange: (value) => handleFieldChange(field.id, value) }, field.id))) }) }, currentStep) }), validation && !validation.valid && (_jsxs("div", { className: "mt-6 p-4 bg-red-50 border border-red-200 rounded-lg", children: [_jsx("h4", { className: "text-sm font-medium text-red-800 mb-2", children: "Please fix the following errors:" }), _jsx("ul", { className: "text-sm text-red-700 space-y-1", children: validation.errors.map((error, index) => (_jsxs("li", { children: ["\u2022 ", error.message.en] }, index))) })] })), _jsxs("div", { className: "mt-8 flex items-center justify-between", children: [_jsx("button", { onClick: () => setCurrentStep(Math.max(0, currentStep - 1)), disabled: currentStep === 0, className: "px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors", children: "Previous" }), _jsx("div", { className: "flex space-x-3", children: currentStep < sectionNames.length - 1 ? (_jsx("button", { onClick: () => setCurrentStep(currentStep + 1), className: "px-6 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors", children: "Next" })) : (_jsx("button", { onClick: handleSubmit, disabled: isSubmitting, className: "px-6 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors", children: isSubmitting ? 'Creating...' : 'Create Content' })) })] })] })] }));
};
const FormField = ({ field, value, onChange }) => {
    const renderField = () => {
        switch (field.type) {
            case 'text':
                return (_jsx("input", { type: "text", value: value || '', onChange: (e) => onChange(e.target.value), placeholder: field.placeholder?.en, className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent", required: field.required }));
            case 'textarea':
                return (_jsx("textarea", { value: value || '', onChange: (e) => onChange(e.target.value), placeholder: field.placeholder?.en, rows: 4, className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-vertical", required: field.required }));
            case 'localized-text':
                return (_jsxs("div", { className: "space-y-3", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "English" }), _jsx("input", { type: "text", value: value?.en || '', onChange: (e) => onChange({ ...value, en: e.target.value }), className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent", required: field.required })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Russian" }), _jsx("input", { type: "text", value: value?.ru || '', onChange: (e) => onChange({ ...value, ru: e.target.value }), className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent", required: field.required })] })] }));
            case 'select':
                return (_jsxs("select", { value: value || '', onChange: (e) => onChange(e.target.value), className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent", required: field.required, children: [_jsx("option", { value: "", children: "Select an option..." }), field.options?.map((option) => (_jsx("option", { value: option.value, children: option.label.en }, option.value)))] }));
            case 'multi-select':
                return (_jsx("div", { className: "space-y-2", children: field.options?.map((option) => (_jsxs("label", { className: "flex items-center", children: [_jsx("input", { type: "checkbox", checked: (value || []).includes(option.value), onChange: (e) => {
                                    const currentValues = value || [];
                                    if (e.target.checked) {
                                        onChange([...currentValues, option.value]);
                                    }
                                    else {
                                        onChange(currentValues.filter((v) => v !== option.value));
                                    }
                                }, className: "mr-2 rounded text-purple-600 focus:ring-purple-500" }), _jsx("span", { className: "text-sm text-gray-700", children: option.label.en })] }, option.value))) }));
            case 'file':
                return (_jsxs("div", { className: "border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors", children: [_jsx("input", { type: "file", onChange: (e) => {
                                const file = e.target.files?.[0];
                                if (file)
                                    onChange(file);
                            }, className: "hidden", id: `file-${field.id}`, accept: "image/*" }), _jsxs("label", { htmlFor: `file-${field.id}`, className: "cursor-pointer", children: [_jsx("div", { className: "text-gray-400 mb-2", children: "\uD83D\uDCC1" }), _jsx("p", { className: "text-sm text-gray-600", children: "Click to upload or drag and drop" })] })] }));
            default:
                return (_jsx("input", { type: "text", value: value || '', onChange: (e) => onChange(e.target.value), className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" }));
        }
    };
    return (_jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: [field.label.en, field.required && _jsx("span", { className: "text-red-500 ml-1", children: "*" })] }), renderField(), field.helpText && (_jsx("p", { className: "mt-1 text-xs text-gray-500", children: field.helpText.en }))] }));
};
// ===============================
// CONTENT MANAGEMENT COMPONENT
// ===============================
const ContentManagement = () => {
    return (_jsxs("div", { className: "bg-white rounded-lg shadow-sm border border-gray-200 p-6", children: [_jsx("h2", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Content Management" }), _jsx("p", { className: "text-gray-600", children: "Content management interface will be implemented here." })] }));
};
// ===============================
// CONTENT ANALYTICS COMPONENT
// ===============================
const ContentAnalytics = () => {
    return (_jsxs("div", { className: "bg-white rounded-lg shadow-sm border border-gray-200 p-6", children: [_jsx("h2", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Content Analytics" }), _jsx("p", { className: "text-gray-600", children: "Content analytics dashboard will be implemented here." })] }));
};
export default ContentCollectionDashboard;
