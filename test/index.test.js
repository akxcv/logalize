/* eslint-disable no-global-assign, no-native-reassign, no-unused-vars, no-eval */
import loadTestFragment from './support/loadTestFragment'
var logalize
global.localStorage = {}
document.hasFocus = function () { return true }
import console from './support/console'
import Logalize from '../src/'

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
