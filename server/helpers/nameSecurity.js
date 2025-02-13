import crypto from "crypto";
import dotenv from "dotenv"

dotenv.config()

function deriveKeyFromPassword(pin) {
    return crypto.pbkdf2Sync(pin, "unique_salt", 100000, 32, "sha256");
}

export function encryptPasswordName(userPin,passwordName) {
    const key=deriveKeyFromPassword(userPin)
    const cipher = crypto.createCipheriv("aes-256-cbc", key, process.env.SECRET_KEY);

    let encrypted = cipher.update(passwordName, "utf-8", "hex");
    encrypted += cipher.final("hex");

    return encrypted
}

export function decryptPasswordName(userPin,encryptedName) {
    const key=deriveKeyFromPassword(userPin)
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, Buffer.from(process.env.SECRET_KEY, "hex"));

    let decrypted = decipher.update(encryptedName, "hex", "utf-8");
    decrypted += decipher.final("utf-8");

    return decrypted;
}
