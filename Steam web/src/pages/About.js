import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Card from '../components/ui/Card';
export default function About() {
    const { t } = useTranslation(['common']);
    const philosophy = [
        {
            title: 'Progressive disclosure',
            text: 'Информация раскрывается слоями — от общего к частному, снижая когнитивную нагрузку.'
        },
        {
            title: 'Психологическое воздействие',
            text: 'Используем паттерны поведения для увеличения конверсии и доверия.'
        },
        {
            title: 'Cross-industry мудрость',
            text: 'Забираем лучшие практики из 10+ отраслей и применяем к вашему проекту.'
        },
        {
            title: 'Премиальность без высокомерия',
            text: 'Баланс между статусностью и доступностью в каждом пикселе.'
        }
    ];
    // Правовая информация, перенесённая из отдельных страниц
    const legalSections = [
        {
            id: 'privacy',
            title: 'Политика конфиденциальности',
            content: [
                'Мы уважаем ваше право на конфиденциальность и собираем лишь минимальный объём персональных данных, необходимый для обработки обращений и улучшения сервиса.',
                'Данные хранятся на защищённых серверах в ЕС, доступны только уполномоченным сотрудникам и никогда не продаются третьим лицам.',
                'Вы можете запросить удаление или экспорт своих данных, отправив письмо на hello@steamphony.com.'
            ]
        },
        {
            id: 'terms',
            title: 'Условия использования',
            content: [
                'Используя наш сайт, вы соглашаетесь не нарушать законы РФ и ЕС, не осуществлять попытки взлома и не публиковать запрещённый контент.',
                'Вся информация предоставляется «как есть». Мы прилагаем усилия, чтобы она была актуальной, но не гарантируем абсолютную точность.',
                'Любые споры решаются в соответствии с законодательством РФ с подсудностью по месту регистрации ООО «Steamphony».'
            ]
        },
        {
            id: 'cookies',
            title: 'Cookie Policy',
            content: [
                'Мы используем собственные и сторонние cookies для аналитики (Google Analytics) и улучшения пользовательского опыта.',
                'Вы можете отключить cookies в настройках браузера, однако это может повлиять на корректную работу некоторых функций сайта.'
            ]
        }
    ];
    return (_jsxs(_Fragment, { children: [_jsx(Helmet, { children: _jsx("title", { children: t('aboutTitle', 'О Steamphony') }) }), _jsxs("section", { className: "hero-about px-4 md:px-20", children: [_jsxs("div", { className: "space-y-6", children: [_jsx(motion.h1, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, className: "text-h1-mobile md:text-h1-desktop font-bold text-gray-deep", children: "\u0410\u0440\u0445\u0438\u0442\u0435\u043A\u0442\u0443\u0440\u0430 \u0434\u043E\u0432\u0435\u0440\u0438\u044F" }), _jsx(motion.p, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: 0.1 }, className: "text-xl md:text-2xl max-w-xl text-gray-600", children: "\u0422\u0440\u0430\u043D\u0441\u0444\u043E\u0440\u043C\u0438\u0440\u0443\u0435\u043C \u0431\u0438\u0437\u043D\u0435\u0441 \u0447\u0435\u0440\u0435\u0437 \u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0438, \u0434\u0438\u0437\u0430\u0439\u043D \u0438 \u0434\u0430\u043D\u043D\u044B\u0435" })] }), _jsx(motion.div, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.8, delay: 0.2 }, className: "w-full h-96 bg-gradient-to-br from-purple-bright/20 to-purple-deep/30 rounded-3xl flex items-center justify-center", children: _jsx("span", { className: "text-3xl font-bold text-purple-deep", children: "[Steam Transformation SVG]" }) })] }), _jsx("section", { className: "px-4 md:px-20 philosophy-grid", children: philosophy.map((item) => (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 }, children: _jsxs(Card, { className: "p-8 shadow-md hover:shadow-xl border-t-4 border-transparent hover:-translate-y-2", children: [_jsx("div", { className: "w-20 h-20 rounded-full bg-gradient-to-br from-purple-deep to-purple-bright mb-6 flex items-center justify-center text-white text-2xl", children: "\u2022" }), _jsx("h3", { className: "text-xl font-semibold mb-2 text-gray-deep", children: item.title }), _jsx("p", { className: "text-gray-600", children: item.text })] }) }, item.title))) }), _jsxs("section", { className: "px-4 md:px-20 my-32 text-center", children: [_jsx(motion.h2, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 }, className: "text-h2-mobile md:text-h2-desktop font-bold mb-12 text-gray-deep", children: "\u041D\u0430\u0448\u0430 \u043A\u043E\u043C\u0430\u043D\u0434\u0430" }), _jsx("div", { className: "w-full h-96 bg-gradient-to-br from-peach-warm/30 to-cream rounded-3xl flex items-center justify-center", children: _jsx("span", { className: "text-2xl text-gray-deep", children: "[Interactive Role Diagram]" }) })] }), _jsxs("section", { id: "legal", className: "px-4 md:px-20 my-32", children: [_jsx(motion.h2, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 }, className: "text-h2-mobile md:text-h2-desktop font-bold mb-12 text-gray-deep", children: "\u041F\u0440\u0430\u0432\u043E\u0432\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F" }), _jsx("div", { className: "space-y-12", children: legalSections.map(section => (_jsxs("div", { id: section.id, className: "space-y-4", children: [_jsx("h3", { className: "text-xl font-semibold text-gray-deep", children: section.title }), section.content.map((paragraph, idx) => (_jsx("p", { className: "text-gray-600", children: paragraph }, idx)))] }, section.id))) })] })] }));
}
