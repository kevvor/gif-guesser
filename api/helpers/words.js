/* Routes - words.js */

const randomElement = require('./random');

exports.selectRandom = function(data) {
  randomElement(data).answer = true;
  return data;
}

module.exports = exports;