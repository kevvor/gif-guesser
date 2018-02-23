/* giftionary node server */

const express = require('express');
const env = require('dotenv').config();
const logger = require('morgan');
const axios = require('axios');
const PORT = process.env.PORT;

/* API */
const gifs = require('./routes/gifs');
const words = require('./routes/words');
const game = require('./routes/game');

const app = express();

/* HTTP request logger */
app.use(logger('dev'));

/* Views */
app.use(express.static('public'));
app.use(express.static(__dirname + '/views'));

/* Router */
app.use('/api/gifs', gifs);
app.use('/api/words', words);
app.use('/api/game', game);

/* Root */
app.get('/', (req, res) => {
  // res.json({msg: 'Welcome to the giftionary api'});
  res.send('index.html');
});

app.get('/happy', (req, res) => {
  res.json({ msg: ':)' });
});

app.get('*', (req, res) => {
  res.send("Something went wrong :'(")
});

/* Start server */
app.listen(PORT, () => {
  console.log('Serving up some slick routes on port ' + PORT);
});
