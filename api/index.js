/* giftionary node server */

const express = require('express');
const env = require('dotenv').config();
const logger = require('morgan');
const bodyParser = require('body-parser');
const axios = require('axios');
const PORT = process.env.PORT || 8080;

/* API */

const gifs  = require('./routes/gifs');
const words = require('./routes/words');

const app = express();

/* HTTP request logger */

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/* Router */

app.use('/api/gifs', gifs);
app.use('/api/words', words);

/* Root */

app.get('/', (req, res) => {
  res.json({msg: 'Welcome to the giftionary api'});
});

app.get('/happy', (req, res) => {
  res.json({msg: ':)'});
});

/* Start server */
app.listen(PORT, function() {
  console.log('Serving up some slick routes on ' + PORT);
});
