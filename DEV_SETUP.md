# WebSayfa.tr - Dev Container Kurulum

## 🚀 Quick Start

### 1. Repoyu Clone Et
```bash
git clone https://github.com/websayfa/tr.git
cd tr
```

### 2. Server Başlat
```bash
# Python 3
python3 -m http.server 8000

# veya Node.js (eğer kurulu ise)
npx serve
```

### 3. Tarayıcıda Aç
```
http://localhost:8000
```

---

## 📁 Proje Yapısı

```
/workspaces/tr/
├── index.html              # Ana sayfa
├── admin.html              # Admin login
├── guide.html              # Başlangıç rehberi
├── CNAME                   # GitHub Pages domain
├── DATABASE_SCHEMA.md      # Veri yapısı
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions deploy
├── assets/
│   ├── css/
│   │   ├── main.css        # Ana stiller
│   │   ├── dashboard.css   # Dashboard stiller
│   │   └── theme-*.css     # 5 tema CSS
│   └── js/
│       ├── i18n.js         # Dil yönetimi
│       ├── crypto.js       # Şifreleme
│       ├── auth.js         # Kimlik doğrulama
│       ├── main.js         # Ana sayfa JS
│       └── dashboard.js    # Dashboard JS
├── pages/
│   ├── dashboard.html      # Kullanıcı paneli
│   └── preview.html        # Site önizlemesi
└── data/
    └── (gelecek)
```

---

## 🔐 Demo Hesapları

### Admin Hesabı
- **Username**: admin
- **Email**: admin@websayfa.tr
- **Password**: admin123
- **Erişim**: http://localhost:8000/admin.html

### Test Kullanıcısı
Herhangi bir e-mail ve şifre ile kaydolabilirsiniz:
```
Email: test@example.com
Password: test123
```

---

## 🌐 GitHub Pages Deployment

### 1. Settings'e Git
```
GitHub Repo → Settings → Pages
```

### 2. Branch Seç
- Source: `main`
- Folder: `/ (root)`

### 3. Deploy
```bash
git add .
git commit -m "WebSayfa.tr deployment"
git push origin main
```

### 4. Domain Ayarla (İsteğe Bağlı)
```
Settings → Pages → Custom domain
```

---

## 🛠️ Geliştirme Ortamı

### Requirements
- Python 3.6+ veya Node.js
- Modern tarayıcı (Chrome, Firefox, Safari, Edge)
- Git

### IDE Recommendations
- Visual Studio Code
- WebStorm
- Sublime Text

### VS Code Extensions
```json
{
  "esbenp.prettier-vscode": "Code formatter",
  "dbaeumer.vscode-eslint": "Linter",
  "ritwickdey.LiveServer": "Live server"
}
```

---

## 📝 Geliştirme Notları

### localStorage Verileri
Veritabanı işlemleri **browser localStorage**'da yapılır:

```javascript
// Kullanıcıları yükle
const allUsers = authManager.users;

// Siteleyi yükle
const userSites = siteManager.sites;

// Verileri temizle (gerekirse)
localStorage.clear();
```

### Admin Paneli
Admin hesabı sistem tarafından otomatik oluşturulur:
```javascript
// admin@websayfa.tr / admin123
// Erişim: /admin.html
```

### Tema Ekleme
Yeni tema eklemek için:
1. `assets/css/theme-newname.css` oluştur
2. `.theme-newname` sınıfını belirle
3. `THEMES` objesine ekle (main.js)

---

## 🐛 Hata Ayıklama

### Browser Console
```javascript
// Kullanıcı kontrol et
console.log(authManager.currentUser);

// Siteleri kontrol et
console.log(siteManager.sites);

// localStorage'ı temizle
localStorage.clear();
```

### Common Issues

**Problem**: Veriler kayıtlanmıyor
- Çözüm: Browser's localStorage açık mı?
- Kontrol: DevTools → Application → LocalStorage

**Problem**: Login olmuyor
- Çözüm: E-mail ve şifreyi kontrol et
- Admin mi?: /admin.html'i dene

**Problem**: Tema yüklenmiyor
- Çözüm: CSS dosyaları yüklü mü?
- Kontrol: DevTools → Network tab

---

## 📊 Performans

### Optimizasyonlar
- ✅ Minimal JavaScript (Vanilla JS)
- ✅ CSS Grid & Flexbox
- ✅ Lazy loading desteği
- ✅ Responsive design

### Lighthouse Hedefleri
- Performance: 90+
- Accessibility: 95+
- Best Practices: 90+
- SEO: 90+

---

## 🚀 Üretim Deployment

### GitHub Pages
1. Repo'ya push et
2. GitHub Actions otomatik deploy eder
3. Site: `https://websayfa.tr`

### Custom Domain
1. Domain sağlayıcısında CNAME ayarla:
   ```
   websayfa.tr.github.io
   ```
2. CNAME dosyasını güncelle
3. GitHub Settings → Pages → Custom domain

### SSL/TLS
- ✅ Otomatik (GitHub Pages sağlıyor)

---

## 📚 Kaynaklar

- [GitHub Pages Docs](https://pages.github.com/)
- [Web.dev Best Practices](https://web.dev/)
- [MDN Web Docs](https://developer.mozilla.org/)

---

## 👥 Katkı

Geliştirilmesi için:
1. Fork et
2. Feature branch oluştur
3. Commit et
4. Pull request aç

---

## 📄 Lisans

MIT License - Özgür kullanım

---

**Sürüm**: 1.0.0  
**Son Güncelleme**: 31 Ocak 2026
