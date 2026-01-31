// Super Admin Panel Logic

// İlk açılışta kontrol et
document.addEventListener('DOMContentLoaded', function() {
    checkSuperAdminAccess();
    loadUsers();
    loadSites();
    loadApprovals();
    loadSettings();
    loadThemes();
    setupTabButtons();
});

// Super Admin erişim kontrolü
function checkSuperAdminAccess() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    
    if (!currentUser || !currentUser.isSuperAdmin) {
        document.body.innerHTML = `
            <div class="container" style="margin-top: 50px;">
                <div class="not-superadmin">
                    <h2>❌ Erişim Reddedildi</h2>
                    <p style="margin-top: 10px;">Bu panele sadece Super Admin erişebilir.</p>
                    <a href="../pages/dashboard.html" style="display: inline-block; margin-top: 20px; color: #721c24; text-decoration: underline;">Dashboard'a Dön</a>
                </div>
            </div>
        `;
        return false;
    }
    return true;
}

// Tab değiştirme
function setupTabButtons() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            switchTab(tabName);
        });
    });
}

function switchTab(tabName) {
    // Tüm tab içeriklerini gizle
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Tüm butonları deaktif yap
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Seçilen tab'ı göster
    document.getElementById(tabName).classList.add('active');
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

    // Logout tab'ında ise
    if (tabName === 'logout') {
        // Zaten logout alanını gösterdik
    }
}

// ============ KULLANICILAR ============

function loadUsers() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const tbody = document.querySelector('#usersTable tbody');
    tbody.innerHTML = '';

    if (users.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="empty">Kullanıcı yok</td></tr>';
        return;
    }

    users.forEach(user => {
        const siteCount = (user.sites || []).length;
        const statusBadge = user.banned ? '<span class="badge banned">🚫 Banlandı</span>' : '<span class="badge approved">✅ Aktif</span>';
        const adminBadge = user.isSuperAdmin ? '👑' : user.adminPanel ? '👤' : '';

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.email}</td>
            <td>${adminBadge} ${user.username}</td>
            <td>${statusBadge}</td>
            <td>${siteCount}</td>
            <td>${new Date(user.createdAt).toLocaleDateString('tr-TR')}</td>
            <td>
                <div class="btn-group">
                    ${user.banned ? 
                        `<button class="btn btn-unban" onclick="unbanUser('${user.id}')">Yasağı Kaldır</button>` :
                        `<button class="btn btn-ban" onclick="banUser('${user.id}')">Banla</button>`
                    }
                    <button class="btn btn-delete" onclick="deleteUser('${user.id}')">Sil</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function banUser(userId) {
    if (!confirm('Kullanıcıyı banlamak istediğinize emin misiniz?')) return;

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.id === userId);

    if (user) {
        user.banned = true;
        localStorage.setItem('users', JSON.stringify(users));
        showAlert('usersAlert', 'Kullanıcı banlandı', 'success');
        loadUsers();
    }
}

function unbanUser(userId) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.id === userId);

    if (user) {
        user.banned = false;
        localStorage.setItem('users', JSON.stringify(users));
        showAlert('usersAlert', 'Yasak kaldırıldı', 'success');
        loadUsers();
    }
}

function deleteUser(userId) {
    if (!confirm('Kullanıcıyı tamamen silmek istediğinize emin misiniz? Bu işlem geri alınamaz!')) return;

    let users = JSON.parse(localStorage.getItem('users') || '[]');
    users = users.filter(u => u.id !== userId);
    localStorage.setItem('users', JSON.stringify(users));
    showAlert('usersAlert', 'Kullanıcı silindi', 'success');
    loadUsers();
}

// ============ SITELER ============

