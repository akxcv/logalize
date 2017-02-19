import GroupManager from './groupManager'
import BrowserAdapter from './browserAdapter'
import Formatter from './formatter'

export default Logalize

function Logalize ({
  enabled = true,
  enableFormatting = true,
  collapseGroups = false,
  setupConsoleHooks = true
} = {}) {
  Object.assign(this, {
    enabled,
    enableFormatting,
    collapseGroups,
    setupConsoleHooks,
    formattableMethods: ['log', 'info', 'debug', 'warn', 'error', 'focus']
  })

  GroupManager.bindEvents()

  if (this.setupConsoleHooks) {
    let performConsoleAction = function (action, args) {
      GroupManager.clear()
      return BrowserAdapter[action](...args)
    }

    console.log = function () {
      performConsoleAction('log', arguments)
    }
    console.debug = function () {
      performConsoleAction('debug', arguments)
    }
    console.info = function () {
      performConsoleAction('info', arguments)
    }
    console.warn = function () {
      performConsoleAction('warn', arguments)
    }
    console.error = function () {
      performConsoleAction('error', arguments)
    }
    console.assert = function () {
      performConsoleAction('assert', arguments)
    }
    console.clear = function () {
      GroupManager.clear()
    }
    console.count = function () {
      performConsoleAction('count', arguments)
    }
    console.dir = function () {
      performConsoleAction('dir', arguments)
    }
    console.dirxml = function () {
      performConsoleAction('dirxml', arguments)
    }
    console.group = function () {
      performConsoleAction('group', arguments)
    }
    console.groupCollapsed = function () {
      performConsoleAction('groupCollapsed', arguments)
    }
    console.groupEnd = function () {
      performConsoleAction('groupEnd', arguments)
    }
    console.profile = function () {
      performConsoleAction('profile', arguments)
    }
    console.profileEnd = function () {
      performConsoleAction('profileEnd', arguments)
    }
    console.time = function () {
      performConsoleAction('time', arguments)
    }
    console.timeEnd = function () {
      performConsoleAction('timeEnd', arguments)
    }
    console.timeStamp = function () {
      performConsoleAction('timeStamp', arguments)
    }
    console.trace = function () {
      performConsoleAction('trace', arguments)
    }
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
    var func = args.pop()
    if (typeof func === 'function') {
      if (this._isEnabled()) BrowserAdapter.profile(args[0])
      var returnValue = func()
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
    var func = args.pop()
    if (typeof func === 'function') {
      if (this._isEnabled()) BrowserAdapter.time(args[0])
      var returnValue = func()
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
    var groupMethod = this.collapseGroups ? 'groupCollapsed' : 'group'

    if (typeof args[args.length - 1] === 'function') {
      var func = args.pop()

      if (this._isEnabled()) GroupManager.group(groupMethod, args, true)
      var returnValue = func()
      if (this._isEnabled()) GroupManager.ungroup(true)

      return returnValue
    } else if (this._isEnabled()) {
      GroupManager.group(groupMethod, args)
    }
    return this
  },

  print (method, ...args) {
    GroupManager.ungroup()
    if (!this._isEnabled()) return

    var shouldGroupInline = !document.hasFocus() && (GroupManager.previousStack.length + GroupManager.globalStack.length)
    if (shouldGroupInline) {
      var groupArgs = []
      var stack = GroupManager.previousStack
      stack.unshift(...GroupManager.globalStack.reduce((a, b) => a.concat(b), []))
      GroupManager.previousStack = []
      for (let i in stack) {
        groupArgs.push(stack[i])
      }
      // TODO improve this formatting
      var groupString = groupArgs.join(' -> ') + ' :: '

      if (typeof args[0] === 'string') {
        args[0] = groupString + args[0]
      } else {
        args.unshift(groupString)
      }
    }

    if (this.formattableMethods.indexOf(method) > -1 && this.enableFormatting) {
      args = Formatter.format(args)
    }

    if (shouldGroupInline) {
      BrowserAdapter.groupCollapsed(...args)
      BrowserAdapter.groupEnd()
    } else {
      BrowserAdapter[method](...args)
    }
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
