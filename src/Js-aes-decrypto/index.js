function decrypt(text, secret, iv) {
  let iv1 = CryptoJS.enc.Utf8.parse(iv);

  var key = CryptoJS.enc.Utf8.parse(secret);
  var cipherBytes = CryptoJS.enc.Base64.parse(text);

  var decrypted = CryptoJS.AES.decrypt({ ciphertext: cipherBytes }, key, {
    iv: iv1,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return decrypted.toString(CryptoJS.enc.Utf8);
}

function App() {
  const textField = document.querySelector("#data");
  const keyField = document.querySelector("#key");
  const decryptButton = document.querySelector("#decrypt-button");
  const text = document.querySelector("#text");

  decryptButton.onclick = (e) => {
    const encryptedString = textField.value;
    const encryptedKey = keyField.value;
    const iv = encryptedString.slice(0, 16);
    const content = encryptedString.slice(16, encryptedString.length);

    console.log(decrypt(content, encryptedKey, iv));
    text.textContent = JSON.stringify(decrypt(content, encryptedKey, iv), 10);
  };
}

App();
