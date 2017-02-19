var fs = require('fs')
var path = require('path')

export default function (fileName) {
  var file = path.join(__dirname, '..', 'fragments', fileName + '.testFragment.js')
  return fs.readFileSync(file).toString()
}
