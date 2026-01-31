# 🌐 WebSayfa.tr - Ücretsiz Web Sitesi Oluşturucu

**Tamamen Statik, Database Yok, Herkes Kullanabiliyor!**

> **Ana Site:** https://websayfa.github.io/tr  
> **GitHub:** [websayfa/tr.github.io](https://github.com/websayfa/tr.github.io)  
> **Destek:** 📧 kodmatik66@gmail.com

---

## ⚡ Hızlı Başlangıç (5 dakika)

| Amacınız | Rehber | Süre |
|----------|--------|------|
| 🌐 Direkt kullan | [Ana Site](https://websayfa.github.io/tr) | Hemen |
| 🔧 Fork et + GitHub Pages | [QUICKSTART.md](QUICKSTART.md) | 5 dk |
| 🏠 Kendi domain'e kur | [DEPLOYMENT.md](DEPLOYMENT.md) | 15 dk |
| 💻 Yerel geliştirme | [KURULUM_REHBERI.md](KURULUM_REHBERI.md) | 10 dk |
| 🔐 Özel domain satın al | [CUSTOM_DOMAIN_GUIDE.md](CUSTOM_DOMAIN_GUIDE.md) | 30 dk |
| 🏗️ Teknik mimari | [TEKNIK_DOKUMANTASYON.md](TEKNIK_DOKUMANTASYON.md) | 1 saat |

---

## 🎯 Nedir WebSayfa.tr?

WebSayfa.tr, herkesin **kod yazmasına gerek kalmadan** kendi web sitesini oluşturabileceği, tamamen **ücretsiz** bir web sitesi oluşturucu platformudur.

### ✨ Temel Özellikler

- ✅ **Tamamen Ücretsiz** - Hiç para ödemeye gerek yok
- ✅ **Veritabanı Yok** - Tüm veriler tarayıcıda (localStorage) kaydediliyor
- ✅ **5 Profesyonel Tema** - Minimal, Modern, Dark, Nature, Elegant
- ✅ **Çok Dilli** - Türkçe ve İngilizce desteği
- ✅ **Kayıt Sırasında Site Oluşturma** - Otomatik ilk sitesi oluşturulur
- ✅ **Email Doğrulama** - Güvenli kayıt sistemi
- ✅ **GitHub Pages Hosting** - Direkt yayını
- ✅ **Düzenlenebilir İçerik Alanları**:
  - Hakkımız (Hakkımda sayfası)
  - Hizmetler (Sunduğunuz hizmetler listesi)
  - İletişim E-maili
  - İletişim Telefonu
- ✅ **Admin Panel** - Tüm siteleri yönetin
- ✅ **Super Admin Sistemi** - Sınırsız site oluşturma
- ✅ **Site Limitleri** - Normal kullanıcı 1 site, admin sınırsız
- ✅ **WhatsApp, Email, Phone Entegrasyonu** - İletişim bilgilerinizi paylaşın

---

## 🚀 Başlangıç - 3 Adım

### 1️⃣ **Kayıt Olun**
```
📧 E-mail       : sizin@email.com
🏢 Site Adı     : benim-isletme
🎨 Tema Seçin   : Modern (5 seçenek)
🔐 Şifre        : güvenli123
👉 Kayıt Ol Butonuna Tıklayın
```

### 2️⃣ **Email'i Doğrulayın**
```
✉️  E-mailinize 6 haneli kod gelecek
     Örn: 654646
🔐  Kodu forma yapıştırın
👉  Doğrula Butonuna Tıklayın
```

### 3️⃣ **Sitenizi Düzenleyin**
```
✅  Kayıt başarılı → Otomatik panele yönlendiriliyorsunuz
📝  Sitede hakkımda, hizmetler, iletişim bilgilerinizi yazın
🎨  İstediğiniz anda tema değiştirebilirsiniz
🌐  Siteniz otomatik yayında: websayfa/tr/benim-isletme
```

---

## 💡 Nasıl Çalışıyor? (Teknik Altyapı)

### **Neden Veritabanı Yok?**

Geleneksel web siteleri şu şekilde çalışır:
```
Sunucu Talep Et → Database'e Sorgu → Veri Getir → HTML Gönder
⏱️  Yavaş, 💰 Pahalı, 📦 Karmaşık
```

WebSayfa.tr'de ise:
```
Browser'da localStorage → JSON Veri → Hemen Göster
⚡ Çok Hızlı, 💰 Ücretsiz, 🎯 Basit
```

### **localStorage Nedir?**

Browser'ınızın verileri **yerel olarak** sakladığı bir sistem:

```javascript
// Veri kaydet (İlk seferinde)
localStorage.setItem('kullanici_bilgileri', JSON.stringify({
  isim: 'Ali',
  email: 'ali@example.com'
}));

// Veri al (Sonraki ziyaretlerde)
const kullanici = JSON.parse(localStorage.getItem('kullanici_bilgileri'));

// Sonuç: İnstant hız, sıfır sunucu maliyeti ✨
```

**Avantajları:**
- 🚀 Sunucu yükü yok = Çok hızlı
- 💰 Hosting masrafı sıfır = GitHub Pages ücretsiz
- 🔒 Veriler tarayıcıda = İnternete çıkmıyor
- 📱 Offline da çalışıyor = İnternet kesince de devam

**Sınırlamaları:**
- 1 MB'a kadar veri saklayabilir (çoğu kişi için yeterli)
- Tarayıcı temizlenince veriler silinir (ama şifreli)
- Birden fazla bilgisayardan senkronizasyon yok

---

## 📧 Email Doğrulama Sistemi

### Adım Adım Nasıl Çalışıyor

```
┌─────────────────────────────────────────┐
│  Kullanıcı "Kayıt Ol" butonuna tıklar  │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│  System 6 haneli kod oluşturur          │
│  Örn: 654646                             │
│  localStorage'a kaydeder                 │
│  (15 dakika geçerli)                     │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│  EmailJS Servisi e-mail gönderi         │
│  Cloud-based, kendi sunucusu var        │
│  "Doğrulama kodunuz: 654646"            │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│  Kullanıcı e-mailini açar               │
│  Kodu kopyalar                           │
│  Forma yapıştırır                        │
│  "Doğrula" butonuna tıklar              │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│  System localStorage'da kod kontrol eder│
│  Eğer eşleşirse:                        │
│  ✅ Hesap oluştur                       │
│  ✅ İlk site otomatik oluştur           │
│  ✅ Panele yönlendir                    │
└─────────────────────────────────────────┘
```

### EmailJS Nedir?

EmailJS bir **cloud servisidir**:

```javascript
// Bu kod tarayıcıdan çalışır
// Hiç sunucu gerekli değil!

emailjs.send(
  'service_websayfa',              // Servis ID
  'template_verification',         // Template ID
  {
    to_email: 'ali@example.com',
    verification_code: '654646',
    expires_in: '15 dakika'
  }
);

// Sonuç: E-mail 10 saniye içinde gönderilir ✅
```

**Offline Modda Ne Olur?**

Internet kesintisi varsa bile:
- Kod yine localStorage'da kaydedilir
- E-mail gönderilemezse uyarı verilir
- Ama doğrulama yine çalışır (localStorage kodunu kullanır)
- İnternet gelince e-mail gönderilir

---

## 🔒 Veri Şifreleme Sistemi

### Şifreler Nasıl Kaydediliyor?

```javascript
// Düz şifre ASLA kaydedilmez ❌
localStorage.setItem('password', 'sifresi123'); // ❌ TEHLİKELİ!

// Bunun yerine HASH kullanılır ✅
const hash = SimpleCrypto.hashPassword('sifresi123');
// → 'a9d4f8e2c1b3f5e7...' (geri döndürülemez)
localStorage.setItem('password_hash', hash); // ✅ GÜVENLİ

// Giriş sırasında:
// 1. Girilen şifreyi hash'le
// 2. localStorage'daki hash ile karşılaştır
// 3. Eşlerse → Giriş yapabilir
```

### localStorage'daki Tüm Veriler Şifreli

```javascript
// Browser konsolunda bak:
localStorage; 
// {
//   allUsers: "eyJlbmNyeXB0ZWQiOiJiWEJuYmkyUTBkV3..."
//   verification_ali@email.com: "eyJjb2RlIjoiNjU0NjQ2IiwieC..."
// }

// Veriler direkt görünemez, şifreli
// Buffer.from() bile açamaz (custom cipher)

// Kaynakları İncelemek (DevTools)
// F12 → Application → localStorage
// Tüm veriler şifreli görünür 🔐
```

---

## 📁 Veri Yapısı (JSON)

### Hangi Veriler localStorage'da Tutulur?

```javascript
// 1. KULLANICI ACCOUNTS
localStorage['allUsers'] = {
  "user_123456": {
    id: "user_123456",
    username: "benim-isletme",
    email: "ben@email.com",
    domain: "benim-isletme",
    password: "a9d4f8e2c1b3...", // Hash
    createdAt: "2026-01-31T10:30:00Z",
    sites: ["site_001", "site_002"],
    isPublic: true,
    adminPanel: false
  }
}

// 2. SİTELER
localStorage['allSites'] = {
  "site_001": {
    id: "site_001",
    username: "benim-isletme",
    title: "Benim İşletme",
    category: "business",
    theme: "modern",
    domain: "benim-isletme",
    description: "İşletme sitesi",
    icon: "📄",
    createdAt: "2026-01-31T10:30:00Z",
    isPublic: true,
    content: {
      about: "Hakkımda...",
      services: "Hizmetlerim...",
      contact: "ben@email.com"
    }
  }
}

// 3. DOĞRULAMA KODLARI (Geçici)
localStorage['verification_ben@email.com'] = {
  code: "654646",
  email: "ben@email.com",
  username: "benim-isletme",
  expiresAt: 1696180200000 // 15 dakika sonra silinir
}

// 4. OTURUM (Giriş Yapan Kullanıcı)
localStorage['currentUser'] = {
  // Giriş yapan kullanıcının bilgileri
  // Sayfa yenileninse bile oturum devam eder
}
```

---

## 🌐 GitHub Pages Hosting

### Neden GitHub Pages?

```
GitHub Pages = Tamamen Ücretsiz Hosting

✅ Kredi kartı istemiyor
✅ Bandwidth sınırı yok
✅ Custom domain desteği
✅ SSL/HTTPS otomatik
✅ 99.9% uptime
✅ CloudFlare desteği
```

### Siteniz Nereye Kaydediliyor?

```
github.com/websayfa/tr.github.io

Dosya Yapısı:
│
├── index.html              (Ana sayfa)
├── admin.html              (Admin paneli)
├── guide.html              (Kılavuz)
├── README.md               (Bu dosya)
│
├── pages/
│   ├── dashboard.html      (Kullanıcı paneli)
│   └── preview.html        (Site önizlemesi)
│
├── assets/
│   ├── js/
│   │   ├── auth.js         ← Kayıt/Giriş sistemi
│   │   ├── main.js         ← Ana sayfa JS
│   │   ├── dashboard.js    ← Panel JS
│   │   ├── i18n.js         ← Türkçe/İngilizce
│   │   └── crypto.js       ← Şifreleme
│   │
│   ├── css/
│   │   ├── main.css        ← Genel stiller
│   │   ├── dashboard.css   ← Panel stilleri
│   │   ├── theme-minimal.css
│   │   ├── theme-modern.css
│   │   ├── theme-dark.css
│   │   ├── theme-nature.css
│   │   └── theme-elegant.css
│   │
│   └── images/
│
└── data/                   (Statik JSON veriler)
```

---

## 🎨 5 Profesyonel Tema

| Tema | Renk | Stil | İdeal Kullanım |
|------|------|------|----------------|
| 🎨 **Minimal** | Mavi & Mor | Temiz, minimalist | Danışman, Freelancer |
| 💫 **Modern** | Pembe & Kırmızı | Canlı, dinamik | Tasarımcı, Kreatif |
| 🌙 **Dark** | Gri & Yeşil | Sofistike, tech | Developer, Startup |
| 🌿 **Nature** | Yeşil & Turkuaz | Organik, natural | Eco, Spa, Tarım |
| ✨ **Elegant** | Tan & Kahve | Lüks, serif | Premium, Luxury |

Her tema tamamen CSS'le yapılı, değiştirmek saniye alır!

---

## 🔑 Admin Paneli

Admin erişimi (ilk kurulan kullanıcı otomatik admin olur):

```
📧 Email: admin@websayfa.tr
🔐 Şifre: admin123
```

Admin Panelde Neler Yapılabilir?
- 👥 Tüm kullanıcıları görüntüle
- 🌐 Tüm siteleri yönet
- 🗑️ Problematik siteleri sil
- 📊 Site istatistiklerini gör
- ⚙️ Sistem ayarlarını düzenle

---

## 📞 Destek ve İletişim

- **📧 Email**: kodmatik66@gmail.com
- **🐙 GitHub**: [@websayfa](https://github.com/websayfa)
- **🌐 Website**: [websayfa.github.io/tr](https://websayfa.github.io/tr)
- **📱 WhatsApp**: [Mesaj Gönder](https://wa.me/905xxxxxxxxx)

---

## 🎓 Eğitim Amaçlı - Öğrenecekleri

Bu proje öğretiyor:

```
✅ Frontend:     HTML5, CSS3, Vanilla JavaScript
✅ Storage:      localStorage API, JSON
✅ Security:     Password Hashing, Encryption
✅ Email:        EmailJS integration
✅ Hosting:      GitHub Pages static hosting
✅ Design:       Responsive, Mobile-first
✅ i18n:         Çok dilli uygulama (TR/EN)
✅ UX/UI:        Modal, Form validation
```

Kodlar açık, yorumlu ve düzenlendi!

---

## 📄 Lisans

**MIT Lisansı** - Tamamen özgür kullanabilirsiniz

```
MIT License

Herkese izin verilir:
✅ Ticari kullanım
✅ Değişiklik yapma
✅ Dağıtma
✅ Özel kullanım

Sadece yükümlülük:
- Lisans ve telif hakkı bildirimi gerekli
```

---

## 🚀 Gelecek Planları

- [ ] Real-time database (Firebase)
- [ ] E-ticaret özelliği
- [ ] Ödeme sistemi (Stripe)
- [ ] SEO otomasyonu
- [ ] AI content suggestion
- [ ] Tema customizasyonu
- [ ] Mobile app
- [ ] Yedekleme sistemi

---

## 📊 Karşılaştırma Tablosu

| Özellik | WebSayfa.tr | Wix | Squarespace | WordPress.com |
|---------|------------|-----|-------------|------|
| Fiyat | 🆓 Ücretsiz | 💰 $14/ay | 💰 $12/ay | 💰 $4/ay |
| Tema | 5 | 100+ | 100+ | 1000+ |
| E-ticaret | ❌ | ✅ | ✅ | ✅ |
| Database | ❌ | ✅ | ✅ | ✅ |
| Kolay Kullanım | ✅ | ✅ | ✅ | ✅ |
| Açık Kaynak | ✅ | ❌ | ❌ | ✅ |
| Offline Çalış | ✅ | ❌ | ❌ | ❌ |

---

**Made with ❤️ by WebSayfa.tr**

*Son güncelleme: 31 Ocak 2026*
