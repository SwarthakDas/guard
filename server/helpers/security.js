import crypto from "crypto"
import dotenv from "dotenv"

dotenv.config()
export function encryptPassword(password){
    const key=process.env.SECRET_KEY
    const iv=crypto.randomBytes(16)
    const cipher=crypto.createCipheriv("aes-256-cbc",key,iv)

    let encrypted=cipher.update(password,"utf-8","hex")
    encrypted+=cipher.final("hex")

    return {encryptPassword: encrypted, iv:iv.toString("hex")}
}

export function decryptPassword(encryptedPassword,iv){
    const key=process.env.SECRET_KEY
    const decipher=crypto.createDecipheriv("aes-256-cbc",key,Buffer.from(iv,"hex"))

    let decrypted=decipher.update(encryptedPassword,"hex","utf-8")
    decrypted+=decipher.final("utf-8")

    return decrypted
}