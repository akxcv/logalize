import { compareArrays } from '../src/utils'

describe('compareArrays', function () {
  it('compares arrays correctly', function () {
    expect(compareArrays([1], [2])).toBe(false)
    expect(compareArrays([1, 2], [1])).toBe(false)
    expect(compareArrays([undefined, null], [undefined, null])).toBe(true)
    expect(compareArrays(
      [['1', 2 ], [1, 2, '3']],
      [['1', 2], [1, 2, '3']]
    )).toBe(true)
  })
})
