const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 9000;

// Allow CORS
app.use(cors());

// Your original CSS
const cssContent = `
    body { background-color: #222; color: white; font-family: Arial, sans-serif; }
    h1 { color: #ffcc00; font-size: 24px; text-align: center; }
    p { font-size: 16px; line-height: 1.6; }
    .custom-box { padding: 20px; background: #333; border-radius: 8px; }
`;

// Simple XOR Encryption function (lightweight protection)
function xorEncryptDecrypt(data, key) {
  return data
    .split("")
    .map((char, index) => String.fromCharCode(char.charCodeAt(0) ^ key[index % key.length].charCodeAt(0)))
    .join("");
}

// Encryption key (DO NOT SHARE)
const encryptionKey = "secureKey123";

// Encrypt the CSS
const encryptedCSS = Buffer.from(xorEncryptDecrypt(cssContent, encryptionKey)).toString("base64");

// Serve Encrypted CSS
app.get("/load-css.js", (req, res) => {
  res.setHeader("Content-Type", "application/javascript");

  res.send(`
    (function() {
      var encryptedCSS = "${encryptedCSS}";
      var decryptionKey = "secureKey123";

      // Decrypt CSS
      function xorDecrypt(data, key) {
        var decodedData = atob(data);
        return decodedData.split("")
          .map((char, index) => String.fromCharCode(char.charCodeAt(0) ^ key[index % key.length].charCodeAt(0)))
          .join("");
      }

      // Apply Decrypted CSS
      var style = document.createElement('style');
      style.innerHTML = xorDecrypt(encryptedCSS, decryptionKey);
      document.head.appendChild(style);
    })();
  `);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
