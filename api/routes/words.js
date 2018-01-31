/* API routes */

const express       = require('express');
const router        = express.Router();
const axios         = require('axios');

/* API info */

const WORDNIK_API_KEY = process.env.WORDNIK_API_KEY;
const url = 'http://api.wordnik.com:80/v4/words.json/randomWords';

/* Request params */
const minCorpus = 400000; // How frequently a word must appear in a sample text of billions of words
const maxCorpus = -1;     // Note, I'm not sure how large the API's sample is, this was through trial and error

/* Helper */

const helper = require('../helpers/words');

/* INDEX */

router.get('/', (req, res) => {

  axios.get(url, {
    params: {
      api_key: WORDNIK_API_KEY,
      limit: 4,
      minLength: 3,
      maxLength: -1,
      minCorpusCount: minCorpus,
      maxCorpusCount: maxCorpus
    }
  })
    .then(function(res) {
      return res.data;
    })
    .then(function(data) {
      helper.selectRandom(data);
      res.json(data);
    })
    .catch(function(err) {
      res.send(err);
    })
})

module.exports = router;
