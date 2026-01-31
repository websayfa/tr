// auth.js - Kimlik doğrulama ve kullanıcı yönetimi

// EmailJS'i başlat (test mode - demo amaçlı)
if (typeof emailjs !== 'undefined') {
    try {
        emailjs.init('U_DM-7ZOjGBTwqBc4');
        console.log('✅ EmailJS başlatıldı');
    } catch (e) {
        console.log('⚠️ EmailJS yapılandırması: demo mode çalışıyor');
    }
}

class AuthManager {
    constructor() {
        this.currentUser = this.loadUser();
        this.users = this.loadUsers();
        this.initializeAdminIfNeeded();
        this.updateUIState();
    }

    // Admin varsa kontrol et, yoksa oluştur
    initializeAdminIfNeeded() {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Admin aradığını kontrol et
        let adminExists = users.some(u => u.adminPanel === true);

        // Eğer admin yoksa, ilk admin oluştur
        if (!adminExists) {
            const adminUser = {
                id: 'admin_' + Date.now(),
                username: 'admin',
                email: 'admin@websayfa.tr',
                password: SimpleCrypto.hashPassword('admin123'),
                createdAt: new Date().toISOString(),
                sites: [],
                isPublic: false,
                adminPanel: true,
                isSuperAdmin: true
            };
            users.push(adminUser);
            localStorage.setItem('users', JSON.stringify(users));
            console.log('✅ Admin hesabı oluşturuldu: admin@websayfa.tr / admin123 (Super Admin)');
        }
    }

    // Kullanıcı kaydı
    register(username, email, domain, password, passwordConfirm, theme = 'minimal') {
        if (password !== passwordConfirm) {
            alert(t('register.password_confirm') + ' ' + 'eşleşmiyor');
            return false;
        }

        if (this.userExists(email, username)) {
            alert('Bu e-mail veya kullanıcı adı zaten kayıtlı');
            return false;
        }

        // Domain benzersizliğini kontrol et
        if (this.domainExists(domain)) {
            alert('Bu domain adı zaten alınmış. Başka bir domain seçin.');
            return false;
        }

        // Domain validasyonu
        if (!domain || domain.length < 3 || !/^[a-z0-9-]+$/.test(domain)) {
            alert('Domain adı en az 3 karakter, sadece harfler, sayılar ve tire (-) içermeli');
            return false;
        }

        // Sistem ayarlarını kontrol et - onaylama gerekli mi?
        const siteSettings = JSON.parse(localStorage.getItem('siteSettings') || '{}');
        const requireApproval = siteSettings.requireApproval || false;

        const user = {
            id: Date.now().toString(),
            username: username,
            email: email,
            domain: domain,
            password: SimpleCrypto.hashPassword(password),
            createdAt: new Date().toISOString(),
            sites: [],
            isPublic: true,
            adminPanel: false,
            isSuperAdmin: false,
            approved: !requireApproval // Eğer onaylama gerekli ise approved = false
        };

        // Eğer onaylama gerekli ise pending users'a ekle
        if (requireApproval) {
            const pendingUsers = JSON.parse(localStorage.getItem('pendingUsers') || '[]');
            pendingUsers.push(user);
            localStorage.setItem('pendingUsers', JSON.stringify(pendingUsers));
            alert('Kayıt başarılı! Kaydınız admin tarafından onay beklemektedir. Onaylama sonrasında siteyi oluşturabilirsiniz.');
            return true;
        }

        // Onaylama gerekmiyorsa direkt users'a ekle
        const userList = JSON.parse(localStorage.getItem('users') || '[]');
        userList.push(user);
        localStorage.setItem('users', JSON.stringify(userList));

        // Otomatik olarak ilk siteyi seçilen tema ile oluştur
        const defaultSite = {
            id: 'site_' + Date.now().toString(),
            username: user.username,
            userId: user.id,
            title: domain.replace(/-/g, ' ').charAt(0).toUpperCase() + domain.replace(/-/g, ' ').slice(1),
            category: 'personal',
            theme: theme,
            domain: domain,
            description: 'Hoş geldiniz!',
            isPublic: true,
            icon: '📄',
            createdAt: new Date().toISOString(),
            content: {
                about: 'Sitenize hoş geldiniz. İçeriği düzenlemek için panelde daha fazla seçenek bulabilirsiniz.',
                services: 'Hizmetler burada gösterilecek',
                contact: user.email
            }
        };

        user.sites = [defaultSite.id];

        // Kullanıcıyı otomatik login yap
        this.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.updateUIState();

        alert('Kayıt başarılı! Siteniz oluşturuldu. Panele yönlendiriliyorsunuz...');
        return true;
    }

