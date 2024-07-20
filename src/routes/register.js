require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

const mongoURL = process.env.MONGODB_URL;
const client = new MongoClient(mongoURL);
const dbName = process.env.MONGODB_NAME;

router.post('/', async (req, res) => {
    try{
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('users');  

        const { usernameRegister, emailRegister, passwordRegister } = req.body;

        if (!usernameRegister || !emailRegister || !passwordRegister) {
            return res.sendStatus(400).redirect('../login.html');
        }

        const hashedPassword = await bcrypt.hash(passwordRegister, 10);

        await collection.insertOne({ "username": usernameRegister, "email": emailRegister, "password": hashedPassword, "files": {} });

        res.status(200).redirect('../login.html');
    }
    catch(err){
        console.error(err);
        res.sendStatus(500);
    }
});

module.exports = router;