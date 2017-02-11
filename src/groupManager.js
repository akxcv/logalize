var BrowserAdapter = require('./browserAdapter')

var GroupManager = {
  currentStack: [],
  previousStack: [],
  globalStack: [],
  bindEvents: function () {
    var self = this
    window.addEventListener('blur', function () {
      self.clear()
    })
  },
  group: function (groupMethod, args, lambdaMode) {
    if (lambdaMode) {
      this.ungroup(false)
      this.globalStack.push(args)
    } else {
      this.currentStack = args
    }

    if (!document.hasFocus()) return

    var i
    if (lambdaMode) {
      for (i in args) BrowserAdapter[groupMethod](args[i])
    } else {
      var commonGroupCount = 0

      for (i in this.currentStack) {
        if (this.previousStack[i] === this.currentStack[i]) {
          commonGroupCount += 1
        }
      }
      var groupsToDeleteCount = this.previousStack.length - commonGroupCount

      for (i = 0; i < groupsToDeleteCount; i++) BrowserAdapter.groupEnd()
      var groupsToAdd = this.currentStack.slice(commonGroupCount)
      for (i in groupsToAdd) BrowserAdapter[groupMethod](groupsToAdd[i])
    }
  },
  ungroup: function (lambdaMode) {
    if (this.previousStack.length && !this.currentStack.length) {
      this.previousStack.forEach(function () {
        BrowserAdapter.groupEnd()
      })
    }
    if (lambdaMode) {
      var groups = this.globalStack.pop()
      groups.forEach(function () {
        BrowserAdapter.groupEnd()
      })
    }
    this.previousStack = this.currentStack
    this.currentStack = []
  },
  clear: function () {
    this.previousStack.forEach(function () {
      BrowserAdapter.groupEnd()
    })
    this.currentStack.forEach(function () {
      BrowserAdapter.groupEnd()
    })
    this.previousStack = []
  }
}

module.exports = GroupManager
