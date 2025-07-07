# Steamphony Digital Agency Website

Современный веб-сайт для digital-агентства Steamphony, построенный на React и Vite с фокусом на производительность, SEO и конверсию.

## 🚀 Технологический стек

- **Frontend Framework:** React 18.3
- **Build Tool:** Vite 7.0
- **Styling:** Tailwind CSS 4.1 + Custom Design System
- **Animations:** Framer Motion 12.23
- **Routing:** React Router DOM 7.6
- **i18n:** React-i18next (RU/EN)
- **Analytics:** React GA4
- **Testing:** Vitest + React Testing Library

## 🎨 Дизайн-система Steamphony

### Цветовая палитра
- **Deep Purple** (#2E1A47) - премиальность, инновации
- **Bright Purple** (#9966CC) - акценты, интерактивные элементы  
- **Trust Brown** (#8B4513) - основные CTA
- **Action Brown** (#A0522D) - вторичные CTA
- **Warm Peach** (#E7B2A4) - фоны, мягкие акценты
- **Cream** (#F7E7CE) - светлые секции
- **Deep Gray** (#1A1A1A) - тексты
- **Light Gray** (#F5F5F5) - фоны

### Типографика
- **Шрифт:** Inter (700, 900 для заголовков; 400, 500 для текста)
- **Адаптивные размеры** с поддержкой мобильных устройств

## 📁 Структура проекта

```
Steam web/
├── src/
│   ├── pages/          # Страницы сайта
│   │   ├── Home.jsx    # Главная страница
│   │   ├── Services.jsx # Услуги и экспертиза
│   │   ├── Portfolio.jsx # Портфолио и кейсы
│   │   └── Contact.jsx  # Контакты
│   ├── components/      # Переиспользуемые компоненты
│   │   ├── Header/      # Шапка сайта
│   │   ├── Footer.jsx   # Подвал сайта
│   │   └── ContactForm.jsx # Форма обратной связи
│   ├── router/          # Роутинг
│   ├── locales/         # Локализация (RU/EN)
│   ├── utils/           # Утилиты и хелперы
│   └── styles/          # Глобальные стили
├── public/              # Статические файлы
└── vite.config.js       # Конфигурация Vite
```

## 🚀 Быстрый старт

### Установка зависимостей
```bash
npm install
```

### Запуск в режиме разработки
```bash
npm run dev
```
Сайт будет доступен по адресу http://localhost:3001

### Сборка для продакшна
```bash
npm run build
```

### Просмотр production-сборки
```bash
npm run preview
```

### Запуск тестов
```bash
npm run test
```

### Линтинг
```bash
npm run lint
npm run lint:fix
```

## 🌍 Интернационализация

Сайт поддерживает два языка:
- Русский (ru)
- Английский (en)

Автоматическое определение языка происходит на основе:
1. Сохраненных настроек пользователя
2. Языка браузера
3. По умолчанию - английский

## 📈 SEO оптимизация

- Структурированные данные (Schema.org)
- Оптимизированные мета-теги для каждой страницы
- XML sitemap с поддержкой языков
- Правильная настройка robots.txt
- Open Graph теги для социальных сетей

## 🔧 Переменные окружения

Создайте файл `.env` в корне проекта:

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_CAPTCHA_SITE_KEY=
```

## 📦 API интеграция

Проект готов к интеграции с backend API через:
- Форма обратной связи отправляет данные на `/api/contact`
- Поддержка аутентификации через API ключи
- Готовая структура для работы с CMS

## 🚀 Деплой

### Vercel (рекомендуется)
1. Установите Vercel CLI: `npm i -g vercel`
2. Запустите: `vercel`
3. Следуйте инструкциям

### Альтернативные платформы
- Netlify
- Cloudflare Pages
- GitHub Pages (требует настройки для SPA)

## 📊 Производительность

Целевые метрики:
- **LCP:** < 2.5 секунды
- **INP:** < 200ms
- **CLS:** < 0.1
- **PageSpeed Insights:** 90+

## 🤝 Поддержка

Для вопросов и предложений:
- Email: hello@steamphony.com
- Telegram: @steamphony

## 📚 Дополнительная документация

- [🚨 Troubleshooting Guide для Frontend AI Developer](../docs/AI_TROUBLESHOOTING_GUIDE.md)
- [✅ Quality Gates Checklist](../docs/QUALITY_GATES_CHECKLIST.md)
- [📊 Progress Tracking Dashboard](../docs/PROGRESS_TRACKING_DASHBOARD.md)

## 📄 Лицензия

© 2024 Steamphony. Все права защищены.
