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
    elegant: { name: 'Elegant', class: 'theme-elegant' },
    classic: { name: 'Classic', class: 'theme-classic' },
    agency: { name: 'Agency', class: 'theme-agency' },
    startup: { name: 'Startup', class: 'theme-startup' },
    corporate: { name: 'Corporate', class: 'theme-corporate' },
    vibrant: { name: 'Vibrant', class: 'theme-vibrant' }
};

// Demo siteler
const DEMO_SITES = [
    {
        id: 'demo1',
        username: 'portfolio_demo1',
        title: 'Grafik Tasarımcı',
        titleEn: 'Graphic Designer',
        category: 'portfolio',
        theme: 'classic',
        icon: '🎨',
        description: 'Profesyonel portföy sitesi',
        descriptionEn: 'Professional portfolio website',
        isPublic: true,
        content: {
            about: { tr: 'Hakkımız', en: 'About Us' },
            aboutDesc: { tr: 'Grafik tasarım alanında 5 yıllık deneyime sahibim. Logo tasarımından marka kimliğine kadar tüm tasarım hizmetlerini sunuyorum.', en: '5 years of experience in graphic design. I provide all design services from logo design to brand identity.' },
            services: { tr: 'Hizmetler', en: 'Services' },
            servicesList: { tr: ['Logo Tasarımı', 'Web Tasarımı', 'Marka Kimliği'], en: ['Logo Design', 'Web Design', 'Brand Identity'] },
            contact: { tr: 'İletişim', en: 'Contact' },
            email: 'info@example.com',
            phone: '+90 555 123 4567',
            whatsapp: '905551234567'
        }
    },
    {
        id: 'demo2',
        username: 'portfolio_demo2',
        title: 'Yazılım Geliştirici',
        titleEn: 'Software Developer',
        category: 'portfolio',
        theme: 'agency',
        icon: '💻',
        description: 'Modern portföy sitesi',
        descriptionEn: 'Modern portfolio website',
        isPublic: true,
        content: {
            about: { tr: 'Hakkımız', en: 'About Us' },
            aboutDesc: { tr: 'Full-stack developer olarak modern web uygulamaları geliştiriyorum. React, Node.js ve cloud teknolojileriyle projeler hayata geçiriyorum.', en: 'Full-stack developer creating modern web applications. I build projects with React, Node.js and cloud technologies.' },
            services: { tr: 'Hizmetler', en: 'Services' },
            servicesList: { tr: ['Web Development', 'Mobile Apps', 'API Development'], en: ['Web Development', 'Mobile Apps', 'API Development'] },
            contact: { tr: 'İletişim', en: 'Contact' },
            email: 'dev@example.com',
            phone: '+90 555 234 5678',
            whatsapp: '905552345678'
        }
    },
    {
        id: 'demo3',
        username: 'blog_demo1',
        title: 'Teknoloji Blogu',
        titleEn: 'Technology Blog',
        category: 'blog',
        theme: 'startup',
        icon: '📱',
        description: 'Güncel teknoloji haberleri',
        descriptionEn: 'Latest technology news',
        isPublic: true,
        content: {
            about: { tr: 'Hakkımız', en: 'About Us' },
            aboutDesc: { tr: 'En son teknoloji trendlerini, yapay zeka ve yazılım geliştirme haberleri paylaşıyorum. Her hafta yeni içerik ekleniyor.', en: 'Sharing latest technology trends, AI and software development news. New content added every week.' },
            services: { tr: 'Hizmetler', en: 'Services' },
            servicesList: { tr: ['Teknoloji Haberleri', 'Turiallar', 'İncelemeler'], en: ['Tech News', 'Tutorials', 'Reviews'] },
            contact: { tr: 'İletişim', en: 'Contact' },
            email: 'blog@example.com',
            phone: '+90 555 345 6789',
            whatsapp: '905553456789'
        }
    },
    {
        id: 'demo4',
        username: 'business_demo1',
        title: 'Danışmanlık Firması',
        titleEn: 'Consulting Firm',
        category: 'business',
        theme: 'corporate',
        icon: '📊',
        description: 'Kurumsal web sitesi',
        descriptionEn: 'Corporate website',
        isPublic: true,
        content: {
            about: { tr: 'Hakkımız', en: 'About Us' },
            aboutDesc: { tr: 'İşletme danışmanlığında 15 yıl deneyime sahibiz. Kurumsal stratejiden dijital dönüşüme kadar geniş hizmet yelpazesi sunuyoruz.', en: '15 years of experience in business consulting. We provide services from corporate strategy to digital transformation.' },
            services: { tr: 'Hizmetler', en: 'Services' },
            servicesList: { tr: ['Strateji Danışmanlığı', 'Operasyon Yönetimi', 'Dijital Dönüşüm'], en: ['Strategy Consulting', 'Operations Management', 'Digital Transformation'] },
            contact: { tr: 'İletişim', en: 'Contact' },
            email: 'info@consulting.com',
            phone: '+90 555 456 7890',
            whatsapp: '905554567890'
        }
    },
    {
        id: 'demo5',
        username: 'ecommerce_demo1',
        title: 'Online Mağazası',
        titleEn: 'Online Store',
        category: 'ecommerce',
        theme: 'vibrant',
        icon: '🛍️',
        description: 'Organik ürünler satış sitesi',
        descriptionEn: 'Organic products sales website',
        isPublic: true,
        content: {
            about: { tr: 'Hakkımız', en: 'About Us' },
            aboutDesc: { tr: 'Doğal ve organik ürünlere inanıyoruz. Tüm ürünlerimiz sertifikalı ve çevre dostu üretim süreçlerinden geçiyor.', en: 'We believe in natural and organic products. All our products are certified and eco-friendly production processes.' },
            services: { tr: 'Hizmetler', en: 'Services' },
            servicesList: { tr: ['Organik Ürünler', 'Kargo Hizmeti', 'Danışmanlık'], en: ['Organic Products', 'Shipping Service', 'Consultation'] },
            contact: { tr: 'İletişim', en: 'Contact' },
            email: 'shop@example.com',
            phone: '+90 555 567 8901',
            whatsapp: '905555678901'
        }
    },
    {
        id: 'demo6',
        username: 'personal_demo1',
        title: 'Kişisel Web Sitesi',
        titleEn: 'Personal Website',
        category: 'personal',
        theme: 'minimal',
        icon: '👨‍💼',
        description: 'Kişisel tanıtım sayfası',
        descriptionEn: 'Personal introduction page',
        isPublic: true,
        content: {
            about: { tr: 'Hakkımız', en: 'About Us' },
            aboutDesc: { tr: 'Merhaba! Ben bir yazılımcı ve tasarımcıyım. Web tasarım ve geliştirmede uzmanlaşmış, yaratıcı çözümleri seviyorum.', en: 'Hello! I am a programmer and designer. Specialized in web design and development, I love creative solutions.' },
            services: { tr: 'Hizmetler', en: 'Services' },
            servicesList: { tr: ['Web Tasarımı', 'Grafik Tasarım', 'Front-end Development'], en: ['Web Design', 'Graphic Design', 'Front-end Development'] },
            contact: { tr: 'İletişim', en: 'Contact' },
            email: 'hello@example.com',
            phone: '+90 555 678 9012',
            whatsapp: '905556789012'
        }
    },
    {
        id: 'demo7',
        username: 'portfolio_demo3',
        title: 'İç Mimar',
        titleEn: 'Interior Designer',
        category: 'portfolio',
        theme: 'modern',
        icon: '🏠',
        description: 'İç tasarım portföyü',
        descriptionEn: 'Interior design portfolio',
        isPublic: true,
        content: {
            about: { tr: 'Hakkımız', en: 'About Us' },
            aboutDesc: { tr: 'Yaşam alanlarını dönüştüren iç tasarımcı. Ev ve ofislerinizi rahat, güzel ve fonksiyonel hale getiriyorum.', en: 'Interior designer transforming living spaces. I make homes and offices comfortable, beautiful and functional.' },
            services: { tr: 'Hizmetler', en: 'Services' },
            servicesList: { tr: ['Ev Tasarımı', 'Ticari Tasarım', '3D Görselleştirme'], en: ['Home Design', 'Commercial Design', '3D Visualization'] },
            contact: { tr: 'İletişim', en: 'Contact' },
            email: 'design@example.com',
            phone: '+90 555 789 0123',
            whatsapp: '905557890123'
        }
    },
    {
        id: 'demo8',
        username: 'business_demo2',
        title: 'Pazarlama Ajansı',
        titleEn: 'Marketing Agency',
        category: 'business',
        theme: 'dark',
        icon: '📢',
        description: 'Dijital pazarlama hizmetleri',
        descriptionEn: 'Digital marketing services',
        isPublic: true,
        content: {
            about: { tr: 'Hakkımız', en: 'About Us' },
            aboutDesc: { tr: 'Markaları dijital dünyada büyüyen bir pazarlama ajansı. SEO, sosyal medya ve içerik strategisiyle başarı sağlıyoruz.', en: 'A marketing agency growing brands in the digital world. We achieve success with SEO, social media and content strategy.' },
            services: { tr: 'Hizmetler', en: 'Services' },
            servicesList: { tr: ['SEO Optimizasyonu', 'Sosyal Medya', 'Content Marketing'], en: ['SEO Optimization', 'Social Media', 'Content Marketing'] },
            contact: { tr: 'İletişim', en: 'Contact' },
            email: 'marketing@agency.com',
            phone: '+90 555 890 1234',
            whatsapp: '905558901234'
        }
    },
    {
        id: 'demo9',
        username: 'blog_demo2',
        title: 'Seyahat Blogu',
        titleEn: 'Travel Blog',
        category: 'blog',
        theme: 'nature',
        icon: '✈️',
        description: 'Dünya gezileri ve deneyimleri',
        descriptionEn: 'World travels and experiences',
        isPublic: true,
        content: {
            about: { tr: 'Hakkımız', en: 'About Us' },
            aboutDesc: { tr: 'Dünyayı gezmek ve deneyimlerimi paylaşmak benim tutkum. Her yolculuktan yeni hikayeler ve ipuçları getiriyorum.', en: 'Traveling the world and sharing experiences is my passion. I bring new stories and tips from every journey.' },
            services: { tr: 'Hizmetler', en: 'Services' },
            servicesList: { tr: ['Seyahat Rehberi', 'Konaklama Önerileri', 'Rotalar'], en: ['Travel Guide', 'Accommodation Tips', 'Routes'] },
            contact: { tr: 'İletişim', en: 'Contact' },
            email: 'travel@example.com',
            phone: '+90 555 901 2345',
            whatsapp: '905559012345'
        }
    },
    {
        id: 'demo10',
        username: 'ecommerce_demo2',
        title: 'Handmade Ürünler',
        titleEn: 'Handmade Products',
        category: 'ecommerce',
        theme: 'elegant',
        icon: '🎁',
        description: 'El yapımı sanat ürünleri',
        descriptionEn: 'Handmade art products',
        isPublic: true,
        content: {
            about: { tr: 'Hakkımız', en: 'About Us' },
            aboutDesc: { tr: 'Eşsiz el yapımı sanat ürünleri sunuyoruz. Her ürün sevgiyle el yapılı ve kaliteyi garantiliyor.', en: 'We offer unique handmade art products. Each product is lovingly handcrafted and guaranteed quality.' },
            services: { tr: 'Hizmetler', en: 'Services' },
            servicesList: { tr: ['Sanat Ürünleri', 'Özel Siparişler', 'Gift Wrapping'], en: ['Art Products', 'Custom Orders', 'Gift Wrapping'] },
            contact: { tr: 'İletişim', en: 'Contact' },
            email: 'handmade@shop.com',
            phone: '+90 555 012 3456',
            whatsapp: '905550123456'
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
