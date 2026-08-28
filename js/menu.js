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
    // КЛЮЧ ДЛЯ ХРАНЕНИЯ СОСТОЯНИЯ РЕДИРЕКТА
    // ========================================
    const REDIRECT_DONE_KEY = 'mySiteRedirectDone';
    
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

    // ---------- АВТООПРЕДЕЛЕНИЕ ЯЗЫКА БРАУЗЕРА ----------
    function detectBrowserLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;
        const langCode = browserLang.substring(0, 2).toLowerCase();
        
        if (AVAILABLE_LANGUAGES.includes(langCode)) {
            return langCode;
        }
        
        for (let lang of AVAILABLE_LANGUAGES) {
            if (browserLang.toLowerCase().startsWith(lang)) {
                return lang;
            }
        }
        
        return DEFAULT_LANGUAGE;
    }

    // ---------- ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ----------
    
    function getCurrentLanguage() {
        const path = window.location.pathname;
        const fileName = path.split('/').pop() || 'index.html';
        
        for (let lang of AVAILABLE_LANGUAGES) {
            if (fileName.includes('-' + lang + '.')) {
                return lang;
            }
        }
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

    // ---------- ПРОВЕРКА И ПЕРЕНАПРАВЛЕНИЕ НА ЯЗЫК БРАУЗЕРА ----------
    function redirectToBrowserLanguage() {
        // ============================================
        // ПРОВЕРЯЕМ, БЫЛ ЛИ УЖЕ СДЕЛАН РЕДИРЕКТ
        // ============================================
        const redirectDone = sessionStorage.getItem(REDIRECT_DONE_KEY);
        if (redirectDone === 'true') {
            // Редирект уже был выполнен ранее в этой сессии
            return false;
        }

        const path = window.location.pathname;
        const fileName = path.split('/').pop() || 'index.html';
        
        // Проверяем, есть ли уже язык в URL
        let hasLanguage = false;
        for (let lang of AVAILABLE_LANGUAGES) {
            if (fileName.includes('-' + lang + '.')) {
                hasLanguage = true;
                break;
            }
        }
        
        // Если язык уже указан в URL, запоминаем и выходим
        if (hasLanguage) {
            sessionStorage.setItem(REDIRECT_DONE_KEY, 'true');
            return false;
        }
        
        // Определяем язык браузера
        const browserLang = detectBrowserLanguage();
        const currentPage = getCurrentPage();
        
        // Если язык браузера не английский (или не совпадает с текущим)
        if (browserLang !== DEFAULT_LANGUAGE) {
            const newFileName = getFileName(currentPage, browserLang);
            
            if (fileName !== newFileName) {
                // Запоминаем, что редирект выполнен
                sessionStorage.setItem(REDIRECT_DONE_KEY, 'true');
                window.location.href = newFileName;
                return true;
            }
        }
        
        // Если редирект не нужен, просто запоминаем
        sessionStorage.setItem(REDIRECT_DONE_KEY, 'true');
        return false;
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
                window.location.href = newFileName;
            });
        }

        const navButtons = document.querySelectorAll('.nav-btn');
        navButtons.forEach(button => {
            button.addEventListener('click', function() {
                const pageId = this.dataset.page;
                const currentLang = getCurrentLanguage();
                let fileName = getFileName(pageId, currentLang);
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
            if (!redirectToBrowserLanguage()) {
                buildMenu();
                updatePageContent();
                setupMobileLanguageSelector();
            }
        });
    } else {
        if (!redirectToBrowserLanguage()) {
            buildMenu();
            updatePageContent();
            setupMobileLanguageSelector();
        }
    }

    window.addEventListener('pageshow', function() {
        updatePageContent();
    });

})();