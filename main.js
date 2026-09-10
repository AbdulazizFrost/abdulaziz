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
                telegram: "https://t.me/Abdulaziz5335",
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
        "filter.bots": "Telegram-боты",
        "filter.frontend": "Frontend & Сайты",
        "filter.js": "JavaScript",
        "filter.unity": "Unity & Games",
        "filter.vue": "Vue",
        "nav.home": "Главная",
        "nav.services": "Услуги и цены",
        "nav.projects": "Проекты",
        "nav.about": "Обо мне",
        "nav.contact": "Контакты",
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
        "profile.title": "Web & Bot Developer",
        "profile.desc": "Специализируюсь на создании Telegram-ботов для автоматизации бизнеса и современных продающих сайтов с высокой конверсией.",
        "profile.btn.tg": "Заказать в Telegram",
        "profile.btn.calc": "Рассчитать стоимость",
        "profile.btn.contact": "Связаться",
        "profile.btn.resume": "Скачать резюме",
        "services.title": "Услуги и стоимость",
        "services.subtitle": "Готовые решения для малого и среднего бизнеса. Фиксированные цены, понятные сроки и техническая поддержка.",
        "services.tier1.badge": "Быстрый старт",
        "services.tier1.title": "Telegram-боты для бизнеса",
        "services.tier1.desc": "Автоматизация приема заявок, каталог товаров и запись клиентов 24/7 без зарплаты менеджеру.",
        "services.tier1.sum": "/ ~850 000 сум",
        "services.tier1.time": "Срок: 2–4 дня",
        "services.tier1.f1": "Интерактивное меню и прайс-лист",
        "services.tier1.f2": "Сбор заявок, номеров телефонов и имен",
        "services.tier1.f3": "Мгновенные оповещения вам в Telegram",
        "services.tier1.f4": "Интеграция с Google Таблицами / CRM",
        "services.tier1.f5": "14 дней бесплатной поддержки",
        "services.tier1.btn": "Заказать бота",
        "services.tier2.badge": "Высокая конверсия",
        "services.tier2.title": "Продающие сайты и Лендинги",
        "services.tier2.desc": "Современный быстрый одностраничник под ключ для запуска рекламы в Instagram, Яндекс и Google.",
        "services.tier2.sum": "/ ~1 200 000 сум",
        "services.tier2.time": "Срок: 3–5 дней",
        "services.tier2.f1": "Адаптивный дизайн (Смартфон / ПК)",
        "services.tier2.f2": "Молниеносная скорость загрузки",
        "services.tier2.f3": "Заявки с сайта прямо в Telegram / Email",
        "services.tier2.f4": "Базовая SEO-оптимизация",
        "services.tier2.f5": "Бесплатный хостинг и домен в подарок",
        "services.tier2.btn": "Заказать сайт",
        "services.tier3.popular": "🔥 ХИТ ПРОДАЖ (ВЫГОДА 25%)",
        "services.tier3.badge": "Всё включено",
        "services.tier3.title": "Комплект «Сайт + Бот под ключ»",
        "services.tier3.desc": "Полная воронка продаж: продающий сайт для рекламы + Telegram-бот для автоматического закрытия сделок.",
        "services.tier3.sum": "/ ~1 800 000 сум",
        "services.tier3.time": "Срок: 5–7 дней",
        "services.tier3.f1": "Полноценный продающий сайт",
        "services.tier3.f2": "Telegram-бот автоответчик и сборщик лидов",
        "services.tier3.f3": "Сквозная связка «Сайт ➔ Бот ➔ Уведомления»",
        "services.tier3.f4": "Помощь с запуском первой рекламы",
        "services.tier3.f5": "30 дней технического сопровождения",
        "services.tier3.btn": "Заказать под ключ",
        "calc.badge": "⚡ Интерактивный расчет",
        "calc.title": "Калькулятор стоимости вашего проекта",
        "calc.subtitle": "Выберите нужные опции и получите моментальный предварительный расчет",
        "calc.type.title": "1. Что необходимо разработать?",
        "calc.type.bot": "Telegram-бот",
        "calc.type.bot.sub": "Автоматизация, меню, запись ($70)",
        "calc.type.site": "Лендинг / Одностраничник",
        "calc.type.site.sub": "Продающий сайт под ключ ($100)",
        "calc.type.combo": "Комплект «Сайт + Бот»",
        "calc.type.combo.sub": "Единая система со скидкой ($150)",
        "calc.addons.title": "2. Дополнительные опции:",
        "calc.opt.payment": "Онлайн-оплата (Click / Payme / Карты) (+$30)",
        "calc.opt.crm": "Интеграция с CRM / Google Таблицами (+$25)",
        "calc.opt.multilang": "Мультиязычность (Русский / O'zbek / English) (+$20)",
        "calc.opt.fast": "Срочный запуск за 48 часов (+$35)",
        "calc.result.label": "Ориентировочная стоимость:",
        "calc.btn.order": "Отправить расчет в Telegram",
        "calc.note": "* Точная стоимость фиксируется после согласования технического задания",
        "projects.title": "Мои проекты",
        "projectBot.title": "Telegram-бот для бизнеса «Lead & Order»",
        "projectBot.desc": "Автоматизированный Telegram-бот для онлайн-записи клиентов и приема заказов. Каталог услуг, FSM-сценарий сбора контактов, мгновенные уведомления администратору в личку.",
        "projectBot.demo": "Демо в Telegram",
        "projectBot.order": "Заказать такого",
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
        "about.path.p1": "Я — разработчик Telegram-ботов и веб-сайтов, создающий современные, конвертирующие и удобные решения для бизнеса. В работе делаю упор на скорость, надежность и увеличение продаж клиентов.",
        "about.path.p2": "Разрабатываю ботов на Python (aiogram 3) и быстрые сайты с чистым кодом и современным UI. Превращаю рутинные процессы бизнеса в удобную автоматизацию.",
        "about.path.p3": "Для меня важно, чтобы каждый проект приносил реальную пользу и прибыль заказчику, поэтому я сопровождаю проекты и после запуска.",
        "about.exp.title": "Опыт и компетенции",
        "about.exp.1": "Разработка Telegram-ботов (запись, каталоги, автоворонки, оплата)",
        "about.exp.2": "Создание адаптивных продающих сайтов и лендингов для рекламы",
        "about.exp.3": "Интеграция ботов с CRM, Google Таблицами и платежными системами",
        "about.exp.4": "UI/UX дизайн интерфейсов и прототипирование в Figma",
        "about.exp.5": "Оптимизация скорости загрузки (PageSpeed 95+) и базовое SEO",
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
        "contact.info.location": "Ташкент / Ургенч, Узбекистан (Готов к проектам по всему миру)",
        "contact.info.email.label": "Email",
        "footer.text": "Web & Telegram Bots Developer"
    },
    en: {
        "filter.all": "All",
        "filter.bots": "Telegram Bots",
        "filter.frontend": "Frontend & Websites",
        "filter.js": "JavaScript",
        "filter.unity": "Unity & Games",
        "filter.vue": "Vue",
        "nav.home": "Home",
        "nav.services": "Services & Pricing",
        "nav.projects": "Projects",
        "nav.about": "About",
        "nav.contact": "Contact",
        "hero.badge": "🚀 Custom Telegram Bots & Websites for Business",
        "hero.title": "Building Telegram Bots & High-Converting Websites",
        "hero.subtitle": "Web & Bot Developer",
        "hero.desc": "Helping businesses automate lead capture 24/7 and scale revenue through smart Telegram bots and high-converting modern websites.",
        "hero.btn.services": "Services & Pricing",
        "hero.btn.projects": "My Projects",
        "hero.btn.contact": "Contact Me",
        "hero.stat.projects": "Completed Tasks",
        "hero.stat.speed": "Fast Delivery",
        "hero.stat.guarantee": "Result Guarantee",
        "profile.title": "Web & Bot Developer",
        "profile.desc": "Specializing in building Telegram bots for business automation and modern high-converting websites.",
        "profile.btn.tg": "Order in Telegram",
        "profile.btn.calc": "Calculate Price",
        "profile.btn.contact": "Contact",
        "profile.btn.resume": "Download Resume",
        "services.title": "Services & Pricing",
        "services.subtitle": "Turnkey solutions for small and medium businesses. Transparent pricing, clear deadlines, and technical support.",
        "services.tier1.badge": "Quick Start",
        "services.tier1.title": "Telegram Bots for Business",
        "services.tier1.desc": "Automated order taking, product catalog, and 24/7 appointment booking without paying extra staff.",
        "services.tier1.sum": "/ ~$70 USD",
        "services.tier1.time": "Timeframe: 2–4 days",
        "services.tier1.f1": "Interactive menu and price list",
        "services.tier1.f2": "Lead capture, phone numbers, and names",
        "services.tier1.f3": "Instant notifications directly to your Telegram",
        "services.tier1.f4": "Google Sheets / CRM integration",
        "services.tier1.f5": "14 days of free warranty support",
        "services.tier1.btn": "Order Telegram Bot",
        "services.tier2.badge": "High Conversion",
        "services.tier2.title": "Landing Pages & Websites",
        "services.tier2.desc": "Modern, fast turnkey landing pages designed to convert ads from Instagram, Google, and Yandex.",
        "services.tier2.sum": "/ ~$100 USD",
        "services.tier2.time": "Timeframe: 3–5 days",
        "services.tier2.f1": "Responsive design (Mobile & Desktop)",
        "services.tier2.f2": "Lightning fast loading speed",
        "services.tier2.f3": "Direct lead forwarding to Telegram / Email",
        "services.tier2.f4": "Basic SEO optimization",
        "services.tier2.f5": "Free hosting and domain setup",
        "services.tier2.btn": "Order Website",
        "services.tier3.popular": "🔥 BESTSELLER (SAVE 25%)",
        "services.tier3.badge": "All Inclusive",
        "services.tier3.title": "Bundle «Website + Telegram Bot»",
        "services.tier3.desc": "Complete sales funnel: high-converting landing page for ads + smart Telegram bot to close deals automatically.",
        "services.tier3.sum": "/ ~$150 USD",
        "services.tier3.time": "Timeframe: 5–7 days",
        "services.tier3.f1": "Full-featured commercial landing page",
        "services.tier3.f2": "Telegram bot auto-responder & lead collector",
        "services.tier3.f3": "Seamless integration: Web ➔ Bot ➔ Notifications",
        "services.tier3.f4": "Assistance setting up initial advertising",
        "services.tier3.f5": "30 days of free ongoing support",
        "services.tier3.btn": "Order Turnkey Bundle",
        "calc.badge": "⚡ Interactive Estimator",
        "calc.title": "Project Price Calculator",
        "calc.subtitle": "Select your requirements and get an instant transparent quote",
        "calc.type.title": "1. What do you need built?",
        "calc.type.bot": "Telegram Bot",
        "calc.type.bot.sub": "Automation, menu, bookings ($70)",
        "calc.type.site": "Landing Page / Website",
        "calc.type.site.sub": "High-converting site ($100)",
        "calc.type.combo": "Bundle «Website + Bot»",
        "calc.type.combo.sub": "Unified sales system ($150)",
        "calc.addons.title": "2. Extra Features:",
        "calc.opt.payment": "Online Payments (Click / Payme / Stripe) (+$30)",
        "calc.opt.crm": "CRM / Google Sheets Integration (+$25)",
        "calc.opt.multilang": "Multi-language support (RU / UZ / EN) (+$20)",
        "calc.opt.fast": "Express Delivery in 48h (+$35)",
        "calc.result.label": "Estimated Cost:",
        "calc.btn.order": "Send Quote to Telegram",
        "calc.note": "* Exact pricing is finalized after brief review",
        "projects.title": "My Projects",
        "projectBot.title": "Business Telegram Bot «Lead & Order»",
        "projectBot.desc": "Automated Telegram bot for appointment booking and service orders. Product catalog, FSM lead capture, and instant notifications to admin.",
        "projectBot.demo": "Demo in Telegram",
        "projectBot.order": "Order Similar",
        "about.title": "About Me",
        "contact.title": "Contact",
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
        "about.path.title": "My Path",
        "about.path.p1": "I am a web and Telegram bot developer delivering modern, high-converting digital solutions for business. I focus on speed, reliability, and growing customer revenue.",
        "about.path.p2": "I develop robust bots using Python (aiogram 3) and clean, responsive websites. I turn repetitive business chores into effortless automation.",
        "about.path.p3": "Every project should bring real tangible ROI to my clients, which is why I provide continued post-launch support.",
        "about.exp.title": "Core Skills & Experience",
        "about.exp.1": "Custom Telegram bots (bookings, catalogs, funnels, payments)",
        "about.exp.2": "High-converting responsive landing pages for online ads",
        "about.exp.3": "Integrations with CRM, Google Sheets, and payment gateways",
        "about.exp.4": "UI/UX interface prototyping in Figma",
        "about.exp.5": "Performance optimization (PageSpeed 95+) and foundational SEO",
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
        "contact.info.location": "Tashkent / Urgench, Uzbekistan (Worldwide Remote)",
        "contact.info.email.label": "Email",
        "footer.text": "Web & Telegram Bots Developer"
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
        updateCalculator();
    });
}

