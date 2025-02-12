import crypto from "crypto"

function deriveKeyFromPassword(password) {
    return crypto.pbkdf2Sync(password, "unique_salt", 100000, 32, "sha256");
}

export function encryptPassword(userPassword,password){
    const key=deriveKeyFromPassword(userPassword)
    const iv=crypto.randomBytes(16)
    const cipher=crypto.createCipheriv("aes-256-cbc",key,iv)

    let encrypted=cipher.update(password,"utf-8","hex")
    encrypted+=cipher.final("hex")

    return {encryptPassword: encrypted, iv:iv.toString("hex")}
}

export function decryptPassword(userPassword,encryptedPassword,iv){
    const key=deriveKeyFromPassword(userPassword)
    const decipher=crypto.createDecipheriv("aes-256-cbc",key,Buffer.from(iv,"hex"))

    let decrypted=decipher.update(encryptedPassword,"hex","utf-8")
    decrypted+=decipher.final("utf-8")

    return decrypted
}