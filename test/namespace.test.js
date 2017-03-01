/* eslint-disable no-global-assign, no-native-reassign, no-unused-vars, no-eval */
var logalize
global.localStorage = {}

beforeAll(function () {
  document.hasFocus = () => true
  console = require('./support/namespaceConsole')
  logalize = require('./support/logalize')
  logalize.init()
})

beforeEach(function () {
  logalize._clear()
  console._clear()
  logalize.configure({ enabled: true, enableFormatting: false })
})

it('creates one by default', function () {
  expect(logalize.currentNamespace.stack).toEqual([])
})

it('logs into a namespace', function() {
  logalize.namespace('kukareku').log('preved')
  expect(console.logs.length).toBe(1)
  expect(console.logs[0]).toEqual({
    args: ['preved'],
    groupStack: [['kukareku']]
  })
})

it('is opening/closing a minimal amount of groups', function () {
  logalize.namespace(1).log('hi')
  expect(console.logs[0]).toEqual({
    args: ['hi'],
    groupStack: [[1]]
  })
  expect(console.groupStarts).toBe(1)
  expect(console.groupEnds).toBe(0)

  logalize.namespace(1, 2).log('hello from 1, 2')
  expect(console.logs[1]).toEqual({
    args: ['hello from 1, 2'],
    groupStack: [[1], [2]]
  })
  expect(console.groupStarts).toBe(2)
  expect(console.groupEnds).toBe(0)

  logalize.namespace(3).log('hello from 3')
  expect(console.logs[2]).toEqual({
    args: ['hello from 3'],
    groupStack: [[3]]
  })
  expect(console.groupStarts).toBe(3)
  expect(console.groupEnds).toBe(2)
})

it('supports clojure syntax', function () {
  const val = logalize.namespace(1, function () {
    logalize.log('log #1')
    logalize.namespace(2).log('log #1.5')
    logalize.log('log #2')
    console.log('im out')
    logalize.namespace(20, 42, function () {
      logalize.log('log #2.5')
    })
    logalize.log('log #3')
    return 'hello'
  })
  expect(console.logs).toEqual([
    {
      args: ['log #1'],
      groupStack: [[1]]
    },
    {
      args: ['log #1.5'],
      groupStack: [[1], [2]]
    },
    {
      args: ['log #2'],
      groupStack: [[1]]
    },
    {
      args: ['im out'],
      groupStack: []
    },
    {
      args: ['log #2.5'],
      groupStack: [[1], [20], [42]]
    },
    {
      args: ['log #3'],
      groupStack: [[1]]
    }
  ])
  expect(val).toBe('hello')
})

it('gives way to console', function () {
  logalize.namespace('ns')
  console.log('hey')
  expect(console.logs[0]).toEqual({
    args: ['hey'],
    groupStack: []
  })
  logalize.log('hi')
  expect(console.logs[1]).toEqual({
    args: ['hi'],
    groupStack: [['ns']]
  })
})
