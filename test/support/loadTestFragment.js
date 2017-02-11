var fs = require('fs')
var path = require('path')

module.exports = function (fileName) {
  file = path.join(__dirname, '..', 'fragments', fileName + '.testFragment.js')
  return fs.readFileSync(file).toString()
}
