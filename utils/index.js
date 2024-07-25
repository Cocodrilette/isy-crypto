import fs from "fs";
import crypto from "crypto";

export const getKeyAndIv = (userKey) => {
  const hash = crypto.createHash("sha256");
  hash.update(userKey);

  const key = hash.digest();
  const iv = crypto.randomBytes(16); // AES block size is 16 bytes

  return { key, iv };
};

export const encrypt = (text, userKey) => {
  const { key, iv } = getKeyAndIv(userKey);
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  return iv.toString("hex") + ":" + encrypted;
};

export const publicEncrypt = (text, key, path) => {
  if (path) {
    const fileKey = fs.readFileSync(path, "utf8");
    return crypto.publicEncrypt(fileKey, Buffer.from(text)).toString("base64");
  }

  return crypto.publicEncrypt(key, Buffer.from(text)).toString("base64");
};

export const decrypt = (encryptedText, userKey) => {
  const textParts = encryptedText.split(":");
  const iv = Buffer.from(textParts.shift(), "hex");
  const encrypted = textParts.join(":");
  const { key } = getKeyAndIv(userKey);
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);

  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
};

export const privateDecrypt = (encryptedText, key, path) => {
  if (path) {
    const fileKey = fs.readFileSync(path, "utf8");
    return crypto
      .privateDecrypt(fileKey, Buffer.from(encryptedText, "base64"))
      .toString();
  }

  return crypto
    .privateDecrypt(key, Buffer.from(encryptedText, "base64"))
    .toString();
};

export const keygen = () => {
  const {publicKey, privateKey} = crypto.generateKeyPairSync("rsa", {
    modulusLength: 4096
  })

  return {
    publicKey: publicKey.export({type: "spki", format: "pem"}).toString(),
    privateKey: privateKey.export({type: "pkcs8", format: "pem"}).toString()
  }
}