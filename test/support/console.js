// Console has to be overridden before Logalize is required
module.exports = {
  logs: [],
  debugs: [],
  infos: [],
  warns: [],
  errors: [],
  asserts: [],
  counts: [],
  dirs: [],
  dirxmls: [],
  profiles: [],
  profileEnds: 0,
  times: [],
  timeEnds: [],
  timeStamps: [],
  traces: [],
  groupStack: [],
  log: function (...args) {
    console.logs.push({ args: args, groupStack: console.groupStack })
  },
  debug: function (...args) {
    console.debugs.push({ args: args, groupStack: console.groupStack })
  },
  info: function (...args) {
    console.infos.push({ args: args, groupStack: console.groupStack })
  },
  warn: function (...args) {
    console.warns.push({ args: args, groupStack: console.groupStack })
  },
  error: function (...args) {
    console.errors.push({ args: args, groupStack: console.groupStack })
  },
  assert: function (...args) {
    console.asserts.push({ args: args, groupStack: console.groupStack })
  },
  count: function (label) {
    console.counts.push({ label: label, groupStack: console.groupStack })
  },
  dir: function (object) {
    console.dirs.push({ object: object, groupStack: console.groupStack })
  },
  dirxml: function (object) {
    console.dirxmls.push({ object: object, groupStack: console.groupStack })
  },
  profile: function (...args) {
    console.profiles.push(args)
  },
  profileEnd: function () {
    console.profileEnds += 1
  },
  time: function (...args) {
    console.times.push(args)
  },
  timeEnd: function (...args) {
    console.timeEnds.push(args)
  },
  timeStamp: function (label) {
    console.timeStamps.push(label)
  },
  trace: function (object) {
    console.traces.push({ object: object, groupStack: console.groupStack })
  },
  group: function (name) {
    console.groupStack.push({ name: name, collapsed: false })
  },
  groupCollapsed: function (name) {
    console.groupStack.push({ name: name, collapsed: true })
  },
  groupEnd: function () {
    console.groupStack.pop()
  },
  _clearArrays: function () {
    console.logs = []
    console.debugs = []
    console.infos = []
    console.warns = []
    console.errors = []
    console.asserts = []
    console.counts = []
    console.dirs = []
    console.dirxmls = []
    console.profiles = []
    console.profileEnds = 0
    console.times = []
    console.timeEnds = []
    console.timeStamps = []
    console.traces = []
    console.groupStack = []
  }
}
