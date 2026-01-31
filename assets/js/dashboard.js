// dashboard.js - Dashboard yönetimi

class SiteManager {
    constructor(user) {
        this.user = user;
        this.sites = this.loadUserSites();
    }

    createSite(name, category, theme, domain, description, isPublic, about = '', services = '', contactEmail = '', contactPhone = '') {
        const site = {
            id: Date.now().toString(),
            username: this.user.username,
            userId: this.user.id,
            title: name,
            category: category,
            theme: theme,
            domain: domain,
            description: description,
            isPublic: isPublic,
            icon: '📄',
            createdAt: new Date().toISOString(),
            content: {
                about: about,
                services: services,
                contact: contactEmail || this.user.email,
                phone: contactPhone
            }
        };

        this.sites.push(site);
        this.saveUserSites();
        
        // GitHub'a commit et
        this.syncToGitHub(site, 'create');
        
        return site;
    }

    updateSite(siteId, updates) {
        const site = this.sites.find(s => s.id === siteId);
        if (site) {
            Object.assign(site, updates);
            this.saveUserSites();
            this.syncToGitHub(site, 'update');
        }
    }

    deleteSite(siteId) {
        this.sites = this.sites.filter(s => s.id !== siteId);
        this.saveUserSites();
        this.syncToGitHub({ id: siteId }, 'delete');
    }

    getSite(siteId) {
        return this.sites.find(s => s.id === siteId);
    }

    saveUserSites() {
        const encrypted = SimpleCrypto.encryptObject(this.sites);
        const key = `user_sites_${this.user.id}`;
        localStorage.setItem(key, encrypted);
    }

    loadUserSites() {
        const key = `user_sites_${this.user.id}`;
        const encrypted = localStorage.getItem(key);
        if (encrypted) {
            return SimpleCrypto.decryptObject(encrypted) || [];
        }
        return [];
    }

    syncToGitHub(site, action) {
        // Simüle edilmiş GitHub commit
        const commitData = {
            site: site,
            action: action,
            timestamp: new Date().toISOString(),
            user: this.user.username
        };

        const commitLog = localStorage.getItem('gitCommitLog') || '[]';
        const commits = JSON.parse(commitLog);
        commits.push(commitData);
        localStorage.setItem('gitCommitLog', JSON.stringify(commits));

        console.log(`GitHub Sync: ${action} - ${site.title || site.id}`);
    }
}

let siteManager = null;

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', () => {
    // Giriş kontrolü
    if (!authManager || !authManager.currentUser) {
        window.location.href = '../index.html';
        return;
    }

    // SiteManager'ı başlat
    siteManager = new SiteManager(authManager.currentUser);

    // UI'yi güncelle
    updateUserInfo();
    loadUserSites();

    // Admin link'i göster (eğer admin ise)
    if (authManager.currentUser.adminPanel) {
        document.getElementById('adminLink').style.display = 'flex';
    }

    // Sayfa navigasyonunu ayarla
    setupNavigation();

    // Form'u ayarla
    setupCreateSiteForm();
    setupEditSiteForm();
    setupSettingsForm();
});

// Kullanıcı bilgisini göster
function updateUserInfo() {
    const user = authManager.currentUser;
    const adminBadge = user.isSuperAdmin ? ' 👑' : (user.adminPanel ? ' 👤' : '');
    const siteLimit = user.isSuperAdmin ? '∞' : '1';
    document.getElementById('userInfo').innerHTML = `
        <strong>${user.username}${adminBadge}</strong><br>
        <small>${user.email}</small><br>
        <small style="opacity: 0.8;">${siteManager.sites.length}/${siteLimit} site</small>
    `;
}

// Kullanıcı sitelerini yükle
function loadUserSites() {
    const container = document.getElementById('sitesList');
    container.innerHTML = '';

    if (siteManager.sites.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">Henüz siteniz yok. Yeni bir site oluşturmaya başlayın!</p>';
        return;
    }

    siteManager.sites.forEach(site => {
        const card = createSiteItemCard(site);
        container.appendChild(card);
    });
}

// Site öğesi kartı oluştur
function createSiteItemCard(site) {
    const card = document.createElement('div');
    card.className = 'site-item';
    const domain = `websayfa/tr/${site.domain}.github.io`;
    card.innerHTML = `
        <div class="site-item-header">📄</div>
        <div class="site-item-body">
            <div class="site-item-title">${site.title}</div>
            <div class="site-item-domain">${domain}</div>
            <div class="site-item-actions">
                <a href="preview.html?id=${site.id}" class="btn-view" target="_blank">Ziyaret</a>
                <button class="btn-edit" onclick="openEditSiteModal('${site.id}')">Düzenle</button>
            </div>
        </div>
    `;
    return card;
}

