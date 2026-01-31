# 🚀 WebSayfa.tr - Kurulum Rehberi

**Kendi Domain'inde WebSayfa.tr Nasıl Kurulur?**

---

## 📋 İçindekiler

1. [Hızlı Başlangıç (5 Dakika)](#hızlı-başlangıç)
2. [GitHub Pages Kurulumu](#github-pages-kurulumu)
3. [Özel Domain Kurulumu](#özel-domain-kurulumu)
4. [Yerel Geliştirme](#yerel-geliştirme)
5. [Sorun Giderme](#sorun-giderme)

---

## ⚡ Hızlı Başlangıç

### Seçenek 1: GitHub Pages'de (5 Dakika) ✨

#### Adım 1: Depoyu Fork'la

```
1. https://github.com/websayfa/tr sayfasına git
2. Sağ üstte "Fork" butonuna tıkla
3. "Create Fork" butonuna tıkla
4. ✅ Artık senin GitHub hesabında bir kopya var
```

#### Adım 2: GitHub Pages'i Aktifleştir

```
1. Fork'ladığın deposu aç
2. Settings → Pages (Sol menüde)
3. "Branch" kısmında "main" seç
4. "Save" butonuna tıkla
5. ✅ 2-3 dakika bekle, sayfan yayında olacak
```

#### Adım 3: Sitenize Erişin

```
Sayin URL: https://kullanici-adi.github.io/tr

Örnek:
- Kullanıcı adı: ahmet
- Sayin URL: https://ahmet.github.io/tr
- Admin: admin@websayfa.tr / admin123
```

---

## 🌐 GitHub Pages Kurulumu

### Detaylı Adımlar

#### **Adım 1: GitHub Hesabı Oluştur**

Eğer GitHub hesabın yoksa:
```
1. https://github.com/signup sayfasına git
2. Email adresini gir
3. Şifre belirle
4. Veritabanı adı seç (sadece harf, rakam, tire)
5. Email'ine gelen linke tıkla (doğrula)
```

#### **Adım 2: Depoyu Fork'la**

```
1. https://github.com/websayfa/tr aç
2. Sağ üst köşede "Fork" butonuna tıkla
3. Owner olarak kendi adını seç
4. Repo adını iste: 
   - UNUTMA: Repo adı "tr" olmalı!
5. "Create Fork" butonuna tıkla
```

#### **Adım 3: GitHub Pages Aktifleştir**

```
1. Fork'ladığın repo → Settings
2. Sol menüden "Pages" seç
3. "Source" kısmında:
   - Branch: "main" seç
   - Folder: "/ (root)" seç
4. "Save" butonuna tıkla
5. Sayfayı yenile
6. Altında şöyle göreceksin:
   "Your site is live at https://USERNAME.github.io/tr"
```

#### **Adım 4: Test Et**

```
Tarayıcıda aç:
https://USERNAME.github.io/tr

USERNAME kısmına kendi GitHub kullanıcı adını yaz
Örnek: https://mehmet-aydin.github.io/tr
```

### ✅ Başarılı İşaretleri

- 🟢 Yeşil çıkış işareti görüyorsun
- 📱 Sayin responsive görünüyor
- 🔐 HTTPS (https:// ile başlıyor)
- ⚡ 1-2 saniyede yükleniyor

---

## 🔧 Özel Domain Kurulumu

### Seçenek 1: Ücretsiz Domain (.tk, .ml, .ga)

#### **Freenom.com'dan Domain Al (Ücretsiz)**

```
1. https://www.freenom.com aç
2. Sağ üstte "Sign in" → "Create account"
3. Email ve şifre ile kayıt ol
4. "Domains" → "Register a new domain"
5. Domain adını gir (ör: websayfa)
6. Uzantı seç: .tk (Tonga), .ga (Gabon) vb.
7. "Check Availability"
8. "Get it now" butonuna tıkla
9. Period: "12 Months Free" seç
10. "Complete Order"
11. ✅ Domain senin oldu!

Örnek domain: websayfa.tk
```

#### **Domain'i GitHub'a Bağla**

```
1. Freenom dashboard'da domain'ini seç
2. "Manage Domain" → "Nameservers" seç
3. "Use Freenom nameservers" seç
4. Nameservers:
   - ns1.freenom.com
   - ns2.freenom.com
   - ns3.freenom.com
   - ns4.freenom.com
5. "Change Nameservers" butonuna tıkla

6. GitHub deposu → Settings → Pages
7. "Custom domain" alanına yaz: websayfa.tk
8. "Save" butonuna tıkla
9. "Enforce HTTPS" kutusunu işaretle
10. ✅ DNS propagation 24 saat sürebilir

Bekleme süresi: 5 dakika - 24 saat
```

### Seçenek 2: Ücretli Domain (.com, .org)

#### **Hosting Sağlayıcısından Al**

Popüler sağlayıcılar:
```
- Namesilo ($8.99/yıl)
- GoDaddy ($1/yıl ilk yıl)
- Namecheap ($8.88/yıl)
- Hovercelerator ($1/yıl ilk yıl)
```

Örnek: Namesilo.com

```
1. https://www.namesilo.com aç
2. "Domain Registration" → Domain ara
3. Domain seç ve "Add to Cart"
4. Checkout yapıp ödeme yap
5. Hesabınza giriş yap

6. Account → "Domains" → Domainini seç
7. "Manage Nameservers" seç
8. Custom Nameservers:
   - ns1.github.com
   - ns2.github.com
   - ns3.github.com
   - ns4.github.com
9. Kaydet

10. GitHub Settings → Pages → Custom domain
11. Domain'i yaz: ornek.com
12. Save et
13. Enforce HTTPS kutusunu işaretle
```

### ✅ Domain Kontrol

```bash
# Terminal'de kontrol et
nslookup ornek.com

# Çıktı şöyle görünmeli:
# Name Server: ns1.github.com
# Name Server: ns2.github.com
```

---

## 💻 Yerel Geliştirme

### Windows/Mac/Linux'ta Çalıştırma

#### **Gereksinimler**

```
✅ Git (https://git-scm.com/downloads)
✅ Python 3.x (https://python.org)
✅ Tarayıcı (Chrome, Firefox, Safari)
```

#### **Adım 1: Depoyu İndir**

```bash
# Terminal/Command Prompt'u aç

# GitHub'dan clone et
git clone https://github.com/KULLANICI-ADIN/tr.git
cd tr

# Veya ZIP'ten indir:
# 1. GitHub sayfanda Code → Download ZIP
# 2. Klasörü aç
# 3. Komut istemcisini açıp klasöre git
```

#### **Adım 2: Sunucuyu Başlat**

```bash
# Python 3.x (Önerilen)
python3 -m http.server 3000

# Python 2.x (Eski sürüm)
python -m SimpleHTTPServer 3000

# Çıktı:
# Serving HTTP on 0.0.0.0 port 3000 (http://0.0.0.0:3000/) ...
```

#### **Adım 3: Tarayıcıda Aç**

```
http://localhost:3000

✅ Ana sayfa açılmalı
```

#### **Adım 4: Değişiklik Yap ve Test Et**

```bash
# index.html'i düzenle (herhangi bir text editor)
# Tarayıcıda yenile (F5 veya Ctrl+R)
# Değişiklikler görülmeli
```

#### **Sunucuyu Durdur**

```bash
# Terminal'de Ctrl+C tuşlarına bas
^C

# Çıktı:
# KeyboardInterrupt
```

---

## 📝 Kendi Alanındaki Değişiklikler

### Destek Bilgilerini Güncelle

Başlık ve kontakt bilgilerini kendi alanına uygun hale getir:

#### **1. Ana Sayfa (index.html)**

```html
<!-- Başlık kısmını değiştir -->
<title>Ücretsiz Web Sitesi Oluştur - YENİ-ADI</title>

<!-- Logo ve adı değiştir -->
<a href="index.html" class="logo">YENİ-ADI.tr</a>

<!-- Footer'da iletişimi güncelle -->
<p style="font-size: 0.9rem; color: #666;">
    📧 Destek: <strong>SENIN-EMAIL@example.com</strong> | 
    🐙 GitHub: <a href="https://github.com/SENIN-ADIN/tr.github.io">
        SENIN-ADIN/tr.github.io
    </a>
</p>
```

#### **2. Admin Hesabı Değiştir (auth.js)**

```javascript
// assets/js/auth.js dosyasında ara:

// Şu kısmı bul:
const adminUser = {
    id: 'admin_' + Date.now(),
    username: 'admin',
    email: 'admin@websayfa.tr',
    password: SimpleCrypto.hashPassword('admin123'),
    ...
};

// Bunu değiştir:
const adminUser = {
    id: 'admin_' + Date.now(),
    username: 'admin',
    email: 'SENIN-EMAIL@example.com',
    password: SimpleCrypto.hashPassword('SENIN-SIFRE'),
    ...
};
```

#### **3. README.md'yi Güncelle**

```markdown
# 🌐 Senin Platform Adı

> **Ana Site:** https://ornek.com  
> **GitHub:** [SENIN-ADIN/tr](https://github.com/SENIN-ADIN/tr)  
> **Destek:** 📧 senin-email@example.com
```

---

## 🔄 Fork Sonrası Quick Setup

### Otomatik Setup (Opsiyonel)

GitHub'da bu dosyaları düzenlemek yerine, terminal'de bu komutları çalıştır:

```bash
# 1. Depoyu clone et
git clone https://github.com/SENIN-ADIN/tr.git
cd tr

# 2. İlk ayarları yap
git config user.name "Adın"
git config user.email "emailin@example.com"

# 3. Değişiklikleri yapıp commit et
git add -A
git commit -m "🔧 Kişisel ayarlamalar eklendi"

# 4. GitHub'a push et
git push origin main
```

### Manual Setup (GitHub Web Arayüzü)

```
1. Deposu aç
2. index.html'i düzenle:
   - Dosya ikonuna tıkla
   - Kalem ikonuna tıkla (Edit)
   - Değişiklik yap
   - "Commit changes" butonuna tıkla

3. Aynı şekilde diğer dosyalar için tekrarla
4. Sayfana git → Değişiklikler gözükmeli
```

---

## 🐛 Sorun Giderme

### Problem 1: "Sayfa 404 (Bulunamadı) verme"

**Çözüm:**
```
1. GitHub Settings → Pages kontrol et
2. Branch "main" seçili mi?
3. Folder "/" seçili mi?
4. 5 dakika bekle (deployment süresi)
5. https://USERNAME.github.io/tr yazıp dene
```

### Problem 2: "GitHub Pages aktifleştirilmiyor"

**Çözüm:**
```
1. Repo'nun public mu (Settings → Visibility)
2. index.html dosyası var mı?
3. README.md dosyası var mı?
4. "main" branch'i default mi?

Şu komutla kontrol et:
git branch -a
# * main ← Başında * olmalı
```

### Problem 3: "Özel domain çalışmıyor"

**Çözüm:**
```
1. CNAME dosyası var mı (repo root'ta)?
2. CNAME içeriği: domain.com (sadece bu)
3. DNS ayarları doğru mu?
4. 24 saat bekle (propagation)

Komanda ile kontrol:
dig domain.com
nslookup domain.com
```

### Problem 4: "Localhost çalışmıyor"

**Çözüm:**
```bash
# Python 3 değil Python 2 olabilir
which python3  # Python yolu
python3 --version  # Versiyon kontrol

# Farklı port dene
python3 -m http.server 8000
# http://localhost:8000 aç

# Port zaten kullanılıyorsa
# Windows:
netstat -ano | findstr :3000

# Mac/Linux:
lsof -i :3000
```

### Problem 5: "Email doğrulama çalışmıyor"

**Çözüm:**
```
1. Browser konsolunu aç (F12)
2. Console tab'ında kontrol et:
   - ✅ "EmailJS başlatıldı" mesajı var mı?
   - ✅ Doğrulama kodu oluşturuldu mesajı var mı?

3. Email spam klasörü kontrol et
4. EmailJS API key kontrol et (auth.js)
```

---

## 📊 Deployment Checklist

Kendi domain'ine deploy etmeden önce kontrol et:

```
□ GitHub hesabı oluşturdu
□ Depoyu fork'ladı
□ Settings → Pages aktif
□ index.html dosyası var
□ CSS dosyaları yüklü
□ JavaScript dosyaları yüklü
□ HTTPS çalışıyor (yeşil kilit)
□ Mobil responsive çalışıyor
□ Tüm linkler çalışıyor
□ Admin paneline girebiliyor
□ Kayıt sistemi çalışıyor
□ Email doğrulama çalışıyor (veya localStorage)
```

---

## 🎯 Sonraki Adımlar

### 1. Temanızı Özelleştirin

```css
/* assets/css/main.css */
:root {
    --primary: #YOUR-COLOR;      /* Ana renk */
    --secondary: #YOUR-COLOR;    /* İkinci renk */
}
```

### 2. Kontakt Bilgilerini Güncelleyin

```javascript
// assets/js/main.js
// DEMO_SITES dizisini kendi sitelerinle doldur
```

### 3. Veritabanı Entegrasyonu (İsteğe Bağlı)

```
Şu adımların sonrasında:
- Firebase (Google Cloud)
- Supabase (PostgreSQL)
- MongoDB Atlas
```

---

## 📞 Yardım & Destek

- **GitHub Issues**: [websayfa/tr/issues](https://github.com/websayfa/tr/issues)
- **Email**: kodmatik66@gmail.com
- **Dokümantasyon**: [TEKNIK_DOKUMANTASYON.md](TEKNIK_DOKUMANTASYON.md)

---

## ✅ Tamamlama Çizelgesi

- [ ] GitHub hesabı oluşturdum
- [ ] Depoyu fork'ladım
- [ ] GitHub Pages aktif ettim
- [ ] Özel domain satın aldım
- [ ] DNS ayarlarını yaptım
- [ ] Destek bilgilerini güncelledim
- [ ] Admin hesabı değiştirdim
- [ ] Yerel sunucuda test ettim
- [ ] Sayfamı doğru URL'de açtım
- [ ] Kayıt sistemi çalışıyor

---

**Başarılı olduğun zaman screenshot'ını Twitter'da @websayfa etiketiyle paylaş!** 🎉

*Sorularınız için destek: kodmatik66@gmail.com*
