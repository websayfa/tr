# ⚡ WebSayfa.tr - 5 Dakikalık Hızlı Başlangıç

Projeyi fork ettiniz mi? İşte en hızlı yol:

---

## 🚀 5 Dakika İçinde Canlı Yayın

### Adım 1: Fork (1 dakika)
```
https://github.com/websayfa/tr → Fork
```

### Adım 2: GitHub Pages Etkinleştir (1 dakika)
1. Settings → Pages
2. Branch: `main` → Save

### Adım 3: Deploy Bekle (3 dakika)
- Site otomatik yayında: `https://[USERNAME].github.io/tr`
- ✅ Bitti!

---

## 🌐 Kendi Domain'e Kurulum (15 dakika)

### Seçenek A: Ücretsiz Domain
1. [Freenom.com](https://freenom.com) → `.tk` domain seç
2. DNS: Freenom yönetim panelinde namesrvers'ı AWS'ye yönlendir
3. CNAME dosyası güncelle ve push et

### Seçenek B: Ucuz Domain
1. GoDaddy ($0.99) / Namecheap ($8.88)
2. GitHub Pages nameservers'ı ayarla
3. CNAME dosyası güncelle ve push et

**Detay:** [CUSTOM_DOMAIN_GUIDE.md](CUSTOM_DOMAIN_GUIDE.md)

---

## 💻 Yerel Geliştirme

```bash
# Proje klasörüne gidin
cd tr

# Sunucu başlatın
python3 -m http.server 3000

# Tarayıcı: http://localhost:3000
```

---

## ✏️ Önemli Güncellemeler

Fork'tan sonra değiştirin:

1. **CNAME dosyası** → Kendi domain'iniz
2. **assets/js/auth.js** → EmailJS anahtarınız
3. **pages/dashboard.html** → Admin şifresi
4. **index.html** → Branding/logo

---

## 📚 Detaylı Rehberler

| Rehber | İçerik |
|--------|--------|
| [DEPLOYMENT.md](DEPLOYMENT.md) | GitHub Pages + Custom Domain |
| [CUSTOM_DOMAIN_GUIDE.md](CUSTOM_DOMAIN_GUIDE.md) | Domain satın alma ve DNS |
| [KURULUM_REHBERI.md](KURULUM_REHBERI.md) | Detaylı kurulum adımları |
| [TEKNIK_DOKUMANTASYON.md](TEKNIK_DOKUMANTASYON.md) | Teknik mimari |
| [README.md](README.md) | Proje özeti |

---

## 🆘 Sorun mu?

Bkz. [DEPLOYMENT.md - Sorun Giderme](DEPLOYMENT.md#-sorun-giderme)

---

**⏱️ Toplam Süre:**
- Sadece GitHub Pages: **5 dakika**
- GitHub Pages + Özel Domain: **15 dakika**
- Yerel Geliştirme: **Hemen**

**Destek:** kodmatik66@gmail.com
