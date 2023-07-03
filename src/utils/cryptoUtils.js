import CryptoJS from 'crypto-js'

const key = import.meta.env.VITE_AES_SECRET_KEY
const iv = import.meta.env.VITE_AES_IV


export function EncryptAES(plaintText) {
  return CryptoJS.AES.encrypt(plaintText, key, { iv }).toString()
}

export function DecryptAES(cipherText) {
  return CryptoJS.AES.decrypt(cipherText, key, { iv }).toString(CryptoJS.enc.Utf8)
}

export function EncryptMd5(plaintText) {
  return CryptoJS.MD5(plaintText).toString()
}
