import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import { Search, Filter, Clock, Calendar, ArrowRight, TrendingUp, Users, Target, BarChart3 } from 'lucide-react';
import '../styles/blog.css';
import FilterChip from '../components/ui/FilterChip';
import ArticleCard from '../components/ArticleCard';
const Blog = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    // Simulate loading
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);
    const categories = [
        { id: 'all', label: 'Все статьи', count: 24 },
        { id: 'cases', label: 'Кейсы и результаты', count: 8, icon: TrendingUp },
        { id: 'strategy', label: 'Digital-стратегии', count: 6, icon: Target },
        { id: 'guides', label: 'Практические руководства', count: 7, icon: Users },
        { id: 'analytics', label: 'Аналитика рынка', count: 3, icon: BarChart3 }
    ];
    const articles = [
        {
            id: 1,
            title: 'Почему 90% ресторанов ошибаются в Instagram-стратегии',
            excerpt: 'Анализ типичных ошибок и конкретные примеры успешных подходов',
            category: 'cases',
            readTime: 8,
            date: '2024-12-15',
            image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=250&fit=crop&auto=format',
            featured: true
        },
        {
            id: 2,
            title: 'Cross-industry инсайт: Как салоны красоты могут учиться у финтех',
            excerpt: 'Применение UX-принципов финтеха в beauty-индустрии',
            category: 'strategy',
            readTime: 12,
            date: '2024-12-10',
            image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop&auto=format',
            featured: false
        },
        {
            id: 3,
            title: 'Анатомия конверсии: 15-минутный аудит вашего сайта',
            excerpt: 'Пошаговый чек-лист и инструменты для самостоятельного анализа',
            category: 'guides',
            readTime: 15,
            date: '2024-12-08',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop&auto=format',
            featured: false
        },
        {
            id: 4,
            title: 'Психология цвета в digital-маркетинге: данные и практика',
            excerpt: 'Как цветовые решения влияют на конверсии в разных отраслях',
            category: 'analytics',
            readTime: 10,
            date: '2024-12-05',
            image: 'https://images.unsplash.com/photo-1541462608143-67571c6738dd?w=400&h=250&fit=crop&auto=format',
            featured: false
        },
        {
            id: 5,
            title: 'ROI 380% на рекламе фитнес-студии: полный разбор кейса',
            excerpt: 'Детальный анализ успешной рекламной кампании с цифрами и выводами',
            category: 'cases',
            readTime: 18,
            date: '2024-12-02',
            image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop&auto=format',
            featured: true
        },
        {
            id: 6,
            title: 'Автоматизация email-маркетинга: от настройки до масштабирования',
            excerpt: 'Практическое руководство по созданию эффективных email-воронок',
            category: 'guides',
            readTime: 14,
            date: '2024-11-28',
            image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop&auto=format',
            featured: false
        }
    ];
    const filteredArticles = articles.filter(article => {
        const matchesFilter = activeFilter === 'all' || article.category === activeFilter;
        const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });
    const SkeletonCard = () => (_jsxs("div", { className: "skeleton-card", children: [_jsx("div", { className: "skeleton-image" }), _jsxs("div", { className: "skeleton-content", children: [_jsx("div", { className: "skeleton-line skeleton-title" }), _jsx("div", { className: "skeleton-line skeleton-excerpt" }), _jsx("div", { className: "skeleton-line skeleton-excerpt short" }), _jsxs("div", { className: "skeleton-meta", children: [_jsx("div", { className: "skeleton-line skeleton-tag" }), _jsx("div", { className: "skeleton-line skeleton-date" })] })] })] }));
    return (_jsxs("div", { className: "blog-page", children: [_jsxs("section", { className: "blog-hero", children: [_jsx("div", { className: "hero-background" }), _jsxs("div", { className: "hero-content", children: [_jsx("div", { className: "hero-badge", children: "\u042D\u043A\u0441\u043F\u0435\u0440\u0442\u043D\u044B\u0435 \u0438\u043D\u0441\u0430\u0439\u0442\u044B" }), _jsxs("h1", { className: "hero-title", children: ["\u0417\u043D\u0430\u043D\u0438\u044F, \u043A\u043E\u0442\u043E\u0440\u044B\u0435", _jsx("span", { className: "gradient-text", children: " \u0442\u0440\u0430\u043D\u0441\u0444\u043E\u0440\u043C\u0438\u0440\u0443\u044E\u0442" }), " \u0431\u0438\u0437\u043D\u0435\u0441"] }), _jsx("p", { className: "hero-subtitle", children: "\u041F\u0440\u0430\u043A\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u0441\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u0438, \u043F\u0440\u043E\u0432\u0435\u0440\u0435\u043D\u043D\u044B\u0435 \u043A\u0435\u0439\u0441\u044B \u0438 cross-industry \u0438\u043D\u0441\u0430\u0439\u0442\u044B \u0434\u043B\u044F \u0440\u043E\u0441\u0442\u0430 \u0432\u0430\u0448\u0435\u0433\u043E \u0431\u0438\u0437\u043D\u0435\u0441\u0430" })] })] }), _jsx("section", { className: "blog-controls", children: _jsxs("div", { className: "controls-container", children: [_jsxs("div", { className: "search-container", children: [_jsx(Search, { className: "search-icon", size: 20 }), _jsx("input", { type: "text", placeholder: "\u041D\u0430\u0439\u0442\u0438 \u0441\u0442\u0430\u0442\u044C\u044E...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "search-input" })] }), _jsxs("div", { className: "filters-container", children: [_jsx("div", { className: "filter-icon", children: _jsx(Filter, { size: 18 }) }), _jsx("div", { className: "filters-scroll", children: categories.map((category) => {
                                        const IconComponent = category.icon;
                                        return (_jsxs(FilterChip, { onClick: () => setActiveFilter(category.id), active: activeFilter === category.id, children: [IconComponent && _jsx(IconComponent, { size: 16 }), _jsx("span", { children: category.label }), _jsx("span", { className: "filter-count", children: category.count })] }, category.id));
                                    }) })] })] }) }), _jsx("section", { className: "articles-section", children: _jsxs("div", { className: "articles-container", children: [isLoading ? (_jsx("div", { className: "articles-grid", children: [...Array(6)].map((_, i) => (_jsx(SkeletonCard, {}, i))) })) : (_jsx("div", { className: "articles-grid", children: filteredArticles.map((article) => (_jsx(ArticleCard, { article: article, categoryLabel: categories.find(cat => cat.id === article.category)?.label }, article.id))) })), !isLoading && filteredArticles.length === 0 && (_jsxs("div", { className: "no-results", children: [_jsx("div", { className: "no-results-icon", children: "\uD83D\uDD0D" }), _jsx("h3", { children: "\u0421\u0442\u0430\u0442\u044C\u0438 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u044B" }), _jsx("p", { children: "\u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B \u043F\u043E\u0438\u0441\u043A\u0430 \u0438\u043B\u0438 \u0444\u0438\u043B\u044C\u0442\u0440\u044B" })] }))] }) }), _jsx("style", { jsx: true, children: `
        /* ...styles omitted for brevity, see previous message... */
      ` })] }));
};
export default Blog;
