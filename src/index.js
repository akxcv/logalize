import BrowserAdapter from './browserAdapter'
import Formatter from './formatter'
import Namespace from './namespace'
import { compareArrays } from './utils'

function Logalize (...args) {
  Logalize.print('log', ...args)
}

Object.assign(Logalize, {
  init () {
    this.configure()
    this.previousNamespace = new Namespace()
    this.currentNamespace = new Namespace()
    this.clojureNamespace = new Namespace()
  },
  configure ({
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

    // dirty, i know
    const self = this
    function performConsoleAction (action, args) {
      self.previousNamespace.close()
      self.previousNamespace = new Namespace()
      return BrowserAdapter[action](...args)
    }

    if (this.setupConsoleHooks) {
      console.log            = function () { performConsoleAction('log', arguments) }
      console.debug          = function () { performConsoleAction('debug', arguments) }
      console.info           = function () { performConsoleAction('info', arguments) }
      console.warn           = function () { performConsoleAction('warn', arguments) }
      console.error          = function () { performConsoleAction('error', arguments) }
      console.assert         = function () { performConsoleAction('assert', arguments) }
      console.count          = function () { performConsoleAction('count', arguments) }
      console.dir            = function () { performConsoleAction('dir', arguments) }
      console.dirxml         = function () { performConsoleAction('dirxml', arguments) }
      console.group          = function () { performConsoleAction('group', arguments) }
      console.groupCollapsed = function () { performConsoleAction('groupCollapsed', arguments) }
      console.groupEnd       = function () { performConsoleAction('groupEnd', arguments) }
      console.profile        = function () { performConsoleAction('profile', arguments) }
      console.profileEnd     = function () { performConsoleAction('profileEnd', arguments) }
      console.time           = function () { performConsoleAction('time', arguments) }
      console.timeEnd        = function () { performConsoleAction('timeEnd', arguments) }
      console.timeStamp      = function () { performConsoleAction('timeStamp', arguments) }
      console.trace          = function () { performConsoleAction('trace', arguments) }
      console.clear          = function () {
        self.previousNamespace = new Namespace()
        BrowserAdapter.clear()
      }
    }

    return this
  },

  namespace (...args) {
    const func = args.pop()
    if (typeof func === 'function') {
      if (this._isEnabled()) {
        var oldClojureNamespace = this.clojureNamespace
        this.clojureNamespace = new Namespace(
          ...oldClojureNamespace.stack,
          ...args
        )
      }
      const returnValue = func()
      if (this._isEnabled()) {
        this.previousNamespace.transitionInto(oldClojureNamespace)
        this.clojureNamespace = oldClojureNamespace
      }
      return returnValue
    } else if (this._isEnabled()) {
      this.currentNamespace = new Namespace(
        ...this.currentNamespace.stack,
        ...args,
        func
      )
    }
    return this
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
      if (this._isEnabled()) BrowserAdapter.profile(args[0])
      const returnValue = func()
      if (this._isEnabled()) this.profileEnd()
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
      if (this._isEnabled()) this.timeEnd(args[0])
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
      if (this._isEnabled()) this.groupEnd()
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
      if (this._isEnabled()) this.groupEnd()
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

    const combinedStack = this.clojureNamespace.stack.concat(this.currentNamespace.stack)
    if (compareArrays(this.previousNamespace.stack, combinedStack)) {
      BrowserAdapter[method](...args)
    } else {
      this.previousNamespace.transitionInto(this.clojureNamespace, this.currentNamespace)
      BrowserAdapter[method](...args)
      // this.currentNamespace.print(method, ...args)
    }
    this.currentNamespace = new Namespace()
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
})

export default Logalize
