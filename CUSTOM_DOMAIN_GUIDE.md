# 🌐 Kendi Domain'de Çalıştırma

Zaten kendi domain'iniz (örn: www.example.com) varsa, bu yazılımı oraya nasıl kuracağınız anlatılıyor.

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

**HEPSI BU.**

Destek: kodmatik66@gmail.com
