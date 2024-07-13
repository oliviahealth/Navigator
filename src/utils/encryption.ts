import crypto from "crypto";
const encryptionKey = process.env.NEXT_PUBLIC_SSN_ENCRYPTION_KEY;
const iv = crypto.randomBytes(16);

export const encryptSSN = (ssn: string) => {
    if (!encryptionKey) return;
    const key = Buffer.from(encryptionKey, 'base64');

    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encryptedSSN = cipher.update(ssn, 'utf8', 'hex');
    encryptedSSN += cipher.final('hex');

    const encryptedWithIv = iv.toString('hex') + ':' + encryptedSSN;
    return encryptedWithIv;
};

export const decryptSSN = (encryptedSSNWithIv: string) => {
    if (!encryptionKey) return;
    const key = Buffer.from(encryptionKey, 'base64');

    const [ivHex, encryptedSSN] = encryptedSSNWithIv.split(':');
    const iv = Buffer.from(ivHex, 'hex');

    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decryptedSSN = decipher.update(encryptedSSN, 'hex', 'utf8');
    decryptedSSN += decipher.final('utf8');
    return decryptedSSN;
};