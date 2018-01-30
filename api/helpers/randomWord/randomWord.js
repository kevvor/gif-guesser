/* Returns an array of 4600 of the most commonly used nouns in English */

const fs = require("fs");
const text = fs.readFileSync("./words.txt", "utf-8");
const textByLine = text.split("\n");

module.exports = function makeRandomWords(numberOfWords) {
  console.log('----- Making up words! -----')
  const randomWords = {};

  // Returns the amount of words passed in the argument
  for (let i = 0; i < numberOfWords; i++) {
    const word = textByLine[Math.floor(Math.random() * textByLine.length)]

    // If new word isn't in word map it can be freely assigned
    if (!randomWords[word]) {
      randomWords[word] = '';
    } else {
      // The word exists, and one more iteration of the loop should be added
      // Decrement counter one to account for non assigned word
      i--;
    }
  }

  return randomWords;
}
