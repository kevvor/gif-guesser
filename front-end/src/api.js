/* API calls */

import { handlePromiseError } from './utils/handlePromiseError';
import { BASE_URL } from './giftionaryConstants'

export function getWords() {
    return (
      fetch(`${BASE_URL}/api/words`)
        .then(res => res.json())
        .then(words => {
          const arr = [];
          words.forEach(element => {
            const { id, word, answer = false } = element;
            arr.push({ id, word, answer });
          });
          return words;
        })
        .catch(handlePromiseError)
    )
  }

export function getGifs(searchTerm) {
    return (
      fetch(`https://giftionary-api.herokuapp.com/api/gifs/${searchTerm}`)
        .then(res => res.json())
        .then(gifs => {
          const gifsArray = [];
          gifs.forEach((element) => {
            const { url, height, width, id } = element;
            gifsArray.push({ url, height, width, id });
          });
          return gifsArray;
        })
        .catch(handlePromiseError)
      )
  }
