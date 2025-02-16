import crypto from "crypto"
import dotenv from "dotenv"

dotenv.config()

function deriveKeyFromPin(pin) {
    return crypto.pbkdf2Sync(
        pin, 
        process.env.SECRET_KEY, 
        100000, 
        32, 
        "sha256"
    );
}
function generateSecretKey(text) {
    const hash = crypto.createHash('sha256')
        .update(text)
        .digest();
    return hash.slice(0, 16).toString('hex');
}

export function encryptPassword(userPin,password){
    try {
        const key=deriveKeyFromPin(userPin)
        const cipher = crypto.createCipheriv(
            "aes-256-cbc",
            key,
            Buffer.from(generateSecretKey(process.env.SECRET_KEY), 'hex')
        );
    
        let encrypted=cipher.update(password,"utf-8","hex")
        encrypted+=cipher.final("hex")
    
        return encrypted
    } catch (error) {
        throw new Error('Encryption failed: ' + error.message);
    }
}

export function decryptPassword(userPin,encryptedPassword){
    try {
        const key=deriveKeyFromPin(userPin)
        const decipher = crypto.createDecipheriv(
            "aes-256-cbc",
            key,
            Buffer.from(generateSecretKey(process.env.SECRET_KEY), 'hex')
        );
    
        let decrypted=decipher.update(encryptedPassword,"hex","utf-8")
        decrypted+=decipher.final("utf-8")
    
        return decrypted
    } catch (error) {
        throw new Error('Decryption failed: ' + error.message);
    }
}