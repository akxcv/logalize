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
  groups: [],
  collapsedGroups: [],
  groupEnds: 0,
  log (...args) {
    console.logs.push(args)
  },
  debug (...args) {
    console.debugs.push(args)
  },
  info (...args) {
    console.infos.push(args)
  },
  warn (...args) {
    console.warns.push(args)
  },
  error (...args) {
    console.errors.push(args)
  },
  assert (...args) {
    console.asserts.push(args)
  },
  count (label) {
    console.counts.push(label)
  },
  dir (object) {
    console.dirs.push(object)
  },
  dirxml (object) {
    console.dirxmls.push(object)
  },
  profile (...args) {
    console.profiles.push(args)
  },
  profileEnd () {
    console.profileEnds += 1
  },
  time (...args) {
    console.times.push(args)
  },
  timeEnd (...args) {
    console.timeEnds.push(args)
  },
  timeStamp (label) {
    console.timeStamps.push(label)
  },
  trace (object) {
    console.traces.push(object)
  },
  group (...args) {
    console.groups.push(args)
  },
  groupCollapsed (...args) {
    console.collapsedGroups.push(args)
  },
  groupEnd () {
    console.groupEnds += 1
  },
  _clear () {
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
    console.groups = []
    console.collapsedGroups = []
    console.groupEnds = 0
  }
}
