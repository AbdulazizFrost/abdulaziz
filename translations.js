// translations.js - Полная многоязычность (RU / EN) для портфолио и страницы услуг

const translations = {
    ru: {
        // Навигация
        "nav.home": "Главная",
        "nav.services": "Услуги и цены",
        "nav.projects": "Проекты",
        "nav.about": "Обо мне",
        "nav.contact": "Контакты",
        "nav.back": "← В портфолио",
        "nav.calculator": "Калькулятор",
        "nav.faq": "Частые вопросы",

        // Главная: Hero
        "hero.badge": "🚀 Разработка Telegram-ботов и сайтов для бизнеса",
        "hero.title": "Создаю Telegram-ботов и сайты, которые приносят клиентов",
        "hero.subtitle": "Web & Bot Developer",
        "hero.desc": "Помогаю бизнесу автоматизировать прием заявок 24/7 и масштабировать продажи через умных Telegram-ботов и быстрые конверсионные сайты под ключ.",
        "hero.btn.services": "Услуги и цены",
        "hero.btn.projects": "Мои проекты",
        "hero.btn.contact": "Связаться со мной",
        "hero.stat.projects": "Завершенных задач",
        "hero.stat.speed": "Сроки запуска",
        "hero.stat.guarantee": "Гарантия результата",

        // Профиль
        "profile.title": "Web & Bot Developer",
        "profile.desc": "Специализируюсь на создании Telegram-ботов для автоматизации бизнеса и современных продающих сайтов с высокой конверсией.",
        "profile.btn.tg": "Заказать в Telegram",
        "profile.btn.calc": "Услуги и цены",
        "profile.btn.contact": "Связаться",
        "profile.btn.resume": "Скачать резюме",

        // Фильтры проектов
        "projects.title": "Мои проекты",
        "filter.all": "Все",
        "filter.bots": "Telegram-боты",
        "filter.frontend": "Frontend & Сайты",
        "filter.js": "JavaScript",
        "filter.unity": "Unity & Games",
        "filter.vue": "Vue",

        // Блок Обо мне
        "about.title": "Обо мне",
        "about.desc": "Разработчик современных ботов и веб-решений",
        "about.bio1": "Я создаю надежные Telegram-боты и конверсионные сайты под ключ. Помогаю малому и среднему бизнесу автоматизировать рутину, собирать заявки 24/7 и привлекать новых клиентов из интернета.",
        "about.bio2": "Работаю на результат: соблюдаю сроки, пишу чистый код, подключаю CRM и онлайн-оплату. После запуска предоставляю гарантию и техническую поддержку.",
        "about.stat.exp": "Опыт разработки",
        "about.stat.uptime": "Бесперебойная работа ботов",

        // Контакты
        "contact.title": "Контакты",
        "contact.desc": "Готовы обсудить проект? Напишите мне, и я отвечу в течение 15 минут!",
        "contact.form.title": "Отправить сообщение",
        "contact.form.name": "Ваше имя",
        "contact.form.name.placeholder": "Иван Иванов",
        "contact.form.name.error": "Имя должно содержать от 2 до 50 символов",
        "contact.form.email": "Ваш Email",
        "contact.form.email.placeholder": "name@example.com",
        "contact.form.email.error": "Пожалуйста, введите корректный email",
        "contact.form.msg": "Сообщение о задаче",
        "contact.form.msg.placeholder": "Опишите вашу задачу или желаемый результат...",
        "contact.form.msg.error": "Сообщение должно содержать от 10 до 1000 символов",
        "contact.form.submit": "Отправить сообщение",
        "contact.info.title": "Контактная информация",
        "contact.info.location.label": "Локация",
        "contact.info.location": "Ташкент / Ургенч, Узбекистан (Удаленно по миру)",
        "contact.info.email.label": "Email",

        // Страница Услуг: Hero
        "services.hero.back": "Вернуться в портфолио",
        "services.hero.badge": "🚀 Разработка под ключ для бизнеса",
        "services.hero.title": "Услуги и стоимость разработки",
        "services.hero.desc": "Автоматизируйте продажи и прием заявок с помощью умных Telegram-ботов и быстрых продающих лендингов. Без скрытых платежей и с фиксированными сроками.",

        // Тариф 1: Боты
        "services.tier1.badge": "Быстрый старт",
        "services.tier1.title": "Telegram-боты для бизнеса",
        "services.tier1.desc": "Автоматизация приема заявок, каталог товаров и запись клиентов 24/7 без зарплаты менеджеру.",
        "services.tier1.currency": "от",
        "services.tier1.sum": "/ ~850 000 сум",
        "services.tier1.time": "Срок: 2–4 дня",
        "services.tier1.f1": "Интерактивное меню и прайс-лист",
        "services.tier1.f2": "Сбор заявок, номеров телефонов и имен",
        "services.tier1.f3": "Мгновенные оповещения вам в Telegram",
        "services.tier1.f4": "Интеграция с Google Таблицами / CRM",
        "services.tier1.f5": "14 дней бесплатной поддержки",
        "services.tier1.btn": "Заказать бота",

        // Тариф 2: Сайты
        "services.tier2.badge": "Высокая конверсия",
        "services.tier2.title": "Продающие сайты и Лендинги",
        "services.tier2.desc": "Современный быстрый одностраничник под ключ для запуска рекламы в Instagram, Яндекс и Google.",
        "services.tier2.currency": "от",
        "services.tier2.sum": "/ ~1 200 000 сум",
        "services.tier2.time": "Срок: 3–5 дней",
        "services.tier2.f1": "Адаптивный дизайн (Смартфон / ПК)",
        "services.tier2.f2": "Молниеносная скорость загрузки",
        "services.tier2.f3": "Заявки с сайта прямо в Telegram / Email",
        "services.tier2.f4": "Базовая SEO-оптимизация",
        "services.tier2.f5": "Бесплатный хостинг и домен в подарок",
        "services.tier2.btn": "Заказать сайт",

        // Тариф 3: Комплект
        "services.tier3.popular": "🔥 ХИТ ПРОДАЖ (ВЫГОДА 25%)",
        "services.tier3.badge": "Всё включено",
        "services.tier3.title": "Комплект «Сайт + Бот под ключ»",
        "services.tier3.desc": "Полная воронка продаж: продающий сайт для рекламы + Telegram-бот для автоматического закрытия сделок.",
        "services.tier3.currency": "от",
        "services.tier3.sum": "/ ~1 800 000 сум",
        "services.tier3.time": "Срок: 5–7 дней",
        "services.tier3.f1": "Полноценный продающий сайт",
        "services.tier3.f2": "Telegram-бот автоответчик и сборщик лидов",
        "services.tier3.f3": "Сквозная связка «Сайт ➔ Бот ➔ Уведомления»",
        "services.tier3.f4": "Помощь с запуском первой рекламы",
        "services.tier3.f5": "30 дней технического сопровождения",
        "services.tier3.btn": "Заказать под ключ",

        // Калькулятор
        "calc.badge": "⚡ Интерактивный расчет",
        "calc.title": "Калькулятор стоимости вашего проекта",
        "calc.subtitle": "Выберите нужные опции и получите моментальный предварительный расчет",
        "calc.step1": "1. Что необходимо разработать?",
        "calc.opt.bot": "Telegram-бот для бизнеса",
        "calc.opt.bot.desc": "Меню, прием заявок, каталог, уведомления",
        "calc.opt.site": "Продающий сайт-лендинг",
        "calc.opt.site.desc": "1–3 экрана, современный дизайн, быстрая загрузка",
        "calc.opt.combo": "Комплект «Сайт + Telegram-бот»",
        "calc.opt.combo.desc": "Связка сайта с ботом для максимальных продаж (-25%)",
        "calc.step2": "2. Дополнительные опции",
        "calc.addon.admin": "Админ-панель для рассылок (+ $30)",
        "calc.addon.crm": "Интеграция с CRM / Google Таблицами (+ $25)",
        "calc.addon.pay": "Онлайн-оплата (Click / Payme / Stripe) (+ $40)",
        "calc.addon.multi": "Многоязычность (RU / UZ / EN) (+ $20)",
        "calc.addon.fast": "Срочный запуск за 24–48 часов (+ $35)",
        "calc.result.title": "Итоговый расчет",
        "calc.result.approx": "Ориентировочная стоимость:",
        "calc.btn.discuss": "Обсудить проект в Telegram",
        "calc.btn.note": "Нажатие откроет диалог в Telegram с уже заполненными параметрами заказа",

        // FAQ
        "faq.title": "Часто задаваемые вопросы",
        "faq.subtitle": "Все, что нужно знать о процессе разработки и сотрудничестве",
        "faq.q1": "Сколько времени занимает разработка?",
        "faq.a1": "Простой бот или лендинг создается за 2–3 дня. Комплексные решения (сайт + бот) обычно занимают от 5 до 7 дней. Если проект срочный, возможен запуск за 24–48 часов.",
        "faq.q2": "Как происходит оплата?",
        "faq.a2": "Работаем по безопасной схеме: предоплата 30–50% перед стартом, остаток — после демонстрации готового работающего решения и вашего утверждения. Оплата возможна на карту (Uzcard/Humo), Payme/Click или криптовалютой.",
        "faq.q3": "Будет ли бот и сайт работать без перебоев?",
        "faq.a3": "Да. Ботов я размещаю на стабильных облачных серверах (uptime 99.9%), а сайты — на быстрых CDN-платформах. Вы получаете гарантию и бесплатную техподдержку после запуска.",
        "faq.q4": "Что нужно от меня для начала работы?",
        "faq.a4": "Достаточно коротко описать ваш бизнес и задачу: какие товары/услуги вы продаете и что должен делать бот или сайт. Если есть логотип или текст — отлично, если нет — я помогу составить структуру!",
        "faq.q5": "Поможете ли вы настроить рекламу?",
        "faq.a5": "Да, при заказе комплекта я помогаю подготовить посадочную страницу к рекламе в Instagram и Google, установить пиксели и настроить сквозную аналитику заявок.",

        // CTA Баннер и Футер
        "cta.title": "Готовы автоматизировать свой бизнес?",
        "cta.desc": "Напишите мне в Telegram, и мы обсудим ваш проект уже сегодня",
        "cta.btn": "Написать в Telegram",
        "footer.rights": "Все права защищены",
        "footer.tagline": "Разработка Telegram-ботов и сайтов для бизнеса"
    },

    en: {
        // Navigation
        "nav.home": "Home",
        "nav.services": "Services & Pricing",
        "nav.projects": "Projects",
        "nav.about": "About",
        "nav.contact": "Contact",
        "nav.back": "← Back to Portfolio",
        "nav.calculator": "Calculator",
        "nav.faq": "FAQ",

        // Main: Hero
        "hero.badge": "🚀 Custom Telegram Bots & Websites for Business",
        "hero.title": "Building Telegram Bots & High-Converting Websites",
        "hero.subtitle": "Web & Bot Developer",
        "hero.desc": "Helping businesses automate lead capture 24/7 and scale sales through smart Telegram bots and modern high-converting websites.",
        "hero.btn.services": "Services & Pricing",
        "hero.btn.projects": "My Projects",
        "hero.btn.contact": "Contact Me",
        "hero.stat.projects": "Completed Tasks",
        "hero.stat.speed": "Fast Delivery",
        "hero.stat.guarantee": "Result Guarantee",

        // Profile
        "profile.title": "Web & Bot Developer",
        "profile.desc": "Specializing in building Telegram bots for business automation and modern high-converting websites.",
        "profile.btn.tg": "Order in Telegram",
        "profile.btn.calc": "Services & Pricing",
        "profile.btn.contact": "Contact",
        "profile.btn.resume": "Download Resume",

        // Project filters
        "projects.title": "Featured Projects",
        "filter.all": "All",
        "filter.bots": "Telegram Bots",
        "filter.frontend": "Frontend & Websites",
        "filter.js": "JavaScript",
        "filter.unity": "Unity & Games",
        "filter.vue": "Vue",

        // About block
        "about.title": "About Me",
        "about.desc": "Developer of modern bots and web applications",
        "about.bio1": "I create dependable Telegram bots and turnkey high-converting websites. I help small and medium businesses automate routine tasks, capture leads 24/7, and attract new clients from the web.",
        "about.bio2": "Focused on results: strict deadlines, clean code, CRM and online payment integrations. Complete warranty and technical support after launch.",
        "about.stat.exp": "Dev Experience",
        "about.stat.uptime": "Bot Uptime Reliability",

        // Contact
        "contact.title": "Contact",
        "contact.desc": "Ready to discuss your project? Drop me a message, and I will reply within 15 minutes!",
        "contact.form.title": "Send a Message",
        "contact.form.name": "Your Name",
        "contact.form.name.placeholder": "John Doe",
        "contact.form.name.error": "Name must be between 2 and 50 characters",
        "contact.form.email": "Your Email",
        "contact.form.email.placeholder": "name@example.com",
        "contact.form.email.error": "Please enter a valid email",
        "contact.form.msg": "Project Details",
        "contact.form.msg.placeholder": "Describe your project or desired outcome...",
        "contact.form.msg.error": "Message must be between 10 and 1000 characters",
        "contact.form.submit": "Send Message",
        "contact.info.title": "Contact Information",
        "contact.info.location.label": "Location",
        "contact.info.location": "Tashkent / Urgench, Uzbekistan (Worldwide Remote)",
        "contact.info.email.label": "Email",

        // Services Page: Hero
        "services.hero.back": "Back to Portfolio",
        "services.hero.badge": "🚀 Turnkey Business Development",
        "services.hero.title": "Services & Development Pricing",
        "services.hero.desc": "Automate sales and lead capture with smart Telegram bots and fast sales landing pages. Fixed pricing, no hidden fees, transparent deadlines.",

        // Tier 1: Bots
        "services.tier1.badge": "Quick Start",
        "services.tier1.title": "Telegram Bots for Business",
        "services.tier1.desc": "Automated order taking, product catalog, and 24/7 client booking without hiring managers.",
        "services.tier1.currency": "from",
        "services.tier1.sum": "/ ~850,000 UZS",
        "services.tier1.time": "Time: 2–4 days",
        "services.tier1.f1": "Interactive menu & price list",
        "services.tier1.f2": "Lead capture, phone numbers & names",
        "services.tier1.f3": "Instant Telegram notifications",
        "services.tier1.f4": "Google Sheets & CRM integration",
        "services.tier1.f5": "14 days of free support",
        "services.tier1.btn": "Order Bot",

        // Tier 2: Websites
        "services.tier2.badge": "High Conversion",
        "services.tier2.title": "Landing Pages & Websites",
        "services.tier2.desc": "Turnkey modern high-speed landing page ready for Instagram, Google, and Meta advertising.",
        "services.tier2.currency": "from",
        "services.tier2.sum": "/ ~1,200,000 UZS",
        "services.tier2.time": "Time: 3–5 days",
        "services.tier2.f1": "Responsive design (Mobile & Desktop)",
        "services.tier2.f2": "Lightning-fast page speed",
        "services.tier2.f3": "Leads sent directly to Telegram & Email",
        "services.tier2.f4": "Basic SEO optimization",
        "services.tier2.f5": "Free hosting & domain setup",
        "services.tier2.btn": "Order Website",

        // Tier 3: Bundle
        "services.tier3.popular": "🔥 BEST VALUE (SAVE 25%)",
        "services.tier3.badge": "All Inclusive",
        "services.tier3.title": "Bundle «Website + Telegram Bot»",
        "services.tier3.desc": "Complete sales funnel: high-converting landing page + Telegram bot for automated deal closing.",
        "services.tier3.currency": "from",
        "services.tier3.sum": "/ ~1,800,000 UZS",
        "services.tier3.time": "Time: 5–7 days",
        "services.tier3.f1": "Full sales landing page",
        "services.tier3.f2": "Telegram bot autoresponder & lead catcher",
        "services.tier3.f3": "Connected pipeline «Website ➔ Bot ➔ Alerts»",
        "services.tier3.f4": "Initial ad launch setup assistance",
        "services.tier3.f5": "30 days of tech support",
        "services.tier3.btn": "Order Turnkey Bundle",

        // Calculator
        "calc.badge": "⚡ Interactive Estimate",
        "calc.title": "Project Cost Calculator",
        "calc.subtitle": "Select your requirements to get an instant cost estimate",
        "calc.step1": "1. What would you like to build?",
        "calc.opt.bot": "Business Telegram Bot",
        "calc.opt.bot.desc": "Menu, lead intake, catalog, notifications",
        "calc.opt.site": "Sales Landing Page",
        "calc.opt.site.desc": "1–3 sections, modern UI, fast loading",
        "calc.opt.combo": "Bundle «Website + Telegram Bot»",
        "calc.opt.combo.desc": "Integrated site + bot for max sales (-25%)",
        "calc.step2": "2. Additional Features",
        "calc.addon.admin": "Broadcast Admin Panel (+ $30)",
        "calc.addon.crm": "CRM & Google Sheets Integration (+ $25)",
        "calc.addon.pay": "Online Payments (Click / Payme / Stripe) (+ $40)",
        "calc.addon.multi": "Multi-Language (RU / UZ / EN) (+ $20)",
        "calc.addon.fast": "Express 24–48h Delivery (+ $35)",
        "calc.result.title": "Estimated Total",
        "calc.result.approx": "Estimated Investment:",
        "calc.btn.discuss": "Discuss Project in Telegram",
        "calc.btn.note": "Clicking opens Telegram with your pre-filled project details",

        // FAQ
        "faq.title": "Frequently Asked Questions",
        "faq.subtitle": "Everything you need to know about the workflow and delivery",
        "faq.q1": "How long does development take?",
        "faq.a1": "A simple bot or landing page takes 2–3 days. Comprehensive bundles (site + bot) typically take 5 to 7 days. Rush delivery (24–48 hours) is also available.",
        "faq.q2": "How does payment work?",
        "faq.a2": "We work with a safe structure: 30–50% deposit before start, remainder upon demo and approval. Payments accepted via card (Uzcard/Humo), Payme/Click, or crypto/USDT.",
        "faq.q3": "Will the bot and site run reliably?",
        "faq.a3": "Yes. Bots are deployed on dependable cloud servers (99.9% uptime), and websites on ultra-fast CDNs. You receive warranty and free technical support after launch.",
        "faq.q4": "What is needed from me to get started?",
        "faq.a4": "Simply describe your business and goal: what products/services you offer and what you want the bot or site to do. If you have a logo or text, great! If not, I will help formulate the structure.",
        "faq.q5": "Will you help set up advertising?",
        "faq.a5": "Yes! With our turnkey bundle, I help prepare the page for Instagram and Google ads, install tracking pixels, and set up analytics.",

        // CTA Banner & Footer
        "cta.title": "Ready to Automate Your Business?",
        "cta.desc": "Message me on Telegram, and let us discuss your project today",
        "cta.btn": "Message on Telegram",
        "footer.rights": "All rights reserved",
        "footer.tagline": "Building Telegram bots and high-converting websites for business"
    }
};

let currentLang = localStorage.getItem('lang') || 'ru';

function applyTranslations(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach((el) => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key] !== undefined) {
            const translationText = translations[lang][key];

            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = translationText;
            } else {
                const icon = el.querySelector('i');
                if (icon) {
                    const iconClone = icon.cloneNode(true);
                    el.innerHTML = '';
                    el.appendChild(iconClone);
                    el.appendChild(document.createTextNode(' ' + translationText));
                } else {
                    el.textContent = translationText;
                }
            }
        }
    });

    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) {
        langBtn.textContent = lang === 'ru' ? 'EN' : 'RU';
        langBtn.setAttribute('title', lang === 'ru' ? 'Switch to English' : 'Переключить на русский');
    }

    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: lang } }));
}

function initLanguage() {
    applyTranslations(currentLang);

    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) {
        langBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const nextLang = currentLang === 'ru' ? 'en' : 'ru';
            localStorage.setItem('lang', nextLang);
            applyTranslations(nextLang);
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLanguage);
} else {
    initLanguage();
}

window.appTranslations = {
    translations,
    get currentLang() { return currentLang; },
    applyTranslations
};
