/* Random element in array */

module.exports = function(array) {
  return array[Math.floor(Math.random() * array.length)]
}
