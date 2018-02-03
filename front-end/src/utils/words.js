/* Word utils */

export function getAnswer(wordsArray) {
    for (let word of wordsArray) {
      if (word.answer === true) {
        console.log(word.word)
        return word.word;
      }
    }
  }
