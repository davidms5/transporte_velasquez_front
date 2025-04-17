import CryptoJS from 'crypto-js';

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

export function saveEncryptItem(key, value) {

    const encryptedValue = CryptoJS.AES.encrypt(JSON.stringify(value), SECRET_KEY).toString();

    sessionStorage.setItem(key, encryptedValue);
}

export function getDecryptItem(key) {
    const encrypted = localStorage.getItem(key);
    if (!encrypted) return null;
  
    try {
      const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decrypted);
    } catch (error) {
      console.error("Error al desencriptar", error);
      return null;
    }
}