import { Command } from "commander";
import crypto from "crypto";

const program = new Command();

program
  .name("isy-crypto")
  .description("CLI tool to encrypt and decrypt strings using AES-256-CBC.")
  .version("0.1.0");

const getKeyAndIv = (userKey) => {
  const hash = crypto.createHash("sha256");
  hash.update(userKey);

  const key = hash.digest();
  const iv = crypto.randomBytes(16); // AES block size is 16 bytes

  return { key, iv };
};

const encrypt = (text, userKey) => {
  const { key, iv } = getKeyAndIv(userKey);
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  return iv.toString("hex") + ":" + encrypted;
};

const decrypt = (encryptedText, userKey) => {
  const textParts = encryptedText.split(":");
  const iv = Buffer.from(textParts.shift(), "hex");
  const encrypted = textParts.join(":");
  const { key } = getKeyAndIv(userKey);
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);

  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
};

program
  .command("encrypt <text>")
  .description(
    "Encrypts a string using a custom key. The output is a combination of the initialization vector (IV) and the encrypted text, separated by a colon. This ensures that even if the same text is encrypted multiple times, the output will be different."
  )
  .option(
    "-k, --key <key>",
    "The encryption key. This can be any string. Internally, it is hashed to fit the encryption algorithm's requirements."
  )
  .action((text, options) => {
    console.log(`Encrypting "${text}" with key "${options.key}"`);
    const encrypted = encrypt(text, options.key);
    console.log(`Encrypted: ${encrypted}`);
  });

program
  .command("decrypt <text>")
  .description(
    "Decrypts a string using the same custom key that was used for encryption. The input should be the encrypted text received from the encrypt command, including the IV."
  )
  .option(
    "-k, --key <key>",
    "The decryption key. This must be the same key that was used to encrypt the text."
  )
  .action((text, options) => {
    console.log(`Decrypting "${text}" with key "${options.key}"`);
    const decrypted = decrypt(text, options.key);
    console.log(`Decrypted: ${decrypted}`);
  });

program.parse(process.argv);
