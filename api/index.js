/* giftionary node server */

const express = require('express');
const env = require('dotenv').config();
const logger = require('morgan');
const axios = require('axios');
const PORT = process.env.PORT || 8080;

/* API */
const gifs  = require('./routes/gifs');
const words = require('./routes/words');

const app = express();

/* HTTP request logger */
app.use(logger('dev'));

/* Views */
app.use(express.static('public'));
app.use(express.static(__dirname + '/views'));

/* Router */

app.use('/api/gifs', gifs);
app.use('/api/words', words);

/* Root */
app.get('/', (req, res) => {
  // res.json({msg: 'Welcome to the giftionary api'});
  res.send('index.html');
});

app.get('/happy', (req, res) => {
  res.json({msg: ':)'});
});

/* Start server */
app.listen(PORT, function() {
  console.log('Serving up some slick routes on ' + PORT);
});
