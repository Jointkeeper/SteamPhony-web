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

  const SkeletonCard = () => (
    <div className="skeleton-card">
      <div className="skeleton-image"></div>
      <div className="skeleton-content">
        <div className="skeleton-line skeleton-title"></div>
        <div className="skeleton-line skeleton-excerpt"></div>
        <div className="skeleton-line skeleton-excerpt short"></div>
        <div className="skeleton-meta">
          <div className="skeleton-line skeleton-tag"></div>
          <div className="skeleton-line skeleton-date"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="blog-page">
      {/* Hero Section */}
      <section className="blog-hero">
        <div className="hero-background"></div>
        <div className="hero-content">
          <div className="hero-badge">Экспертные инсайты</div>
          <h1 className="hero-title">
            Знания, которые
            <span className="gradient-text"> трансформируют</span> бизнес
          </h1>
          <p className="hero-subtitle">
            Практические стратегии, проверенные кейсы и cross-industry инсайты для роста вашего бизнеса
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="blog-controls">
        <div className="controls-container">
          <div className="search-container">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Найти статью..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filters-container">
            <div className="filter-icon">
              <Filter size={18} />
            </div>
            <div className="filters-scroll">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <FilterChip
                    key={category.id}
                    onClick={() => setActiveFilter(category.id)}
                    active={activeFilter === category.id}
                  >
                    {IconComponent && <IconComponent size={16} />}
                    <span>{category.label}</span>
                    <span className="filter-count">{category.count}</span>
                  </FilterChip>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="articles-section">
        <div className="articles-container">
          {isLoading ? (
            <div className="articles-grid">
              {[...Array(6)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : (
            <div className="articles-grid">
              {filteredArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  categoryLabel={categories.find(cat => cat.id === article.category)?.label}
                />
              ))}
            </div>
          )}
          
          {!isLoading && filteredArticles.length === 0 && (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h3>Статьи не найдены</h3>
              <p>Попробуйте изменить параметры поиска или фильтры</p>
            </div>
          )}
        </div>
      </section>

      <style jsx>{`
        /* ...styles omitted for brevity, see previous message... */
      `}</style>
    </div>
  );
};

export default Blog;
