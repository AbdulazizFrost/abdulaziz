// Основной объект конфигурации
        const config = {
            emailjs: {
                serviceId: "service_7opx4dt",
                templateId: "template_wdordbj",
                publicKey: "mLkxuD6fC19PM6EV1"
            },
            resumeUrl: "resume.pdf",
            resumeViewUrl: "resume.pdf",
            socialLinks: {
                github: "https://github.com/AbdulazizFrost",
                telegram: "https://t.me/Yandex_Games_GameDev",
                linkedin: "https://www.linkedin.com/in/abdulaziz-sidiqov-53903a3a0/",
                instagram: "https://instagram.com/YOUR_USERNAME"
            }
        };

        // Определение типа устройства
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

        // Проверка конфигурации
        function checkConfiguration() {
            const warnings = [];
            
            if (config.emailjs.serviceId === "service_7opx4dt" && 
                config.emailjs.templateId === "template_wdordbj" && 
                config.emailjs.publicKey === "mLkxuD6fC19PM6EV1") {
                console.info("✅ EmailJS настроен корректно");
            } else {
                warnings.push("EmailJS не настроен");
            }
            
            if (config.resumeUrl.includes("YOUR_FILE_ID")) {
                warnings.push("Ссылка на резюме не настроена");
            }
            
            if (warnings.length > 0) {
                console.warn("⚠️ Конфигурация требует настройки:");
                warnings.forEach(warning => console.warn(`- ${warning}`));
                setTimeout(() => {
                    showNotification(
                        "info", 
                        "Внимание: требуется настройка", 
                        "Некоторые функции требуют дополнительной конфигурации. Проверьте консоль браузера для подробностей.",
                        8000
                    );
                }, 2000);
            }
        }

        // Инициализация EmailJS
        (function() {
            try {
                emailjs.init(config.emailjs.publicKey);
                console.log("✅ EmailJS инициализирован");
            } catch (error) {
                console.error("Ошибка инициализации EmailJS:", error);
            }
        })();

        // Установка текущего года
        document.getElementById("year").textContent = new Date().getFullYear();

        // ========== ОСНОВНЫЕ ПЕРЕМЕННЫЕ ==========
        const loadingOverlay = document.getElementById("loadingOverlay");
        const notification = document.getElementById("notification");
        const resumeModal = document.getElementById("resumeModal");
        const menuToggle = document.getElementById("menu-toggle");
        const mainNav = document.getElementById("main-nav");
        const cursorFollower = document.querySelector(".cursor-follower");
        const scrollProgress = document.querySelector(".scroll-progress");

        // Оптимизация для мобильных устройств
        if (isMobile || isTouchDevice) {
            document.body.classList.add('touch-device');
            
            // Убираем сложные эффекты для производительности
            const parallaxElements = document.querySelectorAll('.parallax-element');
            parallaxElements.forEach(el => {
                el.style.display = 'none';
            });
            
            if (cursorFollower) {
                cursorFollower.style.display = 'none';
            }
            
            // Увеличиваем hit area для интерактивных элементов
            document.querySelectorAll('button, a, .btn, .project-link').forEach(el => {
                el.style.minHeight = '44px';
                el.style.minWidth = '44px';
            });
        }

        // ========== УТИЛИТЫ ==========

        // Показ/скрытие загрузки
        function showLoading(show = true) {
            if (show) {
                loadingOverlay.classList.add("active");
            } else {
                loadingOverlay.classList.remove("active");
            }
        }

        // Уведомления
        function showNotification(type, title, message, duration = 5000) {
            const titleEl = document.getElementById("notification-title");
            const messageEl = document.getElementById("notification-message");
            const iconEl = notification.querySelector(".icon");

            notification.className = `notification ${type}`;
            titleEl.textContent = title;
            messageEl.textContent = message;

            if (type === "success") {
                iconEl.innerHTML = '<i class="fas fa-check-circle"></i>';
            } else if (type === "error") {
                iconEl.innerHTML = '<i class="fas fa-exclamation-circle"></i>';
            } else if (type === "info") {
                iconEl.innerHTML = '<i class="fas fa-info-circle"></i>';
            }

            notification.classList.add("show");

            setTimeout(() => {
                notification.classList.remove("show");
            }, duration);
        }

        // Валидация формы
        function validateForm() {
            let isValid = true;
            
            // Валидация имени
            const name = document.getElementById("name");
            const nameError = document.getElementById("name-error");
            if (!name.value.trim() || name.value.length < 2 || name.value.length > 50) {
                name.classList.add("error");
                nameError.classList.add("show");
                isValid = false;
            } else {
                name.classList.remove("error");
                nameError.classList.remove("show");
            }
            
            // Валидация email
            const email = document.getElementById("email");
            const emailError = document.getElementById("email-error");
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                email.classList.add("error");
                emailError.classList.add("show");
                isValid = false;
            } else {
                email.classList.remove("error");
                emailError.classList.remove("show");
            }
            
            // Валидация сообщения
            const message = document.getElementById("message");
            const messageError = document.getElementById("message-error");
            if (!message.value.trim() || message.value.length < 10 || message.value.length > 1000) {
                message.classList.add("error");
                messageError.classList.add("show");
                isValid = false;
            } else {
                message.classList.remove("error");
                messageError.classList.remove("show");
            }
            
            return isValid;
        }

        // Сохранение неотправленного сообщения
        function saveUnsentMessage(formData) {
            try {
                const unsentMessages = JSON.parse(localStorage.getItem('unsent_messages') || '[]');
                unsentMessages.push({
                    ...formData,
                    timestamp: new Date().toISOString()
                });
                localStorage.setItem('unsent_messages', JSON.stringify(unsentMessages.slice(-5)));
            } catch (error) {
                console.error('Ошибка сохранения сообщения:', error);
            }
        }

        // ========== ОБРАБОТЧИКИ СОБЫТИЙ ==========

        // 1. Кнопка скачивания резюме
        document.getElementById("resumeBtn").addEventListener("click", function(e) {
            e.preventDefault();
            resumeModal.classList.add("active");
            resumeModal.setAttribute("aria-hidden", "false");
            document.getElementById("modalClose").focus();
            
            // Добавляем обработчик клавиатуры для модального окна
            if (isMobile) {
                document.activeElement.blur();
            }
        });

        // Закрытие модального окна
        document.getElementById("modalClose").addEventListener("click", function() {
            resumeModal.classList.remove("active");
            resumeModal.setAttribute("aria-hidden", "true");
        });

        // Закрытие модального окна при клике вне его
        resumeModal.addEventListener("click", function(e) {
            if (e.target === this) {
                this.classList.remove("active");
                this.setAttribute("aria-hidden", "true");
            }
        });

        // Закрытие модального окна по Escape
        document.addEventListener("keydown", function(e) {
            if (e.key === "Escape" && resumeModal.classList.contains("active")) {
                resumeModal.classList.remove("active");
                resumeModal.setAttribute("aria-hidden", "true");
            }
        });

        // Скачивание резюме
        document.getElementById("downloadResume").addEventListener("click", function(e) {
            e.preventDefault();
            
            if (config.resumeUrl.includes("YOUR_FILE_ID")) {
                showNotification("error", "Ошибка", "Ссылка на резюме не настроена. Пожалуйста, запросите резюме по email.");
                return;
            }
            
            showNotification("success", "Скачивание началось", "Резюме скачивается...");
            
            // Открываем ссылку для скачивания
            if (isMobile) {
                window.location.href = config.resumeUrl;
            } else {
                window.open(config.resumeUrl, "_blank");
            }
            
            // Закрываем модальное окно
            setTimeout(() => {
                resumeModal.classList.remove("active");
                resumeModal.setAttribute("aria-hidden", "true");
            }, 500);
        });

        // Просмотр резюме онлайн
        document.getElementById("viewResume").addEventListener("click", function(e) {
            e.preventDefault();
            
            if (config.resumeViewUrl.includes("YOUR_FILE_ID")) {
                showNotification("error", "Ошибка", "Ссылка на резюме не настроена. Пожалуйста, запросите резюме по email.");
                return;
            }
            
            if (isMobile) {
                window.location.href = config.resumeViewUrl;
            } else {
                window.open(config.resumeViewUrl, "_blank");
            }
            
            resumeModal.classList.remove("active");
            resumeModal.setAttribute("aria-hidden", "true");
        });

        // 2. Кнопки проектов
        function setupProjectButtons() {
            // Проект 1
            document.getElementById("project1Demo").addEventListener("click", function(e) {
                e.preventDefault();
                if (this.classList.contains("disabled")) {
                    showNotification(
                        "info", 
                        "В разработке", 
                        "Демо этого проекта будет доступно в ближайшее время!"
                    );
                } else {
                    window.open(this.href, "_blank");
                }
            });
            
            document.getElementById("project1Code").addEventListener("click", function(e) {
                e.preventDefault();
                window.open(this.href, "_blank");
            });

            // Проект 2
            document.getElementById("project2Demo").addEventListener("click", function(e) {
                e.preventDefault();
                // Плавная прокрутка к началу
                document.querySelector('#home').scrollIntoView({ behavior: 'smooth' });
            });
            
            document.getElementById("project2Code").addEventListener("click", function(e) {
                e.preventDefault();
                window.open(this.href, "_blank");
            });

            // Проект 3
            document.getElementById("project3Code").addEventListener("click", function(e) {
                e.preventDefault();
                window.open(this.href, "_blank");
            });

            // Проект 4
            document.getElementById("project4Code").addEventListener("click", function(e) {
                e.preventDefault();
                window.open(this.href, "_blank");
            });
        }

        // 3. Социальные кнопки
        function setupSocialButtons() {
            // Кнопки в контактах
            document.getElementById("telegramBtn").addEventListener("click", function(e) {
                e.preventDefault();
                window.open(this.href, "_blank");
            });
            
            document.getElementById("githubBtn").addEventListener("click", function(e) {
                e.preventDefault();
                window.open(this.href, "_blank");
            });
            
            document.getElementById("linkedinBtn").addEventListener("click", function(e) {
                e.preventDefault();
                window.open(this.href, "_blank");
            });

            // Кнопки в футере
            document.getElementById("footerGithub").addEventListener("click", function(e) {
                e.preventDefault();
                window.open(this.href, "_blank");
            });
            
            document.getElementById("footerTelegram").addEventListener("click", function(e) {
                e.preventDefault();
                window.open(this.href, "_blank");
            });
            
            document.getElementById("footerLinkedin").addEventListener("click", function(e) {
                e.preventDefault();
                window.open(this.href, "_blank");
            });
            
            document.getElementById("footerInstagram").addEventListener("click", function(e) {
                e.preventDefault();
                if (config.socialLinks.instagram.includes("YOUR_USERNAME")) {
                    showNotification("error", "Instagram не настроен", "Пожалуйста, настройте ссылку на Instagram в конфигурации");
                } else {
                    window.open(config.socialLinks.instagram, "_blank");
                }
            });
        }

        // 4. Отправка формы контактов
        document.getElementById("contact-form").addEventListener("submit", async function(e) {
            e.preventDefault();

            if (!validateForm()) {
                showNotification("error", "Ошибка валидации", "Пожалуйста, проверьте правильность заполнения полей");
                return;
            }

            const submitBtn = document.getElementById("submit-btn");
            const originalText = submitBtn.textContent;

            // Показываем индикатор загрузки
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="btn-spinner"></span> Отправка...';

            // Собираем данные формы
            const formData = {
                name: document.getElementById("name").value.trim(),
                email: document.getElementById("email").value.trim(),
                message: document.getElementById("message").value.trim(),
                date: new Date().toLocaleString("ru-RU"),
                pageUrl: window.location.href,
            };

            try {
                // Проверяем конфигурацию EmailJS
                if (config.emailjs.serviceId === "service_7opx4dt" && 
                    config.emailjs.templateId === "template_wdordbj" &&
                    config.emailjs.publicKey === "mLkxuD6fC19PM6EV1") {
                    
                    // Отправляем через EmailJS
                    const response = await emailjs.send(
                        config.emailjs.serviceId,
                        config.emailjs.templateId,
                        {
                            from_name: formData.name,
                            from_email: formData.email,
                            message: formData.message,
                            date: formData.date,
                            page_url: formData.pageUrl,
                        }
                    );

                    if (response.status === 200) {
                        showNotification(
                            "success",
                            "Успешно отправлено!",
                            `Спасибо, ${formData.name}! Я скоро отвечу вам на ${formData.email}.`,
                            6000
                        );

                        // Очищаем форму
                        document.getElementById("contact-form").reset();
                        
                        // Сохраняем в историю успешных отправок
                        try {
                            const sentMessages = JSON.parse(localStorage.getItem('sent_messages') || '[]');
                            sentMessages.push({
                                ...formData,
                                timestamp: new Date().toISOString()
                            });
                            localStorage.setItem('sent_messages', JSON.stringify(sentMessages.slice(-10)));
                        } catch (error) {
                            console.log("Не удалось сохранить историю:", error);
                        }
                    } else {
                        throw new Error("Ошибка отправки");
                    }
                } else {
                    throw new Error("EmailJS не настроен");
                }
            } catch (error) {
                console.error("Ошибка отправки:", error);

                // Сохраняем неотправленное сообщение
                saveUnsentMessage(formData);
                
                // Альтернативный способ отправки через mailto
                const mailtoLink = `mailto:sba200676@gmail.com?subject=Сообщение от ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message + "\n\n---\nОт: " + formData.email + "\nДата: " + formData.date)}`;
                
                showNotification(
                    "error",
                    "Ошибка отправки",
                    "Пожалуйста, напишите мне напрямую на email. Открываю почтовый клиент...",
                    8000
                );
                
                setTimeout(() => {
                    window.location.href = mailtoLink;
                }, 2000);
            } finally {
                // Возвращаем кнопку в исходное состояние
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        });

        // ========== АНИМАЦИИ И ЭФФЕКТЫ ==========

        // Эффект параллакса (только для десктопов)
        if (!isMobile) {
            document.addEventListener("mousemove", function(e) {
                const parallaxElements = document.querySelectorAll(".parallax-element");
                const x = e.clientX / window.innerWidth;
                const y = e.clientY / window.innerHeight;

                parallaxElements.forEach((el) => {
                    const speed = 0.05;
                    const xMove = (x - 0.5) * speed * 100;
                    const yMove = (y - 0.5) * speed * 100;

                    el.style.transform = `translate(${xMove}px, ${yMove}px)`;
                });
            });
        }

        // Следящий за курсором элемент (только для десктопов)
        if (!isMobile && cursorFollower) {
            document.addEventListener("mousemove", (e) => {
                cursorFollower.style.left = e.clientX + "px";
                cursorFollower.style.top = e.clientY + "px";
            });

            // Эффект при наведении на интерактивные элементы
            const interactiveElements = document.querySelectorAll("a, button, .glass-card, .project-link, .social-btn");
            
            interactiveElements.forEach((el) => {
                el.addEventListener("mouseenter", () => {
                    cursorFollower.style.transform = "scale(2)";
                    cursorFollower.style.background = "rgba(102, 126, 234, 0.1)";
                });

                el.addEventListener("mouseleave", () => {
                    cursorFollower.style.transform = "scale(1)";
                    cursorFollower.style.background = "rgba(102, 126, 234, 0.2)";
                });
            });
        }

        // Анимация появления элементов при скролле
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");

                        // Анимация прогресс-баров навыков
                        if (entry.target.classList.contains("skill-progress")) {
                            const width = entry.target.getAttribute("data-width");
                            entry.target.style.width = width + "%";
                        }
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -50px 0px",
            }
        );

        document.querySelectorAll(".reveal, .skill-progress").forEach((el) => {
            observer.observe(el);
        });

        // Прогресс прокрутки
        window.addEventListener("scroll", () => {
            const windowHeight =
                document.documentElement.scrollHeight -
                document.documentElement.clientHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            scrollProgress.style.width = scrolled + "%";

            // Эффект для хедера при прокрутке
            const header = document.querySelector(".header-container");
            if (window.scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }

            // Активное состояние навигации
            const sections = document.querySelectorAll("section");
            const navLinks = document.querySelectorAll("nav a");

            let current = "";
            sections.forEach((section) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= sectionTop - 200) {
                    current = section.getAttribute("id");
                }
            });

            navLinks.forEach((link) => {
                link.classList.remove("active");
                if (link.getAttribute("href").substring(1) === current) {
                    link.classList.add("active");
                }
            });
        });

        // Мобильное меню
        menuToggle.addEventListener("click", () => {
            const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
            mainNav.classList.toggle("active");
            menuToggle.classList.toggle("active");
            menuToggle.setAttribute("aria-expanded", !isExpanded);
            
            // Блокируем скролл при открытом меню
            if (!isExpanded) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Закрытие меню при клике на ссылку и переход к якорю
        document.querySelectorAll("nav a").forEach((link) => {
            link.addEventListener("click", (e) => {
                const href = link.getAttribute("href");
                
                // Закрываем мобильное меню
                mainNav.classList.remove("active");
                menuToggle.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
                document.body.style.overflow = '';
            });
        });

        // Закрытие меню при клике вне его
        document.addEventListener('click', (e) => {
            if (!mainNav.contains(e.target) && !menuToggle.contains(e.target) && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute("aria-expanded", "false");
                document.body.style.overflow = '';
            }
        });

        // Инициализация прогресс-баров
        document.querySelectorAll(".skill-progress").forEach((bar) => {
            bar.style.width = "0%";
        });

        // Эффект наклона для карточек проектов (только для десктопов)
        if (!isMobile) {
            document.querySelectorAll(".project-card").forEach((card) => {
                card.addEventListener("mousemove", (e) => {
                    const cardRect = card.getBoundingClientRect();
                    const x = e.clientX - cardRect.left;
                    const y = e.clientY - cardRect.top;

                    const centerX = cardRect.width / 2;
                    const centerY = cardRect.height / 2;

                    const rotateY = (x - centerX) / 25;
                    const rotateX = (centerY - y) / 25;

                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
                });

                card.addEventListener("mouseleave", () => {
                    card.style.transform =
                        "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
                });
            });
        }

        // Предотвращение отправки формы при нажатии Enter в textarea
        document.querySelectorAll(".form-textarea").forEach(textarea => {
            textarea.addEventListener("keydown", function(e) {
                if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                }
            });
        });

        // Обработка касаний для мобильных (предотвращение масштабирования)
        if (isTouchDevice) {
            let lastTouchEnd = 0;
            document.addEventListener('touchend', function(event) {
                const now = (new Date()).getTime();
                if (now - lastTouchEnd <= 300) {
                    event.preventDefault();
                }
                lastTouchEnd = now;
            }, false);
            
            // Улучшаем feedback при касании
            document.addEventListener('touchstart', function() {}, { passive: true });
        }

        // ========== ИНИЦИАЛИЗАЦИЯ ==========
        document.addEventListener("DOMContentLoaded", function() {
            // Показываем загрузку
            showLoading(true);
            
            // Инициализация компонентов
            setTimeout(() => {
                setupProjectButtons();
                setupSocialButtons();
                checkConfiguration();
                
                // Скрываем загрузку
                showLoading(false);
                
                // Показываем приветственное сообщение
                setTimeout(() => {
                    showNotification(
                        "info",
                        "Добро пожаловать!",
                        "Исследуйте моё портфолио. Сайт полностью адаптирован для мобильных устройств.",
                        5000
                    );
                }, 500);
                
                // Проверяем сохраненные неотправленные сообщения
                try {
                    const unsentMessages = JSON.parse(localStorage.getItem('unsent_messages') || '[]');
                    if (unsentMessages.length > 0) {
                        console.log(`У вас есть ${unsentMessages.length} неотправленных сообщений`);
                    }
                } catch (error) {
                    console.log("Не удалось проверить неотправленные сообщения:", error);
                }
            }, 1000);
            
            // Добавляем адаптивные классы
            if (window.innerWidth < 768) {
                document.body.classList.add('mobile-view');
            }
            
            // Обновляем класс при изменении размера окна
            window.addEventListener('resize', function() {
                if (window.innerWidth < 768) {
                    document.body.classList.add('mobile-view');
                } else {
                    document.body.classList.remove('mobile-view');
                }
            });
        });

        // Обработка ошибок загрузки изображений
        window.addEventListener('error', function(e) {
            if (e.target.tagName === 'IMG') {
                console.warn('Ошибка загрузки изображения:', e.target.src);
                e.target.style.opacity = '0.7';
                e.target.style.filter = 'grayscale(50%)';
            }
        }, true);

        // Фикс для iOS и старых Android
        if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
            // Фикс для viewport на iOS
            document.addEventListener('touchstart', function() {}, {passive: true});
            
            // Фикс для скролла на iOS
            document.addEventListener('touchmove', function(e) {
                if (mainNav.classList.contains('active')) {
                    e.preventDefault();
                }
            }, {passive: false});
        }

