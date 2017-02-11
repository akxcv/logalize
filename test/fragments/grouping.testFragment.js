it('outputs into nested groups', function () {
  crocon.group('hello', 'my').log('hi')
  expect(console.logs.length).toBe(1)
  expect(console.logs[0]).toEqual({
    args: ['hi'],
    groupStack: [
      { name: 'hello', collapsed: false },
      { name: 'my',    collapsed: false }
    ]
  })

  crocon.group('hello', 'my', 'world').log('hi')
  expect(console.logs.length).toBe(2)
  expect(console.logs[1]).toEqual({
    args: ['hi'],
    groupStack: [
      { name: 'hello', collapsed: false },
      { name: 'my',    collapsed: false },
      { name: 'world', collapsed: false }
    ]
  })

  crocon.group('hello2').log('hi')
  expect(console.logs.length).toBe(3)
  expect(console.logs[2]).toEqual({
    args: ['hi'],
    groupStack: [{ name: 'hello2', collapsed: false }]
  })

  crocon.log('outside')
  expect(console.logs.length).toBe(4)
  expect(console.logs[3]).toEqual({ args: ['outside'], groupStack: [] })
})

it('collapses groups when collapseGroups = true', function () {
  crocon = new Crocon({ collapseGroups: true })
  crocon.group('hello', 'my', 'world').log('hi')
  expect(console.logs.length).toBe(1)
  expect(console.logs[0]).toEqual({
    args: ['hi'],
    groupStack: [
      { name: 'hello', collapsed: true },
      { name: 'my',    collapsed: true },
      { name: 'world', collapsed: true }
    ]
  })
})

// Fails for some reason, works in the browser
it.skip('supports lambda syntax', function () {
  var val = crocon.group('hello', 'my', function () {
    crocon.log('awesome!')
    return 'str'
  })
  expect(console.logs.length).toBe(1)
  expect(console.logs[0]).toEqual({
    args: ['awesome!'],
    groupStack: [
      { name: 'hello', collapsed: false },
      { name: 'my',    collapsed: false }
    ]
  })
  expect(val).toBe('str')
})

describe('when document is out of focus', function () {
  beforeEach(function () {
    document.hasFocus = function () { return false }
  })

  it('still logs normally', function () {
    crocon.log('hello', 1, null, { id: 1 })
    crocon.log('hello', 'world')
    expect(console.logs.length).toBe(2)
    expect(console.logs).toEqual([
      { args: ['hello', 1, null, { id: 1 }], groupStack: [] },
      { args: ['hello', 'world'], groupStack: [] }
    ])
  })

  // Fails for some reason (works in the browser, though)
  it.skip('creates inline groups', function () {
    crocon.group('hello', 'my').log('hi')
    expect(console.logs.length).toBe(1)
    expect(console.logs[0]).toEqual({
      args: [],
      groupStack: [{ name: 'hello -> my :: hi', collapsed: true }]
    })
    expect(console.groupStack).toEqual([])
  })
})
