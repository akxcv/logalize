// Console has to be overridden before Logalize is required
module.exports = {
  logs: [],
  groupStack: [],
  groupStarts: 0,
  groupEnds: 0,
  log (...args) {
    console.logs.push({ args, groupStack: Object.assign([], console.groupStack) })
  },
  group (...args) {
    console.groupStarts += 1
    console.groupStack.push(args)
  },
  groupEnd () {
    console.groupEnds += 1
    console.groupStack.pop()
  },
  _clear () {
    console.logs = []
    console.groupStack = []
    console.groupStarts = 0
    console.groupEnds = 0
  }
}
