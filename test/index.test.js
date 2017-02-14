/* eslint-disable no-global-assign, no-native-reassign, no-unused-vars, no-eval */
var loadTestFragment = require('./support/loadTestFragment')
var Logalize
var logalize
global.localStorage = {}

beforeAll(function () {
  document.hasFocus = function () { return true }
  console = require('./support/console')

  Logalize = require('../src/')
})

beforeEach(function () {
  console._clearArrays()
  global.localStorage = {
    setItem: function (key, value) { this[key] = value },
    getItem: function (key) { return this[key] }
  }
  logalize = new Logalize({ enableFormatting: false })
})

eval(loadTestFragment('basicLogging'))
eval(loadTestFragment('loggingMethods'))
eval(loadTestFragment('grouping'))
eval(loadTestFragment('settings'))
