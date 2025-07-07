import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './ui/Button';
import Input from './ui/Input';
import Select from './ui/Select';
import Textarea from './ui/Textarea';
import toast from 'react-hot-toast';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
const CAPTCHA_SITE_KEY = import.meta.env.VITE_CAPTCHA_SITE_KEY;
const ContactForm = ({ title, subtitle, size = 'default' }) => {
    const { t, i18n } = useTranslation(['forms', 'common']);
    const langPrefix = `/${i18n.language.split('-')[0]}`;
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        budget: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    // Load reCAPTCHA v3 script once if key provided
    useEffect(() => {
        if (!CAPTCHA_SITE_KEY)
            return;
        if (document.getElementById('recaptcha-v3-script'))
            return;
        const script = document.createElement('script');
        script.id = 'recaptcha-v3-script';
        script.src = `https://www.google.com/recaptcha/api.js?render=${CAPTCHA_SITE_KEY}`;
        script.async = true;
        document.body.appendChild(script);
    }, []);
    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) {
            newErrors.name = t('forms:validation.required');
        }
        else if (formData.name.trim().length < 2) {
            newErrors.name = t('forms:validation.minLength', { count: 2 });
        }
        if (!formData.email.trim()) {
            newErrors.email = t('forms:validation.required');
        }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = t('forms:validation.email');
        }
        if (formData.phone && !/^\+?\d{0,15}$/.test(formData.phone.replace(/\s/g, ''))) {
            newErrors.phone = t('forms:validation.phone');
        }
        if (!formData.message.trim()) {
            newErrors.message = t('forms:validation.required');
        }
        else if (formData.message.trim().length < 10) {
            newErrors.message = t('forms:validation.minLength', { count: 10 });
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleChange = (field) => (e) => {
        const value = e.target.value;
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm())
            return;
        setIsSubmitting(true);
        try {
            let captchaToken = 'test';
            if (CAPTCHA_SITE_KEY && window.grecaptcha && window.grecaptcha.execute) {
                try {
                    captchaToken = await window.grecaptcha.execute(CAPTCHA_SITE_KEY, { action: 'contact_form' });
                }
                catch (err) {
                    console.warn('reCAPTCHA execute error', err);
                }
            }
            const submissionData = {
                ...formData,
                language: i18n.language,
                timestamp: new Date().toISOString(),
                source: 'website_contact_form',
                captchaToken,
            };
            const response = await fetch(`${API_BASE_URL}/api/contact/main`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submissionData),
            });
            if (response.ok) {
                toast.success(t('forms:contact.success.title', 'Спасибо за ваше сообщение!'));
                setSubmitted(true);
                if (window.gtag) {
                    window.gtag('event', 'form_submission', {
                        event_category: 'lead_generation',
                        event_label: 'contact_form',
                        language: i18n.language,
                        service_type: formData.service || 'unknown',
                        budget: formData.budget || 'unknown'
                    });
                }
                setFormData({ name: '', email: '', phone: '', service: '', budget: '', message: '' });
                setTimeout(() => setSubmitted(false), 5000);
            }
            else {
                throw new Error('Form submission failed');
            }
        }
        catch (error) {
            console.error('Form submission error:', error);
            toast.error(t('common:status.error'));
        }
        finally {
            setIsSubmitting(false);
        }
    };
    return (_jsx(AnimatePresence, { mode: "wait", children: submitted ? (_jsxs(motion.div, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.95 }, transition: { duration: 0.4, ease: 'easeOut' }, className: "bg-gradient-to-br from-purple-bright/10 to-purple-deep/10 border border-purple-bright/30 rounded-2xl p-8 text-center", children: [_jsx("div", { className: "flex justify-center mb-4", children: _jsx("div", { className: "w-16 h-16 bg-gradient-to-br from-purple-bright to-purple-deep rounded-full flex items-center justify-center", children: _jsx("svg", { className: "w-8 h-8 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }) }) }), _jsx("h3", { className: "text-xl font-bold text-gray-deep mb-2", children: t('forms:contact.success.title', 'Спасибо за ваше сообщение!') }), _jsx("p", { className: "text-gray-600", children: t('forms:contact.success.message', 'Мы свяжемся с вами в течение 24 часов') })] }, "success")) : (_jsx(motion.div, { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -12 }, transition: { duration: 0.35, ease: 'easeOut' }, children: _jsxs("div", { className: `bg-white ${size === 'compact' ? 'p-6' : 'p-8'} rounded-2xl ${size === 'default' ? 'shadow-xl' : ''}`, children: [(title || subtitle) && (_jsxs("div", { className: "text-center mb-8", children: [_jsx("h2", { className: `font-bold text-gray-deep mb-3 ${size === 'compact' ? 'text-2xl' : 'text-3xl'}`, children: title || t('forms:contact.title', 'Начните свой проект') }), subtitle && (_jsx("p", { className: "text-gray-600", children: subtitle || t('forms:contact.subtitle', 'Расскажите о ваших целях') }))] })), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [_jsxs("div", { className: "grid md:grid-cols-2 gap-5", children: [_jsx(Input, { id: "name", type: "text", label: t('forms:contact.fields.name.label', 'Ваше имя'), placeholder: t('forms:contact.fields.name.placeholder', 'Иван Иванов'), value: formData.name, onChange: handleChange('name'), error: errors.name, required: true, autoComplete: "name", className: "focus:border-purple-bright" }), _jsx(Input, { id: "email", type: "email", label: t('forms:contact.fields.email.label', 'Email'), placeholder: t('forms:contact.fields.email.placeholder', 'ivan@company.com'), value: formData.email, onChange: handleChange('email'), error: errors.email, required: true, autoComplete: "email", className: "focus:border-purple-bright" })] }), _jsxs("div", { className: "grid md:grid-cols-2 gap-5", children: [_jsx(Input, { id: "phone", type: "tel", label: t('forms:contact.fields.phone.label', 'Телефон'), placeholder: t('forms:contact.fields.phone.placeholder', '+7 (999) 123-45-67'), value: formData.phone, onChange: handleChange('phone'), error: errors.phone, autoComplete: "tel", className: "focus:border-purple-bright" }), _jsx(Select, { id: "service", label: t('contact.main_form.service_label'), value: formData.service, onChange: handleChange('service'), options: [
                                            { value: '', label: t('contact.main_form.service_placeholder') },
                                            { value: 'consultation', label: t('cta.get_consultation') },
                                            { value: 'web-development', label: t('portfolio.filter_web') },
                                            { value: 'advertising', label: t('portfolio.filter_advertising') },
                                            { value: 'content', label: t('portfolio.filter_content') },
                                            { value: 'complex', label: 'Комплекс' }
                                        ], required: true })] }), _jsx(Select, { id: "budget", label: t('contact.main_form.budget_label'), value: formData.budget, onChange: handleChange('budget'), options: Object.entries(t('budget_options', { returnObjects: true })).map(([k, v]) => ({ value: k, label: v })) }), _jsx(Textarea, { id: "message", label: t('forms:contact.fields.message.label', 'Расскажите о проекте'), placeholder: t('forms:contact.fields.message.placeholder', 'Опишите ваши цели, текущие вызовы и ожидаемые результаты...'), value: formData.message, onChange: handleChange('message'), error: errors.message, rows: 5, required: true, className: "focus:border-purple-bright" }), _jsx(Button, { type: "submit", size: size === 'compact' ? 'md' : 'lg', loading: isSubmitting, disabled: isSubmitting, className: "w-full bg-brown-trust hover:bg-brown-action text-white font-semibold transition-all transform hover:scale-105", children: isSubmitting ? t('common:status.processing', 'Отправка...') : t('forms:contact.submit', 'Отправить заявку') }), _jsxs("p", { className: "text-xs text-gray-500 text-center mt-4", children: ["\u041D\u0430\u0436\u0438\u043C\u0430\u044F \u043A\u043D\u043E\u043F\u043A\u0443, \u0432\u044B \u0441\u043E\u0433\u043B\u0430\u0448\u0430\u0435\u0442\u0435\u0441\u044C \u0441", ' ', _jsx("a", { href: `${langPrefix}/about#privacy`, className: "text-purple-bright hover:text-purple-deep underline", children: "\u043F\u043E\u043B\u0438\u0442\u0438\u043A\u043E\u0439 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438" })] })] })] }) }, "form")) }));
};
export default ContactForm;
