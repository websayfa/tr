// i18n.js - Dil yönetim sistemi

const translations = {
    tr: {
        "hero.title": "Ücretsiz Web Sitenizi Oluşturun",
        "hero.subtitle": "Kod yazmasına gerek yok, sadece içeriğinizi girin ve yayınlayın!",
        "hero.btn": "Hemen Başla",
        "categories.title": "Kategoriler",
        "sites.title": "Yaratıcı Web Siteleri",
        "filter.all": "Tümü",
        "filter.personal": "Kişisel",
        "filter.business": "İşletme",
        "filter.portfolio": "Portföy",
        "filter.blog": "Blog",
        "login.title": "Giriş Yap",
        "login.email": "E-mail",
        "login.password": "Şifre",
        "login.btn": "Giriş Yap",
        "register.title": "Kayıt Ol",
        "register.username": "Kullanıcı Adı",
        "register.email": "E-mail",
        "register.password": "Şifre",
        "register.password_confirm": "Şifre Tekrar",
        "register.btn": "Kayıt Ol",
    },
    en: {
        "hero.title": "Create Your Free Website",
        "hero.subtitle": "No coding needed, just add your content and publish!",
        "hero.btn": "Get Started",
        "categories.title": "Categories",
        "sites.title": "Creative Websites",
        "filter.all": "All",
        "filter.personal": "Personal",
        "filter.business": "Business",
        "filter.portfolio": "Portfolio",
        "filter.blog": "Blog",
        "login.title": "Login",
        "login.email": "Email",
        "login.password": "Password",
        "login.btn": "Login",
        "register.title": "Register",
        "register.username": "Username",
        "register.email": "Email",
        "register.password": "Password",
        "register.password_confirm": "Confirm Password",
        "register.btn": "Register",
    }
};

let currentLang = localStorage.getItem('language') || 'tr';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    updatePageLanguage();
}

function updatePageLanguage() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[currentLang] && translations[currentLang][key]) {
            element.textContent = translations[currentLang][key];
        }
    });
}

function t(key) {
    if (translations[currentLang] && translations[currentLang][key]) {
        return translations[currentLang][key];
    }
    return key;
}

// Dil seçici butonları
document.addEventListener('DOMContentLoaded', () => {
    updatePageLanguage();
    
    const langTr = document.getElementById('lang-tr');
    const langEn = document.getElementById('lang-en');
    
    if (langTr) {
        langTr.addEventListener('click', () => {
            setLanguage('tr');
            updateLangButtons();
        });
    }
    
    if (langEn) {
        langEn.addEventListener('click', () => {
            setLanguage('en');
            updateLangButtons();
        });
    }
    
    updateLangButtons();
});

function updateLangButtons() {
    const langTr = document.getElementById('lang-tr');
    const langEn = document.getElementById('lang-en');
    
    if (langTr) {
        langTr.classList.toggle('active', currentLang === 'tr');
    }
    if (langEn) {
        langEn.classList.toggle('active', currentLang === 'en');
    }
}
