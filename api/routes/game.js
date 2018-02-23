/* API routes */

const express = require('express');
const router = express.Router();
const axios = require('axios');
const BASE_API_URL = 'https://giftionary-api.herokuapp.com/api'

router.get('/new/:limit', (req, res) => {
    axios.get(`${BASE_API_URL}/words`)
        .then(res => res.data)
        .then(data => res.json(data))
        .catch(err => res.send(err))
});

module.exports = router;
