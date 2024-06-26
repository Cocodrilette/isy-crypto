# ISY-Crypto CLI Tool

ISY-Crypto is a powerful Command Line Interface (CLI) tool designed for encrypting and decrypting strings using the AES-256-CBC algorithm. It allows users to secure their data with a custom key, making it an essential utility for anyone looking to protect sensitive information.

## Features

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

### Option 3: Install via npm

Install ISY-Crypto globally using npm:

```bash
npm install -g isy-crypto
```

## Usage

After installing ISY-Crypto globally via npm, you can use it directly from your terminal without navigating to a specific project directory.

### Encrypting Text

To encrypt a string, simply open your terminal and use the `isy-crypto encrypt` command followed by the text you wish to encrypt. Specify the encryption key with the `-k` or `--key` option.

For example:

```bash
isy-crypto encrypt "Hello, World!" -k "your_secret_key"
> Encrypted: 45f5fc53dc3ef1f1af50f1205487e021:353a8541b838d8587dab4922b565545b
```

### Decrypting Text

To decrypt a string, use the `isy-crypto decrypt` command followed by the encrypted text. Specify the decryption key with the `-k` or `--key` option.

For example:

```bash
isy-crypto decrypt "45f5fc53dc3ef1f1af50f1205487e021:353a8541b838d8587dab4922b565545b" -k "your_secret_key"
> Decrypted: Hello, World!
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any bugs, features, or improvements.

## License

ISY-Crypto is released under the MIT License. See the LICENSE file for more details.