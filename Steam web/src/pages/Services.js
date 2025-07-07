import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Helmet } from 'react-helmet-async';
import useAnimation from '../hooks/useAnimation';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { useState, useEffect } from 'react';
export default function Services() {
    const { motion } = useAnimation();
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch('/api/services')
            .then((r) => r.json())
            .then((json) => setServices(json))
            .catch((e) => console.error('services api error', e))
            .finally(() => setLoading(false));
    }, []);
    const team = [
        {
            name: 'Александр Петров',
            role: 'CEO & Technical Director',
            expertise: 'Full-stack разработка, архитектура систем',
            photo: null // временно, пока нет фото
        },
        {
            name: 'Мария Иванова',
            role: 'Marketing Director',
            expertise: 'Performance-маркетинг, контент-стратегия',
            photo: null
        },
        {
            name: 'Дмитрий Сидоров',
            role: 'Lead Developer',
            expertise: 'React, Next.js, Node.js',
            photo: null
        }
    ];
    const process = [
        {
            title: 'Discovery & Research',
            description: 'Глубокое погружение в ваш бизнес, анализ конкурентов и целевой аудитории'
        },
        {
            title: 'Strategy & Planning',
            description: 'Разработка детальной стратегии с чёткими KPI и дорожной картой'
        },
        {
            title: 'Design & Development',
            description: 'Создание уникального дизайна и разработка с использованием передовых технологий'
        },
        {
            title: 'Launch & Optimization',
            description: 'Запуск проекта и непрерывная оптимизация на основе данных'
        }
    ];
    if (loading) {
        return (_jsx("div", { className: "flex items-center justify-center min-h-screen", children: _jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-purple-bright" }) }));
    }
    return (_jsxs(_Fragment, { children: [_jsxs(Helmet, { children: [_jsx("title", { children: "\u0423\u0441\u043B\u0443\u0433\u0438 \u0438 \u044D\u043A\u0441\u043F\u0435\u0440\u0442\u0438\u0437\u0430 - Steamphony Digital Agency" }), _jsx("meta", { name: "description", content: "\u0412\u0435\u0431-\u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0430, digital-\u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433 \u0438 \u043A\u043E\u043C\u043F\u043B\u0435\u043A\u0441\u043D\u044B\u0435 \u0440\u0435\u0448\u0435\u043D\u0438\u044F \u0434\u043B\u044F \u0440\u043E\u0441\u0442\u0430 \u0432\u0430\u0448\u0435\u0433\u043E \u0431\u0438\u0437\u043D\u0435\u0441\u0430" })] }), _jsx("section", { className: "bg-gradient-to-br from-purple-deep to-purple-bright text-white py-16 md:py-24", children: _jsx("div", { className: "max-w-7xl mx-auto px-4", children: _jsxs(motion.div, { className: "text-center", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, children: [_jsx("h1", { className: "text-h1-mobile md:text-h1-desktop font-bold mb-4", children: "\u0423\u0441\u043B\u0443\u0433\u0438 \u0438 \u044D\u043A\u0441\u043F\u0435\u0440\u0442\u0438\u0437\u0430" }), _jsx("p", { className: "text-xl md:text-2xl opacity-90 max-w-3xl mx-auto", children: "\u041A\u043E\u043C\u043F\u043B\u0435\u043A\u0441\u043D\u044B\u0439 \u043F\u043E\u0434\u0445\u043E\u0434 \u043A \u0440\u0430\u0437\u0432\u0438\u0442\u0438\u044E \u0432\u0430\u0448\u0435\u0433\u043E \u0431\u0438\u0437\u043D\u0435\u0441\u0430 \u0432 digital-\u0441\u0440\u0435\u0434\u0435" })] }) }) }), _jsx("section", { id: "web", className: "py-16 md:py-24 bg-white", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 }, children: [_jsx("h2", { className: "text-h2-mobile md:text-h2-desktop font-bold text-center mb-4 text-gray-deep", children: "\u041D\u0430\u0448\u0438 \u0443\u0441\u043B\u0443\u0433\u0438" }), _jsx("p", { className: "text-center text-gray-600 mb-12 max-w-3xl mx-auto", children: "\u041F\u043E\u043B\u043D\u044B\u0439 \u0441\u043F\u0435\u043A\u0442\u0440 \u0443\u0441\u043B\u0443\u0433 \u0434\u043B\u044F \u0432\u0430\u0448\u0435\u0433\u043E \u0443\u0441\u043F\u0435\u0445\u0430 \u0432 digital" })] }), _jsx("span", { id: "marketing", className: "block -mt-24 pt-24", "aria-hidden": "true" }), _jsx("span", { id: "complex", className: "block -mt-24 pt-24", "aria-hidden": "true" }), _jsx("div", { className: "grid md:grid-cols-3 gap-8", children: services.map((service, index) => (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5, delay: index * 0.1 }, whileHover: { y: -5, transition: { duration: 0.2 } }, children: _jsxs(Card, { className: `p-8 h-full ${service.color === 'purple'
                                        ? 'bg-purple-bright/5 border border-purple-bright/20'
                                        : service.color === 'brown'
                                            ? 'bg-brown-trust/5 border border-brown-trust/20'
                                            : 'bg-peach-warm/10 border border-peach-warm/30'}`, children: [_jsx("div", { className: "text-4xl mb-4", children: service.icon || '✨' }), _jsx("h3", { className: `text-h3-mobile md:text-h3-desktop font-semibold mb-4 ${service.color === 'purple'
                                                ? 'text-purple-deep'
                                                : service.color === 'brown'
                                                    ? 'text-brown-trust'
                                                    : 'text-gray-deep'}`, children: service.title }), _jsx("ul", { className: "space-y-3", children: service.features.map((feature, idx) => (_jsxs("li", { className: "flex items-start", children: [_jsx("span", { className: `mr-2 ${service.color === 'purple'
                                                            ? 'text-purple-bright'
                                                            : service.color === 'brown'
                                                                ? 'text-brown-trust'
                                                                : 'text-peach-warm'}`, children: "\u2713" }), _jsx("span", { className: "text-gray-600", children: feature })] }, idx))) })] }) }, service.title))) })] }) }), _jsx("section", { id: "team", className: "py-16 md:py-24 bg-gray-light", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 }, children: [_jsx("h2", { className: "text-h2-mobile md:text-h2-desktop font-bold text-center mb-4 text-gray-deep", children: "\u041D\u0430\u0448\u0430 \u043A\u043E\u043C\u0430\u043D\u0434\u0430" }), _jsx("p", { className: "text-center text-gray-600 mb-12 max-w-3xl mx-auto", children: "\u042D\u043A\u0441\u043F\u0435\u0440\u0442\u044B \u0441 \u043E\u043F\u044B\u0442\u043E\u043C \u0440\u0430\u0431\u043E\u0442\u044B \u0432 \u0442\u043E\u043F\u043E\u0432\u044B\u0445 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u044F\u0445 \u0438 \u0441\u0442\u0430\u0440\u0442\u0430\u043F\u0430\u0445" })] }), _jsx("div", { className: "grid md:grid-cols-3 gap-8", children: team.map((member, index) => (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5, delay: index * 0.1 }, children: _jsxs(Card, { className: "p-8 text-center", children: [_jsx("div", { className: "w-32 h-32 bg-gradient-to-br from-purple-bright to-purple-deep rounded-full mx-auto mb-6" }), _jsx("h3", { className: "text-xl font-semibold mb-2 text-gray-deep", children: member.name }), _jsx("p", { className: "text-purple-bright font-medium mb-2", children: member.role }), _jsx("p", { className: "text-gray-600 text-sm", children: member.expertise })] }) }, member.name))) })] }) }), _jsx("section", { className: "py-16 md:py-24 bg-white", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 }, children: [_jsx("h2", { className: "text-h2-mobile md:text-h2-desktop font-bold text-center mb-4 text-gray-deep", children: "\u041C\u0435\u0442\u043E\u0434\u043E\u043B\u043E\u0433\u0438\u044F Steamphony" }), _jsx("p", { className: "text-center text-gray-600 mb-12 max-w-3xl mx-auto", children: "Data-driven \u043F\u043E\u0434\u0445\u043E\u0434 \u0441 \u0444\u043E\u043A\u0443\u0441\u043E\u043C \u043D\u0430 \u0438\u0437\u043C\u0435\u0440\u0438\u043C\u044B\u0435 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B" })] }), _jsx("div", { className: "max-w-4xl mx-auto", children: process.map((step, index) => (_jsxs(motion.div, { className: "flex items-start mb-8 last:mb-0", initial: { opacity: 0, x: -20 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { duration: 0.5, delay: index * 0.1 }, children: [_jsx("div", { className: "flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-bright to-purple-deep text-white rounded-full flex items-center justify-center font-bold mr-6", children: index + 1 }), _jsxs("div", { children: [_jsx("h3", { className: "text-xl font-semibold mb-2 text-gray-deep", children: step.title }), _jsx("p", { className: "text-gray-600", children: step.description })] })] }, step.title))) }), _jsx(motion.div, { className: "text-center mt-12", initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6, delay: 0.4 }, children: _jsx(Link, { to: "/contact", children: _jsx(Button, { size: "lg", className: "bg-brown-trust hover:bg-brown-action text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105", children: "\u041D\u0430\u0447\u0430\u0442\u044C \u043F\u0440\u043E\u0435\u043A\u0442" }) }) })] }) }), _jsx("section", { className: "py-16 md:py-24 bg-gradient-to-br from-purple-deep to-purple-bright text-white", children: _jsx("div", { className: "max-w-4xl mx-auto px-4 text-center", children: _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 }, children: [_jsx("h2", { className: "text-h2-mobile md:text-h2-desktop font-bold mb-4", children: "\u0420\u0430\u0431\u043E\u0442\u0430\u0435\u043C \u043D\u0430 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442" }), _jsx("p", { className: "text-xl mb-8 opacity-90", children: "\u0413\u0430\u0440\u0430\u043D\u0442\u0438\u0440\u0443\u0435\u043C \u0434\u043E\u0441\u0442\u0438\u0436\u0435\u043D\u0438\u0435 KPI \u0438\u043B\u0438 \u0432\u043E\u0437\u0432\u0440\u0430\u0449\u0430\u0435\u043C \u0434\u0435\u043D\u044C\u0433\u0438" }), _jsxs("div", { className: "grid md:grid-cols-3 gap-6 text-center", children: [_jsxs("div", { children: [_jsx("p", { className: "text-4xl font-bold mb-2", children: "100%" }), _jsx("p", { className: "opacity-80", children: "\u041F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u043E\u0441\u0442\u044C \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u043E\u0432" })] }), _jsxs("div", { children: [_jsx("p", { className: "text-4xl font-bold mb-2", children: "24/7" }), _jsx("p", { className: "opacity-80", children: "\u041F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0430 \u043F\u0440\u043E\u0435\u043A\u0442\u043E\u0432" })] }), _jsxs("div", { children: [_jsx("p", { className: "text-4xl font-bold mb-2", children: "ROI" }), _jsx("p", { className: "opacity-80", children: "\u0424\u043E\u043A\u0443\u0441 \u043D\u0430 \u0432\u043E\u0437\u0432\u0440\u0430\u0442\u0435 \u0438\u043D\u0432\u0435\u0441\u0442\u0438\u0446\u0438\u0439" })] })] })] }) }) })] }));
}
