it('produces simple output', function () {
  logalize.log('hi')
  expect(console.logs.length).toBe(1)
  expect(console.logs[0].args).toEqual(['hi'])
  expect(console.logs[0].groupStack).toEqual([])
  logalize.log([])
  expect(console.logs.length).toBe(2)
  expect(console.logs[1].args).toEqual([[]])
  expect(console.logs[1].groupStack).toEqual([])
})

it('produces output with multiple arguments', function () {
  logalize.log('hello', 1, null, { id: 1 })
  logalize.log('hello', 'world')
  expect(console.logs.length).toBe(2)
  expect(console.logs).toEqual([
    { args: ['hello', 1, null, { id: 1 }], groupStack: [] },
    { args: ['hello', 'world'], groupStack: [] }
  ])
})

it('does not produce output when disabled', function () {
  logalize = new Logalize({ enabled: false })
  logalize.log('hi')
  expect(console.logs).toEqual([])
})
