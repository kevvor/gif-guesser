/* API calls */

import { handlePromiseError } from './utils/handlePromiseError';
import { BASE_URL, GIF_LIMIT } from './giftionaryConstants';

export function getWords() {
    return (
      fetch(`${BASE_URL}/api/words`)
        .then(res => res.json())
        .then(words => words)
        .catch(handlePromiseError)
    )
  }

export function getGifs(searchTerm) {
    return (
      fetch(`${BASE_URL}/api/gifs/${searchTerm}/${GIF_LIMIT}`)
      .then(res => res.json())
      .then(gifs => {
        const gifsArray = [];

        gifs.forEach((element) => {
          const { id, gif, still } = element;
          gifsArray.push({ id, gif, still });
        });

        return gifsArray;
      })
      .catch(handlePromiseError)
    )
  }
