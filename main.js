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

        // Безопасное добавление обработчиков событий
        function safeAddEvent(id, event, handler) {
            const el = document.getElementById(id);
            if (el) el.addEventListener(event, handler);
        }

        // 1. Кнопка скачивания резюме
        safeAddEvent("resumeBtn", "click", function(e) {
            e.preventDefault();
            if (resumeModal) {
                resumeModal.classList.add("active");
                resumeModal.setAttribute("aria-hidden", "false");
                const closeBtn = document.getElementById("modalClose");
                if (closeBtn) closeBtn.focus();
                if (isMobile) document.activeElement.blur();
            }
        });

        // Закрытие модального окна
        safeAddEvent("modalClose", "click", function() {
            if (resumeModal) {
                resumeModal.classList.remove("active");
                resumeModal.setAttribute("aria-hidden", "true");
            }
        });

        // Закрытие модального окна при клике вне его
        if (resumeModal) {
            resumeModal.addEventListener("click", function(e) {
                if (e.target === this) {
                    this.classList.remove("active");
                    this.setAttribute("aria-hidden", "true");
                }
            });
        }

        // Закрытие модального окна по Escape
        document.addEventListener("keydown", function(e) {
            if (e.key === "Escape" && resumeModal && resumeModal.classList.contains("active")) {
                resumeModal.classList.remove("active");
                resumeModal.setAttribute("aria-hidden", "true");
            }
        });

        // Скачивание резюме
        safeAddEvent("downloadResume", "click", function(e) {
            e.preventDefault();
            if (config.resumeUrl.includes("YOUR_FILE_ID")) {
                showNotification("error", "Ошибка", "Ссылка на резюме не настроена. Пожалуйста, запросите резюме по email.");
                return;
            }
            showNotification("success", "Скачивание началось", "Резюме скачивается...");
            if (isMobile) {
                window.location.href = config.resumeUrl;
            } else {
                window.open(config.resumeUrl, "_blank");
            }
            setTimeout(() => {
                if (resumeModal) {
                    resumeModal.classList.remove("active");
                    resumeModal.setAttribute("aria-hidden", "true");
                }
            }, 500);
        });

        // Просмотр резюме онлайн
        safeAddEvent("viewResume", "click", function(e) {
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
            if (resumeModal) {
                resumeModal.classList.remove("active");
                resumeModal.setAttribute("aria-hidden", "true");
            }
        });

        // 2. Кнопки проектов
        function setupProjectButtons() {
            safeAddEvent("project1Demo", "click", function(e) {
                e.preventDefault();
                if (this.classList.contains("disabled")) {
                    showNotification("info", "В разработке", "Демо этого проекта будет доступно в ближайшее время!");
                } else {
                    window.open(this.href, "_blank");
                }
            });
            
            safeAddEvent("project1Code", "click", function(e) {
                e.preventDefault();
                window.open(this.href, "_blank");
            });

            safeAddEvent("project2Demo", "click", function(e) {
                e.preventDefault();
                const homeEl = document.querySelector('#home');
                if (homeEl) homeEl.scrollIntoView({ behavior: 'smooth' });
            });
            
            safeAddEvent("project2Code", "click", function(e) {
                e.preventDefault();
                window.open(this.href, "_blank");
            });

            safeAddEvent("project3Code", "click", function(e) {
                e.preventDefault();
                window.open(this.href, "_blank");
            });

            safeAddEvent("project4Code", "click", function(e) {
                e.preventDefault();
                window.open(this.href, "_blank");
            });
        }

        // 3. Социальные кнопки
        function setupSocialButtons() {
            safeAddEvent("telegramBtn", "click", function(e) {
                e.preventDefault();
                window.open(this.href, "_blank");
            });
            
            safeAddEvent("githubBtn", "click", function(e) {
                e.preventDefault();
                window.open(this.href, "_blank");
            });
            
            safeAddEvent("linkedinBtn", "click", function(e) {
                e.preventDefault();
                window.open(this.href, "_blank");
            });

            safeAddEvent("footerGithub", "click", function(e) {
                e.preventDefault();
                window.open(this.href, "_blank");
            });
            
            safeAddEvent("footerTelegram", "click", function(e) {
                e.preventDefault();
                window.open(this.href, "_blank");
            });
            
            safeAddEvent("footerLinkedin", "click", function(e) {
                e.preventDefault();
                window.open(this.href, "_blank");
            });
            
            safeAddEvent("footerInstagram", "click", function(e) {
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

        // ========== АНИМАЦИИ И ЭФФЕКТЫ (HIGH-PERFORMANCE) ==========

        // Следящий за курсором элемент и параллакс (только для десктопов с rAF и translate3d)
        if (!isMobile) {
            const parallaxElements = document.querySelectorAll(".parallax-element");
            let mouseX = 0, mouseY = 0;
            let isHovered = false;
            let rafScheduled = false;

            document.addEventListener("mousemove", (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;

                if (!rafScheduled) {
                    rafScheduled = true;
                    requestAnimationFrame(() => {
                        // Обновляем курсор через translate3d (GPU-композитинг без reflow)
                        if (cursorFollower) {
                            const scaleStr = isHovered ? " scale(1.8)" : " scale(1)";
                            cursorFollower.style.transform = `translate3d(${mouseX - 10}px, ${mouseY - 10}px, 0)${scaleStr}`;
                        }

                        // Обновляем параллакс
                        if (parallaxElements.length > 0) {
                            const normX = mouseX / window.innerWidth;
                            const normY = mouseY / window.innerHeight;
                            const speed = 0.05;
                            const xMove = (normX - 0.5) * speed * 100;
                            const yMove = (normY - 0.5) * speed * 100;

                            parallaxElements.forEach((el) => {
                                el.style.transform = `translate3d(${xMove}px, ${yMove}px, 0)`;
                            });
                        }

                        rafScheduled = false;
                    });
                }
            }, { passive: true });

            if (cursorFollower) {
                // Делегирование событий наведения для максимальной производительности
                document.addEventListener("mouseover", (e) => {
                    if (e.target.closest("a, button, .glass-card, .pricing-card, .calc-card, .project-link, .social-btn")) {
                        isHovered = true;
                        cursorFollower.style.background = "rgba(102, 126, 234, 0.12)";
                    }
                }, { passive: true });

                document.addEventListener("mouseout", (e) => {
                    if (e.target.closest("a, button, .glass-card, .pricing-card, .calc-card, .project-link, .social-btn")) {
                        isHovered = false;
                        cursorFollower.style.background = "rgba(102, 126, 234, 0.2)";
                    }
                }, { passive: true });
            }
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
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                el.classList.add("visible");
            }
        });

        // Оптимизированный прогресс прокрутки и навигация через requestAnimationFrame
        const headerEl = document.querySelector(".header-container");
        const sectionsList = document.querySelectorAll("section[id]");
        const navAnchorList = document.querySelectorAll("nav a");
        let scrollScheduled = false;

        window.addEventListener("scroll", () => {
            if (!scrollScheduled) {
                scrollScheduled = true;
                requestAnimationFrame(() => {
                    const scrollPos = window.scrollY;
                    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                    
                    if (scrollProgress && docHeight > 0) {
                        scrollProgress.style.width = (scrollPos / docHeight) * 100 + "%";
                    }

                    // Эффект для хедера при прокрутке
                    if (headerEl) {
                        if (scrollPos > 50) {
                            headerEl.classList.add("scrolled");
                        } else {
                            headerEl.classList.remove("scrolled");
                        }
                    }

                    // Активное состояние навигации
                    if (sectionsList.length > 0 && navAnchorList.length > 0) {
                        let currentId = "";
                        sectionsList.forEach((section) => {
                            if (scrollPos >= section.offsetTop - 200) {
                                currentId = section.getAttribute("id");
                            }
                        });

                        navAnchorList.forEach((link) => {
                            const href = link.getAttribute("href");
                            if (href && href.startsWith("#")) {
                                if (href.substring(1) === currentId) {
                                    link.classList.add("active");
                                } else {
                                    link.classList.remove("active");
                                }
                            }
                        });
                    }

                    scrollScheduled = false;
                });
            }
        }, { passive: true });

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
// // Language switching and translations are handled in translations.js
console.log("✅ Portfolio scripts initialized successfully");