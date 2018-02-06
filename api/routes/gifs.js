/* API routes */

const express       = require('express');
const router        = express.Router();
const axios         = require('axios');

// API info

const GIPHY_API_KEY = process.env.GIPHY_API_KEY;
const url = 'https://api.giphy.com/v1/gifs';

/* INDEX */

router.get('/', (req, res) => {
// Get a random gif

  axios.get(`${url}/random`, {
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

router.get('/:tag/:limit', (req, res) => {
// Get gifs based on tag

  axios.get(`${url}/search`, {
    params: {
      api_key: GIPHY_API_KEY,
      q: req.params.tag,
      limit: req.params.limit,
      lang: 'en'
    }
  })
    .then(function(res) {
      const gifArray = [];

      res.data.data.forEach(element => {

        const gifData = {
          id: element.id,
          gif: {
            url: element.images.downsized.url,
            width: element.images.downsized.width,
            height: element.images.downsized.height
          },
          still: {
            url: element.images.downsized_still.url,
            width: element.images.downsized_still.width,
            height: element.images.downsized_still.height
          }
        }

        gifArray.push(gifData)
      })

      return result;
    })
    .then(function(data) {
      res.json(data);
    })
    .catch(function(err) {
      res.send(err);
    })
})

module.exports = router;
