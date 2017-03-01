/* eslint-disable no-global-assign, no-native-reassign, no-unused-vars, no-eval */
var logalize
global.localStorage = {}

beforeAll(function () {
  document.hasFocus = () => true
  console = require('./support/console')
  logalize = require('./support/logalize')
  logalize.init()
})

beforeEach(function () {
  console._clearArrays()
  global.localStorage = {
    setItem: function (key, value) { this[key] = value },
    getItem: function (key) { return this[key] }
  }
  logalize.configure({ enabled: true, enableFormatting: false })
})

it('produces simple output', function () {
  logalize.log('hi')
  expect(console.logs.length).toBe(1)
  expect(console.logs[0]).toEqual(['hi'])
  logalize.log([])
  expect(console.logs.length).toBe(2)
  expect(console.logs[1]).toEqual([[]])
  logalize('im static')
  expect(console.logs.length).toBe(3)
  expect(console.logs[2]).toEqual(['im static'])
})

it('produces output with multiple arguments', function () {
  logalize.log('hello', 1, null, { id: 1 })
  logalize.log('hello', 'world')
  expect(console.logs.length).toBe(2)
  expect(console.logs).toEqual([
    ['hello', 1, null, { id: 1 }],
    ['hello', 'world'],
  ])
})

it('does not produce output when disabled', function () {
  logalize.configure({ enabled: false })
  logalize.log('hi')
  logalize('hi')
  expect(console.logs).toEqual([])
})

test('debug', function () {
  logalize.debug('hello', 1, null, { id: 1 })
  logalize.debug('hello', 'world')
  expect(console.debugs.length).toBe(2)
  expect(console.debugs).toEqual([
    ['hello', 1, null, { id: 1 }],
    ['hello', 'world']
  ])
})

test('info', function () {
  logalize.info('hello', 1, null, { id: 1 })
  logalize.info('hello', 'world')
  expect(console.infos.length).toBe(2)
  expect(console.infos).toEqual([
    ['hello', 1, null, { id: 1 }],
    ['hello', 'world']
  ])
})

test('warn', function () {
  logalize.warn('hello', 1, null, { id: 1 })
  logalize.warn('hello', 'world')
  expect(console.warns.length).toBe(2)
  expect(console.warns).toEqual([
    ['hello', 1, null, { id: 1 }],
    ['hello', 'world']
  ])
})

test('error', function () {
  logalize.error('hello', 1, null, { id: 1 })
  logalize.error('hello', 'world')
  expect(console.errors.length).toBe(2)
  expect(console.errors).toEqual([
    ['hello', 1, null, { id: 1 }],
    ['hello', 'world']
  ])
})

test('assert', function () {
  logalize.assert(5 > 6, 'oops')
  logalize.assert(6 > 5, 'yay')
  expect(console.asserts.length).toBe(2)
  expect(console.asserts).toEqual([
    [false, 'oops'],
    [true, 'yay']
  ])
})

test('count', function () {
  logalize.count('myCount')
  logalize.count('myOtherCount')
  expect(console.counts.length).toBe(2)
  expect(console.counts).toEqual([
    'myCount',
    'myOtherCount'
  ])
})

test('dir', function () {
  logalize.dir({ id: 1 })
  logalize.dir(null)
  expect(console.dirs.length).toBe(2)
  expect(console.dirs).toEqual([
    { id: 1 },
    null
  ])
})

test('dirxml', function () {
  logalize.dirxml({ id: 1 })
  logalize.dirxml(null)
  expect(console.dirxmls.length).toBe(2)
  expect(console.dirxmls).toEqual([
    { id: 1 },
    null
  ])
})

test('profile', function () {
  var ret1 = logalize.profile('hello', 'world')
  expect(console.profiles.length).toBe(1)
  expect(console.profileEnds).toBe(0)
  expect(console.profiles[0]).toEqual(['hello'])
  expect(ret1).toBe(undefined)

  var ret2 = logalize.profile('hello', 'world', function () { return 'str' })
  expect(console.profiles.length).toBe(2)
  expect(console.profileEnds).toBe(1)
  expect(console.profiles[1]).toEqual(['hello'])
  expect(ret2).toBe('str')

  logalize.configure({ enabled: false })
  var ret3 = logalize.profile('hello', 'world', function () { return 'str' })
  expect(console.profiles.length).toBe(2)
  expect(console.profileEnds).toBe(1)
  expect(ret3).toBe('str')

  logalize.configure({ enabled: true }).profileEnd()
  expect(console.profileEnds).toBe(2)
})

