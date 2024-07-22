require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const app = express();

const PORT = 3030;

app.listen(PORT);
app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend')));

// Configure session middleware
const sessionStore = MongoStore.create({
  mongoUrl: process.env.MONGODB_URL,
  dbName: process.env.MONGODB_NAME,
  collectionName: 'sessions',
  autoRemoveInterval: 1440 // 1 day in mins
});

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
    }
}));

const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');

app.use('/login', loginRoute);
app.use('/register', registerRoute);