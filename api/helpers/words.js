/* Routes - words.js */

const randomElement = require('./random');

exports.selectRandom = data => {
  randomElement(data).answer = true;
  return data;
}

exports.getAnswer = wordsArray => {
  for (let word of wordsArray) {
    if (word.answer === true) {
      return word.word;
    }
  }
}

module.exports = exports;
