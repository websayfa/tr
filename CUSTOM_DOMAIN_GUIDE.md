# 🌐 Kendi Domain'de Çalıştırma

## 📍 2 Seçenek

Biri GitHub Pages kullanacak, biri kendi sunucusunda barındıracak.

---

# SEÇENEK 1: GitHub Pages (Ücretsiz Hosting)

Zaten kendi domain'iniz (örn: www.example.com) varsa, bu yazılımı GitHub'da çalıştıracaksınız.

---

## 🎯 Ne Yapacağız?

```
Şu anda:  https://websayfa.github.io/tr
Sonra:    https://www.example.com
```

Yorum: Domain'iniz zaten satın alınmış olmalı.

---

## 📝 Yapılacak İşlemler

### 1. Repository'yi Fork Et

GitHub'da bu repo'yu fork et: https://github.com/websayfa/tr

---

### 2. CNAME Dosyasını Değiştir

**Nerede?** Fork'ladığın repository'nin **kök dizininde** `CNAME` dosyası var.

**Mevcut içerik:**
```
websayfa.tr
```

**Değiştir:**
```
www.example.com
```

(example.com yerine kendi domain'ini yaz)

**Kaydet ve push et:**
```bash
git add CNAME
git commit -m "Domain güncellendi: www.example.com"
git push origin main
```

---

### 3. GitHub Settings'te Custom Domain Ekle

1. Repository → **Settings** sekmesi
2. Sol menüde **Pages** butonuna tıkla
3. **Custom domain** input'u var → oraya yaz: `www.example.com`
4. **Save** butonuna tıkla

Otomatik olarak yeşil çapa (✅) işareti gelecek.

---

### 4. DNS Nameservers'ı GitHub'a Yönlendir

**Nerede yapacaksın?** Domaini satın aldığın yerin (GoDaddy, Namecheap vb.) kontrol panelinde.

**DNS → Nameservers** kısmında bu 4 adresi gir:

```
ns1.github.com
ns2.github.com
ns3.github.com
ns4.github.com
```

(Eski nameservers'ları sil, bunları yaz)

---

### 5. Bekle

24 saat bekle. DNS yayılması zaman alır.

---

## ✅ Kontrol

24 saatten sonra:

```
https://www.example.com
```

yazıp aç. Yazılım yüklenecek.

---

## 🐛 Sorun varsa?

1. CNAME dosyasında doğru domain yazılı mı? (git show CNAME ile kontrol et)
2. GitHub Settings'te custom domain doğru yazılı mı?
3. Nameservers'ı GitHub'a yönlendirdin mi?
4. 24 saati geçti mi?

Hepsi iyiyse sorun yok.

---

---

# SEÇENEK 2: Kendi Sunucuda Barındırma (cPanel, VPS, vb)

Projeyi indir ve kendi sunucuna koy.

---

## 🎯 Ne Yapacağız?

```
Şu anda:  https://websayfa.github.io/tr
Sonra:    https://www.example.com (Senin sunucu)
```

---

## 📝 Yapılacak İşlemler

### 1. Projeyi İndir

GitHub'dan ZIP indir: https://github.com/websayfa/tr

**Code** → **Download ZIP** → Bilgisayarına kaydet.

---

### 2. ZIP'i Aç

```
websayfa-tr-main.zip → Aç
Klasör: websayfa-tr-main/
```

---

### 3. Sunucuya Yükle

**cPanel kullanıyorsan:**
1. cPanel → **File Manager** aç
2. **public_html** klasörüne gir
3. Tüm dosyaları buraya kopyala (HTML, CSS, JS hepsini)

**VPS/SSH kullanıyorsan:**
```bash
scp -r websayfa-tr-main/* user@sunucu.com:/var/www/example.com/
```

(Veya FTP ile Filezilla kullanabilirsin)

**Sonuç:** `https://www.example.com` açınca index.html yüklenecek.

---

### 4. DNS Ayarla

Domain sağlayıcısında (GoDaddy, Namecheap vb):

**DNS → A Record:**
```
@ (root) → Senin sunucunun IP adresi
www → Senin sunucunun IP adresi
```

Örnek:
```
@ → 192.0.2.1
www → 192.0.2.1
```

(IP adresi hosting sağlayıcından alırsın)

---

### 5. Bekle

24 saat bekle. `https://www.example.com` açtığında yazılım yüklenecek.

---

## ✅ Kontrol

```
https://www.example.com
```

yazıp aç. İndex sayfası gelmeli.

---

## 🐛 Sorun varsa?

1. Tüm dosyalar sunucuya yüklendi mi?
2. DNS A Record sunucunun IP'sine işaret ediyor mu?
3. 24 saati geçti mi?
4. index.html sunucuda var mı?

---

## ⚠️ ÖNEMLİ

- Bu yazılım **statik dosyalardan oluşur** (HTML, CSS, JS)
- **Veritabanı yok**
- **Server-side kod yok**
- Sadece dosyaları sunucuya koysan yeter
- PHP, Node.js, Python kurmanız gerekmiyor

---

**HEPSI BU.**

Destek: kodmatik66@gmail.com
