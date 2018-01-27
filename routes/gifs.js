/* API routes */

const express       = require('express');
const router        = express.Router();
const axios         = require('axios');
const GIPHY_API_KEY = process.env.GIPHY_API_KEY;

// Fetch a random gif
const url = 'https://api.giphy.com/v1/gifs/random';

/* INDEX */

router.get('/', (req, res) => {

  axios.get(url, {
    params: {
      api_key: GIPHY_API_KEY,
      tag: 'cats'
    }
  })
    .then(function(res) {
      return res.data;
    })
    .then(function(data) {
      res.json(data);
    })
    .catch(function(err) {
      res.send(err)
    });

})

module.exports = router;