    // Tüm siteleri yükle
    loadAllSites() {
        const encrypted = localStorage.getItem('allSites');
        if (encrypted) {
            try {
                return SimpleCrypto.decryptObject(encrypted) || [];
            } catch (e) {
                return [];
            }
        }
        return [];
    }

    // Email doğrulama kodu gönder
    async sendVerificationEmail(email, username) {
        // 6 haneli doğrulama kodu oluştur
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        
        // Kodu localStorage'a kaydet (15 dakika geçerli)
        const verificationData = {
            code: verificationCode,
            email: email,
            username: username,
            expiresAt: Date.now() + (15 * 60 * 1000) // 15 dakika
        };
        localStorage.setItem(`verification_${email}`, JSON.stringify(verificationData));
        console.log('✅ Doğrulama kodu oluşturuldu:', verificationCode, '| E-mail:', email);

        try {
            // EmailJS ile email gönder
            if (typeof emailjs !== 'undefined') {
                await emailjs.send('service_websayfa', 'template_verification', {
                    to_email: email,
                    user_name: username,
                    verification_code: verificationCode,
                    expires_in: '15 dakika'
                });
                console.log('✅ Doğrulama e-maili gönderildi:', email);
            }
            return true;
        } catch (error) {
            console.log('⚠️ Email gönderme hatası (offline veya API sorunu):', error);
            console.log('ℹ️ Kod kaydedilmiş, devam ediliyor. Doğrulama kodu:', verificationCode);
            return true;
        }
    }

    // Doğrulama kodunu kontrol et
    verifyCode(email, code) {
        const data = localStorage.getItem(`verification_${email}`);
        if (!data) {
            console.log('❌ Doğrulama verisi bulunamadı:', email);
            return false;
        }

        const verificationData = JSON.parse(data);
        console.log('🔍 Doğrulama kontrol edildi:', {email, girilenKod: code, gerçekKod: verificationData.code});
        
        // Kodun süresi dolmuş mu kontrol et
        if (Date.now() > verificationData.expiresAt) {
            console.log('❌ Doğrulama kodunun süresi dolmuş');
            localStorage.removeItem(`verification_${email}`);
            return false;
        }

        // Kod eşleşiyor mu
        const matches = verificationData.code === code;
        if (!matches) {
            console.log('❌ Kod eşleşmiyor');
        } else {
            console.log('✅ Kod doğrulandı!');
        }
        return matches;
    }

    // Domain var mı kontrol et
    domainExists(domain) {
        for (let userId in this.users) {
            const user = this.users[userId];
            if (user.domain === domain) {
                return true;
            }
        }
        return false;
    }

