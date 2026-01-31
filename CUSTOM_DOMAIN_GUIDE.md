# 🌐 Kendi Domain'de Çalıştırma

## Adım 1: CNAME Dosyasını Değiştir

Repository'de `CNAME` dosyasını aç.

İçinde yazılı olan:
```
websayfa.tr
```

Kendi domain'iniz ile değiştir:
```
example.com
```

## Adım 2: Git'e Push Et

```bash
git add CNAME
git commit -m "Domain değiştirildi"
git push origin main
```

## Adım 3: GitHub Settings

Repository → Settings → Pages

"Custom domain" kısmına yaz:
```
example.com
```

Save butonuna tıkla.

## Adım 4: DNS Nameservers Ayarla

Domain sağlayıcısında (GoDaddy, Namecheap, Freenom vb.) bu nameservers'ları ayarla:

```
ns1.github.com
ns2.github.com
ns3.github.com
ns4.github.com
```

## Adım 5: Bitti

24 saat bekle. https://example.com açtığında siteniz yüklenecek.
