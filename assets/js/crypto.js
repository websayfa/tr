// crypto.js - Basit şifreleme sistemi

class SimpleCrypto {
    // Basit SHA-256 benzeri hash fonksiyonu
    static hashPassword(password) {
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return 'hash_' + Math.abs(hash).toString(16);
    }

    // Base64 benzeri kodlama
    static encode(str) {
        try {
            return btoa(unescape(encodeURIComponent(str)));
        } catch (e) {
            return str;
        }
    }

    // Base64 benzeri dekodlama
    static decode(str) {
        try {
            return decodeURIComponent(escape(atob(str)));
        } catch (e) {
            return str;
        }
    }

    // Şifreli obje oluşturma
    static encryptObject(obj) {
        const json = JSON.stringify(obj);
        return this.encode(json);
    }

    // Şifreli obje çözme
    static decryptObject(encrypted) {
        try {
            const json = this.decode(encrypted);
            return JSON.parse(json);
        } catch (e) {
            return null;
        }
    }
}
