// websayfa.tr - Veritabanı Şeması (JSON Based)

// ==========================================
// 1. USERS (Tüm Kullanıcılar)
// localStorage key: 'allUsers'
// ==========================================
{
  "user_id_12345": {
    "id": "user_id_12345",
    "username": "mehmet",
    "email": "mehmet@example.com",
    "password": "hash_987654321", // SHA hash
    "createdAt": "2024-01-31T10:00:00Z",
    "isPublic": true,  // Ana sayfada göster
    "adminPanel": false, // Admin mi?
    "sites": [] // Site ID'leri
  }
}

// ==========================================
// 2. CURRENT USER (Giriş yapan kullanıcı)
// localStorage key: 'currentUser'
// ==========================================
{
  "id": "user_id_12345",
  "username": "mehmet",
  "email": "mehmet@example.com",
  "password": "hash_987654321",
  "createdAt": "2024-01-31T10:00:00Z",
  "isPublic": true,
  "adminPanel": false,
  "sites": ["site_1", "site_2"]
}

// ==========================================
// 3. USER SITES (Kullanıcının Siteleri)
// localStorage key: 'user_sites_{user_id}'
// ==========================================
[
  {
    "id": "site_1",
    "username": "mehmet",
    "userId": "user_id_12345",
    "title": "Benim İşletmem",
    "category": "business",
    "theme": "modern",
    "domain": "benim-isletmem",
    "description": "Profesyonel işletme web sitesi",
    "isPublic": true,
    "icon": "📄",
    "createdAt": "2024-01-31T10:00:00Z",
    "content": {
      "about": "Biz, profesyonel hizmetler sunan bir işletmeyiz...",
      "services": "Web Tasarımı, Danışmanlık, Destek",
      "contact": "mehmet@example.com",
      "address": "İstanbul, Türkiye",
      "phone": "+90 123 456 7890"
    }
  }
]

// ==========================================
// 4. GIT COMMIT LOG (Senkronizasyon)
// localStorage key: 'gitCommitLog'
// ==========================================
[
  {
    "site": {
      "id": "site_1",
      "title": "Benim İşletmem"
    },
    "action": "create", // create, update, delete
    "timestamp": "2024-01-31T10:05:00Z",
    "user": "mehmet",
    "status": "pending" // pending, synced, failed
  },
  {
    "site": {
      "id": "site_1",
      "title": "Benim İşletmem"
    },
    "action": "update",
    "timestamp": "2024-01-31T10:10:00Z",
    "user": "mehmet",
    "status": "synced"
  }
]

// ==========================================
// 5. KATEGORILER
// ==========================================
{
  "personal": {
    "name": "Kişisel",
    "en": "Personal",
    "icon": "👤",
    "description": "Kişisel tanıtım ve blog"
  },
  "business": {
    "name": "İşletme",
    "en": "Business",
    "icon": "💼",
    "description": "Şirket web sitesi"
  },
  "portfolio": {
    "name": "Portföy",
    "en": "Portfolio",
    "icon": "🎨",
    "description": "Proje ve çalışmalar"
  },
  "blog": {
    "name": "Blog",
    "en": "Blog",
    "icon": "📝",
    "description": "Yazılar ve makaleler"
  },
  "ecommerce": {
    "name": "E-Ticaret",
    "en": "E-Commerce",
    "icon": "🛍️",
    "description": "Ürün satış sitesi"
  }
}

// ==========================================
// 6. TEMALAR
// ==========================================
{
  "minimal": {
    "name": "Minimal",
    "class": "theme-minimal",
    "primary": "#667eea",
    "secondary": "#764ba2"
  },
  "modern": {
    "name": "Modern",
    "class": "theme-modern",
    "primary": "#f093fb",
    "secondary": "#f5576c"
  },
  "dark": {
    "name": "Dark",
    "class": "theme-dark",
    "primary": "#2d3436",
    "secondary": "#636e72"
  },
  "nature": {
    "name": "Nature",
    "class": "theme-nature",
    "primary": "#11998e",
    "secondary": "#38ef7d"
  },
  "elegant": {
    "name": "Elegant",
    "class": "theme-elegant",
    "primary": "#d4a574",
    "secondary": "#a8b8c8"
  }
}

// ==========================================
// 7. ŞIFRELEME AÇIKLAMA
// ==========================================

/**
 * Güvenlik Seviyeleri:
 * 
 * 1. TEMEL ŞIFRELEME:
 *    - SHA benzeri hash: SimpleCrypto.hashPassword()
 *    - Örnek: "password123" → "hash_987654321"
 * 
 * 2. JSON ŞİFRELEMESİ:
 *    - Base64 kodlama: SimpleCrypto.encode()
 *    - localStorage'da şifreli JSON
 * 
 * 3. DEKODLAMA:
 *    - SimpleCrypto.decode() ile okunur
 *    - Browser tarafında yapılır (istemci tarafı)
 * 
 * UYARI: Prodüksiyonda daha güçlü şifreleme kullanın!
 */

// ==========================================
// 8. VERILER NEREDE SAKLANIR?
// ==========================================

/*
 * Browser localStorage:
 * ├── allUsers (şifreli)
 * ├── currentUser (şifreli)
 * ├── user_sites_{user_id} (şifreli)
 * ├── gitCommitLog (JSON)
 * └── language (dil seçimi)
 * 
 * GitHub Repository:
 * ├── index.html (statik)
 * ├── pages/dashboard.html
 * ├── pages/preview.html
 * ├── assets/css/
 * ├── assets/js/
 * └── .github/workflows/deploy.yml
 */

// ==========================================
// 9. SITE URL YAPISI
// ==========================================

/*
 * Ana domain: https://websayfa.tr
 * 
 * Siteler: 
 * - https://websayfa.tr/#/kullanici1
 * - https://websayfa.tr/#/kullanici2
 * 
 * Domain ile: (CNAME ile ayarlanır)
 * - https://benim-domain.com
 * - https://sitenin-adi.tr
 * 
 * Preview: 
 * - https://websayfa.tr/pages/preview.html?id=site_1
 */
