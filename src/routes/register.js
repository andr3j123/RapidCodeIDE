require("dotenv").config();
const express = require("express");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const fs = require("fs/promises");
const path = require("path");

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

const mongoURL = process.env.MONGODB_URL;
const client = new MongoClient(mongoURL);
const dbName = process.env.MONGODB_NAME;

router.post("/", async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("users");

    const { usernameRegister, emailRegister, passwordRegister } = req.body;

    if (!usernameRegister || !emailRegister || !passwordRegister) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await collection.findOne({ email: emailRegister });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(passwordRegister, 10);

    const result = await collection.insertOne({
      username: usernameRegister,
      email: emailRegister,
      password: hashedPassword,
      remainingStorageInBytes: 25000000,
    });

    if (result.acknowledged) {
      const userDirectory = path.join(__dirname, "../../users", emailRegister);

      try {
        await fs.mkdir(userDirectory, { recursive: true });
        return res.status(200).redirect("back");
      } catch (err) {
        console.error("Failed to create user directory:", err);
        return res
          .status(500)
          .json({ message: "Failed to create user directory" });
      }
    } else {
      return res.status(500).json({ message: "Failed to register user" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
