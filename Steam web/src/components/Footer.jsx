import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function Footer() {
  const { pathname } = useLocation();
  const langPrefix = `/${pathname.split('/')[1]}`;

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'LinkedIn', href: '#', icon: '💼' },
    { name: 'Twitter', href: '#', icon: '🐦' },
    { name: 'Instagram', href: '#', icon: '📷' },
    { name: 'Telegram', href: 'https://t.me/steamphony', icon: '✈️' }
  ];

  const footerLinks = {
    services: [
      { name: 'Веб-разработка', href: `${langPrefix}/services#web` },
      { name: 'Digital-маркетинг', href: `${langPrefix}/services#marketing` },
      { name: 'Комплексные решения', href: `${langPrefix}/services#complex` }
    ],
    company: [
      { name: 'О нас', href: `${langPrefix}/services#team` },
      { name: 'Портфолио', href: `${langPrefix}/work` },
      { name: 'Контакты', href: `${langPrefix}/contact` }
    ]
  };

  return (
    <footer className="bg-gray-deep text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Логотип и описание */}
          <div className="md:col-span-1">
            <Link to={langPrefix + '/'} className="text-2xl font-bold text-white mb-4 inline-block">
              Steamphony
            </Link>
            <p className="text-gray-400 mb-6">
              Архитектура доверия в цифровом пространстве
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  onClick={social.href === '#' ? (e) => e.preventDefault() : undefined}
                  className="w-10 h-10 bg-gray-700 hover:bg-purple-bright rounded-full flex items-center justify-center transition-colors"
                  aria-label={social.name}
                >
                  <span className="text-lg">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Услуги */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Услуги</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-gray-400 hover:text-purple-bright transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Компания */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Компания</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-gray-400 hover:text-purple-bright transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Нижняя часть футера */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Steamphony. Все права защищены.
            </p>
            <div className="flex items-center space-x-6">
              <a 
                href="mailto:hello@steamphony.com" 
                className="text-gray-400 hover:text-purple-bright transition-colors text-sm"
              >
                hello@steamphony.com
              </a>
              <a 
                href="tel:+74951234567" 
                className="text-gray-400 hover:text-purple-bright transition-colors text-sm"
              >
                +7 (495) 123-45-67
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 