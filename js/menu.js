// ============================================
// ЕДИНЫЙ ФАЙЛ МЕНЮ ДЛЯ ВСЕХ СТРАНИЦ
// (Версия для файлов в корневой папке)
// ============================================

(function() {
    'use strict';

    // ============================================
    // ОДИН ИСТОЧНИК ПРАВДЫ ДЛЯ МОБИЛЬНОСТИ
    // СИНХРОНИЗИРОВАН С CSS (768px)
    // ============================================
    function isMobile() {
        return window.innerWidth <= 768;
    }

    // ============================================
    // ФУНКЦИЯ ДЛЯ ОТСЛЕЖИВАНИЯ ИЗМЕНЕНИЯ ШИРИНЫ
    // ============================================
    function checkWidthAndRebuild() {
        const wasMobile = window._isMobile;
        const nowMobile = isMobile();
        
        if (wasMobile !== nowMobile) {
            window._isMobile = nowMobile;
            menuBuilt = false;
            buildMenu();
            updatePageContent();
        }
    }

    // ---------- НАСТРОЙКИ ----------
    const AVAILABLE_LANGUAGES = ['de', 'en', 'es', 'fr', 'it', 'ka', 'ru', 'tr'];
    const DEFAULT_LANGUAGE = 'en';
    
    // БАЗОВОЕ ИМЯ СТРАНИЦЫ (без расширения и без языка)
    const BASE_PAGE_ID = 'index4';
    
    // ========================================
    // КОНФИГУРАЦИЯ СТРАНИЦ
    // ========================================
    const pagesConfig = [
        {
            id: 'index4',
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
            id: 'index3',
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
            id: 'index2',
            titles: {
                de: 'Sommer mode ist ein Manifest der Leichtigkeit, ausgedrückt in schwerelosen Stoffen.',
                en: 'Summer fashion is a manifesto of lightness, expressed in weightless fabrics.',
                es: 'La moda veraniega es un manifiesto de ligereza, expresado en tejidos ingrávidos.',
                fr: "La mode estivale est un manifeste de légèreté, exprimé dans des tissus légers comme l'air.",
                it: 'La moda estiva è un manifesto di leggerezza, espresso in tessuti senza peso.',
                ka: 'ზაფხულის მოდა არის სიმსუბუქის მანიფესტი, გამოხატული უწონო ქსოვილებში.',
                ru: 'Секреты стильного лета: как одежда меняет наше настроение',
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

    // ============================================
    // ФУНКЦИЯ ПОЛУЧЕНИЯ ИМЕНИ ФАЙЛА ИЗ URL
    // ============================================
    function getFileNameFromUrl() {
        let fullPath = window.location.pathname;
        
        if (fullPath.endsWith('/')) {
            fullPath += 'index.html';
        }
        
        let fileName = fullPath.split('/').pop();
        
        if (!fileName || fileName === '') {
            fileName = 'index.html';
        }
        
        // Если это index.html → заменяем на index4-en.html
        if (fileName === 'index.html') {
            console.log('🔄 Обнаружен index.html → заменяем на index4-en.html');
            fileName = 'index4-en.html';
        }
        
        return fileName;
    }

    // ============================================
    // ОПРЕДЕЛЕНИЕ ТЕКУЩЕГО ЯЗЫКА
    // ============================================
    function getCurrentLanguage() {
        const fileName = getFileNameFromUrl();
        
        // 1. Проверяем стандартный формат: index4-en.html
        for (let lang of AVAILABLE_LANGUAGES) {
            if (fileName.includes('-' + lang + '.')) {
                return lang;
            }
        }
        
        // 2. Проверяем без расширения: index4-en
        for (let lang of AVAILABLE_LANGUAGES) {
            if (fileName.endsWith('-' + lang)) {
                return lang;
            }
        }
        
        // 3. Проверяем последнюю часть пути
        const pathParts = window.location.pathname.split('/');
        const lastPart = pathParts[pathParts.length - 1];
        for (let lang of AVAILABLE_LANGUAGES) {
            if (lastPart.endsWith('-' + lang)) {
                return lang;
            }
        }
        
        // 4. Проверяем параметр lang в URL (?lang=de)
        const urlParams = new URLSearchParams(window.location.search);
        const langParam = urlParams.get('lang');
        if (langParam && AVAILABLE_LANGUAGES.includes(langParam)) {
            return langParam;
        }
        
        // 5. Если ничего не найдено — язык по умолчанию
        return DEFAULT_LANGUAGE;
    }

    // ============================================
    // ОПРЕДЕЛЕНИЕ ТЕКУЩЕЙ СТРАНИЦЫ
    // ============================================
    function getCurrentPage() {
        const fileName = getFileNameFromUrl();
        
        let baseName = fileName.replace(/\.html$/, '');
        for (let lang of AVAILABLE_LANGUAGES) {
            if (baseName.endsWith('-' + lang)) {
                baseName = baseName.replace('-' + lang, '');
                break;
            }
        }
        return baseName;
    }

    // ============================================
    // ПОЛУЧЕНИЕ ИМЕНИ ФАЙЛА ПО ID СТРАНИЦЫ И ЯЗЫКУ
    // ============================================
    function getFileName(pageId, lang) {
        // Если это базовая страница (index4) и английский → index-en.html
        if (pageId === BASE_PAGE_ID && lang === DEFAULT_LANGUAGE) {
            return 'index4-en.html';
        }
        // Если это базовая страница (index4) и НЕ английский → index4-de.html
        if (pageId === BASE_PAGE_ID) {
            return pageId + '-' + lang + '.html';
        }
        // Для всех остальных страниц — добавляем язык
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
    let menuBuilt = false;

    function buildMenu() {
        if (menuBuilt) {
            return;
        }

        const mobile = isMobile();

        if (mobile) {
            const menuContainer = document.getElementById('menuContainer');
            if (menuContainer) {
                menuContainer.innerHTML = '';
            }
            updateMobileLanguageSelector();
            menuBuilt = true;
            return;
        }

        const currentLang = getCurrentLanguage();
        const currentPage = getCurrentPage();

        const menuContainer = document.getElementById('menuContainer');
        if (!menuContainer) {
            console.error('❌ Контейнер #menuContainer не найден!');
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

        pagesConfig.forEach((page) => {
            const pageTitle = getPageTitle(page.id, currentLang);
            const isActive = page.id === currentPage ? 'active' : '';
            
            menuHTML += `
                <button class="nav-btn ${isActive}" data-page="${page.id}">
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

        menuBuilt = true;
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
            checkWidthAndRebuild();
        }, 150);
    });

    // ---------- ЗАПУСК ----------
    window._isMobile = isMobile();

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            buildMenu();
            updatePageContent();
            setupMobileLanguageSelector();
        });
    } else {
        buildMenu();
        updatePageContent();
        setupMobileLanguageSelector();
    }

    window.addEventListener('pageshow', function() {
        updatePageContent();
    });

})();