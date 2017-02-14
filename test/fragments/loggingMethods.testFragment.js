test('debug', function () {
  logalize.debug('hello', 1, null, { id: 1 })
  logalize.debug('hello', 'world')
  expect(console.debugs.length).toBe(2)
  expect(console.debugs).toEqual([
    { args: ['hello', 1, null, { id: 1 }], groupStack: [] },
    { args: ['hello', 'world'], groupStack: [] }
  ])
})

test('info', function () {
  logalize.info('hello', 1, null, { id: 1 })
  logalize.info('hello', 'world')
  expect(console.infos.length).toBe(2)
  expect(console.infos).toEqual([
    { args: ['hello', 1, null, { id: 1 }], groupStack: [] },
    { args: ['hello', 'world'], groupStack: [] }
  ])
})

test('warn', function () {
  logalize.warn('hello', 1, null, { id: 1 })
  logalize.warn('hello', 'world')
  expect(console.warns.length).toBe(2)
  expect(console.warns).toEqual([
    { args: ['hello', 1, null, { id: 1 }], groupStack: [] },
    { args: ['hello', 'world'], groupStack: [] }
  ])
})

test('error', function () {
  logalize.error('hello', 1, null, { id: 1 })
  logalize.error('hello', 'world')
  expect(console.errors.length).toBe(2)
  expect(console.errors).toEqual([
    { args: ['hello', 1, null, { id: 1 }], groupStack: [] },
    { args: ['hello', 'world'], groupStack: [] }
  ])
})

test('assert', function () {
  logalize.assert(5 > 6, 'oops')
  logalize.assert(6 > 5, 'yay')
  expect(console.asserts.length).toBe(2)
  expect(console.asserts).toEqual([
    { args: [false, 'oops'], groupStack: [] },
    { args: [true, 'yay'], groupStack: [] }
  ])
})

test('count', function () {
  logalize.count('myCount')
  logalize.count('myOtherCount')
  expect(console.counts.length).toBe(2)
  expect(console.counts).toEqual([
    { label: 'myCount', groupStack: [] },
    { label: 'myOtherCount', groupStack: [] }
  ])
})

test('dir', function () {
  logalize.dir({ id: 1 })
  logalize.dir(null)
  expect(console.dirs.length).toBe(2)
  expect(console.dirs).toEqual([
    { object: { id: 1 }, groupStack: [] },
    { object: null, groupStack: [] }
  ])
})

test('dirxml', function () {
  logalize.dirxml({ id: 1 })
  logalize.dirxml(null)
  expect(console.dirxmls.length).toBe(2)
  expect(console.dirxmls).toEqual([
    { object: { id: 1 }, groupStack: [] },
    { object: null, groupStack: [] }
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

  var disabledLogalize = new Logalize({ enabled: false })
  var ret3 = disabledLogalize.profile('hello', 'world', function () { return 'str' })
  expect(console.profiles.length).toBe(2)
  expect(console.profileEnds).toBe(1)
  expect(ret3).toBe('str')

  logalize.profileEnd()
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

  var disabledLogalize = new Logalize({ enabled: false })
  var ret3 = disabledLogalize.time('hello3', 'world', function () { return 'str' })
  expect(console.times.length).toBe(2)
  expect(console.timeEnds.length).toBe(1)
  expect(ret3).toBe('str')

  logalize.timeEnd('hello1')
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
    { object: 'arg1', groupStack: [] }
  ])
})
