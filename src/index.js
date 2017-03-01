import BrowserAdapter from './browserAdapter'
import Formatter from './formatter'

export default Logalize

function Logalize ({
  enabled = true,
  enableFormatting = true,
  setupConsoleHooks = true
} = {}) {
  Object.assign(this, {
    enabled,
    enableFormatting,
    setupConsoleHooks,
    formattableMethods: ['log', 'info', 'debug', 'warn', 'error', 'focus']
  })

  function performConsoleAction (action, args) {
    return BrowserAdapter[action](...args)
  }

  if (this.setupConsoleHooks) {
    console.log = () => performConsoleAction('log', arguments)
    console.debug = () => performConsoleAction('debug', arguments)
    console.info = () => performConsoleAction('info', arguments)
    console.warn = () => performConsoleAction('warn', arguments)
    console.error = () => performConsoleAction('error', arguments)
    console.assert = () => performConsoleAction('assert', arguments)
    // console.clear = () => GroupManager.clear()
    console.count = () => performConsoleAction('count', arguments)
    console.dir = () => performConsoleAction('dir', arguments)
    console.dirxml = () => performConsoleAction('dirxml', arguments)
    console.group = () => performConsoleAction('group', arguments)
    console.groupCollapsed = () => performConsoleAction('groupCollapsed', arguments)
    console.groupEnd = () => performConsoleAction('groupEnd', arguments)
    console.profile = () => performConsoleAction('profile', arguments)
    console.profileEnd = () => performConsoleAction('profileEnd', arguments)
    console.time = () => performConsoleAction('time', arguments)
    console.timeEnd = () => performConsoleAction('timeEnd', arguments)
    console.timeStamp = () => performConsoleAction('timeStamp', arguments)
    console.trace = () => performConsoleAction('trace', arguments)
  }
}

Logalize.prototype = {
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
      if (this._isEnabled()) BrowserAdapter.profile(args[0])
      const returnValue = func()
      this.profileEnd()
      return returnValue
    } else {
      if (this._isEnabled()) BrowserAdapter.profile(args[0])
    }
  },
  profileEnd () {
    if (this._isEnabled()) BrowserAdapter.profileEnd()
  },
  time (...args) {
    const func = args.pop()
    if (typeof func === 'function') {
      if (this._isEnabled()) BrowserAdapter.time(args[0])
      const returnValue = func()
      this.timeEnd(args[0])
      return returnValue
    } else {
      if (this._isEnabled()) BrowserAdapter.time(args[0])
    }
  },
  timeEnd (label) {
    if (this._isEnabled()) BrowserAdapter.timeEnd(label)
  },
  timeStamp (label) {
    if (this._isEnabled()) BrowserAdapter.timeStamp(label)
  },
  trace (obj) {
    this.print('trace', obj)
  },

  group (...args) {
    const func = args.pop()
    if (typeof func === 'function') {
      if (this._isEnabled()) BrowserAdapter.group(...args)
      const returnValue = func()
      this.groupEnd()
      return returnValue
    } else {
      if (this._isEnabled()) BrowserAdapter.group(...args, func)
    }
  },
  groupCollapsed (...args) {
    const func = args.pop()
    if (typeof func === 'function') {
      if (this._isEnabled()) BrowserAdapter.groupCollapsed(...args)
      const returnValue = func()
      this.groupEnd()
      return returnValue
    } else {
      if (this._isEnabled()) BrowserAdapter.groupCollapsed(...args, func)
    }
  },
  groupEnd () {
    if (this._isEnabled()) BrowserAdapter.groupEnd()
  },

  print (method, ...args) {
    if (!this._isEnabled()) return

    if (this.formattableMethods.indexOf(method) > -1 && this.enableFormatting) {
      args = Formatter.format(args)
    }

    BrowserAdapter[method](...args)
  },

  // Enable / disable

  enable () {
    if (localStorage) localStorage.setItem('logalizeEnabled', 'true')
  },
  disable () {
    if (localStorage) localStorage.setItem('logalizeEnabled', 'false')
  },

  // Private

  _isEnabled () {
    if (localStorage && localStorage.logalizeEnabled) {
      return localStorage.logalizeEnabled !== 'false'
    } else {
      return this.enabled
    }
  }
}
