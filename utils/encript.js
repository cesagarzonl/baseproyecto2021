'use stric'


const crypto = require('crypto');
const confic = require('../Config/config')

const algorithm = confic().encryptionMethod;
const key = confic().secretEncript;
const iv = key.substr(0,16);


/**
 * 
 * @param {textoTo encript} text 
 * @returns text encripted
 */

function encrypt(text) {
 let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
 let encrypted = cipher.update(text);
 encrypted = Buffer.concat([encrypted, cipher.final()]);
 return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

module.exports = { encrypt }