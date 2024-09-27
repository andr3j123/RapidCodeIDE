const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const { ObjectId } = require("bson");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

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

    const userData = await db.collection("users").findOne({ _id: objectId });

    res.status(200).json({ userData: userData });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
