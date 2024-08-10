const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const { MongoClient } = require("mongodb");
const { ObjectId } = require("bson");
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }));

const mongoURL = process.env.MONGODB_URL;
const client = new MongoClient(mongoURL);
const dbName = process.env.MONGODB_NAME;

router.post("/", async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);

    if (!req.session.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { titleToSave, textToSave } = req.body;

    if (!titleToSave) {
      return res.status(404).send({ message: "File does not exist" });
    }

    const userId = req.session.userId;
    const objectId = new ObjectId(userId);

    const user = await db
      .collection("users")
      .findOne(
        { _id: objectId },
        { projection: { _id: 0, username: 0, password: 0 } }
      );

    const filePath = path.join(
      __dirname,
      `../../users/${user.email}/${titleToSave}`
    );

    const dirPath = path.join(__dirname, `../../users/${user.email}`);

    if (user.remainingStorageInBytes <= 0) {
      return res.status(405).send({ message: "Max space reached" });
    }

    fs.writeFileSync(filePath, textToSave, "utf8");

    const getFolderSize = (await import("get-folder-size")).default;

    const currentFolderSize = await getFolderSize.loose(dirPath);

    const newRemainingStorage =
      process.env.MAX_ALLOWED_SPACE_FOR_USER - currentFolderSize;

    db.collection("users").findOneAndUpdate(
      { email: user.email },
      { $set: { remainingStorageInBytes: newRemainingStorage } }
    );

    res.sendStatus(200);
  } catch {
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
