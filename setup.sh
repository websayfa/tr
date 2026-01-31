#!/bin/bash
# WebSayfa.tr - Otomatik Kurulum Script
# Bu script fork'ladığınız proje için otomatik setup yapar

echo "🎯 WebSayfa.tr Otomatik Kurulum Script"
echo "========================================"
echo ""

# 1. Kontroller
echo "📋 Adım 1: Sistem Kontrolleri"
if ! command -v git &> /dev/null; then
    echo "❌ Git kurulu değil"
    exit 1
fi
echo "✅ Git kurulu"

if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 kurulu değil"
    exit 1
fi
echo "✅ Python3 kurulu"

echo ""
echo "📝 Adım 2: Konfigürasyon"
read -p "📍 GitHub username'inizi girin: " USERNAME

if [ -z "$USERNAME" ]; then
    echo "❌ Username boş olamaz!"
    exit 1
fi

# Özel domain
read -p "🌐 Özel domain kullanacak mısınız? (y/n): " USE_CUSTOM

if [ "$USE_CUSTOM" = "y" ]; then
    read -p "🌐 Domain adınızı girin (örn: example.com): " CUSTOM_DOMAIN

















echo "Destek: kodmatik66@gmail.com"echo ""echo "3. git push origin main"echo "2. git commit -m 'WebSayfa kurulumu tamamlandı'"echo "1. git add ."echo "Sonraki Adımlar:"echo ""echo "✅ Kurulum Tamamlandı!"echo ""fi    echo "✅ CNAME: $USERNAME.github.io"    echo "$USERNAME.github.io" > CNAMEelse    echo "✅ CNAME: $CUSTOM_DOMAIN"    echo "$CUSTOM_DOMAIN" > CNAMEif [ -z "$USERNAME" ]; then
    echo -e "${RED}❌ Username boş olamaz!${NC}"
    exit 1
fi

# Repository adını oku
read -p "📍 Repository adını girin (varsayılan: tr): " REPO_NAME
REPO_NAME=${REPO_NAME:-tr}

# Özel domain için sor
read -p "🌐 Özel domain kullanacak mısınız? (y/n): " USE_CUSTOM_DOMAIN

if [ "$USE_CUSTOM_DOMAIN" = "y" ] || [ "$USE_CUSTOM_DOMAIN" = "Y" ]; then
    read -p "🌐 Domain adınızı girin (örn: example.com): " CUSTOM_DOMAIN
    if [ ! -z "$CUSTOM_DOMAIN" ]; then
        echo "$CUSTOM_DOMAIN" > CNAME
        echo -e "${GREEN}✅ CNAME dosyası güncellendi: $CUSTOM_DOMAIN${NC}"
    fi
else
    # Varsayılan GitHub Pages domain
    echo "$USERNAME.github.io" > CNAME
    echo -e "${GREEN}✅ CNAME dosyası oluşturuldu: $USERNAME.github.io${NC}"
fi

echo ""
echo -e "${BLUE}🔧 Adım 3: Repository Ayarları${NC}"

# Git konfigürasyonu
echo -e "${YELLOW}⏳ Git config ayarlanıyor...${NC}"
git config user.email "setup@websayfa.tr" 2>/dev/null || true
git config user.name "WebSayfa Setup" 2>/dev/null || true
echo -e "${GREEN}✅ Git config ayarlandı${NC}"

echo ""
echo -e "${BLUE}🚀 Adım 4: Dosya Kontrolleri${NC}"

# Gerekli dosyaları kontrol et
REQUIRED_FILES=("index.html" "pages/dashboard.html" "assets/js/main.js" "assets/css/main.css")

for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✅ $file - Mevcut${NC}"
    else
        echo -e "${RED}❌ $file - Bulunamadı!${NC}"
    fi
done

echo ""
echo -e "${BLUE}📚 Adım 5: Rehber Dosyalarını Kontrol${NC}"

GUIDE_FILES=("README.md" "KURULUM_REHBERI.md" "CUSTOM_DOMAIN_GUIDE.md" "TEKNIK_DOKUMANTASYON.md")

for file in "${GUIDE_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✅ $file - Mevcut${NC}"
    else
        echo -e "${YELLOW}⚠️  $file - Bulunamadı (opsiyonel)${NC}"
    fi
done

echo ""
echo -e "${BLUE}🔐 Adım 6: Güvenlik Notları${NC}"
echo -e "${YELLOW}⚠️  Lütfen dikkat edin:${NC}"
echo "  • CNAME dosyasındaki domain'inizi değiştirin"
echo "  • assets/js/auth.js'deki EmailJS yapılandırmasını güncelleyin"
echo "  • Admin şifresini değiştirin (pages/dashboard.html'de)"
echo "  • Branding bilgilerini kendi kurumunuza göre düzenleyin"

echo ""
echo -e "${BLUE}✨ Adım 7: Yerel Sunucu${NC}"
echo -e "${YELLOW}⏳ Yerel sunucu başlatılıyor (port 3000)...${NC}"
echo "Sunucu başlatmak için aşağıdaki komutu kullanın:"
echo -e "${GREEN}python3 -m http.server 3000${NC}"
echo ""
echo "Veya otomatik başlatmak ister misiniz? (y/n): " 
read -p "" START_SERVER

if [ "$START_SERVER" = "y" ] || [ "$START_SERVER" = "Y" ]; then
    echo -e "${GREEN}✅ http://localhost:3000 açılıyor...${NC}"
    python3 -m http.server 3000 > /dev/null 2>&1 &
    sleep 2
    
    # Platform açmaya çalış
    if command -v xdg-open &> /dev/null; then
        xdg-open http://localhost:3000
    elif command -v open &> /dev/null; then
        open http://localhost:3000
    fi
    
    echo -e "${GREEN}✅ Sunucu başlatıldı!${NC}"
    echo "💡 Sunucuyu durdurmak için Ctrl+C basın"
else
    echo -e "${YELLOW}⏭️  Sunucu başlatılmadı. Manuel olarak başlatabilirsiniz.${NC}"
fi

echo ""
echo -e "${BLUE}📤 Adım 8: Deploy Hazırlığı${NC}"
echo -e "${YELLOW}Değişiklikleri commit etmek ve push etmek için:${NC}"
echo ""
echo -e "${GREEN}git add .${NC}"
echo -e "${GREEN}git commit -m 'WebSayfa kurulumu tamamlandı'${NC}"
echo -e "${GREEN}git push origin main${NC}"
echo ""

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}✅ Kurulum Tamamlandı!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "📚 Sonraki adımlar için rehberleri kontrol edin:"
echo "  • README.md - Genel bilgiler"
echo "  • KURULUM_REHBERI.md - Detaylı kurulum"
echo "  • CUSTOM_DOMAIN_GUIDE.md - Özel domain kurulumu"
echo "  • TEKNIK_DOKUMANTASYON.md - Teknik detaylar"
echo ""
echo "🌐 Destek: kodmatik66@gmail.com"
echo "💻 GitHub: https://github.com/websayfa/tr"
echo ""
