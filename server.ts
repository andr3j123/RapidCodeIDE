const express = require('express');
const path = require('path');
const app = express();

const PORT: number = 3030;

app.listen(PORT);
app.use(express.static(path.join(__dirname, 'frontend')));