// Sayfa navigasyonu
function setupNavigation() {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        if (item.dataset.page) {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const page = item.dataset.page;
                goToPage(page);
            });
        }
    });
}

// Sayfa değiştir
function goToPage(pageName) {
    // Sayfaları gizle
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Menu items'ı güncelle
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.page === pageName) {
            item.classList.add('active');
        }
    });

    // Sayfayı göster
    const page = document.getElementById(`${pageName}-page`);
    if (page) {
        page.classList.add('active');
    }

    // Sayfa özel işlemlerini çalıştır
    if (pageName === 'admin') {
        loadAllUsers();
    }
    if (pageName === 'domains') {
        loadDomains();
    }
}

// Create Site Form
function setupCreateSiteForm() {
    const form = document.getElementById('createSiteForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('siteName').value;
        const category = document.getElementById('siteCategory').value;
        const theme = document.getElementById('siteTheme').value;
        const domain = document.getElementById('siteDomain').value.toLowerCase().replace(/[^a-z0-9-]/g, '-');
        const description = document.getElementById('siteDescription').value;
        const about = document.getElementById('siteAbout').value;
        const services = document.getElementById('siteServices').value;
        const contactEmail = document.getElementById('siteContactEmail').value;
        const contactPhone = document.getElementById('siteContactPhone').value;
        const isPublic = document.getElementById('sitePublic').checked;

        // Validasyon
        if (!domain || domain.length < 3) {
            alert('Domain adı en az 3 karakter olmalıdır');
            return;
        }

        // Site limiti kontrolü (Super admin sınırsız, normal kullanıcı 1)
        const isSuperAdmin = authManager.currentUser && authManager.currentUser.isSuperAdmin === true;
        const userSiteLimit = isSuperAdmin ? Infinity : 1;
        
        if (siteManager.sites.length >= userSiteLimit) {
            alert(`Maksimum ${userSiteLimit} site oluşturabilirsiniz. Yeni site oluşturmak için bir siteyi silmelisiniz.`);
            return;
        }

        // Domain benzersizliğini kontrol et
        const allSites = getAllSites();
        if (allSites.some(s => s.domain === domain)) {
            alert('Bu domain adı zaten kullanılıyor');
            return;
        }

        const site = siteManager.createSite(name, category, theme, domain, description, isPublic, about, services, contactEmail, contactPhone);
        
        alert('Site başarıyla oluşturuldu!');
        form.reset();
        goToPage('sites');
        loadUserSites();
    });
}

// Edit Site Modal
function openEditSiteModal(siteId) {
    const site = siteManager.getSite(siteId);
    if (!site) return;

    document.getElementById('editSiteId').value = site.id;
    document.getElementById('editSiteName').value = site.title;
    document.getElementById('editSiteCategory').value = site.category;
    document.getElementById('editSiteTheme').value = site.theme;
    document.getElementById('editSiteDescription').value = site.description;
    document.getElementById('editSiteAbout').value = site.content?.about || '';
    document.getElementById('editSiteServices').value = site.content?.services || '';
    document.getElementById('editSiteContactEmail').value = site.content?.contact || '';
    document.getElementById('editSiteContactPhone').value = site.content?.phone || '';
    document.getElementById('editSitePublic').checked = site.isPublic;

    document.getElementById('editModal').classList.add('show');
}

function closeEditModal() {
    document.getElementById('editModal').classList.remove('show');
}

function setupEditSiteForm() {
    const form = document.getElementById('editSiteForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const siteId = document.getElementById('editSiteId').value;
        const updates = {
            title: document.getElementById('editSiteName').value,
            category: document.getElementById('editSiteCategory').value,
            theme: document.getElementById('editSiteTheme').value,
            description: document.getElementById('editSiteDescription').value,
            isPublic: document.getElementById('editSitePublic').checked,
            content: {
                about: document.getElementById('editSiteAbout').value,
                services: document.getElementById('editSiteServices').value,
                contact: document.getElementById('editSiteContactEmail').value,
                phone: document.getElementById('editSiteContactPhone').value
            }
        };

        siteManager.updateSite(siteId, updates);
        alert('Site başarıyla güncellendi!');
        closeEditModal();
        loadUserSites();
    });
}

function deleteSite() {
    if (confirm('Bu siteyi silmek istediğinizden emin misiniz?')) {
        const siteId = document.getElementById('editSiteId').value;
        siteManager.deleteSite(siteId);
        alert('Site silinmiştir');
        closeEditModal();
        loadUserSites();
    }
}

// Settings Form
function setupSettingsForm() {
    const form = document.getElementById('settingsForm');
    if (!form) return;

    const user = authManager.currentUser;
    document.getElementById('settingsUsername').value = user.username;
    document.getElementById('settingsEmail').value = user.email;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const newPassword = document.getElementById('newPassword').value;

        if (newPassword) {
            user.password = SimpleCrypto.hashPassword(newPassword);
            authManager.saveUser();
            alert('Şifre başarıyla değiştirildi');
            document.getElementById('newPassword').value = '';
        } else {
            alert('Değişiklik yapılmadı');
        }
    });
}

