/* API calls */

import { handlePromiseError } from './utils/handlePromiseError';
import { BASE_URL, GIF_LIMIT } from './giftionaryConstants';

export const fetchNewGameState = () => {
  return (
    fetch(`${BASE_URL}/api/games/new/${GIF_LIMIT}`)
      .then(res => res.json())
      .catch(handlePromiseError)
  )
}
