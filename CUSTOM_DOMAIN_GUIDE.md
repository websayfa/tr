# 🌍 Özel Domain Kurulumu - Detaylı Rehber

**Kendi Domain'inde WebSayfa.tr Nasıl Kurulur?**

> **Örnek:** www.freewebpage.com veya www.senin-adi.com

---

## 📋 İçindekiler

1. [Domain Satın Alma](#domain-satın-alma)
2. [DNS Ayarları](#dns-ayarları)
3. [GitHub Pages Bağlantısı](#github-pages-bağlantısı)
4. [Doğrulama](#doğrulama)
5. [Sub-domain Yapılandırması](#sub-domain-yapılandırması)
6. [HTTPS/SSL](#httpsssl)
7. [Sorun Giderme](#sorun-giderme)

---

## 🛒 Domain Satın Alma

### Seçenek 1: Ücretsiz Domain (.tk, .ml, .ga)

#### **Freenom.com (100% Ücretsiz)**

```
Adımlar:
1. https://www.freenom.com sayfasına git
2. Sağ üstte "Sign in" → "Create account"
3. Email ve şifre ile kayıt ol
4. "Domains" → "Register a new domain"
5. Domain adını yaz: "freewebpage"
6. Uzantısını seç: ".tk" (Tonga)
7. Arama yap ("Check Availability")
8. Yeşil işaret gördüysen "Get it now"
9. Period: "12 Months Free" seç
10. "Complete Order" butonuna tıkla

Sonuç: freewebpage.tk (Senin!)
```

**Ücretsiz Domain Seçenekleri:**
```
.tk  → Tonga
.ml  → Mali  
.ga  → Gabon
.cf  → Kongo

⚠️ Not: Ücretsiz domainler 3-12 ay geçerli
Periyodik olarak yenilemeniz gerekir
```

#### **Alternatif Ücretsiz Sağlayıcılar**

| Site | Domain | Ücret | Süre |
|------|--------|-------|------|
| Freenom | .tk/.ml/.ga | Ücretsiz | 12 ay |
| eu.org | .eu.org | Ücretsiz | 2 yıl |
| Dot.tk | .tk | Ücretsiz | 12 ay |

### Seçenek 2: Ucuz Domain (İlk Yıl)

#### **GoDaddy.com ($0.99 İlk Yıl)**

```
1. https://www.godaddy.com aç
2. Domain arama kutusuna yaz: "freewebpage"
3. Uzantı seç: ".com" veya ".io"
4. Sepete ekle
5. Checkout yap
6. Giriş yap veya yeni hesap oluştur
7. Ödeme bilgilerini gir (Kredi kartı)
8. "Buy Now" butonuna tıkla

Maliyet: $0.99 (ilk yıl), $11.99 (sonraki yıllar)
```

#### **Namecheap.com ($8.88/yıl)**

```
1. https://www.namecheap.com aç
2. Domain arama yap
3. Domain seç ve sepete ekle
4. Checkout
5. Hesap oluştur
6. Ödeme yap

Maliyet: $8.88/yıl (sabit fiyat)
🎁 Bonus: Whois Privacy ücretsiz
```

#### **Namesilo.com ($8.99/yıl)**

```
1. https://www.namesilo.com aç
2. Domain arama yap
3. Domain seç ve "Add to Cart"
4. Checkout
5. Ödeme yap

Maliyet: $8.99/yıl
💡 Referral bonusu var
```

---

## 🔧 DNS Ayarları

### DNS Nedir?

```
DNS = Domain Name System

İşlevi: Domain adını (www.example.com) 
IP adresine (192.0.2.1) çevirmek

Akış:
1. Tarayıcıya www.example.com yazarsın
2. DNS sorgulanır
3. DNS "bu domain IP 192.0.2.1'e gidiyor" der
4. Sunucuya bağlanırsın
```

### GitHub Pages DNS Ayarları

GitHub Pages'in IP adresleri:

```
IPv4: 185.199.108.153
      185.199.109.153
      185.199.110.153
      185.199.111.153

IPv6: 2606:50c0:8000::153
      2606:50c0:8001::153
      2606:50c0:8002::153
      2606:50c0:8003::153

Nameservers:
ns1.github.com
ns2.github.com
ns3.github.com
ns4.github.com
```

### DNS Ayarlarını Yapılandır

#### **Yöntem 1: Nameserver Değiştirme (Önerilen)**

```
1. Domain sağlayıcısında giriş yap
2. "Manage Domain" → "Nameservers" aç
3. Şu nameserver'ları gir:
   ns1.github.com
   ns2.github.com
   ns3.github.com
   ns4.github.com
   
4. Kaydet
5. ⏳ 24 saat bekle (DNS propagation)
```

**GoDaddy Örneği:**
```
1. GoDaddy dashboard → Domains
2. Domain'ı seç → Manage DNS
3. "Nameservers" kısmını aç
4. "Change Nameservers" butonuna tıkla
5. Custom nameservers seç
6. ns1.github.com, ns2.github.com... gir
7. Save butonuna tıkla
```

#### **Yöntem 2: A Record Kayıtları (Manuel)**

```
Eğer nameserver değiştiremezsen:

1. DNS Management sayfasında
2. A records kısmına git
3. Şu IP'leri ekle:
   @ (root): 185.199.108.153
   @: 185.199.109.153
   @: 185.199.110.153
   @: 185.199.111.153
   
4. www subdomain'i için:
   www: 185.199.108.153
   
5. Kaydet
6. 24 saat bekle
```

#### **Yöntem 3: CNAME Kaydı (Sub-domain)**

```
Eğer sadece sub-domain kullanmak istersen:

1. DNS Management sayfasında
2. CNAME Records kısmına git
3. Yeni kayıt ekle:
   Name: app
   Value: USERNAME.github.io
   
4. Kaydet

Sonuç: https://app.example.com → GitHub Pages
```

---

## 🔗 GitHub Pages Bağlantısı

### Custom Domain Ekle

#### **Adım 1: CNAME Dosyası**

```bash
# Terminalda
cd /path/to/tr
echo "example.com" > CNAME
git add CNAME
git commit -m "🌍 Custom domain ekle: example.com"
git push origin main
```

Veya GitHub Web arayüzünde:

```
1. Repo → "Add file" → "Create new file"
2. Dosya adı: CNAME
3. İçerik: example.com
4. "Commit changes" butonuna tıkla
```

#### **Adım 2: GitHub Settings'te Ekle**

```
1. Repository → Settings
2. Sol menüden "Pages" seç
3. "Custom domain" input'una yaz: example.com
4. "Save" butonuna tıkla
5. "Enforce HTTPS" kutusunu işaretle

Sonuç: 
- CNAME dosyası otomatik oluşur
- DNS kaydı GitHub'a eklenir
```

#### **Adım 3: Doğrula**

```
1. https://example.com yazıp aç
2. Sayfan yüklenmelidir
3. URL https://example.com olmalı (yeşil kilit)
4. ⏳ Eğer çalışmamışsa 24 saat bekle
```

---

## ✅ Doğrulama

### Manuel Kontrol

```bash
# Terminal'de çalıştır

# DNS A Records kontrol
nslookup example.com

# Çıktı (örnek):
# Name: example.com
# Address: 185.199.108.153

# CNAME kontrol
dig example.com

# Çıktı (örnek):
# example.com. 3600 IN A 185.199.108.153

# GitHub DNS doğrula
dig example.com +short
# 185.199.108.153 dönmeli

# Whole DNS Propagation kontrol
whois example.com
```

### Online Araçlar

```
1. https://dnschecker.org
   → Domain yaz → Kontrol et
   → Tüm dünyada DNS doğru mu bak

2. https://mxtoolbox.com
   → Domain yaz
   → "A Lookup" yapıştır
   → GitHub IP'leri görülmeli

3. https://whatsmydns.net
   → Domain yaz
   → DNS yayılımını gör (tüm dünyada)
```

---

## 🔀 Sub-domain Yapılandırması

### Örnek: app.example.com

#### **Adım 1: DNS Kaydı Ekle**

```
Sub-domain adı: app
Değer: USERNAME.github.io

Veya GitHub Pages kullanıyorsa:
Type: CNAME
Name: app
Value: USERNAME.github.io
```

#### **Adım 2: GitHub CNAME Dosyası**

```
CNAME dosyasında:
app.example.com

Veya:
app.example.com
web.example.com
www.example.com
(Birden fazla sub-domain desteklenir)
```

#### **Adım 3: Test Et**

```
https://app.example.com açtığında
https://USERNAME.github.io/tr sayfası açılmalı
```

### Birden Fazla Subdomain

```
1. CNAME dosyasını düzenle:
   example.com

2. DNS'te A Records ekle:
   @ → 185.199.108.153
   www → CNAME: example.com.
   app → CNAME: USERNAME.github.io
   api → CNAME: USERNAME.github.io
```

---

## 🔐 HTTPS/SSL

### HTTPS Nedir?

```
HTTPS = HTTP Secure (Şifreli)

❌ HTTP://example.com (Şifresiz - Tehlikeli)
✅ HTTPS://example.com (Şifreli - Güvenli)

GitHub Pages otomatik HTTPS sağlar!
```

### HTTPS Etkinleştir

#### **GitHub Pages'de Otomatik**

```
1. Repository → Settings → Pages
2. "Enforce HTTPS" kutusunu işaretle
3. Kaydet

İşte! HTTPS otomatik oldu.
⏳ Sertifika oluşturma: 5-15 dakika
```

#### **Doğrula**

```
Tarayıcıda aç: https://example.com

Kontrol noktaları:
✅ URL "https://" ile başlıyor
✅ Adres çubuğunda yeşil kilit var
✅ "Secure" yazısı görünüyor
✅ Sertifika bilgisi gözüküyor (tıkla)
```

---

## 🐛 Sorun Giderme

### Problem 1: "Domain çalışmıyor (404 error)"

**Semptomlar:**
```
https://example.com yazınca 404 Page Not Found
```

**Çözümler:**
```
1. DNS kontrol:
   nslookup example.com
   → 185.199.* ile başlamalı
   
2. GitHub Settings kontrol:
   - Custom domain doğru yazılmış mı?
   - Repo public mu?
   - index.html var mı?
   
3. CNAME dosyası kontrol:
   git show CNAME
   → example.com yazıyor mu?
   
4. 24 saat bekle (DNS propagation)

5. Browser cache temizle:
   Ctrl+Shift+Delete
```

### Problem 2: "Yalnızca www çalışıyor"

**Semptomlar:**
```
https://www.example.com ✅ Çalışıyor
https://example.com ❌ Çalışmıyor
```

**Çözüm:**
```
1. DNS A Records ekle:
   @ (root) → 185.199.108.153
   @ → 185.199.109.153
   @ → 185.199.110.153
   @ → 185.199.111.153
   
2. CNAME güncelle:
   example.com (www olmadan)
   
3. DNS kontrol:
   dig example.com
   → IP görülmeli (CNAME değil)
```

### Problem 3: "SSL Sertifikası Hatası"

**Semptomlar:**
```
"Your connection is not secure"
"NET::ERR_CERT_AUTHORITY_INVALID"
```

**Çözümler:**
```
1. "Enforce HTTPS" kutusunu işaretle
   → GitHub sertifika oluşturacak
   
2. 15 dakika bekle
   
3. Browser cache temizle:
   Ctrl+Shift+Delete
   
4. Farklı tarayıcı dene:
   Chrome, Firefox, Edge
```

### Problem 4: "Domain yanlış sayfaya gidiyor"

**Semptomlar:**
```
example.com yazınca
Başka bir siteye yönlendiriliyor
```

**Çözümler:**
```
1. DNS yönlendirmesini kontrol:
   dig example.com
   → GitHub IP'leri görülmeli
   
2. Domain sağlayıcıda yönlendirme kuralı var mı?
   - Forward / Redirect ayarları kontrol et
   - Yönlendirme iptal et
   
3. 24 saat bekle
```

### Problem 5: "Sub-domain çalışmıyor"

**Semptomlar:**
```
app.example.com çalışmıyor
```

**Çözümler:**
```
1. DNS CNAME kaydı:
   app → USERNAME.github.io
   
2. CNAME dosyası:
   app.example.com yazıyor mu?
   
3. Test:
   nslookup app.example.com
   → USERNAME.github.io gözükmeli
   
4. 24 saat bekle
```

### Problem 6: "Nameserver değişikliği yansımıyor"

**Semptomlar:**
```
Nameserver'ları değiştirdim ama:
dig @ns1.example.com example.com
→ GitHub kayıtlarını görmüyor
```

**Çözümler:**
```
1. Nameserver'ları kontrol:
   whois example.com | grep "Nameserver"
   → ns1.github.com ... gözükmeli
   
2. 48 saat bekle
   (Nameserver değişimi en uzun işlem)
   
3. Domain sağlayıcının belge okuyunuz
   (Her sağlayıcı farklı)
```

---

## 📊 DNS Yapılandırma Örneği

### Freenom.com Tam Kurulum

```
1. Freenom hesabında giriş
2. My Domains → Domain'i seç
3. Manage Domain → Nameservers
4. "Use custom nameservers" seç
5. Şu nameserver'ları yaz:
   ns1.github.com
   ns2.github.com
   ns3.github.com
   ns4.github.com
6. Save butonuna tıkla

7. GitHub Settings → Pages
8. Custom domain: example.tk
9. Save butonuna tıkla
10. "Enforce HTTPS" kutusunu işaretle

11. 24 saat bekle

12. https://example.tk yazıp test et
```

### GoDaddy Tam Kurulum

```
1. GoDaddy dashboard → My Products
2. Domain'i seç → Manage
3. DNS → Nameservers
4. "Change Nameservers" butonuna tıkla
5. "I'll use nameservers" seç
6. Şu nameserver'ları gir:
   ns1.github.com
   ns2.github.com
   ns3.github.com
   ns4.github.com
7. Kaydet

8. GitHub Settings → Pages
9. Custom domain: example.com
10. Save butonuna tıkla
11. "Enforce HTTPS" kutusunu işaretle

12. 24 saat bekle

13. https://example.com yazıp test et
```

---

## 📞 Destek ve Kaynaklar

### GitHub Pages Rehberleri
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Custom Domain Guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [Troubleshooting Guide](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages)

### DNS Kaynakları
- [DNS Checker](https://dnschecker.org)
- [MX Toolbox](https://mxtoolbox.com)
- [Whats My DNS](https://whatsmydns.net)

### Domain Sağlayıcı Desteği
- [GoDaddy Support](https://support.godaddy.com)
- [Namecheap Support](https://www.namecheap.com/support)
- [Namesilo Support](https://www.namesilo.com/support)
- [Freenom Support](https://support.freenom.com)

---

## ✅ Kontrol Listesi

Domain Kurulumunu Bitirmeden Önce:

```
□ Domain satın aldım / ücretsiz alan aldım
□ DNS nameserver'larını değiştirdim
□ GitHub Settings → Pages → Custom domain ekledim
□ CNAME dosyasını commit'ledim
□ "Enforce HTTPS" kutusunu işaretledim
□ 24 saat bekledim
□ https://example.com yazıp açıyor
□ Yeşil kilit (HTTPS) görünüyor
□ Sayfam yükleniyor (404 değil)
□ Admin paneline girebiliyor
□ Kayıt sistemi çalışıyor
□ nslookup example.com → GitHub IP gösteriyor
```

---

**Başarılı olduğun zaman screenshot paylaş!** 🎉

*Sorular? kodmatik66@gmail.com*