// Domain Management
function loadDomains() {
    const container = document.getElementById('domainsList');
    if (!container) return;

    container.innerHTML = '<h3>Sahibin Olduğu Siteler</h3>';

    const userSites = siteManager.sites;
    
    if (userSites.length === 0) {
        container.innerHTML += '<p>Henüz siteniz yok</p>';
        return;
    }

    const list = document.createElement('div');
    userSites.forEach(site => {
        const domain = `websayfa/tr/${site.domain}.github.io`;
        const item = document.createElement('div');
        item.className = 'domain-item';
        item.innerHTML = `
            <div class="domain-item-info">
                <div class="domain-item-name">${site.title}</div>
                <div class="domain-item-url">${domain}</div>
            </div>
            <div class="domain-item-actions">
                <button onclick="copyDomain('${domain}')">Kopyala</button>
                <button onclick="openSiteSettings('${site.id}')">Ayarlar</button>
            </div>
        `;
        list.appendChild(item);
    });
    container.appendChild(list);
}

function copyDomain(domain) {
    navigator.clipboard.writeText(domain);
    alert('Domain kopyalandı: ' + domain);
}

function openSiteSettings(siteId) {
    openEditSiteModal(siteId);
}

// Admin Panel - Tüm Kullanıcıları Yükle
function loadAllUsers() {
    const container = document.getElementById('allUsersList');
    container.innerHTML = '';

    const allUsers = authManager.users || {};
    
    for (let userId in allUsers) {
        const user = allUsers[userId];
        const userSites = getAllSites().filter(s => s.userId === userId);

        const userItem = document.createElement('div');
        userItem.className = 'user-item';
        const isSuperAdmin = user.isSuperAdmin === true;
        const adminBadge = isSuperAdmin ? ' 👑 SUPER ADMIN' : (user.adminPanel ? ' 👤 Admin' : '');
        
        userItem.innerHTML = `
            <div class="user-item-header">
                <div>
                    <div class="user-item-name">${user.username}${adminBadge}</div>
                    <div class="user-item-email">${user.email}</div>
                </div>
                <small>${userSites.length} site</small>
            </div>
            <div class="user-item-actions">
                ${user.adminPanel && authManager.currentUser && authManager.currentUser.isSuperAdmin ? 
                    `<button onclick="toggleSuperAdmin('${userId}')" style="background: #ff9800;">
                        ${isSuperAdmin ? 'Super Admin Kaldır' : 'Super Admin Yap'}
                    </button>` : ''}
                <button onclick="toggleUserPublic('${userId}')">
                    ${user.isPublic ? 'Gizle' : 'Göster'}
                </button>
                <button onclick="deleteUser('${userId}')" style="background: #f44336;">Sil</button>
            </div>
        `;
        container.appendChild(userItem);
    }
}

function toggleSuperAdmin(userId) {
    if (!authManager.currentUser || !authManager.currentUser.isSuperAdmin) {
        alert('Bu işlemi yapmak için super admin olmanız gerekir');
        return;
    }

    const user = authManager.users[userId];
    if (user.adminPanel) {
        user.isSuperAdmin = !user.isSuperAdmin;
        authManager.saveUsers();
        alert(`${user.username} ${user.isSuperAdmin ? 'super admin' : 'normal admin'} yapıldı`);
        loadAllUsers();
    }
}

function toggleUserPublic(userId) {
    const user = authManager.users[userId];
    user.isPublic = !user.isPublic;
    authManager.saveUsers();
    loadAllUsers();
}

function deleteUser(userId) {
    if (confirm('Bu kullanıcıyı silmek istediğinizden emin misiniz?')) {
        delete authManager.users[userId];
        authManager.saveUsers();
        loadAllUsers();
    }
}

// Tüm siteleri al (admin için)
function getAllSites() {
    const allUsers = authManager.users || {};
    const allSites = [];

    for (let userId in allUsers) {
        const user = allUsers[userId];
        const key = `user_sites_${userId}`;
        const encrypted = localStorage.getItem(key);
        
        if (encrypted) {
            const sites = SimpleCrypto.decryptObject(encrypted) || [];
            sites.forEach(site => {
                site.userId = userId;
                allSites.push(site);
            });
        }
    }

    return allSites;
}

// Çıkış
function logoutFromDashboard() {
    if (confirm('Çıkış yapmak istediğinizden emin misiniz?')) {
        authManager.logout();
    }
}

// Modal dışında tıklanınca kapat
window.addEventListener('click', (event) => {
    const editModal = document.getElementById('editModal');
    if (event.target === editModal) {
        closeEditModal();
    }
});
