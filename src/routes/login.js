require("dotenv").config();
const express = require("express");
const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }));

const mongoURL = process.env.MONGODB_URL;
const client = new MongoClient(mongoURL);
const dbName = process.env.MONGODB_NAME;

router.post("/", async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);

    if (req.session.userId) {
      return res.status(401).json({ message: "Already logged in" });
    }

    const { emailLogin, passwordLogin } = req.body;

    const user = await db.collection("users").findOne({ email: emailLogin });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password " });
    }

    const passwordMatch = await bcrypt.compare(passwordLogin, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password " });
    }

    req.session.userId = user._id;
    req.session.username = user.username;

    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
