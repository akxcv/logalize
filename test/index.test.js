/* eslint-disable no-global-assign, no-native-reassign, no-unused-vars, no-eval */
var loadTestFragment = require('./support/loadTestFragment')
var Crocon
var crocon

beforeAll(function () {
  document.hasFocus = function () { return true }
  console = require('./support/console')

  Crocon = require('../src/')
})

beforeEach(function () {
  console._clearArrays()
  localStorage = {
    setItem: function (key, value) { this[key] = value },
    getItem: function (key) { return this[key] }
  }
  crocon = new Crocon({ enableFormatting: false })
})

eval(loadTestFragment('basicLogging'))
eval(loadTestFragment('loggingMethods'))
eval(loadTestFragment('grouping'))
eval(loadTestFragment('settings'))
