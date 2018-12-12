const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const flats = require('./controllers/flats');

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/flats', flats);

app.listen(process.env.PORT);
