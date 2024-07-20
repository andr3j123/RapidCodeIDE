const express = require('express');
const path = require('path');
const app = express();

const PORT = 3030;

app.listen(PORT);
app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend')));

const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');

app.use('/login', loginRoute);
app.use('/register', registerRoute);