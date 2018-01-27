/* Gif guesser node server */

const express = require('express');
const app = express();
const env = require('dotenv').config();
const bodyParser = require('body-parser');
const axios = require('axios');
const PORT = process.env.PORT || 8080;

/* So node won't yell at us */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(express.static(__dirname + '/views'));

/* Routes */

/* API */

const gifsRoutes = require('./routes/gifs');

app.use('/api/gifs', gifsRoutes);

/* Root  */

app.get('/', (req, res) => {
  res.send('index.html');
});

app.get('/happy', (req, res) => {
  res.send(':)');
})


/* Start server */
app.listen(PORT, function() {
  console.log('Serving up some slick routes on ' + PORT);
});
