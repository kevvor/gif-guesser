/* API routes */

const express = require('express');
const router = express.Router();
const axios = require('axios');
const BASE_API_URL = 'https://giftionary-api.herokuapp.com/api';

const helpers = require('../helpers/words')

router.get('/new/:limit', (req, res) => {
    const newGameData = {}

    axios.get(`${BASE_API_URL}/words`)
        .then(res => res.data)
        .then(data => {
            newGameData.words = data;
            newGameData.answer = helpers.getAnswer(data);
            return newGameData.answer;
        })
        .catch(err => res.send('err getting words', err))
        .then(answer => axios.get(`${BASE_API_URL}/gifs/${answer}/${req.params.limit}`))
        .catch(err => res.send('err getting gifs', err))
        .then(res => res.data)
        .then(data => {
            newGameData.gifs = data
            res.json(newGameData);
        })
        .catch(err => res.send('err sending data', err))
});

module.exports = router;
