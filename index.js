const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 9001;
app.use(cors());
let jsonData = {};
function loadJSON() {
  try {
    const data = fs.readFileSync(path.join(__dirname, "key-to-stylefile-map.json"), "utf8");
    jsonData = JSON.parse(data);
    console.log("✅ JSON Data Loaded Successfully");
  } catch (error) {
    console.error("❌ Error loading JSON:", error);
    jsonData = {};
  }
}
loadJSON();
fs.watchFile(path.join(__dirname, "data.json"), () => {
  console.log("🔄 Reloading JSON Data...");
  loadJSON();
});
function xorEncryptDecrypt(data, key) {
  return data
    .split("")
    .map((char, index) => String.fromCharCode(char.charCodeAt(0) ^ key[index % key.length].charCodeAt(0)))
    .join("");
}

const encryptionKey = "secureKey123";

app.get("/keep-alive", (req, res) => {
  res.status(200).send("👋 I'm awake!");
});

app.get("/load-css.js", (req, res) => {
  const key = req.query.key;

  if (!key || !jsonData.data || !jsonData.data[key]) {
    return res.status(403).send("Invalid key");
  }

  const filename = jsonData.data[key].filename;
  const cssFilePath = path.join(__dirname, "styles", `${filename}.css`);
  if (!fs.existsSync(cssFilePath)) {
    return res.status(404).send("CSS File Not Found");
  }
  fs.readFile(cssFilePath, "utf8", (err, cssContent) => {
    if (err) {
      return res.status(500).send("Error reading CSS file");
    }

    const encryptedCSS = Buffer.from(xorEncryptDecrypt(cssContent, encryptionKey)).toString("base64");

    res.setHeader("Content-Type", "application/javascript");
    res.send(`
      (function() {
        var encryptedCSS = "${encryptedCSS}";
        var decryptionKey = "secureKey123";

        function xorDecrypt(data, key) {
          var decodedData = atob(data);
          return decodedData.split("")
            .map((char, index) => String.fromCharCode(char.charCodeAt(0) ^ key[index % key.length].charCodeAt(0)))
            .join("");
        }

        var style = document.createElement('style');
        style.innerHTML = xorDecrypt(encryptedCSS, decryptionKey);
        document.head.appendChild(style);
      })();
    `);
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at ${PORT}`);
});
