/* API routes */

const express       = require('express');
const router        = express.Router();
const axios         = require('axios');

// API info

const GIPHY_API_KEY = process.env.GIPHY_API_KEY;
const url = 'https://api.giphy.com/v1/gifs/random';

/* INDEX */

router.get('/', (req, res) => {

  axios.get(url, {
    params: {
      api_key: GIPHY_API_KEY,
      tag: 'pickle'
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
    });

})

/* SHOW */

router.get('/:tag', (req, res) => {

  axios.get(url, {
    params: {
      api_key: GIPHY_API_KEY,
      tag: req.params.tag
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
