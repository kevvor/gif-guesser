/* Random element in array */

module.exports = array => {
  return array[Math.floor(Math.random() * array.length)]
}
