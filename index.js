#!/usr/bin/env node

import fs from "fs";
import path from "path";

import { Command } from "commander";
import {
  publicEncrypt,
  privateDecrypt,
  encrypt,
  decrypt,
  keygen,
} from "./utils/index.js";

const program = new Command();

program
  .name("isy-crypto")
  .description("CLI tool to encrypt and decrypt strings using AES-256-CBC.")
  .version("0.2.1");

program
  .command("keygen")
  .option(
    "-p, --path <path>",
    "The path to save the keys, for example: `~/.keys/my-safe-key/id-rsa-public.pem`. If not provided, the keys will be printed to the console."
  )
  .description("Generates a new RSA key pair.")
  .action((options) => {
    const { publicKey, privateKey } = keygen();

    if (options.path) {
      const pubPath = path.join(options.path, "id-rsa-public.pem");
      const privPath = path.join(options.path, "id-rsa-private.pem");

      if (fs.existsSync(pubPath) || fs.existsSync(privPath)) {
        console.error("Keys already exist in the specified path.");
        process.exit(1);
      }
      
      if (!fs.existsSync(options.path)) {
        fs.mkdirSync(options.path, { recursive: true });
      }

      fs.writeFileSync(pubPath, publicKey);
      fs.writeFileSync(privPath, privateKey);

      console.log(`Public key saved to: ${pubPath}`);
      console.log(`Private key saved to: ${privPath}`);
    } else {
      console.log(`Public key:\n${publicKey}`);
      console.log(`Private key:\n${privateKey}`);
    }
  });

program
  .command("encrypt <text>")
  .description(
    "Encrypts a string using a custom key. The output is a combination of the initialization vector (IV) and the encrypted text, separated by a colon. This ensures that even if the same text is encrypted multiple times, the output will be different."
  )
  .option(
    "-k, --key <key>",
    "The encryption key. Must be a valid RSA public key if the `--asimetric/-a` options is passed, if not, can be any string. Internally, it is hashed to fit the encryption algorithm's requirements."
  )
  .option("-a, --asimetric", "Use an asimetric key")
  .option("-p, --path <path>", "The path to the public key file.")
  .action((text, options) => {
    const encrypted = options.asimetric ? publicEncrypt(text, options.key, options.path) : encrypt(text, options.key);
    console.log(`Encrypted:\n${encrypted}`);
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
  .option("-a, --asimetric", "Use an asimetric key")
  .option("-p, --path <path>", "The path to the private key file.")
  .action((text, options) => {
    const decrypted = options.asimetric
      ? privateDecrypt(text, options.key, options.path)
      : decrypt(text, options.key);
    console.log(`Decrypted:\n${decrypted}`);
  });

program.parse(process.argv);
