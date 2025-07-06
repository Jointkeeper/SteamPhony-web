import { Clock, Calendar, ArrowRight } from 'lucide-react';
import Card from './ui/Card';

export default function ArticleCard({ article, categoryLabel }) {
  return (
    <Card className={`article-card ${article.featured ? 'featured' : ''}`} hover>
      <div className="article-image">
        <img src={article.image} alt="" />
        <div className="image-overlay" />
        {article.featured && <div className="featured-badge">Рекомендуем</div>}
      </div>
      <div className="article-content">
        <div className="article-meta">
          <span className="category-tag">{categoryLabel}</span>
          <div className="meta-right">
            <span className="read-time"><Clock size={14} />{article.readTime} мин</span>
            <span className="publish-date"><Calendar size={14} />{new Date(article.date).toLocaleDateString('ru-RU')}</span>
          </div>
        </div>
        <h3 className="article-title">{article.title}</h3>
        <p className="article-excerpt">{article.excerpt}</p>
        <a href={`#${article.id}`} className="read-more">Читать <ArrowRight size={16} /></a>
      </div>
    </Card>
  );
} 