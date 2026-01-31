# 🚀 GitHub Pages Deployment Rehberi

WebSayfa.tr projesini fork ettiyseniz ve kendi domain'inize deploy etmek istiyorsanız, bu rehber size adım adım rehberlik edecektir.

## 📋 İçindekiler
1. [Hızlı Başlangıç (5 dakika)](#hızlı-başlangıç)
2. [Adım Adım Kurulum](#adım-adım-kurulum)
3. [GitHub Pages Ayarları](#github-pages-ayarları)
4. [Özel Domain Bağlama](#özel-domain-bağlama)
5. [Sorun Giderme](#sorun-giderme)

---

## 🏃 Hızlı Başlangıç

### 1. Projeyi Fork'layın
GitHub'da [WebSayfa.tr](https://github.com/websayfa/tr) deposuna gidin ve **Fork** butonuna tıklayın.

```
https://github.com/[USERNAME]/tr
```

### 2. GitHub Pages Etkinleştirin

1. Fork'ladığınız repository'ye gidin
2. **Settings** → **Pages** (sol menüden)
3. **Source** bölümünde:
   - Branch: `main` seçin
   - Folder: `/(root)` seçin
4. **Save** butonuna tıklayın

### 3. Deploy Oldu! ✅

3-5 dakika bekleyin. Siteniz şu adresde canlı olacaktır:
```
https://[USERNAME].github.io/tr
```

Örneğin: `https://ahmet.github.io/tr`

---

## 🔧 Adım Adım Kurulum

### Yerel Ortamda Çalıştırma

#### Windows:

```bash
# Proje dizinine gidin
cd tr

# Python sunucusu başlatın
python -m http.server 3000
```

Tarayıcıda açın: `http://localhost:3000`

#### macOS / Linux:

```bash
cd tr
python3 -m http.server 3000
```

#### Setup Script'ini Kullanma (Otomatik):

```bash
bash setup.sh
```

İstenecek soruları cevaplayın:
- GitHub username'iniz
- Repository adı (varsayılan: tr)
- Özel domain kullanacak mısınız?

---

## 📊 GitHub Pages Ayarları

### Yapılandırma Adımları

#### Adım 1: Repository Settings'e Gidin
1. GitHub'da fork'ladığınız `tr` repository'sine gidin
2. **Settings** sekmesini tıklayın
3. Sol menüde **Pages** seçeneğini bulun

#### Adım 2: Source Ayarını Yapın
```
Source: Deploy from a branch
Branch: main
Folder: /(root)
```

#### Adım 3: Deployment Durum Kontrolü
- **Settings** → **Environments** → **github-pages**
- Burada deployment geçmişini görebilirsiniz
- Yeşil ✅ işaret başarıyı gösterir

### GitHub Actions (Otomatik Deployment)

`.github/workflows/deploy.yml` dosyası otomatik deployment'ı yönetir.

Her `git push` yaptığınızda:
1. ✅ HTML/CSS/JS dosyaları kontrol edilir
2. 📤 Dosyalar GitHub Pages sunucusuna yüklenir
3. 🌐 Site canlı hale gelir (3-5 dakika)

Deployment durum kontrolü:
1. Repository → **Actions** sekmesine gidin
2. En son "push" komut'unu tıklayın
3. Yeşil ✅ işaret başarıyı gösterir

---

## 🌐 Özel Domain Bağlama

### Option 1: Ücretsiz Domain (Freenom)

Bkz. [CUSTOM_DOMAIN_GUIDE.md](CUSTOM_DOMAIN_GUIDE.md#freenom-ücretsiz-domain)

Özet:
1. [Freenom.com](https://www.freenom.com)'a gidin
2. `.tk`, `.ml`, `.ga` veya `.cf` domain seçin
3. DNS Nameservers'ı şunlara ayarlayın:
   ```
   ns-1012.awsdns-64.com
   ns-1318.awsdns-90.com
   ns-880.awsdns-36.com
   ns-77.awsdns-29.co.uk
   ```

### Option 2: Ucuz Paid Domain

Bkz. [CUSTOM_DOMAIN_GUIDE.md](CUSTOM_DOMAIN_GUIDE.md#godaddy-99-usd)

Önerilen: GoDaddy ($0.99), Namecheap ($8.88), Namesilo ($8.99)

### CNAME Dosyası Güncelleme

1. Proje kökünde `CNAME` dosyasını açın
2. Şu satırı bulun:
   ```
   websayfa.tr
   ```
3. Kendi domain'iniz ile değiştirin:
   ```
   example.com
   ```
4. Kaydedin ve commit edin:
   ```bash
   git add CNAME
   git commit -m "CNAME domain updated: example.com"
   git push origin main
   ```

### GitHub Pages'te Custom Domain Ayarı

1. Repository → **Settings** → **Pages**
2. **Custom domain** bölümüne domain adınızı girin
3. **Save** tıklayın
4. ✅ **Enforce HTTPS** seçeneğini işaretleyin

---

## 🐛 Sorun Giderme

### Problem 1: Site 404 Hatası Veriyor

**Çözüm:**
```bash
# Tüm dosyaları kontrol edin
git status

# Eksik dosyaları ekleyin
git add .
git commit -m "Add missing files"
git push origin main

# 5 dakika bekleyin ve tarayıcı cache'i temizleyin (Ctrl+Shift+Del)
```

### Problem 2: Custom Domain Çalışmıyor

**Çözüm:**
1. CNAME dosyasının doğru olduğunu kontrol edin
2. DNS propagation'ı kontrol edin: [DNSChecker.org](https://dnschecker.org/)
3. GitHub Pages settings'de domain'i kontrol edin
4. HTTPS sertifikası yüklenmesini bekleyin (5-10 dakika)

### Problem 3: www. ile Çalışmıyor

**Çözüm:** DNS'de A record'u şu IP'lere ayarlayın:
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

### Problem 4: HTTPS Sertifikası Hatası

**Çözüm:**
1. Settings → Pages → Custom domain → Save'ı tekrar tıklayın
2. "Enforce HTTPS" seçeneğini işaretleyin
3. 15-30 dakika bekleyin

### Problem 5: Dosya Değişiklikleri Yansımıyor

**Çözüm:**
```bash
# Cache'i temizle (tarayıcı)
# Ctrl+Shift+Del (Windows/Linux)
# Cmd+Shift+Del (Mac)

# Veya hard refresh
Ctrl+F5 (Windows/Linux)
Cmd+Shift+R (Mac)
```

### Problem 6: Sub-domain Çalışmıyor

Bkz. [CUSTOM_DOMAIN_GUIDE.md - Sub-domain Kurulumu](CUSTOM_DOMAIN_GUIDE.md#sub-domain-kurulumu)

---

## 📚 Detaylı Rehberler

- **[CUSTOM_DOMAIN_GUIDE.md](CUSTOM_DOMAIN_GUIDE.md)** - Özel domain satın alma ve kurulumu
- **[TEKNIK_DOKUMANTASYON.md](TEKNIK_DOKUMANTASYON.md)** - Teknik mimarisi ve işleyişi
- **[README.md](README.md)** - Genel bilgiler ve özellikler

---

## 🔐 Güvenlik Notları

Fork'ladığınız proje için:

### 1. EmailJS Yapılandırması
[assets/js/auth.js](assets/js/auth.js#L1-L10)'da EmailJS anahtarlarını güncelleyin:

```javascript
// Mevcut (değiştirin):
emailjs.init("YOUR_PUBLIC_KEY");

// Yeni key'inizi alın: https://www.emailjs.com
```

### 2. Admin Şifresi
[pages/dashboard.html](pages/dashboard.html)'de varsayılan admin şifresini değiştirin

### 3. Branding
[index.html](index.html)'de logo ve şirket bilgilerini güncelle

---

## ✨ Deployment Checklist

Fork'tan önce ve deploy etmeden kontrol edin:

- [ ] Repository fork'lanmış mı?
- [ ] GitHub Pages Settings'de main branch seçildi mi?
- [ ] CNAME dosyası kendi domain'iniz ile güncellenmiş mi?
- [ ] EmailJS anahtarları değiştirildi mi?
- [ ] Admin şifresi değiştirildi mi?
- [ ] index.html'de branding güncellenmiş mi?
- [ ] Yerel sunucuda test edildi mi?
- [ ] Git commit ve push yapılmış mı?
- [ ] GitHub Actions successful oldu mu?
- [ ] Site canlı mı? (5-10 dakika bekle)

---

## 🆘 Destek

Sorun yaşıyorsanız:

1. **[CUSTOM_DOMAIN_GUIDE.md](CUSTOM_DOMAIN_GUIDE.md)** - Ayrıntılı troubleshooting
2. **[TEKNIK_DOKUMANTASYON.md](TEKNIK_DOKUMANTASYON.md)** - Teknik detaylar
3. **Email**: kodmatik66@gmail.com
4. **GitHub Issues**: [websayfa/tr/issues](https://github.com/websayfa/tr/issues)

---

## 🎓 Öğrenme Kaynakları

- [GitHub Pages Rehberi](https://pages.github.com/)
- [GitHub Pages Doğum Ayarları](https://docs.github.com/en/pages)
- [DNS Nedir?](https://www.cloudflare.com/learning/dns/what-is-dns/)
- [Custom Domain Kurulumu](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

---

**Son Güncelleme**: Ocak 2025
**Versiyon**: 1.0
