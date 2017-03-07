import BrowserAdapter from './browserAdapter'
import Formatter from './formatter'
import NamespaceManager from './namespaceManager'

function Logalize (...args) {
  Logalize.print('log', ...args)
}

Object.assign(Logalize, {
  init () {
    this.configure()
  },
  configure ({
    enabled = true,
    enableFormatting = true,
    enableConsoleHooks = true,
    collapseNamespaces = false
  } = {}) {
    Object.assign(this, {
      enabled,
      enableFormatting,
      enableConsoleHooks,
      collapseNamespaces,
      formattableMethods: ['log', 'info', 'debug', 'warn', 'error', 'focus']
    })

    if (this.enableConsoleHooks) {
      this.setupConsoleHooks()
    } else {
      this.removeConsoleHooks()
    }

    NamespaceManager.configure({
      loggingEnabled: this.isEnabled(),
      collapsed: this.collapseNamespaces
    })
  },

  namespace (...args) {
    const returnValue = NamespaceManager.setNamespace(...args)
    return typeof args[args.length - 1] === 'function' ? returnValue : this
  },

  log () {
    this.print('log', ...arguments)
  },
  debug () {
    this.print('debug', ...arguments)
  },
  info () {
    this.print('info', ...arguments)
  },
  warn () {
    this.print('warn', ...arguments)
  },
  error () {
    this.print('error', ...arguments)
  },

  assert () {
    this.print('assert', ...arguments)
  },
  count (label) {
    this.print('count', label)
  },
  dir (obj) {
    this.print('dir', obj)
  },
  dirxml (obj) {
    this.print('dirxml', obj)
  },
  profile (...args) {
    const func = args.pop()
    if (typeof func === 'function') {
      if (this.isEnabled()) BrowserAdapter.profile(args[0])
      const returnValue = func()
      if (this.isEnabled()) this.profileEnd()
      return returnValue
    } else {
      if (this.isEnabled()) BrowserAdapter.profile(args[0])
    }
  },
  profileEnd () {
    if (this.isEnabled()) BrowserAdapter.profileEnd()
  },
  time (...args) {
    const func = args.pop()
    if (typeof func === 'function') {
      if (this.isEnabled()) BrowserAdapter.time(args[0])
      const returnValue = func()
      if (this.isEnabled()) this.timeEnd(args[0])
      return returnValue
    } else {
      if (this.isEnabled()) BrowserAdapter.time(args[0])
    }
  },
  timeEnd (label) {
    if (this.isEnabled()) BrowserAdapter.timeEnd(label)
  },
  timeStamp (label) {
    if (this.isEnabled()) BrowserAdapter.timeStamp(label)
  },
  trace (obj) {
    this.print('trace', obj)
  },

  group (...args) {
    const func = args.pop()
    if (typeof func === 'function') {
      if (this.isEnabled()) BrowserAdapter.group(...args)
      const returnValue = func()
      if (this.isEnabled()) this.groupEnd()
      return returnValue
    } else {
      if (this.isEnabled()) BrowserAdapter.group(...args, func)
    }
  },
  groupCollapsed (...args) {
    const func = args.pop()
    if (typeof func === 'function') {
      if (this.isEnabled()) BrowserAdapter.groupCollapsed(...args)
      const returnValue = func()
      if (this.isEnabled()) this.groupEnd()
      return returnValue
    } else {
      if (this.isEnabled()) BrowserAdapter.groupCollapsed(...args, func)
    }
  },
  groupEnd () {
    if (this.isEnabled()) BrowserAdapter.groupEnd()
  },

  print (method, ...args) {
    if (!this.isEnabled()) return

    if (this.formattableMethods.indexOf(method) > -1 && this.enableFormatting) {
      args = Formatter.format(args)
    }

    NamespaceManager.group()
    BrowserAdapter[method](...args)
  },

  // Enable / disable

  enable () {
    if (localStorage) localStorage.setItem('logalizeEnabled', 'true')
    NamespaceManager.configure({ loggingEnabled: this.isEnabled() })
  },
  disable () {
    if (localStorage) localStorage.setItem('logalizeEnabled', 'false')
    NamespaceManager.configure({ loggingEnabled: this.isEnabled() })
  },

  // Private

  isEnabled () {
    if (localStorage && localStorage.logalizeEnabled) {
      return localStorage.logalizeEnabled !== 'false'
    } else {
      return this.enabled
    }
  },

  setupConsoleHooks () {
    const self = this
    console.log            = function () { self.performConsoleAction('log', arguments) }
    console.debug          = function () { self.performConsoleAction('debug', arguments) }
    console.info           = function () { self.performConsoleAction('info', arguments) }
    console.warn           = function () { self.performConsoleAction('warn', arguments) }
    console.error          = function () { self.performConsoleAction('error', arguments) }
    console.assert         = function () { self.performConsoleAction('assert', arguments) }
    console.count          = function () { self.performConsoleAction('count', arguments) }
    console.dir            = function () { self.performConsoleAction('dir', arguments) }
    console.dirxml         = function () { self.performConsoleAction('dirxml', arguments) }
    console.group          = function () { self.performConsoleAction('group', arguments) }
    console.groupCollapsed = function () { self.performConsoleAction('groupCollapsed', arguments) }
    console.groupEnd       = function () { self.performConsoleAction('groupEnd', arguments) }
    console.profile        = function () { self.performConsoleAction('profile', arguments) }
    console.profileEnd     = function () { self.performConsoleAction('profileEnd', arguments) }
    console.time           = function () { self.performConsoleAction('time', arguments) }
    console.timeEnd        = function () { self.performConsoleAction('timeEnd', arguments) }
    console.timeStamp      = function () { self.performConsoleAction('timeStamp', arguments) }
    console.trace          = function () { self.performConsoleAction('trace', arguments) }
    console.clear          = function () { self.performConsoleAction('clear', arguments) }
  },

  removeConsoleHooks () {
    console.log            = BrowserAdapter.log
    console.debug          = BrowserAdapter.debug
    console.info           = BrowserAdapter.info
    console.warn           = BrowserAdapter.warn
    console.error          = BrowserAdapter.error
    console.assert         = BrowserAdapter.assert
    console.count          = BrowserAdapter.count
    console.dir            = BrowserAdapter.dir
    console.dirxml         = BrowserAdapter.dirxml
    console.group          = BrowserAdapter.group
    console.groupCollapsed = BrowserAdapter.groupCollapsed
    console.groupEnd       = BrowserAdapter.groupEnd
    console.profile        = BrowserAdapter.profile
    console.profileEnd     = BrowserAdapter.profileEnd
    console.time           = BrowserAdapter.time
    console.timeEnd        = BrowserAdapter.timeEnd
    console.timeStamp      = BrowserAdapter.timeStamp
    console.trace          = BrowserAdapter.trace
    console.clear          = BrowserAdapter.clear
  },

  performConsoleAction (action, args) {
    NamespaceManager.clear()
    return BrowserAdapter[action](...args)
  }
})

export default Logalize
