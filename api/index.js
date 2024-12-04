const express = require("express");
const Vigenere = require("caesar-salad").Vigenere;
const cors = require("cors");

const app = express();
const port = 8000;

app.use(cors())
app.use(express.json());

app.post("/encode", (req, res) => {
    const { password, message } = req.body;

    if (!password) {
        return res.status(400).json({ error: "Please enter password!" });
    }

    const encodedText = Vigenere.Cipher(password).crypt(message);
    res.json({ encoded: encodedText });
});

app.post("/decode", (req, res) => {
    const { password, message } = req.body;

    if (!password) {
        return res.status(400).json({ error: "Please enter password!" });
    }

    const decodedText = Vigenere.Decipher(password).crypt(message);
    res.json({ decoded: decodedText });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});