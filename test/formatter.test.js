import Formatter from '../src/formatter'
Formatter.computeStyle = function (classes) { return classes }

it('formats strings', function () {
  expect(Formatter.formatString('**bold text**')).toEqual([
    '%cbold text%c', ['bold', 'default']
  ])
  expect(Formatter.formatString('~strikethrough~ and *italic*')).toEqual([
    '%cstrikethrough%c and %citalic%c',
    ['strikethrough', 'default', 'italic', 'default']
  ])
  expect(Formatter.formatString('_underline_ and [custom].classOne.classTwo')).toEqual([
    '%cunderline%c and %ccustom%c',
    ['underline', 'default', ' classOne classTwo', 'default']
  ])
})

it('formats arguments correctly', function () {
  expect(Formatter.format([[]])).toEqual([[]])
  expect(Formatter.format(['hello', 'world'])).toEqual(['hello', 'world'])
  expect(Formatter.format(['_under_', 'world', '*not formatted*'])).toEqual([
    '%cunder%c', 'underline', 'default', 'world', '*not formatted*'
  ])
  expect(Formatter.format(['~strike~ **bold**', '*italic*', { id: 1 }])).toEqual([
    '%cstrike%c %cbold%c %citalic%c',
    'strikethrough', 'default',
    'bold', 'default',
    'italic', 'default',
    { id: 1 }
  ])
})
