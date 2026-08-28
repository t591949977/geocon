// ============================================
// ЕДИНЫЙ ФАЙЛ МЕНЮ ДЛЯ ВСЕХ СТРАНИЦ
// (Версия для файлов в корневой папке)
// ============================================

(function() {
    'use strict';

    // ---------- ПРОВЕРКА НА МОБИЛЬНОЕ УСТРОЙСТВО ----------
    function isMobile() {
        return window.innerWidth <= 768;
    }

    // ---------- НАСТРОЙКИ ----------
    const AVAILABLE_LANGUAGES = ['de', 'en', 'es', 'fr', 'it', 'ka', 'ru', 'tr'];
    const DEFAULT_LANGUAGE = 'en';
    
    // ========================================
    // КОНФИГУРАЦИЯ СТРАНИЦ
    // ========================================
    const pagesConfig = [
        {
            id: 'index',
            titles: {
                de: 'Die Saison der strengen Mäntel, voluminösen Schals und strukturierten Strickwaren.',
                en: 'The season of tailored coats, oversized scarves, and textured knitwear',
                es: 'La temporada de los abrigos estructurados, las bufandas voluminosas y el punto texturizado.',
                fr: "La saison des manteaux stricts, des écharpes volumineuses et du tricot texturé.",
                it: 'La stagione dei cappotti rigorosi, delle sciarpe voluminose e della maglieria strutturata.',
                ka: 'მკაცრი ქურთუკების, მოცულობითი შარფების და ტექსტურირებული ნაქსოვი ტანსაცმლის სეზონი.',
                ru: 'Сезон строгих пальто, объемных шарфов и фактурного трикотажа.',
                tr: 'Sert montların, hacimli atkıların ve dokulu örgülerin mevsimi.'
            }
        },
        {
            id: 'index2',
            titles: {
                de: 'Sommer mode ist ein Manifest der Leichtigkeit, ausgedrückt in schwerelosen Stoffen.',
                en: 'Summer fashion is a manifesto of lightness, expressed in weightless fabrics.',
                es: 'La moda veraniega es un manifiesto de ligereza, expresado en tejidos ingrávidos.',
                fr: "La mode estivale est un manifeste de légèreté, exprimé dans des tissus légers comme l'air.",
                it: 'La moda estiva è un manifesto di leggerezza, espresso in tessuti senza peso.',
                ka: 'ზაფხულის მოდა არის სიმსუბუქის მანიფესტი, გამოხატული უწონო ქსოვილებში.',
                ru: 'Летняя мода — это манифест легкости, выраженный в невесомых тканях.',
                tr: 'Yaz modası, ağırlıksız kumaşlarda ifade edilen bir hafiflik manifestosudu'
            }
        },
        {
            id: 'about',
            titles: {
                de: 'Über uns',
                en: 'About Us',
                es: 'Sobre nosotros',
                fr: 'À propos de nous',
                it: 'Chi siamo',
                ka: 'ჩვენს შესახებ',
                ru: 'О нас',
                tr: 'Hakkımızda'
            }
        },
        {
            id: 'services',
            titles: {
                de: 'Unsere Dienstleistungen',
                en: 'Our Services',
                es: 'Nuestros servicios',
                fr: 'Nos services',
                it: 'I nostri servizi',
                ka: 'ჩვენი მომსახურება',
                ru: 'Наши услуги',
                tr: 'Hizmetlerimiz'
            }
        },
        {
            id: 'contacts',
            titles: {
                de: 'Kontakt',
                en: 'Contacts',
                es: 'Contactos',
                fr: 'Contacts',
                it: 'Contatti',
                ka: 'კონტაქტები',
                ru: 'Контакты',
                tr: 'İletişim'
            }
        }
    ];

    // Названия языков для выпадающего списка
    const languageNames = {
        de: 'Deutsch',
        en: 'English',
        es: 'Español',
        fr: 'Français',
        it: 'Italiano',
        ka: 'ქართული',
        ru: 'Русский',
        tr: 'Türkçe'
    };

    // ---------- ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ----------
    
    function getCurrentLanguage() {
        const path = window.location.pathname;
        const fileName = path.split('/').pop() || 'index.html';
        
        // ОТЛАДКА: выводим имя файла в консоль
        console.log('🔍 Текущий файл:', fileName);
        
        for (let lang of AVAILABLE_LANGUAGES) {
            if (fileName.includes('-' + lang + '.')) {
                console.log('✅ Найден язык:', lang);
                return lang;
            }
        }
        
        console.log('⚠️ Язык не найден, используем DEFAULT:', DEFAULT_LANGUAGE);
        return DEFAULT_LANGUAGE;
    }

    function getCurrentPage() {
        const path = window.location.pathname;
        const fileName = path.split('/').pop() || 'index.html';
        
        let baseName = fileName.replace(/\.html$/, '');
        for (let lang of AVAILABLE_LANGUAGES) {
            if (baseName.endsWith('-' + lang)) {
                baseName = baseName.replace('-' + lang, '');
                break;
            }
        }
        return baseName;
    }

    function getFileName(pageId, lang) {
        if (lang === DEFAULT_LANGUAGE) {
            return pageId + '.html';
        }
        return pageId + '-' + lang + '.html';
    }

    function getPageTitle(pageId, lang) {
        const page = pagesConfig.find(p => p.id === pageId);
        if (!page) return pageId;
        return page.titles[lang] || page.titles[DEFAULT_LANGUAGE] || pageId;
    }

    // ---------- ОБНОВЛЕНИЕ МОБИЛЬНОГО ВЫБОРА ЯЗЫКА ----------
    function updateMobileLanguageSelector() {
        const mobileSelect = document.getElementById('mobileLanguageSelect');
        if (!mobileSelect) return;
        
        const currentLang = getCurrentLanguage();
        mobileSelect.value = currentLang;
    }

    // ---------- СОЗДАНИЕ ДЕСКТОПНОГО МЕНЮ ----------
    function buildMenu() {
        if (isMobile()) {
            const menuContainer = document.getElementById('menuContainer');
            if (menuContainer) {
                menuContainer.innerHTML = '';
            }
            updateMobileLanguageSelector();
            return;
        }

        const currentLang = getCurrentLanguage();
        const currentPage = getCurrentPage();

        console.log('📌 Текущий язык:', currentLang);
        console.log('📌 Текущая страница:', currentPage);

        const menuContainer = document.getElementById('menuContainer');
        if (!menuContainer) {
            console.error('Контейнер #menuContainer не найден!');
            return;
        }

        let menuHTML = `
            <div class="vertical-menu">
                <div class="language-selector">
                    <select id="languageSelect">
        `;

        AVAILABLE_LANGUAGES.forEach(lang => {
            const selected = lang === currentLang ? 'selected' : '';
            menuHTML += `
                <option value="${lang}" ${selected}>${languageNames[lang]}</option>
            `;
        });

        menuHTML += `
                    </select>
                </div>

                <div class="nav-buttons" id="navButtons">
        `;

        pagesConfig.forEach((page, index) => {
            const pageTitle = getPageTitle(page.id, currentLang);
            const isActive = page.id === currentPage ? 'active' : '';
            const number = (index + 1).toString().padStart(2, '0');
            
            menuHTML += `
                <button class="nav-btn ${isActive}" data-page="${page.id}">
                    <span class="btn-number">${number}</span>
                    <span class="btn-text">${pageTitle}</span>
                </button>
            `;
        });

        menuHTML += `
                </div>
            </div>
        `;

        menuContainer.innerHTML = menuHTML;

        // ---------- ОБРАБОТЧИКИ СОБЫТИЙ (ДЕСКТОП) ----------

        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) {
            languageSelect.addEventListener('change', function(e) {
                const newLang = this.value;
                const currentPageId = getCurrentPage();
                let newFileName = getFileName(currentPageId, newLang);
                console.log('🔄 Переключение языка на:', newLang, '→', newFileName);
                window.location.href = newFileName;
            });
        }

        const navButtons = document.querySelectorAll('.nav-btn');
        navButtons.forEach(button => {
            button.addEventListener('click', function() {
                const pageId = this.dataset.page;
                const currentLang = getCurrentLanguage();
                let fileName = getFileName(pageId, currentLang);
                console.log('🔗 Переход на страницу:', pageId, '→', fileName);
                window.location.href = fileName;
            });
        });
    }

    // ---------- ОБНОВЛЕНИЕ КОНТЕНТА ----------
    function updatePageContent() {
        const currentLang = getCurrentLanguage();
        const currentPage = getCurrentPage();

        const pageTitle = document.getElementById('pageTitle');
        if (pageTitle) {
            const title = getPageTitle(currentPage, currentLang);
            pageTitle.textContent = title;
        }

        const title = getPageTitle(currentPage, currentLang);
        document.title = title + ' | MySite';

        updateMobileLanguageSelector();
    }

    // ---------- ОБРАБОТЧИКИ СОБЫТИЙ (МОБИЛЬНЫЙ ВЫБОР ЯЗЫКА) ----------
    function setupMobileLanguageSelector() {
        const mobileSelect = document.getElementById('mobileLanguageSelect');
        if (!mobileSelect) return;

        mobileSelect.addEventListener('change', function(e) {
            const newLang = this.value;
            const currentPageId = getCurrentPage();
            let newFileName = getFileName(currentPageId, newLang);
            console.log('📱 Мобильный выбор языка:', newLang, '→', newFileName);
            window.location.href = newFileName;
        });
    }

    // ---------- ОБРАБОТЧИК ИЗМЕНЕНИЯ РАЗМЕРА ЭКРАНА ----------
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            buildMenu();
            updatePageContent();
        }, 250);
    });

    // ---------- ЗАПУСК ----------
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            console.log('🚀 DOM загружен');
            buildMenu();
            updatePageContent();
            setupMobileLanguageSelector();
        });
    } else {
        console.log('🚀 DOM уже загружен');
        buildMenu();
        updatePageContent();
        setupMobileLanguageSelector();
    }

    window.addEventListener('pageshow', function() {
        console.log('📄 Страница показана');
        updatePageContent();
    });

})();