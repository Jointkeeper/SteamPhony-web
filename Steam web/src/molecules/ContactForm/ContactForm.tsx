import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, ContactFormData } from './ContactForm.types';
import { Button } from '@atoms';
import clsx from 'clsx';
import { useNavigation } from '../../contexts';

export const ContactForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
  });

  const { lockNavigation, unlockNavigation } = useNavigation();

  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const onSubmit = async (data: ContactFormData) => {
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
    } catch (error: any) {
      setFeedback({ type: 'error', message: error.message || 'Ошибка, попробуйте позже' });
    } finally {
      unlockNavigation();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 max-w-lg mx-auto p-6 rounded-xl bg-white shadow-md dark:bg-[var(--trust-800)]"
    >
      <div>
        <label className="block text-sm font-medium" htmlFor="name">
          Имя
        </label>
        <input
          id="name"
          className={clsx('mt-1 w-full rounded-md border p-2', {
            'border-red-500': errors.name,
            'border-[var(--trust-300)]': !errors.name,
          })}
          {...register('name')}
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          className={clsx('mt-1 w-full rounded-md border p-2', {
            'border-red-500': errors.email,
            'border-[var(--trust-300)]': !errors.email,
          })}
          {...register('email')}
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>

      <div className="hidden md:block transition-all" data-stage="extended">
        <label className="block text-sm font-medium" htmlFor="phone">
          Телефон (опционально)
        </label>
        <input
          id="phone"
          className={clsx('mt-1 w-full rounded-md border p-2', {
            'border-red-500': errors.phone,
            'border-[var(--trust-300)]': !errors.phone,
          })}
          {...register('phone')}
        />
        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium" htmlFor="businessType">
          Тип бизнеса
        </label>
        <select id="businessType" className="mt-1 w-full rounded-md border p-2" {...register('businessType')}>
          <option value="restaurant">Ресторан</option>
          <option value="salon">Салон красоты</option>
          <option value="other">Другое</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium" htmlFor="message">
          Сообщение
        </label>
        <textarea
          id="message"
          rows={4}
          className={clsx('mt-1 w-full rounded-md border p-2', {
            'border-red-500': errors.message,
            'border-[var(--trust-300)]': !errors.message,
          })}
          {...register('message')}
        />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
      </div>

      <Button type="submit" variant="trust" loading={isSubmitting} disabled={isSubmitting || isSubmitSuccessful}>
        {isSubmitSuccessful ? 'Отправлено!' : 'Отправить'}
      </Button>

      {/* Inline feedback */}
      <div aria-live="polite" className="min-h-[24px]">
        {feedback && (
          <p
            className={
              feedback.type === 'success'
                ? 'text-green-600 text-sm mt-2'
                : 'text-red-600 text-sm mt-2'
            }
          >
            {feedback.message}
          </p>
        )}
      </div>
    </form>
  );
};

export default ContactForm; 