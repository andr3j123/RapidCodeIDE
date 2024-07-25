const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');
const { ObjectId } = require('bson');

const mongoURL = process.env.MONGODB_URL;
const client = new MongoClient(mongoURL);
const dbName = process.env.MONGODB_NAME;

router.get('/:fileName', async (req, res) => {
    try{
        const params = req.params;
        const fileName = params.fileName;

        await client.connect();
        const db = client.db(dbName);

        if (!req.session.userId) {
            return res.status(401).json({ "message": "Unauthorized" });
        }

        const userId = req.session.userId;
        const objectId = new ObjectId(userId);

        const user = await db.collection('users').findOne({ _id: objectId }, { projection: { _id: 0, username: 0, password: 0, files: 0} });

        const filePath = path.join(__dirname, `../../users/${user.email}/${fileName}`);

        try{
            const contentOfTheFile = fs.readFileSync(filePath, { encoding: 'utf8', flag: 'r' });

            return res.status(200).send({ title: fileName, content: contentOfTheFile });
        }
        catch(err){
            res.sendStatus(404);
        }
    }
    catch(err){
        return res.status(500).json({ "message": "Internal server error" });
    }

});

module.exports = router;