function loadSites() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const tbody = document.querySelector('#sitesTable tbody');
    tbody.innerHTML = '';

    let allSites = [];
    
    users.forEach(user => {
        (user.sites || []).forEach(site => {
            allSites.push({
                ...site,
                ownerEmail: user.email,
                ownerUsername: user.username,
                ownerId: user.id
            });
        });
    });

    if (allSites.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="empty">Site yok</td></tr>';
        return;
    }

    allSites.forEach(site => {
        const statusBadge = site.banned ? '<span class="badge banned">🚫 Yasaklı</span>' : '<span class="badge approved">✅ Aktif</span>';
        const createdDate = new Date(site.createdAt).toLocaleDateString('tr-TR');

        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${site.title}</strong></td>
            <td>${site.ownerEmail}</td>
            <td>${site.domain}</td>
            <td>${statusBadge}</td>
            <td>${createdDate}</td>
            <td>
                <div class="btn-group">
                    ${site.banned ? 
                        `<button class="btn btn-unban" onclick="unbanSite('${site.ownerId}', '${site.id}')">Yasağı Kaldır</button>` :
                        `<button class="btn btn-ban" onclick="banSite('${site.ownerId}', '${site.id}')">Yasakla</button>`
                    }
                    <button class="btn btn-delete" onclick="deleteSite('${site.ownerId}', '${site.id}')">Sil</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function banSite(userId, siteId) {
    if (!confirm('Siteyi yasaklamak istediğinize emin misiniz?')) return;

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.id === userId);

    if (user) {
        const site = user.sites.find(s => s.id === siteId);
        if (site) {
            site.banned = true;
            localStorage.setItem('users', JSON.stringify(users));
            showAlert('sitesAlert', 'Site yasaklandı', 'success');
            loadSites();
        }
    }
}

function unbanSite(userId, siteId) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.id === userId);

    if (user) {
        const site = user.sites.find(s => s.id === siteId);
        if (site) {
            site.banned = false;
            localStorage.setItem('users', JSON.stringify(users));
            showAlert('sitesAlert', 'Site yasağı kaldırıldı', 'success');
            loadSites();
        }
    }
}

function deleteSite(userId, siteId) {
    if (!confirm('Siteyi silmek istediğinize emin misiniz?')) return;

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.id === userId);

    if (user) {
        user.sites = user.sites.filter(s => s.id !== siteId);
        localStorage.setItem('users', JSON.stringify(users));
        showAlert('sitesAlert', 'Site silindi', 'success');
        loadSites();
    }
}

// ============ ONAYLAMA BEKLEYENLER ============

