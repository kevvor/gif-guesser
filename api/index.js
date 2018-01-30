/* giftionary node server */

const express = require('express');
const path = require('path');
const env = require('dotenv').config();
const logger = require('morgan');
const bodyParser = require('body-parser');
const axios = require('axios');
const PORT = process.env.PORT || 8080;

/* API */

const gifs  = require('./routes/gifs');
const words = require('./routes/words');

const app = express();

/* View engine setup */

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* So node won't yell at us */

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

/* Router */

app.use('/api/gifs', gifs);
app.use('/api/words', words);

/* Root */

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/happy', (req, res) => {
  res.send(':)');
});

/* Start server */
app.listen(PORT, function() {
  console.log('Serving up some slick routes on ' + PORT);
});