    // Giriş yap
    login(email, password) {
        if (!email || !password) {
            alert('❌ E-mail ve şifre gereklidir');
            return false;
        }

        // Önce pending users'da kontrol et
        const pendingUsers = JSON.parse(localStorage.getItem('pendingUsers') || '[]');
        const isPending = pendingUsers.some(u => u.email === email);
        
        if (isPending) {
            alert('❌ Kaydınız henüz admin tarafından onaylanmamıştır. Lütfen onaylama işlemini bekleyin.');
            return false;
        }

        const hashedPassword = SimpleCrypto.hashPassword(password);
        const users = JSON.parse(localStorage.getItem('users') || '[]');

        for (let user of users) {
            if (user.email === email && user.password === hashedPassword) {
                // Bannedsa giriş yapmasın
                if (user.banned) {
                    alert('❌ Hesabınız banlanmıştır. Daha fazla bilgi için destek ekibiyle iletişime geçin.');
                    return false;
                }

                this.currentUser = user;
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.updateUIState();
                console.log('✅ Giriş başarılı:', email);
                alert('✅ Giriş başarılı! Panele yönlendiriliyorsunuz...');
                closeLoginModal();
                setTimeout(() => {
                    window.location.href = 'pages/dashboard.html';
                }, 1000);
                return true;
            }
        }

        console.log('❌ Giriş başarısız:', email);
        alert('❌ E-mail veya şifre hatalı');
        return false;
    }

    // Çıkış yap
    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        this.updateUIState();
        window.location.href = 'index.html';
    }

    // Kullanıcı var mı kontrol et
    userExists(email, username) {
        for (let userId in this.users) {
            const user = this.users[userId];
            if (user.email === email || user.username === username) {
                return true;
            }
        }
        return false;
    }

    // UI durumunu güncelle
    updateUIState() {
        const authButtons = document.getElementById('auth-buttons');
        const userMenu = document.getElementById('user-menu');

        if (this.currentUser && authButtons && userMenu) {
            authButtons.style.display = 'none';
            userMenu.style.display = 'flex';
        } else if (authButtons && userMenu) {
            authButtons.style.display = 'flex';
            userMenu.style.display = 'none';
        }
    }

    // Verileri kaydet
    saveUser() {
        const encrypted = SimpleCrypto.encryptObject(this.currentUser);
        localStorage.setItem('currentUser', encrypted);
    }

    saveUsers() {
        const encrypted = SimpleCrypto.encryptObject(this.users);
        localStorage.setItem('allUsers', encrypted);
    }

    // Verileri yükle
    loadUser() {
        const encrypted = localStorage.getItem('currentUser');
        if (encrypted) {
            return SimpleCrypto.decryptObject(encrypted);
        }
        return null;
    }

    loadUsers() {
        const encrypted = localStorage.getItem('allUsers');
        if (encrypted) {
            const users = SimpleCrypto.decryptObject(encrypted);
            return users || {};
        }
        return {};
    }
}

// Global auth manager
let authManager = null;