// --- Dark Mode Logic ---
const themeToggleBtn = document.getElementById('theme-toggle');
// Default to dark theme if not set
const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'dark';

if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (themeToggleBtn) themeToggleBtn.textContent = '☀️';
} else {
    document.documentElement.removeAttribute('data-theme');
    if (themeToggleBtn) themeToggleBtn.textContent = '🌙';
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeToggleBtn.textContent = '🌙';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggleBtn.textContent = '☀️';
        }
    });
}

// --- Project Filtering Logic ---
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            const categories = card.getAttribute('data-category');
            if (filter === 'all' || (categories && categories.includes(filter))) {
                card.style.display = 'block';
                card.classList.remove('active');
                setTimeout(() => card.classList.add('active'), 50);
            } else {
                card.style.display = 'none';
                card.classList.remove('active');
            }
        });
    });
});

// --- GitHub API Logic ---
async function fetchGitHubStats() {
    const statsContainers = document.querySelectorAll('.github-stats');
    
    for (const container of statsContainers) {
        const repo = container.getAttribute('data-repo');
        if (!repo) continue;
        
        try {
            const response = await fetch(`https://api.github.com/repos/${repo}`);
            if (response.ok) {
                const data = await response.json();
                const starsEl = container.querySelector('.stars');
                const forksEl = container.querySelector('.forks');
                if (starsEl) starsEl.textContent = `⭐ ${data.stargazers_count}`;
                if (forksEl) forksEl.textContent = ` 🔄 ${data.forks_count}`;
            }
        } catch (error) {
            console.error('Error fetching GitHub stats for ' + repo, error);
        }
    }
}
setTimeout(fetchGitHubStats, 1000);
// --- i18n Logic ---
const langToggleBtn = document.getElementById('lang-toggle');
const translations = {
    ru: {
        "filter.all": "Все",
        "filter.unity": "Unity",
        "filter.frontend": "Frontend",
        "filter.js": "JavaScript",
        "filter.vue": "Vue",
        "nav.home": "Главная",
        "nav.projects": "Проекты",
        "nav.about": "Обо мне",
        "nav.contact": "Контакты",
        "hero.badge": "👋 Добро пожаловать в моё портфолио",
        "hero.title": "Создаю современные цифровые продукты",
        "hero.subtitle": "Frontend Разработчик",
        "hero.desc": "Создаю современные цифровые продукты с фокусом на UX/UI и производительность. Превращаю сложные идеи в элегантные решения.",
        "hero.btn.projects": "Мои проекты",
        "hero.btn.contact": "Связаться со мной",
        "profile.btn.contact": "Связаться",
        "profile.btn.resume": "Скачать резюме",
        "projects.title": "Мои проекты",
        "about.title": "О себе",
        "contact.title": "Контакты",
        "project.demo": "Демо",
        "project.code": "Код на GitHub",
        "project.demo.this": "Демо (этот сайт)",
        "project.demo.soon": "Демо (скоро)",
        "project1.title": "Игра School Anomalies",
        "project1.desc": "Хоррор-игра на Unity, в которой вы заперты в таинственной школе с аномалиями. Интерактивная атмосфера, продвинутый ИИ врагов и динамическое освещение.",
        "project2.title": "Портфолио + Блог",
        "project2.desc": "Личный сайт с интегрированным блогом на Markdown. Адаптивный дизайн, темная тема, поиск по контенту и система комментариев.",
        "project3.title": "Игра на Canvas",
        "project3.desc": "Аркада с использованием HTML5 Canvas. Динамическая физика, система очков, несколько уровней сложности и рекордов.",
        "project4.title": "Приложение-планировщик",
        "project4.desc": "SPA для управления задачами с drag & drop, локальным хранилищем и синхронизацией между устройствами. Интуитивный интерфейс и расширенные фильтры.",
        "about.path.title": "Мой путь",
        "about.path.p1": "Я — frontend-разработчик, который создаёт современные, удобные и визуально аккуратные веб-интерфейсы. В работе делаю упор на адаптивность, чистый код и понятную структуру проектов.",
        "about.path.p2": "Мне нравится создавать сайты, интерактивные элементы и игровые механики с использованием HTML, CSS, JavaScript и Canvas. Также занимаюсь разработкой простых игр и прототипов в Unity.",
        "about.path.p3": "Для меня важно, чтобы продукт был не только красивым, но и удобным для пользователя, поэтому уделяю внимание мелким деталям, скорости загрузки и общему UX.",
        "about.exp.title": "Опыт работы",
        "about.exp.1": "Создание SPA и лендингов для бизнеса",
        "about.exp.2": "Разработка игровых проектов на Unity и Canvas",
        "about.exp.3": "Дизайн и прототипирование интерфейсов в Figma",
        "about.exp.4": "Оптимизация производительности веб-приложений",
        "about.exp.5": "Интеграция с REST API и сторонними сервисами",
        "about.skills.title": "Мои навыки",
        "contact.form.title": "Напишите мне",
        "contact.form.name": "Имя",
        "contact.form.name.placeholder": "Введите ваше имя",
        "contact.form.name.error": "Пожалуйста, введите ваше имя (от 2 до 50 символов)",
        "contact.form.email": "Email",
        "contact.form.email.placeholder": "ваш@email.com",
        "contact.form.email.error": "Пожалуйста, введите корректный email",
        "contact.form.msg": "Сообщение",
        "contact.form.msg.placeholder": "Расскажите о вашем проекте или задайте вопрос...",
        "contact.form.msg.error": "Сообщение должно содержать от 10 до 1000 символов",
        "contact.form.submit": "Отправить сообщение",
        "contact.info.title": "Контактная информация",
        "contact.info.location.label": "Локация",
        "contact.info.location": "Ташкент, Узбекистан (Готов к удаленной работе)",
        "contact.info.email.label": "Email"
    },
    en: {
        "filter.all": "All",
        "filter.unity": "Unity",
        "filter.frontend": "Frontend",
        "filter.js": "JavaScript",
        "filter.vue": "Vue",
        "nav.home": "Home",
        "nav.projects": "Projects",
        "nav.about": "About",
        "nav.contact": "Contact",
        "hero.badge": "👋 Welcome to my portfolio",
        "hero.title": "Building modern digital products",
        "hero.subtitle": "Frontend Developer",
        "hero.desc": "Creating modern digital products focusing on UX/UI and performance. Turning complex ideas into elegant solutions.",
        "hero.btn.projects": "My Projects",
        "hero.btn.contact": "Contact Me",
        "profile.btn.contact": "Contact",
        "profile.btn.resume": "Download Resume",
        "project.demo": "Demo",
        "project.code": "Code on GitHub",
        "project.demo.this": "Demo (this site)",
        "project.demo.soon": "Demo (soon)",
        "project1.title": "School Anomalies Game",
        "project1.desc": "Horror game in Unity where you are trapped in a mysterious school with anomalies. Interactive atmosphere, advanced enemy AI, and dynamic lighting.",
        "project2.title": "Portfolio + Blog",
        "project2.desc": "Personal website with an integrated Markdown blog. Responsive design, dark theme, content search, and commenting system.",
        "project3.title": "Canvas Game",
        "project3.desc": "Arcade game using HTML5 Canvas. Dynamic physics, scoring system, multiple difficulty levels, and high scores.",
        "project4.title": "Task Planner App",
        "project4.desc": "SPA for task management with drag & drop, local storage, and cross-device synchronization. Intuitive interface and advanced filters.",
        "projects.title": "My Projects",
        "about.title": "About Me",
        "contact.title": "Contact",
        "about.path.title": "My Path",
        "about.path.p1": "I am a frontend developer creating modern, user-friendly, and visually clean web interfaces. I focus on responsive design, clean code, and clear project structure.",
        "about.path.p2": "I enjoy building websites, interactive elements, and game mechanics using HTML, CSS, JavaScript, and Canvas. I also develop simple games and prototypes in Unity.",
        "about.path.p3": "It's important to me that a product is not only beautiful but also convenient for the user, so I pay attention to small details, loading speed, and overall UX.",
        "about.exp.title": "Experience",
        "about.exp.1": "Creating SPAs and landing pages for businesses",
        "about.exp.2": "Developing games on Unity and Canvas",
        "about.exp.3": "UI/UX design and prototyping in Figma",
        "about.exp.4": "Web application performance optimization",
        "about.exp.5": "REST API and third-party services integration",
        "about.skills.title": "My Skills",
        "contact.form.title": "Drop me a message",
        "contact.form.name": "Name",
        "contact.form.name.placeholder": "Enter your name",
        "contact.form.name.error": "Please enter your name (2-50 characters)",
        "contact.form.email": "Email",
        "contact.form.email.placeholder": "your@email.com",
        "contact.form.email.error": "Please enter a valid email",
        "contact.form.msg": "Message",
        "contact.form.msg.placeholder": "Tell me about your project or ask a question...",
        "contact.form.msg.error": "Message must be between 10 and 1000 characters",
        "contact.form.submit": "Send Message",
        "contact.info.title": "Contact Information",
        "contact.info.location.label": "Location",
        "contact.info.location": "Tashkent, Uzbekistan (Ready for remote work)",
        "contact.info.email.label": "Email"
    }
};

let currentLang = localStorage.getItem('lang') || 'ru';

function applyTranslations(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = translations[lang][key];
            } else {
                el.textContent = translations[lang][key];
            }
        }
    });
    
    if (langToggleBtn) {
        langToggleBtn.textContent = lang === 'ru' ? 'EN' : 'RU';
    }
}

applyTranslations(currentLang);

if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
        currentLang = currentLang === 'ru' ? 'en' : 'ru';
        localStorage.setItem('lang', currentLang);
        applyTranslations(currentLang);
    });
}