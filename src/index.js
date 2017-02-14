var GroupManager = require('./groupManager')
var BrowserAdapter = require('./browserAdapter')
var Formatter = require('./formatter')

function Logalize (opts) {
  var defaultOpts = {
    enabled: true,
    enableFormatting: true,
    collapseGroups: false,
    modifyConsole: true
  }

  if (!opts) opts = {}
  for (var key in defaultOpts) {
    if (!opts.hasOwnProperty(key)) opts[key] = defaultOpts[key]
  }

  this.enabled = opts.enabled
  this.enableFormatting = opts.enableFormatting
  this.collapseGroups = opts.collapseGroups
  this.formattableMethods = ['log', 'info', 'debug', 'warn', 'error', 'focus']

  GroupManager.bindEvents()

  if (opts.modifyConsole) {
    var performConsoleAction = function (action, args) {
      GroupManager.clear()
      return BrowserAdapter[action].apply(BrowserAdapter, args)
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
  log: function () {
    this.print('log', [].slice.call(arguments))
  },
  debug: function () {
    this.print('debug', [].slice.call(arguments))
  },
  info: function () {
    this.print('info', [].slice.call(arguments))
  },
  warn: function () {
    this.print('warn', [].slice.call(arguments))
  },
  error: function () {
    this.print('error', [].slice.call(arguments))
  },

  assert: function () {
    this.print('assert', [].slice.call(arguments))
  },
  count: function (label) {
    this.print('count', [label])
  },
  dir: function (obj) {
    this.print('dir', [obj])
  },
  dirxml: function (obj) {
    this.print('dirxml', [obj])
  },
  profile: function () {
    var args = [].slice.call(arguments)
    var func = args.pop()
    if (typeof func === 'function') {
      if (this._isEnabled()) BrowserAdapter.profile(args[0])
      var returnValue = func.call()
      this.profileEnd()
      return returnValue
    } else {
      if (this._isEnabled()) BrowserAdapter.profile(args[0])
    }
  },
  profileEnd: function () {
    if (this._isEnabled()) BrowserAdapter.profileEnd()
  },
  time: function () {
    var args = [].slice.call(arguments)
    var func = args.pop()
    if (typeof func === 'function') {
      if (this._isEnabled()) BrowserAdapter.time(args[0])
      var returnValue = func.call()
      this.timeEnd(args[0])
      return returnValue
    } else {
      if (this._isEnabled()) BrowserAdapter.time(args[0])
    }
  },
  timeEnd: function (label) {
    if (this._isEnabled()) BrowserAdapter.timeEnd(label)
  },
  timeStamp: function (label) {
    if (this._isEnabled()) BrowserAdapter.timeStamp(label)
  },
  trace: function (obj) {
    this.print('trace', [obj])
  },

  group: function () {
    var args = [].slice.call(arguments)
    var groupMethod = this.collapseGroups ? 'groupCollapsed' : 'group'

    if (typeof args[args.length - 1] === 'function') {
      var func = args.pop()

      if (this._isEnabled()) GroupManager.group(groupMethod, args, true)
      var returnValue = func.call()
      if (this._isEnabled()) GroupManager.ungroup(true)

      return returnValue
    } else if (this._isEnabled()) {
      GroupManager.group(groupMethod, args)
    }
    return this
  },

  print: function (method, args) {
    GroupManager.ungroup()
    if (!this._isEnabled()) return

    var shouldGroupInline = !document.hasFocus() && (GroupManager.previousStack.length + GroupManager.globalStack.length)
    if (shouldGroupInline) {
      var groupArgs = []
      var stack = GroupManager.previousStack
      stack.unshift.apply(stack, GroupManager.globalStack.reduce(function (a, b) { return a.concat(b) }, []))
      GroupManager.previousStack = []
      for (var i in stack) {
        groupArgs.push(stack[i])
      }
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
      BrowserAdapter.groupCollapsed.apply(BrowserAdapter, args)
      BrowserAdapter.groupEnd()
    } else {
      BrowserAdapter[method].apply(BrowserAdapter, args)
    }
  },

  // Enable / disable

  enable: function () {
    if (localStorage) localStorage.setItem('logalizeEnabled', 'true')
  },
  disable: function () {
    if (localStorage) localStorage.setItem('logalizeEnabled', 'false')
  },

  // Private

  _isEnabled: function () {
    if (localStorage && localStorage.logalizeEnabled) {
      return localStorage.logalizeEnabled !== 'false'
    } else {
      return this.enabled
    }
  }
}

module.exports = Logalize
