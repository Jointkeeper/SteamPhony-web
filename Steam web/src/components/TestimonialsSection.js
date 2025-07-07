import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { testimonials } from '../data/testimonialsData';
import { useAutoPlay } from '../hooks/useAutoPlay';
import { StarRating } from '../atoms';
const slideVariants = {
    enter: (direction) => ({
        x: direction > 0 ? 300 : -300,
        opacity: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
    },
    exit: (direction) => ({
        x: direction > 0 ? -300 : 300,
        opacity: 0,
    }),
};
export const TestimonialsSection = () => {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const slideTo = useCallback((newIndex) => {
        const dir = newIndex > index ? 1 : -1;
        setDirection(dir);
        setIndex((newIndex + testimonials.length) % testimonials.length);
    }, [index]);
    const { pause, resume } = useAutoPlay(() => slideTo((index + 1) % testimonials.length), 5000);
    const prev = () => slideTo(index - 1);
    const next = () => slideTo(index + 1);
    const current = testimonials[index];
    return (_jsx("section", { className: "relative py-16 bg-gradient-to-b from-[var(--trust-50)] to-white overflow-hidden", children: _jsxs("div", { className: "container mx-auto px-4 max-w-5xl text-center", children: [_jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-10", children: "\u0427\u0442\u043E \u0433\u043E\u0432\u043E\u0440\u044F\u0442 \u043A\u043B\u0438\u0435\u043D\u0442\u044B" }), _jsxs("div", { className: "relative", onMouseEnter: pause, onMouseLeave: resume, children: [_jsx(AnimatePresence, { custom: direction, initial: false, children: _jsxs(motion.div, { custom: direction, variants: slideVariants, initial: "enter", animate: "center", exit: "exit", transition: { duration: 0.5 }, className: "mx-auto flex flex-col items-center max-w-xl", children: [_jsx("img", { src: current.avatar, alt: current.name, className: "w-20 h-20 rounded-full mb-4 object-cover" }), _jsx(StarRating, { rating: current.rating, className: "mb-2" }), _jsxs("p", { className: "text-lg md:text-xl text-gray-700 italic mb-6", children: ["\u201C", current.text, "\u201D"] }), _jsx("div", { className: "text-gray-900 font-medium", children: current.name }), _jsx("div", { className: "text-sm text-gray-500 mb-2", children: current.project }), _jsx("div", { className: "text-sm text-green-600 font-semibold", children: current.results })] }, current.id) }), _jsx("button", { className: clsx('absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-md text-gray-600 hover:bg-gray-100 transition'), onClick: prev, "aria-label": "\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0439 \u043E\u0442\u0437\u044B\u0432", children: "\u276E" }), _jsx("button", { className: clsx('absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-md text-gray-600 hover:bg-gray-100 transition'), onClick: next, "aria-label": "\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439 \u043E\u0442\u0437\u044B\u0432", children: "\u276F" })] }), _jsx("div", { className: "mt-8 flex justify-center gap-2", children: testimonials.map((t, i) => (_jsx("button", { className: clsx('w-3 h-3 rounded-full transition', i === index ? 'bg-[var(--trust-600)]' : 'bg-[var(--trust-200)]'), "aria-label": `Отзыв ${i + 1}`, onClick: () => slideTo(i) }, t.id))) })] }) }));
};
export default TestimonialsSection;
