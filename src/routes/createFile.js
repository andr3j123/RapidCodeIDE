require("dotenv").config();
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const fs = require("fs");
const { MongoClient } = require("mongodb");
const path = require("path");
const { ObjectId } = require("bson");

router.use(bodyParser.urlencoded({ extended: true }));

const mongoURL = process.env.MONGODB_URL;
const client = new MongoClient(mongoURL);
const dbName = process.env.MONGODB_NAME;

router.post("/", async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);

    if (!req.session.userId) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    const { fileName } = req.body;

    const userId = req.session.userId;
    const objectId = new ObjectId(userId);

    const user = await db
      .collection("users")
      .findOne(
        { _id: objectId },
        { projection: { _id: 0, username: 0, password: 0, files: 0 } }
      );

    const newFilePath = path.join(
      __dirname,
      `../../users/${user.email}/${fileName}`
    );

    try {
      if (fs.existsSync(newFilePath)) {
        return res
          .status(405)
          .send({ message: "File with that name already exists" });
      }
      fs.open(newFilePath, "w", (err) => {
        if (err) return res.status(500).send({ message: err });
      });
      return res.status(200).redirect("back");
    } catch {
      return res.status(500).send({ message: "Internal server error" });
    }
  } catch {
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
