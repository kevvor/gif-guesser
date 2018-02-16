/* API routes */

const express = require('express');
const router = express.Router();
const axios = require('axios');

/* API info */

const GIPHY_API_KEY = process.env.GIPHY_API_KEY;
const url = 'https://api.giphy.com/v1/gifs';

/* Helper */
const buildGif = require('../helpers/gifs');

/* Routes */ 

router.get('/', (req, res) => {
// Get a random gif

  axios.get(`${url}/random`, {
    params: {
      api_key: GIPHY_API_KEY,
    }
  })
  .then(res => res.data)
  .then(data => res.json(data))
  .catch(err => res.send(err));
});

/* GET /:tag */

router.get('/:tag', (req, res) => {
  axios.get(`${url}/search`, {
    params: {
      api_key: GIPHY_API_KEY,
      q: req.params.tag,
      limit: 10,
      lang: 'en',
      rating: 'pg-13'
    }
  })
  .then(res => res.data.data)
  .then(gifs => gifs.map(gif => buildGif(gif)))
  .then(data => res.json(data))
  .catch(err => res.send(err));
});

router.get('/:tag/:limit', (req, res) => {
// Get gifs based on tag

axios.get(`${url}/search`, {
    params: {
      api_key: GIPHY_API_KEY,
      q: req.params.tag,
      limit: req.params.limit,
      lang: 'en',
      rating: 'pg-13'
    }
  })
  .then(res => res.data.data)
  .then(gifs => gifs.map(gif => buildGif(gif)))
  .then(data => res.json(data))
  .catch(err => res.send(err))
});

module.exports = router;
