import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import PortfolioCard from '../atoms/PortfolioCard';
import useAnimation from '../hooks/useAnimation';

// Static placeholder items – replace with real CMS data later
const portfolioItems = [
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
  const { t } = useTranslation(['common']);
  const { motion } = useAnimation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <div className="container mx-auto py-16 px-4">
      <Helmet>
        <title>Portfolio – Steamphony</title>
        <meta name="description" content="Our recent work and case studies." />
      </Helmet>

      <h1 className="text-3xl font-bold text-center mb-10">{t('common:portfolioTitle', 'Our Work')}</h1>

      <motion.div
        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {portfolioItems.map((item) => (
          <motion.div key={item.id} variants={cardVariants}>
            <PortfolioCard {...item} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
} 