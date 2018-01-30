/* API routes */

const express       = require('express');
const router        = express.Router();
const axios         = require('axios');

// API info
const WORDNIK_API_KEY = process.env.WORDNIK_API_KEY;
const url = 'http://api.wordnik.com:80/v4/words.json/randomWords';

/* INDEX */

router.get('/', (req, res) => {

  axios.get(url, {
    params: {
      api_key: WORDNIK_API_KEY,
      limit: 4,
      minLength: 3,
      maxLength: 6
    }
  })
    .then(function(res) {
      return res.data;
    })
    .then(function(data) {
      res.json(data);
    })
    .catch(function(err) {
      res.send(err);
    })
})

module.exports = router;
