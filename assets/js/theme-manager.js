// Theme Management

class ThemeManager {
    constructor() {
        this.themes = this.loadThemes();
        this.currentTheme = this.getCurrentTheme();
    }

    // Varsayılan temalar
    loadThemes() {
        let themes = JSON.parse(localStorage.getItem('themes') || 'null');
        
        if (!themes) {
            themes = [
                {
                    id: 'theme-minimal',
                    name: 'Minimal',
                    file: 'theme-minimal.css',
                    color: '#ffffff',
                    active: true
                },
                {
                    id: 'theme-modern',
                    name: 'Modern',
                    file: 'theme-modern.css',
                    color: '#667eea',
                    active: true
                },
                {
                    id: 'theme-dark',
                    name: 'Koyu',
                    file: 'theme-dark.css',
                    color: '#1a1a1a',
                    active: true
                },
                {
                    id: 'theme-nature',
                    name: 'Doğa',
                    file: 'theme-nature.css',
                    color: '#2ecc71',
                    active: true
                },
                {
                    id: 'theme-elegant',
                    name: 'Şık',
                    file: 'theme-elegant.css',
                    color: '#9b59b6',
                    active: true
                },
                {
                    id: 'theme-classic',
                    name: 'Classic',
                    file: 'theme-classic.css',
                    color: '#111827',
                    active: true
                },
                {
                    id: 'theme-agency',
                    name: 'Agency',
                    file: 'theme-agency.css',
                    color: '#ff6b6b',
                    active: true
                },
                {
                    id: 'theme-startup',
                    name: 'Startup',
                    file: 'theme-startup.css',
                    color: '#00d4ff',
                    active: true
                },
                {
                    id: 'theme-corporate',
                    name: 'Corporate',
                    file: 'theme-corporate.css',
                    color: '#1e40af',
                    active: true
                },
                {
                    id: 'theme-vibrant',
                    name: 'Vibrant',
                    file: 'theme-vibrant.css',
                    color: '#ec4899',
                    active: true
                }
            ];
            localStorage.setItem('themes', JSON.stringify(themes));
        }

        return themes;
    }

    // Tema al
    getTheme(themeId) {
        return this.themes.find(t => t.id === themeId);
    }

    // Aktif temalar
    getActiveThemes() {
        return this.themes.filter(t => t.active);
    }

    // Tema sil
    disableTheme(themeId) {
        const theme = this.getTheme(themeId);
        if (theme) {
            theme.active = false;
            localStorage.setItem('themes', JSON.stringify(this.themes));
        }
    }

    // Tema aktif et
    enableTheme(themeId) {
        const theme = this.getTheme(themeId);
        if (theme) {
            theme.active = true;
            localStorage.setItem('themes', JSON.stringify(this.themes));
        }
    }

    // Tema ekle
    addTheme(name, file, color) {
        const newTheme = {
            id: 'theme-' + Date.now(),
            name: name,
            file: file,
            color: color,
            active: true
        };
        this.themes.push(newTheme);
        localStorage.setItem('themes', JSON.stringify(this.themes));
        return newTheme;
    }

    // Mevcut tema
    getCurrentTheme() {
        const userTheme = localStorage.getItem('userTheme') || 'theme-minimal';
        return this.getTheme(userTheme);
    }

    // Tema değiştir
    setTheme(themeId) {
        if (!this.getTheme(themeId)) return false;
        localStorage.setItem('userTheme', themeId);
        this.currentTheme = this.getTheme(themeId);
        this.applyTheme();
        return true;
    }

    // Tema uygula
    applyTheme() {
        if (!this.currentTheme) return;
        
        // Mevcut tema CSS'i kaldır
        const existingTheme = document.getElementById('theme-link');
        if (existingTheme) {
            existingTheme.remove();
        }

        // Yeni tema CSS'i ekle
        const link = document.createElement('link');
        link.id = 'theme-link';
        link.rel = 'stylesheet';
        link.href = `/assets/css/${this.currentTheme.file}`;
        document.head.appendChild(link);
    }
}

// Sayfa yüklenince tema uygula
document.addEventListener('DOMContentLoaded', function() {
    const themeManager = new ThemeManager();
    themeManager.applyTheme();
});