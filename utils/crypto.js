import CryptoJS from "crypto-js";
export function criptografarSenha(senha){
    return CryptoJS.SHA256(senha).toString()
}