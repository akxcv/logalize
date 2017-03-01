import Namespace from '../src/namespace'

test('initialization', function () {
  var ns = new Namespace()
  expect(ns.stack).toEqual([])
  ns = new Namespace(1, 2, 3)
  expect(ns.stack).toEqual([1, 2, 3])
})
