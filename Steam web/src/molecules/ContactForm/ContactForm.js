import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema } from './ContactForm.types';
import { Button } from '@atoms';
import clsx from 'clsx';
import { useNavigation } from '../../contexts';
export const ContactForm = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful }, } = useForm({
        resolver: zodResolver(contactSchema),
        mode: 'onBlur',
    });
    const { lockNavigation, unlockNavigation } = useNavigation();
    const [feedback, setFeedback] = useState(null);
    const onSubmit = async (data) => {
        lockNavigation('contact_form_submit');
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!res.ok) {
                const err = await res.json().catch(() => null);
                throw new Error(err?.error?.message || 'Ошибка отправки формы');
            }
            setFeedback({ type: 'success', message: 'Спасибо! Ваше сообщение отправлено.' });
        }
        catch (error) {
            setFeedback({ type: 'error', message: error.message || 'Ошибка, попробуйте позже' });
        }
        finally {
            unlockNavigation();
        }
    };
    return (_jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "flex flex-col gap-4 max-w-lg mx-auto p-6 rounded-xl bg-white shadow-md dark:bg-[var(--trust-800)]", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium", htmlFor: "name", children: "\u0418\u043C\u044F" }), _jsx("input", { id: "name", className: clsx('mt-1 w-full rounded-md border p-2', {
                            'border-red-500': errors.name,
                            'border-[var(--trust-300)]': !errors.name,
                        }), ...register('name') }), errors.name && _jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.name.message })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium", htmlFor: "email", children: "Email" }), _jsx("input", { id: "email", type: "email", className: clsx('mt-1 w-full rounded-md border p-2', {
                            'border-red-500': errors.email,
                            'border-[var(--trust-300)]': !errors.email,
                        }), ...register('email') }), errors.email && _jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.email.message })] }), _jsxs("div", { className: "hidden md:block transition-all", "data-stage": "extended", children: [_jsx("label", { className: "block text-sm font-medium", htmlFor: "phone", children: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D (\u043E\u043F\u0446\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u043E)" }), _jsx("input", { id: "phone", className: clsx('mt-1 w-full rounded-md border p-2', {
                            'border-red-500': errors.phone,
                            'border-[var(--trust-300)]': !errors.phone,
                        }), ...register('phone') }), errors.phone && _jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.phone.message })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium", htmlFor: "businessType", children: "\u0422\u0438\u043F \u0431\u0438\u0437\u043D\u0435\u0441\u0430" }), _jsxs("select", { id: "businessType", className: "mt-1 w-full rounded-md border p-2", ...register('businessType'), children: [_jsx("option", { value: "restaurant", children: "\u0420\u0435\u0441\u0442\u043E\u0440\u0430\u043D" }), _jsx("option", { value: "salon", children: "\u0421\u0430\u043B\u043E\u043D \u043A\u0440\u0430\u0441\u043E\u0442\u044B" }), _jsx("option", { value: "other", children: "\u0414\u0440\u0443\u0433\u043E\u0435" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium", htmlFor: "message", children: "\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435" }), _jsx("textarea", { id: "message", rows: 4, className: clsx('mt-1 w-full rounded-md border p-2', {
                            'border-red-500': errors.message,
                            'border-[var(--trust-300)]': !errors.message,
                        }), ...register('message') }), errors.message && _jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.message.message })] }), _jsx(Button, { type: "submit", variant: "trust", loading: isSubmitting, disabled: isSubmitting || isSubmitSuccessful, children: isSubmitSuccessful ? 'Отправлено!' : 'Отправить' }), _jsx("div", { "aria-live": "polite", className: "min-h-[24px]", children: feedback && (_jsx("p", { className: feedback.type === 'success'
                        ? 'text-green-600 text-sm mt-2'
                        : 'text-red-600 text-sm mt-2', children: feedback.message })) })] }));
};
export default ContactForm;
