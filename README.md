# ISY-Crypto CLI Tool

> Asimetric Encryptation recently added 🎉

ISY-Crypto is a powerful Command Line Interface (CLI) tool designed for encrypting and decrypting strings using the AES-256-CBC algorithm. It allows users to secure their data with a custom key, making it an essential utility for anyone looking to protect sensitive information.

## Features

- **Asymmetric Encryption:** Encrypt and decrypt strings using a public and private RSA key pair.
- **Custom Encryption Keys:** Use any string as an encryption/decryption key.
- **AES-256-CBC Encryption:** Leverages the secure AES-256-CBC algorithm for encryption and decryption.
- **Unique Outputs:** Generates a unique output for the same input text by incorporating an initialization vector (IV).

## Installation

Before installing ISY-Crypto, ensure you have [Node.js](https://nodejs.org/) installed on your system.

### Option 1: Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/yourusername/isy-crypto.git
```

Navigate to the project directory:

```bash
cd isy-crypto
```

Install the dependencies:

```bash
npm install
```

### Option 2: Install via npm

Install ISY-Crypto globally using npm:

```bash
npm install -g isy-crypto
```

## Usage

After installing ISY-Crypto globally via npm, you can use it directly from your terminal without navigating to a specific project directory.

### Generating RSA Keys

To generate a public and private RSA key pair, use the `isy-crypto keygen` command. This will generate an RSA key pair and save it to the specified output directory or print it to the console.

**The default name is `id-rsa-[public|private].pem`**. In later versions, the name will be customizable.

```bash
isy-crypto keygen -p /path/to/output/directory
```
**⚠️ If `-p` or `--path` is not passed, the keys will be printed to the console.**


### Encrypting Text

To encrypt a string, simply open your terminal and use the `isy-crypto encrypt` command followed by the text you wish to encrypt. Specify the encryption key with the `-k` or `--key` option.

For example:

```bash
isy-crypto encrypt "Hello, World!" -k "your_secret_key"
> Encrypted: 
45f5fc53dc3ef1f1af50f1205487e021:353a8541b838d8587dab4922b565545b
```

### Encrypting Text with RSA Public Key

To encrypt a string using a public RSA key, use the `isy-crypto encrypt` command followed by the text you wish to encrypt and the option `-a` or `--asimetric`. Specify the public key with the `-p` or `--path` option.

```bash
node index.js encrypt "Hello World" -a -p /path/to/public/key.pem
> Encrypted: 
r3XsAzpi0T3dp1rPQannoXxFTt0x...FiKdH3ArEycMZCLegGTXO1fdJ2mklRIm1DIzdR7c=
```

### Decrypting Text

To decrypt a string, use the `isy-crypto decrypt` command followed by the encrypted text. Specify the decryption key with the `-k` or `--key` option.

For example:

```bash
isy-crypto decrypt "45f5fc53dc3ef1f1af50f1205487e021:353a8541b838d8587dab4922b565545b" -k "your_secret_key"
> Decrypted: 
Hello, World!
```

### Encrypting Text with RSA Private Key

To decrypt a string using a private RSA key, use the `isy-crypto decrypt` command followed by the text you wish to decrypt and the option `-a` or `--asimetric`. Specify the private key with the `-p` or `--path` option.

```bash
node index.js decrypt "r3XsAzpi0T3dp1rPQannoXxFTt0x...FiKdH3ArEycMZCLegGTXO1fdJ2mklRIm1DIzdR7c=" -a -p /path/to/private/key.pem
> Decrypted:
"Hello World"
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any bugs, features, or improvements.

## License

ISY-Crypto is released under the MIT License. See the LICENSE file for more details.