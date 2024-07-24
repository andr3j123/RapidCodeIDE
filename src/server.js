require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const app = express();

const PORT = process.env.SERVER_PORT || 8080;

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


app.get('/api/sessionData', (req, res) => {
  if (!req.session.userId) return res.send({});
  res.send({ userId: req.session.userId, username: req.session.username });
});

const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');
const readFilesRoute = require('./routes/readFiles');

app.use('/login', loginRoute);
app.use('/register', registerRoute);
app.use('/api/readFiles', readFilesRoute);

app.get('*', (req, res) => {
  res.status(404).send('<h1>404 not found</h1>');
});