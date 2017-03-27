const fs = require('fs')
const exec = require('child_process').exec

const nodeSass = exec('yarn run node-sass index.scss src/stylesheet.js')
nodeSass.on('close', function () {
  fs.readFile('src/stylesheet.js', 'utf8', (err, data) => {
    if (err) throw err
    const jsContent = `export default \`${data}\``
    fs.writeFile('src/stylesheet.js', jsContent, (writeErr) => {
      if (writeErr) throw writeErr
      console.log('complete')
    })
  })
})
