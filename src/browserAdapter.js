const BrowserAdapter = {
  // Basic logging
  log: console.log,
  debug: console.debug,
  info: console.info,
  warn: console.warn,
  error: console.error,
  // Grouping
  group: console.group,
  groupCollapsed: console.groupCollapsed,
  groupEnd: console.groupEnd,
  // Misc
  assert: console.assert,
  count: console.count,
  dir: console.dir,
  dirxml: console.dirxml,
  profile: console.profile,
  profileEnd: console.profileEnd,
  time: console.time,
  timeEnd: console.timeEnd,
  timeStamp: console.timeStamp,
  trace: console.trace
}

export default BrowserAdapter
