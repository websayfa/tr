// main.js - Ana sayfa ve site yönetimi

const CATEGORIES = {
    personal: { name: 'Kişisel', icon: '👤', en: 'Personal' },
    business: { name: 'İşletme', icon: '💼', en: 'Business' },
    portfolio: { name: 'Portföy', icon: '🎨', en: 'Portfolio' },
    blog: { name: 'Blog', icon: '📝', en: 'Blog' },
    ecommerce: { name: 'E-Ticaret', icon: '🛍️', en: 'E-Commerce' }
};

const THEMES = {
    minimal: { name: 'Minimal', class: 'theme-minimal' },
    modern: { name: 'Modern', class: 'theme-modern' },
    dark: { name: 'Dark', class: 'theme-dark' },
    nature: { name: 'Nature', class: 'theme-nature' },
    elegant: { name: 'Elegant', class: 'theme-elegant' }
};

// Demo siteler
const DEMO_SITES = [
    {
        id: 'demo1',
        username: 'portfolio_demo1',
        title: 'Grafik Tasarımcı',
        category: 'portfolio',
        theme: 'minimal',
        icon: '🎨',
        description: 'Profesyonel portföy sitesi',
        isPublic: true,
        content: {
            about: 'Grafik tasarım alanında 5 yıllık deneyime sahibim.',
            services: 'Logo Tasarımı, Web Tasarımı, Marka Kimliği',
            contact: 'info@example.com'
        }
    },
    {
        id: 'demo2',
        username: 'portfolio_demo2',
        title: 'Yazılım Geliştirici',
        category: 'portfolio',
        theme: 'modern',
        icon: '💻',
        description: 'Modern portföy sitesi',
        isPublic: true,
        content: {
            about: 'Full-stack developer olarak web uygulamaları geliştiriyorum.',
            services: 'Web Development, Mobile Apps, API Development',
            contact: 'dev@example.com'
        }
    },
    {
        id: 'demo3',
        username: 'blog_demo1',
        title: 'Teknoloji Blogu',
        category: 'blog',
        theme: 'dark',
        icon: '📱',
        description: 'Güncel teknoloji haberleri',
        isPublic: true,
        content: {
            about: 'En son teknoloji trendlerini takip edin',
            posts: '15+ yazı ve içerik',
            contact: 'blog@example.com'
        }
    },
    {
        id: 'demo4',
        username: 'business_demo1',
        title: 'Danışmanlık Firması',
        category: 'business',
        theme: 'elegant',
        icon: '📊',
        description: 'Kurumsal web sitesi',
        isPublic: true,
        content: {
            about: 'İşletme danışmanlığında uzmanlaşmış bir firma',
            services: 'Strateji, Operasyon, Dijital Dönüşüm',
            contact: 'info@consulting.com'
        }
    },
    {
        id: 'demo5',
        username: 'ecommerce_demo1',
        title: 'Online Mağazası',
        category: 'ecommerce',
        theme: 'nature',
        icon: '🛍️',
        description: 'Organik ürünler satış sitesi',
        isPublic: true,
        content: {
            about: 'Doğal ve organik ürünler sunuyoruz',
            products: '100+ ürün',
            contact: 'shop@example.com'
        }
    },
    {
        id: 'demo6',
        username: 'personal_demo1',
        title: 'Kişisel Web Sitesi',
        category: 'personal',
        theme: 'minimal',
        icon: '👨‍💼',
        description: 'Kişisel tanıtım sayfası',
        isPublic: true,
        content: {
            about: 'Merhaba! Ben bir yazılımcı ve tasarımcıyım.',
            experience: '7 yıl deneyim',
            contact: 'hello@example.com'
        }
    },
    {
        id: 'demo7',
        username: 'portfolio_demo3',
        title: 'İç Mimar',
        category: 'portfolio',
        theme: 'modern',
        icon: '🏠',
        description: 'İç tasarım portföyü',
        isPublic: true,
        content: {
            about: 'Yaşam alanlarını dönüştüren iç tasarımcı',
            services: 'Ev Tasarımı, Ticari Tasarım',
            contact: 'design@example.com'
        }
    },
    {
        id: 'demo8',
        username: 'business_demo2',
        title: 'Pazarlama Ajansı',
        category: 'business',
        theme: 'dark',
        icon: '📢',
        description: 'Dijital pazarlama hizmetleri',
        isPublic: true,
        content: {
            about: 'Markaları dijital dünyada büyüyen bir ajans',
            services: 'SEO, Social Media, Content Marketing',
            contact: 'marketing@agency.com'
        }
    },
    {
        id: 'demo9',
        username: 'blog_demo2',
        title: 'Seyahat Blogu',
        category: 'blog',
        theme: 'elegant',
        icon: '✈️',
        description: 'Dünya gezileri ve deneyimleri',
        isPublic: true,
        content: {
            about: 'Dünyayı gezmek ve paylaşmak',
            posts: '50+ yazı',
            contact: 'travel@example.com'
        }
    },
    {
        id: 'demo10',
        username: 'ecommerce_demo2',
        title: 'Handmade Ürünler',
        category: 'ecommerce',
        theme: 'nature',
        icon: '🎁',
        description: 'El yapımı sanat ürünleri',
        isPublic: true,
        content: {
            about: 'Eşsiz el yapımı ürünler',
            products: '250+ ürün',
            contact: 'handmade@shop.com'
        }
    }
];

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', () => {
    loadCategories();
    loadSites();
    setupFilterButtons();
});

// Kategorileri yükle
function loadCategories() {
    const container = document.getElementById('categoriesContainer');
    if (!container) return;

    container.innerHTML = '';
    for (let key in CATEGORIES) {
        const cat = CATEGORIES[key];
        const card = document.createElement('div');
        card.className = 'category-card';
        card.innerHTML = `
            <div class="category-card-icon">${cat.icon}</div>
            <h3>${currentLang === 'tr' ? cat.name : cat.en}</h3>
        `;
        card.addEventListener('click', () => {
            filterSites(key);
        });
        container.appendChild(card);
    }
}

// Siteleri yükle
function loadSites() {
    const container = document.getElementById('sitesContainer');
    if (!container) return;

    container.innerHTML = '';
    DEMO_SITES.forEach(site => {
        const card = createSiteCard(site);
        container.appendChild(card);
    });
}

// Site kartı oluştur
function createSiteCard(site) {
    const card = document.createElement('div');
    card.className = `site-card ${THEMES[site.theme].class}`;
    card.dataset.category = site.category;
    
    const categoryName = currentLang === 'tr' 
        ? CATEGORIES[site.category].name 
        : CATEGORIES[site.category].en;

    card.innerHTML = `
        <div class="site-card-header">${site.icon}</div>
        <div class="site-card-body">
            <div class="site-card-title">${site.title}</div>
            <span class="site-card-category">${categoryName}</span>
            <p class="site-card-description">${site.description}</p>
            <div class="site-card-footer">
                <a href="pages/preview.html?id=${site.id}" class="site-card-visit" target="_blank">
                    ${currentLang === 'tr' ? 'Ziyaret Et' : 'Visit'}
                </a>
            </div>
        </div>
    `;

    return card;
}

// Filter butonlarını ayarla
function setupFilterButtons() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            filterSites(filter);
        });
    });
}

// Siteleri filtrele
function filterSites(category) {
    const cards = document.querySelectorAll('.site-card');
    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

// Dil değişince kategorileri güncelle
const originalSetLanguage = window.setLanguage || (() => {});
window.setLanguage = function(lang) {
    originalSetLanguage(lang);
    loadCategories();
    loadSites();
};