test('time', function () {
  var ret1 = logalize.time('hello1', 'world')
  expect(console.times.length).toBe(1)
  expect(console.timeEnds.length).toBe(0)
  expect(console.times[0]).toEqual(['hello1'])
  expect(ret1).toBe(undefined)

  var ret2 = logalize.time('hello2', 'world', function () { return 'str' })
  expect(console.times.length).toBe(2)
  expect(console.timeEnds.length).toBe(1)
  expect(console.times[1]).toEqual(['hello2'])
  expect(console.timeEnds[0]).toEqual(['hello2'])
  expect(ret2).toBe('str')

  logalize.configure({ enabled: false })
  var ret3 = logalize.time('hello3', 'world', function () { return 'str' })
  expect(console.times.length).toBe(2)
  expect(console.timeEnds.length).toBe(1)
  expect(ret3).toBe('str')

  logalize.configure({ enabled: true }).timeEnd('hello1')
  expect(console.timeEnds.length).toBe(2)
  expect(console.timeEnds[1]).toEqual(['hello1'])
})

test('timeStamp', function () {
  logalize.timeStamp('arg1', 'arg2')
  expect(console.timeStamps.length).toBe(1)
  expect(console.timeStamps[0]).toEqual('arg1')
})

test('trace', function () {
  logalize.trace('arg1', 'arg2')
  expect(console.traces).toEqual([
    'arg1',
  ])
})

test('group', function () {
  var ret1 = logalize.group('hello', 'world')
  expect(console.groups.length).toBe(1)
  expect(console.groupEnds).toBe(0)
  expect(console.groups[0]).toEqual(['hello', 'world'])
  expect(ret1).toBe(undefined)

  var ret2 = logalize.group('hello', 'world', function () { return 'str' })
  expect(console.groups.length).toBe(2)
  expect(console.groupEnds).toBe(1)
  expect(console.groups[1]).toEqual(['hello', 'world'])
  expect(ret2).toBe('str')

  logalize.configure({ enabled: false })
  var ret3 = logalize.group('hello', 'world', function () { return 'str' })
  expect(console.groups.length).toBe(2)
  expect(console.groupEnds).toBe(1)
  expect(ret3).toBe('str')

  logalize.configure({ enabled: true }).groupEnd()
  expect(console.groupEnds).toBe(2)
})

test('groupCollapsed', function () {
  var ret1 = logalize.groupCollapsed('hello', 'world')
  expect(console.collapsedGroups.length).toBe(1)
  expect(console.groupEnds).toBe(0)
  expect(console.collapsedGroups[0]).toEqual(['hello', 'world'])
  expect(ret1).toBe(undefined)

  var ret2 = logalize.groupCollapsed('hello', 'world', function () { return 'str' })
  expect(console.collapsedGroups.length).toBe(2)
  expect(console.groupEnds).toBe(1)
  expect(console.collapsedGroups[1]).toEqual(['hello', 'world'])
  expect(ret2).toBe('str')

  logalize.configure({ enabled: false })
  var ret3 = logalize.groupCollapsed('hello', 'world', function () { return 'str' })
  expect(console.collapsedGroups.length).toBe(2)
  expect(console.groupEnds).toBe(1)
  expect(ret3).toBe('str')

  logalize.configure({ enabled: true }).groupEnd()
  expect(console.groupEnds).toBe(2)
})

describe('enable/disable', function () {
  it('inherits init settings', function () {
    expect(logalize.configure({ enabled: true  })._isEnabled()).toBe(true)
    expect(logalize.configure({ enabled: false })._isEnabled()).toBe(false)
  })

  it('prefers clientside settings', function () {
    logalize.configure({ enabled: true  }).disable()
    expect(logalize._isEnabled()).toBe(false)

    logalize.configure({ enabled: false }).enable()
    expect(logalize._isEnabled()).toBe(true)
  })
})