// ====================================================
// INTERACTIVE PRICE CALCULATOR LOGIC
// ====================================================
function initCalculator() {
    const radioInputs = document.querySelectorAll('input[name="projectType"]');
    const checkboxInputs = document.querySelectorAll('.calc-checkbox-group input[type="checkbox"]');
    const priceUsdEl = document.getElementById('calcPriceUSD');
    const priceUzsEl = document.getElementById('calcPriceUZS');
    const timeEl = document.getElementById('calcTime');
    const tgBtn = document.getElementById('calcTelegramBtn');

    if (!priceUsdEl || !tgBtn) return;

    function updateCalculator() {
        let basePrice = 70;
        let projectTitle = "Telegram-бот";
        let days = "2–4 дня";

        const selectedRadio = document.querySelector('input[name="projectType"]:checked');
        if (selectedRadio) {
            if (selectedRadio.value === 'bot') {
                basePrice = 70;
                projectTitle = currentLang === 'ru' ? "Telegram-бот для бизнеса" : "Business Telegram Bot";
                days = currentLang === 'ru' ? "Срок: 2–3 дня" : "Time: 2–3 days";
            } else if (selectedRadio.value === 'site') {
                basePrice = 100;
                projectTitle = currentLang === 'ru' ? "Продающий сайт-лендинг" : "Landing Page";
                days = currentLang === 'ru' ? "Срок: 3–5 дней" : "Time: 3–5 days";
            } else if (selectedRadio.value === 'combo') {
                basePrice = 150;
                projectTitle = currentLang === 'ru' ? "Комплект «Сайт + Telegram-бот»" : "Bundle «Website + Telegram Bot»";
                days = currentLang === 'ru' ? "Срок: 5–7 дней" : "Time: 5–7 days";
            }
        }

        let extraTotal = 0;
        let selectedAddons = [];

        checkboxInputs.forEach(cb => {
            if (cb.checked) {
                const val = parseInt(cb.value, 10) || 0;
                extraTotal += val;
                const parentLabel = cb.closest('label');
                if (parentLabel) {
                    const text = parentLabel.querySelector('span:last-child')?.textContent.trim();
                    if (text) selectedAddons.push(text);
                }
            }
        });

        const fastCheckbox = document.getElementById('opt-fast');
        if (fastCheckbox && fastCheckbox.checked) {
            days = currentLang === 'ru' ? "Срочно: 24–48 часов ⚡" : "Express: 24–48 hours ⚡";
        }

        const totalPriceUSD = basePrice + extraTotal;
        const uzsRate = 12600; // примерный курс
        const totalPriceUZS = Math.round((totalPriceUSD * uzsRate) / 50000) * 50000;
        const formattedUZS = totalPriceUZS.toLocaleString('ru-RU');

        priceUsdEl.textContent = `$${totalPriceUSD}`;
        priceUzsEl.textContent = `~ ${formattedUZS} сум`;
        timeEl.innerHTML = `<i class="far fa-clock"></i> ${days}`;

        // Формирование ссылки в Telegram с готовым текстом
        let messageText = `Здравствуйте, Абдулазиз! Я рассчитал проект на вашем сайте:\n\n`;
        messageText += `🔹 Услуга: ${projectTitle}\n`;
        if (selectedAddons.length > 0) {
            messageText += `🔹 Доп. опции:\n - ${selectedAddons.join('\n - ')}\n`;
        }
        messageText += `🔹 Ориентир по бюджету: $${totalPriceUSD} (~${formattedUZS} сум)\n`;
        messageText += `\nХочу обсудить детали и запустить проект!`;

        const encodedMsg = encodeURIComponent(messageText);
        tgBtn.href = `https://t.me/Abdulaziz5335?text=${encodedMsg}`;
    }

    radioInputs.forEach(r => r.addEventListener('change', updateCalculator));
    checkboxInputs.forEach(c => c.addEventListener('change', updateCalculator));

    updateCalculator();
}

initCalculator();