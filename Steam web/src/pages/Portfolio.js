import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Helmet } from 'react-helmet-async';
import { PortfolioCard } from '../atoms/PortfolioCard';
import useAnimation from '../hooks/useAnimation';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useEffect, useState } from 'react';
import FilterChip from '../components/ui/FilterChip';
// Static placeholder items – replace with real CMS data later
const _unusedPortfolioItems = [
    {
        id: 1,
        title: 'Gusto Italiano Website',
        category: 'Restaurant',
        image: '/images/portfolio/restaurant1.jpg',
        placeholder: '/images/portfolio/restaurant1_thumb.jpg',
        description: 'Redesign for an authentic Italian restaurant with online ordering.',
        results: ['+35% online orders', '+20% conversion'],
    },
    {
        id: 2,
        title: 'Beauty Bliss Salon Landing',
        category: 'Beauty',
        image: '/images/portfolio/salon1.jpg',
        placeholder: '/images/portfolio/salon1_thumb.jpg',
        description: 'Lead-gen landing page for premium beauty salon in LA.',
        results: ['+48% bookings', 'SEO #1 local search'],
    },
    // ... add more items
];
export default function Portfolio() {
    const { motion } = useAnimation();
    const [projects, setProjects] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(true);
    // MOCK: Используем статические данные, если API не доступен
    useEffect(() => {
        // Здесь можно заменить на реальный fetch, если появится backend
        const staticProjects = [
            {
                id: 1,
                title: 'Gusto Italiano Website',
                category: 'Restaurant',
                color: 'purple',
                result: '+35% online orders',
                client: { industry: 'Ресторан', size: '50 сотрудников', challenges: 'Рост онлайн-заказов' },
                solution: { tech: ['React', 'Vite', 'Tailwind'], strategies: ['Редизайн', 'SEO', 'PWA'] },
                metrics: [
                    { label: 'Конверсия', value: '+20%', trend: 'up' },
                    { label: 'Время загрузки', value: '1.2s', trend: 'down' }
                ],
                image: 'https://placehold.co/600x400?text=Restaurant+Project',
                placeholder: 'https://placehold.co/60x40?text=R',
            },
            {
                id: 2,
                title: 'Beauty Bliss Salon Landing',
                category: 'Beauty',
                color: 'brown',
                result: '+48% bookings',
                client: { industry: 'Салон красоты', size: '20 сотрудников', challenges: 'Заполнение расписания' },
                solution: { tech: ['React', 'Tailwind'], strategies: ['Лендинг', 'SEO', 'Email-маркетинг'] },
                metrics: [
                    { label: 'Бронирования', value: '+48%', trend: 'up' },
                    { label: 'SEO', value: '#1', trend: 'up' }
                ],
                image: 'https://placehold.co/600x400?text=Beauty+Project',
                placeholder: 'https://placehold.co/60x40?text=B',
            },
            {
                id: 3,
                title: 'TechFlow SaaS Launch',
                category: 'Technology',
                color: 'blue',
                result: '+300 qualified leads',
                client: { industry: 'SaaS', size: '15 сотрудников', challenges: 'Лидогенерация B2B' },
                solution: { tech: ['Next.js', 'Chakra UI'], strategies: ['Thought Leadership', 'LinkedIn Ads'] },
                metrics: [
                    { label: 'Leads', value: '+300', trend: 'up' },
                    { label: 'CR', value: '15%', trend: 'up' }
                ],
                image: 'https://placehold.co/600x400?text=Tech+Project',
                placeholder: 'https://placehold.co/60x40?text=T',
            },
            {
                id: 4,
                title: 'ModeFuture E-commerce Revamp',
                category: 'E-commerce',
                color: 'pink',
                result: '+90% conversion rate',
                client: { industry: 'Fashion', size: '10 сотрудников', challenges: 'Низкая конверсия' },
                solution: { tech: ['Shopify', 'Liquid'], strategies: ['CRO', 'Email Retargeting'] },
                metrics: [
                    { label: 'CR', value: '+90%', trend: 'up' },
                    { label: 'Repeat Purchases', value: '+150%', trend: 'up' }
                ],
                image: 'https://placehold.co/600x400?text=Fashion+Project',
                placeholder: 'https://placehold.co/60x40?text=F',
            },
            {
                id: 5,
                title: 'Legal Firm Local SEO',
                category: 'Legal',
                color: 'green',
                result: 'Top-3 local SERP',
                client: { industry: 'Legal', size: '30 сотрудников', challenges: 'Местная конкуренция' },
                solution: { tech: ['WordPress'], strategies: ['Local SEO', 'Reputation'] },
                metrics: [
                    { label: 'Consultations', value: '+200%', trend: 'up' },
                    { label: 'Satisfaction', value: '4.9/5', trend: 'up' }
                ],
                image: 'https://placehold.co/600x400?text=Legal+Project',
                placeholder: 'https://placehold.co/60x40?text=L',
            }
        ];
        const staticCategories = ['Restaurant', 'Beauty', 'Technology', 'E-commerce', 'Legal'];
        setProjects(staticProjects);
        setCategories(staticCategories);
        setLoading(false);
    }, []);
    const filtered = selectedCategory === 'all'
        ? projects
        : projects.filter((p) => p.category === selectedCategory);
    return (_jsxs(_Fragment, { children: [_jsxs(Helmet, { children: [_jsx("title", { children: "\u041F\u043E\u0440\u0442\u0444\u043E\u043B\u0438\u043E \u0438 \u043A\u0435\u0439\u0441\u044B - Steamphony Digital Agency" }), _jsx("meta", { name: "description", content: "\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B \u043D\u0430\u0448\u0435\u0439 \u0440\u0430\u0431\u043E\u0442\u044B: \u043A\u0435\u0439\u0441\u044B \u0441 \u043C\u0435\u0442\u0440\u0438\u043A\u0430\u043C\u0438 \u0438 ROI. \u0412\u0435\u0431-\u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0430, \u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433, digital-\u0442\u0440\u0430\u043D\u0441\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F." })] }), _jsx("section", { className: "bg-gradient-to-br from-purple-deep to-purple-bright text-white py-16 md:py-24", children: _jsx("div", { className: "max-w-7xl mx-auto px-4", children: _jsxs(motion.div, { className: "text-center", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, children: [_jsx("h1", { className: "text-h1-mobile md:text-h1-desktop font-bold mb-4", children: "\u041F\u043E\u0440\u0442\u0444\u043E\u043B\u0438\u043E \u0438 \u043A\u0435\u0439\u0441\u044B" }), _jsx("p", { className: "text-xl md:text-2xl opacity-90 max-w-3xl mx-auto", children: "\u0420\u0435\u0430\u043B\u044C\u043D\u044B\u0435 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B \u0434\u043B\u044F \u0440\u0435\u0430\u043B\u044C\u043D\u044B\u0445 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0439" })] }) }) }), _jsx("section", { className: "bg-white py-8", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 flex flex-wrap gap-2 justify-center", children: [_jsx(FilterChip, { active: selectedCategory === 'all', onClick: () => setSelectedCategory('all'), children: "\u0412\u0441\u0435 \u043F\u0440\u043E\u0435\u043A\u0442\u044B" }), categories.map((cat) => (_jsx(FilterChip, { active: selectedCategory === cat, onClick: () => setSelectedCategory(cat), children: cat }, cat)))] }) }), _jsx("section", { className: "py-16 md:py-24 bg-white", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4", children: [loading && _jsx("p", { children: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u043F\u0440\u043E\u0435\u043A\u0442\u043E\u0432\u2026" }), !loading && filtered.map((caseItem, index) => (_jsx(motion.div, { className: `mb-24 last:mb-0 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`, initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-100px" }, transition: { duration: 0.6 }, children: _jsxs("div", { className: "lg:flex lg:gap-12 lg:items-center", children: [_jsx("div", { className: "lg:w-1/2 mb-8 lg:mb-0", children: _jsxs("div", { className: `h-96 rounded-2xl bg-gradient-to-br ${caseItem.color === 'purple' ? 'from-purple-bright to-purple-deep' :
                                                caseItem.color === 'brown' ? 'from-brown-trust to-brown-action' :
                                                    'from-peach-warm to-cream'} relative overflow-hidden group`, children: [_jsx("div", { className: "absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" }), _jsxs("div", { className: "absolute bottom-8 left-8 text-white", children: [_jsx("h3", { className: "text-2xl font-bold mb-2", children: caseItem.title }), _jsx("p", { className: "text-lg opacity-90", children: caseItem.client.industry })] })] }) }), _jsxs("div", { className: "lg:w-1/2", children: [_jsx(motion.h2, { className: "text-3xl md:text-4xl font-bold mb-6 text-gray-deep", initial: { opacity: 0, x: index % 2 === 1 ? -20 : 20 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { duration: 0.5, delay: 0.2 }, children: caseItem.result }), _jsxs("div", { className: "mb-6", children: [_jsx("h3", { className: "text-xl font-semibold mb-3 text-gray-deep", children: "\u041A\u043E\u043D\u0442\u0435\u043A\u0441\u0442" }), _jsxs("p", { className: "text-gray-600 mb-2", children: [_jsx("span", { className: "font-medium", children: "\u0418\u043D\u0434\u0443\u0441\u0442\u0440\u0438\u044F:" }), " ", caseItem.client.industry] }), _jsxs("p", { className: "text-gray-600 mb-2", children: [_jsx("span", { className: "font-medium", children: "\u0420\u0430\u0437\u043C\u0435\u0440:" }), " ", caseItem.client.size] }), _jsxs("p", { className: "text-gray-600", children: [_jsx("span", { className: "font-medium", children: "\u0412\u044B\u0437\u043E\u0432\u044B:" }), " ", caseItem.client.challenges] })] }), _jsxs("div", { className: "mb-6", children: [_jsx("h3", { className: "text-xl font-semibold mb-3 text-gray-deep", children: "\u0420\u0435\u0448\u0435\u043D\u0438\u0435" }), _jsxs("div", { className: "mb-3", children: [_jsx("p", { className: "text-sm text-gray-500 mb-2", children: "\u0422\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0438:" }), _jsx("div", { className: "flex flex-wrap gap-2", children: caseItem.solution.tech.map((tech) => (_jsx("span", { className: "px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm", children: tech }, tech))) })] }), _jsx("ul", { className: "space-y-2", children: caseItem.solution.strategies.map((strategy, idx) => (_jsxs("li", { className: "flex items-start", children: [_jsx("span", { className: `mr-2 ${caseItem.color === 'purple' ? 'text-purple-bright' :
                                                                        caseItem.color === 'brown' ? 'text-brown-trust' :
                                                                            'text-peach-warm'}`, children: "\u2713" }), _jsx("span", { className: "text-gray-600", children: strategy })] }, idx))) })] }), _jsxs("div", { className: "mb-8", children: [_jsx("h3", { className: "text-xl font-semibold mb-3 text-gray-deep", children: "\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B" }), _jsx("div", { className: "grid grid-cols-2 gap-4", children: caseItem.metrics.map((metric) => (_jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [_jsx("p", { className: "text-sm text-gray-500 mb-1", children: metric.label }), _jsx("p", { className: `text-2xl font-bold ${metric.trend === 'up' ? 'text-green-600' :
                                                                        metric.trend === 'down' ? 'text-red-600' :
                                                                            'text-gray-deep'}`, children: metric.value })] }, metric.label))) })] }), _jsx(Link, { to: "/contact", children: _jsx(Button, { className: `${caseItem.color === 'purple' ? 'bg-purple-bright hover:bg-purple-deep' :
                                                        caseItem.color === 'brown' ? 'bg-brown-trust hover:bg-brown-action' :
                                                            'bg-peach-warm hover:bg-brown-trust'} text-white px-6 py-3 rounded-lg font-medium transition-all`, children: "\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u043F\u043E\u0445\u043E\u0436\u0438\u0435 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B" }) })] })] }) }, caseItem.id)))] }) }), _jsx("section", { className: "py-16 md:py-24 bg-gradient-to-br from-purple-deep to-purple-bright text-white", children: _jsx("div", { className: "max-w-4xl mx-auto px-4 text-center", children: _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 }, children: [_jsx("h2", { className: "text-h2-mobile md:text-h2-desktop font-bold mb-4", children: "\u0413\u043E\u0442\u043E\u0432\u044B \u043A \u0442\u0440\u0430\u043D\u0441\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0438?" }), _jsx("p", { className: "text-xl mb-8 opacity-90", children: "\u0414\u0430\u0432\u0430\u0439\u0442\u0435 \u043E\u0431\u0441\u0443\u0434\u0438\u043C, \u043A\u0430\u043A \u043C\u044B \u043C\u043E\u0436\u0435\u043C \u043F\u043E\u043C\u043E\u0447\u044C \u0432\u0430\u0448\u0435\u043C\u0443 \u0431\u0438\u0437\u043D\u0435\u0441\u0443 \u0440\u0430\u0441\u0442\u0438" }), _jsx(Link, { to: "/contact", children: _jsx(Button, { size: "lg", className: "bg-brown-trust hover:bg-brown-action text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105", children: "\u041D\u0430\u0447\u0430\u0442\u044C \u043F\u0440\u043E\u0435\u043A\u0442" }) }), _jsx("p", { className: "mt-6 text-sm opacity-75", children: "\u0411\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u0430\u044F \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u0446\u0438\u044F \u2022 \u0411\u0435\u0437 \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u0441\u0442\u0432 \u2022 \u041E\u0442\u0432\u0435\u0442 \u0432 \u0442\u0435\u0447\u0435\u043D\u0438\u0435 24 \u0447\u0430\u0441\u043E\u0432" })] }) }) })] }));
}