document.addEventListener('DOMContentLoaded', () => {
    authManager = new AuthManager();

    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            authManager.login(email, password);
        });
    }

    // Register form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('registerEmail').value;
            const domain = document.getElementById('registerDomain').value.toLowerCase().trim();
            const password = document.getElementById('registerPassword').value;
            const passwordConfirm = document.getElementById('registerPasswordConfirm').value;
            const theme = document.querySelector('input[name="registerTheme"]:checked').value;
            
            // Domain adı username olarak kullan
            const username = domain;

            // Temel validasyonu yap
            if (!email || !domain || !password) {
                alert('❌ Lütfen tüm alanları doldurun');
                return;
            }

            if (password !== passwordConfirm) {
                alert('❌ Şifreler eşleşmiyor');
                return;
            }

            if (authManager.userExists(email, username)) {
                alert('❌ Bu e-mail veya domain zaten kayıtlı');
                return;
            }

            if (authManager.domainExists(domain)) {
                alert('❌ Bu domain zaten alınmış');
                return;
            }

            // Email doğrulama kodunu gönder
            console.log('📧 Email doğrulama kodu gönderiliyor:', email);
            await authManager.sendVerificationEmail(email, username);
            
            // Kayıt form'unu sakla, doğrulama form'unu göster
            registerForm.style.display = 'none';
            const verificationForm = document.getElementById('verificationForm');
            verificationForm.style.display = 'block';
            document.getElementById('verificationEmail').textContent = email;
            document.getElementById('verificationCode').focus();
            
            // Kaydı tamamlamak için verileri session'da tut
            window.registerData = {
                email, username, domain, password, passwordConfirm, theme
            };
            console.log('✅ Doğrulama formu gösterildi');
        });

        // Domain input'ta real-time validation
        const domainInput = document.getElementById('registerDomain');
        const domainStatus = document.getElementById('domainStatus');
        
        domainInput.addEventListener('input', (e) => {
            const domain = e.target.value.toLowerCase().trim();
            
            // Format validasyonu
            if (!domain || domain.length < 3 || !/^[a-z0-9-]+$/.test(domain)) {
                domainStatus.textContent = '❌ Geçersiz (3+ karakter, sadece a-z, 0-9, -)';
                domainStatus.style.color = '#e74c3c';
                return;
            }

            // Benzersizlik kontrolü
            if (authManager.domainExists(domain)) {
                domainStatus.textContent = '❌ Bu domain zaten alınmış';
                domainStatus.style.color = '#e74c3c';
            } else {
                domainStatus.textContent = '✅ Kullanılabilir';
                domainStatus.style.color = '#27ae60';
            }
        });
    }

    // Doğrulama form'u
    const verificationForm = document.getElementById('verificationForm');
    if (verificationForm) {
        verificationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const code = document.getElementById('verificationCode').value.trim();
            const data = window.registerData;

            if (!data) {
                alert('❌ Hata: Kayıt verileri bulunamadı. Lütfen yeniden kayıt olunuz.');
                backToRegisterForm();
                return;
            }

            console.log('🔐 Doğrulama kontrol ediliyor...', {email: data.email, kod: code});

            if (!authManager.verifyCode(data.email, code)) {
                alert('❌ Doğrulama kodu yanlış veya süresi dolmuş. Lütfen yeniden deneyin.');
                document.getElementById('verificationCode').value = '';
                document.getElementById('verificationCode').focus();
                return;
            }

            console.log('✅ Doğrulama başarılı! Kayıt tamamlanıyor...');
            
            // Kod doğrulandı, kaydı tamamla
            if (authManager.register(data.username, data.email, data.domain, data.password, data.passwordConfirm, data.theme)) {
                verificationForm.reset();
                registerForm.reset();
                closeRegisterModal();
                console.log('✅ Kayıt tamamlandı. Panele yönlendiriliyorsunuz...');
                // Kayıt başarılı, direkt panele yönlendir
                setTimeout(() => {
                    window.location.href = 'pages/dashboard.html';
                }, 1500);
            } else {
                alert('❌ Kayıt sırasında hata oluştu. Lütfen yeniden deneyin.');
                backToRegisterForm();
            }
        });
    }
});

// Modal fonksiyonları
function openLoginModal() {
    document.getElementById('loginModal').classList.add('show');
}

function closeLoginModal() {
    document.getElementById('loginModal').classList.remove('show');
    document.getElementById('loginForm').reset();
}

function openRegisterModal() {
    document.getElementById('registerModal').classList.add('show');
}

function closeRegisterModal() {
    document.getElementById('registerModal').classList.remove('show');
    document.getElementById('registerForm').reset();
    document.getElementById('verificationForm').reset();
    // Formu sıfırla
    document.getElementById('registerForm').style.display = 'block';
    document.getElementById('verificationForm').style.display = 'none';
    window.registerData = null;
}

function backToRegisterForm() {
    document.getElementById('registerForm').style.display = 'block';
    document.getElementById('verificationForm').style.display = 'none';
    document.getElementById('verificationForm').reset();
    window.registerData = null;
}

function logout() {
    if (confirm('Çıkış yapmak istediğinizden emin misiniz?')) {
        authManager.logout();
    }
}

function openUserPanel() {
    if (authManager && authManager.currentUser) {
        window.location.href = 'pages/dashboard.html';
    }
}

// Modal dışında tıklanınca kapat
window.addEventListener('click', (event) => {
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');

    if (event.target === loginModal) {
        closeLoginModal();
    }
    if (event.target === registerModal) {
        closeRegisterModal();
    }
});
