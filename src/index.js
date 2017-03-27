import BrowserAdapter from './browserAdapter'
import Formatter from './formatter'
import NamespaceManager from './namespaceManager'
import stylesheet from './stylesheet.js'

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
    collapseNamespaces = false
  } = {}) {
    Object.assign(this, {
      enabled,
      enableFormatting,
      collapseNamespaces,
      formattableMethods: ['log', 'info', 'debug', 'warn', 'error', 'focus']
    })

    if (this.enableFormatting) {
      this.appendStylesToDOM()
    } else {
      this.removeStylesFromDOM()
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

  performConsoleAction (action, args) {
    NamespaceManager.clear()
    return BrowserAdapter[action](...args)
  },

  appendStylesToDOM () {
    if (document.getElementById('logalize-stylesheet')) return
    var styleEl = document.createElement('style')
    styleEl.id = 'logalize-stylesheet'
    styleEl.innerHTML = stylesheet
    document.head.insertBefore(styleEl, document.head.firstChild)
  },

  removeStylesFromDOM () {
    const stylesheetEl = document.getElementById('logalize-stylesheet')
    if (!stylesheetEl) return
    stylesheetEl.remove()
  }
})

export default Logalize