function loadApprovals() {
    const pendingUsers = JSON.parse(localStorage.getItem('pendingUsers') || '[]');
    const tbody = document.querySelector('#approvalsTable tbody');
    tbody.innerHTML = '';

    if (pendingUsers.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="empty">Bekleyen kullanıcı yok</td></tr>';
        return;
    }

    pendingUsers.forEach(user => {
        const createdDate = new Date(user.createdAt).toLocaleDateString('tr-TR');

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.email}</td>
            <td>${user.username}</td>
            <td>${createdDate}</td>
            <td>
                <div class="btn-group">
                    <button class="btn btn-approve" onclick="approveUser('${user.id}')">Onayla</button>
                    <button class="btn btn-delete" onclick="rejectUser('${user.id}')">Reddet</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function approveUser(userId) {
    let pendingUsers = JSON.parse(localStorage.getItem('pendingUsers') || '[]');
    const pendingUser = pendingUsers.find(u => u.id === userId);

    if (!pendingUser) {
        showAlert('approvalsAlert', 'Kullanıcı bulunamadı', 'error');
        return;
    }

    // Onaylanan kullanıcıyı users'a taşı
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    pendingUser.approved = true;
    pendingUser.sites = [];
    users.push(pendingUser);

    // Pending'den çıkar
    pendingUsers = pendingUsers.filter(u => u.id !== userId);

    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('pendingUsers', JSON.stringify(pendingUsers));

    showAlert('approvalsAlert', 'Kullanıcı onaylandı', 'success');
    loadApprovals();
    loadUsers();
}

function rejectUser(userId) {
    if (!confirm('Kullanıcıyı reddetmek istediğinize emin misiniz?')) return;

    let pendingUsers = JSON.parse(localStorage.getItem('pendingUsers') || '[]');
    pendingUsers = pendingUsers.filter(u => u.id !== userId);
    localStorage.setItem('pendingUsers', JSON.stringify(pendingUsers));

    showAlert('approvalsAlert', 'Kullanıcı reddedildi', 'success');
    loadApprovals();
}

// ============ SISTEM AYARLARI ============

function loadSettings() {
    const settings = JSON.parse(localStorage.getItem('siteSettings') || '{}');

    document.getElementById('siteName').value = settings.siteName || 'WebSayfa';
    document.getElementById('siteDescription').value = settings.siteDescription || '';
    document.getElementById('siteAbout').value = settings.siteAbout || '';
    document.getElementById('contactEmail').value = settings.contactEmail || '';
    document.getElementById('contactPhone').value = settings.contactPhone || '';
    document.getElementById('contactAddress').value = settings.contactAddress || '';
    document.getElementById('seoDescription').value = settings.seoDescription || '';
    document.getElementById('seoKeywords').value = settings.seoKeywords || '';
    document.getElementById('userSiteLimit').value = settings.userSiteLimit || 1;
    document.getElementById('requireApproval').checked = settings.requireApproval || false;
}

function saveSettings() {
    const settings = {
        siteName: document.getElementById('siteName').value,
        siteDescription: document.getElementById('siteDescription').value,
        siteAbout: document.getElementById('siteAbout').value,
        contactEmail: document.getElementById('contactEmail').value,
        contactPhone: document.getElementById('contactPhone').value,
        contactAddress: document.getElementById('contactAddress').value,
        seoDescription: document.getElementById('seoDescription').value,
        seoKeywords: document.getElementById('seoKeywords').value,
        userSiteLimit: parseInt(document.getElementById('userSiteLimit').value) || 1,
        requireApproval: document.getElementById('requireApproval').checked
    };

    localStorage.setItem('siteSettings', JSON.stringify(settings));
    showAlert('settingsAlert', 'Ayarlar kaydedildi', 'success');
}

// ============ TEMALAR ============

function loadThemes() {
    const themes = JSON.parse(localStorage.getItem('themes') || '[]');
    const container = document.getElementById('themeList');
    container.innerHTML = '';

    if (themes.length === 0) {
        container.innerHTML = '<div class="empty">Tema yok</div>';
        return;
    }

    themes.forEach(theme => {
        const div = document.createElement('div');
        div.className = 'theme-item';
        div.innerHTML = `
            <div style="width: 100%; height: 100px; background: ${theme.color}; border-radius: 4px; margin-bottom: 10px; border: ${!theme.active ? '2px dashed #ccc' : '2px solid ' + theme.color};"></div>
            <h4>${theme.name}</h4>
            <p style="font-size: 12px; color: #999; margin-bottom: 10px;">${theme.id}</p>
            <div class="theme-actions">
                ${theme.active ? 
                    `<button class="btn btn-unban" onclick="disableTheme('${theme.id}')">Devre Dışı Bırak</button>` :
                    `<button class="btn btn-approve" onclick="enableTheme('${theme.id}')">Aktif Et</button>`
                }
            </div>
        `;
        container.appendChild(div);
    });
}

function disableTheme(themeId) {
    const themes = JSON.parse(localStorage.getItem('themes') || '[]');
    const theme = themes.find(t => t.id === themeId);
    if (theme) {
        theme.active = false;
        localStorage.setItem('themes', JSON.stringify(themes));
        showAlert('themesAlert', 'Tema devre dışı bırakıldı', 'success');
        loadThemes();
    }
}

function enableTheme(themeId) {
    const themes = JSON.parse(localStorage.getItem('themes') || '[]');
    const theme = themes.find(t => t.id === themeId);
    if (theme) {
        theme.active = true;
        localStorage.setItem('themes', JSON.stringify(themes));
        showAlert('themesAlert', 'Tema aktif edildi', 'success');
        loadThemes();
    }
}

// ============ ÇIKIŞ ============

function doLogout() {
    localStorage.removeItem('currentUser');
    window.location.href = '../index.html';
}

// ============ YARDIM FONKSIYONLARI ============

function showAlert(elementId, message, type) {
    const element = document.getElementById(elementId);
    element.innerHTML = `<div class="alert ${type}">${message}</div>`;
    setTimeout(() => {
        element.innerHTML = '';
    }, 5000);
}