const BrowserAdapter = {
  // Basic logging
  log () { console.log(...arguments) },
  debug () { console.debug(...arguments) },
  info () { console.info(...arguments) },
  warn () { console.warn(...arguments) },
  error () { console.error(...arguments) },
  // Grouping
  group () { console.group(...arguments) },
  groupCollapsed () { console.groupCollapsed(...arguments) },
  groupEnd () { console.groupEnd(...arguments) },
  // Misc
  assert () { console.assert(...arguments) },
  count () { console.count(...arguments) },
  clear () { console.clear(...arguments) },
  dir () { console.dir(...arguments) },
  dirxml () { console.dirxml(...arguments) },
  profile () { console.profile(...arguments) },
  profileEnd () { console.profileEnd(...arguments) },
  time () { console.time(...arguments) },
  timeEnd () { console.timeEnd(...arguments) },
  timeStamp () { console.timeStamp(...arguments) },
  trace () { console.trace(...arguments) }
}

export default BrowserAdapter
