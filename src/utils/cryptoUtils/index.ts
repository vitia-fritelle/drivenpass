import bcrypt from 'bcrypt';
import Cryptr from 'cryptr';
import dotenv from 'dotenv';
import Jwt from "jsonwebtoken";
dotenv.config()

async function hash(text: string, salt = 10) {
    return await bcrypt.hash(text, salt);
}

async function compare(encryptedText: string, normalText: string) {
    return await bcrypt.compare(normalText, encryptedText);
}

const secretKey = new Cryptr(process.env.SECRET_KEY || '123456789');

async function sign(text: string) {
    return Jwt.sign(text, process.env.SECRET_KEY || '123456789');
}

async function decode(text: string) {
    return Jwt.decode(text);
}

const cryptoUtils = {
    hash,
    secretKey,
    compare,
    sign,
    decode,
}

export default cryptoUtils;
