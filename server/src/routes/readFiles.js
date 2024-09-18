const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");
const fs = require("fs");
const path = require("path");
const { ObjectId } = require("bson");

const mongoURL = process.env.MONGODB_URL;
const client = new MongoClient(mongoURL);
const dbName = process.env.MONGODB_NAME;

router.get("/", async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);

    if (!req.cookies.sessionId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const session = await db
      .collection("sessions")
      .findOne({ _id: req.cookies.sessionId });

    if (!session || !session.session) {
      return res.status(401).json({ message: "Invalid session" });
    }

    let sessionData = JSON.parse(session.session);

    const userId = sessionData.userId;
    const objectId = new ObjectId(userId);

    const user = await db
      .collection("users")
      .findOne(
        { _id: objectId },
        { projection: { _id: 0, username: 0, password: 0, files: 0 } }
      );

    const userDirectory = path.join(__dirname, `./../../users/${user.email}`);

    fs.readdir(userDirectory, (err, files) => {
      if (err) return res.status(500).send({ message: err });

      let userFiles = [];

      files.forEach((file) => userFiles.push(file));

      return res.send({ userFiles: userFiles });
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
