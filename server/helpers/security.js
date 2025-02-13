import crypto from "crypto"
import dotenv from "dotenv"

dotenv.config()

function deriveKeyFromPassword(pin) {
    return crypto.pbkdf2Sync(pin, "unique_salt", 100000, 32, "sha256");
}

export function encryptPassword(userPin,password){
    const key=deriveKeyFromPassword(userPin)
    const cipher=crypto.createCipheriv("aes-256-cbc",key,process.env.SECRET_KEY)

    let encrypted=cipher.update(password,"utf-8","hex")
    encrypted+=cipher.final("hex")

    return encrypted
}

export function decryptPassword(userPin,encryptedPassword){
    const key=deriveKeyFromPassword(userPin)
    const decipher=crypto.createDecipheriv("aes-256-cbc",key,Buffer.from(process.env.SECRET_KEY,"hex"))

    let decrypted=decipher.update(encryptedPassword,"hex","utf-8")
    decrypted+=decipher.final("utf-8")

    return decrypted
}