import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { testimonials } from '../data/testimonialsData';
import { useAutoPlay } from '../hooks/useAutoPlay';
import { StarRating } from '../atoms';
import { OptimizedImage } from './ui/OptimizedImage';

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

export const TestimonialsSection: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideTo = useCallback(
    (newIndex: number) => {
      const dir = newIndex > index ? 1 : -1;
      setDirection(dir);
      setIndex((newIndex + testimonials.length) % testimonials.length);
    },
    [index],
  );

  const { pause, resume } = useAutoPlay(() => slideTo((index + 1) % testimonials.length), 5000);

  const prev = () => slideTo(index - 1);
  const next = () => slideTo(index + 1);

  const current = testimonials[index];

  return (
    <section
      className="relative py-16 bg-gradient-to-b from-[var(--trust-50)] to-white overflow-hidden"
    >
      <div className="container mx-auto px-4 max-w-5xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">Что говорят клиенты</h2>

        <div
          className="relative"
          onMouseEnter={pause}
          onMouseLeave={resume}
        >
          <AnimatePresence custom={direction} initial={false}>
            <motion.div
              key={current.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5 }}
              className="mx-auto flex flex-col items-center max-w-xl"
            >
              <OptimizedImage
                src={current.avatar}
                alt={current.name}
                className="w-20 h-20 rounded-full mb-4 object-cover"
              />
              <StarRating rating={current.rating} className="mb-2" />
              <p className="text-lg md:text-xl text-gray-700 italic mb-6">“{current.text}”</p>
              <div className="text-gray-900 font-medium">{current.name}</div>
              <div className="text-sm text-gray-500 mb-2">{current.project}</div>
              <div className="text-sm text-green-600 font-semibold">{current.results}</div>
            </motion.div>
          </AnimatePresence>

          {/* Arrows */}
          <button
            className={clsx(
              'absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-md text-gray-600 hover:bg-gray-100 transition',
            )}
            onClick={prev}
            aria-label="Предыдущий отзыв"
          >
            ❮
          </button>
          <button
            className={clsx(
              'absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-md text-gray-600 hover:bg-gray-100 transition',
            )}
            onClick={next}
            aria-label="Следующий отзыв"
          >
            ❯
          </button>
        </div>

        {/* Dots */}
        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              className={clsx(
                'w-3 h-3 rounded-full transition',
                i === index ? 'bg-[var(--trust-600)]' : 'bg-[var(--trust-200)]',
              )}
              aria-label={`Отзыв ${i + 1}`}
              onClick={() => slideTo(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 